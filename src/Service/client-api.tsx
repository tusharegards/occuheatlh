import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapPin } from 'lucide-react'

interface LocationData {
  sys_id: string
  u_clinic_name: string
  u_address?: string   // optional field if you have address in your API
}

function Location() {
  const [locations, loading, error] = useReactQuery(import.meta.env.VITE_SN_URL)

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>
  }

  if (!locations.length) {
    return <p className="text-gray-600 text-sm">No locations found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {locations.map((location) => (
        <div
          key={location.sys_id || location.u_clinic_name}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full"
        >
          {/* Top: Clinic Name and Address */}
          <div className="space-y-2">
            <h3 className="text-gray-900 font-semibold text-lg">
              {location.u_clinic_name}
            </h3>
            {location.u_address && (
              <p className="text-gray-600">{location.u_address}</p>
            )}
          </div>
          {/* Middle: Walk-In Hours */}
          <div>
            <p className="text-gray-500 text-sm mt-4">
              Walk-In Hours: 9 AM to 5 PM
            </p>
          </div>
          {/* Bottom: Get Directions */}
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location.u_address || location.u_clinic_name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              <span className="inline-flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Get Directions
              </span>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Location

function toRequestUrl(rawUrl: string): string {
  const cleaned = rawUrl?.trim().replace(/^['"]|['"]$/g, '')
  if (!cleaned) return ''

  // If full ServiceNow URL is provided, route it through Vite proxy.
  if (/^https?:\/\//i.test(cleaned)) {
    try {
      const parsed = new URL(cleaned)
      if (parsed.hostname.endsWith('service-now.com')) {
        return `/api${parsed.pathname}${parsed.search}`
      }
    } catch {
      return cleaned
    }
  }

  return cleaned
}

// Custom hook
const useReactQuery = (urlPath: string): [LocationData[], boolean, string | null] => {
  const [locations, setLocation] = useState<LocationData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestUrl = toRequestUrl(urlPath)

  useEffect(() => {
    ;(async () => {
      try {
        if (!requestUrl) {
          setError('Location API URL is missing. Check VITE_SN_URL in .env')
          return
        }
        setLoading(true)
        setError(null)
        const response = await axios.get(requestUrl, {
          auth: {
            username: import.meta.env.VITE_SN_USERNAME,
            password: import.meta.env.VITE_SN_PASSWORD,
          },
          headers: {
            Accept: 'application/json, text/xml, application/xml',
          },
        })
        const contentType = String(response.headers['content-type'] ?? '').toLowerCase()

        if (contentType.includes('xml') || typeof response.data === 'string') {
          const xmlText = String(response.data ?? '')
          const doc = new DOMParser().parseFromString(xmlText, 'application/xml')
          const resultNodes = Array.from(doc.getElementsByTagName('result'))
          const parsed: LocationData[] = resultNodes.map((node, idx) => {
            const clinic = node.getElementsByTagName('u_clinic_name')[0]?.textContent?.trim() ?? ''
            const address = node.getElementsByTagName('u_address')[0]?.textContent?.trim() ?? undefined
            const sysId = node.getElementsByTagName('sys_id')[0]?.textContent?.trim() ?? `row-${idx}`

            return {
              sys_id: sysId,
              u_clinic_name: clinic,
              u_address: address,
            }
          })
          setLocation(parsed.filter((item) => item.u_clinic_name))
        } else {
          setLocation(response.data?.result ?? [])
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(`Location API error: ${error.response.status} ${error.response.statusText}`)
          } else {
            setError(
              'Error loading locations. Please try again later.',
            )
          }
        } else {
          setError('Failed to load locations.')
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [requestUrl])

  return [locations, loading, error]
}
import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapPin } from 'lucide-react'

interface LocationData {
  sys_id: string
  u_clinic_name: string
  u_address?: string   // optional field if you have address in your API
}

const fallbackLocations: LocationData[] = [
  {
    sys_id: 'fallback-1',
    u_clinic_name: '133 East 58th Street, Suite 811, New Yr, NY, United States, 10022',
  },
  {
    sys_id: 'fallback-2',
    u_clinic_name: '391 E. 149th Street, Ste 305-1, Bronx, NY 10455.',
  },
]

function formatAddress(addressStr: string): { line1: string; line2: string } {
  if (!addressStr) return { line1: '', line2: '' };

  let cleanStr = addressStr.trim();
  if (cleanStr.endsWith('.')) {
    cleanStr = cleanStr.slice(0, -1).trim();
  }

  const parts = cleanStr.split(',').map((p) => p.trim());

  let zip = '';
  let state = '';
  let city = '';
  let streetParts: string[] = [];

  let index = parts.length - 1;

  // 1. Check for Zip code at the very end
  if (index >= 0) {
    const lastPart = parts[index];
    const zipMatch = lastPart.match(/\b\d{5}(-\d{4})?\b/);
    if (zipMatch) {
      zip = zipMatch[0];
      const withoutZip = lastPart.replace(zipMatch[0], '').trim();
      if (withoutZip) {
        if (withoutZip.length === 2 && withoutZip === withoutZip.toUpperCase()) {
          state = withoutZip;
        }
      }
      index--;
    }
  }

  // 2. Check for Country (if not already handled or if country is next)
  if (index >= 0) {
    const part = parts[index];
    if (['usa', 'united states', 'us'].includes(part.toLowerCase())) {
      index--;
    }
  }

  // 3. Check for State (if not already found)
  if (!state && index >= 0) {
    const part = parts[index];
    if (part.length === 2 && part === part.toUpperCase()) {
      state = part;
      index--;
    }
  }

  // 4. Check for City
  if (index >= 0) {
    city = parts[index];
    index--;
  }

  // All remaining parts are the street address (Line 1)
  if (index >= 0) {
    streetParts = parts.slice(0, index + 1);
  }

  if (!city && !state && !zip) {
    if (parts.length >= 2) {
      const mid = Math.ceil(parts.length / 2);
      return {
        line1: parts.slice(0, mid).join(', '),
        line2: parts.slice(mid).join(', '),
      };
    }
    return { line1: addressStr, line2: '' };
  }

  const line1 = streetParts.join(', ');

  let line2 = city;
  if (state) {
    line2 += (line2 ? ', ' : '') + state;
  }
  if (zip) {
    line2 += (line2 ? ' ' : '') + zip;
  }

  return { line1, line2 };
}

function Location() {
  const [locations, loading, error] = useReactQuery(import.meta.env.VITE_SN_URL)
  const visibleLocations = locations.length ? locations : fallbackLocations

  if (loading) {
    return <h1>Loading...</h1>
  }

  // Intentionally do not surface API errors to users; show fallback locations instead.
  void error

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {visibleLocations.map((location) => {
        const hasSeparateAddress = Boolean(location.u_address);
        const clinicName = hasSeparateAddress ? location.u_clinic_name : '';
        const addressToParse = location.u_address || location.u_clinic_name;
        const { line1, line2 } = formatAddress(addressToParse);

        return (
          <div
            key={location.sys_id || location.u_clinic_name}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full"
          >
            {/* Top: Clinic Name and Address */}
            <div className="space-y-1">
              {clinicName && (
                <h3 className="text-gray-900 font-semibold text-lg leading-tight">
                  {clinicName}
                </h3>
              )}
              <h3 className={clinicName ? "text-gray-700 text-sm font-medium" : "text-gray-900 font-semibold text-lg leading-tight"}>
                {line1}
              </h3>
              {line2 && (
                <p className={clinicName ? "text-gray-700 text-sm font-medium" : "text-gray-900 font-semibold text-lg leading-tight"}>
                  {line2}
                </p>
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
        );
      })}
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

function toDirectServiceNowUrl(pathOrUrl: string): string | null {
  if (!pathOrUrl) return null
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  if (pathOrUrl.startsWith('/api/')) return `https://occuhealth.service-now.com${pathOrUrl}`
  return null
}

interface RawClinicLocationItem {
  u_clinic_location?: {
    display_value: string
    link: string
  }
}

function parseLocations(data: unknown, contentType: string): LocationData[] {
  // JSON payload from ServiceNow REST
  if (!contentType.includes('xml') && typeof data !== 'string') {
    const rawList = (data as { result?: RawClinicLocationItem[] })?.result ?? []
    return rawList
      .map((item, idx): LocationData | null => {
        const clinicLoc = item.u_clinic_location
        if (!clinicLoc) return null
        const parts = clinicLoc.link.split('/')
        const sysId = parts[parts.length - 1] || `loc-${idx}`
        return {
          sys_id: sysId,
          u_clinic_name: clinicLoc.display_value,
        }
      })
      .filter((i): i is LocationData => i !== null && Boolean(i.u_clinic_name))
  }

  // Azure static hosting may return index.html for unknown routes.
  const xmlText = String(data ?? '')
  if (xmlText.includes('<!doctype html') || xmlText.includes('<html')) return []

  const doc = new DOMParser().parseFromString(xmlText, 'application/xml')
  const resultNodes = Array.from(doc.getElementsByTagName('result'))
  return resultNodes
    .map((node, idx): LocationData | null => {
      const clinicLocNode = node.getElementsByTagName('u_clinic_location')[0]
      if (!clinicLocNode) return null
      const clinic = clinicLocNode.getAttribute('display_value') ?? clinicLocNode.textContent?.trim() ?? ''
      const link = clinicLocNode.textContent?.trim() ?? ''
      const parts = link.split('/')
      const sysId = parts[parts.length - 1] || `row-${idx}`
      return { sys_id: sysId, u_clinic_name: clinic }
    })
    .filter((item): item is LocationData => item !== null && Boolean(item.u_clinic_name))
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
        if (!import.meta.env.VITE_SN_USERNAME || !import.meta.env.VITE_SN_PASSWORD) {
          setError(
            'Missing API credentials in deployed environment (VITE_SN_USERNAME / VITE_SN_PASSWORD).',
          )
          return
        }
        setLoading(true)
        setError(null)
        const candidates = [requestUrl, toDirectServiceNowUrl(requestUrl)].filter(
          (v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i,
        )

        let loaded = false
        let lastFailure = ''
        for (const candidate of candidates) {
          try {
            const response = await axios.get(candidate, {
              auth: {
                username: import.meta.env.VITE_SN_USERNAME,
                password: import.meta.env.VITE_SN_PASSWORD,
              },
              headers: {
                Accept: 'application/json, text/xml, application/xml',
              },
            })

            const contentType = String(response.headers['content-type'] ?? '').toLowerCase()
            const parsed = parseLocations(response.data, contentType)

            // Ignore HTML fallback responses from static hosting routes.
            if (parsed.length > 0) {
              setLocation(parsed)
              loaded = true
              break
            }
            lastFailure = `No records from ${candidate}`
          } catch {
            // try next candidate and keep a diagnostic trail
            try {
              await axios.get(candidate, {
                auth: {
                  username: import.meta.env.VITE_SN_USERNAME,
                  password: import.meta.env.VITE_SN_PASSWORD,
                },
                headers: { Accept: 'application/json, text/xml, application/xml' },
              })
            } catch (e) {
              if (axios.isAxiosError(e)) {
                if (e.response) {
                  lastFailure = `${candidate} -> ${e.response.status} ${e.response.statusText}`
                } else {
                  lastFailure = ` Error Fetching Data`
                }
              }
            }
          }
        }

        if (!loaded) {
          setLocation([])
          setError(lastFailure || 'No locations returned from API.')
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
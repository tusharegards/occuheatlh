import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapPin } from 'lucide-react'

interface LocationData {
  sys_id: string
  u_clinic_name: string
  u_address?: string   // optional field if you have address in your API
}

function Location() {
  const [locations, loading] = useReactQuery(import.meta.env.VITE_SN_URL)

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {locations.map((location) => (
        <div
          key={location.sys_id}
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

// Custom hook
const useReactQuery = (urlPath: string): [LocationData[], boolean] => {
  const [locations, setLocation] = useState<LocationData[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await axios.get(urlPath, {
          auth: {
            username: import.meta.env.VITE_SN_USERNAME,
            password: import.meta.env.VITE_SN_PASSWORD,
          },
          headers: { 'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
        })
        console.log(response.data.result)
        setLocation(response.data.result)
        setLoading(false)
      } catch (error) {
        if(error)
        setLoading(false)
      }
    })()
  }, [urlPath])

  return [locations, loading]
}
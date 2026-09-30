import { useEffect, useState } from 'react'
import axios from 'axios'
import { MapPin } from 'lucide-react'

interface LocationData {
  sys_id: string
  u_clinic_name: string
  u_address?: string   // optional field if you have address in your API
}

const fallbackLocations: LocationData[] = [
  { sys_id: 'loc-1', u_clinic_name: '515 North Ave, New Rochelle, NY, United States, 10801' },
  { sys_id: 'loc-2', u_clinic_name: '40 S Broadway, Yonkers, NY, United States, 10701' },
  { sys_id: 'loc-3', u_clinic_name: '65 Niagara Sq, Buffalo, NY, United States, 14202' },
  { sys_id: 'loc-4', u_clinic_name: '1 Metrotech Center, Brooklyn, NY, United States, 11201' },
  { sys_id: 'loc-5', u_clinic_name: '1340 S Dixie Hwy, Miami, FL, USA, 33146' },
  { sys_id: 'loc-6', u_clinic_name: '202 C St, San Diego, CA, United States, 92101' },
  { sys_id: 'loc-7', u_clinic_name: '1 Public Square, Nashville, TN, United States, 37201' },
  { sys_id: 'loc-8', u_clinic_name: '133 E, 58th Street, Suite 811, New York, NY, 10022' },
  { sys_id: 'loc-9', u_clinic_name: '30 Church St, Rochester, NY, United States, 14614' },
  { sys_id: 'loc-10', u_clinic_name: '600 E 4th St, Charlotte, NC, United States, 28202' },
  { sys_id: 'loc-11', u_clinic_name: '1400 John F Kennedy Blvd, Philadelphia, PA, United States, 19107' },
  { sys_id: 'loc-12', u_clinic_name: '391 E, 149th Street, Ste 305-1, Bronx, NY 10455' },
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

  if (index >= 0) {
    const part = parts[index];
    if (['usa', 'united states', 'us'].includes(part.toLowerCase())) {
      index--;
    }
  }

  if (!state && index >= 0) {
    const part = parts[index];
    if (part.length === 2 && part === part.toUpperCase()) {
      state = part;
      index--;
    }
  }

  if (index >= 0) {
    city = parts[index];
    index--;
  }

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
  const [locations] = useReactQuery()
  const visibleLocations = locations.length ? locations : fallbackLocations

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

// Custom hook
const useReactQuery = (): [LocationData[], boolean, string | null] => {
  const [locations, setLocation] = useState<LocationData[]>(fallbackLocations)

  useEffect(() => {
    ;(async () => {
      const url = import.meta.env.VITE_SN_URL || '/api/now/table/sn_customerservice_clinic?sysparm_fields=u_clinic_name'
      const username = import.meta.env.VITE_SN_USERNAME
      const password = import.meta.env.VITE_SN_PASSWORD

      if (!username || !password) {
        return
      }

      try {
        const authHeader = 'Basic ' + btoa(`${username}:${password}`)
        const response = await axios.get(url, {
          headers: {
            Authorization: authHeader,
            Accept: 'application/json',
          },
        })

        const rawList = response.data?.result
        if (Array.isArray(rawList) && rawList.length > 0) {
          const parsed = rawList
            .map((item: { u_clinic_name?: string }, idx: number): LocationData | null => {
              const name = item.u_clinic_name?.trim()
              if (!name || name.toLowerCase().includes('test, test')) return null
              return { sys_id: `loc-api-${idx}`, u_clinic_name: name }
            })
            .filter((i): i is LocationData => i !== null)

          if (parsed.length > 0) {
            setLocation(parsed)
          }
        }
      } catch {
        // Keep fallback locations if API fetch fails or triggers CORS
      }
    })()
  }, [])

  return [locations, false, null]
}
import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

interface LocationData {
  sys_id: string
  u_clinic_name: string
  u_address?: string   // optional field if you have address in your API
}

const fallbackLocations: LocationData[] = [
  {
    sys_id: 'fallback-1',
    u_clinic_name: '133 East 58th Street, Suite 811, New York, NY 10022',
  },
  {
    sys_id: 'fallback-2',
    u_clinic_name: '391 E. 149th Street, Ste 305-1, Bronx, NY 10455',
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
  const [locations, setLocation] = useState<LocationData[]>([])

  useEffect(() => {
    setLocation(fallbackLocations)
  }, [])

  return [locations, false, null]
}
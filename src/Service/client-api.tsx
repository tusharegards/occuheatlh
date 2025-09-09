interface LocationData {
  sys_id: string;
  u_clinic_name: string;
}
import { useEffect, useState } from 'react'
import axios from 'axios'


function Location() {
    const [locations, loading] = useReactQuery('/api')
    
  

    if (loading) {
      return <h1>Loading...</h1>
    }
  
    return (
      <>
     
     
       <p>
        {locations.map((location) => (
          <div key={location.sys_id}>
            <h3>{location.u_clinic_name}</h3>
          </div>
        ))}
       </p>
      
      </>
    )
  }
  
  export default Location
  
const useReactQuery = (urlPath: string): [LocationData[], boolean] => {
  const [locations, setLocation] = useState<LocationData[]>([])
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      ( async () => {
        try {
          setLoading(true)
          const response = await axios.get(urlPath, {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
          })
          console.log(response.data.result)
          setLocation(response.data.result)
          setLoading(false)
        } catch (error) {
            if (error)
          setLoading(false)
        }
      })()
    }, [urlPath])
  
    return [locations, loading]
  }
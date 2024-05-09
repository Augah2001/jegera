import React, { useContext, useEffect, useState } from 'react'
import { mapLocationContext } from '../contexts/mapLocationContext';
import useLocations, { Location } from './useLocations';

const useSelectLocation = () => {

    const { mapLocation } = useContext(mapLocationContext);
  const [location, setLocation] = useState<Location>();

  

  
  

  useEffect(() => {
    if (mapLocation) {
      const newLocation = {
        name: mapLocation.result.text,
        coordinates: mapLocation.result.center,
      };
      setLocation(newLocation);
      console.log(location)
    } else {
        setLocation({} as Location)
        console.log(location)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLocation]);
  return {setLocation,location}
}

export default useSelectLocation

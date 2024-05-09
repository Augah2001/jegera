import React, { useContext, useEffect, useState } from 'react'
import { mapLocationContext } from '../contexts/mapLocationContext';
import useLocations, { Location } from './useLocations';

const useSelectLocation = () => {

    const { mapLocation } = useContext(mapLocationContext);
  const [location, setLocation] = useState<Location>();

  

  
  

  useEffect(() => {
    if ( typeof mapLocation === 'object' && Object.keys(mapLocation).length !== 0) {
      const newLocation = {
        name: mapLocation.result.text,
        coordinates: mapLocation.result.center,
      };
      setLocation(newLocation);

   
    } else {
        setLocation({} as Location)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLocation]);
  return {setLocation,location}
}

export default useSelectLocation

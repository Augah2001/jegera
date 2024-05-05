import React, { Dispatch, SetStateAction } from "react";

import useMap from "../hooks/useMap";
import { usePathname } from "next/navigation";

interface house {
  id: number;
  price: number;
  coordinates: [number, number];
}

const MyMap = ({

  
  setHasScrolled,
}: {
  setHasScrolled: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mapContainerRef } = useMap(setHasScrolled);
  const path = usePathname()
  return (
    <div>
      <div
        ref={mapContainerRef}
        className={`w-full ${path === '/dashboard/1/add'? 'min-h-[500px]': 'min-h-[800px]'}  `}  
        onClick={() => {
          setHasScrolled(true);
        }}
      ></div>
    </div>
  );
};

export default MyMap;

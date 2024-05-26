import React, { Dispatch, SetStateAction } from "react";

import useMap, { Options } from "../hooks/useMap";
import { usePathname } from "next/navigation";

interface house {
  id: number;
  price: number;
  coordinates: [number, number];
}

interface Props {
  setHasScrolled: Dispatch<SetStateAction<boolean>>;
  options?: Options
}

const MyMap = ({

  
  setHasScrolled,
  options
  
  
}: Props) => {
const { mapContainerRef } = useMap(setHasScrolled, options );
  const path = usePathname()
  
  return (
    <div>
      <div
        ref={mapContainerRef}
        className={`w-full ${path === '/dashboard/1/add'? 'min-h-[600px]': 'min-h-[800px]'}  `}  
        // onClick={(event) => {
        //   setHasScrolled(true);
        //   console.log(event.currentTarget)
        // }}
      ></div>
    </div>
  );
};

export default MyMap;

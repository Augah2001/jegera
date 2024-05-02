import React, { Dispatch, SetStateAction } from "react";

import useMap from "../hooks/useMap";

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

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="w-full min-h-[800px]"
        onClick={() => {
          setHasScrolled(true);
        }}
      ></div>
    </div>
  );
};

export default MyMap;

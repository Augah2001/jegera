import React, { Dispatch, SetStateAction } from "react";

import useMap from "../hooks/useMap";

interface house {
  id: number;
  price: number;
  coordinates: [number, number];
}

const MapComponent = ({
  setHasScrolled,
}: {
  setHasScrolled: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mapContainerRef } = useMap(setHasScrolled);

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="w-full min-h-screen"
        onClick={() => {
          setHasScrolled(true);
        }}
      ></div>
    </div>
  );
};

export default MapComponent;

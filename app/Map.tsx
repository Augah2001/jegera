import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import mapboxgl from "mapbox-gl";

import "./beepingButton.css";

import HouseMapPopup from "./HouseMapPopup";
import { createRoot } from "react-dom/client";
import { useRouter } from "next/navigation";

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
  const mapContainerRef = useRef<HTMLDivElement | any>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // Choose your style
      center: [31.05139, -17.78421], // Initial center
      zoom: 13,
    });

    const houses: house[] = [
      {
        id: 2,
        coordinates: [31.059017158684345, -17.782812767612665],
        price: 100,
      },
      {
        price: 150,
        id: 4,
        coordinates: [31.058826105504835, -17.768739785090247],
      },
      {
        price: 180,
        id: 4,
        coordinates: [31.037826105504835, -17.778739785090247],
      },
      {
        price: 130,
        id: 4,
        coordinates: [31.068126105504835, -17.78739785090247],
      },
    ];

    houses.forEach((house) => {
      const btn = document.createElement("button");

      btn.innerHTML = `${"$" + house?.price}`;
      btn.style.width = "65px";
      btn.style.height = "30px";
      btn.style.backgroundColor = "purple";
      btn.style.color = "white";
      btn.style.borderRadius = "15px";
      btn.style.borderWidth = "2px";
      btn.style.borderColor = "purple";
      btn.style.fontWeight = "bold";

      const popupContainer = document.createElement("div");
      const root = createRoot(popupContainer); // Create a root for the popup content
      root.render(<HouseMapPopup />);
      // btn.style.fontSize = '12px'
      const popup = new mapboxgl.Popup({ closeButton: false });
      popup.getElement();
      popupContainer.addEventListener("click", () => {
        router.push("./view");
      });
      popup
        .setLngLat([31.058826105504835, -17.768739785090247])
        .setDOMContent(popupContainer);

      const marker = new mapboxgl.Marker({ element: btn });
      marker.setLngLat(house.coordinates);
      marker.setPopup(popup);
      marker.addTo(map);
    });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      })
    );

    map.on("click", (e) => {
      setHasScrolled(true);
    });
    return () => map.remove();
  }, []); 

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="w-full min-h-screen"
        onClick={() => {
          setHasScrolled(true);
        }}
      />
    </div>
  );
};

export default MapComponent;

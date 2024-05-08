import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import HouseMapPopup from "../HomeComponents/HouseMapPopup";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "../mapbox-gl-directions/src/directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useRouter } from "next/navigation";
import useHouses from "./useHouses";

import { serialize } from "v8";
import HelloWorldControl from "../classes/SearchControl";
import { mapLocationContext } from "../contexts/mapLocationContext";

export interface Options {
  marker?: boolean;
  search?: boolean;
  directions?: boolean;
}

const useMap = (
  setHasScrolled: Dispatch<SetStateAction<boolean>>,
  { marker, search, directions }: Options = {
    marker: true,
    search: true,
    directions: true,
  }
) => {
  const { data: houses, error, isLoading } = useHouses();
  const mapContainerRef = useRef<HTMLDivElement | any>(undefined);
  const router = useRouter();

  const {setMapLocation} = useContext(mapLocationContext)
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {},
      () => {}
    );

    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      accessToken:
        "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard", // Choose your style
      center: [31.05139, -17.78421], // Initial center
      zoom: 13,
      
    });
    map.on("click", (e) => {
      const clickedLocation = {
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
      };
      console.log(clickedLocation);
    });

    {
      marker &&
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
    }

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      })
    );

    const addDirections = () => {
      const directions = new MapboxDirections({
        accessToken:
          "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
        proximity: {
          latitude: 31.058826105504835,
          longitude: -17.768739785090247,
        },
      });
      map.addControl(directions);

      directions.on("click", () => {
        console.log("wadii");
      });
    };

    directions && addDirections();

    function addSearch() {
      const search = new MapboxGeocoder({
        autocomplete: true,

        marker: true,
        countries: 'ZW',
        flyTo: true,
        proximity: {
          latitude: 31.058826105504835,
          longitude: -17.768739785090247,
        },
        accessToken:
          "pk.eyJ1IjoiYXVnYWgiLCJhIjoiY2x0a2pidTFiMGZnbDJrb2VzcnZ6YTJ5biJ9.ulIIDJl3rnwWq8iGBzre5Q",
      });

      search.on('result', (result)=> {
        setMapLocation(result)
      })

      map.addControl(search);
    }

    



    search && addSearch();

    map.on("click", (e) => {
      setHasScrolled(true);
    });
    return () => map.remove();
  }, []);

  return { mapContainerRef, setHasScrolled };
};

export default useMap;

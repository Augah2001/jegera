"use client";

import React, { useContext } from "react";
import Image from "next/image";
import dheni from "../assets/dheni.jpg";
import { useRouter } from "next/navigation";
import { House } from "../hooks/useHouses";
import Main from "../houses/[id]/Main";
import { ThemeContext } from "../contexts/ThemeContext";
import { BiLogoMessenger } from "react-icons/bi";

const HouseMapPopup = ({ house }: { house: House }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      className=" card rounded-none w-[100%] mb-4 max-h-[10px]] mx-0  "
      onClick={() => {}}
    >
      <figure
        className=" bg-bse-200  max-h-[180px] "
       
      >
        <Image
          src={dheni}
          alt="thumbnail"
          objectPosition="center"
          layout="fit" // Use layout="fill" for responsive sizing
          objectFit="cover" // Use objectFit="cover" to crop if needed
          className="object-cover h-[60%] object-center mx-0" // Add Tailwind class for object-fit
          priority // Prioritize loading this image for a better experience
        />
      </figure>
      <div className="card-body p-2 m- h-[full]">
        <div className="flex">
          <h2 className="card-title ms-2 text-purple-700">Amenities</h2>
        </div>

        <div className="flex flex-wrap">
          {house?.services?.map((amenity, index) => (
            <div key={index} className="flex flex-wrap mb-1">
              <div className="">
                <p
                  className={`ms-2 ${
                    isDark ? "text-slate-100" : "text-slate-700"
                  } text-[12px] font-thin `}
                >
                  {`${amenity.name} `}{" "}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-[2px] ms-2 h-[10px] bg-slate-400"></div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default HouseMapPopup;

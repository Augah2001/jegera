"use client";

import React, { useContext, useState } from "react";
import { Box } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from "../contexts/ThemeContext";
import GradientDiv from "../components/GradientDiv";
import useLocations from "../hooks/useLocations";
// import { Location } from "@prisma/client";

// Settings for the slider


interface Location {
  id: number;
  name: string;
  coordinates: number[]
  minutes: number
}




export default function CaptionCarousel({hasScrolled}: {hasScrolled: boolean}) {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: hasScrolled? 3: 6,
    slidesToShow: hasScrolled? 3:6,
  };
  const { isDark } = useContext(ThemeContext);

  const [isClicked, setIsClicked] = useState(0);
  const [isHovered, setIsHovered] = useState(0);
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const {data: locations, error, isLoading} = useLocations()

  

  return (
    <div className="shadow-2xl">
      <Box
        position={"relative"}
        height={"120x"}
        width={"full"}
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}

        {/* Left Icon */}
        <div
          className="
          text-slate-400 hover:text-slate-600
           top-[28%] left-[2%] z-[2]
           absolute transform translate(0%, -50%)"
          aria-label="left-arrow"
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </div>
        {/* Right Icon */}
        <div
          className="
          text-slate-400 hover:text-slate-600
           top-[28%] right-[2%] z-[2]
           absolute transform translate(0%, -50%)"
          aria-label="right-arrow"
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </div>
        {/* Slider */}
        <Slider
          className={`  flex items-center`}
          {...settings}
          ref={(slider) => setSlider(slider)}
        >
          {locations.map((location) => (
            <div
              className={` ${
                (isClicked !== location.id || isClicked === location.id) && "bg-base-100"
              } h-[80px] flex items-center  relative bg-center bg-repeat bg-cover  `}
              key={location.id}
              onClick={() => setIsClicked(location.id)}
              onMouseEnter={() => setIsHovered(location.id)}
              onMouseLeave={() => setIsHovered(100000000000000)}
            >
              {/* This is the block you need to change, to customize the caption */}
              <div
                className={`h-[65px] px-3 mt-[8px] flex items-center container ${
                  isClicked == location.id && " rounded-[500px] shadow-md"
                }
                  ${isDark && isClicked == location.id && "bg-[#2a1d57]"}
                  ${!isDark && isClicked == location.id && "bg-[#3c3193]"}
                 ${
                   isHovered == location.id &&
                   isClicked !== location.id &&
                   "bg-base-200 rounded-[500px]"
                 } cursor-pointer
                `}
              >
                <div className=" px-3 items-center relative top-[40%] transform -translate-y-1/2 left-[50%] -translate-x-1/2">
                  <div className="justify-center flex">
                    <div
                      className={` *
                            transition duration-900 ease-in-out                            
                            ${
                              isClicked == location.id
                                ? "bg-[#00a96e]"
                                : " bg-purple-700"
                            } h-2 w-2 rounded-[40px]
                            ${
                              isHovered == location.id && isClicked === location.id
                                ? " w-5"
                                : "  bg-[#00a96e]"
                            }
                             ${
                               isClicked !== location.id && isHovered === location.id
                                 ? "w-5"
                                 : ""
                             } 
                             `}
                    ></div>
                  </div>

                  <div className=" flex justify-center pt-2">
                    {" "}
                    <h1
                      className={` ${isDark && "text-gray-100"}
                      ${isClicked !== location.id && !isDark && "text-gray-700"}
                      ${isClicked === location.id && !isDark && "text-gray-100"}
                      ${isClicked === location.id && "text-xl "} `}
                    >
                      {location.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Box>
      {isDark ? (
        <div className="shadow-xl ">
          <GradientDiv />
        </div>
      ) : (
        <div className={`bg-base-300 shadow-xl  h-[1px] min-w-[100%]`}></div>
      )}
    </div>
  );
}

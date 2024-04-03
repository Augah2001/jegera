"use client";

import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Container,
  Heading,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from "./contexts/ThemeContext";
import GradientDiv from "./components/GradientDiv";

// Settings for the slider
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 6,
  slidesToShow: 6,
};

export default function CaptionCarousel() {
  const { isDark } = useContext(ThemeContext);

  const [isClicked, setIsClicked] = useState(0);
  const [isHovered, setIsHovered] = useState(0);
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const locations = [
    "mount",
    "tynywald",
    "epping",
    "heights",
    "willovale",
    "norton",
    "masasa",
    "chitown",
    "hatfield",
  ];

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
          className={`  flex items-center px-3`}
          {...settings}
          ref={(slider) => setSlider(slider)}
        >
          {locations.map((card, index) => (
            <div
              className={` ${
                (isClicked !== index || isClicked === index) && "bg-base-100"
              } h-[80px] flex items-center  relative bg-center bg-repeat bg-cover  `}
              key={index}
              onClick={() => setIsClicked(index)}
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(100000000000000)}
            >
              {/* This is the block you need to change, to customize the caption */}
              <div
                className={`h-[65px] px-3 mt-[8px] flex items-center container ${
                  isClicked == index && " rounded-[500px] shadow-md"
                }
                  ${isDark && isClicked == index && "bg-[#2a1d57]"}
                  ${!isDark && isClicked == index && "bg-[#3c3193]"}
                 ${
                   isHovered == index &&
                   isClicked !== index &&
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
                              isClicked == index
                                ? "bg-[#00a96e]"
                                : " bg-purple-700"
                            } h-2 w-2 rounded-[40px]
                            ${
                              isHovered == index && isClicked === index
                                ? " w-5"
                                : "  bg-[#00a96e]"
                            }
                             ${
                               isClicked !== index && isHovered === index
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
                      ${isClicked !== index && !isDark && "text-gray-700"}
                      ${isClicked === index && !isDark && "text-gray-100"}
                      ${isClicked === index && "text-xl "} `}
                    >
                      {card}
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

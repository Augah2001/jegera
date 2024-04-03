"use client";

import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  
} from "@chakra-ui/react";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from "../contexts/ThemeContext";
import GradientDiv from "../components/GradientDiv";
import dheni from "../assets/dheni.jpg";
import Image from "next/image";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 1,
  vertical: true,
};



export default function PictureCarousel() {
  const { isDark } = useContext(ThemeContext);
  const [slider, setSlider] = React.useState<Slider | null>(null);

 

  const cards = [dheni, dheni, dheni, dheni, dheni, dheni, dheni, dheni, dheni];

  

  return (
    <div className="shadow-2xl w-full m-0">
      <Box
        position={"relative"}
        height={"120x"}
        width={"full"}
        overflow={"hidden"}
        
      >
        {/* CSS files for react-slick */}

        {/* Left Icon */}
        <IconButton
          color={"pink.500"}
          aria-label="left-arrow"
          position="absolute"
          left={"2%"}
          top={"50%"}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        <IconButton
          color={"pink.500"}
          aria-label="right-arrow"
          position="absolute"
          right={"2%"}
          top={"50%"}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
        <Slider
          className={`  flex items-center px-3`}
          {...settings}
          ref={(slider) => setSlider(slider)}
        >
          {cards.map((card, index)=> <div className = 'flex justify-center max-h-[600px] bg-gray-600 w-screen'>
            <Image className = " mx-auto" src = {dheni} alt = {'no image'}/>
          </div>)}
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

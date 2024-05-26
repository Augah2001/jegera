"use client";

import React, { useContext, useState } from "react";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import GradientDiv from "../../components/GradientDiv";
import dheni from "../../assets/dheni.jpg";
import Image from "next/image";
import { House } from "@/app/hooks/useHouses";
import { CldImage } from "next-cloudinary";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 1,
  vertical: false,
};

export default function PictureCarousel({
  house,
}: {
  house: House | undefined;
}) {
  const { isDark } = useContext(ThemeContext);
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const images = house?.images
    ? [house?.backgroundImage, ...house.images]
    : [house?.backgroundImage];

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
          {images?.map((image, index) => (
            <div
              key={index}
              className="flex justify-center  bg-gray-600 w-screen"
            >
              {image && (
                <CldImage
                  src={image}
                  alt="thumbnail"
                  className="  "
                  width={1000}
                  height={1000}
                />
              )}
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

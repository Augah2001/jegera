import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Image from "next/image";
import picture from "../assets/dheni.jpg";

interface Props {

  onOpen: () => void;
}

const PictureView = ({  onOpen,}: Props) => {
  return (
    <div className=" mt-[10px] h-[86.5vh] flex " onClick={onOpen}>
      <div className="bg-blue-700 shadow-2xl h-[600px] w-[60%] mx-auto mt-8 flex" onClick={onOpen}>
        <div className=" w-[50%] border-e-2 h-full relative">
        <IconButton
         
          aria-label="left-arrow"
          color={"pink.500"}
          position="absolute"
          left={"2%"}
          top={"50%"}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={onOpen}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
          <Image
            src={picture}
            alt="thumbnail"
            objectPosition="center"
            layout="fit" // Use layout="fill" for responsive sizing
            objectFit="cover" // Use objectFit="cover" to crop if needed
            className="object-cover  w-full h-full object-center " // Add Tailwind class for object-fit
            priority // Prioritize loading this image for a better experience
          />
         <IconButton
         
          color={"pink.500"}
          aria-label="right-arrow"
          position="absolute"
          right={"2%"}
          top={"50%"}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={onOpen}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
          <Link
            href="#"
            className="text-white text-lg underline hover:text-slate-400 end-[1%] absolute z-10 bottom-[1%] "
            onClick={onOpen}
          >
            see more
          </Link>
        </div>
        <div className="w-[50%] h-full">
          <div className="bg-green-600 w-full border-b-2 h-[50%]">
            <Image
              src={picture}
              alt="thumbnail"
              objectPosition="center"
              layout="fit" // Use layout="fill" for responsive sizing
              objectFit="cover" // Use objectFit="cover" to crop if needed
              className="object-cover  w-full h-full object-center " // Add Tailwind class for object-fit
              priority // Prioritize loading this image for a better experience
            />
          </div>
          <div className="bg-yellow-400 w-full h-[50%]">
            <Image
              src={picture}
              alt="thumbnail"
              objectPosition="center"
              layout="fit" // Use layout="fill" for responsive sizing
              objectFit="cover" // Use objectFit="cover" to crop if needed
              className="object-cover  w-full h-full object-center " // Add Tailwind class for object-fit
              priority // Prioritize loading this image for a better experience
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PictureView;

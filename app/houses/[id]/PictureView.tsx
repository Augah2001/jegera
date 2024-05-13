import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Image from "next/image";
import picture from "../../assets/dheni.jpg";
import { CldImage } from "next-cloudinary";
import { House } from "@/app/hooks/useHouses";

interface Props {

  onOpen: () => void;
  house: House | undefined
}

const PictureView = ({  onOpen, house}: Props) => {
  return (
    <div className=" mt-[10px] h-[86.5vh] flex " onClick={onOpen}>
      <div className="bg-base-300 shadow-2xl h-[600px] w-[60%] mx-auto mt-8 flex" onClick={onOpen}>
        <div className=" w-[50%] border-e-2 h-full relative border-r-[2px] border-r-slate-500">
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
        {house && <CldImage src={house.backgroundImage || '/images/profile_pictures/OIP_wqanmu'}
            alt="thumbnail"
       
             className="object-cover object-center  "
            fill = {true} 
          
            />}
            

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
        <div className="w-[50%] h-full ">
          <div className="bg-base-300 w-[100%] border-b-2 h-[50%]  border-b-slate-500">
          {house && <CldImage src={house?.images[0] || '/images/profile_pictures/OIP_wqanmu' }
            alt="display image"
      
            height={800}
             width={800}
            className="object-cover object-center h-[100%] w-[100%] "
            
             
            />}
          </div>
          <div className="bg-base-300 w-[100%] h-[50%]">
          {house && <CldImage src={house?.images[1] || '/images/profile_pictures/OIP_wqanmu'}
            alt="display image"
             height={800}
             width={800}

             className="object-cover object-center h-[100%] w-[100%] "
             />}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PictureView;

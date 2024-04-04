"use client";
import { useDisclosure } from "@chakra-ui/react";
import PictureView from "./PictureView";
import ImageModal from "./Modal";
import SidePanel from "./SidePanel";

const page = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className = 'flex px-3'>
      <SidePanel/>
      <div className="w-full">
        <PictureView onOpen={onOpen} />
        <ImageModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
        
        
      </div>
    </div>
  );
};

export default page;

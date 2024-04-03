"use client";
import { useDisclosure } from "@chakra-ui/react";
import PictureView from "./PictureView";
import ImageModal from "./Modal";

const page = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div>
      <PictureView onOpen={onOpen} />
      <ImageModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
    </div>
  );
};

export default page;

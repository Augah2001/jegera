import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

import PictureCarousel from "./PictureCarousel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
function ImageModal({ onOpen, onClose, isOpen }: Props) {
  return (
    <>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-base-100 shadow-none">
          <ModalBody className="bg-base-100 shadow-none">
            <PictureCarousel />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal;

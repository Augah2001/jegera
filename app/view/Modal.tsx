import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

import PictureCarousel from "./PictureCarousel";
import Form from "../HomeComponents/SignInForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
function ImageModal({ onClose, isOpen }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-base-100 shadow-none">
          <ModalBody className="bg-base-100 shadow-none">
            <Form />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal;

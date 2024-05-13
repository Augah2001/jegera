import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";

import PictureCarousel from "./PictureCarousel";
import Form from "../../HomeComponents/SignInForm";
import PictureView from "./PictureView";
import { House } from "@/app/hooks/useHouses";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  house: House
}
function ImageModal({ onClose, isOpen, house }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-base-100 shadow-none">
          <ModalBody className="bg-base-100 shadow-none">
           <PictureCarousel house={house}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal;

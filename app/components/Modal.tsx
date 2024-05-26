"use client";

import Form from "@/app/HomeComponents/SignInForm";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode, useContext } from "react";
import { GetCoordinatesContext } from "../contexts/GetCoordinatesContext";

interface Props {
  // isOpen: boolean;
  // onClose: () => void;
  // onOpen: () => void
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  modalBody: ReactNode;
}
function ImageModal({ headerContent, footerContent, modalBody }: Props) {
  const { isOpen, onClose } = useContext(FormModalContext);

  const {getCoordinates, setGetCoordinates} = useContext(GetCoordinatesContext)

  const handleClose = ()=> {
    setGetCoordinates(false)
    console.log(getCoordinates)
    onClose()
  }
  return (
    
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent className="bg-base-100 shadow-3xl  ">
          <ModalHeader className=" flex justify-center rounded-md bg-base-100">
            <h1 className="text-pink-700 text-2xl">{headerContent}</h1>
          </ModalHeader>
          <ModalBody height={'600px'} className="bg-base-100 h-[600px] shadow-none">{modalBody}</ModalBody>
          <ModalFooter className="bg-base-100 rounded-md">{footerContent}</ModalFooter>
        </ModalContent>
      </Modal>
    
  );
}

export default ImageModal;

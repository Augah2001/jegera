"use client";

import Form from "@/app/components/Form/SignInForm";
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

interface Props {
  // isOpen: boolean;
  // onClose: () => void;
  // onOpen: () => void;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  modalBody: ReactNode;
}
function ImageModal(
  // { onClose, isOpen }: Props
  { headerContent, footerContent, modalBody }: Props
) {
  const {isOpen, onClose} = useContext(FormModalContext)
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-base-100 shadow-none">
          <ModalHeader className=" flex justify-center">
            <h1 className="text-pink-700 text-2xl">{headerContent}</h1>
          </ModalHeader>
          <ModalBody className="bg-base-100 shadow-none">{modalBody}</ModalBody>
          <ModalFooter>{footerContent}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageModal;

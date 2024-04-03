'use client'

import { Button } from "@chakra-ui/react";
import React from "react";

const CloseButton = ({handleClose}: {handleClose: ()=> void}) => {
  return (
    <Button colorScheme="blue" mr={3} onClick={handleClose}>
      Close
    </Button>
  );
};

export default CloseButton;

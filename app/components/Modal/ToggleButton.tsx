'use client'

import { Button } from '@chakra-ui/react'
import React from 'react'

const ModalButton = ({handleOpen}: {handleOpen: ()=> void}) => {
  return (
    <Button onClick={handleOpen}>Open Modal</Button>
  )
}

export default ModalButton
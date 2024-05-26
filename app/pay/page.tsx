'use client'
import React, { useContext, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Image,
  Divider,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  // Other imports from your library
} from '@chakra-ui/react'; // Assuming you're using Chakra UI
import { FormModalContext } from '../contexts/FormModalContext';

const PaynowModal = () => {

  const myItems = [{title: 'location', amount: 210}]
  const submitMobilePayment = () => {}
  const submitWebPayment = () => {}
  const loading = false
  const totalAmount = 12
  const isMobilePayment = true
  const error = false
  const {isOpen, onClose,onOpen} = useContext(FormModalContext)
  return (
    <Modal size="xl" isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>transact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mt={2} mb={8}>
            <Image
              mb={4}
              src="https://developers.paynow.co.zw/docs/assets/Paynow%20Badge-vector-hires%20DARK.svg"
              alt="Paynow"
              objectFit="fill"
            />
            <Divider my={2} />
            <Box maxHeight={200} overflowY="auto">
              {myItems.map((item) => (
                <Flex alignItems="center" key={item.title}>
                  <Box w={14} h="auto">
                    <Image rounded="xl" src={item?.image} alt={item.title} fallbackSrc="https://via.placeholder.com/150" />
                  </Box>
                  <Box flex={1}>
                    <Flex justifyContent="space-between" w="full">
                      <Heading mb={1} fontSize="md" isTruncated={true}>
                        {item.title}
                      </Heading>
                      <Heading fontWeight="medium" fontSize="md" flex={1} pl={2} textAlign="right">
                        {Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(item.amount)}
                      </Heading>
                    </Flex>
                   
                  </Box>
                </Flex>
              ))}
            </Box>
            <Divider py={2} />
            {isMobilePayment ? (
              <Box py={2} mt={4}>
                <form onSubmit={submitMobilePayment}>
                  <FormControl py={2}>
                    <FormLabel>Mobile number</FormLabel>
                    <Input type="number" maxLength={10} minLength={10} autoComplete="off" name="phone" variant="flushed" placeholder="0777777777" required={true} />
                    {error && <FormHelperText color="red.500">{error}</FormHelperText>}
                  </FormControl>
                  <FormControl py={2}>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" autoComplete="off" name="email" placeholder="you@example.com" variant="flushed" required={true} />
                  </FormControl>
                  <Box mt={4} >
                    <FormControl>
                      <Button  colorScheme="blue" mr={3} type="submit" isLoading={loading}>
                        Pay RTGS$ {Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(totalAmount)}
                      </Button>
                    </FormControl>
                    <FormControl>
                      <Button onClick={onClose} variant="outline">
                        Cancel
                      </Button>
                    </FormControl>
                  </Box>
                </form>
              </Box>
            ) : (
              <Box >
                {error && <Text color="red.500">{error}</Text>}
                <Button colorScheme="blue" mr={3} isLoading={loading} onClick={submitWebPayment}>
                  Checkout
                </Button>
                <Button onClick={onClose} variant="outline">
                  Cancel
                </Button>
              </Box>
            )}
            </Box>
          </ModalBody>
          </ModalContent>
          </Modal>)}
export default PaynowModal
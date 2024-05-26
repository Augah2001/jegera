"use client";
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
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
  useToast,
  // Other imports from your library
} from "@chakra-ui/react"; // Assuming you're using Chakra UI
import { FormModalContext } from "../../contexts/FormModalContext";
import { House } from "@/app/hooks/useHouses";
import apiClient from "@/app/configs/apiClient";
import { Transaction, User } from "@prisma/client";
import { UserContext } from "@/app/contexts/UserContext";
import { Message } from "@/app/HomeComponents/Chat";
import { Lexend_Tera } from "next/font/google";

interface Props {
  house: House | undefined;
}
const socket = io("http://localhost:8000");

const PaynowModal = ({ house }: Props) => {
  const [notiAccount, setNotiAccount] = useState<User>();
  const toast = useToast()
  const { user } = useContext(UserContext);

  useEffect(() => {
    apiClient
      .get<User>(`/users/${3}`)
      .then((res) => {
        setNotiAccount(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const myItems = [
    {
      title: `${house?.location.name} house No ${house?.houseNumber}`,
      amount: house?.price,
      image: house?.backgroundImage,
    },
  ];
  const submitMobilePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      senderId: user?.id,
      receiverId: house?.ownerId,
      amount: house?.price,
      houseId: house?.id,
    };
    apiClient
      .post("/transactions", data)
      .then((res) => {
        let token = "";
        for (let i = 1; i <= 16; i++) {
          const randInt = Math.floor(Math.random() * 9);
          token = token + randInt.toString();
        }

        console.log(token);
        socket.emit("joinChat", [house?.owner, notiAccount ]);
        socket.emit("joinChat", [ user,notiAccount]);
        const newMessageToTenant: Message = {
          sender: notiAccount.id,
          receiver: user?.id,
          body: `you have successfully  secured  a place at ${house?.location?.name} 
            house number ${house?.houseNumber}.Present your token ${token} to the owner. `,
          sentByMe: false,
          time: Date.now().toString(),
        };
        const newMessageToOwner: Message = {
          sender: notiAccount.id,
          receiver: house?.owner.id,
          body: `${user?.firstName}' '${user?.lastName} has successfully secured place at your residence ${house.location.name} 
            house number ${house?.houseNumber}. Verify with this token ${token}.`,
          sentByMe: false,
          time: Date.now().toString(),
        };

        socket.emit('message', newMessageToOwner)
        socket.emit('message', newMessageToTenant)
        toast({ title: "transaction completed, check your notifications", colorScheme: "green" });
        onClose()
      })
      .catch((err) => {
        toast({ title: "transaction completed, check your notifications", colorScheme: "red" });
        console.log(err)});
  };
  const submitWebPayment = () => {};
  const label = "wadii";
  const loading = false;

  const isMobilePayment = true;
  const error = false;
  const { isOpen, onClose } = useContext(FormModalContext);

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
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
                    <Image
                      rounded="xl"
                      src={item.image}
                      alt={item.title}
                      fallbackSrc="https://via.placeholder.com/150"
                    />
                  </Box>
                  <Box flex={1}>
                    <Flex justifyContent="space-between" w="full">
                      <Heading mb={1} fontSize="md" isTruncated={true}>
                        {item.title}
                      </Heading>
                      <Heading
                        fontWeight="medium"
                        fontSize="md"
                        flex={1}
                        pl={2}
                        textAlign="right"
                      >
                        {Intl.NumberFormat("en-us", {
                          style: "currency",
                          currency: "USD",
                        }).format(item?.amount)}
                      </Heading>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Box>
            <Divider py={2} />
            {isMobilePayment ? (
              <Box py={2} mt={4}>
                <form onSubmit={(e) => submitMobilePayment(e)}>
                  <FormControl py={2}>
                    <FormLabel>Mobile number</FormLabel>
                    <Input
                      type="number"
                      maxLength={10}
                      minLength={10}
                      autoComplete="off"
                      name="phone"
                      variant="flushed"
                      placeholder="0777777777"
                      required={true}
                    />
                    {error && (
                      <FormHelperText color="red.500">{error}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl py={2}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      autoComplete="off"
                      name="email"
                      placeholder="you@example.com"
                      variant="flushed"
                      required={true}
                    />
                  </FormControl>
                  <Box mt={4}>
                    <FormControl>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        type="submit"
                        isLoading={loading}
                      >
                        Pay RTGS$ {house?.price}
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
              <Box>
                {error && <Text color="red.500">{error}</Text>}
                <Button
                  colorScheme="blue"
                  mr={3}
                  isLoading={loading}
                  onClick={submitWebPayment}
                >
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
    </Modal>
  );
};
export default PaynowModal;

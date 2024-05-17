'use client'
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Signout = () => {
    const toast = useToast()
    const router = useRouter()
  useEffect(() => {
    localStorage.removeItem("token");

    window.location.replace('/')
    toast({title: " logged out succeessfully", position: 'top'})

  }, []);

  return null;
};

export default Signout;

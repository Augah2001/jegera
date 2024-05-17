"use client";

import Modal from "./components/Modal";
import SignInForm from "./HomeComponents/SignInForm";
import Link from "next/link";
import SignUpForm from "./HomeComponents/SignUpForm";
import Mainview from "./HomeComponents/Mainview";
import { useContext, useState } from "react";
import Chat from "./HomeComponents/ChatMessageInterface";
import { useConst } from "@chakra-ui/react";
import { ShowMessageContext } from "./contexts/ShowMessageContext";

export default function Home({}) {
  const [isSignIn, setIsSignIn] = useState(true);

  const { showMessage } = useContext(ShowMessageContext);

  return (
    <div>
      {
        <Modal
          modalBody={isSignIn ? <SignInForm /> : <SignUpForm />}
          headerContent={
            <h1 className="text-2xl">{isSignIn ? "login" : "register"}</h1>
          }
          footerContent={
            <div className="flex mx-6">
              {isSignIn ? (
                <p>{"don't have an account, sign up "} </p>
              ) : (
                <p>{"already have an account, sign in "} </p>
              )}
              <Link
                href={"/"}
                className="text-pink-700"
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
                {isSignIn ? "sign up" : "sign in"}
              </Link>
            </div>
          }
        />
      }
      <div className="bg-base-100 ">
        <Mainview />
      </div>
    </div>
  );
}

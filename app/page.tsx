"use client";

import Modal from "./components/Modal";
import SignInForm from "./HomeComponents/SignInForm";
import Link from "next/link";
import SignUpForm from "./HomeComponents/SignUpForm";
import Mainview from "./HomeComponents/Mainview";
import { useState } from "react";

export default function Home({}) {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div>
      {
        <Modal
          modalBody={isSignIn ? <SignInForm /> : <SignUpForm />}
          headerContent={<h1 className="text-2xl">Login</h1>}
          footerContent={
            <div className="flex mx-6">
              {isSignIn ? (
                <p>{"don't have an account,  "} </p>
              ) : (
                <p>{"already have an account,  "} </p>
              )}
              <Link
                href={"/"}
                className="text-pink-700"
                onClick={() => {
                  setIsSignIn(!isSignIn);
                }}
              >
                {isSignIn ? " sign up" : " sign in"}
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

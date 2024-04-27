import React from "react";

import Modal from "../ui/Form/Modal";
import Link from "next/link";
import SignUpForm from "../components/Form/SignUpForm";
import SignInForm from "../components/Form/SignInForm";

const page = () => {
  return (
    <div>
      <Modal
        modalBody={<SignInForm />}
        headerContent={<h1 className="text-2xl">Login</h1>}
        footerContent={
          <div className="flex mx-6">
            <p>{"don't have an account,  "} </p>{" "}
            <Link href={"/"} className="text-pink-700">
              {" sign up"}{" "}
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default page;

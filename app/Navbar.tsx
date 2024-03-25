import React, { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import GradientDiv from "./components/GradientDiv";
import Image from "next/image";
import logo from "./assets/Untitled-sss7.png";
import { Button } from "@radix-ui/themes";
import ColorModeSwitch from "./components/ColorModeSwitch";

const Navbar = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <div className="bg-base-100">
      <div className="bg-base-100 min-h-14 flex justify-between">
        <div className="bg-base-100 min-h-14 flex">
          <Image className="h-9 w-9  mt-2 ms-5" src={logo} alt="no photo" />
          <p className="text-2xl mt-2 ms-3 text-pink-700 font-bold text-center ">
            jegera
          </p>
        </div>
        <div className="pe-5 pt-2 ">
          
          <ColorModeSwitch/>
          
          <Button className="bg-gradient-to-r to-pink.300 from-purple-600 me-5" style={{marginTop: '4px'}}>
            sign up
          </Button>
          
        </div>
      </div>

      <GradientDiv />
    </div>
  );
};

export default Navbar;

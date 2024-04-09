import React, { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import GradientDiv from "./components/GradientDiv";
import Image from "next/image";
import logo from "./assets/Untitled-sss7.png";
import { Button } from "@radix-ui/themes";
import ColorModeSwitch from "./components/ColorModeSwitch";
import NavSearchComponent from "./components/NavSearchComponent";
import { animated, useSpring } from "react-spring";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ hasScrolled }: { hasScrolled: boolean }) => {
  
  const path = usePathname();
  
  const springProps = useSpring({
    opacity: !hasScrolled ? 0 : 1, // Adjust opacity values for desired fade effect
    from: { opacity: 0 }, // Set initial opacity for smooth transitionl
    config: { duration: 150 }, // Adjust duration for transitikkkkon speed (in milliseconds)
  });

  return (
    <div className="bg-transparent z-10 ">
      <div className="bg-base-100 min-h-20 flex justify-between navbar fixed top-0 left-0 w-screen z-10">
        <Link href = './'>
          <div className="bg-base-100 min-h-20 pt-5 flex">
            <Image className="h-9 w-9  mt-2 ms-5" src={logo} alt="no photo" />
            <p className="pointer-cursor text-2xl mt-2 ms-3 text-pink-700 font-bold text-center ">
              musoro
            </p>
          </div>
        </Link>
        {path === '/' && <div>
          {
            <animated.div style={springProps}>
              {<NavSearchComponent />}
            </animated.div>
          }
        </div>}
        <div className="pe-5 pt-2 ">
          <ColorModeSwitch />

          <Button
            className="bg-gradient-to-r  to-pink.300 from-purple-600 h-[36px] me-5 cursor-pointer"
            style={{ marginTop: "4px" }}
          >
            sign up
          </Button>
        </div>
      </div>

      <div className="mt-[95px]">
        <GradientDiv />
      </div>
    </div>
  );
};

export default Navbar;

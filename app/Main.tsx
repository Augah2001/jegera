"use client";

import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { ThemeContext } from "./contexts/ThemeContext";
import { ReactNode, useState } from "react";
import Navbar from "./Navbar";

interface Props {
  childrenNode: ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

const Main = ({ childrenNode }: Props) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <html lang="en" data-theme="pastel">
      <body className="min-h-full bg-base-100   ">
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <Theme>
            <Navbar />

            {childrenNode}
          </Theme>
        </ThemeContext.Provider>
      </body>
    </html>
  );
};

export default Main;

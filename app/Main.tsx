"use client";

import { Inter } from "next/font/google";
import { Button, Theme } from "@radix-ui/themes";
import { ThemeContext } from "./contexts/ThemeContext";
import "./HomeComponents/beepingButton.css";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Navbar from "./NavBar/Navbar";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { SearchContext } from "./contexts/SearchContext";
import { ShowMapContext } from "./contexts/ShowMapContext";
import theme from "./configs/theme";
import { FormModalContext } from "./contexts/FormModalContext";
import { User, UserContext, UserContextType } from "./contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import Script from "next/script";
import { mapLocationContext } from "./contexts/mapLocationContext";
import { GetCoordinatesContext } from "./contexts/GetCoordinatesContext";
import { HouseCoordinatesContext } from "./contexts/HouseCoordinatesContext";
import { HouseErrorInputContext } from "./contexts/HouseInputErrorContext";
import { Location } from "./hooks/useLocations";
import { LocationContext } from "./contexts/locationContext";
import { ShowMessageContext } from "./contexts/ShowMessageContext";
import { HousesContext } from "./contexts/HouseContext";
import useHouses, { House } from "./hooks/useHouses";
import { HouseContext } from "./contexts/SelectedHouseContext";
import { ShowChatsContext } from "./contexts/ShowChatsContext";
import { ChatContext } from "./contexts/SelectedChatContext";
import { Chat } from "./HomeComponents/Chats";

interface Props {
  childrenNode: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Main = ({ childrenNode }: Props) => {
  const { data } = useHouses();
  const [houseCoordinates, setHouseCoordinates] = useState<number[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mapLocation, setMapLocation] = useState<any>({});
  const [getCoordinates, setGetCoordinates] = useState(false);
  const [location, setLocation] = useState<Location | undefined>();
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollThreshold = 5;
  const [errorInput, setErrorInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [houses, setHouses] = useState<House[]>();
  const [selectedHouse, setSelectedHouse] = useState<House>();
  const [showMap, setShowMap] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [chat, setChat] = useState<Chat>()

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setHasScrolled(scrolled);
    };

    setHouses(data);

    window.addEventListener("scroll", onScroll);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const loggedUser: User = jwtDecode(token);
        setUser(loggedUser);
      }
    } catch (ex) {}

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold, data]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <html lang="en" data-theme="pastel" onScroll={() => console.log("augah")}>
      <body className={` ${inter.className} min-h-full bg-base-100`}>
        {/* <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></Script> */}

        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
          type="text/css"
        />

        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <Script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js"></Script>
        {/* <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css"
          type="text/css"
        /> */}
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          <SearchContext.Provider
            value={{ searchValue, setSearchValue, selectValue, setSelectValue }}
          >
            <ShowMapContext.Provider value={{ showMap, setShowMap }}>
              <ChakraProvider theme={theme}>
                <Theme>
                  <UserContext.Provider value={{ user, setUser }}>
                    <FormModalContext.Provider
                      value={{ onOpen, onClose, isOpen }}
                    >
                      <mapLocationContext.Provider
                        value={{ mapLocation, setMapLocation }}
                      >
                        <GetCoordinatesContext.Provider
                          value={{ getCoordinates, setGetCoordinates }}
                        >
                          <HouseCoordinatesContext.Provider
                            value={{ houseCoordinates, setHouseCoordinates }}
                          >
                            <HouseErrorInputContext.Provider
                              value={{
                                error: errorInput,
                                setError: setErrorInput,
                              }}
                            >
                              <LocationContext.Provider
                                value={{ location, setLocation }}
                              >
                                <ShowMessageContext.Provider
                                  value={{ showMessage, setShowMessage }}
                                >
                                  <HouseContext.Provider
                                    value={{ selectedHouse, setSelectedHouse }}
                                  >
                                    <HousesContext.Provider
                                      value={{ houses, setHouses }}
                                    >
                                      <ShowChatsContext.Provider value={{showChats, setShowChats}}>
                                        <ChatContext.Provider value={{chat, setChat}}>
                                          <Navbar hasScrolled={hasScrolled} />
                                          {childrenNode}
                                        </ChatContext.Provider>
                                      </ShowChatsContext.Provider>
                                    </HousesContext.Provider>
                                  </HouseContext.Provider>
                                </ShowMessageContext.Provider>
                              </LocationContext.Provider>
                            </HouseErrorInputContext.Provider>
                          </HouseCoordinatesContext.Provider>
                        </GetCoordinatesContext.Provider>
                      </mapLocationContext.Provider>
                    </FormModalContext.Provider>
                  </UserContext.Provider>
                </Theme>
              </ChakraProvider>
            </ShowMapContext.Provider>
          </SearchContext.Provider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
};

export default Main;

"use client";

import { Inter } from "next/font/google";

import { ThemeContext } from "./contexts/ThemeContext";
import "./HomeComponents/beepingButton.css";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./NavBar/Navbar";
import { Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
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
import { Message } from "./HomeComponents/Chat";
import { MessagesContext } from "./contexts/MessagesContext";
import { ChatsContext } from "./contexts/ChatsContext";
import { MessageContext } from "./contexts/MessageContext";
import { InitialHousesContext } from "./contexts/InitialDataContext";
import apiClient from "./configs/apiClient";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ResponsiveContext } from "./contexts/ResponseContext";
import { Theme } from "@radix-ui/themes";



interface Props {
  childrenNode: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const Main = ({ childrenNode }: Props) => {

  const router = useRouter()
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
  const [initialHouses, setInitialHouses] = useState<House[]>();
  const [selectedHouse, setSelectedHouse] = useState<House>();
  const [showMap, setShowMap] = useState(false);
  const path = usePathname()
  const [showMessage, setShowMessage] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [chatUser, setChatUser] = useState<User>()
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>({} as Message);
  const [chats, setChats] = useState<Chat[]>();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
const isMediumDevice = useMediaQuery(
  "only screen and (min-width : 769px) and (max-width : 992px)"
);
const isLargeDevice = useMediaQuery(
  "only screen and (min-width : 993px) and (max-width : 1200px)"
);
const isExtraLargeDevice = useMediaQuery(
  "only screen and (min-width : 1201px)"
);
  

  useEffect(() => {
    apiClient.get<House[]>('/houses').
    then(res=> setInitialHouses(res.data) ).catch(err=> console.log(err))
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
        {path !== '/predict' && <div className="flex justify-end pe-5 fixed z-50 top-[150px] ms-5">
          <Button
            className="beeping-button text-white px-3 cursor-pointer font-medium text-2xl h-14 rounded-3xl bg-[#2a1d57]   transform translate(-50%, -50%)"
            onClick={() => {
              
              router.push('/predict')}}
          >
            predict
          </Button>
        </div>}
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
                                        <ChatContext.Provider value={{chatUser, setChatUser}}>
                                          <MessagesContext.Provider value={{messages, setMessages}}>
                                            <ChatsContext.Provider value={{chats, setChats}}>
                                              <MessageContext.Provider value={{message, setMessage}}>
                                                <InitialHousesContext.Provider value={{initialHouses, setInitialHouses}}>
                                                  <ResponsiveContext.Provider value={{isSmallDevice,isExtraLargeDevice,isLargeDevice,isMediumDevice}}>
                                                    <Navbar hasScrolled={hasScrolled} />
                                                    {childrenNode}
                                                  </ResponsiveContext.Provider>
                                                </InitialHousesContext.Provider>
                                              </MessageContext.Provider>
                                            </ChatsContext.Provider>
                                          </MessagesContext.Provider>
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

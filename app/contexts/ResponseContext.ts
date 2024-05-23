import { useMediaQuery } from "@uidotdev/usehooks";
import { createContext } from "react";

interface ResponsiveContext {
   
    isSmallDevice: boolean,
    isMediumDevice: boolean,
    isLargeDevice: boolean,
    isExtraLargeDevice: boolean
}

export const ResponsiveContext = createContext<ResponsiveContext>({}as ResponsiveContext)

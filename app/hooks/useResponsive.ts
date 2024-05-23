import { useContext } from "react";
import { ResponsiveContext } from "../contexts/ResponseContext";


export const useResponsive = () => useContext(ResponsiveContext)
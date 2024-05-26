import { createContext, Dispatch, SetStateAction } from "react"
import { Location } from "../hooks/useLocations"
import { House } from "../hooks/useHouses"


interface HousesContextType {

    houses: House[] | undefined,
    setHouses: Dispatch<SetStateAction<House[] | undefined>>
}



export const HousesContext = createContext<HousesContextType>({} as HousesContextType)
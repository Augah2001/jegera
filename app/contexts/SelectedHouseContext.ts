import { createContext, Dispatch, SetStateAction } from "react"
import { Location } from "../hooks/useLocations"
import { House } from "../hooks/useHouses"


interface HouseContextType {

    selectedHouse: House | undefined,
    setSelectedHouse: Dispatch<SetStateAction<House | undefined>>
}



export const HouseContext = createContext<HouseContextType>({} as HouseContextType)
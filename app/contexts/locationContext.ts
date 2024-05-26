import { createContext, Dispatch, SetStateAction } from "react"
import { Location } from "../hooks/useLocations"


interface LocationContextType {

    location: Location | undefined,
    setLocation: Dispatch<SetStateAction<Location | undefined>>
}



export const LocationContext = createContext<LocationContextType>({} as LocationContextType)
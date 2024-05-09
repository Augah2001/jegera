

import { createContext, Dispatch, SetStateAction } from "react";




export interface HouseCoordinatesType {

    houseCoordinates: number[];
    setHouseCoordinates: Dispatch<SetStateAction<number[]>>
}


export const HouseCoordinatesContext = createContext<HouseCoordinatesType>({} as HouseCoordinatesType)
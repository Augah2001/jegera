import { createContext, Dispatch, SetStateAction } from "react";




interface GetCoordinatesType {

    getCoordinates: boolean;
    setGetCoordinates: Dispatch<SetStateAction<boolean>>
}


export const GetCoordinatesContext = createContext<GetCoordinatesType>({} as GetCoordinatesType)
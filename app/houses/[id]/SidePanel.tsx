import { List, ListItem, Button, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import Main from "./Main";
import { House } from "@/app/hooks/useHouses";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import Pay from "./Pay";

interface Props {
  house: House | undefined;
}

interface Amenity {
  name: string;
}


const SidePanel = ({ house }: Props) => {
  const {onOpen} = useContext(FormModalContext)

  return (

    <>
    <Pay house={house}/>
    <div className="w-[23%] ms-3 flex border-e-2">
      <div className="top-[25%] ">
        <div className="flex mb-4">
          <h1 className="mt-14 text-2xl text-pink-700 ">Amenities</h1>
        </div>

        <div className="flex flex-wrap ms-1">
          {house?.services?.map((amenity, index) => (
            <Main key={index} text={amenity.name} />
          ))}
          <Main text= {house?.gender as string}/>
          <Main text= {`${house?.perRoom} per room` as string}/>
          <Main text= {`capacity: ${house?.capacity} ` as string}/>
          <Main text= {`occupied: ${house?.occupied}` as string}/>
          <Main text= {`${house?.minutes} minutes` as string}/>
          <Main text= {`${house?.location.name}` as string}/>
          <Main text= {`${house?.street}` as string}/>
        </div>
        <div className="flex">
          <div className="me-3">
            <Button
              className="text-base-content  bg-purple-700 text-2xl"
              color={"white"}
              bg={"purple.700"}
              minH={12}
              minW={"100px"}
              size={'xl'}
              _hover={{opacity: 0.7}}
              _active={{opacity: 1}}
              onClick={onOpen}
             
            >
              claim
            </Button>
            <h1 className="mt-14 text-2xl mb-3  text-pink-700">more details</h1>

            <div className="flex">
              <p className={` text-base-content font-medium ms-2 "mt-3 me-4"`}>
                {house?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SidePanel;

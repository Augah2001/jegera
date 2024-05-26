"use client";
import React, { useContext, useEffect, useState } from "react";
import AddForm from "../../AddForm";
import Modal from "@/app/components/Modal";
import { FormModalContext } from "@/app/contexts/FormModalContext";
import MyMap from "@/app/HomeComponents/Map";
import { mapLocationContext } from "@/app/contexts/mapLocationContext";
import { Button } from "@chakra-ui/react";
import { SelectErrorContext } from "@/app/contexts/SelectErrorContext";
import { GetCoordinatesContext } from "@/app/contexts/GetCoordinatesContext";
import MultiStepForm from "../../add/MultiStepForm";
import { UserContext } from "@/app/contexts/UserContext";
import { useRouter } from "next/navigation";
import P from "@/app/fobbiden/page";

const Page = ({params: {editId}}: {params: {editId: string}}) => {
  const [_, setHasScrolled] = useState(false);
  const { onClose } = useContext(FormModalContext);

  const { mapLocation, setMapLocation } = useContext(mapLocationContext);
  const { getCoordinates } = useContext(GetCoordinatesContext);
  const [error, setError] = useState("");

  const {user} = useContext(UserContext)
  const router = useRouter()
  if (!user || user.accountType !== 'landlord') {
    router.push('/fobbiden')
    return <P/>
  }

  const handleSave = () => {
    setError("");

    onClose();
  };


  const handleDelete = () => {
    setMapLocation({});

    onClose();
  };

  

  return (
    <div className="flex justify-center w-[100%]">
      <Modal
        headerContent={<p>Select Location {"(use search)"}</p>}
        modalBody={
          <>
            {typeof mapLocation === "object" &&
              Object.keys(mapLocation).length !== 0 && (
                <div className=" w-full">
                  {!getCoordinates && (
                    <div>
                      <p className="text-slate-700  text-lg font-bold">
                        Verify location
                      </p>
                      {
                        <p className="text-green-600 text-md font-bold">
                          {mapLocation.result?.place_name}
                        </p>
                      }
                      <div className="flex my-2 ">
                        {" "}
                        <Button
                          bg="green.500"
                          className="me-4"
                          size={"sm"}
                          color="white"
                          _hover={{ opacity: 0.7 }}
                          onClick={handleSave}
                        >
                          save
                        </Button>
                        <Button
                          bg="red.500"
                          size={"sm"}
                          color="white"
                          _hover={{ opacity: 0.7 }}
                          onClick={handleDelete}
                        >
                          delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            <MyMap
              setHasScrolled={setHasScrolled}
              options={{ marker: false, directions: false, search: true }}
            />
          </>
        }
      />

      <SelectErrorContext.Provider value={{ error, setError }}>
        {/* <HouseCoordinatesContext.Provider value={{HouseCoordinates, setHouseCoordinates}}> */}
        <div className="">
          <MultiStepForm houseId= {editId} />
          {/* <PriceForm/> */}
        </div>
        {/* </HouseCoordinatesContext.Provider> */}
      </SelectErrorContext.Provider>
    </div>
  );
};

export default Page;

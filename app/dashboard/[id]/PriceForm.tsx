import Form, { RenderInput } from "@/app/components/Form/FormTemplate";
import apiClient from "@/app/configs/apiClient";
import { HouseContext } from "@/app/contexts/SelectedHouseContext";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import HouseCard from "@/app/HomeComponents/HouseCard";
import { Button, Input } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { Location } from "@/app/hooks/useLocations";
import axios from "axios";

const PriceSchema = z.object({
  price: z.number({ invalid_type_error: "Price is required" }).positive(),
});

interface Props {
  HouseData: { [key: string]: any };
  setHouseData: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  prevStep: () => void;
}

const PriceForm = ({ HouseData, setHouseData, prevStep }: Props) => {


  const { isDark } = useContext(ThemeContext);
  const [predictData, setPredictData] = useState({});
  const [data, setData] = useState({
    price: NaN,
  });
  const [error, setError] = useState<string>();
  console.log(HouseData);
  const [location,setLocation] = useState<Location>()

  useEffect(()=> {
    apiClient.get<Location>(`locations/${HouseData.locationId}`).
    then(res => {
        setPredictData({...predictData, Location: res.data.name})
    }).catch(err=> console.log(err))
    
    
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const validateBody = PriceSchema.safeParse(data);
    if (!validateBody.success) {
      const error = validateBody.error.errors[0].message;
      setError(error);
      return;
    }
  };

  const services = [
    "wifi",
    "backupPower",
    "Stove",
    "Fridge",
    "separate_kitchen",
    "curfew",
    "visitors",
    "Shelves",
    "Water_tank",
    "maid",
    "gas_stove",
    "gyser",
    "swimming_pool",
    "beds",
    "security",
    "meals",
  ];

  console.log(HouseData.services);
  console.log(services);

  const handlePredict = () => {
    const serviceNames = new Set(
      HouseData.services.map((service: any) => service.name)
    );

    let data = {}; // Initialize data as an empty object

    for (let s of services) {

        if (s!== 'Shelves') {
            data[s] = serviceNames.has(s) ? 1 : 0; // Use a ternary operator for compactness
        } else {
            data[s] = serviceNames.has(s) ? 'yes' : 'no'; // Use a ternary operator for compactness
        }
       
        
    }

    data['distance'] = 2.456
    data['per_room'] = HouseData.perRoom
    data['gender'] = HouseData.gender
    data['Location'] = 'mt_pleasant'

    console.log(data)
    axios.post('http://localhost:8000/predict/', data).
    then(res=> console.log(res.data))
  };
  return (
    <form onSubmit={(data) => handleSubmit(data)}>
      <div className="flex justify-between mt-8">
        {
          <Button
            bg="yellow.400"
            color="white"
            marginX={3}
            onClick={prevStep}
            _hover={{ opacity: 0.8 }}
          >
            Back
          </Button>
        }
        {
          <Button
            bg="green.500"
            color="white"
            _hover={{ opacity: 0.8 }}
            type="submit"
          >
            Next
          </Button>
        }
      </div>
      <div className="flex ">
        <div className="m-auto p-10">
          <div className="flex">
            <p className="text-slate-600 text-lg font-medium mx-auto ">
              {" "}
              use our intelligent prediction engine to predict a competitive
              price
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              onClick={handlePredict}
              width={"50%"}
              height={"60px"}
              bg={"blue.500"}
              className="text-2xl"
              color={"white"}
              _hover={{ bg: "blue.500", opacity: 0.8 }}
            >
              Predict
            </Button>
          </div>
          <div className="flex pt-12 justify-center items-center">
            <Input
              width={"50%"}
              type={"number"}
              placeholder="Price"
              height={12}
              focusBorderColor="purple.500"
              borderRadius="6px"
              _focus={{
                borderWidth: "1.5px",
                borderStyle: "solid",
                bg: isDark ? "#302E5E" : "#ECECEC",
              }}
              marginY={"auto"}
              _hover={{ borderWidth: "1.5px", borderStyle: "solid" }}
              marginX="auto"
              variant="outline"
              borderStyle={"solid"}
              borderWidth={"2px"}
              borderColor="purple.500"
              className="text-base-content bg-base-100 m-auto"
              value={data.price}
              onChange={(e) => {
                setData({ ...data, price: parseInt(e.currentTarget.value) });
              }}
            />
          </div>
          <div className="flex justify-center mt-2">
            {error && (
              <p className="text-red-600 mx-4 mt-1 font-medium">{error}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PriceForm;

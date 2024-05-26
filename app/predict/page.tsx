"use client";
import React, { useContext, useState } from "react";
import Form, {
  RenderCheckbox,
  RenderInput,
  RenderSelect,
} from "../components/Form/FormTemplate";
import { Button } from "@chakra-ui/react";
import { boolean, z } from "zod";
import { distance } from "framer-motion";
import LocationSelect from "../dashboard/[id]/add/LocationSelect";
import { LocationContext } from "../contexts/locationContext";
import Slide from "./Slide";
import axios from "axios";
import { Location } from "../hooks/useLocations";
import { mappings } from "../configs/location mappings";
import { predictSchema } from "./schema";



const Page = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [data, setData] = useState<any>();
  const [location, setLocation] = useState<Location>()
  const [box, setBox] = useState<number>()
  const [locationError, setLocationError] = useState("")

  
  const [error, setError] = useState("");
  const [slideError, setSlideError] = useState("");


  const handlePredict = (myData: any ) => {

    
    setError('')
    setSlideError('')
    if (!location) {
      setError("Location is required")
      return
    }

    if (!sliderValue ) {
      setSlideError('Minutes are required')
      return
    }

    console.log(slideError)
    const predictData: any = {}
    
    Object.keys(myData).forEach((key :any)=> {
        if (typeof myData[key] === 'boolean') {
          if (key === 'Shelves') {
            if (myData[key] === true) {predictData[key] = 'yes'} else {predictData[key] ='no'}
          } else {
            if (myData[key] === true) {
            
              predictData[key] = 1 }
            else { predictData[key] = 0}
          }
          
        }
    })

    
    const locationName = location.name.toLowerCase()

    const coefficient = mappings[locationName]
    if (!coefficient) {
      setLocationError("sorry, location not supported")
      return
    }
    console.log(coefficient )
    console.log(Math.log(sliderValue * coefficient))
    predictData["distance"] = Math.log(sliderValue * coefficient);
    predictData["per_room"] = myData.perRoom;
    predictData["gender"] = myData.gender;
    predictData["Location"] = locationName

    



   
    console.log(data);
    axios
      .post("http://localhost:8000/predict/", predictData)
      .then((res) => {
        setBox(res.data)
        console.log(res.data)
        // setData({...data, price: res.data})
        
        
        
      }).catch(err => console.log(err));
  };

 
  return (
    <Form onSubmit={handlePredict} FormSchema={predictSchema}>
      
      {(renderInput: RenderInput, renderSelect: RenderSelect, renderCheckbox: RenderCheckbox) => {
        return (
          <>
          
            <div className="flex justify-center mt-4">
            <Button
              
            
              type="submit"
             minW={'150px'}
              height={"60px"}
              bg={"blue.500"}
              className="text-2xl"
              color={"white"}
              _hover={{ bg: "blue.500", opacity: 0.8 }}
            >
              Predict
            </Button>
            <div
            className="bg-base-300 shadow-xl border-solid border-blue-500 flex ms-3   w-[150px] h-[60px]"
            style={{ borderWidth: "2px" }}
          >
            {box && <h1 className="m-auto font-semibold text-base-content ">{`$ ${box?.toString().slice(0,5)}`}</h1>}
          </div>
          </div>
          <div className="flex justify-center">{locationError &&  <p className="text-red-600 mx-4 mt-1 font-medium">{locationError}</p>}</div>
            <div className="flex justify-between mt-8"></div>
            <div className=" rounded-md">
              <div className="flex px-4 ">
              
                <Slide
                error= {slideError}
                setError={setSlideError}
                  setSliderValue={setSliderValue}
                  sliderValue={sliderValue}
                />
              </div>
              <div className="mt-[20px] mx-8  grid grid-cols-3 gap-3 pt-4 ">
              {renderInput("perRoom", "number", "People per room *")}
              
              <LocationSelect
                    location={location}
                    id="location"
                    label="Location"
                    setLocation={setLocation}
                    error={error}
                    setError={setError}
                  />
                {renderSelect("gender", "Gender *", [
                  { id: "boys", name: "Male" },
                  { id: "girls", name: "Female" },
                  { id: "both", name: "Both" },
                ])}
              </div>
              <div className="mt-[20px] mx-8  grid grid-cols-4 gap-3 pt-4 ">
              
              
                {renderCheckbox("wifi", "Wifi")}
                {renderCheckbox("meals", "Meals")}
                {renderCheckbox("backupPower", "Backup Power")}
                {renderCheckbox("Stove", "Stove")}
                {renderCheckbox("Fridge", "Fridge")}
                {renderCheckbox("separate_kitchen", "Separate Kitchen")}
                {renderCheckbox("curfew", "Curfew")}
                {renderCheckbox("visitors", "Visitors Allowed")}
                {renderCheckbox("Shelves", "Shelves")}
                {renderCheckbox("Water_tank", "Water Tank")}
                {renderCheckbox("maid", "Maid")}
                {renderCheckbox("gas_stove", "Gas Stove")}
                {renderCheckbox("gyser", "Gyser (Water Heater)")}
                {renderCheckbox("swimming_pool", "Swimming Pool")}
                {renderCheckbox("beds", "Beds")}
                {renderCheckbox("security", "Security Features")}
                
              </div>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default Page;

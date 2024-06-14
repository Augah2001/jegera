"use client";
import React, { useContext, useEffect, useState } from "react";
import Form, {
  RenderCheckbox,
  RenderInput,
  RenderSelect,
} from "../components/Form/FormTemplate";
import { Button } from "@chakra-ui/react";
import { boolean, z } from "zod";
import { distance } from "framer-motion";
import { LocationContext } from "../contexts/locationContext";
import axios from "axios";
import { Location } from "../hooks/useLocations";
import { mappings } from "../configs/location mappings";
import * as schema from "./schema";
import { useResponsive } from "../hooks/useResponsive";



const Predict = () => {
  const [paragraph, setParagraph] = useState("");

  const [currentCharParagraph, setCurrentCharParagraph] = useState(0);
  const [predictedValue, setPredictedValue] = useState<number>();
  const paragraphText =
    "use our intelligent prediction engine to predict cost";
  

 

  const delayPrint = (
    currentChar: number,
    setCurrentChar: React.Dispatch<React.SetStateAction<number>>,
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    element: string
  ) => {
    setTimeout(() => {
      if (currentChar < text.length) {
        setText(element + text.charAt(currentChar));
        setCurrentChar(currentChar + 1);
      }
    }, 15);
  };

  useEffect(() => {
    delayPrint(
      currentCharParagraph,
      setCurrentCharParagraph,
      paragraphText,
      setParagraph,
      paragraph
    );
  
  }, [currentCharParagraph]);



 
  const [sliderValue, setSliderValue] = useState<number>(0);

  const [box, setBox] = useState<number>()
  const [locationError, setLocationError] = useState("")

  
  const [error, setError] = useState("");
  const [slideError, setSlideError] = useState("");

  const {isSmallDevice} =useResponsive()
  const handlePredict = (myData: any ) => {

    
   

    console.log(myData)


    


  

    
    


   

    axios
      .post("https://construction-house-price-prediction-1.onrender.com/predictBMI", myData)
      .then((res) => {
        setBox(res.data)
        console.log(res.data)
        // setData({...data, price: res.data})
        
        
        
      }).catch(err => console.log(err));
  };



  const  dict = ['inflationrate', 'imports', 'exports', 'moneysupplym1']

 
  return (
    <Form onSubmit={handlePredict} FormSchema={schema.predictSchema}>
      
      {(renderInput: RenderInput, renderSelect: RenderSelect, renderCheckbox: RenderCheckbox) => {
        return (
          <>
          
          <div className="flex mt-8 mb-2 mx-4">
            <p
              className="  text-slate-600 text-lg font-medium mx-auto "
              id="my-paragraph"
            >
              {" "}
              {paragraph}
            </p>
          </div>
            <div className="flex justify-center  px-4">
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
            className="bg-base-300 shadow-xl border-solid border-blue-500 flex ms-3   w-[50%] h-[60px]"
            style={{ borderWidth: "2px" }}
          >
            {box && <h1 className="m-auto font-semibold text-base-content ">{ box}</h1>}
          </div>
          </div>
          
          <div className="flex justify-center">{locationError &&  <p className="text-red-600 mx-4 mt-1 font-medium">{locationError}</p>}</div>
      
            <div className="">
              <div className=" rounded-md">
              
              
                <div className={`mt-[20px] mx-2  grid ${isSmallDevice? 'grid-cols-1': 'grid-cols-2' }  gap-3 pt-4 `}>
              
              
                {dict.map(key =>  <>
                  {renderInput(key, 'number', key)}
                </>)}
              
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default Predict;

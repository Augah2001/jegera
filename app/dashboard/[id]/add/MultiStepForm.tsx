import { Component, useState } from "react";
import AddForm from "../AddForm";
import ImagesForm from "../ImagesForm";
import ServicesForm from "../ServicesForm";
import StepperComponent from "./Stepper";
import { Button } from "@chakra-ui/react";
import { steps } from "framer-motion";
import { title } from "process";
import PriceForm from "../PriceForm";


interface Props {
  houseId?: string
}

const MultiStepForm = ({houseId}: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [houseData, setHouseData] = useState<{ [key: string]: string }>({});

  const nextStep = () => {
    setCurrentStep(() => currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(() => currentStep - 1);
  };

  const renderStepContent = () => {
    return steps[currentStep].component;
  };

  const steps = [
    {
      title: "basic details",
      component: (
        <AddForm
          houseData={houseData}
          setHouseData={setHouseData}
          nextStep={nextStep}
          currentStep={currentStep}
          prevStep={prevStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    
    {
      title: "images",
      component: (
        <ImagesForm
          nextStep={nextStep}
          houseData={houseData}
          setHouseData={setHouseData}
          currentStep={currentStep}
          prevStep={prevStep}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    
    {
      title: "amenities",
      component: (
        <ServicesForm
          currentStep={currentStep}
          houseData={houseData}
          setHouseData={setHouseData}
          prevStep={prevStep}
          setCurrentStep={setCurrentStep}
          nextStep = {nextStep}
        />
      ),
    },
    {title: "price", component: <PriceForm houseId= {houseId} prevStep={prevStep} HouseData={houseData} setHouseData={setHouseData}/>}
  ];

  return (
    <div className="w-screen flex  my-6 mb-7">
      <div className="w-[60%] shadow-xl mx-auto min-h-[100vh] ">
        <StepperComponent steps={steps} currentStep={currentStep} />

        {renderStepContent()}
        {/* <ImagesForm
          nextStep={nextStep}
          houseData={houseData}
          setHouseData={setHouseData}
          currentStep={currentStep}
          prevStep={prevStep}
          setCurrentStep={setCurrentStep}
        /> */}
      </div>
    </div>
  );
};

export default MultiStepForm;

import { useState } from 'react';
import AddForm from '../AddForm';
import ImagesForm from '../ImagesForm';
import ServicesForm from '../ServicesForm';
import StepperComponent from './Stepper';
import { Button } from '@chakra-ui/react';
import { steps } from 'framer-motion';

const MultiStepForm = () => {

    const [currentStep, setCurrentStep] = useState(0);
    
      
  

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
    { title: "basic details", component: <AddForm nextStep={nextStep} currentStep={currentStep} prevStep={prevStep} setCurrentStep={setCurrentStep} /> },
    { title: "images", component: <ImagesForm nextStep={nextStep} currentStep={currentStep} prevStep={prevStep} setCurrentStep={setCurrentStep} /> }, 
    { title: "amenities", component: <ServicesForm currentStep={currentStep} prevStep={prevStep} setCurrentStep={setCurrentStep}  /> },
  ];

  return (
    <div className='w-screen flex  my-6 mb-7'>
      <div className='w-[60%] shadow-xl mx-auto min-h-[100vh] '>

          <StepperComponent  steps={steps} currentStep={currentStep}/>
          
          {renderStepContent()}
          
          
      </div>
    </div>
  );
};

export default MultiStepForm
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps } from "@chakra-ui/react"
import { ReactNode } from "react";


export interface Step {
    title: string;
    component: ReactNode
}

interface Props {
    steps: Step[]
    currentStep: number
}
  
  function StepperComponent ({steps, currentStep}: Props) {
    
   


    
  
    return (
      <Stepper className="mx-14 mb-10" size={'lg'} colorScheme="green" index={currentStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              {/* <StepDescription>{step.description}</StepDescription> */}
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }
  
export default StepperComponent
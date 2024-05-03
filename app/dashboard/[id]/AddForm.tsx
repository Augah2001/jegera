import Form from "@/app/components/Form/FormTemplate";
import { ReactNode } from "react";
import { z } from "zod";

export const houseSchema = z.object({
    location: z.object({
      locationId: z.number(), // Reference to existing Location model
    }),
    houseNumber: z.number(),
    street: z.string(),
    description: z.string(),
    price: z.number(),
    minutes: z.number(),
    capacity: z.number(),
    occupied: z.boolean(),
    perRoom: z.number(), // Per room price can be optional
    gender: z.enum(['male', 'female', 'both']),
    images: z.array(z.string()),
    backGroundImage: z.string(),
    curfew: z.number(),
    owner: z.object({
      ownerId: z.number(), // Reference to existing User model
    }),
    services: z.array(z.number()).optional(), // Allow optional service IDs
  });

  type RenderInput = (id: string, type: string, label: string) => ReactNode;

  type RenderButton = (label: string) => ReactNode;
  
  type RenderSelect = (
    id: string,
    label: string,
    options: Array<{ value: string; label: string }>,
    handleInputChange?: (event: {
      target: {
        value: any;
      };
    }) => void
  ) => ReactNode;

  type RenderCheckbox = (
    id: string,
  
    type: string,
    label: string
  ) => ReactNode;
  

const AddForm = () => {
  return (
    <Form
    
      onSubmit={()=> {}}
      FormSchema={houseSchema}
    >
      {(
        renderInput: RenderInput,
        renderSelect: RenderSelect,
        renderCheckbox: RenderCheckbox,
        renderButton: RenderButton
      ) => {
        return (
          <>
            
          </>
        );
      }}
    </Form>
  )
}

export default AddForm

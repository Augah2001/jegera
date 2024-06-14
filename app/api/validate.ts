
import { boolean, z } from "zod";

// **User Model Validation**
export const schemaUser = z.object({
  email: z.string().email(), // Ensure valid email format
  firstName: z.string(), // Allow non-empty strings
  lastName: z.string().optional(), // Optional last name
  password: z.string().min(8).max(72), // Enforce password length
});

// **Transaction Model Validation**
export const schemaTransaction = z.object({
  senderId: z.number().positive(), // Ensure positive sender ID
  receiverId: z.number().positive(), // Ensure positive receiver ID
  amount: z.number().nonnegative(), // Enforce non-negative amount
  time: z.date().optional(), // Allow optional time (may need adjustment based on usage)
  houseId: z.number()
});

export const schemaPublicId = z.object({
  publicId: z.string()
})

export const schemaService = z.object({
  name: z.string(), // Enforce non-empty service name

});

// **House Model Validation**
export const schemaHouse = z.object({
  locationId: z.number().positive(), // Ensure positive location ID
  houseNumber: z.number().positive(), // Enforce positive house number
  street: z.string().optional(), // Enforce non-empty street
  description: z.string().optional(), // Allow optional description
  price: z.number().nonnegative(), // Allow optional price
  minutes: z.number(), // Allow optional minutes (may need adjustment based on usage)
  capacity: z.number().positive().optional(), // Allow optional capacity
  occupied: z.number(), // Allow optional occupied status
  perRoom: z.number().positive().optional(), // Allow optional perRoom value
  gender: z.enum(["girls", "boys", "both"]).optional(), // Allow optional gender
  images: z.array(z.string()).optional(), // Allow optional array of image URLs
  backgroundImage: z.string().optional(), // Allow optional background image URL

  ownerId: z.number().positive(), // Ensure positive owner ID
  services: z.array(schemaService.optional()).optional(),
  authorizationKey: z.string(),
  predictedPrice: z.number().optional()
  
});

// **Service Model Validation** (assuming simple name validation)




export default function validate(
  schema: z.ZodObject<any>,
  body: { [key: string | number]: any }
) {
  return schema.safeParse(body);
}




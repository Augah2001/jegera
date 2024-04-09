import { z } from "zod";

// **User Model Validation**
export const schemaUser = z.object({
  email: z.string().email(), // Ensure valid email format
  firstName: z.string(), // Allow non-empty strings
  lastName: z.string().optional(), // Optional last name
  password: z.string().min(8).max(72), // Enforce password length
  authorizationKey: z.string().optional(), // Allow optional authorizationKey
  type: z.enum(["tenant", "landlord"]), // Enforce valid user type
  isOnline: z.boolean().optional(), // Allow optional isOnline
});

// **Location Model Validation**
export const schemaLocation = z.object({
  name: z.string(), // Ensure non-empty and required name
  minutes: z.number().optional(), // Allow optional minutes (may need adjustment based on usage)
  coordinates: z.tuple([z.number(), z.number()]), // Unique pair of numbers for coordinates
});

// **Message Model Validation**
export const schemaMessage = z.object({
  sender: z.string(), // Enforce non-empty sender
  receiver: z.string(), // Enforce non-empty receiver
  body: z.string(), // Enforce non-empty message body
  time: z.date().optional(), // Allow optional time (may need adjustment based on usage)
  status: z.enum(["read", "sent"]).optional(), // Allow optional status
});

// **Transaction Model Validation**
export const schemaTransaction = z.object({
  senderId: z.number().positive(), // Ensure positive sender ID
  receiverId: z.number().positive(), // Ensure positive receiver ID
  amount: z.number().nonnegative(), // Enforce non-negative amount
  time: z.date().optional(), // Allow optional time (may need adjustment based on usage)
});

// **House Model Validation**
export const schemaHouse = z.object({
  locationId: z.number().positive(), // Ensure positive location ID
  houseNumber: z.number().positive(), // Enforce positive house number
  street: z.string(), // Enforce non-empty street
  description: z.string().optional(), // Allow optional description
  price: z.number().nonnegative().optional(), // Allow optional price
  minutes: z.string().optional(), // Allow optional minutes (may need adjustment based on usage)
  capacity: z.number().positive().optional(), // Allow optional capacity
  occupied: z.boolean().optional(), // Allow optional occupied status
  perRoom: z.number().positive().optional(), // Allow optional perRoom value
  gender: z.enum(["male", "female", "both"]).optional(), // Allow optional gender
  images: z.array(z.string()).optional(), // Allow optional array of image URLs
  backGroundImage: z.string().optional(), // Allow optional background image URL
  curfew: z.number().positive().optional(), // Allow optional curfew time
  ownerId: z.number().positive(), // Ensure positive owner ID
});

// **Service Model Validation** (assuming simple name validation)
export const schemaService = z.object({
  name: z.string(), // Enforce non-empty service name
});



export default function validate(
  schema: z.ZodObject<any>,
  body: { [key: string | number]: any }
) {
  return schema.safeParse(body);
}


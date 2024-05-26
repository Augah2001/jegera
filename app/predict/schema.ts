import { z } from "zod";

export const predictSchema = z.object({
    gender: z.enum(["girls", "boys", "both"], {
      errorMap: () => ({ message: "Gender is required" }),
    }), // Allow optional gender // Allow optional background image URL
    perRoom: z
      .number({ invalid_type_error: "People Per Room is required" })
      .positive(),
    wifi: z.boolean().optional(),
    meals: z.boolean().optional(),
    backupPower: z.boolean().optional(),
    Stove: z.boolean().optional(),
    Fridge: z.boolean().optional(),
    separate_kitchen: z.boolean().optional(),
    curfew: z.boolean().optional(),
    visitors: z.boolean().optional(),
    Shelves: z.boolean().optional(),
    Water_tank: z.boolean().optional(),
    maid: z.boolean().optional(),
    gas_stove: z.boolean().optional(),
    gyser: z.boolean().optional(),
    swimming_pool: z.boolean().optional(),
    beds: z.boolean().optional(),
    security: z.boolean().optional(),
  });
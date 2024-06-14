import { z } from "zod";



export const predictSchema = z.object({
  
'inflationrate' : z.number({ invalid_type_error: "field is required" }),
'imports': z.number({ invalid_type_error: "field is required" }).positive(),
'exports': z.number({ invalid_type_error: "field is required" }).positive(),
'moneysupplym1': z.number({ invalid_type_error: "field is required" }).positive() ,



 });
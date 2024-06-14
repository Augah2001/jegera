import { z } from "zod";

export const predictSchema = z.object({
  
"number_of_units" : z.number({ invalid_type_error: "field is required" }).positive().min(1),
"building_height": z.number({ invalid_type_error: "field is required" }).positive(),
"builtup_area": z.number({ invalid_type_error: "field is required" }).positive(),
"number_of_stories": z.number({ invalid_type_error: "field is required" }).positive() ,
"number_of_columns": z.number({ invalid_type_error: "field is required" }).positive(),
"number_of_rooms": z.number({ invalid_type_error: "field is required" }).positive(),
"building_function": z.enum(['residential', 'rural health clinic ', 'church steel structure',
'warehouse', 'chain of shops', 'mall', 'shop mall',
'steel warehouse', 'school admin block', 'hall', 'hostel',
'abbatoir', 'blair toilet', 'township shop', 'industrial shop',
'residential clusterhouse', 'cardiology  hospital building',
'oncology hospital building ', 'university hostel',
'rural health clinic'])


 });
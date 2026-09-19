import { z } from "zod";

export const representativeSchema = z.object({
  code: z.string().min(1, "Code is required"),

  name: z.string().min(3, "Representative name is required"),

  phone: z.string().min(1, "Phone is required"),

  email: z
    .string()
    .email("Invalid email")
    .or(z.literal("")),

  address: z.string(),

  is_active: z.boolean(),
});

export type RepresentativeForm =
  z.infer<typeof representativeSchema>;
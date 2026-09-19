import { z } from "zod";

export const customerSchema = z.object({
  code: z.string().min(1, "Code is required"),

  name: z.string().min(3, "Customer name is required"),

  customer_type: z.string().min(1, "Customer type is required"),

  status: z.enum(["Active", "Inactive"]),

  phone: z.string().min(1, "Phone is required"),

  mobile: z.string().min(1, "Mobile is required"),

  email: z
    .string()
    .email("Invalid email")
    .or(z.literal("")),

  address: z.string().min(1, "Address is required"),

  governorate: z.string().min(1, "Governorate is required"),

  city: z.string().min(1, "City is required"),

  representative_id: z
    .number()
    .nullable()
  ,

  latitude: z.number().nullable(),

  longitude: z.number().nullable(),

  notes: z.string(),
});

export type CustomerForm = z.infer<typeof customerSchema>;
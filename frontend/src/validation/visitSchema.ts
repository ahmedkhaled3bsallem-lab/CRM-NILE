import { z } from "zod";

export const visitSchema = z.object({
  code: z.string().min(1, "Code is required"),

  visit_plan_id: z
    .number()
    .nullable(),

  representative_id: z
    .number()
    .nullable(),

  customer_id: z
    .number()
    .nullable(),

  visit_date: z.string().min(
    1,
    "Visit date is required"
  ),

  check_in_time: z
    .string()
    .nullable(),

  check_out_time: z
    .string()
    .nullable(),

  latitude: z
    .number()
    .nullable(),

  longitude: z
    .number()
    .nullable(),

  visit_status: z.enum([
    "Pending",
    "Completed",
    "Cancelled",
  ]),

  visit_result: z
    .string()
    .nullable(),

  notes: z.string(),

  order_exists: z.boolean(),

  order_amount: z
    .number()
    .nullable(),

  order_notes: z
    .string()
    .nullable(),

  collection_exists: z.boolean(),

  collection_amount: z
    .number()
    .nullable(),

  payment_method: z
    .string()
    .nullable(),

  collection_notes: z
    .string()
    .nullable(),

  need_follow_up: z.boolean(),

  next_visit_date: z
    .string()
    .nullable(),
});

export type VisitForm =
  z.infer<typeof visitSchema>;
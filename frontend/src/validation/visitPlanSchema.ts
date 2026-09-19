import { z } from "zod";

export const visitPlanSchema = z.object({
  code: z.string().min(1, "Code is required"),

  representative_id: z
    .number()
    .nullable(),

  customer_id: z
    .number()
    .nullable(),

  visit_date: z.string().min(1, "Visit date is required"),

  planned_time: z.string().min(1, "Planned time is required"),

  priority: z.enum([
    "Low",
    "Medium",
    "High",
  ]),

  status: z.enum([
    "Planned",
    "Completed",
    "Cancelled",
  ]),

  notes: z.string(),
});

export type VisitPlanForm = z.infer<
  typeof visitPlanSchema
>;
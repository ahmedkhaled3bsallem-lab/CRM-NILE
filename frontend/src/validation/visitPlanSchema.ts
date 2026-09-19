import { z } from "zod";

export const visitPlanSchema = z.object({
  representative_id: z
    .number({
      error: "Representative is required",
    }),

  customer_ids: z
    .array(z.number())
    .min(1, "Select at least one customer"),

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
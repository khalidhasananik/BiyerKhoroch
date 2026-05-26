import { z } from "zod";

const costBreakdownSchema = z.object({
  venue:         z.number().min(0, "Must be 0 or more"),
  catering:      z.number().min(0, "Must be 0 or more"),
  photography:   z.number().min(0, "Must be 0 or more"),
  clothing:      z.number().min(0, "Must be 0 or more"),
  jewelry:       z.number().min(0, "Must be 0 or more"),
  decoration:    z.number().min(0, "Must be 0 or more"),
  makeup:        z.number().min(0, "Must be 0 or more"),
  gateDhora:     z.number().min(0, "Must be 0 or more"),
  miscellaneous: z.number().min(0, "Must be 0 or more"),
});

const CURRENT_YEAR = new Date().getFullYear();

export const submissionFormSchema = z.object({
  city:               z.string().min(2, "City is required"),
  weddingYear:        z.number().int().min(2000, "Year must be 2000 or later").max(CURRENT_YEAR, `Year cannot be in the future`),
  guestCount:         z.number().min(1, "At least 1 guest required").max(10000, "Too many guests"),
  venueName:          z.string().min(2, "Venue name is required").max(100, "Too long"),
  photographyCompany: z.string().max(100, "Too long").optional(),
  costs:              costBreakdownSchema,
  totalCostOverride:  z.number().min(0).optional(),
  story:              z.string().min(20, "Please write at least 20 characters").max(2000, "Story too long (max 2000 characters)"),
  honeypot:           z.string().max(0, "Bot detected").optional(),
});

export type SubmissionFormValues = z.infer<typeof submissionFormSchema>;

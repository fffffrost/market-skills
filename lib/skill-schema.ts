import { z } from "zod";

export const phases = ["insight", "strategy", "content", "execution", "review"] as const;

export const skillListingSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(2),
  english_name: z.string().min(2),
  summary: z.string().min(20),
  phase: z.enum(phases),
  phase_label: z.string().min(2),
  roles: z.array(z.string().min(1)).min(1),
  tasks: z.array(z.string().min(1)).min(1),
  inputs: z.array(z.string().min(1)).min(1),
  outputs: z.array(z.string().min(1)).min(1),
  protocol_steps: z.array(z.string().min(2)).min(3).max(6),
  compatibility: z.array(z.string().min(1)).min(1),
  dependencies: z.array(z.string().min(1)).min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  updated_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  featured: z.boolean(),
  order: z.number().int().positive(),
  example_prompt: z.string().min(12),
});

export type SkillListing = z.infer<typeof skillListingSchema>;
export type SkillPhase = (typeof phases)[number];

import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().optional(),
  image: z.string().optional(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  techStack: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  featured: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("published"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

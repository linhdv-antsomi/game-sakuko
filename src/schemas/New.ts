import { z } from "zod";

const NewSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  author: z.string(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().default(false),
  // views: z.number().int().nonnegative().default(0).isOptional(),
  thumbnail: z.string().optional(),
});

type New = z.infer<typeof NewSchema>;

export { NewSchema, New };

import { z } from "zod";

export const createProductValidator = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  originalPrice: z.number().positive().optional().nullable(),
  image: z
    .string()
    .regex(/^(https?:\/\/|\/)/, "Image must be a valid URL or path"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
  variants: z
    .array(
      z.object({
        size: z.string().min(1, "Size is required"),
        inStock: z.boolean().default(true),
      }),
    )
    .min(1, "At least one variant is required"),
});

export type CreateProductInput = z.infer<typeof createProductValidator>;

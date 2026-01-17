import prisma from "../db/prisma";
import { CreateProductInput } from "../validation/productValidator";

export const ProductModel = {
  findAll: async (category?: string) => {
    return prisma.product.findMany({
      where: category ? { category } : undefined,
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  findUniqueCategories: async () => {
    return prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });
  },

  findById: async (id: string) => {
    return prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });
  },

  create: async (data: CreateProductInput) => {
    const { variants, ...productData } = data;
    return prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
      },
      include: {
        variants: true,
      },
    });
  },
};

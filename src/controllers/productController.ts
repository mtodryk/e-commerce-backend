import { Request, Response } from "express";
import { ProductModel } from "../models/Product";
import { createProductValidator } from "../validation/productValidator";

export const ProductController = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const products = await ProductModel.findAll(category as string);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  },

  getCategories: async (_req: Request, res: Response) => {
    try {
      const categories = await ProductModel.findUniqueCategories();
      res.json(categories.map((c) => c.category));
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
      const rawData = { ...req.body };
      if (!rawData.image && process.env.DEFAULT_IMAGE_URL) {
        rawData.image = process.env.DEFAULT_IMAGE_URL;
      }

      const validation = createProductValidator.safeParse(rawData);

      if (!validation.success) {
        res.status(400).json({
          error: "Validation failed",
          details: validation.error.errors,
        });
        return;
      }

      const product = await ProductModel.create(validation.data);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  },
};

import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "A simple Product API with Node.js, TypeScript and Prisma",
    },

    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["id", "name", "price", "image", "category", "inStock"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the product",
            },
            name: {
              type: "string",
              description: "The name of the product",
            },
            description: {
              type: "string",
              description: "The description of the product",
            },
            price: {
              type: "number",
              description: "The price of the product",
            },
            originalPrice: {
              type: "number",
              nullable: true,
              description: "The original price before discount",
            },
            image: {
              type: "string",
              format: "uri",
              description: "URL to the product image",
            },
            category: {
              type: "string",
              description: "The category of the product",
            },
            inStock: {
              type: "boolean",
              description: "Whether the product is in stock",
            },
            variants: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Variant",
              },
              description: "Product variants",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "When the product was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "When the product was last updated",
            },
          },
        },
        Variant: {
          type: "object",
          required: ["id", "size", "inStock", "productId"],
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the variant",
            },
            size: {
              type: "string",
              description: "The size of the variant (e.g. S, M, L, XL, 38, 42)",
            },
            inStock: {
              type: "boolean",
              description: "Whether this variant is in stock",
            },
            productId: {
              type: "string",
              description: "The id of the product this variant belongs to",
            },
          },
        },
        CreateProductInput: {
          type: "object",
          required: ["name", "price", "image", "category", "variants"],
          properties: {
            name: {
              type: "string",
              description: "The name of the product",
            },
            description: {
              type: "string",
              description: "The description of the product",
            },
            price: {
              type: "number",
              description: "The price of the product",
            },
            originalPrice: {
              type: "number",
              nullable: true,
              description: "The original price before discount",
            },
            image: {
              type: "string",
              format: "uri",
              description: "URL to the product image",
            },
            category: {
              type: "string",
              description: "The category of the product",
            },
            inStock: {
              type: "boolean",
              default: true,
              description: "Whether the product is in stock",
            },
            variants: {
              type: "array",
              minItems: 1,
              items: {
                type: "object",
                required: ["size"],
                properties: {
                  size: {
                    type: "string",
                    description: "The size of the variant (e.g. S, M, L, XL, 38, 42)",
                  },
                  inStock: {
                    type: "boolean",
                    default: true,
                    description: "Whether this variant is in stock",
                  },
                },
              },
              description: "Product variants (at least one required)",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
            details: {
              type: "array",
              description: "Validation error details",
            },
          },
        },
      },
    },
  },
  apis: [
    path.resolve(process.cwd(), "src/routes/*.ts"),
    path.resolve(process.cwd(), "dist/routes/*.js"),
    "./src/routes/*.ts",
    "./dist/routes/*.js",
  ],
};

export const specs = swaggerJsdoc(options);

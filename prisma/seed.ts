import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";
const getAssetUrl = (filename: string) => `${BASE_URL}/assets/${filename}`;

const products = [
  {
    name: "Shoes 1",
    description: "Soft and comfortable everyday essential",
    price: 29.99,
    originalPrice: 39.99,
    image: getAssetUrl("item4.jpg"),
    category: "Shoes",
    inStock: true,
    variants: [
      { size: "40", inStock: true },
      { size: "41", inStock: true },
      { size: "42", inStock: true },
      { size: "43", inStock: false },
      { size: "44", inStock: false },
      { size: "45", inStock: false },
      { size: "46", inStock: false },
    ],
  },
  {
    name: "Shoes 2",
    description: "Timeless style for any occasion",
    price: 89.99,
    originalPrice: 120.0,
    image: getAssetUrl("item2.jpg"),
    category: "Shoes",
    inStock: true,
    variants: [
      { size: "40", inStock: false },
      { size: "41", inStock: false },
      { size: "42", inStock: true },
      { size: "43", inStock: false },
      { size: "44", inStock: false },
      { size: "45", inStock: true },
      { size: "46", inStock: false },
    ],
  },
  {
    name: "Shoes 3",
    description: "Nice shoes",
    price: 129.99,
    originalPrice: 159.99,
    image: getAssetUrl("item3.jpg"),
    category: "Shoes",
    inStock: true,
    variants: [
      { size: "40", inStock: true },
      { size: "41", inStock: true },
      { size: "42", inStock: true },
      { size: "43", inStock: false },
      { size: "44", inStock: false },
      { size: "45", inStock: false },
      { size: "46", inStock: false },
    ],
  },
  {
    name: "Shoes 4 for kids",
    description: "Nice shoes",
    price: 49.99,
    originalPrice: null,
    image: getAssetUrl("item1.jpg"),
    category: "Shoes",
    inStock: true,
    variants: [
      { size: "35", inStock: true },
      { size: "36", inStock: true },
      { size: "37", inStock: true },
      { size: "38", inStock: false },
      { size: "39", inStock: false },
    ],
  },
  {
    name: "Classic Cotton T-Shirt",
    description: "T-Shirt ....",
    price: 129.99,
    originalPrice: 159.99,
    image: getAssetUrl("tshirt1.jpg"),
    category: "T-Shirts",
    inStock: true,
    variants: [
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: false },
      { size: "XL", inStock: false },
    ],
  },
  {
    name: "Classic Cotton T-Shirt 2",
    description: "T-Shirt ....",
    price: 49.99,
    originalPrice: null,
    image: getAssetUrl("tshirt2.jpg"),
    category: "T-Shirts",
    inStock: true,
    variants: [
      { size: "S", inStock: true },
      { size: "M", inStock: true },
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
    ],
  },
  {
    name: "Modern hat",
    description: "Hat's description ....",
    price: 49.99,
    originalPrice: null,
    image: getAssetUrl("hat1.jpg"),
    category: "Hats",
    inStock: true,
    variants: [{ size: "OneSize", inStock: true }],
  },
  {
    name: "Modern hat 2",
    description: "Hat's description ....",
    price: 49.99,
    originalPrice: null,
    image: getAssetUrl("hat2.jpg"),
    category: "Hats",
    inStock: false,
    variants: [{ size: "OneSize", inStock: false }],
  },
];

async function main() {
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const product of products) {
    const { variants, ...productData } = product;

    await prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants,
        },
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

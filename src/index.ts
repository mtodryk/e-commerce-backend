import { resolve } from "path";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./routes/products";
import { specs } from "./utils/swagger";
import dotenv from "dotenv";
import { PrismaService } from "./db/prisma";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/assets", express.static(resolve("assets")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/products", productRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});

const shutdown = async () => {
  server.close(async () => {
    try {
      await PrismaService.getInstance().disconnect();
      process.exit(0);
    } catch (err) {
      process.exit(1);
    }
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

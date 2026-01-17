# Product API

This backend is built using **Node.js**, **TypeScript**, and **Prisma** (with SQLite). It provides a robust and type-safe environment for managing product data and variants.

## How to Run

The easiest way to set up and run the environment is using Docker Compose:

```bash
docker compose up -d --build
```

Alternatively, for local development:
1. Run `npm install`
2. Run `npm run prisma:migrate`
3. Run `npm run prisma:seed`
4. Run `npm run dev`

## API Documentation & Sample Requests

Sample requests and full API documentation are available via Swagger UI. You can use it to test all endpoints (GET, POST, etc.) directly from your browser:

- **Swagger UI**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- **Health Check**: [http://localhost:3001/health](http://localhost:3001/health)


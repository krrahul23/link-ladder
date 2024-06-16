# Link Ladder

A customizable micro-landing page creator using TypeScript, React, Express and MongoDB.

# Frontend Documentation (React)

## Initial setup

- Clone this respository `git clone <SSH/HTTPS URL>`.
- Change directory to the frontend directory `cd linkme/frontend`.
- Install the dependencies `npm install`.

## Setting up frontend environment variables

- Create a copy of .env.example to .env `cp .env.example .env`.
  - For `VITE_FRONTEND_URL`:
    - In local and production development, set the variable to `http://localhost:5173`.
  - For `VITE_BACKEND_URL`:
    - In local and production development, set the variable to `http://localhost:3000`.

## Running frontend in development mode

- Run the frontend `npm run dev`.

# Backend Documentation (Express)

## Database setup

- Create a mongodb database (MongoDB Atlas recommended).
- Create a copy of .env.example to .env `cp .env.example .env`.
  - For `DATABASE_URL`:
    - In local development, set the variable to `mongodb://localhost:27017/<DATABASE_NAME>`.
    - In production development, set the variable to the MongoDB Atlas connection string.

## Running backend in development mode

- Run the backend in watch mode `npm run dev`.
- Build the backend `npm run build`. \
  **Note**: Generate the prisma client before building for production

# Production-Ready Turborepo Monorepo (Node + Angular)

This project is a full-stack monorepo built with **Turborepo**, **pnpm**, **Angular 21**, and **Express.js**. It features a microfrontend architecture using **Module Federation**, real-time data synchronization between **MongoDB** and **Elasticsearch**, and session-based authentication with **Passport.js** and **Redis**.

## Architecture Overview

- **Frontend Shell**: The main Angular application that hosts and orchestrates microfrontends.
- **MF-Auth**: A microfrontend handling authentication (Login/Logout).
- **MF-Dashboard**: A microfrontend displaying user statistics and data.
- **Backend API**: Node.js/Express API with Passport.js local strategy and Redis session store.
- **Sync Service**: A Node.js background service that uses MongoDB Change Streams to sync data to Elasticsearch.
- **Shared Packages**:
  - `@repo/shared-types`: Common TypeScript interfaces and DTOs.
  - `@repo/shared-utils`: Utility functions shared across frontend and backend.
- **Infrastructure**: MongoDB (Replica Set), Redis, and Elasticsearch running in Docker.

## Tech Stack

- **Monorepo**: Turborepo, pnpm
- **Frontend**: Angular 21 (Standalone Components, Module Federation)
- **Backend**: Node.js, Express, Passport.js, Mongoose
- **Databases**: MongoDB, Elasticsearch, Redis
- **Containerization**: Docker, Docker Compose

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Getting Started

### 1. Clone the repository and install dependencies

```bash
pnpm install
```

### 2. Run with Docker Compose (Recommended)

Start the entire stack with a single command:

```bash
docker compose up --build
```

This will start:
- MongoDB (with Replica Set initialization)
- Redis
- Elasticsearch
- Backend API (`http://localhost:3000`)
- Sync Service
- Frontend Shell (`http://localhost:4200`)
- MF-Auth (`http://localhost:4201`)
- MF-Dashboard (`http://localhost:4202`)

### 3. Sample Credentials

The database is automatically seeded with the following users:

| Username | Password | Role |
| :--- | :--- | :--- |
| **admin** | `admin123` | Administrator |
| **jordan** | `password123` | Regular User |

### 4. Local Development

To run each application locally without Docker:

```bash
# Start infrastructure only
docker compose up mongodb redis elasticsearch -d

# Build shared packages
pnpm build

# Start all apps in live dev mode (hot reload)
pnpm dev

# Or start all apps in watch/rebuild mode
pnpm watch
```

## Folder Structure

```
/
├── apps/
│   ├── frontend-shell/       # Angular Host
│   ├── frontend-mf-auth/      # Auth Microfrontend
│   ├── frontend-mf-dashboard/ # Dashboard Microfrontend
│   ├── backend-api/          # Express API
│   └── mongo-es-sync/        # Sync Service
├── packages/
│   ├── shared-types/         # Common Types
│   └── shared-utils/         # Common Utils
├── docker-compose.yml
├── turbo.json
└── README.md
```

## Key Features

- **Microfrontend Federation**: Angular apps are lazily loaded from different origins.
- **Change Data Capture (CDC)**: MongoDB Change Streams provide a reliable way to keep Elasticsearch in sync.
- **Scalable Auth**: Session-based auth with Redis allows for horizontal scaling of the API.
- **Unified Build Pipeline**: Turborepo optimizes builds and caching across the monorepo.

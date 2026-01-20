FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend-api/package.json ./apps/backend-api/
COPY packages/ ./packages/
COPY apps/frontend-shell/package.json ./apps/frontend-shell/
COPY apps/frontend-mf-auth/package.json ./apps/frontend-mf-auth/
COPY apps/frontend-mf-dashboard/package.json ./apps/frontend-mf-dashboard/
COPY apps/mongo-es-sync/package.json ./apps/mongo-es-sync/

RUN pnpm install --filter backend-api... --filter @repo/shared-types --filter @repo/shared-utils

COPY . .
RUN pnpm --filter @repo/shared-types build
RUN pnpm --filter @repo/shared-utils build
RUN pnpm --filter backend-api build

EXPOSE 3000
CMD ["pnpm", "--filter", "backend-api", "start"]

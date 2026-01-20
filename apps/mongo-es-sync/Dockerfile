FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/mongo-es-sync/package.json ./apps/mongo-es-sync/
COPY packages/ ./packages/
COPY apps/frontend-shell/package.json ./apps/frontend-shell/
COPY apps/frontend-mf-auth/package.json ./apps/frontend-mf-auth/
COPY apps/frontend-mf-dashboard/package.json ./apps/frontend-mf-dashboard/
COPY apps/backend-api/package.json ./apps/backend-api/

RUN pnpm install --filter mongo-es-sync... --filter @repo/shared-types --filter @repo/shared-utils

COPY . .
RUN pnpm --filter @repo/shared-types build
RUN pnpm --filter @repo/shared-utils build
RUN pnpm --filter mongo-es-sync build

CMD ["pnpm", "--filter", "mongo-es-sync", "start"]

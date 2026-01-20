# Build stage
FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend-shell/package.json ./apps/frontend-shell/
COPY packages/ ./packages/
# We need other MF package.jsons too because of the workspace
COPY apps/frontend-mf-auth/package.json ./apps/frontend-mf-auth/
COPY apps/frontend-mf-dashboard/package.json ./apps/frontend-mf-dashboard/
COPY apps/backend-api/package.json ./apps/backend-api/
COPY apps/mongo-es-sync/package.json ./apps/mongo-es-sync/

RUN pnpm install --filter frontend-shell... --filter @repo/shared-types --filter @repo/shared-utils

COPY . .
RUN pnpm --filter @repo/shared-types build
RUN pnpm --filter @repo/shared-utils build
RUN pnpm --filter frontend-shell build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/apps/frontend-shell/dist/frontend-shell/browser /usr/share/nginx/html
COPY apps/frontend-shell/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

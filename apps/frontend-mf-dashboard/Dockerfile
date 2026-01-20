FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend-mf-dashboard/package.json ./apps/frontend-mf-dashboard/
COPY packages/ ./packages/
COPY apps/frontend-shell/package.json ./apps/frontend-shell/
COPY apps/frontend-mf-auth/package.json ./apps/frontend-mf-auth/
COPY apps/backend-api/package.json ./apps/backend-api/
COPY apps/mongo-es-sync/package.json ./apps/mongo-es-sync/

RUN pnpm install --filter frontend-mf-dashboard... --filter @repo/shared-types --filter @repo/shared-utils

COPY . .
RUN pnpm --filter @repo/shared-types build
RUN pnpm --filter @repo/shared-utils build
RUN pnpm --filter frontend-mf-dashboard build

FROM nginx:alpine
COPY --from=build /app/apps/frontend-mf-dashboard/dist/frontend-mf-dashboard/browser /usr/share/nginx/html
COPY apps/frontend-mf-dashboard/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

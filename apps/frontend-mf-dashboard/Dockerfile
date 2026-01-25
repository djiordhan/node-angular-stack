FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm @angular/cli

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend-shell/package.json ./apps/frontend-shell/
COPY apps/frontend-mf-auth/package.json ./apps/frontend-mf-auth/
COPY apps/frontend-mf-dashboard/package.json ./apps/frontend-mf-dashboard/
COPY apps/backend-api/package.json ./apps/backend-api/
COPY apps/mongo-es-sync/package.json ./apps/mongo-es-sync/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-utils/package.json ./packages/shared-utils/

RUN pnpm config set store-dir /pnpm-store
RUN pnpm install --filter frontend-mf-dashboard... --filter @repo/shared-types --filter @repo/shared-utils --frozen-lockfile --aggregate-output --shamefully-hoist

COPY . .
RUN pnpm --filter @repo/shared-types build
RUN pnpm --filter @repo/shared-utils build
RUN pnpm --filter frontend-mf-dashboard build

FROM nginx:alpine
COPY --from=build /app/apps/frontend-mf-dashboard/dist/frontend-mf-dashboard/browser /usr/share/nginx/html
COPY apps/frontend-mf-dashboard/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

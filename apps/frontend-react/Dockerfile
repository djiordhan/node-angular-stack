FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend-react/package.json ./apps/frontend-react/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/shared-utils/package.json ./packages/shared-utils/

RUN pnpm config set store-dir /pnpm-store
RUN pnpm install --filter frontend-react... --filter @repo/shared-types --filter @repo/shared-utils --frozen-lockfile --aggregate-output --shamefully-hoist

COPY . .

RUN pnpm --filter @repo/shared-types build
RUN pnpm --filter @repo/shared-utils build
RUN pnpm --filter frontend-react build

FROM nginx:alpine
COPY --from=build /app/apps/frontend-react/dist /usr/share/nginx/html
COPY apps/frontend-react/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

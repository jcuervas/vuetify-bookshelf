# etapa de compilación
FROM node:12.22.1-alpine3.10 as build-stage
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

# etapa de producción
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

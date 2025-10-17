FROM node:20 AS builder

WORKDIR /app

ARG ENV_FILE=dev
ENV ENV_FILE=${ENV_FILE}

COPY package*.json ./

RUN npm install --force

COPY . .

COPY .env.${ENV_FILE} .env

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
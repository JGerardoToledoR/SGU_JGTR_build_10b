# Etapa 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG API_HOST
ARG API_PORT
ARG API_BASE
ARG API_PROTOCOL

ENV VITE_API_HOST=$API_HOST
ENV VITE_API_PORT=$API_PORT
ENV VITE_API_BASE=$API_BASE
ENV VITE_API_PROTOCOL=$API_PROTOCOL

RUN npm run build


# Etapa 2: Nginx con HTTP + HTTPS
FROM nginx:alpine

# Crear certificados autofirmados para localhost
RUN mkdir -p /etc/nginx/ssl && \
    apk add --no-cache openssl && \
    openssl req -x509 -nodes -days 365 \
        -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/localhost.key \
        -out /etc/nginx/ssl/localhost.crt \
        -subj "/CN=localhost"

# Copiar los archivos del build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

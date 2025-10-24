FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist/health-frontend/browser /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

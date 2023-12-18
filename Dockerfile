FROM node:alpine AS build

WORKDIR /

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=build /dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine3.16 AS build

WORKDIR /app
COPY ./package.json .
RUN npm i

COPY ./ ./

RUN npm run build

FROM node:18-alpine3.16 AS run

WORKDIR /app

RUN apk add —no-cache sed
RUN sed -i 's/node:x:1000:1000/node:x:1001:1001/g' /etc/passwd && \
sed -i 's/node:x:1000:node/node:x:1001:node/g' /etc/group && \
chown -R node:node /home/node

COPY —from=build /app/package.json .
RUN npm i —omit=dev && npm cache clean —force

COPY —from=build /app/build .
COPY —from=build /app/.env .

EXPOSE 3000
CMD ["node", "./index.js"]
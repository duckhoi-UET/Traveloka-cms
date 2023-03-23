FROM node:14-alpine AS build
WORKDIR /app
RUN apk add --no-cache git

COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

COPY . /app/

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app /app/
RUN chmod +x /app/start.sh
CMD ./start.sh

FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY . .

RUN rm -rf ./node-modules

RUN npm ci
RUN npm run build

RUN touch .env

COPY ./entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
CMD ["start"]

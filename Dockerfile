FROM cl00e9ment/node.js-builder:latest AS builder

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env-dynamic.template.js && nginx -g 'daemon off;'"]
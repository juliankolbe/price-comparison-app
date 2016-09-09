FROM 		redis:latest

MAINTAINER 	jules241

COPY        ./.docker/config/redis.dev.conf /etc/redis.conf

EXPOSE      6379

ENTRYPOINT  ["redis-server", "/etc/redis.conf"]

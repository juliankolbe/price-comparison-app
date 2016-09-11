FROM postgres:latest

# Set container time zone
#ENV TZ 'Europe/Berlin'

#RUN echo "Europe/Berlin" > /etc/timezone

RUN apt-get update && apt-get install -y vim

# This works, to overwrite default postgres settings
#COPY .docker/postgres-files/postgresql.conf /usr/share/postgresql/$PG_MAJOR/postgresql.conf.sample



#COPY .docker/postgres-files/postgresql.conf /postgresql.conf
#COPY .docker/postgres-scripts/set-config.sh /docker-entrypoint-initdb.d/set-config.sh

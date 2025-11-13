# Infrastructure Setup
## Installing PgAdmin and Postgres using Podman
```bash
podman volume create pgdata
podman pod create --name postgres -p 8080:80 -p 5432:5432
podman run --pod postgres -e 'PGADMIN_DEFAULT_EMAIL=ltsadmin@cdac.in' -e 'PGADMIN_DEFAULT_PASSWORD=ltsadmin' --name pgadmin -d docker.io/dpage/pgadmin4:latest
podman run --name postgres --pod postgres -v pgdata:/var/lib/postgresql/data:rw,z  -e 'POSTGRES_USER=postgres' -e 'POSTGRES_PASSWORD=ltsadmin' -d docker.io/postgres:latest
```

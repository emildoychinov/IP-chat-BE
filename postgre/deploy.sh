docker run \
    -d \
    -p 5432:5432 \
    --rm \
    --name pg-ip-web-chat \
    --env POSTGRES_USER=ipElsys \
    --env POSTGRES_PASSWORD=ipElsysPass \
    --env POSTGRES_DB=ipElsysDb \
    postgres:latest


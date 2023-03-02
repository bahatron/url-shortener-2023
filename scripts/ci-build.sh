#!/bin/sh

if [ -z $GITROOT ]; then
    echo "[ERROR]: GITROOT must be set and be an absolutate path" && exit 1
fi

# build images
docker-compose build --parallel || exit 1

# start test environment
docker-compose -f "${GITROOT}/docker-compose.test.yml" down
docker-compose -f "${GITROOT}/docker-compose.test.yml" up -d database
docker-compose -f "${GITROOT}/docker-compose.test.yml" up -d

# wait for server to be ready
attempts=1
until [ "$attempts" -ge 90 ]; do
    docker exec api-server sh -c "curl http://localhost:3000/ping" && break

    attempts=$((attempts + 1))
    sleep 1
done

# run tests
docker exec api-server sh -c "npm run test:ci"

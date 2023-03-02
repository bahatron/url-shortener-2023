#!/bin/sh

pg_dump -O -x -h ${POSTGRES_HOST:-localhost} -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB} >"/dumps/${POSTGRES_DB}.sql"

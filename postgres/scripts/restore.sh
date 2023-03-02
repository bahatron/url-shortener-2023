#!/bin/sh

psql -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB} < "/dumps/${POSTGRES_DB}.sql"
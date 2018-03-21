#!/bin/bash

database="scripts"

echo "Configuring database: $database"

DROPDB -U postgres scripts
CREATEDB -U postgres scripts

psql -U postgres scripts < ./bin/schema.sql

echo "$database configured"

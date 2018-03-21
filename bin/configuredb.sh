#!/bin/bash

database="scripts"

echo "Configuring database: $database"

dropdb -U node_user scripts
createdb -U node_user scripts

psql -U node_user scripts < ./bin/schema.sql

echo "$database configured"

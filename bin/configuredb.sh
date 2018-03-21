#!/bin/bash

database="offscript"

echo "Configuring database: $database"

DROPDB -U postgres offscript
CREATEDB -U postgres offscript

psql -U postgres scripts < ./bin/schema.sql

echo "$database configured"

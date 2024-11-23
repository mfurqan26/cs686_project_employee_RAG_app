#!/bin/bash
export POSTGRES_USER=postgresUser
export POSTGRES_PASSWORD=postgresPassword
export POSTGRES_DB=postgresDb
export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"
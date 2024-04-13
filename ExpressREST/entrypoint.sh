#!/bin/bash

# Check if the initialization marker file exists
if [ ! -f "/usr/src/app/prisma/migrations/initialized" ]; then
  echo "Running initial migration..."
  npx prisma migrate dev --name init

  # Create a marker file to indicate that the initial migration has been completed
  touch /usr/src/app/prisma/migrations/initialized
else
  echo "Running subsequent migrations..."
  npx prisma migrate deploy
fi

# Start the node application
exec npm run start
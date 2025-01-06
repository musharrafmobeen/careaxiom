Description

This is a NestJS application designed for efficient and scalable server-side development. The application includes features such as automatic migrations, data validation, rate limiting, caching, and queue-based notifications.

Features

Automatic migration handling to set up and populate the database.

Validation of environment variables and request data.

Rate limiting for GET requests to mitigate DDoS attacks.

Caching for optimized retrieval of user data.

Queue-based notification system for user creation events.

Installation
$ npm install

Running the app

# Build the application

$ npm run build

# Run database migrations (optional if auto-run is enabled)

$ npm run migration:up

# Start the application

$ npm start

# Development mode

$ npm run start:dev

Environment Variables

Example .env file:

PORT=3000

REDIS_PORT=6379
REDIS_HOST=localhost
REDIS_USERNAME=default

# REDIS_PASSWORD=redispw

DATABASE_TYPE=postgres
DATABASE_NAME=careaxiom
DATABASE_PORT=5432
DATABASE_HOST=localhost
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=1234
DATABASE_SYNCHRONIZE=false
DATABASE_MIGRATIONS_RUN=true

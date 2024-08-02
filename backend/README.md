# Podcastito Backend

This is the backend for the Podcastito application. It's a Node.js application using Nest.js and MongoDB.

## Prerequisites

To develop for or run this application, you need:

- Docker and Docker Compose installed on your machine.
- A `.env.prod` file in the root directory with the following variables:
  - `DB_ROOT_USERNAME`: The username for the MongoDB root user.
  - `DB_ROOT_PASSWORD`: The password for the MongoDB root user.
  - `DB_DATABASE`: The name of the MongoDB database.

## Running the Application

To start the application and the database, run the following command in the terminal:

```bash
docker compose up
```

# Url Shortener 2023

## Required Dependencies

-   node:12+
-   [tilt.dev:](https://tilt.dev/)
-   [docker & docker-compose](https://docs.docker.com/get-docker/)

## Getting Started

```sh
# setup project
npm run setup

# start dev environment
npm run tilt:clean
```

## Working with the Database

We use Prisma as ORM but Knex as a Migration system.
This is because Prisma migrations are generated in .sql files and won't allow us to modify data if necessary

To make a modification to the database, follow these instructions:

-   Use `npm run knex:migration [your_migration_name]`
    -   This will create a _Knex_ migration on the `knex_migrations/` folder
-   Modify the migration code as you need
-   Run the Migration with `npm run knex:migrate`
    -   To restart the database schema on retries, restart your dev environment with `npm run tilt:clean` or use the Tilt UI
-   Done!

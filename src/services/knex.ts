import knex, { Knex } from "knex";
import { resolve } from "path";
import { types } from "pg";
import { $env } from "./env";

// data parsing
types.setTypeParser(types.builtins.INT8, (value: string) => {
    return parseInt(value);
});
types.setTypeParser(types.builtins.INT4, (value: string) => {
    return parseInt(value);
});
types.setTypeParser(types.builtins.FLOAT8, (value: string) => {
    return parseFloat(value);
});
types.setTypeParser(types.builtins.NUMERIC, (value: string) => {
    return parseFloat(value);
});

export const CONFIG: Knex.Config = {
    client: "pg",
    connection: $env.DATABASE_URL,
    migrations: {
        tableName: "knex_migrations",
        // this expects application started from package.json root dir
        directory: resolve(process.cwd(), "./knex_migrations"),
        extension: "ts",
    },
};

export const $knex = knex(CONFIG);

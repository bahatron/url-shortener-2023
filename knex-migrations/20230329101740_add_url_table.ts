import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("url_map", (table) => {
        table.string("shortened").primary();
        table.string("original").unique().index();
    });
}

export async function down(knex: Knex): Promise<void> {}

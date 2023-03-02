import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(`users`, (table) => {
        table.timestamps({ defaultToNow: true });
        table.uuid("id").primary();
        table.string("email").notNullable().index().unique();
        table.string("password_hash").notNullable();
        table.string("phone_number");
        table.string("display_name");
    });
}

export async function down(knex: Knex): Promise<void> {}

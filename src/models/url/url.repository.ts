import { $knex } from "../../services/knex";

interface UrlMap {
    shortened: string;
    original: string;
}

export const $url = {
    knex: (session = $knex) => session.table<UrlMap>("url_map"),
};

import { Static, Type } from "@sinclair/typebox";
import { $url } from "../models/url/url.repository";
import { $validator } from "../services/validator";
import { randomString } from "../utils/random-string";

export const UrlSchema = Type.String({
    format: "uri",
    pattern: "^(https?)://",
});
export const ShortenUrlResponseSchema = Type.String({
    minLength: 6,
    maxLength: 6,
});

export async function shortenUrl(
    url: Static<typeof UrlSchema>,
): Promise<string> {
    $validator.json(url, UrlSchema);

    let record = await $url.knex().where({ original: url }).first();

    if (record) return record.shortened;

    let shortened = randomString(6);

    await $url.knex().insert({
        original: url,
        shortened,
    });

    return shortened;
}

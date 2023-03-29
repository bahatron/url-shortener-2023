import { Type } from "@sinclair/typebox";
import {
    shortenUrl,
    ShortenUrlResponseSchema,
    UrlSchema,
} from "../../handlers/shorten-url";
import { asyncRoute } from "../../server/async-route";
import { Route } from "../../server/route.interface";
import { $validator } from "../../services/validator";

const ShortenUrlRequestSchema = Type.Object({
    url: UrlSchema,
});

export const CreateShortenedUrlRoute: Route = {
    method: "post",
    route: "/shorten",
    docs: {
        tags: ["Url"],
        description: "Shortens a full URL into a smaller string",
        requestBody: {
            schema: ShortenUrlRequestSchema,
        },
        schemas: {
            Url: UrlSchema,
        },
        responses: {
            200: {
                schema: ShortenUrlResponseSchema,
            },
        },
    },
    handler: [
        asyncRoute(async (req, res) => {
            let { url } = await $validator.json(
                req.body,
                ShortenUrlRequestSchema,
            );

            return res.json(await shortenUrl(url));
        }),
    ],
};

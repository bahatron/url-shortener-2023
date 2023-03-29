import { NotFound } from "@bahatron/utils/lib/error";
import { Type } from "@sinclair/typebox";
import { $url } from "../../models/url/url.repository";
import { asyncRoute } from "../../server/async-route";
import { Route } from "../../server/route.interface";

export const RedirectToOriginalRoute: Route = {
    method: "get",
    route: "/:shortened",
    docs: {
        tags: ["Url"],
        description: "redirect to original URL",
        parameters: [
            {
                in: "path",
                name: "shortened",
                required: true,
            },
        ],
        responses: {
            301: {
                description: "original resource",
                schema: Type.Any(),
            },
            404: {
                description: "URL not found",
                schema: Type.Any(),
            },
        },
    },

    handler: [
        asyncRoute(async (req, res) => {
            let { shortened } = req.params;

            let record = await $url.knex().where({ shortened }).first();

            if (!record) throw NotFound("URL_NOT_FOUND");

            return res.redirect(record.original);
        }),
    ],
};

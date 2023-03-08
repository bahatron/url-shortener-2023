import { asyncRoute } from "../../server/async-route";
import { Route } from "../../models/route/route.interface";
import { $logger } from "../../services/logger";
import { PingResponseSchema } from "./ping.response.schema";

export const PingRoute: Route = {
    method: "get",
    route: "/ping",
    docs: {
        tags: ["A.P.M."],
        description: "ping",
        responses: {
            200: {
                content: {
                    "application/json": {
                        schema: PingResponseSchema,
                    },
                },
            },
        },
    },
    handler: [
        asyncRoute(async (req, res) => {
            return res.json("pong");
        }),
    ],
};

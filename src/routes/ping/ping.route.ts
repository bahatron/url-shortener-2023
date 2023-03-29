import { asyncRoute } from "../../server/async-route";
import { Route } from "../../server/route.interface";
import { PingResponseSchema } from "./ping-response.schema";

export const PingRoute: Route = {
    method: "get",
    route: "/ping",
    docs: {
        tags: ["A.P.M."],
        description: "ping",
        responses: {
            200: {
                schema: PingResponseSchema,
            },
        },
    },
    handler: [
        asyncRoute(async (req, res) => {
            return res.json("pong");
        }),
    ],
};

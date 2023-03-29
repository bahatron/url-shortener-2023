import { Router } from "express";
import { Route } from "./route.interface";
import swaggerUi from "swagger-ui-express";
import { createSwaggerDocs, SwaggerConfig } from "./swagger";
import { $env } from "../services/env";
import { getDirFiles } from "../utils/get-dir-files";
import { $logger } from "../services/logger";

export function AppRouter({
    routes,
    swagger,
}: {
    routes: Route[] | string;
    swagger?: SwaggerConfig;
}) {
    if (typeof routes === "string") {
        routes = autoDiscoverRoutes(routes);
    }

    let router = Router();

    for (let route of routes) {
        router[route.method](route.route, route.handler);
    }

    if ($env.ENABLE_SWAGGER) {
        let swaggerDocs = createSwaggerDocs({
            routes,
            ...swagger,
        });

        router.get("/docs/openapi.json", (req, res) => res.json(swaggerDocs));
        router.use("/docs", swaggerUi.serve);
        router.get("/docs", swaggerUi.setup(swaggerDocs));
    }

    return router;
}

function autoDiscoverRoutes(path: string) {
    return getDirFiles(path)
        .filter((path) => {
            return path.includes(".route.") && !path.endsWith(".map");
        })
        .map((route) => {
            let obj = require(route);

            return Object.entries(obj).reduce((entries, [route, value]) => {
                if (route.endsWith("Route")) {
                    entries.push(value as Route);

                    $logger.debug({ route }, "route registered");
                }

                return entries;
            }, [] as Route[]);
        })
        .flat();
}

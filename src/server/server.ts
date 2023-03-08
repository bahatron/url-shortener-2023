import express, { Router } from "express";
import { errorHandler } from "../middleware/error-handler";
import { setRequestIdMiddleware } from "../middleware/request-id";
import { requestTimerMiddleware } from "../middleware/request-logger";
import { Route } from "../models/route/route.interface";
import { setSessionIfPossible } from "../middleware/set-session";
import swaggerUi from "swagger-ui-express";
import { createSwaggerDocs } from "./swagger";
import { $env } from "../services/env";

export async function AppServer({
    routes,
    swaggerInfo = {
        title: "Swagger Docs",
        description: "A collection of exposed endpoints",
        version: "0.1.0",
    },
}: {
    routes: Route[];
    swaggerInfo?: {
        title?: string;
        description?: string;
        version?: string;
    };
}) {
    const app = express();

    app.use([
        express.json(),
        requestTimerMiddleware,
        setRequestIdMiddleware,
        setSessionIfPossible,
    ]);

    const router = Router();
    for (let route of routes) {
        router[route.method](route.route, route.handler);
    }

    if ($env.ENABLE_SWAGGER) {
        let swaggerDocs = createSwaggerDocs({
            routes,
            info: swaggerInfo,
        });

        router.get("/", (req, res) => res.redirect("/docs"));
        router.get("/docs/openapi.json", (req, res) => res.json(swaggerDocs));

        router.use("/docs", swaggerUi.serve);
        router.get("/docs", swaggerUi.setup(swaggerDocs));
    }

    app.use(router);
    app.use(errorHandler);

    return app;
}

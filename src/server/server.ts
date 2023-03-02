import express, { Router } from "express";
import { errorHandler } from "../middleware/error-handler";
import { setRequestIdMiddleware } from "../middleware/request-id";
import { requestTimerMiddleware } from "../middleware/request-logger";
import { Route } from "../models/route/route.interface";
import { setSessionIfPossible } from "../middleware/set-session";
import swaggerUi from "swagger-ui-express";
import { createSwaggerDocs } from "./swagger";
import { BullMonitorExpress } from "@bull-monitor/express";
import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";
import { $bull } from "../services/bull";
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

    /** @todo put this logic in a different function */
    if ($env.SWAGGER_ENABLED) {
        let swaggerDocs = createSwaggerDocs({
            routes,
            info: swaggerInfo,
        });

        router.get("/", (req, res) => res.redirect("/docs"));
        router.get("/docs/openapi.json", (req, res) => res.json(swaggerDocs));

        router.use("/docs", swaggerUi.serve);
        router.get("/docs", swaggerUi.setup(swaggerDocs));
    }

    if ($env.BULL_MONITOR_ENABLED === "1") {
        const monitor = new BullMonitorExpress({
            queues: $bull.QUEUES.map((queue) => new BullAdapter(queue)),
            gqlIntrospection: false,
            metrics: {
                // collect metrics every X
                // where X is any value supported by https://github.com/kibertoad/toad-scheduler
                // collectInterval: { hours: 1 },
                maxMetrics: 100,
                // disable metrics for specific queues
                // blacklist: ["1"],
            },
        });

        await monitor.init();

        app.use("/bull-m", monitor.router);
    }

    app.use(router);
    app.use(errorHandler);

    return app;
}

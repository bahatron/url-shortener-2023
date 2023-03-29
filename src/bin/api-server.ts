import "../utils/process-starters";
import { $logger } from "../services/logger";
import { AppServer } from "../server/server";
import { $env } from "../services/env";
import { errorHandler } from "../middleware/error-handler";
import { AppRouter } from "../server/router";
import { PingRoute } from "../routes/ping/ping.route";
import { CreateShortenedUrlRoute } from "../routes/create-shortened-url/create-shortened-url.route";
import { RedirectToOriginalRoute } from "../routes/redirect-to-original/redirect-to-original.route";
import { REQUEST_LOGGER_MIDDLEWARE } from "../middleware/request-logger";
import { REQUEST_ID_MIDDLEWARE } from "../middleware/request-id";

AppServer({
    middleware: [REQUEST_LOGGER_MIDDLEWARE, REQUEST_ID_MIDDLEWARE],
    router: AppRouter({
        routes: [PingRoute, CreateShortenedUrlRoute, RedirectToOriginalRoute],
    }),
    errorHandler: errorHandler,
}).then((app) => {
    app.listen($env.PORT, () => {
        $logger.debug(`debug mode enabled`);
        $logger.info(`Server listening in port ${$env.PORT}`);
    });
});

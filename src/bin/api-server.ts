import { $logger, REQUEST_ID_KEY } from "../services/logger";
import { AsyncContext } from "@bahatron/utils/lib/context";
import { AppServer } from "../server/server";
import { $env } from "../services/env";
import { PingRoute } from "../controllers/ping/ping.route";

["uncaughtException", "unhandledRejection"].map((event) => {
    process.on(event, async (error) => {
        $logger.error(
            {
                error,
                request_id: AsyncContext.get(REQUEST_ID_KEY),
            },
            event,
        );

        process.exit(-1);
    });
});

AppServer({ routes: [PingRoute] }).then((app) => {
    app.listen($env.PORT, () => {
        $logger.debug(`debug mode enabled`);
        $logger.info(`Server listening in port ${$env.PORT}`);
    });
});

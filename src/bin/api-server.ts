import { $logger } from "../services/logger";
import { AppServer } from "../server/server";
import { $env } from "../services/env";
import { PingRoute } from "../controllers/ping/ping.route";
import "../utils/process-starters";

AppServer({ routes: [PingRoute] }).then((app) => {
    app.listen($env.PORT, () => {
        $logger.debug(`debug mode enabled`);
        $logger.info(`Server listening in port ${$env.PORT}`);
    });
});

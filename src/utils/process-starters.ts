import { AsyncContext } from "@bahatron/utils/lib/context";
import { $logger, REQUEST_ID_KEY } from "../services/logger";

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

import { Logger } from "@bahatron/utils";
import { AsyncContext } from "@bahatron/utils/lib/context";
import { $env } from "./env";

export const REQUEST_ID_KEY = "request_id";

export const $logger = Logger.Logger({
    id: () => AsyncContext.get(REQUEST_ID_KEY),
    pretty: $env.DEV_MODE,
    debug: $env.DEBUG_ENABLED,
});

import { RunInContext } from "@bahatron/utils/lib/context";
import { randomUUID } from "crypto";
import { RequestHandler } from "express";
import { $logger, REQUEST_ID_KEY } from "../services/logger";

export const REQUEST_ID_MIDDLEWARE: RequestHandler = async (req, res, next) => {
    try {
        await RunInContext(next, {
            [REQUEST_ID_KEY]: req.headers["x-request-id"] || randomUUID(),
        });
    } catch (err) {
        $logger.error(err);
        return next();
    }
};

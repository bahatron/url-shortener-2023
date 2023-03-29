import { RequestHandler } from "express";
import { $session } from "../services/session";
import { $logger } from "../services/logger";

export const SET_SESSION_MIDDLEWARE: RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        let token = req.headers["authorization"];

        if (!token) {
            return next();
        }

        let user: any = {};

        $session.setSessionUser(user);

        $logger.info(`session set from request headers`);

        return next();
    } catch (err) {
        $logger.warning(err, "failed setting session from headers");
        return next();
    }
};

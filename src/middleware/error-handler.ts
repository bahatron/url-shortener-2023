import { AsyncContext } from "@bahatron/utils/lib/context";
import { ErrorRequestHandler } from "express";
import { $logger, REQUEST_ID_KEY } from "../services/logger";

export const ERROR_HANDLER_MIDDLEWARE: ErrorRequestHandler = (err, req, res, next) => {
    let code = validHttpCode(err.code);
    let request_id = AsyncContext.get(REQUEST_ID_KEY);

    let context = {
        error: err,
        error_code: err.code,
        request_headers: req.headers,
        request_body: req.body,
        request_params: req.params,
        request_query: req.query,
    };

    if (code >= 500) {
        $logger.error(context, err.message);
    } else {
        $logger.warning(context, err.message);
    }

    return res.status(code).json({
        error: err.message,
        context: err.context,
        request_id,
    });
};

function validHttpCode(code: any): number {
    return isNaN(code) || code >= 600 ? 500 : parseInt(code);
}

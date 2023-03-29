import express, { ErrorRequestHandler, RequestHandler, Router } from "express";

export async function AppServer({
    router,
    middleware,
    errorHandler,
}: {
    middleware: (RequestHandler | [string, RequestHandler])[];
    router: Router | Router[];
    errorHandler: ErrorRequestHandler;
}) {
    const app = express();

    app.use(express.json());

    middleware.forEach((middleware) => {
        Array.isArray(middleware)
            ? app.use(...middleware)
            : app.use(middleware);
    });

    if (router) app.use(router);

    app.use(errorHandler);

    return app;
}

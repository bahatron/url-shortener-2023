import { JsonSchema } from "@bahatron/utils/lib/types";
import { Route } from "./route.interface";

export interface SwaggerConfig {
    info?: {
        title?: string;
        description?: string;
        version?: string;
    };
    securitySchemes?: Record<
        string,
        {
            in: "header";
            name: string;
            type: "apiKey";
        }
    >;
}

export const createSwaggerDocs = ({
    routes,
    info = {
        title: "Swagger Docs",
        description: "A collection of exposed endpoints",
        version: "0.1.0",
    },
    securitySchemes = {
        Session: {
            in: "header",
            name: "Authorization",
            type: "apiKey",
        },
    },
}: SwaggerConfig & {
    routes: Route[];
}) => {
    return {
        openapi: "3.0.0",

        info,

        servers: [
            {
                url: "/",
            },
        ],

        paths: toSwaggerPaths(routes),

        components: {
            securitySchemes,

            schemas: parseSchemas(routes),
        },
    };
};

function toSwaggerPaths(routes: Route[]) {
    return routes.reduce((carry, route) => {
        let path = route.route
            .split("/")
            .map((bit) => (bit.startsWith(":") ? `{${bit.slice(1)}}` : bit))
            .join("/");

        if (!carry[path]) {
            carry[path] = {} as any;
        }

        carry[path][route.method] = parseSwaggerRoute(route.docs);

        return carry;
    }, {} as Record<string, Record<Route["method"], any>>);
}

function parseSwaggerRoute(docs: Route["docs"]) {
    return {
        ...docs,
        requestBody: docs?.requestBody && {
            required: docs.requestBody.required,
            content: {
                "application/json": {
                    schema: docs.requestBody.schema,
                },
            },
        },
        responses:
            docs?.responses &&
            Object.entries(docs?.responses).reduce((carry, [status, doc]) => {
                carry[status as any] = {
                    description: doc.description,
                    content: {
                        "application/json": {
                            schema: doc.schema,
                        },
                    },
                };
                return carry;
            }, {} as Record<number, any>),
    };
}

function parseSchemas(routes: Route[]) {
    return routes.reduce((partial, route) => {
        return {
            ...partial,
            ...route.docs?.schemas,
        };
    }, {} as Record<string, JsonSchema>);
}

import express from "express";
import { PingQuery } from "../graphql/ping/ping.query";
import { PingResolver } from "../graphql/ping/ping.resolver";
import { $logger } from "../services/logger";
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const QUERIES = [PingQuery];
const RESOLVERS = [PingResolver];

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    ${QUERIES.join(`\n`)}
  },
`);

// The root provides a resolver function for each API endpoint
let root = RESOLVERS.reduce((partial, item) => {
    Object.entries(item).forEach(([key, value]) => {
        partial[key] = value;
    });

    return partial;
}, {} as Record<string, Function>);

let app = express();

app.use(
    "/",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }),
);

app.listen(4000, () => {
    $logger.info("Running a GraphQL API server at http://localhost:4000");
});

import { $logger } from "../services/logger";

let express = require("express");
let { graphqlHTTP } = require("express-graphql");
let { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    ping: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    ping: () => {
        return "pong";
    },
};

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

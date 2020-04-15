const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config({ path: "variables.env" });

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const User = require("./models/User");
const Job = require("./models/Job");

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    Job,
    User,
  }),
});

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

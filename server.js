const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const User = require("./models/User");
const Job = require("./models/Job");

const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

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

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log("Server Running");
});

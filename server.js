const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    currentUser: req.currentUser,
  }),
});

const app = express();
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];

  if (
    token !== "null" &&
    token !== "undefined" &&
    typeof token !== "undefined"
  ) {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

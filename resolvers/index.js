const { Query } = require("./Query/Query");
const { Mutation } = require("./Mutation/Mutation");

exports.resolvers = [Query, Mutation];

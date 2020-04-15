const { User } = require("./User/User");
const { Job } = require("./Job/Job");
const { Query } = require("./Query/Query");

exports.typeDefs = [User, Job, Query];

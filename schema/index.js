const { User } = require("./User/User");
const { Job } = require("./Job/Job");
const { Token } = require("./Token/Token");
const { Query } = require("./Query/Query");
const { Mutation } = require("./Mutation/Mutation");

exports.typeDefs = [User, Job, Query, Token, Mutation];

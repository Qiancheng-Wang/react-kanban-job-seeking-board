const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Job {
    title: String!
    company: String!
    role_level: String
    job_description: String!
    createdDate: String
    created_username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    jobs: [Job]
  }

  type Query {
    getAllJobs: [Job]
  }
`;

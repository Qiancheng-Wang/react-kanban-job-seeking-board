const Query = `
  type Query {
    validateService: String!

    getCurrentUser: User

    getJobsByUserId(_id: String!): [Job]
  }
`;

exports.Query = Query;

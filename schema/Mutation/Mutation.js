const Mutation = `
  type Mutation {
    signupUser(username: String!, email: String!, password: String!): Token
  }
`;

exports.Mutation = Mutation;

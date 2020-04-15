const Mutation = `
  type Mutation {
    signUp(username: String!, email: String!, password: String!): Token

    signIn(username: String!, password: String!): Token
  }
`;

exports.Mutation = Mutation;

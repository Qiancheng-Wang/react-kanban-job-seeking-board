const Mutation = `
  type Mutation {
    signUp(username: String!, email: String!, password: String!): Token

    signIn(username: String!, password: String!): Token

    addJob(title: String!, company: String!, role_level: ROLE_LEVEL!, skill_set: [String]! , job_description: String!, created_id: ID): Job

    moveJob(_id: String! , status: String!): Job
  }
`;

exports.Mutation = Mutation;

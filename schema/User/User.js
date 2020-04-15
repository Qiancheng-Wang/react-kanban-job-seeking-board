const User = `
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    jobs: [Job]
  }
`;

exports.User = User;

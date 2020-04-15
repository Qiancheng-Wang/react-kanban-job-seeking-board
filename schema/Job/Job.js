const Job = `
  type Job {
    _id: ID
    title: String!
    company: String!
    role_level: String
    job_description: String!
    createdDate: String
    created_username: String
  }
`;

exports.Job = Job;

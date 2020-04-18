const Job = `
  type Job {
    _id: ID
    title: String!
    company: String!
    role_level: ROLE_LEVEL!
    skill_set: [String]!
    job_description: String!
    createdDate: String
    status: STATUS!
    created_id: ID
  }

  enum ROLE_LEVEL {
    GRADUATE
    ASSOCIATE
    JUNIOR
    MID_LEVEL
    SENIOR
    PRINCIPLE
  }

  enum STATUS {
    NEW
    APPLIED
    PHONE_INTERVIEW
    ONLINE_INTERVIEW
    ONSITE_INTERVIEW
    OFFER
    ACCEPTED
  }
`;
exports.Job = Job;

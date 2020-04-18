import { gql } from "apollo-boost";

export const SIGN_UP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`;

export const ADD_JOB = gql`
  mutation(
    $title: String!
    $role_level: ROLE_LEVEL!
    $company: String!
    $skill_set: [String]!
    $job_description: String!
    $created_id: ID
  ) {
    addJob(
      title: $title
      role_level: $role_level
      company: $company
      skill_set: $skill_set
      job_description: $job_description
      created_id: $created_id
    ) {
      title
      role_level
      company
      skill_set
      job_description
      created_id
    }
  }
`;

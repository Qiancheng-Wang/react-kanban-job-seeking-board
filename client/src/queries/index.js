import { gql } from "apollo-boost";

export const VALIDATE_SERVICE = gql`
  query {
    validateService
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      joinDate
    }
  }
`;

export const GET_JOBS_BY_USER_ID = gql`
  query($_id: String!) {
    getJobsByUserId(_id: $_id) {
      _id
      title
      company
      role_level
      skill_set
      job_description
      updateDate
      status
      created_id
    }
  }
`;

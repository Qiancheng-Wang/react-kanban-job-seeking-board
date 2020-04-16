import { gql } from "apollo-boost";

export const VALIDATE_SERVICE = gql`
  query {
    validateService
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinDate
    }
  }
`;

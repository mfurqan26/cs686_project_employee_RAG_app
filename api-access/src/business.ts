import { gql } from "@apollo/client";

export const BUSINESS_FIELDS = gql`
  fragment BusinessFields on Business {
    id
    createdAt
    updatedAt
    name
    industry
  }
`;

export const GET_BUSINESSES = gql`
  query GetBusinesses {
    businesses {
      ...BusinessFields
    }
  }
  ${BUSINESS_FIELDS}
`;

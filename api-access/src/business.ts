import { gql } from "@apollo/client";

export const BUSINESS_FIELDS = gql`
  fragment Business on Business {
    id
    createdAt
    updatedAt
    name
    NAICSId
  }
`;

export const BUSINESSES_GQL = gql`
  ${BUSINESS_FIELDS}
  query businesses {
    businesses {
      ...Business
    }
  }
`;

export const BUSINESS_GQL = gql`
  ${BUSINESS_FIELDS}
  query business($id: String!) {
    business(id: $id) {
      ...Business
    }
  }
`;

export const CREATE_BUSINESS_GQL = gql`
  ${BUSINESS_FIELDS}
  mutation createBusiness($data: BusinessCreateInput!) {
    createBusiness(data: $data) {
      ...Business
    }
  }
`;

export const UPDATE_BUSINESS_GQL = gql`
  ${BUSINESS_FIELDS}
  mutation updateBusiness($data: BusinessUpdateInput!) {
    updateBusiness(data: $data) {
      ...Business
    }
  }
`;

export const DELETE_BUSINESS_GQL = gql`
  ${BUSINESS_FIELDS}
  mutation deleteBusiness($id: String!) {
    deleteBusiness(id: $id) {
      ...Business
    }
  }
`;

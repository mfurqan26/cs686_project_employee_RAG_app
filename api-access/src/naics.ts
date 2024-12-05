import { gql } from "@apollo/client";

export const NAICS_DESCRIPTOR_FIELDS = gql`
  fragment NAICSDescriptor on NAICSDescriptor {
    naicsId
    content
    category
  }
`;

export const NAICS_FIELDS = gql`
  fragment NAICS on NAICS {
    code
    name
    createdAt
    updatedAt
  }
`;

export const NAICS_LIST_GQL = gql`
  ${NAICS_FIELDS}
  ${NAICS_DESCRIPTOR_FIELDS}
  query naicsList {
    naicsList {
      ...NAICS
      NAICSDescriptor {
        ...NAICSDescriptor
      }
    }
  }
`;

export const NAICS_GQL = gql`
  ${NAICS_FIELDS}
  ${NAICS_DESCRIPTOR_FIELDS}
  query naics($code: Int!) {
    naics(code: $code) {
      ...NAICS
      NAICSDescriptor {
        ...NAICSDescriptor
      }
    }
  }
`;

export const NAICS_EXISTS_GQL = gql`
  query naicsExists($code: Int!) {
    naicsExists(code: $code)
  }
`;

import { gql } from "@apollo/client";

export const LLM_RECORD_FIELDS = gql`
  fragment LLMRecord on LLMRecord {
    id
    createdAt
    updatedAt
    runStatus
    content
    modelName
    temperature
    generateType
    businessId
  }
`;

export const LLM_RECORDS_GQL = gql`
  ${LLM_RECORD_FIELDS}
  query llmRecords($businessId: String!) {
    llmRecords(businessId: $businessId) {
      ...LLMRecord
    }
  }
`;

export const GENERATE_RUN_LLM_GQL = gql`
  ${LLM_RECORD_FIELDS}
  mutation generateRunLLM($data: LLMRecordCreateInput!) {
    generateRunLLM(data: $data) {
      ...LLMRecord
    }
  }
`;

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Business = {
  NAICSId: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BusinessCreateInput = {
  id: Scalars['String']['input'];
  naicsId?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  createBusiness: Business;
};


export type MutationcreateBusinessArgs = {
  data: BusinessCreateInput;
};

export type NAICS = {
  Business: Maybe<Array<Business>>;
  NAICSDescriptor: Maybe<Array<NAICSDescriptor>>;
  code: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NAICSDescriptor = {
  category: Array<NAICSDescriptorCategory>;
  content: Scalars['String']['output'];
  naics: NAICS;
  naicsId: Scalars['Float']['output'];
};

export enum NAICSDescriptorCategory {
  DEFINITION = 'DEFINITION',
  EXAMPLE = 'EXAMPLE',
  EXCLUSION = 'EXCLUSION',
  ILLUSTRATIVE_EXAMPLE = 'ILLUSTRATIVE_EXAMPLE',
  INCLUSION = 'INCLUSION'
}

export type Query = {
  business: Maybe<Business>;
  businesses: Array<Business>;
  naics: Maybe<NAICS>;
  naicsExists: Scalars['Boolean']['output'];
  naicsList: Array<NAICS>;
};


export type QuerybusinessArgs = {
  id: Scalars['String']['input'];
};


export type QuerynaicsArgs = {
  code: Scalars['Int']['input'];
};


export type QuerynaicsExistsArgs = {
  code: Scalars['Int']['input'];
};

export type BusinessFieldsFragment = { __typename: 'Business', id: string, createdAt: any, updatedAt: any, name: string };

export type BusinessFragment = { __typename: 'Business', id: string, createdAt: any, updatedAt: any, name: string, NAICSId: number | null };

export type NAICSDescriptorFragment = { __typename: 'NAICSDescriptor', naicsId: number, content: string, category: Array<NAICSDescriptorCategory> };

export type NAICSFragment = { __typename: 'NAICS', code: string, name: string, createdAt: any, updatedAt: any };

export type GetBusinessesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBusinessesQuery = { businesses: Array<{ __typename: 'Business', id: string, createdAt: any, updatedAt: any, name: string }> };

export type businessesQueryVariables = Exact<{ [key: string]: never; }>;


export type businessesQuery = { businesses: Array<{ __typename: 'Business', id: string, createdAt: any, updatedAt: any, name: string, NAICSId: number | null }> };

export type businessQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type businessQuery = { business: { __typename: 'Business', id: string, createdAt: any, updatedAt: any, name: string, NAICSId: number | null } | null };

export type createBusinessMutationVariables = Exact<{
  data: BusinessCreateInput;
}>;


export type createBusinessMutation = { createBusiness: { __typename: 'Business', id: string, createdAt: any, updatedAt: any, name: string, NAICSId: number | null } };

export type naicsListQueryVariables = Exact<{ [key: string]: never; }>;


export type naicsListQuery = { naicsList: Array<{ __typename: 'NAICS', code: string, name: string, createdAt: any, updatedAt: any, NAICSDescriptor: Array<{ __typename: 'NAICSDescriptor', naicsId: number, content: string, category: Array<NAICSDescriptorCategory> }> | null }> };

export type naicsQueryVariables = Exact<{
  code: Scalars['Int']['input'];
}>;


export type naicsQuery = { naics: { __typename: 'NAICS', code: string, name: string, createdAt: any, updatedAt: any, NAICSDescriptor: Array<{ __typename: 'NAICSDescriptor', naicsId: number, content: string, category: Array<NAICSDescriptorCategory> }> | null } | null };

export type naicsExistsQueryVariables = Exact<{
  code: Scalars['Int']['input'];
}>;


export type naicsExistsQuery = { naicsExists: boolean };

export const BusinessFieldsFragmentDoc = gql`
    fragment BusinessFields on Business {
  id
  createdAt
  updatedAt
  name
}
    `;
export const BusinessFragmentDoc = gql`
    fragment Business on Business {
  id
  createdAt
  updatedAt
  name
  NAICSId
}
    `;
export const NAICSDescriptorFragmentDoc = gql`
    fragment NAICSDescriptor on NAICSDescriptor {
  naicsId
  content
  category
}
    `;
export const NAICSFragmentDoc = gql`
    fragment NAICS on NAICS {
  code
  name
  createdAt
  updatedAt
}
    `;
export const GetBusinessesDocument = gql`
    query GetBusinesses {
  businesses {
    ...BusinessFields
  }
}
    ${BusinessFieldsFragmentDoc}`;

/**
 * __useGetBusinessesQuery__
 *
 * To run a query within a React component, call `useGetBusinessesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBusinessesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBusinessesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBusinessesQuery(baseOptions?: Apollo.QueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBusinessesQuery, GetBusinessesQueryVariables>(GetBusinessesDocument, options);
      }
export function useGetBusinessesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBusinessesQuery, GetBusinessesQueryVariables>(GetBusinessesDocument, options);
        }
export function useGetBusinessesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBusinessesQuery, GetBusinessesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBusinessesQuery, GetBusinessesQueryVariables>(GetBusinessesDocument, options);
        }
export type GetBusinessesQueryHookResult = ReturnType<typeof useGetBusinessesQuery>;
export type GetBusinessesLazyQueryHookResult = ReturnType<typeof useGetBusinessesLazyQuery>;
export type GetBusinessesSuspenseQueryHookResult = ReturnType<typeof useGetBusinessesSuspenseQuery>;
export type GetBusinessesQueryResult = Apollo.QueryResult<GetBusinessesQuery, GetBusinessesQueryVariables>;
export const businessesDocument = gql`
    query businesses {
  businesses {
    ...Business
  }
}
    ${BusinessFragmentDoc}`;

/**
 * __usebusinessesQuery__
 *
 * To run a query within a React component, call `usebusinessesQuery` and pass it any options that fit your needs.
 * When your component renders, `usebusinessesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usebusinessesQuery({
 *   variables: {
 *   },
 * });
 */
export function usebusinessesQuery(baseOptions?: Apollo.QueryHookOptions<businessesQuery, businessesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<businessesQuery, businessesQueryVariables>(businessesDocument, options);
      }
export function usebusinessesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<businessesQuery, businessesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<businessesQuery, businessesQueryVariables>(businessesDocument, options);
        }
export function usebusinessesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<businessesQuery, businessesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<businessesQuery, businessesQueryVariables>(businessesDocument, options);
        }
export type businessesQueryHookResult = ReturnType<typeof usebusinessesQuery>;
export type businessesLazyQueryHookResult = ReturnType<typeof usebusinessesLazyQuery>;
export type businessesSuspenseQueryHookResult = ReturnType<typeof usebusinessesSuspenseQuery>;
export type businessesQueryResult = Apollo.QueryResult<businessesQuery, businessesQueryVariables>;
export const businessDocument = gql`
    query business($id: String!) {
  business(id: $id) {
    ...Business
  }
}
    ${BusinessFragmentDoc}`;

/**
 * __usebusinessQuery__
 *
 * To run a query within a React component, call `usebusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `usebusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usebusinessQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usebusinessQuery(baseOptions: Apollo.QueryHookOptions<businessQuery, businessQueryVariables> & ({ variables: businessQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<businessQuery, businessQueryVariables>(businessDocument, options);
      }
export function usebusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<businessQuery, businessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<businessQuery, businessQueryVariables>(businessDocument, options);
        }
export function usebusinessSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<businessQuery, businessQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<businessQuery, businessQueryVariables>(businessDocument, options);
        }
export type businessQueryHookResult = ReturnType<typeof usebusinessQuery>;
export type businessLazyQueryHookResult = ReturnType<typeof usebusinessLazyQuery>;
export type businessSuspenseQueryHookResult = ReturnType<typeof usebusinessSuspenseQuery>;
export type businessQueryResult = Apollo.QueryResult<businessQuery, businessQueryVariables>;
export const createBusinessDocument = gql`
    mutation createBusiness($data: BusinessCreateInput!) {
  createBusiness(data: $data) {
    ...Business
  }
}
    ${BusinessFragmentDoc}`;
export type createBusinessMutationFn = Apollo.MutationFunction<createBusinessMutation, createBusinessMutationVariables>;

/**
 * __usecreateBusinessMutation__
 *
 * To run a mutation, you first call `usecreateBusinessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usecreateBusinessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBusinessMutation, { data, loading, error }] = usecreateBusinessMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function usecreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<createBusinessMutation, createBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<createBusinessMutation, createBusinessMutationVariables>(createBusinessDocument, options);
      }
export type createBusinessMutationHookResult = ReturnType<typeof usecreateBusinessMutation>;
export type createBusinessMutationResult = Apollo.MutationResult<createBusinessMutation>;
export type createBusinessMutationOptions = Apollo.BaseMutationOptions<createBusinessMutation, createBusinessMutationVariables>;
export const naicsListDocument = gql`
    query naicsList {
  naicsList {
    ...NAICS
    NAICSDescriptor {
      ...NAICSDescriptor
    }
  }
}
    ${NAICSFragmentDoc}
${NAICSDescriptorFragmentDoc}`;

/**
 * __usenaicsListQuery__
 *
 * To run a query within a React component, call `usenaicsListQuery` and pass it any options that fit your needs.
 * When your component renders, `usenaicsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usenaicsListQuery({
 *   variables: {
 *   },
 * });
 */
export function usenaicsListQuery(baseOptions?: Apollo.QueryHookOptions<naicsListQuery, naicsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<naicsListQuery, naicsListQueryVariables>(naicsListDocument, options);
      }
export function usenaicsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<naicsListQuery, naicsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<naicsListQuery, naicsListQueryVariables>(naicsListDocument, options);
        }
export function usenaicsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<naicsListQuery, naicsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<naicsListQuery, naicsListQueryVariables>(naicsListDocument, options);
        }
export type naicsListQueryHookResult = ReturnType<typeof usenaicsListQuery>;
export type naicsListLazyQueryHookResult = ReturnType<typeof usenaicsListLazyQuery>;
export type naicsListSuspenseQueryHookResult = ReturnType<typeof usenaicsListSuspenseQuery>;
export type naicsListQueryResult = Apollo.QueryResult<naicsListQuery, naicsListQueryVariables>;
export const naicsDocument = gql`
    query naics($code: Int!) {
  naics(code: $code) {
    ...NAICS
    NAICSDescriptor {
      ...NAICSDescriptor
    }
  }
}
    ${NAICSFragmentDoc}
${NAICSDescriptorFragmentDoc}`;

/**
 * __usenaicsQuery__
 *
 * To run a query within a React component, call `usenaicsQuery` and pass it any options that fit your needs.
 * When your component renders, `usenaicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usenaicsQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function usenaicsQuery(baseOptions: Apollo.QueryHookOptions<naicsQuery, naicsQueryVariables> & ({ variables: naicsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<naicsQuery, naicsQueryVariables>(naicsDocument, options);
      }
export function usenaicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<naicsQuery, naicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<naicsQuery, naicsQueryVariables>(naicsDocument, options);
        }
export function usenaicsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<naicsQuery, naicsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<naicsQuery, naicsQueryVariables>(naicsDocument, options);
        }
export type naicsQueryHookResult = ReturnType<typeof usenaicsQuery>;
export type naicsLazyQueryHookResult = ReturnType<typeof usenaicsLazyQuery>;
export type naicsSuspenseQueryHookResult = ReturnType<typeof usenaicsSuspenseQuery>;
export type naicsQueryResult = Apollo.QueryResult<naicsQuery, naicsQueryVariables>;
export const naicsExistsDocument = gql`
    query naicsExists($code: Int!) {
  naicsExists(code: $code)
}
    `;

/**
 * __usenaicsExistsQuery__
 *
 * To run a query within a React component, call `usenaicsExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `usenaicsExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usenaicsExistsQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function usenaicsExistsQuery(baseOptions: Apollo.QueryHookOptions<naicsExistsQuery, naicsExistsQueryVariables> & ({ variables: naicsExistsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<naicsExistsQuery, naicsExistsQueryVariables>(naicsExistsDocument, options);
      }
export function usenaicsExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<naicsExistsQuery, naicsExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<naicsExistsQuery, naicsExistsQueryVariables>(naicsExistsDocument, options);
        }
export function usenaicsExistsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<naicsExistsQuery, naicsExistsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<naicsExistsQuery, naicsExistsQueryVariables>(naicsExistsDocument, options);
        }
export type naicsExistsQueryHookResult = ReturnType<typeof usenaicsExistsQuery>;
export type naicsExistsLazyQueryHookResult = ReturnType<typeof usenaicsExistsLazyQuery>;
export type naicsExistsSuspenseQueryHookResult = ReturnType<typeof usenaicsExistsSuspenseQuery>;
export type naicsExistsQueryResult = Apollo.QueryResult<naicsExistsQuery, naicsExistsQueryVariables>;
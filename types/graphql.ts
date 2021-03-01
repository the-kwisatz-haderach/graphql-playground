import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  addLocation: Location;
};


export type MutationAddUserArgs = {
  input: UserInput;
};


export type MutationAddLocationArgs = {
  input: LocationInput;
};

export type Query = {
  __typename?: 'Query';
  locations: Array<Maybe<Location>>;
  location: Location;
  users: Array<Maybe<User>>;
  user: User;
  review: Review;
  reviews: Array<Maybe<Review>>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryReviewArgs = {
  id: Scalars['ID'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  coordinates: Coordinates;
  name: Scalars['String'];
  reviews: Array<Maybe<Review>>;
  creator: User;
};

export type CoordinatesInput = {
  latitude: Scalars['Int'];
  longitude: Scalars['Int'];
};

export type LocationInput = {
  coordinates: CoordinatesInput;
  name: Scalars['String'];
  creator: Scalars['ID'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ID'];
  rating: Scalars['Int'];
  author: User;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLocationsQuery = (
  { __typename?: 'Query' }
  & { locations: Array<Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, '_id'>
  )>> }
);


export const GetLocationsDocument = gql`
    query GetLocations {
  locations {
    _id
  }
}
    `;

/**
 * __useGetLocationsQuery__
 *
 * To run a query within a React component, call `useGetLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
        return Apollo.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, baseOptions);
      }
export function useGetLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables>) {
          return Apollo.useLazyQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, baseOptions);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsQueryResult = Apollo.QueryResult<GetLocationsQuery, GetLocationsQueryVariables>;
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


export type IMutation = {
  __typename?: 'Mutation';
  addUser: IUser;
  addLocation: ILocation;
};


export type IMutationAddUserArgs = {
  input: IUserInput;
};


export type IMutationAddLocationArgs = {
  input: ILocationInput;
};

export type IQuery = {
  __typename?: 'Query';
  locations: Array<Maybe<ILocation>>;
  location: ILocation;
  users: Array<Maybe<IUser>>;
  user: IUser;
  review: IReview;
  reviews: Array<Maybe<IReview>>;
};


export type IQueryLocationArgs = {
  id: Scalars['ID'];
};


export type IQueryUserArgs = {
  id: Scalars['ID'];
};


export type IQueryReviewArgs = {
  id: Scalars['ID'];
};

export type ICoordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['String'];
  longitude: Scalars['String'];
};

export type ILocation = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  coordinates: ICoordinates;
  name: Scalars['String'];
  reviews: Array<Maybe<IReview>>;
  creator: IUser;
};

export type ICoordinatesInput = {
  latitude: Scalars['Int'];
  longitude: Scalars['Int'];
};

export type ILocationInput = {
  coordinates: ICoordinatesInput;
  name: Scalars['String'];
  creator: Scalars['ID'];
};

export type IReview = {
  __typename?: 'Review';
  _id: Scalars['ID'];
  rating: Scalars['Int'];
  author: IUser;
};

export type IUser = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
};

export type IUserInput = {
  username: Scalars['String'];
};

export enum ICacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type IGetLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type IGetLocationsQuery = (
  { __typename?: 'Query' }
  & { locations: Array<Maybe<(
    { __typename?: 'Location' }
    & Pick<ILocation, '_id'>
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
export function useGetLocationsQuery(baseOptions?: Apollo.QueryHookOptions<IGetLocationsQuery, IGetLocationsQueryVariables>) {
        return Apollo.useQuery<IGetLocationsQuery, IGetLocationsQueryVariables>(GetLocationsDocument, baseOptions);
      }
export function useGetLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetLocationsQuery, IGetLocationsQueryVariables>) {
          return Apollo.useLazyQuery<IGetLocationsQuery, IGetLocationsQueryVariables>(GetLocationsDocument, baseOptions);
        }
export type GetLocationsQueryHookResult = ReturnType<typeof useGetLocationsQuery>;
export type GetLocationsLazyQueryHookResult = ReturnType<typeof useGetLocationsLazyQuery>;
export type GetLocationsQueryResult = Apollo.QueryResult<IGetLocationsQuery, IGetLocationsQueryVariables>;
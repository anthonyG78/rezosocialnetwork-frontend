import gql from 'graphql-tag';
import apolloClient from '../graphql/apollo-client';
import fragments from '../graphql/fragments';

export default {
  // User
  getUser: id => apolloClient.query({
    query: gql`
      query($id: ID!) {
        getUser(id: $id) {
          ...userFields
        }
    }
    ${fragments.userFields}
    `,
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.getUser),
  searchUsers: (term, limit) => apolloClient.query({
    query: gql`
      query($term: String, $limit: Int) {
        searchUsers(term: $term, limit: $limit) {
          ...userFields
        }
    }
    ${fragments.userFields}
    `,
    variables: {
      term,
      limit,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.searchUsers),
  searchFriends: (id, term, limit) => apolloClient.query({
    query: gql`
      query($id: ID!, $term: String, $limit: Int) {
        searchFriends(id: $id, term: $term, limit: $limit) {
          ...userFields
        }
    }
    ${fragments.userFields}
    `,
    variables: {
      id,
      term,
      limit,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.searchFriends),
  // Posts
  getCommunityPosts: userId => apolloClient.query({
    query: gql`query($id: ID!) {
      getCommunityPosts(id: $id) {
        ...postsFields
      }
    }
    ${fragments.postsFields}
    ${fragments.minUserFields}
    `,
    variables: {
      id: userId,
    },
    fetchPolicy: 'network-only',
    // pollInterval: 30000,
  }).then(response => response.data.getCommunityPosts),
  getPosts: userId => apolloClient.query({
    query: gql`
      query($id: ID!) {
        getPosts(id: $id) {
          ...postsFields
        }
    }
    ${fragments.postsFields}
    ${fragments.minUserFields}
    `,
    variables: {
      id: userId,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.getPosts),
  getPost: postId => apolloClient.query({
    query: gql`
      query($id: ID!) {
        getPost(id: $id) {
          ...postFields
        }
    }
    ${fragments.postFields}
    ${fragments.minUserFields}
    `,
    variables: {
      id: postId,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.getPost),
  // Friends
  getFriends: userId => apolloClient.query({
    query: gql`query($id: ID!) {
      getFriends(id: $id) {
        ...userFields
      }
    }
    ${fragments.userFields}
    `,
    variables: {
      id: userId,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.getFriends),
  // Discussions
  getDiscussions: userId => apolloClient.query({
    query: gql`query($id: ID!) {
      getDiscussions(id: $id) {
        ...discussionsFields
      }
    }
    ${fragments.discussionsFields}
    ${fragments.minUserFields}
    `,
    variables: {
      id: userId,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.getDiscussions),
  getDiscussion: discussionId => apolloClient.query({
    query: gql`query($id: ID!) {
      getDiscussion(id: $id) {
        ...discussionFields
      }
    }
    ${fragments.discussionFields}
    ${fragments.minUserFields}
    ${fragments.messageFields}
    `,
    variables: {
      id: discussionId,
    },
    fetchPolicy: 'network-only',
  }).then(response => response.data.getDiscussion),
};

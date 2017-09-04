import gql from 'graphql-tag';

export default {
  userFields: gql`
    fragment userFields on User {
      _id,
      id,
      email,
      username,
      firstName,
      lastName,
      avatar,
      background,
      gender,
      age,
      connected,
      date,
      level,
      accepted,
    }
  `,
  minUserFields: gql`
    fragment minUserFields on User {
      _id,
      id,
      email,
      username,
      avatar,
      connected,
      accepted,
    }
  `,
  postsFields: gql`
    fragment postsFields on Post {
      id,
      title,
      text,
      date,
      image,
      toUser {
        ...minUserFields
      },
      fromUser {
        ...minUserFields
      },
      comments {
        date,
      },
    }
  `,
  postFields: gql`
    fragment postFields on Post {
      id,
      title,
      text,
      date,
      image,
      toUser {
        ...minUserFields
      },
      fromUser {
        ...minUserFields
      },
      comments {
        text,
        date,
        user {
          ...minUserFields
        }
      },
    }
  `,
  discussionsFields: gql`
    fragment discussionsFields on Discussion {
      id,
      users {
        ...minUserFields
      }
      subject,
      messages {
        userId,
      },
      date,
      dateMaj
    }
  `,
  discussionFields: gql`
    fragment discussionFields on Discussion {
      id,
      state,
      users {
        ...minUserFields
      }
      subject,
      messages {
        ...messageFields
      },
      date
    }
  `,
  messageFields: gql`
    fragment messageFields on Message {
      user {
        ...minUserFields
      },
      text,
      date,
    }
  `,
};

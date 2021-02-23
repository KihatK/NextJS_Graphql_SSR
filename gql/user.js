import gql from 'graphql-tag';

export const USER_DETAIL = gql`
  query user($userId: String!) {
    user(id: $userId) {
      id
      name
      color
    }
  }
`;

export const GET_POST = gql`
  mutation post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
    }
  }
`;
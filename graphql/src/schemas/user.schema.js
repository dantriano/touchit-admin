import { gql } from "apollo-server";

const userSchema = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    picture: String
    email: String
    token: String
    bind: [Bind]
    status: String
  }

  type Bind {
    employee: ID
    company: ID
  }
  input userInput {
    _id: ID
    name: String
    email: String
    password: String
    status: String
  }
  extend type Query {
    user(input: userInput!): User
    users(input: userInput!): [User]
    login(input: userInput!): User
    token(input: userInput!): String!
  }
  extend type User {
    _employee: [Employee]
    _company: [Company]
  }
  extend type Mutation {
    saveUser(input: userInput!): Boolean
    removeUser(input: userInput!): Boolean
  }
`;
export default userSchema;

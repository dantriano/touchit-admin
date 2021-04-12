import { gql } from "apollo-server";

const userSchema = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    picture: String
    email: String
    token: String
    companies: [Companies]
    status: String
  }

  type Companies {
    employee: String
    company: String
  }

  input companiesInput {
    employee: String
    company: String
  }
  input userInput {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    companies: [companiesInput]
    status: String
  }
  extend type Query {
    user(input: userInput!): User
    users(input: userInput): [User]
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

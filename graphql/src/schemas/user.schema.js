import { gql } from 'apollo-server';

const userSchema=gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    picture: String
    email: String
    token: String
    employee:[ID]
    company:[ID]
  }

  type Token { 
    _id: ID
    email: String
    firstName: String
    lastName: String
    picture: String
    employee: [ID]
    company: [ID]
    token: String
  }
  input userInput  {
    _id: ID,
    name: String
    email: String
    password: String
  }
  extend type Query {
    user(input: userInput!): User!
    login(input: userInput!): User!
    token(input: userInput!): String!
  }
  extend type User {
    _employee: [Employee]
    _company: [Company]
  }
  extend type Mutation {
    saveUser(input:userInput!): Boolean
  }
`;
export default userSchema;
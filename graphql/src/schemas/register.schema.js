import { gql } from 'apollo-server';

const registerSchema= gql`
  type Register {
    _id: ID
    activity: String
    employee: String
  }
  extend type Register{
    _activity: Activity
    _employee: Employee
  }
  input registerInput  {
    _id: ID,
    activity: String
    employee: String
  }
  extend type Query {
    register(input: registerInput): Register
    registers(input: registerInput): [Register]
  }
  extend type Mutation {
    saveRegister(input:registerInput!): Boolean
    removeRegister(_id: ID!): Boolean
  }
`;
export default registerSchema;
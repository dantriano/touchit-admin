import { gql } from 'apollo-server';

const registerSchema= gql`
  scalar Date
  type Register {
    _id: ID
    activity: String
    employee: String
    company: ID
    start: Date
    end: Date 
    delay: Int
    inPosition: Boolean
    location: latLng
  }
  extend type Register{
    _activity: Activity
    _employee: Employee
  }
  input registerInput  {
    _id: ID
    company: ID
    activity: String
    employee: String
    start: Date
    end: Date
    delay: Int
    inPosition: Boolean
    location: latLngInput
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
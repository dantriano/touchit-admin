import { gql } from "apollo-server";

const registerSchema = gql`
  scalar Date
  type Register {
    _id: ID
    name: String
    activity: ID
    employee: ID
    company: ID
    start: Date
    end: Date
    delay: Int
    inPosition: Boolean
    location: latLng
    status: String
  }
  extend type Register {
    _employee: Employee
  }
  input registerInput {
    _id: ID
    name: String
    company: ID
    employee: ID
    activity: ID
    start: Date
    end: Date
    delay: Int
    inPosition: Boolean
    location: latLngInput
    status: String
  }
  extend type Query {
    register(input: registerInput): Register
    registers(input: registerInput): [Register]
  }
  extend type Mutation {
    saveRegister(input: registerInput!): Boolean
    removeRegister(input: registerInput!): Boolean
  }
`;
export default registerSchema;

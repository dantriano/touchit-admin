import { gql } from "apollo-server";
import locationSchema from "./location.schema";

const companySchema = gql`
  type Company {
    _id: ID
    name: String
    locations: [Location]
    status: String
    options: [String]
  }
  input companyInput {
    _id: ID
    name: String
    status: String
    options: [String]
  }

  extend type Query {
    company(input: companyInput): Company
    companies(input: companyInput): [Company]
  }
  extend type Mutation {
    saveCompany(input: companyInput!): Boolean
    removeCompany(input: companyInput!): Boolean
  }
`;
export default companySchema;

import { gql } from "apollo-server";

const companySchema = gql`
  type Company {
    _id: ID
    name: String
    options: [String]
  }
  input companyInput {
    _id: ID
    name: String
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

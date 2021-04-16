import { gql } from "apollo-server";
import locationSchema from "./location.schema";
import groupShema from "./group.schema";
import activitySchema from "./activity.schema";

const companySchema = gql`
  type Company {
    _id: ID
    name: String
    locations: [Location]
    groups: [Group]
    activities: [Activity]
    status: String
    options: [String]
  }
  input companyInput {
    _id: String
    name: String
    status: String
    locations: [locationInput]
    groups: [groupInput]
    activities: [activityInput]
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

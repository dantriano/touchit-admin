import { gql } from "apollo-server";

const companySchema = gql`
  type Company {
    _id: ID
    name: String
    locations: [Location]
    groups: [Group]
    activities: [Activity]
    schedules: [Schedule]
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
    schedules: [scheduleInput]
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

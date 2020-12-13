import { gql } from "apollo-server";
const configurationSchema = gql`
  type Configuration {
    _id: ID
    type: String
    name: String
    desc: String
    company: String
    section: String
    companies: [ID]
    sections: [String]
    status: String
    value: configurationType
  }
  type configurationType {
    name: String
    sections: [ID]
    status: String
  }
  input configurationInput {
    _id: ID
    type: String
    name: String
    desc: String
    company: String
    section: String
    companies: [ID]
    sections: [String]
    status: String
    value: configurationValueInput
  }
  input configurationValueInput {
    name: String
    sections: [ID]
    status: String
  }
  extend type Query {
    configuration(input: configurationInput): Configuration
    configurations(input: configurationInput): [Configuration]
  }
  extend type Mutation {
    saveConfiguration(input:configurationInput!): Boolean
    removeConfiguration(input:configurationInput!): Boolean
  }
`;
export default configurationSchema;

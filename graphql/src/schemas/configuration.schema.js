import { gql } from "apollo-server";
const configurationSchema = gql`
  type Configuration {
    _id: String
    type: String
    name: String
    desc: String
    status: String
    companies: [ID]
    value: configurationType
  }
  type configurationType {
    name: String
    sections: [ID]
    status: String
  }
  input configurationInput {
    id: String
    type: String
    companies: ID
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
`;
export default configurationSchema;

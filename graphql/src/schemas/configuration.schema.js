import { gql } from 'apollo-server';

const configurationSchema= gql`
  type Configuration {
    id: String
    type: String
    desc: String
    status: String
    value: [configurationType]
  }
  type configurationType{
    _id: String
    desc: String
    status: String
  }
  input configurationsInput{
    id: String
    type: String 
    status: String
  }
  extend type Query {
    configuration(input: configurationsInput): Configuration
    configurations(input: configurationsInput): [Configuration]
  }

`;
export default configurationSchema;
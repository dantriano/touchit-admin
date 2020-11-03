import { gql } from 'apollo-server';

const groupSchema= gql`
  type Group {
    _id: ID
    name: String
    main: String
    activities: [String]
    options: [String]
  }
  input groupInput  {
    _id: ID, 
    name: String,
    main: String,
    activities: [ID],
    options: [String]
  }

  extend type Query {
    group(input: groupInput): Group
    groups(input: groupInput): [Group]
  }
  extend type Mutation {
    saveGroup(input:groupInput!): Boolean
    removeGroup(_id: ID!): Boolean
  }

`;
export default groupSchema;
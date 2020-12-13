import { gql } from 'apollo-server';

const groupSchema= gql`
  type Group {
    _id: ID
    name: String
    main: String
    activities: [String]
    options: [String]
    company: ID,
  }
  input groupInput  {
    _id: ID, 
    name: String,
    main: String,
    activities: [ID],
    options: [String]
    company: ID,
  }

  extend type Query {
    group(input: groupInput): Group
    groups(input: groupInput): [Group]
  }
  extend type Mutation {
    saveGroup(input:groupInput!): Boolean
    removeGroup(input:groupInput!): Boolean
  }

  extend type Group {
    _activities: [Activity]
  }

`;
export default groupSchema;
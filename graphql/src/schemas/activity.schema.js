import { gql } from 'apollo-server';

const activitySchema = gql`
  type Activity {
    _id: ID
    name: String
    startFrom: String
    startTo: String
    duration: String
    days: [Int]
    locations: [String]
    _locations: [Location]
    company: ID,
    options: [String]
  }
  input activityInput  {
    _id: ID, 
    name: String,
    startTo:String,
    startFrom:String,
    duration:String,
    days:[Int]
    company: ID,
    locations: [String],
    options: [String]
  }


  extend type Query {
    activity(input: activityInput): Activity
    activities(input: activityInput): [Activity]
  }
  extend type Mutation {
    saveActivity(input:activityInput!): Boolean
    removeActivity(_id: ID!): Boolean
  }

`;
export default activitySchema;
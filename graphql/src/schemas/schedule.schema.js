import { gql } from 'apollo-server';

const scheduleSchema = gql`
  type Schedule {
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
  input scheduleInput  {
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
    schedule(input: scheduleInput): Schedule
    schedules(input: scheduleInput): [Schedule]
  }
  extend type Mutation {
    saveSchedule(input:scheduleInput!): Boolean
    removeSchedule(input:scheduleInput!): Boolean
  }

`;
export default scheduleSchema;
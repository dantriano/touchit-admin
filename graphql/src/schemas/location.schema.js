import { gql } from 'apollo-server';

const locationSchema= gql`
  type Location {
    _id: ID
    name: String
    center: latLng
    zones: [zones]
    options: [String]
  }
  type latLng  {
    lat: Float
    lng: Float
  }
  input latLngInput  {
    lat: Float
    lng: Float
  }
  type zones  {
    latsLngs: [latLng],
  }
  input zonesInput  {
    latsLngs: [latLngInput],
  }
  input locationInput  {
    _id: ID, 
    name: String, 
    center: latLngInput, 
    zones: [zonesInput],
    options: [String]
  }
  extend type Query {
    location(input: locationInput): Location
    locations(input: locationInput): [Location]
  }
  extend type Mutation {
    saveLocation(input:locationInput): Boolean
    removeLocation(_id: ID!): Boolean
  }
`;
export default locationSchema;
import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "locationModel";
export default {
  Query: {
    location: singleResolver(service),
    locations: listResolver(service),
  },
  Mutation: {
    saveLocation: saveResolver(service),
    removeLocation: removeResolver(service),
  }
};

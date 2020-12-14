import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "configurationModel";
export default {
  Query: {
    configuration: singleResolver(service),
    configurations: listResolver(service),
  },
  Mutation: {
    saveConfiguration: saveResolver(service),
    removeConfiguration: removeResolver(service),
  },
};

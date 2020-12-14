import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "activityModel";
export default {
  Query: {
    activity: singleResolver(service),
    activities: listResolver(service),
  },
  Mutation: {
    saveActivity: saveResolver(service),
    removeActivity: removeResolver(service),
  },
  Activity: {
    _locations: listResolver("locationModel"),
  },
};

import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "scheduleModel";
export default {
  Query: {
    schedule: singleResolver(service),
    schedules: listResolver(service),
  },
  Mutation: {
    saveSchedule: saveResolver(service),
    removeSchedule: removeResolver(service),
  },
  Schedule: {
    _locations: listResolver("locationModel"),
  },
};

import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "groupModel";
export default {
  Query: {
    group: singleResolver(service),
    groups: listResolver(service),
  },
  Mutation: {
    saveGroup: saveResolver(service),
    removeGroup: removeResolver(service),
  },
  Group: {
    _activities: async ({ activities }, args, { models }, info) => {
      return await models.activityModel.find({ _id: activities }).exec();
    },
  },
};

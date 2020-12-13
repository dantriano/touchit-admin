import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";
let status;
export default {
  Query: {
    activity: async (
      parent,
      { input },
      { models: { activityModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = input._id
        ? await activityModel.findById({ _id: utils.objectId(input._id) })
        : await activityModel.findOne(input).exec();
      return result ? result : null;
    },
    activities: async (
      parent,
      { input },
      { models: { activityModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await activityModel.find(input).exec();
      return result ? result : [];
    },
  },
  Mutation: {
    saveActivity: async (
      parent,
      { input },
      { models: { activityModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await activityModel.updateOne({ _id: input._id }, input);
        return status.ok && status.nModified > 0;
      } else {
        input._id = utils.objectId();
        status = await activityModel.create(input);
        return status !== undefined;
      }
    },
    removeActivity: async (
      parent,
      { input },
      { models: { activityModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await activityModel.deleteOne({ _id: input._id });
      } else if (input) {
        status = await activityModel.delete(input);
      }
      return status.ok && status.deletedCount > 0;
    },
  },
  Activity: {
    _locations: async (
      { locations },
      args,
      { models: { locationModel } },
      info
    ) => {
      return await locationModel.find({ _id: locations }).exec();
    },
  },
};

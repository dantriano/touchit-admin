import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";

let status;
export default {
  Query: {
    group: async (parent, { input }, { models: { groupModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = input._id
        ? await groupModel.findById({ _id: utils.objectId(input._id) })
        : await groupModel.findOne(input).exec();
      return result;
    },
    groups: async (parent, { input }, { models: { groupModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await groupModel.find(input).exec();
      return result;
    },
  },
  Mutation: {
    saveGroup: async (
      parent,
      { input },
      { models: { groupModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await groupModel.updateOne({ _id: input._id }, input);
        return status.ok && status.nModified > 0;
      } else {
        input._id = utils.objectId();
        status = await groupModel.create(input);
        return status !== undefined;
      }
    },
    removeGroup: async (
      parent,
      { input },
      { models: { groupModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await groupModel.deleteOne({ _id: input._id });
      } else if (input) {
        status = await groupModel.delete(input);
      }
      return status.ok && status.deletedCount > 0;
    },
  },
  Group: {
    _activities: async (
      { activities },
      args,
      { models: { activityModel } },
      info
    ) => {
      return await activityModel.find({ _id: activities }).exec();
    },
  },
};

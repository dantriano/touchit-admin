import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";
let status;
export default {
  Query: {
    location: async (
      parent,
      { input },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = input._id
        ? await locationModel.findById({ _id: utils.objectId(input._id) })
        : await locationModel.findOne(input).exec();
      return result ? result : null;
    },
    locations: async (
      parent,
      { input },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await locationModel.find(input).exec();
      return result ? result : [];
    },
  },
  Mutation: {
    saveLocation: async (
      parent,
      { input },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await locationModel.updateOne({ _id: input._id }, input);
        return status.ok && status.nModified > 0;
      } else {
        input._id = utils.objectId();
        status = await locationModel.create(input);
        return status !== undefined;
      }
    },
    removeLocation: async (
      parent,
      { input },
      { models: { locationModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await locationModel.deleteOne({ _id: input._id });
      } else if (input) {
        status = await locationModel.delete(input);
      }
      return status.ok && status.deletedCount > 0;
    },
  },
  Location: {},
};

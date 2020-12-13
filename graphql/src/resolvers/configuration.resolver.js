import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";
let status;
export default {
  Query: {
    configuration: async (
      parent,
      { input },
      { models: { configurationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await configurationModel.findOne(input);
      return result ? result : null;
    },
    configurations: async (
      parent,
      { input, value },
      { models: { configurationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await configurationModel.find(input);
      return result ? result : [];
    },
  },
  Mutation: {
    saveConfiguration: async (
      parent,
      { input },
      { models: { configurationModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await configurationModel.updateOne({ _id: input._id }, input);
        return status.ok && status.nModified > 0;
      } else {
        input._id = utils.objectId();
        status = await configurationModel.create(input);
        return status !== undefined;
      }
    },
    removeConfiguration: async (
      parent,
      { input },
      { models: { configurationModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await configurationModel.deleteOne({ _id: input._id });
      } else if (input) {
        status = await configurationModel.delete(input);
      }
      return status.ok && status.deletedCount > 0;
    },
  },
};

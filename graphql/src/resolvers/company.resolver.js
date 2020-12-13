import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";

let status;
export default {
  Query: {
    company: async (
      parent,
      { input },
      { models: { companyModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = input._id
        ? await companyModel.findById({ _id: utils.objectId(input._id) })
        : await activityModel.findOne(input).exec();
      return result;
    },
    companies: async (
      parent,
      { input },
      { models: { companyModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await companyModel.find(input).exec();
      return result;
    },
  },
  Mutation: {
    saveCompany: async (
      parent,
      { input },
      { models: { companyModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await companyModel.updateOne({ _id: input._id }, input);
        return status.ok && status.nModified > 0;
      } else {
        input._id = utils.objectId();
        status = await companyModel.create(input);
        return status !== undefined;
      }
    },
    removeCompany: async (
      parent,
      { input },
      { models: { companyModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await companyModel.deleteOne({ _id: input._id });
      } else if (input) {
        status = await companyModel.delete(input);
      }
      return status.ok && status.deletedCount > 0;
    },
  },
};

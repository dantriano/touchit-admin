import * as utils from "./utils";

import { AuthenticationError } from "apollo-server";
let status;
function singleResolver(service, replaceInput) {
  const query = async (parent, { input }, { models, me }, info) => {
    input = replaceInput ? replaceInput : input;
    if (!me) {
      throw new AuthenticationError("You are not authenticated");
    }
    const result = ("_id" in input)
      ? await models[service].findById(utils.objectId(input._id)).exec()
      : await models[service].findOne(input).exec();
    return result ? result : null;
  };
  return query;
}

function listResolver(service) {
  const query = async (parent, { input }, { models, me }, info) => {
    if (!me) {
      throw new AuthenticationError("You are not authenticated");
    }
    const result = await models[service].find(input).exec();
    return result ? result : [];
  };
  return query;
}

function saveResolver(service) {
  const query = async (parent, { input }, { models, me }, info) => {
    if (!me) throw new AuthenticationError("You are not authenticated");
    if (input._id) {
      input._id = utils.objectId(input._id);
      status = await models[service].updateOne({ _id: input._id }, input);
      return status.ok && status.nModified > 0;
    } else {
      input._id = utils.objectId();
      status = await models[service].create(input);
      return status !== undefined;
    }
  };
  return query;
}

function removeResolver(service) {
  const query = async (parent, { input }, { models, me }, info) => {
    if (!me) throw new AuthenticationError("You are not authenticated");
    if (input._id) {
      input._id = utils.objectId(input._id);
      status = await models[service].deleteOne({ _id: input._id });
    } else if (input) {
      status = await models[service].delete(input);
    }
    return status.ok && status.deletedCount > 0;
  };
  return query;
}
export { singleResolver, listResolver, saveResolver, removeResolver };

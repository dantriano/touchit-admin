import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

export default {
  Query: {
    group: async (parent, { input }, { models: { groupModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = (input._id) ? await groupModel.findById({ _id: utils.objectId(input._id) }) : await groupModel.findOne(input).exec();
      return result;
    },
    groups: async (parent,  { input }, { models: { groupModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = await groupModel.find(input).exec();
      return result;
    },
  },
  Mutation: {
    saveGroup: async (parent, { input }, { models: { groupModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
        if(input._id){
          input._id = utils.objectId(input._id);
          let status = await groupModel.updateOne({ _id: input._id }, input);
        }else{
          input._id = utils.objectId();
          let result = await groupModel.create(input);
        }
      return true
    },
    removeGroup: async (parent, { _id }, { models: { groupModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const status = await groupModel.deleteOne({ _id: utils.objectId(_id) });
      return true;
    },
  },
  Group: {
  },
};
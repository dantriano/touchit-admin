import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

export default {
  Query: {
    activity: async (parent, { input }, { models: { activityModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = (input._id) ? await activityModel.findById({ _id: utils.objectId(input._id) }) : await activityModel.findOne(input).exec();
      return result;
    },
    activities: async (parent,  { input }, { models: { activityModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = await activityModel.find(input).exec();
      return result;
    },
  },
  Mutation: {
    saveActivity: async (parent, { input }, { models: { activityModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
        if(input._id){
          console.log(input)
          input._id = utils.objectId(input._id);
          let status = await activityModel.updateOne({ _id: input._id }, input);
        }else{
          input._id = utils.objectId();
          let result = await activityModel.create(input);
        }
      return true
    },
    removeActivity: async (parent, { _id }, { models: { activityModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const status = await activityModel.deleteOne({ _id: utils.objectId(_id) });
      return true;
    },
  },
  Activity: {
    _locations: async ({ locations }, args, { models: { locationModel } }, info) => {
      return await locationModel.find({ _id: locations }).exec();
    },
  },
};
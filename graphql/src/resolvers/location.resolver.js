import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

export default {
  Query: {
    location: async (parent, { input }, { models: { locationModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = (input._id) ? await locationModel.findById({ _id: utils.objectId(input._id) }) : await locationModel.findOne(input).exec();
      return result;
    },
    locations: async (parent,  { input }, { models: { locationModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const locations = await locationModel.find(input).exec();
      return locations;
    },
  },
  Mutation: {
    saveLocation: async (parent, { input }, { models: { locationModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
        if(input._id){
          input._id = utils.objectId(input._id);
          let status = await locationModel.updateOne({ _id: input._id }, input);
        }else{
          input._id = utils.objectId();
          let result = await locationModel.create(input);
        }
      return true
    },
    removeLocation: async (parent, { _id }, { models: { locationModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const status = await locationModel.deleteOne({ _id: utils.objectId(_id) });
      return true;
    },
  },
  Location: {
  },
};
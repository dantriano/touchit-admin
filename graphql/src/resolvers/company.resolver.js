import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

export default {
  Query: {
    company: async (parent, { input }, { models: { companyModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = (input._id) ? await companyModel.findById({ _id: utils.objectId(input._id) }) : await activityModel.findOne(input).exec();
      return result;
    },
    companies: async (parent,  { input }, { models: { companyModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = await companyModel.find(input).exec();
      return result;
    },
  },
  Mutation: {
    saveCompany: async (parent, { input }, { models: { companyModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
        if(input._id){
          console.log(input)
          input._id = utils.objectId(input._id);
          let status = await companyModel.updateOne({ _id: input._id }, input);
        }else{
          input._id = utils.objectId();
          let result = await companyModel.create(input);
        }
      return true
    },
    removeCompany: async (parent, { _id }, { models: { companyModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const status = await companyModel.deleteOne({ _id: utils.objectId(_id) });
      return true;
    },
  },
};
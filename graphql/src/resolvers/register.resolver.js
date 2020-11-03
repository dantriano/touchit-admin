import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

export default {
  Query: {
    register: async (parent, { input }, { models: { registerModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = (input._id) ? await registerModel.findById({ _id: utils.objectId(input._id) }) : await registerModel.findOne(input).exec();
      return result;
    },
    registers: async (parent,  { input }, { models: { registerModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const result = await registerModel.find(input).exec();
      return result;
    },
  },
  Mutation: {
    saveRegister: async (parent, { input }, { models: { registerModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
        if(input._id){
          input._id = utils.objectId(input._id);
          let status = await registerModel.updateOne({ _id: input._id }, input);
        }else{
          input._id = utils.objectId();
          let result = await registerModel.create(input);
        }
      return true
    },
    removeRegister: async (parent, { _id }, { models: { registerModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const status = await registerModel.deleteOne({ _id: utils.objectId(_id) });
      return true;
    },
  },
  Register: {
    _activity: async ( {activity}, args, { models: { activityModel } }, info) => {
      return await activityModel.findById({ _id: utils.objectId(activity) });
    },
    _employee: async ( {employee}, args, { models: { employeeModel } }, info) => {
      let a= await employeeModel.findById({ _id:  utils.objectId(employee) }).exec();
      console.log(a)
      return a
    }
  },
};
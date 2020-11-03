import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

export default {
  Query: {
    employee: async (parent, { input }, { models: { employeeModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      return (input._id) ? await employeeModel.findById({ _id: utils.objectId(input._id) }) : await employeeModel.findOne(input).exec();
    },
    employeeByMail: async (parent, { email }, { models: { employeeModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const employee = (await employeeModel.findOne({ email: email }));
      return employee;
    },
    employees: async (parent, { }, { models: { employeeModel }, me }, info) => {
      console.log(me)
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const employees = (await employeeModel.find({})).map(utils.prepare);
      return employees;
    },
  },
  Mutation: {
    saveEmployee: async (parent, { input }, { models: { employeeModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
        if(input._id){
          input._id = utils.objectId(input._id);
          let status = await employeeModel.updateOne({ _id: input._id }, input);
        }else{
          input._id = utils.objectId();
          let result = await employeeModel.create(input);
        }
      return true
    },
    removeEmployee: async (parent, { _id }, { models: { employeeModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');
      const status = await employeeModel.deleteOne({ _id: utils.objectId(_id) });
      return true;
    },
  },
  Employee: {
    /*getCustomActivities: async ({ customActivities }, args, { models: { activityModel } }, info) => {
      const activities = await activityModel.find({}).exec();
      return (customActivities) ? activities.map(activity => {
        let objIndex = customActivities.findIndex((obj => obj._id == activity._id));
        activity.status = (objIndex !== -1) ? customActivities[objIndex].status : null
        return activity
      }) : activities;
    }*/
  },
};
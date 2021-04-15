import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "registerModel";
export default {
  Query: {
    register: singleResolver(service),
    registers: listResolver(service),
  },
  Mutation: {
    saveRegister: saveResolver(service),
    removeRegister: removeResolver(service),
  },
  Register: {
    _activity: async ({ activity }, args, { models }, info) => {
      return await models.activityModel.find({ _id: activity });
    },
    _employee: async ({ employee }, args, { models }, info) => {
      return await models.employeeModel.find({ _id: employee });
    },
  },
};

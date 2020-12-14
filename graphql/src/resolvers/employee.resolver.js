import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "employeeModel";
export default {
  Query: {
    employee: singleResolver(service),
    employees: listResolver(service),
  },
  Mutation: {
    saveEmployee: saveResolver(service),
    removeEmployee: removeResolver(service),
  },
  Employee: {
    _groups: async ({ groups }, args, { models }, info) => {
      return await models.groupModel.find({ _id: groups }).exec();
    },
  },
};

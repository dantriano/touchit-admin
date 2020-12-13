import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";

export default {
  Query: {
    employee: async (
      parent,
      { input },
      { models: { employeeModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      return input._id
        ? await employeeModel.findById({ _id: utils.objectId(input._id) })
        : await employeeModel.findOne(input).exec();
    },
    employeeByMail: async (
      parent,
      { email },
      { models: { employeeModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      const employee = await employeeModel.findOne({ email: email });
      return employee;
    },
    employees: async (
      parent,
      { input },
      { models: { employeeModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      const employees = (await employeeModel.find(input)).map(utils.prepare);
      return employees;
    },
  },
  Mutation: {
    saveEmployee: async (
      parent,
      { input },
      { models: { employeeModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        let status = await employeeModel.updateOne({ _id: input._id }, input);
      } else {
        input._id = utils.objectId();
        let result = await employeeModel.create(input);
      }
      return true;
    },
    removeEmployee: async (
      parent,
      { input },
      { models: { employeeModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        const status = await employeeModel.deleteOne({ _id: input._id });
        console.log(status)
      } else if (input) {
        const status = await employeeModel.delete(input);
      }
      return true;
    },
  },

  Employee: {
    _groups: async ({ groups }, args, { models: { groupModel } }, info) => {
      return await groupModel.find({ _id: groups }).exec();
    },
  },
};

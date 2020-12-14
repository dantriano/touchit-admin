import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";

import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";
const saltRounds = 12;
const service = "groupModel";
export default {
  Query: {
    user: singleResolver(service),
    users: listResolver(service),
    login: async (parent, { input }, { models: { userModel } }, info) => {
      const user = await userModel.findOne({ email: input.email }).exec();
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
        //return error('Username or password is incorrect');
      }
      const matchPasswords = bcrypt.compareSync(input.password, user.password);
      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
        //return error('Username or password is incorrect');‹
      }
      const userToken = jwt.sign({ id: user._id }, "riddlemethis", {
        expiresIn: "7d",
      });
      user["token"] = userToken;
      return user;
    },
  },
  Mutation: {
    saveUser: saveResolver(service),
    removeUser: removeResolver(service),
  },

  User: {
    _employee: async ({ employeeIds }, args, { models }, info) => {
      return await models.employeeModel.find({ _id: employeeIds });
    },
    _company: async ({ companies }, args, { models }, info) => {
      return await models.companyModel.find({ _id: companies });
    },
  },
};

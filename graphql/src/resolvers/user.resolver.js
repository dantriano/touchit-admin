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
    token: async (parent, { input }, { models: { userModel } }, info) => {
      return jwt.sign(input, "riddlemethis", { expiresIn: "7d" });
    },
    login: async (parent, { input }, { models: { userModel } }, info) => {
      const user = await userModel.findOne({ email: input.email }).exec();
      if (!user) {
        return null;
        //throw new AuthenticationError("Invalid credentials");
        //return error('Username or password is incorrect');
      }
      const matchPasswords = bcrypt.compareSync(input.password, user.password);
      if (!matchPasswords) {
        return null;
        //throw new AuthenticationError("Invalid credentials");
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
    _employee: async ({ companies }, args, { models }, info) => {
      return await models.employeeModel.find({ _id: companies.employee });
    },
    _company: async ({ companies }, args, { models }, info) => {
      //Esto deberia ser un bucle
      var result = await models.companyModel.find({ _id: companies.company });
      return result;
    },
  },
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import * as utils from "./utils";

const saltRounds = 12;

export default {
  Query: {
    user: async (parent, { input }, { models: { userModel }, me }, info) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      if (!me) throw new AuthenticationError("You don't have permissions");
      const user = await userModel
        .findById({ _id: utils.objectId(input._id) })
        .exec();
      console.log(user);
      return user;
    },
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

    token: async (parent, { input }, { models: { userModel } }, info) => {
      return jwt.sign(input, "riddlemethis", { expiresIn: "7d" });
    },
  },
  Mutation: {
    saveUser: async (
      parent,
      { name, password },
      { models: { userModel } },
      info
    ) => {
      if (!user) throw new AuthenticationError("Invalid credentials");
      if (input._id) {
        status = await userModel.updateOne({ _id: input._id }, input);
        return status.ok && status.nModified > 0;
      } else {
        status = await userModel.create({ name, password });
        //return status !== undefined;
        return status;
      }
    },
    removeUser: async (
      parent,
      { input },
      { models: { userModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");
      if (input._id) {
        input._id = utils.objectId(input._id);
        status = await userModel.deleteOne({ _id: input._id });
      } else if (input) {
        status = await userModel.delete(input);
      }
      return status.ok && status.deletedCount > 0;
    },
  },
  User: {
    _employee: async ({ bind }, args, { models: { employeeModel } }, info) => {
      const employeeIds = bind.map((x) => {
        return x.employee;
      });
      const asyncRes = await employeeModel.find({ _id: employeeIds }).exec();
      console.log(asyncRes);
      return asyncRes;
    },
    _company: async ({ bind }, args, { models: { companyModel } }, info) => {
      const companies = bind.map((x) => {
        return x.company;
      });
      const asyncRes = await companyModel.find({ _id: companies }).exec();

      console.log(asyncRes);
      return asyncRes;
    },
  },
};
/* 
const asyncRes = await Promise.all(bind.map(async (x) => {
        return await companyModel.find({ _id: x.company }).exec();
      }));
Employee: {
    getCustomActivities: async ({ customActivities }, args, { models: { activityModel } }, info) => {
      const activities = await activityModel.find({}).exec();
      return (customActivities) ? activities.map(activity => {
        let objIndex = customActivities.findIndex((obj => obj._id == activity._id));
        activity.status = (objIndex !== -1) ? customActivities[objIndex].status : null
        return activity
      }) : activities;
    }
  },*/

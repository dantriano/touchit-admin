import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import * as utils from './utils';

const saltRounds = 12;

export default {
  Query: {
    user: async (parent, { input }, { models: { userModel }, me }, info) => {
      if (!me)
        throw new AuthenticationError('You are not authenticated');

      if (!me)
        throw new AuthenticationError('You don\'t have permissions');
      const user = await userModel.findById({ _id:utils.objectId(input._id) }).exec();
      console.log(user)
      return user;
    },
    login: async (parent, { input }, { models: { userModel } }, info) => {
      const user = await userModel.findOne({ email: input.email }).exec();
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
        //return error('Username or password is incorrect');
      }
      const matchPasswords = bcrypt.compareSync(input.password, user.password);
      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
        //return error('Username or password is incorrect');‹
      }
      const userToken = jwt.sign({ id: user._id }, 'riddlemethis', { expiresIn: "7d" });
      user['token'] = userToken
      return user
    },

    token: async (parent, { input }, { models: { userModel } }, info) => {
      console.log(1)
      console.log(input)
      return jwt.sign(input, 'riddlemethis', { expiresIn: "7d" });
    }
  },
  Mutation: {
    saveUser: async (parent, { name, password }, { models: { userModel } }, info) => {
      if (!user)
        throw new AuthenticationError('Invalid credentials');
      const user = await userModel.create({ name, password });
      return user;
    },
  },
  User: {
    _employee: async ({ employee }, args, { models: { employeeModel } }, info) => {
      if(employee)
      return await employeeModel.find({ _id: employee }).exec();
    },
    _company: async ({ company }, args, { models: { companyModel } }, info) => {
      if(company)
      return await companyModel.find({ _id: company }).exec();
    },

    },
};

/*
  function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
*/
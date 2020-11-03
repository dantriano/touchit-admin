import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    configuration: async (parent, { input }, { models: {configurationModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await configurationModel.findOne(input);
    },
    configurations: async (parent, { input }, { models: {configurationModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await configurationModel.find(input);
    },
  },
};
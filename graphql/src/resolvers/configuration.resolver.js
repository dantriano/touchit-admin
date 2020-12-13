import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    configuration: async (
      parent,
      { input },
      { models: { configurationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await configurationModel.findOne(input);
      return result ? result : null;
    },
    configurations: async (
      parent,
      { input, value },
      { models: { configurationModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const result = await configurationModel.find(input);
      return result ? result : [];
    },
  },
};

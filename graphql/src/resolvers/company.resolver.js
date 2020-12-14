import {
  singleResolver,
  listResolver,
  saveResolver,
  removeResolver,
} from "./resolvers";

const service = "companyModel";
export default {
  Query: {
    company: singleResolver(service),
    companies: listResolver(service),
  },
  Mutation: {
    saveCompany: saveResolver(service),
    removeCompany: removeResolver(service),
  },
};

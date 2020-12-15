import mongoose from "mongoose";

var utils = {};
utils.prepare = (o) => {
  o._id = o._id.toString();
  return o;
};
utils.objectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

utils.arrayId = (arr) => {
  var a = arr.map(function (x) {
    return mongoose.Types.ObjectId(x);
  });
  return a;
};
/*
export default {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};
utils.scalarDate = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};*/

module.exports = utils;

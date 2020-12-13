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

module.exports = utils;

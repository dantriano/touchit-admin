import mongoose from 'mongoose';

var utils = {}
utils.prepare = (o) => {
  o._id = o._id.toString()
  return o
}
utils.objectId = (id) => {
  return new mongoose.Types.ObjectId(id);
}

module.exports = utils

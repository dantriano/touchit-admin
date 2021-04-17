import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userID: {
    type: String,
  },
  employeeCode: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isLinked: {
    type: Boolean,
  },
  linkCode: {
    type: String,
  },
  avatar: {
    type: String,
  },
  groups: {
    type: [String],
  },
  mainActivity: {
    type: String,
  },
  customActivities: {
    type: [Object],
  },
  status: {
    type: String,
  },
  company: {
    type: String,
    require: true,
  },
  options: {
    type: Object,
  },
});

const employeeModel = mongoose.model("employee", employeeSchema);

export default employeeModel;

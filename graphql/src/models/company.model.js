import mongoose from 'mongoose';
import * as location from "./location";

const companySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  locations: {
    type: Object,
  },
  status: {
    type: String,
  },
  options: {
    type: Object,
  }
});
const companyModel = mongoose.model('company', companySchema);

export default companyModel;
import mongoose from "mongoose";
const configurationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  company: {
    type: String,
  },
  section: {
    type: String,
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
  },
  companies: {
    type: Object,
  },
  sections: {
    type: Object,
  },
  value: {
    type: Object,
  },
});
const configurationModel = mongoose.model("configuration", configurationSchema);
export default configurationModel;

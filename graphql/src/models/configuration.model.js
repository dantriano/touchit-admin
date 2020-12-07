import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
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
  value: {
    type: Object,
  },
});
const configurationModel = mongoose.model("configuration", configurationSchema);
export default configurationModel;

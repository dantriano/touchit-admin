import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  days: {
    type: Object,
  },
  startFrom: {
    type: String,
  },
  startTo: {
    type: String,
  },
  duration: {
    type: String,
  },
  locations: {
    type: Object,
  },
  company: {
    type: String,
  },
  options: {
    type: Object,
  },
});
const scheduleModel = mongoose.model("schedule", scheduleSchema);

export default scheduleModel;

import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  main: {
    type: String,
  },
  activities: {
    type: Object,
  },
  options: {
    type: Object,
  }
});
const groupModel = mongoose.model('group', groupSchema);

export default groupModel;
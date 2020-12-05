import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  activity: {
    type: String,
    require:true,
  },
  employee: {
    type: String,
    require:true
  },
  company: {
    type: String,
  },
  _activity: {
    type: Object,
  },
  _employee: {
    type: Object,
  }
});
const registerModel = mongoose.model('register', registerSchema);

export default registerModel;
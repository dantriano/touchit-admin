import mongoose from 'mongoose';
const configurationSchema = new mongoose.Schema({  
  type: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
  },
  desc: {
    type: String,
  },
  company: {
    type: String,
  },
  value: {
    type: Object,
  },
});
const configurationModel = mongoose.model('configuration', configurationSchema);
export default configurationModel;
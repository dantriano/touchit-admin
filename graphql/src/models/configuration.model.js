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
  desc: {
    type: String,
  },
  value: {
    type: Object,
  },
});
const configurationModel = mongoose.model('configuration', configurationSchema);
export default configurationModel;
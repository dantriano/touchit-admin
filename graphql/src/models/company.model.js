import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
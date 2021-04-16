import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const saltRounds = 12;

const _company = {
  _id: String,
  name: String,
}
const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  picture: {
    type: String,
  },
  companies: {
    type: [String],
  },
  _company: {
    type: [_company],
  },
  status: {
    type: String,
  },
});

userSchema.pre('save', function() {
  const hashedPassword = bcrypt.hashSync(this.password, saltRounds);
  this.password = hashedPassword;
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
import mongoose from 'mongoose';

const latLng = {
  lat: String,
  lng: String,
}
const zone ={
  name: String,
  latsLngs: [latLng],
}
const locationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  center: {
    type: latLng,
  },
  zones: {
    type: [zone],
  },
  options: {
    type: Object,
  }
});
const locationModel = mongoose.model('location', locationSchema);

export default locationModel;
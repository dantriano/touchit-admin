import mongoose from "mongoose";

const latLng = {
  lat: String,
  lng: String,
};
const zone = {
  latsLngs: [latLng],
};
const getSchema = () => {
  return new mongoose.Schema({
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
    company: {
      type: String,
    },
    options: {
      type: Object,
    },
    status: {
      type: String,
    },
  });
};
const getModel = () => {
  return locationModel = mongoose.model("location", locationSchema);
};

export { getSchema, getModel };

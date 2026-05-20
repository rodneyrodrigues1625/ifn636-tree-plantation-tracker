const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
      trim: true,
    },
    suburb: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Location', locationSchema);
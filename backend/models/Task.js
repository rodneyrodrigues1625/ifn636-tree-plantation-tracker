const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: Date,
      required: true,
    },

    // New field for tree plantation progress
    status: {
      type: String,
      enum: ['Planned', 'Planted', 'Healthy', 'Needs Water', 'At Risk', 'Completed'],
      default: 'Planned',
    },

    // New field for optional tree type/category
    treeType: {
      type: String,
      trim: true,
      default: 'General',
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

module.exports = mongoose.model('Task', taskSchema);
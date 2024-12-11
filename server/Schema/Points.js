const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [[Number]],
    required: true,
  },
});

module.exports = mongoose.model('Points', PointSchema);

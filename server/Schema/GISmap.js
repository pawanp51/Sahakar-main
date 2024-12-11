const mongoose = require('mongoose');

const GISMapSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [[Number]],
    required: true,
  },
});

module.exports = mongoose.model('GISMap', GISMapSchema);

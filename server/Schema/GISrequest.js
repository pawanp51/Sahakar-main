const mongoose = require('mongoose');

const gisRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  yourDepartment: { type: String, required: true },
  requestDepartment: { type: String, required: true },
  purpose: { type: String, required: true },
  address: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('GISRequest', gisRequestSchema);

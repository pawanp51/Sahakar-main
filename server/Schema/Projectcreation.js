const mongoose = require('mongoose');

const projectcreationSchema = new mongoose.Schema({
  projectTitle: { type: String, required: true },
  projectType: { type: String, required: true },
  startDate: { type: Date, required: true },
  estimatedEndDate: { type: Date, required: true },
  description: { type: String, required: true },
  objectives: { type: String, required: true },
  scope: { type: String, required: true },
  leadDepartment: { type: String, required: true },
  otherDepartments: { type: String },
  keyStakeholders: { type: String },
  estimatedBudget: { type: Number, required: true },
  fundingSource: { type: String, required: true },
  manpowerRequired: { type: Number, required: true },
  keyEquipment: { type: String },
  latitude: {type: String, required: true},
  longitude: {type: String},
  milestones: { type: String, required: true },
  risks: { type: String, required: true },
});

module.exports = mongoose.model('Projectcreation', projectcreationSchema);

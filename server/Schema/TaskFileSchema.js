const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  fileData: Buffer,
  contentType: String,
  originalName: String,
  size: Number,
  task_id: {
    type: String, // Adjust type as needed
    required: true,
  },
  to: {
    type: String, // Adjust type as needed
    required: true,
  },
});

const File = mongoose.model('file', FileSchema);
module.exports = File;

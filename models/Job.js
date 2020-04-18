const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  role_level: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  skill_set: { type: [String], required: true },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  created_id: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("Job", JobSchema);

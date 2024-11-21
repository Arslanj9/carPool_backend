const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    required: true,
  },
  reqFromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  publishId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publish',
    required: true,
  },
  seenByPublisher: {
    type: Boolean,
    default: false, 
  },
  message: {
    type: String,
    default: '',
  },
  requestDate: {
    type: String,
    required: true,
  },
  requestTime: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  requiredSeats: {
    type: Number,
  },
});

module.exports = mongoose.model('Request', RequestSchema);

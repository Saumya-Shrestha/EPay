const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  consumerId: {
    type: String,
    unique: true,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

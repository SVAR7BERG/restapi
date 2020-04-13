const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
  googleID: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
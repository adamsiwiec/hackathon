var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
 name:  String,
  location: String,
  description:   String,
  thumbs: Number,

  }
);

var User = mongoose.model('User', userSchema);

module.exports = User;

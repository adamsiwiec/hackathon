var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orgSchema = new Schema({
  title:  String,
  description: String,

});
var Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;

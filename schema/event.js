var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title:  String,
  people: Number,
  description:   String,
  location: String
  }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;

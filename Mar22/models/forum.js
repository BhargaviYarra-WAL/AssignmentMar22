var mongoose = require("mongoose");
var ForumSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 10, maxLength: 100 },
  doc: { type: Date, required: true },
  forumbody: { type: String, required: true, minLength: 50, maxlength: 500 },
  author: { type: String, required: true, minlength: 5, maxlength: 50 },
});
module.exports = mongoose.model("Forum", ForumSchema);

// user.model.js
var mongoose = require("mongoose");
// Setup schema
var feedbackSchema = mongoose.Schema({
  _idea_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "idea",
    required: true
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
    default: null
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

feedbackSchema.index({ _idea_id: "text", _user_id: "text" });

feedbackSchema.static("findByIdea", function(idea_id) {
  return this.find({ _idea_id: idea_id });
});

// Export User model
var Feedback = (module.exports = mongoose.model("feedback", feedbackSchema));
module.exports.get = function(callback, limit) {
  Feedback.find(callback).limit(limit);
};

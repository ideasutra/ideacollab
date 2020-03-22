// user.model.js
var mongoose = require("mongoose");
// Setup schema
var ideaSchema = mongoose.Schema({
  _caption: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  companions: {
    type: Array,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    required: true,
    default: []
  },
  tags: {
    type: Array,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
    required: true,
    default: []
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

ideaSchema.index({ _caption: "text" });
ideaSchema.index({ _user: "text" });

ideaSchema.static("findByCaption", function(text) {
  let re = new RegExp(text, "i");
  return this.find({ _caption: re }, function(err, docs) {});
});

ideaSchema.static("findByUser", function(text) {
  return this.find({ _user: text }, function(err, docs) {});
});

// Export User model
var Idea = (module.exports = mongoose.model("idea", ideaSchema));
module.exports.get = function(callback, limit) {
  Idea.find(callback).limit(limit);
};

// user.model.js
var mongoose = require("mongoose");
// Setup schema
var tagSchema = mongoose.Schema({
  _caption: {
    type: String,
    required: true
  }
});

tagSchema.index({ _caption: "text" });

tagSchema.static("findByCaption", function(text) {
  return this.find({ _caption: /${text}/i }, function(err, docs) {});
});

// Export User model
var Tag = (module.exports = mongoose.model("tag", tagSchema));
module.exports.get = function(callback, limit) {
  Tag.find(callback).limit(limit);
};

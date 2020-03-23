// feedbackController.js
// Import feedback model
Feedback = require("../models/feedback.model");

// Handle index actions
exports.index = function(req, res) {
  Feedback.get()
    .populate("_user")
    .exec(function(err, feedbacks) {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      }
      res.json({
        status: "success",
        message: "Feedbacks retrieved successfully",
        data: feedbacks
      });
    });
};

// Handle create feedback actions
exports.new = function(req, res) {
  var feedback = new Feedback();
  feedback.content = req.body.content ? req.body.content : feedback.content;
  feedback._idea_id = req.body._idea_id;
  feedback._user = req.body._user ? req.body._user._id : null;

  // save the feedback and check for errors
  feedback.save(function(err) {
    if (err) res.json(err);
    res.json({
      message: "New feedback created!",
      data: feedback
    });
  });
};

// Handle view feedback info
exports.findByIdea = function(req, res) {
  Feedback.findByIdea(req.params.idea_id)
    .populate("_user")
    .exec(function(err, feedback) {
      if (err) res.send(err);
      res.json({
        message: "Feedback details loading..",
        data: feedback || []
      });
    });
};

// Handle view feedback info
exports.view = function(req, res) {
  Feedback.findById(req.params.feedback_id)
    .populate("_user")
    .exec(function(err, feedback) {
      if (err) res.send(err);
      res.json({
        message: "Feedback details loading..",
        data: feedback
      });
    });
};

// Handle update feedback info
exports.update = function(req, res) {
  Feedback.findByIdAndUpdate(
    req.params.feedback_id,
    req.body,
    { new: true },
    function(err, feedback) {
      if (err) res.send(err);

      res.json({
        message: "Feedback Info updated",
        data: feedback
      });
    }
  );
};
// Handle delete feedback
exports.delete = function(req, res) {
  User.remove(
    {
      _id: req.params.feedback_id
    },
    function(err, feedback) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Feedback deleted"
      });
    }
  );
};

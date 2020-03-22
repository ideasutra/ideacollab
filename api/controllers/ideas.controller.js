// ideaController.js
// Import idea model
Idea = require("../models/idea.model");

// Handle index actions
exports.index = function(req, res) {
  Idea.find({})
    .populate("_user")
    .populate("companions")
    .populate("tags")
    .exec(function(err, ideas) {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      }
      res.json({
        status: "success",
        message: "Ideas retrieved successfully",
        data: ideas
      });
    });
};

// Handle find by actions
exports.findByCaption = function(req, res) {
  Idea.findByCaption(req.params.text)
    .populate("_user")
    .populate("companions")
    .populate("tags")
    .exec(function(err, ideas) {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      }
      res.json({
        status: "success",
        message: "Ideas retrieved successfully",
        data: ideas
      });
    });
};

exports.findByUser = function(req, res) {
  Idea.findByCaption(req.params.user_id)
    .populate("_user")
    .populate("companions")
    .populate("tags")
    .exec(function(err, ideas) {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      }
      res.json({
        status: "success",
        message: "Ideas retrieved successfully",
        data: ideas
      });
    });
};

// Handle create idea actions
exports.new = function(req, res) {
  User.find({ name: req.body.caption.trim() }, function(err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    if (users && users.length > 0) {
      res.status(400).send({
        status: "error",
        message: req.body.caption + " is already taken"
      });
    } else {
      var idea = new Idea();
      idea.caption = req.body.caption ? req.body.caption : idea.caption;
      idea.description = req.body.description;

      // save the idea and check for errors
      idea.save(function(err) {
        if (err) res.json(err);
        res.json({
          message: "New idea created!",
          data: idea
        });
      });
    }
  });
};
// Handle view idea info
exports.view = function(req, res) {
  Idea.findById(req.params.idea_id)
    .populate("_user")
    .populate("companions")
    .populate("tags")
    .exec(function(err, idea) {
      if (err) res.send(err);
      res.json({
        message: "Idea details loading..",
        data: idea
      });
    });
};
// Handle update idea info
exports.update = function(req, res) {
  Idea.findByIdAndUpdate(req.params.idea_id, req.body, { new: true })
    .populate("_user")
    .populate("companions")
    .populate("tags")
    .exec(function(err, idea) {
      if (err) res.send(err);

      res.json({
        message: "Idea Info updated",
        data: idea
      });
    });
};
// Handle delete idea
exports.delete = function(req, res) {
  User.remove(
    {
      _id: req.params.idea_id
    },
    function(err, idea) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Idea deleted"
      });
    }
  );
};

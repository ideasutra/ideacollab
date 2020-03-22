// tagController.js
// Import tag model
Tag = require("../models/tag.model");

// Handle index actions
exports.index = function(req, res) {
  Tag.get(function(err, tags) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }
    res.json({
      status: "success",
      message: "Tags retrieved successfully",
      data: tags
    });
  });
};

// Handle create tag actions
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
      var tag = new Tag();
      tag.caption = req.body.caption ? req.body.caption : tag.caption;
      tag.description = req.body.description;

      // save the tag and check for errors
      tag.save(function(err) {
        if (err) res.json(err);
        res.json({
          message: "New tag created!",
          data: tag
        });
      });
    }
  });
};

// Handle view tag info
exports.findByCaption = function(req, res) {
  Tag.findById(req.params.text, function(err, tag) {
    if (err) res.send(err);
    res.json({
      message: "Tag details loading..",
      data: tag
    });
  });
};

// Handle view tag info
exports.view = function(req, res) {
  Tag.findById(req.params.tag_id, function(err, tag) {
    if (err) res.send(err);
    res.json({
      message: "Tag details loading..",
      data: tag
    });
  });
};

// Handle view tag info
exports.filter = function(req, res) {
  Tag.findById(req.params.text, function(err, tag) {
    if (err) res.send(err);
    res.json({
      message: "Tag details loading..",
      data: tag
    });
  });
};
// Handle update tag info
exports.update = function(req, res) {
  Tag.findByIdAndUpdate(req.params.tag_id, req.body, { new: true }, function(
    err,
    tag
  ) {
    if (err) res.send(err);

    res.json({
      message: "Tag Info updated",
      data: tag
    });
  });
};
// Handle delete tag
exports.delete = function(req, res) {
  User.remove(
    {
      _id: req.params.tag_id
    },
    function(err, tag) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Tag deleted"
      });
    }
  );
};

exports.authenticate = function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) res.send(err);

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      let newUser = {
        token: jwt.sign({ sub: user._id }, "Thisismyscretkey"),
        firstName: user.firstName,
        lastName: user.lastName
      };
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: newUser
      });
    } else {
      // authentication failed
      res.status(401).send({
        status: "error",
        message: "User name or password is invalid."
      });
    }
  });
};

exports.changePassword = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
      }
      user.save(function(err) {
        if (err) res.json(err);
        res.status(202).send({
          status: "success",
          message: "Password Updated successfully"
        });
      });
    } else {
      // authentication failed
      res.status(401).send({
        status: "error",
        message: "Old password is wrong."
      });
    }
  });
};

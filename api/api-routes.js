var usersController = require("./controllers/users.controller");
var ideasController = require("./controllers/ideas.controller");
var tagsController = require("./controllers/tags.controller");
var feedbacksController = require("./controllers/feedbacks.controller");

// Filename: api-routes.js
// Initialize express router
let router = require("express").Router();
// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});

// user routes
router
  .route("/users")
  .get(usersController.index)
  .post(usersController.new);
router
  .route("/user/:user_id")
  .get(usersController.view)
  .patch(usersController.update)
  .put(usersController.update)
  .delete(usersController.delete);
router.route("/user/authenticate").post(usersController.authenticate);

router
  .route("/user/changepassword/:user_id")
  .put(usersController.changePassword);

// ideas routes
router
  .route("/ideas")
  .get(ideasController.index)
  .post(ideasController.new);

router
  .route("/idea/:idea_id")
  .get(ideasController.view)
  .patch(ideasController.update)
  .put(ideasController.update)
  .delete(ideasController.delete);

router.route("/ideas/filter/user/:user_id").get(ideasController.findByUser);

router.route("/ideas/filter/:text").get(ideasController.findByCaption);

// tags routes
router
  .route("/tags")
  .get(tagsController.index)
  .post(tagsController.new);

router
  .route("/tag/:tag_id")
  .get(tagsController.view)
  .patch(tagsController.update)
  .put(tagsController.update)
  .delete(tagsController.delete);

router.route("/tags/filter/:text").get(tagsController.findByCaption);

// feedbacks routes
router
  .route("/idea/:idea_id/feedbacks")
  .get(feedbacksController.findByIdea)
  .post(feedbacksController.new);

router.route("/feedbacks").post(feedbacksController.new);

router
  .route("/feedback/:feedback_id")
  .get(feedbacksController.view)
  .patch(feedbacksController.update)
  .put(feedbacksController.update)
  .delete(feedbacksController.delete);

var routeHandling = app => {
  // Use Api routes in the App
  app.use("/api", router);

  let expressJwt = require("express-jwt");
  var jwtHandling = (httpMethods = null) => {
    return expressJwt({
      secret: "Thisismyscretkey",
      getToken: function(req) {
        // Don't check all http methods, if some are given.
        if (
          httpMethods &&
          !httpMethods.map(x => x.toUpperCase()).include(req.method)
        ) {
          // no need to test. this path is not protected.
          return true;
        }

        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
    });
  };

  app.use("/api/users", jwtHandling(["get"]));
  app.use("/api/user/*", jwtHandling().unless("/api/user/authenticate"));
  app.use("/api/ideas", jwtHandling(["post"]));
  app.use("/api/idea/*", jwtHandling(["patch", "put", "delete"]));
  app.use("/api/feedbacks", jwtHandling(["post"]));
  app.use("/api/feedback/*", jwtHandling(["patch", "put", "delete"]));
  app.use("/api/idea/*/feedbacks", jwtHandling(["post"]));
  app.use("/api/feedback/*", jwtHandling(["patch", "put", "delete"]));
};

// Export API routes
exports.addToApp = routeHandling;

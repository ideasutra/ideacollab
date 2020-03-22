let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(
  "mongodb://heroku_g4xpgdq2:k0mr341in2l2vtron8c559m0eq@ds111050.mlab.com:11050/heroku_g4xpgdq2",
  {
    useNewUrlParser: true,
    UnifiedTopology: true
  }
);
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("DB connected successfully");

// Import routes
require("./api-routes").addToApp(app);

// start server
let port = process.env.NODE_ENV ? process.env.NODE_ENV : 3000;

try {
  app.listen(port, function() {
    console.log("Server listening on port " + port);
  });
} catch (e) {
  console.error("There is already a server listing on port " + port);
}

/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

let express = require("express");
const ngUniversal = require('@nguniversal/express-engine');
let path = require("path")
let cors = require("cors");
let bodyParser = require("body-parser");
let expressJwt = require("express-jwt");

// Import Mongoose
let mongoose = require("mongoose");

// Express server
const app = express();

const PORT = process.env.PORT || 8000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://heroku_g4xpgdq2:k0mr341in2l2vtron8c559m0eq@ds111050.mlab.com:11050/heroku_g4xpgdq2", {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("DB connected successfully");

// Import routes
let apiRoutes = require("./api/api-routes");


// Use Api routes in the App
app.use("/api", apiRoutes);

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(
  expressJwt({
    secret: "Thisismyscretkey",
    getToken: function(req) {
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
  }).unless({ path: [/^(\/api)*/,"/api/user/authenticate", "/api/users"]})
);

app.use(express.static(DIST_FOLDER)); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// All regular routes use the Universal engine
app.get('/*', (req, res) => {
  res.render('index', { req, res });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

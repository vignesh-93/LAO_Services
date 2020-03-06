/* Author : Rajesh K */
   


var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//global error handling
const errorConfig = require("./configuration/errors");
//configure the engine
const appConfig = require("./configuration/appconfig");
//database conn.
var dev_db = require("./configuration/index");
const cors = require('cors');

var app = express();
appConfig.init(app, express);
//app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.get('/', function (req, res) {
  res.send('Hello World')
})

require("./routes/masters/LOV/index")({ app: app });
require("./routes/users/index")({ app: app });
require("./routes/categories/index")({ app: app });
require("./routes/products/index")({ app: app });
require("./routes/cart/index")({ app: app });
require("./routes/order/index")({ app: app });
require("./routes/wholesaler/index")({ app: app });

app.http = require("./lib/util/http");
app.util = require("./lib/util/parser");
//app.rule = require('./rule/loginrule');
app.invoke = require("./lib/http/invoke");



// // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



errorConfig.init(app);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

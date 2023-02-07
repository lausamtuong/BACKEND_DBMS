const dboperations = require('./Controllers/dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var Orders_route = require("./Routes/Orders")
var User_route = require("./Routes/User")
var Admin_route = require("./Routes/Admin")
var router = express.Router();
var mysql = require('mysql');
const config = require('./dbconfig');
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
var con = mysql.createConnection(config);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  // Pass to next layer of middleware
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use("/",Orders_route);
app.use("/",User_route);
app.use("/admin",Admin_route);

app.use(cors(corsOptions));


var port = process.env.PORT || 8090;
app.listen(port,()=>console.log('Order API is runnning at ' + port) );


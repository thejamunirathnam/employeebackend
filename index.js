require("dotenv").config();
let express = require("express");
const mongoose = require('mongoose');


const  database  = require("./config/database");
const logger  = require("./config/looger");
var router = require('./router/router');


let app = express();
app.use(express.json());

app.use('/', router);



app.listen(2000, function () {
  logger.silly(`Server started at 2000`);
});

database();



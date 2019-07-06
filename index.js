var express = require('express');
var app = express();
var port = process.env.port || 3000;
var userProfileRoute = require("./UserProfileRoute.js");
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use('/api', userProfileRoute);

app.listen(port);

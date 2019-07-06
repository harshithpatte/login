var express = require('express');
var app = express();
var userProfileRoute = require("./UserProfileRoute.js");
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use('/api', userProfileRoute);

app.listen(process.env.PORT|| 3000);

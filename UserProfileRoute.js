var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var url = require('./config').dbUrl;

router.post('/createaccount', (req, res) => {
  mongoClient.connect(url, (err, db) =>
  {
    if(err) {
      throw err;
      res.sendStatus(400);
    }
    var dbo = db.db("users");
    var body = req.body;
    dbo.collection("profile")
        .insertOne({"username":body.username,
                    "password":body.password,
                    "firstName":body.firstName,
                    "lastName":body.lastName}, (err) => {
          if (err) {
            throw err;
            res.sendStatus(400);
          }
          console.log('successful');
          db.close();
        });
  });
  res.sendStatus(200);
});

router.post('/login', (req, res) => {
  mongoClient.connect(url, (err, db) =>
  {
    if(err) {
      throw err;
      res.sendStatus(400);
    }
    var dbo = db.db("users");
    var body = req.body;
    dbo.collection("profile")
    .findOne({"username": body.username, "password": body.password}, (err, result) => {
      if (err) {
        throw err;
      }
      delete result._id;
      delete result.password;
      delete result.username;
      res.send(result);
    });
  });
});

module.exports = router

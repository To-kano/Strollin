var express = require('express');
var router = express.Router();

const {
  UserModel
} = require("../models/users")

// REGISTER
router.post('/register', async function(req, res) {

  //test
  console.log(req.body)

  let user = await UserModel.findOne({username : req.body.username});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (!user && req.body.username && req.body.password) {
    user = new UserModel({
      username: req.body.username,
      password: req.body.password,
      tags: [],
    });
    await user.save();
    return  res.status(200).send({status: "success", access_token: token});
  }
  return res.status(400).send({status : "user already exists"});
});


// LOGIN
router.get('/login', async function(req, res) {

  let user = await UserModel.findOne({username : req.headers.username, password : req.headers.password});

  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user) {

    await user.updateOne({access_token : token});
    return  res.status(200).send({access_token : token});
  }
  return res.status(400).send({status : "wrong input"});
});


module.exports = router;

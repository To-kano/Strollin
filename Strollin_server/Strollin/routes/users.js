var express = require('express');
var router = express.Router();

const {
  UserModel
} = require("../models/users")

// REGISTER
router.post('/register', async function(req, res) {

  let user = await UserModel.findOne({username: req.body.username});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (!user && req.body.username && req.body.password) {
    user = new UserModel({
      username: req.body.username,
      password: req.body.password,
      access_token: token,
      tags: [],
    });
    await user.save();
    return  res.status(200).send({status: "Account created successfully.", access_token: token});
  }
  return res.status(400).send({status: "The username exists already or is invalid."});
});


// LOGIN
router.get('/login', async function(req, res) {

  let user = await UserModel.findOne({username: req.headers.username, password: req.headers.password});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user) {
    await user.updateOne({access_token: token});
    return  res.status(200).send({status: "Log in successfully." , access_token: token});
  }
  return res.status(400).send({status: "The username or the password is incorrect."});
});

// LOGOUT
router.get('/logout', async function(req, res) {

  let user = await UserModel.findOne({username: req.headers.username, password: req.headers.password});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user && (user.access_token == req.headers.access_token)) {
    await user.updateOne({access_token: token});
    return  res.status(200).send({status: "Log out successfully."});
  }
  return res.status(400).send({status: "You are already log out."});
});


// DELETE
router.delete('/delete', async function(req, res) {

  let user = await UserModel.findOne({username: req.headers.username, password: req.headers.password});

  if (user && user.access_token == req.headers.access_token) {
    await user.remove();
    return res.status(200).send({status: "Account successfully deleted."});
  }
  return res.status(400).send({status: "Not connected."});
});


module.exports = router;

var express = require('express');
var router = express.Router();

const {
  UserModel
} = require("../models/users")

// REGISTER
router.post('/register', async function(req, res) {

  let login = await UserModel.findOne({login: req.body.login});
  let pseudo = await UserModel.findOne({pseudo: req.body.pseudo});
  let mail = await UserModel.findOne({mail: req.body.mail});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (login) {
    return res.status(400).send({status: "The login exists already."});
  }
  if (pseudo) {
    return res.status(400).send({status: "The pseudo exists already."});
  }
  if (mail) {
    return res.status(400).send({status: "The mail is used already."});
  }
  if (req.body.login && req.body.password && req.body.pseudo && req.body.mail) {
    user = new UserModel({
      login: req.body.login,
      password: req.body.password,
      pseudo: req.body.pseudo,
      mail: req.body.mail,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      access_token: token,
      tags: [],
      friends_list: {
        friends : [],
        requests : [],
      },
      type: req.body.type,
      historic: [],
      scoreCourse: [],
      scoreLocation: [],
      scoreComment: [],
    });
    if (req.body.pseudo == null || req.body.pseudo == '') {
      user.pseudo = user.login
    }
    await user.save();
    return  res.status(200).send({status: "Account created successfully.", access_token: token});
  }
  return res.status(400).send({status: "The entry is invalid."});
});


// LOGIN
router.get('/login', async function(req, res) {

  let user = await UserModel.findOne({login: req.headers.login, password: req.headers.password});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user) {
    await user.updateOne({access_token: token});
    return  res.status(200).send({status: "Log in successfully." , access_token: token});
  }
  return res.status(400).send({status: "The login or the password is incorrect."});
});

// LOGOUT
router.get('/logout', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user) {
    await user.updateOne({access_token: token});
    return  res.status(200).send({status: "Log out successfully."});
  }
  return res.status(400).send({status: "You are already log out."});
});


// GET_PROFILE
router.get('/get_profile', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let profile = {};

  if (user) {
    profile = {
      pseudo: user.pseudo,
      mail: user.mail,
      first_name: user.first_name,
      last_name: user.last_name,
      tags: user.tags,
      friends_list: user.friends_list,
      type: user.type,
      historic: user.historic,
      scoreCourse: user.scoreCourse,
      scoreLocation: user.scoreLocation,
      scoreComment: user.scoreComment,
    }
    return  res.status(200).send({status: "Profile sent." , profile});
  }
  return res.status(400).send({status: "You are not connected."});
});

// ADD FRIEND
router.post('/add_friend', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.body.access_token});
  let friend = await UserModel.findOne({pseudo: req.body.pseudo});

  if (user && friend) {

    await user.updateOne({$push: {"friends_list": friend._id}});
    await friend.updateOne({$push: {"friends_list": user._id}});
    return  res.status(200).send({status: "Friend added successfully."});
  }
  return res.status(400).send({status: "You cannot be friend."});
});

// DELETE
router.delete('/delete', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token, password: req.headers.password});

  if (user) {
    await user.remove();
    return res.status(200).send({status: "Account successfully deleted."});
  }
  return res.status(400).send({status: "Not connected."});
});


module.exports = router;

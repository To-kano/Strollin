var express = require('express');
var router = express.Router();

const {
  UserModel
} = require("../models/user")

const {
  TagModel
} = require("../models/tag")


// REGISTER
router.post('/register', async function(req, res) {

  let mail = await UserModel.findOne({mail: req.body.mail});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (mail) {
    return res.status(400).send({status: "The mail is used already."});
  }
  if (req.body.mail && req.body.password) {
    user = new UserModel({
      mail: req.body.mail,
      password: req.body.password,
      pseudo: "user",
      type: "normal",
      access_token: token,
    });
    if (req.body.pseudo != null) {
      user.pseudo = req.body.pseudo
    }
    await user.save();
    return  res.status(200).send({status: "Account created successfully.", access_token: token});
  }
  return res.status(400).send({status: "The entry is invalid."});
});

// ADD FRIEND
router.post('/add_request_friend', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.body.access_token});
  let friend = await UserModel.findOne({pseudo: req.body.pseudo});

  if (!user)
    return res.status(400).send({status: "You are not connected."});
  if (friend) {
    await friend.updateOne({$push: {friends_request: user._id}});
    return  res.status(200).send({status: "Friend added successfully."});
  }
  return res.status(400).send({status: "The friend user does not exist."});
});

// ADD TAG
router.post('/add_tag', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.body.access_token});
  let new_tags = null;
  let add_list = req.body.tags_list

  if (user) {
    for (let index = 0; index < add_list.length; index++) {
      new_tags = await TagModel.findOne({_id: add_list[index]})
      if (new_tags && !user.tags_list[new_tags]) {
        await user.updateOne({$push: {tags_list: tags_list._id}})
      }
    }
    return  res.status(200).send({status: "Tag(s) added successfully."});
  }
  return res.status(400).send({status: "You are not connected."});
});


// LOGIN
router.get('/login', async function(req, res) {

  let user = await UserModel.findOne({mail: req.headers.mail, password: req.headers.password});
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
router.get('/profile', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let profile = {};

  if (user) {
    profile = {
      mail: user.mail,
      pseudo: user.pseudo,
      type: user.type,
      first_name: user.first_name,
      last_name: user.last_name,
      tags_list: user.tags_list,
      friends_list: user.friends_list,
      friends_request: user.friends_request,
      historic: user.historic,
      score_course: user.score_course,
      score_location: user.score_location,
      score_comment: user.score_comment,
    }
    return  res.status(200).send({status: "Profile sent." , profile});
  }
  return res.status(400).send({status: "You are not connected."});
});

// DELETE
router.delete('/remove_account', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token, password: req.headers.password});

  if (user) {
    await user.remove();
    return res.status(200).send({status: "Account successfully deleted."});
  }
  return res.status(400).send({status: "You are not connected."});
});


module.exports = router;

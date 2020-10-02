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
      accessToken: token,
    });
    if (req.body.pseudo != null) {
      user.pseudo = req.body.pseudo
    }
    await user.save();
    return  res.status(200).send({status: "Account created successfully.", accessToken: token});
  }
  return res.status(400).send({status: "The entry is invalid."});
});

// ADD FRIEND
router.post('/addFriend', async function(req, res) {

  let user = await UserModel.findOne({accessToken: req.body.accessToken});
  let friend = await UserModel.findOne({pseudo: req.body.pseudo});

  if (user && friend) {

    await user.updateOne({$push: {"friends_list": friend._id}});
    await friend.updateOne({$push: {"friends_list": user._id}});
    return  res.status(200).send({status: "Friend added successfully."});
  }
  return res.status(400).send({status: "You cannot be friend."});
});

// ADD TAG
router.post('/addTag', async function(req, res) {

  let user = await UserModel.findOne({accessToken: req.body.accessToken});
  let tag = null;
  let addList = req.body.tagList

  if (user) {
    for (let index = 0; index < addList.length; index++) {
      tag = await TagModel.findOne({name: addList[index]})
      if (tag) {
        await user.updateOne({$push: {"tagsList": tag._id}})
      }
    }
    return  res.status(200).send({status: "Tag(s) added successfully."});
  }
  return res.status(400).send({status: "You have to be connected."});
});


// LOGIN
router.get('/login', async function(req, res) {

  let user = await UserModel.findOne({login: req.body.login, password: req.body.password});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user) {
    await user.updateOne({accessToken: token});
    return  res.status(200).send({status: "Log in successfully." , accessToken: token});
  }
  return res.status(400).send({status: "The login or the password is incorrect."});
});

// LOGOUT
router.get('/logout', async function(req, res) {

  let user = await UserModel.findOne({accessToken: req.headers.accessToken});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (user) {
    await user.updateOne({accessToken: token});
    return  res.status(200).send({status: "Log out successfully."});
  }
  return res.status(400).send({status: "You are already log out."});
});


// GET_PROFILE
router.get('/getProfile', async function(req, res) {

  let user = await UserModel.findOne({accessToken: req.headers.accessToken});
  let profile = {};

  if (user) {
    profile = {
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

// DELETE
router.delete('/delete', async function(req, res) {

  let user = await UserModel.findOne({accessToken: req.headers.accessToken, password: req.headers.password});

  if (user) {
    await user.remove();
    return res.status(200).send({status: "Account successfully deleted."});
  }
  return res.status(400).send({status: "Not connected."});
});


module.exports = router;

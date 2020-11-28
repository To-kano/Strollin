var express = require('express');
var router = express.Router();

const {
  UserModel
} = require("../models/user")

const {
  TagModel
} = require("../models/tag")

const {
  CourseModel
} = require("../models/course")

/* ROUTE MODEL TO COPY PASTE
router.post('/name', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});

  if (!user)
    return res.status(400).send({status: "You are not connected."});

    return res.status(400).send({status: "An error occured."});
});
*/


// REGISTER
/**
 * Register a new user as normal type
 * @param {String} req.body.mail
 * @param {String} req.body.password
 * @param {String} req.body.pseudo (optionnal)
 */
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

// ADD REQUEST FRIEND
/**
 * Register the current user into the other user's friend request list.
 * @param {String} req.headers.access_token
 * @param {ObjectID} req.body.friend (ID of the user you want to request)
 */
router.post('/add_friend_request', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let friend = await UserModel.findOne({_id: req.body.friend});

  if (!user)
    return res.status(400).send({status: "You are not connected."});
  if (friend && !friend.friends_request[user._id] && !user.friends_request[friend._id]) {
    await friend.updateOne({$push: {friends_request: user._id}});
    return  res.status(200).send({status: "Friend requested successfully."});
  }
  return res.status(400).send({status: "The friend user does not exist."});
});

// ADD FRIEND
/**
 * Confirm a friend request and add in each other friend's list.
 * Remove the friend's request.
 * @param {String} req.headers.access_token
 * @param {ObjectID} req.body.friend (id from the user in request friend list)
 */
router.post('/add_friend', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let friend = await UserModel.findOne({_id: req.body.friend});

  if (!user)
    return res.status(400).send({status: "You are not connected."});
  if (friend && !friend.friends_list[user._id] && !user.friends_list[friend._id] && user.friends_request[friend._id]) {
    await friend.updateOne({$push: {friends_list: user._id}});
    await user.updateOne({$push: {friends_list: friend._id}});
    await user.updateOne({$pull: {friends_request: friend._id}});
    return  res.status(200).send({status: "Friend added successfully."});
  }
  return res.status(400).send({status: "An error occured."});
});


// ADD TAG
/**
 * Add tags in the current user's tag list
 * @param {String} req.headers.access_token
 * @param {[ObjectID]} req.body.tags_list
 */
router.post('/add_tag', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
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


// ADD COURSE HISTORIC
/**
 * Add a course into the historic of the user.
 * @param {String} req.headers.access_token
 * @param {ObjectID} req.body.course
 */
router.post('/add_historic', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let course = await CourseModel.findOne({_id: req.body.course});

  if (!user)
    return res.status(400).send({status: "You are not connected."});
  if (course) {
    await user.updateOne({$push: {course_historic: {course: course._id, date: Date.now}}})
  }
  return res.status(400).send({status: "An error occured."});
});



// LOGIN
/**
 * Log in an user to get a new access token.
 * @param {String} req.headers.mail
 * @param {String} req.headers.password
 */
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
/**
 * Log out an user and delete the access token.
 * @param {String} req.headers.access_token
 */
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
/**
 * Get the user's profile for the cache.
 * @param {String} req.headers.access_token
 */
router.get('/get_own_profile', async function(req, res) {
  const projection = '-password -access_token -socket_id -facebook_id' //-param for excluding
  let user = await UserModel.findOne({access_token: req.headers.access_token}, projection);

  if (user) {
    return  res.status(200).send({status: "Profile sent." , user});
  }
  return res.status(400).send({status: "You are not connected."});
});


// GET_USER_PROFILE
/**
 * Get any user's profile.
 * @param {String} req.headers.access_token
 * @param {String} req.headers.user_id
 */
router.get('/get_user_profile', async function(req, res) {
  const projection = 'mail creation_date pseudo type first_name last_name tags_list friends_list';
  let user = await UserModel.findOne({access_token: req.headers.access_token}, projection);
  let profile = null;

  if (user) {
    profile = await UserModel.findOne({_id: req.headers.user_id}, projection);
    if (profile) {
      return  res.status(200).send({status: "Profile sent." , profile});
    }
  }
  return res.status(400).send({status: "You are not connected."});
});


// GET_USER_TAGS
/**
 * Get the user(s) tags.
 * @param {String} req.headers.access_token
 * @param {[String]} req.headers.user_id
 */
router.get('/get_users_tags', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token}, option);
  let all_user_tags = [];
  let user_tags = null;
  let user_index = null;

  if (!user) {
    return res.status(400).send({status: "You are not connected."});
  }
  for (let index = 0; index < req.headers.user_id.length; index++) {
    user_index = await UserModel.findOne({_id: req.headers.user_id[index]});
    if (user_index) {
      user_tags = await TagModel.find({_id: {$in: user_index.tags_list}});
      if (user_tags) {
        all_user_tags.push(user_tags);
      }
    }
  }
  return  res.status(200).send({status: "User's Tags sent." , all_user_tags});
});


// DELETE
/**
 * Delete an account.
 * @param {String} req.headers.access_token
 * @param {String} req.headers.password
 */
router.delete('/remove_account', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token, password: req.headers.password});

  if (user) {
    await user.remove();
    return res.status(200).send({status: "Account successfully deleted."});
  }
  return res.status(400).send({status: "You are not connected."});
});


module.exports = router;

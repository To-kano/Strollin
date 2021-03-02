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


// REGISTER
/**
 * Register a new user as normal type
 * @param {String} req.body.mail
 * @param {String} req.body.password
 * @param {Boolean} req.body.partner
 * @param {String} req.body.pseudo (optional)
 * @param {String} req.body.first_name (optional)
 * @param {String} req.body.last_name (optional)
 */
router.post('/register', async function(req, res) {

  let mail = await UserModel.findOne({mail: req.body.mail});
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (mail) {
    return res.status(400).send({status: "The mail is used already."});
  }
  if (req.body.mail && req.body.password && req.body.partner !== undefined) {
    user = new UserModel({
      id: new Number(Date.now()),
      creation_date: new Date().toLocaleDateString("fr-FR"),
      mail: req.body.mail,
      password: req.body.password,
      pseudo: "user",
      partner: req.body.partner,
      access_token: token,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    if (req.body.pseudo != null) {
      user.pseudo = req.body.pseudo
    }
    await user.save();
    return res.status(200).send({status: "Account created successfully.", access_token: token});
  }
  return res.status(400).send({status: "The entry is invalid."});
});


// EDIT_PROFILE
/**
 * Edit a comment's message or score
 * @param {String} req.headers.access_token
 * 
 * At least one of below
 * @param {String} req.body.password
 * @param {String} req.body.pseudo
 * @param {String} req.body.first_name
 * @param {String} req.body.last_name
 */
router.post('/edit_profile', async function(req, res) {
  let user = await UserModel.findOne({access_token: req.headers.access_token});

  if (!user) {
      return res.status(400).send({status: "You are not connected."});
  }
  if (!req.body.password && !req.body.pseudo && !req.body.first_name && !req.body.last_name) {
      return res.status(400).send({status: "No edit data provided."});
  }
  let query = {};
  if (req.body.password) {
      query.password = req.body.password;
  }
  if (req.body.pseudo) {
    query.pseudo = req.body.pseudo;
  }
  if (req.body.first_name) {
    query.first_name = req.body.first_name;
  }
  if (req.body.last_name) {
      query.last_name = req.body.last_name;
  }
  let error = await user.updateOne(query).catch(error => error);
  if (error.errors) {
      return res.status(400).send({status: error.errors});
  }
  return res.status(400).send({status: "Profile edited."});
});


// ADD_FRIEND_REQUEST
/**
 * Register the current user into the other user's friend request list.
 * @param {String} req.headers.access_token
 * @param {ObjectID} req.body.friend (ID of the user you want to request)
 */
router.post('/add_friend_request', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let friend = await UserModel.findOne({id: req.body.friend});

  if (!user) {
    return res.status(400).send({status: "You are not connected."});
  }
  if (friend && !friend.friends_request.includes(user.id) && !user.friends_request.includes(friend.id)) {
    await friend.updateOne({$push: {friends_request: user.id}});
    return res.status(200).send({status: "Friend requested successfully."});
  }
  return res.status(400).send({status: "The friend user does not exist."});
});


// ADD_FRIEND
/**
 * Confirm a friend request and add in each other friend's list.
 * Remove the friend's request.
 * @param {String} req.headers.access_token
 * @param {ObjectID} req.body.friend (id from the user in request friend list)
 */
router.post('/add_friend', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let friend = await UserModel.findOne({id: req.body.friend});

  if (!user) {
    return res.status(400).send({status: "You are not connected."});
  }
  if (friend && !friend.friends_list.includes(user.id) && !user.friends_list.includes(friend.id) && user.friends_request.includes(friend.id)) {
    await friend.updateOne({$push: {friends_list: user.id}});
    await user.updateOne({$push: {friends_list: friend.id}});
    await user.updateOne({$pull: {friends_request: friend.id}});
    return  res.status(200).send({status: "Friend added successfully."});
  }
  return res.status(400).send({status: "An error occured."});
});


// ADD_TAG
/**
 * Add tags in the current user's tag list
 * @param {String} req.headers.access_token
 * @param {[String]} req.body.tags_list
 */
router.post('/add_tag', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let new_tag = null;
  let add_list = req.body.tags_list

  if (!user) {
    return res.status(400).send({status: "You are not connected."});
  }
  for (let index = 0; index < add_list.length; index++) {
    new_tag = await TagModel.findOne({name: add_list[index]})
    if (new_tag && !user.tags_list.includes(new_tag)) {
      await user.updateOne({$push: {tags_list: new_tag.name}})
    }
  }
  return  res.status(200).send({status: "Tag(s) added successfully."});
});


// ADD_HISTORIC
/**
 * Add a course into the historic of the user.
 * @param {String} req.headers.access_token
 * @param {ObjectID} req.body.course
 */
router.post('/add_historic', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let course = await CourseModel.findOne({id: req.body.course});

  if (!user)
    return res.status(400).send({status: "You are not connected."});
  if (course) {
    let new_course = [course.id, Date.now()];
    await user.updateOne({$push: {course_historic: new_course}});
    return res.status(200).send({status: "Historic added."});
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
    return res.status(200).send({status: "Log in successfully.", access_token: token});
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


// GET_OWN_PROFILE
/**
 * Get the user's profile for the cache.
 * @param {String} req.headers.access_token
 */
router.get('/get_own_profile', async function(req, res) {
  const projection = '-_id -password -access_token -socket_id -facebook_id' //-param for excluding
  let profile = await UserModel.findOne({access_token: req.headers.access_token}, projection);

  if (profile) {
    return res.status(200).send({status: "Profile sent.", profile});
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
  const projection = '-_id id mail creation_date pseudo partner first_name last_name tags_list friends_list';
  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let profile = null;

  if (!user) {
    return res.status(400).send({status: "You are not connected."});
  }
  profile = await UserModel.findOne({id: req.headers.user_id}, projection);
  if (profile) {
    return res.status(200).send({status: "Profile sent.", profile});
  }
  return res.status(400).send({status: "User ID provided is not valid."});
});


// GET_USER_TAGS
/**
 * Get the user(s) tags.
 * @param {String} req.headers.access_token
 * @param {[String]} req.headers.user_id
 */
router.get('/get_user_tags', async function(req, res) {

  let user = await UserModel.findOne({access_token: req.headers.access_token});
  let all_user_tags = [];
  let user_tags = null;
  let user_index = null;

  if (!user) {
    return res.status(400).send({status: "You are not connected."});
  }
  user_id = req.headers.user_id.split(',');
  for (let index = 0; index < user_id.length; index++) {
    user_index = await UserModel.findOne({id: user_id[index]}, {projection: {_id: 0}});
    if (user_index) {
      user_tags = await TagModel.find({name: {$in: user_index.tags_list}}, {projection: {_id: 0}});
      if (user_tags) {
        all_user_tags.push(user_tags);
      }
    }
  }
  return  res.status(200).send({status: "User's Tags sent." , all_user_tags});
});


// GET_USER_BY_ID
/**
 * Get the user(s) tags.
 * @param {String} req.headers.access_token
 * @param {String || [String]} req.headers.users_list
 * @param {String} req.headers.projection //Fields to return in Object
 */
router.get('/get_user_by_id', async function(req, res) {
  let user = await UserModel.findOne({access_token: req.headers.access_token});
  const projection = req.headers.projection;
  let users_list = null;

  if (!user) {
      return res.status(400).send({status: "You are not connected."});
  }
  let given_list = req.headers.users_list.split(',');
  if (given_list) {
      users_list = await UserModel.find({id: {$in: given_list}, projection});
      if (users_list) {
          return res.status(200).send({status: "User(s) found.", users_list});
      }
  }
  return res.status(400).send({status: "User(s) not found."});
});


// REMOVE_ACCOUNT
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

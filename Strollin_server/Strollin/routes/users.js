var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');

const CryptoJS = require("crypto-js");

const fs = require("fs");

const keyCrypto = "key";

const {
  UserModel
} = require("../models/user")

const {
  BlacklistModel
} = require("../models/blacklist")

const {
  TagModel
} = require("../models/tag")

const {
  CourseModel
} = require("../models/course")

const {
  ImageModel
} = require("../models/image")


// REGISTER
/**
 * Register a new user
 * @param {String} req.body.mail
 * @param {String} req.body.password
 * @param {Boolean} req.body.partner
 * @param {String} req.body.pseudo (optional)
 * @param {String} req.body.first_name (optional)
 * @param {String} req.body.last_name (optional)
 */
router.post('/register', async function (req, res) {

  console.log("REGISTER BODY: ", req.body);
  if (!req.body.mail || !req.body.mail.includes('@')) {
    return res.status(400).send({ error_code: 100 });
  }

  let mail = await UserModel.findOne({
    mail: req.body.mail.toLowerCase()
  }).catch(error => error);
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (mail && mail.reason) {
    return res.status(500).send({ error_code: 2 });
  } else if (mail) {
    return res.status(400).send({ error_code: 101 });
  }
  if (req.body.mail && req.body.password && req.body.partner !== undefined) {
    let password_check = await check_the_password(req.body.password);
    if (password_check == false) {
      return res.status(400).send({ error_code: 102 });
    }
    user = new UserModel({
      id: new Number(Date.now()),
      creation_date: new Date().toLocaleDateString("fr-FR"),
      mail: req.body.mail.toLowerCase(),
      //password: req.body.password,
      password: CryptoJS.HmacSHA1(req.body.password, keyCrypto),
      partner: req.body.partner,
      access_token: token,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    if (req.body.pseudo != null) {
      user.pseudo = req.body.pseudo
    } else {
      user.pseudo = "user" + String(user.id);
    }

    let error = await user.save().catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com', // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: 'strollinapp@outlook.com',
        pass: 'Strollin94',
      },
    });

    console.log("path ", __dirname + '/../mailSubscription.html');

    fs.readFile(__dirname + '/../mailSubscription.html', "utf8", function (err, data) {
      console.log('data ', data);
      console.log('err: ', err);

      const message = data.replace('USER_NAME', req.body.pseudo).replace("USER_ID", user.id.toString());

      console.log("message :", message);

      const mailOptions = {
        from: '"Strollin App" <strollinapp@outlook.com>', // sender address (who sends)
        to: req.body.mail.toLowerCase(), // list of receivers (who receives)
        subject: `subscribe the app Strollin `, // Subject line
        html: message,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    });

    //// create the mail to send
    //const mailOptions = {
    //  from: '"Strollin App" <strollinapp@outlook.com>', // sender address (who sends)
    //  to: req.body.mail.toLowerCase(), // list of receivers (who receives)
    //  subject: `subscribe the app Strollin `, // Subject line
    //  html: `<a href="https://strollin.ddns.net/users/verify?id=${user.id}">test</a> `,
    //};
    //
    //// send the mail
    //transporter.sendMail(mailOptions, function (error, info) {
    //  if (error) {
    //    console.log(error);
    //  } else {
    //    //console.log('Email sent: ' + info.response);
    //  }
    //});

    return res.status(200).send({
      status: "Account created successfully.",
      access_token: token
    });
  }
  return res.status(400).send({
    status: "The entry is invalid."
  });
});


router.post('/reset_password', async function (req, res) {
  console.log("Reset password: ", req.body);
  if (!req.body.mail || !req.body.mail.includes('@')) {
    return res.status(400).send({
      status: "A valid mail was not provided."
    });
  }

  let mail = await UserModel.findOne({
    mail: req.body.mail.toLowerCase()
  }).catch(error => error);
  //let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (mail && mail.reason) {
    return res.status(400).send({
      status: "Error in database transaction:\n",
      error: mail
    });
  } else if (mail) {

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com', // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: 'StrollinBeta@hotmail.com',
        pass: 'Strollin1234',
      },
    });

    //read tamplate mail,
    fs.readFile(__dirname + '/../RestPassword.html', "utf8", function(err, data) {
      //console.log('data ', data);
      console.log('err', err, req.body.mail.toLowerCase() );

      const mailUser = data.replace('LINK_USER', 'https://strollin.ddns.net/users/reset_password?id=' + mail.id.toString())

      const mailOptions = {
        from: '"Strollin App" <StrollinBeta@hotmail.com>', // sender address (who sends)
        to: req.body.mail.toLowerCase(), // list of receivers (who receives)
        subject: `Reset password Strollin `, // Subject line
        html: mailUser,
      };

      // send the mail
      transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    })

    // create the mail to send
    

    

    return res.status(200).send({
      status: "Reset Mail sent.",
      //access_token: token
    });
  }
  return res.status(400).send({ error_code: 3 });
});



router.get('/verify', async function (req, res) {

  //console.log("verify\n", req.query.id);
  let user = await UserModel.findOne({
    id: req.query.id
  }).catch(error => error);
  if (!user) {
    return res.status(401).send({ error_code: 1 });
  } else if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  } else {

    let error = await UserModel.updateOne({
      id: user.id
    }, {
      verify: true
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    /*return res.render("verify", {
      user: user
    }*/
    return res.status(200).send({
      status: "Account verified successfully."
    });
  }
});

router.post('/reset_password_confirme', async function (req, res) {

  console.log("reset_password_confirme\n", req.body);
  let user = await UserModel.findOne({
    id: req.body.user_id
  }).catch(error => error);
  if (!user) {
    return res.status(400).send({
      status: "not valid link"
    });
  } else if (user.reason) {
    return res.status(400).send({
      status: "Error in database transaction:\n",
      error: user
    });
  } else if (req.body.password !== req.body.confirm_password) {
    return res.status(400).send({
      status: "Error password or not the same:\n",
    });
  } else {

    //const newPassword = CryptoJS.HmacSHA1(req.body.password, keyCrypto);

    user.password = await CryptoJS.HmacSHA1(req.body.password, keyCrypto)

    console.log("user new : ", user);

    let error = await user.save().catch(error => error);

    /*let error = await UserModel.updateOne({
      id: req.body.user_id,
    }, {password: CryptoJS.HmacSHA1(req.body.password, keyCrypto)}).catch(error => error);
*/
    if (error.errors) {
      console.log("error ", error);
      return res.status(400).send({
        status: "Error in database transaction:\n",
        error: error.errors
      });
    }

    return res.render("confirmed_password", {
      //user: user
    })
  }
 
});

router.get('/reset_password', async function (req, res) {

  console.log("reset_password\n", req.query.id);
  let user = await UserModel.findOne({
    id: req.query.id
  }).catch(error => error);
  if (!user) {
    return res.status(400).send({
      status: "not valid link"
    });
  } else if (user.reason) {
    return res.status(400).send({
      status: "Error in database transaction:\n",
      error: user
    });
  } else {
    return res.render("reset_password", {
      user: user
    })
  }
});


// EDIT_PROFILE
/**
 * Edit a user's information
 * @param {String} req.headers.access_token
 *
 * At least one of below
 * @param {String} req.body.password (Optional)
 * @param {String} req.body.pseudo (Optional)
 * @param {String} req.body.first_name (Optional)
 * @param {String} req.body.last_name (Optional)
 */
router.post('/edit_profile', async function (req, res) {
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }

  if (!req.body.password && !req.body.pseudo && !req.body.first_name && !req.body.last_name) {
    return res.status(400).send({ error_code: 3 });
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
  let error = await UserModel.updateOne({
    id: user.id
  }, query).catch(error => error);
  if (error.errors) {
    return res.status(500).send({ error_code: 2 });
  }
  return res.status(200).send({
    status: "Profile edited."
  });
});


// // ADD_FRIEND_REQUEST
// /**
//  * Register the current user into the other user's friend request list.
//  * @param {String} req.headers.access_token
//  * @param {ObjectID} req.body.friend (ID of the user you want to request)
//  */
// router.post('/add_friend_request', async function (req, res) {

//   let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id pseudo friends_request friends_list").catch(error => error);

//   if (!user) {
//     return res.status(401).send({ error_code: 1 });
//   }
//   if (user.reason) {
//     return res.status(500).send({ error_code: 2 });
//   }

//   let friend = await UserModel.findOne({ id: req.body.friend }, "-_id id pseudo friends_request friends_list").catch(error => error);
//   if (!friend) {
//     return res.status(400).send({ error_code: 4 });
//   } else if (friend.reason) {
//     return res.status(500).send({ error_code: 2 });
//   } else if (friend.friends_request.includes(user.id) || friend.friends_list.includes(user.id) || user.friends_request.includes(friend.id) || user.friends_list.includes(friend.id)) {
//     return res.status(400).send({ error_code: 4 });
//   } else {
//     let error = await UserModel.updateOne({ id: friend.id }, { $push: { friends_request: user.id } }).catch(error => error);
//     if (error.errors) {
//       return res.status(500).send({ error_code: 2 });
//     }
//     return res.status(200).send({ status: "Friend requested successfully." });
//   }
// });


// // ADD_FRIEND
// /**
//  * Confirm a friend request and add in each other friend's list.
//  * Remove the friend's request.
//  * @param {String} req.headers.access_token
//  * @param {ObjectID} req.body.friend (id from the user in request friend list)
//  */
// router.post('/add_friend', async function (req, res) {
//   let user = await UserModel.findOne({ access_token: req.headers.access_token }, "-_id id pseudo friends_request friends_list").catch(error => error);

//   if (!user) {
//     return res.status(401).send({ error_code: 1 });
//   }
//   if (user.reason) {
//     return res.status(500).send({ error_code: 2 });
//   }

//   let friend = await UserModel.findOne({ id: req.body.friend }, "-_id id pseudo friends_request friends_list").catch(error => error);
//   if (!friend) {
//     return res.status(400).send({ error_code: 4 });
//   } else if (friend.reason) {
//     return res.status(500).send({ error_code: 2 });
//   } else if (friend.friends_list.includes(user.id) && user.friends_list.includes(friend.id)) {
//     return res.status(400).send({ error_code: 4 });
//   } else if (!user.friends_request.includes(friend.id)) {
//     return res.status(400).send({ error_code: 4 });
//   } else {
//     let error = await UserModel.updateOne({ id: friend.id }, { $push: { friends_list: user.id } }).catch(error => error);
//     if (error.errors) {
//       return res.status(500).send({ error_code: 2 });
//     }

//     error = await UserModel.updateOne({ id: user.id }, { $push: { friends_list: friend.id } }).catch(error => error);
//     if (error.errors) {
//       return res.status(500).send({ error_code: 2 });
//     }

//     error = await UserModel.updateOne({ id: user.id }, { $pull: { friends_request: friend.id } }).catch(error => error);
//     if (error.errors) {
//       return res.status(500).send({ error_code: 2 });
//     }
//     return res.status(200).send({ status: "Friend added successfully." });
//   }
// });


// ADD_FRIEND (BETA VERSION)
/**
 * Add friend by mail.
 * @param {String} req.headers.access_token
 *
 * @param {ObjectID} req.body.friend_mail
 */
router.post('/add_friend', async function (req, res) {
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo friends_list").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }

  let friend = await UserModel.findOne({
    mail: req.body.friend_mail.toLowerCase()
  }, "-_id id pseudo friends_list").catch(error => error);
  if (!friend) {
    return res.status(400).send({ error_code: 4 });
  } else if (friend.reason) {
    return res.status(500).send({ error_code: 2 });
  } else if (friend.friends_list.includes(user.id) || user.friends_list.includes(friend.id)) {
    return res.status(400).send({ error_code: 4 });
  } else {
    let error = await UserModel.updateOne({
      id: friend.id
    }, {
      $push: {
        friends_list: user.id
      }
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }

    error = await UserModel.updateOne({
      id: user.id
    }, {
      $push: {
        friends_list: friend.id
      }
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({
      status: "Friend added successfully."
    });
  }
});


// router.post('/add_image_profile', upload.single('uploaded_file'), function (req, res) {
//  // req.file is the name of your file in the form above, here 'uploaded_file'
//  // req.body will hold the text fields, if there were any
//  console.log(req.file, req.body)
// });

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, __dirname + '/../public/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage
});

router.post('/set_image_profile', upload.array('image', 3), async (req, res) => {
  //console.log('file', req.files);
  //console.log('body', req.body);
  //console.log('path', __dirname + '/../public/images');

  let user = await UserModel.findOne({
    access_token: req.body.access_token
  }).catch(error => error);

  //console.log('headers: ', req.headers);
  //console.log('user: ', user);

  if (user) {

    let image = new ImageModel({
      id: new Number(Date.now()),
      author: user.id,
      uri: req.files[0].filename,
      mimetype: req.files[0].mimetype
    });

    let error = await image.save().catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    } else {

      await UserModel.updateOne({
        access_token: req.body.access_token
      }, {
        id_image_profile: image.id
      }).catch(error => error);


      res.status(200).json({
        image: image,
      });
    }

  } else {
    return res.status(401).send({ error_code: 1 });
  }
});

// ADD_TAG
/**
 * Add tags in the current user's tag list
 * @param {String} req.headers.access_token
 *
 * @param {[String]} req.body.tags_list
 */
router.post('/add_tag', async function (req, res) {
  let new_tag = null;
  let add_list = req.body.tags_list
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo tags_list").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }

  for (let index = 0; index < add_list.length; index++) {
    new_tag = await TagModel.findOne({
      name: add_list[index].toLowerCase()
    }).catch(error => error);
    if (new_tag && new_tag.reason) {
      return res.status(500).send({ error_code: 2 });
    }
    if (new_tag && !user.tags_list.includes(new_tag.name)) {
      let error = await UserModel.updateOne({
        id: user.id
      }, {
        $push: {
          tags_list: new_tag.name
        }
      });
      if (error.errors) {
        return res.status(500).send({ error_code: 2 });
      }
    }
  }
  return res.status(200).send({
    status: "Tag(s) added successfully."
  });
});


// ADD_HISTORIC
/**
 * Add a course into the historic of the user.
 * @param {String} req.headers.access_token
 * @param {String} req.body.course
 */
router.post('/add_historic', async function (req, res) {

  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo").catch(error => error);
  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }

  let course = await CourseModel.findOne({
    id: req.body.course
  }).catch(error => error);
  if (!course) {
    return res.status(400).send({ error_code: 4 });
  } else if (course.reason) {
    return res.status(500).send({ error_code: 2 });
  } else {
    let new_course = [course.id, new Date().toLocaleDateString("fr-FR")];
    let error = await UserModel.updateOne({
      id: user.id
    }, {
      $push: {
        course_historic: new_course
      }
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({
      status: "Historic added."
    });
  }
});


// ADD_FAVORITE
/**
 * Add a course into the favorite of the user.
 * @param {String} req.headers.access_token
 *
 * @param {String} req.body.course
 */
router.post('/add_favorite', async function (req, res) {

  console.log("body: ", req.body.course);
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo course_favorites").catch(error => error);
  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  console.log("ici");
  let course = await CourseModel.findOne({
    id: req.body.course
  }).catch(error => error);
  if (!course) {
    return res.status(400).send({ error_code: 4 });
  } else if (course.reason) {
    return res.status(500).send({ error_code: 2 });
  } else {
    if (user.course_favorites.includes(course.id)) {
      return res.status(400).send({ error_code: 4 });
    }
    let error = await UserModel.updateOne({
      id: user.id
    }, {
      $push: {
        course_favorites: course.id
      }
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }

    user = await UserModel.findOne({
      access_token: req.headers.access_token
    }, "id pseudo course_favorites").catch(error => error);
    if (user.reason) {
      return res.status(500).send({ error_code: 2 });
    }
    let courses_list = [];
    course = undefined;
    for (let index = 0; index < user.course_favorites.length; index++) {
      course = await CourseModel.findOne({
        id: user.course_favorites[index]
      }).catch(error => error);
      if (course && course.reason) {
        return res.status(500).send({ error_code: 2 });
      }
      courses_list.push(course);
    }
    return res.status(200).send({
      status: "Favorite added.",
      course_favorites: courses_list
    });
  }
});

router.post('/add_favorite', async function (req, res) {

  console.log("body: ", req.body.course);
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo course_favorites").catch(error => error);
  if (!user) {
    return res.status(400).send({
      status: "You are not connected."
    });
  }
  if (user.reason) {
    return res.status(400).send({
      status: "Error in database transaction:\n",
      error: user
    });
  }
  let course = await CourseModel.findOne({
    id: req.body.course
  }).catch(error => error);
  if (!course) {
    return res.status(400).send({
      status: "The course does not exist."
    });
  } else if (course.reason) {
    return res.status(400).send({
      status: "Error in database transaction:\n",
      error: user
    });
  } else {
    if (user.course_favorites.includes(course.id)) {
      return res.status(400).send({
        status: "The course is already in favorite."
      });
    }
    let error = await UserModel.updateOne({
      id: user.id
    }, {
      $push: {
        course_favorites: course.id
      }
    }).catch(error => error);
    if (error.errors) {
      return res.status(400).send({
        status: "Error in database transaction:\n",
        error: error
      });
    }

    user = await UserModel.findOne({
      access_token: req.headers.access_token
    }, "id pseudo course_favorites").catch(error => error);
    if (user.reason) {
      return res.status(400).send({
        status: "Error in database transaction:\n",
        error: user
      });
    }
    let courses_list = [];
    course = undefined;
    for (let index = 0; index < user.course_favorites.length; index++) {
      course = await CourseModel.findOne({
        id: user.course_favorites[index]
      }).catch(error => error);
      if (course && course.reason) {
        return res.status(400).send({
          status: "Error in database transaction:\n",
          error: course
        });
      }
      courses_list.push(course);
    }
    return res.status(200).send({
      status: "Favorite added.",
      course_favorites: courses_list
    });
  }
});

// REMOVE_FRIEND (Version Beta)
/**
 * Delete an friend from friend_list.
 * @param {String} req.headers.access_token
 *
 * @param {String} req.body.friend_id
 */
router.post('/remove_friend', async function (req, res) {

  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }).catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  let friend = await UserModel.findOne({
    id: req.body.friend_id
  }, "-_id id pseudo friends_list").catch(error => error);
  if (!friend) {
    return res.status(400).send({ error_code: 4 });
  } else if (friend.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  let error = await UserModel.updateOne({
    id: user.id
  }, {
    $pull: {
      friends_list: friend.id
    }
  }).catch(error => error);
  if (error.errors) {
    return res.status(500).send({ error_code: 2 });
  }
  error = await UserModel.updateOne({
    id: friend.id
  }, {
    $pull: {
      friends_list: user.id
    }
  }).catch(error => error);
  if (error.errors) {
    return res.status(500).send({ error_code: 2 });
  }
  return res.status(200).send({
    status: "Friend successfully removed."
  });
});


// REMOVE_FAVORITE
/**
 * Remove a course from course_favorites.
 * @param {String} req.headers.access_token
 *
 * @param {String} req.body.course
 */
router.post('/remove_favorite', async function (req, res) {

  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "id pseudo course_favorites").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  if (!user.course_favorites.includes(req.body.course_id)) {
    return res.status(400).send({ error_code: 4 });
  }
  let error = await UserModel.updateOne({
    id: user.id
  }, {
    $pull: {
      course_favorites: req.body.course_id
    }
  }).catch(error => error);
  if (error.errors) {
    return res.status(500).send({ error_code: 2 });
  }

  user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "id pseudo course_favorites").catch(error => error);
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  let courses_list = [];
  let course = undefined;
  for (let index = 0; index < user.course_favorites.length; index++) {
    course = await CourseModel.findOne({
      id: user.course_favorites[index]
    }).catch(error => error);
    if (course && course.reason) {
      return res.status(500).send({ error_code: 2 });
    }
    courses_list.push(course);
  }
  return res.status(200).send({
    status: "Favorite successfully removed.",
    course_favorites: courses_list
  });
});


// LOGIN
/**
 * Log in an user to get a new access token.
 * @param {String} req.headers.mail
 * @param {String} req.headers.password
 */
router.get('/login', async function (req, res) {

  let user = await UserModel.findOne({
    mail: req.headers.mail.toLowerCase(),
    password: CryptoJS.HmacSHA1(req.headers.password, keyCrypto).toString()
  }).catch(error => error);
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  let error = undefined;
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let blacklist = await BlacklistModel.findOne({
    ip: ip
  }).catch(error => error);

  if (!blacklist) {
    blacklist = new BlacklistModel({
      ip: ip
    });
    error = await blacklist.save().catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
  } else if (blacklist.reason) {
    return res.status(500).send({ error_code: 2 });
  } else if (Number(Date.now()) < blacklist.lock_date + (1000 * 60 * (blacklist.attempt - 3))) {
    return res.status(401).send({ error_code: 104, delay: (blacklist.attempt - 3 - Number(Date.now())) });
  }

  //User Not found
  if (!user) {
    error = await BlacklistModel.updateOne({
      ip: blacklist.ip
    }, {
      attempt: (blacklist.attempt + 1),
      lock_date: Number(Date.now())
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    if (Number(Date.now()) < Number(Date.now()) + (1000 * 60 * (blacklist.attempt + 1 - 3))) {
      return res.status(400).send({ error_code: 104, delay: (blacklist.attempt - 3 - Number(Date.now())) });
    }
    return res.status(400).send({ error_code: 103 });

    //Transaction error
  } else if (user && user.reason) {
    return res.status(500).send({ error_code: 2 });

    //User found
  } else {
    error = await UserModel.updateOne({
      id: user.id
    }, {
      access_token: token
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    error = await BlacklistModel.updateOne({
      ip: blacklist.ip
    }, {
      attempt: 0
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({
      status: "Log in successfully.",
      access_token: token
    });
  }
});

// LOGIN_WEB
/**
 * Log in an user to get a new access token (For Website).
 * @param {String} req.body.mail
 * @param {String} req.body.password
 */
router.post('/login_web', async function (req, res) {

  let user = await UserModel.findOne({
    mail: req.body.mail.toLowerCase(),
    password: CryptoJS.HmacSHA1(req.body.password, keyCrypto).toString()
  }).catch(error => error);
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  console.log("token web:", token);
  let error = undefined;
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let blacklist = await BlacklistModel.findOne({
    ip: ip
  }).catch(error => error);

  if (!blacklist) {
    blacklist = new BlacklistModel({
      ip: ip
    });
    error = await blacklist.save().catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
  } else if (blacklist.reason) {
    return res.status(500).send({ error_code: 2 });
  } else if (Number(Date.now()) < blacklist.lock_date + (1000 * 60 * (blacklist.attempt - 3))) {
    return res.status(400).send({ error_code: 104, delay: (blacklist.attempt - 3 - Number(Date.now())) });
  }

  //User Not found
  if (!user) {
    error = await BlacklistModel.updateOne({
      ip: blacklist.ip
    }, {
      attempt: (blacklist.attempt + 1),
      lock_date: Number(Date.now())
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    if (Number(Date.now()) < Number(Date.now()) + (1000 * 60 * (blacklist.attempt + 1 - 3))) {
      return res.status(400).send({ error_code: 104, delay: (blacklist.attempt - 3 - Number(Date.now())) });
    }
    return res.status(400).send({ error_code: 103 });

    //Transaction error
  } else if (user && user.reason) {
    return res.status(500).send({ error_code: 2 });

    //User found
  } else {
    if (user.partner == false) {
      return res.status(401).send({ error_code: 5 });
    }
    error = await UserModel.updateOne({
      id: user.id
    }, {
      access_token: token
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    error = await BlacklistModel.updateOne({
      ip: blacklist.ip
    }, {
      attempt: 0
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({
      status: "Log in successfully.",
      access_token: token
    });
  }
});


// LOGOUT
/**
 * Log out an user and delete the access token.
 * @param {String} req.headers.access_token
 */
router.get('/logout', async function (req, res) {

  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }).catch(error => error);
  let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  } else if (user && user.reason) {
    return res.status(500).send({ error_code: 2 });
  } else {
    let error = await UserModel.updateOne({
      id: user.id
    }, {
      access_token: token
    }).catch(error => error);
    if (error.errors) {
      return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({
      status: "Log out successfully."
    });
  }
});


// GET_OWN_PROFILE
/**
 * Get the user's profile for the cache.
 * @param {String} req.headers.access_token
 */
router.get('/get_own_profile', async function (req, res) {
  const projection = '-_id -password -access_token -socket_id -facebook_id -stripe_id -subscription_id -verify' //-param for excluding
  let profile = await UserModel.findOne({
    access_token: req.headers.access_token
  }, projection).catch(error => error);

  if (!profile) {
    return res.status(401).send({ error_code: 1 });
  } else if (profile.reason) {
    return res.status(500).send({ error_code: 2 });
  } else {
    return res.status(200).send({
      status: "Profile sent.",
      profile
    });
  }
});


// GET_USER_PROFILE
/**
 * Get any user's profile.
 * @param {String} req.headers.access_token
 * @param {String} req.headers.user_id
 */
router.get('/get_user_profile', async function (req, res) {
  const projection = '-_id id mail creation_date pseudo partner first_name last_name tags_list friends_list';
  let profile = undefined;
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  profile = await UserModel.findOne({
    id: req.headers.user_id
  }, projection).catch(error => error);
  if (!profile) {
    return res.status(400).send({ error_code: 4 });
  }
  if (profile.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  return res.status(200).send({
    status: "Profile sent.",
    profile
  });
});


// GET_USER_TAGS
/**
 * Get the user(s) tags.
 * @param {String} req.headers.access_token
 * @param {[String]} req.headers.user_id
 */
router.get('/get_user_tags', async function (req, res) {

  let all_user_tags = [];
  let user_tags = undefined;
  let user_index = undefined;
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  let user_id = req.headers.user_id.split(',');
  for (let index = 0; index < user_id.length; index++) {
    user_index = await UserModel.findOne({
      id: user_id[index]
    }, {
      projection: {
        _id: 0
      }
    }).catch(error => error);
    if (!user_index) {
      return res.status(400).send({ error_code: 4 });
    }
    if (user_index.reason) {
      return res.status(500).send({ error_code: 2 });
    }
    if (user_index) {
      user_tags = await TagModel.find({
        name: {
          $in: user_index.tags_list
        }
      }, {
        projection: {
          _id: 0
        }
      }).catch(error => error);
      if (user_tags && user_tags.reason) {
        return res.status(500).send({ error_code: 2 });
      }
      if (user_tags) {
        all_user_tags.push(user_tags);
      }
    }
  }
  return res.status(200).send({
    status: "User's Tags sent.",
    all_user_tags
  });
});


// GET_USERS
/**
 * Get the list of users
 * @param {String} req.headers.access_token
 */
router.get('/get_users', async function (req, res) {

  let users_list = undefined;
  const projection = '-_id id mail creation_date pseudo partner first_name last_name tags_list friends_list';
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo").catch(error => error);

  if (!user) {
      return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
      return res.status(500).send({ error_code: 2 });
  }
  users_list = await UserModel.find({}, projection).catch(error => error);
  if (users_list.reason) {
      return res.status(500).send({ error_code: 2 });
  }
  return res.status(200).send({ status: "List of users returned.", users_list});
});


// GET_USER_BY_ID
/**
 * Get the user(s) by ID.
 * @param {String} req.headers.access_token
 * @param {UserID || [UserID]} req.headers.users_list
 */
router.get('/get_user_by_id', async function (req, res) {
  const projection = "-_id -password -access_token -socket_id -facebook_id -stripe_id - subscription_id";
  let user = await UserModel.findOne({
    access_token: req.headers.access_token
  }, "-_id id pseudo").catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  let given_list = req.headers.users_list.split(',');
  let users_list = await UserModel.find({
    id: {
      $in: given_list
    }
  }).catch(error => error);
  if (users_list && users_list.reason) {
    return res.status(500).send({ error_code: 2 });
  } else if (users_list && users_list.length > 0) {
    return res.status(200).send({
      status: "User(s) found.",
      users_list
    });
  } else {
    return res.status(200).send({ users_list });
  }
});


// REMOVE_ACCOUNT
/**
 * Delete an account.
 * @param {String} req.headers.access_token
 * @param {String} req.headers.password
 */
router.delete('/remove_account', async function (req, res) {

  let user = await UserModel.findOne({
    access_token: req.headers.access_token,
    password: req.headers.password
  }).catch(error => error);

  if (!user) {
    return res.status(401).send({ error_code: 1 });
  }
  if (user.reason) {
    return res.status(500).send({ error_code: 2 });
  }
  let error = await UserModel.remove({
    id: user.id
  }).catch(error => error);
  if (error.errors) {
    return res.status(500).send({ error_code: 2 });
  }
  return res.status(200).send({
    status: "Account successfully deleted."
  });
});




/***
 * OTHER FUNCTION
 ***/

async function check_the_password(password) {
  let pass_lenght = false;
  let pass_lowcase = false;
  let pass_upcase = false;
  let pass_number = false;

  if (password.length >= 6) {
    pass_lenght = true;
  }
  for (let index in password) {
    if (password[index] >= '0' && password[index] <= '9') {
      pass_number = true;
    } else if (password[index] >= 'a' && password[index] <= 'z') {
      pass_lowcase = true;
    } else if (password[index] >= 'A' && password[index] <= 'Z') {
      pass_upcase = true;
    }
  }
  if (pass_lenght && pass_lowcase && pass_upcase && pass_number) {
    return true;
  }
  return false;
};


module.exports = router;
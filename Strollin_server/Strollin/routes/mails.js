var express = require('express');
var router = express.Router();

const fs = require("fs");


const formidable = require('formidable');
const nodemailer = require('nodemailer');

const {
    MessageModel
} = require("../models/message")

const {
    UserModel
} = require("../models/user")


router.post('/send', async function(req, res, next) {

    const form = formidable({ multiples: true });

    const projection = 'mail' //-param for excluding


    let mail = await UserModel.find({ verify: true }, projection).catch(error => error);

    console.log("mail ", mail);


    let sender = "";

    mail.forEach(element => {
      console.log(" receiver ", element);

      if (sender == "") {
        sender = sender.concat(element.mail);
      } else {
        sender = sender.concat(', ' , element.mail);
        
      }
    });

    console.log("sender = ", sender);


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


    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      //console.log("Field ", fields);
      //console.log("Files ", files);

      var nameFile = fields.mail_object;
      var oldpath = files.mail_body.path;
      var newpath = __dirname + '/../' + nameFile;
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
      });
      fs.unlink( oldpath, function (err) {
        if (err) throw err;
      }); 

      fs.readFile(newpath, "utf8", function(err, data) {
          console.log('data ', data);
          const mailOptions = {
            from: '"Strollin App" <strollinapp@outlook.com>', // sender address (who sends)
            to: sender, // list of receivers (who receives)
            subject: fields.mail_object, // Subject line
            html: data,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
            }
          });

      });

      res.redirect('/news');
    }); 
});


// GET_MESSAGE
/**
 * Get the data of the messages provided in the array of messageID
 * @param {String} req.headers.access_token
 * @param {String} req.headers.message_id
 */
router.get('/get_message', async function(req, res) {
    let message = null;
    const projection = "-_id";
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }
    message = await MessageModel.findOne({id: req.headers.message_id}, projection).catch(error => error);
    if (message && message.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: message});
    } else if (message) {
        message.creation_date = Date(message.creation_date)
        return res.status(200).send({status: "Message found.", message});
    } else {
        return res.status(400).send({status: "Message not found."});
    }
});


// GET_MESSAGE_BY_ID
/**
 * Get the message(s) by ID.
 * @param {String} req.headers.access_token
 * @param {TagID || [TagID]} req.headers.messages_list
 */
router.get('/get_message_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    let given_list = req.headers.messages_list.split(',');
    let messages_list = await TagModel.find({id: {$in: given_list}}).catch(error => error);
    if (messages_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: messages_list});
    } else if (messages_list.length > 0) {
        return res.status(200).send({status: "Message(s) found.", messages_list});
    } else {
        return res.status(400).send({status: "Message(s) not found.", error: messages_list});
    }
});


module.exports = router;

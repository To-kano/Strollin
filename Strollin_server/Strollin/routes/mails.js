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

module.exports = router;

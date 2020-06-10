/*const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const creds = require('./config');

var transport = {
  host: 'in-v3.mailjet.com', // e.g. smtp.gmail.com
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

app.use(express.json()); app.post('/send', (req, res, next) => {
    const email = req.body.email
    const question = req.body.question
  
  
    var mail = {
      from: email,
      to: 'tony.ye@epitech.eu',  
      subject: 'Question from strollin webpage',
  
      html: question
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
})
*/
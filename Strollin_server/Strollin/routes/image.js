var express = require('express');
var router = express.Router();

const {
    ImageModel
} = require("../models/image")

const {
  UserModel
} = require("../models/user")

/* GET home page. */
router.get('/id', async function (req, res, next) {

    let image = await ImageModel.findOne({ id: req.headers.id }).catch(error => error);

    //console.log("header: ", req.headers);

    if (image) {

        console.log("image get: ", image);

        res.status(200).json({
            image: image,
        });
    } else {
        return res.status(400).send({ error_code: 4 });
    }
});


const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, __dirname + '/../public/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.array('image', 3), async (req, res) => {
  //console.log('file', req.files);
  //console.log('body', req.body);
  //console.log('path', __dirname + '/../public/images');

  let user = await UserModel.findOne({ access_token: req.body.access_token }).catch(error => error);

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
      res.status(200).json({
        image: image,
      });
    }

  } else {
    return res.status(401).send({ error_code: 1 });
  }
});


module.exports = router;

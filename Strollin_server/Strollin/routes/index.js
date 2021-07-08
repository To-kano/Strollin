var express = require('express');
const multer = require('multer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next) {
  res.render('news', { title: 'Express' });
});


const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, __dirname + '/../public/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  console.log('path', __dirname + '/../public/images');
  res.status(200).json({
    message: 'success!',
  });
});

module.exports = router;

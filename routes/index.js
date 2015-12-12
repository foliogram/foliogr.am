let hat     = require('hat');
let path    = require('path');
let express = require('express');
let router  = express.Router();
let ffmpeg  = require('fluent-ffmpeg');
let multer  = require('multer');
let storage = multer.diskStorage({
  destination: 'tmp',
  filename: (req, file, cb) => {
    return cb(null, `${hat()}.${file.originalname.split('.').pop()}`);
  }
});
let upload = multer({ storage });

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.single('attachment'), (req, res, next) => {
  let imagePath = req.file.filename.substr(0, req.file.filename.lastIndexOf('.'));

  ffmpeg(req.file.path)
    .on('error', function (err, stdout, stderr) {
      return next(stderr);
    })
    .screenshots({
      count: 30,
      folder: `tmp/${imagePath}`,
    })
    .on('end', function () {
      res.redirect('/');
    });
});

module.exports = router;

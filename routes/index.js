let path    = require('path');
let express = require('express');
let router  = express.Router();
let multer  = require('multer');
let upload  = multer({ dest: './tmp' });
let ffmpeg  = require('fluent-ffmpeg');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.single('attachment'), (req, res, next) => {
  ffmpeg(req.file.path)
    .on('error', function (err, stdout, stderr) {
      return next(stderr);
    })
    .screenshots({
      count: 30,
      folder: 'tmp',
    })
    .on('end', function () {
      res.redirect('/');
    });
});

module.exports = router;

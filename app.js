require('dotenv').load();

let express = require('express');
let path = require('path');
let app = express();
let server = require('http').Server(app);
let logger = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let assets = require('connect-assets');
let moment = require('moment-timezone');


// configure modules

assets().environment.getEngines('.styl').configure((s) => {
    s.use(require('nib')());
});

moment.tz.setDefault('Europe/Paris');


// configure express middleware

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(assets({
    buildDir: 'assets/vendor',
    paths: [
        path.join(__dirname, 'assets', 'images'),
        path.join(__dirname, 'assets', 'scripts'),
        path.join(__dirname, 'assets', 'stylesheets'),
        path.join(__dirname, 'assets', 'videos'),
        path.join(__dirname, 'bower_components')
    ]
}));


// routes

// app

app.use(require('./routes/index'));

// error handler

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err, err.stack);

    res.status(err.status || 500);
    res.render('error', {
        message: `${err.message} (${err.status})`
    });
});


// run magic

server.listen(process.env.PORT || 3000);

module.exports = app;

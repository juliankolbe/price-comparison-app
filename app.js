
//3rd Party Modules

var express   = require('express'),
    // bodyParser = require('body-parser'),
    passport  = require('passport'),
    session   = require('express-session'),
    RedisStore = require('connect-redis')(session),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    winston    = require('winston'),



//Local Modules
    // users     = require('./lib/users')(),
    db        = require('_/database'),
    redisClient = require('_/redisClient').connect(),
    testModule = require('_/test'),
//    routes    = require('./routes/router.js'),
    port      = process.env.PORT || 3000,
    passportConfig = require('./lib/auth/passport'),
    // auth      = require('./lib/auth'),
    authEnc   = require('_/authEnc'),
    logger    = require('_/logger'),
    csvUpload = require('_/csvUpload'),
    app       = express();

//*************************************************
//        EJS template registration
//*************************************************

app.set('view engine', 'ejs');

//*************************************************
//      Middleware and other settings
//*************************************************

app.use(express.static(__dirname + '/public'));
//With Virtual Path
//
app.use('/assets', express.static(__dirname + '/public'));

// Logging
//logger.debug('Overriding \'Express\' logger');

// 'dev' mode for short output
app.use(require('morgan')('dev', {stream: logger.stream}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //TODO: check which is better qs or querystring library
app.use(cookieParser());

//*************************************************
//      Cookie and Sessions
//*************************************************
// redisClient.connect();

app.use(session({
  store: new RedisStore({
    client: redisClient
  }),
  secret: 'blablabla',
  resave: false,
  saveUninitialized: false
}));

// passportConfig.init(app);
authEnc.config.passportConfig.init(app);


//*********************************************************
//    Temp Routes
//*********************************************************
app.use('/test', testModule);

app.use('/upload', csvUpload.controllers.uploadController);
app.use('/auth', authEnc.controllers.authController);

// app.use('/auth', auth.auth);
// app.use('/auth', users.auth);
// app.use('/users', users.securedArea);

// app.get('/api/:name', function(req, res){
//   res.status(200).json({"hello": req.params.name });
// });

//*********************************************************
//    Convention based route loading
//*********************************************************
//routes.load(app, './controllers');

//Handle any routes that are unhandled and return 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('404').status(404);
    //res.render('errors/404', err);
});

app.listen(port, function (err) {
    logger.info('Runnning server on port: '+port);
});


//*********************************************************
//    Quick and dirty way to detect event loop blocking
//*********************************************************
var lastLoop = Date.now();

function monitorEventLoop() {
    var time = Date.now();
    if (time - lastLoop > 1000) logger.error('Event loop blocked ' + (time - lastLoop));
    lastLoop = time;
    setTimeout(monitorEventLoop, 200);
}

if (process.env.NODE_ENV === 'development') {
    monitorEventLoop();
}

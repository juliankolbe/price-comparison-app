
// 3rd Party Modules

const express = require('express')
  // bodyParser = require('body-parser'),
  // passport = require('passport'),
  // session = require('express-session'),
  // RedisStore = require('connect-redis')(session),
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Local Modules
  // users     = require('./lib/users')(),

require('_/database')
  // redisClient = require('_/redisClient').connect(),
const testModule = require('_/test')
//    routes    = require('./routes/router.js'),
  // passportConfig = require('./lib/auth/passport'),
  // auth      = require('./lib/auth'),
const authEnc = require('_/authEnc')
const logger = require('_/logger')
const csvUpload = require('_/csvUpload')
const api = require('_/api')
// BABEL STARTS WITH REQUIRING THIS FILE
const client = require('_/client')
const app = express()

// *************************************************
//        EJS template registration
// *************************************************

app.set('view engine', 'ejs')

// *************************************************
//      Middleware and other settings
// *************************************************

// app.use(express.static(__dirname + '/public'));
// With Virtual Path
//
// app.use('/assets', express.static(__dirname + '/public'));

// Logging
// logger.debug('Overriding \'Express\' logger');

// 'dev' mode for short output
app.use(morgan('dev', {stream: logger.stream}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})) // TODO: check which is better qs or querystring library
app.use(cookieParser())

// *************************************************
//      Cookie and Sessions
// *************************************************
// redisClient.connect();

// app.use(session({
//   store: new RedisStore({
//     client: redisClient
//   }),
//   secret: 'blablabla',
//   resave: false,
//   saveUninitialized: false
// }))

// passportConfig.init(app);
authEnc.config.passportConfig.init(app)

// *********************************************************
//    Temp Routes
// *********************************************************

app.use('/api', api)

// app.use('/test', testModule)
//
// app.use('/upload', csvUpload.controllers.uploadController)
app.use('/auth', authEnc.controllers.authController)

// const collectionsMock = [
//   {
//     id: 1,
//     userId: 3,
//     createdAt: '12312542363265235',
//     updatedAt: '12341241231232323',
//     numberOfLists: 6,
//     datedAt: '13/09/2016'
//   },
//   {
//     id: 2,
//     userId: 3,
//     createdAt: '12314342363265235',
//     updatedAt: '12341234331232323',
//     numberOfLists: 5,
//     datedAt: '14/09/2016'
//   },
//   {
//     id: 3,
//     userId: 3,
//     createdAt: '12312542363265235',
//     updatedAt: '12341241231223323',
//     numberOfLists: 4,
//     datedAt: '15/09/2016'
//   }
// ]

// app.get('/api/test', function (req, res) {
//   res.json(collectionsMock)
// })
//
// app.post('/api/download', function (req, res) {
//   logger.debug(req.body)
//   res.json(req.body)
// })

// app.use('/auth', auth.auth);
// app.use('/auth', users.auth);
// app.use('/users', users.securedArea);

// app.get('/api/:name', function(req, res){
//   res.status(200).json({"hello": req.params.name });
// });

// Load Client at the end ALSO HANDLES NOT FOUND 404
client.load(app)

// *********************************************************
//    Convention based route loading
// *********************************************************
// routes.load(app, './controllers');

// Handle any routes that are unhandled and return 404
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     res.send('404').status(404);
//     //res.render('errors/404', err);
// });

module.exports = app

// app.listen(port, function (err) {
//     logger.info('Runnning server on port: '+port);
// });

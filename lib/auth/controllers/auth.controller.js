var express = require('express');
var User = require('../models/user');
var passport = require('passport');
const Promise = require('bluebird');
// const securityConfig = require('../config/security-config');





var router = express.Router();

// router.post('/register', (req, res) =>{
//   console.log(req.body);
//   req.login(req.body, function(){
//     res.redirect('/auth/profile');
//   });
// });

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    User.forge({username, password}).save()
        .then(user => {
          //Log user in automatically
          req.login(user.attributes);
          res.json(user.omit('password'));
        });
});

router.get('/register', (req, res) => {
  var template = __dirname + '/../views/register';
  res.render(template);
});



router.get('/profile',(req, res) => {
  res.json(req.user);
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/auth/profile',
                                   failureRedirect: '/auth/register' }));
  // , {
  //   failureRedirect: '/',
  //   successRedirect: 'auth/profile'
  // });
  // Promise.coroutine(function* () {
  //     const {username, password} = req.body;
  //     const user = yield User.where('username', username).fetch();
  //     const isValidPassword = yield user.validPassword(password);
  //     console.log(user.attributes);
  //     // if (isValidPassword) {
  //     //     const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
  //     //     res.json({success: true, token: `JWT ${token}`});
  //     // } else {
  //     //     res.json({success: false, msg: 'Authentication failed'});
  //     // }
  // })().catch(err => console.log(err));
// });

module.exports = router;

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
    var role = 'ROLE_USER';
    User.forge({username, password}).save()
        .then(user => {
          //Log user in automatically
          req.login(user.omit('password'), () => res.json(user));
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


module.exports = router;

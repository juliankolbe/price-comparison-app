'use strict';

const express = require('express');
const jwt = require('jwt-simple');
const Promise = require('bluebird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');

const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('../config/passport-jwt-config');

const router = express.Router();


router.use(passport.initialize());
configurePassport();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    Promise.coroutine(function* () {
        const user = yield User.where('username', username).fetch();
        const isValidPassword = yield user.validPassword(password);
        if (isValidPassword) {
            const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
            res.json({success: true, token: `JWT ${token}`});
        } else {
            res.json({success: false, msg: 'Authentication failed'});
        }
    })().catch(err => console.log(err));
});

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    User.forge({username, password}).save()
        .then(user => res.json(user.omit('password')));
});

module.exports = router;

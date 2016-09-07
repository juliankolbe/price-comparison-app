var express = require('express');
var auth = require('_/authEnc');
var router = express.Router();
var passport = require('passport');

var test = require('_/auth');

router.get('/', auth.middleware.authMiddleware(), auth.middleware.rolesAuthorize('ROLE_ADMIN'), (req, res) => {
  res.json(req.user);
});

module.exports = router;

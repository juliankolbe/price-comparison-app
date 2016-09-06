var express = require('express');
var auth = require('../authEnc');
var router = express.Router();
var passport = require('passport');

router.get('/', auth.middleware.authMiddleware(), auth.middleware.rolesAuthorize('ROLE_ADMIN'), (req, res) => {
  res.json(req.user);
});

module.exports = router;

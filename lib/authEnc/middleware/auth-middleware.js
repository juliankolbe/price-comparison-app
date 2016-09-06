module.exports = function() {
    return function (req, res, next) {
      if(!req.user) {
        res.redirect('/auth/register');
        return;
      }
      next();
    }
};

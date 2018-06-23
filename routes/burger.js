var express = require('express');
var router = express.Router();

/* GET burger page. */
router.get('/', function(req, res, next) {
  res.render('burger', {
    title: 'Burger Menu',
    message: 'This will be a burger menu in the future!'
  });
});

module.exports = router;
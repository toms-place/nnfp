var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('burger', { title: 'Burger Menu', message: res.__('BURGER_MSG') });
});

module.exports = router;
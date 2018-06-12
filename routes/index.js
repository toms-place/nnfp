var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Neural Net File Processor', message: res.__('WELCOME_MSG') });
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Neural Net File Processor',
    message: 'here you can upload a csv or txt file to get an output of a feed forward neural or recurrent neural net'
  });
});

module.exports = router;
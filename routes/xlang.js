var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    switch (req.params.lang) {
        case 'de': res.cookie('lang', 'de', { maxAge: 900000, httpOnly: true });
        break;
        case 'en': res.cookie('lang', 'en', { maxAge: 900000, httpOnly: true });
        break;
        default: res.cookie('lang', 'de', { maxAge: 900000, httpOnly: true });
    }
  });

module.exports = router;

var express = require('express');
var router = express.Router();
var brain = require('brain.js');
var run = require('../routes/nnfp').run;



/** Data Conversion
 * splitting the file in to Input & Output
 * forwarding it to brain.js
 * and running a test, based on the selection & input
 * 
 * TODO: filesystem save net!
 * 
 */

router.get('/', function (req, res, next) {
    var q = req.query.q.split(',');
    if (undefined)
        res.render('nnfp', { title: 'NNFP', message: res.__('TEST_MSG')});

    var qInput = [];

    for (var i = 0; i < q.length; i++) {
        qInput[i] = i;
    }
    

});

var express = require('express');
var router = express.Router();
var callLines = require('../src/callLines');
 
router.post('/', function(req, res) {
  if (Object.keys(req.files).length === 0 && req.files.constructor === Object) {
    return res.status(400).send('No files were uploaded.');
  } else {
    var uploadedFile = req.files.uploadedFile;

    uploadedFile.mv('public/data/testfile.csv', function(err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        callLines('public/data/testfile.csv', function(lineArr){
          if (lineArr) {

            var firstRowsOfFile = "";
            var count = 0;
            for (var i = 0; i < lineArr.length && i < 5; i++) {
                firstRowsOfFile += 'row ' + (i+1) + ": " + lineArr[i] + '<br />';
                count++;
            }

            res.render('nnfp', {
                title: 'Success',
                message: 'You uploaded a file!',
                fileHead: 'This are the first ' + count + ' rows of your file:',
                file: firstRowsOfFile
            });
          }
        });
      }
    });
  }
});

module.exports = router;
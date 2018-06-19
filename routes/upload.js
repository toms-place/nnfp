var express = require('express');
var router = express.Router();
var callLines = require('../src/callLines');
 
router.post('/', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  
  var uploadedFile = req.files.uploadedFile;

  uploadedFile.mv('./data/testfile.csv', function(err) {
    if (err)
      return res.status(500).send(err);
    });

  callLines('./data/testfile.csv', function(arr){
    console.log('Header: ' + arr[0]);

    if (arr) {
      res.render('nnfp', { title: 'Success', message: res.__('UPLOADED_MSG'), file: 'This is the first row of your File: ' + arr[0]});
    }
  });
});

module.exports = router;
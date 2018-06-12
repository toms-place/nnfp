var express = require('express');
var router = express.Router();
var checkFile = require('../src/checkFile');
 
router.post('/', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  
  var uploadedFile = req.files.uploadedFile;

  uploadedFile.mv('./data/testfile.csv', function(err) {
    if (err)
      return res.status(500).send(err);
    });

  checkFile('./data/testfile.csv', function(arr){
    if (arr) res.render('uploaded', { title: 'Success', message: res.__('UPLOADED_MSG'), file: arr[0]});
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var callLines = require('../src/callLines');
 
router.post('/', function(req, res) {
  if (Object.keys(req.files).length === 0 && req.files.constructor === Object) {
    return res.status(400).send('No files were uploaded.');
  } else {
    var uploadedFile = req.files.uploadedFile;

    try {
      uploadedFile.mv('./public/data/testfile.csv', function(err) {
        if (err)
          return res.status(500).send(err);
        console.log("saved!");
        callLines('./public/data/testfile.csv', function(lineArr){
          console.log('Header: ' + lineArr[0]);
          if (lineArr) {
            res.render('nnfp', {
              title: 'Success',
              message: res.__('UPLOADED_MSG'),
              file: 'This are the first five rows of your file: <br /><br />Row 1: ' + lineArr[0] + '<br />Row 2: ' + lineArr[1] + '<br />Row 3: ' + lineArr[2] + '<br />Row 4: ' + lineArr[3] + '<br />Row 5: ' + lineArr[4]
            });
          }
        });
      });
    } catch (error) {
      if (error) return res.status(400).send('No files were moved.');
    }
  }
});

module.exports = router;
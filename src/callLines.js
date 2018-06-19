const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

//reads a File line by line and returns an Array of lines
module.exports = function callLines(file, callback) {
    var arr = [];
    var count = 0;

    var instream = fs.createReadStream(file);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);

    rl.on('line', function(line) {
        if (count == 0) {
            arr.push(line);
        } else arr.push(line);
        count++;
    });

    rl.on('close', function() {
        // do something on finish here
        callback(arr);
    });
    
}
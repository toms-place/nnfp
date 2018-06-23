const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

/**
 * Reads a file line by line and calls back an array of lines.
 * 
 * @param {string} path path on server to call lines from
 * @returns {Array} callback of an array of lines from the file
 */
module.exports = function callLines(path, callback) {
    var arr = [];
    var count = 0;

    var instream = fs.createReadStream(path);
    var outstream = new stream();
    var rl = readline.createInterface(instream, outstream);

    rl.on('line', function(line) {
        if (count == 0) {
            arr.push(line);
        } else arr.push(line);
        count++;
    });

    rl.on('close', function() {
        callback(arr);
    });
    
};
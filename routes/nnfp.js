var express = require('express');
var router = express.Router();

var callLines = require('../src/callLines');
//var constructData = require('../src/constructData');
var feedforward = require('../src/feedforward');
var rnn = require('../src/rnn');



/** Data Conversion
 * splitting the file in to Input & Output
 * forwarding it to brain.js
 * and running a test, based on the selection & input
 * 
 * 
 */
router.get('/', function (req, res, next) {
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
        res.render('nnfp', { title: 'Tel me what to do!', message: 'help'});
    } else {
        try {
            var inputColumns = req.query.inputColumns.split(',');
            var outputColumns = req.query.outputColumns.split(',');
            var q = req.query.q.split(',');
            var qInput = [];

            for (var i = 0; i < q.length; i++) {
                qInput[i] = q[i];
            }

            callLines('./data/testfile.csv', function(lineArr) {
                let NeuralDataArray = constructData(lineArr, inputColumns, outputColumns);
                if (req.query.neuralnet == "ff") {
                    feedforward(NeuralDataArray, function (netFF) {
                        res.render('nnfp', { title: 'This is your prediction:', message: netFF.run(qInput) + '%'});
                    })
                }
                if (req.query.neuralnet == "rnn") {
                    rnn(NeuralDataArray, function (netRNN) {
                        res.render('nnfp', { title: 'This is your prediction:', message: netRNN.run(qInput)});
                    })
                }
            });

        } catch (error) {
            return res.status(400).send('No valid Form Data');
        }
        
    }
});

function constructData(lineArr, inputColumns, outputColumns) {
    var NeuralDataArray = [];
    var inputData = [];
    var outputData = [];

    for (var i = 0; i < lineArr.length; i++) {
        let tempIn = [];
        let tempOut = [];
        
        var column = lineArr[i].split(',');

        for (var x = 0; x < column.length; x++) {         
            for (var y = 0; y < inputColumns.length; y++) {
                if (x == parseInt(inputColumns[y])) {
                    tempIn.push(column[x]);
                }
            }
            for (var z = 0; z < outputColumns.length; z++) {
                if (x == parseInt(outputColumns[z])) {
                    tempOut.push(column[x]);
                }
            }
        }

        inputData.push(tempIn);
        outputData.push(tempOut);
    }

    for (var i = 0; i < (inputData.length); i++) {
        let obj = {input: inputData[i], output: outputData[i]};
        NeuralDataArray.push(obj);
    }
    
    console.log(NeuralDataArray);
    return NeuralDataArray;
}

module.exports = router;
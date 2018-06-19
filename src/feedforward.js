var brain = require('brain.js');

module.exports = function feedforward(NeuralDataArray, callback) {
   
    //create a simple recurrent neural network
    var net = new brain.NeuralNetwork();
    net.train(NeuralDataArray);

    callback(net);
}



/*
var express = require('express');
var router = express.Router();
var brain = require('brain.js');
var fs = require('fs');
var checkFile = require('../src/checkFile');

*/
/** Data Conversion
 * splitting the file in to Input & Output
 * forwarding it to brain.js
 * and running a test, based on the selection & input
 * 
 *
router.post('/', function (req, res, next) {
    if (!req.body)
        return res.status(400).send('No form data transmitted.');
    var inputNr = parseInt(req.body.input);
    var outputNr = parseInt(req.body.output);

    checkFile('./data/testfile.csv', function(lineArr) {
        var NeuralDataArray = [];
        var INPUT = [];
        var OUTPUT = [];
        var anz_Column = lineArr[0].split(',').length;
        if (anz_Column != (inputNr+outputNr)) {
            res.status(501).send("wrong input fields");
        } else {
            for (var i = 0; i < lineArr.length; i++) {
                let tempIn = [];
                let tempOut = [];
                
                var column = lineArr[i].split(',');
        
                for (var y = 0; y < column.length; y++) {
                    
                    if (y < inputNr) {
                        tempIn.push(parseInt(column[y]));
                    } else {
                        tempOut.push(parseInt(column[y]));
                    }
                }
                INPUT.push(tempIn);
                OUTPUT.push(tempOut);
            }
        
            for (var i = 0; i < (INPUT.length); i++) {
                let obj = {input: INPUT[i], output: OUTPUT[i]};
                NeuralDataArray.push(obj);
            }

            console.log(NeuralDataArray);
            
            if (req.body.neuralnet == "ff") {
                var net = new brain.NeuralNetwork();
                net.train(NeuralDataArray);

                var netOut = [];
                for (var i = 0; i < INPUT.length; i++) {
                    netOut.push("Run with Input " +i+ ": " +net.run(INPUT[i]))
                }
            }

            if (req.body.neuralnet == "rnn") {
                //provide optional config object, defaults shown.
                var config = {
                    inputSize: 20,
                    inputRange: 20,
                    hiddenSizes:[20,20],
                    outputSize: 20,
                    learningRate: 0.01,
                    decayRate: 0.999,
                }
                //create a simple recurrent neural network
                var net = new brain.recurrent.RNN(config);
                net.train(NeuralDataArray);

                var netOut = [];
                for (var i = 0; i < INPUT.length; i++) {
                    netOut.push("Run with Input " +INPUT[i]+ ": " +net.run(INPUT[i]))
                }
                res.render('nnfp', { title: 'Trained', message: res.__('TRAIN_MSG'), output: netOut});
            }
        }
    })
});

router.get('/', function (req, res, next) {
    res.render('nnfp', { title: 'NNFP', message: res.__('TEST_MSG')});
  });

module.exports = router;
*/
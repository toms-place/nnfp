var express = require('express');
var router = express.Router();

var callLines = require('../src/callLines');
var constructNeuralData = require('../src/constructNeuralData');
var feedforward = require('../src/neuralNets/feedforward');
var rnn = require('../src/neuralNets/rnn');
//var lstm = require('../src/neuralNets/lstm');
//var gru = require('../src/neuralNets/gru');
//var RNNTimeStep = require('../src/neuralNets/RNNTimeStep');
//var LSTMTimeStep = require('../src/neuralNets/LSTMTimeStep');
//var GRUTimeStep = require('../src/neuralNets/GRUTimeStep');

var likely = require('brain.js').likely;

router.get('/', function (req, res, next) {
    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
        callLines('./public/data/testfile.csv', function (lineArr) {

            var firstRowsOfFile = "";
            var count = 0;
            for (var i = 0; i < lineArr.length && i < 5; i++) {
                firstRowsOfFile += 'row ' + (i + 1) + ": " + lineArr[i] + '<br />';
                count++;
            }

            res.render('nnfp', {
                title: 'Data exploration',
                message: 'Here you can train your Neural Net and get to know something of your data.',
                fileHead: 'This are the first ' + count + ' rows of your file:',
                file: firstRowsOfFile
            });
        });
    } else {
        try {
            var inputColumns = req.query.inputColumns.split(',');
            var outputColumns;
            var NeuralDataArray = [];
            var q = req.query.q;
            var qInput = [];

            if (req.query.outputColumns[0] === undefined) {
                outputColumns = null;
            } else {
                outputColumns = req.query.outputColumns.split(',');
            }

            callLines('./public/data/testfile.csv', function (lineArr) {
                switch (req.query.neuralnet) {
                    case ('ff'):
                        NeuralDataArray = constructNeuralData.ff(lineArr, inputColumns, outputColumns);

                        q = q.split(',');

                        for (let i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        feedforward(NeuralDataArray, function (net) {
                            res.render('nnfp', {
                                title: 'This is your prediction:',
                                message: 'Likely: ' + likely(qInput, net) + ' | Estimation: ' + net.run(qInput)
                            });
                        });
                        break;

                    case ('rnn'):
                        NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        if (outputColumns == null) {
                            q = q.split(',');
                            for (let i = 0; i<q.length; i++) {
                                let val = q[i].toString();
                                qInput.push(val);
                            }
                        } else {
                            q = q.split(',');
                            if (q.length == 1) {
                                qInput = q[0];
                            } else {
                                var qTemp = '';
                                for (let i = 0; i<q.length; i++) {
                                    let val = q[i].toString();
                                    if (i == (q.length - 1)) {
                                        qTemp += val;
                                    } else {
                                        qTemp += (val + ', ');
                                    }
                                }
                                qInput.push(qTemp);
                            }
                        }

                        console.log(qInput);

                        try {

                            rnn(NeuralDataArray, function (net) {
                                renderNet(res, net, qInput);
                            });
                            
                        } catch (err) {
                            console.log(err);
                            return res.status(400).send('<h1>RNN failed!</h1>' + err);
                        }
                        break;

                    default:
                        return res.status(400).send('No Neural Net selected');
                }
            });
        } catch (error) {
            return res.status(400).send('<h1>Neural Network failed!</h1>' + error);
        }
    }
});

function renderNet(res, net, qInput) {
    res.render('nnfp', {
        title: 'This is your prediction:',
        message: net.run(qInput)
    });
}

module.exports = router;

/* Cases to implement in the future


                    case ('GRU'):
                        NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        q = q.split(',');

                        for (let i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        gru(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('LSTM'):
                        NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        q = q.split(',');

                        for (let i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        lstm(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('RNNTimeStep'):
                        NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        q = q.split(',');

                        for (let i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        RNNTimeStep(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('LSTMTimeStep'):
                        NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        q = q.split(',');

                        for (let i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        LSTMTimeStep(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('GRUTimeStep'):
                        NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        q = q.split(',');

                        for (let i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        GRUTimeStep(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

*/
var express = require('express');
var router = express.Router();

var callLines = require('../src/callLines');
var constructNeuralData = require('../src/constructNeuralData');
var feedforward = require('../src/neuralNets/feedforward');
var rnn = require('../src/neuralNets/rnn');
var lstm = require('../src/neuralNets/lstm');
var gru = require('../src/neuralNets/gru');
var RNNTimeStep = require('../src/neuralNets/RNNTimeStep');
var LSTMTimeStep = require('../src/neuralNets/LSTMTimeStep');
var GRUTimeStep = require('../src/neuralNets/GRUTimeStep');

var likely = require('brain.js').likely;

/**
 * 
 */
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
            if (req.query.outputColumns === undefined) {
                var outputColumns = null;
            } else {
                var outputColumns = req.query.outputColumns.split(',');
            }

            callLines('./public/data/testfile.csv', function (lineArr) {
                switch (req.query.neuralnet) {
                    case ('ff'):
                        var NeuralDataArray = constructNeuralData.ff(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
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
                        var NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        rnn(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('GRU'):
                        var NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        gru(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('LSTM'):
                        var NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        lstm(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('RNNTimeStep'):
                        var NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        RNNTimeStep(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('LSTMTimeStep'):
                        var NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        LSTMTimeStep(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    case ('GRUTimeStep'):
                        var NeuralDataArray = constructNeuralData.rnn(lineArr, inputColumns, outputColumns);

                        var q = req.query.q.split(',');
                        var qInput = [];

                        for (var i = 0; i < q.length; i++) {
                            qInput[i] = q[i];
                        }

                        GRUTimeStep(NeuralDataArray, function (net) {
                            renderNet(res, net, qInput);
                        });
                        break;

                    default:
                        return res.status(400).send('No Neural Net selected');
                }
            });
        } catch (error) {
            return res.status(400).send('No valid Form Data');
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
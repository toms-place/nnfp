var brain = require('brain.js');

module.exports = function gru(NeuralDataArray, callback) {
    //provide optional config object, defaults shown.
    var config = {
        inputSize: 20,
        inputRange: 20,
        hiddenSizes:[20,20],
        outputSize: 20,
        learningRate: 0.01,
        decayRate: 0.999
    };
    //create a simple recurrent neural network
    var net = new brain.recurrent.GRU(config);
    net.train(NeuralDataArray);
    
    callback(net);

};
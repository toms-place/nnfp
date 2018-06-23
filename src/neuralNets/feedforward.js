var brain = require('brain.js');

module.exports = function feedforward(NeuralDataArray, callback) {

    //create a simple recurrent neural network
    var net = new brain.NeuralNetwork();
    net.train(NeuralDataArray);

    callback(net);
}
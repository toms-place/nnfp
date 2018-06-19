module.exports = function constructData(lines, inputColumns, outputColumns, callback) {
    var NeuralDataArray = [];
    var inputData = [];
    var outputData = [];

    //console.log(inputColumns);
    //console.log(outputColumns);

    for (var i = 0; i < lines.length; i++) {
        let tempIn = [];
        let tempOut = [];
        
        var column = lines[i].split(',');

        for (var y = 0; y < column.length; y++) {
            
            if (y = inputColumns[y]) {
                tempIn.push(column[y]);
            }
            if (y = outputColumns[y]) {
                tempOut.push(column[y]);
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
    callback(NeuralDataArray);
}
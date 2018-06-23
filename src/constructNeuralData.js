module.exports = {
    rnn: function(lineArr, inputColumns, outputColumns) {
        let NeuralDataArray = [];
        let inputData = [];
        let outputData = [];

        if (outputColumns === null) {
            for (var i = 0; i < lineArr.length; i++) {
                let tempIn = [];                
                let column = lineArr[i].split(',');
        
                for (var x = 0; x < column.length; x++) {
                    for (var y = 0; y < inputColumns.length; y++) {
                        if (x == parseInt(inputColumns[y])) {
                            tempIn.push(parseFloat(column[x]));
                        }
                    }
                }
                inputData.push(tempIn);
            }
            console.log(inputData);
            return inputData;
        } else {

            for (var i = 0; i < lineArr.length; i++) {
                let tempIn = [];
                let tempOut = [];
                let column = lineArr[i].split(',');
        
                for (var x = 0; x < column.length; x++) {
                    for (var y = 0; y < inputColumns.length; y++) {
                        if (x == parseInt(inputColumns[y])) {
                            tempIn.push(parseFloat(column[x]));
                        }
                    }
                    for (var z = 0; z < outputColumns.length; z++) {
                        if (x == parseInt(outputColumns[z])) {
                            tempOut.push(parseFloat(column[x]));
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
    },

    ff: function(lineArr, inputColumns, outputColumns) {
        let NeuralDataArray = [];
        let inputData = [];
        let outputData = [];
    
        for (var i = 0; i < lineArr.length; i++) {
            let tempIn = [];
            let tempOut = [];
            
            let column = lineArr[i].split(',');
    
            for (var x = 0; x < column.length; x++) {
                for (var y = 0; y < inputColumns.length; y++) {
                    if (x == parseInt(inputColumns[y])) {
                        tempIn.push(parseFloat(column[x]));
                    }
                }
                for (var z = 0; z < outputColumns.length; z++) {
                    if (x == parseInt(outputColumns[z])) {
                        tempOut.push(parseFloat(column[x]));
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

};
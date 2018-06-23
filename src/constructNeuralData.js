module.exports = {
    rnn: function(lineArr, inputColumns, outputColumns) {
        var NeuralDataArray = [];
        var inputData = [];
        var outputData = [];

        if (outputColumns === null) {
            for (let i = 0; i < lineArr.length; i++) {
                let tempIn = [];                
                let column = lineArr[i].split(',');
        
                for (let x = 0; x < column.length; x++) {
                    for (let y = 0; y < inputColumns.length; y++) {
                        if (x == inputColumns[y]) {
                            tempIn.push(column[x]);
                        }
                    }
                }
                inputData.push(tempIn);
            }
            console.log(inputData);
            return inputData;
        } else {

            for (let i = 0; i < lineArr.length; i++) {
                let tempIn = [];
                let tempOut = [];
                let column = lineArr[i].split(',');
        
                for (let x = 0; x < column.length; x++) {
                    for (let y = 0; y < inputColumns.length; y++) {
                        if (x == parseInt(inputColumns[y])) {
                            if  (y !== 0) {
                                tempIn.push(' ' + column[x]);
                            } else {
                                tempIn.push(column[x]);
                            }
                        }
                    }
                    for (let z = 0; z < outputColumns.length; z++) {
                        if (x == parseInt(outputColumns[z])) {
                            if  (z !== 0) {
                                tempOut.push(' ' + column[x]);
                            } else {
                                tempOut.push(column[x]);
                            }
                        }
                    }
                }
                inputData.push(tempIn);
                outputData.push(tempOut);
            }

            for (let i = 0; i < (inputData.length); i++) {
                let obj = {input: inputData[i].toString(), output: outputData[i].toString()};
                NeuralDataArray.push(obj);
            }

            console.log(NeuralDataArray);
            return NeuralDataArray;
        } 
    },

    ff: function(lineArr, inputColumns, outputColumns) {
        var NeuralDataArray = [];
        var inputData = [];
        var outputData = [];
    
        for (let i = 0; i < lineArr.length; i++) {
            let tempIn = [];
            let tempOut = [];
            
            let column = lineArr[i].split(',');
    
            for (let x = 0; x < column.length; x++) {
                for (let y = 0; y < inputColumns.length; y++) {
                    if (x == parseInt(inputColumns[y])) {
                        tempIn.push(parseFloat(column[x]));
                    }
                }
                for (let z = 0; z < outputColumns.length; z++) {
                    if (x == parseInt(outputColumns[z])) {
                        tempOut.push(parseFloat(column[x]));
                    }
                }
            }
    
            inputData.push(tempIn);
            outputData.push(tempOut);
        }
    
        for (let i = 0; i < (inputData.length); i++) {
            let obj = {input: inputData[i], output: outputData[i]};
            NeuralDataArray.push(obj);
        }
        
        console.log(NeuralDataArray);
        return NeuralDataArray;
    }

};
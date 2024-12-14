const {rand, random, MultiplyMatrix, sigmoid, TransMatrix} = require('./lib');

const arr = [
    [1,2,3],
    [4,5,6]
]
console.log(TransMatrix(arr));
class NeuralNetwork {
    constructor(inputnodes, hiddennodes, outputnodes, learningrate){
        // Количество узлов во входном скрытом и выходном слое
        this.inodes = inputnodes;
        this.hnodes = hiddennodes;
        this.onodes = outputnodes;

        // Коэфициент обучения
        this.learningrate = learningrate;

        this.wih = rand(3, 3, () => random(-0.5, 0.5));
        this.who = rand(3, 3, () => random(-0.5, 0.5));
    }

    train(inputList, targetList) {
        const input = inputList.map((item) => ([item]));
        const target = targetList.map((item) => ([item]));

        const hiddenInputs = MultiplyMatrix(this.wih, input);
        const hiddenOutputs = hiddenInputs.map(([item]) => [sigmoid(item)]);
        
        const finalInputs = MultiplyMatrix(this.who, hiddenOutputs);
        const finalOutputs = finalInputs.map(([item]) => [sigmoid(item)]);

        const outputError = target.map(([item], index) => ([item - finalOutputs[index][0]]));
        
        const hiddenError = MultiplyMatrix(this.who, outputError);

        const finalOutputsMinusOne = finalOutputs.map(([item]) => ([1.0 - item]));
        
        const resultWho = MultiplyMatrix(outputError.map(([item], index) => {
            return [item * finalOutputs[index][0] * finalOutputsMinusOne[index][0]]
        }), TransMatrix(hiddenOutputs)).map((item) => {
            return [
                this.learningrate * item[0],
                this.learningrate * item[1],
                this.learningrate * item[2],
            ];
        })

        this.who = this.who.map((item, index) => {
            return ([
                item[0] + resultWho[index][0], 
                item[1] + resultWho[index][0], 
                item[2] + resultWho[index][0]
            ])
        })

        
        const hiddenOutputsMinusOne = hiddenOutputs.map(([item]) => ([1.0 - item]));
        
        const resultWih = MultiplyMatrix(hiddenError.map(([item], index) => {
            return [item * hiddenOutputs[index][0] * hiddenOutputsMinusOne[index][0]]
        }), TransMatrix(hiddenOutputs)).map((item) => {
            return [
                this.learningrate * item[0],
                this.learningrate * item[1],
                this.learningrate * item[2]
            ]
        })
        
        this.wih = this.wih.map((item, index) => {
            return ([
                item[0] + resultWih[index][0], 
                item[1] + resultWih[index][0], 
                item[2] + resultWih[index][0]
            ])
        })
        
    }

    query(inputList) {
        const input = inputList.map((item) => ([item]));

        const hiddenInputs = MultiplyMatrix(this.wih, input);
        const hiddenOutputs = hiddenInputs.map(([item]) => [sigmoid(item)]);
        
        const finalInputs = MultiplyMatrix(this.who, hiddenOutputs);
        const finalOutputs = finalInputs.map(([item]) => [sigmoid(item)]);

        return finalOutputs;
    }
}
module.exports = NeuralNetwork;
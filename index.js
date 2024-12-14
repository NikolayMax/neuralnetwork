const NeuralNetwork = require('./NeuralNetwork');

const inputnodes = 3; 
const hiddennodes = 3;
const outputnodes = 3;
const learningrate = 0.3;

const n = new NeuralNetwork(inputnodes, hiddennodes, outputnodes, learningrate);

for(let i = 0; i < 2; i++){
    n.train([0.1, 0.2, 0.3], [1,2,3]);
    n.train([0.4, 0.5, 0.6], [4,5,6])
}

console.log(n.query([1, 24, 15]))

const {MultiplyMatrix, sigmoid} = require('./lib');
const w11 = 0.9,
w12 = 0.2,
w13 = 0.1,
w21 = 0.3,
w22 = 0.8,
w23 = 0.5,
w31 = 0.4,
w32 = 0.2,
w33 = 0.6;

const input1 = 0.9, output1 = 28;
const input2 = 0.1, output2 = 12;
const input3 = 0.8, output3 = 4;

const matrixWeightInput = [
    [w11, w21, w31],
    [w12, w22, w32],
    [w13, w23, w33],
];
const matrixWeightHidden = [
    [0.3, 0.7, 0.5],
    [0.6, 0.5, 0.2],
    [0.8, 0.1, 0.9],
];
const matrixInput = [
    [input1],
    [input2],
    [input3]
]
const matrixOutputTrain = [
    [output1],
    [output2],
    [output3]
]

let matrixHidden = MultiplyMatrix(matrixWeightInput, matrixInput, (res) => +res.toFixed(2));

console.log('matrixHidden - output', matrixHidden);

matrixHidden = matrixHidden.map(([item]) => ([+sigmoid(item).toFixed(3)]))

console.log('matrixHidden - sigmoid', matrixHidden);

let matrixOutput = MultiplyMatrix(matrixWeightHidden, matrixHidden, (res) => +res.toFixed(3));

console.log('matrixOutput - output', matrixOutput);

matrixOutput = matrixOutput.map(([item]) => ([+sigmoid(item).toFixed(3)]))

console.log('matrixOutput - sigmoid', matrixOutput);

const matrixOutputError = matrixOutput.map(([item], index) => (matrixOutputTrain[index][0] - item))

console.log('matrixOutputError - error', matrixOutputError);
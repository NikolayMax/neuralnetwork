import fs from "fs";
import path from "path";
import { Network } from "./neural";

// const network = new Network({
//     input: 2,
//     hidden: 10,
//     output: 1
// });
// for(let i = 0; i < 10000; i++) {
//     network.train([0,0], [0]);
//     network.train([1,0], [1]);
//     network.train([1,1], [0]);
//     network.train([0,1], [1]);    
// }
// console.log(network.query([0,0]));
// console.log(network.query([1,0]));
// console.log(network.query([1,1]));
// console.log(network.query([0,1]));
const startTime = performance.now()
const network = new Network({
    input: 784,
    hidden: 200,
    output: 10
});
var dataFileBuffer  = fs.readFileSync( path.resolve(__dirname + '/../../src/mnist-master/train-images.idx3-ubyte'));
var labelFileBuffer = fs.readFileSync(path.resolve(__dirname + '/../../src/mnist-master/train-labels.idx1-ubyte'));
var pixelValues     = [];

// It would be nice with a checker instead of a hard coded 60000 limit here
for (var image = 0; image <= 2000; image++) { 
    var pixels = [];

    for (var x = 0; x <= 27; x++) {
        for (var y = 0; y <= 27; y++) {
            pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 15]);
        }
    }

    var imageData  = {};
    const label = labelFileBuffer[image + 8];

    imageData[JSON.stringify(label)] = pixels;

    pixelValues.push(imageData);
    // const targets = Array.from({length: 10}, (i, idx) => label === idx ? 0.99 : 0);
    // network.train(pixels, targets);
}
const weight = fs.readFileSync('./weight.json')
network.weight = JSON.parse(weight);
console.log(pixelValues.length, labelFileBuffer.length, dataFileBuffer.length, network.query(pixelValues[3]['1']))
// fs.writeFileSync('./weight.json', JSON.stringify(network.weight));
const endTime = performance.now();
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
console.log(`Call to doSomething took ${millisToMinutesAndSeconds(endTime - startTime)} milliseconds`)

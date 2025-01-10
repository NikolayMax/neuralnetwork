import { getRandom } from "./lib";

type INeuralProps = {input: number, hidden: number, output: number}
export class Network {
    props: INeuralProps;
    minRandom: number = -0.5;
    maxRandom: number = 0.5;

    input: number[] = [];
    hidden: number[] = [];
    output: number[] = [];

    weight: {[key in string]: number} = {}

    learningRate: number = 0.3;

    hiddenActivate: number[] = [];
    outputActivate: number[] = [];

    hiddenErrors: number[] = [];
    outputErrors: number[] = [];

    constructor(props: INeuralProps){
        
        this.props = props;

        this.InputJoinHidden();
        this.HiddenJoinOutput();
    }

    InputJoinHidden() {
        const {input, hidden} = this.props;
        
        for(let i = 0; i < input; i++) {
            for(let h = 0; h < hidden; h++) {
                this.weight[`i[${i}]h[${h}]`] = getRandom(this.minRandom, this.maxRandom)
            }   
        }
    }

    HiddenJoinOutput() {
        const {hidden, output} = this.props;
        
        for(let h = 0; h < hidden; h++) {
            for(let o = 0; o < output; o++) {
                this.weight[`h[${h}]o[${o}]`] = getRandom(this.minRandom, this.maxRandom)
            }   
        }
    }

    activate(x: number): number {
        return this.activationSigmoid(x)
    }

    derivative(x: number): number {
        return this.derivativeSigmoid(x);
    }

    activationSigmoid(x: number): number {
        return 1 / (1 + Math.exp(-x));
    }

    derivativeSigmoid(x: number): number {
        const fx = this.activationSigmoid(x);
        return fx * (1 - fx);
    };

    query(input: number[]) {
        let hiddenInput:  number[] = [];
        let hiddenOutput: number[] = [];
        let outputInput:  number[] = [];
        let outputOutput: number[] = [];

        for(let h = 0; h < this.props.hidden; h++) {
            let count = 0;
            for(let i = 0; i < input.length; i++) {
                count += input[i] * this.weight[`i[${i}]h[${h}]`];
            }
            hiddenInput[h] = count;
        }
        hiddenOutput = hiddenInput.map((i) => this.activate(i));

        for(let h = 0; h < this.props.output; h++) {
            let count = 0;
            for(let i = 0; i < hiddenOutput.length; i++) {
                count += hiddenOutput[i] * this.weight[`h[${i}]o[${h}]`];
            }
            outputInput[h] = count;
        }
        outputOutput = outputInput.map((i) => this.activate(i));

        return outputOutput;
    }
    
    train(input: number[], target: number[]) {
        let hiddenInput:  number[] = [];
        let hiddenOutput: number[] = [];
        let outputInput:  number[] = [];
        let outputOutput: number[] = [];

        for(let h = 0; h < this.props.hidden; h++) {
            let count = 0;
            for(let i = 0; i < input.length; i++) {
                count += input[i] * this.weight[`i[${i}]h[${h}]`];
            }
            hiddenInput[h] = count;
        }
        hiddenOutput = hiddenInput.map((i) => this.activate(i));

        for(let h = 0; h < this.props.output; h++) {
            let count = 0;
            for(let i = 0; i < hiddenOutput.length; i++) {
                count += hiddenOutput[i] * this.weight[`h[${i}]o[${h}]`];
            }
            outputInput[h] = count;
        }
        outputOutput = outputInput.map((i) => this.activate(i));
    
        
        //Обучение начинается:
        // мы расчитываем разницу
        let outputErrors: number[] = target.map((num, index) => (num - outputOutput[index]) * this.derivative(outputInput[index]));
        let hiddenErrors:number[] = [];
        
        for(let h = 0; h < this.props.hidden; h++) {
            let error = 0;
            for(let o = 0; o < outputErrors.length; o++){
                error += outputErrors[o] * this.weight[`h[${h}]o[${o}]`];
            }
            hiddenErrors[h] = error * this.derivative(hiddenInput[h]);
        }

        for(let h = 0; h < this.props.hidden; h++) {
            for(let o = 0; o < this.props.output; o++) {
                this.weight[`h[${h}]o[${o}]`] += this.learningRate * outputErrors[o] * hiddenOutput[h];
            }
        }

        for(let i = 0; i < this.props.input; i++) {
            for(let h = 0; h < this.props.hidden; h++) {
                this.weight[`i[${i}]h[${h}]`] += this.learningRate * hiddenErrors[h] * input[i];
            }
        }
    }   
}

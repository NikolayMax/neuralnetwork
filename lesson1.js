let A = 0.25;
const one = {id: 0, name: '', x: 3.0, y: 1.0 };
const linear = (x) => A * x;

const output = linear(one.x); // y - 0.25 а дожно быть 3.0 ошибка на 2.75
const error = one.y - output; // 2.75
const delta = error / one.x; // delta = 0.08333333333333333 это число которое не хватает A добавим его
A += delta;
const output2 = linear(one.x);
console.log(error, delta, output, output2); 
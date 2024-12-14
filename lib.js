function MultiplyMatrix(A,B, func)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[ i ] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[ i ][j]*B[j][k];
          C[ i ][k] = typeof func === 'function' ? func(t) : t;
        }
     }
    return C;
}

function TransMatrix(A)       //На входе двумерный массив
{
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[ i ] = [];
       for (var j = 0; j < m; j++) AT[ i ][j] = A[j][ i ];
     }
    return AT;
}


const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

const rand = (rows, columns, value) => {
    return Array.from({ length: columns }, (item, colIdx) => {
        return Array.from({ length: rows }, (item, rowIdx) => {
            return typeof value === 'function' ? value(rowIdx, colIdx) : value;
        });
    });
}

const sigmoid = (x) => 1 / (1 + Math.exp(-x));

module.exports = {
    random,
    rand,
    sigmoid,
    MultiplyMatrix,
    TransMatrix
}
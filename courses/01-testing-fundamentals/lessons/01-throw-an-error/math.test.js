const { sum, subtract } = require('../../math')

let actual
let expected

// test sum
actual = sum(6, 4)
expected = 10

if(actual !== expected) {
    throw new Error(`${expected} does not equal ${actual}`)
}

// subtract test
actual = subtract(6, 4)
expected = 2

if(actual !== expected) {
    throw new Error(`${expected} does not equal ${actual}`)
}

console.log('All tests pass')

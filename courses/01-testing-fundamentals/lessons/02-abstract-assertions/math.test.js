const { sum, subtract } = require('../../math')

const expect = expected => ({
      toBe(actual) {
        if(expected !== actual) {
            throw new Error(`${expected} does no equal ${actual}`)
        }
    }
}) 

let actual
let expected

// sum test
actual = sum(6, 4)
expected = 10

expect(actual).toBe(expected)

// subtraction test

actual = subtract(6,4)
expected = 2

expect(actual).toBe(expected)

console.log('All tests pass')

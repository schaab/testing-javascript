const { sum, subtract } = require('../../math')

const expect = expected => ({
    toBe(actual) {
      if(expected !== actual) {
          throw new Error(`${expected} does no equal ${actual}`)
      }
  }
}) 

const test = (title, cb) => {
    try {
        cb()
        console.log(`✅ ${title}`)
    } catch (error) {
        console.log(`💔 ${title}`)
        console.log(error)
    }
}

test('sum adds two numbers', () => {
    const expected = 10
    const actual = sum(6, 4)

    expect(actual).toBe(expected)
})

test('subtract minuses two numbers', () => {
    const expected = 2
    const actual = subtract(6, 4)

    expect(actual).toBe(expected)
})

const { sumAsync, subtractAsync } = require('../../math')

const expect = expected => ({
    toBe(actual) {
      if(expected !== actual) {
          throw new Error(`${expected} does no equal ${actual}`)
      }
  }
}) 

const test = async (title, cb) => {
    try {
        await cb()
        console.log(`✅ ${title}`)
    } catch (error) {
        console.log(`💔 ${title}`)
        console.log(error)
    }
}

test('sum adds two numbers', async () => {
    const expected = 10
    const actual = await sumAsync(6, 4)

    expect(actual).toBe(expected)
})

test('subtract minuses two numbers', async () => {
    const expected = 2
    const actual = await subtractAsync(6, 4)

    expect(actual).toBe(expected)
})

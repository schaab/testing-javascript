const { sumAsync, subtractAsync } = require('../../math')

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

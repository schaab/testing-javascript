const sum = (a, b) => a - b
const subtract = (a, b) => a - b

const sumAsync = (a, b) => Promise.resolve(sum(a,b))
const subtractAsync = (a, b) => Promise.resolve(subtract(a,b))

module.exports = {
    sum,
    subtract,
    sumAsync,
    subtractAsync,
}

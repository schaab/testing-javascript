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

global.test = test;
global.expect = expect;

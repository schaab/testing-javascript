# Lesson Notes

## General Notes

- A good follow up to these lessons is to watch this [talk](https://www.youtube.com/watch?v=Af4M8GMoxi4) from assertjs 2018

## 01 Override Object Properties to Mock with Monkey Patching

- Tests need to be deterministic and mocking allows us to ensure a unit of code is
- The most naive approach is to override an object's property in the test
- Cleaning up imperative. Without it other tests could be affected

## 02 Ensure Functions are Called Correctly with JavaScript Mocks

- Jest has a built-in [`jest-fn`](https://jestjs.io/docs/en/jest-object#jestfnimplementation) which returns a new [mock function](https://jestjs.io/docs/en/mock-function-api)
  - Optionally takes a mock implementation
- Mock functions keep track of the parameters that it has been called with
  - This allows you to assert that the function is called with the correct parameters
- mock functions have a property [`calls`](https://jestjs.io/docs/en/mock-function-api#mockfnmockcalls) that keeps track of all calls that have been made to the mock function.
  - Each item in the array is an array of the parameters that were passed during that call
  - Requires we keep track of the original implementation so that we can restore it on cleanup
- A naive implementation may look like:
  
```javascript
function fn(impl) {
    const mockfn = (...args) => {
        mockfn.calls.push(args);
        return impl(args);
    }
    mockfn.calls = [];
    return mockfn;
}
```

## 03 Restore the Original Implementation of a Mocked JavaScript Function with `jest.spyOn`

- Can remove the need to track the original implementation by using `jest.spyOn`

```javascript
const somemodule = require('./somemodule)

test('test a thing', () => {
    jest.spyOn(somemodule, 'functionName')
    somemodule.functionName.mockImplementation((a, b) => a + b)

    // assertions go here

    somemodule.functionName.mockRestore()
})
```

- A naive implementation may look like:

```javascript
// this is enhanced from above
function fn(impl = () => {}) {
    const mockfn = (...args) => {
        mockfn.calls.push(args);
        return impl(args);
    }
    mockfn.calls = [];
    mockfn.mockImplementation = newImpl => (impl = newImpl)
    return mockfn;
}

function spyOn(module, prop) {
    const originalImpl = module[prop]
    module[prop] = fn()
    module[prop].mockRestore = () => (module[prop] = originalImpl)
}
```

## 04 Mock a JavaScript Module in a Test

- `spyOn` is still a form of monkey patching. It works because `thumb-war` is using `utils.getWinner`, but that only works because we are using commom JS
- Monkey patching doesn't work with es modules
- We need to mock the entire module and this is accomplished with the `jest.mock()` [API](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
- `jest.mock` mocks a module with an auto-mocked verison when it is being required
- Clean-up is done with `mockedfunction.mockReset()`
  - resets to initial state and cleans out the `calls`
- `jest.mock` works because Jest has control of the whole module system

## 05 Make a Shared JavaScript Mock Module

- Often, with modules that you want to mock in one file, you'll probably want to mock it in multiple files
- You can create a shared mock by placing the mock in a `__mocks__` directory

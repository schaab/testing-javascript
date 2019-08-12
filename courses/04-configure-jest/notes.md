# Configure Jest for Testing JavaScript Applications

## 01 Install and Run Jest

- `jest` is setup to run out of the box with minimal configuration

## 02 Transpile Modules with Babel in Jest Tests

- `jest` picks up a local `.babelrc.js` automagically and runs all source and test code through it

## 03 Configure Jest's Test Environment for Testing Node or Browser Code

- `jest` uses `jsdom` to simulate a browser environment
- You can pass `--env=node` to specify a non-browser environment
- You can leverage `jest.config.js` file so that you don't need to set it at the command line

```javascript
modules.export = {
    testEnvironment: 'jest-environment-jsdom' || 'jest-environment-node' // jsdom is default
}
```

## 04 Support Importing CSS files with Jest's `moduleNameMapper`

- In most real world applications using Webpack, you are likely utilizing loaders
- To allow css (or any other static assest) to be imported into our React components we need to configure Webpack to preprocess files
- When we attempt to run our tests, Jest attempts to run the imports in Node. It is going try and treat those static assests as a Node Module, which will not work
- To work around this we can add a `moduleNameMapper` object to our `jest.config.js`
  - The keys is a string regex that matches the file we want to map to
  - The value is the path to the mock
  - Order matters, go specific => general

## 05 Support Using Webpack CSS Modules with Jest

- using `moduleNameMapper` to import CSS is great, but given the way it is [implemented]("./test/style-mock.js") we never see the class name attached to the outputed HTML
- It would be beneficial to have something give us the indication that the class name is there
  - While running the app, the value is going to be a generated hash value because we're using CSS modules
  - Would be useful for snapshots
- Leverage `identity-obj-proxy`
  - Add another `moduleNameMapper` targeting CSS modules `'\\.module\\.css$': 'identity-obj-proxy`

## 06 Generate a Serializable Value with Jest Snapshots

- Snapshot testing is a way to simplify writing and maintaining assertions
- Snapshot artifacts should be committed and reviewed as part of any PR

## 07 Test an Emotion Styled UI with Custom Jest Snapshot Serializers

- Part of the power of snapshots is the ability to provide custom serializers
- When using a CSS-in-JS solution the CSS is passed to the component and, through transpilation, a hashed `className` gets applied to the component
  - The issue is that anytime the underlying CSS changes, the hash changes
  - Results in tests that do not explicitly answer "What is the expected output"
- We can leverage `jest-emotion` to output the actual CSS vs a hashed classname
  
```javascript
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion

expect.addSnapshotSerializer(createSerializer(emotion))
```

- Many packages export the serializers which you can add to the `jest.config.js` under the `snapshotSerializers` prop.

## 08 Handle Dynamic Imports Using Babel With Jest

- `babel-plugin-dynamic-node`
- Handled by webpack so we need to conditionally set up in the `.babelrc`

## 09 Setup an `afterEach` Test Hook for all Tests with Jest `setupTestFrameworkScriptFile`

- Jest provides the ability to add set up files to DRY up configuration that may be used in many test files
- There are two _lifecycle_ configuration values
- Before Jest is loaded `setupFiles`
  - an array of files to be run
- After Jest is loaded `setupTestFrameworkScriptFile`
  - path to a file to execute after the Jest framework has been loaded

## 10 Support Custom Module Resolution with Jest `moduleDirectories`

- Webpack's `resolve.modules` configuration is a great way to make common application utilities easily accessible throughout your application
  - This means add folder locations other than `node_modules` to look for modules
- The tests don't use the webpack config
- Leverage the `moduleDirectories` property in `jest.config.js`

## 11 Support a test utilities file with Jest `moduleDirectories`

- Anytime we're rendering a component that needs access to a provider, we have to render that component inside that provider, when we're rendering it for a test
- Create a test util that renders a component wrapped in all the providers we care about
- Leverage `moduleDirectories` in `jest.config.js` to make the util importable like a module
- `eslint-plugin-import` checks imports
  - add a new resolver to understand the `moduleDirectories` that have been set up
  - `eslint-import-resolver-jest`

```javascript
module.exports = {
  extends: [
    'kentcdodds',
    'kentcdodds/import',
    'kentcdodds/webpack',
    'kentcdodds/jest',
    'kentcdodds/react',
  ],
  overrides: [
    {
      files: ['**/__tests__/**'], // if we are in the test dir
      settings: {
        'import/resolver': { // use the below settings instead of the ones above
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ],
}
```

## 12 Step Through Code in Jest using the Node.js Debugger and Chrome DevTools

Add `debugger` statement to where you want to test

```json
"scripts": {
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand"
}
```

Or in vscode

```json
// in .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest All",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--config",
        "jest.config.js"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    }
  ]
}
```

## 13 Configure Jest to Report Code Coverage or Project Files

- Jest comes with code coverage reporting built-into the framework
- `"test" : "jest --coverage"`
- make sure to `.gitignore` the coverage folder
- Set `collectCoverageFrom` to point at directories to collect coverage details from

## 14 Analyze Jest Coverage Reports

## 15 Set a Code Coverage Threshold in Jest to Maintain Code Coverage Levels

- Specific coverage thresholds in `jest.config.js` in the `coverageThreshold`
  - can set global values
  - can set file specific values, use a glob as a key

## 16 Report Jest Test Coverage to Codecov through TravisCI

## 17 Use Jest Watch Mode to Speed up Development

- `--watch` flag
- Jest is `git` intelligent
- `"test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch"`

## 18 Run Jest Watch Mode by Default locally with `is-ci-cli`

```json
{
    "scripts": {
        "test": "is-ci \"test:coverage\" \"test:watch\",
        "test:coverage": "jest --coverage",
        "test:watch": "jest --watch",
    }
}
```

## 19 Filter Which Tests are Run with Typeahead Support in Jest Watch Mode

- Jest's watch mode is pluggable
- `jest-watch-typeahead` enchances the watch mode experience to help you know which tests will be run based on your filter
- Leverage the `watchPlugins` property in `jest.config.js`
  - takes an array of modules to use as watch plugins

## 20 Run Tests With a Different Configuration Using Jest's --config flag and `testMatch` option

## 21 Support Running Multiple Configurations with Jest's Project Features

- Jest supports running multiple configurations at once with `--projects`
- Or in `jest.config.js` under `projects` property

## 22 Test Specific Projects in Jest Watch Mode with `jest-watch-select-projects`

## 23 Run ESLint with Jest using `jest-runner-eslint`

- Jest is more than a testing framework
- Highly optimized platform for running tasks across many files
- Can specify a custom runner
- Can leverage watch mode

## 24 Run Only Relevant Jest Tests on git commit to avoid breakages

- `--findRelatedTests`
- `lint-staged` and `husky` will allow us to run scripts on staged files before commit

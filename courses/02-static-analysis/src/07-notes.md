# Lesson 7 Notes

He leverages the `precommit` script in the `scripts` section of `package.json` this generates a warning as it will be deprecated soon. Seems like a `husky.config.js` is the way to go.

There is an upgrade utility, `husky-upgrade` which will move the `precommit` script to a husky specific section in the `package.json`.

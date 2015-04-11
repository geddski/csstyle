# Contributing

Please create an issue before contributing and reference the issue in your PR's commit message. Also, make sure that any new/changed functionality is tested and all the tests pass.

## Running the Unit Tests

Required: node and ruby

`$ gem install sass`

`$ npm install -g jasmine-node`

`$ npm test`

## Version Bumping
Please don't bump the version in your commits. Just add a note to the PR if you'd like a major/minor/patch bump and I'll use [grunt-release](https://github.com/geddski/grunt-release) to quickly cut a new release.
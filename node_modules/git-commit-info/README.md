# git-commit-info

Get all information about a specific commit.

[![Build Status](https://travis-ci.com/JPeer264/node-git-commit-info.svg?branch=master)](https://travis-ci.com/JPeer264/node-git-commit-info)
[![Build status](https://ci.appveyor.com/api/projects/status/itogtq2ri9e2i24y/branch/master?svg=true)](https://ci.appveyor.com/project/JPeer264/node-git-commit-info/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/JPeer264/node-git-commit-info/badge.svg?branch=master)](https://coveralls.io/github/JPeer264/node-git-commit-info?branch=master)

## Installation

```sh
$ npm i git-commit-info --save
```
or
```sh
$ yarn add git-commit-info
```

## Usage

**Available parameters:**
- `cwd`: Specify the path. Default: `process.cwd()`
- `commit`: The hash of the commit. Default: latest

```js
const gitCommitInfo = require('git-commit-info');

// information of process.cwd() and the latest commit
gitCommitInfo();

// information of the latest commit in ./my_repo
gitCommitInfo({
  cwd: './my_repo',
});

// information of the specified commit in process.cwd()
gitCommitInfo({
  commit: '82442c2405804d7aa44e7bedbc0b93bb17707626', // any hash
});

// information of the specified commit in ./my_repo
gitCommitInfo({
  cwd: './my_repo',
  commit: '82442c2405804d7aa44e7bedbc0b93bb17707626', // any hash
});
```

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)

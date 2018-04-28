# MaterialR LinearProgress

**@materialr/linear-progress**

[![Build Status](https://travis-ci.org/materialr/linear-progress.svg?branch=master)](https://travis-ci.org/materialr/linear-progress)
[![Coverage Status](https://coveralls.io/repos/github/materialr/linear-progress/badge.svg?branch=master)](https://coveralls.io/github/materialr/linear-progress?branch=master)
[![NSP Status](https://nodesecurity.io/orgs/materialr/projects/f36d8424-6770-4725-8ff0-b9b45f30d3ec/badge)](https://nodesecurity.io/orgs/materialr/projects/f36d8424-6770-4725-8ff0-b9b45f30d3ec)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Material linear-progress implementation for React

## Installation

```sh
$ npm install --save @materialr/linear-progress
```

## Demo

A full demo is available on the
[MaterialR website](https://materialr.github.io/components/linear-progress) showcasing all variants.

## Components

### Default export

```js
import LinearProgress from '@materialr/linear-progress';
```

**Props**

| Prop            | Type            | Required | Default   | Description                                          |
| --------------- | --------------- | -------- | --------- | ---------------------------------------------------- |
| `buffer`        | number (0-1)    | No       | 0         | The total buffer amount                              |
| `className`     | string          | No       | undefined | Additional classNames to add                         |
| `indeterminate` | bool            | No       | false     | Whether the progress bar is indeterminate            |
| `progress`      | number (0-1)    | No       | 0         | The total progress amount                            |
| `reversed`      | bool            | No       | false     | Whether the progress bar is reversed                 |

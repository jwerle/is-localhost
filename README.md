is-localhost
============

Determine if a host is a localhost

## install

```sh
$ npm install is-localhost
```

## usage

```js
var isLocal = require('is-localhost')

isLocal('127.0.0.1'); // true
isLocal('12.34.56.78'); // false
isLocal('::1'); // true
```

## license

MIT

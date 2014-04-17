
/**
 * Module dependencies
 */

var isLocal = require('./')
  , assert = require('assert')

var host = null;
var i = 0;

assert(!isLocal(0));
assert(!isLocal('host'));
assert(isLocal('::1'));
assert(isLocal('localhost'));

for (i = 0; i <= 255; ++i) {
  host = '127.'+ i +'.0.1';
  assert(isLocal(host));
}

for (i = 0; i <= 255; ++i) {
  host = '127.0.'+ i +'.1';
  assert(isLocal(host));
}

for (i = 1; i < 255; ++i) {
  host = '127.0.0.'+ i;
  assert(isLocal(host));
}


var net = require('net');
var fs = require('fs');

/**
 * Determine if host is a localhost
 *
 * @api private
 * @param {String} host
 * @return {Boolean}
 */

module.exports = function isLocal (host) {
  var parts = null;
  var part = null;
  if (!host) { return false; }
  if (!net.isIP(host)) {
    var locals = extractLocalFromHosts();
    var i = 0;
    for (; i < locals.length; i++) {
      if (locals[i] === host) return true;
    }
    return false;
  }
  
  // assert(net.isIP(host) > 0, true);
  switch (host) {
    case '::1':
      return true;

    // 127.0.0.1 - 127.255.255.254
    default:
      parts = host.split('.');
      if (4 != parts.length) { return false; }
      parts = parts.map(Number);
      if (127 != parts.shift()) { return false; }
      if ((part = parts.shift()) > 255 || part < 0) { return false; }
      if ((part = parts.shift()) > 255 || part < 0) { return false; }
      if ((part = parts.shift()) > 254 || part < 1) { return false; }
      return true;
  }
  return false;
};


function extractLocalFromHosts() {
  var results = [];
  var configs = fs.readFileSync('/etc/hosts') + '';
  configs.split('\n').filter(function(line) {
    line = line.trim();
    if (/^(127\.0\.0\.1|::1)/.test(line)) {
      return true;
    } else {
      return false;
    }
  }).forEach(function(line) {
    var selected = line.split(/[\s\t]+/)
      .slice(1)
      .filter(function(item) { return !!item; });
    results = results.concat(selected);
  });
  return results;
}

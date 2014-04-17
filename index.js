
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
  switch (host) {
    case '::1':
      case 'localhost': return true;

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

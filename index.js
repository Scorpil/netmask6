const { NetmaskV4, NetmaskV6 } = require('./lib/netmask');
const { IPv4, IPv6 } = require('./lib/ip');

module.exports = {
  Netmask: {
    v4: NetmaskV4,
    v6: NetmaskV6,
  },
  IP: {
    v4: IPv4,
    v6: IPv6,
  },
};

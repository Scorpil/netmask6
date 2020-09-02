const { strict } = require('assert');
const { Netmask } = require('..');

const assert = strict;

describe('Netmask', function () {
  [
    {
      type: 'v4',
      str: '10.0.0.0/24',
      size: 256n,
      firstIP: '10.0.0.0',
      lastIP: '10.0.0.255',
    },
    {
      type: 'v6',
      str: '2001:cdba:0000:0000:0000:0000:3257:9652/54',
      size: 18889465931478580854784n,
      firstIP: '2001:cdba:0:0:0:0:0:0',
      lastIP: '2001:cdba:0:3ff:ffff:ffff:ffff:ffff',
    }
  ].forEach(test => {
    it(`Parse netmask: ${test.str}`,
       function () {
	 const nm = Netmask[test.type].parse(test.str);
	 assert(nm.size == test.size);
	 assert.equal(nm.firstIP.toString(), test.firstIP);
	 assert.equal(nm.lastIP.toString(), test.lastIP);
	 }
      );
  });
});

const { strict } = require('assert');
const { IP } = require('..');

const assert = strict;

describe('IP', function () {
  [
    {
      type: 'v4',
      str: '10.0.0.0',
      groups: [10, 0, 0, 0],
    },
    {
      type: 'v6',
      str: '2001:cdba:0000:0000:0000:0000:3257:9652',
      groups: [0x2001, 0xcdba, 0x0, 0x0, 0x0, 0x0, 0x3257, 0x9652],
    }
  ].forEach(test => {
    it(`Parse IP: ${test.str}`,
       function () {
	 assert.deepEqual(IP[test.type].parse(test.str).groups, test.groups);
	 }
      );
  });
});

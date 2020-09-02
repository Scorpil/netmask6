const { strict } = require('assert');
const { groupsToBigInt, bigIntToGroups, zPadGroups } = require('../src/utils');

const assert = strict;

describe('utils', function () {
  describe('groupsToBigInt <=> bigIntToGroups', function () {
    [
      {
      	groups: [0,0,0,0],
      	groupSize: 8,
      	bigInt: 0n,
      },
      {
      	groups: [0,0,0,17],
      	groupSize: 8,
      	bigInt: 17n,
      },
      {
	groups: [255,255,255,255],
	groupSize: 8,
	bigInt: 2n**32n - 1n,
      },
    ].forEach(test => {
      it(`groupsToBigInt(${test.groups}, ${test.groupSize}) => ${test.bigInt}`,
	 function () {
	   assert(groupsToBigInt(test.groups, test.groupSize) === test.bigInt);
	 }
	);

      it(`bigIntToGroups(${test.bigInt}, ${test.groupSize}) => ${test.groups}`, function() {
	const resultGroups = bigIntToGroups(test.bigInt, test.groupSize);
	assert.deepEqual(zPadGroups(resultGroups, test.groups.length), test.groups);
      });
    });
  });
});

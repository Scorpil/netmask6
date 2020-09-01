export function groupsToBigInt(_groups, _groupSize) {
  const groups = _groups.map(BigInt);
  const groupSize = BigInt(_groupSize);

  let bigInt = BigInt(0);
  groups.forEach(group => {
    if (bigInt > 0) {
      bigInt <<= groupSize;
    }
    bigInt += group;
  });
  return bigInt;
}

export function bigIntToGroups(_bigInt, _groupSize) {
  const groupSize = BigInt(_groupSize);
  const mask = 2n ** groupSize - 1n;

  let bigInt = BigInt(_bigInt);
  let groups = [];
  while (bigInt > 0) {
    groups.push(Number(bigInt & mask));
    bigInt >>= groupSize;
  }
  return groups.reverse();
}

export function zPadGroups(groups, length) {
  while (groups.length < length) {
    groups.unshift(0);
  }
  return groups;
}

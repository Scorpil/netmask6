import { groupsToBigInt } from './utils';

class IPBase {
  constructor(groups) {
    this.groups = groups;
  }

  static get groupSize() {
    return this.addressSize / this.groupCount;
  }

  static parse(ipStr) {
    const groupsStr = ipStr.split(this.groupDivider);
    if (groupsStr.length != this.groupCount) {
      throw new Error(`Incorrect ${this.name} format: expected ${this.groupCount} groups, found ${groupsStr.length} instead`);
    }

    const groups = groupsStr.map(groupStr => {
      const groupDec = parseInt(groupStr, this.groupBase);
      if (Number.isNaN(groupDec)) {
	throw new Error(`Failed to parse IP group ${groupStr}`);
      }
      return groupDec;
    });

    return new this(groups);
  }

  asBigInt() {
    if (!this._asBigInt) {
      this._asBigInt = groupsToBigInt(this.groups, this.constructor.groupSize);
    }
    return this._asBigInt;
  };


  toString() {
    return this.groups
      .map(group => group.toString(this.constructor.groupBase))
      .join(this.constructor.groupDivider);
  }
}

export class IPv6 extends IPBase {
  static name = "IPv6";
  static groupDivider = ":";
  static groupBase = 16;
  static groupCount = 8;
  static addressSize = 128;
}

export class IPv4 extends IPBase {
  static name = "IPv4";
  static groupDivider = ".";
  static groupBase = 10;
  static groupCount = 4;
  static addressSize = 32
}

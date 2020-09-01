import { IPv4, IPv6 } from './ip';
import { bigIntToGroups, zPadGroups } from './utils';

class NetmaskBase {
  constructor(ip, bitmask) {
    this.ip = ip;
    this.bitmask = bitmask;
  }

  static parse(netmask) {
    const parts = netmask.split('/');
    if (parts.length != 2) {
      throw new Error("Incorrect argument format: failed to spit IP/mask");
    }

    const [ipStr, bitmaskStr] = parts;
    
    const bitmask = Number.parseInt(bitmaskStr, 10);
    if (Number.isNaN(bitmask)) {
      throw new Error("Failed to parse bitmask");
    }
    
    const ip = this.IPClass.parse(ipStr);
    return new this(ip, bitmask);
  }

  get size() {
    return BigInt(2) ** (BigInt(this.constructor.IPClass.addressSize) - BigInt(this.bitmask));
  }

  get firstIP() {
    const maskRemainder = BigInt(this.constructor.IPClass.addressSize - this.bitmask);
    const firstIpBigInt = this.ip.asBigInt() >> maskRemainder << maskRemainder;
    const firstIpGroups = zPadGroups(
      bigIntToGroups(firstIpBigInt, this.constructor.IPClass.groupSize),
      this.constructor.IPClass.groupCount
    );
    return new this.constructor.IPClass(firstIpGroups);
  }

  get lastIP() {
    const maskRemainder = BigInt(this.constructor.IPClass.addressSize - this.bitmask);
    return new this.constructor.IPClass(bigIntToGroups(
      this.ip.asBigInt() | (2n ** maskRemainder - 1n),
      this.constructor.IPClass.groupSize
    ));
  }

  toString() {
    return `${this.ip/this.bitmask}`;
  }
}

export class NetmaskV6 extends NetmaskBase {
  static IPClass = IPv6
}

export class NetmaskV4 extends NetmaskBase {
  static IPClass = IPv4
}

### Netmask6

Parsing IPv4 and IPv6 netmasks.

Install:
```
npm install netmask6
```

#### Usage

```
const { Netmask } = require("netmask6");

const nm = Netmask.v4.parse("10.1.2.3/24");
nm.size // 256n
nm1.firstIP.toString() // 10.1.2.0
nm2.lastIP.toString()  // 10.1.2.255
```
'use strict';

const assert = require('bsert');
const ARC4 = require('../lib/rc4');

// https://github.com/golang/go/blob/master/src/crypto/rc4/rc4_test.go
const vectors = [
  // Test vectors from the original cypherpunk posting of ARC4:
  //   https://groups.google.com/group/sci.crypt/msg/10a300c9d21afca0?pli=1
  [
    Buffer.from([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]),
    Buffer.from([0x74, 0x94, 0xc2, 0xe7, 0x10, 0x4b, 0x08, 0x79])
  ],
  [
    Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
    Buffer.from([0xde, 0x18, 0x89, 0x41, 0xa3, 0x37, 0x5d, 0x3a])
  ],
  [
    Buffer.from([0xef, 0x01, 0x23, 0x45]),
    Buffer.from([0xd6, 0xa1, 0x41, 0xa7, 0xec, 0x3c, 0x38, 0xdf, 0xbd, 0x61])
  ],

  // Test vectors from the Wikipedia page: https://en.wikipedia.org/wiki/RC4
  [
    Buffer.from([0x4b, 0x65, 0x79]),
    Buffer.from([0xeb, 0x9f, 0x77, 0x81, 0xb7, 0x34, 0xca, 0x72, 0xa7, 0x19])
  ],
  [
    Buffer.from([0x57, 0x69, 0x6b, 0x69]),
    Buffer.from([0x60, 0x44, 0xdb, 0x6d, 0x41, 0xb7])
  ],
  [
    Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
    Buffer.from([
      0xde, 0x18, 0x89, 0x41, 0xa3, 0x37, 0x5d, 0x3a,
      0x8a, 0x06, 0x1e, 0x67, 0x57, 0x6e, 0x92, 0x6d,
      0xc7, 0x1a, 0x7f, 0xa3, 0xf0, 0xcc, 0xeb, 0x97,
      0x45, 0x2b, 0x4d, 0x32, 0x27, 0x96, 0x5f, 0x9e,
      0xa8, 0xcc, 0x75, 0x07, 0x6d, 0x9f, 0xb9, 0xc5,
      0x41, 0x7a, 0xa5, 0xcb, 0x30, 0xfc, 0x22, 0x19,
      0x8b, 0x34, 0x98, 0x2d, 0xbb, 0x62, 0x9e, 0xc0,
      0x4b, 0x4f, 0x8b, 0x05, 0xa0, 0x71, 0x08, 0x50,
      0x92, 0xa0, 0xc3, 0x58, 0x4a, 0x48, 0xe4, 0xa3,
      0x0a, 0x39, 0x7b, 0x8a, 0xcd, 0x1d, 0x00, 0x9e,
      0xc8, 0x7d, 0x68, 0x11, 0xf2, 0x2c, 0xf4, 0x9c,
      0xa3, 0xe5, 0x93, 0x54, 0xb9, 0x45, 0x15, 0x35,
      0xa2, 0x18, 0x7a, 0x86, 0x42, 0x6c, 0xca, 0x7d,
      0x5e, 0x82, 0x3e, 0xba, 0x00, 0x44, 0x12, 0x67,
      0x12, 0x57, 0xb8, 0xd8, 0x60, 0xae, 0x4c, 0xbd,
      0x4c, 0x49, 0x06, 0xbb, 0xc5, 0x35, 0xef, 0xe1,
      0x58, 0x7f, 0x08, 0xdb, 0x33, 0x95, 0x5c, 0xdb,
      0xcb, 0xad, 0x9b, 0x10, 0xf5, 0x3f, 0xc4, 0xe5,
      0x2c, 0x59, 0x15, 0x65, 0x51, 0x84, 0x87, 0xfe,
      0x08, 0x4d, 0x0e, 0x3f, 0x03, 0xde, 0xbc, 0xc9,
      0xda, 0x1c, 0xe9, 0x0d, 0x08, 0x5c, 0x2d, 0x8a,
      0x19, 0xd8, 0x37, 0x30, 0x86, 0x16, 0x36, 0x92,
      0x14, 0x2b, 0xd8, 0xfc, 0x5d, 0x7a, 0x73, 0x49,
      0x6a, 0x8e, 0x59, 0xee, 0x7e, 0xcf, 0x6b, 0x94,
      0x06, 0x63, 0xf4, 0xa6, 0xbe, 0xe6, 0x5b, 0xd2,
      0xc8, 0x5c, 0x46, 0x98, 0x6c, 0x1b, 0xef, 0x34,
      0x90, 0xd3, 0x7b, 0x38, 0xda, 0x85, 0xd3, 0x2e,
      0x97, 0x39, 0xcb, 0x23, 0x4a, 0x2b, 0xe7, 0x40
    ])
  ]
];

function encrypt(desc, c, src, expect) {
  const dst = Buffer.from(src);

  c.encrypt(dst);

  for (let i = 0; i < dst.length; i++) {
    if (dst[i] !== expect[i]) {
      throw new assert.AssertionError({
        message: `${desc}: mismatch at byte ${i}:`
               + ` have ${dst.toString('hex')}`
               + ` want ${expect.toString('hex')}`
      });
    }
  }
}

describe('ARC4', function() {
  for (const [i, [key, keystream]] of vectors.entries()) {
    it(`should pass ARC4 vector #${i}`, () => {
      const data = Buffer.alloc(keystream.length);

      for (let i = 0; i < data.length; i++)
        data[i] = i;

      const expect = Buffer.alloc(keystream.length);

      for (let i = 0; i < keystream.length; i++)
        expect[i] = i ^ keystream[i];

      for (let size = 1; size <= keystream.length; size++) {
        const c = new ARC4().init(key);

        let off = 0;

        while (off < keystream.length) {
          let n = keystream.length - off;

          if (n > size)
            n = size;

          const desc = `#${i}@[${off}:${off + n}]`;

          encrypt(desc, c,
                  data.slice(off, off + n),
                  expect.slice(off, off + n));

          off += n;
        }
      }
    });
  }
});

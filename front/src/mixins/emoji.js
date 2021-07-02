// let toUTF16 = (codePoint) => {
//   var TEN_BITS = parseInt("1111111111", 2);
//   if (codePoint <= 0xffff) {
//     return u(codePoint);
//   }
//   codePoint -= 0x10000;
//   // Shift right to get to most significant 10 bits
//   var leadSurrogate = 0xd800 + (codePoint >> 10);
//   // Mask to get least significant 10 bits
//   var tailSurrogate = 0xdc00 + (codePoint & TEN_BITS);
//   return u(leadSurrogate) + (tailSurrogate);
// }

// let u = (codeUnit) => {
//   return "\\u" + codeUnit.toString(16).toUpperCase();
// }

export default {
  methods: {
    toEmojiCode: (emoji) => {
      console.log(emoji);
      return emoji.replace(/\p{Emoji}/gu, (m) => m.codePointAt(0).toString(16));
    },

    // toEmojiCode: (emoji) => {
    //   console.log(emoji)
    //   emoji.replace(/\p{Emoji}/gu, function (m) {
    //     toUTF16(m.codePointAt(0));
    //   });
    //   console.log(emoji)
    //   return emoji;
    // },

    containsEmoji(str) {
      // Regular expression to match emoji
      const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
      return regexExp.test(str); // true
    },
  }
}
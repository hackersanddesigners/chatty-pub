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
import zulip_emoji from "../data/emoji_codes.json";

export default {
  data() {
    return {
      emoji_regex: /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/gi
    }
  },

  methods: {
    toEmojiCode: (emoji) => {
      return emoji.replace(/\p{Emoji}/gu, (m) => m.codePointAt(0).toString(16));
    },

    shortcodeToEmoji: (code) => {
      if (code.indexOf(":") !== 0) return code;
      let k = code.replaceAll(":", '').trim();
      let emoji = zulip_emoji.name_to_codepoint[k];
      if (!emoji) return code;
      // console.log(k, emoji, parseInt(emoji,16), String.fromCodePoint(parseInt("0x"+emoji)))
      return String.fromCodePoint(parseInt("0x"+emoji))
    },
    
    // toEmojiCode: (emoji) => {
    //   emoji.replace(/\p{Emoji}/gu, function (m) {
    //     toUTF16(m.codePointAt(0));
    //   });
    //   return emoji;
    // },

    containsEmoji(str) {
      // Regular expression to match emoji
      const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
      return regexExp.test(str); // true
    },


    replaceAllEmojiCodes(content) {
      let regex = /:([^\s]+):/gm;
      content = content.replaceAll(regex, (match) => {
        return this.shortcodeToEmoji(match);
      })
      return content;
    }
  }
}
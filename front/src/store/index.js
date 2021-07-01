/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/

import { createStore } from 'vuex'
import emoji from "../mixins/emoji";
import { stripHtml } from "string-strip-html";

var EmojiConvertor = require('emoji-js');
var emojiConv = new EmojiConvertor();

let toCSS = (message) => {
  let className = "",
    emoji_code = "",
    rules = [];

  // let regex = /[/s]?(?<selector>.+)\s*\n?{\n?(?<prop>[\s\w.~:>-]+\s*:\s*.+;?\n?)*\n?}/gm
  let regex = /[/s]?(?<selector>.+)\s*\n?{\n?(?<props>(.*;\n?)+)}/gm
  let content = stripHtml(message.content).result;
  let results = content.matchAll(regex);
  results = Array.from(results);
  if (results.length > 0) {
    className = emojiConv.replace_colons(results[0]['groups']['selector']);
    if (emoji.methods.containsEmoji(className)) {
      emoji_code = emoji.methods.toEmojiCode(className);
    }
    rules = results[0]['groups']['props'].split("\n");
    rules = rules.filter((rule) => validateRule(rule))
    return { className, emoji_code, rules };
  }
  return null;
}

let validateRule = (rule) => {
  return rule.match(/.+:.+;/gm);
}

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile: false,
    streams: [],
    contents: {},
    rules: [],
    pubStr: 'pub-',
  },

  mutations: {
    setMobile: (state, mobile) => state.isMobile = mobile,
    setStreams: (state, streams) => state.streams = streams,
    setContents: (state, messages) => state.contents = messages,
    setRules: (state, messages) => {
      // console.log(messages)
      state.rules = messages.messages.reduce((acc, cur) => {
        let rule = toCSS(cur);
        if (rule !== null) {
          acc.push(rule);
        }
        return acc
      }, [])
    },
    selectTag: (state, tag) => state.selectedTag = tag,
  },

  actions: {
  },

  getters: {
    filteredResources: state => (state
      .resources
      .filter(r => (
        r.tags.indexOf(state.selectedTag > -1)
      ))
    )
  }

})

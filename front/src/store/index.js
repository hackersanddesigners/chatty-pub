/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/

import { createStore } from 'vuex'
import emoji from "../mixins/emoji";
import { stripHtml } from "string-strip-html";

var EmojiConvertor = require('emoji-js');
var emojiConv = new EmojiConvertor();

let toCSS = (message, currentStream) => {
  let className = "",
    emoji_code = "",
    rules = [],
    parentClassName = currentStream

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
    isMobile  : false,
    streams   : [],
    currentStream: '',
    contents  : [],
    rules     : [],
    pubStr    : 'pub-', 
  },

  mutations: {
    setMobile    : (state, mobile)    => state.isMobile  = mobile,
    setStreams   : (state, streams)   => state.streams = streams,
    setCurStream : (state, stream)  => state.currentStream = stream,

    addMessage: (state, message) => {
      if (message.content.startsWith('@_**')) {
        message.responseTo = {
          id: message.content
            .replace(/.*\/near\//gm, '')
            .replace(/\):.*[^]+/gm, ''),
          sender_id: message.content
            .replace(/@_\*\*.*\|/gm, '')
            .replace(/\*\*.\[said\].*[^]+/gm, ''),
          quote: message.content
            .replace(/[^]+.*```quote\n/gm, '')
            .replace(/ \n```/gm, '')
        }
      }
      state.contents.push(message)
    },
    editMessage: (state, { mid, content }) => {
      const message = state.contents.find(m => m.id == mid)
      if (message) {
        message.content = content
      }
    },
    deleteMessage: (state, mid) => {
      const message = state.contents.find(m => m.id == mid)
      if (message) {
        state.contents.splice(state.contents.indexOf(message), 1)
      }
    },
    addReaction : (state, { mid, reaction })  => {
      const message = state.contents.find(m => m.id == mid)
      if (message) {
        message.reactions.push(reaction)
      }
    },
    removeReaction : (state, { mid, reaction })  => {
      const message = state.contents.find(m => m.id == mid)
      if (message) {
        message.reactions.splice(message.reactions.indexOf(reaction), 1)
      }
    },
    
    setRules: (state, rules) => {
      state.rules = rules.reduce((acc, cur) => {
        let rule = toCSS(cur, state.currentStream);
        if (rule !== null) {
          acc.push(rule);
        }
        return acc
      }, [])
    },
    
    addRule: (state, rule) => {
      if (rule.content.match(/\/poll/gm)) {
        state.rules.push(toCSS(rule))
      }
    } 
    
  },

  actions: {
  },

  getters: {
  }

})

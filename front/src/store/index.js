/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/

// import Vue from 'vue'
import { createStore } from 'vuex'
import emoji from "../mixins/emoji"
import { stripHtml } from "string-strip-html"

var EmojiConvertor = require('emoji-js');
var emojiConv = new EmojiConvertor();

let toCSS = (message, currentStream) => {
  // console.log(message)
  let className = "",
    emoji_code = "",
    rules = [],
    parentClassName = currentStream,
    id = message.id

  // let regex = /[/s]?(?<selector>.+)\s*\n?{\n?(?<prop>[\s\w.~:>-]+\s*:\s*.+;?\n?)*\n?}/gm
  let regex = /\s?(?<selector>.+)\s*\n?{\n?(?<props>(.*;\n?)+)}/gm
  let content = stripHtml(message.content).result;
  let results = content.matchAll(regex);
  results = Array.from(results);
  //console.log(results)
  if (results.length > 0) {
    className = emojiConv.replace_colons(results[0]['groups']['selector']);
    if (emoji.methods.containsEmoji(className)) {
      emoji_code = emoji.methods.toEmojiCode(className);
    }
    rules = results[0]['groups']['props'].split("\n");
    rules = rules.filter((rule) => validateRule(rule))
    // console.log(className, emoji_code, rules, parentClassName, id)
    return { className, emoji_code, rules, parentClassName, id };
  }
  return null;
}

let validateRule = (rule) => {
  return rule.match(/.+:.+;/gm);
}

// parsing replies, there are two scenarios:
// we are either getting the message as plain markdown
// or we are getting the message pre-rendered as HTML (default Zulip behaviour)
// see /src/api/zulip/index.js line 36

const handleMDReply = message => {
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
  // console.log(message.responseTo)
}

const handleHTMLReply = message => {
  message.responseTo = {
    id: message.content
      .replace(/.*\/near\//gm, '')
      .replace(/".*[^]+/gm, ''),
    sender_id: message.content
      .replace(/[^]+data-user-id="/gm, '')
      .replace(/">[^]+/gm, ''),
    quote: message.content
      .replace(/.*[^]+<\/p>\n<blockquote>\n<p>/gm, '')
      .replace(/ <\/p>\n<\/blockquote>/gm, '')
  }
  // console.log(message.responseTo)
}

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile: false,
    streams: [],
    currentStream: '',
    rules: [],
    topics: [],
    pubStr: 'pub-',
  },

  mutations: {

    setMobile: (state, mobile) => state.isMobile = mobile,
    setStreams: (state, streams) => state.streams = streams,
    setCurStream: (state, stream) => state.currentStream = stream,
    setTopics: (state, topics) => state.topics = topics,
    addMessage: (state, message) => {
      if (message.display_recipient == state.currentStream) {
        if (message.content.startsWith('@_**')) {
          handleMDReply(message)
        } else if (
          message.content.includes('user-mention') &&
          message.content.includes('blockquote')
        ) {
          handleHTMLReply(message)
        }
        const topic = state.topics.find(topic => topic.title == message.subject)
        if (topic) {
          topic.messages.push(message)
        } else {
          state.topics.push({
            title: message.subject,
            messages: [ message ]
          })
        }
      }
    },
    deleteMessage: (state, { mid, subject }) => {
      const topic = state.topics.find(t => t.title == subject)
      if (topic) {
        const message = topic.messages.find(m => m.id == mid)
        if (message) {
          topic.messages.splice(topic.messages.indexOf(message), 1)
        }
      }
    },
    addReaction: (state, { mid, reaction }) => {
      const message = state.topics
        .map(t => t.messages)
        .flat()
        .find(m => m.id == mid)
      if (message) {
        message.reactions.push(reaction)
      }
    },
    removeReaction: (state, { mid, reaction }) => {
      const message = state.topics
        .map(t => t.messages)
        .flat()
        .find(m => m.id == mid)
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
      if (toCSS(rule) !== null) {
        // state.rules.push(toCSS(rule, state.currentStream))
        // vue will not update if i use rules.push(rule)
        state.rules = [...state.rules,...[toCSS(rule, state.currentStream)]]
      }
    },
    editMessage: (state, { mid, content }) => {
      const message = state.topics
        .map(t => t.messages)
        .flat()
        .find(m => m.id == mid)
      const rule = state.rules.find(r => r.id == mid)
      if (message) {
        message.content = content
        if (message.content.startsWith('@_**')) {
          handleMDReply(message)
        } else if (
          message.content.includes('user-mention') &&
          message.content.includes('blockquote')
        ) {
          handleHTMLReply(message)
        }
      } else if (rule) {
        // state.rules[state.rules.indexOf(rule)] = toCSS({
        //   id: mid, content: content,
        // }, state.currentStream)

        // vue will not update if i use rules.push(rule)        
        const newRules = [...state.rules, ...[toCSS({
          id: mid, content: content,
        }, state.currentStream)]]
        state.rules = newRules
      }
    },

    updateTopic: (state, { orig_subject, subject }) => {
      const topic = state.topics.find(t => t.title == orig_subject)
      if (topic) {
        topic.title = subject
        topic.messages.forEach(m => m.subject = subject)
      }
    }

  },

  actions: {
  },

  getters: {
    rules: state => state.rules,
    sortedTopics: state => (
      [...state.topics]
      .sort((a, b) => a.title.localeCompare(b.title))
      .filter(t => t.messages.length > 0) 
    )
  }

})

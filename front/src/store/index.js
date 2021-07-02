import { createStore } from 'vuex'
import emoji from "../mixins/emoji";

const toCSS = (poll, currentStream) => {
  let 
    className  = "",
    emoji_code = "",
    options    = [],
    rules      = [],
    subs       = poll.submessages.map((s) => JSON.parse(s.content)),
    parentClassName = currentStream
        
  subs.forEach(sub => {
    if (sub.widget_type && sub.widget_type == "poll") {
      className  = sub.extra_data.question
      emoji_code = emoji.methods.toEmojiCode(className)
      options = sub.extra_data.options
      // console.log(emoji_code)
      if (options) {
        options.forEach(option => {
          let r = constructRule(option, options, subs)
          if (validateRule(r)) {
            rules.push(r)
          }
        })
      }
    } else if (sub.type && sub.type == "new_option") {
      let r = constructRule(sub.option, options, subs)
      if (validateRule(r)) {
        rules.push(r)
      }
    }
  })
  return { parentClassName, className, emoji_code, rules }
}

const constructRule = (option, options, subs) => {
  const 
    text = option,
    votes = subs.filter( s =>
      s.type == "vote" &&
      s.key.replace("canned,", "") == options.indexOf(option)
    ),
    weight =
      votes.length > 0
      ? votes.map((s) => s.vote).reduce((a, b) => a + b)
      : 0
  return { text, weight }
}

// minimal validation. rules have to contain a colon and semicolon
const validateRule = rule => rule.text.match(/.+:.+;/gm)

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
        // console.log(message.responseTo)
        // const referenceMessage = state.contents.find(m => { 
        //   m.id == message.responseTo.id 
        //   // &&
        //   // m.sender_id == message.responseTo.sender_id
        //   // m.content.includes(message.responseTo.quote)
        // })
        // console.log(referenceMessage)
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
    
    
    setRules: (state, rules)  => { state.rules = 
      rules
      .filter((r) => r.content.match(/\/poll/gm))
      .map((r) => toCSS(r, state.currentStream))
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

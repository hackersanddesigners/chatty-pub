import { createStore } from 'vuex'
import emoji from "../mixins/emoji";

let toCSS = (poll) => {
  let className = "",
    emoji_code = "",
    options = [],
    rules = [],
    subs = poll.submessages.map((s) => JSON.parse(s.content));
  subs.forEach((sub) => {
    if (sub.widget_type && sub.widget_type == "poll") {
      className = sub.extra_data.question;
      emoji_code = emoji.methods.toEmojiCode(className);
      // console.log(emoji_code);
      options = sub.extra_data.options;
      if (options) {
        options.forEach((option) => {
          let r = constructRule(option, options, subs);
          if (validateRule(r)) {
            rules.push(r);
          }
        });
      }
    } else if (sub.type && sub.type == "new_option") {
      let r = constructRule(sub.option, options, subs);
      if (validateRule(r)) {
        rules.push(r);
      }
    }
  });
  return { className, emoji_code, rules };
}

let constructRule = (option, options, subs) => {
  const text = option,
    votes = subs.filter(
      (s) =>
        s.type == "vote" &&
        s.key.replace("canned,", "") == options.indexOf(option)
    ),
    weight =
      votes.length > 0
        ? votes.map((s) => s.vote).reduce((a, b) => a + b)
        : 0;
  return { text, weight };
}

// minimal validation. rules have to contain a colon and semicolon
let validateRule = (rule) => { 
  return rule.text.match(/.+:.+;/gm);
}

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile  : false,
    streams : [],
    contents : {},
    rules : [],
    pubStr: 'pub-',   
  },

  mutations: {
    setMobile    : (state, mobile)    => state.isMobile  = mobile,
    setStreams   : (state, streams)   => state.streams = streams,
    setContents  : (state, messages)  => state.contents = messages,
    setRules: (state, messages) => {
      state.rules = messages.messages
          .filter((m) => m.content.match(/\/poll/gm))
          .map((m) => toCSS(m))
    },
    selectTag    : (state, tag)       => state.selectedTag = tag,
  },

  actions: {
  },

  getters: {
    filteredResources: state => ( state
      .resources
      .filter(r => (
        r.tags.indexOf(state.selectedTag > -1)
      ))
    
    )
  }

})

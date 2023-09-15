/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/

// import Vue from 'vue'
import { createStore } from 'vuex'
import emoji from "../mixins/emoji"
import { stripHtml } from "string-strip-html"

/*

TODO: fix this frankenfunction. Its not pretty but it works, so I am leaving it for now.

Does various conversion and parsing to turn a message in the rules channel into an object we can use in the rules and style component

*/
let toCSS = (message, currentStream) => {
  let content = stripHtml(message.content).result;
  let className = "",
    emoji_code = "",
    rules = [],
    parentClassName = (currentStream && currentStream.slug || ""),
    id = message.id,
    is_codeblock = message.content.includes("<code>") || message.content.startsWith("```"),
    is_font = /<p><a href=".+?\.(ttf|otf|woff)/gm.test(message.content);

  let type = is_codeblock ? "raw" : is_font ? "font" : "rule";
  // console.log(type, message.content);
  let regex = /\s?(?<selector>.+)\s*\n?{\n?(?<props>(.*;\n?)+)}/gm
  let results = content.matchAll(regex);
  results = Array.from(results);

  if (is_font) { // font
    let re_path = /\/user_uploads(\/.*?\.(?:ttf|otf|woff))/gm;
    content = re_path.exec(message.content)[1];
    return { className: '', emoji_code: '', rules: [], parentClassName: '', id: id, content: font(content), type: type }
  } else if (is_codeblock) {
    return { className: '', emoji_code: '', rules: [], parentClassName: '', id: id, content: cleanupCodeBlock(content), type: type }
  } else if (results.length > 0) { // rule and raw
    className = emoji.methods.replaceAllEmojiCodes(results[0]['groups']['selector']);
    if (emoji.methods.containsEmoji(className)) {
      emoji_code = emoji.methods.toEmojiCode(className);
    }
    rules = results[0]['groups']['props'].split("\n");
    rules = rules.filter((rule) => validateRule(rule))
    return { className, emoji_code, rules, parentClassName, id, content, type };
  }
  console.log("rejected rule", message)
  return null;
}

let cleanupCodeBlock = (content) => {
  return content.replaceAll('```', '');
}

let font = (content) => {
  let font = {
    family: "",
    src: "",
    format: "",
  };
  let path = content;
  let filename = getFilename(path);
  let ext = filename.split(".").pop();
  font.src =
    "http://chatty-pub-files.hackersanddesigners.nl/files" + path;
  font.format = getFormat(ext);
  font.family = filename.replace(".", "_");
  return font;
}

let getFilename = (str) => {
  return str.split("\\").pop().split("/").pop();
}

let getFormat = (ext) => {
  let fmt = "truetype";
  switch (ext) {
    case 'woff':
      fmt = "woff";
      break;
    case 'woff2':
      fmt = "woff2";
      break;
    case 'eof':
      fmt = "embedded-opentype";
      break;
  }
  return fmt;
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
      .replace(/<\/p>\n<\/blockquote>/gm, '')
    .replace(/\n/gm, '')
  }
  // console.table(message.responseTo)
}

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile      : false,
    streams       : [],
    currentStream : {},
    rules         : [],
    topics        : [],
    pubStr        : 'pub-',
  },

  mutations: {

    setMobile    : (state, mobile)  => state.isMobile = mobile,
    setStreams   : (state, streams) => state.streams = streams,
    setCurStream : (state, stream)  => state.currentStream = stream,
    setTopics    : (state, topics)  => state.topics = topics,
    addMessage   : (state, message) => {
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
          messages: [message]
        })
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
        state.rules = [...state.rules, ...[toCSS(rule, state.currentStream)]]
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
        state.rules.splice(state.rules.indexOf(rule), 1)
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

    filteredTopics: state => (
      [...state.topics]
      .filter(t => (
        t.messages.length > 0 &&
        t.title != 'stream events'
      ))
    ),

    sortedTopics: (state, getters) => (
      getters.filteredTopics
      .sort((a,b) =>
        a.title.localeCompare(b.title, undefined, {
          numeric     : true,
          sensitivity : 'base'
        })
      )
    )
  }

})

<template>
  <div class="message-outer" :class="(show_message_data && message.reactions.length > 0 )?'show_message_data':''">
    <div class="message-data" v-if="show_message_data">
      <div class="from">{{ message.sender_full_name }}</div>
      <div class="time">{{ time }}</div>
    </div>
    <div :class="classes" class="message">
      <template v-if="hasRulesShortcode">
        <Rules />
      </template>
      <template v-else>
        <vue3-markdown-it :source="content" v-bind="$mdOpts"></vue3-markdown-it>
      </template>
      <div class="message-data-reactions" v-if="show_message_data && message.reactions.length > 0">
        <span
          class="reaction"
          v-for="reaction in message.reactions"
          :key="reaction"
        >
          {{ String.fromCodePoint("0x" + reaction.emoji_code) }}
        </span>
      </div>
    </div>
    
    <div class="reactions ui">
      <span v-for="reaction in reactions" :key="reaction" :title="reaction">
        {{ shortcodeToEmoji(reaction) }}
      </span>
    </div>
  </div>
</template>

<script>
import emoji from "../../mixins/emoji";
import Rules from "../Rules/index.vue";

var EmojiConvertor = require("emoji-js");
var emojiConv = new EmojiConvertor();
/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/
export default {
  name: "Message",
  components: {
    Rules,
  },
  props: ["message", "show_message_data"],
  mixins: [emoji],
  computed: {
    rawJSON() {
      return "```json\n" + JSON.stringify(this.message, null, 2) + "\n```";
    },
    content() {
      if(!this.message.content) return "";
      // let c = this.message.content.replaceAll("\n", "<br/>");
      let c = this.message.content;

      // create absolute url on images and relative links
      let url = process.env.VUE_APP_ZULIP_site;
      c = c.replaceAll('src="', 'src="' + url);
      c = c.replaceAll('href="/', 'href="' + url + "/");
      // replace it with the mirror domain for uploads
      // replace this: https://chat.hackersanddesigners.nl/user_uploads/
      // with this: https://chatty-pub-files.hackersanddesigners.nl/files/
      c = c.replaceAll(
        url + "/user_uploads/",
        "https://chatty-pub-files.hackersanddesigners.nl/files/"
      );

      c = this.replaceAllEmojiCodes(c);

      const referrers = this.$store.state.topics
        .find((t) => t.title == this.message.subject)
        .messages.filter(
          (m) =>
            m.responseTo &&
            m.responseTo.id == this.message.id &&
            m.responseTo.sender_id == this.message.sender_id &&
            this.message.content.includes(m.responseTo.quote)
        );
      // console.log(c, referrers);
      referrers.forEach((m) => {
        const classes = m.reactions.map((r) => "u" + r.emoji_code).join(" ");
        c = c.replace(
          m.responseTo.quote,
          `<span class="${classes}">${m.responseTo.quote}</span>`
        );
        // console.log(c);
      });

      
      return c;
    },
    hasRulesShortcode(){
      console.log(this.content, this.content.includes("[rules]"));
      return this.content.includes('[rules]');
    },
    reactions() {
      // return this.message.reactions.map((r) => {
      //   console.log(r);
      //   return emojiConv.replace_colons(":" + r.emoji_name + ":");
      // });
      // return [];
      // console.log(this.message)
      return this.message.reactions.map((r) =>
        emojiConv.replace_colons(":" + r.emoji_name + ":")
      );
    },
    classes() {
      return this.message.reactions.map(
        (r) => r.emoji_code + " u" + r.emoji_code
      );
    },
    time() {
      var ts = this.message.timestamp;
      var ts_ms = ts * 1000;
      var date_ob = new Date(ts_ms);
      return date_ob.toLocaleString();
    },
  },
  created() {
    // console.log(this.message.content);
  },
};
</script>

<style>
.message-outer {
  position: relative;
  display: block;
}

.reactions,
.reactions::before,
.reactions::after {
  all: revert;
  display: none;
}

.message-outer:hover .reactions {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 3rem;
  pointer-events: none;
}


.reactions span {
  pointer-events: initial;
}

.message-data {
  display: flex;
  border-bottom: 1px solid #666;
}
.message-data > div {
  flex-grow: 1;
}

.message-data .from:after {
  content: ":";
}
.message-data .time {
  text-align: right;
}

.show_message_data .message {
  padding-bottom: 1rem;
}

.message-data-reactions {
  all: initial;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
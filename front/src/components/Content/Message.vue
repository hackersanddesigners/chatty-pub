<template>
  <span :class="classes" class="message">
    <vue3-markdown-it :source="content" v-bind="$mdOpts"></vue3-markdown-it>
    <div class="reactions">
      <template v-for="reaction in reactions" :key="reaction">
        {{ reaction }}
      </template>
    </div>
  </span>
</template>

<script>
var EmojiConvertor = require("emoji-js");
var emojiConv = new EmojiConvertor();
/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/
export default {
  name: "Message",
  props: ["message"],
  computed: {
    rawJSON() {
      return "```json\n" + JSON.stringify(this.message, null, 2) + "\n```";
    },
    content() {
      let url = process.env.VUE_APP_ZULIP_site;
      let c = this.message.content.replace("\n", "<br/>");
      c = c.replaceAll('src="', 'src="' + url);
      c = c.replaceAll('href="/', 'href="' + url + "/");

      const referrers = this.$store.state.contents.filter(
        (m) =>
          m.responseTo &&
          m.responseTo.id == this.message.id &&
          m.responseTo.sender_id == this.message.sender_id &&
          this.message.content.includes(m.responseTo.quote)
      );
      referrers.forEach((m) => {
        const classes = m.reactions.map((r) => "u" + r.emoji_code).join(" ");
        c = c.replace(
          m.responseTo.quote,
          `<span class="${classes}">${m.responseTo.quote}</span>`
        );
      });
      return c;
    },
    reactions() {
      // return this.message.reactions.map((r) => {
      //   console.log(r);
      //   return emojiConv.replace_colons(":" + r.emoji_name + ":");
      // });
      // return [];
      return this.message.reactions.map((r) =>
        emojiConv.replace_colons(":" + r.emoji_name + ":")
      );
    },
    classes() {
      return this.message.reactions.map((r) => "u" + r.emoji_code);
    },
  },
  created() {
    // console.log(this.message.content);
  },
};
</script>

<style>
.message {
  position: relative;
  display: block;
}

.message:hover .reactions {
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
}
.reactions,
.reactions::before,
.reactions::after {
  all: revert;
  display: none;
}
</style>
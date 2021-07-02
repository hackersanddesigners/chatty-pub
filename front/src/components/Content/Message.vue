<template>
  <span :class="classes">
    <vue3-markdown-it :source="content" v-bind="$mdOpts"></vue3-markdown-it>
  </span>
</template>

<script>
export default {
  name: "Header",
  props: ["message"],
  computed: {
    rawJSON() {
      return "```json\n" + JSON.stringify(this.message, null, 2) + "\n```";
    },
    content() {
    
      let url = process.env.VUE_APP_ZULIP_site;
      let c = this.message.content.replace("\n", "<br/>");
      c = c.replaceAll('src="','src="' + url);
      c = c.replaceAll('href="/','href="' + url + "/");
      
      const referrers = this.$store.state.contents.filter(m => (
        m.responseTo &&
        m.responseTo.id == this.message.id &&
        m.responseTo.sender_id == this.message.sender_id &&
        this.message.content.includes(m.responseTo.quote)
      ))
      referrers.forEach(m => {
        const classes = m.reactions
          .map(r => "u" + r.emoji_code)
          .join(' ')
        c = c.replace(
          m.responseTo.quote,
          `<span class="${classes}">${m.responseTo.quote}</span>`
        )
      })
      return c
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
</style>
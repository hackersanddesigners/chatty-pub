<template>
  <span :class="classes" :x-style="styles">
    <!-- {{ $md.renderInline(content) }} -->
    <vue3-markdown-it :source="content" v-bind="$mdOpts"></vue3-markdown-it>
  </span>
  <!-- <div v-html="content"/> -->
  <!-- {{ content }} -->
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
      let m = this.message.content.replace("\n", "<br/>");
      m = m.replaceAll('src="', 'src="' + url);
      m = m.replaceAll('href="/', 'href="' + url + "/");
      return m;
    },
    classes() {
      return this.message.reactions.map((r) => "u" + r.emoji_code);
    },
    styles() {
      return this.$store.state.rules
        .filter((r) => this.classes.includes("u" + r.emoji_code))
        .map((r) => r.rules)
        .flat()
        .map((s) => s.text);
    },
  },
  created() {
    console.log(this.message.content);
  },
};
</script>

<style>
header {
  box-sizing: border-box;
  margin: 1em;
}
</style>
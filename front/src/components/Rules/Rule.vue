<template>
  <!-- <span>
    <vue3-markdown-it 
      :source="rawJSON"
      inline
    ></vue3-markdown-it>
  </span>   -->
  <code class="rule">
    <p :title="toEmojiCode(rule.className)">{{ rule.className }} {</p>
    <p v-for="dec in rule.rules" :key="dec">&nbsp; {{ dec }}</p>
    <p>}</p>
  </code>
</template>

<script>
import emoji from "../../mixins/emoji";

export default {
  name: "Rule",
  mixins: [emoji],
  props: ["rule"],
  computed: {
    rawJSON() {
      return "```json\n" + JSON.stringify(this.rule, null, 2) + "\n```";
    },
  },
};
</script>

<style>
.rule p {
  margin: 0;
}
</style>
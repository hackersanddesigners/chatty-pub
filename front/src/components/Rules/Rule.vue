<template>
  <code 
    class="rule"
    :class="rule.emoji_code"  
  >
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

<style scoped>

.rule {
  margin: 1em 0;
}

.rule p {
  margin: 0;
}
</style>
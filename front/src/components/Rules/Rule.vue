<template>
  <code 
    class="rule"
    :class="myClass"  
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
    myClass() {
      return (
        this.containsEmoji(this.rule.className) ?
        'u' + this.toEmojiCode(this.rule.className) : null
      )
    }
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
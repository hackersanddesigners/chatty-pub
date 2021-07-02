<template>
  <div 
    class="rule"
    :style="rule.rules"  
  >
    <p :title="toEmojiCode(rule.className)">{{ rule.className }} {</p>
    <p v-for="dec in rule.rules" :key="dec">&nbsp; {{ dec }}</p>
    <p>}</p>
  </div>
</template>

<script>
import emoji from "../../mixins/emoji";

export default {
  name: "Rule",
  mixins: [emoji],
  props: ["rule"],
  computed: {
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
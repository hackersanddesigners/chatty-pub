<template>
  <div class="rule" :style="rule.rules">
    <template v-if="rule.is_codeblock">
      {{ contentFiltered }}
    </template>
    <template v-else>
    <p :title="toEmojiCode(rule.className)">{{ rule.className }} {</p>
    <p v-for="dec in rule.rules" :key="dec">&nbsp; {{ dec }}</p>
    <p>}</p>
    </template>
  </div>
</template>

<script>
import emoji from "../../mixins/emoji";

export default {
  name: "Rule",
  mixins: [emoji],
  props: ["rule"],
  computed: {
    contentFiltered() {
      var reg = this.emoji_regex;

      let c = this.rule.content.replace(reg, (c) => {
        console.log("c", c, this.toEmojiCode(c));
        return c + ", .u" + this.toEmojiCode(c);
      });

      return c;
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
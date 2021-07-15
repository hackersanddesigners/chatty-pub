<template>
  <div class="rule" :class="classes" :style="rule.rules">
    <pre v-if="rule.is_codeblock">
      {{ contentFiltered }}
    </pre>
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
    classes() {
      let style = "";
      if (this.rule.is_codeblock) {
        style += " raw";
      }
      return style;
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

.rule.raw {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  position: relative;
}

.rule.raw:after {
  content: "raw css";
  background-color: #333;
  border-radius: 10px;
  position: absolute;
  bottom: -0.5em;
  left: 50%;
  transform: translateX(-50%);
  padding: 3px;
  border: 1px solid white;
}
</style>
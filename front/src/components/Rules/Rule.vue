<template>
  <div class="rule" :class="classes" :style="rules">
    <pre v-if="rule.type === 'raw'"
      >{{ contentFiltered }}
    </pre>
    <template v-else-if="rule.type === 'font'">
      <pre>
@font-face { 
  font-family: "{{ font.family }}"; 
  src: "{{ font.src }}" format({{ "font.format" }}); 
}
      </pre>
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
      let reg = this.emoji_regex;
      let c = this.rule.content.replace(reg, (c) => {
        return c + ", .u" + this.toEmojiCode(c);
      });

      return c;
    },
    classes() {
      let style = "";
      if (this.rule.type == "raw") {
        style += " raw";
      }
      return style;
    },
    font() {
      return this.rule.content;
    },
    rules() {
      if (this.rule.type !== "font") return this.rule.rules;
      else return ["font-family: " + this.font.family + ";"];
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
  all: revert;
  content: "raw css";
  background-color: #333;
  border-radius: 10px;
  position: absolute;
  bottom: -0.5em;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
  border: 1px solid white;
  font-family: initial;
  font-size: 1rem;
}
</style>
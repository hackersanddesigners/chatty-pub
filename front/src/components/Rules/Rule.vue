<template>
  <div class="rule" :class="classes" :style="rules">
    <pre v-if="rule.type === 'raw'"
      >{{ contentFiltered }}
    </pre>
    <span v-else-if="rule.type === 'font'">
      <pre :style="rules">
@font-face { 
  font-family: "{{ font.family }}"; 
  src: "{{ font.src }}" format({{ "font.format" }}); 
}</pre
      >
      <div class="instructions">
        <span
          >Add the follow to your rule to use this font:<br />
          font-family: "{{ font.family }}";
        </span>
      </div>
    </span>
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
      return "type-" + this.rule.type;
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
  position: relative;
}

.rule p {
  margin: 0;
}

.rule.type-raw,
.rule.type-font {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  position: relative;
}

.rule.type-font:after,
.rule.type-raw:after {
  all: revert;
  content: "raw css";
  background-color: #333;
  border-radius: 10px;
  position: absolute;
  bottom: -0.5em;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  /* border: 1px solid white; */
  font-family: sans-serif;
  font-size: 0.8rem;
  box-shadow: 0 0 5px 5px rgba(255, 255, 0, 0.7);
}

.rule.type-font:after {
  content: "generated font rule";
}

.rule.type-font .instructions {
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  align-content: center;
  justify-content: center;
  align-items: center;
  font-family: initial;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  border-radius: 10px;
  box-shadow: 0 0 5px 5px white;
}

.rule.type-font:hover .instructions {
  display: flex;
}
</style>
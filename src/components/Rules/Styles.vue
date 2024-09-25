<template>
  <template></template>
  <!-- placeholder for styles component -->
</template>

<script>
import { mapState } from "vuex";
import emoji from "../../mixins/emoji";

export default {
  name: "Styles",
  mixins: [emoji],
  computed: {
    ...mapState(["rules"]),
  },
  data() {
    return {
      el: null,
    };
  },
  methods: {
    generateStyleRules() {
      let styles = "";
      this.rules.map((r) => {
        switch (r.type) {
          case "raw":
            console.log("raw", r.content);
            styles += r.content.replaceAll("\n", " ");
            break;
          case "font":
            // styles += `@font-face { font-family: "${r.content.family}"; src: "${r.content.src}" format("${r.content.format}"); }`;
            styles += `@font-face { font-family: "${r.content.family}"; src: url("${r.content.src}") format("${r.content.format}"); }`;
            break;
          default:
            if (r.className.startsWith("@")) {
              styles += r.className;
            } else {
              styles += `.${r.parentClassName} ${r.className}`;
              if (this.containsEmoji(r.className)) {
                styles += `, .${r.parentClassName} .u${this.toEmojiCode(
                  r.className
                )}`;
              }
            }
            styles += "{";
            r.rules.map((s) => {
              styles += s;
            });
            styles += "}";
        }
      });
      return styles;
    },
    createStyleElement() {
      var style = document.createElement("style");
      style.innerText = this.generateStyleRules();
      style.classList.add("chattypub-rules");
      return style;
    },
  },
  mounted() {
    this.el = this.createStyleElement();
    document.head.appendChild(this.el);
  },
  watch: {
    rules() {
      const newStyle = this.createStyleElement();
      document.head.replaceChild(newStyle, this.el);
      this.el = newStyle;
    },
  },
};
</script>
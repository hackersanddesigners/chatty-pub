<script>
import emoji from "../../mixins/emoji";

export default {
  name: "Styles",
  mixins: [emoji],
  computed: {
    rules() {
      return this.$store.state.rules;
    },
  },
  data: function () {
    return {
      el: null,
      htmlTags: [
        'section',
        'p',
        'a',
        'span',
        'code',
        'ul',
        'li',
        'and so on' 
      ]
    }
  },
  methods: {
    generateStyleRules() {
      let styles = "";
      // this.rules.map(r => {
      //   const dot = this.htmlTags.indexOf(r.className) > -1 ? '' : '.'
      //   styles  += `.${r.parentClassName} ${dot}${r.className}`
      //   if( this.containsEmoji(r.className)){
      //     styles += `, .${r.parentClassName} .u${this.toEmojiCode(r.className)}` 
      //   }
      //   styles += "{"
      //   r.rules.map((s)=>{
      //     styles += s.text;
      //   })
      //   styles += "}"
      // })
      this.rules.map((r) => {
        styles += r.className;
        if (this.containsEmoji(r.className)) {
          styles += ", .u" + this.toEmojiCode(r.className);
        }
        styles += "{";
        r.rules.map((s) => {
          styles += s;
        });
        styles += "}";
      });
      console.log(styles)
      return styles;
    },
    insertStyleElement() {
      var style = document.createElement("style");
      style.innerText = this.generateStyleRules();
      return style;
    },
  },
  mounted: function () {
    this.el = document.head.appendChild(this.insertStyleElement());
  },
  watch: {
    rules() {
      let style = this.insertStyleElement();
      this.el.parentNode.replaceChild(style, this.el);
    },
  },
};
</script>
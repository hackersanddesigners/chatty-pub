<script>
import { mapState } from 'vuex';
import emoji from "../../mixins/emoji";


export default {
  name: "Styles",
  mixins: [emoji],
  computed: {
    ...mapState([
      'rules'
    ]),
    
  },
  data() {
    return {
      el: null,
    }
  },
  methods: {
    generateStyleRules() {
      let styles = "";
      this.rules.map((r) => {
        styles  += `.${r.parentClassName} ${r.className}`
        if (this.containsEmoji(r.className)) {
          styles += `, .${r.parentClassName} .u${this.toEmojiCode(r.className)}` 
        }
        styles += "{";
        r.rules.map((s) => {
          styles += s;
        });
        styles += "}";
      });
      return styles;
    },
    createStyleElement() {
      var style = document.createElement("style");
      style.innerText = this.generateStyleRules();
      return style;
    },
  },
  mounted() {
    this.el = this.createStyleElement() 
    document.head.appendChild(this.el)
  },
  watch: {
    rules() {
      console.log('rules!')
      const newStyle = this.createStyleElement()
      document.head.replaceChild(newStyle, this.el)
      this.el = newStyle
    },
  },
};
</script>
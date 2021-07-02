<script>
export default {
  name: "Styles",
  computed: {
    rules() {
      return this.$store.state.rules;
    },
  },
  data: function(){
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
      this.rules.map(r => {
        const dot = this.htmlTags.indexOf(r.className) > -1 ? '' : '.'
        styles  += `.${r.parentClassName} ${dot}${r.className}`
        if( this.containsEmoji(r.className)){
          styles += `, .${r.parentClassName} .u${this.toEmojiCode(r.className)}` 
        }
        styles += "{"
        r.rules.map((s)=>{
          styles += s.text;
        })
        styles += "}"
      })
      console.log(styles)
      return styles;
    },
    insertStyleElement() {
      var style = document.createElement('style');
      style.innerText = this.generateStyleRules();
      return style
    },
    containsEmoji(str) {
      // Regular expression to match emoji
      const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
      return regexExp.test(str); // true
    },
    toEmojiCode(emoji) {
      return emoji.replace(/\p{Emoji}/gu, (m) => m.codePointAt(0).toString(16));
    },

  },
  mounted: function() {
    this.el = document.head.appendChild(this.insertStyleElement());
  },
  watch: {
    rules() {
      let style = this.insertStyleElement();
      this.el.parentNode.replaceChild(style, this.el);
    }
  }
};
</script>
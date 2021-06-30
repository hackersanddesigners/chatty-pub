<template>
  <div id="app" :class="{ mobile: isMobile }">
    <!-- <header>
      <code>Zulip URL: {{ api.zulip.config.realm }}</code>
    </header> -->
    <main>
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "./api";

export default {
  name: "App",
  components: {},
  data() {
    return {
      api: api,
      zulipClient: null,
    };
  },
  computed: {
    ...mapState(["isMobile", "pubStr"]),
  },
  created() {
    this.$store.commit("setMobile", this.checkIfMobile());
    window.addEventListener("resize", () => {
      this.$store.commit("setMobile", this.checkIfMobile());
    });

    this.getStreams();

    this.$router.afterEach((to) => {
      const stream = to.path.replace("/", "");
      if (stream != "") {
        this.setUpDoc(stream);
      } else {
        this.$store.commit("setContents", []);
        this.$store.commit("setRules", []);
      }
    });
  },

  methods: {
    checkIfMobile: () => window.innerWidth < 700,

    getStreams() {
      api
      .zulip
      .init()
      .then(client => {
        this.zulipClient = client
        api
        .zulip
        .getStreams(client)
        .then(result => {
          this
          .$store
          .commit( 'setStreams', 
            result
            .streams
            .filter(s => 
              s.name.startsWith(this.pubStr)
            )
          )
        })
      })
    },

    setUpDoc(stream) {
    
      api
      .zulip
      .getMsgs(this.zulipClient, stream, 'content')
      .then(result => {
        this
        .$store
        .commit( 'setContents', 
          result
          .messages
        )
      })
      
      api
      .zulip
      .getMsgs(this.zulipClient, stream, 'rules')
      .then(result => {
        this
        .$store
        .commit( 'setRules', 
          result
          .messages
          .map(m => 
            this.toCSS(m)
          )
        )
      })
      
      api.zulip.listen(this.zulipClient)
        
    },

    toCSS(poll) {
    
      const 
        subs = poll
        .submessages
        .map(s => JSON.parse(s.content))
       
      let 
        className  = '',
        emoji_code = '',
        options    = [],
        rules      = []
         
      subs.forEach(sub => {
        // console.log(sub)
        if (
           sub.widget_type && 
           sub.widget_type == 'poll'
          ) {
          className  = sub.extra_data.question
          options    = sub.extra_data.options
          emoji_code = this.toEmojiCode(className)
          // console.log(emoji_code)
          if (options) {
            options.forEach(option => 
              rules
              .push( 
                this.constructRule(option, options, subs)
              )
            )
          }
        } else if (
           sub.type && 
           sub.type == 'new_option'
          ) {
          rules
          .push(
            this.constructRule(sub.option, options, subs)
          )
        }
      })
      
      return { 
        className,
        emoji_code, 
        rules 
      }
      
    },

    constructRule(option, options, subs) {
      const
        text   = option,
        votes  = subs.filter(s => (
          s.type == 'vote' &&
          s.key.replace('canned,', '') == options.indexOf(option)
        )),
        weight = 
          votes.length > 0 
          ? 
            votes
            .map(s => s.vote)
            .reduce((a,b) => a + b) 
          : 
            0 
      return { 
        text, 
        weight 
      }
    },

    toEmojiCode: (emoji) =>
      emoji.replace(/\p{Emoji}/gu, (m) => m.codePointAt(0).toString(16)),

    // minimal validation. rules have to contain a colon and semicolon
    validateRule: (rule) => { 
      return rule.text.match(/.+:.+;/gm);
    },
  },
};
</script>

<style>
:root {
  --back: white;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  background: var(--back);
}

#app {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 11pt;

  /* flex-direction: column; */
}

header {
  position: relative;
  box-sizing: border-box;
  font-size: 9pt;
}

main {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

section {
  position: relative;
  box-sizing: border-box;
  margin-left: 1em;
  min-width: 500px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

section .title {
  font-weight: bold;
  position: sticky;
  top: 1em;
}
</style>

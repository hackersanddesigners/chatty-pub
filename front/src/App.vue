<template>
  <div 
    id="app" 
    :class="[
      stream,
      { mobile: isMobile }
    ]">
    <Styles />

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
import Styles from "./components/Rules/Styles.vue";

export default {
  name: "App",
  components: {
    Styles,
  },
  data() {
    return {
      api: api,
      zulipClient: null,
      stream: null,
    };
  },
  computed: {
    ...mapState(["isMobile", "pubStr", "currentStream"]),
  },
  created() {
    this.$store.commit("setMobile", this.checkIfMobile());
    window.addEventListener("resize", () => {
      this.$store.commit("setMobile", this.checkIfMobile());
    });

    this.getStreams();

    this.$router.afterEach((to) => {
      this.$store.commit("setCurStream", to.path.replace("/", ""))
      this.stream = to.path.replace("/", "")
      if (this.stream != "") {
        this.setUpDoc(this.stream);
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
        
      api.zulip.getMsgs(this.zulipClient, stream, "content").then((result) => {
        for (let m = 0; m < result.messages.length; m++) {
          const message = result.messages[m]
          this.$store.commit('addMessage', message)
        } 
      });

      api.zulip.getMsgs(this.zulipClient, stream, "rules").then((result) => {
        this.$store.commit("setRules", result.messages);
      });

      api.zulip.listen(this.zulipClient, this.eventHandler)
      
    },

    eventHandler(event) {
      console.log(event)
      switch (event.type) {
      
        case 'message':
          switch (event.message.subject) {
            case 'content':
              this.$store.commit('addMessage', event.message)
              break
            case 'rules':
              this.$store.commit('addRule', event.message)
              break
          }
          break
          
        case 'delete_message':
          this.$store.commit('deleteMessage', event.message_id)
          break
          
        case 'update_message':
          this.$store.commit('editMessage', {
            mid: event.message_id,
            content: event.content
          })
          break
          
        case 'reaction':
          this.$store.commit(`${event.op}Reaction`, {
            mid: event.message_id,
            reaction: {   
              emoji_code: event.emoji_code,
              emoji_name: event.emoji_name,
              reaction_type: event.reaction_type,
            }
          })
          break
          
        default:
        console.log("Event type unknown", event.type)
      }
    }
      
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

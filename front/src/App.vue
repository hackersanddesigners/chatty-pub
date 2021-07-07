<template>
  <div 
    id="app" 
    :class="[
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
      this.$store.commit("setTopics",    []);
      this.$store.commit("setRules",     []);
      this.$store.commit("setCurStream", to.path.replace("/", ""))
      if (this.currentStream != "") {
        this.setUpDoc(this.currentStream);
      }
    });
  },

  methods: {
    checkIfMobile: () => window.innerWidth < 700,

    getStreams() {
      api.zulip.init().then(client => {
        this.zulipClient = client
        api.zulip.getStreams(client).then(result => {
          this.$store.commit( 'setStreams', 
            result.streams
            .filter(s => s.name.startsWith(this.pubStr))
          )
        })
        api.zulip.listen(this.zulipClient, this.eventHandler)
      })
    },

    setUpDoc(stream) {
    
      api.zulip.getSubs(this.zulipClient).then(result => {
        if (
          !result.subscriptions
          .map(s => s.name)
          .includes(this.currentStream)
        ) {
          api.zulip.addSub(this.zulipClient, this.currentStream)
        }
      })
      
      api.zulip.getAllMsgs(this.zulipClient, stream).then((result) => {
        for (let m = 0; m < result.messages.length; m++) {
          const message = result.messages[m]
          if (message.subject == 'rules') {
            this.$store.commit('addRule', message)
          } else {
            this.$store.commit('addMessage', message)
          }
        } 
      });

    },

    eventHandler(event) {
      console.log(event)
      switch (event.type) {
      
        case 'message':
          if (event.message.subject == 'rules') {
            this.$store.commit('addRule', event.message)
          } else {
            this.$store.commit('addMessage', event.message)
          }
          break
          
        case 'delete_message':
          this.$store.commit('deleteMessage', {
            subject: event.topic, 
            mid: event.message_id
          })
          break
          
        case 'update_message':
          if (
            event.message_ids.length > 1 &&
            event.orig_subject
          ){
            this.$store.commit('updateTopic', { 
              orig_subject: event.orig_subject,
              subject: event.subject
            })
          } else {
            this.$store.commit('editMessage', {
              mid: event.message_id,
              content: event.rendered_content
            })
          }
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
  /* margin-left: 1em; */
  padding: 1em;
  min-width: 800px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background: lightgray;
}
section p {
  margin-bottom: 0;
  margin-top: 0;
}
@media print {
  /* .title { display: none; }  */
}
</style>

<template>
  <div id="app" :class="[{ mobile: isMobile }]">
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
    ...mapState(["isMobile", "pubStr", "currentStream", "streams"]),
  },
  created() {
    this.$store.commit("setMobile", this.checkIfMobile());
    window.addEventListener("resize", () => {
      this.$store.commit("setMobile", this.checkIfMobile());
    });

    this.$router.beforeEach(async () => {
      if (!this.zulipClient || this.streams.length == 0) {
        await this.getStreams()
      }
    })

    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        this.$store.commit("setTopics", []);
        this.$store.commit("setRules", []);
        this.$store.commit("setCurStream", {
          name: to.path.replace('/', '').replaceAll('_', ' '),
          slug: to.path.replace('/', '').replaceAll(' ', '_')
        });
        if (
          this.currentStream.slug != ""
         &&
          this.streams.find(s => 
          s.name == this.currentStream.name &&
          s.slug == this.currentStream.slug
         )
        ) {
          console.log('found stream')
          this.setUpDoc(this.currentStream);
        } else {
          console.log('stream does not exist')
        }
      }
    });
  },

  methods: {
    checkIfMobile: () => window.innerWidth < 700,

    getStreams() {
      return new Promise(resolve => {
        api.zulip.init().then(async client => {
          this.zulipClient = client;
          const streams = await api.zulip.getStreams(client)
          for (const stream of streams) {
            stream.slug = stream.name.replaceAll(' ', '_')
          }
          this.$store.commit(
            "setStreams",
            streams.filter((s) => (
              s.name.startsWith(this.pubStr) ||
              s.description.includes('_PUB_')
            )).sort((a, b) => 
              b.date_created - 
              a.date_created
            )
          );
          api.zulip.listen(this.zulipClient, this.eventHandler);
          resolve()
        });
      })
    },

    setUpDoc(stream) {
      api.zulip.getSubs(this.zulipClient).then((result) => {
        if (
          !result.subscriptions.map((s) => s.name).includes(this.currentStream.name)
        ) {
          api.zulip.addSub(this.zulipClient, this.currentStream.name);
        }
      });

      api.zulip.getAllMsgs(this.zulipClient, stream.name).then((result) => {
        console.log(result.messages.length)
        for (let m = 0; m < result.messages.length; m++) {
          const message = result.messages[m];
          if (message.subject == "rules") {
            this.$store.commit("addRule", message);
          } else {
            this.$store.commit("addMessage", message);
          }
        }
      });
    },

    eventHandler(event) {
      console.log('event:', event);
      switch (event.type) {
        case "message":
          if (event.message.display_recipient == this.currentStream.name) {
            switch (event.message.subject) {
              case "rules":
                this.$store.commit("addRule", event.message);
                break;
              default:
                this.$store.commit("addMessage", event.message);
                break;
            }
            break;
          } 
          break;
          
        case "delete_message":
          this.$store.commit("deleteMessage", event.message_id);
          break;

        case "update_message":
          this.$store.commit("editMessage", {
            mid: event.message_id,
            content: event.rendered_content,
          });
          break;

        case "reaction":
          this.$store.commit(`${event.op}Reaction`, {
            mid: event.message_id,
            reaction: {
              emoji_code: event.emoji_code,
              emoji_name: event.emoji_name,
              reaction_type: event.reaction_type,
            },
          });
          break;

        default:
          console.log("Event type unknown", event.type);
      }
    },
  },
};
</script>

<style>
:root {
  --back: white;
  --pink: rgb(255, 133, 218);
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
  /* min-width: 800px; */
  /* max-width: 800px; */
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  /* background: lightgray; */
}
section p {
  margin-bottom: 0;
  margin-top: 0;
}
@media print {
  .title {
    /* display: none; */
  }
}
</style>

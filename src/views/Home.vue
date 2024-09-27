<template>
  <div class="pane-wrapper" :class="classes">
    <button v-if="!show_ui" @click="toggle_ui(true)" class="float-btn ui">
      {{ show_ui ? "Hide" : "Show" }} UI
    </button>
    <splitpanes class="default-theme" @resized="resizer" ref="panes">
      <pane class="controls-pane" v-if="show_ui" :size="panel_sizes[0]" min-size="5">
        <Streams />
        <UiControls @print="print" @toggleTopic="only_current_topic = $event"
          @toggleMessageData="show_message_data = $event" @goDocs="$router.push({ path: 'docs' })" />
      </pane>
      <pane :size="panel_sizes[1]" :class="currentStream">
        <Content :print="!show_ui || expand_content" :show_message_data="show_message_data"
          :only_current_topic="only_current_topic" ref="content" />
      </pane>
      <pane v-if="show_ui" :size="panel_sizes[2]" min-size="15">
        <Rules />
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import Streams from "../components/Streams";
import Content from "../components/Content";
import Rules from "../components/Rules";
import UiControls from "../components/UIControls";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

export default {
  name: "Home",
  components: {
    Streams,
    Content,
    Rules,
    Splitpanes,
    Pane,
    UiControls,
  },
  data() {
    return {
      show_message_data: false,
      panel_sizes: { 0: 10, 1: 55, 2: 35 },
      init_panel_sizes: { 0: 10, 1: 55, 2: 35 },
      expand_content: false,
      only_current_topic: false,
    };
  },
  computed: {
    classes() {
      return this.show_ui ? "ui" : "print";
    },
    currentStream() {
      return this.$store.state.currentStream?.slug || "";
    },
    show_ui() {
      return this.getUIState();
    },
  },
  watch: {
    show_ui(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.toggle_ui(newVal);
      }
    }
  },
  methods: {
    resizer(panels) {
      if (!panels) return;
      for (let i = 0; i < panels.length; i++) {
        this.panel_sizes[i] = panels[i].size;
      }
    },
    print() {
      const prev = this.show_ui;
      this.toggle_ui(false);
      setTimeout(() => {
        window.print();
        if (prev) this.toggle_ui(true);
      }, 1000);
    },
    toggle_ui(state) {
      const newState = state !== undefined ? state : !this.show_ui;
      this.updateQueryParams(newState);
      if (newState === true) {
        setTimeout(() => {
          this.resetPanelSizes();
        }, 100);
      } else {
        this.init_panel_sizes = JSON.parse(JSON.stringify(this.panel_sizes));
      }
    },
    getUIState() {
      return this.$route.query.hui !== 'true';
    },
    updateQueryParams(showUI) {
      const query = {
        ...this.$route.query,
        hui: showUI ? 'false' : 'true',  // 'false' when UI is shown, 'true' when UI is hidden
      };
      this.$router.replace({
        query,
        hash: this.$route.hash  // Preserve the current hash
      }).catch(() => { });
    },
    resetPanelSizes() {
      this.panel_sizes = JSON.parse(JSON.stringify(this.init_panel_sizes));
    },
  },
};
</script>


<style>
#home {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
}

.controls-pane {
  background-color: #aaa;
}

.splitpanes--vertical .splitpanes__pane {
  overflow-y: scroll;
}

.splitpanes.default-theme .splitpanes__pane {
  background-color: unset;
}

.pane-wrapper {
  height: 100vh;
}

.print .pane-wrapper {
  height: auto;
}

.print .splitpanes__pane {
  overflow: initial;
}

.print .content iframe {
  width: 100%;
  height: 100%;
}

/* absolutely needed to make the page breaks work (next style) */
.print section {
  display: block !important;
}

.body {
  page-break-after: always;
}

.body img {
  max-width: 100%;
}

.float-btn {
  position: fixed;
  z-index: 1000;
}

@media print {
  .ui {
    display: none !important;
  }
}
</style>

<template>
  <div class="pane-wrapper" :class="classes">
    <button v-if="!show_ui" @click="toggle_ui" class="float-btn ui">
      {{ show_ui ? "Hide" : "Show" }} UI
    </button>
    <splitpanes class="default-theme" @resize="resizer">
      <pane
        class="controls-pane"
        v-if="show_ui"
        :size="panel_sizes[0]"
        min-size="5"
      >
        <Streams />
        <UiControls
          @toggleUI="toggle_ui"
          @print="print"
          @toggleTopic="only_current_topic = $event"
          @toggleMessageData="show_message_data = $event"
          @goDocs="$router.push({ path: 'docs' })"
        />
      </pane>
      <pane :size="panel_sizes[1]" :class="currentStream">
        <Content
          :print="!show_ui || expand_content"
          :show_message_data="show_message_data"
          :only_current_topic="only_current_topic"
          ref="content"
        />
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
      show_ui: true,
      show_message_data: false,
      panel_sizes: { 0: 10, 1: 55, 2: 35 },
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
    }
  },
  methods: {
    resizer(panels) {
      for (let i = 0; i < panels.length; i++) {
        this.panel_sizes[i] = panels[i].size;
      }
    },
    print() {
      let prev = this.show_ui;
      this.toggle_ui(null, false);
      setTimeout(() => {
        window.print();
        if (prev) this.toggle_ui(null, true);
      }, 1000);
    },
    toggle_ui(evt, state) {
      if (state !== undefined) this.show_ui = state;
      else this.show_ui = !this.show_ui;
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

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
        <div class="controls">
          <button @click="toggle_ui">{{ show_ui ? "Hide" : "Show" }} UI</button>
          <button @click="print">Print</button>
          <!-- <button @click="print_preview">Preview</button> -->
          <label for="msg-data"
            ><input
              type="checkbox"
              id="msg-data"
              value="1"
              v-model="show_message_data"
            />
            Show chat message data</label
          >
          <p class="notice">
            Regrettably support for
            <a href="https://caniuse.com/css-paged-media">@page</a> is very poor
            in most browsers. Use MS Edge, Opera or Google Chrome for best
            results when printing or creating PDFs.
          </p>
          <button @click="$router.push({ path: 'docs' })">Docs</button>
        </div>
      </pane>
      <pane :size="panel_sizes[1]" :class="currentStream">
        <Content
          :print="!show_ui || expand_content"
          :show_message_data="show_message_data"
          ref="content"
        />
      </pane>
      <pane v-if="show_ui" :size="panel_sizes[2]" min-size="15">
        <Rules />
      </pane>
      <!-- <pane v-if="show_ui" size="35" min-size="15"
        ><div ref="preview"></div>
      </pane> -->
    </splitpanes>
  </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/
import Streams from "../components/Streams";
import Content from "../components/Content";
import Rules from "../components/Rules";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { Previewer } from "pagedjs";

import { ref, onMounted } from "vue";

export default {
  name: "Home",
  components: {
    Streams,
    Content,
    Rules,
    Splitpanes,
    Pane,
  },
  setup() {
    const preview = ref(null);

    onMounted(() => {
      console.log("preview", preview.value); // <div>This is a root element</div>
    });
    return {
      preview,
    };
  },
  data: () => {
    return {
      show_ui: true,
      show_message_data: false,
      panel_sizes: { 0: 10, 1: 55, 2: 35 },
      expand_content: false,
    };
  },
  computed: {
    classes() {
      return this.show_ui ? "ui" : "print";
    },
    currentStream() {
      return this.$store.state.currentStream;
    },
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
    print_preview() {
      this.expand_content = true;
      let content = document.getElementById("content");
      let paged = new Previewer();
      paged
        .preview(content, ["path/to/css/file.css"], this.preview)
        .then((flow) => {
          console.log("Rendered", flow.total, "pages.");
        });
    },
    toggle_ui(evt, state) {
      if (state !== undefined) this.show_ui = state;
      else this.show_ui = !this.show_ui;
      this.$forceUpdate();
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

.controls {
  display: flex;
  flex-direction: column;
  padding: 1em;
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

.print .body {
  page-break-after: always;
  /* border-bottom: 3px dotted green; */
}
/* .print .body:first-of-type {
  page-break-after: always;
  border-bottom: 3px dotted yellow;
} */

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
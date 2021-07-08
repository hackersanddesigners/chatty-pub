<template>
  <div class="pane-wrapper" :class="classes">
    <button v-if="!show_ui" @click="toggle_ui" class="float-btn ui">
      {{ show_ui ? "Hide" : "Show" }} UI
    </button>
    <splitpanes class="default-theme">
      <pane v-if="show_ui" size="10" min-size="5">
        <Streams />
        <button @click="toggle_ui">{{ show_ui ? "Hide" : "Show" }} UI</button>
        <button @click="print">Print</button>
      </pane>
      <pane size="55">
        <Content :print="!show_ui" />
      </pane>
      <pane v-if="show_ui" size="35" min-size="15">
        <Rules />
      </pane>
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

export default {
  name: "Home",
  components: {
    Streams,
    Content,
    Rules,
    Splitpanes,
    Pane,
  },
  data: () => {
    return {
      show_ui: true,
    };
  },
  computed: {
    classes() {
      return this.show_ui ? "ui" : "print";
    },
  },
  methods: {
    print() {
      // let prev = this.show_ui;
      this.toggle_ui(null, false);
      setTimeout(() => {
        window.print();
        // if (prev) this.toggle_ui(null, true);
      }, 1000);
      let paged = new Previewer();
      console.log(paged);
      // let flow = paged
      //   .preview(DOMContent, ["path/to/css/file.css"], document.body)
      //   .then((flow) => {
      //     console.log("Rendered", flow.total, "pages.");
      //   });
      // console.log(flow);
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

.splitpanes--vertical .splitpanes__pane {
  overflow-y: scroll;
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
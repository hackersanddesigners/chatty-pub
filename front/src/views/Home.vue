<template>
  <splitpanes class="default-theme">
    <pane size="10" min-size="5">
      <Streams />
    </pane>
    <pane size="55">
      <Content />
    </pane>
    <pane size="35" min-size="15">
      <Rules />
    </pane>
    <!-- <pane>
      <iframe src="https://chat.hackersanddesigners.nl"></iframe>
    </pane> -->
  </splitpanes>
</template>

<script>
import Streams from "../components/Streams";
import Content from "../components/Content";
import Rules from "../components/Rules";
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

iframe {
  width: 100%;
  height: 100%;
}
</style>
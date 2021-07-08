<template>
  <div :class="['body', topic.title]">
    <h3 @click="desiresContent = !desiresContent" class="header">
      <span class="expandToggle" v-html="toggleSymbol"></span>
      <span>{{ topic.title }}</span>
    </h3>
    <div v-if="desiresContent || print">
      <span v-for="message in topic.messages" :key="message.id">
        <Message :message="message" :show_message_data="show_message_data" />
        <span>&nbsp;</span>
      </span>
    </div>

    <div style="float: none"><div style="page-break-after: always"></div></div>
  </div>
</template>

<script>
import Message from "./Message";

export default {
  name: "Chapter",
  components: {
    Message,
  },
  data() {
    return {
      desiresContent: false,
    };
  },
  props: ["topic", "print", "show_message_data"],
  computed: {
    toggleSymbol() {
      let r = "";
      if (!this.print) {
        r = this.desiresContent ? "▼ " : "► ";
      }
      return r;
    },
  },
};
</script>

<style scoped>
.header {
  cursor: pointer;
}
@media print {
  .title {
    display: none;
  }
}
</style>
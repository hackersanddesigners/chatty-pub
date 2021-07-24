<template>
  <div class="body">
    <h2 class="header">
      <span>{{ topic.title }}</span>
    </h2>
    <div>
      <template v-for="message in messagesToShow" :key="message.id">
        <Message :message="message" :show_message_data="show_message_data" />
        <!-- <span>&nbsp;</span> -->
      </template>
    </div>

    <!-- <div style="float: none"><div style="page-break-after: always"></div></div> -->
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
    return {};
  },
  props: ["topic", "show_message_data"],
  computed: {
    messagesToShow() {
      return this.topic.messages.filter((m) => !m.responseTo);
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
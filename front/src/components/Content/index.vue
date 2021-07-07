<template>
  <section :class="['content', currentStream]">
    <div
      v-for="topic in sortedTopics"
      :key="topic.title"
      :class="['body', topic.title]"
    >
      <h1>{{ topic.title }}</h1>
      <span v-for="message in topic.messages" :key="message.id">
        <Message :message="message" />
        <span>&nbsp;</span>
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Message from "./Message";

export default {
  name: "Content",
  components: {
    Message,
  },
  computed: {
    ...mapState(["rules", "currentStream"]),
    ...mapGetters(["sortedTopics"]),
  },
  methods: {},
};
</script>

<style scoped>
.content {
  /* max-width: 700px; */
  background: unset;
}
@media print {
  .title {
    display: none;
  }
}
</style>
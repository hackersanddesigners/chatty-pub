<template>
  <section id="content" :class="['content', currentStream]">
    <h1 class="title">{{ title }}</h1>
    <Chapter
      v-for="topic in sortedTopics"
      :key="topic.title"
      :topic="topic"
      :print="print"
      :show_message_data="show_message_data"
    />
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Chapter from "./Chapter.vue";

export default {
  name: "Content",
  components: {
    Chapter,
  },
  computed: {
    ...mapState(["currentStream", "streams"]),
    ...mapGetters(["sortedTopics"]),
    title() {
      return this.streams.find(s => s.name == this.currentStream) ? 
        this.currentStream.replace("pub-", "") : 'Stream  does not exist.'
    }
    
  },
  methods: {},
  props: ["print", "show_message_data"],
};
</script>

<style scoped>
.content {
  /* max-width: 700px; */
  background: unset;
}
@media print {
  .title {
    /* display: none; */
  }
}
</style>
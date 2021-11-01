<template>
  <section>
    <h1 class="title">{{ title }}</h1>
    <vue3-markdown-it
      class="description"
      :source="description"
      v-bind="$mdOpts"
    >
    </vue3-markdown-it>
    <Toc :sortedTopics="sortedTopics" />
    <Authors :authors="authors" />
    <Chapter
      v-for="topic in filteredTopics"
      :key="topic.title"
      :id="toValidID(topic.title)"
      :topic="topic"
      :print="print"
      :show_message_data="show_message_data"
    />
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Authors from "./Authors";
import Chapter from "./Chapter";
import Toc from "./Toc";

export default {
  name: "Content",
  components: {
    Chapter,
    Toc,
    Authors,
  },
  props: ["print", "show_message_data", "only_current_topic"],
  computed: {
    ...mapState(["currentStream", "streams"]),
    ...mapGetters(["sortedTopics"]),
    filteredTopics() {
      const hash = this.$route.hash.substr(1);
      if (!hash || !this.only_current_topic) return this.sortedTopics;
      const found =  this.sortedTopics.find((el) => {
        return this.toValidID(el.title) === hash;
      });
      return [found];
    },
    foundStream() {
      return this.streams.find((s) => s.name == this.currentStream.name);
    },
    title() {
      return this.foundStream
        ? this.currentStream.name
        : this.$route.path == "/"
        ? "<= pick a stream"
        : "Stream  does not exist.";
    },
    description() {
      return (
        this.title &&
        this.foundStream &&
        this.foundStream.description.replace("_PUB_", "")
      );
    },
    authors() {
      return [
        ...new Set(
          this.title &&
            this.foundStream &&
            this.sortedTopics
              .map((t) => t.messages)
              .flat()
              .map((m) => m.sender_full_name)
        ),
        ...["Pub Bot"],
      ];
    },
  },
  methods: {
    toValidID(string) {
      return encodeURIComponent("ch-" + string)
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, "")
        .replace(/\(|\)/gi, "");
    },
  },
};
</script>

<style scoped>
</style>

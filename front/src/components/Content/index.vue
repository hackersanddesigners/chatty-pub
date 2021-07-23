<template>
  <section>
    <h1 class="title">{{ title }}</h1>
    <vue3-markdown-it 
      class="description"
      :source="description"
      v-bind="$mdOpts" 
    >
    </vue3-markdown-it>
    <ul class="index">
      <li v-for="topic in sortedTopics" :key="topic.title">
        <router-link
          :to="`#${toValidID(topic.title)}`"
          @click.stop="goTo(`#${toValidID(topic.title)}`)"
        >
          {{ topic.title }}
        </router-link>
      </li>
    </ul>
    <p class="authors">
      <span 
        class="author"
        v-for="author in authors"
        :key="author"
      >
        <span>{{ author }}</span>
        <span v-if="isLast(author, authors)">.</span>
        <span v-else-if="isBeforeLast(author, authors)"> and </span>
        <span v-else>, </span>
      </span>
    </p>
    <Chapter
      v-for="topic in sortedTopics"
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
import Chapter from "./Chapter.vue";

export default {
  name: "Content",
  components: {
    Chapter,
  },
  props: ["print", "show_message_data"],
  computed: {
    ...mapState(["currentStream", "streams"]),
    ...mapGetters(["sortedTopics"]),
    
    foundStream() {
      return this.streams.find((s) => s.name == this.currentStream.name)
    },
    title() {
      return this.foundStream 
        ? this.currentStream.name
        : this.$route.path == '/'
        ? "<= pick a stream" 
        : "Stream  does not exist.";
    },
    description() {
      return this.title && 
      this.foundStream &&
      this.foundStream.description.replace('_PUB_', '')
    },
    authors() {
      return [
        ...new Set(
          this.title &&
          this.foundStream &&
          this.sortedTopics
          .map(t => t.messages)
          .flat()
          .map(m => m.sender_full_name)
        ),
        ...[ 'Pub Bot' ]
      ]
    }
  },
  methods: {
    toValidID(string) {
      return encodeURIComponent("ch-" + string)
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, "");
    },
    goTo(id) {
      document.querySelector(`${id}`).scrollIntoView({
        behavior: "smooth",
      });
    },
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    isBeforeLast: (item, array) => (
      array.indexOf(item) === array.length - 2
    ),
  },
};
</script>

<style scoped>
.authors {
  page-break-after: always;
}
</style>
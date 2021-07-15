<template>
  <section>
    <h1 class="title">{{ title }}</h1>
    <ul>
      <li
        v-for="topic in sortedTopics"
        :key="topic.title"
      >
        <router-link 
          :to="`#${toValidID(topic.title)}`"
          @click.stop="goTo(`#${toValidID(topic.title)}`)" 
        >
          {{ topic.title }}
        </router-link>
      </li>
    </ul>
    <div style="float: none"><div style="page-break-after: always"></div></div>
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
    title() {
      return this.streams.find(s => s.name == this.currentStream) ? 
        this.currentStream.replace("pub-", "") : 'Stream  does not exist.'
    }
    
  },
  methods: {
    toValidID(string) { return (
      encodeURIComponent('ch-' + string)
      .toLowerCase()
      .replace(/\.|%[0-9a-z]{2}/gi, '')
    )},
    goTo(id) {
      document.querySelector(`.${this.currentStream} ${id}`).scrollIntoView()
    }
  },
};
</script>

<style scoped>
@media print {
  .title {
    /* display: none; */
  }
}
</style>
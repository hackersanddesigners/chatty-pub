<template>
  <section class="streams">
    <Stream 
      v-for="stream in streams" 
      :key="stream.id" 
      :stream="stream" 
      :isSelected="currentStream.name == stream.name"
    />
  </section>
</template>

<script>
import { mapState } from "vuex";
import Stream from "./Stream";

export default {
  name: "Streams",
  components: {
    Stream,
  },
  computed: {
    ...mapState([
      "streams",
      "currentStream"
    ]),
  },
};
</script>

<style scoped>
.streams {
  min-width: 10em;
  padding: 0;
  margin-bottom: 1em;
}
</style>

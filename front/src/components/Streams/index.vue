<template>
  <section class="streams">
    <p class="title">{{ $.type.name }}</p>
    <Stream
      v-for="stream in streams"
      :key="stream.id"
      :stream="stream"
    />
  </section>   
</template>

<script>
import { mapState } from 'vuex'
import Stream from './Stream'

export default {
  name: 'Streams',
  components: { 
    Stream 
  },
  computed: {
    ...mapState([
      'streams',
    ])
  }
}
</script>

<style scoped>
.streams {
  min-width: 10em;
}
@media print {
  .streams { display: none; } 
}
</style>
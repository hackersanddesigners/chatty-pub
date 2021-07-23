<template>
  <div :class="{ selected: selected }">
    <p class="name">
      <router-link :to="stream.slug">
        {{ stream.name }}
      </router-link>
    </p>
    <!-- <p class="desc">{{ stream.description }}</p> -->
  </div>  
</template>

<script>
export default {
  name: 'Stream',
  props: [ 
    'stream'
  ],
  computed: {
    selected() { return this.$store.state.currentStream == this.stream.name }
  },
}
</script>

<style scoped>
div {
  padding: 0.5em;
}
div .selected {
  background: rgb(247, 146, 247);
}
div p {
  margin: 0;
}


</style>
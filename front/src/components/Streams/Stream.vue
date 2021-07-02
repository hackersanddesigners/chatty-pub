<template>
  <div>
    <p class="name">
      <router-link :to="stream.name">
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
  },
}
</script>

<style scoped>
div {
}
div p {
  margin: 0;
}

</style>
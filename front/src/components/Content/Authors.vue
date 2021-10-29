<template>
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
</template>

<script>
export default {
  name: 'Authors',
  props: [ 'authors' ],
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    isBeforeLast: (item, array) => (
      array.indexOf(item) === array.length - 2
    ),
  }
}
</script>

<style scoped>
.authors {
  page-break-after: always;
}
</style>

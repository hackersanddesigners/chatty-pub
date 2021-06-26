<template>
  <div class="semanticList body">
    <span :class="name + 's'">
      <!-- <span v-if="title"> {{ title }} </span> -->
      <span
        :class="name"
        v-for="item in list"
        :key="item.hash"
      >
        <a
          :href="`${$apiURL}/${item.url}`"
          target="_blank"
          class="name"
        >{{ item.name }}</a>
        <span v-if="title && isLast(item, list)">. </span>
        <span v-else-if="isBeforeLast(item, list)"> and </span>
        <span v-else-if="title">, </span>
        <span v-else-if="!title && isLast(item, list)"> </span>
        <span v-else  >, </span>
      </span>
    </span>
  </div>
</template>
<script>

export default {
  name: 'SemanticList',
  props: [
    'list',
    'name',
    'collection'
  ],
  computed: {
    title() {
      return (
        this.name   
      )
    },
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
    ),
    isBeforeLast: (item, array) => (
      array.indexOf(item) === array.length - 2
    ),
    alphabetical: array => (
      array.sort((a, b) => a.Name.length - b.Name.length)
    ),
  }
}
</script>

<style>
.semanticList {
  font-size: inherit;
}
a,
a:visited,
a:active,
a:hover {
  /* color: unset; */
  /* text-decoration: none; */
}
</style>
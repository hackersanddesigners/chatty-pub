<template>
  <div class="taglist body">
    <span
      v-for="item in list"
      :key="item.slug"
    >
      <router-link 
        :to="{
          path: collection,
          query: { tag: item.slug }
        }"
      >
        {{ item.Name }}
      </router-link>
      <span v-if="!isLast(item, list)">, </span>
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
  },
  methods: {
    isLast: (item, array) => (
      array.indexOf(item) === array.length - 1
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
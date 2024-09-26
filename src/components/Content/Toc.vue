<template>
  <ul 
    class="index"
    :style="{ '--top': top+'px' }"
  >
    <li v-for="topic in sortedTopics" :key="topic.title">
      <router-link
        :to="{ hash: `#${toValidID(topic.title)}`, query: $route.query }"
        @click.stop="goTo(`#${toValidID(topic.title)}`)"
      >
        {{ topic.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'Cover',
  props: [ "sortedTopics", "top" ],
  methods: {
    toValidID(string) {
      return encodeURIComponent("ch-" + string)
        .toLowerCase()
        .replace(/\.|%[0-9a-z]{2}/gi, "")
        .replace(/\(|\)/gi, "");
    },
    goTo(id) {
      document.querySelector(`${id}`).scrollIntoView({
        behavior: "smooth",
      });
    },
    

  }

}
</script>

<style scoped>
.index {
}
.li.selected .index {
  position: fixed;
  background: white;
  margin: 0;
  padding: 0;
  top: calc( var(--top) + 0%);
  left: 10%;
  z-index: 1;
  width: auto;
  box-shadow: 0 0 2em 0em var(--pink);
  max-height: 0;
  transition: all 0.1s ease;
  overflow: scroll;
}
.li.selected .index li {
  list-style: none;
  margin: 0;
  padding: 0.5em;
}
.li.selected .index li a {
  max-width: 16em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.li.selected .index li:hover {
  background: var(--pink);
}
.li.selected:hover .index {
  max-height: 40em;
  transition: all 0.1s ease;
}
@media print {
  .index li a::after { 
    /* content: target-counter(attr(href), page);  */
    display: block;
    content: leader('.') target-counter(attr(href url), page, lower-roman); 
  }
}
@page {
  @bottom-left {
    content: counter(page) ' of ' counter(pages);
  }
}
</style>

/* eslint-disable */

<template>
  <div class="docs markdown-body">
    <ul>
      <li><router-link to="/">Back to Chattypub</router-link></li>
      <li v-for="(file, key) in files" :key="key">
        <router-link :to="`/docs/${key}`">
          {{ key }}
        </router-link>
      </li>
    </ul>
    <div v-if="$route.params.slug">
      <vue3-markdown-it 
        :source="source" 
        :html="true" 
        v-bind="$mdOpts" 
      />
    </div>
  </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/
import css from "../../docs/CSS.md";
import workshop from "../../docs/Workshop.md";
import chattypub from "../../docs/Chattypub.md";
import "github-markdown-css/github-markdown.css";

export default {
  name: "Docs",
  data() {
    return {
      files: { 
        Workshop: workshop, 
        Chattypub: chattypub, 
        CSS: css 
      },
    };
  },
  computed: {
    source() {
      return this.files[this.$route.params.slug];
    },
  },
  mounted() {
    setTimeout(() => { 
      if (this.source && this.$route.hash) {
        document
        .querySelector(this.$route.hash)
        .scrollIntoView({
          behavior: "smooth",
        })
      }
      // this.handleLinks()
    }, 100)
  },
  methods: {
    getFileName(url, includeExtension) {
      var matches =
        url &&
        typeof url.match === "function" &&
        url.match(/\/?([^/.]*)\.?([^/]*)$/);
      if (!matches) return null;

      if (includeExtension && matches.length > 2 && matches[2]) {
        return matches.slice(1).join(".");
      }
      return matches[1];
    },
    handleLinks() {
      Array.from(document.querySelectorAll('a'))
      .forEach(a => {
        a.addEventListener('click', e => {
          if (a.pathname.startsWith('/docs/')) {
            console.log(a)
            this.$router.push(a.pathname)
            e.preventDefault()
            document.scroll({top: 0})
          }
        })
      })
    }
  },
};
</script>

<style scoped>
.docs {
  padding: 1em;
  max-width: 800px;
  width: 100%;
  margin: 1em auto;
}
</style>
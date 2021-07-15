/* eslint-disable */

<template>
  <div class="docs markdown-body">
    <ul>
      <li><router-link to="/">Back to Chattypub</router-link></li>
      <li v-for="(file, key) in files" :key="key">
        <a :href="'#' + key" @click="select(key)">{{ key }}</a>
      </li>
    </ul>
    <div v-if="selected">
      <vue3-markdown-it
        :source="source"
        :html="true"
        @click.capture="clickEvent"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdownIt from "vue3-markdown-it";
/*eslint no-unused-vars: "off"*/
/*eslint no-undef: "off"*/

// VueMarkdownIt.use();
import css from "../../docs/CSS.md";
import workshop from "../../docs/Workshop.md";
import chattypub from "../../docs/Chattypub.md";
import "github-markdown-css/github-markdown.css";

export default {
  name: "Docs",
  components: [VueMarkdownIt],
  data() {
    return {
      files: { Workshop: workshop, Chattypub: chattypub, CSS: css },
      selected: "",
    };
  },
  computed: {
    source() {
      return this.files[this.selected];
    },
  },
  methods: {
    select(key) {
      this.selected = key;
    },
    clickEvent(evt) {
      console.log(evt);
      let regex = new RegExp("[^.]+$");
      let url = evt.explicitOriginalTarget.href;
      let extension = url.match(regex);
      if (extension.includes("md")) {
        let filename = this.getFileName(url);
        if (filename in this.files) {
          this.selected = filename;
          evt.preventDefault();
        }
      }
      return false;
    },
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
  },
};
</script>

<style>
.docs {
  padding: 1em;
}
</style>
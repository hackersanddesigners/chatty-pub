<template>
  <!-- <span>
    <vue3-markdown-it 
      :source="rawJSON"
      inline
    ></vue3-markdown-it>
  </span>   -->
  <code class="rule">
    <p>{{ rule.className }} {</p>
    <p
      v-for="dec in rule.rules"
      :key="dec.text"
    > &nbsp; {{ dec.text }}</p>
    <p>}</p>
  </code>
</template>

<script>
export default {
  name: 'Rule',
  props: [ 
    'rule'
  ],
  computed: {
    rawJSON() {
      return '```json\n' + JSON.stringify(this.rule, null, 2) + '\n```'
    },
  }
}
</script>

<style>

.rule p {
  margin: 0;
}

</style>
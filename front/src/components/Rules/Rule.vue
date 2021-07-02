<template>
  <!-- <span>
    <vue3-markdown-it 
      :source="rawJSON"
      inline
    ></vue3-markdown-it>
  </span>   -->
  <code 
    class="rule"
    :class="rule.emoji_code"  
  >
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

<style scoped>

.rule {
  margin: 1em 0;
}

.rule p {
  margin: 0;
}

</style>
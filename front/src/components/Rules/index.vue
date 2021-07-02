<template>
  <section class="rules">
    <p class="title">{{ $.type.name }}</p>
    <Rule
      v-for="rule in rules"
      :key="rule.id"
      :rule="rule"
    />
  </section>   
</template>

<script>
import { mapState } from 'vuex'
import Rule from './Rule'

export default {
  name: 'Rules',
  components: { 
    Rule 
  },
  computed: {
    ...mapState([
      'rules',
    ])
  },
  watch: {
    rules() {
      console.log('rules')
    }
  }
}
</script>

<style scoped>
.rules {
  max-width: unset;
}

@media print {
  .rules { display: none; } 
}
</style>
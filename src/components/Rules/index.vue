<template>
  <section class="rules">
    <!-- <label style="display:none"><input type="checkbox" name="" id="" 
      v-model="boring_rules" >Unstyled rules</label> -->
    <Rule v-for="rule in rules" :key="rule.id" :rule="rule" :boring="plainCSS" />
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
    ]),
    plainCSS() {
      return this.getCSSState();
    },
  },
  // data: () => {
  //   return {
  //     boring_rules: false,
  //   };
  // },
  watch: {
    rules() {
      console.log('rules')
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    // handleKeydown(event) {
    //   if (event.key === 'P') {
    //     this.boring_rules = !this.boring_rules;
    //   }
    // },
    getCSSState() {
      return this.$route.query.css !== 'false';
    },
  }
}
</script>

<style scoped>
.rules {
  max-width: unset;
}

@media print {
  .rules {
    display: none;
  }
}
</style>

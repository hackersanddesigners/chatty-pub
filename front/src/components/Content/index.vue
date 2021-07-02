<template>
  <section class="content">
    <p class="title">{{ $.type.name }}</p>
    <div class="body">
      <span
        v-for="message in contents"
        :key="message.id"
      >
      <Message
        :message="message"
      />
      <span>&nbsp;</span>
      </span>
    </div>
  </section>   
</template>

<script>
import { mapState } from 'vuex'
import Message from './Message'

export default {
  name: 'Content',
  components: { 
    Message,
  },
  computed: {
    ...mapState([
      'contents',
      'rules'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
section {
  max-width: 700px;
}
</style>
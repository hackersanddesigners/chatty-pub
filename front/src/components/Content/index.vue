<template>
  <section class="content">
    <p class="title">{{ $.type.name }}</p>
    <div 
      class="body"
      :class="currentStream"
    >
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
      'rules',
      'currentStream'
    ])
  },
  methods: {
  }
}
</script>

<style scoped>
.content {
  max-width: 700px;
  background: unset;
}
@media print {
  .title { display: none; } 
}
</style>
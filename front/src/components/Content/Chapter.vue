<template>
  <div :class="[ 'body', topic.title ]">    
    <h3
      @click="desiresContent = !desiresContent"
      class="header"
    >
      <span class="expandToggle">{{ desiresContent ? '▼ ' : '► '}}</span>
      <span>{{ topic.title }}</span>
    </h3> 
    <div v-if="desiresContent">
      <span
        v-for="message in topic.messages"
        :key="message.id"
      >
      <Message
        :message="message"
      />
      <span>&nbsp;</span>
      </span>
    </div>
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: 'Chapter',
  components: { 
    Message,
  },
  data() {
    return {
      desiresContent: false,
    }
  },
  props: [
    'topic',
  ],
}
</script>

<style scoped>
.header {
  cursor: pointer;
}
@media print {
  .title { display: none; } 
}
</style>
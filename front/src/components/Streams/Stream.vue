<template>
  <div :class="['li', { selected: isSelected }]">
    <p class="name">
      <router-link :to="stream.slug">
        {{ stream.name }}
      </router-link>
    </p>
    <Toc 
      v-if="isSelected"
      :sortedTopics="sortedTopics"
      :top="top"
    />
    <!-- <p class="desc">{{ stream.description }}</p> -->
  </div>  
</template>

<script>
import Toc from '../Content/Toc'
import { mapGetters } from 'vuex'

export default {
  name: 'Stream',
  components: { Toc },
  props: [ 
    'stream', 
    'isSelected',
  ],
  data() {
    return {
      top: Number,
    }
  },
  computed: {
    ...mapGetters([
      "sortedTopics"
    ]),
  },
  mounted() {
    this.top = this.$el.offsetTop
  }
}
</script>

<style scoped>
.li {
  position: relative;
  padding: 0.5em;
}
.li.selected {
  background: var(--pink);
}
.li p {
  margin: 0;
}
.li p a {
  max-width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}



</style>

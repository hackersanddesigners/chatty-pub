<template>
  <div id="home">
    <Streams />
    <Content />
    <Rules />
  </div>
</template>

<script>
import Streams from '../components/Streams'
import Content from '../components/Content'
import Rules   from '../components/Rules'

export default {
  name: 'Home',
  components: {
    Streams,
    Content,
    Rules,
  },
}
</script>

<style>

#home {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  
}

</style>
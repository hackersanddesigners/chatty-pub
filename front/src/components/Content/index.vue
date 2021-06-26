<template>
  <section class="content">
    <p class="title">{{ $.type.name }}</p>
     <!-- <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a5"
        pdf-orientation="portrait"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="body"
    > -->
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
     <!-- </vue-html2pdf> -->
  </section>   
</template>

<script>
import { mapState } from 'vuex'
// import VueHtml2pdf from 'vue-html2pdf'
import Message from './Message'

export default {
  name: 'Content',
  components: { 
    Message,
    // VueHtml2psdf
  },
  computed: {
    ...mapState([
      'contents',
      'rules'
    ])
  },
  methods: {
    toPDF() {
      this.$refs.body.generatePdf()
    }
  }
}
</script>

<style scoped>
section {
  max-width: 700px;
}
</style>
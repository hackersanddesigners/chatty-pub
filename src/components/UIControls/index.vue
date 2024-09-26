<template>
  <div class="controls">
    <label for="toggleUI">
      <input type="checkbox" id="toggleUI" v-model="localShowUI" @change="handleToggleUI" />
      Show/Hide UI
    </label>

    <label for="toggleTopic">
      <input type="checkbox" id="toggleTopic" v-model="localOnlyCurrentTopic" @change="handleToggleTopic" />
      Display only current topic
    </label>

    <label for="msg-data">
      <input type="checkbox" id="msg-data" v-model="localShowMessageData" @change="handleToggleMessageData" />
      Show chat message data
    </label>

    <button @click="$emit('print')">Print</button>
    <p class="notice">
      Regrettably, support for setting page size, page breaks etc. using
      <a href="https://caniuse.com/css-paged-media">@page</a> is very poor
      in most browsers. Use MS Edge, Opera or Google Chrome for best
      results when printing or creating PDFs.
    </p>
    <button @click="$emit('goDocs')">Docs</button>
  </div>
</template>

<script>
export default {
  name: "UiControls",
  props: {
    showUI: Boolean,
    onlyCurrentTopic: Boolean,
    showMessageData: Boolean,
  },
  data() {
    return {
      localShowUI: this.showUI,
      localOnlyCurrentTopic: this.onlyCurrentTopic,
      localShowMessageData: this.showMessageData,
    };
  },
  mounted() {
    this.initializeFromQueryParams();
  },
  methods: {
    getQueryParam(param) {
      return this.$route.query[param];
    },
    initializeFromQueryParams() {
      // const queryShowUI = this.getQueryParam('showUI') === 'true';
      const queryOnlyCurrentTopic = this.getQueryParam('top') === 'true';
      const queryShowMessageData = this.getQueryParam('dat') === 'true';

      // Stel lokale state in op basis van de URL-query parameters
      if (this.getQueryParam('ui') !== undefined) {
        // this.localShowUI = queryShowUI;
        // this.$emit('toggleUI', this.localShowUI);
      }
      if (this.getQueryParam('top') !== undefined) {
        this.localOnlyCurrentTopic = queryOnlyCurrentTopic;
        this.$emit('toggleTopic', this.localOnlyCurrentTopic);
      }
      if (this.getQueryParam('dat') !== undefined) {
        this.localShowMessageData = queryShowMessageData;
        this.$emit('toggleMessageData', this.localShowMessageData);
      }
    },
    updateQueryParams() {
      const query = {
        ...this.$route.query,
        ui: this.localShowUI,
        top: this.localOnlyCurrentTopic,
        dat: this.localShowMessageData,
      };

      this.$router.replace({
        path: this.$route.path, 
        query,                  
        hash: this.$route.hash
      });
    },
    handleToggleUI() {
      this.$emit('toggleUI', this.localShowUI);
      this.updateQueryParams();
    },
    handleToggleTopic() {
      this.$emit('toggleTopic', this.localOnlyCurrentTopic);
      this.updateQueryParams();
    },
    handleToggleMessageData() {
      this.$emit('toggleMessageData', this.localShowMessageData);
      this.updateQueryParams();
    }
  },
  watch: {
    showUI(newVal) {
      this.localShowUI = newVal;
    },
    onlyCurrentTopic(newVal) {
      this.localOnlyCurrentTopic = newVal;
    },
    showMessageData(newVal) {
      this.localShowMessageData = newVal;
    }
  }
};
</script>


<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
</style>

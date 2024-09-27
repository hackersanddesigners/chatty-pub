<template>
  <div class="controls">

    <label for="toggleTopic">
      <input type="checkbox" id="toggleTopic" v-model="localOnlyCurrentTopic" @change="handleToggleTopic" />
      Display only current topic
    </label>

    <label for="msgData">
      <input type="checkbox" id="msgData" v-model="localShowMessageData" @change="handleToggleMessageData"
        title="Show message sender, date time and reactions" />
      Show message data
    </label>

    <label for="plaintext">
      <input type="checkbox" id="plaintext" v-model="localPlainTextCSS" @change="handlePlaintextCSS"
        title="Enable/disable applying the CSS to the styles itself" />
      Plaintext CSS
    </label>

    <button @click="handleToggleUI">
      {{ localHideUI ? "Show" : "Hide" }} UI
    </button>

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
    plaintextCSS: Boolean,
  },
  data() {
    return {
      localHideUI: this.showUI,
      localOnlyCurrentTopic: this.onlyCurrentTopic,
      localShowMessageData: this.showMessageData,
      localPlainTextCSS: this.plaintextCSS !== undefined ? this.plaintextCSS : false,  // Default to false if not provided
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
      const queryHideUI = this.getQueryParam('hui') === 'true';
      const queryOnlyCurrentTopic = this.getQueryParam('top') === 'true';
      const queryShowMessageData = this.getQueryParam('dat') === 'true';
      const queryPlaintextCSS = this.getQueryParam('css') === 'true';

      if (this.getQueryParam('hui') !== undefined) {
        this.localHideUI = queryHideUI;
      }
      if (this.getQueryParam('top') !== undefined) {
        this.localOnlyCurrentTopic = queryOnlyCurrentTopic;
        this.$emit('toggleTopic', this.localOnlyCurrentTopic);
      }
      if (this.getQueryParam('dat') !== undefined) {
        this.localShowMessageData = queryShowMessageData;
        this.$emit('toggleMessageData', this.localShowMessageData);
      }
      if (this.getQueryParam('css') !== undefined) {
        this.localPlainTextCSS = queryPlaintextCSS;
        this.$emit('togglePlaintextCSS', this.localPlainTextCSS);  // Sync the CSS state
      }
    },
    updateQueryParams(paramsToUpdate) {
      const query = {
        ...this.$route.query,
        ...paramsToUpdate,  // Update only the relevant parameters
      };

      this.$router.replace({
        path: this.$route.path,
        query,
        hash: this.$route.hash,
      });
    },
    handleToggleUI() {
      this.localHideUI = !this.localHideUI;
      this.$emit('toggleUI', !this.localHideUI);
      this.updateQueryParams({ hui: this.localHideUI ? 'true' : 'false' });  // Update the 'hui' parameter
    },
    handleToggleTopic() {
      this.$emit('toggleTopic', this.localOnlyCurrentTopic);
      this.updateQueryParams({ top: this.localOnlyCurrentTopic ? 'true' : 'false' });  // Update the 'top' parameter
    },
    handleToggleMessageData() {
      this.$emit('toggleMessageData', this.localShowMessageData);
      this.updateQueryParams({ dat: this.localShowMessageData ? 'true' : 'false' });  // Update the 'dat' parameter
    },
    handlePlaintextCSS() {
      this.$emit('togglePlaintextCSS', this.localPlainTextCSS);
      this.updateQueryParams({ css: this.localPlainTextCSS ? 'true' : 'false' });  // Update the 'css' parameter
    },
  },
  watch: {
    // Watch for changes in props and sync local data
    showUI(newVal) {
      this.localHideUI = newVal;
    },
    onlyCurrentTopic(newVal) {
      this.localOnlyCurrentTopic = newVal;
    },
    showMessageData(newVal) {
      this.localShowMessageData = newVal;
    },
    plaintextCSS(newVal) {
      this.localPlainTextCSS = newVal;
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

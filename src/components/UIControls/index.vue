<template>
  <div class="controls">

    <label for="toggleTopic">
      <input type="checkbox" id="toggleTopic" v-model="localOnlyCurrentTopic" @change="handleToggleTopic" />
      Display only current topic
    </label>

    <label for="msgData">
      <input type="checkbox" id="msgData" v-model="localShowMessageData" @change="handleToggleMessageData" title="Show message sender, date time and reactions" />
      Show chat message data
    </label>

    <label for="plaintext">
      <input type="checkbox" id="plaintext" v-model="localPlainTextCSS" @change="handlePlaintextCSS" title="Enable/disable applying the CSS to the styles itself" />
      Plaintext CSS
    </label>

    <button @click="handleToggleUI">
      Hide UI
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
      localShowUI: this.showUI,
      localOnlyCurrentTopic: this.onlyCurrentTopic,
      localShowMessageData: this.showMessageData,
      localPlainTextCSS: this.plaintextCSS,
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
      const queryShowUI = this.getQueryParam('ui') === 'true'; // Use 'ui'
      const queryOnlyCurrentTopic = this.getQueryParam('top') === 'true';
      const queryShowMessageData = this.getQueryParam('dat') === 'true';
      const queryPlaintextCSS = this.getQueryParam('css') === 'true';

      if (this.getQueryParam('ui') !== undefined) {
        this.localShowUI = queryShowUI;
        this.$emit('toggleUI', this.localShowUI);
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
        this.$emit('togglePlaintextCSS', this.localPlainTextCSS);
      }
    },
    updateQueryParams() {
      const query = {
        ...this.$route.query,
        ui: this.localShowUI ? 'true' : 'false',  // Make sure 'ui' is properly set
        top: this.localOnlyCurrentTopic ? 'true' : 'false',
        dat: this.localShowMessageData ? 'true' : 'false',
        css: this.localPlainTextCSS ? 'true' : 'false',
      };

      this.$router.replace({
        path: this.$route.path,
        query,                  
        hash: this.$route.hash
      });
    },
    handleToggleUI() {
      this.localShowUI = !this.localShowUI;  // Toggle UI state
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
    },
    handlePlaintextCSS() {
      this.$emit('togglePlaintextCSS', this.localPlainTextCSS);
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

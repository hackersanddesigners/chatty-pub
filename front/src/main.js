import { createApp }  from 'vue'
import App            from './App'
import Axios          from 'axios'
import MarkdownIt     from 'markdown-it'
import VueMarkdownIt  from 'vue3-markdown-it'
import router         from './router'
import store          from './store'

import 'highlight.js/styles/vs.css';

const app    = createApp(App)

const mdOpts = {
  html        : true,
  linkify     : true,
  typographer : true
}

app.config.globalProperties.$http   = Axios
app.config.globalProperties.$mdOpts = mdOpts
app.config.globalProperties.$md     = new MarkdownIt(mdOpts)

app
  .use(VueMarkdownIt)
  .use(router)
  .use(store)
  .mount('#app')


  app.config.devtools = true

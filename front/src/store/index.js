import { createStore } from 'vuex'

export default createStore({

  strict: process.env.NODE_ENV !== 'production',

  state: {
    isMobile  : false,
    streams : [],
    contents : {},
    rules : [],
    pubStr: 'pub-',   
  },

  mutations: {
    setMobile    : (state, mobile)    => state.isMobile  = mobile,
    setStreams   : (state, streams)   => state.streams = streams,
    setContents  : (state, messages)  => state.contents = messages,
    setRules     : (state, messages)  => state.rules  = messages,
    selectTag    : (state, tag)       => state.selectedTag = tag,
  },

  actions: {
  },

  getters: {
    filteredResources: state => ( state
      .resources
      .filter(r => (
        r.tags.indexOf(state.selectedTag > -1)
      ))
    
    )
  }

})

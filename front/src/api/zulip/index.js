const 

  zulip   = require("zulip-js"),
  config  = {
    username : process.env.VUE_APP_ZULIP_email,
    apiKey   : process.env.VUE_APP_ZULIP_key,
    realm    : process.env.VUE_APP_ZULIP_site,
  },
  
  init    = () => ( new 
    Promise((resolve, reject) => {
      zulip(config)
      .then(client => resolve(client))
      .catch(error => reject(error))
    })
  ),
  
  getStreams = client => ( new
    Promise((resolve, reject) => {
     client
     .streams
     .retrieve()
      .then(result => resolve(result.streams))
      .catch(error => reject(error))
    })
  ),
  
  getUsers = client => ( new
    Promise((resolve, reject) => {
     client
     .users
     .retrieve()
      .then(result => resolve(result.members))
      .catch(error => reject(error))
    })
  ),
  
  getTopics = (client, stream) => ( new
    Promise((resolve, reject) => {
     client
     .streams
     .topics
     .retrieve({ stream_id: stream })
      .then(result => resolve(result.topics))
      .catch(error => reject(error))
    })
  ),
  
  getMsgs = (client, stream, topic, params) => ( new
    Promise((resolve, reject) => {
     client
     .messages
     .retrieve(params || {
        anchor: "newest",
        // num_before: 1000,
        num_before: 3000,
        num_after: 0,
        // apply_markdown: false,
        narrow: [
          { operator: "stream", operand: stream },
          { operator: "topic",  operand: topic },
        ],
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  getAllMsgs = (client, stream, params) => ( new
    Promise((resolve, reject) => {
     client
     .messages
     .retrieve(params || {
        anchor: "newest",
        // num_before: 1000,
        num_before: 3000,
        num_after: 0,
        // apply_markdown: false,
        narrow: [{ operator: "stream", operand: stream }],
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  listen = (client, cb) => {
    client
    .callOnEachEvent(
      event => cb(event), 
      [ 'message' ],
      [ { operator: "stream", operand: "chatty" } ]
    )
  },
  
  getSubs = client => ( new
    Promise((resolve, reject) => {
     client
     .streams
     .subscriptions
     .retrieve()
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  addSub = (client, stream) => ( new
    Promise((resolve, reject) => {
      client
      .users
      .me
      .subscriptions
      .add(
        {
          subscriptions: JSON.stringify([{ name: stream }]),
        }
      )
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  sendMsg = (client, params) => ( new
    Promise((resolve, reject) => {
      client
      .messages
      .send(params || {
        to: "chatty",
        type: "stream",
        topic: "content",
        content: "I come not, friends, to steal away your hearts.",
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  )

export default {
  init,
  config,
  getStreams,
  getUsers,
  getTopics,
  getMsgs,
  getAllMsgs,
  listen,
  sendMsg,
  getSubs,
  addSub,
}

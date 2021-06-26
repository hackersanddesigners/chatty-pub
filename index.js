const 
  zulip   = require("zulip-js"),
  config  = { zuliprc: "zuliprc" },
  
  init    = () => ( new 
    Promise((resolve, reject) => {
      zulip(config)
      .then(client => resolve(client))
      .catch(error => reject(error))
    })
  ),
  
  sendMsg = (client, params) => ( new
    Promise((resolve, reject) => {
      client.messages.send(params || {
        to: "chatty",
        type: "stream",
        topic: "content",
        content: "I come not, friends, to steal away your hearts.",
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  getMsgs = (client, params) => ( new
    Promise((resolve, reject) => {
     client.messages.retrieve(params || {
        anchor: "newest",
        num_before: 100,
        num_after: 0,
        narrow: [
          // { operator: "sender", operand: "karl@hackersanddesigners.nl" },
          { operator: "stream", operand: "chatty" },
          // { operator: "topic", operand: "rules" },
        ],
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  regNotif = (client, params) => ( new
    Promise((resolve, reject) => {
      client.queues.register(params || {
        event_types: ["message"],
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  ),
  
  getNotif = (client, params) => ( new
    Promise((resolve, reject) => {
      client.events.retrieve(params || {
        queue_id: '1624161658:64',
        last_event_id: -1,
        dont_block: true,
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
    })
  )

init().then(client => {
  // sendMsg(client).then(result => console.log(result))
  // getMsgs(client).then(result => {
    // console.log(result)
    // const messagesWithReactions = result
    //   .messages
    //   .filter(m => (
    //     m.reactions.length > 0
    //   ))
    // console.log(messagesWithReactions[0].reactions)
    // const messagesWithSubs = result
    //   .messages
    //   .filter(m => (
    //     m.submessages.length > 0
    //   ))
    // console.log(messagesWithSubs)
    // result.messages.forEach(m => 
      // console.log(m.submessages)
    // )
  // })
  // regNotif(client).then(result => {
  //   console.log(result)
  // })
  getNotif(client).then(result => {
    console.log(result)
  })
})

// (async () => {
//     const user_id = 9;
//     params = {
//         to: [user_id],
//         type: "private",
//         content: "With mirth and laughter let old wrinkles come.",
//     };
//     console.log(await client.messages.send(params));
// })();

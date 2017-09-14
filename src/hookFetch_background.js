/*
  fetch hooking code from https://github.com/spacemeowx2/DouyuHTML5Player/blob/b5a54240f1b31d53a8530af83444b10027fe6dca/src/background.js#L8
*/
function convertHeader(headers) {
  let out = {}
  for (let key of headers.keys()) {
    out[key] = headers.get(key)
  }
  return out
}
function Object2Headers(headers) {
  let out = new Headers()
  for (let key of Object.keys(headers)) {
    out.set(key, headers[key])
  }
  return out
}
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'fetch') {
    let response
    let reader
    port.onDisconnect.addListener(() => {
      reader && reader.cancel()
    })
    port.onMessage.addListener(msg => {
      let chain = Promise.resolve()
      if (msg.method === 'fetch') {
        if (msg.args[1].headers != undefined)
          msg.args[1].headers = Object2Headers(msg.args[1].headers);
        chain = chain.then(() => fetch.apply(null, msg.args)).then(r => {
          response = r
          return {
            bodyUsed: r.bodyUsed,
            ok: r.ok,
            status: r.status,
            statusText: r.statusText,
            type: r.type,
            url: r.url,
            headers: convertHeader(r.headers)
          }
        })
      } else if (msg.method === 'json') {
        chain = chain.then(() => response.json())
      } else if (msg.method === 'text') {
        chain = chain.then(() => response.text())
      } else if (msg.method === 'body.getReader') {
        chain = chain.then(() => {
          reader = response.body.getReader()
        })
      } else if (msg.method === 'reader.read') {
        chain = chain.then(() => reader.read()).then(r => {
          if (r.value != undefined)
            r.value = Array.from(r.value)
          return r
        })
      } else if (msg.method === 'reader.cancel') {
        chain = chain.then(() => reader.cancel())
      } else {
        port.disconnect()
        return
      }
      chain.then((...args) => {
        const outMsg = {
          method: msg.method,
          args: args
        }
        port.postMessage(outMsg)
      })
    })
  }
})

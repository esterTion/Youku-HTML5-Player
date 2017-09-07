/*
  Code Source: https://github.com/spacemeowx2/DouyuHTML5Player/blob/b5a54240f1b31d53a8530af83444b10027fe6dca/src/hookfetch.js
*/
if( isChrome && location.protocol=='https:' ){
  console.log('chrome+https环境，替换fetch');

(function () {
  let self = this;
  let originalFetch = self.fetch;
  const convertHeader = function convertHeader(headers) {
    let out = new Headers()
    for (let key of Object.keys(headers)) {
      out.set(key, headers[key])
    }
    return out
  }
	function Headers2Object (headers){
		let out = {},
		keys = headers.keys(),
    next;
		while((next = keys.next() )&& !next.done) {
			out[next.value] = headers.get(next.value);
		}
    return out;
	}
  const wrapPort = function wrapPort (port) {
    let curMethod = ''
    let curResolve = null
    let curReject = null
    port.onMessage.addListener(msg => {
      if (msg.method === curMethod) {
        if (msg.err) {
          curReject(msg.err)
        } else {
          curResolve.apply(null, msg.args)
        }
      } else {
        //console.error('wtf?')
      }
    })
    return function (method, args) {
      return new Promise((resolve, reject) => {
        curMethod = method
        curResolve = resolve
        curReject = reject
        port.postMessage({
          method: method,
          args: args
        })
      })
    }
  }
  const bgFetch = function bgFetch(...args) {
    if(args[0].startsWith('/') || args[0].startsWith('https://')){
      return originalFetch.apply(this, arguments);
    }
    const port = wrapPort(chrome.runtime.connect({name: "fetch"}))
    if(args[1].headers != undefined)
      args[1].headers = Headers2Object(args[1].headers);
    return port('fetch', args).then(r => {
      let hasReader = false
      const requireReader = function (after) {
        if (hasReader) {
          return Promise.resolve().then(after)
        } else {
          return port('body.getReader').then(() => hasReader = true).then(after)
        }
      }
      r.json = () => port('json')
      r.text = () => port('text')
      r.headers = convertHeader(r.headers)
      r.body = {
        getReader () {
          return {
            read () {
              return requireReader(() => port('reader.read')).then(r => {
                if(r.value!=undefined)
                	r.value = new Uint8Array(r.value)
                return r
              })
            },
            cancel () {
              return requireReader(() => port('reader.cancel'))
            }
          }
        }
      }
      return r
    })
  }
  const oldBlob = self.Blob
  const newBlob = function newBlob(a, b) {
    a[0] = `(${hookFetchCode})();${a[0]}`
    return new oldBlob(a, b)
  }
  if(self.document !== undefined) {
    if (self.Blob !== newBlob) {
      self.Blob = newBlob
    }
  }
  (function () {
    if (self.fetch !== bgFetch) {
      self.fetch = bgFetch
    }
  })();
})();
}
(function () {
    let isChrome = /chrome/i.test(navigator.userAgent);
    let firefoxVer = 0;
    if (!isChrome) {
        firefoxVer = (navigator.userAgent.match(/Firefox\/(\d+)/) || [, 0])[1];
    }
    function readStorage(name, cb) {
        if (!isChrome && firefoxVer < 53)
            //ff52-无sync
            chrome.storage.local.get(name, cb)
        else
            chrome.storage.sync.get(name, cb)
    }
    readStorage('official_html5', function (item) {
        item = Object.assign({ official_html5: false }, item);
        if (item.official_html5) {
            console.log('使用官方html5');
            if (location.href.match(/debug=html5/) == null) {
                history.replaceState({}, '', '?debug=html5');
            }
        } else if (!item.official_html5) {
            console.log('禁用官方html5');
            if (location.href.match(/debug=flv/) == null) {
                history.replaceState({}, '', '?debug=flv');
            }
        }
    })
})()
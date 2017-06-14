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
        if (item.official_html5 && !sessionStorage.P_l_h5) {
            sessionStorage.P_l_h5 = 1;
            console.log('开启官方html5');
        } else if (!item.official_html5 && sessionStorage.P_l_h5) {
            sessionStorage.removeItem('P_l_h5')
            console.log('关闭官方html5');
        }
    })
    setTimeout(function () {
        let script = document.createElement('script');
        script.appendChild(document.createTextNode("Object.defineProperty(navigator,'userAgent',{value:navigator.userAgent.replace(/mac/ig, '')})"));
        document.head.appendChild(script);
    }, 0);
})()
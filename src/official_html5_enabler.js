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
            //清除flash
            if (navigator.plugins["Shockwave Flash"]) {
                document.head.appendChild(document.createElement('script')).textContent='delete navigator.plugins["Shockwave Flash"]';
            }
        } else if (!item.official_html5) {
            console.log('禁用官方html5');
            //伪造https环境
            document.addEventListener('DOMContentLoaded', function () { document.head.appendChild(document.createElement('script')).textContent = 'PageConfig.transfer="https"'; });
            //伪造flash环境防止官方html5启用
            if (!navigator.plugins["Shockwave Flash"]) {
                document.head.appendChild(document.createElement('script')).textContent = 'navigator.plugins["Shockwave Flash"]=true';
            }
        }
    });
})();

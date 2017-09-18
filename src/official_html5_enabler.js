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
            if (location.href.match(/rand=[\w]+/) == null || location.href.match(/rand=[\w]+/)[0].slice(5) > 50) {
                let replace = location.href.replace(/rand=[\w]+/, '');
                replace += ((replace.indexOf('?') !== -1) ? '&' : '?') + 'rand=50';
                history.replaceState({}, '', replace);
            }
        } else if (!item.official_html5) {
            console.log('禁用官方html5');
            if (location.href.match(/rand=[\w]+/) == null || location.href.match(/rand=[\w]+/)[0].slice(5) <= 50) {
                let replace = location.href.replace(/rand=[\w]+/, '');
                replace += ((replace.indexOf('?') !== -1) ? '&' : '?') + 'rand=100';
                history.replaceState({}, '', replace);
            }
            //伪造flash环境防止官方html5启用
            if (!navigator.plugins["Shockwave Flash"]) {
                let script = document.createElement('script');
                script.textContent = 'navigator.plugins["Shockwave Flash"]=true';
                document.head.appendChild(script);
            }
        }
    });
})();

(function () {
    let domain = location.href.match(/:\/\/([^\/]+)/)[1],
        objID = 'object#movie_player, div#ykPlayer',
        chkInit = function () { chrome.runtime.sendMessage('', 'inject', {}, function () { }); };
    if (domain == 'player.youku.com')
        objID = 'object#youku-player';
    if (document.querySelector(objID) != null)
        chkInit();
    else {
        //player node not loaded, add an observer
        let observer = new MutationObserver(function () {
            if (document.querySelector(objID) != null) {
                observer.disconnect();
                chkInit();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
//强制中断html5初始化
readStorage(['official_html5'], function (item) {
    item = Object.assign({ official_html5: false }, item);
    if (!item.official_html5) {
        document.head.appendChild(_('script', {}, [_('text', '(' + function () {
            if (window.$) {
                var extend = $.extend;
                $.extend = function () {
                    var arg = arguments;
                    if (arg[1] && arg[1].vid && arg[1].ccode && arg[1].autoplay) {
                        throw "Violent break $.extend";
                    }
                    return extend.apply(this, arg);
                };
            }
            Object.defineProperty(window, 'YoukuPlayer', {
                get: function () {
                    return function (div) {
                        //外链创建播放器请求，创造伪object
                        div.appendChild(document.createElement('object')).id = 'youku-player';
                        throw "Violent break YoukuPlayer";
                    };
                },
                set: function () { },
                configurable: false
            });
        }.toString() + ')();')]));
    }
});

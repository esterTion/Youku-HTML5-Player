(function () {
    let domain = location.href.match(/:\/\/([^\/]+)/)[1],
        objID = 'object#movie_player',
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

chrome.runtime.onMessage.addListener(function (message, sender, resolve) {
    if (message != 'inject') return;
    let tabId = sender.tab.id,
        frameId = sender.frameId;
    injector(tabId, frameId, resolve);
    return true;
})

function injector(tabId, frameId, resolve) {
    let files = [
        "jquery-2.1.4.min.js",
        "google-style-loading.min.js",
        "CommentCoreLibrary.min.js",
        "biliplus_shield.min.js",
        "ABPlayer.min.js",
        "youku_html5.js"
    ],
        loopFunc = function () {
            if (!files.length) {
                resolve();
                return;
            }
            let file = files.shift();
            chrome.tabs.executeScript(
                tabId,
                {
                    allFrames: false,
                    file,
                    frameId,
                    runAt: 'document_end'
                },
                loopFunc
            )
        }
    loopFunc();
}
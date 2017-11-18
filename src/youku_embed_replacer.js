function embed_checker(i) {
    if (i.YHP_replacing)
        return;
    let ykvid = (i.src + '').match(/player\.youku\.com.+sid\/([a-zA-Z0-9\=]+)/);
    if (ykvid != null) {
        replacer(i, ykvid);
        return;
    }
    if (/static\.youku\.com.+loader\.swf/.test(i.src + '')) {
        ykvid = (i.getAttribute('flashvars') + '').match(/VideoIDS\=([a-zA-Z0-9\=]+)/);
        if (ykvid != null) {
            replacer(i, ykvid);
            return;
        }
    }
}
function object_checker(i) {
    if (i.YHP_replacing)
        return;
    let src = null;
    Array.from(i.childNodes).forEach(function (i) {
        if (i.name == 'movie')
            src = i
    });
    if (src == null) return;
    let ykvid = (src.value + '').match(/player\.youku\.com.+sid\/([a-zA-Z0-9\=]+)/);
    if (ykvid != null) {
        replacer(i, ykvid);
    }
}
function replacer(i, ykvid) {
    i.YHP_replacing = true;
    if (/^[\d]+$/.test(ykvid[1])) {
        ykvid[1] = 'X' + btoa(ykvid[1] * 4)
    }
    let ifr = _('iframe', {
        height: i.height || i.offsetHeight || 480,
        width: i.width || i.offsetWidth || 848,
        frameborder: 0,
        allowfullscreen: '',
        src: '//player.youku.com/embed/' + ykvid[1],
    });
    i.parentNode.insertBefore(ifr, i);
    i.remove();
}
function finder() {
    Array.from(document.getElementsByTagName('embed')).forEach(embed_checker);
    Array.from(document.getElementsByTagName('object')).forEach(object_checker);
}
readStorage('replace_embed', function (item) {
    item = Object.assign({ replace_embed: true }, item);
    if (item.replace_embed) {
        finder();
        let observer = new MutationObserver(finder);
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

let webFullState = false;
window.addEventListener('message', function (e) {
    if (['YHP_CrossFrame_Fullscreen_init', 'YHP_CrossFrame_Fullscreen_Enter', 'YHP_CrossFrame_Fullscreen_Exit'].indexOf(e.data) == -1) return;
    let srcFrame = Array.from(document.querySelectorAll('iframe')).find(function (i) {
        return i.contentWindow == e.source;
    });
    if (srcFrame == undefined) return;
    if (e.data == 'YHP_CrossFrame_Fullscreen_init') {
        let needReload = !srcFrame.allowFullscreen;
        srcFrame.setAttribute('allowfullscreen', 'true');
        if (needReload) {
            let src = srcFrame.src;
            srcFrame.src = 'about:blank';
            setTimeout(function () { srcFrame.src = src; });
        }
    } else if (e.data == 'YHP_CrossFrame_Fullscreen_Enter' && !webFullState) {
        webFullState = true;
        let origStat = {
            height: srcFrame.style.height || (srcFrame.offsetHeight + 'px'),
            width: srcFrame.style.width || (srcFrame.offsetWidth + 'px'),
            left: srcFrame.style.left,
            top: srcFrame.style.top,
            position: srcFrame.style.position,
            zIndex: srcFrame.style.zIndex
        };
        srcFrame.style.zIndex = 0xffffffff;
        srcFrame.style.height = '100%';
        srcFrame.style.width = '100%';
        srcFrame.style.position = 'fixed';
        srcFrame.style.left = '0';
        srcFrame.style.top = '0';
        srcFrame.YHP_origStat = origStat;
        let climb = srcFrame.parentNode;
        while (climb != document.body) {
            climb.YHP_origZIndex = climb.style.zIndex;
            climb.style.zIndex = 0xffffffff;
            climb = climb.parentNode;
        }
    } else if (e.data == 'YHP_CrossFrame_Fullscreen_Exit' && webFullState) {
        webFullState = false;
        let origStat = srcFrame.YHP_origStat;
        srcFrame.style.zIndex = origStat.zIndex;
        srcFrame.style.height = origStat.height;
        srcFrame.style.width = origStat.width;
        srcFrame.style.position = origStat.position;
        srcFrame.style.left = origStat.left;
        srcFrame.style.top = origStat.top;
        delete srcFrame.YHP_origStat;
        let climb = srcFrame.parentNode;
        while (climb != document.body) {
            if (climb.YHP_origZIndex != undefined)
                climb.style.zIndex = climb.YHP_origZIndex;
            climb = climb.parentNode;
        }
    }
    if (parent != window)
        parent.postMessage(e.data, '*');
});
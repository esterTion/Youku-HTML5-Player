function embed_checker(i) {
    if (i.YHP_replacing)
        return;
    let ykvid = (i.src + '').match(/player\.youku\.com.+sid\/([a-zA-Z0-9\=]+)\//);
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
    let src = i.querySelector('param[name=movie]');
    if (src == null) return;
    let ykvid = (src.value + '').match(/player\.youku\.com.+sid\/([a-zA-Z0-9\=]+)\//);
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
    Array.from(document.querySelectorAll('embed')).forEach(embed_checker);
    Array.from(document.querySelectorAll('object')).forEach(object_checker);
}
finder();
let observer = new MutationObserver(finder);
observer.observe(document.body, { childList: true, subtree: true });
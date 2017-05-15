function replacer(i) {
    if (i.YHP_replacing)
        return;
    let ykvid = (i.src + '').match(/player\.youku\.com.+sid\/([a-zA-Z0-9\=]+)\/v\.swf/);
    if (ykvid != null) {
        i.YHP_replacing = true;
        let ifr = document.createElement('iframe');
        ifr.height = i.offsetHeight;
        ifr.width = i.offsetWidth
        ifr.frameborder = 0;
        ifr.setAttribute('allowfullscreen','');
        ifr.src = '//player.youku.com/embed/' + ykvid[1];
        i.parentNode.insertBefore(ifr, i);
        i.remove();
    }
}
function finder() {
    let embed = Array.from(document.querySelectorAll('embed'));
    embed.forEach(replacer)
}
finder();
let observer = new MutationObserver(finder);
observer.observe(document.body, { childList: true, subtree: true });
(function () {
    let replace_embed = document.getElementById('replace_embed'),
        auto_switch = document.getElementById('auto_switch');

    replace_embed.appendChild(_('text', _t('replaceEmbed')));
    auto_switch.appendChild(_('text', _t('autoSwitch')));

    let click = function () {
        let set = {};
        set[this.parentNode.id] = this.checked;
        saveStorage(set)
    }
    replace_embed.firstChild.addEventListener('click', click);
    auto_switch.firstChild.addEventListener('click', click);
    readStorage(['replace_embed', 'auto_switch'], function (item) {
        item = Object.assign({ replace_embed: true, auto_switch: true }, item);
        replace_embed.firstChild.checked = item.replace_embed;
        auto_switch.firstChild.checked = item.auto_switch;
    })
})()
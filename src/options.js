(function () {
    let replace_embed = document.getElementById('replace_embed'),
        skip_head = document.getElementById('skip_head'),
        auto_switch = document.getElementById('auto_switch'),
        official_html5 = document.getElementById('official_html5'),
        core_mode = document.getElementById('core_mode');

    replace_embed.appendChild(_('text', _t('replaceEmbed')));
    skip_head.appendChild(_('text', _t('skipHead')));
    auto_switch.appendChild(_('text', _t('autoSwitch')));
    official_html5.appendChild(_('text', _t('officialHtml5')));
    core_mode.insertBefore(_('text', _t('playerCoreSetting')), core_mode.firstChild);

    let click = function () {
        let set = {};
        set[this.parentNode.id] = this.checked;
        saveStorage(set);
    };
    replace_embed.firstChild.addEventListener('click', click);
    skip_head.firstChild.addEventListener('click', click);
    auto_switch.firstChild.addEventListener('click', click);
    official_html5.firstChild.addEventListener('click', click);
    core_mode.querySelector('select').addEventListener('change', function () {
        saveStorage({ coreMode: this.value });
    });
    readStorage(['replace_embed', 'skip_head', 'auto_switch', 'official_html5', 'coreMode'], function (item) {
        item = Object.assign({ replace_embed: true, skip_head: true, auto_switch: true, official_html5: false, coreMode: 'hls' }, item);
        replace_embed.firstChild.checked = item.replace_embed;
        skip_head.firstChild.checked = item.skip_head;
        auto_switch.firstChild.checked = item.auto_switch;
        official_html5.firstChild.checked = item.official_html5;
        core_mode.querySelector('select').value = item.coreMode;
    });
    chrome.runtime.sendMessage('hasNewVersion', function (has) {
        has !== false && document.body.appendChild(_('div', { style: { marginTop: '20px', cursor: 'default' } }, [_('text', _t('hasNewVersion')), _('a', { href: 'https://github.com/esterTion/Youku-HTML5-Player#安装', target: '_blank' }, [_('text', has)])]));
    })
})();
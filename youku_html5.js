function words2str(words) {
    let uintarr = [];
    for (word of words) {
        uintarr.push(word >>> 24);
        uintarr.push((word >>> 16) & 0xff);
        uintarr.push((word >>> 8) & 0xff);
        uintarr.push((word) & 0xff);
    }
    return String.fromCharCode.apply(null, uintarr);
}
function desen(message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
}
function desde(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.ZeroPadding
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
function md5(str) {
    let data = CryptoJS.MD5(str);
    return words2str(data.words).replace(/[\w\W]/g, function (i) { return i.charCodeAt(0).toString(16) });
}

function createPopup(param) {
    if (!param.content)
        return;
    if (document.querySelector('#YHP_Notice') != null)
        document.querySelector('#YHP_Notice').remove();

    let div = _('div', { id: 'YHP_Notice' });
    let str = '<div><div>' + param.content + '<hr><div style="text-align: right;">';
    if (param.showConfirm) {
        str += '<input value="' + param.confirmBtn + '" type="button" class="confirm">';
    }
    str += '<input value="' + _t('close') + '" type="button" class="close">'
    str += '</div></div></div>';
    div.innerHTML = str;
    document.body.appendChild(div);
    div.style.height = div.firstChild.offsetHeight + 'px';
    document.querySelector('#YHP_Notice .close').addEventListener('click', function () {
        div.style.height = 0;
        setTimeout(function () { div.remove() }, 500);
    });
}

let domain = location.href.match(/:\/\/([^\/]+)/)[1];
let vid = '';
let objID = '';
if (domain == 'v.youku.com') {
    vid = location.href.match(/\/id_([a-zA-Z0-9\=]+)\.html/);
    objID = 'object#movie_player';
} else if (domain == 'player.youku.com') {
    vid = location.href.match(/embed\/([a-zA-Z0-9\=]+)/);
    objID = 'object#youku-player';
}

let knownTypes = {
    'flvhd': _t('flvhd'),
    'mp4hd': _t('mp4hd'),
    'mp4hd2': _t('mp4hd2'),
    'mp4hd3': _t('mp4hd3')
};
let legacyTypes = {
    'flvhd': 'flv',
    'mp4hd': 'mp4',
    'mp4hd2': 'hd2',
    'mp4hd3': 'hd3'
};
let typeArray = {
    'flvhd': 'flv',
    'mp4hd': 'mp4',
    'mp4hd2': 'flv',
    'mp4hd3': 'flv'
};
let knownLangs = {
    "default": "默认",
    "guoyu": "国语",
    "yue": "粤语",
    "chuan": "川话",
    "tai": "台湾",
    "min": "闽南",
    "en": "英语",
    "ja": "日语",
    "kr": "韩语",
    "in": "印度",
    "ru": "俄语",
    "fr": "法语",
    "de": "德语",
    "it": "意语",
    "es": "西语",
    "po": "葡语",
    "th": "泰语",
    "man": "暖男",
    "baby": "萌童"
}
let srcUrl = {};
let audioLangs = {};
Object.defineProperty(audioLangs, 'length', { enumerable: false, writable: true })
let availableSrc = [];
window.currentSrc = '';
window.currentLang = '';
let firstTime = true;
let tempPwd = '';
let highestType;
function response2url(json) {
    let data = {};
    for (let val of json.data.stream) {
        if (!data[val.audio_lang])
            data[val.audio_lang] = {};
        if (!val.channel_type)
            data[val.audio_lang][val.stream_type] = val;
        //片尾、片头独立片段暂时丢弃
    }

    let ep = json.data.security.encrypt_string;
    let ip = json.data.security.ip;
    let [sid, token] = desde(ep, '00149ad5').split('_');

    let videoids = {};
    if (json.data.dvd && json.data.dvd.audiolang) {
        for (let item of json.data.dvd.audiolang) {
            videoids[item.langcode] = item.vid
        }
    }

    audioLangs.length = 0;
    for (let lang in data) {
        audioLangs[lang] = {
            src: {},
            available: []
        }
        audioLangs.length++;
        if (currentLang == '')
            currentLang = lang;
        let videoid = videoids[lang] || vid;
        for (let type in knownTypes) {
            if (data[lang][type]) {
                let time = 0;
                let ep_m3u8 = desen([sid, videoid, token].join('_'), '21dd8110');
                audioLangs[lang].src[type] = {
                    type: 'flv',
                    segments: [],
                    fetchM3U8: false,
                    playlist_url: 'http://pl.youku.com/playlist/m3u8?ctype=10&ep=' + ep_m3u8 + '&ev=1&keyframe=1&oip=' + ip + '&sid=' + sid + '&token=' + token + '&vid=' + videoid + '&type=' + legacyTypes[type]
                };
                for (let part of data[lang][type].segs) {
                    if (part.key == -1) {
                        audioLangs[lang].src[type].partial = true;
                        continue;
                    }
                    switch (data[lang][type].transfer_mode) {
                        case 'http':
                            let currentFileID = part.fileid;
                            let epmd5 = md5(sid + '_' + currentFileID + '_' + token + '_0_kservice').substr(0, 4);
                            let ep = encodeURIComponent(desen(sid + '_' + currentFileID + '_' + token + '_0_' + epmd5, '21dd8110'));
                            audioLangs[lang].src[type].segments.push({
                                filesize: part.size | 0,
                                duration: part.total_milliseconds_video | 0,
                                url: part.path + '&ypp=0&ctype=10&ev=1&token=' + token + '&oip=' + ip + '&ep=' + ep
                            });
                            break;
                        case 'rtmp':
                            audioLangs[lang].src[type].segments.push({
                                filesize: part.size | 0,
                                duration: part.total_milliseconds_video | 0
                            });
                            audioLangs[lang].src[type].fetchM3U8 = true;
                            break;
                        default:
                            createPopup({
                                content: '未知分发模式 "' + data[lang][type].transfer_mode + '" ，请联系开发者报错',
                                showConfirm: false
                            })
                            throw 'break!';
                    }
                    time += part.total_milliseconds_video | 0;
                }
                audioLangs[lang].src[type].duration = time;
                audioLangs[lang].src.duration = time;
                highestType = type;
            }
        }

        let selected;
        let hitPrefer = false;
        let prefer = localStorage.YHP_PreferedType || '';
        for (let type in knownTypes) {
            if (audioLangs[lang].src[type]) {
                selected = [type, knownTypes[type]];
                audioLangs[lang].available.push(selected);
                if (firstTime && !hitPrefer)
                    currentSrc = type;
                if (prefer == type)
                    hitPrefer = true;
            }
        }
        if (firstTime && currentLang == lang && !hitPrefer)
            currentSrc = selected[0];
    }
}

let passwordCB = function () {
    let password = document.querySelector('#YHP_Notice input[type=text]');
    if (password.value.length == 0) {
        let container = document.querySelector('#YHP_Notice .confirm').parentNode;
        container.insertBefore(document.createElement('span'), container.firstChild).outerHTML = '<span style="color:#F00">' + _t('emptyPW') + '</span>';
        setTimeout(function () {
            let toremove = container.firstChild;
            if (toremove.nodeName.toLowerCase() == 'span')
                toremove.remove();
        }, 3e3);
    } else {
        password = password.value;
        let savePassword = document.querySelector('#YHP_Notice input[type=checkbox]');
        if (savePassword.checked) {
            let savedPassword = JSON.parse(localStorage.YHP_SavedPassword || '{}');
            savedPassword[vid] = password;
            localStorage.YHP_SavedPassword = JSON.stringify(savedPassword);
        }
        dots.runTimer();
        fetchSrc('&pwd=' + password);
        document.querySelector('#YHP_Notice .close').click();
    }
};

function switchLang(lang) {
    Array.from(abpinst.playerUnit.querySelectorAll('.BiliPlus-Scale-Menu .Video-Defination>div')).forEach(function (i) {
        i.remove();
    })

    srcUrl = audioLangs[lang].src;
    availableSrc = audioLangs[lang].available;

    for (let i = 0; i < availableSrc.length; i++) {
        abpinst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination').appendChild(_('div', {
            changeto: JSON.stringify(availableSrc[i]), name: availableSrc[i][0], className: availableSrc[i][0] == currentSrc ? 'on' : ''
        }, [_('text', availableSrc[i][1])]));
    }
    if (audioLangs.length > 1)
        abpinst.createPopup(_t('currentLang') + (knownLangs[lang] || lang), 3e3);
}
function fetchSrc(extraQuery) {
    tempPwd = extraQuery;
    fetch('http://play.youku.com/play/get.json?ct=10&vid=' + vid + (extraQuery || ''), {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
    }).then(function (r) {
        r.json().then(function (json) {
            if (json.data.error) {
                /*
                处理错误
                -202 需要密码
                -203 密码错误
                */
                dots.stopTimer();
                let error = json.data.error;
                if (error.code == -202) {
                    createPopup({
                        content: '<p style="font-size:16px">' + _t('needPW') + '</p><input placeholder="' + _t('enterPW') + '" type="text"><br><label><input type="checkbox">' + _t('rememberPW') + '</label>',
                        showConfirm: true,
                        confirmBtn: _t('submit')
                    });
                    document.querySelector('#YHP_Notice .confirm').addEventListener('click', passwordCB);
                } else if (error.code == -203) {
                    createPopup({
                        content: '<p style="font-size:16px">' + _t('wrongPW') + '</p><input placeholder="' + _t('enterPW') + '" type="text"><br><label><input type="checkbox">' + _t('rememberPW') + '</label>',
                        showConfirm: true,
                        confirmBtn: _t('submit')
                    });
                    document.querySelector('#YHP_Notice .confirm').addEventListener('click', passwordCB);
                } else {
                    createPopup({ content: '<p style="font-size:16px">' + _t('fetchSourceErr') + '</p>' + JSON.stringify(json.data.error), showConfirm: false });
                }
                return;
            } else {
                response2url(json);
            }
            switchLang(currentLang);
            if (firstTime) {
                let contextMenu = abpinst.playerUnit.querySelector('.Context-Menu-Body')
                if (audioLangs.length > 1) {
                    let childs = [];
                    for (let lang in audioLangs) {
                        childs.push(_('div', { 'data-lang': lang }, [_('text', knownLangs[lang] || lang)]));
                    }
                    let langChange = _('div', { className: 'dm static' }, [
                        _('div', {}, [_('text', _t('audioLang'))]),
                        _('div', { className: 'dmMenu' }, childs)
                    ]);
                    contextMenu.insertBefore(langChange, contextMenu.firstChild);
                    langChange.addEventListener('click', function (e) {
                        let lang = e.target.getAttribute('data-lang');
                        if (lang == currentLang)
                            return;
                        switchLang(lang);
                        currentLang = lang;
                        changeSrc('', currentSrc, true);
                    });
                }

                if (domain != 'v.youku.com') {
                    let toMain = _('div', { id: 'main_link' }, [_('text', _t('toYouku'))]);
                    contextMenu.insertBefore(toMain, contextMenu.firstChild);
                    toMain.addEventListener('click', function () {
                        abpinst.video.pause();
                        window.open('http://v.youku.com/v_show/id_' + vid + '.html');
                    })
                }

                if (json.data.preview)
                    abpinst.playerUnit.dispatchEvent(new CustomEvent('previewData', {
                        detail: {
                            code: 0, data: {
                                img_x_len: 10,
                                img_y_len: 10,
                                img_x_size: 128,
                                img_y_size: 72,
                                image: json.data.preview.thumb,
                                step: json.data.preview.timespan / 1e3
                            }
                        }
                    }))
            }
            firstTime = false;
            changeSrc('', currentSrc, true);
        })
    }).catch(function (e) {
        createPopup({
            content: '<p style="font-size:16px">' + _t('fetchSourceErr') + '</p>' + e.message,
            showConfirm: false
        });
    })
}
function ykCmtParser(json) {
    let sizeList = [24, 22, 28];
    let modeList = {
        3: 1,
        4: 5,
        6: 4
    };
    for (let i of json.result) {
        let obj = {};
        let properties = {
            pos: 3,
            color: 0xffffff,
            size: 1
        }
        if (!!i.propertis) {
            properties = typeof (i.propertis) == 'string' ? JSON.parse(i.propertis) : i.propertis;
        }
        obj.stime = i.playat;
        obj.size = sizeList[properties.size];
        obj.color = properties.color & 0xffffff;
        obj.mode = modeList[properties.pos];
        obj.position = 'absolute';
        obj.dbid = i.id;
        obj.hash = i.uid + '';
        obj.border = false;
        obj.text = i.content;
        abpinst.cmManager.insert(obj);
    }
    shield.shield();
}
function fetchComment(m) {
    m *= 5;
    fetch('http://service.danmu.youku.com/list?mat=' + m + '&mcount=5&ct=1001&icode=' + vid, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
    }).then(r => {
        r.json().then(ykCmtParser)
    }).catch(() => {
        if (abpinst.cmManager.display)
            abpinst.createPopup(_t('fetchCommentErr'), 1e3);
    })
}
let prevMinute = 0;
function chkCmtTime() {
    let minute = ((this.currentTime + 30) / 300) | 0;
    if (prevMinute != minute && minute * 300 < this.duration) {
        fetchComment(minute);
    }
    prevMinute = minute;
}
function chkSeekCmtTime() {
    let minute = (this.currentTime / 300) | 0;
    if (minute < prevMinute) {
        abpinst.cmManager.load([]);
        prevMinute = minute;
        fetchComment(minute);
    }
}

window.changeSrc = function (e, t, force) {
    var div = document.getElementById('info-box');
    if ((abpinst == undefined || (currentSrc == t)) && !force)
        return false;
    if (div.style.opacity == 0) {
        div.style.opacity = 1;
    }
    abpinst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination div.on').className = '';
    abpinst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination div[name=' + t + ']').className = 'on';
    abpinst.video.pause();
    if (srcUrl[t] != undefined) {
        div.childNodes[0].childNodes[0].innerHTML = ABP.Strings.switching;
        if (!dots.running)
            dots.runTimer();
        if (abpinst.lastTime == undefined)
            abpinst.lastTime = abpinst.video.currentTime;
        if (abpinst.lastSpeed == undefined)
            abpinst.lastSpeed = abpinst.video.playbackRate;
        abpinst.video.dispatchEvent(new CustomEvent('autoplay'));
        if (!force) {
            let setPrefer = t == highestType ? '' : t;
            localStorage.YHP_PreferedType = setPrefer;
        }
        flvparam(t);
        abpinst.cmManager.load([]);
        prevMinute = 0;
        fetchComment(0);
    }
}
window.overallBitrate = 0;
let self = window;
let createPlayer = function (e) {
    if (self.flvplayer != undefined) {
        self.flvplayer.unload();
        self.flvplayer.destroy();
        delete self.flvplayer;
    }
    if (e.detail == null)
        return false;
    self.flvplayer = flvjs.createPlayer(e.detail.src, e.detail.option);
    self.flvplayer.on('error', load_fail);
    self.flvplayer.attachMediaElement(document.querySelector('video'));
    self.flvplayer.load();
}
let load_fail = function (type, info, detail) {
    if (type == 'NetworkError' && info == 'HttpStatusCodeInvalid') {
        console.error('意外无效地址，重新获取地址');
        fetchSrc(tempPwd);
        return;
    }
    var div = _('div', {
        style: {
            width: '100%',
            height: '100%',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            color: '#FFF'
        }
    });
    div.innerHTML = '<div style="position:relative;top:50%"><div style="position:relative;font-size:16px;line-height:16px;top:-8px">' + _t('loadErr') + '</div></div>';
    document.querySelector('.ABP-Video').insertBefore(div, document.querySelector('.ABP-Video>:first-child'));
    document.getElementById('info-box').remove();
    createPopup({
        content: '<p style="font-size:16px">' + _t('playErr') + '</p><div style="white-space:pre-wrap">' + JSON.stringify({ type, info, detail }, null, '  ') + '</div>',
        showConfirm: false
    });
}
let flvparam = function (select) {
    currentSrc = select;
    if (srcUrl[select].fetchM3U8) {
        //rtmp视频流，使用m3u8地址播放
        fetch(srcUrl[select].playlist_url, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache',
            referrer: location.href
        }).then(function (r) {
            r.text().then(function (playlist) {
                //匹配m3u8的地址
                let urls = playlist.match(/http[^\?]+/g);
                let arr = [];
                if (urls == null) {
                    abpinst.video.play();
                    abpinst.createPopup(_t('switchErr'), 3e3);
                    return;
                }
                urls.forEach(function (i) {
                    if (arr.indexOf(i) == -1)
                        arr.push(i)
                });
                //部分cdn识别处理
                for (let i in arr) {
                    srcUrl[select].segments[i].url = arr[i].replace(/http:\/\/.+?\//, function (s) { return s + 'youku/' });
                }
                //重新创建播放器
                srcUrl[select].fetchM3U8 = false;
                flvparam(select);
            })
        })
        return;
    }
    createPlayer({ detail: { src: srcUrl[select], option: { seekType: 'range', reuseRedirectedURL: true } } });
    if (srcUrl[select].partial) {
        setTimeout(function () { abpinst.createPopup(_t('partialAvailable'), 3e3) }, 4e3);
    }
    if (srcUrl[select].segments) {
        var totalSize = 0;
        srcUrl[select].segments.forEach(function (i) { totalSize += i.filesize })
        overallBitrate = totalSize / srcUrl.duration * 8
    } else {
        overallBitrate = srcUrl[select].filesize / srcUrl.duration * 8
    }
};
function init() {
    isChrome && chrome.runtime.sendMessage({ icon: true, state: 'playing' });
    let noticeWidth = Math.min(500, innerWidth - 40);
    document.head.appendChild(_('style')).innerHTML = `#YHP_Notice{
position:fixed;left:0;right:0;top:0;height:0;z-index:10000;transition:.5s;cursor:default
}
#YHP_Notice>div{
position:absolute;bottom:0;left:0;right:0;font-size:15px
}
#YHP_Notice>div>div{
    border:1px #AAA solid;width:${noticeWidth}px;margin:0 auto;padding:20px 10px 5px;background:#EFEFF4;color:#000;border-radius:5px;box-shadow:0 0 5px -2px
}
#YHP_Notice>div>div *{
    margin:5px 0;
}
#YHP_Notice input[type=text]{
    border: none;border-bottom: 1px solid #AAA;width: 60%;background: transparent
}
#YHP_Notice input[type=text]:active{
    border-bottom-color:#4285f4
}
#YHP_Notice input[type=button] {
	border-radius: 2px;
	border: #adadad 1px solid;
	padding: 3px;
	margin: 0 5px;
    width:50px
}
#YHP_Notice input[type=button]:hover {
	background: #FFF;
}
#YHP_Notice input[type=button]:active {
	background: #CCC;
}`

    window.cid = vid;
    let container = document.querySelector(objID).parentNode;
    container.style.overflow = 'hidden'
    let flashplayer = container.firstChild;
    flashplayer.remove();
    let video = container.appendChild(_('video'));
    window.flvplayer = { unload: function () { }, destroy: function () { } };
    let config = JSON.parse(localStorage.YHP_PlayerSettings || '{}');
    abpinst = ABP.create(video.parentNode, {
        src: {
            playlist: [{
                video: video
            }]
        },
        width: '100%',
        height: '100%',
        config: config,
        mobile: isMobile()
    });
    dots.init({
        id: 'dots',
        width: '100%',
        height: '100%',
        r: 16,
        thick: 4
    });
    dots.runTimer();

    let savedPassword = JSON.parse(localStorage.YHP_SavedPassword || '{}');
    let password;
    if (savedPassword[vid])
        password = '&pwd=' + savedPassword[vid];
    fetchSrc(password);

    abpinst.video.addEventListener('seeking', chkSeekCmtTime);
    abpinst.video.addEventListener('timeupdate', chkCmtTime);
    let disabled = false;
    let playerHeight = function () {
        !disabled && (document.body.className = document.body.className.replace('danmuoff', 'danmuon'));
    };
    setInterval(playerHeight, 1e3);
    playerHeight();
    if (domain == 'v.youku.com') {
        let restore = document.querySelector('#module-interact').appendChild(_('div', { className: 'fn-phone-see' }, [
            _('div', { className: 'fn' }, [
                _('a', { className: 'label', href: 'javascript:void(0);' }, [
                    _('text', _t('restoreFlash'))
                ])
            ])
        ]));
        restore.firstChild.addEventListener('click', function () {
            if (disabled)
                return;
            disabled = true;
            if (self.flvplayer && self.flvplayer.destroy) {
                self.flvplayer.destroy();
                self.flvplayer = {};
            }
            container.firstChild.style.display = 'none';
            container.appendChild(flashplayer);
            document.body.className = document.body.className.replace('danmuon', 'danmuoff')
            this.parentNode.remove();
        })
    }
}
(function () {
    if (vid === null)
        return;
    vid = vid[1];
    flvjs.LoggingControl.enableVerbose = false;
    flvjs.LoggingControl.enableInfo = false;
    flvjs.LoggingControl.enableDebug = false;
    if (domain == 'v.youku.com') {
        if (document.querySelector(objID) != null)
            init();
        else {
            //player node not loaded, add an observer
            let observer = new MutationObserver(function () {
                if (document.querySelector(objID) != null) {
                    observer.disconnect();
                    init();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    } else if (domain == 'player.youku.com') {
        let container = document.querySelector(objID);
        if (container == null) return;
        container = container.parentNode;
        container.firstChild.style.display = 'none';
        let div = container.appendChild(_('div', {
            style: {
                height: '100%',
                width: '100%',
                cursor: 'pointer',
            }
        }));
        fetch('http://play.youku.com/play/get.json?ct=10&vid=' + vid, {
            method: 'GET',
            credentials: 'include',
            cache: 'no-cache'
        }).then(function (r) {
            r.json().then(function (json) {
                if (!json.data.video) {
                    createPopup({ content: '<p style="font-size:16px">' + _t('fetchInfoErr') + '</p>' + JSON.stringify(json.data.error), showConfirm: false });
                    return;
                }
                let img = div.appendChild(_('div', {
                    style: {
                        backgroundImage: 'url(' + json.data.video.img_hd.replace('http:', '') + ')',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% auto',
                        filter: 'blur(5px)',
                        width: '100%',
                        height: '100%',
                        position: 'absolute'
                    }
                }))
                let info = div.appendChild(_('a', {
                    target: '_blank', href: 'http://v.youku.com/v_show/id_' + vid + '.html', style: {
                        display: 'flex',
                        flexDirection: 'column',
                        lineHeight: '30px',
                        height: '60px',
                        width: '100%',
                        position: 'relative',
                        top: 'calc(50% - 40px)',
                        color: '#EEE',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        background: 'linear-gradient(to bottom,transparent,rgba(0,0,0,.7) 10px,rgba(0,0,0,.7) 70px,transparent)',
                        padding: '10px 0',
                        textDecoration: 'none'
                    }
                }));
                info.addEventListener('click', function (e) { e.stopPropagation() });

                let title = info.appendChild(_('div', {
                    style: {
                        flex: 1,
                        height: '30px',
                        textOverflow: 'ellipsis',
                        fontSize: '20px',
                        overflow: 'hidden'
                    }
                }, [_('text', json.data.video.title)]));

                let uploader = info.appendChild(_('div', {
                    style: {
                        flex: 1,
                        height: '30px',
                        textOverflow: 'ellipsis',
                        color: '#AAA',
                        overflow: 'hidden'
                    }
                }, [_('text', _t('uploader') + json.data.video.username)]));

                div.addEventListener('click', function () {
                    isChrome && chrome.runtime.sendMessage({ icon: true, state: 'pending-dec' });
                    div.remove();
                    init();
                });
                isChrome && chrome.runtime.sendMessage({ icon: true, state: 'pending' });
            })
        })
    }
})();
window.crc_engine = () => { return ''; };
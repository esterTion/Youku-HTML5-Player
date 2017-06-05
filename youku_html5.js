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
let categoryID = 0;
let uid = '';
let iid = 0;
const cnaFake = 'YGRkZGRkZGRkZGRkZGRkZGRW';
if (domain == 'v.youku.com') {
    vid = location.href.match(/\/id_([a-zA-Z0-9\=]+)\.html/);
    objID = 'object#movie_player';
    if(!document.cookie.match('cna=')) {
        let cookieDate = new Date();
        cookieDate.setTime(cookieDate.getTime() + 864000000000/* 1e4 *  24 * 60 * 60 * 1000 */);
        let expires = '; expires=' + cookieDate.toGMTString() + "; path=/";
        document.cookie = 'cna=' + cnaFake + expires;
    }
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
                audioLangs[lang].src[type] = {
                    type: 'flv',
                    segments: [],
                    fetchM3U8: false,
                    playlist_url: data[lang][type].m3u8_url
                };
                for (let part of data[lang][type].segs) {
                    if (part.key == -1) {
                        audioLangs[lang].src[type].partial = true;
                        continue;
                    }
                    if (part.rtmp_url) {
                        audioLangs[lang].src[type].segments.push({
                            filesize: part.size | 0,
                            duration: part.total_milliseconds_video | 0
                        });
                        audioLangs[lang].src[type].fetchM3U8 = true;
                    } else {
                        audioLangs[lang].src[type].segments.push({
                            filesize: part.size | 0,
                            duration: part.total_milliseconds_video | 0,
                            url: part.cdn_url
                        })
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

function passwordCB() {
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
        fetchSrc('&password=' + password);
        document.querySelector('#YHP_Notice .close').click();
    }
};

function padStart(str, pad, len) {
    if (typeof (str) != 'string')
        str = str.toString();
    while (str.length < len) {
        str = pad + str;
    }
    return str;
}
function generate_downlink() {
    let old = document.querySelector('#panel_down .YHP_down');
    if (old != null)
        old.remove();
    let childs = [];
    for (let type in knownTypes) {
        if (!srcUrl[type]) continue;
        let items = [];
        let order = 1;
        srcUrl[type].segments.forEach(function (i) {
            if (!i.url) return;
            let time = ((i.duration / 6e4) | 0) + ':' + padStart(((i.duration / 1e3) | 0) % 60, '0', 2);
            items.push(_('a', { href: i.url, target: '_blank' }, [_('div', { className: 'YHP_down_btn' }, [_('text', '[' + order + '] ' + time)])]));
            order++;
        })
        if (items.length > 0) {
            childs.push(_('div', {}, [
                _('div', { className: 'YHP_down_banner' }, [_('text', '[' + knownTypes[type] + '] '), _('span', { className: 'YHP_output', style: { cursor: 'pointer' }, 'data-type': type }, [_('text', _t('outputUrl'))])]),
                _('div', { className: 'YHP_down_container' }, items)
            ]));
        }
    }
    if (childs.length > 0) {
        document.querySelector('#panel_down').appendChild(_('div', { className: 'YHP_down' }, childs));
        document.querySelector('#panel_down .YHP_down').addEventListener('click', function (e) {
            if (e.target.className == 'YHP_output') {
                urlsOutput(e.target.getAttribute('data-type'));
            }
        })
    }
}
function urlsOutput(type) {
    if (!srcUrl[type]) return;
    let urls = [];
    srcUrl[type].segments.forEach(function (i) {
        if (i.url) urls.push(encodeURIComponent(i.url));
    });
    if (urls.length == 0) return;
    urls = "data:text/plain," + urls.join('%0A');
    let div = _('div', { id: 'urls-output' }, [
        _('div', { style: { position: 'fixed', top: 0, left: 0, zIndex: 20000, width: '100%', height: '100%', background: 'rgba(0,0,0,.5)', animationFillMode: 'forwards', animationName: 'pop-iframe-in', animationDuration: '.5s' } }, [
            _('iframe', { src: urls, style: { background: '#e4e7ee', position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%' } }),
            _('div', { className: 'closeBox', style: { position: 'absolute', top: '5%', right: '8%', fontSize: '40px', color: '#FFF' } }, [_('text', '×')])
        ])
    ]);
    div.firstChild.addEventListener('click', function (e) {
        if (e.target == this || e.target.className == 'closeBox') {
            div.firstChild.style.animationName = 'pop-iframe-out'
            setTimeout(function () {
                div.remove();
            }, 5e2);
        }
    });
    document.body.appendChild(div)
}

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
    fetch('http://ups.youku.com/ups/get.json?ccode=0502&client_ip=192.168.1.1&utid=' + cnaFake + '&client_ts=' + Date.now() + '&vid=' + vid + (extraQuery || ''), {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
    }).then(function (r) {
        r.json().then(function (json) {
            if (json.data.error) {
                /*
                处理错误
                -2002 需要密码
                -2003 密码错误
                */
                dots.stopTimer();
                let error = json.data.error;
                if (error.code == -2002) {
                    createPopup({
                        content: '<p style="font-size:16px">' + _t('needPW') + '</p><input placeholder="' + _t('enterPW') + '" type="text"><br><label><input type="checkbox">' + _t('rememberPW') + '</label>',
                        showConfirm: true,
                        confirmBtn: _t('submit')
                    });
                    document.querySelector('#YHP_Notice .confirm').addEventListener('click', passwordCB);
                } else if (error.code == -2003) {
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
            let savedLang = localStorage.YHP_PreferedLang || '';
            if (audioLangs[savedLang])
                currentLang = savedLang;
            else
                delete localStorage.YHP_PreferedLang;
            switchLang(currentLang);
            if (firstTime) {
                iid = json.data.video.id;
                categoryID = json.data.video.category_id;
                uid = json.data.user.uid;
                abpinst.playerUnit.addEventListener('sendcomment', sendComment);
                abpinst.title = json.data.video.title;
                if (domain == 'v.youku.com' && json.data.videos && json.data.videos.next) {
                    abpinst.video.addEventListener('ended', function () {
                        readStorage('auto_switch', function (item) {
                            item = Object.assign({ auto_switch: true }, item);
                            if (item.auto_switch)
                                location.href = 'id_' + json.data.videos.next.encodevid + '.html'
                        })
                    })
                }

                if (uid == '') {
                    abpinst.txtText.disabled = true;
                    abpinst.txtText.placeholder = _t('noVisitorComment');
                    abpinst.txtText.style.textAlign = 'center';
                }
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
                    langChange.childNodes[1].addEventListener('click', function (e) {
                        let lang = e.target.getAttribute('data-lang');
                        if (lang == currentLang)
                            return;
                        switchLang(lang);
                        currentLang = lang;
                        localStorage.YHP_PreferedLang = lang;
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
                } else {
                    document.querySelector('#fn_download').addEventListener('click', generate_downlink);
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
let sizeList = [24, 22, 28];
let modeList = {
    3: 1,
    4: 5,
    6: 4
};
function ykCmtParser(json) {
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
const DANMU_POST_SERCET = "Ef9/4e4d^@g9a2M3g";
function sendComment(e) {
    if (uid == '')
        return false;
    let form = {}, post = [];
    form.iid = iid;
    form.type = 1;
    form.ouid = uid;
    form.ver = 1;
    form.aid = 0;
    form.content = e.detail.message;
    form.time = Date.now() / 1e3 | 0
    form.lid = 0
    form.ct = 1001;
    form.uid = uid;
    let mode;
    for (mode in modeList) {
        if (modeList[mode] == e.detail.mode)
            break;
    }
    form.propertis = JSON.stringify({ pos: mode, size: sizeList.indexOf(e.detail.fontsize), color: e.detail.color, effect: 0 });
    form.cid = categoryID;
    form.playat = e.detail.playTime * 1e3 | 0;
    form.sign = CryptoJS.MD5(DANMU_POST_SERCET + form.time + uid + iid + form.content).toString();

    for (let key in form) {
        post.push(key + '=' + encodeURIComponent(form[key]));
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    fetch('http://service.danmu.youku.com/add?t=' + Date.now(), {
        method: 'POST',
        headers: headers,
        body: post.join('&'),
        credentials: 'include',
        cache: 'no-cache'
    }).then(function (r) {
        r.json().then(function (json) {
            if (json.code != 1) {
                abpinst.createPopup(_t('postCommentFail') + '<br>' + JSON.stringify(json), 3e3);
            }
        })
    }).catch(function (e) {
        abpinst.createPopup(_t('postCommentFail') + '<br>' + e.message, 3e3);
    })
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
function fillWithM3u8(select) {
    fetch(srcUrl[select].playlist_url, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
    }).then(function (r) {
        r.text().then(function (playlist) {
            //匹配m3u8的地址
            let urls = playlist.match(/http[^\?]+/g);
            let arr = [];
            if (urls == null) {
                abpinst.removePopup();
                abpinst.createPopup(_t('switchErr'), 3e3);
                abpinst.video.dispatchEvent(new Event('progress'));
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
}
let load_fail = function (type, info, detail) {
    if (type == 'NetworkError' && info == 'HttpStatusCodeInvalid' && detail.code == 403) {
        console.warn('http cdn地址无效，尝试m3u8');
        fillWithM3u8(currentSrc);
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
        fillWithM3u8(select);
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
let ABPConfig;
if (localStorage.YHP_PlayerSettings != undefined) {
    saveStorage({ PlayerSettings: JSON.parse(localStorage.YHP_PlayerSettings) });
    delete localStorage.YHP_PlayerSettings;
}
function chkInit() {
    readStorage('PlayerSettings', function (item) {
        ABPConfig = item.PlayerSettings || {};
        init();
    })
}
function init() {
    isChrome && chrome.runtime.sendMessage({ icon: true, state: 'playing' });
    let noticeWidth = Math.min(500, innerWidth - 40);
    document.head.appendChild(_('style')).innerHTML = `#YHP_Notice{
position:fixed;left:0;right:0;top:0;height:0;z-index:20000;transition:.5s;cursor:default
}
.YHP_down_banner{
margin:2px;padding:2px;color:#FFFFFF;font-size:13px;font-weight:bold;background-color:green
}
.YHP_down_btn{
margin:2px;padding:4px;color:#1E90FF;font-size:14px;font-weight:bold;border:#1E90FF 2px solid;display:inline-block;border-radius:5px
}
@keyframes pop-iframe-in{0%{opacity:0;transform:scale(.7);}100%{opacity:1;transform:scale(1)}}
@keyframes pop-iframe-out{0%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(.7)}}
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
    abpinst = ABP.create(video.parentNode, {
        src: {
            playlist: [{
                video: video
            }]
        },
        width: '100%',
        height: '100%',
        config: ABPConfig,
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
        password = '&password=' + savedPassword[vid];
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
        fetch('http://ups.youku.com/ups/get.json?ccode=0502&client_ip=127.0.0.1&utid=' + Date.now() + '&client_ts=' + Date.now() + '&vid=' + vid, {
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
                        backgroundImage: 'url(' + json.data.video.logo + ')',
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
                    chkInit();
                });
                isChrome && chrome.runtime.sendMessage({ icon: true, state: 'pending' });
            })
        })
    }
})();
window.crc_engine = () => { return ''; };

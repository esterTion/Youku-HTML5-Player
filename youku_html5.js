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

    let div = document.createElement('div');
    div.id = 'YHP_Notice';
    let str = '<div><div>' + param.content + '<hr><div style="text-align: right;">';
    if (param.showConfirm) {
        str += '<input value="' + param.confirmBtn + '" type="button" class="confirm">';
    }
    str += '<input value="' + ('关闭') + '" type="button" class="close">'
    str += '</div></div></div>';
    div.innerHTML = str;
    document.body.appendChild(div);
    div.style.height = div.firstChild.offsetHeight + 'px';
    document.querySelector('#YHP_Notice .close').addEventListener('click', function () {
        div.style.height = 0;
        setTimeout(function () { div.remove() }, 500);
    });
}

let vid = location.href.match(/\/id_([a-zA-Z0-9\=]+)\.html/);

let knownTypes = {
    'flvhd': '标清',
    'mp4hd': '高清',
    'mp4hd2': '超清',
    'mp4hd3': '原画'
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
let availableSrc = [];
window.currentSrc = '';
window.currentLang = '';
function response2url(json) {
    let data = {};
    for (let val of json.data.stream) {
        if (!data[val.audio_lang])
            data[val.audio_lang] = {};
        data[val.audio_lang][val.stream_type] = val;
    }

    let ep = json.data.security.encrypt_string;
    let ip = json.data.security.ip;
    let [sid, token] = desde(ep, '00149ad5').split('_');

    let videoids = {};
    if (json.data.dvd.audiolang) {
        for (let item of json.data.dvd.audiolang) {
            videoids[item.langcode] = item.vid
        }
    }

    for (let lang in data) {
        audioLangs[lang] = {
            src: {},
            available: []
        }
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
            }
        }

        let selected;
        for (let type in knownTypes) {
            if (audioLangs[lang].src[type]) {
                selected = [type, knownTypes[type]];
                audioLangs[lang].available.push(selected);
                currentSrc = type;
            }
        }
        if (currentLang == lang)
            currentSrc = selected[0];
    }
}

let passwordCB = function () {
    let password = document.querySelector('#YHP_Notice input[type=text]');
    if (password.value.length == 0) {
        let container = document.querySelector('#YHP_Notice .confirm').parentNode;
        container.insertBefore(document.createElement('span'), container.firstChild).outerHTML = '<span style="color:#F00">空密码</span>';
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

function switchLang(lang) {
    Array.from(abpinst.playerUnit.querySelectorAll('.BiliPlus-Scale-Menu .Video-Defination>div')).forEach(function (i) {
        i.remove();
    })

    srcUrl = audioLangs[lang].src;
    availableSrc = audioLangs[lang].available;

    for (let i = 0, div; i < availableSrc.length; i++) {
        div = document.createElement('div');
        div.setAttribute('changeto', JSON.stringify(availableSrc[i]));
        div.setAttribute('name', availableSrc[i][0]);
        if (availableSrc[i][0] == currentSrc)
            div.className = 'on';
        div.appendChild(document.createTextNode(availableSrc[i][1]));
        abpinst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination').appendChild(div);
    }
    abpinst.createPopup('当前音频语言：' + (knownLangs[lang] || lang), 3e3);
}
function fetchSrc(extraQuery) {
    fetch('https://play.youku.com/play/get.json?ct=10&vid=' + vid + (extraQuery || ''), {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
        referrer: location.href
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
                        content: '<p style="font-size:16px">视频需要密码访问，请输入密码：</p><input placeholder="输入视频密码" type="text"><br><label><input type="checkbox">记住密码</label>',
                        showConfirm: true,
                        confirmBtn: '提交'
                    });
                    document.querySelector('#YHP_Notice .confirm').addEventListener('click', passwordCB);
                } else if (error.code == -2003) {
                    createPopup({
                        content: '<p style="font-size:16px">视频访问密码错误，请重新输入密码：</p><input placeholder="输入视频密码" type="text"><br><label><input type="checkbox">记住密码</label>',
                        showConfirm: true,
                        confirmBtn: '提交'
                    });
                    document.querySelector('#YHP_Notice .confirm').addEventListener('click', passwordCB);
                } else {
                    createPopup({ content: '<p style="font-size:16px">获取视频地址出错，详细错误：</p>' + JSON.stringify(json.data.error), showConfirm: false });
                }
                return;
            } else {
                response2url(json);
            }
            switchLang(currentLang);
            let contextMenu = abpinst.playerUnit.querySelector('.Context-Menu-Body')
            let langChange = document.createElement('div');
            contextMenu.insertBefore(langChange, contextMenu.firstChild);
            langChange.className = 'dm';
            langChange.appendChild(document.createElement('div')).innerHTML = '音频语言';
            langChange = langChange.appendChild(document.createElement('div'));
            langChange.className = 'dmMenu';
            for (let lang in audioLangs) {
                let div = langChange.appendChild(document.createElement('div'));
                div.innerHTML = knownLangs[lang] || lang;
                div.setAttribute('data-lang', lang);
            }
            langChange.addEventListener('click', function (e) {
                let lang = e.target.getAttribute('data-lang');
                if (lang == currentLang)
                    return;
                switchLang(lang);
                currentLang = lang;
                changeSrc('', currentSrc, true);
            });

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
            flvparam(currentSrc);
        })
    }).catch(function (e) {
        createPopup({
            content: '<p style="font-size:16px">获取视频地址出错，详细错误：</p>' + e.message,
            showConfirm: false
        });
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
        flvparam(t);
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
    var div = document.createElement('div');
    div.innerHTML = '<div style="position:relative;top:50%"><div style="position:relative;font-size:16px;line-height:16px;top:-8px">加载视频失败，无法播放该视频</div></div>';
    div.setAttribute('style', 'width:100%;height:100%;text-align:center;background:rgba(0,0,0,0.8);position:absolute;color:#FFF');
    document.querySelector('.ABP-Video').insertBefore(div, document.querySelector('.ABP-Video>:first-child'));
    document.getElementById('info-box').remove();
    createPopup({
        content: '<p style="font-size:16px">播放错误</p><div style="white-space:pre-wrap">' + JSON.stringify({ type, info, detail }, null, '  ') + '</div>',
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
                    abpinst.createPopup('切换失败，该语言/清晰度暂时不能播放', 3e3);
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
    createPlayer({ detail: { src: srcUrl[select], option: { seekType: 'range' } } });
    if (srcUrl[select].partial) {
        abpinst.createPopup('本视频仅可播放部分片段，请确认付费状态', 3e3);
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
    document.head.appendChild(document.createElement('style')).innerHTML = `#YHP_Notice{
position:fixed;left:0;right:0;top:0;height:0;z-index:10000;transition:.5s;cursor:default
}
#YHP_Notice>div{
position:absolute;bottom:0;left:0;right:0;font-size:15px
}
#YHP_Notice>div>div{
    border:1px #AAA solid;width:500px;margin:0 auto;padding:20px 10px 5px;background:#EFEFF4;color:#000;border-radius:5px;box-shadow:0 0 5px -2px
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

    let container = document.querySelector('object#movie_player').parentNode;
    let flashplayer = container.firstChild;
    flashplayer.remove();
    let video = container.appendChild(document.createElement('video'));
    window.flvplayer = { unload: function () { }, destroy: function () { } };
    abpinst = ABP.create(document.getElementById("player"), {
        src: {
            playlist: [{
                video: video
            }]
        },
        width: '100%',
        height: '100%',
        config: {},
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
    let disabled = false;
    let playerHeight = function () {
        !disabled && (document.body.className = document.body.className.replace('danmuoff', 'danmuon'));
    };
    setInterval(playerHeight, 1e3);
    playerHeight();
    let restore = document.querySelector('#module-interact').appendChild(document.createElement('div'));
    restore.className = 'fn-phone-see';
    restore.innerHTML = '<div class="fn"><a class="label" href="javascript:void(0);">还原flash播放器</a></div>'
    restore.firstChild.addEventListener('click', function () {
        if (disabled)
            return;
        disabled = true;
        if (self.flvplayer && self.flvplayer.destroy) {
            self.flvplayer.destroy();
            self.flvplayer={};
        }
        container.firstChild.style.display='none';
        container.appendChild(flashplayer);
        document.body.className = document.body.className.replace('danmuon', 'danmuoff')
        this.parentNode.remove();
    })
}
(function () {
    if (vid === null)
        return;
    vid = vid[1];
    if (document.querySelector('object#movie_player') != null)
        init();
    else {
        //player node not loaded, add an observer
        let observer = new MutationObserver(function () {
            if (document.querySelector('object#movie_player') != null) {
                observer.disconnect();
                init();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
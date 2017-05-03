function words2str(words) {
    let intin = new Int32Array([0]);
    let uintout = new Uint8Array(intin.buffer);
    let arr = [];
    for (let word of words) {
        intin[0] = word;
        for (let i = 0; i < 4; i++)
            arr.push(uintout[i]);
    }
    return String.fromCharCode.apply(null, arr);
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
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8).replace(/\0/g, '');
}
function md5(str) {
    let data = CryptoJS.MD5(str);
    str = '';
    let intin = new Int32Array([0]);
    let uintout = new Uint32Array(intin.buffer);
    for (let word of data.words) {
        intin[0] = word;
        str += uintout[0].toString(16);
    }
    return str;
}

function createPopup(param) {
    if (!param.content)
        return;
    if(document.querySelector('#YHP_Notice')!=null)
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
    div.style.height = div.firstChild.offsetHeight+'px';
    document.querySelector('#YHP_Notice .close').addEventListener('click', function () {
        div.style.height = 0;
        setTimeout(function () { div.remove() }, 500);
    });
    //div.innerHTML='<div><div><p style="font-size: 16px;">视频需要密码访问，请输入密码：</p><input placeholder="输入视频密码" type="text"><br><input type="checkbox">记住密码<hr><div style="text-align: right;"><input value="提交" type="button"><input value="取消"type="button"></div></div></div>';
}

let vid = location.href.match(/\/id_([a-zA-Z0-9\=]+)\.html/);

let knownTypes = {
    'flvhd': '标清',
    'mp4hd': '高清',
    'mp4hd2': '超清',
    'mp4hd3': '原画'
};
let typeArray = {
    'flvhd': 'flv',
    'mp4hd': 'mp4',
    'mp4hd2': 'flv',
    'mp4hd3': 'flv'
};
let srcUrl = {};
let availableSrc = [];
window.currentSrc = '';
function response2url(json) {
    let data = {};
    for (let val of json.data.stream) {
        data[val.stream_type] = val;
    }

    /*
    let ep=json.data.security.encrypt_string;
    let ip=json.data.security.ip;
    let [sid,token]=desde(ep,'00149ad5').split('_');
    */

    for (let type in knownTypes) {
        if (data[type]) {
            let time = 0;
            srcUrl[type] = {
                type: 'flv',
                segments: []
            };
            for (let part of data[type].segs) {
                /*let currentFileID=part.fileid;
                let epmd5=md5(sid+'_'+currentFileID+'_'+token+'_0_kservice').substr(0,4);
                let ep=encodeURIComponent(desen(sid+'_'+currentFileID+'_'+token+'_0_'+epmd5,'21dd8110'));
                srcUrl[type].segments.push({
                    filesize:part.size|0,
                    duration:part.total_milliseconds_video|0,
                    url:"http://k.youku.com/player/getFlvPath/sid/"+sid+"_00/st/"+typeArray[type]+"/fileid/"+currentFileID+"?K="+part.key+"&hd=1&myp=0&ts="+part.total_milliseconds_video+'&ypp=0&ctype=10&ev=1&token='+token+'&oip='+ip+'&ep='+ep
                })*/
                if (part.key == -1) {
                    srcUrl[type].partial = true;
                    continue;
                }
                srcUrl[type].segments.push({
                    filesize: part.size | 0,
                    duration: part.total_milliseconds_video | 0,
                    url: part.cdn_url
                })
                time += part.total_milliseconds_video | 0;
            }
            srcUrl[type].duration = time;
            srcUrl.duration = time;
        }
    }
}

let passwordCB = function () {
    let password = document.querySelector('#YHP_Notice input[type=text]');
    if (password.value.length == 0) {
        let container = document.querySelector('#YHP_Notice .confirm').parentNode;
        container.insertBefore(document.createElement('span'),container.firstChild).outerHTML = '<span style="color:#F00">空密码</span>';
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

function fetchSrc(extraQuery) {
    fetch('https://ups.youku.com/ups/get.json?ccode=0401&client_ip=127.0.0.1&utid=' + Date.now() + '&client_ts=' + Date.now() + '&vid=' + vid + (extraQuery || ''), {
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
            let selected;
            for (let type in knownTypes) {
                if (srcUrl[type]) {
                    selected = [type, knownTypes[type]];
                    availableSrc.push(selected);
                    currentSrc = type;
                }
            }
            for (let i = 0, div; i < availableSrc.length; i++) {
                div = document.createElement('div');
                div.setAttribute('changeto', JSON.stringify(availableSrc[i]));
                div.setAttribute('name', availableSrc[i][0]);
                if (availableSrc[i][0] == currentSrc)
                    div.className = 'on';
                div.appendChild(document.createTextNode(availableSrc[i][1]));
                abpinst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination').appendChild(div);
            }
            flvparam(selected[0]);
        })
    })
}
window.changeSrc = function (e, t) {
    var div = document.getElementById('info-box');
    if (abpinst == undefined || (currentSrc == t))
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
let load_fail = function () {
    var div = document.createElement('div');
    div.innerHTML = '<div style="position:relative;top:50%"><div style="position:relative;font-size:16px;line-height:16px;top:-8px">加载视频失败，无法播放该视频</div></div>';
    div.setAttribute('style', 'width:100%;height:100%;text-align:center;background:rgba(0,0,0,0.8);position:absolute;color:#FFF');
    document.querySelector('.ABP-Video').insertBefore(div, document.querySelector('.ABP-Video>:first-child'));
    document.getElementById('info-box').remove();
}
let flvparam = function (select) {
    currentSrc = select;
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
    container.firstChild.remove();
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
    if(savedPassword[vid])
        password='&password='+savedPassword[vid];
    fetchSrc(password);
}
(function () {
    if (vid === null)
        return;
    vid = vid[1];
    document.body.className = document.body.className.replace('danmuoff', 'danmuon');
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


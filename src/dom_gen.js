let _ = function (type, props, children) {
    let elem = null;
    if (type === "text") {
        return document.createTextNode(props);
    } else {
        elem = document.createElement(type);
    }
    for (let n in props) {
        if (n === "style") {
            for (let x in props.style) {
                elem.style[x] = props.style[x];
            }
        } else if (n === "className") {
            elem.className = props[n];
        } else if (n === "event") {
            for (let x in props.event) {
                elem.addEventListener(x, props.event[x]);
            }
        } else {
            elem.setAttribute(n, props[n]);
        }
    }
    if (children) {
        for (let i = 0; i < children.length; i++) {
            if (children[i] != null)
                elem.appendChild(children[i]);
        }
    }
    return elem;
};

let isChrome = /chrome/i.test(navigator.userAgent);
let _t = function (s) { return chrome.i18n.getMessage(s) };
let firefoxVer = 0;
if (!isChrome) {
    firefoxVer = (navigator.userAgent.match(/Firefox\/(\d+)/) || [, 0])[1];
}
function readStorage(name, cb) {
    if (!isChrome && firefoxVer < 53)
        //ff52-无sync
        chrome.storage.local.get(name, cb)
    else
        chrome.storage.sync.get(name, cb)
}
function saveStorage(save) {
    if (!isChrome && firefoxVer < 53)
        chrome.storage.local.set(save);
    else
        chrome.storage.sync.set(save);
}
function getCookie(name) {
    let cookies = {};
    document.cookie.split('; ').forEach(function (i) {
        let [key, ...val] = i.split('=');
        cookies[key] = val.join('=');
    });
    return cookies[name] || '';
}
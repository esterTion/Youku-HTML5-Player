var _ = function (type, props, children, callback) {
    var elem = null;
    if (type === "text") {
        return document.createTextNode(props);
    } else {
        elem = document.createElement(type);
    }
    for (var n in props) {
        if (n !== "style" && n !== "className") {
            elem.setAttribute(n, props[n]);
        } else if (n === "className") {
            elem.className = props[n];
        } else {
            for (var x in props.style) {
                elem.style[x] = props.style[x];
            }
        }
    }
    if (children) {
        for (var i = 0; i < children.length; i++) {
            if (children[i] != null)
                elem.appendChild(children[i]);
        }
    }
    if (callback && typeof callback === "function") {
        callback(elem);
    }
    return elem;
};

let isChrome=/chrome/i.test(navigator.userAgent);
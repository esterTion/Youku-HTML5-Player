/*!
 *
 * source: https://github.com/tiansh/ya-simple-scrollbar/blob/master/ya-simple-scrollbar.js
 * 
 * yaSimpleScrollbar v1.0
 *
 * Copyright (C) Sheng Tian
 *
 * The MIT License
 *   https://github.com/tiansh/ya-simple-scrollbar/blob/master/LICENSE
 *
 * Based on buzinas/simple-scrollbar, and, marcj/css-element-queries
 *   https://github.com/tiansh/ya-simple-scrollbar/blob/master/CREDITS.md
 */
document.head.appendChild(_('style', {}, [_('text',
    [
        '.yass-resize-sensor, .yass-resize-sensor-expand, .yass-resize-sensor-shrink { position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden; z-index: -1; visibility: hidden; }',
        '.yass-resize-sensor-expand .yass-resize-sensor-child { width: 100000px; height: 100000px; }',
        '.yass-resize-sensor-shrink .yass-resize-sensor-child { width: 200%; height: 200%; }',
        '.yass-resize-sensor-child { position: absolute; top: 0; left: 0; transition: 0s; }',
    ].join('')
)]))
var resizeSensor = function (element, resized) {
    var sensor = _('div', { className: 'yass-resize-sensor' });
    var expand = sensor.appendChild(_('div', { className: 'yass-resize-sensor-expand' }));
    var shrink = sensor.appendChild(_('div', { className: 'yass-resize-sensor-shrink' }));
    var expandChild = expand.appendChild(_('div', { className: 'yass-resize-sensor-child' }));
    var shrinkChild = shrink.appendChild(_('div', { className: 'yass-resize-sensor-child' }));
    element.appendChild(sensor);

    var lastWidth = element.offsetWidth;
    var lastHeight = element.offsetHeight;
    var newWidth, newHeight, dirty;

    var reset = function () {
        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;
        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    };

    reset();

    var onResized = function () {
        if (lastWidth === newWidth && lastHeight === newHeight) return;
        lastWidth = newWidth;
        lastHeight = newHeight;
        resized();
        reset();
    };
    var onScroll = function (event) {
        newWidth = element.offsetWidth;
        newHeight = element.offsetHeight;
        if (dirty) return; dirty = true;
        requestAnimationFrame(function () {
            dirty = false;
            onResized();
        });
    };

    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
};
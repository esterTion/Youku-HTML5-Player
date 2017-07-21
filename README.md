# Youku HTML5播放器扩展
作者：esterTion

[关于官方内测html5播放器](native-html5.md)

![](icon.png)

[更新日志](update_note.md)
- *uBlock扩展会导致本扩展无法正常工作，请禁用后在优酷站点刷新一次，再次启用即会正常*
> [@xinggsf]测试得出：放行tip.soku.com即可，如果还不行，放行g.alicdn.com和log.mmstat.com的东西即可

## 安装
- [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/youku-html5-player/)([xpi直接安装](https://estertion.github.io/Youku-HTML5-Player/signed.xpi)) (firefox 50.0+)
- [Chrome](https://chrome.google.com/webstore/detail/youku-html5-player/fpnknfakcmgkbhccgpgnbaddggjligol)([crx分流](https://estertion.github.io/Youku-HTML5-Player/signed.crx))（[xiaoC](http://www.jijidown.com)友情交易滋糍）(chrome 49.0+)

## 部分功能说明
- 清晰度切换位于播放器左下角，采用智能记忆模式
- （如一个视频有 标 高 超，点了高后会记住高清，但是点超后会清除，如果进入一个有原画的会选择原画（最高清晰度））
- 弹幕开关、设置、屏蔽，播放器音量均会自动记忆
- 含有多个音频语言的视频可以在右键菜单中切换，同类剧集间切换时临时记忆所选语言
- 多个语言的视频中，选择的语言为临时记忆，在剧集内切换时保留，打开其他没有同种语言的视频会丢弃已记忆语言
- 在视频播放器下方功能区中，下载按钮现在正如其名，含有下载功能
- 播放器各项设置现已整合进侧栏，通过右下按钮开启

### 其他浏览器？
- Safari扩展没有跨域特权，无法获取视频地址及正常播放
- Edge扩展整体残缺，无法可靠使用

### 使用组件
- [flv.js](https://github.com/esterTion/flv.js/releases)
- ABPlayer-bilibili-ver（有改动）

![](https://estertion.win/wp-content/uploads/2017/06/227b73c94a8766549bb100e67443cd145fdad09a.png)
![](https://estertion.win/wp-content/uploads/2017/06/d0af1f732f6fffbd47543d6ee070198df57f8349.png)

# English Version
## Youku HTML5 Player extension
Author: esterTion

- *uBlock Origin extension may conflict with playback, please disable it and refresh Youku page once, then you can enable it again*
> [@xinggsf] tested that you can bypass urls matching `tip.soku.com`, `g.alicdn.com` and `log.mmstat.com`

## Install

- [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/youku-html5-player/)([xpi direct install](https://estertion.github.io/Youku-HTML5-Player/signed.xpi)) (firefox 50.0+)
- [Chrome](https://chrome.google.com/webstore/detail/youku-html5-player/fpnknfakcmgkbhccgpgnbaddggjligol)([crx mirror](https://estertion.github.io/Youku-HTML5-Player/signed.crx))（Published with help from [xiaoC](http://www.jijidown.com)）(chrome 49.0+)

## Some feature notes
- Video quality switch located at bottom-left corner of player, and uses smart memorize mode
- (If a vid has *Fast SD HD*, once clicked SD it will be remembered, but memory will clear after clicking HD. If you enter a vid with FHD quality then that will be selected (highest quality) )
- Comment switch, player settings, block preferences, volume state will be automatic memorized
- Video with multiple language can be selected in context menu, and will be memorized temporarily when switching between episodes
- In the functional area below the player, the download(下载) button will now act as its name, leads to download links
- All player setttings are now in sidebar, which can be shown by button in bottom-right corner

### Other browser?
- Safari extension doesn't have cross-origin privilege, and that will prevent extension loading video source
- Edge extension is not fully functional, and cannot be used reliably

### Components used
- [flv.js](https://github.com/esterTion/flv.js/releases)
- ABPlayer-bilibili-ver（modified）

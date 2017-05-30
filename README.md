# Youku HTML5播放器扩展
作者：esterTion

![](icon.png)

[更新日志](update_note.md)
- *测试发现，uBlock扩展会导致本扩展无法正常工作，请禁用后在优酷站点刷新一次，再次启用即会正常*

## 安装
- [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/youku-html5-player/)([xpi直接安装](https://estertion.github.io/Youku-HTML5-Player/signed.xpi)) (firefox 50.0+)
- [Chrome](https://chrome.google.com/webstore/detail/youku-html5-player/fpnknfakcmgkbhccgpgnbaddggjligol)([crx分流](https://estertion.github.io/Youku-HTML5-Player/signed.crx))（[xiaoC](http://www.jijidown.com)友情交易滋糍）

## 部分功能说明
- 清晰度切换位于播放器左下角，采用智能记忆模式
- （如一个视频有 标 高 超，点了高后会记住高清，但是点超后会清除，如果进入一个有原画的会选择原画（最高清晰度））
- 弹幕开关、设置、屏蔽，播放器音量均会自动记忆
- 含有多个音频语言的视频可以在右键菜单中切换，暂时没有记忆所选语言的功能
- 多个语言的视频中，选择的语言为临时记忆，在剧集内切换时保留，打开其他没有同种语言的视频会丢弃已记忆语言

### 使用组件
- [flv.js](https://github.com/esterTion/flv.js/releases)
- ABPlayer-bilibili-ver（有改动）

![](https://estertion.win/wp-content/uploads/2017/05/ff8818f4f0d7578622f50355d268000a1b34e920.jpg)
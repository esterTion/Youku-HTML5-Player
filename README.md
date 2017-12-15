# Yet Another Player for Youku - 更好用的优酷播放器 扩展  
作者：esterTion  

> 旧名`Youku HTML5播放器`  

### 关于更名
项目于2017/10/28正式更名为Yet Another Player for Youku  
这个项目的初始目的是，在优酷全站依然坚持使用flash的情况下，帮助所有默认或手动禁用flash的浏览器能够正常观看视频  
同时这也是没有开发用于爱奇艺和腾讯视频的扩展的原因，因为去除广告不是根本目的，能够无flash正常观看才是  
现在，优酷已经全站，包括站外外链都启用了HTML5播放器，故而旧的名字也就不再适合，因为这并不是官方开发的HTML5播放器  
对于官方的HTML5播放器，有缺陷是必定的，同时我建议向官方反馈你们的真正需求。一个功能有更多人反馈要求，才更有可能快速的添加到播放器中  
时至今日，国内最大的三个视频站点均已支持HTML5播放器，这是浏览器厂商的强硬与网民的坚持造就的结果，我们也应为此自豪  

[关于官方html5播放器](native-html5.md)

![](icon.png)

> `权限说明`剪贴板权限为复制弹幕功能所需，并且扩展只获取写入的权限，无权读取已复制内容

## 安装  
当前版本：[![VERSION_TAG_NUMBER](https://img.shields.io/github/tag/esterTion/Youku-HTML5-Player.svg)](update_note.md)
- [Firefox ![Mozilla扩展中心](https://img.shields.io/amo/users/youku-html5-player.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/youku-html5-player/) ([xpi直接安装](https://estertion.github.io/Youku-HTML5-Player/signed.xpi)) (firefox 50.0+)
- [Chrome ![Chrome商店](https://img.shields.io/chrome-web-store/users/fpnknfakcmgkbhccgpgnbaddggjligol.svg)](https://chrome.google.com/webstore/detail/youku-html5-player/fpnknfakcmgkbhccgpgnbaddggjligol) ([crx分流](https://estertion.github.io/Youku-HTML5-Player/signed.crx)) (chrome 50.0+)

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

![](http://wx2.sinaimg.cn/large/763783e4ly1fjbcqqy7owj20zk0m8421.jpg)
![](https://estertion.win/wp-content/uploads/2017/06/d0af1f732f6fffbd47543d6ee070198df57f8349.png)

# English Version
## Youku HTML5 Player extension
Author: esterTion

> `Permission note` Pasteboard permission is for copying comment, extension only request write permission and cannot read your copied content

## Install

Current version：[![VERSION_TAG_NUMBER](https://img.shields.io/github/tag/esterTion/Youku-HTML5-Player.svg)](update_note.md)
- [Firefox ![Mozilla Add-on](https://img.shields.io/amo/users/youku-html5-player.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/youku-html5-player/) ([xpi direct install](https://estertion.github.io/Youku-HTML5-Player/signed.xpi)) (firefox 50.0+)
- [Chrome ![Chrome Web Store](https://img.shields.io/chrome-web-store/users/fpnknfakcmgkbhccgpgnbaddggjligol.svg)](https://chrome.google.com/webstore/detail/youku-html5-player/fpnknfakcmgkbhccgpgnbaddggjligol) ([crx mirror](https://estertion.github.io/Youku-HTML5-Player/signed.crx)) (chrome 50.0+)

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

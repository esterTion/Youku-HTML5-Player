优酷官方已经正式上线html5播放器，在主站正常浏览时，应会默认使用html5播放器  

（细节：播放器核心为hls.js，猜测没有经过深度自定义）

---
官方播放器状态（06/08）  
- 播放基本正常，部分粤剧存在无法播放/切换语言  
- 测试ublock origin可正常屏蔽贴片广告  
- 不支持弹幕  
- 没有记忆播放位置功能  
- 没有播放速度改变界面（可手动在控制台改变）  
- 整体界面处于初期阶段，没有动态效果、进度条预览等  
- 部分视频cdn跨域配置不正确会导致无法播放，遇到console报错`Access-Control-Allow-Origin`相关请联系优酷，并带上cdn ip地址报错 

---
09/19  
优酷目前启用html5的逻辑：  
- http浏览，且  
- 浏览器支持video标签，且  
- url中的`rand`参数 或 首次打开时设置的`vgray`随机数cookie(取值0-99) 不大于50
- 没有flash的浏览器，强制启用html5  

![](http://wx2.sinaimg.cn/large/763783e4ly1fjos79tgnuj20lr0dzzlv.jpg)

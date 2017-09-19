优酷官方已经灰度上线html5播放器，在主站浏览时，console中输入  
```Javascript
sessionStorage.setItem('P_l_h5',true)
```
即可启用官方html5（浏览器关闭前持续有效）。此时本扩展将检测不到flash播放器节点从而自动禁用，如需关闭官方html5，可重新启动浏览器或在控制台中输入  
```Javascript
sessionStorage.removeItem('P_l_h5')
```

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

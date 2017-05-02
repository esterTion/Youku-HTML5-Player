/*!
 *
 * ABPlayer-bilibili-ver
 * Copyright (c) 2014 Jim Chen (http://kanoha.org/), under the MIT license.
 *
 * bilibili-ver
 * @author zacyu
 *
 */
Array.from = Array.from || function(a){return [].slice.call(a)};
function isMobile() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; }

var ABP = {
	"version": "0.8.0"
};
ABP.Strings={
	statsPlayer:'播放器尺寸：',
	statsVideo:'视频分辨率：',
	statsBuffer:'可用缓冲：',
	statsBufferClip:'缓冲片段：',
	statsMozParse:'已解析帧：',
	statsMozDecode:'已解码帧：',
	statsMozPaint:'已绘制帧：',
	statsWebkitDecode:'已解码帧：',
	statsPresent:'已显示帧：',
	statsDrop:'已丢弃帧：',
	statsMimetype:'文件格式：',
	statsVideoBitrate:'本段视频码率：',
	statsAudioBitrate:'本段音频码率：',
	statsCurrentBitrate:'本段码率：',
	statsRealtimeBitrate:'实时码率：',
	overallBitrate:'总体码率：',
	statsDownloadSpeed:'下载速度：',
	
	sendSmall:"小字号",
	sendMid:"中字号",
	sendSize:'弹幕字号',
	sendMode:"弹幕模式",
	sendTop:"顶端渐隐",
	sendScroll:"滚动字幕",
	sendBottom:"底端渐隐",
	send:"发送",
	sendStyle:"弹幕样式",
	sendColor:"弹幕颜色",

	
	commentSpeed:"弹幕速度",
	commentScale:"弹幕比例",
	commentOpacity:"弹幕不透明度",
	commentBlock:"弹幕屏蔽设定",
	
	playSpeed:"播放速度",
	playSpeedReset:"还原正常速度",
	
	displayScaleD:"默认",
	displayScaleF:"全屏",
	
	shieldTypeText:'文字',
	shieldTypeUser:'用户',
	shieldTypeColor:'颜色',
	shieldTypeSetting:'设置',
	shieldAdd:'添加屏蔽……',
	shieldUseRegex:'启用正则',
	shieldBlockTop:'屏蔽顶端弹幕',
	shieldBlockBottom:'屏蔽底端弹幕',
	shieldBlockVisitor:'屏蔽游客弹幕',
	shieldRepeat:'去除刷屏弹幕',
	
	viewers:' 观众',
	comments:' 弹幕',
	commentTime:"时间",
	commentContent:"评论",
	commentDate:"发送日期",
	
	showStats:'显示统计信息',
	
	loadingMeta:'正在加载视频信息',
	switching:'正在切换',
	fetchURL:'正在获取视频地址',
	buffering:'正在缓冲',
	play:'播放',
	pause:'暂停',
	mute:'静音',
	unmute:'取消静音',
	muteNotSupported:'不支持静音',
	fullScreen:"浏览器全屏",
	exitFullScreen:"退出全屏",
	webFull:"网页全屏",
	exitWebFull:"退出网页全屏",
	wideScreen:"宽屏模式",
	exitWideScreen:"退出宽屏",
	sendTooltip:"毁灭地喷射白光!da!",
	showComment:"显示弹幕",
	hideComment:"隐藏弹幕",
	loopOn:"洗脑循环 on",
	loopOff:"洗脑循环 off",
	usingCanvas:'正在使用Canvas',
	usingCSS:'正在使用CSS',
	useCSS:'使用CSS绘制弹幕',
	autoOpacityOn:'关闭自动不透明度',
	autoOpacityOff:'开启自动不透明度',
	
	copyComment:'复制弹幕',
	findComment:'定位弹幕',
	blockContent:'屏蔽内容“',
	blockUser:'屏蔽发送者',
	blockColor:'屏蔽颜色',
	blockColorWhite:'不能屏蔽白色',
	copyFail:'复制失败，浏览器不支持',
	
	blockUserEmpty:'没有屏蔽用户',
	blockColorEmpty:'没有屏蔽颜色',
	repeatPcs:'条',
	repeatUnlimited:'不限制',
	
	dragControlLowInc:'低速快进',
	dragControlLowDec:'低速快退',
	dragControlMedInc:'中速快进',
	dragControlMedDec:'中速快退',
	dragControlHighInc:'高速快进',
	dragControlHighDec:'高速快退',
	dragControlCancel:'取消跳转'
};

(function() {
	"use strict";
	if (!ABP) return;
	var addEventListener='addEventListener',
	versionString='HTML5 Player ver.170426 based on ABPlayer-bilibili-ver',
	mousePrevPos=[0,0],
	mouseMoved=function(e){
		var oldPos=mousePrevPos;
		mousePrevPos=[e.clientX,e.clientY];
		return (oldPos[0] == mousePrevPos[0] 
		&& oldPos[1] == mousePrevPos[1]);
	},
	$ = function(e) {
		return document.getElementById(e);
	};
	var _ = function(type, props, children, callback) {
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

	var findRow = function(node) {
		var i = 1;
		while (node = node.previousSibling) {
			if (node.nodeType === 1) {
				++i
			}
		}
		return i;
	}

	var findClosest = function(node, className) {
		for (; node; node = node.parentNode) {
			if (hasClass(node.parentNode, className)) {
				return node;
			}
		}
	}

	HTMLElement.prototype.tooltip = function(data) {
		this.tooltipData = data;
		this.dispatchEvent(new Event("updatetooltip"));
	};

	if (typeof HTMLElement.prototype.requestFullScreen == "undefined") {
		HTMLElement.prototype.requestFullScreen = function() {
			if (this.webkitRequestFullscreen) {
				this.webkitRequestFullscreen();
			} else if (this.mozRequestFullScreen) {
				this.mozRequestFullScreen();
			} else if (this.msRequestFullscreen) {
				this.msRequestFullscreen();
			}
		}
	}

	if (typeof document.isFullScreen == "undefined") {
		document.isFullScreen = function() {
			return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenEnabled;
		}
	}

	if (typeof document.exitFullscreen == "undefined") {
		document.exitFullscreen = function() {
			if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (window.msExitFullscreen) {
				msExitFullscreen()
			}
		}
	}

	var pad = function(number, length) {
		length = length || 2;
		var str = '' + number;
		while (str.length < length) {
			str = '0' + str;
		}
		return str;
	}

	var htmlEscape = function(text) {
		return text.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}

	var formatInt = function(source, length) {
		var strTemp = "";
		for (var i = 1; i <= length - (source + "").length; i++) {
			strTemp += "0";
		}
		return strTemp + source;
	}

	var formatDate = function(timestamp, shortFormat) {
		if (timestamp == 0) {
			return lang['oneDay'];
		}
		var date = new Date((parseInt(timestamp)) * 1000),
			year, month, day, hour, minute, second;
		year = String(date.getFullYear());
		month = String(date.getMonth() + 1);
		if (month.length == 1) month = "0" + month;
		day = String(date.getDate());
		if (day.length == 1) day = "0" + day;
		hour = String(date.getHours());
		if (hour.length == 1) hour = "0" + hour;
		minute = String(date.getMinutes());
		if (minute.length == 1) minute = "0" + minute;
		second = String(date.getSeconds());
		if (second.length == 1) second = "0" + second;
		if (shortFormat) return String(month + "-" + day + " " + hour + ":" + minute);
		return String(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
	}

	var formatTime = function(time) {
		if (isNaN(time)) return '00:00';
		return formatInt(parseInt(time / 60), 2) + ':' + formatInt(parseInt(time % 60), 2);
	}

	var convertTime = function(formattedTime) {
		var timeParts = formattedTime.split(":"),
			total = 0;
		for (var i = 0; i < timeParts.length; i++) {
			total *= 60;
			var value = parseInt(timeParts[i]);
			if (isNaN(value) || value < 0) return false;
			total += value;
		}
		return total;
	}
	var hoverTooltip = function(elem, follow, yoffset) {
		if (!elem) return;
		elem[addEventListener]("mousemove", function(e) {
			var tooltip = $("ABP-Tooltip"),
				elemWidth = elem.clientWidth,
				elemHeight = elem.clientHeight,
				elemOffset = elem.getBoundingClientRect(),
				unitOffset = findClosest(elem, 'ABP-Unit').getBoundingClientRect(),
				elemTop = elemOffset.top - unitOffset.top,
				elemLeft = follow ? e.clientX - unitOffset.left : elemOffset.left - unitOffset.left,
				tooltipLeft = elemLeft,
				tooltipRect;
			if (tooltip == null) {
				tooltip = _("div", {
					"id": "ABP-Tooltip",
				}, [_("text", elem.tooltipData)]);
				tooltip.by = elem;
				findClosest(elem, 'ABP-Unit').appendChild(tooltip);
				tooltip.style["top"] = elemTop + elemHeight + 2 + "px";
				tooltip.style["left"] = elemLeft + elemWidth / 2 - tooltip.clientWidth / 2 + "px";
				tooltipLeft += elemWidth / 2 - tooltip.clientWidth / 2;
			}
			if (follow) {
				tooltip.style["left"] = elemLeft - tooltip.clientWidth / 2 + "px";
				tooltipLeft -= elemWidth / 2;
			}
			tooltipRect=tooltip.getBoundingClientRect();
			if(tooltipRect.left < unitOffset.left){
				tooltip.style.left='0px';
			}else if(tooltipRect.right > unitOffset.right){
				tooltip.style.left=unitOffset.width-tooltipRect.width+'px';
			}
			yoffset=yoffset||-6;
			if (yoffset) {
				tooltip.style["top"] = elemTop - tooltip.clientHeight + 2 + yoffset + "px";
			}
		});
		var mouseout = function() {
			var tooltip = $("ABP-Tooltip");
			if (tooltip && tooltip.parentNode) {
				tooltip.remove();
			}
		},
		touchendTimeout=null;
		elem[addEventListener]("mouseout", mouseout);
		elem[addEventListener]("touchend", function(){
			if(touchendTimeout != null){
				clearTimeout(touchendTimeout);
				touchendTimeout = null;
			}
			touchendTimeout = setTimeout(function(){
				touchendTimeout = null;
				mouseout();
			},2e3);
		});
		elem[addEventListener]("updatetooltip", function(e) {
			var tooltip = $("ABP-Tooltip");
			if (tooltip && tooltip.by == e.target) {
				tooltip.innerHTML = elem.tooltipData;
			}
		});
	}
	var addClass = function(elem, className) {
		if (elem == null) return;
		var oldClass = elem.className.split(" ");
		if (oldClass[0] == "") oldClass = [];
		if (oldClass.indexOf(className) < 0) {
			oldClass.push(className);
		}
		elem.className = oldClass.join(" ");
	};
	var hasClass = function(elem, className) {
		if (elem == null) return false;
		var oldClass = elem.className.split(" ");
		if (oldClass[0] == "") oldClass = [];
		return oldClass.indexOf(className) >= 0;
	}
	var removeClass = function(elem, className) {
		if (elem == null) return;
		var oldClass = elem.className.split(" ");
		if (oldClass[0] == "") oldClass = [];
		if (oldClass.indexOf(className) >= 0) {
			oldClass.splice(oldClass.indexOf(className), 1);
		}
		elem.className = oldClass.join(" ");
	};
	var buildFromDefaults = function(n, d) {
		var r = {};
		for (var i in d) {
			if (n && typeof n[i] !== "undefined")
				r[i] = n[i];
			else
				r[i] = d[i];
		}
		return r;
	}


	ABP.create = function(element, params) {
		var elem = element;
		if (!params) {
			params = {};
		}
		ABP.playerConfig = params.config ? params.config : {};
		params = buildFromDefaults(params, {
			"replaceMode": true,
			"width": 512,
			"height": 384,
			"src": ""
		});
		if (typeof element === "string") {
			elem = $(element);
		}
		// 'elem' is the parent container in which we create the player.
		if (!hasClass(elem, "ABP-Unit")) {
			// Assuming we are injecting
			var container = _("div", {
				"className": "ABP-Unit",
				"style": {
					"width": params.width.toString().indexOf("%") >= 0 ? params.width : params.width + "px",
					"height": params.height.toString().indexOf("%") >= 0 ? params.height : params.height + "px"
				}
			});
			elem.appendChild(container);
		} else {
			container = elem;
		}
		// Create the innards if empty
		if (container.children.length > 0 && params.replaceMode) {
			container.innerHTML = "";
		}
		var playlist = [];
		var danmaku = [];
		if (typeof params.src === "string") {
			params.src = _("video", {
				"autobuffer": "true",
				"dataSetup": "{}",
			}, [
				_("source", {
					"src": params.src
				})
			]);
			playlist.push(params.src);
		} else if (params.src.hasOwnProperty("playlist")) {
			var data = params.src;
			var plist = data.playlist;
			for (var id = 0; id < plist.length; id++) {
				if (plist[id].hasOwnProperty("sources")) {
					var sources = [];
					for (var mime in plist[id]["sources"]) {
						sources.push(_("source", {
							"src": plist[id][mime],
							"type": mime
						}));
					}
					playlist.push(_("video", {
						"autobuffer": "true",
						"dataSetup": "{}",
					}, sources));
				} else if (plist[id].hasOwnProperty("video")) {
					playlist.push(plist[id]["video"]);
				} else {}
				danmaku.push(plist[id]["comments"]);
			}
		} else {
			playlist.push(params.src);
		}
		container.appendChild(_("div", {
			"className": "ABP-Player"
		}, [_("div", {
			"className": "ABP-Video",
			"tabindex": "10"
		}, [_('div',{id:'info-box',style:{opacity:1}},[
				_('div',{className:'text-wrapper'},[_('div',{},[_('text',ABP.Strings.loadingMeta)])]),
				_('div',{id:'dots'})
			]),
			_("div", {
				"className": "ABP-Container"
			}),playlist[0],_('div',{className:'Player-Stats'},[
				/*
				dimension
					player
					video
				buffer
				*flvjs
					mimeType
					audioCodec
					videoCodec
					fps
					videoBit
					audioBit
					currentBitrate
				bitrate
				*firefox
					frames
						decoded
						painted
						presented
						dropped
				*webkit
					frames
						decoded
						dropped
				*/
				_('div',{id:'player-dimension'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsPlayer)]),_('span')]),
				_('div',{id:'video-dimension'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsVideo)]),_('span')]),
				_('div',{id:'mimeType'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsMimetype)]),_('span')]),
				_('div',{id:'buffer-health'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsBuffer)]),_('span',{className:'stats-column',id:'buffer-health-column'}),_('span')]),
				_('div',{style:{position:'relative'}},[
				_('span',{className:'stats_name'},[_('text',ABP.Strings.statsBufferClip)]),_('span',{id:'buffer-clips'},[
					_('span'),
					_('span',{},[
						_('div',{style:{width:'1px',height:'400%',top:'-150%',position:'absolute',background:'#FFF',left:0}})
					])
				]),_('pre',{style:{position:'absolute',margin:0,left:'250px',width:'90px',fontFamily:'inherit'}})]),
				
				_('br',{className:'flvjs'}),
				_('div',{className:'flvjs'},[_('span',{className:'stats_name'},[_('text','fps：')]),_('span')]),
				_('div',{className:'flvjs',title:'1 kbps = 1000 bps'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsVideoBitrate)]),_('span')]),
				_('div',{className:'flvjs',title:'1 kbps = 1000 bps'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsAudioBitrate)]),_('span')]),
				_('div',{className:'flvjs',title:'1 kbps = 1000 bps'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsCurrentBitrate)]),_('span')]),
				
				_('div',{title:'1 kbps = 1000 bps'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.overallBitrate)]),_('span',{id:'overall-bitrate'})]),
				_('div',{className:'flvjs',title:'1 kbps = 1000 bps'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsRealtimeBitrate)]),_('span',{className:'stats-column',id:'realtime-bitrate-column',style:{verticalAlign:'top'}}),_('span')]),
				_('div',{className:'flvjs'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsDownloadSpeed)]),_('span',{className:'stats-column',id:'download-speed-column',style:{verticalAlign:'top'}}),_('span')]),
				_('br'),

				_('div',{className:'gecko'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsMozParse)]), _('span',{id:'mozParsedFrames'})]),
				_('div',{className:'gecko'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsMozDecode)]), _('span',{id:'mozDecodedFrames'})]),
				_('div',{className:'gecko'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsMozPaint)]), _('span',{id:'mozPaintedFrames'})]),
				//_('div',{className:'gecko'},[_('text',ABP.Strings.statsMozPresent), _('span',{id:'mozPresentedFrames'})]),
				//_('div',{className:'gecko'},[_('text',ABP.Strings.statsMozDrop), _('span',{id:'mozDroppedFrames'})]),

				_('div',{className:'webkit'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsWebkitDecode)]), _('span',{id:'webkitDecodedFrameCount'})]),
				_('div',{className:'webkit'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsDrop)]), _('span',{id:'webkitDroppedFrameCount'})]),
				
				_('div',{className:'videoQuality'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsPresent)]), _('span',{id:'totalVideoFrames'})]),
				_('div',{className:'videoQuality'},[_('span',{className:'stats_name'},[_('text',ABP.Strings.statsDrop)]), _('span',{id:'droppedVideoFrames'})]),
				
				_('br'),
				_('div',{style:{fontSize:'11px'}},[_('text',versionString)]),
				_('div',{style:{fontSize:'11px'}},[_('text','2017©esterTion')]),
				_('div',{id:'stats-close'},[_('text','×')])
			]),_('div',{className:'Drag-Control'},[
			_('div',{className:'Drag-Icon'}),
			_('div',{className:'Drag-Speed'},[_('text','')]),
			_('div',{className:'Drag-Time'},[_('text','00:00╱00:00')]),
			_('div',{className:'Drag-Time-Bar'},[_('div',{className:'fill'})])
		])
		]), _("div", {
			"className": "ABP-Bottom",
		}, [_("div", {
			"className": "ABP-Bottom-Extend"
		}),_("div", {
			"className": "BiliPlus-Scale-Menu"
		}, [_("div",{
			"className": "Video-Defination"
		}),_("div",{
			"className": "Video-Scale"
		},[_("div", {
				'changeTo':'default',
				'className':'on'
			}, [_("text", ABP.Strings.displayScaleD)]),
			_("div", {
				'changeTo':'16_9'
			}, [_("text", "16:9")]),
			_("div", {
				'changeTo':'4_3'
			}, [_("text", "4:3")]),
			_("div", {
				'changeTo':'full'
			}, [_("text", ABP.Strings.displayScaleF)])
		])
		]),_("div", {
			"className": "ABP-Text",
		}, [
			_("div", {
				"className": "ABP-CommentStyle"
			}, [
				_("div", {
					"className": "button-group ABP-Comment-FontGroup"
				}, [_("div", {
					"className": "button ABP-Comment-Font icon-font-style"
				}), _("div", {
					"className": "ABP-Comment-FontOption"
				}, [
					_("p", {
						"className": "style-title"
					}, [_("text", ABP.Strings.sendSize)]),
					_("div", {
						"className": "style-select",
						"name": "commentFontSize"
					}, [_("div", {
						"className": "style-option",
						"value": 18
					}, [_("text", ABP.Strings.sendSmall)]), _("div", {
						"className": "style-option on",
						"value": 25
					}, [_("text", ABP.Strings.sendMid)])]),
					_("p", {
						"className": "style-title"
					}, [_("text", ABP.Strings.sendMode)]),
					_("div", {
						"className": "style-select",
						"name": "commentMode"
					}, [_("div", {
						"className": "style-option",
						"value": 5
					}, [_("text", ABP.Strings.sendTop)]), _("div", {
						"className": "style-option on",
						"value": 1
					}, [_("text", ABP.Strings.sendScroll)]), _("div", {
						"className": "style-option",
						"value": 4
					}, [_("text", ABP.Strings.sendBottom)])])
				])]),
				_("div", {
					"className": "button-group ABP-Comment-ColorGroup"
				}, [_("div", {
					"className": "ABP-Comment-Color-Display"
				}), _("div", {
					"className": "button ABP-Comment-Color icon-color-mode"
				}), _("div", {
					"className": "ABP-Comment-ColorOption"
				}, [_("div", {
					"className": "ABP-Comment-ColorPicker"
				})])]),
			]),
			_('form',{},[_("input", {
				"className": "ABP-Comment-Input",
			})]),
			_("div", {
				"className": "ABP-Comment-Send"
			}, [
				_("text", ABP.Strings.send)
			])
		]), _("div", {
			"className": "ABP-Control"
		}, [
			_("div", {
				"className": "button ABP-Play icon-play"
			}),
			_("div", {
				"className": "progress-bar"
			}, [
				_("div", {
					"className": "bar"
				}, [
					_("div", {
						"className": "load"
					}),
					_("div", {
						"className": "dark"
					})
				]),
			]),
			_("div", {
				"className": "time-label"
			}, [_("text", "00:00 / 00:00")]),
			_("div", {
				"className": "button ABP-Volume icon-volume-high"
			}),
			_("div", {
				"className": "volume-bar"
			}, [
				_("div", {
					"className": "bar"
				}, [
					_("div", {
						"className": "load"
					})
				]),
			]),
			_("div", {
				"className": "button-group ABP-CommentGroup"
			}, [_("div", {
				"className": "button ABP-CommentShow icon-comment on"
			}), _("div", {
				"className": "ABP-CommentOption"
			}, [_('p', {
				className:'label'
			}, [_('text',ABP.Strings.useCSS), _("div", {
				"className": "prop-checkbox"
			})]), _("p", {
				"className": "label"
			}, [_("text", ABP.Strings.commentSpeed)]), _("div", {
				"className": "speed-bar"
			}, [
				_("div", {
					"className": "bar"
				}, [
					_("div", {
						"className": "load"
					})
				]),
			]), _("p", {
				"className": "label"
			}, [_("text", ABP.Strings.commentScale)]), _("div", {
				"className": "scale-bar"
			}, [
				_("div", {
					"className": "bar"
				}, [
					_("div", {
						"className": "load"
					})
				]),
			]), _("p", {
				"className": "label"
			}, [_("text", ABP.Strings.commentOpacity)]), _("div", {
				"className": "opacity-bar",
				style:{
					width:'calc(100% - 25px)'
				}
			}, [
				_("div", {
					"className": "bar"
				}, [
					_("div", {
						"className": "load"
					})
				]),
			]),_("div", {
				"className": "prop-checkbox",
				style:{
					top:'121px'
				}
			}), _("div", {
				"className": "shield-enrty"
			}, [
				_("text", ABP.Strings.commentBlock),
			])])]), _("div", {
				"className": "button-group ABP-PlaySpeedGroup"
			},[_("div", {
				"className": "button ABP-Loop icon-loop"
			}), _("div", {
				"className": "ABP-PlaySpeedOption"
			},[_("p", {
				"className": "label"
			}, [_("text", ABP.Strings.playSpeed)]), _("div", {
				"className": "playSpeed-bar"
			}, [
				_("div", {
					"className": "bar"
				}, [
					_("div", {
						"className": "load"
					})
				]),
			]), _("div",{
				"className": "play-speed-reset"
			},[_("text", ABP.Strings.playSpeedReset)])])]), _("div", {
				"className": "button ABP-WideScreen icon-tv"
			}),
			_("div", {
				"className": "button-group ABP-FullScreenGroup"
			}, [_("div", {
				"className": "button ABP-FullScreen icon-screen-full"
			}), _("div", {
				"className": "button ABP-Web-FullScreen icon-screen"
			})])
		])])]));
		container.appendChild(_('div',{className:'shield hidden'},[
			_('div',{
				className:'shield_top'
			},[_('text',ABP.Strings.commentBlock),_('span',{className:'close'})]),
			_('div',{className:'shield_tabs'},[
				_('div',{className:'shield_tab on'},[_('div',{},[_('text',ABP.Strings.shieldTypeText)])]),
				_('div',{className:'shield_tab'},[_('div',{},[_('text',ABP.Strings.shieldTypeUser)])]),
				_('div',{className:'shield_tab'},[_('div',{},[_('text',ABP.Strings.shieldTypeColor)])]),
				_('div',{className:'shield_tab'},[_('div',{},[_('text',ABP.Strings.shieldTypeSetting)])])
			]),
			_('div',{className:'shield_tab_slash'}),
			_('div',{className:'shield_body'},[
				_('div',{className:'shield_body_wrapper'},[
					_('div',{className:'shield_tab_body'},[
						_('div',{id:'shield_text'}),
						_('div',{className:'shield_item'},[
							_('input',{className:'new',type:'text',placeholder:ABP.Strings.shieldAdd}),
							_('div',{className:'add'})
						]),
					]),
					_('div',{className:'shield_tab_body'},[
						_('div',{id:'shield_user'})
					]),
					_('div',{className:'shield_tab_body'},[
						_('div',{id:'shield_color'})
					]),
					_('div',{className:'shield_tab_body'},[
						_('div',{className:'shield_toggle',id:'useReg'},[_('text',ABP.Strings.shieldUseRegex)]),
						_('div',{className:'shield_toggle',id:'blockTop'},[_('text',ABP.Strings.shieldBlockTop)]),
						_('div',{className:'shield_toggle',id:'blockBottom'},[_('text',ABP.Strings.shieldBlockBottom)]),
						_('div',{className:'shield_toggle',id:'blockVisitor'},[_('text',ABP.Strings.shieldBlockVisitor)]),
						_('div',{className:'shield_slide',id:'repeat'},[
							_('div',{className:'fill'}),
							_('div',{className:'button'}),
							_('div',{className:'slide_info'})
						]),
						_('div',{style:{padding:'0 16px'}},[_('text',ABP.Strings.shieldRepeat)])
					])
				])
			])
		]))
		container.appendChild(_("div", {
			"className": "ABP-Comment-List"
		}, [
			_('div',{
				className:'ABP-Comment-List-Count'
			},[
				_('div',{
					style:{
						position:'absolute',
						right:'200px'
					}
				},[_('span',{id:'viewer',style:{fontWeight:'bold'}},[_('text','--')]),_('text',ABP.Strings.viewers)]),
				_('div',{
					style:{
						position:'absolute',
						right:'20px'
					}
				},[_('span',{id:'danmaku',style:{fontWeight:'bold'}},[_('text','--')]),_('text',ABP.Strings.comments)]),
			]),
			_("div", {
				"className": "ABP-Comment-List-Title"
			}, [_("div", {
				"className": "cmt-time",
				"item": "time"
			}, [_("text", ABP.Strings.commentTime)]), _("div", {
				"className": "cmt-content",
				"item": "content"
			}, [_("text", ABP.Strings.commentContent)]), _("div", {
				"className": "cmt-date",
				"item": "date"
			}, [_("text", ABP.Strings.commentDate)])]), _("div", {
				"className": "ABP-Comment-List-Container"
			}, [_("ul", {
				"className": "ABP-Comment-List-Container-Inner"
			})])
		]));
		container.appendChild(_('div',{className:'Context-Menu'},[
			_('div',{className:'Context-Menu-Background'}),
			_('div',{className:'Context-Menu-Body'},[
				_('div',{id:'Player-Stats-Toggle'},[_('text',ABP.Strings.showStats)]),
				_('div',{id:'Player-Speed-Control',className:'dm'},[_('div',{className:'content'},[_('text',ABP.Strings.playSpeed)]),_('div',{className:'dmMenu',style:{top:'-37px'}},[
					_('div',{'data-speed':0.5},[_('text',0.5)]),
					_('div',{'data-speed':1},[_('text',1)]),
					_('div',{'data-speed':1.25},[_('text',1.25)]),
					_('div',{'data-speed':1.5},[_('text',1.5)]),
					_('div',{'data-speed':2},[_('text',2)])
				])]),
				_('div',{className:'about'},[_('text',versionString)])
			])
		]));
		var bind = ABP.bind(container);
		if (playlist.length > 0) {
			var currentVideo = playlist[0];
			bind.gotoNext = function() {
				var index = playlist.indexOf(currentVideo) + 1;
				if (index < playlist.length) {
					currentVideo = playlist[index];
					currentVideo.style.display = "";
					var container = bind.video.parentNode;
					container.removeChild(bind.video);
					container.appendChild(currentVideo);
					bind.video.style.display = "none";
					bind.video = currentVideo;
					bind.swapVideo(currentVideo);
					currentVideo[addEventListener]("ended", function() {
						bind.gotoNext();
					});
				}
			}
			currentVideo[addEventListener]("ended", function() {
				bind.gotoNext();
			});
		}
		return bind;
	}
	var getBuffer=function(video){
		for(var s,e,i=0,currentTime=video.currentTime;i<video.buffered.length;i++){
			if( currentTime>=video.buffered.start(i) && currentTime<=video.buffered.end(i) ){
				s = video.buffered.start(i);
				e = video.buffered.end(i);
				break;
			}
		}
		if(i==video.buffered.length)
			throw 'Not in a range';
		return {
			start:s,
			end:e,
			delta:e-currentTime
		}
	};

	ABP.bind = function(playerUnit, state) {
		var ABPInst = {
			playerUnit: playerUnit,
			btnPlay: null,
			barTime: null,
			barLoad: null,
			barTimeHitArea: null,
			barVolume: null,
			barVolumeHitArea: null,
			barOpacity: null,
			barOpacityHitArea: null,
			barScale: null,
			barScaleHitArea: null,
			barSpeed: null,
			barSpeedHitArea: null,
			barPlaySpeed: null,
			barPlaySpeedHitArea: null,
			btnFont: null,
			btnColor: null,
			btnSend: null,
			controlBar: null,
			timeLabel: null,
			timeJump: null,
			divComment: null,
			btnWide: null,
			btnFull: null,
			btnWebFull: null,
			btnDm: null,
			btnLoop: null,
			btnProp: null,
			btnAutoOpacity: null,
			videoDiv: null,
			btnVolume: null,
			video: null,
			txtText: null,
			commentColor: 'ffffff',
			commentFontSize: 25,
			commentMode: 1,
			displayColor: null,
			cmManager: null,
			commentList: null,
			commentListContainer: null,
			lastSelectedComment: null,
			commentCoolDown: 10000,
			commentScale: ABP.playerConfig.scale ? ABP.playerConfig.scale : 1,
			commentSpeed: ABP.playerConfig.speed ? ABP.playerConfig.speed : 1,
			proportionalScale: ABP.playerConfig.prop,
			defaults: {
				w: 0,
				h: 0
			},
			state: buildFromDefaults(state, {
				fullscreen: false,
				commentVisible: true,
				allowRescale: false,
				autosize: false,
				widescreen: false
			}),
			createPopup: function(text, delay) {
				if (playerUnit.hasPopup === true)
					return false;
				var p = _("div", {
					"className": "ABP-Popup"
				}, [_("text", text)]);
				p.remove = function() {
					if (p.isRemoved) return;
					p.isRemoved = true;
					playerUnit.removeChild(p);
					playerUnit.hasPopup = false;
				};
				playerUnit.appendChild(p);
				playerUnit.hasPopup = true;
				if (typeof delay === "number") {
					setTimeout(function() {
						p.remove();
					}, delay);
				}
				return p;
			},
			removePopup: function() {
				var pops = playerUnit.getElementsByClassName("ABP-Popup");
				for (var i = 0; i < pops.length; i++) {
					if (pops[i].remove != null) {
						pops[i].remove();
					} else {
						pops[i].parentNode.removeChild(pops[i]);
					}
				}
				playerUnit.hasPopup = false;
			},
			loadCommentList: function(sort, order) {
				order = order == "asc" ? -1 : 1;
				var keysSorted = Object.keys(ABPInst.commentList).sort(function(a, b) {
					if (ABPInst.commentList[a][sort] < ABPInst.commentList[b][sort]) return order;
					if (ABPInst.commentList[a][sort] > ABPInst.commentList[b][sort]) return -order;
					return 0;
				});
				ABPInst.commentObjArray = [];
				for (i in keysSorted) {
					var key = keysSorted[i];
					var comment = ABPInst.commentList[key];
					if (comment && comment.time) {
						var commentObj = _("li", {}),
							commentObjTime = _("span", {
								"className": "cmt-time"
							}, [_("text", formatTime(comment.time / 1000))]),
							commentObjContent = _("span", {
								"className": "cmt-content"
							}, [_("text", comment.content)]),
							commentObjDate = _("span", {
								"className": "cmt-date"
							}, [_("text", formatDate(comment.date, true))]);
						hoverTooltip(commentObjContent, false, 36);
						hoverTooltip(commentObjDate, false, 18);
						commentObjContent.tooltip(comment.content);
						commentObjDate.tooltip(formatDate(comment.date));
						commentObj.appendChild(commentObjTime);
						commentObj.appendChild(commentObjContent);
						commentObj.appendChild(commentObjDate);
						commentObj.data = comment;
						commentObj.originalData=danmaku;
						if(comment.mode==8){
							commentObj.style.background='#ffe100';
						}else if(comment.pool!=0){
							commentObj.style.background='#20ff20';
						}
						commentObj[addEventListener]("dblclick", function(e) {
							ABPInst.video.currentTime = this.data.time / 1000;
							updateTime(video.currentTime);
						});
						ABPInst.commentObjArray.push(commentObj);
					}
				}
				ABPInst.commentListContainer.style.height = ABPInst.commentObjArray.length * 24 + "px";
				ABPInst.renderCommentList();
				ABPInst.playerUnit.querySelector('.ABP-Comment-List-Count span#danmaku').innerHTML=ABPInst.commentObjArray.length;
			},
			renderCommentList: function() {
				var offset = ABPInst.commentListContainer.parentElement.scrollTop,
					firstIndex = parseInt(offset / 24);
				ABPInst.commentListContainer.innerHTML = "";
				for (var i = firstIndex; i <= firstIndex + 40; i++) {
					if (typeof ABPInst.commentObjArray[i] !== "undefined") {
						if (i == firstIndex && i > 0) {
							var commentObj = ABPInst.commentObjArray[i].cloneNode(true),
								commentObjContent = commentObj.getElementsByClassName("cmt-content")[0],
								commentObjDate = commentObj.getElementsByClassName("cmt-date")[0];
							commentObj[addEventListener]("dblclick", function(e) {
								ABPInst.video.currentTime = ABPInst.commentObjArray[i].data.time / 1000;
								updateTime(video.currentTime);
							});
							hoverTooltip(commentObjContent, false, 36);
							hoverTooltip(commentObjDate, false, 18);
							commentObjContent.tooltip(ABPInst.commentObjArray[i].data.content);
							commentObjDate.tooltip(formatDate(ABPInst.commentObjArray[i].data.date));
							commentObj.style.paddingTop = 24 * firstIndex + "px";
						} else {
							var commentObj = ABPInst.commentObjArray[i];
						}
						if(ABPInst.commentObjArray[i].data.originalData.isBlocked){
							ABPInst.commentObjArray[i].childNodes[0].className='cmt-time blocked';
						}else{
							ABPInst.commentObjArray[i].childNodes[0].className='cmt-time';
						}
						ABPInst.commentListContainer.appendChild(commentObj);
					} else {
						break;
					}
				}
				ABPInst.commentListContainer.parentElement.scrollTop = offset;
			},
			commentCallback: function(data) {
				if (data.result) {
					ABPInst.commentList[data.id] = ABPInst.commentList[data.tmp_id];
					delete ABPInst.commentList[data.tmp_id];
				} else {
					delete ABPInst.commentList[data.tmp_id];
					ABPInst.createPopup(data.error, 5000);
				}
			},
			swapVideo: null
		};
		var saveSetting=function(k,v){
			var settings=localStorage.html5Settings||'{}';
			settings=JSON.parse(settings);
			settings[k]=v;
			localStorage.html5Settings=JSON.stringify(settings);
		}
		ABPInst.swapVideo = function(video) {
			var bufferListener=function() {
				if (!dragging) {
					updateTime(video.currentTime);
					try {
						var buffer=getBuffer(this),
						dur = this.duration,
						perc = (buffer.end / dur) * 100;
						ABPInst.barLoad.style.width = perc + "%";
					} catch (err) {
						return;
					}
				}
			}
			video[addEventListener]("timeupdate", bufferListener);
			var lastCheckTime = 0,isFirst=true,isEnded=false,isLooping=false,loadingNew=false,
			autoPlay=function(){
				loadingNew=false;
				video.removeEventListener('canplay',autoPlay);
				if(video.paused)
					ABPInst.btnPlay.click();
				if(ABPInst.lastTime!=undefined){
					video.currentTime=ABPInst.lastTime;
					delete ABPInst.lastTime;
				}
				if(ABPInst.lastSpeed!=undefined){
					video.playbackRate=ABPInst.lastSpeed;
					delete ABPInst.lastSpeed;
				}
			},
			buffering=function(){
				var rs=video.readyState,div=document.getElementById('info-box');
				if(video.ended)
					return;
				switch(rs){
					case 1:
						if(isMobile() && video.paused){
							ABPInst.createPopup('请点击播放器开始播放',3e3);
							ABPInst.video.dispatchEvent(new Event('autoPlayFailed'));
						}
					case 2:
						if(div.style.opacity==0){
							div.style.opacity=1;
						}
						if(!dots.running)
							dots.runTimer();
						try{
							var buffer=getBuffer(video);
							div.childNodes[0].childNodes[0].innerHTML=ABP.Strings.buffering+' '+Math.floor( (buffer.delta)*100 )/100+'s';
						}catch(e){
							div.childNodes[0].childNodes[0].innerHTML=ABP.Strings.buffering;
						}
					break;
					case 3:
					case 4:
						if(div.style.opacity==1){
							div.style.opacity=0;
							dots.stopTimer();
						}
					break;
				}
			},
			saveHistory=function(){
				if(!window.cid || isEnded || isLooping || loadingNew)
					return;
				var history=JSON.parse(localStorage.playHistory||'{}');
				history[cid]=video.currentTime|0;
				localStorage.playHistory=JSON.stringify(history);
			},
			removeHistory=function(){
				if(!window.cid)
					return;
				var history=JSON.parse(localStorage.playHistory||'{}');
				if(history[cid])
					delete history[cid];
				localStorage.playHistory=JSON.stringify(history);
			};
			video[addEventListener]('autoplay',function(){
				video[addEventListener]('canplay',autoPlay);
			});
			video[addEventListener]('pause',saveHistory);
			video[addEventListener]('ended',function(){isEnded=true;removeHistory();})
			try{
				var history=JSON.parse(localStorage.playHistory||'{}');
				if(history[cid]!=undefined)
					ABPInst.lastTime=history[cid];
			}catch(e){}
			window[addEventListener]('beforeunload',function(){saveHistory();return null;});
			ABPInst.playerUnit[addEventListener]('beforecidchange',function(){saveHistory();loadingNew=true;isEnded=false});
			video[addEventListener]('loop',function(){isLooping=video.loop});
			video[addEventListener]('canplay',autoPlay);
			video[addEventListener]('canplay',buffering);
			video[addEventListener]('waiting',buffering);
			video[addEventListener]('progress',buffering);
			video[addEventListener]("ended", function() {
				ABPInst.btnPlay.className = "button ABP-Play icon-play";
				ABPInst.videoDiv.className='ABP-Video';
				if(window.parent!=window && parent.h5NextPart)
					parent.h5NextPart();
			});
			video[addEventListener]("progress", bufferListener);
			var isPlaying = false;
			video[addEventListener]("play", function() {
				ABPInst.btnPlay.className='button ABP-Play ABP-Pause icon-pause';
				ABPInst.btnPlay.tooltip(ABP.Strings.pause);
				addClass(ABPInst.videoDiv, "ABP-HideCursor");
			});
			video[addEventListener]("ratechange", function() {
				if (video.playbackRate !== 0) {
					updatePlaySpeed(ABPInst.video.playbackRate);
				}
			});
			var isPlaying = false;
			video[addEventListener]("pause", function() {
				ABPInst.btnPlay.className='button ABP-Play icon-play';
				ABPInst.btnPlay.tooltip(ABP.Strings.play)
				isPlaying = false;
				removeClass(ABPInst.videoDiv, "ABP-HideCursor");
			});
			video.isBound = true;
			var lastPosition = 0,triedLoadScripting=false;
		}
		if (playerUnit === null || playerUnit.getElementsByClassName === null) return;
		ABPInst.defaults.w = playerUnit.offsetWidth;
		ABPInst.defaults.h = playerUnit.offsetHeight;
		var _v = playerUnit.getElementsByClassName("ABP-Video");
		if (_v.length <= 0) return;
		var video = null;
		ABPInst.videoDiv = _v[0];
		for (var i in _v[0].children) {
			if (_v[0].children[i].tagName != null &&
				_v[0].children[i].tagName.toUpperCase() === "VIDEO") {
				video = _v[0].children[i];
				break;
			}
		}
		var cmtc = _v[0].getElementsByClassName("ABP-Container");
		if (cmtc.length > 0)
			ABPInst.divComment = cmtc[0];
		if (video === null) return;
		ABPInst.video = video;
		ABPInst.video.seek=function(t){this.currentTime=parseFloat(t)/1000;};
		/** Bind the Play Button **/
		var _p = playerUnit.getElementsByClassName("ABP-Play");
		if (_p.length <= 0) return;
		ABPInst.btnPlay = _p[0];
		ABPInst.btnPlay.tooltip(ABP.Strings.play);
		hoverTooltip(ABPInst.btnPlay);
		/** Bind the Loading Progress Bar **/
		var pbar = playerUnit.getElementsByClassName("progress-bar");
		if (pbar.length <= 0) return;
		var pbars = pbar[0].getElementsByClassName("bar");
		ABPInst.barTimeHitArea = pbars[0];
		ABPInst.barLoad = pbars[0].getElementsByClassName("load")[0];
		ABPInst.barTime = pbars[0].getElementsByClassName("dark")[0];
		/** Bind the Time Label **/
		var _tl = playerUnit.getElementsByClassName("time-label");
		if (_tl.length <= 0) return;
		ABPInst.timeLabel = _tl[0];
		/** Bind the Volume button **/
		var vlmbtn = playerUnit.getElementsByClassName("ABP-Volume");
		if (vlmbtn.length <= 0) return;
		ABPInst.btnVolume = vlmbtn[0];
		ABPInst.btnVolume.tooltip(ABP.Strings.mute);
		hoverTooltip(ABPInst.btnVolume);
		/** Bind the Volume Bar **/
		var vbar = playerUnit.getElementsByClassName("volume-bar");
		if (vbar.length <= 0) return;
		var vbars = vbar[0].getElementsByClassName("bar");
		ABPInst.barVolumeHitArea = vbars[0];
		ABPInst.barVolume = vbars[0].getElementsByClassName("load")[0];
		/** Bind the Opacity Bar **/
		var obar = playerUnit.getElementsByClassName("opacity-bar");
		if (obar.length <= 0) return;
		var obar = obar[0].getElementsByClassName("bar");
		ABPInst.barOpacityHitArea = obar[0];
		ABPInst.barOpacity = obar[0].getElementsByClassName("load")[0];
		/** Bind the Scale Bar **/
		var sbar = playerUnit.getElementsByClassName("scale-bar");
		if (sbar.length <= 0) return;
		var sbar = sbar[0].getElementsByClassName("bar");
		ABPInst.barScaleHitArea = sbar[0];
		ABPInst.barScale = sbar[0].getElementsByClassName("load")[0];
		/** Bind the Speed Bar **/
		var spbar = playerUnit.getElementsByClassName("speed-bar");
		if (spbar.length <= 0) return;
		var spbar = spbar[0].getElementsByClassName("bar");
		ABPInst.barSpeedHitArea = spbar[0];
		ABPInst.barSpeed = spbar[0].getElementsByClassName("load")[0];
		/** Bind the Play Speed Bar **/
		var pspbar = playerUnit.getElementsByClassName("playSpeed-bar");
		if (pspbar.length <= 0) return;
		var pspbar = pspbar[0].getElementsByClassName("bar");
		ABPInst.barPlaySpeedHitArea = pspbar[0];
		ABPInst.barPlaySpeed = pspbar[0].getElementsByClassName("load")[0];
		playerUnit.querySelector('.play-speed-reset')[addEventListener]('click',function(){
			ABPInst.video.playbackRate=1;
		});
		/** Bind the Proportional Scale checkbox **/
		var pcheck = playerUnit.getElementsByClassName("prop-checkbox");
		if (pcheck.length <= 0) return;
		ABPInst.btnAutoOpacity = pcheck[1];
		ABPInst.btnAutoOpacity.tooltip(ABP.Strings.autoOpacityOff)
		hoverTooltip(ABPInst.btnAutoOpacity);
		ABPInst.btnProp = pcheck[0];
		ABPInst.btnProp.tooltip(ABP.Strings.usingCanvas);
		hoverTooltip(ABPInst.btnProp);
		/** Bind the FullScreen button **/
		var fbtn = playerUnit.getElementsByClassName("ABP-FullScreen");
		if (fbtn.length <= 0) return;
		ABPInst.btnFull = fbtn[0];
		ABPInst.btnFull.tooltip(ABP.Strings.fullScreen);
		hoverTooltip(ABPInst.btnFull);
		/** Bind the WebFullScreen button **/
		var wfbtn = playerUnit.getElementsByClassName("ABP-Web-FullScreen");
		if (wfbtn.length <= 0) return;
		ABPInst.btnWebFull = wfbtn[0];
		ABPInst.btnWebFull.tooltip(ABP.Strings.webFull);
		hoverTooltip(ABPInst.btnWebFull);
		/** Bind the WideScreen button **/
		var wsbtn = playerUnit.getElementsByClassName("ABP-WideScreen");
		if (wsbtn.length <= 0) return;
		ABPInst.btnWide = wsbtn[0];
		ABPInst.btnWide.tooltip(ABP.Strings.wideScreen);
		hoverTooltip(ABPInst.btnWide);
		/** Bind the Comment Font button **/
		var cfbtn = playerUnit.getElementsByClassName("ABP-Comment-Font");
		if (cfbtn.length <= 0) return;
		ABPInst.btnFont = cfbtn[0];
		ABPInst.btnFont.tooltip(ABP.Strings.sendStyle);
		hoverTooltip(ABPInst.btnFont);
		/** Bind the Comment Color button **/
		var ccbtn = playerUnit.getElementsByClassName("ABP-Comment-Color");
		if (ccbtn.length <= 0) return;
		ABPInst.btnColor = ccbtn[0];
		ABPInst.btnColor.tooltip(ABP.Strings.sendColor);
		hoverTooltip(ABPInst.btnColor);
		var ccd = playerUnit.getElementsByClassName("ABP-Comment-Color-Display");
		if (ccd.length <= 0) return;
		ABPInst.displayColor = ccd[0];
		/** Bind the Comment Input **/
		var cmti = playerUnit.getElementsByClassName("ABP-Comment-Input");
		if (cmti.length <= 0) return;
		ABPInst.txtText = cmti[0];
		/** Bind the Send Comment List Container **/
		var clc = playerUnit.getElementsByClassName("ABP-Comment-List-Container-Inner");
		if (clc.length <= 0) return;
		ABPInst.commentListContainer = clc[0];
		/** Bind the Send Comment button **/
		var csbtn = playerUnit.getElementsByClassName("ABP-Comment-Send");
		if (csbtn.length <= 0) return;
		ABPInst.btnSend = csbtn[0];
		ABPInst.btnSend.tooltip(ABP.Strings.sendTooltip);
		hoverTooltip(ABPInst.btnSend);
		// Controls
		var controls = playerUnit.getElementsByClassName("ABP-Control");
		if (controls.length > 0) {
			ABPInst.controlBar = controls[0];
		}
		/** Bind the Comment Disable button **/
		var cmbtn = playerUnit.getElementsByClassName("ABP-CommentShow");
		if (cmbtn.length <= 0) return;
		ABPInst.btnDm = cmbtn[0];
		ABPInst.btnDm.tooltip(ABP.Strings.hideComment);
		hoverTooltip(ABPInst.btnDm);
		/** Bind the Loop button **/
		var lpbtn = playerUnit.getElementsByClassName("ABP-Loop");
		if (lpbtn.length <= 0) return;
		ABPInst.btnLoop = lpbtn[0];
		ABPInst.btnLoop.tooltip(ABP.Strings.loopOff);
		hoverTooltip(ABPInst.btnLoop);
		
		var enabledStats={
			videoDimension:true,
			gecko:true,
			webkit:true,
			videoQuality:true,
			flvjs:true
		},document_querySelector=function(a){return document.querySelector(a)},
		to2digitFloat=function(a){return (a*1).toFixed(2)},
		lastChild='>:last-child',
		playerDimension=document_querySelector('#player-dimension'+lastChild),
		videoDimension=document_querySelector('#video-dimension'+lastChild),
		canvasFPS=document_querySelector('#canvas-fps'+lastChild),
		bufferColumn=document_querySelector('#buffer-health-column'),
		realtimeBitrateColumn=document_querySelector('#realtime-bitrate-column'),
		downloadSpeedColumn=document_querySelector('#download-speed-column'),
		bufferArr=[],
		realtimeBitrateArr=[],
		downloadSpeedArr=[],
		bufferNum=document_querySelector('#buffer-health'+lastChild),
		svgStats='<svg style="width:180px;height:21px"><polyline style="fill:transparent;stroke:#ccc"></polyline><polyline points="1,21 180,21 180,1" style="fill:transparent;stroke:#fff"></polyline></svg>',
		addStyle='',style=document.createElement('style'),flvjsStyle=document.createElement('style'),flvjsStats=document.querySelectorAll('.flvjs>:last-child'),i=0,
		renderColumn=function(column,arr){
			var max=0,i,points=[];
			arr.forEach(function(i){max=(i>max)?i:max});
			max==0&&(max=1);
			for(i in arr){
				points.push(i*3 + ',' + (20*(1-arr[i]/max)+1) + ' ' + (i*3+3) +','+ (20*(1-arr[i]/max)+1));
			}
			column.setAttribute('points',points.join(' '));
		},
		playerStatsOn=false,
		contextToggle=document_querySelector('#Player-Stats-Toggle'),
		contextToggleListener=function(e){
			if(e.target.id=='stats-close')
				e.stopPropagation();
			document_querySelector('.Player-Stats').style.display=playerStatsOn?'':'block';
			playerStatsOn=!playerStatsOn;
		},
		lastCurrent=-1,
		odd=0;
		contextToggle[addEventListener]('click',contextToggleListener);
		document_querySelector('#stats-close')[addEventListener]('click',contextToggleListener);
		for(;i<60;i++){
			bufferArr.push(0);
			realtimeBitrateArr.push(0);
			downloadSpeedArr.push(0);
		}
		//bufferColumn=document.querySelectorAll('#buffer-health-column>span');
		bufferColumn.innerHTML=svgStats;
		bufferColumn=bufferColumn.querySelector('polyline');
		realtimeBitrateColumn.innerHTML=svgStats;
		realtimeBitrateColumn=realtimeBitrateColumn.querySelector('polyline');
		downloadSpeedColumn.innerHTML=svgStats;
		downloadSpeedColumn=downloadSpeedColumn.querySelector('polyline');
		//realtimeBitrateColumn=document.querySelectorAll('#realtime-bitrate-column>span');
		if(video.videoWidth==undefined){
			enabledStats.videoDimension=false;
			addStyle+='#video-dimension{display:none}';
		}
		if(video.mozDecodedFrames==undefined){
			enabledStats.gecko=false;
			addStyle+='.gecko{display:none}';
		}
		if(video.webkitDecodedFrameCount==undefined){
			enabledStats.webkit=false;
			addStyle+='.webkit{display:none}';
		}
		if(video.getVideoPlaybackQuality==undefined){
			enabledStats.videoQuality=false;
			addStyle+='.videoQuality{display:none}'
		}
		style.innerHTML=addStyle,
		document.head.appendChild(style);
		flvjsStyle.innerHTML='.flvjs{display:none}';
		document.head.appendChild(flvjsStyle);
		if(window.flvplayer==undefined){
			enabledStats.flvjs=false;
		}
		
		setInterval(function(){
			odd^=1;
			playerDimension.innerHTML=video.offsetWidth+'x'+video.offsetHeight+' *'+devicePixelRatio;
			if(enabledStats.videoDimension){
				videoDimension.innerHTML=video.videoWidth+'x'+video.videoHeight;
			}
			
			var buffer={};
			try{
				buffer=getBuffer(video);
			}catch(e){}
			buffer=buffer.delta||0
			bufferArr.push(buffer);
			bufferArr.shift();
			bufferNum.innerHTML=to2digitFloat(buffer)+'s';
			if(playerStatsOn)
				renderColumn(bufferColumn,bufferArr);
			
			//Buffer Clip Render
			if(playerStatsOn){
				var buffered = video.buffered,
				clipsContainer=document_querySelector('#buffer-clips>span');
			
				var duration = video.duration==Infinity ? buffered.end(buffered.length-1) : video.duration,
				clipsTitle=[];
				for(var i=0,start,length;i<buffered.length;i++){
					if(i>=clipsContainer.childNodes.length){
						clipsContainer.appendChild(_('span',{className:'buffer-clip'}));
					}
					start = buffered.start(i);
					length = buffered.end(i) - start;
					clipsContainer.childNodes[i].style.left=to2digitFloat(start/duration*100) + '%';
					clipsContainer.childNodes[i].style.width=to2digitFloat(length / duration * 100) + '%';
					clipsTitle.push(formatTime(start|0)+' - '+formatTime((start+length)|0));
				}
				while(i<clipsContainer.childNodes.length){
					clipsContainer.childNodes[i].remove();
				}
				clipsContainer.parentNode.parentNode.childNodes[2].innerHTML=clipsTitle.join('\n');
				document_querySelector('#buffer-clips>span>div').style.left = to2digitFloat(video.currentTime / duration*100) + '%';
			}
			
			if(enabledStats.flvjs){
				if(flvplayer._mediaInfo){
					flvjsStyle.innerHTML='';
					var i=0,mediaInfo=flvplayer._mediaInfo,statisticsInfo=flvplayer.statisticsInfo,currentTime=video.currentTime,segs=flvplayer._mediaDataSource.segments,timeOffset=0,off=0,bitrate,j;
					for(j=0;j<segs.length;j++){
						if(currentTime<=(timeOffset+segs[j].duration)/1e3){
							//console.log(off,timeOffset,currentTime)
							timeOffset=(currentTime-timeOffset/1e3)|0;
							break;
						}else{
							timeOffset+=segs[j].duration;
							off++
						}
					}
					var currentSize=segs[j].filesize,currentDuration=segs[j].duration;
					/*['mimeType','audioCodec','videoCodec'].forEach(function(name){
						flvjsStats[i++].innerHTML=mediaInfo[name];
					})*/
					document_querySelector('#mimeType>:last-child').innerHTML=mediaInfo.mimeType;
					flvjsStats[i++].innerHTML=to2digitFloat(mediaInfo.fps);
					flvjsStats[i++].innerHTML=to2digitFloat(mediaInfo.videoDataRate)+' kbps';
					flvjsStats[i++].innerHTML=to2digitFloat(mediaInfo.audioDataRate)+' kbps';
					flvjsStats[i++].innerHTML=to2digitFloat(currentSize/currentDuration*8)+' kbps'
					
					if(mediaInfo.bitrateMap){
						
						if(mediaInfo.bitrateMap[off])
							bitrate=mediaInfo.bitrateMap[off][timeOffset]
						if(bitrate!=undefined){
							if(odd && lastCurrent!=(video.currentTime|0)){
								lastCurrent=video.currentTime|0;
								flvjsStats[i++].innerHTML=to2digitFloat(bitrate)+' kbps';
								realtimeBitrateArr.push(bitrate);
								realtimeBitrateArr.shift();
								if(playerStatsOn)
									renderColumn(realtimeBitrateColumn,realtimeBitrateArr);
							}else{
								i++;
							}
						}else{
							flvjsStats[i++].innerHTML='N/A';
						}
					}else{
						flvjsStats[i++].innerHTML='N/A'
					}
					if(odd){
						downloadSpeedArr.push(statisticsInfo.speed);
						downloadSpeedArr.shift();
						if(playerStatsOn)
							renderColumn(downloadSpeedColumn,downloadSpeedArr);
						flvjsStats[i++].innerHTML=to2digitFloat(statisticsInfo.speed)+' KB/s'
						flvplayer._statisticsInfo.speed=0;
					}
				}else{
					flvjsStyle.innerHTML='.flvjs{display:none}';
					document_querySelector('#mimeType>:last-child').innerHTML='video/mp4';
				}
			}
			if(!window.overallBitrate){
				document_querySelector('#overall-bitrate').parentNode.style.display='none'
			}else{
				document_querySelector('#overall-bitrate').parentNode.style.display=''
				document_querySelector('#overall-bitrate').innerHTML=to2digitFloat(overallBitrate)+' kbps';
			}
			
			if(enabledStats.gecko){
				['mozParsedFrames','mozDecodedFrames','mozPaintedFrames'].forEach(function(name){
					document_querySelector('#'+name).innerHTML=video[name];
				})
			}
			
			if(enabledStats.webkit){
				['webkitDecodedFrameCount','webkitDroppedFrameCount'].forEach(function(name){
					document_querySelector('#'+name).innerHTML=video[name];
				})
			}
			
			if(enabledStats.videoQuality){
				var quality=video.getVideoPlaybackQuality();
				document_querySelector('#totalVideoFrames').innerHTML=quality.totalVideoFrames;
				document_querySelector('#droppedVideoFrames').innerHTML=quality.droppedVideoFrames;
			}
		},500)
		
		if (typeof ABP.playerConfig == "object") {
			if (ABP.playerConfig.volume) ABPInst.video.volume = ABP.playerConfig.volume;
		}
		if (video.isBound !== true) {
			ABPInst.swapVideo(video);
			ABPInst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Defination')[addEventListener]('click',function(e){
				if(!e.target.hasAttribute('changeto'))
					return false;
				var t=JSON.parse(e.target.getAttribute('changeto'));
				changeSrc({target:{value:t[1]}},t[0]);
				removeClass(e.target.parentNode.querySelector('.on'),'on');
				addClass(e.target, 'on');
			});
			ABPInst.playerUnit.querySelector('.BiliPlus-Scale-Menu .Video-Scale')[addEventListener]('click',function(e){
				if(!e.target.hasAttribute('changeto'))
					return false;
				switch( e.target.getAttribute('changeto') ){
					case 'default':
						if( hasClass(ABPInst.video, 'scale') ){
							removeClass(ABPInst.video, 'scale');
						}
						ABPInst.video.style.width='';
						ABPInst.video.style.height='';
						ABPInst.video.style.paddingTop='';
						ABPInst.video.style.paddingLeft='';
					break;
					case '16_9':
						addClass(ABPInst.video, 'scale');
						var width=ABPInst.videoDiv.offsetWidth, height=ABPInst.videoDiv.offsetHeight, paddingTop='', paddingLeft='';
						if( width < (height/9*16) ){
							//Calc base on width
							paddingTop=( height-(width/16*9) )/2+'px';
							height=( (width/16*9)/height *100)+'%';
							width='100%';
						}else{
							//Calc base on height
							paddingLeft=( width-(height/9*16) )/2+'px';
							width=( (height/9*16)/width *100)+'%';
							height='100%';
						}
						ABPInst.video.style.width=width;
						ABPInst.video.style.height=height;
						ABPInst.video.style.paddingTop=paddingTop;
						ABPInst.video.style.paddingLeft=paddingLeft;
					break;
					case '4_3':
						addClass(ABPInst.video, 'scale');
						var width=ABPInst.videoDiv.offsetWidth, height=ABPInst.videoDiv.offsetHeight, paddingTop='', paddingLeft='';
						if( width < (height/3*4) ){
							//Calc base on width
							paddingTop=( height-(width/4*3) )/2+'px';
							height=( (width/4*3)/height *100)+'%';
							width='100%';
						}else{
							//Calc base on height
							paddingLeft=( width-(height/3*4) )/2+'px';
							width=( (height/3*4)/width *100)+'%';
							height='100%';
						}
						ABPInst.video.style.width=width;
						ABPInst.video.style.height=height;
						ABPInst.video.style.paddingTop=paddingTop;
						ABPInst.video.style.paddingLeft=paddingLeft;
					break;
					case 'full':
						addClass(ABPInst.video, 'scale');
						ABPInst.video.style.width='';
						ABPInst.video.style.height='';
						ABPInst.video.style.paddingTop='';
						ABPInst.video.style.paddingLeft='';
					break;
				}
				removeClass(e.target.parentNode.querySelector('.on'),'on');
				addClass(e.target, 'on');
			});
			var autoPlayFailed=false;
			video[addEventListener]('autoPlayFailed',function(){
				autoPlayFailed=true;
			})
			var timeoutPause,lastClick=0,
			videoDivClickEventListener=function(e) {
				var now=Date.now();
				if(now-lastClick<=500){
					ABPInst.btnFull.click();
					if(now-lastClick<=200)
						clearTimeout(timeoutPause);
					else
						ABPInst.btnPlay.click();
				}else{
					if(autoPlayFailed){
						ABPInst.btnPlay.click();
						autoPlayFailed=false;
					}else
					timeoutPause=setTimeout(function(){
						ABPInst.btnPlay.click();
					},250);
				}
				lastClick=now;
				e.preventDefault();
			};
			ABPInst.videoDiv[addEventListener]("click", videoDivClickEventListener);
			ABPInst.playerUnit.querySelector('.ABP-Bottom-Extend')[addEventListener]('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				videoDivClickEventListener(e);
			})
			var hideCursorTimer = setTimeout(function() {
				addClass(ABPInst.videoDiv, "ABP-HideCursor");
			}, 3000);
			ABPInst.videoDiv[addEventListener]("mousemove", function(e) {
				if(!mouseMoved(e))
				if (hideCursorTimer) {
					clearTimeout(hideCursorTimer);
				}
				if (hasClass(ABPInst.videoDiv, "ABP-HideCursor")) {
					removeClass(ABPInst.videoDiv, "ABP-HideCursor");
				}
				hideCursorTimer = setTimeout(function() {
					addClass(ABPInst.videoDiv, "ABP-HideCursor");
				}, 3000);
			});
			ABPInst.btnVolume[addEventListener]("click", function() {
				if (ABPInst.video.muted == false) {
					ABPInst.video.muted = true;
					if(ABPInst.video.muted == false){
						this.tooltip(ABP.Strings.muteNotSupported);
						return;
					}
					this.className = "button ABP-Volume icon-volume-mute2";
					this.tooltip(ABP.Strings.unmute);
					ABPInst.barVolume.style.width = "0%";
				} else {
					ABPInst.video.muted = false;
					this.className = "button ABP-Volume icon-volume-";
					if (ABPInst.video.volume < .10) this.className += "mute";
					else if (ABPInst.video.volume < .33) this.className += "low";
					else if (ABPInst.video.volume < .67) this.className += "medium";
					else this.className += "high";
					this.tooltip(ABP.Strings.mute);
					ABPInst.barVolume.style.width = (ABPInst.video.volume * 100) + "%";
				}
			});
			ABPInst.btnWebFull[addEventListener]("click", function() {
				ABPInst.state.fullscreen = hasClass(playerUnit, "ABP-FullScreen");
				addClass(playerUnit, "ABP-FullScreen");
				ABPInst.btnFull.className = "button ABP-FullScreen icon-screen-normal";
				ABPInst.btnFull.tooltip(ABP.Strings.exitWebFull);
				ABPInst.state.fullscreen = true;
				if (!ABPInst.state.allowRescale) return;
			});
			var fullscreenChangeHandler = function() {
				if (!document.isFullScreen() && hasClass(playerUnit, "ABP-FullScreen")) {
					removeClass(playerUnit, "ABP-FullScreen");
					ABPInst.btnFull.className = "button ABP-FullScreen icon-screen-full";
					ABPInst.btnFull.tooltip(ABP.Strings.fullScreen);
					ABPInst.state.fullscreen=!!document.isFullScreen();
					//ABPInst.btnLoop.click();ABPInst.btnLoop.click();
				}
			}
			document[addEventListener]("fullscreenchange", fullscreenChangeHandler, false);
			document[addEventListener]("webkitfullscreenchange", fullscreenChangeHandler, false);
			document[addEventListener]("mozfullscreenchange", fullscreenChangeHandler, false);
			document[addEventListener]("MSFullscreenChange", fullscreenChangeHandler, false);
			ABPInst.btnFull[addEventListener]("click", function() {
				ABPInst.state.fullscreen = hasClass(playerUnit, "ABP-FullScreen");
				if (!ABPInst.state.fullscreen) {
					addClass(playerUnit, "ABP-FullScreen");
					this.className = "button ABP-FullScreen icon-screen-normal";
					this.tooltip(ABP.Strings.exitFullScreen);
					playerUnit.requestFullScreen();
				} else {
					removeClass(playerUnit, "ABP-FullScreen");
					this.className = "button ABP-FullScreen icon-screen-full";
					this.tooltip(ABP.Strings.fullScreen);
					document.exitFullscreen();
				}
				ABPInst.state.fullscreen = !ABPInst.state.fullscreen;
				if (!ABPInst.state.allowRescale) return;
			});

			ABPInst.btnWide[addEventListener]("click", function() {
				ABPInst.state.widescreen = hasClass(playerUnit, "ABP-WideScreen");
				if (!ABPInst.state.widescreen) {
					addClass(playerUnit, "ABP-WideScreen");
					this.className = "button ABP-WideScreen icon-tv on";
					playerUnit.dispatchEvent(new Event("wide"));
					this.tooltip(ABP.Strings.exitWideScreen);
				} else {
					removeClass(playerUnit, "ABP-WideScreen");
					this.className = "button ABP-WideScreen icon-tv";
					playerUnit.dispatchEvent(new Event("normal"));
					this.tooltip(ABP.Strings.wideScreen);
				}
				ABPInst.state.widescreen = !ABPInst.state.widescreen;
				if (!ABPInst.state.allowRescale) return;
			});
			ABPInst.btnLoop[addEventListener]("click", function() {
				if (ABPInst.video.loop == false) {
					ABPInst.video.loop = true;
					this.className = "button ABP-Loop icon-loop on";
					this.tooltip(ABP.Strings.loopOn);
				} else {
					ABPInst.video.loop = false;
					this.className = "button ABP-Loop icon-loop";
					this.tooltip(ABP.Strings.loopOff);
				}
				ABPInst.video.dispatchEvent(new CustomEvent('loop'))
			});
			var contextMenu=ABPInst.playerUnit.querySelector('.Context-Menu'),
			contextMenuBackground=contextMenu.querySelector('.Context-Menu-Background'),
			contextMenuBody=contextMenu.querySelector('.Context-Menu-Body'),
			dismissListener=function(e){
				if(activingContext){
					e.preventDefault();
					e.stopPropagation();
					activingContext=!1;
					return false;
				}
				contextMenu.style.display='none';
				e.preventDefault();
			},
			commentLocating=function(id){
				var i=0,found=-1
				for(var i=0,len=ABPInst.commentObjArray.length;i<len;i++){
					if(ABPInst.commentObjArray[i].data.originalData.dbid == id){
						found=i;
						break;
					}
				}
				if(found==-1)
					return;
				if(ABPInst.state.fullscreen)
					ABPInst.btnFull.click();
				if(ABPInst.state.widescreen)
					ABPInst.btnWide.click();
				ABPInst.commentListContainer.parentNode.scrollTop=found*24;
			},
			senderInfoTimeout=null,senderInfoDivTimeout=null,currentSender=0,currentSenderDiv=null,
			senderInfoCache={},
			getSenderInfo=function(){
				if(currentSender==0)
					return;
				if(senderInfoCache[currentSender]!=undefined){
					contextMenuBody.dispatchEvent(new CustomEvent('senderInfoFetched',{detail:senderInfoCache[currentSender]}))
					return;
				}
				var s=_('script',{className:'info_jsonp',src:'//account.bilibili.com/api/member/getCardByMid?type=jsonp&callback=getSenderInfo&mid='+currentSender});
				document.body.appendChild(s);
			},
			showContextMenu=function(x,y,dmList){
				contextMenu.style.display='block';
				var aboutDiv,remove=contextMenuBody.querySelectorAll('.dm'),originalData,color,isWhite,containerBox=ABPInst.playerUnit.getBoundingClientRect(),
				dmitem;
				for(i=remove.length-2;i>=0;i--){
					remove[i].remove();
				}
				aboutDiv=contextMenuBody.firstChild;
				x-=containerBox.left;
				y-=containerBox.top;
				if( containerBox.width-x <300)
					x=containerBox.width-300;
				if( containerBox.height-contextMenuBody.offsetHeight-y <0)
					y=containerBox.height-contextMenuBody.offsetHeight;
				var lastMenu=contextMenuBody.querySelector('.dm:nth-last-of-type(2)>.dmMenu')
				if(lastMenu!=null){
					lastMenu.style.display='block';
					var lastMenuBox=lastMenu.getBoundingClientRect();
					lastMenu.style.display='';
					if( containerBox.top+containerBox.height-lastMenuBox.height-y <0)
						y=containerBox.height-lastMenuBox.height;
				}
				contextMenuBody.style.left=x+'px';
				contextMenuBody.style.top=y+'px';
			},
			touchContextTimer=null,activingContext=!1,
			/*
			触屏拖动进度控制
			
			左右超过10px进入拖动状态
			上下超过10px忽略本次拖动
			
			屏幕两侧50px取消拖动
			*/
			timeDraggingMode = false, ignoreDragging = false, cancelingDragging = false, draggingStartX,draggingStartY,draggingTimeBase,draggingDismissTimeout=null;
			contextMenuBody.querySelector('#Player-Speed-Control .dmMenu')[addEventListener]('click',function(e){
				var speed=e.target.getAttribute('data-speed');
				if(speed!=undefined)
					ABPInst.video.playbackRate = speed;
			});
			contextMenuBody[addEventListener]('senderInfoFetched',function(e){
				var card=e.detail;
				if(card.mid!=currentSender || currentSenderDiv==null){
					return;
				}
				var box=currentSenderDiv.parentNode.getBoundingClientRect(),x=box.left-150,y=innerHeight-box.bottom,
				infoDiv=_('div',{className:'Context-Menu-Body',id:'Sender-Info',style:{
					left:x+'px',
					bottom:y+'px',
					position:'fixed',
					fontFamily:"-apple-system,Arial,'PingFang SC','STHeiti Light','Hiragino Kaku Gothic ProN','Microsoft YaHei'",
					textAlign:'center'
				}},[
					_('div',{},[
						_('img',{style:{height:'130px',width:'130px'},src:card.face.replace(/http\:/,'')})
					]),
					_('div',{},[_('text',card.name)]),
					_('div',{},[_('text',card.mid)]),
					_('div',{},[_('text','LV'+card.level_info.current_level)])
				]);
				document.body.appendChild(infoDiv);
				if((y+infoDiv.offsetHeight)>innerHeight){
					infoDiv.style.bottom='';
					infoDiv.style.top=(box.top)+'px';
				}
				infoDiv[addEventListener]('click',function(){
					window.open('/space/'+card.mid+'/');
					document.body.removeChild(infoDiv);
				})
				infoDiv[addEventListener]('mouseenter',function(){
					clearTimeout(senderInfoDivTimeout);
				})
				infoDiv[addEventListener]('mouseleave',function(){
					clearTimeout(senderInfoDivTimeout);
					senderInfoDivTimeout=setTimeout(function(){document.body.removeChild(document.getElementById('Sender-Info'))},500);
				})
			});
			window.getSenderInfo=function(json){
				if(json.code==0){
					senderInfoCache[currentSender]=json.card;
					contextMenuBody.dispatchEvent(new CustomEvent('senderInfoFetched',{detail:json.card}))
				}
			}
			contextMenu[addEventListener]('click',dismissListener);
			contextMenuBackground[addEventListener]('contextmenu',dismissListener);
			ABPInst.videoDiv.parentNode[addEventListener]('contextmenu',function(e){
				e.preventDefault();
				e.stopPropagation();
				var box=ABPInst.divComment.getBoundingClientRect(),x=e.clientX,
				y=e.clientY;
				showContextMenu(x,y);
			})
			ABPInst.commentListContainer[addEventListener]('contextmenu',function(e){
				var dmData=e.target.parentNode.data
				if(dmData==undefined)
					return false;
				e.preventDefault();
				e.stopPropagation();
				showContextMenu(e.clientX,e.clientY,[dmData]);
			});
			ABPInst.videoDiv.parentNode[addEventListener]('touchstart',function(e){
				timeDraggingMode = false;
				ignoreDragging = false;
				draggingTimeBase = ABPInst.video.currentTime;
				activingContext=!1;
				if(e.touches.length>1 && touchContextTimer!=null){
					clearTimeout(touchContextTimer);
					touchContextTimer=null;
					return;
				}
				var box=ABPInst.divComment.getBoundingClientRect(),
				x=e.touches[0].clientX,
				y=e.touches[0].clientY,
				draggingStartX = x;
				draggingStartY = y;
				touchContextTimer=setTimeout(function(){
					ignoreDragging = true;
					touchContextTimer=null;
					activingContext=!0;
					showContextMenu(x,y);
				},300);
			});
			ABPInst.playerUnit.querySelector('.shield').addEventListener('touchstart touchmove touchend',function(e){e.stopPropagation()})
			ABPInst.videoDiv.parentNode[addEventListener]('touchmove',function(e){
				if(touchContextTimer!=null){
					clearTimeout(touchContextTimer);
					touchContextTimer=null;
				}
				var x=e.touches[0].clientX,
				y=e.touches[0].clientY,
				dx=x-draggingStartX,
				dy=y-draggingStartY,
				playerBox = ABPInst.videoDiv.getBoundingClientRect(),
				playerWidth = playerBox.width,
				playerHeight = playerBox.height;
				if(timeDraggingMode){
					var draggingSpeed = 0, increasing = dx>0 ? 1 : 0, speedStringMap = ['Low','Med','High'], duration = ABPInst.video.duration;
					if( y < playerHeight/3){
						draggingTimeBase += dx*.2;
					}else if( y < playerHeight*2/3 ){
						draggingTimeBase += dx*.6;
						draggingSpeed = 1;
					}else{
						draggingTimeBase += dx*1.5;
						draggingSpeed = 2;
					}
					draggingTimeBase = draggingTimeBase<0 ? 0 : (draggingTimeBase>duration ? duration : draggingTimeBase)
					draggingStartX += dx;
					if(draggingStartX-playerBox.left<50 || playerBox.right-draggingStartX<50){
						document.querySelector('.Drag-Icon').className = 'Drag-Icon cancel';
						document_querySelector('.Drag-Speed').innerHTML = ABP.Strings.dragControlCancel;
						document_querySelector('.Drag-Time').innerHTML = '　';
						cancelingDragging = true;
					}else{
						document.querySelector('.Drag-Icon').className = 'Drag-Icon '+ (increasing?'forward':'rewind');
						document_querySelector('.Drag-Speed').innerHTML = ABP.Strings['dragControl' + speedStringMap[draggingSpeed] + (increasing?'Inc':'Dec')];
						document_querySelector('.Drag-Time').innerHTML = formatTime(draggingTimeBase) +'╱'+ formatTime(duration);
						cancelingDragging = false;
						if(duration>0)
							document.querySelector('.Drag-Time-Bar .fill').style.width = draggingTimeBase/duration*100 +'%'
					}
				}else if(!ignoreDragging){
					if(dx<-10 || dx>10){
						timeDraggingMode = true;
						if(draggingDismissTimeout!=null){
							clearTimeout(draggingDismissTimeout);
							draggingDismissTimeout=null;
						}
						document_querySelector('.Drag-Control').style.display = 'block';
					}else if( dy<-10 || dy>10 ){
						ignoreDragging = true;
					}
				}
			});
			ABPInst.videoDiv.parentNode[addEventListener]('touchend',function(){
				if(touchContextTimer!=null){
					clearTimeout(touchContextTimer);
					touchContextTimer=null;
				}
				if(timeDraggingMode&& !cancelingDragging){
					ABPInst.video.currentTime = draggingTimeBase;
				}
				draggingDismissTimeout = setTimeout(function(){
					document_querySelector('.Drag-Control').style.display = 'none';
				},1e3);
			});
			contextMenuBody[addEventListener]('touchstart',function(e){
				var box=contextMenuBody.getBoundingClientRect();
				if(e.touches[0].clientX-box.left<=box.width && e.touches[0].clientY-box.top<=box.height)
					activingContext=!0;
			})

			var saveConfigurations = function() {
			}

			var sendComment = function() {
			};

			ABPInst.txtText.parentNode[addEventListener]("submit", function(e) {
				e.preventDefault();
				sendComment();
				return false;
			});

			ABPInst.btnSend[addEventListener]("click", sendComment);

			ABPInst.timeLabel[addEventListener]("click", function() {
				ABPInst.timeJump = _("input", {
					"className": "time-jump"
				});
				ABPInst.timeJump.value = formatTime(ABPInst.video.currentTime);
				ABPInst.controlBar.appendChild(ABPInst.timeJump);
				ABPInst.timeJump[addEventListener]("blur", function() {
					if (ABPInst.timeJump) ABPInst.timeJump.parentNode.removeChild(ABPInst.timeJump);
					ABPInst.timeJump = null;
				});
				ABPInst.timeJump[addEventListener]("keydown", function(e) {
					if (e.keyCode == 13) {
						var time = convertTime(ABPInst.timeJump.value);
						if (time && time <= ABPInst.video.duration) {
							ABPInst.video.currentTime = time;
							if (ABPInst.video.paused) ABPInst.btnPlay.click();
						}
						ABPInst.timeJump.parentNode.removeChild(ABPInst.timeJump);
					} else if ((e.keyCode < 48 || e.keyCode > 59) && (e.keyCode < 96 || e.keyCode > 105) && e.keyCode != 8 && e.keyCode != 16 && e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 46) {
						e.preventDefault();
					}
				});
				ABPInst.timeJump.focus();
				ABPInst.timeJump.select();
			});
			ABPInst.barTime.style.width = "0%";
			var dragging = false;
			ABPInst.barTimeHitArea[addEventListener]("mousedown", function(e) {
				dragging = true;
			});
			var preview={
				imgs:[],
				data:[],
				len:[0,0],
				size:[0,0]
			},
			fetchedPreview=function(json){
				if(json.code!=0)
					return false;
				preview.imgs=JSON.parse(JSON.stringify(json.data.image).replace(/http:/g,'https:'));
				preview.len=[json.data.img_x_len,json.data.img_y_len];
				preview.size=[json.data.img_x_size,json.data.img_y_size];
				var xhr=new XMLHttpRequest(),data,arr=[];
				xhr.open('GET',json.data.pvdata.replace('http:','https:'),true);
				xhr.responseType="arraybuffer";
				xhr.onreadystatechange=function(e){
					if(xhr.readyState==4 && xhr.status==200){
						data=new Uint8Array(xhr.response);
						for(i=2;i<data.length;i+=2){
							arr.push(data[i]*256+data[i+1])
						}
						preview.data=arr;
					}
				}
				xhr.send();
			},
			onTimeBar=!1;
			ABPInst.barTimeHitArea[addEventListener]("mouseenter",function(e){
				onTimeBar=!0;
			});
			ABPInst.barTimeHitArea[addEventListener]("mouseleave",function(e){
				onTimeBar=!1;
			});
			if(window.cid!=undefined){
				getjson('/danmaku/pvinfo/'+window.cid+'.json',fetchedPreview);
			}
			ABPInst.playerUnit[addEventListener]('cidchange',function(){
				getjson('/danmaku/pvinfo/'+window.cid+'.json',fetchedPreview);
				try{
					var history=JSON.parse(localStorage.playHistory||'{}');
					if(history[cid]!=undefined){
						ABPInst.lastTime=history[cid];
					}
				}catch(e){}
			})
			document[addEventListener]("mouseup", function(e) {
				if (dragging) {
					var newTime = ((e.clientX - ABPInst.barTimeHitArea.getBoundingClientRect().left) / ABPInst.barTimeHitArea.offsetWidth) * ABPInst.video.duration;
					if (newTime < 0) newTime = 0;
					if (Math.abs(newTime - ABPInst.video.currentTime) > 4) {
						if (ABPInst.cmManager)
							ABPInst.cmManager.clear();
					}
					ABPInst.video.currentTime = newTime;
				}
				dragging = false;
			});
			var updateTime = function(time) {
				ABPInst.barTime.style.width = (time / video.duration * 100) + "%";
				ABPInst.timeLabel.innerHTML = formatTime(time) + " / " + formatTime(video.duration);
			}
			document[addEventListener]("mousemove", function(e) {
				var newTime = ((e.clientX - ABPInst.barTimeHitArea.getBoundingClientRect().left) / ABPInst.barTimeHitArea.offsetWidth) * ABPInst.video.duration;
				if (newTime < 0) newTime = 0;
				if (newTime > ABPInst.video.duration) newTime = ABPInst.video.duration;
				if(preview.data.length>0 && $('ABP-Tooltip')!=null && onTimeBar){
					var index;
					for(index=0;index<preview.data.length;index++){
						if(newTime<preview.data[index]){
							index--;
							break;
						}
					}
					var numPic=Math.floor(index/100),
							posY=Math.floor((index%100)/10),
							posX=index%10,
							div=$('preview-container'),
							tooltip=$('ABP-Tooltip');
					if(div==null){
						div=_("div",{
							"id":'preview-container',
							'style':{
								'position':'absolute',
								'background-size':preview.size[0]+'px '+preview.size[1]+'px',
								'width':preview.size[0]+'px',
								'height':preview.size[1]+'px',
								'background':'rgba(0,0,0,0)',
								'display':'none'
							}
						})
						tooltip.parentNode.insertBefore(div,tooltip);
					}
					div.style.left=tooltip.offsetLeft+(tooltip.offsetWidth-preview.size[0])/2+'px';
					div.style.top=tooltip.offsetTop+(tooltip.offsetHeight-preview.size[1])+'px';
					div.style.display='block';
					div.style.backgroundImage='url("'+preview.imgs[numPic]+'")';
					div.style.backgroundPosition='-'+(posX*preview.size[0])+'px -'+(posY*preview.size[1])+'px';
				}
				if($('ABP-Tooltip')==null && $('preview-container')!=null){
					$('preview-container').style.display='none';
				}
				ABPInst.barTimeHitArea.tooltip(formatTime(newTime));
				if (dragging) {
					updateTime(newTime);
				}
			});
			hoverTooltip(ABPInst.barTimeHitArea, true, -12);
			var draggingVolume = false;
			ABPInst.barVolumeHitArea[addEventListener]("mousedown", function(e) {
				draggingVolume = true;
			});
			ABPInst.barVolume.style.width = (ABPInst.video.volume * 100) + "%";
			var updateVolume = function(volume) {
				ABPInst.barVolume.style.width = (volume * 100) + "%";
				ABPInst.video.muted = false;
				ABPInst.btnVolume.className = "button ABP-Volume icon-volume-";
				if (volume < .10) ABPInst.btnVolume.className += "mute";
				else if (volume < .33) ABPInst.btnVolume.className += "low";
				else if (volume < .67) ABPInst.btnVolume.className += "medium";
				else ABPInst.btnVolume.className += "high";
				ABPInst.btnVolume.tooltip(ABP.Strings.mute);
				ABPInst.barVolumeHitArea.tooltip(parseInt(volume * 100) + "%");
				saveConfigurations();
			}
			document[addEventListener]("mouseup", function(e) {
				if (draggingVolume) {
					var newVolume = (e.clientX - ABPInst.barVolumeHitArea.getBoundingClientRect().left) / ABPInst.barVolumeHitArea.offsetWidth;
					if (newVolume < 0) newVolume = 0;
					if (newVolume > 1) newVolume = 1;
					ABPInst.video.volume = newVolume;
					updateVolume(ABPInst.video.volume);
				}
				draggingVolume = false;
			});
			document[addEventListener]("mousemove", function(e) {
				var newVolume = (e.clientX - ABPInst.barVolumeHitArea.getBoundingClientRect().left) / ABPInst.barVolumeHitArea.offsetWidth;
				if (newVolume < 0) newVolume = 0;
				if (newVolume > 1) newVolume = 1;
				if (draggingVolume) {
					ABPInst.video.volume = newVolume;
					updateVolume(ABPInst.video.volume);
				} else {
					ABPInst.barVolumeHitArea.tooltip(parseInt(newVolume * 100) + "%");
				}
			});
			hoverTooltip(ABPInst.barVolumeHitArea, true, -12);
			/*Copy from scale bar*/
			var draggingSpeed = false;
			ABPInst.barSpeedHitArea[addEventListener]("mousedown", function(e) {
				draggingSpeed = true;
			});
			ABPInst.barSpeed.style.width = (ABPInst.commentSpeed - 0.5) / 1.5 * 100 + "%";
			var updateSpeed = function(speed) {
				ABPInst.barSpeed.style.width = (speed - 0.5) / 1.5 * 100 + "%";
				ABPInst.barSpeedHitArea.tooltip(parseInt(speed * 100) + "%");
				saveConfigurations();
			}
			document[addEventListener]("mouseup", function(e) {
				if (draggingSpeed) {
					var newSpeed = 0.5 + 1.5 * (e.clientX - ABPInst.barSpeedHitArea.getBoundingClientRect().left) / ABPInst.barSpeedHitArea.offsetWidth;
					if (newSpeed < 0.5) newSpeed = 0.5;
					if (newSpeed > 2) newSpeed = 2;
					ABPInst.commentSpeed = newSpeed;
					updateSpeed(ABPInst.commentSpeed);
					saveSetting.speed();
				}
				draggingSpeed = false;
			});
			document[addEventListener]("mousemove", function(e) {
				var newSpeed = 0.5 + 1.5 * (e.clientX - ABPInst.barSpeedHitArea.getBoundingClientRect().left) / ABPInst.barSpeedHitArea.offsetWidth;
				if (newSpeed < 0.5) newSpeed = 0.5;
				if (newSpeed > 2) newSpeed = 2;
				if (draggingSpeed) {
					ABPInst.commentSpeed = newSpeed;
					updateSpeed(ABPInst.commentSpeed);
				} else {
					ABPInst.barSpeedHitArea.tooltip(parseInt(newSpeed * 100) + "%");
				}
			});
			hoverTooltip(ABPInst.barSpeedHitArea, true, -6);
			/*Speed add finish*/
			/*Copy from scale bar*/
			var draggingPlaySpeed = false;
			ABPInst.barPlaySpeedHitArea[addEventListener]("mousedown", function(e) {
				draggingPlaySpeed = true;
			});
			ABPInst.barPlaySpeed.style.width = (ABPInst.video.playbackRate - 0.5) / 1.5 * 100 + "%";
			var updatePlaySpeed = function(playSpeed) {
				ABPInst.barPlaySpeed.style.width = (playSpeed - 0.5) / 1.5 * 100 + "%";
				ABPInst.barPlaySpeedHitArea.tooltip(playSpeed.toFixed(2) + "x");
			}
			document[addEventListener]("mouseup", function(e) {
				if (draggingPlaySpeed) {
					var newPlaySpeed = 0.5 + 1.5 * (e.clientX - ABPInst.barPlaySpeedHitArea.getBoundingClientRect().left) / ABPInst.barPlaySpeedHitArea.offsetWidth;
					if (newPlaySpeed < 0.5) newPlaySpeed = 0.5;
					if (newPlaySpeed > 2) newPlaySpeed = 2;
					ABPInst.video.playbackRate = newPlaySpeed;
				}
				draggingPlaySpeed = false;
			});
			document[addEventListener]("mousemove", function(e) {
				var newPlaySpeed = 0.5 + 1.5 * (e.clientX - ABPInst.barPlaySpeedHitArea.getBoundingClientRect().left) / ABPInst.barPlaySpeedHitArea.offsetWidth;
				if (newPlaySpeed < 0.5) newPlaySpeed = 0.5;
				if (newPlaySpeed > 2) newPlaySpeed = 2;
				if (draggingPlaySpeed) {
					ABPInst.video.playbackRate = newPlaySpeed;
				} else {
					ABPInst.barPlaySpeedHitArea.tooltip(newPlaySpeed.toFixed(2) + "x");
				}
			});
			hoverTooltip(ABPInst.barPlaySpeedHitArea, true, -6);
			/*PlaySpeed add finish*/
			ABPInst.btnPlay[addEventListener]("click", function() {
				if (ABPInst.video.paused) {
					ABPInst.video.play();
				} else {
					ABPInst.video.pause();
				}
			});
			playerUnit[addEventListener]("keydown", function(e) {
				if (e && document.activeElement.tagName != "INPUT") {
					if([27,32,37,38,39,40].indexOf(e.keyCode)!=-1)
						e.preventDefault();
					switch (e.keyCode) {
						case 27:
							if(abpinst.state.fullscreen)
								abpinst.btnFull.click();
						break;
						case 32:
							ABPInst.btnPlay.click();
							break;
						case 37:
							var newTime = ABPInst.video.currentTime -= 5 * ABPInst.video.playbackRate;
							if (newTime < 0) newTime = 0;
							ABPInst.video.currentTime = newTime.toFixed(3);
							if (ABPInst.video.paused) ABPInst.btnPlay.click();
							updateTime(video.currentTime);
							ABPInst.barTimeHitArea.tooltip(formatTime(video.currentTime));
							break;
						case 39:
							var newTime = ABPInst.video.currentTime += 5 * ABPInst.video.playbackRate;
							if (newTime > ABPInst.video.duration) newTime = ABPInst.video.duration;
							ABPInst.video.currentTime = newTime.toFixed(3);
							if (ABPInst.video.paused) ABPInst.btnPlay.click();
							updateTime(video.currentTime);
							ABPInst.barTimeHitArea.tooltip(formatTime(video.currentTime));
							break;
						case 38:
							var newVolume = ABPInst.video.volume + .1;
							if (newVolume > 1) newVolume = 1;
							ABPInst.video.volume = newVolume.toFixed(3);
							updateVolume(ABPInst.video.volume);
							break;
						case 40:
							var newVolume = ABPInst.video.volume - .1;
							if (newVolume < 0) newVolume = 0;
							ABPInst.video.volume = newVolume.toFixed(3);
							updateVolume(ABPInst.video.volume);
							break;
					}
				}
			});
			playerUnit[addEventListener]("touchmove", function(e) {
				e.preventDefault();
			});
			var _touch = null;
			playerUnit[addEventListener]("touchstart", function(e) {
				if (hasClass(ABPInst.videoDiv, "ABP-HideCursor")) {
					removeClass(ABPInst.videoDiv, "ABP-HideCursor");
				}
				if (e.targetTouches.length > 0) {
					//Determine whether we want to start or stop
					_touch = e.targetTouches[0];
				}
			});
			playerUnit[addEventListener]("touchend", function(e) {
				addClass(ABPInst.videoDiv, "ABP-HideCursor");
				if (e.changedTouches.length > 0) {
					if (_touch != null) {
						var diffx = e.changedTouches[0].pageX - _touch.pageX;
						var diffy = e.changedTouches[0].pageY - _touch.pageY;
						if (Math.abs(diffx) < 20 && Math.abs(diffy) < 20) {
							_touch = null;
							return;
						}
						if (Math.abs(diffx) > 3 * Math.abs(diffy)) {
							if (diffx > 0) {
								if (ABPInst.video.paused) {
									ABPInst.btnPlay.click();
								}
							} else {
								if (!ABPInst.video.paused) {
									ABPInst.btnPlay.click();
								}
							}
						} else if (Math.abs(diffy) > 3 * Math.abs(diffx)) {
							if (diffy < 0) {
								ABPInst.video.volume = Math.min(1, ABPInst.video.volume + 0.1)
							} else {
								ABPInst.video.volume = Math.max(0, ABPInst.video.volume - 0.1)
							}
						}
						_touch = null;
					}
				}
			});
			playerUnit[addEventListener]("mouseup", function() {
				if (document.activeElement.tagName != "INPUT") {
					var oSY = window.scrollY;
					ABPInst.videoDiv.focus();
					window.scrollTo(window.scrollX, oSY);
				}
			});
		}
		return ABPInst;
	}
})();

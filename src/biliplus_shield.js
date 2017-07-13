/*!
 *
 * danmaku shield - biliplus
 * 
 * @author esterTion
 *
 */
/*
	功能预想：
	文本屏蔽（开启/关闭正则）
	用户屏蔽（通过右键菜单增加）
	颜色屏蔽（通过右键菜单增加）
	重复屏蔽
*/
var shield=(function(){
	var danmakuMatcher=/[\x00-\x2f\x3a-\x40\x5b-\x5e\x60\x7b-\x7f]/g,firstTime=!0,hidden=!0,list=null,activeTab=0,useReg=!1,$$=function(a){return document.querySelector(a)},limit,playerInstance=null,
	isVisitor = function(hash){
		if(hash.length==14&&hash[3]=='k'){
			return true;
		}
		if(hash[0]=='D' || hash[0]=='d'){
			return true;
		}
		if(hash=="0"){
			return true;
		}
		return false;
	}
	obj={
		init:function(player){
			if(!firstTime)
				return;
			if(player!=undefined)
				playerInstance=player;
			firstTime=!1;
			obj.tab(0);
			if(localStorage.shieldList==undefined)
				localStorage.shieldList='{"text":[],"user":[],"color":[],"useReg":false,"limit":10,"mode":[],"visitor":false}';
			list=JSON.parse(localStorage.shieldList);
			if(list.color==undefined)
				list.color=[];
			if(list.useReg==undefined)
				list.useReg=!1;
			if(list.limit==undefined)
				list.limit=10;
			if(list.mode==undefined)
				list.mode=[];
			if(list.visitor==undefined)
				list.visitor=false;
			useReg=list.useReg;
			limit=list.limit;
			obj.render();
			var i,len,tabs;
			tabs=$('.shield_tab');
			for(i=0,len=tabs.length;i<len;i++){
				tabs[i].tabNum=i;
				tabs[i].addEventListener('mouseenter',function(){obj.tab(this.tabNum)});
				tabs[i].addEventListener('mouseleave',function(e){
					var border=this.getBoundingClientRect(),
					x=e.clientX,y=e.clientY;
					if(
						(x-border.left<0) || (x-border.left>border.width) ||
						(y-border.top<0) || (y-border.top>border.height)
					)
						obj.tab(activeTab)
				});
				tabs[i].addEventListener('click',function(){obj.switchTab(this.tabNum)});
			}
			$$('#useReg').addEventListener('click',function(){
				useReg=!useReg;
				obj.save();
				obj.render(3);
			});
			$$('#blockTop').addEventListener('click',function(){
				obj.mode(5);
			})
			$$('#blockBottom').addEventListener('click',function(){
				obj.mode(4);
			})
			$$('#blockVisitor').addEventListener('click',function(){
				obj.visitor();
			})
			var repeatBtnClick=!1,repeatBtnMove=function(e){
				if(!repeatBtnClick)
					return;
				var box=$$('#repeat').getBoundingClientRect(),
				calc=Math.round( (e.clientX-box.left)/box.width*49+2 );
				if(calc<2 || calc>51)
					return;
				limit=calc
				if(limit==51)
					limit=0;
				obj.render(3);
			};
			$$('#repeat').addEventListener('mousedown',function(e){
				repeatBtnClick=!0;
				repeatBtnMove(e);
			});
			$$('#repeat').addEventListener('mouseup',function(){
				repeatBtnClick=!1;
				obj.save();
			})
			$$('#repeat').addEventListener('touchend',function(){
				repeatBtnClick=!1;
				obj.save();
			})
			$$('.shield').addEventListener('mousemove',repeatBtnMove)
		},
		switchTab:function(offset){
			activeTab=offset;
			$$('.shield_body_wrapper').style.transform='translateX('+offset*-278+'px)';
			$$('.shield_body_wrapper').style.webkitTransform='translateX('+offset*-278+'px)';
		},
		tab:function(offset){
			var container=$$('.shield'),containerBorder=container.getBoundingClientRect(),
			moveTo=$$('.shield .shield_tab:nth-of-type('+(offset+1)+')>div').getBoundingClientRect(),
			left=moveTo.left-containerBorder.left,
			width=moveTo.width,
			tab=$$('.shield .shield_tab_slash');
			tab.style.left=left+'px';
			tab.style.width=width+'px';
		},
		render:function(part){
			var doAll=!0,tab=0;
			if(part!=undefined){
				doAll=!1,tab=part;
			}
			while(1){switch(tab){
				case 0:
				//文本
					var str='',i,len,del;
					for(i=0,len=list.text.length;i<len;i++){
						str+='<div class="shield_item"><div class="text">'+list.text[i]+'</div><div class="delete"></div></div>';
					}
					$$('#shield_text').innerHTML=str;
					del=$('#shield_text .shield_item .delete');
					for(i=0,len=del.length;i<len;i++){
						del[i].onclick=obj.del;
					}
				break;
				case 1:
					//用户
					var str='',i=0,del;
					for(;i<list.user.length;i++){
						str+='<div class="shield_item"><div class="text">'+list.user[i]+'</div><div class="delete"></div></div>';
					}
					if(i==0){
						str='<div class="shield_item">'+ABP.Strings.blockUserEmpty+'</div>'
					}
					$$('#shield_user').innerHTML=str;
					del=$('#shield_user .shield_item .delete');
					for(i=0,len=del.length;i<len;i++){
						del[i].onclick=obj.delUser;
					}
				break;
				case 2:
					//颜色
					var str='',i=0,color,del;
					for(;i<list.color.length;i++){
						color=list.color[i].toString(16);
						while(color.length<6){
							color='0'+color
						}
						str+='<div class="shield_color"><div class="color" style="background:#'+color+'">'+list.color[i]+'</div><div class="delete"></div></div>';
					}
					if(i==0){
						str='<div class="shield_color">'+ABP.Strings.blockColorEmpty+'</div>'
					}
					$$('#shield_color').innerHTML=str;
					del=$('#shield_color .shield_color .delete');
					for(i=0,len=del.length;i<len;i++){
						del[i].onclick=obj.delColor;
					}
				break;
				case 3:
					//设置
					$$('#useReg').className='shield_toggle'+(useReg?' on':'');
					$$('#blockTop').className='shield_toggle'+((list.mode.indexOf(5)!=-1)?' on':'');
					$$('#blockBottom').className='shield_toggle'+((list.mode.indexOf(4)!=-1)?' on':'');
					$$('#blockVisitor').className='shield_toggle'+(list.visitor?' on':'');
					var perc=(limit-2)/49,limitstr=limit+' '+ABP.Strings.repeatPcs;
					if(limit==0)
						perc=1,limitstr=ABP.Strings.repeatUnlimited;
					$$('#repeat .fill').style.width=perc*100+'%';
					$$('#repeat .button').style.left=perc*100+'%';
					$$('#repeat .slide_info').innerHTML=limitstr;
				break;
				default:
					return;
			}tab++;}
		},
		save:function(){
			list.useReg=useReg;
			list.limit=limit;
			localStorage.shieldList=JSON.stringify(list);
			obj.shield();
		},
		show:function(){
			if(hidden){
				$('.shield')[0].setAttribute('class','shield');
			}else{
				$('.shield')[0].setAttribute('class','shield hidden');
			}
			hidden=!hidden;
		},
		add:function(){
			obj.addText($$('.shield_item .new').value) && ($$('.shield_item .new').value='');
		},
		addText:function(text){
			if(text=='' || list.text.indexOf(text)!=-1)
				return false;
			try{
				if(useReg){
					new RegExp(text)
				}
			}catch(e){
				playerInstance.createPopup('格式错误，'+e.message,3e3);
				return false;
			}
			list.text.push(text);
			obj.save();
			obj.render(0);
			return true;
		},
		addUser:function(user){
			if(list.user.indexOf(user)!=-1)
				return false;
			list.user.push(user);
			obj.save();
			obj.render(1);
		},
		addColor:function(color){
			color=parseInt(color,16);
			if(isNaN(color) || list.color.indexOf(color)!=-1)
				return false;
			list.color.push(color);
			obj.save();
			obj.render(2);
		},
		mode:function(mode){
			var index,block = ((index = list.mode.indexOf(mode)) == -1)
			if(block){
				list.mode.push(mode)
			}else{
				list.mode.splice(index,1);
			}
			obj.save();
			obj.render(3);
		},
		visitor:function(){
			list.visitor = !list.visitor;
			obj.save();
			obj.render(3);
		},
		del:function(e){
			var newlist,delstr=e.target.parentNode.firstChild.innerHTML,index=list.text.indexOf(delstr);
			if(index==-1)
				return false;
			newlist=list.text.splice(0,index);
			list.text=newlist.concat(list.text.splice(1));
			obj.save();
			obj.render(0);
		},
		delUser:function(e){
			var newlist,delUser=e.target.parentNode.firstChild.innerHTML.split(' ')[0],index=list.user.indexOf(delUser);
			if(index==-1)
				return false;
			newlist=list.user.splice(0,index);
			list.user=newlist.concat(list.user.splice(1));
			obj.save();
			obj.render(1);
		},
		delColor:function(e){
			var newlist,delColor=e.target.parentNode.firstChild.innerHTML,index=list.color.indexOf(delColor*1);
			if(index==-1)
				return false;
			newlist=list.color.splice(0,index);
			list.color=newlist.concat(list.color.splice(1));
			obj.save();
			obj.render(2);
		},
		filter:function(cm){
			/*for(var i=0,len=list.text.length;i<len;i++){
				if(useReg){
					if(cm.text.match(new RegExp(list.text[i]))!=null)
						return false;
				}else{
					if(cm.text.match(list.text[i])!=null)
						return false;
				}
			}*/
			if(cm.isBlocked){
				return false;
			}
			if(!cm.filtered){
				cm.oriSize=cm.size;
				cm.filtered=!0;
			}
			cm.size=cm.oriSize*abpinst.commentScale;
			return cm;
		},
		shield:function(){
			if(playerInstance==null)
				return false;
			var cm=playerInstance.cmManager.timeline,clean=[],i=0,j,textList=[],len=cm.length,set={},onScreen=playerInstance.cmManager.runline,cmt;
			if(limit>0){
				for(;i<len;i++){
					try{
					clean.push(cm[i].text.replace(danmakuMatcher,''))
					}catch(e){}
				}
				var sta=0,end=sta,count={};
				while(end!=len){
					while(cm[sta].stime+1e4 < cm[end].stime){
						if(--count[clean[sta]]==0){
							delete count[clean[sta]];
						}
						++sta;
					}
					if(count[clean[end]]==undefined)
						count[clean[end]]=0;
					if(++count[clean[end]] > limit && cm[end].mode<=6){
						set[clean[end]]=1;
					}
					++end;
				}
			}
			for(j=0;j<list.text.length;j++){
				textList.push(useReg?new RegExp(list.text[j]):list.text[j]);
			}
			for(i=0;i<len;i++){
				cmt=cm[i];
				cmt.isBlocked=!1;
				if(set[clean[i]]!=undefined 
				|| list.color.indexOf(cmt.color)!=-1 
				|| list.user.indexOf(cmt.hash)!=-1 
				|| list.mode.indexOf(cmt.mode)!=-1 
				|| (list.visitor && isVisitor(cmt.hash)) ){
					cmt.isBlocked=!0;
				}else{
					for(j=0;j<textList.length;j++){
						try{
							if(textList[j].test(cmt.text))
								cmt.isBlocked=!0;
						}catch(e){}
					}
				}
			}
			
			for(i=onScreen.length-1;i>=0;i--){
				if(onScreen[i].originalData.isBlocked){
					onScreen[i].finish();
				}
			}
			playerInstance.renderCommentList();
			
			
			/*
			int sta=0,end=sta;
			while(end!=danmaku.size()){
				while(danmaku[sta]->time+10000<danmaku[end]->time){
					if(--count[clean[sta]]==0){
						count.remove(clean[sta]);
					}
					++sta;
				}
				if(++count[clean[end]]>l&&danmaku[end]->mode<=6){
					set.insert(clean[end]);
				}
				++end;
			}*/
		}
	};
	return obj;
})();
window.shield=shield;

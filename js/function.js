//兼容的通过类名获取信息
function getClass(selector,obj){
	obj=obj||document
	if(obj.getElementsByClassName){
	return obj.getElementsByClassName(selector);
	}else{//ie6-8进行处理
		var all=obj.getElementsByTagName('*')
		var arr=[]
		for (var i = 0; i < all.length; i++) {
			if(check(all[i].className,selector)){
				arr.push(all[i])
			}
		};
		return arr;
	}
}
function check(longstr,str){
	var arr=longstr.split(" ")
	for (var i = 0; i < arr.length; i++) {
		if(arr[i]==str){
			return true
		}
	};
	return false
}
//兼容的获取或者设置对象的文本信息
function getText(obj,value){
	if(arguments.length==1){
	if(obj.textContent!=undefined){
		 return obj.textContent;
	}else{
		return obj.innerText;
	}
}else if(arguments.length==2) {
		if(obj.textContent!=undefined){
		 obj.textContent=value;
		} else{
			obj.innerText=value;
		};
}
}
//获取元素的函数
//.one   #id   div
function $(selector,obj){
	if (typeof selector=="string") {
	obj=obj||document;
	if (selector.charAt(0)==".") {
		// charAt  获取第一个
		return getClass(selector.slice(1),obj)
	} else if(selector.charAt(0)=="#"){
		return obj.getElementById(selector.slice(1))
	}else{
		return obj.getElementsByTagName(selector)
	}
  }else if(typeof selector=="function"){
  	window.onload=function(){
  		selector()
  	}
  }
}
//获取一个元素所有的元素子节点
function getChildren(obj){
	var arr=obj.childNodes;
	var newarr=[];
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].nodeType==1){
			newarr.push(arr[i])
		}
	};
	return newarr;
}


function getFist(obj){
	return getChildren(obj)[0]
}

function getLast(obj){
	var arr=getChildren(obj)
	return arr[arr.length-1]
}
function getNext(obj){
	if(obj.getElementsByClassName){
		return obj.nextElementSibling
	}else{
		var next=obj.nextSibling;
		if(next==null){
			return null;
		}
		while(next.nodeType!=1){
			next=next.nextSibling;
			if(next==null){
			return null;
		}
		}
		return next;
	}
}
//去上一个兄弟元素
function getPrevious(obj){
	if(obj.getElementsByClassName){
		return obj.previousElementSibling
	}else{
		var previous=obj.previousSibling;
		if(previous==null){
			return null;
		}
		while(previous.nodeType!=1){
			previous=previous.previousSibling;
			if(previous==null){
			return null;
		}
		}
		returnprevious;
	}
}
//兼容的获取元素的样式
function getStyle(obj,attr){
	if(!obj.currentStyle){
		return getComputedStyle(obj,null)[attr]
	}else{
		return obj.currentStyle[attr]
	}
}
//插入到某个对象后面
function insertAfter(newobj,obj){
	var parent=obj.parentNode;
	var next=getNext(obj)
	if(next==null){
		parent.appendChild(newobj)
	}else{
	parent.insertBefore(newobj,next)
	}
}

function offsetWindow(){
	var x=document.documentElement.clientWidth;
	var y=document.documentElement.clientHeight;
	return {width:x,height:y}

}

//一个元素有父元素时要计算与顶层距离  而且判断有几个父

function getPosition(obj){
	// 文档坐标
	var parent=obj.parentNode;
	var left=obj.offsetLeft;
	var top=obj.offsetTop;
	//while判断父元素
	while(parent.nodeName!="BODY"){
		//判断定位属性
		if(getStyle(parent,"position")=="absolute"||getStyle(parent,"position")=="relative"){
			left+=(parent.offsetLeft+parseInt(
				getStyle(parent,"borderLeftWidth")
				))
			top+=(parent.offsetTop+parseInt(
				getStyle(parent,"borderTopWidth")
				))
		}
		parent=parent.parentNode;
	}
	return {x:left,y:top};
}

// 兼容的事件绑定
// obj事件源   envent事件   callback事件处理程序
function addEvent(obj,event,callback){
	if(obj.addEventListener){
		obj.addEventListener(event,callback,false)
	}else{
		obj.attachEvent("on"+event,callback)
	}
}


function removeEvent(obj,event,callback){
	if(obj.removeEventListener){
		obj.removeEventListener(event,callback,false)
	}else{
		obj.detachEvent("on"+event,callback)
	}
}

// 兼容的添加滚轮事件并且可以区分上下
function mousewheel(obj,upfun,downfun){
	if(obj.addEventlistener){
		obj.addEventlistener("mousewheel",fun,false)
		obj.addEventlistener("DOMMouseScroll",fun,false)
	}else{
		obj.attachEvent("onmousewheel",fun)
	}
	// fun 真正的处理程序
	function fun(e){
		var ev=e||window.event;
		if(ev.detail==-3||ev.wheelDelta==120){
			// 如果upfun存在就执行
			if(upfun){
				// call 函数调用的时候传递一个参数
				// 这个蚕食将作为函数中的this使用
				upfun.call(obj,e)
			}
		}else if(ev.detail==3||ev.wheelDelta==-120){
			if(downfun){
				downfun.call(obj,e)
			}
		}
	}
}
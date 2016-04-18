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
// 	兼容的获取元素的样式
function getStyle (obj,attr) {
	if (!obj.cuurentStyle){
      return getComputedStyle(obj,null)[attr]
	}else{
		return obj.currentStyle[attr]
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


function getFirst(obj){
	return getChildren(obj)[0]
}

function getLast(obj){
	var arr=getChildren(obj)
	return arr[arr.length-1]
}
//获取下一个兄弟元素的节点
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
		return previous;
	}
}
//插入到某个对象后面
function insertAfter(newobj,obj){
	var parent=obj.parentNode;
	var next=getNext(obj)
	if(next==null){
		parent.appendChild(newobj,obj)
	}else{
	parent.insertBefore(newobj,next)
	}
}
  function offsetWindow(){
	var x=document.documentElement.clientWidth;
	var y=document.documentElement.clientHeight;
	return {width:x,height:y} 
}
function getPosition(obj){
    var parent=obj.parentNode;
    var left=obj.offsetLeft;
    var top=obj.offsetTop;
    while(parent.nodeName!="BODY"){
    	if (getStyle(parent,"Position")=="obsolute"
    	    ||getStyle(parent,"Position")=="relative"){
    		left+=(parent.offsetLeft+parseInt(getStyle(parent,"borderLeftWidth")))
            top+=(parent.offsetTop+parseInt(getStyle(parent,"borderLeftheight")))
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
//兼容的添加滚轮事件 并且可以区分向上滚动和向下滚动
function mousewheel(obj,upfun,downfun){
	if(obj.addEventListener){
		obj.addEventListener("mousewheel",fun,false);
		obj.addEventListener("DOMMouseScroll",fun,false)
	}else{
		obj.attachEvent("onmousewheel",fun)
	}
	//fun是真正的事件处理程序
	function fun(e){
		var ev=e||window.event;
		if(ev.detail==-3||ev.wheelDelda==120){
			if(upfun){
				upfun.call(obj,ev)//call  作用是函数调用的时候传递一个参数 这个参数将作为函数中的this使用，并且只在当前这次使用有效果
			}//upfun.call(obj,e)
		}else if(ev.detail==3||ev.wheelDelda==-120){
			if(downfun){
				downfun.call(obj,ev)
			}
		}
	}
}

 //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
	if(parent.contains){
	   return parent.contains(child) && parent!=child;
	}else{
	  return (parent.compareDocumentPosition(child)===20);
	}
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；

  function checkHover (e,target) {
	 if(getEvent(e).type=="mouseover"){
	    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	 }else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		}
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
	  if(overfun){
	    obj.onmouseover=function  (e) {
			  if(checkHover(e,obj)){
			     overfun.call(obj,[e]);
			  }
	    }
	  }
	  if(outfun){
	    obj.onmouseout=function  (e) {
			  if(checkHover(e,obj)){
			     outfun.call(obj,[e]);
			  }
	    }
	  }
}
 
  function getEvent(e){
    return e||window.event;
  }
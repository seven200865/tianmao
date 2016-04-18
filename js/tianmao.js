window.onload=function(){
		var pin=getClass("pinpairt")
		var pinp=getClass("pinpairtx")
		for (var i = 0; i < pinp.length; i++) {
			pin[i].index=i;
			pin[i].onmouseover=function(){
			pinp[this.index].style.display="block"
			}
			pin[i].onmouseout=function(){
			pinp[this.index].style.display="none"
			}
		};
		//banner
		var gun=getClass("gun-hehe")
		var tubo=getClass("banner-tubox")
		var tubox=getClass("banner-tubox1")[0]
		var tuboxo=tubox.getElementsByTagName('li')
		var bgbanner=getClass("banner")[0]
		var bgcolor=["#E8E8E8","#E8E8E8","#E8E8E8","#FFD0C8","#FF4200","#E62601"]
		var timeout;
		for (var i = 0; i < gun.length; i++) {
			gun[i].index=i;
			gun[i].onmouseover=function(){
				var that=this
				clearTimeout(timeout)
				clearInterval(t)
				timeout=setTimeout(function(){
				for (var j = 0; j < gun.length; j++) {
				gun[j].style.background="#221111";
				tuboxo[j].style.display="none"
				tuboxo[j].style.opacity=0.5
				}
				gun[that.index].style.background="#fff";
				tuboxo[that.index].style.display="block"
				animate(tuboxo[that.index],{opacity:1})
				bgbanner.style.background=bgcolor[that.index]
				
				},200)
			}
			gun[i].onmouseout=function(){
				num=this.index
				t=setInterval(lun,3000)
			}
		};
		var num=0;
		function lun(){
			num++
			if(num==gun.length){
				num=0
			}
			for (var i = 0; i < gun.length; i++) {
				tuboxo[i].style.display="none"
				gun[i].style.background="#221111";
				tuboxo[i].style.opacity=0.5
			};
			tuboxo[num].style.display="block";
			gun[num].style.background="#fff";
			animate(tuboxo[num],{opacity:1})
			bgbanner.style.background=bgcolor[num]
		}
		var t=setInterval(lun,3000)
		tubox.onmouseover=function(){
			clearInterval(t)
		}
		tubox.onmouseout=function(){
			t=setInterval(lun,3000)
		}

//顶栏效果  下拉菜单
	var menu=$(".menu")
	// alert(menu.length)
	var mylist=$(".mylist")
	var downBox=$(".down-box")
	for (var i = 0; i < menu.length; i++) {
		menu[i].index=i
		menu[i].onmouseover=function(){
			this.style.background="#fff"
			downBox[this.index].style.display="block"
		}
		menu[i].onmouseout=function(){
			downBox[this.index].style.display="none"
			this.style.background="#f2f2f2"
		}
	};


		//banner一对一换
	var lines=$("li",$(".banner-left")[0])
	var b111s=$(".b111")
	var sort=$(".sort-box")
	var setTimesout
	// alert(sort.length)
	for(var i=0;i<lines.length;i++){
	   lines[i].index=i
	   hover(lines[i],function(){
	   	var that=this
	   	setTimesout=setTimeout(function(){
	   		clearTimeout(setTimesout)
	        b111s[that.index].style.display="block"
	        sort[that.index].style.display="block"
	        animate(sort[that.index],{left:190,opacity:1},200)
	    },200)
	   },function(){
	   	    clearTimeout(setTimesout)
	        b111s[this.index].style.display="none"
	        // sort[this.index].style.display="none"
	        animate(sort[this.index],{left:170,opacity:0.6},200,function(){
	        	this.style.display="none"
	        })
	   })
	   // lines[i].onmouseover=function(){
	   // 	var that=this
	   // 	setTimesout=setTimeout(function(){
	   // 		clearTimeout(setTimesout)
	   //      b111s[that.index].style.display="block"
	   //      sort[that.index].style.display="block"
	   //      animate(sort[that.index],{left:190,opacity:1},200)
	   //  },200)
	   // }
	   // lines[i].onmouseout=function(){
	   // 	    clearTimeout(setTimesout)
	   //      b111s[this.index].style.display="none"
	   //      // sort[this.index].style.display="none"
	   //      animate(sort[this.index],{left:170,opacity:0.6},200,function(){
	   //      	this.style.display="none"
	   //      })
	   // }
	}

//搜索栏
	var shuru=document.getElementsByName('shuru')[0]
	shuru.onfocus=function(){
		if (shuru.value=="我的大刀早已饥渴难耐") {
		shuru.value=""
	}
}
	shuru.onblur=function(){
		if (shuru.value=="") {
		shuru.value="我的大刀早已饥渴难耐"
	}
}


//右侧动画

 var youce=$(".youce2-one")
 var youceo=$(".youce2-two")
 var youcet=$("#youce2-one")
 var t;
 for (var i = 0; i < youce.length; i++) {
 			youce[i].index=[i]
 			hover(youce[i],function(){
				clearTimeout(t)
				var that=this
			t=setTimeout(function(){
			youceo[that.index].style.display="block"
			animate(youceo[that.index],{marginRight:125,opacity:1},300)
				},200)
			},function(){
				clearTimeout(t)
				var that=this
						 // youceo[this.index].style.display="none"
			animate(youceo[this.index],{marginRight:140,opacity:0.7},300,function(){this.style.display="none"})
						});		
            }
			// youce[i].onmouseover=function(){
			// 	clearTimeout(t)
			// 	var that=this
			// t=setTimeout(function(){
			// youceo[that.index].style.display="block"
			// animate(youceo[that.index],{marginRight:125,opacity:1},300)
			// 	},200)
			// }		
			// youce[i].onmouseout=function(){
			// 	clearTimeout(t)
			// 	var that=this
			// 			 // youceo[this.index].style.display="none"
			// animate(youceo[this.index],{marginRight:140,opacity:0.7},300,function(){this.style.display="none"})
			// 			};
		// }
		//返回顶部
	youcet.onclick=function(){
	 	var obj=document.documentElement.scrollTop?document.documentElement:document.body;
	 	animate(obj,{scrollTop:0},300)
	 }

	 //最上面隐藏的
	 var dada=$('.top')[0]
     addEvent(window,'scroll',function(){
     	var obj=document.documentElement.scrollTop==0?document.body:document.documentElement
        if(obj.scrollTop>=800){
        	dada.style.display="block"
        	dada.style.top='0'
        }if(obj.scrollTop<800){
        	dada.style.display='none'
        	dada.style.top='-50'
        }
     })
	 //搜索
	var qic=document.getElementsByName('qic')[0]
	qic.onfocus=function(){
		if (qic.value=="有一条只能往前走的路叫时光") {
		qic.value=""
	}
}
	qic.onblur=function(){
		if (qic.value=="") {
		qic.value="有一条只能往前走的路叫时光"
	}
}


//影藏
        var flag1=true;
       	var flag2=true;
       	var imgsss=$("img");
       	var obj=document.documentElement.scrollTop?document.
                 documentElement:document.body;
       	for (var i = 0; i<imgsss.length; i++) {
       		if (getPosition(imgsss[i]).y<offsetWindow().height) {
       			imgsss[i].src=imgsss[i].getAttribute('data-src')
       		};
       	};

       	window.onscroll=function(){
       		var imgs=$("img");
             obj=document.documentElement.scrollTop?document.
                 documentElement:document.body;
              if (obj.scrollTop>688) {
              	if(flag1){
                    flag1=false;
                  animate(top,{top:0},function(){
                     flag1=true;flag2=true;
                  })
              }
              } else{
              	if(flag2){
              		flag2=false;
              	animate(top,{top:-50},function(){
              		flag1=true
              	})
              }
            }
            for (var i=0; i<imgs.length; i++) {
       		if (obj.scrollTop>(getPosition(imgs[i]).y-offsetWindow().height)){
       			imgsss[i].src=imgsss[i].getAttribute("data-src")
       		};
       	};	
       	}	
		function move(){
		animate(youceo,{marginRight:125},300,Tween.Linear)
		for (var i = 0; i < youce.length; i++) {
			youce[i].index=[i]
			youceo[this.index].style.display="block"
		}}
			// youceo[i].onmouseover=function(){
			// 	clearTimeout(timer);
			// }
			// youceo[i].onmouseout=function(){
			// 	youceo[this.index].style.display="none"
			// }			
//品牌
		var brd=getClass("brando")
		var pp=getClass("pingpaix-right")
		var bb=getClass("brando1")
		for (var i = 0; i < brd.length; i++) {
			brd[i].index=i;
			brd[i].onclick=function(){
			for (var j = 0; j < brd.length; j++) {
				pp[j].style.display="none"
				brd[j].style.borderBottom= "0"
				bb[j].style.borderBottom= "0"
				bb[j].style.color="#bba599";
				
				};
				pp[this.index].style.display="block";
				bb[this.index].style.color="#2F2F2F";
				this.style.borderBottom= "2px solid #000";
			}
			
		};
	}
/**
* 多物体运动框架
* xurna yang 2016.4.22
*/
function startMove(obj,json,callback){
	clearInterval(obj.timer); //保证多物体不去争同一个timer，在obj中加一个timer属性
	obj.timer =  setInterval(function(){
		var speed = 0;
		var curStyle = 0;
		var complete = true; // 用来判断是否运动完的参数
		for(var i in json){
			if(i == "opacity"){
				curStyle = Math.round(parseFloat(getStyle(obj,i))*100); //使之变为整数
			}else{
				curStyle = parseInt(getStyle(obj,i));  //这里要加上格式转换，因为传回来的值是字符串200px
			}
			
			speed = (json[i]-curStyle)/8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(curStyle != json[i]){   //还没到目标值的时候不能停止，这里不能用==，因为只要有一个属性还没有到达就不能关闭定时器
				complete = false;
				setStyle(obj,i,curStyle+speed);
			}
			
		}

		if(complete){
			clearInterval(obj.timer);
			if(callback) callback(); //如果有回调函数则调用
		}
		
	},30);
}

/**
*设置样式
*@param obj(设置样式的对象)，i（属性），curStyle(属性值)
*返回设置好的属性
*/
function setStyle(obj,i,curStyle){
	if(i == "opacity"){
		obj.style.filter = 'alpha(opacity:'+curStyle+')';
		obj.style.opacity = curStyle/100;
	}else{
		obj.style[i] = curStyle + "px";
	}
}

/**
*设置样式
*@param obj(设置样式的对象)，attr（属性）
*返回属性值
*提一个重要概念：函数声明提升，实际上该函数在最顶部，可以在调用后定义
*获取元素的属性值，不是内嵌式不能使用style直接获取
*/
function getStyle(obj,attr){
	//ie
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	//firefox
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
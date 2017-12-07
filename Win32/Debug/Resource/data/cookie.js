
//新建cookie
//参数：三个
	//键
	//值
	//有效期(单位：天)；
//返回值：无
function addCookie(name,value,days){
	var myDate = new Date();
	myDate.setDate(myDate.getDate()+days);
	document.cookie = name+"="+value+";expires="+myDate.toGMTString();
	//alert(document.cookie);
}


//功能：删除cookie
//参数：键；
//返回值：无；

function removeCookie(name){
	var myDate = new Date();
	myDate.setDate(myDate.getDate()-1);
	document.cookie = name+"=a;expires="+myDate.toGMTString();
}

//修改cookie
//参数
	//键
	//值
	//有效期(单位：天)；
//返回值：true：修改成功；false：修改失败；
function modifyCookie(name,value,days){
	//1、查找传入的键是否存在
	if(getCookie(name)!=null){//2、存在就修改；
		addCookie(name,value,days);
		return true;
	}else{
		//2、不存在就返回false；
		return false;
	}
}

//功能：读取cookie(已知键，获得值)
//参数：
	//键	
//返回值：null:传入的键无效；非null：键对应的值；
function getCookie(name){//假设： name参数的值是 "pass"
	//1、查找传入的键是否存在 
	var cookieStr = document.cookie;//把cookie字符串取出来；  如：userName=jzm; pass=123; userId=007
	var keyArr = cookieStr.split("; ");//以"; "把cookie字符串变成数组；
	
	for(var i=0;i<keyArr.length;i++){
		if(keyArr[i].indexOf(name+"=")==0){
			return keyArr[i].substring(name.length+1);
		}
	}
	return null;
}

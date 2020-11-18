export function addCookie(objName, objValue, objHours) {
	let str = objName + "=" + escape(objValue); //编码
	if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
		let date = new Date();
		let ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
}


//读取Cookie
export function getCookie(objName) {//获取指定名称的cookie的值
	let arrStr = document.cookie.split("; ");
	for (let i = 0; i < arrStr.length; i++) {
		let temp = arrStr[i].split("=");
		if (temp[0] == objName) return unescape(temp[1]);  //解码
	}
	return "";
}

// 清除所有 Cookie
export function clearAllCookie() {
	let date=new Date();
	date.setTime(date.getTime()-10000000000);
	let keys=document.cookie.match(/[^ =;]+(?=\=)/g);
	console.log("需要删除的cookie名字："+keys);
	if (keys) {
		for (let i =  keys.length; i--;)
			document.cookie=keys[i]+"=-1; expire="+date.toGMTString()+"; path=/";
	}
}

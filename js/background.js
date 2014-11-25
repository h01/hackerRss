/*
 * @name 	黑阔博客RSS更新桌面提醒扩展程序4 Chrome
 * @version	1.0
 * @author	Holger
 * @blog	http://ursb.org/
 * @github	https://github.com/h01/hackerRss
 * @update	2014/11/06
 */

// 定时更新，默认15分钟
function start(){
	// 初始化后台更新对象
	var worker = new Worker("js/update.js");
	// 监听更新对象消息
	worker.onmessage = function(e){
		if (e.data.act == "res") {
			var p = new DOMParser();
			var x = p.parseFromString(e.data.res, "text/xml");
			checkUpdate(x);
		};
	};
	// 发送启动任务
	worker.postMessage({
		act: "start"
	});
	setTimeout(start, 1000 * 60 * 15);
}

// 检测数据是否为最新
function checkUpdate(x){
	var i = x.getElementsByTagName("item")[0];
	// 链接
	var l = i.getElementsByTagName("link")[0].firstChild.nodeValue;
	// 标题
	var t = i.getElementsByTagName("title")[0].firstChild.nodeValue;
	// 简介
	var b = i.getElementsByTagName("description")[0].firstChild.nodeValue;
	// 去除杂质
	t = t.replace(/<[^>]+>/g, "");
	b = b.replace(/<[^>]+>/g, "");
	// 判断更新
	if (localStorage[l] == undefined || localStorage[l] != l) {
		console.log("[+] 发现更新: " + t);
		toastr(t, b, l);
		localStorage[l] = l;
	}else{
		console.log("[-] 木有更新: " + t);
	}
}

// 桌面提醒函数
function toastr(t, b, l){
	var n = new Notification(t, {body: b, icon: "src/icon.png"});
	n.onclick = function(){window.open(l, "_blank");n.close()};
	var a = document.createElement("audio");a.src = "src/msg.mp3";a.play();a.remove();
}

start();
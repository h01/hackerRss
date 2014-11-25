/*
 *  @name       后台更新程序Worker
 *  @version    1.0
 *  @author     Holger
 *  @blog       http://ursb.org/
 *  @update     2014-11-05
 */

// 导入url列表
importScripts("urls.js");

// 监听消息
onmessage = function(e){
    if (e.data.act == "start") {
        console.log("[*] 更新程序开始执行.. At: " + new Date());
        update();
        console.log("[*] 更新完毕! At: " + new Date());
    };
}

// 更新函数
function update(){
    for (var i = 0; i < urls.length; i++) {
        console.log("[" + i + "] 检测更新: " + urls[i]);
        try{
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function(){
                if (ajax.readyState == 4 && ajax.status == 200) {
                    postMessage({
                        act: 'res',
                        res: ajax.responseText
                    });
                };
            };
            ajax.open("GET", urls[i], false);
            ajax.send();
        }catch(e){
            console.log("[!] 出错: " + e.message);
        }
    };
}
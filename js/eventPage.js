//后台处理js文件

console.log("后台跟踪数据...");


//监听所有请求
chrome.webRequest.onBeforeRequest.addListener (    
    function(details) {    
        chrome.tabs.query({active:true},function(tab){
            // 当前页面的url
            var pageUrl = tab[0].url;
            // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来
            console.log("current url -> " + pageUrl);
        });
    
    },
        
    {urls:["http://www.erp321.com/*"]},  //监听页面请求,你也可以通过*来匹配。
    ["blocking"] 
);


/*
var flag = false;
var currentTabId;
chrome.browserAction.onClicked.addListener(function(tab) {
　　counter = 40;
　　console.log('Turning ' + tab.url);
　　flag = true;
　　currentTabId = tab.id;
　　chrome.tabs.getSelected(null, function(tab) {
　　　　sendMsg(tab.id);
　　});
});


chrome.webNavigation.onCompleted.addListener(function( tab ){
　　console.log('加载完成***' + tab.tabId );
　　if( flag ){
　　　　sendMsg( tab.tabId );
　　}
});

chrome.extension.onMessage.addListener(

function(request, sender, sendResponse) {
　　console.log("*******evenPage.js***chrome.extension.onMessage.addListener"); 
　　articleData = request;
　　$.ajax({
　　　　url: "服务器接受数据URL/getOrderinfo.php",
　　　　cache: false,
　　　　type: "POST",
　　　　data: {'orderinfo': request.msg.join("#$#")},
　　　　dataType: "json"
　　　　}).done(function(msg) {
　　　　　　console.log('*******************json*************' + msg.sql );
　　　　　　chrome.tabs.sendMessage(currentTabId, {"cmd":"end"}, 
　　　　　　function(response) { 
　　　　　　console.log(response); 
　});

}).fail(function(jqXHR, textStatus) {
　　articleData.firstAccess = textStatus;
});

cmd = request.cmd;
if('end' == cmd){
　　flag = false;//确保不会自动运行
}

});

function sendSku2Info(colores){
　　chrome.tabs.query(
　　　　{active: true, currentWindow: true}, function(tabs) {
　　　　　　chrome.tabs.sendMessage(tabs[0].id, {"cmd":"ok", "sku": colores}, 
　　　　　　function(response) { 
　　　　　　　　console.log(response); 
　　　　　　});

　　});
}

function sendMsg( tabid ){
　　console.log(tabid + "--sendMsg()----eventPage.js");
　　chrome.tabs.sendMessage(tabid, {greeting: "start working"}, function(response) {
　　});
}
*/

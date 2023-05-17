console.log("这里是后台...");

//监听所有请求
chrome.webRequest.onBeforeRequest.addListener (    
	detailRequest,
    // function(details) {    
    //     chrome.tabs.query({active:true},function(tab){
    //         // 当前页面的url
    //         var pageUrl = tab[0].url;
    //         // 在这可以写判断逻辑，将请求cancel掉，或者将请求打印出来
    //         console.log("current url -> " + pageUrl);
    //     });
    
    // },        
    {urls:["https://www.erp321.com/*"]},  //监听页面请求,你也可以通过*来匹配。
    ["blocking"] 
);

function detailRequest(detail){
	console.log("detail request ******** ");
	console.log("detail url="+detail.url);
}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
 console.log('收到来自content-script的消息：');
 console.log(request, sender, sendResponse);
 sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function test()
{
 alert('我是background！');
}
 
var views = chrome.extension.getViews({type:'popup'});
if(views.length > 0) {
 console.log(views[0].location.href);
}
	 
// function sendMessageToContentScript(message, callback)
// {
//  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
//  {
//   chrome.tabs.sendMessage(tabs[0].id, message, function(response)
//   {
//    if(callback) callback(response);
//   });
//  });
// }

// 向标签中的content_script发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}


function getCurrentTabId(callback)
{
 chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
 {
  if(callback) callback(tabs.length ? tabs[0].id: null);
 });
}



function set_mintime(mintime){
     //alert("我是background.js页面收到 mintime  :" + mintime);//收到数据
	 
	 // 向标签中的content_script发送消息
	 sendMessageToContentScript({cmd:'set_mintime', value:mintime}, function(response)
	 {
		console.log('来自content的回复：'+response);
	 });	 
	 
	 // sendMessageToContentScript('mintime:'+mintime, (response) => {
	 // 		if(response) alert('收到了来自content-script的回复：'+response);
	 // 	});
}

function set_maxtime(maxtime){
     //alert("我是background.js页面收到 maxtime  :" + maxtime);//收到数据
	 sendMessageToContentScript({cmd:'set_maxtime', value:maxtime}, function(response)
	 {
	 		console.log('来自content的回复：'+response);
	 });	 
}


function set_shopid(shopid){
     //alert("我是background.js页面收到 shopid  :" + shopid);//收到数据
	 sendMessageToContentScript({cmd:'set_shopid', value:shopid}, function(response)
	 {
	 		console.log('来自content的回复：'+response);
	 });	
}


function set_viewstate(viewstate){
     //alert("我是background.js页面收到 viewstate  :" + viewstate);//收到数据
	 sendMessageToContentScript({cmd:'set_viewstate', value:viewstate}, function(response)
	 {
	 		console.log('来自content的回复：'+response);
	 });	
}

function set_generator(generator){
     //alert("我是background.js页面收到 generator  :" + generator);//收到数据
	 sendMessageToContentScript({cmd:'set_generator', value:generator}, function(response)
	 {
	 		console.log('来自content的回复：'+response);
	 });	
}


function set_timesleepsecond(timesleepsecond){
     //alert("我是background.js页面收到 shopid  :" + shopid);//收到数据
	 sendMessageToContentScript({cmd:'set_timesleepsecond', value:timesleepsecond}, function(response)
	 {
	 		console.log('来自content的回复：'+response);
	 });	
}





// sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
// {
//  console.log('来自content的回复：'+response);
// });	 



// 动态执行JS代码
// chrome.windows.getCurrent(function(currentWindow)
// {
//  tabId=currentWindow.id;
//  console.log('当前窗口ID：' + tabId);
//  chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red"'});
//  chrome.tabs.executeScript(tabId, {code: 'alert("xx")'});
// });

 
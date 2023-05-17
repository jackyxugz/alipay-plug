$(function () {

	// 程序启动，自动执行的函数
	$(document).ready(function () {
		var nowDate = new Date();
		//当前时间减去1天
		var aimDate = new Date(nowDate - 1000 * 60 * 60 * 24);//当前日期时间戳减去一天时间戳
		//  new Date(nowDate.setDate(nowDate.getDate()-1));	
		console.log("初始化完成");
		//alert("初始化完成");

		//加载完成!
		var date1 = aimDate.getFullYear() + "-" + (('0' + (aimDate.getMonth() * 1 + 1)).slice(-2)) + "-" + (aimDate.getDate()) + " 08:00:00";
		var date2 = nowDate.getFullYear() + "-" + ('0' + (nowDate.getMonth() * 1 + 1)).slice(-2) + "-" + (nowDate.getDate()) + " 23:59:59";

		//给起止日期赋值
		// $("#fromdate").attr("value",date1);  
		// $("#enddate").attr("value",date2);		
		$("#fromdate").val(date1);
		$("#enddate").val(date2);
		console.log("最新的采集时间是1-2:" + date1 + "->" + date2);


	});


	// 下载信息
	$("#btnCopy").click(function () {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: "copy"
			}, function (response) {
				//console.log("test123456");
				//console.log(response);

				// var fromdate=$("#fromdate").val();
				// var enddate=$("#enddate").val();
				// console.log(fromdate);
				// console.log(enddate);				
				//console.log("test7890");

				// localStorage.setItem("mintime", $("#fromdate").value);
				// localStorage.setItem("lasttime",  $("#enddate").value);
				// var win = chrome.extension.getBackgroundPage();
				// win.data = response;

				//console.log(response);
			});
		});
	});

	// 按月统计销售订单数
	$("#btnMonthCount").click(function () {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: "MonthCount"
			}, function (response) {
			});
		});
	});


	$("#btnPaste").click(function () {
		var win = chrome.extension.getBackgroundPage();
		if (win.data) {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					action: "paste",
					data: win.data
				}, function (response) {
					console.log(response);
				});
			});
		}
	});

	$("#timesleepsecond").bind("change", function () {
		var timesleepsecond = $("#timesleepsecond").val();
		//var enddate=$("#enddate").val();
		console.log("延时:");
		console.log(timesleepsecond);
		//console.log(enddate);		
		localStorage.setItem("timesleepsecond", timesleepsecond);
		//localStorage.setItem("lasttime", enddate);

		var bg = chrome.extension.getBackgroundPage();
		bg.timesleepsecond = timesleepsecond;  //给background中增加参数
		bg.set_timesleepsecond(timesleepsecond);//传出	

	});

	$("#fromdate").bind("change", function () {
		var fromdate = $("#fromdate").val();
		//var enddate=$("#enddate").val();
		console.log("时间变了1:");
		console.log(fromdate);
		//console.log(enddate);		
		localStorage.setItem("mintime", fromdate);
		//localStorage.setItem("lasttime", enddate);

		var bg = chrome.extension.getBackgroundPage();
		bg.fromdate = fromdate;  //给background中增加参数
		bg.set_mintime(fromdate);//传出	

	});

	$("#enddate").bind("change", function () {
		//var fromdate=$("#fromdate").val();
		var enddate = $("#enddate").val();
		console.log("时间变了2:");
		//console.log(fromdate);
		console.log(enddate);
		//localStorage.setItem("mintime", fromdate);
		//localStorage.setItem("lasttime", enddate);
		localStorage.setItem("maxtime", enddate);

		var bg = chrome.extension.getBackgroundPage();
		bg.enddate = enddate;
		bg.set_maxtime(enddate);//传出
	});

	$("#shopid").bind("change", function () {
		var shopid = $("#shopid").val();
		console.log("shopid变了:");
		console.log(shopid);
		localStorage.setItem("shopid", shopid);

		var bg = chrome.extension.getBackgroundPage();
		bg.shopid = shopid;  //给background中增加参数
		bg.set_shopid(shopid);//传出

		var fromdate = $("#fromdate").val();
		bg.fromdate = fromdate;  //给background中增加参数
		bg.set_mintime(fromdate);//传出		

		var enddate = $("#enddate").val();
		bg.enddate = enddate;
		bg.set_maxtime(enddate);//传出

	});

	$("#viewstate").bind("change", function () {
		var viewstate = $("#viewstate").val();
		console.log("viewstate变了:");
		console.log(viewstate);
		localStorage.setItem("viewstate", viewstate);

		var bg = chrome.extension.getBackgroundPage();
		bg.viewstate = viewstate;  //给background中增加参数
		bg.set_viewstate(viewstate);//传出

		var fromdate = $("#fromdate").val();
		bg.fromdate = fromdate;  //给background中增加参数
		bg.set_mintime(fromdate);//传出		

		var enddate = $("#enddate").val();
		bg.enddate = enddate;
		bg.set_maxtime(enddate);//传出

	});


	$("#generator").bind("change", function () {
		var generator = $("#generator").val();
		console.log("generator变了:");
		console.log(generator);
		localStorage.setItem("generator", generator);

		var bg = chrome.extension.getBackgroundPage();
		bg.generator = generator;  //给background中增加参数
		bg.set_generator(generator);//传出

		var fromdate = $("#fromdate").val();
		bg.fromdate = fromdate;  //给background中增加参数
		bg.set_mintime(fromdate);//传出		

		var enddate = $("#enddate").val();
		bg.enddate = enddate;
		bg.set_maxtime(enddate);//传出

	});

});


window.onload = function () {
	console.log("加载完成");
	//alert("加载完成!");

	fromdate = localStorage.getItem("mintime");
	if (fromdate != null) {
		$("#fromdate").val(fromdate);
	};

	enddate = localStorage.getItem("maxtime");
	if (enddate != null) {
		$("#enddate").val(enddate);
	};

	// var bg = chrome.extension.getBackgroundPage();
	// bg.fromdate = fromdate;  //给background中增加参数
	// bg.enddate = enddate;

	// 从缓存中获取上次记录的数值

	timesleepsecond = localStorage.getItem("timesleepsecond");
	if (timesleepsecond != null) {
		$("#timesleepsecond").val(timesleepsecond);
	};

	shopid = localStorage.getItem("shopid");
	if (shopid != null) {
		$("#shopid").val(shopid);
	};

	viewstate = localStorage.getItem("viewstate");
	if (viewstate != null) {
		$("#viewstate").val(viewstate);
	};

	generator = localStorage.getItem("generator");
	if (generator != null) {
		$("#generator").val(generator);
	};


}

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('2收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('2我是后台，我已收到你的消息：' + JSON.stringify(request));
});

function f_gather() {

	chrome.runtime.sendMessage({
		greeting: '你好，我是pop呀，我主动发消息给后台！'
	}, function (response) {
		console.log('收到来自后台的回复：' + response);
	});

	test();
	console.log("gather....");

}

function f_download() {
	console.log("downloading....")
	// chrome.tabs.query({
	// 		active: true,
	// 		currentWindow: true
	// 	},
	// 	function(tabs) {
	// 		chrome.tabs.executeScript(tabs[0].id, {
	// 			code: 'document.body.style.backgroundColor="black";'
	// 		})
	// 	}
	// )
}

// var bg = chrome.extension.getBackgroundPage();
// bg.test(); // 访问bg的函数
// alert(bg.document.body.innerHTML); // 访问bg的DOM

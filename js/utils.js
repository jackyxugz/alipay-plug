
function download(filename, text) {
	var pom = document.createElement('a');
	// 　解决js导出csv中文乱码
	pom.setAttribute('href', 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
}

function random(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}

function replaceAll(str) {
	if (str != null)
		str = str.replace(/word/g, "Excel")
	return str;
}


function now() {
	return datetimetostr(new Date());
}


function getFormatDate(arg) {
	if (arg == undefined || arg == '') {
		return '00';
	}

	var re = arg + '';
	if (re.length < 2) {
		re = '0' + re;
	}

	if (re == "0") {
		re = "00";
	}

	return re;
}

function getFormatMSecond(arg) {
	if (arg == undefined || arg == '') {
		return '000';
	}

	var re = arg + '';
	if (re.length < 2) {
		re = '00' + re;
	}

	if (re.length < 3) {
		re = '0' + re;
	}

	if (re == "0") {
		re = "000";
	}

	return re;
}


function datetostr(_date) {
	date = _date.getFullYear() + "-" + getFormatDate((_date.getMonth() * 1 + 1)) + "-" + getFormatDate(_date.getDate());
	return date;
}

function datetimetostr(_date) {
	date = _date.getFullYear() + "-" + getFormatDate((_date.getMonth() * 1 + 1)) + "-" + getFormatDate(_date.getDate()) +
		" " + getFormatDate(_date.getHours()) + ":" + getFormatDate(_date.getMinutes()) + ":" + getFormatDate(_date.getSeconds()) +
		"." + getFormatMSecond(_date.getMilliseconds());

	//console.log("time=" + date);
	return date;
}


function gettodate() {
	var _todate = new Date();
	//alert("今天是:"+_todate.getFullYear()+"-"+(_todate.getMonth()*1+1)+"-"+_todate.getDate());	

	_todate.setDate(_todate.getDate() - 0);
	todate = new Date(_todate);
	todate = todate.getFullYear() + "-" + getFormatDate((todate.getMonth() * 1 + 1)) + "-" + getFormatDate(todate.getDate());
	return todate;
}


function getfromdate(daycnt) {
	var _fromdate = new Date();
	_fromdate.setDate(_fromdate.getDate() - 0 - daycnt);
	fromdate = new Date(_fromdate)
	fromdate = fromdate.getFullYear() + "-" + getFormatDate((fromdate.getMonth() * 1 + 1)) + "-" + getFormatDate(fromdate
		.getDate());
	return fromdate;
}

//字符串转日期格式，strDate要转为日期格式的字符串
function strToDate(strDate) {
	// var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, 
	//  function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
	// return date;
	//console.log(strDate);
	strDate = strDate.replace(/-/g, "/"); //为了兼容IE
	var date = new Date(strDate);
	return date;

}


function getMonthEndDay(_date) {
	// 下个月1号
	var _monthenddate = strToDate(_date.getFullYear() + "-" + getFormatDate((_date.getMonth() * 1 + 1)) + "-01 23:59:59.998")

	// 加一个月
	_monthenddate = new Date(_monthenddate.setMonth(_monthenddate.getMonth() + 1));
	//时间减去1天
	_monthenddate = new Date(_monthenddate.setDate(_monthenddate.getDate() - 1));

	return _monthenddate

}

function getNextMonthFirstDay(_date) {
	// 下个月1号
	var _nextmonthfirstdate = strToDate(_date.getFullYear() + "-" + getFormatDate((_date.getMonth() * 1 + 1)) + "-01 00:00:00")
	// 加一个月
	_nextmonthfirstdate = new Date(_nextmonthfirstdate.setMonth(_nextmonthfirstdate.getMonth() + 1));
	return _nextmonthfirstdate
}

var timesleep = function (time) {
	//sleep(1000); // 延时函数，单位ms
	var startTime = new Date().getTime() + parseInt(time * 1000, 10);
	while (new Date().getTime() < startTime) { }
};


var millisecondsleep = function (time) {
	//sleep(1000); // 延时函数，单位ms
	var startTime = new Date().getTime() + parseInt(time, 10);
	while (new Date().getTime() < startTime) { }
};

const sleep = (time) => {
	return new Promise(resolve => setTimeout(resolve, time));
}


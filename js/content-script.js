//前端代码

var totalPage;
var page = 0;
var PageIndex = 1;
var PageCount = 1;
var maxPageCount = 2500;
var predays = 0;
//var javahost = "10.20.0.110:8889";

// localhost
// 是否调试模式？
var tiaoshi = 1

var javahost = "127.0.0.1:7443";
var local_url = "https://" + javahost + "/insertsalesorder";
var lasttimeurl = "https://" + javahost + "/lasttime";
var recordcounturl = "https://" + javahost + "/recordcount";
var lastime;
//server
// var url = "https://10.20.0.110:7443/inserttaskid";
// var lasttimeurl="https://10.20.0.110:7443/lasttime";

if (tiaoshi == 1) {
    local_url = "https://127.0.0.1:7443/insertsalesorder";
    lasttimeurl = "https://127.0.0.1:7443/lasttime";
}

//常量，跟账号有关系
VIEWSTATE = localStorage.getItem("viewstate")
//alert(VIEWSTATE)
if (VIEWSTATE == null) {
    //alert("old!")
    console.log("取旧的默认值");
    VIEWSTATE = '/wEPDwUKMTkzMTIxMDk0NmRk5NyWeiwn+VnfOqk2D+wZtsJ19fM=';
}
console.log("VIEWSTATE:" + VIEWSTATE);
//alert(VIEWSTATE)
//VIEWSTATE='/wEPDwUKMTkzMTIxMDk0NmRk5NyWeiwn+VnfOqk2D+wZtsJ19fM=';	


VIEWSTATEGENERATOR = localStorage.getItem("generator")
if (VIEWSTATEGENERATOR == null) {
    VIEWSTATEGENERATOR = 'C8154B07';
}


// 延时几秒钟
timesleepsecond = 2
// 定时执行任务的时间间隔,单位分钟
var intervalminute = 10;

//注册前台页面监听事件
//自定义时间，采集的最小和最大时间 !保持字符串数据格式
var minTime =
    //"2020-07-01 00:00:00";
    new Date(Date.parse("2020-07-01 00:00:00"));
//minTime = new Date(Date.parse(minTime));

// var maxTime = "2022-12-31 00:00:00";
// maxTime = new Date(Date.parse(maxTime));
//取当前时间
var maxTime = new Date();

var erphref = window.location.href;
var cookie = document.cookie;
//alert(cookie);

// if (erphref.indexOf("erp321.com") > 0) {

// 	console.log("我是content-scripts:开始抓取数据...");
// 	// console.log("msg----------contentscript.js" + request.greeting);
// 	var vouch = document.getElementById('_jt_data').innerHTML;
// 	//window.frames[1].document.getElementById('_jt_data').innerHTML;
// 	//alert(vouch);
// 	parsevouch(vouch);

// }


function MonthCount_controller() {
    console.log("开始统计订单数");
    //gatherprinter_model();
    MonthCount_model();

}

function gatherprinter_controller() {
    //实际开始采集数据
    var now = new Date();
    console.log("正式开始采集数据...");

    // var bg = chrome.extension.getBackgroundPage();
    // shopid=bg.shopid   ;  //给background传参数
    // fromdate=bg.fromdate   ;
    // enddate=bg.enddate   ;

    // console.log("_shopid:"+shopid);
    // console.log("_fromdate:"+fromdate);
    // console.log("_enddate:"+enddate);

    // 从菜单中获取采集的开始时间
    if (2 == 2) {
        //当前时间
        // var nowDate = new Date();
        // //当前时间减去1天
        // var aimDate = new Date(nowDate.setDate(nowDate.getDate()-1));

        // var minTime = localStorage.getItem("mintime",  datetimetostr(aimDate) )
        // var maxTime = localStorage.getItem("lasttime",  datetimetostr(new Date()) );

        // console.log("最新的采集时间是:" + minTime+"->"+maxTime);
        //强制提前1分钟，实际执行的起始时间
        //minTime = datetostr(new Date(minTime.valueOf() - 60 * 1000));
        //minTime = new Date(Date.parse(minTime) - 60 * 1000);

        gatherprinter_model();
    }


    console.log("现在是:" + getFormatDate(now.getHours()) + ":" + getFormatDate(now.getMinutes()) + ":" + getFormatDate(now.getSeconds()));
    if (getFormatDate(now.getHours()) + ":" + getFormatDate(now.getMinutes()) + ":" + getFormatDate(now.getSeconds()) <
        '09:00:00') {
        console.log("晚上,凌晨都是休息时间");
    } else {
        console.log("工作时间");

        //第一次获取最新采集时间,从服务器获取采集开始时间
        if (1 == 2) {
            $.get(lasttimeurl, function (data) {
                // 取得最新采集的时间
                minTime =
                    new Date(Date.parse(data));
                //console.log("最新的采集时间是:" + datetimetostr(minTime));
                //上次采集到的真实最新时间
                localStorage.setItem("lasttime", datetimetostr(minTime));
                //强制提前1分钟，实际执行的起始时间
                //minTime = datetostr(new Date(minTime.valueOf() - 60 * 1000));
                //minTime = new Date(Date.parse(minTime) - 60 * 1000);
                localStorage.setItem("mintime", datetimetostr(minTime));
                console.log("实际执行的开始采集时间是:" + datetimetostr(minTime));
                ///
                {

                    var _mintime = minTime;
                    //延迟10秒钟
                    setTimeout(waitsecond, 10000);

                    $.get(lasttimeurl, function (data) {
                        // 取得最新采集的时间
                        minTime =
                            new Date(Date.parse(data));
                        //console.log("最新的采集时间是:" + datetimetostr(minTime));
                        //上次采集到的真实最新时间
                        localStorage.setItem("lasttime", datetimetostr(minTime));
                        //强制提前1分钟，实际执行的起始时间
                        //minTime = datetostr(new Date(minTime.valueOf() - 60 * 1000));
                        //minTime = new Date(Date.parse(minTime) - 60 * 1000);
                        localStorage.setItem("mintime", datetimetostr(minTime));
                        console.log("实际执行的开始采集时间2是:" + datetimetostr(minTime));

                        {
                            //比较记录数会更加靠谱！！！
                            if (datetimetostr(_mintime) == datetimetostr(minTime)) {
                                console.log("10秒钟无变化，系统空闲中，可以采集 ->[" + getmintime() + "]");
                                //确保minTime是日期时间格式!!!
                                //minTime = new Date(Date.parse(minTime));
                                //minTime = localStorage.getItem("mintime");
                                //记录下执行采集动作的时间
                                maxTime = new Date();
                                localStorage.setItem("maxtime", datetimetostr(maxTime));
                                console.log("执行动作时间:" + localStorage.getItem("maxtime"));
                                gatherprinter_model();
                            } else {
                                console.log("系统正忙，请稍后重试..." + datetimetostr(_mintime) + "<>" + datetimetostr(minTime));
                            }
                        }

                    }).fail(function () {
                        console.log("服务器出故障了!!!");

                    });

                }

            }).fail(function () {
                console.log("服务器出故障了!!!");

            });
        }


    }
}

function MonthCount_model() {
    //datetimetostr(minTime)
    console.log("Begin:开始采集@" + datetimetostr(maxTime) + " [最后的单据时间为:" + localStorage.getItem("lasttime") + "]");
    //实际采集要提前一分钟
    //minTime = new Date(minTime.valueOf() - 60 * 1000);

    _minTime = localStorage.getItem("mintime");
    _maxTime = localStorage.getItem("maxtime");
    _shopid = localStorage.getItem("shopid");

    if (_shopid.indexOf(",") > 0) {
        shopid = _shopid.split(",");
        for (i = 0; i < shopid.length; i++) {
            console.log("现在统计店铺" + shopid[i]);
            //清空持久存储的订单数
            localStorage.setItem("DataCount@" + shopid[i], "");
            sessionStorage.setItem("datacount@" + shopid[i], "0");
            getRowCount(_minTime, _maxTime, _maxTime, shopid[i]);
        }
    } else {
        //清空持久存储的订单数
        localStorage.setItem("DataCount@" + _shopid, "");
        sessionStorage.setItem("datacount@" + _shopid, "0");
        getRowCount(_minTime, _maxTime, _maxTime, _shopid);
    }


}


function getRowCount(minTime, maxTime, lastTime, shopid) {
    // lastTime  表示统计的结束时间，这个时间始终不变，一直传递下去

    if (getMonthEndDay(strToDate(minTime)).getTime() <= strToDate(maxTime).getTime()) {
        var monthenddate = datetimetostr(getMonthEndDay(strToDate(minTime)));
        maxTime = monthenddate;
    }

    var timestamp1 = Date.parse(new Date());
    var url = "https://ww.erp321.com/app/order/order/list.aspx?ts___=" + timestamp1 + "&am___=LoadDataToJSON";
    // 最小时间再减少1分钟，避免遗漏数据
    console.log("重新取到开始时间为:" + minTime);

    // 截掉后面的时分秒信息
    //minTime=minTime.split(" ")[0].trim();
    //maxTime=maxTime.split(" ")[0].trim();

    //console.log("998index:"+maxTime.indexOf("998"));
    if (maxTime.indexOf("998") < 0) {
        maxTime = maxTime + ".998";
        //  23:59:59.998
    }

    // if (minTime.indexOf("00:00:00")>0){
    // 	minTime=minTime.sub(0,minTime.indexOf("00:00:00")).trim();
    // }

    console.log("minTime:=" + minTime);
    console.log("maxTime:=" + maxTime);


    VIEWSTATE = localStorage.getItem("viewstate")
    if (VIEWSTATE == null) {
        VIEWSTATE = '/wEPDwUKMTkzMTIxMDk0NmRk5NyWeiwn+VnfOqk2D+wZtsJ19fM=';
    }


    VIEWSTATEGENERATOR = localStorage.getItem("generator")
    if (VIEWSTATEGENERATOR == null) {
        VIEWSTATEGENERATOR = 'C8154B07';
    }

    //minTime=minTime.replace("2020-01-01","2020-06-15 00:00:00");

    //限制查询的日期范围
    //shopid="10582952";
    var content =
        "{\"Method\":\"LoadDataToJSON\",\"Args\":" + "[\"" + "1" + "\",\"["
        + "{\\\"k\\\":\\\"is_merge\\\",\\\"v\\\":\\\"0\\\",\\\"c\\\":\\\"=\\\"},"
        + "{\\\"k\\\":\\\"is_split\\\",\\\"v\\\":\\\"0\\\",\\\"c\\\":\\\"=\\\"},"
        + "{\\\"k\\\":\\\"shop_id\\\",\\\"v\\\":\\\"" + shopid + "\\\"" + ",\\\"c\\\":\\\"@=\\\"},"
        + "{\\\"k\\\":\\\"type\\\",\\\"v\\\":\\\"普通订单\\\",\\\"c\\\":\\\"@=\\\"},"
        + "{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\"" + minTime + "\\\",\\\"c\\\":\\\">=\\\",\\\"t\\\":\\\"date\\\"},"
        + "{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\"" + maxTime + "\\\",\\\"c\\\":\\\"<=\\\",\\\"t\\\":\\\"date\\\"}]\",\"{}\"]}";

    console.log(content);
    //console.log(JSON.parse(content));
    //localStorage.setItem("lasttime", datetimetostr(timestamp1));
    //return ;

    var xhr = $.ajax({
        'url': url,
        'type': 'POST',
        'crossDomain': 'true',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://ww.erp321.com/app/order/order/list.aspx',
        'Host': 'ww.erp321.com',
        'Origin': 'http://ww.erp321.com',
        'Proxy-Connection': 'keep-alive',
        'contentType': "application/x-www-form-urlencoded; charset=utf-8",
        'scriptCharset': "utf-8",
        'data': {
            '__VIEWSTATE': VIEWSTATE,
            '__VIEWSTATEGENERATOR': VIEWSTATEGENERATOR,
            'fe_remark_type': 'single',
            '_jt_page_size': '50',
            'fe_node_desc': '',
            'receiver_state': '',
            'receiver_city': '',
            'receiver_district': '',
            'receiver_address': '',
            'receiver_name': '',
            'receiver_phone': '',
            'receiver_mobile': '',
            'check_name': '',
            'check_address': '',
            'fe_flag': '',
            'fe_is_append_remark': '',
            '__CALLBACKID': 'JTable1',
            '__CALLBACKPARAM': content
        },
        //'dataType': 'json',
        //'dataType': 'html',
        'jsonp': 'callback',
        'async': 'true',
        'success': function (data) {
            console.log("开始解析数据...");
            //解析数据 滑动验证页面

            //alert(xhr.getResponseHeader('Content-Length') + ' bytes');
            if (data.trim().length == 0) {
                //if (xhr.getResponseHeader('Content-Length')==0){
                console.log("没有任何返回，等会再试吧  :(");
                alert("没有任何返回，等会再试吧  :(")
                return
            }

            if (data.indexOf("滑动验证页面") > 0) {
                console.log("要求滑动页面，等会再试吧 :(");
                alert("要求滑动页面，等会再试吧  :(")
                return
            }

            sessionStorage.setItem("jtdata1", data)

            data = data.substr(2, data.length - 2);
            var p = data.indexOf('ReturnValue') + 14;
            var jtdata = data.substr(p, data.length - p);
            jtdata = jtdata.substr(0, jtdata.indexOf("ExceptionText") - 3);
            sessionStorage.setItem("jtdata2", jtdata)
            // \" 替换
            jtdata = jtdata.replace(/\\/g, "");

            // 下载文本文件
            //download("data.txt",jtdata);
            //console.log("解析数据报错:");
            //console.log(jtdata);

            sessionStorage.setItem("jtdata3", jtdata);
            if (jtdata.indexOf("ExceptionMessage") > 0) {
                ExceptionMessage = jtdata.substr(0, jtdata.indexOf("ExceptionMessage"));
                ExceptionMessage = ExceptionMessage.substr(ExceptionMessage.indexOf("ExceptionMessage") + 19, ExceptionMessage.length);
                console.log(ExceptionMessage);
                return;
            }

            var vouchjson = JSON.parse(jtdata);
            //刷新页码数,计算最大的页码数
            PageCount = parseInt(vouchjson["dp"]["PageCount"]);
            DataCount = parseInt(vouchjson["dp"]["DataCount"]);
            // console.log("本次采集总共" + PageCount + "页！");
            console.log(shopid + "采集" + DataCount + "行[" + minTime + "->" + maxTime + "]");
            localStorage.setItem("DataCount", DataCount);

            // 持久存储，便于跟踪
            DataCountList = localStorage.getItem("DataCount@" + shopid);
            if (DataCountList == null) {
                DataCountList = "";
            }
            ;
            var rows = "'" + minTime + ",'" + maxTime + "," + DataCount + '\n';
            localStorage.setItem("DataCount@" + shopid, DataCountList.trim() + '\n' + rows);

            //临时存储，便于累计
            _temp_DataCount = sessionStorage.getItem("datacount@" + shopid);
            if (_temp_DataCount == null) {
                _temp_DataCount = "0";
            }
            ;
            _temp_DataCount = _temp_DataCount * 1 + (DataCount * 1);
            sessionStorage.setItem("datacount@" + shopid, _temp_DataCount)

            //嵌套循环，采集下一个时间周期的订单数量
            //下个月的第一天
            minTime = datetimetostr(getNextMonthFirstDay(strToDate(maxTime)));
            //跨月：开始月份的最后一天小于结束日期（或者刚好结束日期是月末）
            if (getMonthEndDay(strToDate(minTime)).getTime() <= strToDate(lastTime).getTime()) {
                console.log("跨月：" + datetimetostr(getMonthEndDay(strToDate(minTime))) + "=>" + lastTime);
                timesleep(2);
                getRowCount(minTime, lastTime, lastTime, shopid);
            } else {
                if (strToDate(minTime).getTime() <= strToDate(lastTime).getTime()) {
                    console.log(shopid + "最后一个月数据");
                    timesleep(2);
                    getRowCount(minTime, lastTime, lastTime, shopid);
                } else {
                    //如果不跨月，则统计结束
                    console.log(shopid + "订单数量统计完成，共计" + _temp_DataCount + "行！");
                    //alert("订单数量统计完成，共计"+_temp_DataCount+"行！")
                    DataCountList = localStorage.getItem("DataCount@" + shopid);
                    if (DataCountList == null) {
                        DataCountList = "";
                    }
                    ;
                    download("DataCount@" + shopid + ".csv", DataCountList);
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //  alert(textStatus);
            console.log("error XMLHttpRequest.status=" + XMLHttpRequest.status);
            console.log("error XMLHttpRequest.errorThrown=" + errorThrown.toString());
            return 0;
        }
    });
}


function gatherprinter_model() {
    //实际开始采集数据
    //minTime = new Date(Date.parse(_minTime));
    //minTime=localStorage.getItem("mintime");
    //maxTime = new Date();

    //datetimetostr(minTime)
    console.log("Begin:开始采集@" + datetimetostr(maxTime) + " [最后的单据时间为:" + localStorage.getItem("lasttime") + "]");
    //实际采集要提前一分钟
    //minTime = new Date(minTime.valueOf() - 60 * 1000);

    _minTime = localStorage.getItem("mintime");
    _maxTime = localStorage.getItem("maxtime");
    // _shopid = localStorage.getItem("shopid");

    // var minTime = localStorage.getItem("mintime");
    // var maxTime = localStorage.getItem("maxtime");
    // var shopid = localStorage.getItem("shopid");


    getPageCount(_minTime, _maxTime);
}


function getPageCount(minTime, maxTime) {
    var timestamp1 = Date.parse(new Date());
    var url = "https://ww.erp321.com/app/order/order/list.aspx?ts___=" + timestamp1 + "&am___=LoadDataToJSON";
    // 最小时间再减少1分钟，避免遗漏数据
    console.log("重新取到开始时间为:" + minTime);

    // 截掉后面的时分秒信息
    //minTime=minTime.split(" ")[0].trim();
    //maxTime=maxTime.split(" ")[0].trim();
    maxTime = maxTime + ".998";
    //  23:59:59.998

    // if (minTime.indexOf("00:00:00")>0){
    // 	minTime=minTime.sub(0,minTime.indexOf("00:00:00")).trim();
    // }

    console.log("minTime:=" + minTime);
    console.log("maxTime:=" + maxTime);


    VIEWSTATE = localStorage.getItem("viewstate")
    if (VIEWSTATE == null) {
        VIEWSTATE = '/wEPDwUKMTQ3MjM1MDc5NGRkSCTUG6FuGoH/f+sF1IrpNrDjclk=';
    }


    VIEWSTATEGENERATOR = localStorage.getItem("generator")
    if (VIEWSTATEGENERATOR == null) {
        VIEWSTATEGENERATOR = 'C8154B07';
    }

    //minTime=minTime.replace("2020-01-01","2020-06-15 00:00:00");

    //限制查询的日期范围
    //shopid="10582952";
    /* var content =
    "{\"Method\":\"LoadDataToJSON\",\"Args\":"+"[\"" + "1" + "\",\"["
    +"{\\\"k\\\":\\\"is_merge\\\",\\\"v\\\":\\\"0\\\",\\\"c\\\":\\\"=\\\"},"
    +"{\\\"k\\\":\\\"is_split\\\",\\\"v\\\":\\\"0\\\",\\\"c\\\":\\\"=\\\"},"
    +"{\\\"k\\\":\\\"shop_id\\\",\\\"v\\\":\\\"" +shopid+"\\\""	+",\\\"c\\\":\\\"@=\\\"},"
    +"{\\\"k\\\":\\\"type\\\",\\\"v\\\":\\\"普通订单\\\",\\\"c\\\":\\\"@=\\\"},"
    +"{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\""+minTime+"\\\",\\\"c\\\":\\\">=\\\",\\\"t\\\":\\\"date\\\"},"
    +"{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\""+maxTime+"\\\",\\\"c\\\":\\\"<=\\\",\\\"t\\\":\\\"date\\\"}]\",\"{}\"]}"; */


    var content = "{\"Method\":\"LoadDataToJSON\",\"Args\":[\"1\",\"["
        + "{\\\"k\\\":\\\"status\\\",\\\"v\\\":\\\"sent,merged,split\\\",\\\"c\\\":\\\"@=\\\"},"
        + "{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\"" + minTime + "\\\",\\\"c\\\":\\\">=\\\",\\\"t\\\":\\\"date\\\"},"
        + "{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\"" + maxTime + "\\\",\\\"c\\\":\\\"<=\\\",\\\"t\\\":\\\"date\\\"}]\",\"{}\"]}"

    console.log(content);
    //console.log(JSON.parse(content));

    //localStorage.setItem("lasttime", datetimetostr(timestamp1));

    //return ;

    var xhr = $.ajax({
        'url': url,
        'type': 'POST',
        'crossDomain': 'true',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://ww.erp321.com/app/order/order/list.aspx',
        'Host': 'ww.erp321.com',
        'Origin': 'http://ww.erp321.com',
        'Proxy-Connection': 'keep-alive',
        'contentType': "application/x-www-form-urlencoded; charset=utf-8",
        'scriptCharset': "utf-8",
        'data': {
            '__VIEWSTATE': VIEWSTATE,
            '__VIEWSTATEGENERATOR': VIEWSTATEGENERATOR,
            'fe_remark_type': 'single',
            '_jt_page_size': '50',
            'fe_node_desc': '',
            'receiver_state': '',
            'receiver_city': '',
            'receiver_district': '',
            'receiver_address': '',
            'receiver_name': '',
            'receiver_phone': '',
            'receiver_mobile': '',
            'check_name': '',
            'check_address': '',
            'fe_flag': '',
            'fe_is_append_remark': '',
            '__CALLBACKID': 'JTable1',
            '__CALLBACKPARAM': content
        },
        //'dataType': 'json',
        //'dataType': 'html',
        'jsonp': 'callback',
        'async': 'true',
        'success': function (data) {
            console.log("开始解析数据...");
            //解析数据 滑动验证页面

            //alert(xhr.getResponseHeader('Content-Length') + ' bytes');
            if (data.trim().length == 0) {
                //if (xhr.getResponseHeader('Content-Length')==0){
                console.log("没有任何返回，等会再试吧  :(");
                alert("没有任何返回，等会再试吧  :(")
                return
            }

            if (data.indexOf("滑动验证页面") > 0) {
                console.log("要求滑动页面，等会再试吧 :(");
                alert("要求滑动页面，等会再试吧  :(")
                return
            }


            sessionStorage.setItem("jtdata1", data)

            data = data.substr(2, data.length - 2);
            var p = data.indexOf('ReturnValue') + 14;
            var jtdata = data.substr(p, data.length - p);
            jtdata = jtdata.substr(0, jtdata.indexOf("ExceptionText") - 3);
            sessionStorage.setItem("jtdata2", jtdata)
            // \" 替换
            jtdata = jtdata.replace(/\\/g, "");

            // 下载文本文件
            //download("data.txt",jtdata);

            //console.log("解析数据报错:");
            //console.log(jtdata);

            sessionStorage.setItem("jtdata3", jtdata)


            // if (data.indexOf("ExceptionMessage")>0)
            // {
            // 	ExceptionMessage=data.substr(0,data.indexOf("ExceptionMessage"));
            // 	ExceptionMessage=ExceptionMessage.substr(ExceptionMessage.indexOf("ExceptionMessage")+19,ExceptionMessage.length);
            // 	console.log(ExceptionMessage);
            // 	alert(ExceptionMessage);
            // 	return ;
            // }

            if (jtdata.indexOf("ExceptionMessage") > 0) {
                ExceptionMessage = jtdata.substr(0, jtdata.indexOf("ExceptionMessage"));
                ExceptionMessage = ExceptionMessage.substr(ExceptionMessage.indexOf("ExceptionMessage") + 19, ExceptionMessage.length);
                console.log(ExceptionMessage);
                return;
            }

            var vouchjson = JSON.parse(jtdata);
            //刷新页码数,计算最大的页码数
            PageCount = parseInt(vouchjson["dp"]["PageCount"]);
            DataCount = parseInt(vouchjson["dp"]["DataCount"]);
            console.log("本次采集总共" + PageCount + "页！");
            console.log("本次采集总共" + DataCount + "行！");
            localStorage.setItem("DataCount", DataCount);
            //	return PageCount;
            PageIndex = PageCount - 1;

            //清空缓存
            localStorage.setItem("omsdata", "");

            getPrePageData(minTime, maxTime, PageIndex);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //  alert(textStatus);
            console.log("error XMLHttpRequest.status=" + XMLHttpRequest.status);
            console.log("error XMLHttpRequest.errorThrown=" + errorThrown.toString());
            return 0;
        }
    });
}


function getPrePageData(minTime, maxTime, pageindex) {

    //延迟1秒钟
    setTimeout(waitsecond, 1000);

    var timestamp1 = Date.parse(new Date());
    var url = "https://ww.erp321.com/app/order/order/list.aspx?ts___=" + timestamp1 + "&am___=LoadDataToJSON";


    // 截掉后面的时分秒信息
    //minTime=minTime.split(" ")[0].trim();
    //maxTime=maxTime.split(" ")[0].trim();
    //maxTime=maxTime+".998";

    // if (minTime.indexOf("00:00:00")>0){
    // 	minTime=minTime.sub(0,minTime.indexOf("00:00:00")).trim();
    // }

    console.log("minTime:=" + minTime);
    console.log("maxTime:=" + maxTime);

    VIEWSTATE = localStorage.getItem("viewstate")
    if (VIEWSTATE == null) {
        VIEWSTATE = '/wEPDwUKMTkzMTIxMDk0NmRk5NyWeiwn+VnfOqk2D+wZtsJ19fM=';
    }

    VIEWSTATEGENERATOR = localStorage.getItem("generator")
    if (VIEWSTATEGENERATOR == null) {
        VIEWSTATEGENERATOR = 'C8154B07';
    }

    //限制查询的日期范围
    //shopid="10582952";
    // 23:59:59.998
    /* var content =
    " {\"Method\":\"LoadDataToJSON\",\"Args\":"+"[\"" + pageindex + "\",\"["
    +"{\\\"k\\\":\\\"is_merge\\\",\\\"v\\\":\\\"0\\\",\\\"c\\\":\\\"=\\\"},"
    +"{\\\"k\\\":\\\"is_split\\\",\\\"v\\\":\\\"0\\\",\\\"c\\\":\\\"=\\\"},"
    +"{\\\"k\\\":\\\"shop_id\\\",\\\"v\\\":\\\"" +shopid+"\\\",\\\"c\\\":\\\"@=\\\"},"
    +"{\\\"k\\\":\\\"type\\\",\\\"v\\\":\\\"普通订单\\\",\\\"c\\\":\\\"@=\\\"},"
    +"{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\""+minTime+"\\\",\\\"c\\\":\\\">=\\\",\\\"t\\\":\\\"date\\\"},"
    +"{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\""+maxTime+"\\\",\\\"c\\\":\\\"<=\\\",\\\"t\\\":\\\"date\\\"}]\",\"{}\"]}"; */

    pageindex = 2;
    var content = "{\"Method\":\"LoadDataToJSON\",\"Args\":[\"" + pageindex + "\",\"["
        + "{\\\"k\\\":\\\"status\\\",\\\"v\\\":\\\"sent,merged,split\\\",\\\"c\\\":\\\"@=\\\"},"
        + "{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\"" + minTime + "\\\",\\\"c\\\":\\\">=\\\",\\\"t\\\":\\\"date\\\"},"
        + "{\\\"k\\\":\\\"order_date\\\",\\\"v\\\":\\\"" + maxTime + "\\\",\\\"c\\\":\\\"<=\\\",\\\"t\\\":\\\"date\\\"}]\",\"{}\"]}"

    //console.log("content="+content);
    console.log(content);

    var xhr = $.ajax({
        'url': url,
        'type': 'POST',
        'crossDomain': 'true',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://ww.erp321.com/app/order/order/list.aspx',
        'Host': 'ww.erp321.com',
        'Origin': 'http://ww.erp321.com',
        'Proxy-Connection': 'keep-alive',
        'contentType': "application/x-www-form-urlencoded; charset=utf-8",
        'scriptCharset': "utf-8",
        'data': {
            '__VIEWSTATE': VIEWSTATE,
            '__VIEWSTATEGENERATOR': VIEWSTATEGENERATOR,
            'fe_remark_type': 'single',
            '_jt_page_size': '50',
            'fe_node_desc': '',
            'receiver_state': '',
            'receiver_city': '',
            'receiver_district': '',
            'receiver_address': '',
            'receiver_name': '',
            'receiver_phone': '',
            'receiver_mobile': '',
            'check_name': '',
            'check_address': '',
            'fe_flag': '',
            'fe_is_append_remark': '',
            '__CALLBACKID': 'JTable1',
            '__CALLBACKPARAM': content
        },
        //'dataType': 'json',
        //'dataType': 'html',
        'jsonp': 'callback',
        'async': 'true',
        'success': function (data) {
            //解析数据

            if (data.length > 0) {
                data = data.substr(2, data.length - 2);
                var p = data.indexOf('ReturnValue') + 14;
                var jtdata = data.substr(p, data.length - p);
                // jtdata = jtdata.substr(0, jtdata.indexOf("}]}") + 3);
                jtdata = jtdata.substr(0, jtdata.indexOf("ExceptionText") - 3);
                // \" 替换
                jtdata = jtdata.replace(/\\/g, "");

                //console.log("解析实际获取的数据:");
                //console.log(jtdata);

                // if (jtdata.indexOf("\"IsSuccess\":false,")>0)
                // {
                // 	ExceptionMessage=jtdata.substr(0,jtdata.indexOf("ReturnValue"));
                // 	ExceptionMessage=ExceptionMessage.substr(ExceptionMessage.indexOf("ExceptionMessage")+19,ExceptionMessage.length);
                // 	console.log(ExceptionMessage);
                // 	return ;
                // }

                if (jtdata.indexOf("ExceptionMessage") > 0) {
                    ExceptionMessage = jtdata.substr(0, jtdata.indexOf("ExceptionMessage"));
                    ExceptionMessage = ExceptionMessage.substr(ExceptionMessage.indexOf("ExceptionMessage") + 19, ExceptionMessage.length);
                    console.log(ExceptionMessage);
                    return;
                }

                //解析完数据，自动采集下一页
                console.log("解析完数据，自动采集下一页");
                if (pageindex > 0) {
                    try {
                        // 解析获取到的数据
                        parsevouch_pre(pageindex, minTime, maxTime, jtdata);
                    } catch (e) { //捕获异常并处理
                        //console.log("系统出现异常，请稍后再试！");
                        //document.write("系统出现异常，请稍后再试！");
                        console.log("系统出现异常:")
                        console.log(jtdata)
                        alert(jtdata)
                        console.log("系统出现异常，请联系管理员！异常消息：" + e);
                    } finally { //可选，存放必须要执行的代码
                        //console.log("welcome");
                    }
                }
            } else {
                console.log("没有发现数据哦!")
            }
            //callback(jtdata);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert(XMLHttpRequest.status);
            //alert(XMLHttpRequest.readyState);
            //  alert(textStatus);
            console.log("error XMLHttpRequest.status=" + XMLHttpRequest.status);
            console.log("error XMLHttpRequest.errorThrown=" + errorThrown.toString());
            return 0;
        }
    });

}


function parsevouch_pre(pageindex, minTime, maxTime, vouchdata) {
    // 解析出打单人信息，并存储到数据库中
    var newvouchdata = vouchdata;
    console.log("debug_1:")
    console.log(vouchdata);
    //newvouchdata=newvouchdata.substr(2,newvouchdata.length);
    try {
        var vouchjson = JSON.parse(newvouchdata);
        console.log("debug_2:")
        var datarowcnt = parseInt(vouchjson["dp"]["DataCount"]);
        console.log("debug_3:")
        var SkipCount = parseInt(vouchjson["dp"]["SkipCount"]);
        //计算真实的行数
        if (datarowcnt > Math.abs(SkipCount)) {
            datarowcnt = datarowcnt - SkipCount;
        }

        //刷新页码数
        PageCount = parseInt(vouchjson["dp"]["PageCount"]);
        //暂时强制设置最多5页
        //PageCount = 33041;
        //1290
        //1302

        //_minTime = new Date(minTime.valueOf() - 60 * 1000);
        //minTime = localStorage.getItem("mintime");
        PageIndex = parseInt(vouchjson["dp"]["PageIndex"]);

        console.log("采集进度:" + PageIndex + "/" + PageCount);

        //if ((PageIndex > maxPageCount) || (PageIndex > PageCount)) {
        if (PageIndex < 0) {
            console.log("采集结束！");
            return;
        }

        if (datarowcnt > 50) {
            datarowcnt = 50;
        }

        console.log("记录数:" + datarowcnt);

        //alert(vouchjson["dp"]["DataCount"]);
        //console.log(vouchdata);
        //alert(vouchjson["datas"][0]["task_id"]+"="+vouchjson["datas"][0]["creator_name"]);

        if (1 == 1) {
            //生成csv文本文件
            //title="shop_id,o_id,so_id,order_date,pay_date,pay_amount,paid_amount,status";
            title = "pageindex,so_id,pay_amount,order_date,pay_date,send_date,end_time";
            //rows=title+'\\n.';
            //rows=title+'\n';
            // 数据存入浏览器缓存
            omsdata = localStorage.getItem("omsdata");
            rows = "";

            for (i = 0; i <= datarowcnt - 1; i++) {
                //postprinter(vouchjson["datas"][i]["task_id"], vouchjson["datas"][i]["creator_name"]);
                if (vouchjson.hasOwnProperty("datas"))
                    if (vouchjson["datas"].length > i)
                        if (vouchjson["datas"][i].hasOwnProperty("so_id")) {
                            //  ' 单引号转义符  &apos;
                            // str.replace(new RegExp("word","gm"),"Excel") g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。 m 执行多行匹配。
                            // str.replace(new RegExp(",","gm"),"，").replace(new RegExp(":","gm"),"：")
                            // row=vouchjson["datas"][i]["shop_id"]+'\t,'+vouchjson["datas"][i]["o_id"]+'\t,'
                            // +vouchjson["datas"][i]["so_id"].replace(new RegExp(",","gm"),"，").replace(new RegExp(":","gm"),"：")+'\t,'
                            // +vouchjson["datas"][i]["order_date"]
                            // +','+vouchjson["datas"][i]["pay_date"]+','+vouchjson["datas"][i]["pay_amount"]+','+vouchjson["datas"][i]["paid_amount"]+','+vouchjson["datas"][i]["status"];

                            row = pageindex + ',' + vouchjson["datas"][i]["so_id"].replace(new RegExp(",", "gm"), "，").replace(new RegExp(":", "gm"), "：") + '\t,'
                                + vouchjson["datas"][i]["pay_amount"] + ','
                                + vouchjson["datas"][i]["order_date"] + ','
                                + vouchjson["datas"][i]["pay_date"] + ','
                                + vouchjson["datas"][i]["send_date"] + ','
                                + vouchjson["datas"][i]["end_time"];

                            // row=vouchjson["datas"][i]["shop_id"]+","+vouchjson["datas"][i]["o_id"]+",'"+vouchjson["datas"][i]["so_id"]+","+vouchjson["datas"][i]["order_date"]
                            // +","+vouchjson["datas"][i]["pay_date"]+","+vouchjson["datas"][i]["pay_amount"]+","+vouchjson["datas"][i]["paid_amount"]+","+vouchjson["datas"][i]["status"];
                            //rows=rows+row+'\\n.';

                            rows = rows + row + '\n';

                            //console.log("rows");
                            //console.log(rows);
                        }
            }

            localStorage.setItem("omsdata", omsdata.trim() + '\n' + rows);


            //console.log("localStorage omsdata");
            //console.log(localStorage.getItem("DataCount"));

            //shopid = localStorage.getItem("shopid");
            //download("data_"+pageindex+"["+minTime+"-"+maxTime+"]@"+shopid+".csv",rows);

            // timesleepsecond=localStorage.getItem("timesleepsecond")
            if ((localStorage.getItem("timesleepsecond") != null)) {
                timesleepsecond = localStorage.getItem("timesleepsecond")
                console.log("延时：" + timesleepsecond)
            }

            //延迟2秒钟，再执行
            sleep(parseInt(timesleepsecond) * 1000).then(() => {
                console.log("延迟" + timesleepsecond + "秒钟");
                //做了最大页码数限制
                if (PageIndex > 0) {
                    PageIndex = PageIndex - 1;
                    if (PageIndex > 0) {
                        getPrePageData(shopid, minTime, maxTime, PageIndex);
                    } else {
                        //var cnt = parseInt(datarowcnt * 1) + parseInt((PageCount - 1) * 50);
                        DataCount = localStorage.getItem("DataCount");

                        title = "pageindex,so_id,pay_amount,order_date,pay_date,send_date,end_time";
                        omsdata = localStorage.getItem("omsdata");
                        rows = title.trim() + '\n' + omsdata.trim();
                        //download("data_"+pageindex+"["+minTime+"-"+maxTime+"]@"+shopid+".csv",rows);
                        download("data_[" + minTime + "-" + maxTime + "].csv", rows);


                        //清空持久的缓存
                        localStorage.setItem("omsdata", "");

                        //存入当前会话的缓存，关闭即自动消失
                        sessionStorage.setItem("omsdata", rows)

                        //localStorage.setItem("omsdata", "");

                        console.log("恭喜，已经采集完了" + DataCount + "条数据!");
                        alert("恭喜，已经采集完了" + DataCount + "条数据!");
                    }
                } else {
                    if (PageCount > 1) {
                        //var cnt = parseInt(datarowcnt * 1) + parseInt((PageCount - 1) * 50);
                        DataCount = localStorage.getItem("DataCount");
                        console.log("恭喜，已经采集完了" + DataCount + "条数据!");
                    } else {
                        console.log("恭喜，已经采集完了" + localStorage.getItem("DataCount") + "条数据!");
                    }
                }
            });

        }


    } catch (e) { //捕获异常并处理
        //console.log("系统出现异常，请稍后再试！");
        //document.write("系统出现异常，请稍后再试！");
        console.log("系统出现异常，请稍后再试！")
        console.log(vouchdata)
        alert(newvouchdata)
        console.log("系统出现异常，请联系管理员！异常消息：" + e);
    } finally { //可选，存放必须要执行的代码
        //console.log("welcome");
    }
}


function getmintime() {
    minTime = localStorage.getItem("mintime");
    return minTime;
}

function refresh_mintime() {
    // 异步执行
    $.get(lasttimeurl, function (data) {
        // 取得最新采集的时间
        minTime =
            new Date(Date.parse(data));
        //data;
        //"2020-08-18 14:21:01";
        //"2020-08-19 12:14:14";
        //2020-08-16 10:37:36.353
        //"2020-08-23 08:59:46";
        //"2020-08-29 16:23:34";
        //"2020-09-14 00:23:18";
        //"2020-09-17 10:19:17";
        console.log("最新的采集时间是:" + datetimetostr(minTime));
        //上次采集到的真实最新时间
        localStorage.setItem("lasttime", datetimetostr(minTime));

        //强制提前1分钟，实际执行的起始时间
        //minTime = datetostr(new Date(minTime.valueOf() - 60 * 1000));
        //minTime = new Date(Date.parse(minTime) - 60 * 1000);
        localStorage.setItem("mintime", datetimetostr(minTime));
        console.log("实际执行的开始采集时间是:" + datetimetostr(minTime));


    }).fail(function () {
        console.log("服务器出故障了!!!");
    });
}


function getlastime() {
    // localhost
    //$.get("http://" + javahost + "/lasttime", function(data) {
    // server
    //$.get("https://10.20.0.110:7443/lasttime", function(data) {

    $.get(lasttimeurl, function (data) {
        // 取得最新采集的时间
        minTime =
            new Date(Date.parse(data));
        //data;
        //"2020-08-18 14:21:01";
        //"2020-08-19 12:14:14";
        //2020-08-16 10:37:36.353
        //"2020-08-23 08:59:46";
        //"2020-08-29 16:23:34";
        //"2020-09-14 00:23:18";
        //"2020-09-17 10:19:17";
        console.log("最新的采集时间是:" + datetimetostr(minTime));
        //上次采集到的真实最新时间
        localStorage.setItem("lasttime", datetimetostr(minTime));

        //强制提前1分钟，实际执行的起始时间
        //minTime = datetostr(new Date(minTime.valueOf() - 60 * 1000));

        //minTime = new Date(Date.parse(minTime) - 60 * 1000);
        localStorage.setItem("mintime", datetimetostr(minTime));
        console.log("实际执行的开始采集时间是:" + datetimetostr(minTime));

        return datetimetostr(minTime);

    }).fail(function () {
        console.log("服务器出故障了!!!");
        return localStorage.getItem("lasttime");
    });

    //return datetimetostr(minTime);
}


function waitsecond() {
    //console.log("waitsecond");
}


// console.log("HTML内容是："+document.getElementsByTagName('html')[0].innerHTML);
// var html=$("#magix_vf_main").html();

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}


chrome.runtime.sendMessage({
    greeting: '采集数据就绪！'
}, function (response) {
    console.log('收到回复：' + response);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    //if (request.cmd == 'test') alert(request.value);
    //sendResponse('我收到了你的消息！'+request.value);

    // console.log("contentscript已收到你的消息:" + JSON.stringify(request));

    if (request.cmd == 'set_mintime') {
        mintime = request.value;
        localStorage.setItem("mintime", mintime);
        console.log("收到了指令:" + request.cmd + ":" + JSON.stringify(request.value));
        //localStorage.setItem("mintime", mintime);
        //console.log("wwwwwwwwwww收到了指令:"+request.cmd+":"+JSON.stringify(request));
        //alert(request.value);
        //sendResponse('我-我-我-已收到你的set_mintime消息：' +JSON.stringify(request));//做出回应
        //sendResponse('我收到了你的set_mintime消息！'+request.value);
    } else if (request.cmd == 'set_maxtime') {
        maxtime = request.value;
        localStorage.setItem("maxtime", maxtime);
        console.log("收到了指令:" + request.cmd + ":" + JSON.stringify(request.value));
    } else if (request.cmd == 'set_shopid') {
        shopid = request.value;
        localStorage.setItem("shopid", shopid);
        console.log("收到了指令:" + request.cmd + ":" + JSON.stringify(request.value));
    } else if (request.cmd == 'set_timesleepsecond') {
        timesleepsecond = request.value;
        localStorage.setItem("timesleepsecond", timesleepsecond);
        console.log("收到了指令:" + request.cmd + ":" + JSON.stringify(request.value));
    } else if (request.cmd == 'set_viewstate') {
        viewstate = request.value;
        localStorage.setItem("viewstate", viewstate);
        console.log("收到了指令:" + request.cmd + ":" + JSON.stringify(request.value));
    } else if (request.cmd == 'set_generator') {
        generator = request.value;
        localStorage.setItem("generator", generator);
        console.log("收到了指令:" + request.cmd + ":" + JSON.stringify(request.value));
    }
    ;


    if (request.action == "copy") {
        //var timestamp1 = Date.parse(new Date());

       // var token = localStorage.getItem("token");
       // var lid = localStorage.getItem("lid");
       // var orderid = localStorage.getItem("orderid");
        var startT = null;
        var endT = null;
        var Input = $('.ant-picker-input').find("input")
        for (var i = 0; i < Input.length; i++) {
            if (i == 0) {
            startT = Input[i].value
            } else {
              endT = Input[i].value
         }
        }


        //var totalCount = 0;

        var totalCount = $(".totalText___3r5Qi").children("span").eq(0).text();

        var company= $(".switcherItem___3M_7g").children("div").eq(0).text();

        //console.log(company);
       // return;
 

        var billUserId = "";
        var scripts = Array.from(window.document.scripts)
        // console.log(scripts)
        scripts.forEach(function (item) {
            var iText = item.innerText
            // console.log("iText---------------"+ iText)
            if (iText.startsWith('window.__TERN__')) {
                var userText = iText.split("=")[1]
                userText = userText.substring(0, userText.length - 1)
                // console.log(userText)
                var user = JSON.parse(userText)
                billUserId = user.user.outUserNo
                // console.log(billUserId)
                return
            }
        })


   

        if (totalCount > 0) {

            var orderList = [];

            //计算总页数
            var totalPage = Math.ceil(totalCount / 10000);
            //console.log(totalPage);

            for (var ii = 1; ii <= totalPage; ii++) {

                $.ajax({
                    async: false,
                    url: 'https://mbillexprod.alipay.com/enterprise/accountBailDetailQuery.json',
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: 'JSON',
                    data: {
                        startTime: startT,
                        endTime: endT,
                        pageSize: '10000',
                        pageNum: ii,
                        sortType: '0',
                        billUserId: billUserId // '2088801812521996'
                    },
                    cache: false,
                    xhrFields: { withCredentials: true },
                    //crossDomain: true,
                    //beforeSend: function (xhr) {
                    //xhr.setRequestHeader("Cookie", 'JSESSIONID=RZ42aX6JykqexozpUMyr8oxLzDvm8zauthRZ41GZ00; cna=qBESGxdcFjACAXF0SLSLMaPg; session.cookieNameId=ALIPAYJSESSIONID; mobileSendTime=-1; riskMobileBankSendTime=-1; ctuMobileSendTime=-1; credibleMobileSendTime=-1; riskMobileAccoutSendTime=-1; riskCredibleMobileSendTime=-1; riskMobileCreditSendTime=-1; riskOriginalAccountMobileSendTime=-1; spanner=jRiC6L3dztMOy1dCyZ/e4Kq/MdbMqf5XXt2T4qEYgj0=; __TRACERT_COOKIE_bucUserId=2088002383258733; CLUB_ALIPAY_COM=2088831477468143; iw.userid="K1iSL1GOEuZtWZHVyrbDyQ== "; ali_apache_tracktmp="uid=2088831477468143"; csrfToken=FtQlFSF1FJ3IjxzJc7tM49af; LoginForm=alipay_login_auth; JSESSIONID=184F7B9F6B8ACF2A5B2FEC905A66F39F; auth_jwt=e30.eyJleHAiOjE2NTQ1MTMxMTc0MjUsInJsIjoiNSwwLDI3LDE5LDI4LDQ2LDMwLDEzLDEwIiwic2N0IjoidVF1b0VrMDRmRld2ZXFkV0ZITzg2T05GTDFsYnU3VzY4NGYwNmNsIiwidWlkIjoiMjA4ODgzMTQ3NzQ2ODE0MyJ9.SeDL4fhiEM_OJ92OywDiu-JCHniHtxwRqp_x7JwyhdA; umt=Ledb4995ba6c4607458ec30c1afdd05e9; auth_goto_http_type=https; ctoken=aXe23FbTde6W4A-s; zone=GZ00C; ALI_PAMIR_SID=U99V+2zUOXy8N0tuHnDOTo2rzk5#1a3NZLQ6RLqCAE4Qx6j4BTk5; isg=BLCw6Yc7pi6TcXorCdJ4CXdmgX4C-ZRDafmWT6oBeoveZVAPUgwx0g5UuW0FdUwb; l=eBPPoCsRL4_WTUpxXOfwnurza77tIIRAguPzaNbMiOCP9Mfe52ZfW6XQX48wCnGVh6uXR3SVatiMBeYBqImrAuiSCV95oZHmn; tfstk=cwohBbMtL2zQOpzilHZB2JcnD5pOZlIzi0osbpPzNF7tFYoNiYbNuDZvIWAXTa1..; rtk=IWUHQEJxUr7SEAwHvWdBPYGQfVdtPs5RL8AktKbEAqtjPsX6AdQ; ALIPAYJSESSIONID=RZ42fSmbxhMCFdlBJngaZhMe2E4fXfauthRZ42GZ00');
                    //xhr.setRequestHeader("Origin", 'https://business.alipay.com');
                    //xhr.setRequestHeader("Referer", 'https://business.alipay.com/');
                    //},
                    success: function (res) {
                        //console.log(res);

                        if (res.success === 'true') {

                            //console.log(res);
                            var result = res.result.detail;
                            //console.log(result);

                            for (let ite of result) {
                                let obj = {
                                    created: null,
                                    sn: null,
                                    orderId: null,
                                    amountIncurred: null,
                                    moneryType: null,
                                    balance: null,
                                    desc: null,
                                    remark: null,
                                }

                                obj.created = ite.gmtTrans == null ? "" : ite.gmtTrans;
                                obj.sn = ite.transLogId == null ? "" : "\t" + ite.transLogId;
                                obj.orderId = ite.outOrderNo == null ? "" : "\t" + ite.outOrderNo;
                                obj.amountIncurred = ite.amount == null ? "" : ite.amount;
                                obj.moneryType = ite.bailName == null ? "" : ite.bailName;
                                obj.balance = ite.balance == null ? "" : ite.balance;
                                obj.desc = ite.bizDesc == null ? "" : ite.bizDesc;
                                obj.remark = ite.memo == null ? "" : ite.memo;

                                // console.log(obj);
                                orderList.push(obj);
                                //sessionStorage.setItem("orderList", data)

                            }

                        }
                    },
                    error: function (e) {
                        alert(e.toString());
                        console.log(e);
                    }
                });

            }


            // console.log("orderList：", orderList);

            var json = "资产变动时间,保证金明细流水号,业务订单号,发生金额(元),保证金类型,余额(元),业务描述,备注\n";
            // var num = 0;
            for (var i = 0; i < orderList.length; i++) {
                var orderModel = orderList[i];
                json = json + orderModel.created + "," + orderModel.sn + "," + orderModel.orderId + "," + orderModel.amountIncurred + "," + orderModel.moneryType + "," + orderModel.balance + "," + orderModel.desc + "," + orderModel.remark + "\n";

                //num++;
                //console.log('正在下载', num);
            }
            //console.log('json', json);

           // download(company + "-"+startT + "-"+endT+"支付宝保证金明细", json);

            download(startT + "-" + endT + "支付宝保证金明细", json);


        } else {

            alert("没有任何数据");
        }









    }
    ;


    if (request.action == "MonthCount") {
        //console.log("downloadd44444444.......");
        console.log("按月统计销售订单数");
        var minTime = localStorage.getItem("mintime");
        var maxTime = localStorage.getItem("maxtime");
        var shopid = localStorage.getItem("shopid")
        console.log("最新的采集时间是------::::" + minTime + "->" + maxTime + "@" + shopid);
        //getlastime();
        MonthCount_controller();

    }
    ;

    //sendResponse('我收到了你的...消息！'+request.value);

});

//content_script js接收消息


// chrome.runtime.sendMessage({ cmd: "mycmd" }, function (response) { console.log(response); });

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        // LOG THE CONTENTS HERE
        //console.log("抓取到数据了!!!!!!!!!!!!!!!!!!!!!!");
        //console.log(request.content);
        //alert("立即采集数据");

        // console.log("立即采集数据1234567");
        // var minTime = localStorage.getItem("mintime")
        // var maxTime = localStorage.getItem("maxtime");
        // console.log("最新的采集时间是::::" + minTime+"->"+maxTime);


        //getlastime();
        //gatherprinter_controller();
        //getlastime_full();
    }
);


// 定时采集数据
function intervalgather() {
    console.log(datetimetostr(new Date()) + ' 每隔' + intervalminute + '分钟采集一次数据...');
    //get3data();
    //getlastime();
    gatherprinter_controller();
    //getlastime_full();
}


function IntegerPointgather() {
    // 每隔指定的时间，就要执行
    console.log("启动执行定时任务@" + now());
    var timeinv = 1000 * 60 * intervalminute;
    setInterval(intervalgather, timeinv);
}

// 下一个整点时间开始执行
var date = new Date(); //现在时刻
var dateIntegralPoint = new Date(); //用户登录时刻的下一个整点，也可以设置成某一个固定时刻
dateIntegralPoint.setHours(date.getHours() + 1); //小时数增加1
dateIntegralPoint.setMinutes(59);
dateIntegralPoint.setSeconds(59);
//setTimeout("IntegerPointgather();", dateIntegralPoint - date); //用户登录后的下一个整点执行。

//立即执行，测试
//先暂停立即执行
//IntegerPointgather();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");


        if (request.greeting == "hello") {
            sendResponse({
                farewell: "goodbye"
            });
        } else if (request.greeting == "copy") {
            //console.log("downloadd.......");
            sendResponse({
                farewell: "recopy"
            });
        } else if (request.greeting == "inupdate") {
            sendResponse({
                farewell: "getUpdate"
            })
        }
        ;

        //if (request.cmd == 'test') alert(request.value);


    });





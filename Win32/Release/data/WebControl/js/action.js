var textstart; //文本闪烁的定时器
var textstart1;
var linekey = false;
var lineimg;
var Websocket; //创建websocket
var chartval = []; //图表交互数据集合
clearTimeout(textstart);
clearTimeout(textstart1);
//引进其他外部js    
(function(){
    //$("#external_fun").remove();
    if(document.getElementById("external_fun") == null){
        var external_fun_js = document.createElement("script");
        external_fun_js.src = "js/external_fun.js";
        external_fun_js.type = "text/javascript";
        external_fun_js.id = "external_fun";
        document.getElementsByTagName("head")[0].appendChild(external_fun_js);
    }
})();
var setCameraData = function(URL,PathName,CameraName){ //请求摄像头数据格式
    var sendDataList = {
        'Command': 1000,
        'Session_value': window.localStorage.getItem("Session_value"),
        "URL":URL,
        "DirName":PathName,
        "CameraName":CameraName
    };
     return JSON.stringify(sendDataList);
}
var sendPostData = function(val, obj) { //post方式 下发命令数据格式  val为值   obj为控件idd标识
        writeControlshow(obj,val);//对写控件的下发数据的显示
        var sendDataList = {
            'RequestMethod': 'post',
            'Session_value': window.localStorage.getItem("Session_value"),
            'Command': 5,
            'Tag': []
        };
        var variableid = $("#" + obj).attr("variableid");
        var variabletype = $("#" + obj).attr("variabletype");
        var type;
        switch (variabletype) {
        case "开关量":
            type = 0;
            val = parseInt(val);
            val = Boolean(val);
            break;
        case "整型量":
            type = 1;
            val = parseInt(val);
            break;
        case "浮点量":
            type = 2;
            val = parseFloat(val);
            break;
        case "字符量":
            type = 3;
            break;
        default:
            false;
        }
        var arr = {
            "ID": {
                "SubsystemID": parseInt(variableid.substring(0, 2), 16),
                "DeviceID": parseInt(variableid.substring(2, 4), 16),
                "TagID": parseInt(variableid.substring(4, variableid.length), 16)
            },
            "Type": type,
            "Value": val
        };
        sendDataList["Tag"].push(arr);
        return JSON.stringify(sendDataList);
    };
var getSendData = function(allElementObj) { //get请求数据发送数据
    var sendDataList = {
        'RequestMethod': 'get',
        'Session_value': window.localStorage.getItem("Session_value"),
        'Command': 2,
        'Tag': []
    };
    if (allElementObj.length != 0) {
        allElementObj.each(function() {
            var variableId = $(this).attr("variableID");
            if (variableId != undefined) {
                var variableIdArr = variableId.split(",");
                var len = variableIdArr.length;
                for (var i = 0; i < len; i++) {
                    var arr = {
                        "ID": {
                            "SubsystemID": parseInt(variableIdArr[i].substring(0, 2), 16),
                            "DeviceID": parseInt(variableIdArr[i].substring(2, 4), 16),
                            "TagID": parseInt(variableIdArr[i].substring(4, variableIdArr[i].length), 16)
                        }
                    };
                    sendDataList["Tag"].push(arr);
                }
            }
        });
        return JSON.stringify(sendDataList);
    }
};
var sendGetAlarmData = function(start, end) { //历史报警
    var sendDataList = {
        'RequestMethod': 'get',
        'Command': 4,
        'Session_value': window.localStorage.getItem("Session_value"),
        'Alarm': {}
    };
    var dateyears = start.split("-")[0];
    var datemonths = start.split("-")[1];
    var datedays = start.split("-")[2];
    var dateyeare = end.split("-")[0];
    var datemonthe = end.split("-")[1];
    var datedaye = end.split("-")[2];
    sendDataList["Alarm"]["startTime"] = {
        "Year": parseInt(dateyears),
        "Month": parseInt(datemonths),
        "Day": parseInt(datedays),
        "Hour": 0,
        "Minute": 0,
        "Second": 0,
        "MinSec": 0
    };
    sendDataList["Alarm"]["endTime"] = {
        "Year": parseInt(dateyeare),
        "Month": parseInt(datemonthe),
        "Day": parseInt(datedaye),
        "Hour": 0,
        "Minute": 0,
        "Second": 0,
        "MinSec": 0
    };
    return JSON.stringify(sendDataList);
};
var sendGetEventData = function(start, end) { //历史事件
    var sendDataList = {
        'RequestMethod': 'get',
        'Command': 3,
        'Session_value': window.localStorage.getItem("Session_value"),
        'Event': {}
    };
    var dateyears = start.split("-")[0];
    var datemonths = start.split("-")[1];
    var datedays = start.split("-")[2];
    var dateyeare = end.split("-")[0];
    var datemonthe = end.split("-")[1];
    var datedaye = end.split("-")[2];
    var time = new Date();
    sendDataList["Event"]["startTime"] = {
        "Year": parseInt(dateyears),
        "Month": parseInt(datemonths),
        "Day": parseInt(datedays),
        "Hour": 0,
        "Minute": 0,
        "Second": 0,
        "MinSec": 0
    };
    sendDataList["Event"]["endTime"] = {
        "Year": parseInt(dateyeare),
        "Month": parseInt(datemonthe),
        "Day": parseInt(datedaye),
        "Hour": 0,
        "Minute": 0,
        "Second": 0,
        "MinSec": 0
    };
    return JSON.stringify(sendDataList);
};
var loginSendData = function(userName, passWord) { //登陆发送数据 参数：userName：用户名；passWord：密码；
    var sendDataList = {
        'RequestMethod': 'post',
        'Command': 0,
        'UserName': userName,
        'Password': passWord.MD5(32)
    };
    return JSON.stringify(sendDataList);
};
var logoutSendData = function() { //退出登陆发送数据
    var sendDataList = {
        'RequestMethod': 'post',
        'Command': 1,
        'Session_value': window.localStorage.getItem("Session_value")
    };
    return JSON.stringify(sendDataList);
};
var WebMode = function() {
    this.editMode = false; //全局变量，是否编辑状态
    this.setEditMode = function(val) {
        if (val == "disable") {
            this.editMode = false;
            sessionStorage.setItem("edit","false");
        }
        if (val == "enable") {
            this.editMode = true;
            sessionStorage.setItem("edit","true");
        }
        //遍历元素，改变元素的编辑预览状态
        this.setElementsEditMode(val);
    };
    this.setElementsEditMode = function() {
        //遍历页面上所有的元素
        var AllElementIds = inItAllElementId.allElementsIds;
        var len = AllElementIds.length;
        var num = $(".num");
        var bodyElemnet = $("body");
        var minorbtn = $(".minorbtn ");
        var bgDivElemnet = $("#bgDiv");
        if (true == this.editMode) {
            num.addClass("moved");
            num.attr("disabled", "disabled");
            minorbtn.mouseover(function() {
                $(this).css("cursor", "move");
            });
            //增加单多选选择状态;
            inItSelectMode.setEditMode();
            for (var i = 0; i < len; i++) {
                $("#" + AllElementIds[i]).addClass("move"); //增加鼠标样式
            }
        } else if (false == this.editMode) {
            selecteId = [];
            num.removeClass("moved");
            num.removeAttr("disabled");
            minorbtn.mouseover(function() {
                $(this).css("cursor", "pointer");
            });
            //移除编辑框
            inItSetCtrStyle.removeStyle(AllElementIds);
            inItSelectMode.setEditMode();
            //移除属性页
            inItPropertiesPage.removePropertiesPage();
            for (var i = 0; i < len; i++) { //对元素集遍历操作
                //移除鼠标样式
                $("#" + AllElementIds[i]).removeClass("move");
                //屏蔽单多选状态
                bodyElemnet.off("mousedown", '#' + AllElementIds[i]);
                //预览状态时设置body大小和画布大小相同
                bodyElemnet.height(bgDivElemnet.height());
                bodyElemnet.width(bgDivElemnet.width());
            }
            bgDivElemnet.unbind("mousedown");
        }
    };
};
var inItWebMode = new WebMode();
var writeControlshow = function(str,val){//功能：写控件的显示处理 参数str：控件Id,val;下发值；
    var typeid = str.split("_")[0];
    var obj = $("#"+str);
    switch (typeid){
        case "Text":
            if(obj.attr("literacytext") == "literacy2"){
                obj.find("div[id^='Test']").text(val);
            }
            break;
        case "Minor":
            obj.find(".num").val(val);
            break;
        case "Switch":
            var iddElement = $('#'+str);
            var imageElement = obj.find("div[id^='SwitchImage']");
            if(imageElement.attr("literacy") == "off"){ //literacy=off 是“开关读写”控件
                var onImageURL = '';
                var offImageURL = '';
                if (imageElement.attr('index') == '6') { //index=6 是定制开关
                    onImageURL = iddElement.attr('openimageurl');
                    offImageURL = iddElement.attr('closeimageurl');
                } else { //index=0,1,2,3,4,5 是属性页默认提供的开关样式1~4、阀门1、阀门2
                    onImageURL = imageElement.attr("backg"); //开状态的图片路径
                    offImageURL = onImageURL.split('-')[0] + '-off.' + onImageURL.split('.')[1];
                }
                if(val == '1'){
                    imageElement.css('background','url('+onImageURL+') center center no-repeat');
                    imageElement.css('background-size','100% 100%');
                }else{
                    imageElement.css('background','url('+offImageURL+') center center no-repeat');
                    imageElement.css('background-size','100% 100%');
                }
            }
            break;
        default:false;
    }
};
$(function(){
    var isRequest = true;
    var JsonData;
    var j;
    var oFrag = null;
    var invalid = true;//数据是否有效
    
    var chartvall = [];
    var count = 0;
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;//正则IP
    var host;
    var address = document.location.hostname;
    var addressArr;
    if(address != ''){
        if (address == "localhost" || address == '127.0.0.1'){
            host = 'ws://127.0.0.1:32767/';
        }else{
            if(reg.test(address)){
                host = 'ws://'+address+':32767/';
            }else{
                host = 'ws://'+address+':15011/';
            }
        }
    }else{
        var newAddess = window.localStorage.getItem("newAddess");
        if(newAddess != null){
            host = 'ws://'+newAddess+':32767/';
        }
    }
    Websocket = new WebSocket(host);
    Websocket.onopen = function() { //连接成功
        if(Websocket.OPEN == Websocket.readyState){
            console.log("open");
            var allElementObj = $("body .contrl");
            Websocket.send(getSendData(allElementObj));
        }
    };
    var joinId = function(SubsystemID, DeviceID, TagID) { //对数据中的ID拼接
        var SubsystemId = SubsystemID.toString(16);
        if (SubsystemId.length < 2) {
            SubsystemId = "0" + SubsystemId;
        }
        var DeviceId = DeviceID.toString(16);
        if (DeviceId.length < 2) {
            DeviceId = "0" + DeviceId;
        }
        var TagId = TagID.toString(16);
        switch (TagId.length) {
        case 1:
            TagId = "000" + TagId;
            break;
        case 2:
            TagId = "00" + TagId;
            break;
        case 3:
            TagId = "0" + TagId;
            break;
        case 4:
            TagId = TagId;
            break;
        default:
            false;
        }
        return id = SubsystemId + DeviceId + TagId
    };
    var setBooleanVal = function(val) { // 处理的到value 参数 ： 布尔值 
        var newVal;
        if (val == true) {
            newVal = 1;
        } else {
            if (val == false) {
                newVal = 0;
            } else {
                newVal = val;
            }
        }
        return newVal;
    };
    var setFloatVal = function(val) { //处理浮点类型的返回值，统一返回值为2位小数点
        var tempVal = parseFloat(val);
        if (isNaN(tempVal)) {
            return val;
        }
        tempVal = Math.round(val * 100) / 100;
        var newVal = tempVal.toString();
        var isHavePoint = newVal.indexOf('.');
        if (isHavePoint < 0) {
            isHavePoint = newVal.length;
            newVal += '.';
        }
        while (newVal.length <= isHavePoint + 2) {
            newVal += '0';
        }
        return newVal;
    };
    var setEventstyle = function(obj){//设置事件类的样式 参数 obj：事件类控件对象
        var fontN = obj.attr("fontN");
        var alarmcolor = obj.attr("alarmcolor") != undefined?obj.attr("alarmcolor"):obj.attr("alarm_color");//字体颜色
        var historyfont = obj.attr("font-family"); //字体
        var historysize = obj.attr("font-size"); //字体大小
        var normal = obj.attr("normal"); //常规效果
        var weight = obj.attr("weight"); //加粗
        var Italic = obj.attr("weighti"); //斜体
        var Underline = obj.attr("weightl"); //下划线
        var delet = obj.attr("weightb"); //删除线
        if(fontN === "yes"){
            weight = "no";
            Italic = "no";
            Underline = "no";
            delet = "no";
        }
        if (weight === "yes") {
            obj.find("ul.datalist li").addClass("fontWeight");
        }
        if (Italic === "yes") {
            obj.find("ul.datalist li").addClass("fontItalic");
        }
        if (Underline === "yes") {
            obj.find("ul.datalist li").addClass("fontUnderline");
            obj.find("ul.datalist li").removeClass("fontThrough");
        }
        if (delet === "yes") {
            obj.find("ul.datalist li").removeClass("fontUnderline");
            obj.find("ul.datalist li").addClass("fontThrough");
        };
        obj.find("ul.datalist li").css("font-family", historyfont);
        obj.find("ul.datalist li").css("color", alarmcolor);
        obj.find("ul.datalist li").css("font-size", historysize + "px");
    };
    var displayHistoryEventData = function(str){//显示历史事件数据
        var obj = $("#"+str);
        var dataShowBox = $('<ul class="historyEvent_dataShowList datalist">' + '<li>日期</li>' + '<li>时间</li>' + '<li>用户名</li>' + '<li>事件记录</li>' + '<li>事件类型</li>' + '<li>访问级别</li>' + '</ul>');
        var date = dataShowBox.find('li:nth-child(6n+1)'); //日期
        var time = dataShowBox.find('li:nth-child(6n+2)'); //时间
        var variableName = dataShowBox.find('li:nth-child(6n+3)'); //用户名
        var description = dataShowBox.find('li:nth-child(6n+4)'); //事件记录
        var alarmInfo = dataShowBox.find('li:nth-child(6n+5)'); //事件类型
        var currentValue = dataShowBox.find('li:nth-child(6n+6)'); //访问级别
        /*处理日期、时间格式*/
        var year = parseInt(JsonData["Event"][j]['Time']['Year']);
        var month = parseInt(JsonData["Event"][j]['Time']['Month']);
        var day = parseInt(JsonData["Event"][j]['Time']['Day']);
        var hour = parseInt(JsonData["Event"][j]['Time']['Hour']);
        var minute = parseInt(JsonData["Event"][j]['Time']['Minute']);
        var second = parseInt(JsonData["Event"][j]['Time']['Second']);
        var millisecond = parseInt(JsonData["Event"][j]['Time']['MinSec']);
        var dateFormatIndex = obj.attr('dateFormatIndex');
        var timeFormatIndex = obj.attr('timeFormatIndex');
        if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 1 && day <= 9) {
                day = "0" + day;
            }
            if (minute >= 1 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 1 && second <= 9) {
                second = "0" + second;
            }
            if (dateFormatIndex == 1) {
                date.text(month + '/' + day + '/' + year);
                date.attr('title', month + '/' + day + '/' + year);
            } else if (dateFormatIndex == 2) {
                date.text(year + '-' + month + '-' + day);
                date.attr('title', year + '-' + month + '-' + day);
            } else if (dateFormatIndex == 3) {
                date.text(month + '-' + day + '-' + year);
                date.attr('title', month + '-' + day + '-' + year);
            } else {
                date.text(year + '/' + month + '/' + day);
                date.attr('title', year + '/' + month + '/' + day);
            }
            if (timeFormatIndex == 1) {
                time.text(hour + ':' + minute + ':' + second + ':' + millisecond);
                time.attr('title', hour + ':' + minute + ':' + second + ':' + millisecond);
            } else {
                time.text(hour + ':' + minute + ':' + second);
                time.attr('title', hour + ':' + minute + ':' + second);
            } 
        /*处理其他字段*/
        variableName.text(JsonData["Event"][j]['UserName']);
        description.text(JsonData["Event"][j]['Record']);
        alarmInfo.text(JsonData["Event"][j]['Type']);
        currentValue.text(JsonData["Event"][j]['AccessLevel']);
        variableName.attr('title', JsonData["Event"][j]['UserName']);
        description.attr('title', JsonData["Event"][j]['Record']);
        alarmInfo.attr('title', JsonData["Event"][j]['Type']);
        currentValue.attr('title', JsonData["Event"][j]['AccessLevel']);
        oFrag.append(dataShowBox); 
    };
    var displayHistoryAlarmData = function(idd){//显示历史报警数据
        var obj = $("#"+idd);
        var dataShowBox = $('<ul class="ListHeader listheader datalist">' + '<li>日期</li>' + '<li>时间</li>' + '<li>变量名</li>' + '<li>描述</li>' + '<li>报警</li>' + '<li>当前值</li>' + '<li class="priority">优先级</li>' + '<li>事件</li>' + '</ul>');
        var date = dataShowBox.find('li:nth-child(9n+1)'); //日期
        var time = dataShowBox.find('li:nth-child(9n+2)'); //时间
        var variableName = dataShowBox.find('li:nth-child(9n+3)'); //变量名
        var description = dataShowBox.find('li:nth-child(9n+4)'); //描述
        var alarmInfo = dataShowBox.find('li:nth-child(9n+5)'); //报警
        var currentValue = dataShowBox.find('li:nth-child(9n+6)'); //当前值
        var priorityLevel = dataShowBox.find('li:nth-child(9n+7)'); //优先级
        var event = dataShowBox.find('li:nth-child(9n+8)'); //事件
        /*处理日期、时间格式*/
        var year = parseInt(JsonData["Alarm"][j]['Time']['Year']);
        var month = parseInt(JsonData["Alarm"][j]['Time']['Month']);
        var day = parseInt(JsonData["Alarm"][j]['Time']['Day']);
        var hour = parseInt(JsonData["Alarm"][j]['Time']['Hour']);
        var minute = parseInt(JsonData["Alarm"][j]['Time']['Minute']);
        var second = parseInt(JsonData["Alarm"][j]['Time']['Second']);
        var millisecond = parseInt(JsonData["Alarm"][j]['Time']['MinSec']);
        var dateFormatIndex = obj.attr('dateFormatIndex');
        var timeFormatIndex = obj.attr('timeFormatIndex');
        var dataShowBoxO = obj.find('.showData' + idd);
        /****优先级筛选****/
        var priority = obj.attr("priority");
        if (priority === "全部") {
            dataShowBoxO.append(dataShowBox);
        } else if (priority === "高") {
            var val = parseInt(JsonData["Alarm"][j]['Priority']);
            if (val >= 667) {
                dataShowBoxO.append(dataShowBox);
            }
        } else if (priority === "中") {
            var val = parseInt(JsonData["Alarm"][j]['Priority']);
            if (val <= 666 && val >= 334) {
                dataShowBoxO.append(dataShowBox);
            }
        } else if (priority === "低") {
            var val = parseInt(JsonData["Alarm"][j]['Priority']);
            if (val <= 333) {
                dataShowBoxO.append(dataShowBox);
            }
        }
        if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 1 && day <= 9) {
                day = "0" + day;
            }
            if (minute >= 1 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 1 && second <= 9) {
                second = "0" + second;
            }
            if (dateFormatIndex == 1) {
                date.text(month + '/' + day + '/' + year);
                date.attr('title', month + '/' + day + '/' + year);
            } else if (dateFormatIndex == 2) {
                date.text(year + '-' + month + '-' + day);
                date.attr('title', year + '-' + month + '-' + day);
            } else if (dateFormatIndex == 3) {
                date.text(month + '-' + day + '-' + year);
                date.attr('title', month + '-' + day + '-' + year);
            } else {
                date.text(year + '/' + month + '/' + day);
                date.attr('title', year + '/' + month + '/' + day);
            }
            if (timeFormatIndex == 1) {
                time.text(hour + ':' + minute + ':' + second + ':' + millisecond);
                time.attr('title', hour + ':' + minute + ':' + second + ':' + millisecond);
            } else {
                time.text(hour + ':' + minute + ':' + second);
                time.attr('title', hour + ':' + minute + ':' + second);
            } 
        /*处理其他字段*/
        variableName.text(JsonData["Alarm"][j]['UserName']);
        description.text(JsonData["Alarm"][j]['Describe']);
        alarmInfo.text(JsonData["Alarm"][j]['AlarmTag']); //???不确定
        currentValue.text(JsonData["Alarm"][j]['CurrentValue']);
        priorityLevel.text(JsonData["Alarm"][j]['Priority']);
        event.text(JsonData["Alarm"][j]['AlarmEvent']);
        variableName.attr('title', JsonData["Alarm"][j]['UserName']);
        description.attr('title', JsonData["Alarm"][j]['Describe']);
        alarmInfo.attr('title', JsonData["Alarm"][j]['AlarmTag']);
        currentValue.attr('title', JsonData["Alarm"][j]['CurrentValue']);
        priorityLevel.attr('title', JsonData["Alarm"][j]['Priority']);
        event.attr('title', JsonData["Alarm"][j]['AlarmEvent']);
        oFrag.append(dataShowBox); 
    };
    var displayRealAlarmEventData = function(idd){//显示实时报警数据
        var contrlele = $("#"+idd);
        var fontn = contrlele.attr("alarm_limit");//上限
        var fontd = contrlele.attr("datestyle");//日期风格
        var fontt = contrlele.attr("timestyle");//时间风格
        var realleng = parseInt(fontn);//上限个数
        var dataShowBoxO = $('#dataShowBox' + idd);
        var dataShowBox = $('<ul class="alarmDataShowList datalist alarmDataShowList ' + idd + '"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>');
        var real = contrlele.find("ul.alarmDataShowList li");
        var lengt = contrlele.find("ul.alarmDataShowList");
        var leng = lengt.length;//信息个数
        var date = dataShowBox.find('li:nth-child(9n+1)'); //日期
        var time = dataShowBox.find('li:nth-child(9n+2)'); //时间
        var variableName = dataShowBox.find('li:nth-child(9n+3)'); //变量名
        var description = dataShowBox.find('li:nth-child(9n+4)'); //描述
        var alarmInfo = dataShowBox.find('li:nth-child(9n+5)'); //报警
        var currentValue = dataShowBox.find('li:nth-child(9n+6)'); //当前值
        var priorityLevel = dataShowBox.find('li:nth-child(9n+7)'); //优先级
        var event = dataShowBox.find('li:nth-child(9n+8)'); //事件
        var response = dataShowBox.find('li:nth-child(9n+9)'); //应答
        /*处理日期、时间格式*/
        var year = JsonData["Alarm"][j]['Time']['Year'];
        var month = JsonData["Alarm"][j]['Time']['Month'];
        var day = JsonData["Alarm"][j]['Time']['Day'];
        var hour = JsonData["Alarm"][j]['Time']['Hour'];
        var minute = JsonData["Alarm"][j]['Time']['Minute'];
        var second = JsonData["Alarm"][j]['Time']['Second'];
        var millisecond = JsonData["Alarm"][j]['Time']['MinSec'];
        var dateFormatIndex = contrlele.attr('dateFormatIndex');
        var timeFormatIndex = contrlele.attr('timeFormatIndex');
         /****优先级筛选****/
        var priorityLeveladd = contrlele.attr("priorityLeveladd");
        var realalarm = function(){
            /*处理其他字段*/   
        if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (day >= 1 && day <= 9) {
                day = "0" + day;
            }
            if (minute >= 1 && minute <= 9) {
                minute = "0" + minute;
            }
            if (second >= 1 && second <= 9) {
                second = "0" + second;
            }
            if (dateFormatIndex == 1) {
                date.text(month + '/' + day + '/' + year);
                date.attr('title', month + '/' + day + '/' + year);
            } else if (dateFormatIndex == 2) {
                date.text(year + '-' + month + '-' + day);
                date.attr('title', year + '-' + month + '-' + day);
            } else if (dateFormatIndex == 3) {
                date.text(month + '-' + day + '-' + year);
                date.attr('title', month + '-' + day + '-' + year);
            } else {
                date.text(year + '/' + month + '/' + day);
                date.attr('title', year + '/' + month + '/' + day);
            }
            if (timeFormatIndex == 1) {
                time.text(hour + ':' + minute + ':' + second + ':' + millisecond);
                time.attr('title', hour + ':' + minute + ':' + second + ':' + millisecond);
            } else {
                time.text(hour + ':' + minute + ':' + second);
                time.attr('title', hour + ':' + minute + ':' + second);
            }             
            variableName.text(JsonData["Alarm"][j]['UserName']);
            description.text(JsonData["Alarm"][j]['Describe']);
            alarmInfo.text(JsonData["Alarm"][j]['AlarmTag']); 
            currentValue.text(JsonData["Alarm"][j]['CurrentValue']);
            priorityLevel.text(JsonData["Alarm"][j]['Priority']);
            event.text(JsonData["Alarm"][j]['AlarmEvent']);
            response.text(JsonData["Alarm"][j]['AlarmACK']);     
            variableName.attr('title', JsonData["Alarm"][j]['UserName']);
            description.attr('title', JsonData["Alarm"][j]['Describe']);
            alarmInfo.attr('title', JsonData["Alarm"][j]['AlarmTag']); 
            currentValue.attr('title', JsonData["Alarm"][j]['CurrentValue']);
            priorityLevel.attr('title', JsonData["Alarm"][j]['Priority']);
            event.attr('title', JsonData["Alarm"][j]['AlarmEvent']);
            response.attr('title', JsonData["Alarm"][j]['AlarmACK']);
        };          
        if(priorityLeveladd === "全部"){ 
            if(leng < realleng){
                oFrag.prepend(dataShowBox); 
                realalarm();
            }
            if(leng >= realleng){
                $(".alarmDataShowList").last().remove();                    
                oFrag.prepend(dataShowBox);
                realalarm(); 
            }
        }else
        if(priorityLeveladd === "紧急"){
            var val = parseInt(JsonData["Alarm"][j]['Priority']);
            if(val >= 667){
                if(leng < realleng){
                    oFrag.prepend(dataShowBox);
                    realalarm();

                }
                if(leng >= realleng){
                    $(".alarmDataShowList").last().remove();                    
                    oFrag.prepend(dataShowBox);
                    realalarm(); 
                }
            }
        }else
        if(priorityLeveladd === "高"){
            var val = parseInt(JsonData["Alarm"][j]['Priority']);
            if(val <= 666 && val >= 334){
                if(leng < realleng){
                    oFrag.prepend(dataShowBox);
                    realalarm();
                }
                if(leng >= realleng){
                    $(".alarmDataShowList").last().remove();                    
                    oFrag.prepend(dataShowBox);
                    realalarm(); 
                }           
            }
        }else
        if(priorityLeveladd === "低"){
            var val = parseInt(JsonData["Alarm"][j]['Priority']);
            if(val <= 333){
                if(leng < realleng){
                    oFrag.prepend(dataShowBox);
                    realalarm();
                }
                if(leng >= realleng){
                    $(".alarmDataShowList").last().remove();                    
                    oFrag.prepend(dataShowBox);
                    realalarm(); 
                }               
            }
        } 
    };
    var displayMobileData = function(type,type1,type2){
        var dataShowBoxO = $("#soubodyid");
        var dataShowBox = $('<ul class="romovedate"><li>日期时间</li><li>用户名</li><li>事件记录</li><li>访问级别</li></ul>');
        dataShowBoxO.append(dataShowBox);
        var date1time = dataShowBox.find('li:nth-child(5n+1)'); //日期
        var variableName = dataShowBox.find('li:nth-child(5n+2)'); //用户名
        var description = dataShowBox.find('li:nth-child(5n+3)'); //事件记录
        var currentValue = dataShowBox.find('li:nth-child(5n+4)'); //访问级别
        /*处理日期、时间格式*/
        var year = parseInt(JsonData[type][j]['Time']['Year']);
        var month = parseInt(JsonData[type][j]['Time']['Month']);
        var day = parseInt(JsonData[type][j]['Time']['Day']);
        var hour = parseInt(JsonData[type][j]['Time']['Hour']);
        var minute = parseInt(JsonData[type][j]['Time']['Minute']);
        var second = parseInt(JsonData[type][j]['Time']['Second']);
        /*处理其他字段*/ 
        date1time.text(year + '/' + month + '/' + day+' '+hour + ':' + minute + ':' + second);
        variableName.text(JsonData[type][j]['UserName']);
        description.text(JsonData[type][j][type1]);
        currentValue.text(JsonData[type][j][type2]);
    }
    var UpdateControlData = function(str,variable_id,val) {
        var typeid = str.split("_")[0];
        var idd = str;
        var value;
        var controlObj = $("#"+idd);
        var DataBaseProp = controlObj.attr("DataBaseProp");
        switch (typeid) {
        case 'Text':    
            if(val != undefined){
                if (controlObj.attr("literacytext") != "literacy2") {
                    var textTermnumber = setBooleanVal(val);
                    if (controlObj.attr('variabletype') == '浮点量') {
                        textTermnumber = setFloatVal(textTermnumber);
                    }
                    var textcountnumber = textTermnumber;
                    if( $("#"+idd).attr("scrol") == "have"){
                        $("#marr"+idd).text(textcountnumber);
                    }else if($("#"+idd).attr("scrol") == "nohave"){
                        $("#Test" + idd).text(textcountnumber);
                    }
                    
                    if (controlObj.attr("literacytext") == "literacy3") {
                        TextPageFeature3();
                    } else if (controlObj.attr("literacytext") == "literacy4") {
                        TextPageFeature4();
                    };
                    function TextPageFeature3() {
                        textfn1();
                        function textsubfn() {
                            if (controlObj.attr("termFlicker") == "no") {
                                controlObj.css("color", controlObj.attr("textTrue"));
                            } else if (controlObj.attr("termFlicker") == "yes") {
                                //闪烁
                                var colortext1 = controlObj.attr("textTrue");
                                var colortext2 =controlObj.attr("textFlicker");
                                var flag = 0;
                                function start() {
                                    if (!flag) {
                                        controlObj.css({
                                            "color": colortext2
                                        });
                                        flag = 1;
                                    } else {
                                        controlObj.css({
                                            "color": colortext1
                                        });
                                        flag = 0;
                                    };
                                    textstart = setTimeout(function() {
                                        start();
                                    },
                                    500);
                                };
                                start();
                            };
                        };
                        function textfn1() {
                            var changval=controlObj.attr("textchangval");
                            var textTrval=parseFloat(controlObj.attr("textTremval"));
                            var vartextTrval=parseFloat(textTermnumber);
                            var textfalse=controlObj.css("color", controlObj.attr("textfalse"));
                            switch (changval){
                                case "等于":
                                    if (textTrval === vartextTrval) {
                                        textsubfn();
                                    } else {
                                       textfalse;
                                    }
                                    break;
                                case "小于":
                                    if (textTrval > vartextTrval) {
                                        textsubfn();
                                    } else {
                                        textfalse;
                                    };
                                    break;
                                case "大于":
                                    if (textTrval< vartextTrval) {
                                        textsubfn();
                                    } else {
                                        textfalse;
                                    }
                                    break;
                                case "小于等于":
                                    if (textTrval >= vartextTrval) {
                                        textsubfn();
                                    } else {
                                        textfalse;
                                    }
                                    break;
                                case "大于等于":
                                    if (textTrval <=vartextTrval) {
                                        textsubfn();
                                    } else {
                                        textfalse;
                                    }
                                    break;
                                case "不等于":
                                    if (textTrval <=vartextTrval) {
                                        textsubfn();
                                    } else {
                                        textfalse;
                                    }
                                    break;        
                                default:
                                    break;
                            };
                        };
                        /*=======满足条件时闪烁===========*/
                        if (controlObj.attr("termFlicker") == "no") {
                            $("#textTermShow8" + idd).css({
                                "background": "url(images/notselected.png)"
                            });
                        } else {
                            $("#textTermShow8" + idd).css({
                                "background": "url(images/selected.png)"
                            });
                        };
        
                    };
                    function TextPageFeature4() {
                        text4Fn1();
                        function text4Fn1() {
                            var colortext1;
                            var pointterxt1 = parseFloat(controlObj.attr("textbreakpointval1"));
                            var pointterxt2 = parseFloat(controlObj.attr("textbreakpointval2"));
                            var pointterxt3 = parseFloat(controlObj.attr("textbreakpointval3"));
                            var pointterxt4 = parseFloat(controlObj.attr("textbreakpointval4"));
                            if (controlObj.attr("termFlicker1") == "no") {
                                if (textcountnumber <= pointterxt1) {
                                    controlObj.css("color", controlObj.attr("textcoor1"));
                                } else if (textcountnumber > pointterxt1 && textcountnumber <= pointterxt2) {
                                    controlObj.css("color", controlObj.attr("textcoor2"))
                                } else if (pointterxt2 < textcountnumber && textcountnumber <= pointterxt3) {
                                    controlObj.css("color", controlObj.attr("textcoor3"));
                                } else if (pointterxt3 < textcountnumber && textcountnumber <= pointterxt4) {
                                    controlObj.css("color", controlObj.attr("textcoor4"));
                                } else if (pointterxt4 < textcountnumber) {
                                    controlObj.css("color", controlObj.attr("textcoor5"));
                                }
        
                            } else if (controlObj.attr("termFlicker1") == "yes") {
                                //闪烁
                                if (textcountnumber <= pointterxt1) {
                                    colortext1 = controlObj.attr("textcoor1");
                                } else if (textcountnumber > pointterxt1 && textcountnumber <= pointterxt2) {
                                    colortext1 = controlObj.attr("textcoor2");
                                } else if (pointterxt2 < textcountnumber && textcountnumber <= pointterxt3) {
                                    colortext1 =controlObj.attr("textcoor3");
                                } else if (pointterxt3 < textcountnumber && textcountnumber <= pointterxt4) {
                                    colortext1 = controlObj.attr("textcoor4");
                                } else if (pointterxt4 < textcountnumber) {
                                    colortext1 = controlObj.attr("textcoor5");
                                }
                                var colortext2 = controlObj.attr("textFlicker1");
                                var flag = 0;
                                function start() {
                                    if (!flag) {
                                        controlObj.css({
                                            "color": colortext2
                                        });
                                        flag = 1;
                                    } else {
                                        controlObj.css({
                                            "color": colortext1
                                        });
                                        flag = 0;
                                    };
                                    textstart1 = setTimeout(function() {
                                        start();
                                    },
                                    500);
                                };
                                start();
                            };
                        };
                    };
                
                }
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Progress':
            /*********************数据更改时控件实时变化************************/
            if(val != undefined){
                var provalue = setBooleanVal(parseFloat(val));
                var promax = parseFloat(controlObj.attr("mixeuval"));
                var promix = parseFloat(controlObj.attr("mineuval"));
                var probgc = controlObj.attr("probgcolor");
                if (provalue >= promix && provalue <= promax) {
                    var percentage = parseFloat((provalue - promix) / (promax - promix) * 100).toFixed(1); //标准百分比
                    percentage = setFloatVal(percentage);
                    var value = $("#value" + idd);
                    var total = $(".prodatap" + idd);
                    total.text(percentage + '%');
                    value.css("background-color", probgc);
                    if (controlObj.attr("value") == "level") {
                        var barrw = $("#box" + idd).width();
                        var valuew = parseFloat(barrw * (percentage * 0.01)).toFixed(1);
                        value.width(valuew);
                        total.text(percentage + '%');
                        if (provalue == 0) {
                            value.width(0);
                            total.text(0 + '%');
                        }
                    }
                    if (controlObj.attr("value") == "vertical") {
                        var percentagedv = parseFloat((provalue / promax) * 100).toFixed(1);
                        var barrwv = $("#box" + idd).height();
                        var valuewv = parseFloat(barrwv * (percentagedv * 0.01)).toFixed(1);
                        value.height(valuewv);
                        total.text(percentagedv + '%');
                        if (provalue == 0) {
                            value.height(0);
                            total.text(0 + '%');
                        }
                    }
                } else {
                    alert("警告：不在范围内！");
                }
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Switch':
                if(val != undefined){
                    var switchImage = $('#SwitchImage-' + idd);
                    var index = switchImage.attr('index') ? switchImage.attr('index') : '0';
                    var value = setBooleanVal(val);
                    var switchType = switchImage.attr("literacy"); //判断写开关控件还是读开关控件
                    var chooseFun = function(key) { //默认提供的4种开关展示               
                        if(controlObj.attr("pip_imgs") == "yes"){
                            var switchStatus_pip = (value === 0) ? 'off' : 'on'; //返回值value为0时代表关状态；value为1时代表关状态
                            var imageName_pip = 'switch' + key + '-' + switchStatus_pip + '.png';
                            switchImage.css({
                                'background': 'url(images/'+imageName_pip+') center center no-repeat',
                                'background-size': '100% 100%'
                            });
                            switchImage.attr('back', 'images/'+imageName_pip);
                            switchImage.attr('switchStatus', switchStatus_pip);
                        }else{
                            var switchStatus = (value === 0) ? 'off' : 'on'; //返回值value为0时代表关状态；value为1时代表关状态
                            var imageName = 'switch' + key + '-' + switchStatus + '.svg';
                            switchImage.css({
                                'background': 'url(images/'+imageName+') center center no-repeat',
                                'background-size': '100% 100%'
                            });
                            switchImage.attr('back', 'images/'+imageName);
                            switchImage.attr('switchStatus', switchStatus);
                        }
                    }
                    if (switchType == 'on') {
                        switch (index) {
                            case '0':
                                chooseFun(1);
                                break;
                            case '1':
                                chooseFun(2);
                                break;
                            case '2':
                                chooseFun(3);
                                break;
                            case '3':
                                chooseFun(4);
                                break;
                            case '4':
                                chooseFun(5);
                                break;
                            case '5':
                                chooseFun(6);
                                break;        
                            case '6':
                                var openImageUrl = controlObj.attr('openImageUrl');
                                var closeImageUrl = controlObj.attr('closeImageUrl');
                                if (value === 0) { //代表关状态
                                    if (closeImageUrl) {
                                        var closeArr = closeImageUrl.split('/');
                                        var closeImageName = closeArr[closeArr.length - 1];
                                        switchImage.css({
                                            'background': 'url(images/' + closeImageName + ') center center no-repeat',
                                            'background-size': '100% 100%'
                                        });
                                        switchImage.attr('back', 'images/' + closeImageName + '');
                                        switchImage.attr('switchStatus', 'off');
                                    } else {
                                        alert('请先设置自定义关状态图片');
                                    }
                                } else if (value === 1) { //代表开状态
                                    if (openImageUrl) {
                                        var openArr = openImageUrl.split('/');
                                        var openImageName = openArr[openArr.length - 1];
                                        switchImage.css({
                                            'background': 'url(images/' + openImageName + ') center center no-repeat',
                                            'background-size': '100% 100%'
                                        });
                                        switchImage.attr('back', 'images/' + openImageName + '');
                                        switchImage.attr('switchStatus', 'on');
                                    } else {
                                        alert('请先设置自定义开状态图片');
                                    }
                                }
                                break;
                            default:false;
                        }
                    }
                    /******管道控件联动********/
                    if(controlObj.attr("pip_config_h") && controlObj.attr("pip_config_q")){
                        var isopen = false;
                        var isopen_ = true;
                        var pip_qian = controlObj.attr("pip_config_qian");
                        var pip_qianid = pip_qian.split(",");
                        for(var k = 0; k < pip_qianid.length; k++){
                            if($("#"+pip_qianid[k]).attr("is_open") == "yes"){
                                isopen = true;
                                $("#"+pip_qianid[k]).find(".pipbg"+pip_qianid[k]).css({
                                     "display":"block"
                                });
                            }else{
                                isopen_ = false;
                            }
                        }
                        if(isopen == true && isopen_ == true){
                            if(value == 1 ){
                                $("div[value*='pip_config_yes']").css("display","block");
                            }else{
                                $("div[value*='pip_config_yes']").css("display","none");
                            }
                        }
                    }          
                } else {
                    if (DataBaseProp == "0"){
                        if(invalid){
                            //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                            invalid = false;
                        }
                    }
                }
            break;
        case 'Fill':
            if(val != undefined){
                var filltext = (setBooleanVal(val) / $("#" + idd).attr("mixeuval")) * Number($("#fillBox" + idd).height()) + 6;
                var liqudHeight = (val / $("#" + idd).attr("mixeuval")) * 100;
                liqudHeight = setFloatVal(liqudHeight);
                $("#fillLiquid1" + idd).text(liqudHeight + "%");
                /*=========液体的高度===========*/
                $("#fillLiquid" + idd).css({
                    "height": filltext + "px"
                });
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Line':
            if(val != undefined){
                var val = setBooleanVal(val);
                var marr_ = $("#marr" + idd);
                /*******运动*********/
                var linemotion = function() { 
                    var img_ = $(".img" + idd); 
                    var line_ = $(".line" + idd);            
                    var marr = $('<marquee id="marr' + idd + '" class="linemarr" scrollamount="10" direction="right">' + '<div class="img' + idd + '"></div>' + '</marquee>');
                    var lineimg = line_.css("background-image"); 
                    controlObj.attr("lineimg",lineimg);            
                    if (marr_.length == 0) {
                        line_.remove();
                        marr.appendTo(controlObj);
                        var lineheight = controlObj.height();
                        var linewidth = controlObj.width();
                        var lineh = lineheight * 0.15;
                        var linew = linewidth * 0.1;
                        if (controlObj.attr("linevertical") == "level") {
                            $(".img" + idd).css({
                                "width": linew + 'px',
                                "height": lineheight + 'px'
                            });
                        } else {
                            $(".img" + idd).css({
                                "width": linewidth + 'px',
                                "height": lineh + 'px'
                            });
                        }
                        controlObj.siblings(".contrl").find(".linemarr").remove();
                    }
                    if (controlObj.attr("direction") == "left") {
                        marr_.attr("direction", "left");
                    }
                    if (controlObj.attr("direction") == "right") {
                        marr_.attr("direction", "right");
                    }
                    if (controlObj.attr("direction") == "up") {
                        marr_.attr("direction", "up");
                    }
                    if (controlObj.attr("direction") == "down") {
                        marr_.attr("direction", "down");
                    }
                    $(".img" + idd).css({
                        "background-image": controlObj.attr("lineimg"),
                        "background-repeat": "no-repeat",
                        "background-size": "100% 100%"
                    });
                };
                var linenum = 0;
                $.each($("div[id^='Line']"),
                function() {
                    linenum++;
                });
                if (linenum === 1) {
                        if (val >= 0 && val <= 50) {
                            linemotion();
                            linekey = true;
                        } else {
                            if (linekey == true) {
                                if (controlObj.attr("linevertical") == "level") {                               
                                    marr_.remove();
                                    var txt = $('<div id="line" class="line' + idd + '"></div>');
                                    if(line_.length == 0){
                                        txt.appendTo(controlObj);
                                    }
                                    line_.removeClass("line");  
                                    line_.css({
                                        "background-image": controlObj.attr("lineimg"),
                                        "background-repeat": "no-repeat",
                                        "background-size": "100% 100%",
                                        "position": "absolute",
                                        "right": 0,
                                        "top": 0,
                                        "width": "5%",
                                        "height": "100%",
                                        "z-index":"999"
                                    });
                                } else {
                                    marr_.remove();
                                    var txt = $('<div id="line" class="line' + idd + '"></div>');
                                    txt.appendTo(controlObj);
                                    line_.removeClass("linev");
                                    line_.css({
                                        "background-image": controlObj.attr("lineimg"),
                                        "background-repeat": "no-repeat",
                                        "background-size": "100% 100%",
                                        "position": "absolute",
                                        "bottom": 0,
                                        "left": 0,
                                        "width": "100%",
                                        "height": "13%"
                                    });
                                }
                            }
                        }
                } else {
                    linemotion();
                }
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Rotate':
            if(val != undefined){
                var valued = setBooleanVal(val);
            var rotate_ = $(".rotate" + idd);
            var rotatechild_ = $(".rotatechild" + idd);
            if (inItWebMode.editMode == false && valued == "1") {
                rotate_.css({
                   "animation-play-state": "running" 
                });
                rotatechild_.css({
                   "animation-play-state": "running" 
                });
                if (controlObj.attr("lineurl") + "" == "undefined") {
                    if (controlObj.attr("rotatetype") == "type3") {
                        if (controlObj.attr("rotatedirection") == "clockwise") {
                            if (controlObj.attr("rotatespeed") == "middle") {
                                rotate_.css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 1s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play 1s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play 1s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play 1s linear infinite"                               
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "low") {
                                rotate_.css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 2s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play 2s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play 2s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play 2s linear infinite"       
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "high") {
                                rotate_.css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 0.5s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play 0.5s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play 0.5s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play 0.5s linear infinite"       
                                });
                            }
                        } else {
                            if (controlObj.attr("rotatespeed") == "middle") {
                                rotate_.css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 1s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play2 1s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play2 1s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play2 1s linear infinite" 
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "low") {
                                rotate_.css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 2s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play2 2s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play2 2s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play2 2s linear infinite"
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "high") {
                                rotate_.css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 0.5s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play2 0.5s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play2 0.5s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play2 0.5s linear infinite"
                                });
                            }
                        }
                    } else {
                        if (controlObj.attr("rotatedirection") == "clockwise") {
                            if (controlObj.attr("rotatespeed") == "middle") {
                                rotatechild_.css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 1s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play 1s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play 1s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play 1s linear infinite" 
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "low") {
                                rotatechild_.css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 2s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play 2s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play 2s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play 2s linear infinite" 
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "high") {
                                rotatechild_.css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 0.5s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play 0.5s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play 0.5s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play 0.5s linear infinite" 
                                });
                            }
                        } else {
                            if (controlObj.attr("rotatespeed") == "middle") {
                                rotatechild_.css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 1s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play2 1s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play2 1s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play2 1s linear infinite" 
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "low") {
                                rotatechild_.css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 2s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play2 2s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play2 2s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play2 2s linear infinite"
                                });
                            }
                            if (controlObj.attr("rotatespeed") == "high") {
                                rotatechild_.css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 0.5s linear infinite",
                                    "-moz-transform-origin": "50% 50%",
                                    "-moz-animation": "play2 0.5s linear infinite",
                                    "-o-transform-origin": "50% 50%",
                                    "-o-animation": "play2 0.5s linear infinite",                         
                                    "transform-origin": "50% 50%",
                                    "animation": "play2 0.5s linear infinite"
                                });
                            }
                        }
                    }
                } else {
                    var definitionUrl = controlObj.attr("lineurl");
                    if (controlObj.attr("rotatedirection") == "clockwise") {
                        if (controlObj.attr("rotatespeed") == "middle") {
                            rotate_.css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play 1s linear infinite",
                                "-moz-transform-origin": "50% 50%",
                                "-moz-animation": "play 1s linear infinite",
                                "-o-transform-origin": "50% 50%",
                                "-o-animation": "play 1s linear infinite",                         
                                "transform-origin": "50% 50%",
                                "animation": "play 1s linear infinite" 
                            });
                        }
                        if (controlObj.attr("rotatespeed") == "low") {
                            rotate_.css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play 2s linear infinite",
                                "-moz-transform-origin": "50% 50%",
                                "-moz-animation": "play 2s linear infinite",
                                "-o-transform-origin": "50% 50%",
                                "-o-animation": "play 2s linear infinite",                         
                                "transform-origin": "50% 50%",
                                "animation": "play 2s linear infinite" 
                            });
                        }
                        if (controlObj.attr("rotatespeed") == "high") {
                            rotate_.css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play 0.5s linear infinite",
                                "-moz-transform-origin": "50% 50%",
                                "-moz-animation": "play 0.5s linear infinite",
                                "-o-transform-origin": "50% 50%",
                                "-o-animation": "play 0.5s linear infinite",                         
                                "transform-origin": "50% 50%",
                                "animation": "play 0.5s linear infinite" 
                            });
                        }
                    } else {
                        if (controlObj.attr("rotatespeed") == "middle") {
                            rotate_.css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play2 1s linear infinite",
                                "-moz-transform-origin": "50% 50%",
                                "-moz-animation": "play2 1s linear infinite",
                                "-o-transform-origin": "50% 50%",
                                "-o-animation": "play2 1s linear infinite",                         
                                "transform-origin": "50% 50%",
                                "animation": "play2 1s linear infinite" 
                            });
                        }
                        if (controlObj.attr("rotatespeed") == "low") {
                            rotate_.css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play2 2s linear infinite",
                                "-moz-transform-origin": "50% 50%",
                                "-moz-animation": "play2 2s linear infinite",
                                "-o-transform-origin": "50% 50%",
                                "-o-animation": "play2 2s linear infinite",                         
                                "transform-origin": "50% 50%",
                                "animation": "play2 2s linear infinite"  
                            });
                        }
                        if (controlObj.attr("rotatespeed") == "high") {
                            rotate_.css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play2 0.5s linear infinite",
                                "-moz-transform-origin": "50% 50%",
                                "-moz-animation": "play2 0.5s linear infinite",
                                "-o-transform-origin": "50% 50%",
                                "-o-animation": "play2 0.5s linear infinite",                         
                                "transform-origin": "50% 50%",
                                "animation": "play2 0.5s linear infinite" 
                            });
                        }
                    }
                }
            }else if(inItWebMode.editMode == false && valued == "0"){
                if (controlObj.attr("lineurl") + "" == "undefined") {
                    if (controlObj.attr("rotatetype") == "type3") {
                        rotate_.css({
                           "animation-play-state": "paused" 
                        });
                    } else {
                        rotatechild_.css({
                           "animation-play-state": "paused" 
                        });
                    }
                } else {                   
                    rotate_.css({
                       "animation-play-state": "paused" 
                    });
                }
            }
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Chart':
            if(val != undefined){
                chartval.push(parseFloat(val).toFixed(2));
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Dial':
            if(val != undefined){
                var vale1 = parseInt($("#" + idd).attr("mixeuval"));
            var vale2 = parseInt($("#" + idd).attr("mineuval"));
                var vale = setBooleanVal(val);
            $(".trianglemin" + idd).text($('#' + idd).attr('mineuval'));
            var height1 = $("#main" + idd).height();
            var width1 = $("#main" + idd).width();
            $("#main" + idd).css({
                'height': 300,
                'width': 300
            });
            (function fncount() {
                var attrdeg=$("#" + idd).attr("deg");
                if (attrdeg == "deg90") {
                    dial2();
                }else if (attrdeg == "deg120") {
                    dial4();
                }else if (attrdeg == "deg180") {
                    dial1();
                }else if (attrdeg == "deg240") {
                     dial3();
                }else if (attrdeg == "deg360") {
                    dial5();
                };
            }());
            $("#main" + idd).css({
                'height': height1,
                'width': width1
            });
            /*==========360度的画法===================*/
            function dial2() {
                
                var val = $("#" + idd).attr("dialColor");
                var val1 = $("#" + idd).attr("backColor");
                var val2 = $("#" + idd).attr("foregroundColor");
                var minval = $("#" + idd).attr("minval") / 100;
                var maxval = $("#" + idd).attr("maxval") / 100;
                var myChart = echarts.init(document.getElementById('main' + idd));
                var onoff = $("#" + idd).attr("dialoff");
                if (onoff == "true") {
                    onoff = true
                } else if (onoff == "false") {
                    onoff = false
                }
                var option = {

                    tooltip: {
                        formatter: "{a} <br/>{c} {b}",
                        axisPointer: {

                            shadowColor: "red"
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    series: [{
                        name: $("#" + idd).attr("piecename"),
                        type: 'gauge',
                        z: 3,
                        min: vale2,
                        max: vale1,
                        startAngle: 90,
                        endAngle: -269.9,
                        radius: '100%',
                        axisLine: { // 坐标轴线
                            show: true,
                            lineStyle: {
                                color: [[minval, val], [maxval, val1], [1, val2]],
                                width: 25
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: '#cccccc'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 25,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: '#cccccc'
                            }
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            show: onoff,
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },

                        data: [{
                            value: 1
                        }]
                    }

                    ]
                };
                // 为echarts对象加载数据 
                myChart.setOption(option);
                vale = setFloatVal(vale);
                option.series[0].data[0].value = vale;
                myChart.setOption(option, true);
            };
            /*===========180度的画法================*/
            function dial1() {
                var val = $("#" + idd).attr("dialColor");
                var val1 = $("#" + idd).attr("backColor");
                var val2 = $("#" + idd).attr("foregroundColor");
                var minval = $("#" + idd).attr("minval") / 100;
                var maxval = $("#" + idd).attr("maxval") / 100;
                var onoff = $("#" + idd).attr("dialoff");
                if (onoff == "true") {
                    onoff = true
                } else if (onoff == "false") {
                    onoff = false
                }
                var myChart = echarts.init(document.getElementById('main' + idd));
                var option = {
                    tooltip: {
                        formatter: "{a} <br/>{c} {b}"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    series: [{
                        center: ["50%", "65%"],
                        name: $("#" + idd).attr("piecename"),
                        type: 'gauge',
                        z: 3,
                        min: vale2,
                        max: vale1,
                        startAngle: 180,
                        endAngle: 0,
                        radius: '100%',
                        axisLine: { // 坐标轴线
                            show: true,
                            lineStyle: {
                                color: [[minval, val], [maxval, val1], [1, val2]],
                                width: 25
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: '#cccccc'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 25,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: '#cccccc'
                            }
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            show: onoff,
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },

                        data: [{
                            value: 1
                        }]
                    }

                    ]
                };
                // 为echarts对象加载数据 
                myChart.setOption(option);
                vale = setFloatVal(vale);
                option.series[0].data[0].value = vale;
                myChart.setOption(option, true);
            }
            /*=========240=================*/
            function dial3() {
                var val = $("#" + idd).attr("dialColor");
                var val1 = $("#" + idd).attr("backColor");
                var val2 = $("#" + idd).attr("foregroundColor");
                var minval = $("#" + idd).attr("minval") / 100;
                var maxval = $("#" + idd).attr("maxval") / 100;
                var onoff = $("#" + idd).attr("dialoff");
                var onoff = $("#" + idd).attr("dialoff");
                if (onoff == "true") {
                    onoff = true
                } else if (onoff == "false") {
                    onoff = false
                }
                var myChart = echarts.init(document.getElementById('main' + idd));
                var option = {
                    tooltip: {
                        formatter: "{a} <br/>{c} {b}"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    series: [{
                        center: ["50%", "62%"],
                        name: $("#" + idd).attr("piecename"),
                        type: 'gauge',
                        z: 3,
                        min: vale2,
                        max: vale1,
                        startAngle: 210,
                        endAngle: -30,
                        radius: '100%',
                        axisLine: { // 坐标轴线
                            show: true,
                            lineStyle: {
                                color: [[minval, val], [maxval, val1], [1, val2]],
                                width: 25
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: '#cccccc'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 25,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: '#cccccc'
                            }
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            show: onoff,
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },

                        data: [{
                            value: 1
                        }]
                    }

                    ]
                };
                // 为echarts对象加载数据 
                myChart.setOption(option);
                vale = setFloatVal(vale);
                option.series[0].data[0].value = vale;
                myChart.setOption(option, true);
            }
            /*========120度================*/
            function dial4() {
                var val = $("#" + idd).attr("dialColor");
                var val1 = $("#" + idd).attr("backColor");
                var val2 = $("#" + idd).attr("foregroundColor");
                var minval = $("#" + idd).attr("minval") / 100;
                var maxval = $("#" + idd).attr("maxval") / 100;
                var onoff = $("#" + idd).attr("dialoff");
                var onoff = $("#" + idd).attr("dialoff");
                if (onoff == "true") {
                    onoff = true
                } else if (onoff == "false") {
                    onoff = false
                }
                var myChart = echarts.init(document.getElementById('main' + idd));
                var option = {
                    tooltip: {
                        formatter: "{a} <br/>{c} {b}"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    series: [{
                        center: ["50%", "65%"],
                        name: $("#" + idd).attr("piecename"),
                        type: 'gauge',
                        z: 3,
                        min: vale2,
                        max: vale1,
                        startAngle: 150,
                        endAngle: 30,
                        radius: '100%',
                        axisLine: { // 坐标轴线
                            lineStyle: {
                                color: [[minval, val], [maxval, val1], [1, val2]],
                                width: 25
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: '#cccccc'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 25,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: '#cccccc'
                            }
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            show: onoff,
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },

                        data: [{
                            value: 1
                        }]
                    }

                    ]
                };
                // 为echarts对象加载数据 
                myChart.setOption(option);
                vale = setFloatVal(vale);
                option.series[0].data[0].value = vale;
                myChart.setOption(option, true);
            }
            /*=========90度================*/
            function dial5() {
                var val = $("#" + idd).attr("dialColor");
                var val1 = $("#" + idd).attr("backColor");
                var val2 = $("#" + idd).attr("foregroundColor");
                var minval = $("#" + idd).attr("minval") / 100;
                var maxval = $("#" + idd).attr("maxval") / 100;
                var onoff = $("#" + idd).attr("dialoff");
                var onoff = $("#" + idd).attr("dialoff");
                if (onoff == "true") {
                    onoff = true
                } else if (onoff == "false") {
                    onoff = false
                }
                var myChart = echarts.init(document.getElementById('main' + idd));
                var option = {
                    tooltip: {
                        formatter: "{a} <br/>{c} {b}"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    series: [{
                        center: ["75%", "75%"],
                        name: $("#" + idd).attr("piecename"),
                        type: 'gauge',
                        z: 3,
                        min: vale2,
                        max: vale1,
                        startAngle: 180,
                        endAngle: 90,
                        radius: '100%',
                        axisLine: { // 坐标轴线
                            lineStyle: {
                                color: [[minval, val], [maxval, val1], [1, val2]],
                                width: 25
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: '#cccccc'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 25,
                            // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: '#cccccc'
                            }
                        },
                        title: {

                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            show: onoff,
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },

                        data: [{
                            value: 1
                        }]
                    }]
                };
                // 为echarts对象加载数据 
                myChart.setOption(option);
                vale = setFloatVal(vale);
                option.series[0].data[0].value = vale;
                myChart.setOption(option, true);
            };
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Status':
            if(val != undefined){
                value = setBooleanVal(val);
                var statusImageDom = $('#statusImage-' + idd);
                var listBoxDom = controlObj.attr('listBoxDom');
                var tempDiv = $('<div class="tempDiv' + idd + '" style="display: none"></div>');
                tempDiv.html(listBoxDom);
                if ($('.tempDiv'+idd).length == 0) {
                    controlObj.append(tempDiv);
                }
                tempDiv.children('div.dataList').each(function() {
                    var dataValue = $(this).children('span.statusListValue').html();
                    if (dataValue == value) {
                        //根据返回值切换状态控件图片
                        if (controlObj.attr('responseValue'+count) && controlObj.attr('responseValue'+count) != value) {
                            controlObj.attr('responseValue'+(count+1), value);
                        }
                        var imageUrl = $(this).children('span.statusListImage').html();
                        var arr = imageUrl.split('/');
                        var imageName = arr[arr.length - 1];
                        statusImageDom.css({
                            'background': 'url(images/' + imageName + ') center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        statusImageDom.attr('back', 'images/' + imageName + '');
                        //确定是否自动打开超链接
                        var hyperlink = $(this).children('span.statusListHyperlink').html();
                        var isAutoOpen = $(this).children('span.statusListAutoOpen').html();
                        if (hyperlink != '') {
                            if (isAutoOpen === '是') { //自动打开超链接
                                count ++;
                                var preResponseVal = 'responseValue' + (count-1);
                                var nextResponseVal = 'responseValue' + count;
                                if (count == 1) {
                                    window.open('' + hyperlink + '');
                                    controlObj.attr(nextResponseVal, value);
                                } else {
                                    if (!(controlObj.attr(nextResponseVal)) && value == controlObj.attr(preResponseVal)) {
                                        controlObj.removeAttr(preResponseVal);
                                        controlObj.attr(nextResponseVal, value);
                                    } else if (value == controlObj.attr(nextResponseVal)) {
                                        window.open('' + hyperlink + '');
                                    } else {
                                        controlObj.removeAttr(preResponseVal);
                                    }
                                }
                            } else { //非自动时，点击打开超链接
                                controlObj.unbind('mousedown').bind('mousedown', function() {
                                    window.open('' + hyperlink + '');
                                });
                            }
                        }
                    } else {

                    }
                });
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        case 'Elevator':
            if(val != undefined){
                /*=========获取的数据==========*/
                var elevatorControl = $("#" + idd);
                var onoff1 = val; 
                var floor = setBooleanVal(val); //层数
                var onoff = setBooleanVal(val); //上下
                var onoff2 = val;
                if (elevatorControl.attr("variableid3") == variable_id) {
                    if (onoff1 > 0 && onoff1 <= 25) {
                        $("#elevatorestate" + idd).html("停运");
                        $("#elevatorestate" + idd).css({
                            "background": "#686868"
                        });
                    } else if (onoff1 > 25 && onoff1 <= 50 ) {
                        $("#elevatorestate" + idd).html("运行");
                        $("#elevatorestate" + idd).css({
                            "background": "#22af7c"
                        });
                   } else if (onoff1 > 50 && onoff1 <= 75) {
                        $("#elevatorestate" + idd).html("故障");
                        $("#elevatorestate" + idd).css({
                            "background": "#cc352a"
                        });
                   } else if (onoff1 > 75 && onoff1 <=100) {
                        $("#elevatorestate" + idd).html("维修");
                        $("#elevatorestate" + idd).css({
                            "background": "#b18c2f"
                        });
                    }
                }
                if (elevatorControl.attr("variableid0") == variable_id) {
                    /*==========电梯的当前层数=============*/
                    function elevatorFloor() {
                        var maxtier = parseInt($("#" + idd).attr("mixeuval0"));
                        var mintier = parseInt($("#" + idd).attr("mineuval0"));
                        var counttier = maxtier - mintier;
                        var countHeight = $("#elevatorBodyinner" + idd).height() - $("#elevatordoor" + idd).height();
                        var doortop = (countHeight / counttier) * (floor);
                        $("#elevatordoor" + idd).css({
                            "bottom": doortop
                        });
                        $("#nowfloor" + idd).text(floor + "层");
                    };
                    elevatorFloor();
                }
                if (elevatorControl.attr("variableid1") == variable_id) {
                    /*================电梯上下状态=============*/
                    function elevatoroff() {
                        if (onoff == 0) {
                            $("#elevatoronoff" + idd).removeClass("elevatordown");
                            $("#elevatoronoff" + idd).addClass("elevatorup");
                        } else if (onoff == 1) {
                            $("#elevatoronoff" + idd).removeClass("elevatorup");
                            $("#elevatoronoff" + idd).addClass("elevatordown");
                        }
                    }
                    elevatoroff();
                }
                if (elevatorControl.attr("variableid2") == variable_id) {
                    /*=============电梯开关状态===============*/
                    function elevatoron() {
                        if (onoff2 == 0) {
                            $("#elevastate" + idd).attr("src", "images/elevatoroff.png");
                        } else if (onoff2 == 1) {
                            $("#elevastate" + idd).attr("src", "images/elevatoron.png");
                        };
                    };
                    elevatoron();;
                }
            }else{
                if (DataBaseProp == "0"){
                    if(invalid){
                        //alert("无法获取监听点"+variable_id+"数据，请检查系统状态");
                        invalid = false;
                    }
                }
            }
            break;
        default:false;
        }
    };
    var UpdateResponseMessage = function(id, str) { //处理写变量数据命令下发【成功/失败】弹出框
        var typeid = id.split("_")[0];
        switch (typeid) {
            case 'Text':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'Switch':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'Button':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'Minor':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case "Radio":
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'CheckBox':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'SlideBar':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'Edit':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            case 'Combo':
                inItSendModal.modelReportFeature(str);
                inItSendModal.modeltextFeature();
                break;
            default:
                false;
        }
    };
    Websocket.onmessage = function(msg) { //获取的数据的处理
        if (msg.data != "") {
            var sysID;
            var deviceID;
            var tagID;
            var variable_id;
            var data = msg.data;
            var val;
            JsonData = JSON.parse(data);
            var allElementObj = $(".contrl"); //页面所有控件对象集合
            var dataShowBoxO = $("#soubodyid");
            var mobileLen = dataShowBoxO.length;
            switch (JsonData["StatusCode"]) {
            case 0:
                switch (JsonData["Command"]) {
                case 0:
                    //登陆成功数据处理
                    var Session_value = JsonData["Session_value"];
                    window.localStorage.setItem("Session_value", Session_value);
                    if (window.localStorage.getItem("Session_value") != "undefined") {
                        var allElementObj = $("body .contrl");
                        Websocket.send(getSendData(allElementObj));
                    }
                    //移动登录后操作
                    $(".index").addClass("active").siblings().removeClass("active");
                    $(".content_1").eq(1).show().siblings(".content_1").hide();
                    $("#button-log1").css({"display":"block"});
                    $(".content").attr("nav_pages","nav_bar");
                    break;
                case 1:
                    //登出时数据处理
                    window.localStorage.removeItem("Session_value");
                    $("#button-log1").css({"display":"none"});
                    var pass1 = $("#pass-log").val("");
                    break;
                case 2:
                case 7:
                    var len = JsonData["Tag"] == null?0:JsonData["Tag"].length;
                    for (j = 0; j < len; j++) {
                        val = JsonData["Tag"][j]["Value"];
                        sysID = JsonData["Tag"][j]["ID"]["SubsystemID"];
                        deviceID = JsonData["Tag"][j]["ID"]["DeviceID"];
                        tagID = JsonData["Tag"][j]["ID"]["TagID"];
                        variable_id = joinId(sysID, deviceID, tagID);
                        var variableIDArr = null;
                        if (allElementObj.length >= 1) {
                            allElementObj.each(function(k) {
                                if ($(this).attr("variableID") != undefined) {
                                    variableIDArr = $(this).attr("variableID").split(",");
                                    var lv = variableIDArr.length;
                                    for (var i = 0; i < lv; i++) {
                                        if (variableIDArr[i] == variable_id) {
                                            if (inItWebMode.editMode == false) {
                                                UpdateControlData($(this).attr("id"), variable_id,val);
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    break;
                case 3:
                    if(mobileLen >= 1) {
                        me = null;
                        $(".content").css("overflow","hidden");
                        $(".search").addClass("active").siblings().removeClass("active");
                        $(".content_0-0").css("display","block");
                        $(".content_0-0").siblings(".content_1").css("display","none");
                        $(".content").removeAttr("nav_pages");
                        $(".head_txt").text("查询");
                        $(".back_").css("display","none");
                        $(".home").css("display","none");
                        $(".home1").css("display","block");
                    }
                    //历史事件的数据处理
                    if(JsonData["Event"]){
                        var length = JsonData["Event"].length;
                    }
                    oFrag = $(document.createDocumentFragment());
                    for (j = 0; j < length; j++) {
                        if(mobileLen >= 1) {
                            displayMobileData('Event',"Record","AccessLevel");
                        }else{
                            $("div[id^='History']").each(function() {
                                displayHistoryEventData($(this).attr("id"));
                            });
                        }
                    }
                    $("div[id^='History']").each(function() {
                        $(this).find(".historyEvent_dataShowBox").append(oFrag);
                        setEventstyle($(this));
                    });
                    dataShowBoxO.append(oFrag);
                    break;
                case 4:
                    //历史报警的数据处理
                    if(JsonData["Alarm"]){
                        var length = JsonData["Alarm"].length;
                    }
                    oFrag = $(document.createDocumentFragment());
                    for (j = 0; j < length; j++) {
                        if(mobileLen >= 1) {
                            displayMobileData('Alarm',"AlarmEvent","Priority");
                        }else{
                            $("div[id^='Alarm']").each(function() {
                                displayHistoryAlarmData($(this).attr("id"));
                            });
                        }
                    }
                    $("div[id^='Alarm']").each(function() {
                        $(this).find(".showData").append(oFrag);
                        setEventstyle($(this));    
                    });
                    dataShowBoxO.append(oFrag);
                    break;
                case 5:
                    //写变量的数据返回值处理--命令下发成功
                    var length = (JsonData["Tag"] === undefined) ? 0 : JsonData["Tag"].length;
                    for (j = 0; j < length; j++) {
                        sysID = JsonData["Tag"][j]["ID"]["SubsystemID"];
                        deviceID = JsonData["Tag"][j]["ID"]["DeviceID"];
                        tagID = JsonData["Tag"][j]["ID"]["TagID"];
                        variable_id = joinId(sysID, deviceID, tagID);
                        var variableID = null;
                        if (allElementObj.length >= 1) {
                            allElementObj.each(function(k) {
                                if ($(this).attr("variableID") != undefined) {
                                    variableID = $(this).attr("variableID");
                                    if (variableID == variable_id) {
                                        if (inItWebMode.editMode == false && (
                                            $(this).attr('success') == 'yes'|| //匹配按钮、组合框、微调、编辑框、单选、复选、滑杆控件命令下发成功
                                            $(this).find("div[id^='SwitchImage-']").attr('literacy') == 'off' || //匹配开关控件的【开关读写】类型命令下发成功
                                            $(this).attr('literacytext') == 'literacy2' //匹配文本控件的【文本读写】类型命令下发成功
                                        )) {
                                            UpdateResponseMessage($(this).attr("id"), 'success');
                                        }
                                    }
                                }
                            });
                        }
                    }
                    break;
                case 8:
                    //实时报警的数据处理
                    if(JsonData["Alarm"]){
                        var length = JsonData["Alarm"].length;
                    }
                    oFrag = $(document.createDocumentFragment());
                    for (j = 0; j < length; j++) {
                        if(mobileLen >= 1) {
                            if($("#eventpice").val()=="实时报警"){
                                displayMobileData('Alarm',"AlarmEvent","Priority");
                            }
                        }else{
                            $("div[id^='RealTimeAlarm']").each(function(k) {
                                displayRealAlarmEventData($(this).attr("id"));
                            });
                        }
                    };
                    $("div[id^='RealTimeAlarm']").each(function() {
                        $(this).find(".alarmDataShowBox").prepend(oFrag);
                        setEventstyle($(this));    
                    });
                    break;
                case 9:
                    //系统事件
                    var length = (JsonData["Event"] === undefined) ? 0 : JsonData["Event"].length;
                    for (j = 0; j < length; j++) {
                        if(mobileLen >= 1) {
                            if($("#eventpice").val()=="系统事件"){
                                displayMobileData('Event',"Record","AccessLevel");
                            }
                        }
                    };
                    break;    
                default:
                    false;
                }
                break;
            case 4:
                alert("密码错误");
                break;
            case 5:
                alert("用户名已锁定");
                break;
            case 6:
                alert("用户名无效");
                break;
            case 13:
                alert("退出登录失败");
                break;
            case 48:
                alert("您没有权限查询，请与管理员联系");
                break;    
            default:
                //写变量的数据返回值处理--命令下发失败
                if (JsonData["Command"] == 5) {
                    var length = (JsonData["Tag"] === undefined) ? 0 : JsonData["Tag"].length;
                    for (j = 0; j < length; j++) {
                        sysID = JsonData["Tag"][j]["ID"]["SubsystemID"];
                        deviceID = JsonData["Tag"][j]["ID"]["DeviceID"];
                        tagID = JsonData["Tag"][j]["ID"]["TagID"];
                        variable_id = joinId(sysID, deviceID, tagID);
                        var variableID = null;
                        if (allElementObj.length >= 1) {
                            allElementObj.each(function(k) {
                                if ($(this).attr("variableID") != undefined) {
                                    variableID = $(this).attr("variableID");
                                    if (variableID == variable_id) {
                                        if (inItWebMode.editMode == false && (
                                                $(this).attr('fails') == 'yes'|| //匹配按钮、组合框、微调、编辑框、单选、复选、滑杆控件命令下发失败
                                                $(this).find("div[id^='SwitchImage-']").attr('literacy') == 'off' || //匹配开关控件的【开关读写】类型命令下发失败
                                                $(this).attr('literacytext') == 'literacy2' //匹配文本控件的【文本读写】类型命令下发失败
                                        )) {
                                            UpdateResponseMessage($(this).attr("id"), 'fail');
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                return false;
            }
        }
    };
    if(inItWebMode.editMode == false){
         Websocket.onclose = function() {
            //alert("连接超时，请检查网络，重新刷新页面");
        };
        Websocket.onerror = function() { //socket的错误后的处理
            alert("亲：数据断开，请重新连接！");
        };
    }  
});
/***********移动端组态页面加载时，控件位置和宽度自适应**********/
var aaa = function(){
    if($(".contrl").length != 0){
        $(".contrl").each(function(){
            var mob_left = parseInt($(this).css("left"));
            var mob_width = parseInt($(this).css("width"));
            var mob_percentage = (mob_left/360)*100;
            var mob_percentage_ = (mob_width/360)*100;
            $(this).attr("mob_left",mob_percentage.toFixed("1"));
            $(this).attr("mob_width",mob_percentage_.toFixed("1"));
        });
    }
}();
   

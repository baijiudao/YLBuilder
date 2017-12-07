var textstart; //文本闪烁的定时器
var textstart1;
var linekey = false;
var lineimg;
clearTimeout(textstart);
clearTimeout(textstart1);
var WebMode = function() {
    this.editMode = false; //全局变量，是否编辑状态
    this.setEditMode = function(val) {
        if (val == "disable") {
            this.editMode = false;
        }
        if (val == "enable") {
            this.editMode = true;
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
        case "Button":
            obj.find("div[id^='button']").text(val);
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
                if (imageElement.attr('index') == '4') { //index=4 是定制开关
                    onImageURL = iddElement.attr('openimageurl');
                    offImageURL = iddElement.attr('closeimageurl');
                } else { //index=0,1,2,3 是属性页默认提供的开关样式1~4
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
if (inItWebMode.editMode == false) {
    var isRequest = true;
    var Websocket; //创建websocket
    var JsonData;
    var j;
    var allElementObj = $(".contrl"); //页面所有控件对象集合
    var sendPostData = function(val, obj) { //post方式 下发命令数据格式  val为值   obj为控件idd标识
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'post';
        sendDataList["Session_value"] = localStorage.getItem("Session_value");
        sendDataList["Command"] = 5;
        sendDataList["Tag"] = [];
        var variableid = $("#" + obj).attr("variableid");
        var variabletype = $("#" + obj).attr("variabletype");
        var type;
        switch (variabletype) {
        case "开关量":
            type = 0;
            break;
        case "整型量":
            type = 1;
            break;
        case "浮点量":
            type = 2;
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
        writeControlshow(obj,val);//对写控件的下发数据的显示
        return JSON.stringify(sendDataList);
    };
    var getSendData = function() { //get请求数据发送数据
        var sendDataList = {};
        var allElementObj = $(".contrl");
        sendDataList["RequestMethod"] = 'get';
        sendDataList["Command"] = 2;
        sendDataList["Session_value"] = localStorage.getItem("Session_value");
        sendDataList["Tag"] = [];
        if (allElementObj.length != 0) {
            allElementObj.each(function() {
                var variableId = $(this).attr("variableID");
                if (variableId != undefined) {
                    var variableIdArr = variableId.split(",");
                    for (var i = 0; i < variableIdArr.length; i++) {
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
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'get';
        sendDataList["Command"] = 4;
        sendDataList["Session_value"] = localStorage.getItem("Session_value");
        sendDataList["Alarm"] = {};
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
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'get';
        sendDataList["Command"] = 3;
        sendDataList["Session_value"] = localStorage.getItem("Session_value");
        sendDataList["Event"] = {};
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
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'post';
        sendDataList["Command"] = 0;
        sendDataList["UserName"] = userName;
        sendDataList["Password"] = passWord.MD5(32);
        //alert(sendDataList["Password"]);
        return JSON.stringify(sendDataList);
    };
    var logoutSendData = function() { //退出登陆发送数据
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'post';
        sendDataList["Command"] = 1;
        sendDataList["Session_value"] = localStorage.getItem("Session_value");
        return JSON.stringify(sendDataList);
    };
    var joinId = function(SubsystemID, DeviceID, TagID) { //对数据中的ID拼接
        var SubsystemId = SubsystemID.toString(16);
        if (SubsystemId.length < 2) {
            SubsystemId = "0" + SubsystemId;
        } else {
            SubsystemId = SubsystemId;
        }
        var DeviceId = DeviceID.toString(16);
        if (DeviceId.length < 2) {
            DeviceId = "0" + DeviceId;
        } else {
            DeviceId = DeviceId;
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

    var chartval = []; //图表交互数据集合
    var chartvall = [];
    //host = "ws://yilitest.in.3322.org:32767";
    //var host = "ws://localhost:32767";
	var host = 'ws://'+document.location.hostname+':32767/';
    Websocket = new WebSocket(host);
    Websocket.onopen = function() { //连接成功
        console.log("open");
		if(Websocket.OPEN == Websocket.readyState){
			Websocket.send(getSendData());
		}
    };
    var UpdateControlData = function(str, variable_id) {
        var typeid = str.split("_")[0];
        var idd = str;
        var value;
        switch (typeid) {
        case 'Text':
			if ($("#" + idd).attr("literacytext") != "literacy2") {
            var textTermnumber = setBooleanVal(JsonData["Tag"][j]["Value"]);
            if ($('#'+idd).attr('variabletype') == '浮点量') {
                textTermnumber = setFloatVal(textTermnumber);
            }
            var textcountnumber = textTermnumber;
            var sss = textTermnumber;
            $("#Test" + idd).text(sss);
            if ($("#" + idd).attr("literacytext") == "literacy3") {
                TextPageFeature3();
            } else if ($("#" + idd).attr("literacytext") == "literacy4") {
                TextPageFeature4();
            };
            function TextPageFeature3() {
                textfn1();
                function textsubfn() {
                    if ($("#" + idd).attr("termFlicker") == "no") {
                        $("#" + idd).css("color", $("#" + idd).attr("textTrue"));
                    } else if ($("#" + idd).attr("termFlicker") == "yes") {
                        //闪烁
                        var colortext1 = $("#" + idd).attr("textTrue");
                        var colortext2 = $("#" + idd).attr("textFlicker");
                        var flag = 0;
                        function start() {
                            if (!flag) {
                                $("#" + idd).css({
                                    "color": colortext2
                                });
                                flag = 1;
                            } else {
                                $("#" + idd).css({
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
                    if ($("#" + idd).attr("textchangval") === "等于") {
                        if (parseFloat($("#" + idd).attr("textTremval")) === parseFloat(textTermnumber)) {
                            textsubfn();
                        } else {
                            $("#" + idd).css("color", $("#" + idd).attr("textfalse"));
                        }
                    } else if ($("#" + idd).attr("textchangval") === "小于") {
                        if (parseFloat($("#" + idd).attr("textTremval")) > parseFloat(textTermnumber)) {
                            textsubfn();
                        } else {
                            $("#" + idd).css("color", $("#" + idd).attr("textfalse"));
                        };
                    } else if ($("#" + idd).attr("textchangval") === "大于") {
                        if (parseFloat($("#" + idd).attr("textTremval")) < parseFloat(textTermnumber)) {
                            textsubfn();
                        } else {
                            $("#" + idd).css("color", $("#" + idd).attr("textfalse"));
                        }
                    } else if ($("#" + idd).attr("textchangval") === "小于等于") {
                        if (parseFloat($("#" + idd).attr("textTremval")) >= parseFloat(textTermnumber)) {
                            textsubfn();
                        } else {
                            $("#" + idd).css("color", $("#" + idd).attr("textfalse"));
                        }
                    } else if ($("#" + idd).attr("textchangval") === "大于等于") {
                        if (parseFloat($("#" + idd).attr("textTremval")) <= parseFloat(textTermnumber)) {
                            textsubfn();
                        } else {
                            $("#" + idd).css("color", $("#" + idd).attr("textfalse"));
                        }
                    } else if ($("#" + idd).attr("textchangval") === "不等于") {
                        if (parseFloat($("#" + idd).attr("textTremval")) != parseFloat(textTermnumber)) {
                            textsubfn();
                        } else {
                            $("#" + idd).css("color", $("#" + idd).attr("textfalse"));
                        };
                    };
                };

                /*=======满足条件时闪烁===========*/
                if ($("#" + idd).attr("termFlicker") == "no") {
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
                    var pointterxt1 = parseFloat($("#" + idd).attr("textbreakpointval1"));
                    var pointterxt2 = parseFloat($("#" + idd).attr("textbreakpointval2"));
                    var pointterxt3 = parseFloat($("#" + idd).attr("textbreakpointval3"));
                    var pointterxt4 = parseFloat($("#" + idd).attr("textbreakpointval4"));
                    if ($("#" + idd).attr("termFlicker1") == "no") {
                        if (textcountnumber <= pointterxt1) {
                            $("#" + idd).css("color", $("#" + idd).attr("textcoor1"));
                        } else if (textcountnumber > pointterxt1 && textcountnumber <= pointterxt2) {
                            $("#" + idd).css("color", $("#" + idd).attr("textcoor2"))
                        } else if (pointterxt2 < textcountnumber && textcountnumber <= pointterxt3) {
                            $("#" + idd).css("color", $("#" + idd).attr("textcoor3"));
                        } else if (pointterxt3 < textcountnumber && textcountnumber <= pointterxt4) {
                            $("#" + idd).css("color", $("#" + idd).attr("textcoor4"));
                        } else if (pointterxt4 < textcountnumber) {
                            $("#" + idd).css("color", $("#" + idd).attr("textcoor5"));
                        }

                    } else if ($("#" + idd).attr("termFlicker1") == "yes") {
                        //闪烁
                        if (textcountnumber <= pointterxt1) {
                            colortext1 = $("#" + idd).attr("textcoor1");
                        } else if (textcountnumber > pointterxt1 && textcountnumber <= pointterxt2) {
                            colortext1 = $("#" + idd).attr("textcoor2");
                        } else if (pointterxt2 < textcountnumber && textcountnumber <= pointterxt3) {
                            colortext1 = $("#" + idd).attr("textcoor3");
                        } else if (pointterxt3 < textcountnumber && textcountnumber <= pointterxt4) {
                            colortext1 = $("#" + idd).attr("textcoor4");
                        } else if (pointterxt4 < textcountnumber) {
                            colortext1 = $("#" + idd).attr("textcoor5");
                        }
                        var colortext2 = $("#" + idd).attr("textFlicker1");
                        var flag = 0;
                        function start() {
                            if (!flag) {
                                $("#" + idd).css({
                                    "color": colortext2
                                });
                                flag = 1;
                            } else {
                                $("#" + idd).css({
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
            break;
        case 'Progress':
            /*********************数据更改时控件实时变化************************/
            var provalue = setBooleanVal(parseFloat(JsonData["Tag"][j]["Value"]));
            var promax = parseFloat($("#" + idd).attr("mixeuval"));
            var promix = parseFloat($("#" + idd).attr("mineuval"));
            var probgc = $("#" + idd).attr("probgcolor");
            if (provalue >= promix && provalue <= promax) {
                var percentage = parseFloat((provalue - promix) / (promax - promix) * 100).toFixed(1); //标准百分比
                percentage = setFloatVal(percentage);
                var value = $("#value" + idd);
                var total = $(".prodatap" + idd);
                total.text(percentage + '%');
                value.css("background-color", probgc);
                if ($("#" + idd).attr("value") == "level") {
                    var barrw = $("#box" + idd).width();
                    var valuew = parseFloat(barrw * (percentage * 0.01)).toFixed(1);
                    value.width(valuew);
                    total.text(percentage + '%');
                    if (provalue == 0) {
                        value.width(0);
                        total.text(0 + '%');
                    }
                }
                if ($("#" + idd).attr("value") == "vertical") {
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
            break;
        case 'Switch':
            var switchImage = $('#SwitchImage-' + idd);
            var index = switchImage.attr('index') ? switchImage.attr('index') : '0';
            value = setBooleanVal(JsonData["Tag"][j]["Value"]);
            var switchType = switchImage.attr("literacy") //判断写开关控件还是读开关控件
            if (switchType == 'on') {
                switch (index) {
                case '0':
                    if (value === 0) { //代表关状态
                        switchImage.css({
                            'background': 'url(images/switch1-off.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch1-off.svg');
                        switchImage.attr('switchStatus', 'off');
                    } else if (value === 1) { //代表开状态
                        switchImage.css({
                            'background': 'url(images/switch1-on.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch1-on.svg');
                        switchImage.attr('switchStatus', 'on');
                    }
                    break;
                case '1':
                    if (value === 0) { //代表关状态
                        switchImage.css({
                            'background': 'url(images/switch2-off.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch2-off.svg');
                        switchImage.attr('switchStatus', 'off');
                    } else if (value === 1) { //代表开状态
                        switchImage.css({
                            'background': 'url(images/switch2-on.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch2-on.svg');
                        switchImage.attr('switchStatus', 'on');
                    }
                    break;
                case '2':
                    if (value === 0) { //代表关状态
                        switchImage.css({
                            'background': 'url(images/switch3-off.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch3-off.svg');
                        switchImage.attr('switchStatus', 'off');
                    } else if (value === 1) { //代表开状态
                        switchImage.css({
                            'background': 'url(images/switch3-on.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch3-on.svg');
                        switchImage.attr('switchStatus', 'on');
                    }
                    break;
                case '3':
                    if (value === 0) { //代表关状态
                        switchImage.css({
                            'background': 'url(images/switch4-off.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch4-off.svg');
                        switchImage.attr('switchStatus', 'off');
                    } else if (value === 1) { //代表开状态
                        switchImage.css({
                            'background': 'url(images/switch4-on.svg) center center no-repeat',
                            'background-size': '100% 100%'
                        });
                        switchImage.attr('back', 'images/switch4-on.svg');
                        switchImage.attr('switchStatus', 'on');
                    }
                    break;
                case '4':
                    var openImageUrl = $('#' + idd).attr('openImageUrl');
                    var closeImageUrl = $('#' + idd).attr('closeImageUrl');
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
                default:
                    break;
                }
            }
            break;
        case 'Edit':
            break;
        case 'Combo':
            break;
        case 'Fill':
            var filltext = (setBooleanVal(JsonData["Tag"][j]["Value"]) / $("#" + idd).attr("mixeuval")) * Number($("#fillBox" + idd).height()) + 6;
            var liqudHeight = (JsonData["Tag"][j]["Value"] / $("#" + idd).attr("mixeuval")) * 100;
            liqudHeight = setFloatVal(liqudHeight);
            $("#fillLiquid1" + idd).text(liqudHeight + "%");
            /*=========液体的高度===========*/
            $("#fillLiquid" + idd).css({
                "height": filltext + "px"
            });
            break;
        case 'Line':
            var val = setBooleanVal(JsonData["Tag"][j]["Value"]);
            /*******运动*********/
            var linemotion = function() {
                var marr = $('<marquee id="marr' + idd + '" class="linemarr" scrollamount="10" direction="right">' + '<div class="img' + idd + '"></div>' + '</marquee>');
                lineimg = $(".line" + idd).css("background-image"); 
                $("#"+idd).attr("lineimg",lineimg);            
                if ($("#marr" + idd).length == 0) {
                    $(".line" + idd).remove();
                    marr.appendTo($("#" + idd));
                    var lineheight = $("#" + idd).height();
                    var linewidth = $("#" + idd).width();
                    var lineh = lineheight * 0.15;
                    var linew = linewidth * 0.1;
                    if ($("#" + idd).attr("linevertical") == "level") {
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
                    $("#" + idd).siblings(".contrl").find(".linemarr").remove();
                }
                if ($("#" + idd).attr("direction") == "left") {
                    $("#marr" + idd).attr("direction", "left");
                }
                if ($("#" + idd).attr("direction") == "right") {
                    $("#marr" + idd).attr("direction", "right");
                }
                if ($("#" + idd).attr("direction") == "up") {
                    $("#marr" + idd).attr("direction", "up");
                }
                if ($("#" + idd).attr("direction") == "down") {
                    $("#marr" + idd).attr("direction", "down");
                }
                $(".img" + idd).css({
                    "background-image": $("#"+idd).attr("lineimg"),
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
                $.each($("div[id^='Line']"),
                function() {
                    var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                    if (val >= 0 && val <= 50) {
                        linemotion();
                        linekey = true;
                    } else {
                        if (linekey == true) {
                            if ($("#" + idd).attr("linevertical") == "level") {                               
                                $("#marr" + idd).remove();
                                var txt = $('<div id="line" class="line' + idd + '"></div>');
                                if($(".line" + idd).length == 0){
                                    txt.appendTo($("#" + idd));
                                }
                                $(".line" + idd).removeClass("line");  
                                $(".line" + idd).css({
                                    "background-image": $("#"+idd).attr("lineimg"),
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
                                $("#marr" + idd).remove();
                                var txt = $('<div id="line" class="line' + idd + '"></div>');
                                txt.appendTo($("#" + idd));
                                $(".line" + idd).removeClass("linev");
                                $(".line" + idd).css({
                                    "background-image": $("#"+idd).attr("lineimg"),
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
                })
            } else {
                linemotion();
            }
            break;
        case 'Rotate':
            var valued = setBooleanVal(JsonData["Tag"][j]["Value"]);
            if (inItWebMode.editMode == false && valued == "1") {
                if ($("#" + idd).attr("lineurl") + "" == "undefined") {
                    if ($("#" + idd).attr("rotatetype") == "type3") {
                        if ($("#" + idd).attr("rotatedirection") == "clockwise") {
                            if ($("#" + idd).attr("rotatespeed") == "middle") {
                                $(".rotate" + idd).css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 1s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "low") {
                                $(".rotate" + idd).css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 2s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "high") {
                                $(".rotate" + idd).css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 0.5s linear infinite"
                                });
                            }
                        } else {
                            if ($("#" + idd).attr("rotatespeed") == "middle") {
                                $(".rotate" + idd).css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 1s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "low") {
                                $(".rotate" + idd).css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 2s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "high") {
                                $(".rotate" + idd).css({
                                    "background-image": "url(images/elevatorshan.svg)",
                                    "background-repeat": "no-repeat",
                                    "background-size": "100% 100%",
                                    "position": "absolute",
                                    "top": 0,
                                    "left": 0,
                                    "z-index": 20,
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 0.5s linear infinite"
                                });
                            }
                        }
                    } else {
                        if ($("#" + idd).attr("rotatedirection") == "clockwise") {
                            if ($("#" + idd).attr("rotatespeed") == "middle") {
                                $(".rotatechild" + idd).css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 1s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "low") {
                                $(".rotatechild" + idd).css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 2s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "high") {
                                $(".rotatechild" + idd).css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play 0.5s linear infinite"
                                });
                            }
                        } else {
                            if ($("#" + idd).attr("rotatespeed") == "middle") {
                                $(".rotatechild" + idd).css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 1s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "low") {
                                $(".rotatechild" + idd).css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 2s linear infinite"
                                });
                            }
                            if ($("#" + idd).attr("rotatespeed") == "high") {
                                $(".rotatechild" + idd).css({
                                    "width": "70%",
                                    "height": "45%",
                                    "position": "absolute",
                                    "top": "27%",
                                    "left": "15%",
                                    "transform": "translateX(-50%) translateY(-50%)",
                                    "-webkit-transform-origin": "50% 50%",
                                    "-webkit-animation": "play2 0.5s linear infinite"
                                });
                            }
                        }
                    }
                } else {
                    var definitionUrl = $("#" + idd).attr("lineurl");
                    if ($("#" + idd).attr("rotatedirection") == "clockwise") {
                        if ($("#" + idd).attr("rotatespeed") == "middle") {
                            $(".rotate" + idd).css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play 1s linear infinite"
                            });
                        }
                        if ($("#" + idd).attr("rotatespeed") == "low") {
                            $(".rotate" + idd).css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play 2s linear infinite"
                            });
                        }
                        if ($("#" + idd).attr("rotatespeed") == "high") {
                            $(".rotate" + idd).css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play 0.5s linear infinite"
                            });
                        }
                    } else {
                        if ($("#" + idd).attr("rotatespeed") == "middle") {
                            $(".rotate" + idd).css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play2 1s linear infinite"
                            });
                        }
                        if ($("#" + idd).attr("rotatespeed") == "low") {
                            $(".rotate" + idd).css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play2 2s linear infinite"
                            });
                        }
                        if ($("#" + idd).attr("rotatespeed") == "high") {
                            $(".rotate" + idd).css({
                                "background-image": "url(" + definitionUrl + ")",
                                "background-repeat": "no-repeat",
                                "background-size": "100% 100%",
                                "position": "absolute",
                                "top": 0,
                                "left": 0,
                                "z-index": 20,
                                "-webkit-transform-origin": "50% 50%",
                                "-webkit-animation": "play2 0.5s linear infinite"
                            });
                        }
                    }
                }
            }else if(inItWebMode.editMode == false && valued == "0"){
                if ($("#" + idd).attr("lineurl") + "" == "undefined") {
                    if ($("#" + idd).attr("rotatetype") == "type3") {
                        $(".rotate" + idd).css({
                           "animation-play-state": "paused" 
                        });
                    } else {
                        $(".rotatechild" + idd).css({
                           "animation-play-state": "paused" 
                        });
                    }
                } else {                   
                    $(".rotate" + idd).css({
                       "animation-play-state": "paused" 
                    });
                }
            }
            break;
        case 'SlideBar':
            break;
        case 'Chart':
            chartval.push(parseFloat(JsonData["Tag"][j]["Value"]).toFixed(2));
            break;
        case 'History':
            var fontN = $("#"+idd).attr("fontN");
            var dataShowBoxO = $("#" + idd).find('#dataShowBox' + idd);
            var dataShowBox = $('<ul class="historyEvent_dataShowList datalist">' + '<li>日期</li>' + '<li>时间</li>' + '<li>用户名</li>' + '<li>事件记录</li>' + '<li>事件类型</li>' + '<li>访问级别</li>' + '</ul>');
            dataShowBoxO.append(dataShowBox);
            var alarmcolor = $("#" + idd).attr("alarmcolor");
            var historyfont = $("#" + idd).attr("font-family"); //字体
            var historysize = $("#" + idd).attr("font-size"); //字体大小
            var normal = $("#" + idd).attr("normal"); //常规效果
            var weight = $("#" + idd).attr("weight"); //加粗
            var Italic = $("#" + idd).attr("weighti"); //斜体
            var Underline = $("#" + idd).attr("weightl"); //下划线
            var delet = $("#" + idd).attr("weightb"); //删除线
            var date = dataShowBox.find('li:nth-child(9n+1)'); //日期
            var time = dataShowBox.find('li:nth-child(9n+2)'); //时间
            var variableName = dataShowBox.find('li:nth-child(9n+3)'); //用户名
            var description = dataShowBox.find('li:nth-child(9n+4)'); //事件记录
            var alarmInfo = dataShowBox.find('li:nth-child(9n+5)'); //事件类型
            var currentValue = dataShowBox.find('li:nth-child(9n+6)'); //访问级别
            /*处理日期、时间格式*/
            var year = parseInt(JsonData["Event"][j]['Time']['Year']);
            var month = parseInt(JsonData["Event"][j]['Time']['Month']);
            var day = parseInt(JsonData["Event"][j]['Time']['Day']);
            var hour = parseInt(JsonData["Event"][j]['Time']['Hour']);
            var minute = parseInt(JsonData["Event"][j]['Time']['Minute']);
            var second = parseInt(JsonData["Event"][j]['Time']['Second']);
            var millisecond = parseInt(JsonData["Event"][j]['Time']['MinSec']);
            var dateFormatIndex = $('#' + idd).attr('dateFormatIndex');
            var timeFormatIndex = $('#' + idd).attr('timeFormatIndex');
            $("#" + idd).find("ul.datalist li").css("color", alarmcolor);
            /******设置字体****/
            var family = function(famil) {
                $("#" + idd).find("ul.datalist li").css("font-family", famil);
            }
            family(historyfont);
            /******设置大小*****/
            var fnsize = function(size) {
                var sized = parseInt(size);
                $("#" + idd).find("ul.datalist li").css("font-size", sized + "px");
            }
            fnsize(historysize);
            /**************设置加粗等样式************/
            if(fontN === "yes"){
                weight = "no";
                Italic = "no";
                Underline = "no";
                delet = "no";
            }
            if (weight === "yes") {
                $("#" + idd).find("ul.datalist li").addClass("fontWeight");
            }
            if (Italic === "yes") {
                $("#" + idd).find("ul.datalist li").addClass("fontItalic");
            }
            if (Underline === "yes") {
                $("#" + idd).find("ul.datalist li").addClass("fontUnderline");
                $("#" + idd).find("ul.datalist li").removeClass("fontThrough");
            }
            if (delet === "yes") {
                $("#" + idd).find("ul.datalist li").removeClass("fontUnderline");
                $("#" + idd).find("ul.datalist li").addClass("fontThrough");
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
            } else if (dateFormatIndex == 2) {
                date.text(year + '-' + month + '-' + day);
            } else if (dateFormatIndex == 3) {
                date.text(month + '-' + day + '-' + year);
            } else {
                date.text(year + '/' + month + '/' + day);
            }
            if (timeFormatIndex == 1) {
                time.text(hour + ':' + minute + ':' + second + ':' + millisecond);
            } else {
                time.text(hour + ':' + minute + ':' + second);
            }
            /*处理其他字段*/
            variableName.text(JsonData["Event"][j]['UserName']);
            description.text(JsonData["Event"][j]['Record']);
            alarmInfo.text(JsonData["Event"][j]['Type']);
            currentValue.text(JsonData["Event"][j]['AccessLevel']);
            /*处理所在区域*/
            break;
        case 'Dial':
            var vale = setBooleanVal(JsonData["Tag"][j]["Value"]);
            $(".trianglemin" + idd).text($('#' + idd).attr('mineuval'));
            function fn1() {
                dial1();
            };
            function fn2() {
                dial2();
            };
            function fn3() {
                dial3();
            };
            function fn4() {
                dial4();
            };
            function fn5() {
                dial5();
            };
            function fncount() {
                if ($("#" + idd).attr("deg") == "deg90") {
                    fn2();
                };
                if ($("#" + idd).attr("deg") == "deg120") {
                    fn4();
                };
                if ($("#" + idd).attr("deg") == "deg180") {
                    fn1();
                };
                if ($("#" + idd).attr("deg") == "deg240") {
                    fn3();
                };
                if ($("#" + idd).attr("deg") == "deg360") {
                    fn5();
                };
            };
            var height1 = $("#main" + idd).height();
            var width1 = $("#main" + idd).width();
            $("#main" + idd).css({
                'height': 300,
                'width': 300
            });
            fncount();
            $("#main" + idd).css({
                'height': height1,
                'width': width1
            });
            /*==========360度的画法===================*/
            function dial2() {
                var vale1 = 360 / ($("#" + idd).attr("mixeuval") / vale);
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
                        min: 0,
                        max: 360,
                        startAngle: 90,
                        endAngle: -269.9,
                        splitNumber: 12,
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
                vale1 = setFloatVal(vale1);
                option.series[0].data[0].value = vale1;
                myChart.setOption(option, true);
            };
            /*===========180度的画法================*/
            function dial1() {
                var vale1 = 180 / ($("#" + idd).attr("mixeuval") / vale);
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
                        min: 0,
                        max: 360,
                        startAngle: 180,
                        endAngle: 0,
                        splitNumber: 6,
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
                vale1 = setFloatVal(vale1);
                option.series[0].data[0].value = vale1;
                myChart.setOption(option, true);
            }
            /*=========240=================*/
            function dial3() {
                var vale1 = 240 / ($("#" + idd).attr("mixeuval") / vale);
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
                        min: 0,
                        max: 240,
                        startAngle: 210,
                        endAngle: -30,
                        splitNumber: 8,
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
                vale1 = setFloatVal(vale1);
                option.series[0].data[0].value = vale1;
                myChart.setOption(option, true);
            }
            /*========120度================*/
            function dial4() {
                var vale1 = 120 / ($("#" + idd).attr("mixeuval") / vale);
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
                        min: 0,
                        max: 120,
                        startAngle: 150,
                        endAngle: 30,
                        splitNumber: 4,
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
                vale1 = setFloatVal(vale1);
                option.series[0].data[0].value = vale1;
                myChart.setOption(option, true);
            }
            /*=========90度================*/
            function dial5() {
                var vale1 = 90 / ($("#" + idd).attr("mixeuval") / vale);
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
                        min: 0,
                        max: 90,
                        startAngle: 180,
                        endAngle: 90,
                        splitNumber: 3,
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
                vale1 = setFloatVal(vale1);
                option.series[0].data[0].value = vale1;
                myChart.setOption(option, true);
            };
            break;
        case 'Status':
            value = setBooleanVal(JsonData["Tag"][j]["Value"]);
            var statusImageDom = $('#statusImage-' + idd);
            var listBoxDom = $('#' + idd).attr('listBoxDom');
            var tempDiv = $('<div class="tempDiv' + idd + '" style="display: none"></div>');
            tempDiv.html(listBoxDom);
            if ($('.tempDiv'+idd).length == 0) { 
                $('#'+idd).append(tempDiv);
            }
            tempDiv.children('div.dataList').each(function() {
                var dataValue = $(this).children('span.statusListValue').html();
                if (dataValue == value) {
                    //根据返回值切换状态控件图片
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
                            window.open('' + hyperlink + '');
                        } else { //非自动时，点击打开超链接
                            $('#'+idd).unbind('mousedown').bind('mousedown', function() {
                                window.open('' + hyperlink + '');
                            });
                        }
                    }
                }
            });
            break;
        case 'Alarm':
            var fontN = $("#"+idd).attr("fontN");
            var dataShowBox = $('<ul class="ListHeader listheader">' + '<li>日期</li>' + '<li>时间</li>' + '<li>变量名</li>' + '<li>描述</li>' + '<li>报警</li>' + '<li>当前值</li>' + '<li class="priority">优先级</li>' + '<li>事件</li>' + '</ul>');
            var alarmcolor = $("#" + idd).attr("alarmcolor");
            var historyfont = $("#" + idd).attr("font-family"); //字体
            var historysize = $("#" + idd).attr("font-size"); //字体大小
            var normal = $("#" + idd).attr("normal"); //常规效果
            var weight = $("#" + idd).attr("weight"); //加粗
            var Italic = $("#" + idd).attr("weighti"); //斜体
            var Underline = $("#" + idd).attr("weightl"); //下划线
            var delet = $("#" + idd).attr("weightb"); //删除线
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
            var dateFormatIndex = $('#' + idd).attr('dateFormatIndex');
            var timeFormatIndex = $('#' + idd).attr('timeFormatIndex');
            var dataShowBoxO = $("#" + idd).find('.showData' + idd);
            /****优先级筛选****/
            var priority = $("#" + idd).attr("priority");
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
            $("#" + idd).find("ul.listheader li").css("color", alarmcolor);
            /******设置字体****/
            var family = function(famil) {
                $("#" + idd).find("ul.listheader li").css("font-family", famil);
            }
            family(historyfont);
            /******设置大小*****/
            var fn = function(size) {
                var sized = parseInt(size);
                $("#" + idd).find("ul.listheader li").css("font-size", sized + "px");
            }
            fn(historysize);
            /*****加粗等样式设置******/
            if(fontN === "yes"){
                weight = "no";
                Italic = "no";
                Underline = "no";
                delet = "no";
            }
            if (weight === "yes") {
                $("#" + idd).find("ul.listheader li").addClass("fontWeight");
            }
            if (Italic === "yes") {
                $("#" + idd).find("ul.listheader li").addClass("fontItalic");
            }
            if (Underline === "yes") {
                $("#" + idd).find("ul.listheader li").addClass("fontUnderline");
                $("#" + idd).find("ul.listheader li").removeClass("fontThrough");
            }
            if (delet === "yes") {
                $("#" + idd).find("ul.listheader li").removeClass("fontUnderline");
                $("#" + idd).find("ul.listheader li").addClass("fontThrough");
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
            } else if (dateFormatIndex == 2) {
                date.text(year + '-' + month + '-' + day);
            } else if (dateFormatIndex == 3) {
                date.text(month + '-' + day + '-' + year);
            } else {
                date.text(year + '/' + month + '/' + day);
            }
            if (timeFormatIndex == 1) {
                time.text(hour + ':' + minute + ':' + second + ':' + millisecond);
            } else {
                time.text(hour + ':' + minute + ':' + second);
            }
            /*处理其他字段*/
            variableName.text(JsonData["Alarm"][j]['Name']);
            description.text(JsonData["Alarm"][j]['Describe']);
            alarmInfo.text(JsonData["Alarm"][j]['AlarmTag']); //???不确定
            currentValue.text(JsonData["Alarm"][j]['CurrentValue']);
            priorityLevel.text(JsonData["Alarm"][j]['Priority']);
            event.text(JsonData["Alarm"][j]['AlarmEvent']);
            break;
        case 'RealTimeAlarm':      
            var contrlele = $("#"+idd);
            var fontf = contrlele.attr("fontstyle");//字体
            var fonts = contrlele.attr("fontsized");//字体大小
            var fontc = contrlele.attr("alacolor");//窗体字体颜色
            var font_c = contrlele.attr("alarm_color");//报警字体颜色
            var fontn = contrlele.attr("alarm_limit");//上限
            var fontd = contrlele.attr("datestyle");//日期风格
            var fontt = contrlele.attr("timestyle");//时间风格
            var fontN = contrlele.attr("fontN");//常规
            var fontW = contrlele.attr("fontW");//加粗
            var fontI = contrlele.attr("fontI");//斜体
            var fontU = contrlele.attr("fontU");//下划线
            var fontT = contrlele.attr("fontT");//删除线
            var realleng = parseInt(fontn);//上限个数
            var dataShowBoxO = $('#dataShowBox' + idd);
            var dataShowBox = $('<ul class="alarmDataShowList alarmDataShowList' + idd + '"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>');
            var real = $("#" + idd).find("ul.alarmDataShowList li");
            var lengt = $("#" + idd).find("ul.alarmDataShowList");
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
            var dateFormatIndex = $('#' + idd).attr('dateFormatIndex');
            var timeFormatIndex = $('#'+idd).attr('timeFormatIndex');
             /****优先级筛选****/
            var priorityLeveladd = $("#"+idd).attr("priorityLeveladd");
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
                } else if (dateFormatIndex == 2) {
                    date.text(year + '-' + month + '-' + day);
                } else if (dateFormatIndex == 3) {
                    date.text(month + '-' + day + '-' + year);
                } else {
                    date.text(year + '/' + month + '/' + day);
                }
                if (timeFormatIndex == 1) {
                    time.text(hour + ':' + minute + ':' + second + ':' + millisecond);
                } else {
                    time.text(hour + ':' + minute + ':' + second);
                }    
                /******设置字体****/          
                var family_ = function(famil) {
                    dataShowBox.css("font-family", famil);
                };
                family_(fontf);
                /******设置大小*****/
                var fn_ = function(size) {
                    var sized = parseInt(size);
                    dataShowBox.css("font-size", sized + "px");
                };
                fn_(fonts);
                /*********报警字体颜色********/
                var fontco = function(fontcc){
                    //real.css("color",fontcc);
                    dataShowBox.css("color",fontcc);                
                };
                fontco(font_c);               
                /*****加粗等样式设置******/
                if(fontN === "yes"){
                    fontW = "no";
                    fontI = "no";
                    fontU = "no";
                    fontT = "no";
                }
                if (fontW === "yes") {
                    dataShowBox.addClass("fontWeight");
                }
                if (fontI === "yes") {
                    dataShowBox.addClass("fontItalic");
                }
                if (fontU === "yes") {
                    dataShowBox.addClass("fontUnderline");
                    dataShowBox.removeClass("fontThrough");
                }
                if (fontT === "yes") {
                    dataShowBox.removeClass("fontUnderline");
                    dataShowBox.addClass("fontThrough");
                }
                variableName.text(JsonData["Alarm"][j]['Name']);
                description.text(JsonData["Alarm"][j]['Describe']);
                alarmInfo.text(JsonData["Alarm"][j]['AlarmTag']); 
                currentValue.text(JsonData["Alarm"][j]['CurrentValue']);
                priorityLevel.text(JsonData["Alarm"][j]['Priority']);
                event.text(JsonData["Alarm"][j]['AlarmEvent']);
                response.text(JsonData["Alarm"][j]['AlarmACK']);     
            };          
            if(priorityLeveladd === "全部"){ 
                if(leng < realleng){
                    dataShowBoxO.prepend(dataShowBox); 
                    realalarm();
                }
                if(leng >= realleng){
                    $(".alarmDataShowList").last().remove();                    
                    dataShowBoxO.prepend(dataShowBox);
                    realalarm(); 
                }
            }else
            if(priorityLeveladd === "紧急"){
                var val = parseInt(JsonData["Alarm"][j]['Priority']);
                if(val >= 667){
                    if(leng < realleng){
                        dataShowBoxO.prepend(dataShowBox);
                        realalarm();

                    }
                    if(leng >= realleng){
                        $(".alarmDataShowList").last().remove();                    
                        dataShowBoxO.prepend(dataShowBox);
                        realalarm(); 
                    }
                }
            }else
            if(priorityLeveladd === "高"){
                var val = parseInt(JsonData["Alarm"][j]['Priority']);
                if(val <= 666 && val >= 334){
                    if(leng < realleng){
                        dataShowBoxO.prepend(dataShowBox);
                        realalarm();
                    }
                    if(leng >= realleng){
                        $(".alarmDataShowList").last().remove();                    
                        dataShowBoxO.prepend(dataShowBox);
                        realalarm(); 
                    }           
                }
            }else
            if(priorityLeveladd === "低"){
                var val = parseInt(JsonData["Alarm"][j]['Priority']);
                if(val <= 333){
                    if(leng < realleng){
                        dataShowBoxO.prepend(dataShowBox);
                        realalarm();
                    }
                    if(leng >= realleng){
                        $(".alarmDataShowList").last().remove();                    
                        dataShowBoxO.prepend(dataShowBox);
                        realalarm(); 
                    }               
                }
            }            
            break;
        case 'Elevator':
            /*=========获取的数据==========*/
            var elevatorControl = $("#" + idd);
            var onoff1 = JsonData["Tag"][j]["Value"]; //
            var floor = setBooleanVal(JsonData["Tag"][j]["Value"]); //层数
            var onoff = setBooleanVal(JsonData["Tag"][j]["Value"]); //上下
            var onoff2 = JsonData["Tag"][j]["Value"];
            if (elevatorControl.attr("variableid3") == variable_id) {
                if (onoff1 == 0) {
                    $("#elevatorestate" + idd).html("停运");
                    $("#elevatorestate" + idd).css({
                        "background": "#686868"
                    });
                } else if (onoff1 == 1) {
                    $("#elevatorestate" + idd).html("运行");
                    $("#elevatorestate" + idd).css({
                        "background": "#22af7c"
                    });
               } else if (onoff1 == 2) {
                    $("#elevatorestate" + idd).html("故障");
                    $("#elevatorestate" + idd).css({
                        "background": "#cc352a"
                    });
               } else if (onoff1 == 3) {
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
                    if ((!floor) && onoff == 0) {
                        $("#nowfloor" + idd).text("上行");
                    } else if ((!floor) && onoff == 1) {
                        $("#nowfloor" + idd).text("下行");
                    } else if (floor) {
                        $("#nowfloor" + idd).text(floor + "层");
                    };
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
            JsonData = JSON.parse(data);
            switch (JsonData["StatusCode"]) {
            case 0:
                switch (JsonData["Command"]) {
                case 0:
                    //登陆成功数据处理
                    var Session_value = JsonData["Session_value"];
                    localStorage.setItem("Session_value", Session_value);
                    if (localStorage.getItem("Session_value") != "undefined") {
                        Websocket.send(getSendData());
                    }
                    break;
                case 1:
                    //登出时数据处理
                    localStorage.removeItem("Session_value");
                    break;
                case 2:
                case 7:
                    var len = JsonData["Tag"].length;
                    for (j = 0; j < len; j++) {
                        sysID = JsonData["Tag"][j]["ID"]["SubsystemID"];
                        deviceID = JsonData["Tag"][j]["ID"]["DeviceID"];
                        tagID = JsonData["Tag"][j]["ID"]["TagID"];
                        variable_id = joinId(sysID, deviceID, tagID);
                        var allElementObj = $(".contrl"); //暂时
                        var variableIDArr = null;
                        if (allElementObj.length >= 1) {
                            allElementObj.each(function(k) {
                                if ($(this).attr("variableID") != undefined) {
                                    variableIDArr = $(this).attr("variableID").split(",");
                                    for (var i = 0; i < variableIDArr.length; i++) {
                                        if (variableIDArr[i] == variable_id) {
                                            if (inItWebMode.editMode == false) {
                                                UpdateControlData($(this).attr("id"), variable_id);
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    break;
                case 3:
                    //历史事件的数据处理
                    var length = JsonData["Event"].length;
                    for (j = 0; j < length; j++) {
                        $("div[id^='History']").each(function() {
                            UpdateControlData($(this).attr("id"));
                        });
                    }
                    break;
                case 4:
                    //历史报警的数据处理
                    var length = JsonData["Alarm"].length;
                    for (j = 0; j < length; j++) {
                        $("div[id^='Alarm']").each(function() {
                            UpdateControlData($(this).attr("id"));
                        });
                    }
                    break;
                case 8:
                    //实时报警的数据处理
                    var length = JsonData["Alarm"].length;
                    for (j = 0; j < length; j++) {
                        sysID = JsonData["Alarm"][j]["ID"]["SubsystemID"];
                        deviceID = JsonData["Alarm"][j]["ID"]["DeviceID"];
                        tagID = JsonData["Alarm"][j]["ID"]["TagID"];
                        id = joinId(sysID, deviceID, tagID);
                        $("div[id^='RealTimeAlarm']").each(function(k) {
                            UpdateControlData($(this).attr("id"));
                        });
                    }
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
            default:
                false;
            }
        }
    };
     Websocket.onclose = function() {
		alert("连接超时，请检查网络，重新刷新页面");
    };
    Websocket.onerror = function() { //socket的错误后的处理
        alert("亲：数据断开，请重新连接！");
    };
}
/***************模态窗*******************/
var ModalSend = function() {
    this.modelPage = function() {
        /****************发送数据模态窗*******************/
        var modelDom = '<div class="model modalmove">' + '<div class="modelmove">' + '<div class="modelhead">' + '<div class="lf">命令发送</div>' + '<div class="rt modelclose">X</div>' + '</div>' + '</div>' + '<div class="modelline"></div>' + '<div class="modellist"><div class="lf">变量名称</div><input type="text" class="rt sty ename" disabled></div>' + '<div class="modellist"><div class="lf">变量类型</div><input type="text" class="rt sty etype" disabled></div>' + '<div class="modellist"><div class="lf">下发值</div><input type="text" class="rt sty eval" disabled></div>' + '<div class="modelfoot rt">' + '<button class="modelbtn modelsure">发送</button>' + '<button class="modelbtn modelcancel">取消</button>' + '</div>' + '</div>';
        $("body").append(modelDom);
        var modal = $(".model");
        modal.wrap("<div class='wrapp'></div>");
        var top = ($(window).height() - $(".model").height()) / 2;
        var left = ($(window).width() - $(".model").width()) / 2;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(".model").css({
            "position": "absolute",
            "top": top + scrollTop,
            "left": left + scrollLeft
        });
    };
    /**********开关模态窗***********/
    this.modalPages = function() {
        var modalDoms = '<div class="model modalmove">' + '<div class="modelmove">' + '<div class="modelhead">' + '<div class="lf">下发变量值</div>' + '<div class="rt modelclose">X</div>' + '</div>' + '</div>' + '<div class="modelline"></div>' + '<div class="switchbox">提示内容</div>' + '<div class="modelfooter rt">' + '<button class="modelbtns btns0"></button>' + '<button class="modelbtns btns1"></button>' + '<button class="modelbtns btns2 modelcancel">取消</button>' + '</div>' + '</div>';
        $("body").append(modalDoms);
        var modal = $(".model");
        modal.wrap("<div class='wrapp'></div>");
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        var top = ($(window).height() - $(".model").height()) / 2;
        var left = ($(window).width() - $(".model").width()) / 2;
        $(".model").css({
            "position": "absolute",
            "top": top + scrollTop,
            "left": left + scrollLeft
        });
    };
    /**********文本模态窗***********/
    this.modalPagetext = function() {
        var modalDoms = '<div class="modeltext modalmove">' + '<div class="modelmove">' + '<div class="modelheadtex">' + '<div class="lf">下发变量值</div>' + '<div class="rt modelclose">X</div>' + '</div>' + '</div>' + '<div class="modeltextline"></div>' + '<div class="texttab"><span>下发值</span><input type="text" class="textvalue"></div>' + '<div class="modeltexfooter rt">' + '<button class="modelbtns btns11 modelsuretext">发送</button>' + '<button class="modelbtns btns2 modelcancel">取消</button>' + '</div>' + '</div>';
        $("body").append(modalDoms);
        var modal = $(".modeltext");
        modal.wrap("<div class='wrapp'></div>");
        var top = ($(window).height() - $(".modeltext").height()) / 2 - 60;
        var left = ($(window).width() - $(".modeltext").width()) / 2 + 100;
        var scrollTop = $(document).scrollTop();
        var scrollLeft = $(document).scrollLeft();
        $(".modeltext").css({
            "position": "absolute",
            "top": top + scrollTop,
            "left": left + scrollLeft
        });
    };
    /*********下发及开关功能*********/
    this.modelFeature = function(val, idd, isClick) {
        if (isClick) { //isClick为真，则是复选按钮控件，【命令发送】窗口 删除掉“下发值”项
            $('.wrapp .model .modellist:last').remove();
        }
        /***********禁止选中文本及文本拖拽*******/
        $("div").attr('unselectable', 'on').css({
            '-moz-user-select': '-moz-none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart',
        function() {
            return false;
        });
        $("input").attr('unselectable', 'on').css({
            '-moz-user-select': '-moz-none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart',
        function() {
            return false;
        });
        /*************发送命令功能**********/
        var name = $("#" + idd).attr("variablename");
        var type = $("#" + idd).attr("variabletype");
        $(".modelclose").unbind("click").bind("click",
        function() {
            if (isClick) {
                $('#'+idd).attr('isClick', 'cancel'); //点击【关闭】
            }
            $(".model").remove();
            $(".wrapp").remove();
        });
        $(".modelcancel").unbind("click").bind("click",
        function() {
            if (isClick) {
                $('#'+idd).attr('isClick', 'cancel'); //点击【取消】
            }
            $(".model").remove();
            $(".wrapp").remove();
        });
        $(".ename").val(name);
        $(".etype").val(type);
        $(".eval").val(val);
        $(".modelsure").unbind("click").bind("click",
        function() {
            Websocket.send(sendPostData(val, idd));
            if (isClick) {
                $('#'+idd).attr('isClick', 'ok'); //点击【发送】
            }
            $(".model").remove();
            $(".wrapp").remove();
        });
        /**********开关模态窗功能************/
        var open = $("#" + idd).attr("openbtn");
        var close = $("#" + idd).attr("closebtn");
        var tab = $("#" + idd).attr("tabbtn");
        $(".btns0").text(open);
        $(".btns1").text(close);
        $(".btns0").attr('title', open);
        $(".btns1").attr('title', close);
        $(".switchbox").text(tab);
        $(".btns0").unbind("click").bind("click",
        function() {
            Websocket.send(sendPostData("1", idd));
            $(".model").remove();
            $(".wrapp").remove();
        });
        $(".btns1").unbind("click").bind("click",
        function() {
            Websocket.send(sendPostData("0", idd));
            $(".model").remove();
            $(".wrapp").remove();
        });
        /***********模态窗拖拽及位置限制********/
        var modalmove = $(".modelmove");
        var o = $(".modalmove");
        modalmove.bind("mousedown",
        function(e) {
            var e = e || event;
            var x = e.pageX - o[0].offsetLeft;
            var y = e.pageY - o[0].offsetTop;
            $(window).bind("mousemove",
            function(e) {
                var scroltop = document.body.scrollTop;
                var scrolleft = document.body.scrollLeft;
                var lf = o.offset().left;
                var wid = o.width();
                var heig = o.height();
                var e = e || event;
                var l = e.pageX - x;
                var t = e.pageY - y;
                if (l <= 0) {
                    l = 0;
                } else if (l + wid >= $("body").width()) {
                    l = $("body").width() - wid;
                } else {
                    l = l;
                }
                if (t <= 0) {
                    t = 0;
                } else if (t + heig >= $("body").height()) {
                    t = $("body").height() - heig;
                } else {
                    t = t;
                }
                o.css({
                    "left": l
                });
                o.css({
                    "top": t
                });
            });
            $(window).bind("mouseup",
            function(e) {
                $(window).unbind("mousemove");
                $(window).unbind("mouseup");
            })
        })
    };
    /*********无确认/取消模态框，直接下发命令*********/
    this.modelFeature1 = function(val, idd) {
        Websocket.send(sendPostData(val, idd));
    };
    /********文本模态窗功能**********/
    this.modeltextFeature = function(idd) {
        /***********禁止选中文本及文本拖拽*******/
        $("div").attr('unselectable', 'on').css({
            '-moz-user-select': '-moz-none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart',
        function() {
            return false;
        });
        $("input").attr('unselectable', 'on').css({
            '-moz-user-select': '-moz-none',
            '-moz-user-select': 'none',
            '-o-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        }).bind('selectstart',
        function() {
            return false;
        });
        var textmove = $(".modelmove");
        var o = $(".modeltext");
        textmove.unbind("mousedown").bind("mousedown",
        function(e) {
            var e = e || event;
            var x = e.pageX - o[0].offsetLeft + 100;
            var y = e.pageY - o[0].offsetTop - 60;
            $(window).unbind("mousemove").bind("mousemove",
            function(e) {
                var scroltop = document.body.scrollTop;
                var scrolleft = document.body.scrollLeft;
                var lf = o.offset().left;
                var wid = o.width();
                var heig = o.height();
                var e = e || event;
                var l = e.pageX - x;
                var t = e.pageY - y;
                if (l <= 0) {
                    l = 0;
                } else if (l + wid >= $("body").width()) {
                    l = $("body").width() - wid;
                } else {
                    l = l;
                }
                if (t <= 0) {
                    t = 0;
                } else if (t + heig >= $("body").height()) {
                    t = $("body").height() - heig;
                } else {
                    t = t;
                }
                o.css({
                    "left": l + 100
                });
                o.css({
                    "top": t - 60
                });
            });
            $(window).bind("mouseup",
            function(e) {
                $(window).unbind("mousemove");
                $(window).unbind("mouseup");
            })
        });
        $(".modelclose").unbind("click").bind("click",
        function() {
            $(".modeltext").remove();
            $(".wrapp").remove();
        });
        $(".modelcancel").unbind("click").bind("click",
        function() {
            $(".modeltext").remove();
            $(".wrapp").remove();
        });
        $(".modelsuretext").unbind("click").bind("click",
        function() {
            var val = $(".textvalue").val();
            if (val != "") {
                Websocket.send(sendPostData(val, idd));
                $(".modeltext").remove();
                $(".wrapp").remove();
            }
        });
        var type = $("#" + idd).attr("variabletype");
        $(".textvalue").keyup(function() {
            var variableType = $('#' + idd).attr('variableType');
            var reg;
            var minValue = $('#' + idd).attr('MinEuVal'); //允许输入的最小工程值
            var maxValue = $('#' + idd).attr('MixEuVal'); //允许输入的最大工程值
            if (variableType === '开关量') { //配置的变量为‘开关量’
                reg = /^[0-1]$/;
                if (!reg.test($(this).val())) {
                    $(this).val('');
                }
            } else if (variableType === '整型量') { //配置的变量为‘开关量’
                reg = /^[0-9]*$/;
                if (reg.test($(this).val())) {
                    if (! (parseInt($(this).val()) <= parseInt(maxValue) && parseInt($(this).val()) >= parseInt(minValue))) {
                        alert('输入值不在范围内，请重新输入');
                        $(this).val('');
                    }
                } else {
                    $(this).val('');
                }
            } else if (variableType === '浮点量') { //配置的变量为‘浮点量’
                reg = /^[0-9]+(.[0-9]*)?$/;
                if (minValue && maxValue) {
                    if (reg.test($(this).val())) {
                        if (! (parseFloat($(this).val()) <= parseFloat(maxValue) && parseFloat($(this).val()) >= parseFloat(minValue))) {
                            alert('输入值不在范围内，请重新输入');
                            $(this).val('');
                        }
                    } else {
                        $(this).val('');
                    }
                }
            }
        });
    };
};
var inItSendModal = new ModalSend();
var action = {
    /*****微调*******/
    minor: function() {
        /**********上下控制按钮功能***********/
        $.each($("img[id^='mup']"),
        function() {
            var idd = $(this).attr("id").split("-")[1];
            var variableType = $('#' + idd).attr('variableType');
            $(this).unbind("mousedown").bind("mousedown",
            function() {
                if (inItWebMode.editMode == false) {
                    if (variableType) {
                        var data = parseInt($("#mumcolor-" + idd).val());
                        if (isNaN(data)) {
                            $("#mumcolor-" + idd).val(0);
                        } else {
                            $("#mumcolor-" + idd).val(data + 1);
                        }
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        });
        $.each($("img[id^='mdown']"),
        function() {
            $(this).unbind("mousedown").bind("mousedown",
            function() {
                var idd = $(this).attr("id").split("-")[1];
                var variableType = $('#' + idd).attr('variableType');
                if (inItWebMode.editMode == false) {
                    if (variableType) {
                        var data = parseInt($("#mumcolor-" + idd).val());
                        if (isNaN(data)) {
                            $("#mumcolor-" + idd).val(0);
                        } else {
                            $("#mumcolor-" + idd).val(data - 1);
                        }
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        });

        /*********发送命令********/
        $.each($("button[id^='minbtn']"),
        function() {
            var idd = $(this).attr("id").split("-")[1];
            $("#mumcolor-" + idd).unbind("keyup").bind("keyup",
            function() {
                var minorval = $(this).val();
                var minValue = $('#' + idd).attr('MinEuVal'); //允许输入的最小工程值
                var maxValue = $('#' + idd).attr('MixEuVal'); //允许输入的最大工程值
                if ($("#" + idd).attr("variabletype") + "" != "undefined") {
                    if (minorval == "") {
                        $(this).val("");
                    } else {
                        if (parseInt(minorval) >= parseInt(minValue) && parseInt(minorval) <= parseInt(maxValue)) {
                            $(this).val(parseInt(minorval));
                        } else {
                            $(this).val("");
                            alert("值越界或格式有误！");
                        }
                    }
                } else {
                    alert("请配置变量！");
                    $(this).val("");
                }
            });
            $("#minbtn-" + idd).unbind("mousedown").bind("mousedown",
            function() {
                if (inItWebMode.editMode == false) {
                    if ($("#" + idd).attr("variabletype") + "" != "undefined") {
                        var minorval = $("#mumcolor-" + idd).val();
                        if (minorval != "") {
                            if ($('#'+idd).attr('sure') == 'yes') {
                                inItSendModal.modelPage();
                                inItSendModal.modelFeature(minorval, idd);
                            } else {
                                inItSendModal.modelFeature1(minorval, idd);
                            }
                        }
                    } else {
                        alert("请配置变量！");
                    }
                }
            });
			
        });
        $.each($("input[id^='mumcolor']"), function() {
			var idd = $(this).attr("id").split("-")[1];
			$(document).keydown(function(event){
			 	if(event.keyCode ==13){
			 	var aa =  $("#mumcolor-" + idd).is(":focus");
				if(aa===true){
						if(inItWebMode.editMode == false) {
		                    if ($("#" + idd).attr("variabletype") + "" != "undefined") {
		                        var minorval = $("#mumcolor-" + idd).val();
		                        if (minorval != "") {
		                            if ($('#'+idd).attr('sure') == 'yes') {
		                                inItSendModal.modelPage();
		                                inItSendModal.modelFeature(minorval, idd);
		                            } else {
		                                inItSendModal.modelFeature1(minorval, idd);
		                            }
		                        }
		                    } else {
		                        alert("请配置变量！");
		                    }
               			}
					}
				    event.preventDefault ? event.preventDefault() : event.returnValue = false; 
			  	}
			});
		});	
    },
    /*******滑杆控件********/
    sliderBar: function() {
        $.each($("div[id^='sliderBlock']"),
        function() {
            var status = false;
            var moveX = 0;
            var moveY = 0;
            var idd = $(this).attr("id").split("-")[1];
            $(".slider_block" + idd).unbind('mousedown').bind('mousedown',
            function(event) {
                if (inItWebMode.editMode == false) {
                    /*var minNum = $('.sliderNum1'+idd).text(); //滑杆刻度最小值
                        var maxNum = $('.sliderNum3'+idd).text(); //滑杆刻度最大值*/
                    //滑杆刻度的最大值和最小值取决于变量配置
                    var minNum = $('#' + idd).attr('MinEuVal');
                    var maxNum = $('#' + idd).attr('MixEuVal');
                    if (minNum && maxNum) {
                        var totalWidth = $('.slide_bar' + idd).width(); //水平方向时滑杆最大长度（px）
                        var totalHeight = $('.slide_bar' + idd).height(); //垂直方向时滑杆最大长度（px）
                        var lx = event.clientX;
                        var ly = event.clientY;
                        var left = parseInt($("#sliderBlock-" + idd).css('left'));
                        var top = parseInt($("#sliderBlock-" + idd).css('top'));
                        status = true;
                        $(window).unbind("mousemove").bind('mousemove',
                        function(event) {
                            if (status) {
                                var x = event.clientX;
                                var y = event.clientY;
                                var left1 = left + x - lx;
                                var top1 = totalHeight - top + ly - y;
                                moveX = Math.round(left1 / totalWidth * 100);
                                moveY = Math.round(top1 / totalHeight * 100);
                                if ($('#' + idd).attr('value') === 'level') {
                                    $("#sliderBlock-" + idd).css({
                                        "left": moveX + '%'
                                    });
                                    $('.slider_tip' + idd).text(parseInt(moveX));
                                    if (parseInt($("#sliderBlock-" + idd).css('left')) < 0) {
                                        $("#sliderBlock-" + idd).css({
                                            "left": 0 + '%'
                                        });
                                        $('.slider_tip' + idd).text(minNum);
                                    }
                                    if (parseInt($("#sliderBlock-" + idd).css('left')) > totalWidth) {
                                        $("#sliderBlock-" + idd).css({
                                            "left": 100 + '%'
                                        });
                                        $('.slider_tip' + idd).text(maxNum);
                                    }
                                } else if ($('#' + idd).attr('value') === 'vertical') {
                                    $("#sliderBlock-" + idd).css({
                                        top: 100 - moveY + '%'
                                    });
                                    $('.slider_tip' + idd).text(parseInt(moveY));
                                    if (parseInt($("#sliderBlock-" + idd).css('top')) < 0) {
                                        $("#sliderBlock-" + idd).css({
                                            top: 0 + '%'
                                        });
                                        $('.slider_tip' + idd).text(maxNum);
                                    }
                                    if (parseInt($("#sliderBlock-" + idd).css('top')) > totalHeight) {
                                        $("#sliderBlock-" + idd).css({
                                            top: 100 + '%'
                                        });
                                        $('.slider_tip' + idd).text(minNum);
                                    }
                                }
                            }
                        });
                        $(document).unbind("mouseup").bind('mouseup',
                        function() {
                            $(window).unbind('mousemove');
                            $(document).unbind('mouseup');
                            status = false;
                            //鼠标松开的时候发送命令
                            if ($('#' + idd).attr('value') === 'level') {
                                if (moveX > maxNum) {
                                    moveX = maxNum;
                                } else if (moveX < minNum) {
                                    moveX = minNum;
                                }
                                if ($('#'+idd).attr('sure') == 'yes') {
                                    inItSendModal.modelPage();
                                    inItSendModal.modelFeature(moveX, idd);
                                } else {
                                    inItSendModal.modelFeature1(moveX, idd);
                                }
                            } else {
                                if (moveY > maxNum) {
                                    moveY = maxNum;
                                } else if (moveY < minNum) {
                                    moveY = minNum;
                                }
                                if ($('#'+idd).attr('sure') == 'yes') {
                                    inItSendModal.modelPage();
                                    inItSendModal.modelFeature(moveY, idd);
                                } else {
                                    inItSendModal.modelFeature1(moveY, idd);
                                }
                            }
                        });
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        })
    },
    /*********图表***********/
    chart: function() {
        $.each($("div[id^='Chart']"),
        function() {
            var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
            var chartVertical; //2D垂直条图
            var chartLevel; //2D水平条图
            var chartPolyline; //折线图
            var chartCube; //3D立方图
            var chartPie; //2D饼图
            var chart3Dpie; //3D饼图
            var chartArea; //面积图
            var chart_timer;
            var chartkey = false; //定时器开关
            var chart_type; //图表类型
            var _width;
            var _height;
            var chartshowborder = false; //显示边框控制
            var chartshowlegend = true; //显示图例控制
            var chartshowlegendy = true; //显示图例控制
            var chartshowtitle = true; //显示标题
            var chartshowdata = true; //显示数据标题
            var chartshowtime = true; //显示数据标题
            var chartfonttitle = "Microsoft YaHei";
            var chartfontXY = "Microsoft YaHei";
            var chartfontxy = "Microsoft YaHei";
            var chartannot = "Microsoft YaHei";
            var chartsizetitle = 18;
            var chartsizeXY = 12;
            var chartsizexy = 12;
            var chartsizeannot = 12;
            var chartAnnotatedcolor = $("#" + idd).attr("chartAnnotatedcolor"); //坐标文本颜色
            var chartlegend = $("#" + idd).attr("chartlegend"); //图例文本颜色
            var grid = $("#" + idd).attr("chartgrid");
            var chartsele = $("#" + idd).attr("chartsele"); //图表类型控制
            var date;
            var date1;
            var date2;
            var date3;
            var date4;
            var date5;
            var date6;
            var date7;
            var date8;
            var charttimeer = $("#" + idd).attr("chartinter");
            /*****横坐标数据*******/
            var label = ["", "", "", "", "", ""];
            /********纵坐标数据**********/
            var start_axisY = 0;
            var end_axisY = 100;
            var axisY_space = 10;
            var cft = $("#" + idd).attr("chart_font_type");
            var cfX = $("#" + idd).attr("chart_font_XY");
            var cfx = $("#" + idd).attr("chart_font_x-y");
            var cfa = $("#" + idd).attr("chart_font_annot");
            if (cft === "1") {
                chartfonttitle = "Microsoft YaHei";
            }
            if (cft === "2") {
                chartfonttitle = "KaiTi";
            }
            if (cft === "3") {
                chartfonttitle = "SimHei";
            }
            if (cft === "4") {
                chartfonttitle = "SimSun";
            }
            if (cft === "5") {
                chartfonttitle = "NSimSun";
            }
            if (cft === "6") {
                chartfonttitle = "FangSong";
            }
            if (cft === "7") {
                chartfonttitle = "LiSu";
            }
            if (cft === "8") {
                chartfonttitle = "YouYuan";
            }

            if (cfX === "1") {
                chartfontXY = "Microsoft YaHei";
            }
            if (cfX === "2") {
                chartfontXY = "KaiTi";
            }
            if (cfX === "3") {
                chartfontXY = "SimHei";
            }
            if (cfX === "4") {
                chartfontXY = "SimSun";
            }
            if (cfX === "5") {
                chartfontXY = "NSimSun";
            }
            if (cfX === "6") {
                chartfontXY = "FangSong";
            }
            if (cfX === "7") {
                chartfontXY = "LiSu";
            }
            if (cfX === "8") {
                chartfontXY = "YouYuan";
            }

            if (cfx === "1") {
                chartfontxy = "Microsoft YaHei";
            }
            if (cfx === "2") {
                chartfontxy = "KaiTi";
            }
            if (cfx === "3") {
                chartfontxy = "SimHei";
            }
            if (cfx === "4") {
                chartfontxy = "SimSun";
            }
            if (cfx === "5") {
                chartfontxy = "NSimSun";
            }
            if (cfx === "6") {
                chartfontxy = "FangSong";
            }
            if (cfx === "7") {
                chartfontxy = "LiSu";
            }
            if (cfx === "8") {
                chartfontxy = "YouYuan";
            }

            if (cfa === "1") {
                chartannot = "Microsoft YaHei";
            }
            if (cfa === "2") {
                chartannot = "KaiTi";
            }
            if (cfa === "3") {
                chartannot = "SimHei";
            }
            if (cfa === "4") {
                chartannot = "SimSun";
            }
            if (cfa === "5") {
                chartannot = "NSimSun";
            }
            if (cfa === "6") {
                chartannot = "FangSong";
            }
            if (cfa === "7") {
                chartannot = "LiSu";
            }
            if (cfa === "8") {
                chartannot = "YouYuan";
            }
            var chartsizetitle_ = $("#" + idd).attr("chart_size_type");
            var chartsizeXY_ = $("#" + idd).attr("chart_size_XY");
            var chartsizexy_ = $("#" + idd).attr("chart_size_x-y");
            var chartsizeannot_ = $("#" + idd).attr("chart_size_annot");
            switch (chartsizetitle_) {
            case "1":
                chartsizetitle = 56;
                break;
            case "2":
                chartsizetitle = 48;
                break;
            case "3":
                chartsizetitle = 34;
                break;
            case "4":
                chartsizetitle = 32;
                break;
            case "5":
                chartsizetitle = 28;
                break;
            case "6":
                chartsizetitle = 24;
                break;
            case "7":
                chartsizetitle = 21;
                break;
            case "8":
                chartsizetitle = 20;
                break;
            case "9":
                chartsizetitle = 18;
                break;
            case "10":
                chartsizetitle = 16;
                break;
            case "11":
                chartsizetitle = 14;
                break;
            case "12":
                chartsizetitle = 12;
                break;
            case "13":
                chartsizetitle = 10;
                break;
            case "14":
                chartsizetitle = 8;
                break;
            case "15":
                chartsizetitle = 6;
                break;
            case "16":
                chartsizetitle = 4;
                break;
            default:
                false;
            }
            switch (chartsizeXY_) {
            case "1":
                chartsizeXY = 56;
                break;
            case "2":
                chartsizeXY = 48;
                break;
            case "3":
                chartsizeXY = 34;
                break;
            case "4":
                chartsizeXY = 32;
                break;
            case "5":
                chartsizeXY = 28;
                break;
            case "6":
                chartsizeXY = 24;
                break;
            case "7":
                chartsizeXY = 21;
                break;
            case "8":
                chartsizeXY = 20;
                break;
            case "9":
                chartsizeXY = 18;
                break;
            case "10":
                chartsizeXY = 16;
                break;
            case "11":
                chartsizeXY = 14;
                break;
            case "12":
                chartsizeXY = 12;
                break;
            case "13":
                chartsizeXY = 10;
                break;
            case "14":
                chartsizeXY = 8;
                break;
            case "15":
                chartsizeXY = 6;
                break;
            case "16":
                chartsizeXY = 4;
                break;
            default:
                false;
            }
            switch (chartsizexy_) {
            case "1":
                chartsizexy = 56;
                break;
            case "2":
                chartsizexy = 48;
                break;
            case "3":
                chartsizexy = 34;
                break;
            case "4":
                chartsizexy = 32;
                break;
            case "5":
                chartsizexy = 28;
                break;
            case "6":
                chartsizexy = 24;
                break;
            case "7":
                chartsizexy = 21;
                break;
            case "8":
                chartsizexy = 20;
                break;
            case "9":
                chartsizexy = 18;
                break;
            case "10":
                chartsizexy = 16;
                break;
            case "11":
                chartsizexy = 14;
                break;
            case "12":
                chartsizexy = 12;
                break;
            case "13":
                chartsizexy = 10;
                break;
            case "14":
                chartsizexy = 8;
                break;
            case "15":
                chartsizexy = 6;
                break;
            case "16":
                chartsizexy = 4;
                break;
            default:
                false;
            }
            switch (chartsizeannot_) {
            case "1":
                chartsizeannot = 56;
                break;
            case "2":
                chartsizeannot = 48;
                break;
            case "3":
                chartsizeannot = 34;
                break;
            case "4":
                chartsizeannot = 32;
                break;
            case "5":
                chartsizeannot = 28;
                break;
            case "6":
                chartsizeannot = 24;
                break;
            case "7":
                chartsizeannot = 21;
                break;
            case "8":
                chartsizeannot = 20;
                break;
            case "9":
                chartsizeannot = 18;
                break;
            case "10":
                chartsizeannot = 16;
                break;
            case "11":
                chartsizeannot = 14;
                break;
            case "12":
                chartsizeannot = 12;
                break;
            case "13":
                chartsizeannot = 10;
                break;
            case "14":
                chartsizeannot = 8;
                break;
            case "15":
                chartsizeannot = 6;
                break;
            case "16":
                chartsizeannot = 4;
                break;
            default:
                false;
            }
            /****************默认垂直条形图*********************/
            chartVertical = function() {
                var chartcolorval = $("#" + idd).attr("chartbg");
                var chart_data = $("#" + idd).attr("chartdata");
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                var chartdatacolor = $("#" + idd).attr("chartdatacolor");
                var chart_time = $("#" + idd).attr("charttime");
                var charttimecolor = $("#" + idd).attr("charttimecolor");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var canvasDiv = "canvasDiv" + idd + "";
                var grid = label.length;
                $(".chartgrid" + idd).val(label.length);
                var chartvertical = new iChart.ColumnMulti2D({
                    render: canvasDiv,
                    data: date,
                    labels: label,
                    label: {
                        font: chartfontxy,
                        color: chartAnnotatedcolor,
                        fontsize: chartsizexy,
                        fontweight: 600,
                        textAlign: 'right',
                        textBaseline: 'middle',
                        rotate: -20
                    },
                    title: {
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        text: chart_title,
                        color: charttitlecolor
                    },
                    width: _width,
                    height: _height,
                    background_color: chartcolorval,
                    border: {
                        enable: false
                    },
                    legend: {
                        enable: chartshowlegendy,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        color: chartlegend,
                        background_color: null,
                        border: {
                            enable: false
                        }
                    },
                    offsetx: -30,
                    offsety: -10,
                    coordinate: {
                        scale: [{
                            position: 'left',
                            start_scale: start_axisY,
                            end_scale: end_axisY,
                            scale_space: axisY_space,
                            scale_width: 5,
                            scaleAlign: 'left',
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600
                            }
                        }],
                        width: _width - 180,
                        height: _height - 130,
                        grids: {
                            vertical: {
                                way: 'share_alike',
                                value: grid //栏数
                            }
                        },
                        gridVStyle: {
                            solid: false,
                            size: 5,
                            fator: 0.5
                        },
                        gridHStyle: {
                            solid: false,
                            size: 5,
                            fator: 0.5
                        }
                    }
                });
                chartvertical.plugin(new iChart.Custom({
                    drawFn: function() {
                        //计算位置
                        var coo = chartvertical.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                        //在左上侧的位置，渲染一个单位的文字
                        chartvertical.target.textAlign('start').textBaseline('bottom').textFont('600 ' + chartsizeXY + 'px ' + chartfontXY + '').fillText(chart_data, x, y - 5, false, chartdatacolor).textBaseline('top').fillText(chart_time, x + w + 10, y + h - 15, false, charttimecolor);
                    }
                }));
                //调用绘图方法开始绘图
                chartvertical.draw();
            };
            chartLevel = function() {
                var chartdatacolor = $("#" + idd).attr("chartdatacolor");
                var chart_data = $("#" + idd).attr("chartdata");
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                var chart_time = $("#" + idd).attr("charttime");
                var charttimecolor = $("#" + idd).attr("charttimecolor");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var chartcolorval = $("#" + idd).attr("chartbg");
                var canvasDiv = "canvasDiv" + idd + "";
                var grid = (end_axisY - start_axisY) / 10;
                $(".chartgrid" + idd).val(grid);
                var chartlevel = new iChart.BarMulti2D({
                    render: canvasDiv,
                    data: date,
                    labels: label,
                    label: {
                        font: chartfontxy,
                        color: chartAnnotatedcolor,
                        fontsize: chartsizexy,
                        fontweight: 600
                    },
                    title: {
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        text: chart_title,
                        color: charttitlecolor
                    },
                    width: _width,
                    height: _height,
                    background_color: chartcolorval,
                    border: {
                        enable: false
                    },
                    offsetx: -25,
                    legend: {
                        enable: chartshowlegendy,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        color: chartlegend,
                        background_color: null,
                        border: {
                            enable: false
                        }
                    },
                    coordinate: {
                        scale: [{
                            position: 'bottom',
                            start_scale: start_axisY,
                            end_scale: end_axisY,
                            scale_space: axisY_space,
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600,
                                textAlign: 'right',
                                textBaseline: 'middle',
                                rotate: -20
                            }
                        }],
                        background_color: null,
                        axis: {
                            width: 0
                        },
                        width: _width - 200,
                        height: _height - 120,
                        grids: {
                            vertical: {
                                way: 'share_alike',
                                value: grid //栏数
                            }
                        }
                    }
                });
                chartlevel.plugin(new iChart.Custom({
                    drawFn: function() {
                        //计算位置
                        var coo = chartlevel.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                        //在左上侧的位置，渲染一个单位的文字
                        chartlevel.target.textAlign('start').textBaseline('bottom').textFont('600 ' + chartsizeXY + 'px ' + chartfontXY + '').fillText(chart_time, x, y, false, chartdatacolor).textBaseline('top').fillText(chart_data, x + w + 15, y + h - 10, false, charttimecolor);
                    }
                }));
                chartlevel.draw();
            };
            chartPolyline = function() {
                var chartdatacolor = $("#" + idd).attr("chartdatacolor");
                var chart_data = $("#" + idd).attr("chartdata");
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                var chartcolorval = $("#" + idd).attr("chartbg");
                var chart_time = $("#" + idd).attr("charttime");
                var charttimecolor = $("#" + idd).attr("charttimecolor");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var grid = label.length - 1;
                $(".chartgrid" + idd).val(grid);
                var flow = [];
                for (var i = 0; i < 21; i++) {
                    flow.push(Math.floor(Math.random() * (30 + ((i % 12) * 5))) + 10);
                }
                var floww = [];
                for (var i = 0; i < 21; i++) {
                    floww.push(Math.floor(Math.random() * (30 + ((i % 12) * 5))) + 10);
                }
                data3 = [{
                    name: '西安',
                    value: flow,
                    color: '#0d8ecf',
                    line_width: 2
                },
                {
                    name: '北京',
                    value: floww,
                    color: '#ef7707',
                    line_width: 2
                }];
                var labels = ["2012-12-01", "2012-12-02", "2012-12-03", "2012-12-04", "2012-12-05", "2012-12-06"];
                var canvasDiv = "canvasDiv" + idd + "";
                var chartpolyline = new iChart.LineBasic2D({
                    render: canvasDiv,
                    data: date,
                    background_color: chartcolorval,
                    align: 'center',
                    title: {
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        text: chart_title,
                        color: charttitlecolor
                    },
                    //设置标题
                    width: _width,
                    height: _height,
                    border: {
                        enable: false
                    },
                    sub_option: {
                        smooth: true,
                        //平滑曲线
                        point_size: 8
                    },
                    tip: {
                        enable: true,
                        shadow: true,
                        listeners: {
                            //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
                            parseText: function(tip, name, value, text, i) {
                                return "<div style='width:130px;height:20px;text-align: center;line-height: 20px;'><span style='color:#005268;font-size:12px;'>" + name + ":&nbsp;</span><span style='color:#005268;font-size:16px;'>" + value + "</span></div>";
                            }
                        }
                    },
                    legend: {
                        enable: chartshowlegendy,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        color: chartlegend
                    },
                    crosshair: {
                        enable: true,
                        line_color: '#62bce9'
                    },
                    offsetx: -40,
                    offsety: -20,
                    coordinate: {
                        width: _width - 200,
                        valid_width: _width - 200,
                        height: _height - 130,
                        axis: {
                            color: '#9f9f9f',
                            width: [0, 0, 2, 2]
                        },
                        grids: {
                            vertical: {
                                way: 'share_alike',
                                value: grid //栏数
                            }
                        },
                        scale: [{
                            position: 'left',
                            start_scale: start_axisY,
                            end_scale: end_axisY,
                            scale_space: axisY_space,
                            scale_size: 2,
                            scale_color: '#9f9f9f',
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600
                            }
                        },
                        {
                            position: 'bottom',
                            labels: label,
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600,
                                textAlign: 'right',
                                textBaseline: 'middle',
                                rotate: -20
                            }
                        }]
                    }
                });
                chartpolyline.plugin(new iChart.Custom({
                    drawFn: function() {
                        //计算位置
                        var coo = chartpolyline.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                        //在左上侧的位置，渲染一个单位的文字
                        chartpolyline.target.textAlign('start').textBaseline('bottom').textFont('600 ' + chartsizeXY + 'px ' + chartfontXY + '').fillText(chart_data, x, y - 5, false, chartdatacolor).textBaseline('top').fillText(chart_time, x + w + 15, y + h - 10, false, charttimecolor);
                    }
                }));
                chartpolyline.draw();
            };
            chartCube = function() {
                var chartdatacolor = $("#" + idd).attr("chartdatacolor");
                var chart_data = $("#" + idd).attr("chartdata");
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                var chart_time = $("#" + idd).attr("charttime");
                var charttimecolor = $("#" + idd).attr("charttimecolor");
                data4 = [{
                    name: '普通高等教育本专科招生人数',
                    value: [321, 384, 447, 504, 546, 566, 608, 640, 662, 682],
                    color: '#de9972'
                },
                {
                    name: '各类中等职业教育招生人数',
                    value: [474, 516, 566, 656, 748, 810, 812, 869, 870, 809],
                    color: '#28847f'
                },
                {
                    name: '全国普通高中招生人数',
                    value: [677, 752, 822, 878, 871, 840, 837, 830, 836, 851],
                    color: '#90abc0'
                }];
                var chartcolorval = $("#" + idd).attr("chartbg");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var canvasDiv = "canvasDiv" + idd + "";
                var grid = (end_axisY - start_axisY) / 10;
                $(".chartgrid" + idd).val(grid);
                var chartcube = new iChart.ColumnMulti3D({
                    render: canvasDiv,
                    data: date,
                    labels: label,
                    title: {
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        text: chart_title,
                        color: charttitlecolor
                    },
                    width: _width,
                    height: _height,
                    background_color: chartcolorval,
                    border: {
                        enable: false
                    },
                    legend: {
                        enable: chartshowlegendy,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        background_color: null,
                        align: 'center',
                        valign: 'bottom',
                        color: chartlegend,
                        row: 1,
                        column: 'max',
                        border: {
                            enable: false
                        }
                    },
                    column_width: 8,
                    //柱形宽度
                    zScale: 8,
                    //z轴深度倍数
                    xAngle: 50,
                    bottom_scale: 1.1,
                    label: {
                        color: chartAnnotatedcolor,
                        font: chartfontxy,
                        fontsize: chartsizexy,
                        fontweight: 600,
                        textAlign: 'right',
                        textBaseline: 'middle',
                        rotate: -20
                    },
                    sub_option: {
                        label: false
                    },
                    tip: {
                        enable: true,
                        listeners: {
                            //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
                            parseText: function(tip, name, value, text, i) {
                                return "<div style='width:130px;height:20px;text-align: center;line-height: 20px;'><span style='color:#005268;font-size:12px;'>" + name + ":&nbsp;</span><span style='color:#005268;font-size:16px;'>" + value + "</span></div>";
                            }
                        }
                    },
                    text_space: 16,
                    //坐标系下方的label距离坐标系的距离。
                    offsetx: -20,
                    offsety: -20,
                    coordinate: {
                        background_color: '#d7d7d5',
                        grid_color: '#a4a4a2',
                        color_factor: 0.24,
                        board_deep: 10,
                        offsety: -10,
                        pedestal_height: 10,
                        left_board: false,
                        //取消左侧面板
                        width: _width - 120,
                        height: _height - 140,
                        scale: [{
                            position: 'left',
                            start_scale: start_axisY,
                            end_scale: end_axisY,
                            scale_space: axisY_space,
                            scale_enable: false,
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600
                            }
                        }]
                    }
                });
                //利用自定义组件构造左侧说明文本
                chartcube.plugin(new iChart.Custom({
                    drawFn: function() {
                        //计算位置
                        var coo = chartcube.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                        //在左上侧的位置，渲染一个单位的文字
                        chartcube.target.textAlign('start').textBaseline('bottom').textFont('600 ' + chartsizeXY + 'px ' + chartfontXY + '').fillText(chart_data, x + 18, y - 20, false, chartdatacolor).textBaseline('top').fillText(chart_time, x + w + 10, y + h, false, charttimecolor);
                    }
                }));
                chartcube.draw();
            };
            chartPie = function() {
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                data5 = [{
                    name: 'IE',
                    value: 35.75,
                    color: '#9d4a4a'
                },
                {
                    name: 'Chrome',
                    value: 29.84,
                    color: '#5d7f97'
                },
                {
                    name: 'Firefox',
                    value: 24.88,
                    color: '#97b3bc'
                },
                {
                    name: 'Safari',
                    value: 6.77,
                    color: '#a5aaaa'
                },
                {
                    name: 'Opera',
                    value: 2.02,
                    color: '#778088'
                },
                {
                    name: 'Other',
                    value: 0.73,
                    color: '#6f83a5'
                }];
                var chartcolorval = $("#" + idd).attr("chartbg");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var canvasDiv = "canvasDiv" + idd + "";
                $(".chartgrid" + idd).val("");
                var chartpie = new iChart.Pie2D({
                    render: canvasDiv,
                    data: date,
                    background_color: chartcolorval,
                    border: {
                        enable: false
                    },
                    title: {
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        text: chart_title,
                        color: charttitlecolor
                    },
                    offsetx: -20,
                    legend: {
                        enable: chartshowlegendy,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        color: chartlegend,
                        padding: 8
                    },
                    showpercent: true,
                    decimalsnum: 2,
                    width: _width,
                    height: _height,
                    radius: 140
                });
                chartpie.draw();
            };
            chart3Dpie = function() {
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                data6 = [{
                    name: 'WinXP',
                    value: 68.34,
                    color: '#3883bd'
                },
                {
                    name: 'Win7',
                    value: 26.83,
                    color: '#3F5C71'
                },
                {
                    name: 'Other',
                    value: 4.83,
                    color: '#a6bfd2'
                }];
                var chartcolorval = $("#" + idd).attr("chartbg");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var canvasDiv = "canvasDiv" + idd + "";
                $(".chartgrid" + idd).val("");
                var chart3dpie = new iChart.Pie3D({
                    render: canvasDiv,
                    title: {
                        text: chart_title,
                        color: charttitlecolor,
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        height: 40,
                        border: {
                            enable: true,
                            width: [0, 0, 2, 0],
                            color: '#343b3e'
                        }
                    },
                    padding: '2 10',
                    width: _width,
                    height: _height,
                    data: date,
                    background_color: chartcolorval,
                    border: {
                        enable: false
                    },
                    offsety: 10,
                    shadow: true,
                    shadow_color: '#15353a',
                    shadow_blur: 8,
                    gradient: true,
                    color_factor: 0.28,
                    gradient_mode: 'RadialGradientOutIn',
                    showpercent: true,
                    decimalsnum: 2,
                    legend: {
                        enable: chartshowlegendy,
                        padding: 10,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        color: chartlegend,
                        border: {
                            width: [0, 0, 0, 2],
                            color: '#343b3e'
                        },
                        background_color: null
                    },
                    sub_option: {
                        offsetx: -40,
                        border: {
                            enable: false
                        },
                        label: {
                            background_color: '#fefefe',
                            sign: false,
                            //设置禁用label的小图标
                            line_height: 10,
                            padding: 4,
                            border: {
                                enable: true,
                                radius: 4,
                                //圆角设置
                                color: '#458fc8'
                            },
                            fontsize: chartsizexy,
                            fontweight: 600,
                            color: '#444444'
                        }
                    }
                });
                chart3dpie.bound(0);
            };
            chartArea = function() {
                var chart_data = $("#" + idd).attr("chartdata");
                var chartdatacolor = $("#" + idd).attr("chartdatacolor");
                var chart_title = $("#" + idd).attr("charttitle");
                var charttitlecolor = $("#" + idd).attr("charttitlecolor");
                var chart_time = $("#" + idd).attr("charttime");
                var charttimecolor = $("#" + idd).attr("charttimecolor");
                data7 = [{
                    name: '上海',
                    value: [4, 16, 18, 20, 32, 36, 38, 38, 36, 26, 20, 14],
                    color: '#dad81f'
                },
                {
                    name: '北京',
                    value: [2, 12, 14, 20, 28, 32, 34, 36, 33, 24, 14, 4],
                    color: '#1f7e92'
                },
                {
                    name: '西安',
                    value: [1, 12, 18, 20, 28, 34, 36, 34, 31, 27, 24, 6],
                    color: '#76a871'
                },
                {
                    name: '天津',
                    value: [3, 13, 14, 20, 28, 32, 34, 36, 30, 24, 14, 4],
                    color: '#6f83a5'
                }];
                var labels = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                var chartcolorval = $("#" + idd).attr("chartbg");
                _width = parseInt($("#canvasDiv" + idd).css("width"));
                _height = parseInt($("#canvasDiv" + idd).css("height"));
                var canvasDiv = "canvasDiv" + idd + "";
                var grid = (end_axisY - start_axisY) / 10;
                $(".chartgrid" + idd).val(grid);
                var chartarea = new iChart.Area2D({
                    render: canvasDiv,
                    data: date,
                    title: {
                        font: chartfonttitle,
                        fontsize: chartsizetitle,
                        text: chart_title,
                        color: charttitlecolor
                    },
                    width: _width,
                    height: _height,
                    area_opacity: 0.15,
                    background_color: chartcolorval,
                    border: {
                        enable: false
                    },
                    tip: {
                        enable: true,
                        listeners: {
                            //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
                            parseText: function(tip, name, value, text, i) {
                                return "<div style='width:130px;height:20px;text-align: center;line-height: 20px;'><span style='color:#005268;font-size:12px;'>" + name + ":&nbsp;</span><span style='color:#005268;font-size:16px;'>" + value + "</span></div>";
                            }
                        }
                    },
                    sub_option: {
                        label: false
                    },
                    crosshair: {
                        enable: true,
                        line_color: '#62bce9'
                    },
                    legend: {
                        enable: chartshowlegendy,
                        font: chartannot,
                        fontsize: chartsizeannot,
                        color: chartlegend
                    },
                    offsety: -10,
                    offsetx: -40,
                    coordinate: {
                        axis: {
                            width: [0, 0, 2, 0]
                        },
                        background_color: '#ffffff',
                        width: '70%',
                        height: '70%',
                        valid_width: '94%',
                        scale2grid: false,
                        grids: {
                            horizontal: {
                                way: 'share_alike',
                                value: grid
                            }
                        },
                        scale: [{
                            position: 'left',
                            start_scale: start_axisY,
                            end_scale: end_axisY,
                            scale_space: axisY_space,
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600
                            },
                            listeners: {
                                parseText: function(t, x, y) {
                                    return {
                                        text: t
                                    }
                                    //return {text:t+"℃"}
                                }
                            }
                        },
                        {
                            position: 'bottom',
                            start_scale: 1,
                            end_scale: 12,
                            parseText: function(t, x, y) {
                                return {
                                    textY: y + 10
                                }
                            },
                            labels: label,
                            label: {
                                font: chartfontxy,
                                color: chartAnnotatedcolor,
                                fontsize: chartsizexy,
                                fontweight: 600,
                                textAlign: 'right',
                                textBaseline: 'middle',
                                rotate: -20
                            }
                        }]
                    }
                });
                chartarea.plugin(new iChart.Custom({
                    drawFn: function() {
                        //计算位置
                        var coo = chartarea.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                        //在左上侧的位置，渲染一个单位的文字
                        chartarea.target.textAlign('start').textBaseline('bottom').textFont('600 ' + chartsizeXY + 'px ' + chartfontXY + '').fillText(chart_data, x, y - 5, false, chartdatacolor).textBaseline('top').fillText(chart_time, x + w + 10, y + h - 15, false, charttimecolor);
                    }
                }));
                chartarea.draw();
            };
            chart_type = function() {
                if (chartsele == 1) {
                    chartVertical();
                }
                if (chartsele == 2) {
                    chartLevel();
                }
                if (chartsele == 3) {
                    chartPolyline();
                }
                if (chartsele == 4) {
                    chartCube();
                }
                if (chartsele == 5) {
                    chartPie();
                }
                if (chartsele == 6) {
                    chart3Dpie();
                }
                if (chartsele == 7) {
                    chartArea();
                }
            };
            date1 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date2 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date3 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date4 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date5 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date6 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date7 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];
            date8 = [{
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            },
            {
                name: '',
                value: [0, 0, 0, 0, 0, 0],
                color: ''
            }];

            if (inItWebMode.editMode == false) {
                var named = $("#" + idd).attr("variablename");
                var color = $("#" + idd).attr("datacolor");
                if (named) {
                    var datelen = $("#" + idd).attr("variablename").split(",").length + "";
                    switch (datelen) {
                    case "1":
                        date = date1;
                        break;
                    case "2":
                        date = date2;
                        break;
                    case "3":
                        date = date3;
                        break;
                    case "4":
                        date = date4;
                        break;
                    case "5":
                        date = date5;
                        break;
                    case "6":
                        date = date6;
                        break;
                    case "7":
                        date = date7;
                        break;
                    case "8":
                        date = date8;
                        break;
                    default:
                        false;
                    };
                    var dateleng = $("#" + idd).attr("variablename").split(",").length;
                    var charttimer = function() {
                        if (chartval.length === dateleng) {
                            chartvall = [];
                            chartvall = chartval;
                            /********数据值处理******/
                            if (chartkey) return;
                            for (var i = 0; i < datelen; i++) {
                                var dataname = named.split(",")[i];
                                var datacolor = color.split(",")[i];
                                var datavalue = parseFloat(chartval[i]);
                                date[i].name = dataname;
                                date[i].color = datacolor;
                                date[i].value.shift();
                                date[i].value.push(datavalue);
                            }
                            /*****横坐标数据*******/
                            var data = new Date();
                            var hour = data.getHours();
                            var minute = data.getMinutes();
                            var second = data.getSeconds();
                            label.shift();
                            label.push(hour + ":" + minute + ":" + second);
                            chart_type();
                            chartval = [];
                        } else {
                            if (chartkey) return;
                            for (var i = 0; i < datelen; i++) {
                                var dataname = named.split(",")[i];
                                var datacolor = color.split(",")[i];
                                var datavalued = parseFloat(chartvall[i]);
                                date[i].name = dataname;
                                date[i].color = datacolor;
                                date[i].value.shift();
                                date[i].value.push(datavalued);
                            }
                            /*****横坐标数据*******/
                            var data = new Date();
                            var hour = data.getHours();
                            var minute = data.getMinutes();
                            var second = data.getSeconds();
                            label.shift();
                            label.push(hour + ":" + minute + ":" + second);
                            chart_type();
                        }
                        chart_timer = setTimeout(charttimer, charttimeer * 1000);
                    };
                    charttimer();
                } else {
                    alert("存在未配置变量的图表控件！");
                    date = [{
                        name: '   ',
                        value: [0, 0, 0, 0, 0, 0],
                        color: '#aaa'
                    },
                    {
                        name: '   ',
                        value: [0, 0, 0, 0, 0, 0],
                        color: '#aaa'
                    },
                    {
                        name: '   ',
                        value: [0, 0, 0, 0, 0, 0],
                        color: '#aaa'
                    }];
                    chart_type();
                }
            } else {
                date = [{
                    name: '   ',
                    value: [0, 0, 0, 0, 0, 0],
                    color: '#aaa'
                },
                {
                    name: '   ',
                    value: [0, 0, 0, 0, 0, 0],
                    color: '#aaa'
                },
                {
                    name: '   ',
                    value: [0, 0, 0, 0, 0, 0],
                    color: '#aaa'
                }];
                chart_type();
            }
        });
        var fn = function() {
            if (inItWebMode.editMode == true) {
                chartval = [];
                chartvall = [];
                chartkey = true;
                clearTimeout(chart_timer);
            }
        }
        setTimeout(fn, 300);

    },
    /******按钮******/
    button: function() {
        $.each($("div[id^='Button']"),
        function() {
            if (inItWebMode.editMode == false) {
                var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                $(this).unbind("mouseover").bind("mouseover",
                function() {
                    var mousecolor = $("#" + idd).attr("mousecolor");
                    $("#button" + idd).css({
                        "cursor": "pointer",
                        'background-color': mousecolor,
                        "color": "#586c91",
                        "box-shadow": "0px 5px 2px #eef1f6"
                    });
                });
                $(this).unbind("mouseout").bind("mouseout",
                function() {
                    if ($("#button" + idd).attr("valued") != "transparent") {
                        var bgcolor = $("#" + idd).attr("bgcolor");
                        $("#button" + idd).css({
                            'background-color': bgcolor,
                            "color": $("#" + idd).attr("fontcolor"),
                            "box-shadow": "0px 5px 2px #89a1c0"
                        });

                    }
                    if ($("#button" + idd).attr("valued") == "transparent") {
                        $("#button" + idd).css({
                            'background-color': "#fff",
                            "color": $("#" + idd).attr("fontcolor"),
                            "box-shadow": "0px 5px 2px #89a1c0"
                        });
                    }
                });
                /**********点击交互操作********/
                $(this).unbind("mousedown").bind("mousedown",
                function() {
                    var variableType = $('#' + idd).attr('variableType');
                    if (inItWebMode.editMode == false) {
                        if (variableType) {
                            var btnval = $("#" + idd).attr("btnval");
                            if ($('#'+idd).attr('sure') === 'yes') {
                                inItSendModal.modelPage();
                                inItSendModal.modelFeature(btnval, idd);
                            } else {
                                inItSendModal.modelFeature1(btnval, idd);
                            }
                        } else {
                            alert('请配置变量！');
                        }
                    }
                });
            }
        });
    },
    /*******编辑框********/
    edit: function() {
        $.each($("div[id^='editaction0']"),
        function() {
            $(this).unbind("mouseover").bind("mouseover",
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).css({
                        "cursor": "text"
                    });
                }
            });
        });
        $.each($("button[id^='editaction1']"),
        function() {
            $(this).unbind("mouseover").bind("mouseover",
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).css({
                        "cursor": "pointer"
                    });
                }
            });
        });
        $.each($("button[id^='editaction2']"),
        function() {
            $(this).unbind("mouseover").bind("mouseover",
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).css({
                        "cursor": "pointer"
                    });
                }
            });
        });
        $.each($("input[id^='editInputValue']"),
        function() {
            $(this).unbind('keyup').bind('keyup',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr("id").split("-")[1];
                    var variableType = $('#' + idd).attr('variableType');
                    var minValue = $('#' + idd).attr('MinEuVal'); //允许输入的最小工程值
                    var maxValue = $('#' + idd).attr('MixEuVal'); //允许输入的最大工程值
                    var reg;
                    if (variableType) {
                        if (variableType === '开关量') { //配置的变量为‘开关量’
                            reg = /^[0-1]$/;
                            if (!reg.test($(this).val())) {
                                $(this).val('');
                            }
                        } else if (variableType === '整型量') { //配置的变量为‘开关量’
                            if (minValue && maxValue) {
                                $(this).attr('minlength', minValue.length);
                                $(this).attr('maxlength', maxValue.length);
                            }
                            reg = /^[0-9]*$/;
                            if (reg.test($(this).val())) {
                                if (! (parseInt($(this).val()) <= parseInt(maxValue) && parseInt($(this).val()) >= parseInt(minValue))) {
                                    alert('输入值不在范围内，请重新输入');
                                    $(this).val('');
                                }
                            } else {
                                $(this).val('');
                            }
                        } else if (variableType === '浮点量') { //配置的变量为‘浮点量’
                            reg = /^[0-9]+(.[0-9]*)?$/;
                            if (minValue && maxValue) {
                                if (reg.test($(this).val())) {
                                    if (! (parseFloat($(this).val()) <= parseFloat(maxValue) && parseFloat($(this).val()) >= parseFloat(minValue))) {
                                        alert('输入值不在范围内，请重新输入');
                                        $(this).val('');
                                    }
                                } else {
                                    $(this).val('');
                                }
                            }
                        } else if (variableType === '字符量') { //配置的变量为‘字符量’
                            //输入没有限制
                        }
                    } else {
                        alert('请配置变量！');
                        $(this).val('');
                    }
                }
            });
        });
        $.each($("button[id^='editaction1']"), function() {
	    	$(this).unbind("mousedown").bind("mousedown",function() {
	    		var idd = $(this).attr("id").split("-")[1];
	            if (inItWebMode.editMode == false) {
	                var variableType = $('#' + idd).attr('variableType');
	                if (variableType) {
	                    var editval = $(".editval" + idd).val();
	                    inItSendModal.modelPage();
	                    inItSendModal.modelFeature(editval, idd); 
	                } else {
	                    alert('请配置变量！');
	                }
	            }
	        });
		});
		$.each($("input[id^='editInputValue']"), function() {
			var idd = $(this).attr("id").split("-")[1];
			$(document).keydown(function(event){
			 	if(event.keyCode ==13){
			 	var aa =  $("#editInputValue-" + idd).is(":focus");
				if(aa===true){
						if (inItWebMode.editMode == false ) {
				    		var variableType = $('#' + idd).attr('variableType');
			                if (variableType) {
			                    var editval = $(".editval" + idd).val();
			                    inItSendModal.modelPage();
			                    inItSendModal.modelFeature(editval, idd);
			                } else {
			                    alert('请配置变量！');
			                }
			            }
					}
				   event.preventDefault ? event.preventDefault() : event.returnValue = false; 
			  	}
			});
		});   
		    
		   
        $.each($("button[id^='editaction2']"),
        function() {
            $(this).unbind("mousedown").bind("mousedown",
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr("id").split("-")[1];
                    $("#editInputValue-" + idd).val("");
                }
            });
        })
    },
    /********组合控件********/
    combo: function() {
        $.each($("img[id^='btn']"),
        function() {
            var idd = $(this).attr("id").split("-")[1];
            var comboSelect = {
                comboBtn: function() { //控件列表元素显示隐藏的切换
                    var comboBtnImg = $(".combobtnimg" + idd);
                    var combo_chooseItems = $("#combo_chooseItems" + idd);
                    var len;
                    comboBtnImg.unbind("mousedown").bind("mousedown",
                    function(e) {
                        if (inItWebMode.editMode == false) {
                            e.stopPropagation();
                            len = combo_chooseItems.children(".combo_chooseItem").length;
                            if (len != 0) {
                                if (combo_chooseItems.children(".combo_chooseItem").is(":visible")) {
                                    combo_chooseItems.slideUp(300);
                                    $("#" + idd).css("z-index", 1);
                                } else {
                                    combo_chooseItems.slideDown(300);
                                    $("#" + idd).css("z-index", 100);
                                }
                            } else {
                                return false;
                            }
                        }
                    })
                },
                hideChooseItems: function() { //隐藏控件的列表元素
                    $("#bgDiv").bind("click",
                    function() {
                        var combo_chooseItems = $(".combo_chooseItems");
                        combo_chooseItems.slideUp(300);
                    });
                },
                chooseItem: function() { //在控件中显示当前列表元素
                    $("#combo_chooseItems" + idd).off("mousedown").on("mousedown", ".combo_chooseItem",
                    function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var divhtml = $(this);
                        var displayMember;
                        var valueMember;
                        divhtml.attr("chooseed","chooseed").siblings(".combo_chooseItem").removeAttr("chooseed");
                        displayMember = divhtml.attr("displayMember");
                        valueMember = divhtml.attr("valueMember");
                        var attrs = $(this).parent().attr("answer");
                        var parent = $("#"+attrs+idd).find("span");
                        parent.attr("displayMember",displayMember);
                        parent.attr("valueMember",valueMember);
                        parent.text(valueMember);
                        parent.change();
                        if ($('#'+idd).attr('sendButton') == 'no') {
                            inItSendModal.modelPage();
                            inItSendModal.modelFeature(displayMember, idd);
                        }
                        $(this).parent().slideUp(300);
                    });
                },
                init: function() {
                    this.comboBtn();
                    this.hideChooseItems();
                    this.chooseItem();
                }
            };
            comboSelect.init();
            $(".combosend" + idd).unbind("mousedown").bind("mousedown",
            function() {
                if (inItWebMode.editMode == false) {
                    var variableType = $('#' + idd).attr('variableType');
                    if (variableType) {
                        var comboval = $("#comboselect" + idd + " span").attr("displaymember");
                        inItSendModal.modelPage();
                        inItSendModal.modelFeature(comboval, idd);
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        });
    },
    /********单选框控件**********/
    radio: function() {
        $.each($("div[id^='radioSelectOption']"),
        function() {
            var _this = $(this);
            _this.children('.radioDom').unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode === false) {
                    var checkedOptionValue;
                    var idd = _this.attr('id').split('-')[1];
                    if ($(this).children('label').attr('checked') === 'checked') {
                        $(this).children('label').removeAttr('checked');
                        $(this).children('label').children('img').attr('src', 'images/unchecked_radio.png');
                        $('#' + idd).removeAttr('checkedOptionValue');
                    } else {
                        $(this).children('label').attr('checked', 'checked');
                        $(this).children('label').children('img').attr('src', 'images/checked_radio.png');
                        $(this).siblings('.radioDom').children('label').removeAttr('checked');
                        $(this).siblings('.radioDom').children('label').children('img').attr('src', 'images/unchecked_radio.png');
                        checkedOptionValue = $(this).attr('title');
                        $('#' + idd).attr('checkedOptionValue', checkedOptionValue);
                    }
                }
            });
        });
        //发送已选选项
        $.each($("img[id^='radioSend']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode === false) {
                    var idd = $(this).attr('id').split('-')[1];
                    var variableType = $('#' + idd).attr('variableType');
                    if (variableType) {
                        var value = $('#' + idd).attr('checkedOptionValue');
                        if (value) {
                            if ($('#'+idd).attr('sure') == 'yes') {
                                inItSendModal.modelPage();
                                inItSendModal.modelFeature(value, idd);
                            } else {
                                inItSendModal.modelFeature1(value, idd);
                            }
                        } else {
                            alert("请选择下发值！");
                        }
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        });
    },
    /********复选框控件**********/
    checkbox: function() {
        $.each($("div[id^='checkboxSelectOption']"),
        function() {
            var _this = $(this);
            var checkedOptionValue = [];
            var timeIntervals = [];
            _this.children('.checkBoxche').unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode === false) {
                    var idd = _this.attr('id').split('-')[1];
                    if ($(this).children('label').attr('checked') === 'checked') {
                        $(this).children('label').removeAttr('checked');
                        $(this).children('label').children('img').attr('src', 'images/unchecked_checkbox.png');
                        for (var i = 0; i < checkedOptionValue.length; i++) {
                            if ($(this).attr('title') === checkedOptionValue[i] && $(this).attr('timeInterval') === timeIntervals[i]) {
                                checkedOptionValue.splice(i, 1);
                                timeIntervals.splice(i, 1);
                            }
                        }
                    } else {
                        $(this).children('label').attr('checked', 'checked');
                        $(this).children('label').children('img').attr('src', 'images/checked_checkbox.png');
                        checkedOptionValue.push($(this).attr('title'));
                        timeIntervals.push($(this).attr('timeInterval'));
                    }
                    var value = checkedOptionValue.join(',');
                    var timer = timeIntervals.join(',');
                    $('#' + idd).attr({
                        'checkedOptionValue': value,
                        'timeInterval': timer
                    });
                }
            });
        });
        //发送已选选项
        $.each($("img[id^='checkboxSend']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode === false) {
                    var idd = $(this).attr('id').split('-')[1];
                    var variableType = $('#' + idd).attr('variableType');
                    if (variableType) {
                        var value = $('#' + idd).attr('checkedOptionValue'); //存放已选择选项的数据项值，多个用逗号隔开
                        var timer = $('#' + idd).attr('timeInterval'); //存放已选择选项的时间间隔，多个用逗号隔开
                        if (value && timer && value.indexOf(',') === -1 && timer.indexOf(',') === -1) { //选择了1个选项
                            setTimeout(function() {
                                if ($('#'+idd).attr('sure') == 'yes') {
                                    inItSendModal.modelPage();
                                    inItSendModal.modelFeature(value, idd);
                                } else {
                                    inItSendModal.modelFeature1(value, idd);
                                }
                            }, timer * 1000);
                        } else if (value && timer && value.indexOf(',') > -1 && timer.indexOf(',') > -1) { //选择了至少2个选项
                            value = value.split(',');
                            timer = timer.split(',');
                            var isClick = true; //用于复选按钮，监控命令发送模态框【发送】按钮是否被点击
                            var tempTimer = null; //临时定时器，用于判定是否已点击【发送】
                            var checkedMore = function() { //处理复选选择了2个及2个以上选项
                                if ($('#'+idd).attr('sure') == 'yes') { //有【命令发送】模态框，等待用户确认是否发送命令
                                    inItSendModal.modelPage();
                                    inItSendModal.modelFeature(value[0], idd, isClick);
                                    var num = 0;
                                    tempTimer = setInterval(function() {
                                        if ($('#'+idd).attr('isClick') == 'ok') { //【命令发送】模态框执行过【发送】命令
                                            clearInterval(tempTimer);
                                            num = 1;
                                        } else if ($('#'+idd).attr('isClick') == 'cancel'){ //【命令发送】模态框第一个选择项已取消，则其他选项也不再发送，数据发送终止
                                            clearInterval(tempTimer);
                                            $('#'+idd).removeAttr('isClick');
                                            return false;
                                        } else {
                                        }
                                        if (num === 1) { //第一个选择项已发送，开始按照时间间隔发送其余已选项
                                            //$('#'+idd).removeAttr('isClick');
                                            var i = 0; //用于计数每一个选项的时间间隔
                                            var j = 1; //用于计数是第几个选项
                                            var count = 0;
                                            var length = timer.length; //去掉第一个已选项的
                                            var timeout = setInterval(function() {
                                                i++;
                                                if (j == 1) {
                                                    count = parseInt(timer[j]);
                                                }
                                                if (i == count) {
                                                    j = j + 1;
                                                    if (j < length){
                                                        count = count + parseInt(timer[j]) ;
                                                        inItSendModal.modelFeature1(value[j - 1], idd);
                                                    } else if (j == length) {
                                                        inItSendModal.modelFeature1(value[j - 1], idd);
                                                        clearInterval(timeout);
                                                        return;
                                                    }
                                                }
                                            }, 1000);
                                        }
                                    }, 1000);
                                } else { //无【命令发送】模态框，直接按时间间隔发送
                                    var i = 0; //用于计数每一个选项的时间间隔
                                    var j = 0; //用于计数是第几个选项
                                    var count = 0;
                                    var length = timer.length; //去掉第一个已选项的
                                    var timeout = setInterval(function() {
                                        i++;
                                        if (j == 0) {
                                            count = parseInt(timer[j]);
                                        }
                                        if (i == count) {
                                            j = j + 1;
                                            if (j < length){
                                                count = count + parseInt(timer[j]) ;
                                                inItSendModal.modelFeature1(value[j - 1], idd);
                                            } else if (j == length) {
                                                inItSendModal.modelFeature1(value[j - 1], idd);
                                                clearInterval(timeout);
                                                return;
                                            }
                                        }
                                    }, 1000);
                                }
                            };
                            setTimeout(checkedMore, timer[0] * 1000); //发送第一个已选选项
                        } else { //未选择任何选项
                            return;
                        }
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        });
    },
    /*==========仪表===========*/
    dial: function() {
        $.each($("div[id^='Dial']"),
        function() {
            var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
            function fn1() {
                dial1();
            };
            function fn2() {
                dial2();
            };
            function fn3() {
                dial3();
            };
            function fn4() {
                dial4();
            };
            function fn5() {
                dial5();
            };
            function fncount() {
                if ($("#" + idd).attr("deg") == "deg90") {
                    fn2();
                };
                if ($("#" + idd).attr("deg") == "deg120") {
                    fn4();
                };
                if ($("#" + idd).attr("deg") == "deg180") {
                    fn1();
                };
                if ($("#" + idd).attr("deg") == "deg240") {
                    fn3();
                };
                if ($("#" + idd).attr("deg") == "deg360") {
                    fn5();
                };
            };
            var height1 = $("#main" + idd).height();
            var width1 = $("#main" + idd).width();
            $("#main" + idd).css({
                'height': 300,
                'width': 300
            });
            fncount();
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
                        min: 0,
                        max: 360,
                        startAngle: 90,
                        endAngle: -269.9,
                        splitNumber: 12,
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
                        splitLine: {
                            // 分隔线
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
                option.series[0].data[0].value = 0;
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
                        min: 0,
                        max: 180,
                        startAngle: 180,
                        endAngle: 0,
                        splitNumber: 6,
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
                option.series[0].data[0].value = 0;
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
                        min: 0,
                        max: 240,
                        startAngle: 210,
                        endAngle: -30,
                        splitNumber: 8,
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
                option.series[0].data[0].value = 0;
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
                        min: 0,
                        max: 120,
                        startAngle: 150,
                        endAngle: 30,
                        splitNumber: 4,
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
                option.series[0].data[0].value = 0;
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
                        min: 0,
                        max: 90,
                        startAngle: 180,
                        endAngle: 90,
                        splitNumber: 3,
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
                option.series[0].data[0].value = 0;
                myChart.setOption(option, true);
            };
        });
    },
    /********开关控件**********/
    switch: function() {
        $.each($("div[id^='SwitchImage']"),
        function() {
            var literacy = $(this).attr('literacy'); //literacy='on' 开关读写类型；literacy='off' 开关显示类型
            //开、关状态切换
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode === false && literacy === 'off') {
                    var idd = $(this).attr('id').split('-')[1];
                    var variableType = $('#' + idd).attr('variableType');
                    if (variableType) {
                        inItSendModal.modalPages();
                        inItSendModal.modelFeature("0,1", idd);
                    } else {
                        alert('请配置变量！');
                    }
                }
            });
        });
    },
    /*========文本控件=========*/
    text: function() {
        $.each($("div[id^='Text']"),
        function() {
            $(this).unbind("click").bind("click",
            function() {
                var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                var typed = $("#" + idd).attr("variabletype");
                var type = $("#" + idd).attr("literacytext");
                if (inItWebMode.editMode == false) {
                    if (type == "literacy2") {
                    	if(!typed){
                    		alert("请配置变量！");
                    	}else{
                    		inItSendModal.modalPagetext();
                       		inItSendModal.modeltextFeature(idd);
                    	}
                    }
                } else {
                    alert("请配置变量！");
                }
            });
        });
    },
    /********实时报警控件**********/
    realTimeAlarm: function() {
        $.each($("div[id^='RealTime']"),
        function() {
            var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
            var initNodeStyle = function() { //初始化
                setInterval(function() {
                    var alarmHeader = $('#' + idd).find('.realTimeAlarm_showMsg');
                    var dataTable = $('#' + idd).find('.alarmDataShowBox');
                    var percent = parseInt($('#' + idd).height() - alarmHeader) / $('#' + idd).height(); //告警信息占控件高度的比例
                    var alarmDataHeight = parseInt(dataTable.children('ul').length) * parseInt(dataTable.children('ul').height()); //存在告警信息时告警信息的总高度（总个数*每行高度）
                    if (parseInt(dataTable.height() - 10) < alarmDataHeight) {
                        dataTable.height((percent * 100) + '%');
                        $('.alarmHeader' + idd).css({
                            'width': 'calc(100% - 17px)',
                            'float': 'left'
                        });
                        return false;
                    } else {
                        dataTable.css('overflow-y', 'auto');
                        $('.alarmHeader' + idd).css({
                            'width': 100 + '%'
                        });
                    }
                },
                100);
            };
            initNodeStyle();
        });
        //仅限未确认告警
        $.each($("img[id^='unconfirmAlarm']"),
        function() {
            var isConfirm = true;
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode === false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if (isConfirm) {
                        $('#' + idd).attr('unconfirmed', 'unconfirmed');
                        $('.unconfirmed' + idd).attr('src', 'images/option_checked.png');
                    } else {
                        $('#' + idd).removeAttr('unconfirmed');
                        $('.unconfirmed' + idd).removeAttr('selected');
                        $('.unconfirmed' + idd).attr('src', 'images/option_unchecked.png');
                    }
                    isConfirm = !isConfirm;
                    postSendMsg(isConfirm, idd);
                }
            });
        });
        //优先级的选择
        $.each($("select[id^='alarmPriority']"),
        function() {
            $(this).unbind('change').bind('change',
            function() {
                if (inItWebMode.editMode === false) {
                    var idd = $(this).attr('id').split('-')[1];
						var listdate = $("#"+idd).find('#dataShowBox'+idd);
		                var length = listdate.children("ul").length;
		                var chartsele = $(this).children('option:selected').val();
		                if (chartsele === "全部") {
		                    $("#"+idd).attr("priorityLeveladd",chartsele);
		                    if(length !=0){
		                        listdate.children("ul").remove();
		                    }
		                }
		                if (chartsele === "紧急") {
		                    $("#"+idd).attr("priorityLeveladd",chartsele);
		                    if(length !=0){
		                        listdate.children("ul").remove();
		                    }
		                }
		                if (chartsele === "高") {
		                    $("#"+idd).attr("priorityLeveladd",chartsele);
		                    if(length !=0){
		                        listdate.children("ul").remove();
		                    }
		                }
		                if (chartsele === "低") {
		                    $("#"+idd).attr("priorityLeveladd",chartsele);
		                    if(length !=0){
		                        listdate.children("ul").remove();
		                    }
		                }
                    }
                });
            });
        //区域的选择
        $.each($("select[id^='alarmArea']"),
        function() {
            $(this).unbind('change').bind('change',
            function() {
                if (inItWebMode.editMode === false) {
                    var idd = $(this).attr('id').split('-')[1];
                    var _this = $(this);
                    var options = $('#alarmArea-' + idd).children('option');
                    var selectedArea;
                    options.each(function() {
                        if (_this.val() === $(this).val()) {
                            alert('已选择的区域是：' + $(this).val());
                            selectedArea = $(this).val()
                        }
                    });
                    postSendMsg(selectedArea, idd);
                }
            });
        });
    },
    /*********历史报警*************/
    alarm: function() {
        $.each($("div[id^='Alarm']"),
        function() {
            if (inItWebMode.editMode == false) {
                var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                $("#myDate_start" + idd).unbind("mouseover").bind("mouseover",
                function() {
                    $(".search1" + idd).css("display", "none");
                    $(this).css("cursor", "pointer");
                });
                $("#myDate_start" + idd).unbind("mouseout").bind("mouseout",
                function() {
                    $(".search1" + idd).css("display", "block");
                    $(this).blur();
                });
                $("#myDate_end" + idd).unbind("mouseover").bind("mouseover",
                function() {
                    $(".search2" + idd).css("display", "none");
                    $(this).css("cursor", "pointer");
                });
                $("#myDate_end" + idd).unbind("mouseout").bind("mouseout",
                function() {
                    $(".search2" + idd).css("display", "block");
                    $(this).blur();
                });
                var inIt = function() {
                    var o = $(".alarmDataList" + idd);
                    var dataO = o.find(".showData" + idd);
                    var ListHeaderNote = $(".ListHeaderNote" + idd);
                    setInterval(function() {
                        var ControlEleH = $("#" + idd).height();
                        var alarmDataListH = ControlEleH - 62;
                        if (parseInt(dataO.height()) > parseInt(o.height())) {
                            dataO.css("overflow-y", "scroll");
                        } else {
                            dataO.css("overflow-y", "auto");
                            $('.alarmDataList' + idd).css({
                                'width': "100%"
                            });
                        }
                        ListHeaderNote.parent(".alarmNote").width(parseInt(dataO.children("ul").width()) + "px");
                    },
                    200);
                };
                inIt();
                var starttime;
                var endtime;
                var limittime;
                $("#myDate_start" + idd).unbind("change").bind("change",
                function() {
                    if (endtime) {
                        starttime = $(this).val();
                        var start = new Date(starttime);
                        var end = new Date(endtime);
                        limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                        if (limittime >= 0) {
                            if (limittime > 30) {
                                alert("只能查看30天以内的信息！");
                                $(this).val("");
                            }
                        } else {
                            alert("起始时间必须早于结束时间！");
                            $(this).val("");
                        }
                    } else {
                        starttime = $(this).val();
                    }
                });
                $("#myDate_end" + idd).unbind("change").bind("change",
                function() {
                    if (starttime) {
                        endtime = $(this).val();
                        var start = new Date(starttime);
                        var end = new Date(endtime);
                        limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                        if (limittime >= 0) {
                            if (limittime > 30) {
                                alert("只能查看30天以内的信息！");
                                $(this).val("");
                            }
                        } else {
                            alert("结束时间必须晚于起始时间！");
                            $(this).val("");
                        }
                    } else {
                        endtime = $(this).val();
                    }
                });
                $(".search3" + idd).unbind("mousedown").bind("mousedown",
                function() {
                    if (starttime && endtime) {
                        $("#" + idd).find('.showData' + idd).children("ul").remove();
                        Websocket.send(sendGetAlarmData(starttime, endtime));
                    } else {
                        alert("请选择起止时间！");
                    }
                });
                /*********优先级筛选*********/
                $('.alarm_6' + idd).change(function() {
                    var listdate = $("#" + idd).find('.showData' + idd);
                    var length = listdate.children("ul").length;
                    var chartsele = $(this).children('option:selected').val();
                    if (chartsele === "全部") {
                        $("#" + idd).attr("priority", chartsele);
                        if (starttime && endtime && length != 0) {
                            listdate.children("ul").remove();
                            Websocket.send(sendGetAlarmData(starttime, endtime));
                        }
                    }
                    if (chartsele === "高") {
                        $("#" + idd).attr("priority", chartsele);
                        if (starttime && endtime && length != 0) {
                            listdate.children("ul").remove();
                            Websocket.send(sendGetAlarmData(starttime, endtime));
                        }
                    }
                    if (chartsele === "中") {
                        $("#" + idd).attr("priority", chartsele);
                        if (starttime && endtime && length != 0) {
                            listdate.children("ul").remove();
                            Websocket.send(sendGetAlarmData(starttime, endtime));
                        }
                    }
                    if (chartsele === "低") {
                        $("#" + idd).attr("priority", chartsele);
                        if (starttime && endtime && length != 0) {
                            listdate.children("ul").remove();
                            Websocket.send(sendGetAlarmData(starttime, endtime));
                        }
                    }
                });

            }
        });
    },
    /******历史事件****/
    history: function() {
        $.each($("div[id^='History']"),
        function() {
            if (inItWebMode.editMode == false) {
                var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                $("#myDate_start" + idd).unbind("mouseover").bind("mouseover",
                function() {
                    $(".search1" + idd).css("display", "none");
                    $(this).css("cursor", "pointer");
                });
                $("#myDate_start" + idd).unbind("mouseout").bind("mouseout",
                function() {
                    $(".search1" + idd).css("display", "block");
                    $(this).blur();
                });
                $("#myDate_end" + idd).unbind("mouseover").bind("mouseover",
                function() {
                    $(".search2" + idd).css("display", "none");
                    $(this).css("cursor", "pointer");
                });
                $("#myDate_end" + idd).unbind("mouseout").bind("mouseout",
                function() {
                    $(".search2" + idd).css("display", "block");
                    $(this).blur();
                });
                var inIt = function() {
                    var o = $(".alarmDataList" + idd);
                    var dataO = o.find(".showData" + idd);
                    var ListHeaderNote = $(".ListHeaderNote" + idd);
                    setInterval(function() {
                        var headMsgEleHeight = $("#" + idd).find(".historyEvent_showMsg").height();
                        var dataShowBoxEle = $("#" + idd).find(".historyEvent_dataShowBox");
                        var height = parseInt($("#" + idd).height() - headMsgEleHeight) / $("#" + idd).height();
                        var dataHeight = parseInt(dataShowBoxEle.children("ul").length) * parseInt(dataShowBoxEle.children("ul").height());
                        if (parseInt(dataShowBoxEle.height()) < dataHeight) {
                            dataShowBoxEle.height((height * 100) + '%');
                            $('.history_headerList' + idd).css({
                                'width': 'calc(100% - 17px)',
                                'float': 'left'
                            });
                            return false;
                        } else {
                            dataShowBoxEle.css("overflow-y", "auto");
                            $('.history_headerList' + idd).css({
                                'width': 100 + '%'
                            });
                        }
                    },
                    200);
                };
                inIt();
                var starttime;
                var endtime;
                var limittime;
                $("#myDate_start" + idd).unbind("change").bind("change",
                function() {
                    if (endtime) {
                        starttime = $(this).val();
                        var start = new Date(starttime);
                        var end = new Date(endtime);
                        limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                        if (limittime >= 0) {
                            if (limittime > 30) {
                                alert("只能查看30天以内的信息！");
                                $(this).val("");
                            }
                        } else {
                            alert("起始时间必须早于结束时间！");
                            $(this).val("");
                        }
                    } else {
                        starttime = $(this).val();
                    }
                });
                $("#myDate_end" + idd).unbind("change").bind("change",
                function() {
                    if (starttime) {
                        endtime = $(this).val();
                        var start = new Date(starttime);
                        var end = new Date(endtime);
                        limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                        if (limittime >= 0) {
                            if (limittime > 30) {
                                alert("只能查看30天以内的信息！");
                                $(this).val("");
                            }
                        } else {
                            alert("结束时间必须晚于起始时间！");
                            $(this).val("");
                        }
                    } else {
                        endtime = $(this).val();
                    }
                });
                $(".search3" + idd).unbind("mousedown").bind("mousedown",
                function() {
                    if (starttime && endtime) {
                        $("#" + idd).find('#dataShowBox' + idd).children("ul").remove();
                        Websocket.send(sendGetEventData(starttime, endtime));
                    } else {
                        alert("请选择起止时间！");
                    }
                });
            }
        });
    },
    /******视频控件****/
    video: function() {
        $.each($("div[id^='Video']"),
        function() {
            if (inItWebMode.editMode == false) {
                var idd = $(this).attr('id').split('_')[0] + '_' + $(this).attr('id').split('_')[1];
                //解密函数，对加密后的用户名和密码进行解密
                var unCompile = function(str) {
                    str = unescape(str);
                    var c = String.fromCharCode(str.charCodeAt(0) - str.length);
                    for (var i = 1; i < str.length; i++) {
                        c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
                    }
                    return c;
                };
                var szIP = $('#' + idd).attr('ip');
                var szPort = $('#' + idd).attr('port');
                var szUsername = $('#' + idd).attr('username');
                var szPassword = $('#' + idd).attr('password');
                var cameraBrand = $('#' + idd).attr('cameraBrand'); //摄像头厂商
                var cameraName = $('#' + idd).attr('cameraName'); //摄像头位置名称
                var init1 = function() {
                    var oPlugin = {
                        width: $('.windowArea' + idd).width(),
                        height: $('.windowArea' + idd).height()
                    };
                    var oLiveView = {
                        iProtocol: 1,
                        // protocol 1：http, 2:https
                        szIP: szIP,
                        // protocol ip
                        szPort: szPort,
                        // protocol port
                        szUsername: unCompile(szUsername),
                        // device username
                        szPassword: unCompile(szPassword),
                        // device password
                        iStreamType: 1,
                        // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
                        iChannelID: 1,
                        // channel no
                        bZeroChannel: false // zero channel
                    };
                    //setTimeout(function() {
                        //检查插件是否已经安装过
                        var iRet = WebVideoCtrl.I_CheckPluginInstall();
                        if ( - 2 == iRet) {
                            //alert("您的Chrome浏览器版本过高，不支持NPAPI插件！");
                            return;
                        } else if ( - 1 == iRet) {
                            //alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
                            return;
                        }
                        //初始化插件参数
                        WebVideoCtrl.I_InitPlugin(oPlugin.width, oPlugin.height, {
                            bWndFull: false,
                            //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
                            iWndowType: 1,
                            cbSelWnd: function(xmlDoc) {}
                        });
                        //插入插件
                        WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin' + idd);
                        var embedElement = $('#divPlugin' + idd).find('embed');
                        embedElement.attr({
                            'width': '100%',
                            'height': '100%'
                        });
                        //登录设备
                        WebVideoCtrl.I_Login(oLiveView.szIP, oLiveView.iProtocol, oLiveView.szPort, oLiveView.szUsername, oLiveView.szPassword, {
                            success: function(xmlDoc) {
                                console.log('------登录成功！--------');
                                WebVideoCtrl.I_StartRealPlay(oLiveView.szIP, {
                                    iStreamType: oLiveView.iStreamType,
                                    iChannelID: oLiveView.iChannelID,
                                    bZeroChannel: oLiveView.bZeroChannel
                                });
                            },
                            error: function() {
                                console.log('------登录失败！---------');
                            }
                        });
                    //},
                    //200);
                };
                var init2 = function() {
                    var ocxElement = document.getElementById('playOcx' + idd);
                    //创建插件接口分发对象
                    var plugin = ocxElement.CreatePlugin();
                    var oLiveView = {
                        pchDeviceIP: '172.12.2.169',
                        // 远程设备IP
                        nSvrPort: 80,
                        // 三代协议交互端口
                        pchUsrName: 'admin',
                        // 登录用户名
                        pchUsrPassWord: 'admin',
                        // 登录密码
                        nRtspPort: 80 // Rtsp协议数据传输端口
                    };
                    //登录设备
                    var loginResult = plugin.LoginDevice(oLiveView.pchDeviceIP, oLiveView.nSvrPort, oLiveView.pchUsrName, oLiveView.pchUsrPassWord, oLiveView.nRtspPort);
                    if (loginResult == 0) {
                        console.log('登录成功!');
                    } else {
                        console.log('登录失败！');
                    }
                    //播放视频
                    var nChannelID = 0; //通道号
                    var nStreamType = 0; //码流类型 0--主码流
                    var nProtocolType = 0; //流数据传输类型 0--TCP；1--UDP
                    var connectionResult = plugin.ConnectRealVideo(nChannelID, nStreamType, nProtocolType);
                    if (connectionResult == true) {
                        console.log('视频播放设置成功！');
                    } else {
                        console.log('视频播放设置失败！');
                    }
                };
                function clickEvent() {
                    var parseParam = function(param, key) {
                        var paramStr = '';
                        if (param instanceof String || param instanceof Number || param instanceof Boolean) {
                            paramStr += '&' + key + '=' + encodeURIComponent(param);
                        } else {
                            $.each(param,
                            function(i) {
                                var k = key == null ? i: key + (param instanceof Array ? '[' + i + ']': '.' + i);
                                paramStr += '&' + parseParam(this, k);
                            });
                        }
                        return paramStr.substr(1);
                    };
                    var parameter = {
                        szIP: szIP,
                        szPort: szPort,
                        szUn: szUsername,
                        szPs: szPassword,
                        cameraBrand: cameraBrand,
                        cameraName: cameraName
                    };
                    var queryStr = parseParam(parameter);
                    var currentLeft = parseInt($('#' + idd).css('left')); //预览状态下视频热点在页面上的left值
                    var currentTop = parseInt($('#' + idd).css('top')); //预览状态下视频热点在页面上的top值
                    var clientWidth = document.documentElement.clientWidth / 2; //当前页面可见宽度的一半
                    var clientHeight = document.documentElement.clientHeight / 2; //当前页面可见高度的一半
                    var left = 0;
                    var top = 0;
                    var multiple1 = parseInt(clientWidth / currentLeft);
                    var multiple2 = parseInt(currentLeft / clientWidth);
                    if (currentLeft < clientWidth && currentTop < clientHeight) { //控件在左上角
                        if (multiple1 == 1 || multiple1 == 2) {
                            left = (clientWidth + currentLeft) / 2;
                        } else {
                            left = (clientWidth - currentLeft) / 2;
                        }
                        top = 20;
                    } else if (currentLeft > clientWidth && currentTop < clientHeight) { //控件在右上角
                        if (multiple2 == 1 || multiple2 == 2) {
                            left = (currentLeft + clientWidth) / 2;
                        } else {
                            left = (currentLeft - clientWidth) / 2;
                        }
                        top = 20;
                    } else if (currentLeft < clientWidth && currentTop > clientHeight) { //控件在左下角
                        if (multiple1 == 1 || multiple1 == 2) {
                            left = (clientWidth + currentLeft) / 2;
                        } else {
                            left = (clientWidth - currentLeft) / 2;
                        }
                        top = clientHeight - 20;
                    } else if (currentLeft > clientWidth && currentTop > clientHeight) { //控件在右下角
                        if (multiple2 == 1 || multiple2 == 2) {
                            left = (currentLeft + clientWidth) / 2;
                        } else {
                            left = (currentLeft - clientWidth) / 2;
                        }
                        top = clientHeight - 20;
                    }
                    window.open('SingleVideoPage.html?' + queryStr, '_blank', 'left=' + left + ',top=' + top + ',width=400,height=300');
                }
                if (szIP && szPort && szUsername && szPassword && cameraBrand && cameraName) {
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        if ($('#' + idd).attr('type') == 'windowDisplay') {
                            init1();
                        } else { //展示成热点，点击弹出新窗口，接入视频画面
                            var clickObj = document.getElementById(idd);
                            clickObj.onclick = clickEvent;
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {
                        init2();
                    }
                } else {
                    alert('IP地址、端口、用户名、密码、摄像头厂商和名称位置均不能为空，请在编辑状态下输入！');
                }
            }
        });
        //云台上、下、左、右方向控制
        var g_bPTZAuto = false;
        var iPTZIndex; //上、下、左、右依次为1、2、3、4
        var iPTZSpeed = 3; //默认云台速度为3
        $.each($("div[id^='cloudUp']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        iPTZIndex = 1;
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
                                iPTZSpeed: iPTZSpeed,
                                success: function() {
                                    //console.log('开启云台↑方向成功！');
                                },
                                error: function() {
                                    //console.log('开启云台↑方向失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
            $(this).unbind('mouseup').bind('mouseup',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(1, true, {
                                success: function() {
                                    //console.log('停止云台方向转动成功！');
                                },
                                error: function() {
                                    //console.log('停止云台方向转动失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
        });
        $.each($("div[id^='cloudDown']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        iPTZIndex = 2;
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
                                iPTZSpeed: iPTZSpeed,
                                success: function() {
                                    //console.log('开启云台↓方向成功！');
                                },
                                error: function() {
                                    //console.log('开启云台↓方向成功！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
            $(this).unbind('mouseup').bind('mouseup',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(1, true, {
                                success: function() {
                                    //console.log('停止云台方向转动成功！');
                                },
                                error: function() {
                                    //console.log('停止云台方向转动失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
        });
        $.each($("div[id^='cloudLeft']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        iPTZIndex = 3;
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
                                iPTZSpeed: iPTZSpeed,
                                success: function() {
                                    //console.log('开启云台←方向成功！');
                                },
                                error: function() {
                                    //console.log('开启云台←方向失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
            $(this).unbind('mouseup').bind('mouseup',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(1, true, {
                                success: function() {
                                    //console.log('停止云台方向转动成功！');
                                },
                                error: function() {
                                    //console.log('停止云台方向转动失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
        });
        $.each($("div[id^='cloudRight']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        iPTZIndex = 4;
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(iPTZIndex, false, {
                                iPTZSpeed: iPTZSpeed,
                                success: function() {
                                    //console.log('开启云台→方向成功！');
                                },
                                error: function() {
                                    //console.log('开启云台→方向失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
            $(this).unbind('mouseup').bind('mouseup',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        if (oWndInfo != null) {
                            WebVideoCtrl.I_PTZControl(1, true, {
                                success: function() {
                                    //console.log('停止云台方向转动成功！');
                                },
                                error: function() {
                                    //console.log('停止云台方向转动失败！');
                                }
                            });
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {

                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
        });
        //抓图
        $.each($("img[id^='capturePic']"),
        function() {
            var szPicName;
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    var clickSetLocalCfg = function() {
                        var arrXml = [];
                        var szInfo = '';
                        arrXml.push('<LocalConfigInfo>');
                        arrXml.push('<CapturePath>' + $('#' + idd).attr('dirPath') + '</CapturePath>');
                        arrXml.push('<CaptureFileFormat>' + $('#' + idd).attr('imageType') + '</CaptureFileFormat>');
                        arrXml.push('</LocalConfigInfo>');
                        var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(''));
                        if (0 == iRet) {
                            console.log("本地配置设置成功！");
                        } else {
                            console.log("本地配置设置失败！");
                        }
                    };
                    //以当前时间为抓拍图片命名
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    var second = date.getSeconds();
                    var millisecond = date.getMilliseconds();
                    if (year < 10) {
                        year = '0' + year;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }
                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (hour < 10) {
                        hour = '0' + hour;
                    }
                    if (minute < 10) {
                        minute = '0' + minute;
                    }
                    if (second < 10) {
                        second = '0' + second;
                    }
                    if (millisecond < 10) {
                        millisecond = '00' + millisecond;
                    } else if (millisecond >= 10 && millisecond < 100) {
                        millisecond = '0' + millisecond;
                    }
                    szPicName = $('#' + idd).attr('ip') + '_' + year + month + day + hour + minute + second + millisecond;
                    //调用抓图接口
                    if ($('#' + idd).attr('cameraBrand') == '海康威视') {
                        //调用抓图接口
                        clickSetLocalCfg();
                        var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
                        var iRet;
                        if (oWndInfo != null) {
                            iRet = WebVideoCtrl.I_CapturePic(szPicName);
                        }
                        if (iRet == 0) {
                            console.log('抓图成功！');
                        } else {
                            console.log('抓图失败！');
                        }
                    } else if ($('#' + idd).attr('cameraBrand') == '大华') {
                        var imageType = $('#' + idd).attr('imageType');
                        var nFormat = (imageType == '0') ? 0 : 1; //保存格式，0--存储格式为jpg/JEPG; 1--存储格式为bmp
                        var pchPath = $('#' + idd).attr('dirPath');
                        var pchName = szPicName + '.' + imageType;
                        var bOpen = false; //如果为true，图片抓取成功后会用工具打开图片
                        var crabPic = plugin.CrabOnePicture(nFormat, pchPath, pchName, bOpen);
                        if (crabPic == 0) {
                            console.log('抓图成功！')
                        } else {
                            console.log('抓图失败！')
                        }
                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                }
            });
        });
        //全屏展示
        $.each($("img[id^='fullScreen']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    var element = document.getElementById(idd);
                    var requestFullScreen = function(element) {
                        //判断浏览器
                        var requestMethod = element.requestFullScreen || // W3C
                        element.webkitRequestFullScreen || // Chrome等
                        element.mozRequestFullScreen || // FireFox
                        element.msRequestFullScreen; // IE
                        if (typeof requestMethod != 'undefined' && requestMethod) {
                            requestMethod.call(element);
                        } else if (typeof window.ActiveXObject != 'undefined') { //for Internet Explorer
                            var wscript = new ActiveXObject('WScript.Shell');
                            if (wscript != null) {
                                wscript.SendKeys("{F11");
                            }
                        }
                    };
                    requestFullScreen(element);
                }
            });
        });
        //退出全屏
        $.each($("img[id^='exitFullScreen']"),
        function() {
            $(this).unbind('mousedown').bind('mousedown',
            function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('-')[1];
                    var element = document.getElementById(idd);
                    var requestExitFullScreen = function(element) {
                        // 判断浏览器
                        var exitMethod = document.exitFullscreen || // W3C
                        document.webkitExitFullscreen || // Chrome等
                        document.mozCancelFullScreen || // FireFox
                        document.msExitFullscreen; // IE11
                        if (exitMethod) {
                            exitMethod.call(document);
                        } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
                            var wscript = new ActiveXObject("WScript.Shell");
                            if (wscript !== null) {
                                wscript.SendKeys("{F11}");
                            }
                        }
                    };
                    requestExitFullScreen(element);
                }
            });
        });
        //改变鼠标mouseover/mouseout时样式
        $.each($("div[id^='cloudUp']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'none');
                    $(this).css({
                        'background-image': 'url(images/cloudUp.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%',
                        'cursor': 'pointer'
                    });
                }
            });
        });
        $.each($("div[id^='cloudUp']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'block');
                    $(this).css({
                        'background-image': ''
                    });
                }
            });
        });
        $.each($("div[id^='cloudDown']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'none');
                    $(this).css({
                        'background-image': 'url(images/cloudDown.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%',
                        'cursor': 'pointer'
                    });
                }
            });
        });
        $.each($("div[id^='cloudDown']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'block');
                    $(this).css({
                        'background-image': ''
                    });
                }
            });
        });
        $.each($("div[id^='cloudLeft']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'none');
                    $(this).css({
                        'background-image': 'url(images/cloudLeft.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%',
                        'cursor': 'pointer'
                    });
                }
            });
        });
        $.each($("div[id^='cloudLeft']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'block');
                    $(this).css({
                        'background-image': ''
                    });
                }
            });
        });
        $.each($("div[id^='cloudRight']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'none');
                    $(this).css({
                        'background-image': 'url(images/cloudRight.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%',
                        'cursor': 'pointer'
                    });
                }
            });
        });
        $.each($("div[id^='cloudRight']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).children('div').css('display', 'block');
                    $(this).css({
                        'background-image': ''
                    });
                }
            });
        });
        $.each($("img[id^='capturePic']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).attr('src', 'images/capturePic_hover.png');
                }
            });
        });
        $.each($("img[id^='capturePic']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).attr('src', 'images/capturePic.png');
                }
            });
        });
        $.each($("img[id^='fullScreen']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).attr('src', 'images/fullScreen_hover.png');
                }
            });
        });
        $.each($("img[id^='fullScreen']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).attr('src', 'images/fullScreen.png');
                }
            });
        });
        $.each($("img[id^='exitFullScreen']"),
        function() {
            $(this).unbind('mouseover').bind('mouseover',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).attr('src', 'images/exitFullScreen_hover.png');
                }
            });
        });
        $.each($("img[id^='exitFullScreen']"),
        function() {
            $(this).unbind('mouseout').bind('mouseout',
            function() {
                if (inItWebMode.editMode == false) {
                    $(this).attr('src', 'images/exitFullScreen.png');
                }
            });
        });
    },
    //通信测试控件
    communicate: function() {
        $.each($("b[id^='login']"),
        function() {
            $(this).unbind('click').bind('click',
            function() {
                if (inItWebMode.editMode == false) {
                    var obj = $(this).parents(".contrl");
                    var userName = obj.find(".useName").val();
                    var passWord = obj.find(".password").val();
                    Websocket.send(loginSendData(userName, passWord));
                    obj.hide();
                };
            });
        })
    },
	//场景组态控件
	scene:function(){
		$(function() {
			$("div[class^='navBox']").on("click","a",function(){//打开超链接
				if($(this).attr("src") != undefined){
					var src = $(this).attr("src");
					$("#right",parent.document.body).attr("src", src);
				}
			});
		});
    	$("#navBox").off("mousedown").on("mousedown","img",function(event){ //导航收缩
    		event.stopPropagation();
    		if($(this).attr("class") == "angleImg"){
    			if($("#navBox").find(".newUl").is(":visible")){
    				$("#navBox").find(".newUl").hide();
    				$("#navBox").find(".newSunUl").hide();
    				$("#navBox").find(".parentUl").show();
    				$(this).hide();
    			}else{
    				if($("#navBox").find(".newSunUl").is(":visible")){
    					$("#navBox").find(".newUl").show();
    					$("#navBox").find(".newSunUl").hide();
    					$("#navBox").find(".parentUl").hide();
    					$(this).show();
    				}else{
    					$("#navBox").find(".parentUl").show();
    					$("#navBox").find(".newSunUl").hide();
    					$("#navBox").find(".newUl").hide();
    					$(this).hide();
    				}
    			}
    			
    		}else{
    			var list = {};
    			var span = $(this).parent("span");
    			var type = span.children("a").attr("navType");
    			if(type == 'single' || type == undefined){
    				span.next("ul").slideToggle(300);	
    			}else{
    				if($(".newSpan").length < 1){
    					var navBox = $("#navBox")
    					pHtml = $(this).parent("span").html();
    					spanHtml = $("<img src='images/out.png' class='angleImg' /><span class='newSpan overHidden displayblock'>"+pHtml+"</span>");
    					spanHtml.appendTo($("#navBox"));
    					var creatHtml = $("<ul class='newUl'></lu>");
    					creatHtml.appendTo($("#navBox"));
    					navBox.find("ul:first").hide();
    					var i = 0;
    					span.next("ul").children("li").each(function(){
    						var Ptxt = $(this).children("span").children("a").text();
    						var psrc =  $(this).children("span").children("a").attr("src");
    						var creatLi = $("<li><a class='newLi' src='"+ psrc +"'>"+Ptxt+"</a></li>");
    						creatLi.appendTo($(".newUl"));
    						var _this = $(this);
    						i++;
    						var attr = "sun"+i
    						list[attr] = [];
    						if(_this.children("ul").length >= 1){
    							_this.children("ul").children("li").each(function(){
    								var stxt = $(this).find("a").text();
    								var ssrc = $(this).find("a").attr("src");
    								 arr = {
    										"txt":$(this).find("a").text(),
    										"src":$(this).find("a").attr("src")
    									}
    								list[attr].push(arr);
    							})
    						}
    						
    					})
    					$("#navBox").on("click",".newLi",function(){
    						var indx = $(this).index() + 1;
    							sun = "sun"+indx;
    						if(list[sun].length >= 1){
    							$(this).parent("li").parent("ul").prev("span").children("a").text($(this).text());
    							$(this).parent("li").parent("ul").hide();
    							var creatHtml = $("<ul class='newSunUl'></lu>");
    							creatHtml.appendTo($("#navBox"));
    							$.each(list[sun],function(i){
    								var creatLi = $("<li><a class='newSunLi' src='"+list[sun][i]["src"]+"'>"+list[sun][i]["txt"]+"</a></li>");
    								creatLi.appendTo($(".newSunUl"));
    							})
    						}
    					})
    				}else{
    					 if($("#navBox").find(".parentUl:visible")){
    						$("#navBox").find(".newUl").show();
    						$("#navBox").find(".parentUl").hide();
    						$("#navBox").find(".newSunUl").hide();
    						$(".angleImg").show();
    					} 
    				}
    			}
    		}
    	});


	},
	inIt:function(){
		this.minor();
		this.sliderBar();
		this.button();
		this.edit();
		this.combo();
		this.radio();
		this.dial();
		this.checkbox();
		this.switch();
		this.text();
		this.realTimeAlarm();
		this.alarm();
		this.history();
		this.video();
		//this.communicate();
		this.scene();
	}
};
action.inIt();
/*********图表数据等待处理*********/
var keyed = true;
var intervla = function() {
    $.each($("div[id^='Chart']"),
    function() {
        var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
        var leng = chartval.length + "";
        var chartlen = $("#" + idd).attr("variablename").split(",").length + "";
        if (chartlen === leng) {
            if (keyed == true) {
                action.chart();
                keyed = false;
            }
        }
    })
};
var gofn = function() {
    if (inItWebMode.editMode == false) {
        $.each($("div[id^='Chart']"),
        function() {
            var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
            var len = $("#" + idd).attr("variablename");
            if (len) {
                setInterval(intervla, 500);
            } else {
                action.chart();
            }
        })
    } else {
        action.chart();
    }
};
setTimeout(gofn, 500);

/***********添加模板*********/
var addtemplate = function() {
    if (inItWebMode.editMode == false) {
        $.each($("div[id^='Scene']"),
        function() {
            $(this).siblings("div.contrl").remove();
            $("#header").remove();
            $("#area").remove();
            $("#bgDiv").remove();
            var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
            var tempdom = $('<div id="header">' + '<iframe id="top" frameborder="0" scrolling="no" src="login.html" name="top"></iframe>' + '</div>' + '<div id="area">' + '<iframe id="right" frameborder="1" scrolling="yes" src="right.html" name="right"></iframe>' + '</div>');
            $("body").append(tempdom);
            var scenew = $("#" + idd).width() + 2;
            $("body").css({
                "position": "static",
                "overflow": "hidden"
            });
            $("#" + idd).css({
                "position": "absolute",
                "top": 59 + "px",
                "left": 0,
                "height": "100%"
            });
            $("#area", parent.document.body).css({
                "position": "absolute",
                "left": scenew-2,
                "top": 59 + "px",
                "height": "calc(100% - 59px)",
                "width": "calc(100% - " + scenew + "px)"
            });
        var rightFrame = $('#right', window.parent.document).contents().find(".rightFrame");
        rightFrame.height($("area").height());
        });
    }
};
window.onload = function() {
    addtemplate();
};
setTimeout(function() {
    if (inItWebMode.editMode == true) {
        $("#header").remove();
        $("#area").remove();
    }
},
300);
	
$(function(){
	//通信测试控件
    communicate=function(){
        $.each($("img[id^='login']"),
        function() {
            $(this).unbind('click').bind('click',
            function() {
                if (inItWebMode.editMode == false) {
                    var obj = $(this).parents(".contrl");
                    var user = obj.find(".useName").val();
                    var pass = obj.find(".password").val();
					if(pass != '' && user != ''){
						Websocket.send(loginSendData(user, pass));
						obj.hide();
					}else{
						alert("亲：密码或用户名不能为空！");
					}  
                };
            });
        })
    }();
})

//关闭页面时的接口
var closeHtml = function(){
		var CommunicateObj = $("div[id ^= 'Communicate'");
	var len = CommunicateObj.length;
	if(len >= 1){
		Websocket.send(logoutSendData());
		CommunicateObj.each(function(){
			$(this).remove();
		})
	}
}

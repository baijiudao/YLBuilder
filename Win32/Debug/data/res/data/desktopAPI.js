//外部接口
// 参数val：disable/enable;
function setWebEditMode(val){
    inItWebMode.setEditMode(val);
};
//setWebEditMode('disable');
//改变title名 参数val：字符串
function setWebTitle(val){ //参数val：字符串
    $("title").text(val);
}
//setWebTitle("yLibuilder");
//增加控件
function addControl(val,x,y){ //addControl('text',0,0);
    if(inItWebMode.editMode == true){
        switch(val){
            case 'text':
                inItTextControl.createTextControl(x,y);
                var textLog = inTtCommand.createLog();
                webapi.addLog('create',textLog);
                break;
            case 'progress':
                inItProControl.createProgressBarContrl(x,y);
                var progressLog = inTtCommand.createLog();
                webapi.addLog('create',progressLog);
				break;
            case 'button':
                inItButtonControl.createButtonContrl(x,y);
                var buttonLog = inTtCommand.createLog();
                webapi.addLog('create',buttonLog);
                break;
            case 'minor':
                inItMinorControl.createMinorAdjustmentContrl(x,y);
                var minorLog = inTtCommand.createLog();
                webapi.addLog('create',minorLog);
                break;
            case 'switch':
                inItSwitchControl.createSwitchControl(x,y);
                var switchLog = inTtCommand.createLog();
                webapi.addLog('create',switchLog);
                break;
            case 'scene':
                inItSceneControl.createSceneControl(x,y);
                var sceneLog = inTtCommand.createLog();
                webapi.addLog('create',sceneLog);
                break;
            case 'edit':
                inItEditControl.createEditBoxControl(x,y);
                var editLog = inTtCommand.createLog();
                webapi.addLog('create',editLog);
                break;
            case 'list':
                inItListControl.createListBoxControl(x,y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'checkbox':
                inItCheckBoxControl.createCheckBoxControl(x,y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'combo':
                inItComboBoxControl.createComboBoxControl(x,y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'fill':
               inItFillControl.createFillControl(x,y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'radio':
                inItRadioControl.createRadioControl(x, y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'straight':
                inItStraightControl.createStraightControl(x, y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'rotate':
                inItRotateControl.createRotateControl(x, y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'slidebar':
                inItSlideBarControl.createSlideBarControl(x, y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'chart':
                inItChartControl.createChartControl(x, y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'history':
                inItHistoryEventControl.createHistoryEventControl(x, y);
                var historyLog = inTtCommand.createLog();
                webapi.addLog('create',historyLog);
                break;
            case 'status':
                inItStatusControl.createStatusControl(x, y);
                var listchLog = inTtCommand.createLog();
                webapi.addLog('create',listchLog);
                break;
            case 'dial':
               inItDialControl.createDialControl(x,y);
               var listchLog = inTtCommand.createLog();
               webapi.addLog('create',listchLog);
               break;
            case 'alarm':
                inItHistoryAlarmControl.createHistoryAlarmControl(x, y);
                var alarmLog = inTtCommand.createLog();
                webapi.addLog('create',alarmLog);
                break;
            case 'realTimeAlarm':
                inItRealTimeAlarmControl.createRealTimeAlarmControl(x, y);
                var alarmLog = inTtCommand.createLog();
                webapi.addLog('create',alarmLog);
                break;
            case 'elevator':
                inItElevatorControl.createElevatorControl(x, y);
                var alarmLog = inTtCommand.createLog();
                webapi.addLog('create',alarmLog);
                break;
            case 'video':
                inItVideoControl.createVideoControl(x, y);
				var alarmLog = inTtCommand.createLog();
                webapi.addLog('create',alarmLog);
                break;
            case 'communicate':
                inItCommunicateControl.createcommunicateTestControl(x, y);
				var alarmLog = inTtCommand.createLog();
                webapi.addLog('create',alarmLog);
                break;
            default:false;
        }
    }else{
        return false;
    }
}

//删除控件 //deleteElenments();
var deleteElenments = function(){
    inItDelete.deleteElement(selecteId);
};

//对齐控件 参数为str：alignTop/alignLeft/alignRight/alignBottom;align('alignTop')
var align = function(val){
    var alignments = new AlignEvents(selecteId);
    switch(val){
        case 'alignTop':
            alignments.alignTop();
            break;
        case 'alignLeft':
            alignments.alignLeft();
            break;
        case 'alignRight':
            alignments.alignRight();
            break;
        case 'alignBottom':
            alignments.alignBottom();
            break;
        case 'vertical':
            alignments.vertic();
            break;
        case 'horizontal':
            alignments.horizont();
            break;
        default:false;
    }
};
/********画布大小设置接口***********/
//画布大小设置接口 参数x为的宽，y为的高，且都为数字类型；setCanvasSise(700,700);
var setCanvasSise = function(x,y){
	inItSetSize.setSize(x,y);
};
//设置相对路径
var setRelativePath = function(){
    var relativePath = 'images';
    return relativePath;
};
//插入背景 参数url：路径； setCanvasBg('F:/SvnCode/Web/Code_New/images/1-1.png');
var setCanvasBg = function(url){
	inItSetSize.setBg(url);
};
//插入图片 参数url：路径；setCanvasPic('F:/SvnCode/Web/Code_New/images/menjing_spec.png');
var setCanvasPic = function(url){
    inItPicControl.createPicture(url);
};
//读取本地图片接口
var setPictrue = function(url) {
    var type = selecteId[0].split("_")[0];
    var idd = selecteId[0];
    switch (type){
        case 'Switch':
            $("#"+selecteId[0]).children("div:first-child").css({
                "background":"url("+url+") center center no-repeat",
                "background-size":"100% 100%"
            });
            if ($('#'+idd).attr('switch') === 'open') {
                $('#switchFileTxtElement_0'+idd).val(url);
                $('#'+idd).attr('openImageUrl', url);
                $('#SwitchImage-'+idd).attr('switchStatus', 'on');
            } else if ($('#'+idd).attr('switch') === 'close') {
                $('#switchFileTxtElement_1'+idd).val(url);
                $('#'+idd).attr('closeImageUrl', url);
                $('#SwitchImage-'+idd).attr('switchStatus', 'off');
            }
            break;
        case 'Status':
            var statusCount = parseInt($('.count'+idd).val());
            if (statusCount === 0) {
                $("#"+idd).children("div:first-child").css({
                    "background":"url("+url+") center center no-repeat",
                    "background-size":"100% 100%"
                });
            }
            $("#statusFileText"+idd).val(url);
            $('#'+idd).attr('imageUrl', url);
            break;
        case 'Line':
            $("#"+idd).children('#line').css({
                "background":"url("+url+") center center no-repeat",
                "background-size":"100% 100%"
            });
            $("#straightFileTxtElement_0"+idd).val(url);
            $('#'+idd).attr('lineurl', url);
            break;
        case 'Rotate':
            $("#"+idd).children("div.rotate").css({
                "background":"url("+url+") center center no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).children("div.rotatechild").css({
                "background-image":"none"
            });
            $("#rotateFileTxtElement_0"+idd).val(url);
            $('#'+idd).attr('lineurl', url);
            $(".rotate1"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate2"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate3"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            break;
        default:false;
    }
};
//读取本地文件夹路径接口
var setVideoPath = function(url) {
    var type = selecteId[0].split("_")[0];
    var idd = selecteId[0];
    switch (type) {
        case 'Video':
            var arr = url.split('/');
            url = arr.join('\\'); //后台接口setVideoPath()返回的URL是用'/'隔开，需要的是'\'隔开
            $('#videofileText'+idd).val(url);
            $('#'+idd).attr('dirPath', url);
            break;
        default:
            break;
    }
};
var setJsonInfo = function(url,jsonStr){ //参数：url：路径、jsonStr：json型字符串
	var cfg = $('<div class="hide parents"><img src="images/close.png" /><div>'+url+'</div></div>');
	var variableCfgO = $("#variableCfg");
	var jsonO = JSON.parse(jsonStr);
	navHtml = jsonO;
	var oSunsys = jsonO["Subsys"];
	var urlT = $("#inputUrl");
	urlT.val(url);
	cfg.appendTo(variableCfgO);
	$.each(oSunsys,function(k){
		var system = $('<div class="systems hide" id="systems'+k+'">'+
		   '<img class="systemsPic font_attr" src="images/open.png" />'+
		   '<div class="systemsTxt font_attr" >'+oSunsys[k]["Name"]+'</div>'+
		   '</div>');
		system.appendTo(variableCfgO);
		$.each(oSunsys[k]["Device"],function(v){
			var deviceO = $('<div class="device hide" id="device'+k+v+'">'+
				'<img class="devicePic font_attr" src="images/open.png" />'+
				'<div class="deviceTxt font_attr" >'+oSunsys[k]["Device"][v]["Name"]+'</div>'+
				'</div>');
			deviceO.appendTo($("#systems"+k));
			$.each(oSunsys[k]["Device"][v]["Tag"],function(g){
				var variableO = $('<div class="variable hide" id="variable'+k+v+g+'">'+
					'<img class="variablePic font_attr" src="images/bar2.gif" />'+
					'<div class="variableTxt font_attr" ' +
					'DataType='+oSunsys[k]["Device"][v]["Tag"][g]["DataType"]+' ' +
					'DataComment='+oSunsys[k]["Device"][v]["Tag"][g]["DataComment"]+'' +
					' Name='+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'>'+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'</div>'+
					'</div>');
				variableO.appendTo($("#device"+k+v));
				$.each(oSunsys[k]["Device"][v]["Tag"][g]["ID"],function(){
					var SubsystemID='',DeviceID='',TagID='',id;
					SubsystemID = oSunsys[k]["Device"][v]["Tag"][g]["ID"]["SubsystemID"].toString(16);
					if(SubsystemID.length < 2){
						SubsystemID = "0"+SubsystemID;
					}else{
						SubsystemID = SubsystemID;
					}
					DeviceID = oSunsys[k]["Device"][v]["Tag"][g]["ID"]["DeviceID"].toString(16);
					if(DeviceID.length < 2){
						DeviceID = "0"+DeviceID;
					}else{
						DeviceID = DeviceID;
					}
					TagID =  oSunsys[k]["Device"][v]["Tag"][g]["ID"]["TagID"].toString(16);
					switch (TagID.length){
						case 1:
							TagID = "000"+TagID;
							break;
						case 2:
							TagID = "00"+TagID;
							break;
						case 3:
							TagID = "0"+TagID;
							break;
						case 4:
							TagID = TagID;
							break;
						default:false;
					}
					id = SubsystemID+DeviceID+TagID;
					$("#variable"+k+v+g).children("div").attr("id",id);
				});
				$.each(oSunsys[k]["Device"][v]["Tag"][g]["EnConvAnalog"],function(){
					var MinEuVal='',MaxEuVal='';
					MinEuVal = String(oSunsys[k]["Device"][v]["Tag"][g]["EnConvAnalog"]["MinEuVal"]);
					MaxEuVal = String(oSunsys[k]["Device"][v]["Tag"][g]["EnConvAnalog"]["MaxEuVal"]);
					$("#variable"+k+v+g).children("div").attr({"MinEuVal":MinEuVal,"MaxEuVal":MaxEuVal});
				})
			})
		})
	}); 
};
var setPath = function(url){
		$("#navBox").find("a").each(function(){
			if($(this).attr("addChildrenNode") == "addChildrenNode" && $(this).parent("span").next("ul").length <= 0){
				$(this).attr({"src":url,"hasConectHtml":"hasConectHtml"});
				$(".srcTxt").val(url);
			}
		});
};
/************获取画布大小*******************/
var getCanvasSise = function(){ //getCanvasSise();
    return inItSetSize.getSize();
};
//全选 setSelectAll();
var setSelectAll = function(){
    selectAll();
};
/*******进度条演示********/
var progressrun = function(type){//  参数type为字符串类型，type为“go”,表示启动，type为“stop”表示停止。
    runing.run(type);
};
//复制  copy();
var copy = function(){
    inItCopyControl = new copyControl();
    copyy = true;
};

//粘贴  paste();
var paste = function(){
    if(copyy == true){
        var copyIds = inItCopyControl.copyControlElement;
        pasteControl(copyIds);
    }
};

//等宽、等高、等大小；参数val：width/height/size SetSameSize('width');
var SetSameSize = function(val){
    identical(val);
};

//等距；参数val:水平：horizontal / 垂直：vertical；SetEquidistant('horizontal')
var SetEquidistant = function(val){
    Equidistant(val)
};

//恢复日志，用于undo，redo
var restoreLog = function(type,val){
    //alert(val);
    //val返回的log
    //1.判断log为htmlStr或自定义logStr（如果为HTMLStr移除现有的，生成元素，如果为自定义进一步处理）
    var removeNull = function(arr){ //去掉空元素；参数：数组；
        for(var i=0;i<arr.length;i++){
            if(arr[i] == ''){
                arr.splice(i,1);
            }
        }
        return arr;
    };
    if(val != ""){
        if(val[0] == "<"){
            var strVal = val.split("***");
            strVal.pop();
            var arr = removeNull(strVal);
            var len = arr.length;
            inItPropertiesPage.removePropertiesPage();
            for(var i=0;i<len;i++){
                $("#"+$(arr[i]).attr("id")).remove();
                $("#content").append($(arr[i]));
                $("#"+$(arr[i]).attr("id")).css("z-index","2").removeClass("boder").children(".hiden").remove();
            }
        }
        else{
            if(val.length > 40){
                var strVal = val.split("***");
                strVal.pop();
                var arr = removeNull(strVal);
                for(var i=0;i<arr.length;i++){
                    var str = arr[i].split("&&&");
                    if(type == "Undo" ){
                        var temp = [];
                        temp.push(str[1]);
                        $("#"+str[1]).remove();
                    }else{
                        var tempDIv = str[2];
                        $("#content").append($(str[2]));
                        $("#"+$(tempDIv)[0].id).css("z-index","2").removeClass("boder").children(".hiden").remove();
                    }
                }
            }else{
                var strVal = val.split("***");
                strVal.pop();
                var arr = removeNull(strVal);
                for (var i = 0; i < arr.length; i++) {
                    $("#"+arr[i]).remove();
                }
            }
        }

    }
    selecteId = [];
};

window.onload = function() {
    new QWebChannel(qt.webChannelTransport, function(channel) {
        var webedit = channel.objects.webedit;
        //webedit.addLog(string strTense, string strLog);//strTense:状态，before,now; strLog:log日志
        webapi.webUndo = webedit.webShortcutUndo;
        webapi.webRedo = webedit.webShortcutRedo;
        webapi.addLog = webedit.addLog;
        webapi.getImagePath = webedit.getImagePath;
        webapi.getVideoPath = webedit.getVideoPath;
        webapi.getJsonPath = webedit.getJsonPath;
        webapi.setRelativePath = webedit.setRelativePath;
        webapi.getPath = webedit.getPath;
        //webapi.restoreLog.connect(webedit.abc);
        //output("Connected to WebChannel, ready to send/receive messages!");
        //webedit.webShortcutUndo();//撤销操作接口
        //webedit.webShortcutRedo();//重做操作接口
        webedit.restoreLog.connect(restoreLog);
    });

};
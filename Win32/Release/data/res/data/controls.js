var mouse = false;
var moused = false;
var rotate = false;
//粘贴
var pasteControl = function(copyId){
    var tempSelecteId = [];
    var len = copyId.length;
    var scroltop = document.body.scrollTop;
    var scrolleft = document.body.scrollLeft;
    var isFocus=$("input").is(":focus");
    if(len > 0 && inItWebMode.editMode == true && isFocus == false){
        inItSetCtrStyle.removeResize(copyId);
        for(var i=0;i<len;i++){
            var typeid = copyId[i].split("_")[0];
            switch(typeid){
                case 'Text':
                    var getDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getDatas.Y) + 50 -scroltop);
                    inItTextControl.createTextControl(x,y);
                    inItTextControl.copy(copyId[i],inItTextControl.id);
                    tempSelecteId.push(inItTextControl.id);
                    break;
                case 'Progress':
                    var getproDatas = getContrlStyle(copyId[i]);
                    var xx = parseInt(parseInt(getproDatas.X) + 50 - scrolleft);
                    var yy = parseInt(parseInt(getproDatas.Y) + 50 -scroltop);
                    inItProControl.createProgressBarContrl(xx,yy);
                    inItProControl.copy(copyId[i],inItProControl.id);
                    tempSelecteId.push(inItProControl.id);
                    break;
                case 'Button':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var xb = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var yb = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItButtonControl.createButtonContrl(xb,yb);
                    inItButtonControl.copy(copyId[i],inItButtonControl.id);
                    tempSelecteId.push(inItButtonControl.id);
                    break;
                case 'Minor':
                    var getbtnDatasmin = getContrlStyle(copyId[i]);
                    var xbm = parseInt(parseInt(getbtnDatasmin.X) + 50 - scrolleft);
                    var ybm = parseInt(parseInt(getbtnDatasmin.Y) + 50 -scroltop);
                    inItMinorControl.createMinorAdjustmentContrl(xbm,ybm);
                    inItMinorControl.copy(copyId[i],inItMinorControl.id);
                    tempSelecteId.push(inItMinorControl.id);
                    break;
                case 'Switch':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItSwitchControl.createSwitchControl(x,y);
                    inItSwitchControl.copy(copyId[i],inItSwitchControl.id);
                    tempSelecteId.push(inItSwitchControl.id);
                    break;
                case 'Scene':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItSwitchControl.createSceneControl(x,y);
                    inItSwitchControl.copy(copyId[i],inItSwitchControl.id);
                    tempSelecteId.push(inItSwitchControl.id);
                    break;
                case 'Edit':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItEditControl.createEditBoxControl(x,y);
                    inItEditControl.copy(copyId[i],inItEditControl.id);
                    tempSelecteId.push(inItEditControl.id);
                    break;
                case 'List':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItListControl.createListBoxControl(x,y);
                    inItListControl.copy(copyId[i],inItListControl.id);
                    tempSelecteId.push(inItListControl.id);
                    break;
                case 'CheckBox':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItCheckBoxControl.createCheckBoxControl(x,y);
                    inItCheckBoxControl.copy(copyId[i],inItCheckBoxControl.id);
                    tempSelecteId.push(inItCheckBoxControl.id);
                    break;
                case 'Combo':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItComboBoxControl.createComboBoxControl(x,y);
                    inItComboBoxControl.comboBoxCopy(copyId[i],inItComboBoxControl.id);
                    tempSelecteId.push(inItComboBoxControl.id);
                    break;
                case 'Fill':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItFillControl.createFillControl(x,y);
                    inItFillControl.copy(copyId[i],inItFillControl.id);
                    tempSelecteId.push(inItFillControl.id);
                    break;    
                case 'Radio':
                    var getRadioDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getRadioDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getRadioDatas.Y) + 50 -scroltop);
                    inItRadioControl.createRadioControl(x,y);
                    inItRadioControl.copy(copyId[i],inItRadioControl.id);
                    tempSelecteId.push(inItRadioControl.id);
                    break;
                case 'Line':
                    var getRadioDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getRadioDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getRadioDatas.Y) + 50 -scroltop);
                    inItStraightControl.createStraightControl(x, y);
                    inItStraightControl.copy(copyId[i],inItStraightControl.id);
                    tempSelecteId.push(inItStraightControl.id);
                    break;
                case 'Rotate':
                    var getRadioDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getRadioDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getRadioDatas.Y) + 50 -scroltop);
                    inItRotateControl.createRotateControl(x, y);
                    inItRotateControl.copy(copyId[i],inItRotateControl.id);
                    tempSelecteId.push(inItRotateControl.id);
                    break;
                case 'SlideBar':
                    var getSlideBarDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getSlideBarDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getSlideBarDatas.Y) + 50 -scroltop);
                    inItSlideBarControl.createSlideBarControl(x,y);
                    inItSlideBarControl.copy(copyId[i],inItSlideBarControl.id);
                    tempSelecteId.push(inItSlideBarControl.id);
                    break;
                case 'Chart':
                    var getRadioDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getRadioDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getRadioDatas.Y) + 50 -scroltop);
                    inItChartControl.createChartControl(x, y);
                    inItChartControl.copy(copyId[i],inItChartControl.id);
                    tempSelecteId.push(inItChartControl.id);
                    break;
                case 'History':
                    var getRadioDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getRadioDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getRadioDatas.Y) + 50 -scroltop);
                    inItHistoryEventControl.createHistoryEventControl(x,y);
                    inItHistoryEventControl.historyEventCopy(copyId[i],inItHistoryEventControl.id);
                    tempSelecteId.push(inItHistoryEventControl.id);
                    break;
                case 'Dial':
                    var getbtnDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getbtnDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getbtnDatas.Y) + 50 -scroltop);
                    inItDialControl.createDialControl(x,y);
                    inItDialControl.copy(copyId[i],inItDialControl.id);
                    tempSelecteId.push(inItDialControl.id);
                    break;
                case 'Status':
                    var getStatusDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getStatusDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getStatusDatas.Y) + 50 -scroltop);
                    inItStatusControl.createStatusControl(x,y);
                    inItStatusControl.copy(copyId[i],inItStatusControl.id);
                    tempSelecteId.push(inItStatusControl.id);
                    break;
                case 'Alarm':
                    var getRadioDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getRadioDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getRadioDatas.Y) + 50 -scroltop);
                    inItHistoryAlarmControl.createHistoryAlarmControl(x,y);
                    inItHistoryAlarmControl.historyAlarmCopy(copyId[i],inItHistoryAlarmControl.id);
                    tempSelecteId.push(inItHistoryAlarmControl.id);
                    break;
                case 'RealTimeAlarm':
                    var getAlarmDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getAlarmDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getAlarmDatas.Y) + 50 -scroltop);
                    inItRealTimeAlarmControl.createRealTimeAlarmControl(x,y);
                    inItRealTimeAlarmControl.copy(copyId[i],inItRealTimeAlarmControl.id);
                    tempSelecteId.push(inItRealTimeAlarmControl.id);
                    break;
                case 'Elevator':
                    var getElevatorDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getElevatorDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getElevatorDatas.Y) + 50 -scroltop);
                    inItElevatorControl.createElevatorControl(x,y);
                    inItElevatorControl.copy(copyId[i],inItElevatorControl.id);
                    tempSelecteId.push(inItElevatorControl.id);
                    break;
                case 'pic':
                    var U = $("#"+copyId[i]).children("img").attr("src");
                    inItPicControl.createPicture(U);
                    inItPicControl.PicControlCopy(copyId[i],inItPicControl.id);
                    tempSelecteId.push(inItPicControl.id);
                    break;
                case 'HKVideo':
                    var getVideoDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getVideoDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getVideoDatas.Y) + 50 -scroltop);
                    inItHKVideoControl.createHKVideoControl(x, y);
                    inItHKVideoControl.copy(copyId[i], inItHKVideoControl.id);
                    tempSelecteId.push(inItHKVideoControl.id);
                    break;
                case "Communicate":
                    var getElevatorDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getElevatorDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getElevatorDatas.Y) + 50 -scroltop);
                    inItCommunicateControl.createcommunicateTestControl(x, y);
                    inItCommunicateControl.communicateControlCopy(copyId[i],inItCommunicateControl.id);
                    tempSelecteId.push(inItCommunicateControl.id);
                    break;
                case 'Video':
                    var getVideoDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getVideoDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getVideoDatas.Y) + 50 -scroltop);
                    inItVideoControl.createVideoControl(x, y);
                    inItVideoControl.copy(copyId[i], inItVideoControl.id);
                    tempSelecteId.push(inItVideoControl.id);
                    break;
                case "Pip":
                    var getElevatorDatas = getContrlStyle(copyId[i]);
                    var x = parseInt(parseInt(getElevatorDatas.X) + 50 - scrolleft);
                    var y = parseInt(parseInt(getElevatorDatas.Y) + 50 -scroltop);
                    inItPipelineControl.createPipelineControl(x, y);
                    inItPipelineControl.pipeline_copy(copyId[i],inItPipelineControl.id);
                    tempSelecteId.push(inItPipelineControl.id);
                    break;
                case "Batch":
                    //var getBatchDatas = getContrlStyle(copyId[i]);
                    //var x = parseInt(parseInt(getBatchDatas.X) + 50 - scrolleft);
                    //var y = parseInt(parseInt(getBatchDatas.Y) + 50 -scroltop);
                    //inItBatchControl.createBatchControl(x, y);
                    //inItBatchControl.copy(copyId[i],inItPipelineControl.id);
                    //tempSelecteId.push(inItBatchControl.id);
                    break;
                default:false;
            }
        }
        selecteId = [];
        for(var i=0;i<len;i++){ //对选择集的处理
            selecteId.push(tempSelecteId[i]);
        }
        //对元素显示的处理
        inItSetCtrStyle.removeStyle(selecteId);
        inItSetCtrStyle.removeResize(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItPropertiesPage.removePropertiesPage(); //移除属性页
        if(selecteId.length >= 2){
        }else{
            if(selecteId[0].split("_")[0] != "pic"){
                //if(selecteId[0].split("_")[0] != "Communicate"){
                    if(selecteId[0].split("_")[0] === "Chart"){
                        inItPropertiesPage.PropertiesChartPage(selecteId);
                        inItPropertiesPage.PublicFeatures(selecteId);
                        determineControlType(selecteId[0]);
                    }else if(selecteId[0].split("_")[0] === "Batch"){
                        //inItPropertiesPage.PropertiesBatchPage(selecteId);
                        //inItPropertiesPage.PublicFeatures(selecteId);
                        //determineControlType(selecteId[0]);
                    }else{
                        inItPropertiesPage.PropertiesPage(selecteId);
                        inItPropertiesPage.PublicFeatures(selecteId);
                        determineControlType(selecteId[0]);
                    }
                //}else{
                //    inItPropertiesPage.removePropertiesPage();
                //}
            }else{
                inItPropertiesPage.removePropertiesPage();
            }
        }
    }
    var log = inTtCommand.createLog();
    webapi.addLog('create',log);
};
/*******创建控件时，位置校验******/
var contrlPosition = function(){
    this.fn = function(idd,x,y){
        var winwidth = $(window).width();
        var bgwidth = $("#bgDiv").width();
        var bgheight = $("#bgDiv").height();
        var contwidth = $("#"+idd).width();
        var contheight = $("#"+idd).height();
        var scrolleftt = document.body.scrollLeft;
        var scrolltop = document.body.scrollTop;
        var allwidth = parseInt(contwidth + x +17);
        if((allwidth > (winwidth - 240)) && (allwidth + scrolleftt <  bgwidth)){
            $("body").width(parseInt(allwidth + scrolleftt + 240));
            var bodwidth = $("body").width();
            document.body.scrollLeft = bodwidth - winwidth;
        }
        if((allwidth + scrolleftt) > bgwidth){
            $("#"+idd).css({
                "position":"absolute",
                "left": (bgwidth - contwidth) +"px"
            });
            if(winwidth < bgwidth){
                $("body").css({"width":parseInt(bgwidth + 240 +17)+'px'});
            }
            var bdwidth = $("body").width();
            document.body.scrollLeft = bdwidth - winwidth;
        }
        if((y + contheight + scrolltop) > bgheight){
            $("#"+idd).css({
                "position":"absolute",
                "top": (bgheight - contheight) +"px"
            });
        }
    }
};

//功能：判断控件类型添加私有属性 参数：str
var determineControlType = function(str){
    var typeid = str.split("_")[0];
    switch(typeid){
        case 'Text':
            inItTextControl.TextPropertiesPage(selecteId);
            inItTextControl.TextPageFeatures(selecteId);
            inItPropertiesPage.FontPage(selecteId);
            inItPropertiesPage.FontFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Progress':
            inItProControl.ProgressPropertiesPage(selecteId);
            inItProControl.ProgressPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Button':
            inItButtonControl.ButtonPropertiesPage(selecteId);
            inItPropertiesPage.FontPage(selecteId);
            inItPropertiesPage.FontFeatures(selecteId);
            inItButtonControl.ButtonPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Minor':
            inItMinorControl.MinorPropertiesPage(selecteId);
            inItMinorControl.MinorPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Switch':
            inItSwitchControl.switchPropertiesPage(selecteId);
            inItSwitchControl.switchPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Scene':
            inItSceneControl.scenePropertiesPage(selecteId);
            inItSceneControl.scenePageFeatures(selecteId);
            break;
        case 'Edit':
            inItEditControl.EditPropertiesPage(selecteId);
            inItEditControl.EditPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'List':
            inItListControl.ListPropertiesPage(selecteId);
            inItListControl.ListPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'CheckBox':
            inItCheckBoxControl.CheckBoxPropertiesPage(selecteId);
            inItCheckBoxControl.CheckBoxPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Combo':
            inItComboBoxControl.ComboBoxPropertiesPage(selecteId);
            inItComboBoxControl.comboBoxPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Fill':
            inItFillControl.FillPropertiesPage(selecteId);
            inItFillControl.FillPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;    
        case 'Radio':
            inItRadioControl.RadioPropertiesPage(selecteId);
            inItRadioControl.RadioPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Line':
            inItStraightControl.StraightPropertiesPage(selecteId);
            inItStraightControl.StraightPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Rotate':
            inItRotateControl.RotatePropertiesPage(selecteId);
            inItRotateControl.RotatePageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'SlideBar':
            inItSlideBarControl.SlideBarPropertiesPage(selecteId);
            inItSlideBarControl.SlideBarPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Chart':
            inItChartControl.ChartPropertiesPage(selecteId);
            inItChartControl.ChartPageFeatures(selecteId);
            inItChartControl.FontPage(selecteId);
            inItChartControl.FontFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'History':
            inItHistoryEventControl.historyEventPropertiesPage(selecteId);
            inItHistoryEventControl.historyEventPageFeatures(selecteId);
            break;
        case 'Dial':
            inItDialControl.DialPropertiesPage(selecteId);
            inItDialControl.DialPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Status':
            inItStatusControl.StatusPropertiesPage(selecteId);
            inItStatusControl.StatusPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'Alarm':
            inItHistoryAlarmControl.historyAlarmPropertiesPage(selecteId);
            inItHistoryAlarmControl.historyAlarmPageFeatures(selecteId);
            break;
        case 'RealTimeAlarm':
            inItRealTimeAlarmControl.RealTimeAlarmPropertiesPage(selecteId);
            inItRealTimeAlarmControl.RealTimeAlarmPageFeatures(selecteId);
            break;
        case 'Elevator':
            inItElevatorControl.ElevatorPropertiesPage(selecteId);
            inItElevatorControl.ElevatorPageFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        case 'HKVideo':
            inItHKVideoControl.HKVideoPropertiesPage(selecteId);
            inItHKVideoControl.HKVideoPageFeatures(selecteId);
            break;
        case 'Communicate':
            inItCommunicateControl.communicatePropertiesPage(selecteId);
            inItCommunicateControl.communicatePageFeatures(selecteId);
            break;
        case 'Pip':
            inItPipelineControl.pipelinePropertiesPage(selecteId);
            inItPipelineControl.pipeline_features(selecteId);
            break;
        case 'Video':
            inItVideoControl.VideoPropertiesPage(selecteId);
            inItVideoControl.VideoPageFeatures(selecteId);
            break;
        case 'Batch':
            inItBatchControl.BatchPropertiesPage(selecteId);
            inItBatchControl.BatchFeatures(selecteId);
            inItModalFeature.Modalbox(selecteId);//配置变量
            break;
        default:false;
    }
};
/*************************文本控件***************************/
var TextControl = function() {
    this.configId = -1;
    this.createTextControl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.textElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Text_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' textTest="文本显示" scrol="nohave" literacytext="literacy1"textcoor4="#de5d25" textcoor5="#c6de25" textcoor3="#2562de" textBcolor3="#edf7fc" textcoor2="#de6225" textBcolor2="#edf7fc" textcoor1="#24b692" tetcoor1="#24b692" textBcolor1="#edf7fc" textcoor="#24b692" textBcolor="#edf7fc" class="contrl move '+idd+'" DataType="0,1,2,3" value="text" textchangval="等于" textTremval="6" termFlicker="yes" termFlicker1="yes"textbreakpoint1="#147f1e" textbreakpoint2="red" textbreakpoint3="#147f1e" textbreakpoint4="#147f1e" textbreakpoint5="#147f1e" textTrue="#147f1e" textfalse="#430607" textFlicker="#f0f813" textFlicker1="#f0f813"></div>');
        var txt = $('<div id=Test'+idd+' class="web-font" literacy="literacy1">文本显示</div>');
        txt.appendTo(textdiv);
        textdiv.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolleft+"px",
            "top": y +scroltop +"px",
            "width": 142 + "px",
            "height": 34 + "px",
            "z-index": 2,
            "text-align":"center",
            "background":"#edf7fc",
            "color":"#24b692",
            "border":"1px solid #dfdfdf",
            "border-radius":"5px"
        });
        $("#Test"+idd).css({
            "border":"1px solid transparent",
            "border-radius":"5px",
            "width": 100+"%",
            "height": 100+"%",
            "margin":"0 auto",
            "overflow":"hidden",
            "font-size":"18px",
            "white-space": "nowrap",
            "text-overflow":"ellipsis"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.TextPropertiesPage(selecteId);
      	inItPropertiesPage.FontPage(selecteId);//公共字体
        inItPropertiesPage.FontFeatures(selecteId);//公共字体功能
        this.TextPageFeatures(selecteId);
        this.mousedown(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    }; 
    this.TextPropertiesPage = function(idd){
        var textAttributes=$('<div id="tc3' + idd + '" class="tc33">'
            +'<fieldset class="attrs2" id="textStle1'+idd+'"><legend>常规</legend><ul><li><p>文字颜色</p> <input type="color" id="color'+idd+'" class="pointer" /></li><li><p id="textbackCol'+idd+'">背景颜色</p> <input class="pointer" type="color" id="backcolor'+idd+'" /></li><li><p>透明显示</p> <div class="opcit1" id="transparency'+idd+'"></div></li><li><p>文本显示</p> <input value="文本显示" class="tex'+idd+' tex" name="tex" type="text" /></li><li><p>滚动显示</p><label for="men5'+idd+'" id="scrol'+idd+'" class="tran pointer"> <div class="opcit1" id="scrol" scrol="nohave"></div></label></li></ul></fieldset>'
            + '<fieldset class="fill_attr1 taxtdis" id="textStle3'+idd+'">'
            +	'<legend>设置</legend>'
            +	'<div class="fill_attrP"><i>背景颜色</i><input type="color" id="textTermShow1'+idd+'"/></div>'
            +   '<div class="fill_attrP"><i>变量值</i><select name="" class="fill_attrP" id="textTermShow2'+idd+'"><option value="等于">等于</option><option value="小于">小于</option><option value="大于">大于</option><option value="大于等于">大于等于</option><option value="小于等于">小于等于</option><option value="不等于">不等于</option></select></div>'
            +	'<div class="fill_attrP"><i>条件值</i>'
            +	'<input id="textTermShow4'+idd+'" type="text" />'
            +	'</div>'
            +	'<div class="fill_attrP"><i>真条件文本色</i><input  type="color" id="textTermShow5'+idd+'"/></div>'
            +	'<div class="fill_attrP"><i>假条件文本色</i><input  type="color" id="textTermShow6'+idd+'"/></div>'
            +	'<div class="fill_attrP"><i>闪烁时文本色</i><input  type="color" id="textTermShow7'+idd+'"/></div>'
            +	'<div class="fill_attrP"><i>满足条件闪烁</i><div class="progress_attr_but" id="textTermShow8'+idd+'"></div></div>'
            + '</fieldset>'
            + '<fieldset class="fill_attr1 taxtdis" id="textStle2'+idd+'">'
            +	'<legend>设置</legend>'
            +	'<div class="fill_attrP"><i>文字颜色</i><input  type="color" id="textOnlyRade1'+idd+'"/></div>'
            +	'<div class="fill_attrP"><i>背景颜色</i><input  type="color" id="textOnlyRade2'+idd+'"/></div>'
            + '</fieldset>'
            + '<fieldset class="fill_attr1 taxtdis" id="textStle4'+idd+'">'
            +	'<legend>设置</legend>'
            +	'<div class="fill_attrP"><i>背景颜色</i><input type="color" id="textEsseShow1'+idd+'"/></div>'
            +	'<div class="text_attrP"><i>断点值</i><ul><li><input type="text" id="textbreakpointval1'+idd+'" value="" /></li><li><input type="text" id="textbreakpointval2'+idd+'" value="" /></li><li><input type="text" id="textbreakpointval3'+idd+'" value="" /></li><li><input type="text" id="textbreakpointval4'+idd+'" value="" /></li></ul></div>'
            +	'<div class="text_attrP"><i>颜色</i><ul class="text_attrP_ul"><li><input type="color" id="textbreakpoint1'+idd+'"/></li><li><input type="color" id="textbreakpoint2'+idd+'"/></li><li><input type="color" id="textbreakpoint3'+idd+'"/></li><li><input type="color" id="textbreakpoint4'+idd+'"/></li><li><input type="color" id="textbreakpoint5'+idd+'"/></li></ul></div>'
            +	'<div class="fill_attrP"><i>闪烁时文本色</i><input  type="color" id="textEsseShow3'+idd+'"/></div>'
            +	'<div class="fill_attrP"><i>满足条件闪烁</i><div class="progress_attr_but"  id="textEsseShow4'+idd+'"></div></div>'
            + '</fieldset>'
            +'</div>'
        );
        $("#fathy").append(textAttributes);
        var font1=$('<form action="" method="get" class="textOff">'
            +       '<label id="textliteracy1'+idd+'" class="textlab"><input name="Fruit" type="radio" value=""  checked="checked"/><span>文本显示</span></label>'
			+		'<label id="textliteracy2'+idd+'" class="textlab"><input name="Fruit" type="radio" value="" /><span>文本读写</span></label>'
			+       '<label id="textliteracy3'+idd+'" class="textlab"><input name="Fruit" type="radio" value="" /><span>文本条件显示</span> </label>'
			+		'<label id="textliteracy4'+idd+'" class="textlab"><input name="Fruit" type="radio" value="" /><span>文本实体显示</span></label>'
			+	'</form>'
	             );
		font1.prependTo($('#tc3'+idd));
   	};
    this.TextPageFeatures = function(idd){
    	
    	if($("#"+idd).attr( "literacytext")=="literacy1"){
    		TextPageFeature1();
       		$("#textliteracy1"+idd).css({
      			"background":"#b5dcf0"
      		});
      		$("#textliteracy1"+idd).siblings().css({
      			"background":"#f3f3f3"
      		});
      		$("#textliteracy1"+idd+" input").attr({
      			"checked":"checked"
      		});
      		$("#textStle1"+idd).css({
      			"display":"block"
      		});
      	  $("#textStle4"+idd).css({
      			"display":"none"
      		});
      	  $("#textStle2"+idd).css({
      			"display":"none"
      		});
      	   $("#textStle3"+idd).css({
      			"display":"none"
      		});
        }else if($("#"+idd).attr( "literacytext")=="literacy2"){
        	TextPageFeature2();
       		$("#textliteracy2"+idd).css({
      			"background":"#b5dcf0"
      		});
      		$("#textliteracy2"+idd).siblings().css({
      			"background":"#f3f3f3"
      		});
      		$("#textliteracy2"+idd+" input").attr({
      			"checked":"checked"
      		});
      		$("#textStle2"+idd).css({
      			"display":"block"
      		});
      	     $("#textStle1"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle4"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle3"+idd).css({
      			"display":"none"
      		});
        }else if($("#"+idd).attr( "literacytext")=="literacy3"){
       	    TextPageFeature3();
       		$("#textliteracy3"+idd).css({
      			"background":"#b5dcf0"
      		});
      		$("#textliteracy3"+idd).siblings().css({
      			"background":"#f3f3f3"
      		});
      		$("#textliteracy3"+idd+" input").attr({
      			"checked":"checked"
      		});
      		 $("#textStle3"+idd).css({
      			"display":"block"
      		});
      	    $("#textStle1"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle2"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle4"+idd).css({
      			"display":"none"
      		});
        }else if($("#"+idd).attr( "literacytext")=="literacy4"){
         	TextPageFeature4();
       		$("#textliteracy4"+idd).css({
      			"background":"#b5dcf0"
      		});
      		$("#textliteracy4"+idd).siblings().css({
      			"background":"#f3f3f3"
      		});
      		$("#textliteracy4"+idd+" input").attr({
      			"checked":"checked"
      		});
      		 $("#textStle4"+idd).css({
      			"display":"block"
      		});
      	    $("#textStle1"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle2"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle3"+idd).css({
      			"display":"none"
      		});
        }
        function changetxet(){
      	    $("#elevatorcharge1"+idd+" input").val("");
            $("#"+idd).removeAttr("variablename");
            $("#"+idd).removeAttr("variabletype");
            $("#"+idd).removeAttr("mixeuval");
            $("#"+idd).removeAttr("mineuval");
            $("#"+idd).removeAttr("datacomment");
            $("#"+idd).removeAttr("mineuval");
            $("#"+idd).removeAttr("datacolor");
            $("#"+idd).removeAttr("variableid");
        }
        
        $("#textliteracy1"+idd).unbind("mousedown").bind("mousedown",function(){
    		$("#" + idd).attr("texttype","1");
        	$("#"+idd).attr("DataType","0,1,2,3");
        	$("#"+idd).attr( "literacytext","literacy1");
        	changetxet();
        	TextPageFeature1();
        	$("#elevatorcharge1"+idd+" input").val("");
      		$("#textStle1"+idd).css({
      			"display":"block"
      		});
      	    $("#textStle4"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle2"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle3"+idd).css({
      			"display":"none"
      		});
      		$(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
        $("#textliteracy2"+idd).unbind("mousedown").bind("mousedown",function(){
    		$("#" + idd).attr("texttype","2");
        	$("#"+idd).attr("DataType","0,1,2,3");
        	$("#"+idd).attr( "literacytext","literacy2");
        	changetxet();
        	TextPageFeature2();
        	$("#elevatorcharge1"+idd+" input").val("");
      	    $("#textStle2"+idd).css({
      			"display":"block"
      	 	});
      	    $("#textStle1"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle4"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle3"+idd).css({
      			"display":"none"
      		});
      	    $(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
        $("#textliteracy3"+idd).unbind("mousedown").bind("mousedown",function(){
    		$("#" + idd).attr("texttype","3");
        	$("#"+idd).attr("DataType","0,1,2,3");
      	    $("#"+idd).attr( "literacytext","literacy3");
      	    changetxet();
      	    TextPageFeature3();
      	    $("#textStle3"+idd).css({
      			"display":"block"
      		});
      	    $("#textStle1"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle2"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle4"+idd).css({
      			"display":"none"
      		});
      	    $(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
        $("#textliteracy4"+idd).unbind("mousedown").bind("mousedown",function(){
    		if($("#"+idd).attr("variableid")){
    			fnn();
    		};
    		$("#" + idd).attr("texttype","4");
        	$("#"+idd).attr("DataType","0,1");
      	    $("#"+idd).attr( "literacytext","literacy4");
      	    changetxet();
      	    TextPageFeature4();
      	    $("#elevatorcharge1"+idd+" input").val("");
      	    $("#textStle4"+idd).css({
      			"display":"block"
      		});
      	    $("#textStle1"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle2"+idd).css({
      			"display":"none"
      		});
      	    $("#textStle3"+idd).css({
      			"display":"none"
      		});
      	    $(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
    	$("#"+idd).bind("mousemove",function(){
	        $("#Test"+idd).css({
	         	"line-height":$("#"+idd).height()+"px"
	        });
	    });
        var textheight = $("#Test"+idd).height();
        $("#Test"+idd).css("line-height",textheight+'px');
        /*=========清除文字滚动=========*/
	    function scorlcheckbox1(){
	    	if($("#"+idd).attr("scrol")=="have"){
	            $("#marr"+idd).remove();
	       }
	    };
    	function TextPageFeature1(){
    		if(!$("#"+idd).attr("variableid")){
   				var sss=$("#"+idd).attr("textTest");
	        	$("#Test"+idd).text(sss); 
   			}
        /************实时更改文本显示***********/
	        $(".tex"+idd).bind("input", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
	            if($("#"+idd).attr("scrol")=="nohave"){
                var sss=$(".tex"+idd).val();
                $("#Test"+idd).text(sss);
            }else{
                var ss=$(".tex"+idd).val();
                $("#marr"+idd).text(ss);
	            };
	            $("#"+idd).attr("textTest",$(".tex"+idd).val())

            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
	        /***************文字滚动**************/
        	var marr = $('<marquee id="marr'+idd+'" class="yes" scrollamount="10" direction="left" value="yes"></marquee>');
        	if($("#"+idd).attr("scrol")=="have"){
                $("#Test"+idd).empty();
                marr.appendTo("#Test"+idd);
                var sss=$("#"+idd).attr("textTest");
	        	marr.text(sss); 
          	}
        	/********初始化文本内容******/
	       $(".tex"+idd).val( $("#"+idd).attr("textTest") );
	        function scorlcheckbox(){
	            if($("#"+idd).attr("scrol")=="nohave"){
	            	$("#scrol").css({
	            		"background":"url(images/selected.png)"
	            	});
	                $("#Test"+idd).empty();
	                marr.appendTo("#Test"+idd);
	                var ss=$(".tex"+idd).val();
	                $("#marr"+idd).text(ss);
	                $("#"+idd).attr("scrol","have");
	               
	            }else{
	            	$("#scrol").css({
	            		"background":"url(images/notselected.png)"
	            	});
                marr.remove();
                var sss=$(".tex"+idd).val();
                $("#Test"+idd).text(sss);
                $("#"+idd).attr( "scrol","nohave");
            }
        };
	         
	        $("#scrol"+idd).unbind("mousedown").mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            scorlcheckbox();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*==================同步滚动显示=====================*/
	        if( $("#"+idd).attr("scrol") == "have"){
	            $("#scrol").css({
	            	"background":"url(images/selected.png)"
	            });
	        }else if($("#"+idd).attr("scrol") == "nohave"){
	            $("#scrol").css({
	            	"background":"url(images/notselected.png)"
	            });
	        }

        /*************文字颜色实时更改**********/
        if($("#"+idd).attr("val") == "transparent"){
            $("input:checkbox[name=blank3"+idd+"]").attr("checked","checked");
        }
        inItPropertiesPage.setColor($("#color"+idd), ['color', $("#"+idd)], ['textcoor', $("#"+idd)]);
       
         /******打开属性页时非透明显示状态字体颜色和背景色设置函数*******/
	        $.fn.getHexBackgroundColor = function(){
	            $("#color"+idd).val($("#"+idd).attr("textcoor"));
	            $("#backcolor"+idd).val($("#"+idd).attr("textBcolor"));
	            $("#"+idd).css("background",$("#"+idd).attr("textBcolor"));
	            $("#"+idd).css("color",$("#"+idd).attr("textcoor"));
	        };
        /***************打开属性页时透明状态的文字颜色设置函数***************/
        $.fn.getHexBackgroundColor1 = function(){
            var rg=$("#"+idd).css("color");
            $("#color"+idd).val(inItPropertiesPage.formatColor(rg));
            judag1=false;
        };

        /****透明显示切换****/
        var judag1=true;
	        $("#transparency"+idd).unbind("mousedown").mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
	            if(judag1 == true){
	                $("#transparency"+idd).css( {"background":"url(images/selected.png)"});
	                $("#"+idd).css("background-color","transparent");
	                $("#"+idd).attr("val","transparent");
	                $('#backcolor'+idd).attr("disabled",true);
	                $("#bac"+idd).css("color","#aaa");
	                var bgcolor = $('#backcolor'+idd).val();
	                localStorage.setItem(idd,bgcolor);
	                $("#"+idd).css("border","1px solid transparent");
	                $("#textbackCol"+idd).css({
                    	"color":"#aaa"
	                });
	            }else{
	                $("#transparency"+idd).css( {"background":"url(images/notselected.png)"});
	                var color=document.getElementById('color'+idd).value;
	                var backcolor = document.getElementById("backcolor"+idd).value;
	                $("#"+idd).css({"color":color,"background-color":backcolor});
	                $('#backcolor'+idd).attr("disabled",false);
	                $("#"+idd).removeAttr("val");
	                $("#bac"+idd).css("color","#000");
				    $("#"+idd).attr("value","text");
                    $("#"+idd).css("border","1px solid #dfdfdf");
                    $("#textbackCol"+idd).css({
                    	"color":"black"
                    });
	            }
	            judag1=!judag1;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*******************判断背景色是否可改变*******************/
	        $("#backcolor"+idd).unbind("change").change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var judaged = $("input:checkbox[name='blank3"+idd+"']").is(':checked');
            if(judaged == true){
            }else{
                $('#backcolor'+idd).attr("disabled",false);
                var vall = $("#backcolor"+idd).val();
                $("#"+idd).css('background',vall);
	                $("#"+idd).attr("textBcolor",vall);
	            };
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
          /*************打开属性页时通过条件判断加文字颜色和背景色****************/
        if($("#"+idd).attr("val") == "transparent"){
            var bkcolor = localStorage.getItem(idd);
            $("#backcolor"+idd).val(bkcolor);
            $.fn.getHexBackgroundColor1();
            $('#backcolor'+idd).attr("disabled",true);
            $("#bac"+idd).css("color","#aaa");
	            $("#transparency"+idd).css( {"background":"url(images/selected.png)"});     
	            $("#textbackCol"+idd).css({
                    "color":"#aaa"
                });
	        }else if($("#"+idd).attr("val") != "transparent"){
	            $.fn.getHexBackgroundColor();
	            $("#transparency"+idd).css( {"background":"url(images/notselected.png)"});
	            $("#textbackCol"+idd).css({
                    "color":"black"
                });
	        };
        };
    
   		function TextPageFeature2(){
    		scorlcheckbox1();
    		if(!$("#"+idd).attr("variableid")){
   				var sss="文本读写";
	        	$("#Test"+idd).text(sss); 
   			}
	        
	        /*************文字颜色实时更改**********/
            inItPropertiesPage.setColor($("#textOnlyRade1"+idd), ['color', $('#'+idd)], ['tetcoor1', $("#"+idd)]);
	       
	         /******打开属性页时非透明显示状态字体颜色和背景色设置函数*******/
	        $.fn.getHexBackgroundColor = function(){
	          
	            $("#textOnlyRade1"+idd).val($("#"+idd).attr("tetcoor1"));
	            $("#textOnlyRade2"+idd).val($("#"+idd).attr("textBcolor1"));
	            $("#"+idd).css('background',$("#"+idd).attr("textBcolor1"));
	            $("#"+idd).css('color',$("#"+idd).attr("tetcoor1"));
	        };
	        /*******************判断背景色是否可改变*******************/
	        $("#textOnlyRade2"+idd).unbind("change").change(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $('#textOnlyRade2'+idd).attr("disabled",false);
                    var vall = $("#textOnlyRade2"+idd).val();
                $("#"+idd).css('background',vall);
                $("#"+idd).attr("textBcolor1",vall);
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
	        });
            $.fn.getHexBackgroundColor();
   		}
    	function TextPageFeature3(){
    		
    		clearTimeout(textstart1);
    		clearTimeout(textstart);
    		scorlcheckbox1();
    		if(!$("#"+idd).attr("variableid")){
   				var sss="文本条件显示";
	        	$("#Test"+idd).text(sss); 
   			}
    		$("#"+idd).css({
                "color":"#24b692"
            });
	         /******打开属性页时非透明显示状态字体颜色和背景色设置函数*******/
	        $.fn.getHexBackgroundColor = function(){
	            $("#textTermShow1"+idd).val($("#"+idd).attr("textBcolor2"));
	            $("#"+idd).css("background",$("#"+idd).attr("textBcolor2"));
	       
	        };
	        /*******************判断背景色是否可改变*******************/
	        $("#textTermShow1"+idd).unbind("change").change(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $('#textTermShow1'+idd).attr("disabled",false);
                    var vall = $("#textTermShow1"+idd).val();
                    $("#"+idd).css('background',vall);
                $("#"+idd).attr("textBcolor2",vall);
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog); 
	        });
            $.fn.getHexBackgroundColor();
           /*==============变量值==============*/
           $("#textTermShow2"+idd).val($("#"+idd).attr("textchangval"));
           $("#textTermShow2"+idd).unbind("change").change(function(){
               var beforeLog = inTtCommand.log();
               webapi.addLog('before',beforeLog);
               $("#"+idd).attr("textchangval",$("#textTermShow2"+idd).val());
           		$("#"+idd).attr("textBcolor2",$("#textTermShow2"+idd).val());
          	 
           });
           /*=======同步条件值====*/
		   $("#textTermShow4"+idd).unbind("keyup").keyup(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
			   	if(!$("#"+idd).attr("mixeuval")){
            		alert("请先配置变量");
            		$(this).val("");
            	}else if(isNaN($(this).val())||Number($(this).val())>Number($("#"+idd).attr("mixeuval"))||Number($(this).val())<Number($("#"+idd).attr("mineuval"))){
			   		$(this).val("");
			   	}else{
			   		$("#"+idd).attr("textTremval",$("#textTermShow4"+idd).val());
			   		
			   	};
               var afterLog = inTtCommand.log();
               webapi.addLog('after',afterLog);
           });
		  $("#textTermShow4"+idd).val($("#"+idd).attr("textTremval"));
		    /*============文本颜色================*/
		   var truecolor=$("#"+idd).attr("textTrue");
		   var falsecolor=$("#"+idd).attr("textfalse");
		   var flickercolor=$("#"+idd).attr("textFlicker");
            $("#textTermShow5"+idd).val(truecolor);
            $("#textTermShow6"+idd).val(falsecolor);
            $("#textTermShow7"+idd).val(flickercolor);
            /*==============文本颜色改变=============*/
            inItPropertiesPage.setColor($("#textTermShow5"+idd), [], ['textTrue', $('#'+idd)]);
            inItPropertiesPage.setColor($("#textTermShow6"+idd), [], ['textfalse', $('#'+idd)]);
            inItPropertiesPage.setColor($("#textTermShow7"+idd), [], ['textFlicker', $('#'+idd)]);
	        /*=======满足条件时闪烁===========*/
	       if($("#"+idd).attr("termFlicker")=="no"){
	    		$("#textTermShow8"+idd).css({
	    			"background":"url(images/notselected.png)"
	    		});
	    		
	    	}else{
	    		$("#textTermShow8"+idd).css({
	    			"background":"url(images/selected.png)"
	    		});
	    	};
		    $("#textTermShow8"+idd).unbind("mousedown").mousedown(function(){
		    	var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
		    	if($("#"+idd).attr("termFlicker")=="no"){
		    		$("#"+idd).attr("termFlicker","yes");
		    		$("#textTermShow8"+idd).css({
		    			"background":"url(images/selected.png)"
		    		});
		    		
		    	}else{
		    		$("#"+idd).attr("termFlicker","no");
		    		$("#textTermShow8"+idd).css({
		    			"background":"url(images/notselected.png)"
		    		});
		    		
		    		$("#"+idd).css({
		    			"color":$("#"+idd).attr("textTrue")
		    		})
		    	};
		    	var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
		    });
		     
    	};
    	function TextPageFeature4(){
    		clearTimeout(textstart1);
    		clearTimeout(textstart);
    		scorlcheckbox1()
    		if(!$("#"+idd).attr("variableid")){
   				var sss="文本实体显示";
	        	$("#Test"+idd).text(sss); 
   			}
    		$("#"+idd).css({
                "color":"#24b692"
            });
    		/******打开属性页时非透明显示状态字体颜色和背景色设置函数*******/
	        $.fn.getHexBackgroundColor = function(){
	             $("#textEsseShow1"+idd).val($("#"+idd).attr("textBcolor3"));
	            $("#textbreakpoint1"+idd).val($("#"+idd).attr("textcoor1"));
	            $("#textbreakpoint2"+idd).val($("#"+idd).attr("textcoor2"));
	            $("#textbreakpoint3"+idd).val($("#"+idd).attr("textcoor3"));
	            $("#textbreakpoint4"+idd).val($("#"+idd).attr("textcoor4"));
	            $("#textbreakpoint5"+idd).val($("#"+idd).attr("textcoor5"));
	            $("#"+idd).css("background",$("#"+idd).attr("textBcolor3"));
	        
	        };
	        /*******************判断背景色是否可改变*******************/
	        $("#textEsseShow1"+idd).unbind("change").change(function(){
                var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
                $('#textEsseShow1'+idd).attr("disabled",false);
                var vall = $("#textEsseShow1"+idd).val();
                $("#"+idd).css('background',vall);
                $("#"+idd).attr("textBcolor3",vall);
                var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
	        });
            $.fn.getHexBackgroundColor();
          /*=======满足条件时闪烁===========*/
	        if($("#"+idd).attr("termFlicker1")=="no"){
	    		$("#textEsseShow4"+idd).css({
	    			"background":"url(images/notselected.png)"
	    		});
	    		
	    	}else{
	    		$("#textEsseShow4"+idd).css({
	    			"background":"url(images/selected.png)"
	    		});
	    	};
	    	$("#textEsseShow4"+idd).unbind("mousedown").bind("mousedown",function(){
	    		var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
	    		var pointterxt1=parseFloat($("#textbreakpointval1"+idd).val());
	    		var pointterxt2=parseFloat($("#textbreakpointval2"+idd).val());
	    		var pointterxt3=parseFloat($("#textbreakpointval3"+idd).val());
	    		var pointterxt4=parseFloat($("#textbreakpointval4"+idd).val());
		    	if($("#"+idd).attr("termFlicker1")=="no"){
		    		$("#"+idd).attr("termFlicker1","yes");
		    		$("#textEsseShow4"+idd).css({
		    			"background":"url(images/selected.png)"
		    		});
		    	}else{
		    		$("#"+idd).attr("termFlicker1","no");
		    		$("#textEsseShow4"+idd).css({
		    			"background":"url(images/notselected.png)"
		    		});
		    	};
		    	var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
		    });
		    /*===========同步断点值============*/
		    $("#textbreakpointval1"+idd).val($("#"+idd).attr("textbreakpointval1"));
		    $("#textbreakpointval2"+idd).val($("#"+idd).attr("textbreakpointval2"));
		    $("#textbreakpointval3"+idd).val($("#"+idd).attr("textbreakpointval3"));
		    $("#textbreakpointval4"+idd).val($("#"+idd).attr("textbreakpointval4"));
		    $("#textEsseShow3"+idd).val($("#"+idd).attr("textFlicker1"));
            inItPropertiesPage.setColor($("#textEsseShow3"+idd), [], ['textFlicker1', $("#"+idd)]);
           /*=============断点颜色===========*/
            inItPropertiesPage.setColor($("#textbreakpoint1"+idd), [], ['textcoor1', $("#"+idd)]);
            inItPropertiesPage.setColor($("#textbreakpoint2"+idd), [], ['textcoor2', $("#"+idd)]);
            inItPropertiesPage.setColor($("#textbreakpoint3"+idd), [], ['textcoor3', $("#"+idd)]);
            inItPropertiesPage.setColor($("#textbreakpoint4"+idd), [], ['textcoor4', $("#"+idd)]);
            inItPropertiesPage.setColor($("#textbreakpoint5"+idd), [], ['textcoor5', $("#"+idd)]);
            /*===================断点值改变====================*/
            $("#textbreakpointval1"+idd).unbind("blur").blur(function(){
            	var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
            	if(!$("#"+idd).attr("mixeuval")){
            		$(this).val("");
            		alert("请先配置变量");
            		
            	}else if(Number($(this).val())>Number($("#"+idd).attr("mixeuval"))||Number($(this).val())<Number($("#"+idd).attr("mineuval"))||isNaN($(this).val())){
            		$(this).val("")
            	}else{
	           		$("#"+idd).attr("textbreakpointval1",$("#textbreakpointval1"+idd).val());
            	}
            	var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
            });
            $("#textbreakpointval2"+idd).unbind("blur").blur(function(){
            	var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
            	if(!$("#"+idd).attr("mixeuval")){
            		$(this).val("");
            		alert("请先配置变量");
            	}else if(Number($(this).val())>Number($("#"+idd).attr("mixeuval"))||Number($(this).val())<Number($("#"+idd).attr("mineuval"))||isNaN($(this).val())||Number($("#textbreakpointval1"+idd).val())>Number($(this).val())||(!$("#textbreakpointval1"+idd).val())){
            		$(this).val("")
            	}else{
	            	$("#"+idd).attr("textbreakpointval2",$("#textbreakpointval2"+idd).val());
                }
                var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
           });
            $("#textbreakpointval3"+idd).unbind("blur").blur(function(){
            	var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
            	if(!$("#"+idd).attr("mixeuval")){
            		$(this).val("");
            		alert("请先配置变量");
            	}else if(Number($(this).val())>Number($("#"+idd).attr("mixeuval"))||Number($(this).val())<Number($("#"+idd).attr("mineuval"))||isNaN($(this).val())||Number($("#textbreakpointval2"+idd).val())>Number($(this).val())||(!$("#textbreakpointval2"+idd).val())){
            		$(this).val("")
            	}else{
	            	$("#"+idd).attr("textbreakpointval3",$("#textbreakpointval3"+idd).val());
               }
                var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
           });
            $("#textbreakpointval4"+idd).unbind("blur").blur(function(){
            	var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
            	if(!$("#"+idd).attr("mixeuval")){
            		$(this).val("");
            		alert("请先配置变量");
            	}else if(Number($(this).val())>Number($("#"+idd).attr("mixeuval"))||Number($(this).val())<Number($("#"+idd).attr("mineuval"))||isNaN($(this).val())||Number($("#textbreakpointval3"+idd).val())>Number($(this).val())||(!$("#textbreakpointval3"+idd).val())){
            		$(this).val("")
            	}else{
	              
	            	$("#"+idd).attr("textbreakpointval4",$("#textbreakpointval4"+idd).val());
		        }
	            var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
            });
            $("#textbreakpointval5"+idd).unbind("blur").blur(function(){
            	var beforeLog = inTtCommand.log();
            	webapi.addLog('before',beforeLog);
            	if(!$("#"+idd).attr("mixeuval")){
            		$(this).val("");
            		alert("请先配置变量");
            	}else if(Number($(this).val())>Number($("#"+idd).attr("mixeuval"))||Number($(this).val())<Number($("#"+idd).attr("mineuval"))||isNaN($(this).val())||Number($("#textbreakpointval4"+idd).val())>Number($(this).val())||(!$("#textbreakpointval4"+idd).val())){
            		$(this).val("")
            	}else{
	            	$("#"+idd).attr("textbreakpointval5",$("#textbreakpointval5"+idd).val());
	            }
	            var afterLog = inTtCommand.log();
           		webapi.addLog('after',afterLog);
           });
    	};
    };
    /*************************字体大小随控件大小按比例变化***********************/
    var timeout;
    this.mousedown = function(idd) {
        if(moused == true){
            mouse = true;
        }
        $("#content").on("mousemove", ".hiden", function () {
            if($("#"+idd).attr("value") == "text" && $(".sele44"+idd+" option:selected").val()==0 && mouse == true){
                hideMove = true; //判断hid额是否移动；
                timeout = false; //启动及关闭按钮
                function time() {
                    if (timeout) return;
                    var width = $("#"+idd).width();
                    var hh = $("#"+idd).height();
                    var wh = Math.sqrt( Math.pow(width,2)+Math.pow(hh,2))/8 ;
                    if ($("#"+idd).attr("scrol")=="have") {
                        $("#marr" + idd).css({
                            "font-size": wh + "px",
                            "line-height":hh+'px'
                        });
                    } else {
                        $("#Test" + idd).css({
                            "font-size": wh + "px",
                            "line-height":hh+'px'
                        });
                    }
                    setTimeout(time, 500); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
                }
                time();
            }
            /*else {
                console.log("///");
                timeout = false; //启动及关闭按钮
                function timet() {
                    if (timeout) return;
                    var heighte = $("#" + idd).height();
                    if (judaged == false) {
                        $("#marr" + idd).css({
                            "line-height": heighte + 'px'
                        });
                    } else {
                        $("#Test" + idd).css({
                            "line-height": heighte + 'px'
                        });
                    }
                    setTimeout(timet, 500); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
                }
                timet();
            }*/
        });
        /*********清除定时器**************/
        $(window).unbind("mouseup").bind("mouseup", function () {
            timeout = true;
            mouse = false;
        });
        $(document).unbind("mouseup").bind("mouseup", function () {
            mouse = false;
            timeout = true;
        });
        $("#bgDiv").bind("mousedown",function(e){
            e.stopPropagation();
            timeout = true;
            mouse = false;
        });
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var contrlElementTxt = $("#"+srcId).children("div").first('div');
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var bg = srcIdElement.css("background");
        var border = srcIdElement.css('border');
        var clor = srcIdElement.css("color");
        var clas = srcIdElement.attr("class");
        var val = srcIdElement.attr("value");
        var contrlTxt = contrlElementTxt.text();
        var TxtClas = contrlElementTxt.attr("class");
        var fontSize = contrlElementTxt.css("font-size");
        /*=======复制变量信息========*/
        $("#"+desId).attr("fontfaml", $("#"+srcId).attr("fontfaml"));
        $("#"+desId).attr("tetcoor1", $("#"+srcId).attr("tetcoor1"));
        $("#"+desId).attr("font", $("#"+srcId).attr("font"));
        $("#"+desId).attr("fonsizes", $("#"+srcId).attr("fonsizes"));
        $("#"+desId).attr("DataType", $("#"+srcId).attr("DataType"));
      	$("#"+desId).attr( "literacytext",$("#"+srcId).attr( "literacytext"));
      	$("#"+desId).attr("scrol", $("#"+srcId).attr("scrol"));
      	$("#"+desId).attr( "textcoor4",$("#"+srcId).attr( "textcoor4"));
      	$("#"+desId).attr("textcoor3", $("#"+srcId).attr("textcoor3"));
      	$("#"+desId).attr( "textcoor2",$("#"+srcId).attr( "textcoor2"));
      	$("#"+desId).attr("textcoor1", $("#"+srcId).attr("textcoor1"));
      	$("#"+desId).attr( "textcoor",$("#"+srcId).attr( "textcoor"));
      	$("#"+desId).attr("textcoor5", $("#"+srcId).attr("textcoor5"));
      	$("#"+desId).attr( "textBcolor3",$("#"+srcId).attr( "textBcolor3"));
      	$("#"+desId).attr("textBcolor2", $("#"+srcId).attr("textBcolor2"));
      	$("#"+desId).attr( "textBcolor1",$("#"+srcId).attr( "textBcolor1"));
      	$("#"+desId).attr( "textBcolor",$("#"+srcId).attr( "textBcolor"));
      	$("#"+desId).attr("value", $("#"+srcId).attr("value"));
      	$("#"+desId).attr( "textbreakpointval1",$("#"+srcId).attr( "textbreakpointval1"));
      	$("#"+desId).attr( "textbreakpointval2",$("#"+srcId).attr( "textbreakpointval2"));
      	$("#"+desId).attr( "textbreakpointval3",$("#"+srcId).attr( "textbreakpointval3"));
      	$("#"+desId).attr( "textbreakpointval4",$("#"+srcId).attr( "textbreakpointval4"));
      	$("#"+desId).attr( "textchangval",$("#"+srcId).attr( "textchangval"));
      	$("#"+desId).attr( "textTremval",$("#"+srcId).attr( "textTremval"));
      	$("#"+desId).attr( "termFlicker",$("#"+srcId).attr( "termFlicker"));
      	$("#"+desId).attr( "termFlicker1",$("#"+srcId).attr( "termFlicker1"));
      	$("#"+desId).attr( "textbreakpoint1",$("#"+srcId).attr( "textbreakpoint1"));
      	$("#"+desId).attr( "textbreakpoint2",$("#"+srcId).attr( "textbreakpoint2"));
      	$("#"+desId).attr( "textbreakpoint3",$("#"+srcId).attr( "textbreakpoint3"));
      	$("#"+desId).attr( "textbreakpoint4",$("#"+srcId).attr( "textbreakpoint4"));
      	$("#"+desId).attr( "textbreakpoint5",$("#"+srcId).attr( "textbreakpoint5"));
      	$("#"+desId).attr( "textTrue",$("#"+srcId).attr( "textTrue"));
      	$("#"+desId).attr( "textfalse",$("#"+srcId).attr( "textfalse"));
      	$("#"+desId).attr( "textFlicker",$("#"+srcId).attr( "textFlicker"));
      	$("#"+desId).attr( "textFlicker1",$("#"+srcId).attr( "textFlicker1"));
      	$("#"+desId).attr( "textTest",$("#"+srcId).attr( "textTest"));
      	$("#"+desId).attr( "underline",$("#"+srcId).attr( "underline"));
      	$("#"+desId).attr( "xieline",$("#"+srcId).attr( "xieline"));
      	$("#"+desId).attr( "tline",$("#"+srcId).attr( "tline"));
      	$("#"+desId).attr( "bline",$("#"+srcId).attr( "bline"));
      	$("#"+desId).attr( "uxieline",$("#"+srcId).attr( "uxieline"));
      	$("#"+desId).attr( "removeline",$("#"+srcId).attr( "removeline"));
      	$("#"+desId).attr( "wuline",$("#"+srcId).attr( "wuline"));
      	$("#"+desId).attr( "val",$("#"+srcId).attr( "val"));
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px",
            "line-height":hige+ "px",
            "background":bg,
            "color":clor,
            'border': border
        }).addClass(clas).children("div").first('div').css({"font-size":fontSize}).text(contrlTxt).addClass(TxtClas);
        if(srcIdElement.children("div").first('div').children("marquee").attr('class') == "yes"){
            var marr = $('<marquee id=marr'+inItTextControl.id+' class="yes" scrollamount="10" direction="left" value="yes"></marquee>');
            var heighte = $("#"+inItTextControl.id).height();
            var wid =$("#"+inItTextControl.id).width();
            var sum= Math.sqrt( Math.pow(heighte,2)+Math.pow(wid,2)) ;
            var widdy=sum/8;
            $("#Test"+desId).empty();
            marr.appendTo("#Test"+desId);
            var ss=$("#"+srcId).text();
            $("#marr"+desId).text(ss);
            $("#marr"+desId).css({
                "font-size":widdy+"px"
            });
            $("#marr"+desId).text($("#"+srcId).attr( "textTest"));
        }
        if(val == "transparent"){
            desIdElement.attr("value","transparent");
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    };
};
/*************************进度条控件***************************/
var ProgressBar = function(){
    this.configId = -1;
    this.createProgressBarContrl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.progressElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Progress_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move" DataType="1,2" value="level" prokeyv="yes" prokeyl="no">'
                        +'<div class="pro'+idd+'" style="position:relative;width:100%;height:100%;overflow:hidden;">'
                            +'<div class="probox probox'+idd+'">'
                                +'<div id="box'+idd+'" class="bar">'
                                    +'<div class="value" id=value'+idd+'></div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="prodata'+idd+'"><p class="prodatap prodatap'+idd+'"></p></div>'
                        +'</div>'
                        +'</div>'
                    );
        textdiv.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolleft+"px",
            "top": y + scroltop +"px",
            "width": 260 + "px",
            "height": 34 + "px",
            "z-index": 3
        });
        $("#box"+idd).css({
            "height":"100%",
            "width":"100%",
            "border-radius":10+'px',
            "background-color":"#fff"
        });
        $("#value"+idd).css({
            "height":"100%",
            "border-radius":10+'px',
            "border":"none"
        });
        imp.fn(idd,x,y);
        $(".prodata"+idd).addClass("prodata");
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.ProgressPropertiesPage(selecteId);
        this.ProgressPageFeatures(selecteId);
        this.mousedown(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.ProgressPropertiesPage = function(idd){
        var proAttributes = $('<div id="tc3'+idd+'" class="pro tc33"><fieldset class="progress_attr1">'
							+	  '<legend>常规</legend>'
							+	  '<div class="progress_attrP prog"><i>文字颜色</i><input class="text'+idd+'" type="color" /></div>'
							+     '<div class="progress_attrP"><i>背景颜色</i><input class="back'+idd+'" type="color" /></div>'
							+     '<div class="progress_attrP"><i>填充颜色</i><input  class="fill'+idd+'" type="color" /></div>'
                            +     '<div class="progress_attrP"><i>水平</i><div class="progress_attr_but" id="pro5'+idd+'"></div></div>'
							+     '<div class="progress_attrP"><i>垂直</i><div class="progress_attr_but" id="pro1'+idd+'"></div></div>'
							+'</fieldset>'
							+'</div>'
                         );
       $("#fathy").append(proAttributes);
    };
    this.ProgressPageFeatures = function(idd){
        /******加载控件时属性页上字体颜色、背景色、填充色设置与控件一致*******/
        $.fn.getHexBackgroundColorpro = function(){
            var rgb=$(".prodatap"+idd).css("color");
            var rgbb=$("#value"+idd).css("background-color");
            var rgbbb=$("#box"+idd).css("background-color");
            $(".text"+idd).val(inItPropertiesPage.formatColor(rgb));
            $(".fill"+idd).val(inItPropertiesPage.formatColor(rgbb));
            $(".back"+idd).val(inItPropertiesPage.formatColor(rgbbb));
            $("#"+idd).attr("probgcolor",rgbb);
        };
        $.fn.getHexBackgroundColorpro();
        /******************进度条文字颜色、背景颜色、填充颜色设置**************/
        inItPropertiesPage.setColor($(".text"+idd), ['color', $(".prodatap"+idd)]);
        inItPropertiesPage.setColor($(".back"+idd), ['background-color', $("#box"+idd)]);
        inItPropertiesPage.setColor($(".fill"+idd), ['background-color', $("#value"+idd)], ['probgcolor', $("#"+idd)]);       
        /*************根据当前数据处理控件显示****************/
        function vertical(){
            if($("#"+idd).attr("value") == "vertical" && $("#"+idd).attr("prokeyv") === "yes"){
                var proW = $("#"+idd).css("width");
                var proH = $("#"+idd).css("height");
                $("#"+idd).css({
                    "width": proH,
                    "height": proW,
                    "z-index": 10
                });
                $(".probox"+idd).addClass("proboxv");
                $("#box"+idd).css({
                    "width":100+'%',
                    "height":100+'%',
                    "position":"relative",
                    "box-sizing":"content-box"
                });
                $("#value"+idd).removeClass("valued");
                $("#value"+idd).addClass("valuel");
                $(".prodata"+idd).addClass("prodatav");
                var proh = parseInt($("#box"+idd).css("height"));
                $("#value"+idd).height(0);
                $("#value"+idd).width("100%");
                $("#"+idd).attr("prokeyl","yes");
                $("#"+idd).attr("prokeyv","no");
            }
        }
        function Levell(){
            if($("#"+idd).attr("prokeyl") === "yes"){  
                var proW = $("#"+idd).css("width");
                var proH = $("#"+idd).css("height");
                var prow = parseInt($("#box"+idd).css("height"));
                $("#"+idd).css({
                    "width": proH,
                    "height": proW,
                    "z-index": 10
                });
                $("#box"+idd).css({
                    "width":100+'%',
                    "height":100+'%',
                    "position":"relative",
                });
                $(".probox"+idd).removeClass("proboxv");
                $(".probox"+idd).addClass("probox");
                $(".prodata"+idd).removeClass("prodatav");
                $(".prodata"+idd).addClass("prodata");
                $("#value"+idd).removeClass("valuel");
                $("#value"+idd).addClass("valued");
                $("#value"+idd).height("100%");
                $("#value"+idd).width(0);
                $("#"+idd).attr("prokeyv","yes");
                $("#"+idd).attr("prokeyl","no");
            }       
        }
        if($("#"+idd).attr("value") == "level"){
             $("#value"+idd).width(0);
             $(".prodatap"+idd).text('0%');
        }else{
            $("#value"+idd).height(0);
            $(".prodatap"+idd).text('0%');
        }
        /*===========同步水平和垂直显示切换=============*/
       
        if($("#"+idd).attr("value") == "vertical"){
            $("#pro1"+idd+"").css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#pro5"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
		}else{
            $("#pro5"+idd+"").css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#pro1"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        /******************水平和垂直显示切换************************/
        $("#pro1"+idd).click(function(){//垂直
        	$("#pro1"+idd+"").css({
        		"background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
        	});
            $("#pro5"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("value","vertical");
            vertical();
        });
        $("#pro5"+idd).click(function(){//水平
            $("#pro5"+idd+"").css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#pro1"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("value","level");
            Levell();
        });
    };
    /******************控件大小改变时,填充内容和数值大小按比例变化***********************/
    this.mousedown = function(idd){
        if(moused == true){
            mouse = true;
        }
        var timeoutproL;
        var timeoutproV;
        $("#content").on("mousemove",".hiden",function(){
            if($("#"+idd).attr("value") == "level" && mouse == true){
                timeoutproL = false;
                hideMove = true;
                var dated = $(".data"+idd).val();//当前值
                var maxdated = $(".maxdata"+idd).val();//默认最大值
                var percentaged = parseFloat((dated/maxdated)*100).toFixed(1);//标准百分比
                function timed(){
                    if (timeoutproL) return;
                    if($("#"+idd).attr("value") == "level"){
                        var widthe = $("#box"+idd).width();
                        var height = $("#"+idd).height();
                        var width = parseFloat(widthe*(percentaged*0.01)).toFixed(1);
                        $("#value"+idd).css({
                            "width":width+'px',
                            "height":100+'%'
                        });
                    }
                    setTimeout(timed,100);
                }
                timed();
            }
            if($("#"+idd).attr("value") == "vertical" && mouse == true){
                timeoutproV = false;
                function timedg(){
                    if($("#"+idd).attr("value") == "vertical"){
                        var datedv = $(".data"+idd).val();//当前值
                        var maxdatedv = $(".maxdata"+idd).val();//默认最大值
                        var percentagedv = parseFloat((datedv/maxdatedv)*100).toFixed(1);//标准百分比
                        if (timeoutproV) return;
                        var widthe = $("#box"+idd).width();
                        var height = $("#box"+idd).height();
                        var heigh = parseFloat(height*(percentagedv*0.01)).toFixed(1);
                        var hieg = widthe/7;
                        $("#value"+idd).css({
                            "height":heigh+'px',
                            "width":100+'%'
                        });
                    }
                    setTimeout(timedg,200);
                }
                timedg();
            }
        });
        $(document).bind("mouseup",function(){
            timeoutproL = true;
            timeoutproV = true;
            mouse = false;
            if(hideMove == true){//hideMove = true;
                mouseupLog = inTtCommand.log();
                webapi.addLog('before',mousedownLog);
                webapi.addLog('after',mouseupLog);
            };
            hideMove = false;
        });
        $("#bgDiv").bind("mousedown",function(){
            timeoutproL = true;
            timeoutproV = true;
        });
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId)
        var contrlElementTxt = $("#"+srcId+" .prodatap"+srcId+"" );
        var bg = $(".probox"+srcId).css("background-color");
        var probg = $("#"+srcId+" #box"+srcId+"").css("background-color");
        var valuebg = $("#"+srcId+" #value"+srcId+"").css("background-color");
        var clas = srcIdElement.attr("class");
        var prov = srcIdElement.attr("prokeyv");
        var prol = srcIdElement.attr("prokeyl");
        var contrlTxt = contrlElementTxt.text();
        var fontSize = contrlElementTxt.css("font-size");
        var procolor = contrlElementTxt.css("color");
        var proeidth = $("#"+srcId+" #box"+srcId+"").width();
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        desIdElement.attr("prokeyv",prov).attr("prokeyl",prol)
        /*****水平*****/
        if(srcIdElement.attr("value") == "level"){
            desIdElement.removeAttr("value","vertical");
            desIdElement.attr("value","level");
            $("#"+desId+" #value"+desId+"").css("background-color",valuebg);
            $("#"+desId+" #box"+desId+"").css({"width":100+'%',"background-color":probg});
            $("#"+desId+" .prodatap"+desId+"" ).css({"color":procolor,"font-size":fontSize}).text(contrlTxt);
            desIdElement.css({
                "width": wide + "px",
                "height": hige+ "px"
            }).addClass(clas);
            $(".probox"+desId).css({
                "background-color":bg
            })
        }
        /********垂直**********/
        if(srcIdElement.attr("value") == "vertical"){
            desIdElement.removeAttr("value","level");
            desIdElement.attr("value","vertical");
            $("#"+desId+" #value"+desId+"").css("background-color",valuebg);
            $("#"+desId+" #box"+desId+"").css({"height":100+'%',"background-color":probg});
            $("#"+desId+" .prodatap"+desId+"" ).css({"color":procolor,"font-size":fontSize}).text(contrlTxt);
            desIdElement.css({
                "width": wide + "px",
                "height": hige+ "px"
            }).addClass(clas);
            $(".probox"+desId).css({
                "background-color":bg
            });
            $(".probox"+desId).addClass("proboxv");
            $("#box"+desId).css({
                "width":100+'%',
                "position":"relative",
                "box-sizing":"content-box"
            });
            $("#value"+desId).removeClass("valued");
            $("#value"+desId).addClass("valuel");
            $(".prodata"+desId).addClass("prodatav");
            $("#value"+desId).width("100%");
            $("#value"+desId).height("0");
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
/*************************按钮控件*****************************/
var Button = function(){
    this.mousecolor;
    this.bgcolor;
    this.configId = -1;
    this.createButtonContrl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.buttonElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Button_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class= "linew testy contrl move web-font '+idd+'" DataType="0,1,2,3" btnval="0" value="btn" fontcolor="#24b692" bgcolor="#b1cbe2" mousecolor="#fafbfd" fontsize="0" font="1" sure="yes" success="yes" fails="yes"><div id=button'+idd+' class="btn" val="rect" style="box-sizing:border-box">控制按钮</div></div>');
        textdiv.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolleft+"px",
            "top": y +scroltop +"px",
            "width": 142 + "px",
            "height": 35 + "px",
            "z-index": 2,
            "cursor":"move"
        });
        $("#button"+idd).css({
            "width": 100+ "%",
            "height": 100 + "%",
            "margin": "auto",
            "position":"absolute",
            "background-color":"#b1cbe2",
            "color":"#24b692",
            "top": 0,
            "left": 0,
            "bottom": 6+'px',
            "right": 0,
            "z-index":1,
            "overflow":"hidden",
            "font-size":14+"px",
            "border-radius":"5px",
            "box-shadow":"0px 5px 2px #89a1c0"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.ButtonPropertiesPage(selecteId);
        this.ButtonPageFeatures(selecteId);
        this.mousedown(selecteId);
        inItPropertiesPage.FontPage(selecteId);//公共字体
        inItPropertiesPage.FontFeatures(selecteId);//公共字体功能
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.ButtonPropertiesPage = function(idd){
       var buttonAttributes = $('<div id="tc3'+idd+'" class="tc33"><fieldset class="button_attr2">'
			+	'<legend class="btnlegend">常规</legend>'
			+	'<p><i>按钮标题</i><input id="padbtn'+idd+'" class="pad" type="text" value="按钮"/></p>'
			+	'<p><i>下发数值</i><input id="padval'+idd+'" class="pad" type="text"/></p>'
		    +	'<p><i>标题颜色</i><input class=titlecolor'+idd+' type="color"/></p>'
			+	'<p class=bgc'+idd+'><i>背景颜色</i><input class=bgcolor'+idd+' type="color"/></p>'
			+	'<p><i>鼠标颜色</i><input class=mousecolor'+idd+' id="mousec" type="color"/></p>'
			+	'</fieldset>'
			+	'<fieldset class="button_attr3">'
			+	'<legend class="btnlegend">扩展</legend>'
			+	'<div class="btnshape button_attr3P">'
			+		'<i>形状</i>'
			+'<ul class="shapBut" >'
			+	'<li class="numL">'
			+		'<div class="picL"></div>'
			+	'</li>'
			+	'<li>'
			+		'<input type="text" id="shapBut' + idd + '" class="shap' + idd + ' put put1" step="3" value="0" />'
			+	'</li>'
			+	'<li class="numB">'
			+		'<div class="picR"></div>'
			+	'</li>'
			+'</ul>'
			
			+	'</div>'	
			+	'<div class="button_attr3P"><i>按钮透明</i><div class="button_attr3_but"id="transp'+idd+'" ></div></div>'
			+	'<div class="button_attr3P"><i>确认控制命令</i><div class="button_attr3_but" id="pro2'+idd+'"></div></div>'
			+	'<div class="button_attr3P"><i>报告成功命令</i><div class="button_attr3_but" id="pro3'+idd+'"></div></div>'
			+	'<div class="button_attr3P"><i>报告失败命令</i><div class="button_attr3_but" id="pro4'+idd+'"></div></div>'
			+'</fieldset></div>'
       );
       $("#fathy").append(buttonAttributes); 
    };
    this.ButtonPageFeatures = function(idd){
        var fonSizesd = $("#"+idd).attr("fontsize");
        var font = $("#"+idd).attr("font");
		var confirmOrder = $("#pro2"+idd);
        var successOrder = $("#pro3"+idd);
        var failOrder = $("#pro4"+idd);
        if(fonSizesd != 0){
            $(".sele4"+idd+" option[value='"+fonSizesd+"']").attr("selected","selected");
        }
        if(font != 1){
            $(".sele2"+idd+" option[value='"+font+"']").attr("selected","selected");
            if(font == 2){
                $("#"+idd).children("div").css("font-family","KaiTi" );
            }
            if(font == 3){
                $("#"+idd).children("div").css("font-family","SimHei" );
            }
            if(font == 4){
                $("#"+idd).children("div").css("font-family","SimSun" );
            }
            if(font == 5){
                $("#"+idd).children("div").css("font-family","NSimSun" );
            }
            if(font == 6){
                $("#"+idd).children("div").css("font-family","FangSong" );
            }
            if(font == 7){
                $("#"+idd).children("div").css("font-family","LiSu" );
            }
            if(font == 8){
                $("#"+idd).children("div").css("font-family","YouYuan" );
            }
        }else{
            $("#"+idd).children("div").css("font-family","Microsoft YaHei" );
        };


        var opconoff=true;
        var chang = false;
        var beforeLogText;
       /********标题内容*********/
        var s=$("#button"+idd).text();
        $("#padbtn"+idd).val(s);
        $("#padbtn"+idd).bind('input', function(){
            var ss=$("#padbtn"+idd).val();
            $("#button"+idd).text(ss);
            chang = true;
        });
        $("#padbtn" + idd).bind("focus", function () {
            beforeLogText = inTtCommand.log();
        });
        $("#padbtn" + idd).bind("blur", function () {
            if(chang == true){
                var afterLog = inTtCommand.log();
                webapi.addLog('before',beforeLogText);
                webapi.addLog('after',afterLog);
            }
            chang = false;
        });
        this.bgcolor = $("#"+idd).attr("bgcolor");
        this.mousecolor = $("#"+idd).attr("mousecolor");
        /******************标题颜色、背景颜色、鼠标移入颜色设置**************/
        inItPropertiesPage.setColor($(".titlecolor"+idd), ['color', $("#button"+idd)], ['fontcolor', $("#"+idd)]);
        inItPropertiesPage.setColor($(".bgcolor"+idd), ['background-color', $("#button"+idd)], ['bgcolor', $("#"+idd)]);
        inItPropertiesPage.setColor($(".mousecolor"+idd), [], ['mousecolor', $("#"+idd)]);
        /******加载控件时属性页上标题颜色与控件一致*******/
        var rgb=$("#"+idd).attr("fontcolor");
        $(".titlecolor"+idd).val(rgb);
        /******加载控件时属性页上背景颜色和鼠标移入颜色与控件一致*******/
        if($("#button"+idd).attr("valued") != "transparent"){
            var bgcc = $("#"+idd).attr("bgcolor");
            var bgccm = $("#"+idd).attr("mousecolor");
            $(".bgcolor"+idd).val(bgcc);
            $(".mousecolor"+idd).val(bgccm);
        }else{
            var bgm = $("#"+idd).attr("bgcolor");
            var bgcm = $("#"+idd).attr("mousecolor");
            $(".bgcolor"+idd).val(bgm);
            $(".mousecolor"+idd).val(bgcm);
        }
        /***********鼠标移动到控件时颜色设置**********/
        $("#button"+idd).bind("mouseover",function(){
            this.mousecolor = $("#"+idd).attr("mousecolor");
            $("#button"+idd).css({
                'background-color':this.mousecolor,
                "color":"#586c91",
                "box-shadow":"0px 5px 2px #eef1f6"
            });
        });
        $("#button"+idd).bind("mouseout",function(){
            if($("#button"+idd).attr("valued") != "transparent"){
                this.bgcolor = $("#"+idd).attr("bgcolor");
                $("#button"+idd).css({
                    'background-color':this.bgcolor,
                    "color":$("#"+idd).attr("fontcolor"),
                    "box-shadow":"0px 5px 2px #89a1c0"
                });

            }
            if($("#button"+idd).attr("valued") == "transparent"){
                $("#button"+idd).css({
                    'background-color':"#fff",
                    "color":$("#"+idd).attr("fontcolor"),
                    "box-shadow":"0px 5px 2px #89a1c0"
                });
            }
        });
        /*************打开属性页时通过条件判断是否可改背景色****************/
        if($("#button"+idd).attr("valued") == "transparent"){
            $(".bgcolor"+idd).attr("disabled",true);
            $(".bgc"+idd).css("color","#aaa");
        }
        if($("#button"+idd).attr("valued") != "transparent"){
            var bgc = $("#"+idd).attr("bgcolor");
            $("#button"+idd).css("background-color",bgc);
        }
        /******透明显示*****/
        /*========同步透明==========*/
        if($("#button"+idd).attr("valued") == "transparent"){
		    $("#transp"+idd+"").css({
            	"background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
			opconoff=false;
		}else{
            $("#transp"+idd+"").css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        $("#transp"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(opconoff == true){
                $("#button"+idd).css("background-color","transparent");
                $("#button"+idd).attr("valued","transparent");
                $(".bgcolor"+idd).attr("disabled",true);
                $(".bgc"+idd).css("color","#aaa");
                $("#transp"+idd+"").css({
                	"background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }else{
                $(".bgcolor"+idd).attr("disabled",false);
                $("#button"+idd).removeAttr("valued");
                var bgcol = $('.bgcolor'+idd).val();
                $("#button"+idd).css("background-color",bgcol);
                $(".bgc"+idd).css("color","#000");
                $("#transp"+idd+"").css({
                	"background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                })
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
            opconoff=!opconoff;
        });
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);
        /*******限制下发值的输入********/
        var inputValueElement = $('#padval'+idd);
        inputValueElement.keyup(function() {
            var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
            var minValue = $('#'+idd).attr('MinEuVal'); //允许输入的最小工程值
            var maxValue = $('#'+idd).attr('MixEuVal'); //允许输入的最大工程值
            if (variableType) {
                if (variableType === '开关量') { //配置的变量为‘开关量’
                    if (!inItPropertiesPage.inputValidate.booleanValidate($(this).val())) {
                        $(this).val('');
                        $("#"+idd).attr("btnval", '0');
                    } else {
                        $("#"+idd).attr("btnval", $(this).val());
                    }
                } else if (variableType === '整型量') { //配置的变量为‘开关量’
                    if (minValue && maxValue) {
                        inputValueElement.attr('minlength', minValue.length);
                        inputValueElement.attr('maxlength', maxValue.length);
                    }
                    if (!inItPropertiesPage.inputValidate.integerValidate($(this).val(), minValue, maxValue)) {
                        $(this).val('');
                        $("#"+idd).attr("btnval", '0');
                    } else {
                        $("#"+idd).attr("btnval", $(this).val());
                    }
                } else if (variableType === '浮点量') { //配置的变量为‘浮点量’
                    if (!inItPropertiesPage.inputValidate.floatValidate($(this).val(), minValue, maxValue)) {
                        $(this).val('');
                        $("#"+idd).attr("btnval", '0');
                    } else {
                        $("#"+idd).attr("btnval", $(this).val());
                    }
                } else if (variableType === '字符量') { //配置的变量为‘字符量’
                    if (!inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                        $(this).val('');
                        $("#"+idd).attr("btnval", '0');
                    } else {
                        $("#"+idd).attr("btnval", $(this).val());
                    }
                }
            } else {
                alert('还未进行变量配置');
                $(this).val('');
            }
        });
        if ($("#"+idd).attr("btnval")) {
            $("#padval"+idd).val($("#"+idd).attr("btnval"));
        }
        /*================圆角====================*/
        /*============同步圆角=========*/
        var borderNum=Math.floor(parseFloat($("#button"+idd).css("border-top-left-radius")));
        $("#shapBut"+idd).val(borderNum);
        /*==================圆角事件===================*/   
        $(".shapBut .numL").click(function(){
		    var mNum=parseInt($(this).next().children().val());
		    var buttwidth=$("#button"+idd).width();
		    var buttheight=$("#button"+idd).height();
		    var num;
		    if(buttwidth>=buttheight){
		      	num=Math.floor(buttheight/2)
		    }else if(buttwidth<buttheight){
		      	num=Math.floor(buttwidth/2)
		    }
		    if(mNum==0){
				mNum=0;
			}else{
			 	if(num<mNum){
			 		mNum=num
			 	}else{
			 		mNum--;	
			 	}
			}
		    $(this).next().children().val(mNum);
		    $("#button"+idd).css({
		      	"border-radius":mNum+"px"
		    })
		});
		$(".shapBut .numB").click(function(){
			 var buttwidth=$("#button"+idd).width();
		     var buttheight=$("#button"+idd).height();
		     var mNum1=$(this).prev().children().val();
		     if(buttwidth>=buttheight){
		     	if(mNum1>=Math.floor(buttheight/2)){
		     		mNum1=Math.floor(buttheight/2);
		     	}else{
		     		mNum1++;
		     	}
		     }else if(buttwidth<buttheight){
		     	if(mNum1>=Math.floor(buttwidth/2)){
		     		mNum1=Math.floor(buttheight/2);
		     	}else{
		     		mNum1++;
		     	}
		     }
		     $(this).prev().children().val(mNum1);
		     $("#button"+idd).css({
		      	"border-radius":mNum1+"px"
		     })
		});
		$("#shapBut"+idd).keyup(function(){
			var buttwidth=$("#button"+idd).width();
		    var buttheight=$("#button"+idd).height();
		    var mNum2=$(this).val();
		   	var reg = new RegExp("^[0-9]*$"); 
		    if(!reg.test(mNum2)){
		    	setTimeout(function(){
		    		var borderNum1=Math.floor(parseFloat($("#button"+idd).css("border-top-left-radius")));
		    		$("#shapBut"+idd).val(borderNum1);
		    	},10);
		    }else if(buttwidth>=buttheight){
		     	if(mNum2>=Math.floor(buttheight/2)){
		     		mNum2=Math.floor(buttheight/2);
		     	}
		     	$(this).val(mNum2);
		    $("#button"+idd).css({
		      	"border-radius":mNum2+"px"
		    });
		    }else if(buttwidth<buttheight){
		     	if(mNum2>=buttwidth/2){
		     		mNum2=Math.floor(buttheight/2);
		     	}
		     	$(this).val(mNum2);
			    $("#button"+idd).css({
			      	"border-radius":mNum2+"px"
			    });
		    } 
		});
    };
    /**********控件大小改变时填充内容适应其变化******/
    var timebtn;
    this.mousedown = function(idd){
        if(moused == true){
            mouse = true;
        }
        $("#content").on("mousemove",".hiden",function(){
            if($("#button"+idd).attr("val") == "rect" && mouse == true && $(".sele44"+idd+" option:selected").val()==0) {
                hideMove = true; //判断hid额是否移动；
                timebtn = false; //启动及关闭按钮
                function btntime(){
                    if (timebtn) return;
                    var width = $("#"+idd).width();
                    var hh = $("#"+idd).height();
                    var wh = Math.sqrt( Math.pow(width,2)+Math.pow(hh,2))/8 ;
                    $("#button"+idd).css({
                        "font-size": wh + "px",
                        "line-height":hh+'px',
                        "overflow":"hidden"
                    });
                    setTimeout(btntime, 200); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
                }
                btntime();
            }else{
                timebtn = false; //启动及关闭按钮
                function btntimed (){
                    if (timebtn) return;
                    var hh = $("#"+idd).height();
                    $("#button"+idd).css({
                        "line-height":hh+'px'
                    });
                    setTimeout(btntimed, 200); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
                }
                btntimed();
            }
        });
        /*********清除定时器**************/
        $(document).bind("mouseup",function(){
            timebtn = true;
            mouse = false;
            if(hideMove == true){
                mouseupLog = inTtCommand.log();
                webapi.addLog('before',mousedownLog);
                webapi.addLog('after',mouseupLog);
            };
            hideMove = false;
        });
        $("#bgDiv").bind("mousedown",function(){
            timebtn = true;
        });
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var fontcolor = srcIdElement.attr("fontcolor");
        var bg = srcIdElement.attr("bgcolor");
        var moubg = srcIdElement.attr("mousecolor");
        var fontsize = srcIdElement.attr("fontsize");
        var fontfmaily = srcIdElement.attr("font");
        var font = $("#button"+srcId).css("font-size");
        var fonSizes = localStorage.getItem("fonsizes"+srcId);
        var fontFamily = localStorage.getItem("fontfamily"+srcId);
        var buttonValue = srcIdElement.attr('btnval');
        localStorage.getItem("fonsizes"+desId,fonSizes);
        localStorage.getItem("fontfamily"+desId,fontFamily);
        $(".bgcolor" + desId).val(bg);
        $(".mousecolor" + desId).val(moubg);
        /*******矩形******/
        var contrlElementbtn = srcIdElement.children("div").first('div');
        var higebtn = srcIdElement.height();
        var widebtn = srcIdElement.width();
        var clasb = srcIdElement.attr("class");
        var bgg = srcIdElement.attr("bgcolor");
        var clor = contrlElementbtn.css("color");
        var contrlTxt = contrlElementbtn.text();
        var TxtClas = contrlElementbtn.attr("class");
        var valued = contrlElementbtn.attr("valued");
        desIdElement.attr("bgcolor",bg).attr("mousecolor",moubg).attr("fontcolor",fontcolor).attr("fontsize",fontsize).attr("font",fontfmaily);
        var borderNum = srcIdElement.children().css("border-radius");
        $('#'+desId).attr('sure', $('#'+srcId).attr('sure'));
		$('#'+desId).attr('success', $('#'+srcId).attr('success'));
		$('#'+desId).attr('fails', $('#'+srcId).attr('fails'));
        $("#"+desId).attr( "underline",$("#"+srcId).attr( "underline"));
      	$("#"+desId).attr( "xieline",$("#"+srcId).attr( "xieline"));
      	$("#"+desId).attr( "tline",$("#"+srcId).attr( "tline"));
      	$("#"+desId).attr( "bline",$("#"+srcId).attr( "bline"));
      	$("#"+desId).attr( "uxieline",$("#"+srcId).attr( "uxieline"));
      	$("#"+desId).attr( "removeline",$("#"+srcId).attr( "removeline"));
      	$("#"+desId).attr( "wuline",$("#"+srcId).attr( "wuline"));
        desIdElement.children().css("border-radius",borderNum);
        $("#rect"+desId).attr("checked","checked");
        desIdElement.css({
            "width": widebtn+'px',
            "height": higebtn+'px',
            "line-height": higebtn+'px'
        }).addClass(clasb);
        desIdElement.children("div").first('div').css({
            "color": clor,
            "font-size":font
        }).text(contrlTxt).addClass(TxtClas).attr("val","rect").attr("valu","copy").attr("valued",valued);
        if($("#button"+srcId).attr("valued") == "transparent"){
            $("#button"+desId).css('background-color',"#fff");
        }else{
            $("#" + desId).children("div").first('div').css({
                "background-color": bgg
            })
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    };
};
/****************************微调控件***************************/
var MinorAdjustment = function(){
    this.configId = -1;
    this.createMinorAdjustmentContrl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.MinorElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Minor_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move" DataType="1" sure="yes" success="yes" fails="yes">' +
            '<div class="minor minorbox'+idd+'">' +
                '<div id=numt'+idd+' class="numb numt'+idd+'">' +
                    '<form action="" id=frm'+idd+' name="frm" class="from">' +
                        '<input class="num moved" disabled type="text" id="mumcolor-'+idd+'" value="0"/>' +
                    '</form>' +
                '</div>' +
                    '<span class="minorcontr"><button class="minorup mupd mupc'+idd+'"><img id=mup-'+idd+' class=mup'+idd+' src="images/up.svg"/></button><button class="minordown mupd mdownc'+idd+'"><img id=mdown-'+idd+' class=mdown'+idd+' src="images/down.svg"/></button></span>' +
                    '<div class="minorbtn removebtn'+idd+'"><button id="minbtn-'+idd+'" class="mbtn minbtn'+idd+'">发送</button></div>' +
                '</div>' +
            '</div>');
        textdiv.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolleft+"px",
            "top": y + scroltop +"px",
            "width": 142 + "px",
            "height": 34 + "px",
            "line-height":50+'px',
            "text-align":"center",
            "padding":0
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.MinorPropertiesPage(selecteId);
        this.MinorPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.MinorPropertiesPage = function(idd){
       var proAttributes = $('<div id="tc3'+idd+'" class="tc33">'
      			+'<fieldset class="minor_attr1">'
				+	'<legend>常规</legend>'
				+	'<div class="minor_attrP"><i>文字颜色</i><input class="textcolor'+idd+'" type="color"/></div>'
				+	'<div class="minor_attrP"><i>背景颜色</i><input class="bgcolor'+idd+'" type="color"/></div>'
				+	'<div class="minor_attrP"><i>隐藏发送按钮</i><div class="minor_attr_but minorshow'+idd+'" id="sure"></div></div>'
				+	'<div class="minor_attrP"><i>确认控制命令</i><div class="minor_attr_but" id="minor1'+idd+'"></div></div>'
				+	'<div class="minor_attrP"><i>报告成功命令</i><div class="minor_attr_but" id="minor2'+idd+'"></div></div>'
				+	'<div class="minor_attrP"><i>报告失败命令</i><div class="minor_attr_but" id="minor3'+idd+'"></div></div>'
				+'</fieldset>'
                +'</div>');
       $("#fathy").append(proAttributes);
    };
    
    this.MinorPageFeatures = function(idd){
    	var judage=true;
    	var confirmOrder = $("#minor1"+idd);
        var successOrder = $("#minor2"+idd);
        var failOrder = $("#minor3"+idd);
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);//报告命令状态
        /************提交输入内容***********/
        $(".minbtn"+idd).click(function(){
            $("#frm"+idd).submit(function(){
               
            });
        });
        /*********文字颜色**********/
        inItPropertiesPage.setColor($(".textcolor"+idd), ['color', $("#mumcolor-"+idd), 'color', $(".minbtn"+idd)]);
        /*******背景颜色************/
        inItPropertiesPage.setColor($(".bgcolor"+idd), ['background-color', $("#mumcolor-"+idd)]);
        /******打开属性页时字体颜色和背景色设置函数*******/
        $.fn.getHexBackgroundColor = function(){
            var rgb=$("#mumcolor-"+idd).css('color');
            var rgbb=$("#mumcolor-"+idd).css('background-color');
            $(".textcolor"+idd).val(inItPropertiesPage.formatColor(rgb));
            $(".bgcolor"+idd).val(inItPropertiesPage.formatColor(rgbb));
        };
        $.fn.getHexBackgroundColor();
        /**************初始化显示按钮************/
        if($(".minorbox"+idd).attr("val") == "nobutton"){
            $(".minorshow"+idd+"").css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
            });
        }else{
            $(".minorshow"+idd+"").css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
            });
        }
        /**********显示确认按钮**********/
        
        $(".minorshow"+idd).click(function(){
            if(judage == false){
            	$(".minorshow"+idd+"").css({
            		"background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
            	});
                var addbutton = $('<div class="minorbtn removebtn'+idd+'"><button id="minbtn-'+idd+'" class="mbtn minbtn'+idd+'">发送</button></div>');
                $(".minorbox"+idd).append(addbutton);
                $(".minorbox"+idd).attr("val","hasbutton");
                var textco = $(".textcolor"+idd).val();
                $(".minbtn"+idd).css("color",textco);
                $(".numt"+idd).css("width",60+"%");
            }else{
            	$(".minorshow"+idd+"").css({
            		"background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
            	});
                $(".removebtn"+idd).remove();
                $(".minorbox"+idd).attr("val","nobutton");
                $(".numt"+idd).css("width",90+"%");
            }
            judage=!judage;
        });
        if($(".minorbox"+idd).attr("val") == "hasbutton"){
            $(".minshow"+idd).attr("checked","checked");
        }else if($(".minorbox"+idd).attr("val") == "nobutton"){
            $(".minshow"+idd).removeAttr("checked");
        }
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var contrlElementbtn = $('#'+srcId+' #mumcolor-'+srcId+'');
        var btncolor = $('#'+ srcId+' .minbtn'+srcId+'');
        var btnc = btncolor.css("color");
        var clas = srcIdElement.attr("class");
        var higebtn = srcIdElement.height();
        var widebtn = srcIdElement.width();
        var color = contrlElementbtn.css("color");
        var bgcoolor = contrlElementbtn.css("background");
        var data = contrlElementbtn.val();
        var val = $(".minorbox"+srcId).attr("val");
        $(".minorbox"+desId).attr("val",val);
        desIdElement.css({
            "width": widebtn+'px',
            "height": higebtn+'px',
            "line-height": higebtn+'px'
        }).addClass(clas);
        $('#'+desId+' #mumcolor-'+desId+'').css({
            "color":color,
            "background":bgcoolor
        });
        if(!isNaN(data)){
            $('#'+desId+' #mumcolor-'+desId+'').val(data);
        }
        if($(".minorbox"+srcId).attr("val") != "nobutton"){
            $('#'+ desId+' .minbtn'+desId+'').css("color",btnc);
            $(".numt"+desId).css("width",60+"%");
        }
        if($(".minorbox"+srcId).attr("val") == "nobutton"){
            $(".removebtn"+desId).remove();
            $(".numt"+desId).css("width",90+"%");
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
//开关控件
var SwitchControl = function() {
    this.configId = -1;
    this.createSwitchControl = function (x, y) {$("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.switchElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Switch_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' DataType="0" class="contrl move" pip_imgs="no" openbtn="开状态" closebtn="关状态" tabbtn="提示信息" imageSource="local"></div>');
        var txt = $('<div id="SwitchImage-'+idd+'" backg="images/switch1-on.svg" literacy="on" switchStatus="on"></div>');
        txt.appendTo(textdiv);
        textdiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 130 + "px",
            "height": 50 + "px",
            "line-height": 50 + "px",
            "text-align":"center"
        });
        $("#SwitchImage-"+idd).css({
            "width": 100+"%",
            "height": 100+"%",
            "margin":"0 auto",
            "background":"url(images/switch1-on.svg) no-repeat center center"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.switchPropertiesPage(selecteId);
        this.switchPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.switchPropertiesPage = function(idd){
        var switchBTn = $('<div id="tc3'+idd+'" class="tc33"></div>');
        $("#fathy").append(switchBTn);
        var switchHtml = 
            '<form action="" method="get" class="switchOff">' 
            +    '<label id="switchliteracy1'+idd+'"><input name="Fruit" type="radio" value="" />开关显示 </label>'
            +    '<label id="switchliteracy2'+idd+'"><input name="Fruit" type="radio" value="" />开关读写</label>'
            +'</form>' 
            +'<fieldset class="switch_attr1">'
            +    '<legend>样式</legend>'
            +    '<div class="switch_attrP">'
            +    '<ul  class="off">'
            +        '<li class="switch_attrP_box1">开关样式1</li>'
            +        '<li class="switch_attrP_box2">'
            +            '<div class="switch_attr_butadd colorOtheradd"></div>'
            +            '<input type="radio" class="switchRadio_0 switchRadio" value="开关1"/>'
            +        '</li>'
            +        '<li class="switch_attrP_box3"><img class="switchPic switchsecond1" src="images/switch1-on.png"></li>'
            +        '<li class="switch_attrP_box4"><img class="switchPic switchsecond1" src="images/switch1-off.png"></li>'
            +    '</ul>'
            +    '<ul  class="off">'
            +        '<li class="switch_attrP_box1">开关样式2</li>'
            +        '<li class="switch_attrP_box2">'
            +            '<div class="switch_attr_butadd"></div>'
            +            '<input type="radio"  class="switchRadio_1 switchRadio" value="开关2" />'
            +        '</li>'
            +        '<li class="switch_attrP_box3"><img class="switchPic float switchsecond2" src="images/switch2-on.png"></li>'
            +        '<li class="switch_attrP_box4"><img class="switchPic float switchsecond2" src="images/switch2-off.png"></li>'
            +    '</ul>'
            +    '<ul  class="off">'
            +        '<li class="switch_attrP_box1">开关样式3</li>'
            +        '<li class="switch_attrP_box2">'
            +            '<div class="switch_attr_butadd"></div>'
            +            '<input type="radio" class="switchRadio_2 switchRadio" value="开关3" />'
            +        '</li>'
            +        '<li class="switch_attrP_box3"><img class="switchPic float switchsecond2" src="images/switch3-on.png"></li>'
            +        '<li class="switch_attrP_box4"><img class="switchPic float switchsecond2" src="images/switch3-off.png"></li>'
            +    '</ul>'
            +    '<ul class="off">'
            +        '<li class="switch_attrP_box1">开关样式4</li>'
            +        '<li class="switch_attrP_box2">'
            +            '<div class="switch_attr_butadd"></div>'
            +            '<input type="radio" class="switchRadio_3 switchRadio" value="开关4"/>'
            +        '</li>'
            +        '<li class="switch_attrP_box3"><img class="switchPic float switchsecond4" src="images/switch4-on.png"></li>'
            +        '<li class="switch_attrP_box4"><img class="switchPic float switchsecond4" src="images/switch4-off.png"></li>'
            +    '</ul>'
            +    '<ul class="off">'
            +        '<li class="switch_attrP_box1">阀门1</li>'
            +        '<li class="switch_attrP_box2">'
            +            '<div class="switch_attr_butadd"></div>'
            +            '<input type="radio" class="switchRadio_4 switchRadio" value="阀门1"/>'
            +        '</li>'
            +        '<li class="switch_attrP_box3"><img class="switchPic float switchsecond4" src="images/switch5-on.png"></li>'
            +        '<li class="switch_attrP_box4"><img class="switchPic float switchsecond4" src="images/switch5-off.png"></li>'
            +    '</ul>'
             +    '<ul class="off">'
            +        '<li class="switch_attrP_box1">阀门2</li>'
            +        '<li class="switch_attrP_box2">'
            +            '<div class="switch_attr_butadd"></div>'
            +            '<input type="radio" class="switchRadio_5 switchRadio" value="阀门2"/>'
            +        '</li>'
            +        '<li class="switch_attrP_box3"><img class="switchPic float switchsecond4" src="images/switch6-on.png"></li>'
            +        '<li class="switch_attrP_box4"><img class="switchPic float switchsecond4" src="images/switch6-off.png"></li>'
            +    '</ul>'
            +    '<ul>'
            +        '<li class="switch_attrP_box1">定制开关</li>'
            +        '<li class="switch_attrP_box2 definitionSwitch'+idd+'" >'
            +            '<div class="switch_attr_butadd"></div>'
            +            '<input type="radio" id="definitionSwitch'+idd+'" class="definitionSwitch defineS">'
            +        '</li>'
            +    '</ul>'
            +    '<ul class="">'
            +        '<li class="switch_attrP_box1">网页路径</li>'
            +        '<li class="tex_url">'
            +            '<input type="text" class="urlTxt switchInput"/>'
            +        '</li>'
            +    '</ul>'
            +    '<div class="switch_attrText1"><i class="switchImageSource">图片来源</i>'
            +        '<div class="switch_attrText2">'
            +            '<div class="switch_attrDiv" id="localImage'+idd+'"></div><i>本地</i>'
            +            '<div class="switch_attrDiv" id="svgImage'+idd+'"></div><i>图库</i>'
            +        '</div>'
            +    '</div>'
            +    '<ul class="disInpt">'
            +        '<li class="switch_attrP_box1">开状态图</li>'
            +        '<li class="addrelative">'
            +            '<input type="text" name="textfield" id="switchFileTxtElement_0'+idd+'" class="txt switchInput" disabled />'
            +            '<input type="button" class="switchBtn switchInput switch_butt addposition" value="浏览" disabled />'
            +            '<input type="text" name="fileField" class="file switchBtn openSwitchFile switchInput switch_butt addposition filetext" disabled/>'
            +        '</li>'
            +    '</ul>'
            +    '<ul class="disInpt">'
            +        '<li class="switch_attrP_box1">关状态图</li>'
            +        '<li class="addrelative">'
            +            '<input type="text" name="textfield" id="switchFileTxtElement_1'+idd+'" class="txt switchInput" disabled />'
            +            '<input type="button" class="switchBtn switchInput switch_butt addposition" value="浏览" disabled />'
            +            '<input type="text" name="fileField" class="file switchBtn closeSwitchFile switchInput switch_butt addposition filetext" disabled/>'
            +        '</li>'
            +    '</ul>'
            +'</div>'
            +'</fieldset>'
            +'<fieldset class="switch_at" id="switchwrite'+idd+'">'
            +'<legend>设置</legend>' 
            +    '<div class="switch_att"><i>开提示</i><input type="text" class="switch0'+idd+'" value="打开"/></div>'
            +    '<div class="switch_att"><i>关提示</i><input type="text" class="switch1'+idd+'" value="关闭"/></div>'
            +    '<div class="switch_att"><i>提示信息</i><input type="text" class="switch2'+idd+'" value="设备名称信息"/></div>'
            +'</fieldset>';
        $(".tc33").append(switchHtml);
    };
    this.switchPageFeatures = function(idd) {
        var controlObj = $('#'+idd);
        var svgImage = $('#svgImage'+idd);
        var localImage = $('#localImage'+idd);
        /*******图片来源初始化********/
        if (controlObj.attr('imageSource') === 'svg') {
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
        } else if (controlObj.attr('imageSource') === 'local'){
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
        }
        /*******图片来源选择********/
        svgImage.bind('click', function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'svg');
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        localImage.bind('click', function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'local');
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        var initTipInfo = function() { //开关控件【开关读写】属性页初始化
            if ($("#"+idd).attr("openbtn")) {
                $(".switch0"+idd).val($("#"+idd).attr("openbtn"));
            }
            if ($("#"+idd).attr("closebtn")) {
                $(".switch1"+idd).val($("#"+idd).attr("closebtn"));
            }
            if ($("#"+idd).attr("tabbtn")) {
                $(".switch2"+idd).val($("#"+idd).attr("tabbtn"));
            }
        };
        initTipInfo();
        $(".switch0"+idd).bind('input', function(){
            if (inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                var val1 = $(this).val();
                $("#"+idd).attr("openbtn",val1);
            } else {
                $(this).val('');
            }
        });
        $(".switch1"+idd).bind('input', function(){
            if (inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                var val2 = $(this).val();
                $("#" + idd).attr("closebtn", val2);
            } else {
                $(this).val('');
            }
        });
        $(".switch2"+idd).bind('input', function(){
            if (inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                var val3 = $(this).val();
                $("#"+idd).attr("tabbtn",val3);
            } else {
                $(this).val('');
            }
        });
        var openSwitchFileElement = $(".openSwitchFile");
        var closeSwitchFileElement = $(".closeSwitchFile");
        var switchContrl = $("#SwitchImage-"+idd);
        var webPageUrlTxt = $(".urlTxt");
        var urlText = $("#switchFileTxtElement_0");
        var disabledElements;
        webPageUrlTxt.val(webPageUrlTxt.context.URL.split("///")[1]);
        $('#switchFileTxtElement_0'+idd).val($('#'+idd).attr('openImageUrl'));
        $('#switchFileTxtElement_1'+idd).val($('#'+idd).attr('closeImageUrl'));
        /*===========初始读写============*/
       if(switchContrl.attr("literacy")=="on"){
           $("#switchliteracy1"+idd).css({
               "background":"#b5dcf0"
           });
           $("#switchliteracy1"+idd+" input").attr({
               "checked":"checked"
           });
           $("#switchwrite"+idd).css({
               "display":"none"
           })
       }else if(switchContrl.attr("literacy")=="off"){
           $("#switchliteracy2"+idd).css({
               "background":"#b5dcf0"
           });
           $("#switchliteracy2"+idd+" input").attr({
               "checked":"checked"
           });
           $("#switchwrite"+idd).css({
               "display":"block"
           })
       }
       $("#switchliteracy1"+idd).bind("click",function(e){
           switchContrl.attr({"literacy":"on"});
           $("#switchwrite"+idd).css({
               "display":"none"
           })
           $(this).css({
               "background":"#b5dcf0"
           });
           $("#switchliteracy2"+idd).css({
               "background":"#f3f3f3"
           });
       });
        $("#switchliteracy2"+idd).bind("click",function(e){
           switchContrl.attr({"literacy":"off"});
           $("#switchwrite"+idd).css({
               "display":"block"
           })
           $(this).css({
               "background":"#b5dcf0"
           });
           $("#switchliteracy1"+idd).css({
               "background":"#f3f3f3"
           });
       });
       /*==============初始同步开关=====================*/
        var switchInit = function(){
            if(switchContrl.attr("index") == "0"){
                $(".switchRadio").children("input").removeProp("checked");
                $(".switchRadio_0").prop("checked",true);
                $(".switchRadio").siblings().css({
                   "background":"url(images/weixuan.png)"
                });
                $(".switchRadio_0").siblings().css({
                    "background":"url(images/yixuan.png)"
                });
            }if(switchContrl.attr("index") == "1"){
                $(".switchRadio").children("input").removeProp("checked");
                $(".switchRadio_1").prop("checked",true);
                $(".switchRadio").siblings().css({
                    "background":"url(images/weixuan.png)"
                });
                $(".switchRadio_1").siblings().css({
                    "background":"url(images/yixuan.png)"
                });
            }if(switchContrl.attr("index") == "2"){
                $(".switchRadio").children("input").removeProp("checked");
                $(".switchRadio_2").prop("checked",true);
                $(".switchRadio").siblings().css({
                    "background":"url(images/weixuan.png)"
                });
                $(".switchRadio_2").siblings().css({
                   "background":"url(images/yixuan.png)"
                });
            }if(switchContrl.attr("index") == "3"){
                $(".switchRadio").children("input").removeProp("checked");
                $(".switchRadio_3").prop("checked",true);
                $(".switchRadio").siblings().css({
                    "background":"url(images/weixuan.png)"
                });
                $(".switchRadio_3").siblings().css({
                    "background":"url(images/yixuan.png)"
                });
            }
            if(switchContrl.attr("index") == "4"){
                $(".switchRadio").children("input").removeProp("checked");
                $(".switchRadio_4").prop("checked",true);
                $(".switchRadio").siblings().css({
                    "background":"url(images/weixuan.png)"
                });
                $(".switchRadio_4").siblings().css({
                   "background":"url(images/yixuan.png)"
                });
            }
            if(switchContrl.attr("index") == "5"){
                $(".switchRadio").children("input").removeProp("checked");
                $(".switchRadio_5").prop("checked",true);
                $(".switchRadio").siblings().css({
                    "background":"url(images/weixuan.png)"
                });
                $(".switchRadio_5").siblings().css({
                   "background":"url(images/yixuan.png)"
                });
            }
            if(switchContrl.attr("index") == "6"){
                $("#definitionSwitch"+idd).prop("checked",true);
                $("#definitionSwitch"+idd).siblings().css({
                    "background":"url(images/yixuan.png)"
                });
                $(".switchRadio").siblings().css({
                    "background":"url(images/weixuan.png)"
                });
                $(".disInpt").find("input").removeProp("disabled");
                urlText.val(switchContrl.attr("backg"));
                $(".switchRadio").children("input").removeProp("checked");
            }
            $(".switchRadio").each(function(i){
                $(this).bind("click",function(e){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).siblings().css({
                        "background":"url(images/yixuan.png)"
                    });
                    $(this).parents(".off").siblings(".off").find(".switch_attr_butadd").css({
                        "background":"url(images/weixuan.png)"
                    });
                    $("#definitionSwitch"+idd).siblings().css({
                        "background":"url(images/weixuan.png)"
                    });
                    $("#definitionSwitch"+idd).removeProp("checked");
                    $(".disInpt").find("input").prop({
                      disabled: true
                    });
                    e = e || window.event;
                    e.stopPropagation();
                    var _this = $(this);
                    var switchSrc;
                    var switchContrl = $("#SwitchImage-"+idd);
                    urlText.val('');
                    $(".switchRadio").removeProp("checked");
                    _this.prop("checked","checked");
                    switchSrc = _this.parents(".switch_attrP_box2").siblings(".switch_attrP_box3").children().attr('src');
                    var arr = switchSrc.split('.');
                    switchSrc=arr[0];          
                    if(i != 4 && i != 5){
                        switchSrc=switchSrc+".svg";
                        switchContrl.attr({"backg":switchSrc,"index":i});
                        switchContrl.css({"backgroundImage":"url(" + switchSrc + ")", "background-size":"100% 100%"});
                        $("#"+idd).attr("pip_imgs","no");
                    } 
                    if(i == "4"){
                        var pip_src = _this.parents(".switch_attrP_box2").siblings(".switch_attrP_box3").children().attr('src');
                        var arr_4 = pip_src.split('.');
                        pip_src=arr_4[0];
                        pip_src = pip_src+".png";
                        switchContrl.css({"backgroundImage":"url(" + pip_src + ")", "background-size":"100% 100%"});
                        $("#"+idd).attr("pip_imgs","yes");
                        switchContrl.attr({"backg":pip_src,"index":i});                      
                    }
                    if(i == "5"){
                        var pip_src = _this.parents(".switch_attrP_box2").siblings(".switch_attrP_box3").children().attr('src');
                        var arr_5 = pip_src.split('.');
                        pip_src=arr_5[0];
                        pip_src = pip_src+".png";
                        switchContrl.css({"backgroundImage":"url(" + pip_src + ")", "background-size":"100% 100%"});
                        $("#"+idd).attr("pip_imgs","yes");
                        switchContrl.attr({"backg":pip_src,"index":i});
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            });
        };
        switchInit();
        var definitionSwitchshow = function() {
            openSwitchFileElement.bind("click",function(){ //开状态图
                var beforeLog = inTtCommand.log();
                webapi.addLog('before',beforeLog);
                $('#'+idd).attr('switch', 'open');
                if (controlObj.attr('imageSource') == 'local') { //选择图片来源是本地图片
                    webapi.getImagePath('images');
                } else if (controlObj.attr('imageSource') == 'svg') { //选择图片来源是图库图片
                    webapi.getSvgPath('images');
                }
                var afterLog = inTtCommand.log();
                webapi.addLog('after',afterLog);
            });
            closeSwitchFileElement.bind("click", function() { //关状态图
                var beforeLog = inTtCommand.log();
                webapi.addLog('before',beforeLog);
                $('#'+idd).attr('switch', 'close');
                if (controlObj.attr('imageSource') == 'local') { //选择图片来源是本地图片
                    webapi.getImagePath('images');
                } else if (controlObj.attr('imageSource') == 'svg') { //选择图片来源是图库图片
                    webapi.getSvgPath('images');
                }
                var afterLog = inTtCommand.log();
                webapi.addLog('after',afterLog);
            });
        };
        definitionSwitchshow();
        //自定义开关
        $("#definitionSwitch"+idd).bind("click",function(e){
            $(".switchRadio").siblings().css({
                "background":"url(images/weixuan.png)"
            });
            $(this).siblings().css({
                "background":"url(images/yixuan.png)"
            });
            e = e || window.event;
            e.stopPropagation();
            $(this).prop("checked","checked");
            $(".switchRadio").removeProp("checked");
            disabledElements = $(".disInpt").find("input");
            disabledElements.removeProp("disabled");
            if ($('#SwitchImage-'+idd).attr('switchStatus') === 'on') {
                switchContrl.css({"backgroundImage":"url(" +$('#'+idd).attr('openImageUrl') + ")", "background-size":"100% 100%"});//jia
            } else {
                switchContrl.css({"backgroundImage":"url(" +$('#'+idd).attr('closeImageUrl') + ")", "background-size":"100% 100%"});//jia
            }
            switchContrl.attr({"index":6});
        });
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var switchElement = srcIdElement.children("#SwitchImage-"+srcId);
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var clas = srcIdElement.attr("class");
        var switchUrl = switchElement.attr('backg');
        var index = switchElement.attr("index");
        var type = switchElement.attr('literacy'); //判断是开关显示、开关读写类型 on-开关显示 off-开关读写
        var imageSource = srcIdElement.attr('imageSource');
        desIdElement.attr({
            "openImageUrl": srcIdElement.attr("openImageUrl"),
            "closeImageUrl": srcIdElement.attr("closeImageUrl"),
            'openbtn': srcIdElement.attr('openbtn'),
            'closebtn': srcIdElement.attr('closebtn'),
            'tabbtn': srcIdElement.attr('tabbtn'),
            'imageSOurce': imageSource
        });
       	$('#SwitchImage-'+desId).attr({
            'backg': switchUrl,
            'switchStatus': $('#SwitchImage-'+srcId).attr('switchStatus'),
            'literacy': type
        });
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px",
            "line-height":hige+ "px"
        }).addClass(clas).children("#SwitchImage-"+desId).attr({"index":index});
        var abcnum=$("#SwitchImage-"+srcId).attr("index");
        if(abcnum=="6"){
        	var abc;
        	if($('#SwitchImage-'+srcId).attr('switchStatus') === 'on') {
                abc=$('#'+srcId).attr('openImageUrl');
            } else {
            	abc=$('#'+srcId).attr('closeImageUrl');
            }
        	$("#SwitchImage-"+desId).css({"background":"url("+abc+") no-repeat center center", "background-size":"100% 100%"});
        }else{
        	$("#SwitchImage-"+desId).css({"background":"url("+switchUrl+") no-repeat center center", "background-size":"100% 100%"});
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
//场景组态控件
var SceneControl = function(){
    this.configId = -1;
    this.createSceneControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.sceneElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Scene_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move" navType ="single" nodeType="page"><div id="navBox" class="navBox'+idd+'">'+
						'<img class="headPic" src="images/skin_head3.png" />'+
						'<ul class="parentUl">'+
							'<li style="margin-left:17px">'+
								'<span class=" displayblock">'+
									'<img class=" skin_0" src="images/parents3.png">'+
									'<a class=" imgDistance" >BMS</a>'+
								'</span></ul>'+
							'</li>'+
						'</ul>'+
					'</div></div>');
        textdiv.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        //控件相关样式
         $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolleft+"px",
            "top": y +scroltop +"px",
            "width": 172 + "px",
            "height": 412 + "px"
        });
        $("#navBox").css({            
            "width":100+"%",
            "height":100+"%",
            "background-image":"url(images/skin_left3.png)",
            "background-repeat":"no-repeat",
            "background-size":"100% 100%"           
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.scenePropertiesPage(selecteId);
        this.scenePageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.scenePropertiesPage = function(idd){
        var sceneBtn = $('<div id="tc3'+idd+'" class="tc33"></div>');
        $("#fathy").append(sceneBtn);
        var sceneHtml = '<fieldset class="switch_at" id="switchwrite'+idd+'">'
                        +'<legend>设置</legend>' 
                        +    '<div class="sceneAdress">'
                        +        '<span>包含文件的地址:</span>'
                        +        '<input type="text" class="sceneTxt sceneAdressTxt"/>'
                        +    '</div>'
                        +'</fieldset>'
                        +'<fieldset class="switch_at" id="switchwrite'+idd+'">'
                        +'<legend>节点属性</legend>' 
                        +'<div class="scene_0">'
                        +   '<span>场景样式选择</span>'
                        +   '<select class="scene_1" id="type'+idd+'"><option value="单窗口模式" id="single" selected>单窗口模式</option><option id="multi" value="双窗口模式">双窗口模式</option></select>'
                        +'</div>'
                        +'<div class="scene_0">'
                        +'<span>节点名称</span><input class="scene_name scene_name'+idd+'" type="text" />'
                        +'</div>'  
						+'<div class="scene_0">'
                        +   '<span>节点样式</span>'
                        +   '<div class="scene_1" id="nodeType'+idd+'">'
						+		'<label><input name="Type" type="radio" value=""  class="page" disabled/><span>网页</span> </label> '
						+		'<label><input name="Type" type="radio" value="" class="menu" disabled /><span>菜单</span> </label> '
						+	'</div>'
                        +'</div>'
                        +'<div class="scene_0"><span>场景动作选择</span><button class="scene_2" id="addNode" >增加</button>'
						+'<button class="scene_3" id="removeNode" disabled>删除</button></div>'
                        +'<div class="scene_0">链接场景文件</div>'
                        +'<input type="text" name="textfield" class="sceneTxt sceneBgTxt srcTxt" disabled />'
                        +'<input type="button" class="sceneBtn sceneBtn3'+idd+'" value="浏览" />'
                        +'</fieldset>';             
        $(".tc33").append(sceneHtml);
    };
    var me;
    this.scenePageFeatures = function(idd) {
        var sceneElement = $("#"+idd);
		var navBox =sceneElement.find("#navBox");	
		var addNode = $("#addNode");
		var removeNode = $("#removeNode");
        var readHtmlBtn = $("#sceneBtn3"+idd);
        var nodePage = $(".page");
        var nodeMenu = $(".menu");
        var srcTxt = $(".srcTxt");
		var grade;
        var sceneFeatures = {
            filesAddress:function(){
                var fileAddresShow = $(".sceneAdressTxt");
                var fileAddressUrl = fileAddresShow.context.URL;
                var fileAddressPage = fileAddressUrl.split("///");
                var last = fileAddressPage[1].lastIndexOf("/");
                var fileAddressFolder = fileAddressPage[1].substring(0,last);
                fileAddresShow.val(fileAddressFolder);
            },
			creatNavTree:function (idd) {//创建导航树
				$("#"+idd).on("mousedown","a",function(event){ //选择中所添加节点的父级节点
					var _this = $(this);
                    me = $(this);
                    $(".scene_name"+idd).val($(this).text());
                    $("#"+idd).attr("noedtext",$(this).text());
					event.preventDefault();
					event.stopPropagation();
					$.each(navBox.find("a"),function(){ //遍历删除选中节点样式及属性
						$(this).removeClass("addChildrenColor").removeAttr("addChildrenNode");
					});
					_this.addClass("addChildrenColor").attr("addChildrenNode","addChildrenNode");
					if($(this).attr("nodeType") == "page"){
						sceneFeatures.forbidAdd();
					}if($(this).attr("hasConectHtml") == "hasConectHtml"){//判断是否添加超链接
						sceneFeatures.forbidAdd();
					}if(navBox.find("ul").length > 1){
						if($(this).parents("span").next("ul").length >= 1){
							removeNode.attr("disabled",true).css("background","#ccc");
							readHtmlBtn.attr("disabled",true).css("background","#ccc");
							srcTxt.attr("disabled",true);
							addNode.removeAttr("disabled").css("background","#666");
							nodeMenu.attr("checked",true);
							nodePage.removeAttr("checked");
						}if($(this).parent("span").next("ul").length < 1){
							addNode.removeAttr("disabled").css("background","#ccc");
							removeNode.removeAttr("disabled").css("background","#666");
							readHtmlBtn.removeAttr("disabled").css("background","#666");
							srcTxt.removeAttr("disabled");
							nodePage.attr("checked",true);
							nodeMenu.removeAttr("checked");
							nodePage.removeAttr("disabled");
							nodeMenu.removeAttr("disabled");
						}
					}
                    if(me.attr("navtype") == "single"){
                        $("#single").attr("selected",true);
                        $("#multi").removeAttr("selected");
                    }else{
                        $("#multi").attr("selected",true);
                        $("#single").removeAttr("selected");
                    }
				});
				addNode.bind("click",function(){	//添加dom节点
					var elseNode_str = $('<li>'+
						'<span class=" height displayblock">'+
							'<img class=" marginLeft bar_0" src="images/parent3.png">'+
							'<a class=" imgDistance" nodeType="page" navType="single" >B楼</a>'+
						'</span>'+
					'</li>');
					var fNode_str = $('<ul><li><span class=" height displayblock">'+
						'<img class=" marginLeft bar_0" src="images/parent3.png">'+
						'<a class=" imgDistance" nodeType="page" navType="single" >A楼</a>'+
					'</span></li></ul>');
					$.each(navBox.find("a"),function(i){
						var _this = $(this);
						if($(this).attr("addChildrenNode") == 'addChildrenNode'){
							var len = $(this).parent("span").parent("li").children().length;
							grade = $(this).parents("ul").length;
							var gradeed = $(this).parents("ul").length;
							var moveLeft = (gradeed-1)*20;
							if(gradeed <= 3){
								if($(this).attr("hasConectHtml") == "hasConectHtml"){//判断是否添加超链接
									}else{
										if($(this).attr("nodeType") == "page"){//判断当前节点的类型
											
										}else{
											var beforeLog = inTtCommand.log();
											webapi.addLog('before', beforeLog);
											if(len <= 1){
												$(this).parent("span").parent("li").append(fNode_str);//添加第一个节点
											}else{
												$(this).parent("span").parent("li").children("ul").append(elseNode_str);//其余节点
											};
											var afterLog = inTtCommand.log();
											webapi.addLog('after', beforeLog);
										}
									}
							}
                            if(gradeed == 1){
                                removeNode.attr("disabled",true).css("background","#ccc");
                                readHtmlBtn.attr("disabled",true).css("background","#ccc");
                                nodePage.attr("disabled",true).css("background","#ccc");
                                nodeMenu.attr("disabled",true).css("background","#ccc");
                            }
							$(this).parent("span").next("ul").children("li").children("span").css("margin-left",moveLeft+'px');//改变节点的位置
							if(gradeed == 2){
								if($(this).attr("RootNode") == undefined){
									$(this).parent("span").next("ul").attr("gradeed",gradeed);
									var nodeObj = $(this).parent("span").next("ul").children("li").children("span");
									var lastNodeLen = nodeObj.length;
									for(var i = 0;i < lastNodeLen;i++){
										$(nodeObj[i]).addClass("background_1").removeClass("background_2");
									}
									$(nodeObj[lastNodeLen-1]).addClass("background_2").removeClass("background_1");
									$(this).parent("span").next("ul").children("li").children("ul").children("li").each(function(){
										$(this).addClass("background_3");
									});
									$(this).parent("span").next("ul").children("li").find("img").attr("src","images/sun3.png");
							        $(this).parent("span").next("ul").children("li").find("img").addClass("bar_1");
								}
								$(".page").attr("checked",true);
							} 
							if(gradeed == 3){
								if($(this).attr("RootNode") == undefined){
									$(this).parent("span").next("ul").attr("gradeed",gradeed);
									var nodeObj = $(this).parent("span").next("ul").children("li").children("span");
									var lastNodeLen = nodeObj.length;
									for(var i = 0;i < lastNodeLen;i++){
										$(nodeObj[i]).addClass("background_1").removeClass("background_2");
										$(nodeObj[i]).parent("li").addClass("background_3").css("margin-left","20px");
										$(nodeObj[i]).parent("li").children("span").css("margin-left","20px");
									}
									$(nodeObj[lastNodeLen-1]).addClass("background_2").removeClass("background_1");
									var lastNode = $(this).parent("span").parent("li").index();
									var allNode = $(this).parent("span").parent("li").parent("ul").children("li").length;
									if(lastNode == (allNode-1)){
										$(this).parent("span").next("ul").children("li").each(function(){
											$(this).removeClass("background_3");
										})
									}
									$(this).parent("span").next("ul").children("li").find("img").attr("src","images/sun3.png");
                                    $(this).parent("span").next("ul").children("li").find("img").addClass("bar_1");
									$(".page").attr("checked",true);
									var src = $(".skin_0").parent("span").next("ul").children("li:first").find("img").attr("src");
									$(this).parent("span").children("img").attr({"src":src,"changImg":"changImg"});
								}
							}
						}
					})
				});
			},
			removenode:function(){//删除导航节点
				removeNode.on("click",function(e){
					var beforeLog = inTtCommand.log();
					webapi.addLog('before', beforeLog);
					$("a").each(function(e){
						var grade = $(this).parents("ul").length;
						if($(this).attr("RootNode") != "RootNode"){
							if($(this).attr("addChildrenNode") == 'addChildrenNode'){
								if($(this).parent("span").next("ul").length == 0){
									var indx = $(this).parent("span").parent("li").index();
									var len = $(this).parent("span").parent("li").parent("ul").children("li").length;
									if(len == 1){//只有一个字节点时删除容器UL 
										var src = $(this).parent("span").children("img").attr("src");
										$(this).parent("span").parent("li").parent("ul").parent("li").find("img").attr("src",src);
										$(this).parent("span").parent("li").parent("ul").remove();
									}else{
										if(len == indx+1 && grade >= 3){//为最后一个元素是改变对图片样式
											$(this).parent("span").parent("li").parent("ul").children("li").children("span").eq(indx-1).addClass("background_2").removeClass("background_1");
										}
										$(this).parent("span").parent("li").remove();
									}
								}else{
									alert("亲：还有子元素不可删除哦！");
								}
							}
						}
					})
					var afterLog = inTtCommand.log();
					webapi.addLog('after', beforeLog);
				});
			},
			navTreeSide:function(){
                if(me){                   
                    $(".scene_name"+idd).val($("#"+idd).attr("noedtext"));
                }
                $(".scene_name"+idd).bind("input",function(){
                    me.text($(this).val());
                    $("#"+idd).attr("noedtext",$(this).val());
                });
				$("#navBox").off("mousedown").on("mousedown","img",function(event){ //导航收缩
					event.stopPropagation();
					$(this).parent("span").next("ul").slideToggle(300);		
				});
                $(".config_dis"+idd).attr("disabled","true");
			},
			setConectHtml:function(idd){ //添加超链接
				$(".sceneBtn3"+idd).bind("click",function() {
                    if (me.parent("span").next("ul").length < 1) {
                        webapi.getPath("html");
                    }
                })
			},
			selectedNode:function(key,value){ //给当前节点类型(单窗或双窗)
				$.each(navBox.find("a"),function(i){
					if($(this).attr("addChildrenNode") == 'addChildrenNode'){
						$(this).attr(key,value);
					}
				})
			},
            selectNavType:function(idd){
				$("#type"+idd).bind("change",function(){
					var _this = $(this);
					$(".scene_1").children("option").each(function(i){
						if(_this.val() == $(this).val()){
							if(i == 0){
								sceneFeatures.selectedNode("navType","single");
							}else{
								sceneFeatures.selectedNode("navType","multi");
							}
							$(this).attr("selected","selected").siblings("option").removeAttr("selected");
						}
					})
					
				})
			},
			selectNodeType:function(idd){  //节点类型切换
				$("#nodeType"+idd).find("input").each(function(i){
					$(this).bind("change",function(){
						if(i == 0){
							sceneFeatures.selectedNode("nodeType","page");
							$(".srcTxt").removeAttr("disabled");
							addNode.css("background","#ccc");
                            $("#single").attr("selected",true);
                            $("#multi").removeAttr("selected");
						}else{
							sceneFeatures.selectedNode("nodeType","menu");
							$(".srcTxt").attr("disabled","disabled");
							addNode.css("background","#333");
							$(this).attr("checked","checked").siblings("input").removeAttr("checked");
                            $("#multi").attr("selected",true);
                            $("#single").removeAttr("selected");
						}
					})
					
				})
			},
			forbidAdd:function(){ //禁止添加，灰化添加按钮
				addNode.css("background","#ccc");
				addNode.bind("click",function(){
					return false;
				})
			},
			init:function(idd){
                this.filesAddress();
				this.creatNavTree(idd);
				this.removenode();
				this.navTreeSide();
				this.setConectHtml(idd);
				this.selectNavType(idd);
				this.selectNodeType(idd);
            }
        };
        sceneFeatures.init(idd);
    };
};
/**********************编辑框控件**************************/
var EditBox = function(){
    this.configId = -1;
    this.createEditBoxControl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.EditElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Edit_" + this.configId;
        this.id = idd;
        var textdiv = '<div id='+idd+' class="contrl" DataType="0,1,2,3" sure="yes" success="yes" fails="yes">'+
                            '<div class="editchil editchil'+idd+'">'+
                                '<div id="editaction0-'+idd+'" class="editval editvall'+idd+'"><input id="editInputValue-'+idd+'" class="editinput editval'+idd+' editc'+idd+'" type="text" value="0"/></div>'+
                                '<span class="editline editremove'+idd+'"><span class="editlinechild"></span></span>'+
                                '<div class="editbtn editbutton'+idd+' editremove'+idd+'" style="overflow:hidden">'+
                                    '<button id="editaction1-'+idd+'" class="editmove determine editremove'+idd+' determine'+idd+'" style="float:left">确定</button>'+
                                    '<span class="editbtnline"><span class="editbtnlined"></span></span>'+
                                    '<button id="editaction2-'+idd+'" class="editmove cancel editremove'+idd+' cancel'+idd+'" style="float:left">取消</button>'+
                                '</div>'+
                            '</div>'+
                    '</div>';
        $('#content').append(textdiv);
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolleft+"px",
            "top": y + scroltop +"px",
            "width": 142 + "px",
            "height": 60 + "px"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.EditPropertiesPage(selecteId);
        this.EditPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.EditPropertiesPage = function(idd){
        var proAttributes = '<div id="tc3'+idd+'" class="tc33">'+
                                '<fieldset class="attrs editattr">'+
                                    '<legend>常规</legend>'+
                                    '<div class="editfontcolor">文字颜色<input class="editcolor'+idd+' editcolorsize" type="color"/></div>'+
                                    '<div class="editfontcolor">背景颜色<input class="editbgcolor'+idd+' editcolorsize" type="color"/></div>'+
                                    '<div class="button_attr3P editfontcolor"><div class="lf">显示按钮</div><div class="editshowbtn'+idd+' button_attr3_but editshowbtn"></div></div>'+
                                    '<div class="slider_attrText"><i>确认控制命令</i><div class="slider_attrDiv" id="pro2'+idd+'"></div></div>' +
                                    '<div class="slider_attrText"><i>报告成功命令</i><div class="slider_attrDiv" id="pro3'+idd+'"></div></div>' +
                                    '<div class="slider_attrText"><i>报告失败命令</i><div class="slider_attrDiv" id="pro4'+idd+'"></div></div>' +
                                '</fieldset>'+
                            '</div>';
        $("#fathy").append(proAttributes);
    };
    var opconoff = false;
    this.EditPageFeatures = function(idd){
        var confirmOrder = $("#pro2"+idd);
        var successOrder = $("#pro3"+idd);
        var failOrder = $("#pro4"+idd);
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);
        /******打开属性页时字体颜色和背景色设置函数*******/
        $.fn.getHexBackgroundeditColor = function(){
            var rgb = $(".editc"+idd).css('color');
            var rgbb = $(".editval"+idd).css('background-color');
            $(".editcolor"+idd).val(inItPropertiesPage.formatColor(rgb));
            $(".editbgcolor"+idd).val(inItPropertiesPage.formatColor(rgbb));
        };
        $.fn.getHexBackgroundeditColor();
        /******文字颜色设置*******/
        inItPropertiesPage.setColor($(".editcolor"+idd), ['color', $(".editval"+idd), 'color', $(".editremove"+idd)]);
        /******背景颜色设置*******/
        inItPropertiesPage.setColor($(".editbgcolor"+idd), ['background-color', $(".editval"+idd)]);
        /****显示按钮****/
        
        if($("#"+idd).attr("valued") != "nobtn"){
            $(".editshowbtn"+idd+"").css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }else{
            $(".editshowbtn"+idd+"").css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        $(".editshowbtn"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(opconoff == true){
                $(".editshowbtn"+idd+"").css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                var editbtn = $('<div class="editbtn editbutton'+idd+' editremove'+idd+'" style="overflow:hidden">'+
                    '<button class="editmove determine editremove'+idd+' determine'+idd+'" style="float:left">确定</button>'+
                    '<span class="editbtnline"><span class="editbtnlined"></span></span>'+
                    '<button class="editmove cancel editremove'+idd+' cancel'+idd+'" style="float:left">取消</button>'+
                    '</div>');
                var editline = $('<div class="editline editremove'+idd+'"><div class="editlinechild"></div></div>');
                $(".editvall"+idd).css({
                    "height":50+'%',
                    "-webkit-border-bottom-left-radius": 0,
                    "-webkit-border-bottom-right-radius": 0
                });
                editline.appendTo($(".editchil"+idd));
                editbtn.appendTo($(".editchil"+idd));
                var editcolor = $(".editval"+idd).css("color");
                $(".editremove"+idd).css("color",editcolor);
                $("#"+idd).removeAttr("valued");
            }else{
                $("#"+idd).attr("valued","nobtn");
                $(".editshowbtn"+idd+"").css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".editremove"+idd).remove();
                $(".editvall"+idd).css({
                    "height":100+'%'
                });
            }
            opconoff=!opconoff;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
    };
    this.copy = function (srcId, desId){
        $(".editinput").blur();
        var srcIdElement = $("#" + srcId);
        var desIdElement = $("#" + desId);
        var contrlElementbtn = $('#' + srcId + ' .editval' + srcId + '');
        var higebtn = srcIdElement.height();
        var widebtn = srcIdElement.width();
        var editval = srcIdElement.attr("valued");
        var editclass = srcIdElement.attr("class");
        var color = contrlElementbtn.css("color");
        var bgcoolor = contrlElementbtn.css("background");
        desIdElement.attr("valued",editval);
        desIdElement.css({
            "width": widebtn + 'px',
            "height": higebtn + 'px',
            "line-height": higebtn + 'px'
        }).addClass(editclass);
        $('#' + desId + ' .editval' + desId + '').css({
            "color": color,
            "background": bgcoolor
        });

        if (srcIdElement.attr("valued") == "nobtn") {
            $(".editremove" + desId).remove();
            $(".editvall" + desId).css({
                "height": 100 + "%"
            });
        }else{
            $('#' + desId + ' .editremove' + desId + '').css("color", color);
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
/*******************列表框控件*************************/
var ListBox = function(){
    this.configId = -1;
    this.createListBoxControl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.ListElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "List_" + this.configId;
        this.id = idd;
        var textdiv = '<div id='+idd+' class="contrl" DataType="0,1,2,3">'+
                           '<div class="list'+idd+' list"></div>'+
                      '</div>';
        $('#content').append(textdiv);
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolleft+"px",
            "top": y + scroltop +"px",
            "width": 100 + "px",
            "height": 150 + "px",
            "background-color":"#fff"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd);//添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.ListPropertiesPage(selecteId);
        this.ListPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.ListPropertiesPage = function(idd){
        var proAttributes = '<div id="tc3'+idd+'" class="tc33">'+
                                '<fieldset class="attrs">'+
                                '<legend>设置列表框数据项</legend>'+
                                    '<div class="listfather">'+
                                        '<div class="listdiv">数据项名称：<input class="rt listinput listname'+idd+'" type="text"/></div>'+
                                        '<div class="listdiv">数据项值：<input class="rt listinput listdata'+idd+'" type="text"/></div>'+
                                        '<div class="listdiv">数据项个数：<input class="rt listinput listcount listcount'+idd+'" type="text" readonly value="0"/></div>'+
                                        '<div class="checkboxDataBox">' +
                        '<div class="listdiv"><span class="listnumber">序号</span><span class="listname">名称</span><span class="listdata">下发值</span></div>'+
                        '<div class="listbox listbox listbox'+idd+'">'+'</div>'+
                        '<div class="listdiv">' +
                            '<span class="btnhover listadd'+idd+'">添加</span>' +
                            '<span class="btnhover listup'+idd+'">上移</span>' +
                            '<span class="btnhover listdown'+idd+'">下移</span>' +
                            '<span class="btnhover listremove'+idd+'">删除</span>' +
                        '</div>'+
                    '</div>'+
                                    '</div>'+
                                '</fieldset>'+
                            '</div>';
        $("#fathy").append(proAttributes);
    };
    var listcountd = 0;
    this.ListPageFeatures = function(idd){
        /*****属性页中鼠标选择*****/
        $(".listp").css("background-color","#fff").removeAttr("select");//初始化鼠标选中
        $("body").on("mousedown",".listp",function(){
            $(this).css("background-color","#9dd6f2").attr("select","selected");
            $(this).siblings(".listp").css("background-color","#fff").removeAttr("select");
            $("#"+idd).attr("list","select");
        });
        /*******添加功能********/
        var name;
        var data;
        var lastnum;
        $(".listadd"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            name = $(".listname"+idd).val();
            data = $(".listdata"+idd).val();
            lastnum = parseInt($("div.listp:last b").text())+1;
            if($("div.listp:last b").text() == ""){
                lastnum = 0;
            }
        });
        $(".listadd"+idd).mouseup(function(){
            if(name != "" && data != ""){
                listcountd++;
                var listpagedom = '<div class="listp pointer"><b class="listnum"></b><a class="listename"></a><span class="listdate"></span></div>';
                $(".listbox"+idd).append(listpagedom);
                var listdom = '<div class="listdom listdom'+listcountd+' pointer"></div>';//控件
                $(".list"+idd).append(listdom);//控件
                $("div.listp:last b").text(lastnum);
                $("div.listp:last a:first").text(name).attr("title",name);
                $("div.listp:last span:last").text(data).attr("title",data);
                $(".list"+idd+":last div.listdom"+listcountd+"").text(name).attr("title",data);//控件
                $(".listcount"+idd).val(parseInt($(".listcount"+idd).val())+1);//数据项个数增加
                $(".listdom"+listcountd).attr("initname",name);
                $(".listdom"+listcountd).attr("initdata",data);
                $(".listname"+idd).val("");
                $(".listdata"+idd).val("");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********删除功能***********/
        $(".listremove"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("list")=="select"){
                var selectdiv = $("div.listp[select='selected']");
                var listnum = selectdiv.nextAll();
                $(listnum).each(function(){
                    var listnumb = parseInt($(this).children("b").text());
                    $(this).children("b").text(parseInt(listnumb-1));
                });
                selectdiv.next("div").css("background-color","#9dd6f2").attr("select","selected");
                if($("div.listp").length != 0){
                    $(".listcount"+idd).val(parseInt($(".listcount"+idd).val())-1);//数据项个数减小
                }
                /***控件***/
                var listremove = parseInt(selectdiv.children("b").text());
                if(listremove != isNaN){
                    $("#"+idd+" div.listdom").eq(listremove).remove();
                }
                selectdiv.remove();
            }
            if($("div.listp[select='selected']").length == 0){
                $("#"+idd).removeAttr("list");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /**********上移功能*********/
        $(".listup"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("list")=="select" && $("div.listp[select='selected']").children(".listnum").text() != 0){
                var selectdiv = $("div.listp[select='selected']");
                var listename = selectdiv.children(".listename").text();
                var listedata = selectdiv.children(".listdate").text();
                var listname = selectdiv.prev("div").children(".listename").text();
                var listdata = selectdiv.prev("div").children(".listdate").text();
                selectdiv.prev("div").children(".listename").text(listename);
                selectdiv.prev("div").children(".listdate").text(listedata);
                selectdiv.children(".listename").text(listname);
                selectdiv.children(".listdate").text(listdata);
                /***循环上移***/
                selectdiv.removeAttr("select");
                selectdiv.css("background-color","#fff");
                selectdiv.prev("div").attr("select","selected");
                selectdiv.prev("div").css("background-color","#9dd6f2");
                /****控件****/
                var checkBoxremove = parseInt(selectdiv.children("b").text());
                var check1 = [];
                check1.push($("#"+idd+" div.listdom").eq(checkBoxremove));
                $("#"+idd+" div.listdom").eq(parseInt(checkBoxremove-1)).before(check1[0]);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*******下移功能********/
        $(".listdown"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("list")=="select" && $("div.listp[select='selected']").next().children(".listnum").text() != "") {
                var selectdiv = $("div.listp[select='selected']");
                var listename = selectdiv.children(".listename").text();
                var listedata = selectdiv.children(".listdate").text();
                var listname = selectdiv.next("div").children(".listename").text();
                var listdata = selectdiv.next("div").children(".listdate").text();
                selectdiv.next("div").children(".listename").text(listename);
                selectdiv.next("div").children(".listdate").text(listedata);
                selectdiv.children(".listename").text(listname);
                selectdiv.children(".listdate").text(listdata);
                /***循环下移***/
                selectdiv.removeAttr("select");
                selectdiv.css("background-color","#fff");
                selectdiv.next("div").attr("select","selected");
                selectdiv.next("div").css("background-color","#9dd6f2");
                /****控件****/
                var checkBoxremove = parseInt(selectdiv.children("b").text());
                var check2d = [];
                check2d.push($("#"+idd+" div.listdom").eq(checkBoxremove));
                $("#"+idd+" div.listdom").eq(checkBoxremove+1).after(check2d[0]);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*****初始化列表内容*****/
        var listnum = $("div.list"+idd+" div.listdom");
        $(listnum).each(function(i){
            var initname = $(this).text();
            var initdata = $(this).attr("title");
            var listpagedom = '<div class="listp pointer"><b class="listnum">'+i+'</b><a class="listename">'+initname+'</a><span class="listdate">'+initdata+'</span></div>';
            $(".listbox"+idd).append(listpagedom);
        });
        /*********初始化数据项个数*********/
        var initcoun = $("div.list"+idd+" div.listdom").length;
        $(".listcount"+idd).val(initcoun);
        $(".listp").css("background-color","#fff").removeAttr("select");//初始化鼠标选中
    };
    this.copy = function (srcId, desId){
        var srcIdElement = $("#" + srcId);
        var desIdElement = $("#" + desId);
        var contrlElementbtn = $('#' + srcId + ' .list' + srcId + '');
        var higebtn = srcIdElement.height();
        var widebtn = srcIdElement.width();
        var listval = srcIdElement.attr("list");
        var listclass = srcIdElement.attr("class");
        var listdom = contrlElementbtn.html();
        desIdElement.attr("list",listval);
        desIdElement.css({
            "width": widebtn + 'px',
            "height": higebtn + 'px'
        }).addClass(listclass);
        $(".list"+desId).append(listdom);
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
/*****************复选框控件*******************/
var CheckBox = function(){
    this.configId = -1;
    this.createCheckBoxControl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.CheckBoxElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "CheckBox_" + this.configId;
        this.id = idd;
        var textdiv = '<div id='+idd+' class="contrl checkbox_total" DataType="0,1,2,3" checkfontstyle="left" sure="yes" success="yes" fails="yes">'+
                        '<div class="checkBox'+idd+' checkBox">'+
                            '<div class="checkbox_title checkbox_title' + idd + '">' +
                                '<div class="titleDiv titleDiv'+idd+'"><span>复选标题文本</span></div>' +
                            '</div>' +
                            '<div id="checkboxSelectOption-'+idd+'" class="checkBoxdiv checkBoxdiv'+idd+'"></div>'+
                        '</div>'+
                        '<img id="checkboxSend-'+idd+'" class="sendButton sendButton'+idd+'" src="images/send.png" title="发送"/>' +
                    '</div>';
        $('#content').append(textdiv);
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolleft+"px",
            "top": y + scroltop +"px",
            "width": 142+ "px",
            "height": 60 + "px"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd);//添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.CheckBoxPropertiesPage(selecteId);
        this.CheckBoxPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.CheckBoxPropertiesPage = function(idd){
        var proAttributes = '<div id="tc3'+idd+'" class="tc33">'+
            '<fieldset class="attrs">'+
            '<legend>设置复选列表框数据项</legend>'+
                '<div class="listfather">'+
                    '<div class="listdiv">数据项名称<input class="rt listinput checkBoxname'+idd+'" type="text"/></div>'+
                    '<div class="listdiv">数据项值<input class="rt listinput checkBoxdata'+idd+'" type="text"/></div>'+
                    '<div class="listdiv">时间间隔（秒）<input class="rt listinput timeInterval'+idd+'" type="text"/></div>' +
                    '<div class="listdiv">数据项个数<input class="rt listinput listcount checkBoxcount'+idd+'" type="text" value="0" readonly/></div>'+
                    '<div class="checkboxDataBox">' +
                        '<div class="checkboxList_title"><span class="listnumber">序号</span><span class="listname">名称</span><span class="listdata">下发值</span><span class="listtimeInterval">时间间隔</span></div>'+
                        '<div class="checkboxList_box checkBoxbox'+idd+'">'+'</div>'+
                    '</div>'+
                    '<div class="checkbox_attrText">' +
                        '<span class="btnhover checkBoxadd'+idd+'">添加</span>' +
                        '<span class="btnhover checkBoxup'+idd+'">上移</span>' +
                        '<span class="btnhover checkBoxdown'+idd+'">下移</span>' +
                        '<span class="btnhover checkBoxremove'+idd+'">删除</span>' +
                    '</div>'+
                    '<div class="listdiv"><i>确认控制命令</i><div class="confirm" id="pro2'+idd+'"></div></div>'+
                    '<div class="listdiv"><i>报告成功命令</i><div class="success" id="pro3'+idd+'"></div></div>'+
                    '<div class="listdiv"><i>报告失败命令</i><div class="fail" id="pro4'+idd+'"></div></div>'+
                '</div>'+
            '</fieldset>'+
            '<fieldset class="attrs">' +
                '<legend>常规</legend>' +
                '<div class="listfather">' +
                    '<div class="listdiv"><i>显示背景</i><div class="displayBackground displayBackground'+idd+'"></div></div>' +
                    '<div class="listdiv"><i>背景颜色</i><input id="backgroundColor'+idd+'" class="rt radioSelect backgroundColor'+idd+'" type="color" /></div>' +
                    '<div class="listdiv"><i>显示标题</i><div class="displayTitle displayTitle'+idd+'" checked="checked"></div></div>' +
                    '<div class="listdiv"><i>标题文本</i><input class="rt radioSelect titleText'+idd+'" type="text"/></div>' +
                    '<div class="listdiv"><i>标题颜色</i><input class="rt radioSelect titleColor'+idd+'" type="color" /></div>' +
                '</div>' +
            '</fieldset>' +
        '</div>';
        $("#fathy").append(proAttributes);
    };
    var checkBoxcountd = 0;
    this.CheckBoxPageFeatures = function(idd){
        var inputNameElement = $('.checkBoxname'+idd);
        var inputValueElement = $('.checkBoxdata'+idd);
        var inputTimeIntervalElement = $('.timeInterval'+idd);
        var inputTitleElement = $('.titleText'+idd);
        var originTitle = $('.titleDiv'+idd+' span').html();
        var addButtton = $(".checkBoxadd"+idd);
        var deleteButton = $(".checkBoxremove"+idd);
        var upButton = $(".checkBoxup"+idd);
        var downButton = $(".checkBoxdown"+idd);
        var checknum = $("div.checkBoxdiv"+idd+" div");
        var initcoun = $("div.checkBoxdiv"+idd+" div").length;
        var confirmOrder = $("#pro2"+idd);
        var successOrder = $("#pro3"+idd);
        var failOrder = $("#pro4"+idd);
        var titleDisplay = $('.displayTitle'+idd);
        var bgColorDisplay = $('.displayBackground'+idd);
        var bgColor = $('.backgroundColor'+idd);
        var titleColor = $('.titleColor'+idd);
        var titleText= $('.titleText'+idd);
        var buttonOff2 = true;
        var judaged = true;
        var name;
        var data;
        var timeInterval;
        var lastnum;
        var initTitleText;
        $.fn.getHexBackgroundColor = function() {
            var rg = $('#'+idd).css('background-color'); //背景颜色
            var rgb = $('.titleDiv'+idd+' span').css('color'); //标题颜色
            bgColor.val(inItPropertiesPage.formatColor(rg));
            titleColor.val(inItPropertiesPage.formatColor(rgb));
        };
        $.fn.getHexBackgroundColor1 = function() {
            var rgb = $('.titleDiv'+idd+' span').css('color'); //标题颜色
            titleColor.val(inItPropertiesPage.formatColor(rgb));
            judaged = false;
        };
        var optionFeatures = { //完成属性页可输入文本的验证、完成数据项的添加、删除、上移、下移功能
            limitNameInput: function() { //限制数据项名称的输入
                inputNameElement.bind('keyup', function() {
                    var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
                    if (variableType + '' === 'undefined') {
                        alert('还未进行变量配置');
                        $(this).val('');
                    }
                });
            },
            limitValueInput: function() { //限制数据项值的输入
                inputValueElement.bind('blur', function() {
                    var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
                    var minValue = $('#'+idd).attr('MinEuVal'); //允许输入的最小工程值
                    var maxValue = $('#'+idd).attr('MixEuVal'); //允许输入的最大工程值
                    if (variableType === '开关量') { //配置的变量为‘开关量’
                        if (!inItPropertiesPage.inputValidate.booleanValidate($(this).val())) {
                            $(this).val('');
                        }
                    } else if (variableType === '整型量') { //配置的变量为‘开关量’
                        if (minValue && maxValue) {
                            inputValueElement.attr('minlength', minValue.length);
                            inputValueElement.attr('maxlength', maxValue.length);
                        }
                        if (!inItPropertiesPage.inputValidate.integerValidate($(this).val(), minValue, maxValue)) {
                            $(this).val('');
                        }
                    } else if (variableType === '浮点量') { //配置的变量为‘浮点量’
                        if (!inItPropertiesPage.inputValidate.floatValidate($(this).val(), minValue, maxValue)) {
                            $(this).val('');
                        }
                    } else if (variableType === '字符量') { //配置的变量为‘字符量’
                        if (!inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                            $(this).val('');
                        }
                    } else if (variableType + '' == 'undefined') {
                        alert('还未进行变量配置');
                        $(this).val('');
                    }
                });
            },
            limitTimeIntervalInput: function() { //限制时间间隔的输入
                inputTimeIntervalElement.bind('keyup', function() {
                    if (!inItPropertiesPage.inputValidate.integerValidate($(this).val(), 0)) {
                        $(this).val('');
                    } else {
                        setTimeout(function() {
                            console.log('----');
                            var aa = EventUtil.add('.checkBoxadd'+idd, 'mousedown', 'ok');
                            if ($('.checkBoxadd').is('mousedown')) {
                                console.log('aa');
                            }
                        }, 1000);
                    }
                });
            },
            add: function() { //添加功能
                addButtton.bind('mousedown', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    name = inputNameElement.val();
                    data = inputValueElement.val();
                    timeInterval = inputTimeIntervalElement.val();
                    lastnum = parseInt($("div.listp:last b").text()) + 1;
                    if($("div.listp:last b").text() == ""){
                        lastnum = 0;
                    }
                });
                addButtton.bind('mouseup', function() {
                    if(name != "" && data != "" && timeInterval != ""){
                        var checkboxCount1 = parseInt($('.checkBoxcount'+idd).val());
                        checkBoxcountd++;
                        var checkBoxpagedom = '<div class="listp titleList"><b class="listnum"></b><a class="listename"></a><span class="listdate"></span><span class="timeInterval"></span></div>';
                        $(".checkBoxbox"+idd).append(checkBoxpagedom);
                        var checkBoxdomr = '<div class="checkBoxche checkBoxlabel'+checkBoxcountd+'">' +
                            '<label class="checkboxlab checkboxlab'+checkBoxcountd+'" for="checkBox'+checkBoxcountd+'">' +
                            '<img id="unchecked" class="checkBtn" src="images/unchecked_checkbox.png" />' +
                            '<label for="checkBox'+checkBoxcountd+'">' + name + '</label>' +
                            '</label>' +
                            '</div>';//控件
                        $(".checkBoxdiv"+idd).append(checkBoxdomr);//控件
                        $("div.listp:last b").text(lastnum);
                        $("div.listp:last a:first").text(name).attr("title",name);
                        $("div.listp:last span:first").text(data).attr("title",data);
                        $("div.listp:last span:last").text(timeInterval).attr("title",timeInterval);
                        $(".checkBoxdiv"+idd+" div.checkBoxlabel"+checkBoxcountd+" span").text(name);//控件
                        $(".checkBoxdiv"+idd+" div.checkBoxlabel"+checkBoxcountd+"").attr("title",data);
                        $(".checkBoxdiv"+idd+" div.checkBoxlabel"+checkBoxcountd+"").attr("timeInterval", timeInterval);
                        $(".checkBoxcount"+idd).val(parseInt($(".checkBoxcount"+idd).val())+1);//数据项个数增加
                        $(".checkBoxname"+idd).val("");
                        $(".checkBoxdata"+idd).val("");
                        $(".timeInterval"+idd).val("");
                        if (checkboxCount1 === 0) {
                            $('#'+idd).css({'height': 102 + 'px'});
                        }
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            delete: function() { //删除功能
                deleteButton.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if($("#"+idd).attr("check") == "select"){
                        var selectdiv = $("div.listp[select='selected']");
                        var checkBoxnum = selectdiv.nextAll();
                        if (checkBoxnum.length != 0) {
                            $(checkBoxnum).each(function(){
                                var checkBoxnumb = parseInt($(this).children("b").text());
                                $(this).children("b").text(parseInt(checkBoxnumb-1));
                            });
                            selectdiv.next("div").css("background-color","#9dd6f2").attr("select","selected");
                        }
                        if($("div.listp").length != 0){
                            $(".checkBoxcount"+idd).val(parseInt($(".checkBoxcount"+idd).val())-1);//数据项个数减小
                        }
                        /***控件***/
                        var checkBoxremove = parseInt(selectdiv.children("b").text());
                        if(checkBoxremove != isNaN){
                            $("#"+idd+" div.checkBoxche").eq(checkBoxremove).remove();
                        }
                        selectdiv.remove();
                    }
                    if(selectdiv.length == 0){
                        $("#"+idd).removeAttr("check");
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            up: function() { //上移功能
                upButton.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if($("#"+idd).attr("check") == "select" && $("div.listp[select='selected']").children(".listnum").text() != 0){
                        var selectdiv = $("div.listp[select='selected']");
                        var prevSelectDiv = selectdiv.prev('div');
                        selectdiv.insertBefore(prevSelectDiv);
                        /****控件****/
                        var checkBoxremove = parseInt(selectdiv.children("b").text());
                        var check1 = [];
                        check1.push($("#"+idd+" div.checkBoxche").eq(checkBoxremove));
                        $("#"+idd+" div.checkBoxche").eq(parseInt(checkBoxremove-1)).before(check1[0]);
                        var num1 = selectdiv.children('.listnum').text();
                        var num2 = selectdiv.next('div').children('.listnum').text();
                        selectdiv.children('.listnum').text(num2);
                        prevSelectDiv.children('.listnum').text(num1);
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            down: function() { //下移功能
                downButton.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if($("#"+idd).attr("check") == "select" && $("div.listp[select='selected']").next().children(".listnum").text() != "") {
                        var selectdivd = $("div.listp[select='selected']");
                        var nextSelectDiv = selectdivd.next('div');
                        selectdivd.insertAfter(nextSelectDiv);
                        /****控件****/
                        var checkBoxremove = parseInt(selectdivd.children("b").text());
                        var check2d = [];
                        check2d.push($("#"+idd+" div.checkBoxche").eq(checkBoxremove));
                        $("#"+idd+" div.checkBoxche").eq(checkBoxremove+1).after(check2d[0]);
                        var num1 = selectdivd.children('.listnum').text();
                        var num2 = selectdivd.prev('div').children('.listnum').text();
                        selectdivd.children('.listnum').text(num2);
                        nextSelectDiv.children('.listnum').text(num1);
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            initList: function() { //初始化列表
                $("body").on("mousedown",".listp",function(){
                    $(this).css("background-color","#9dd6f2").attr("select","selected");
                    $(this).siblings(".listp").css("background-color","#fff").removeAttr("select");
                    $("#"+idd).attr("check","select");
                });
                $(checknum).each(function(i){
                    var initname = $(this).text();
                    var initdata = $(this).attr("title");
                    var initTimeInterval = $(this).attr("timeInterval");
                    var listpagedom = '<div class="listp titleList"><b class="listnum">'+i+'</b><a class="listename">'+initname+'</a><span class="listdate">'+initdata+'</span><span class="timeInterval">'+initTimeInterval+'</span></div>';
                    $(".checkBoxbox"+idd).append(listpagedom);
                });
                $(".checkBoxcount"+idd).val(initcoun);
                $(".listp").css("background-color","#fff").removeAttr("select");//初始化鼠标选中
            },
            init: function() {
                this.limitNameInput();
                this.limitValueInput();
                this.limitTimeIntervalInput();
                this.add();
                this.delete();
                this.up();
                this.down();
                this.initList();
            }
        };
        var styleFeatures = {
            showBackgroundColor: function() { //是否显示背景颜色切换
                bgColorDisplay.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if (judaged) {
                        bgColorDisplay.css({
                            'background-image': 'url(images/notselected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        $('#'+idd).css('background-color', 'transparent');
                        $('#'+idd).attr('val', 'transparent');
                        $('.backgroundColor'+idd).attr('disabled', true);
                        $('.backgroundColor'+idd).siblings('i').css('color', '#aaa');
                        var bgColor1 = $('.backgroundColor'+idd).val();
                        $('#'+idd).attr('bgColor', bgColor1);
                    } else {
                        bgColorDisplay.css({
                            'background-image': 'url(images/selected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        var bgColor2 = document.getElementById('backgroundColor'+idd).value;
                        $('#'+idd).css('background-color', bgColor2);
                        $('#'+idd).removeAttr('val');
                        $('.backgroundColor'+idd).attr('disabled', false);
                        $('.backgroundColor'+idd).siblings('i').css('color', '#000');
                    }
                    judaged = !judaged;
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setBgColor: function() { //设置背景颜色
                inItPropertiesPage.setColor(bgColor, ['background-color', $('#'+idd)]);
            },
            showTitle: function() { //是否显示标题切换
                titleDisplay.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if (buttonOff2) {
                        titleDisplay.removeAttr('checked');
                        titleDisplay.css({
                            'background-image': 'url(images/notselected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        $('.checkbox_title'+idd).css({'display': 'none'});
                        $('#'+idd).attr('titleDisplay', 'none');
                        $('.checkBoxdiv'+idd).css({
                            'height': 'calc(100%)',
                            'margin-top': '0'
                        });
                        $('.sendButton'+idd).css({'top': '10px'});
                        $('.titleColor'+idd).attr('disabled', true);
                        $('.titleColor'+idd).siblings('i').css('color', '#aaa');
                        $('.titleText'+idd).attr('disabled', true);
                        $('.titleText'+idd).siblings('i').css('color', '#aaa');
                    } else {
                        titleDisplay.attr('checked', 'checked');
                        titleDisplay.css({
                            'background-image': 'url(images/selected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        $('.checkbox_title'+idd).css({'display': 'block'});
                        $('#'+idd).attr('titleDisplay', 'block');
                        $('.checkBoxdiv'+idd).css({
                            'height': 'calc(100% - 24px)',
                            'margin-top': '7px'
                        });
                        $('.sendButton'+idd).css({'top': '35px'});
                        $('.titleColor'+idd).attr('disabled', false);
                        $('.titleColor'+idd).siblings('i').css('color', '#000');
                        $('.titleText'+idd).attr('disabled', false);
                        $('.titleText'+idd).siblings('i').css('color', '#000');
                    }
                    buttonOff2 = !buttonOff2;
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setTitleColor: function() { //设置标题颜色
                titleColor.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var titleColor = $(this).val();
                    $('.titleDiv'+idd+' span').css({'color': titleColor, 'border-bottom': '1px solid '+ titleColor+''});
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setTitleText: function() { //设置标题文本内容
                titleText.bind('input', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var titleText = $(this).val();
                    $('.titleDiv'+idd+' span').html(titleText);
                    $('.titleDiv'+idd).attr('value', titleText);
                    $('.titleDiv'+idd).attr('title', titleText);
                    $('.titleText'+idd+' span').val(titleText);
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            initStyle: function() {
                if ($('#'+idd).attr('val') === 'transparent') {
                    var bgColor4 = $('#'+idd).attr('bgColor');
                    bgColor.val(bgColor4);
                    bgColorDisplay.css({
                        'background-image': 'url(images/notselected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    $.fn.getHexBackgroundColor1();
                    bgColor.attr('disabled', true);
                    bgColor.siblings('i').css('color', '#aaa');
                } else {
                    bgColorDisplay.css({
                        'background-image': 'url(images/selected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    $.fn.getHexBackgroundColor();
                }
                if ($('#'+idd).attr('titleDisplay') === 'none') {
                    titleDisplay.removeAttr('checked');
                    titleDisplay.css({
                        'background-image': 'url(images/notselected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    titleColor.attr('disabled', true);
                    titleColor.siblings('i').css('color', '#aaa');
                    titleText.attr('disabled', true);
                    titleText.siblings('i').css('color', '#aaa');
                    buttonOff2 = false;
                } else {
                    titleDisplay.attr('checked', 'checked');
                    titleDisplay.css({
                        'background-image': 'url(images/selected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    titleColor.attr('disabled', false);
                    titleColor.siblings('i').css('color', '#000');
                    titleText.attr('disabled', false);
                    titleText.siblings('i').css('color', '#000');
                    buttonOff2 = true;
                }
                if ($('.titleDiv'+idd+' span').attr('value')) {
                    initTitleText = $('.titleDiv'+idd+' span').attr('value');
                    titleText.val(initTitleText);
                } else {
                    initTitleText = $('.titleDiv'+idd+' span').html();
                    titleText.val(initTitleText);
                }
            },
            init: function() {
                this.showBackgroundColor();
                this.setBgColor();
                this.showTitle();
                this.setTitleColor();
                this.setTitleText();
                this.initStyle();
            }
        };
        optionFeatures.init();
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);
        styleFeatures.init();
    };
    var checkcopy = 0;
    this.copy = function (srcId, desId){
        checkcopy++;
        var srcIdElement = $('#'+srcId);
        var desIdElement = $('#'+desId);
        var contrlElementbtn = $('#' + srcId + ' .checkBoxdiv' + srcId + '');
        var higebtn = srcIdElement.height();
        var widebtn = srcIdElement.width();
        var checkBoxval = srcIdElement.attr("check");
        var checkBoxclass = srcIdElement.attr("class");
        var checkfontstyle = srcIdElement.attr("checkfontstyle");
        var checkBoxdom = contrlElementbtn.html();
        var titleDisplay = srcIdElement.attr('titleDisplay'); //获取原始控件的标题是否展示
        var titleText = $('.titleDiv'+srcId).attr('value');
        var titleColor = $('.titleDiv'+srcId+' span').css('color');
        var val = srcIdElement.attr('val');
        var bgColor1 = srcIdElement.css('background-color');
        var bgColor2 = srcIdElement.attr('bgColor');
        $('#'+desId).attr('sure', $('#'+srcId).attr('sure'));
		$('#'+desId).attr('success', $('#'+srcId).attr('success'));
		$('#'+desId).attr('fails', $('#'+srcId).attr('fails'));
        $(".checkBoxdiv"+desId).append(checkBoxdom);
        desIdElement.attr("check",checkBoxval);
        desIdElement.attr("checkfontstyle",checkfontstyle);
        desIdElement.css({
            "width": widebtn + 'px',
            "height": higebtn + 'px'
        }).addClass(checkBoxclass);
        //复制背景颜色
        if (val) { //背景颜色透明
            desIdElement.attr('val', 'transparent');
            desIdElement.attr('bgColor', bgColor2);
            desIdElement.css('background-color', 'transparent');
        } else {
            desIdElement.attr('bgColor', inItPropertiesPage.formatColor(bgColor1));
            desIdElement.css('background-color', bgColor1);
        }
        //复制标题
        if (titleText) {
            $('.titleDiv'+desId).attr('value', titleText);
            $('.titleDiv'+desId).attr('title', titleText);
            $('.titleDiv'+desId+' span').html(titleText);
        }
        if (titleColor) {
            $('.titleDiv'+desId+' span').css({
                'color': titleColor,
                'border-bottom': '1px solid ' + titleColor
            });
        }
        if (titleDisplay === 'none') {
            $('.displayTitle'+desId).removeAttr('checked');
            $('.displayTitle'+desId).css({
                'background-image': 'url(images/notselected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
            $('.checkbox_title'+desId).css({'display': 'none'});
            $('#'+desId).attr('titleDisplay', 'none');
            $('.checkBoxdiv'+desId).css({
                'height': 'calc(100%)',
                'margin-top': '0'
            });
            $('.sendButton'+desId).css({'top': '10px'});
            $('.titleColor'+desId).attr('disabled', true);
            $('.titleText'+desId).attr('disabled', true);
        } else {
            $('.displayTitle'+desId).attr('checked', 'checked');
            $('.displayTitle'+desId).css({
                'background-image': 'url(images/selected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
            $('.checkbox_title'+desId).css({'display': 'block'});
            $('#'+desId).attr('titleDisplay', 'block');
            $('.checkBoxdiv'+desId).css({
                'height': 'calc(100% - 24px)',
                'margin-top': '7px'
            });
            $('.sendButton'+desId).css({'top': '35px'});
            $('.titleColor'+desId).attr('disabled', false);
            $('.titleText'+desId).attr('disabled', false);
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
//组合框控件
var ComboBox = function(){
    this.configId = -1;
    this.createComboBoxControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.comboElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Combo_" + this.configId;
        this.id = idd;
        var boxDiv = $('<div id='+idd+' class="contrl move" DataType="0,1,2,3" sendButton="yes" sure="yes" success="yes" fails="yes">'
                         +'<div class="combo_box">'
                         +'<div class="combo_child">'
                             +'<div id="select'+idd+'" class="comboSelectBox">'
                                 +'<div id="combo'+idd+'" class="combodropdiv">'
                                     +'<div  id="comboselect'+idd+'" readonly="readonly" class="comboselect" displayMember="-1" valueMember ="请添加" ><span class="combosle">请添加</span></div>'

                                 +'</div>'
                                 +'<p class="combobtnimg combobtnimg'+idd+'"><img id="btn-'+idd+'" class="comboBtnImg" src="images/downarrow.png"/></p>'
                             +'</div>'
                             +'<div id="combo_chooseItems'+idd+'" class="combo_chooseItems" answer ="comboselect">'
                                +'<div class="combo_children"></div>'
                             +'</div>'
                             +'<div class="combosend combosend'+idd+'"><img id="comboaction-'+idd+'" class="combosendimg" src="images/send.png"/></div>'
                         +'</div>'
                         +'</div>'
                     +'</div>');
        boxDiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 142 + "px",
            "height": 34 + "px"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.ComboBoxPropertiesPage(selecteId);
        this.comboBoxPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.ComboBoxPropertiesPage = function(idd){
        var proAttributes = '<div id="tc3'+idd+'" class="tc33">'
                +'<fieldset class="attrs">'
                    +'<legend>设置组合框数据项</legend>'
                    +'<div class="listfather">'
                        +'<div class="listdiv"><i>显示发送按钮</i><div class="displaySendButton displaySendButton'+idd+'"></div></div>'
                        +'<div class="listdiv">数据项名称：<input class="rt listinput comboName'+idd+'" type="text"/></div>'
                        +'<div class="listdiv">数据项值：<input class="rt listinput comboData'+idd+'" type="text"/></div>'
                        +'<div class="listdiv">数据项个数：<input class="rt listinput listcount comboCount'+idd+'" type="text" readonly value="0"/></div>'
                        +'<div class="radioDataBox">'
                            +'<div class="radioDiv"><span class="radioNumber">序号</span><span class="radioName">按钮名称</span><span class="radioValue">下发值</span></div>'
                            +'<div class="radioBox comboBox' + idd + '"></div>'
                            +'<div class="radioDiv">'
                                +'<span class="comboAdd'+idd+'">添加</span>'
                                +'<span class="comboUp'+idd+'">上移</span>'
                                +'<span class="comboDown'+idd+'">下移</span>'
                                +'<span class="comboRemove'+idd+'">删除</span>'
                            +'</div>'
                        +'</div>'
                        +'<div class="slider_attrText"><i>确认控制命令</i><div class="slider_attrDiv" id="pro2'+idd+'"></div></div>'
                        +'<div class="slider_attrText"><i>报告成功命令</i><div class="slider_attrDiv" id="pro3'+idd+'"></div></div>'
                        +'<div class="slider_attrText"><i>报告失败命令</i><div class="slider_attrDiv" id="pro4'+idd+'"></div></div>'
                    +'</div>'
                +'</fieldset>'
            +'</div>';
        $("#fathy").append(proAttributes);
    };
    var listcountd = 0;
    this.comboBoxPageFeatures = function(idd){
        var confirmOrder = $("#pro2"+idd);
        var successOrder = $("#pro3"+idd);
        var failOrder = $("#pro4"+idd);
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);
        var buttonoff = true;
        /*******限制数据项名称的输入********/
        var inputNameElement = $('.comboName'+idd);
        inputNameElement.keyup(function() {
            var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
            if (variableType + '' === 'undefined') {
                alert('还未进行变量配置');
                $(this).val('');
            }
        });
        /*******限制数据项值的输入********/
        var inputValueElement = $('.comboData'+idd);
        inputValueElement.blur(function() {
            var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
            var minValue = $('#'+idd).attr('MinEuVal'); //允许输入的最小工程值
            var maxValue = $('#'+idd).attr('MixEuVal'); //允许输入的最大工程值
            if (variableType) {
                if (variableType === '开关量') { //配置的变量为‘开关量’
                    if (!inItPropertiesPage.inputValidate.booleanValidate($(this).val())) {
                        $(this).val('');
                    }
                } else if (variableType === '整型量') { //配置的变量为‘开关量’
                    if (minValue && maxValue) {
                        inputValueElement.attr('minlength', minValue.length);
                        inputValueElement.attr('maxlength', maxValue.length);
                    }
                    if (!inItPropertiesPage.inputValidate.integerValidate($(this).val(), minValue, maxValue)) {
                        $(this).val('');
                    }
                } else if (variableType === '浮点量') { //配置的变量为‘浮点量’
                    if (!inItPropertiesPage.inputValidate.floatValidate($(this).val(), minValue, maxValue)) {
                        $(this).val('');
                    }
                } else if (variableType === '字符量') { //配置的变量为‘字符量’
                    if (!inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                        $(this).val('');
                    }
                }
            } else {
                alert('还未进行变量配置');
            }
        });
        var comboBoxControl = { //属性页的功能添加、删除、上移、下移 发送按钮的隐藏和显示
            addCombo_chooseItem:function(){ //添加列表元素
                var name;
                var data;
                var lastnum;
                var addBtn = $(".comboAdd"+idd);
                addBtn.mousedown(function(){
                    name = $(".comboName"+idd).val();
                    data = $(".comboData"+idd).val();
                    lastnum = parseInt($("div.listp:last b").text())+1;
                    if($("div.listp:last b").text() == ""){
                        lastnum = 0;
                    }
                    if(name != "" && data != ""){
                        var beforeLog = inTtCommand.log();
                        webapi.addLog('before',beforeLog);
                        listcountd++;
                        var comboBox = $(".comboBox"+idd);
                        var combo_chooseItems = $("#combo_chooseItems"+idd);
                        var comboCount = $(".comboCount"+idd);
                        var listpagedom = '<div class="listp pointer"><b class="listnum"></b><a class="listename"></a><span class="listdate"></span></div>';
                        comboBox.append(listpagedom);
                        var listdom = '<div class="listdom combo_chooseItem listdom'+listcountd+'" displayMember="0" valueMember ="独立注册译员"></div>';//添加控件列表元素
                        combo_chooseItems.append(listdom);//添加到控件下拉框
                        $("div.listp:last b").text(lastnum);
                        $("div.listp:last a:first").text(name).attr("title",name);
                        $("div.listp:last span:last").text(data).attr("title",data);
                        $("#combo_chooseItems"+idd+":last div.listdom"+listcountd).text(name).attr({"valueMember":name,"displayMember":data});
                        comboCount.val(parseInt(comboCount.val())+1);//数据项个数增加
                        combo_chooseItems.css("display","block");
                        $(".comboName"+idd).val("");
                        $(".comboData"+idd).val("");
                        if(combo_chooseItems.children(".combo_chooseItem").length == 1){
                            var comboselect_inputElement = $("#comboselect"+idd).find("span");
                            comboselect_inputElement.text(name);
                            comboselect_inputElement.attr({"valueMember":name,"displayMember":data,"chooseed":"chooseed"});
                        }
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            removeCombo_chooseItem:function () { //删除列表元素
                $(".comboRemove"+idd).click(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var combochooseCount = $(".comboCount"+idd);
                    var combo_chooseItems = $("#combo_chooseItems"+idd);
                    if($("#"+idd).attr("list")=="select"){
                        var selectdiv = $("div.listp[select='selected']");
                        var listnum = selectdiv.nextAll();
                        $(listnum).each(function(){
                            var listnumb = parseInt($(this).children("b").text());
                            $(this).children("b").text(parseInt(listnumb-1));
                        });
                        selectdiv.next("div").css("background-color","#9dd6f2").attr("select","selected");
                        if($("div.listp").length != 0){
                            combochooseCount.val(parseInt(combochooseCount.val())-1);//数据项个数减小
                        }
                        /***控件***/
                        var listremove = parseInt(selectdiv.children("b").text());
                        if(listremove != isNaN){
                            combo_chooseItems.children(".combo_chooseItem").eq(listremove).remove();
                        }
                        var selectName = selectdiv.children(".listename").text();
                        var combo_choose = $("#comboselect"+idd).find("span");
                        var first_combo_chooseItem = $("#combo_chooseItems"+idd).children(".combo_chooseItem").first();
                        if(selectName == combo_choose.val()){
                            var displayMember = first_combo_chooseItem.attr("displayMember");
                            var valueMember = first_combo_chooseItem.attr("valueMember");
                            combo_choose.val(first_combo_chooseItem.text());
                            combo_choose.attr({"displayMember":displayMember,"valueMember":valueMember});
                        }
                        selectdiv.remove();
                    }
                    if($("div.listp[select='selected']").length == 0){
                        $("#"+idd).removeAttr("list");
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            upCombo_chooseItem:function(){//上移切换列表元素
                $(".comboUp"+idd).click(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(".comboBox"+idd).children(".listp").each(function(){
                        if(($("#"+idd).attr("list")=="select") && ($(this).attr("select") == "selected") && ($("div.listp[select='selected']").children(".listnum").text() != 0)){
                            var selectdiv = $("div.listp[select='selected']");
                            var listename = selectdiv.children(".listename").text();
                            var listedata = selectdiv.children(".listdate").text();
                            var listname = selectdiv.prev("div").children(".listename").text();
                            var listdata = selectdiv.prev("div").children(".listdate").text();
                            var combo_chooseItems = $("#combo_chooseItems"+idd).children(".combo_chooseItem");
                            var listremove = parseInt(selectdiv.children("b").text());
                            selectdiv.prev("div").children(".listename").text(listename);
                            selectdiv.prev("div").attr("select","selected").css("background","#9dd6f2").siblings(".listp").css("background","#fff").removeAttr("select");
                            selectdiv.prev("div").children(".listdate").text(listedata);
                            selectdiv.children(".listename").text(listname);
                            selectdiv.children(".listdate").text(listdata);
                            //对应控件的移动
                            combo_chooseItems.eq(listremove).prev("div").text(listename);
                            combo_chooseItems.eq(listremove).text(listname);
                            if(combo_chooseItems.eq(listremove).attr("chooseed") == "chooseed"){
                                combo_chooseItems.eq(listremove).prev("div").attr("chooseed","chooseed").siblings(".combo_chooseItem").removeAttr("chooseed");
                            }else{
                                if(combo_chooseItems.eq(listremove).prev("div").attr("chooseed") == "chooseed"){
                                    combo_chooseItems.eq(listremove).attr("chooseed","chooseed").siblings(".combo_chooseItem").removeAttr("chooseed");
                                }
                            }
                            var displayMember = combo_chooseItems.eq(listremove).attr("displayMember");
                            var valueMember = combo_chooseItems.eq(listremove).attr("valueMember");
                            var prevDisplayMember = combo_chooseItems.eq(listremove).prev("div").attr("displayMember");
                            var prevValueMember = combo_chooseItems.eq(listremove).prev("div").attr("valueMember");
                            combo_chooseItems.eq(listremove).prev("div").attr({"displayMember":displayMember,"valueMember":valueMember});
                            combo_chooseItems.eq(listremove).attr({"displayMember":prevDisplayMember,"valueMember":prevValueMember});
                        }
                    })
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            downCombo_chooseItem:function(){//下移切换列表元素
                $(".comboDown"+idd).click(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if(($("#"+idd).attr("list")=="select") && ($("div.listp[select='selected']").next().children(".listnum").text() != 0)){
                        var selectdiv = $("div.listp[select='selected']");
                        var listename = selectdiv.children(".listename").text();
                        var listedata = selectdiv.children(".listdate").text();
                        var listname = selectdiv.next("div").children(".listename").text();
                        var listdata = selectdiv.next("div").children(".listdate").text();
                        var combo_chooseItems = $("#combo_chooseItems"+idd).children(".combo_chooseItem");
                        var listremove = parseInt(selectdiv.children("b").text());
                        selectdiv.next("div").children(".listename").text(listename);
                        selectdiv.next("div").children(".listdate").text(listedata);
                        selectdiv.next("div").attr("select","selected").css("background","#9dd6f2").siblings(".listp").css("background","#fff").removeAttr("select");
                        selectdiv.children(".listename").text(listname);
                        selectdiv.children(".listdate").text(listdata);
                        //对应控件的移动
                        combo_chooseItems.eq(listremove).next("div").text(listename);
                        combo_chooseItems.eq(listremove).text(listname);
                        if(combo_chooseItems.eq(listremove).attr("chooseed") == "chooseed"){
                            combo_chooseItems.eq(listremove).next("div").attr("chooseed","chooseed").siblings(".combo_chooseItem").removeAttr("chooseed");
                        }else{
                            if(combo_chooseItems.eq(listremove).next("div").attr("chooseed") == "chooseed"){
                                combo_chooseItems.eq(listremove).attr("chooseed","chooseed").siblings(".combo_chooseItem").removeAttr("chooseed");
                            }
                        }
                        var displayMember = combo_chooseItems.eq(listremove).attr("displayMember");
                        var valueMember = combo_chooseItems.eq(listremove).attr("valueMember");
                        var prevDisplayMember = combo_chooseItems.eq(listremove).next("div").attr("displayMember");
                        var prevValueMember = combo_chooseItems.eq(listremove).next("div").attr("valueMember");
                        combo_chooseItems.eq(listremove).next("div").attr({"displayMember":displayMember,"valueMember":valueMember});
                        combo_chooseItems.eq(listremove).attr({"displayMember":prevDisplayMember,"valueMember":prevValueMember});
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            displaySendButton: function() {
                $('.displaySendButton'+idd).bind('click', function () {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if (buttonoff) {
                        $("#" + idd).attr("sendButton", "yes");
                        $(this).css({
                            'background-image': 'url(images/selected.png)'
                        });
                        $('#select'+idd).css('width', '80%');
                        $('.combosend'+idd).css('display', 'block');
                    } else {
                        $("#" + idd).attr("sendButton", "no");
                        $(this).css({
                            'background-image': 'url(images/notselected.png)'
                        });
                        $('#select'+idd).css('width', '100%');
                        $('.combosend'+idd).css('display', 'none');
                    }
                    buttonoff = !buttonoff;
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            init:function(){
                this.addCombo_chooseItem();
                this.removeCombo_chooseItem();
                this.upCombo_chooseItem();
                this.downCombo_chooseItem();
                this.displaySendButton();
            }
        };
        var initcomboControl = function(){//初始化控件方法一对应属性页的初始化显示
            /***********数据项个数*********/
            var chooseItemsBox = $("#combo_chooseItems"+idd);
            var comboBox = $(".comboBox"+idd);
            var comboCount = $(".comboCount"+idd);
            var displayMember = chooseItemsBox.children(".combo_chooseItem").first().attr("displayMember");
            var valueMember = chooseItemsBox.children(".combo_chooseItem").first().attr("valueMember");
            var chooseItemName;
            var chooseItemValue;
            var listPageDom;
            var chooseItemsLength = chooseItemsBox.children(".combo_chooseItem").length;
            var count = comboBox.children('div').length;
            comboCount.val(count);
            var sendButton = $('.displaySendButton'+idd);
            if(chooseItemsBox.children(".combo_chooseItem").length >= 1){
                comboCount.val(chooseItemsLength);
                chooseItemsBox.children(".combo_chooseItem").each(function(i){//对属性页初始化
                    chooseItemName = $(this).attr("valueMember");
                    chooseItemValue = $(this).attr("displayMember");
                    listPageDom =   '<div id="listp" class="listp">' +
                        '<b class="listnum">'+ i +'</b>' +
                        '<a class="listename">'+ chooseItemName +'</a>' +
                        '<span class="listdate">'+ chooseItemValue +'</span>' +
                        '</div>';
                    comboBox.append(listPageDom);
                });
            }else{
                comboCount.val(0);
            }
            if ($('#'+idd).attr('sendButton') == 'yes') {
                sendButton.css({'background-image': 'url(images/selected.png)'});
                buttonoff = false;
                $('#select'+idd).css('width', '80%');
                $('.combosend'+idd).css('display', 'block');
            } else {
                sendButton.css({'background-image': 'url(images/notselected.png)'});
                $('#select'+idd).css('width', '100%');
                $('.combosend'+idd).css('display', 'none');
            }
            $("body").on("mousedown",".listp",function(){//给选中的属性吗页列表元素添加自定义属性
                $(this).css("background-color","#9dd6f2").attr("select","selected");
                $(this).siblings(".listp").css("background-color","#fff").removeAttr("select");
                $("#"+idd).attr("list","select");
            });
        };
        var comboSelect = {
            comboBtn:function(){ //控件列表元素显示隐藏的切换
                var comboBtnImg = $("#btn-"+idd);
                var combo_chooseItems = $("#combo_chooseItems"+idd);
                var len;
                comboBtnImg.unbind("mousedown").bind("mousedown",function(e){
                    e.stopPropagation();
                    len = combo_chooseItems.children(".combo_chooseItem").length;
                    if(len != 0){
                        if(combo_chooseItems.children(".combo_chooseItem").is(":visible")){
                            combo_chooseItems.slideUp(300);
                        }else{
                            combo_chooseItems.slideDown(300);
                        }
                    }else{
                        return false;
                    }

                })
            },
            hideChooseItems:function(){//隐藏控件的列表元素
                $("#bgDiv").bind("click",function(){
                    var combo_chooseItems = $(".combo_chooseItems");
                    combo_chooseItems.slideUp(300);
                });
            },
            chooseItem:function(){ //在控件中显示当前列表元素
				$("#combo_chooseItems"+idd).off("mousedown").on("mousedown",".combo_chooseItem",function(e){
					e.stopPropagation();
					e.preventDefault();
					var beforeLog = inTtCommand.log();
					webapi.addLog('before',beforeLog);
					var divhtml = $(this);
					var displayMember;
					var valueMember;
					var olddisplayMember;
					var oldValueMember;
					divhtml.attr("chooseed","chooseed").siblings(".combo_chooseItem").removeAttr("chooseed");
					displayMember = divhtml.attr("displayMember");
					valueMember = divhtml.attr("valueMember");
					var attrs = $(this).parent().attr("answer");
					var parent = $("#"+attrs+idd).find("span");
					olddisplayMember = parent.attr("displayMember");
					oldValueMember = parent.attr("valueMember");
					if(olddisplayMember != displayMember){
						parent.attr("displayMember",displayMember);
						parent.attr("valueMember",valueMember);
						parent.text(valueMember);
						parent.change();
					}else{
						parent.text(oldValueMember);
					}
					$(this).parent().slideUp(300);
					var afterLog = inTtCommand.log();
					webapi.addLog('after',afterLog);
				});
			},
            init:function(){
                this.comboBtn();
                this.hideChooseItems();
                this.chooseItem();
            }
        };
        comboSelect.init();
        initcomboControl();
        comboBoxControl.init();
    };
    this.comboBoxCopy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var srcIdElementHeight = srcIdElement.height();
        var srcIdElementWidth = srcIdElement.width();
        var srcClass = srcIdElement.attr("class");
        var sendButton = srcIdElement.attr('sendButton');
        var copy_combo_chooseItems = srcIdElement.find(".combo_chooseItems").html();
        var des_combo_chooseItems = desIdElement.find(".combo_chooseItems");
        var srcComboselect = srcIdElement.find(".comboselect").find("span");
        var desComboselect = desIdElement.find(".comboselect").find("span");
        var srcDisplaymember = srcComboselect.attr("displaymember");
        var srcValueMember = srcComboselect.attr("valueMember");
        var srcChooseed = srcComboselect.attr("chooseed");
        $(copy_combo_chooseItems).appendTo(des_combo_chooseItems);
        desComboselect.attr({"valueMember":srcValueMember,"displaymember":srcDisplaymember,"srcChooseed":srcChooseed});
        desIdElement.attr('sendButton', sendButton);
        desIdElement.addClass(srcClass).css({"width":srcIdElementWidth+"px","height":srcIdElementHeight+"px"});
        desComboselect.text(srcValueMember).css({"line-height":srcIdElementHeight+"px"});
        if (sendButton == 'yes') {
            $('#select'+desId).css('width', '80%');
            $('.combosend'+desId).css('display', 'block');
        } else {
            $('#select'+desId).css('width', '100%');
            $('.combosend'+desId).css('display', 'none');
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
/*======================填充控件==========================*/
var FillControl=function(){
	this.configId = -1;
	this.createFillControl = function(x,y){
		$("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.FillElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Fill_" + this.configId;
        this.id = idd;
        var textdiv ='<div id='+idd+' class="contrl move fillContrl" DataType="1,2" default="yes">'
					+   	'<div class="fillLiquid" id="fillLiquid'+idd+'" fillColorOff="uplight" lightColor="#000000" dimColor="#ffffff"><div  id="fillLiquid1'+idd+'" class="fillLiquidadd">0%</div></div>'
					+       '<div class="fillBox" id="fillBox'+idd+'">'
					+  	 	     '<div class="tickBox" id="fillRul'+idd+'">'
				    +    			 '<ul class="tick1" id="tick1'+idd+'"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>'
					+        	     '<ul class="tick2" id="tick2'+idd+'"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>'
					+        	     '<div class="verticalLine"></div>'
				    +    	    '</div>'
				    +    	'</div>'
        			+'</div>';
        $('#content').append(textdiv);
        var scroltop = document.body.scrollTop;
        var scrolleft = document.body.scrollLeft;
        $(".fillBox").css({
        	"overflow":"hidden",
        	"height":"100%",
        	"width":"100%",
        	"position":"relative"
        });
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolleft+"px",
            "top": y + scroltop +"px",
            "width": 60 + "px",
            "height": 154 + "px",
            "border-image":"linear-gradient(90deg,#e5e8e8,#d6d7d7,#f5f6f6,#c8c9c9)"
        });
        
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.FillPropertiesPage(selecteId);
        this.FillPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
	};
	this.FillPropertiesPage = function(idd){
        var FillAttributes ='<div id="tc3'+idd+'" class="tc33">'
		+        '<fieldset class="fill_attr1">'
		+			'<legend>常规</legend>'
		+			'<div class="fill_attrP"><i>文字颜色</i><input type="color" id="fillColorVal'+idd+'"/></div>'
		+			'<div class="fill_attrP" class="fill_attrPlight"><i class="colorFill'+idd+'">主填充颜色</i><input  type="color" id="fillLightcolorVal'+idd+'"/></div>'
		+			'<div class="fill_attrP" class="fill_attrPlight"><i class="colorFill'+idd+'">亮度填充色</i><input  type="color" id="fillDimcolorVal'+idd+'"/></div>'
		+			'<div class="fill_attrP"><i>默认样式</i><div class="progress_attr_but colorOther" id="filldefault'+idd+'"></div></div>'
		+		'</fieldset>'
		+		'<fieldset class="fill_attr1">'
		+			'<legend>刻度尺显示位置</legend>'
		+			'<div class="fill_attrP"><i class="ruleHidden'+idd+'">刻度尺显示</i><div class="progress_attr_but colorOther ruleHidden'+idd+'" id="ruleHidden'+idd+'"></div></div>'
		+			'<div class="fill_attrP"><i class="fillRuleLeft'+idd+'">刻度尺居左</i><div class="progress_attr_butadd fillRuleLeft'+idd+'" id="fillRuleLeft'+idd+'"></div></div>'
		+			'<div class="fill_attrP"><i class="fillRuleCenter'+idd+'">刻度尺居中</i><div class="progress_attr_butadd fillRuleCenter'+idd+'" id="fillRuleCenter'+idd+'"></div></div>'
		+			'<div class="fill_attrP"><i class="fillRuleRight'+idd+'">刻度尺居右</i><div class="progress_attr_butadd fillRuleRight'+idd+'" id="fillRuleRight'+idd+'"></div></div>'
		+		'</fieldset>'
	    +   ' </div>'
        $("#fathy").append(FillAttributes);
   };
    this.FillPageFeatures = function(idd){
    	/*=========变量==========*/
	    var lightColor=$("#fillLiquid"+idd).attr("lightColor");//液体高亮色
	    var dimColor=$("#fillLiquid"+idd).attr("dimColor");//液体暗色
	    var fillBacColorOff=$("#fillLiquid"+idd).attr("fillBacColorOff");
	    /*===========初始同步样式===================*/
	    function synchronous(){
	    	/*==============设置初始液体颜色和方向=============*/
		    $(".fillColorDir2"+idd+" div").css({
	            "background":"#39bbf6"
	        });
	        /*========默认样式切换=======*/
	  		$("#"+idd)[0].style.backgroundImage='linear-gradient(90deg,#e5e8e8,#d6d7d7,#f5f6f6,#c8c9c9)';
	 		if($("#"+idd).attr("default")=="yes"){
	 			$(".colorFill"+idd).css({
	       			"color":"#aaa"
	       		});
	 			$("#fillLightcolorVal"+idd).attr({"disabled":"disabled"});
				$("#fillDimcolorVal"+idd).attr({"disabled":"disabled"});
				$("#fillLiquid"+idd)[0].style.backgroundImage='linear-gradient(90deg,#43b5a2,#317e72,#54e4cc,#43b5a2)';
				$("#filldefault"+idd).css({
					"background":"url(images/selected.png)"
				});
			}else{
				$(".colorFill"+idd).css({
	       			"color":"black"
	       		});
				$("#filldefault"+idd).css({
					"background":"url(images/notselected.png)"
				});
				$("#fillLightcolorVal"+idd).removeAttr("disabled");  
				$("#fillDimcolorVal"+idd).removeAttr("disabled");  
				$("#fillLiquid"+idd)[0].style.backgroundImage='linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';	
			};
			/******加载控件时属性页上字体颜色、背景色，液体高亮色，暗色*******/
		    $.fn.getColorFill= function(){
		        var rgb=$("#"+idd).css("background-color");
		        var rgbb=$("#fillLiquid"+idd).css("color");
		        $("#fillBackColorVal"+idd).val(inItPropertiesPage.formatColor(rgb));
		        $("#fillColorVal"+idd).val(inItPropertiesPage.formatColor(rgbb));
		        $("#fillLightcolorVal"+idd).val(lightColor);
		        $("#fillDimcolorVal"+idd).val(dimColor);
		   
		    };
	  		$.fn.getColorFill();
		    /*==============同步刻度尺位置================*/
	        if($("#"+idd).attr( "fillPosition")=="left"){
	        	$("#fillRuleLeft"+idd).css({
	        		"background":"url(images/yixuan.png)"
	        	});
	        }else if($("#"+idd).attr( "fillPosition")=="center"){
	        	$("#fillRuleCenter"+idd).css({
	        		"background":"url(images/yixuan.png)"
	        	});
	        }else{
	        	$("#fillRuleRight"+idd).css({
	        		"background":"url(images/yixuan.png)"
	        	});
	        };
	        /*===========同步显示影藏刻度尺==============*/
	        if($("#"+idd).attr( "ruleOff")=="nohave"){
	       		$("#ruleHidden"+idd).css({
	        		"background":"url(images/notselected.png)"
	        	});
	        	$("#fillRuleLeft"+idd).css({
	        		"background":"url(images/weixuan.png)"
	        	});
	        	$("#fillRuleCenter"+idd).css({
	        		"background":"url(images/weixuan.png)"
	        	});
	        	$("#fillRuleRight"+idd).css({
	        		"background":"url(images/weixuan.png)"
	        	});
	        };
	    }
		/*==========事件============*/
  		/*=======默认样式切换========*/
	   $("#filldefault"+idd).click(function(){
			var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
			if($("#"+idd).attr("default")=="yes"){
	        	$("#fillLiquid"+idd)[0].style.backgroundImage='-webkit-linear-gradient9(0deg, '+lightColor+', '+dimColor+','+lightColor+')';//兼容性处理
			    $("#fillLiquid"+idd)[0].style.backgroundImage='-o-linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';
	     	    $("#fillLiquid"+idd)[0].style.backgroundImage='-moz-linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';	
	        	$("#fillLiquid"+idd)[0].style.backgroundImage='linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';	
				$(".colorFill"+idd).css({
       				"color":"black"
       			});
				$("#fillLightcolorVal"+idd).removeAttr("disabled");  
				$("#fillDimcolorVal"+idd).removeAttr("disabled");
				$("#filldefault"+idd).css({
					"background":"url(images/notselected.png)"
				});
			    $("#"+idd).attr("default","no");
			}else{
				$("#fillLiquid"+idd)[0].style.backgroundImage='linear-gradient(90deg,#43b5a2,#317e72,#54e4cc,#43b5a2)';
				$(".colorFill"+idd).css({
       				"color":"#aaa"
       			});
				$("#fillLightcolorVal"+idd).attr({"disabled":"disabled"});
				$("#fillDimcolorVal"+idd).attr({"disabled":"disabled"});
				$("#filldefault"+idd).css({
					"background":"url(images/selected.png)"
				});
				$("#"+idd).attr("default","yes");
			}
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
		});
        /******************改变文字颜色、背景颜色、液体颜色**************/
        inItPropertiesPage.setColor($("#fillColorVal"+idd), ['color', $("#fillLiquid"+idd)]);
        $("#fillLightcolorVal"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var val = $("#fillLightcolorVal"+idd).val();
            lightColor=val;
            $("#fillLiquid"+idd).attr("lightColor",lightColor);
            $("#fillLiquid"+idd)[0].style.backgroundImage='-webkit-linear-gradient9(0deg, '+lightColor+', '+dimColor+','+lightColor+')';//兼容性处理
            $("#fillLiquid"+idd)[0].style.backgroundImage='-o-linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';
            $("#fillLiquid"+idd)[0].style.backgroundImage='-moz-linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';	
            $("#fillLiquid"+idd)[0].style.backgroundImage='linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        });
        $("#fillDimcolorVal"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var val = $("#fillDimcolorVal"+idd).val();
            dimColor=val;
            $("#fillLiquid"+idd).attr("dimColor",dimColor);
            $("#fillLiquid"+idd)[0].style.backgroundImage='-webkit-linear-gradient9(0deg, '+lightColor+', '+dimColor+','+lightColor+')';//兼容性处理
            $("#fillLiquid"+idd)[0].style.backgroundImage='-o-linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';
            $("#fillLiquid"+idd)[0].style.backgroundImage='-moz-linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';	
            $("#fillLiquid"+idd)[0].style.backgroundImage='linear-gradient(90deg, '+lightColor+', '+dimColor+','+lightColor+')';	
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        });
       /*=============刻度尺位置==============*/
        $(".fillRuleLeft"+idd).click(function(){
        	$("#ruleHidden"+idd).css({
        			"background":"url(images/selected.png)"
        	});
        	$("#fillRuleLeft"+idd).css({
        		"background":"url(images/yixuan.png)"
        	});
        	$("#fillRuleCenter"+idd).css({
        		"background":"url(images/weixuan.png)"
        	});
        	$("#fillRuleRight"+idd).css({
        		"background":"url(images/weixuan.png)"
        	});
        	$("#"+idd).attr( "ruleOff","have");
	       		$("#fillRul"+idd).css({
	       			"display":"block"
	       	});
       		$("#"+idd).attr( "fillPosition","left");
       		$("#fillRul"+idd).addClass("ruleleft");
       		$("#fillRul"+idd).removeClass("ruleright rulecenter");
       		$("#tick1"+idd+" li").css({
       			"margin-left":"0"
       		});
       		$("#tick2"+idd+" li").css({
       			"margin-left":"0"
       		});
       		var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        });
        $(".fillRuleRight"+idd).click(function(){
        	var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        	$("#ruleHidden"+idd).css({
        		"background":"url(images/selected.png)"
        	});
        	
        	$("#fillRuleRight"+idd).css({
        		"background":"url(images/yixuan.png)"
        	});
        	$("#fillRuleCenter"+idd).css({
        		"background":"url(images/weixuan.png)"
        	});
        	$("#fillRuleLeft"+idd).css({
        		"background":"url(images/weixuan.png)"
        	});
        	$("#"+idd).attr( "ruleOff","have");
	       	$("#fillRul"+idd).css({
	       		"display":"block"
	       	});
       		$("#"+idd).attr( "fillPosition","right");
       		$("#fillRul"+idd).addClass("ruleright");
      		$("#fillRul"+idd).removeClass("ruleleft rulecenter");
      		$("#tick1"+idd+" li").css({
       			"margin-left":"50%"
       		});
       		$("#tick2"+idd+" li").css({
       			"margin-left":"50%"
       		});
       		var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        });
        $(".fillRuleCenter"+idd).click(function(){
        	var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        	$("#ruleHidden"+idd).css({
        		"background":"url(images/selected.png)"
        	});
        	$("#fillRuleCenter"+idd).css({
        		"background":"url(images/yixuan.png)"
        	});
        	$("#fillRuleRight"+idd).css({
        		"background":"url(images/weixuan.png)"
        	});
        	$("#fillRuleLeft"+idd).css({
        		"background":"url(images/weixuan.png)"
        	});
        	$("#"+idd).attr( "ruleOff","have");
	       	$("#fillRul"+idd).css({
	       		"display":"block"
	       	});
       		$("#"+idd).attr( "fillPosition","center");
       		$("#fillRul"+idd).addClass("rulecenter");
     		$("#fillRul"+idd).removeClass("ruleleft ruleright");
     		$("#tick1"+idd+" li").css({
       			"margin-left":"25%"
       		});
       		$("#tick2"+idd+" li").css({
       			"margin-left":"25%"
       		});
       		var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
       });
       /*============刻度尺的隐藏============*/
        $(".ruleHidden"+idd).click(function(){
       		var beforeLog = inTtCommand.log();
          webapi.addLog('before',beforeLog);
       		if($("#"+idd).attr( "ruleOff")=="nohave"){
       			$("#ruleHidden"+idd).css({
        			"background":"url(images/selected.png)"
        	    });
        	    if($("#"+idd).attr( "fillPosition")=="left"){
		        	$("#fillRuleLeft"+idd).css({
		        		"background":"url(images/yixuan.png)"
		        	});
		        }else if($("#"+idd).attr( "fillPosition")=="center"){
		        	$("#fillRuleCenter"+idd).css({
		        		"background":"url(images/yixuan.png)"
		        	});
		        }else{
		        	$("#fillRuleRight"+idd).css({
		        		"background":"url(images/yixuan.png)"
		        	});
		        };
       			$("#"+idd).attr( "ruleOff","have");
	       		$("#fillRul"+idd).css({
	       			"display":"block"
	       		});
       		}else{
       			$("#ruleHidden"+idd).css({
        			"background":"url(images/notselected.png)"
        	    });
        	     $("#fillRuleLeft"+idd).css({
        		"background":"url(images/weixuan.png)"
	        	});
	        	$("#fillRuleCenter"+idd).css({
	        		"background":"url(images/weixuan.png)"
	        	});
	        	$("#fillRuleRight"+idd).css({
	        		"background":"url(images/weixuan.png)"
	        	});
       			$("#"+idd).attr( "ruleOff","nohave");
	       		$("#fillRul"+idd).css({
	       			"display":"none"
	       		});
       		}
       		var beforeLog = inTtCommand.log();
          webapi.addLog('before',beforeLog);
       })
    	/*===函数调用===*/
    	synchronous();
    };
    /*=============复制========*/
    this.copy = function (srcId, desId){
        var srcIdElement = $("#" + srcId);
        var desIdElement = $("#" + desId);
        var heighBtn = srcIdElement.height();
        var wideBtn = srcIdElement.width();
        var color=$("#fillLiquid" + srcId).css("color");
        var dimColor=$("#fillLiquid" + srcId).attr("dimColor");
        var lightColor=$("#fillLiquid" + srcId).attr("lightColor");
        var fillBacColorOff=$("#fillLiquid" + srcId).attr("fillBacColorOff");
        desIdElement.attr("default",srcIdElement.attr("default"));
        desIdElement.css({
            "width": wideBtn + 'px',
            "height": heighBtn + 'px'
        });
        $("#fillLiquid" + desId).css("color",color);
        $("#fillLiquid" + desId).attr("dimColor",dimColor);
        $("#fillLiquid" + desId).attr("lightColor",lightColor);
        $("#fillLiquid" + desId).attr("fillBacColorOff",fillBacColorOff);
        /*================刻度尺的位置===================*/
        if(srcIdElement.attr( "fillPosition")=="left"){
            $("#fillRuleLeft"+desId).css({
                "background":"#39bbf6"
            });
            desIdElement.attr( "fillPosition","left");
            $("#fillRul"+desId).addClass("ruleleft");
            $("#fillRul"+desId).removeClass("ruleright rulecenter");
            $("#tick1"+desId+" li").css({
                "margin-left":"0"
            });
            $("#tick2"+desId+" li").css({
                "margin-left":"0"
            });
        }else if(srcIdElement.attr( "fillPosition")=="center"){
            $("#fillRuleCenter"+srcId).css({
                "background":"#39bbf6"
            });
            desIdElement.attr( "fillPosition","center");
            $("#fillRul"+desId).addClass("rulecenter");
            $("#fillRul"+desId).removeClass("ruleleft ruleright");
            $("#tick1"+desId+" li").css({
                "margin-left":"25%"
            });
            $("#tick2"+desId+" li").css({
                "margin-left":"25%"
            });
        }else{
            $("#fillRuleRight"+desId).css({
                "background":"#39bbf6"
            });
            desIdElement.attr( "fillPosition","right");
            $("#fillRul"+desId).addClass("ruleright");
            $("#fillRul"+desId).removeClass("ruleleft rulecenter");
            $("#tick1"+desId+" li").css({
                "margin-left":"50%"
            });
            $("#tick2"+desId+" li").css({
                "margin-left":"50%"
            });
        }
        /*============刻度尺的显示与隐藏==============*/
        if(srcIdElement.attr( "ruleOff")=="nohave"){
            desIdElement.attr('ruleOff', 'nohave');
            $("#fillRul"+desId).css({
                "display":"none"
            });
        }else{
            $("#fillRul"+desId).css({
                "display":"block"
            });
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    };
};
/*******************单选框控件*************************/
var RadioControl = function() {
    this.configId = -1;
    this.createRadioControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.radioElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'Radio_' + this.configId;
        this.id = idd;
        var textdiv =
            $('<div id=' + idd + ' class="contrl move radio" DataType="0,1,2,3" sure="yes" success="yes" fails="yes">' +
                '<div class="radio_total radio_total'+idd+'">' +
                    '<div class="radio_title radio_title' + idd + '">' +
                        '<div class="titleDiv titleDiv'+idd+'"><span>单选标题文本</span></div>' +
                    '</div>' +
                    '<div id="radioSelectOption-'+idd+'" class="radio_text radio' + idd + '"></div>' +
                '</div>' +
                '<img id="radioSend-'+idd+'" class="sendButton sendButton'+idd+'" src="images/send.png" title="发送"/>' +
            '</div>');
        $('#content').append(textdiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;

        //控件相关样式
        $('#' + idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 60 + 'px',
            'width': 142 + 'px'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.RadioPropertiesPage(selecteId);
        this.RadioPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.RadioPropertiesPage = function(idd) {
        //单选框属性
        var proAttributes = $(
            '<div id="tc3' + idd + '" class="tc33">' +
                '<fieldset class="attrs">' +
                    '<legend>设置单选按钮数据项</legend>' +
                        '<div class="radiofather">' +
                            '<div class="radioDiv">按钮名称<input class="rt radioInput radioName'+idd+'" type="text" /></div>' +
                            '<div class="radioDiv">按钮相关值<input class="rt radioInput radioValue'+idd+'" type="text" /></div>' +
                            '<div class="radioDiv">数据项个数<input class="rt radioInput listcount radioCount'+idd+'" type="text" readonly value="0"/></div>' +
                            '<div class="radioDataBox">' +
                                '<div class="radioDiv"><span class="radioNumber">序号</span><span class="radioName">按钮名称</span><span class="radioValue">下发值</span></div>' +
                                '<div class="radioBox radioBox' + idd + '"></div>' +
                                '<div class="radioDiv">' +
                                    '<span class="radioAdd'+idd+'">添加</span>' +
                                    '<span class="radioUp'+idd+'">上移</span>' +
                                    '<span class="radioDown'+idd+'">下移</span>' +
                                    '<span class="radioMove'+idd+'">删除</span>' +
                                '</div>'+
                            '</div>' +
                            '<div class="radioDiv"><i>确认控制命令</i><div class="confirm confirm'+idd+'" ></div></div>' +
                            '<div class="radioDiv"><i>报告成功命令</i><div class="success success'+idd+'" ></div></div>' +
                            '<div class="radioDiv"><i>报告失败命令</i><div class="fail fail'+idd+' " ></div></div>' +
                        '</div>' +
                '</fieldset>' +
                '<fieldset class="attrs">' +
                    '<legend>常规</legend>' +
                    '<div class="radiofather">' +
                        '<div class="radioDiv"><i>显示背景</i><div class="displayBackground displayBackground'+idd+'"></div></div>' +
                        '<div class="radioDiv"><i>背景颜色</i><input id="backgroundColor'+idd+'" class="rt radioSelect backgroundColor'+idd+'" type="color" /></div>' +
                        '<div class="radioDiv"><i>显示标题</i><div class="displayTitle displayTitle'+idd+'" checked="checked"></div></div>' +
                        '<div class="radioDiv"><i>标题文本</i><input class="rt radioSelect titleText'+idd+'" type="text"/></div>' +
                        '<div class="radioDiv"><i>标题颜色</i><input class="rt radioSelect titleColor'+idd+'" type="color" /></div>' +
                    '</div>' +
                '</fieldset>' +
            '</div>');
        $('#fathy').append(proAttributes);
    };
    var radioCount = 0;
    this.RadioPageFeatures = function(idd) {
        var confirmOrder = $(".confirm"+idd);
        var successOrder = $(".success"+idd);
        var failOrder = $(".fail"+idd);
        var inputNameElement = $('.radioName'+idd);
        var inputValueElement = $('.radioValue'+idd);
        var inputTitleElement = $('.titleText'+idd);
        var originTitle = $('.titleDiv'+idd+' span').html();
        var addButton = $('.radioAdd'+idd);
        var deleteButton = $('.radioMove'+idd);
        var upButton = $('.radioUp'+idd);
        var downButton = $('.radioDown'+idd);
        var radioBoxNum = $('div.radio'+idd+' div');
        var initCount = $('div.radio'+idd+' div').length;
        var bgColorDisplay = $('.displayBackground'+idd);
        var bgColor = $('.backgroundColor'+idd);
        var titleDisplay = $('.displayTitle'+idd);
        var titleColor = $('.titleColor'+idd);
        var buttonOff2 = true;
        var judaged = true;
        var name;
        var value;
        var lastNum;
        var variableType;
        var initTitleText;
        //非透明背景颜色、标题颜色设置
        $.fn.getHexBackgroundColor = function() {
            var rg = $('#'+idd).css('background-color'); //背景颜色
            var rgb = $('.titleDiv'+idd+' span').css('color'); //标题颜色
            $('.backgroundColor'+idd).val(inItPropertiesPage.formatColor(rg));
            titleColor.val(inItPropertiesPage.formatColor(rgb));
        };
        //透明背景颜色、标题颜色设置
        $.fn.getHexBackgroundColor1 = function() {
            var rgb = $('.titleDiv'+idd+' span').css('color'); //标题颜色
            titleColor.val(inItPropertiesPage.formatColor(rgb));
            judaged = false;
        };
        var optionFeatures = { //完成属性页可输入文本的验证、完成数据项的添加、删除、上移、下移功能
            limitNameInput: function() { //限制数据项名称的输入
                inputNameElement.bind('keyup', function() {
                    variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
                    if (variableType + '' === 'undefined') {
                        alert('还未进行变量配置');
                        $(this).val('');
                    }
                });
            },
            limitValueInput: function() { //限制数据项值的输入
                inputValueElement.bind('blur', function() {
                    variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
                    var minValue = $('#'+idd).attr('MinEuVal'); //允许输入的最小工程值
                    var maxValue = $('#'+idd).attr('MixEuVal'); //允许输入的最大工程值
                    if (variableType === '开关量') { //配置的变量为‘开关量’
                        if (!inItPropertiesPage.inputValidate.booleanValidate($(this).val())) {
                            $(this).val('');
                        }
                    } else if (variableType === '整型量') { //配置的变量为‘开关量’
                        if (minValue && maxValue) {
                            inputValueElement.attr('minlength', minValue.length);
                            inputValueElement.attr('maxlength', maxValue.length);
                        }
                        if (!inItPropertiesPage.inputValidate.integerValidate($(this).val(), minValue, maxValue)) {
                            $(this).val('');
                        }
                    } else if (variableType === '浮点量') { //配置的变量为‘浮点量’
                        if (!inItPropertiesPage.inputValidate.floatValidate($(this).val(), minValue, maxValue)) {
                            $(this).val('');
                        }
                    } else if (variableType === '字符量') { //配置的变量为‘字符量’
                        if (!inItPropertiesPage.inputValidate.stringValidate($(this).val())) {
                            $(this).val('');
                        }
                    } else if (variableType + '' == 'undefined') {
                        alert('还未进行变量配置');
                        $(this).val('');
                    }
                });
            },
            add: function() { //添加功能
                addButton.bind('mousedown', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    name = $('.radioName'+idd).val();
                    value = $('.radioValue'+idd).val();
                    lastNum = parseInt($('div.listP:last b').text()) + 1;
                    if ($('div.listP:last b').text() === '') {
                        lastNum = 0;
                    }
                });
                addButton.bind('mouseup', function() {
                    if (name != '' && value != '') {
                        var radioCount1 = parseInt($('.radioCount'+idd).val());
                        radioCount++;
                        var radioPageDom = $('<div id="listp" class="listP"><b class="listNum"></b><a class="radioListName"></a><span class="radioListValue"></span></div>');
                        $('.radioBox'+idd).append(radioPageDom);
                        var radioDom = $(
                            '<div class="radioDom radioDom'+radioCount+'">' +
                            '<label class="radioLabel radioLabel'+radioCount+'" for="radio'+radioCount+'">' +
                            '<img id="unchecked" class="checkBtn" src="images/unchecked_radio.png" />' +
                            '<label for="radio'+radioCount+'">' + name + '</label>' +
                            '</label>' +
                            '</div>');
                        $('.radio'+idd).append(radioDom);//将属性数据项添加到控件中
                        $('div.listP:last b').text(lastNum);
                        $('div.listP:last a:first').text(name).attr('title', name);
                        $('div.listP:last span:last').text(value).attr('title', value);
                        $('.radio'+idd+':last div.radioDom'+radioCount+'').attr('title', value); //添加控件title为value值
                        $('.radioCount'+idd).val(parseInt($('.radioCount'+idd).val()) + 1); //数据项个数增加
                        $('.radioName'+idd).val('');
                        $('.radioValue'+idd).val('');
                        if (radioCount1 === 0) {
                            $('#'+idd).css({'height': 102 + 'px'});
                        }
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            delete: function() { //删除功能
                deleteButton.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if ($('#'+idd).attr('radio') === 'select') {
                        var selectDiv = $("div.listP[select='selected']");
                        var radioListNum = selectDiv.nextAll();
                        if (radioListNum.length != 0) {
                            $(radioListNum).each(function() {
                                var radioListB = parseInt($(this).children('b').text());
                                $(this).children('b').text(parseInt(radioListB-1));
                            });
                            selectDiv.next('div').css('background-color', '#9dd6f2').attr('select', 'selected');
                        }
                        if ($('div.listP').length != 0) {
                            $('.radioCount'+idd).val(parseInt($('.radioCount'+idd).val()) - 1);//数据项个数减小
                        }
                        var radioDomRemove = parseInt(selectDiv.children('b').text());
                        if (radioDomRemove != isNaN) {
                            $('#'+idd+' div.radioDom').eq(radioDomRemove).remove();
                        }
                        selectDiv.remove();
                    }
                    if ($("div.listP[select='selected']").length === 0) {
                        $('#'+idd).removeAttr('radio');
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            up: function() { //上移功能
                upButton.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if ($('#'+idd).attr('radio') === 'select' && $("div.listP[select='selected']").children('.listNum').text() != 0) {
                        var selectDiv = $("div.listP[select='selected']");
                        var prevSelectDiv = selectDiv.prev('div');
                        selectDiv.insertBefore(prevSelectDiv);
                        //控件部分
                        var radioDomUp = parseInt(selectDiv.children('b').text());
                        var radioGroup = [];
                        radioGroup.push($('#'+idd+' div.radioDom').eq(radioDomUp));
                        $('#'+idd+' div.radioDom').eq(parseInt(radioDomUp - 1)).before(radioGroup[0]);
                        var num1 = selectDiv.children('.listNum').text();
                        var num2 = selectDiv.next('div').children('.listNum').text();
                        selectDiv.children('.listNum').text(num2);
                        prevSelectDiv.children('.listNum').text(num1);
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            down: function() { //下移功能
                downButton.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if ($('#'+idd).attr('radio') === 'select' && $("div.listP[select='selected']").next().children('.listNum').text() != '') {
                        var selectDiv = $("div.listP[select='selected']");
                        var nextSelectDiv = selectDiv.next('div');
                        selectDiv.insertAfter(nextSelectDiv);
                        //控件部分
                        var radioDomDown = parseInt(selectDiv.children('b').text());
                        var radioGroup = [];
                        radioGroup.push($('#'+idd+' div.radioDom').eq(radioDomDown));
                        $('#'+idd+' div.radioDom').eq(parseInt(radioDomDown + 1)).after(radioGroup[0]);
                        var num1 = selectDiv.children('.listNum').text();
                        var num2 = selectDiv.prev('div').children('.listNum').text();
                        selectDiv.children('.listNum').text(num2);
                        nextSelectDiv.children('.listNum').text(num1);
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            initList: function() { //初始化列表
                $('body').on('mousedown', '.listP', function() {
                    $(this).css('background-color', '#9dd6f2').attr('select', 'selected');
                    $(this).siblings('.listP').css('background-color', '#fff').removeAttr('select');
                    $('#'+idd).attr('radio', 'select');
                });
                $(radioBoxNum).each(function(i) {
                    var initName = $(this).text();
                    var initValue = $(this).attr('title');
                    var radioBoxDom = $('<div class="listP"><b class="listNum">'+i+'</b><a class="radioListName">'+initName+'</a><span class="radioListValue">'+initValue+'</span></div>');
                    $('.radioBox'+idd).append(radioBoxDom);
                });
                $('.radioCount'+idd).val(initCount);
                $('.listP').css('background-color', '#fff').removeAttr('select'); //初始化鼠标选中
            },
            init: function() {
                this.limitNameInput();
                this.limitValueInput();
                this.add();
                this.delete();
                this.up();
                this.down();
                this.initList();
            }
        };
        var styleFeatures = { //是否显示背景颜色切换
            showBackgroundColor: function() {
                bgColorDisplay.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if (judaged) {
                        bgColorDisplay.css({
                            'background-image': 'url(images/notselected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        $('#'+idd).css('background-color', 'transparent');
                        $('#'+idd).attr('val', 'transparent');
                        bgColor.attr('disabled', true);
                        bgColor.siblings('i').css('color', '#aaa');
                        var bgColor1 = bgColor.val();
                        $('#'+idd).attr('bgColor', bgColor1);
                    } else {
                        bgColorDisplay.css({
                            'background-image': 'url(images/selected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        var bgColor2 = document.getElementById('backgroundColor'+idd).value;
                        $('#'+idd).css('background-color', bgColor2);
                        $('#'+idd).removeAttr('val');
                        bgColor.attr('disabled', false);
                        bgColor.siblings('i').css('color', '#000');
                    }
                    judaged = !judaged;
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setBgColor: function() { //设置背景颜色
                inItPropertiesPage.setColor(bgColor, ['background-color', $('#'+idd)]);
            },
            showTitle: function() { //是否显示标题切换
                titleDisplay.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if (buttonOff2) {
                        titleDisplay.removeAttr('checked');
                        titleDisplay.css({
                            'background-image': 'url(images/notselected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        $('.radio_title'+idd).css({'display': 'none'});
                        $('#'+idd).attr('titleDisplay', 'none');
                        $('.radio'+idd).css({
                            'height': 'calc(100%)',
                            'margin-top': '0'
                        });
                        $('.sendButton'+idd).css({'top': '10px'});
                        titleColor.attr('disabled', true);
                        titleColor.siblings('i').css('color', '#aaa');
                        inputTitleElement.attr('disabled', true);
                        inputTitleElement.siblings('i').css('color', '#aaa');
                    } else {
                        titleDisplay.attr('checked', 'checked');
                        titleDisplay.css({
                            'background-image': 'url(images/selected.png)',
                            'background-repeat': 'no-repeat',
                            'background-size': '100% 100%'
                        });
                        $('.radio_title'+idd).css({'display': 'block'});
                        $('#'+idd).attr('titleDisplay', 'block');
                        $('.radio'+idd).css({
                            'height': 'calc(100% - 24px)',
                            'margin-top': '7px'
                        });
                        $('.sendButton'+idd).css({'top': '35px'});
                        titleColor.attr('disabled', false);
                        titleColor.siblings('i').css('color', '#000');
                        inputTitleElement.attr('disabled', false);
                        inputTitleElement.siblings('i').css('color', '#000');
                    }
                    buttonOff2 = !buttonOff2;
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setTitleColor: function() { //设置标题颜色
                titleColor.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var titleColor =  $(".titleColor"+idd).val();
                    $('.titleDiv'+idd+' span').css({'color': titleColor, 'border-bottom': '1px solid '+ titleColor+''});
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setTitleText: function() { //设置标题文本内容
                inputTitleElement.bind('input', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var titleText = inputTitleElement.val();
                    $('.titleDiv'+idd+' span').html(titleText);
                    $('.titleDiv'+idd).attr('value', titleText);
                    $('.titleDiv'+idd).attr('title', titleText);
                    $('.titleText'+idd+' span').val(titleText);
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            initStyle: function() { //初始化
                if ($('#'+idd).attr('val') === 'transparent') {
                    var bgColor4 = $('#'+idd).attr('bgColor');
                    bgColor.val(bgColor4);
                    bgColorDisplay.css({
                        'background-image': 'url(images/notselected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    $.fn.getHexBackgroundColor1();
                    bgColor.attr('disabled', true);
                    bgColor.siblings('i').css('color', '#aaa');
                } else {
                    bgColorDisplay.css({
                        'background-image': 'url(images/selected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    $.fn.getHexBackgroundColor();
                }
                if ($('#'+idd).attr('titleDisplay') === 'none') {
                    titleDisplay.removeAttr('checked');
                    titleDisplay.css({
                        'background-image': 'url(images/notselected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    titleColor.attr('disabled', true);
                    titleColor.siblings('i').css('color', '#aaa');
                    inputTitleElement.attr('disabled', true);
                    inputTitleElement.siblings('i').css('color', '#aaa');
                    buttonOff2 = false;
                } else {
                    titleDisplay.attr('checked', 'checked');
                    titleDisplay.css({
                        'background-image': 'url(images/selected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    titleColor.attr('disabled', false);
                    titleColor.siblings('i').css('color', '#000');
                    inputTitleElement.attr('disabled', false);
                    inputTitleElement.siblings('i').css('color', '#000');
                    buttonOff2 = true;
                }
                if ($('.titleDiv'+idd+' span').attr('value')) {
                    initTitleText = $('.titleDiv'+idd+' span').attr('value');
                    inputTitleElement.val(initTitleText);
                } else {
                    initTitleText = $('.titleDiv'+idd+' span').html();
                    inputTitleElement.val(initTitleText);
                }
            },
            init: function() {
                this.showBackgroundColor();
                this.setBgColor();
                this.showTitle();
                this.setTitleColor();
                this.setTitleText();
                this.initStyle();
            }
        };
        optionFeatures.init();
        styleFeatures.init();
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);//报告命令状态
    };
    var copyCount = 0;
    this.copy = function(srcId, desId) {
        copyCount ++;
        var srcIdElement = $('#' + srcId);
        var desIdElement = $('#' + desId);
        var controlElement = $('#' + srcId + ' .radio' + srcId + '');
        var height = srcIdElement.height();
        var width = srcIdElement.width();
        var srcClass = srcIdElement.attr('class');
        var radioBox = srcIdElement.attr('radio');
        var radioStyes = srcIdElement.attr('radioStyles');
        var radioBoxDom = controlElement.html();
        var titleDisplay = srcIdElement.attr('titleDisplay'); //获取原始控件的标题是否展示
        var titleText = $('.titleDiv'+srcId).attr('value');
        var titleColor = $('.titleDiv'+srcId+' span').css('color');
        var val = srcIdElement.attr('val');
        var bgColor1 = srcIdElement.css('background-color');
        var bgColor2 = srcIdElement.attr('bgColor');
        $('#'+desId).attr('sure', $('#'+srcId).attr('sure'));
		$('#'+desId).attr('success', $('#'+srcId).attr('success'));
		$('#'+desId).attr('fails', $('#'+srcId).attr('fails'));
        $('.radio'+desId).append(radioBoxDom);
        desIdElement.attr('radio', radioBox);
        desIdElement.attr('radioStyles', radioStyes);
        desIdElement.css({
            'width': width + 'px',
            'height': height + 'px'
        }).addClass(srcClass);
        //复制背景颜色
        if (val) { //背景颜色透明
            desIdElement.attr('val', 'transparent');
            desIdElement.attr('bgColor', bgColor2);
            desIdElement.css('background-color', 'transparent');
        } else {
            desIdElement.attr('bgColor', inItPropertiesPage.formatColor(bgColor1));
            desIdElement.css('background-color', bgColor1);
        }
        //复制标题
        if (titleText) {
            $('.titleDiv'+desId).attr('value', titleText);
            $('.titleDiv'+desId).attr('title', titleText);
            $('.titleDiv'+desId+' span').html(titleText);
        }
        if (titleColor) {
            $('.titleDiv'+desId+' span').css({
                'color': titleColor,
                'border-bottom': '1px solid ' + titleColor
            });
        }
        if (titleDisplay === 'none') {
            $('.displayTitle'+desId).removeAttr('checked');
            $('.displayTitle'+desId).css({
                'background-image': 'url(images/notselected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
            $('.radio_title'+desId).css({'display': 'none'});
            $('#'+desId).attr('titleDisplay', 'none');
            $('.radio'+desId).css({
                'height': 'calc(100%)',
                'margin-top': '0'
            });
            $('.sendButton'+desId).css({'top': '10px'});
            $('.titleColor'+desId).attr('disabled', true);
            $('.titleText'+desId).attr('disabled', true);
        } else {
            $('.displayTitle'+desId).attr('checked', 'checked');
            $('.displayTitle'+desId).css({
                'background-image': 'url(images/selected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
            $('.radio_title'+desId).css({'display': 'block'});
            $('#'+desId).attr('titleDisplay', 'block');
            $('.radio'+desId).css({
                'height': 'calc(100% - 24px)',
                'margin-top': '7px'
            });
            $('.sendButton'+desId).css({'top': '35px'});
            $('.titleColor'+desId).attr('disabled', false);
            $('.titleText'+desId).attr('disabled', false);
        }
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    };
};
/******************直线运动********************/
var StraightMotion = function() {
    this.configId = -1;
    this.createStraightControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.lineElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Line_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move" DataType="1,2" angle="0" lineall="rt" direction="right" linevertical="level" imageSource="local">'
            +'<div id="test" class = "rotated rotate'+idd+'"></div>'
            +'</div>');
        var txt = $('<div id="line" class="line'+idd+'"></div>');
        txt.appendTo(textdiv);
        textdiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 240 + "px",
            "height": 30 + "px"
        });
        $(".line"+idd).css({
            "background-image":"url(images/straight.svg)",
            "background-repeat":"no-repeat",
            "background-size":"100% 100%"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.StraightPropertiesPage(selecteId);
        this.StraightPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.StraightPropertiesPage = function(idd){
        var switchBTn = $('<div id="tc3'+idd+'" class="tc33"></div>');
        $("#fathy").append(switchBTn);
        var switchHtml ='<fieldset class="line_attr1">'
            +'<legend class="lined">运动图形</legend>'
            +'<div class="linemar">控件所在网页的路径为：</div>'
            +'<input type="text" class="linepath" disabled/>'
            +'<div class="linemar">选择运动图形：</div>'
            +'<div class="line_attrText1"><i class="lineImageSource">图片来源</i>'
                +'<div class="line_attrText2">'
                    +'<div class="line_attrDiv" id="localImage'+idd+'"></div><i>本地</i>'
                    +'<div class="line_attrDiv" id="svgImage'+idd+'"></div><i>图库</i>'
                +'</div>'
            +'</div>'
            +'<div class="linetext linemar">'
                +'<form enctype="multipart/form-data">'
                    +'<input type="text" name="textfield" id="straightFileTxtElement_0'+idd+'" class="linetxt lineurl'+idd+' switchInput"/>'
                    +'<input type="button" class="switchBtn switchInput switch_butt addposition" value="浏览"/>'
                    +'<input type="text" name="fileField" class="file switchBtn lineFile switchInput switch_butt addposition filetext"/>'
                +'</form>'
            +'</div>'
            +'</fieldset>'
            +'<fieldset class="line_attr1">'
            +'<legend class="lined">运动方向</legend>'
                +'<div class="linemotion'+idd+'">'
            + '<div class="button_attr3P editfontcolor linewidth linelf'+idd+'" lineauto="left"><div class="lf stralf'+idd+'">向左运动</div><div class="editshowbtn'+idd+' button_attr3_but lineshowbtn"></div></div>'
            + '<div class="button_attr3P editfontcolor linewidth linert'+idd+'" lineauto="right"><div class="lf strart'+idd+'">向右运动</div><div class="editshowbtn'+idd+' button_attr3_but lineshowbtn"></div></div>'
            + '<div class="button_attr3P editfontcolor linewidth linetop'+idd+'" lineauto="top"><div class="lf straup'+idd+'">向上运动</div><div class="editshowbtn'+idd+' button_attr3_but lineshowbtn"></div></div>'
            + '<div class="button_attr3P editfontcolor linewidth linebottom'+idd+'" lineauto="bottom"><div class="lf stradown'+idd+'">向下运动</div><div class="editshowbtn'+idd+' button_attr3_but lineshowbtn"></div></div>'
                +'</div>'
            +'</fieldset>'
            +'<fieldset class="line_attr1">'
            +'<legend class="lined">运动参数</legend>'
                +'<div class="linevert"><span class="lf">垂直状态</span><div class="lineshow'+idd+' vertical lineshow lf"></div></div>'
                +'<div><span>旋转角度</span><input class="lineangle lineangle'+idd+'" type="number" /></div>'
            +'</fieldset>';
        $(".tc33").append(switchHtml);
    };
    this.StraightPageFeatures = function(idd) {
        var controlObj = $('#'+idd);
        var svgImage = $('#svgImage'+idd);
        var localImage = $('#localImage'+idd);
        /*******图片来源初始化********/
        if (controlObj.attr('imageSource') === 'svg') {
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
        } else if (controlObj.attr('imageSource') === 'local'){
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
        }
        /*******图片来源选择********/
        svgImage.click(function() {
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'svg');
        });
        localImage.click(function() {
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'local');
        });
        /***********旋转**********/
        var isdown;
        var x0;
        var y0;
        var x1;
        var y1;
        var rotatebtn = $(".rotate"+idd);
        var straight = $("#"+idd);
        rotatebtn.unbind("mousedown").bind("mousedown",function(e){
            rotate = true;
            isdown = true;
            x0 = parseFloat(straight.css("left")) + (straight.width() / 2);
            y0 = parseFloat(straight.css("top")) + (straight.height() / 2);
            $("html").unbind("mousemove").bind("mousemove",function(e){
                x1 = e.pageX;
                y1 = e.pageY;
                x = x1 - x0;
                y = y1 - y0;
                r = 270 - ((180/Math.PI) * Math.atan2(y,x));
                if(isdown){
                    straight.css("transform","rotate(-"+r+"deg)");
                    var dege = eval('get'+straight.css('transform'));
                    $(".lineangle"+idd).val(dege);
                    $("#"+idd).attr("angle",dege);     
                }
            });
            $("html").unbind("mouseup").bind("mouseup",function(e){
                $("html").unbind("mousemove");
                isdown = false;
                rotate = false;
            });          
        });
        /*********角度控制**********/
        function getmatrix(a,b,c,d,e,f){  
            var aa=Math.round(180*Math.asin(a)/ Math.PI);  
            var bb=Math.round(180*Math.acos(b)/ Math.PI);  
            var cc=Math.round(180*Math.asin(c)/ Math.PI);  
            var dd=Math.round(180*Math.acos(d)/ Math.PI);  
            var deg=0;  
            if(aa==bb||-aa==bb){  
                deg=dd;  
            }else if(-aa+bb==180){  
                deg=180+cc;  
            }else if(aa+bb==180){  
                deg=360-cc||360-dd;  
            }  
            return deg>=360?0:deg;  
        }; 
        $(".lineangle"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var angle = parseInt($(this).val());
            if(angle <= 360){
                $("#"+idd).attr("angle",angle);
                $("#"+idd).css("transform","rotate("+angle+"deg)");
            }else{
                $(this).val("");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $(".lineangle"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var angle = parseInt($(this).val());
            if(angle <= 360){
                $("#"+idd).attr("angle",angle);
                $("#"+idd).css("transform","rotate("+angle+"deg)");
            }else{
                $(this).val("");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /********初始化角度*******/
        var deg = parseInt($("#"+idd).attr("angle"));
        $(".lineangle"+idd).val(deg);
        $("#"+idd).css("transform","rotate("+deg+"deg)"); 
        /*********初始化垂直状态********/
        if($("#"+idd).attr("linevertical") == "vertical"){
            $(".lineshow"+idd).css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".line"+idd).addClass("linev");
            $(".stralf"+idd).addClass("linelevel");
            $(".strart"+idd).addClass("linelevel");
        }else{
            $(".lineshow"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".line"+idd).addClass("line");
            $(".straup"+idd).addClass("linelevel");
            $(".stradown"+idd).addClass("linelevel");
        }
        /*****垂直显示********/
        $(".lineshow"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var linewidth = $("#"+idd).width();
            var lineheight = $("#"+idd).height();
            if($("#"+idd).attr("linevertical") == "level"){
                $(".lineshow"+idd).css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".line"+idd).removeClass("line");
                $(".line"+idd).addClass("linev");
                $("#"+idd).attr("linevertical","vertical");
                $("#"+idd).css({
                    "width":lineheight+'px',
                    "height":linewidth+'px'
                });
                /**********水平不可选********/
                $(".stralf"+idd).addClass("linelevel");
                $(".strart"+idd).addClass("linelevel");
                $(".straup"+idd).removeClass("linelevel");
                $(".stradown"+idd).removeClass("linelevel");
                $(".linebottom"+idd).find(".editshowbtn"+idd).css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".linebottom"+idd).attr("linecheck","yes");
                $(".linebottom"+idd).siblings("div").find(".editshowbtn"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".linebottom"+idd).siblings("div").removeAttr("linecheck");
                $("#"+idd).attr("lineall","bottom");
                $("#"+idd).attr("direction","down");
            }else{
                $(".lineshow"+idd).css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".line"+idd).removeClass("linev");
                $(".line"+idd).addClass("line");
                $("#"+idd).attr("linevertical","level");
                $("#"+idd).css({
                    "width":lineheight+'px',
                    "height":linewidth+'px'
                });
                /**********垂直不可选********/
                $(".straup"+idd).addClass("linelevel");
                $(".stradown"+idd).addClass("linelevel");
                $(".stralf"+idd).removeClass("linelevel");
                $(".strart"+idd).removeClass("linelevel");
                $(".linert"+idd).find(".editshowbtn"+idd).css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".linert"+idd).attr("linecheck","yes");
                $(".linert"+idd).siblings("div").find(".editshowbtn"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".linert"+idd).siblings("div").removeAttr("linecheck");
                $("#"+idd).attr("lineall","rt");
                $("#"+idd).attr("direction","right");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /********************/
        /*var val = 100;
        var lineminval = $("#"+idd).attr("linemin");
        var linemaxval = $("#"+idd).attr("linemax");
        if(lineminval+"" != "undefined" && linemaxval+"" != "undefined" && !isNaN(Number (val))){
            if(val >= lineminval && val <= linemaxval){
                $(".line"+idd).css("display","block");
                if($("#"+idd).attr("direction") == "left"){
                    var linemovel = (100-(val/(linemaxval - lineminval))*100)+'%';
                    console.log(linemovel)
                    $(".line"+idd).css({
                        "position":"absolute",
                        "left":linemovel,
                        "top":0,
                        "transform":"translateX(-50%) translateY(0)"
                    });
                }
                if($("#"+idd).attr("direction") == "right"){
                    var linemover = (val/(linemaxval - lineminval))*100+'%';
                    $(".line"+idd).css({
                        "position":"absolute",
                        "left":linemover,
                        "top":0,
                        "transform":"translateX(-50%) translateY(0)"
                    });
                }
                if($("#"+idd).attr("direction") == "up"){
                    var linemoveup = (100-(val/(linemaxval - lineminval))*100)+'%';
                    $(".line"+idd).css({
                        "position":"absolute",
                        "left":0,
                        "top":linemoveup,
                        "transform":"translateX(0) translateY(-50%)"
                    });
                }
                if($("#"+idd).attr("direction") == "down"){
                    var linemovedown = (val/(linemaxval - lineminval))*100+'%';
                    $(".line"+idd).css({
                        "position":"absolute",
                        "left":0,
                        "top":linemovedown,
                        "transform":"translateX(0) translateY(-50%)"
                    });
                }
                
            }else{
                $(".line"+idd).css("display","none");
            }
        }*/
        /*********备份*******/
        /*var switchFileElement = $(".lineFile");
        var definitionSwitchUrl;
        var switchFileTxtElement = $(".lineurl"+idd);
        var definitionSwitchUrlTxt;
        var filetype;
        var file;
        var isPic;
        var switchContrl = $(".line"+idd);
        var typelist = ["image/jpeg","image/png","image/svg+xml","image/gif","image/bmp"];
        var webPageUrlTxt = $(".linepath");
        webPageUrlTxt.val(webPageUrlTxt.context.URL.split("///")[1]);
        switchFileTxtElement.val($("#"+idd).attr("lineurl"));
        var definitionSwitchshow = function(){
            switchFileElement.bind("change",function(){//读取本地图片路径并显示
                file = this.files[0];
                definitionSwitchUrl = window.URL.createObjectURL(file);//转换为相对路径
                definitionSwitchUrlTxt = switchFileElement.val();
                switchFileTxtElement.val('');
                switchFileTxtElement.val(definitionSwitchUrlTxt);
                $("#"+idd).attr("lineurl",definitionSwitchUrlTxt);
                filetype = file.type;
                //判断filetype是否属于图片
                isPic = typelist.some(function(item){
                    return item == filetype;
                });
                if(isPic){
                    switchContrl.css({ "background-image":"url("+definitionSwitchUrl+""});//显示图片判断其是否为自定义开关
                    $(".img"+idd).css({
                        "background-image":"url("+definitionSwitchUrl+"",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                }else{
                    return false;
                }
            });
        };*/
        /*********读取本地图片文件并显示*******/
        var switchFileElement = $(".lineFile");
        var switchFileTxtElement = $(".lineurl"+idd);
        var webPageUrlTxt = $(".linepath");
        webPageUrlTxt.val(webPageUrlTxt.context.URL.split("///")[1]);
        switchFileTxtElement.val($("#"+idd).attr("lineurl"));
        var definitionSwitchshow = function() {
            switchFileElement.bind("click",function(){
                var beforeLog = inTtCommand.log();
                webapi.addLog('before',beforeLog);
                if (controlObj.attr('imageSource') == 'local') { //选择图片来源是本地图片
                    webapi.getImagePath('images');
                } else if (controlObj.attr('imageSource') == 'svg') { //选择图片来源是图库图片
                    webapi.getSvgPath('images');
                }
                var afterLog = inTtCommand.log();
                webapi.addLog('after',afterLog);
            });
        };
        definitionSwitchshow();
        /*****初始化方向显示*********/
        if($("#"+idd).attr("lineall") == "lf"){
            $(".linelf"+idd).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".linelf"+idd).siblings("div").find(".editshowbtn"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        if($("#"+idd).attr("lineall") == "rt"){
            $(".linert"+idd).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".linert"+idd).siblings("div").find(".editshowbtn"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        if($("#"+idd).attr("lineall") == "top"){
            $(".linetop"+idd).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".linetop"+idd).siblings("div").find(".editshowbtn"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        if($("#"+idd).attr("lineall") == "bottom"){
            $(".linebottom"+idd).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".linebottom"+idd).siblings("div").find(".editshowbtn"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        /***********向右移动效果**********/
        $(".linert"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("linevertical") == "vertical"){
                alert("垂直状态可选！");
            }else{
                $(this).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
                });
                $(this).attr("linecheck","yes");
                $(this).siblings("div").find(".editshowbtn"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(this).siblings("div").removeAttr("linecheck");
                $("#"+idd).attr("lineall","rt");
                $("#"+idd).attr("direction","right");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********向左移动效果**********/
        $(".linelf"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("linevertical") == "vertical"){
                alert("垂直状态可选！");
            }else{
                $(this).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
                });
                $(this).attr("linecheck","yes");
                $(this).siblings("div.linewidth").find(".editshowbtn"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(this).siblings("div.linewidth").removeAttr("linecheck");
                $("#"+idd).attr("lineall","lf");
                $("#"+idd).attr("direction","left");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********向上移动效果**********/
        $(".linetop"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("linevertical") == "level"){
                alert("垂直状态可选！");
            }else{
                $(this).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
                });
                $(this).attr("linecheck","yes");
                $(this).siblings("div.linewidth").find(".editshowbtn"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(this).siblings("div.linewidth").removeAttr("linecheck");
                $("#"+idd).attr("lineall","top");
                $("#"+idd).attr("direction","up");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********向下移动效果**********/
        $(".linebottom"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if($("#"+idd).attr("linevertical") == "level"){
                alert("垂直状态可选！");
            }else{
                $(this).find(".editshowbtn"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
                });
                $(this).attr("linecheck","yes");
                $(this).siblings("div.linewidth").find(".editshowbtn"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(this).siblings("div.linewidth").removeAttr("linecheck");
                $("#"+idd).attr("lineall","bottom");
                $("#"+idd).attr("direction","down");
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*********************FileReader读取本地文件**************************/
        //var filed=function(){
        //    if (!(window.File || window.FileReader || window.FileList || window.Blob)) {
        //        alert('您可能需要chrome浏览器来执行此操作!');
        //    }
        //    var files = $('input[name="fileField"]').prop('files');//获取到文件列表
        //    if(files.length == 0){
        //        //$(".act"+idd).addClass('active').siblings('.active').removeClass('active');
        //        //$("#tc2"+idd).show().siblings().hide();
        //        //alert('您还未配置变量，请选择配置文件.....');
        //    }else{
        //        var reader = new FileReader();//新建一个FileReader
        //        reader.readAsText(files[0], "UTF-8");//读取文件
        //        reader.onload = function(evt){ //读取完文件之后会回来这里
        //            var fileString = evt.target.result;
        //            var obj = JSON.parse(fileString);//将jsong字符串解析成json对象
        //            for(var key in obj){         //遍历json对象
        //                if(key==="data"){        //判断需要的键进行
        //                    //alert("读取到 json 文件中的ID为："+obj[key].ID);
        //                }
        //                //if(key==="type"){
        //                //alert("读取到 json 文件中的为type为："+obj[key]);
        //                //}
        //            }
        //        };
        //    }
        //};
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var switchElement = srcIdElement.find("div.lineimg");
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var direction =  srcIdElement.attr("direction");
        var linedirection = srcIdElement.attr("lineall");
        var angled = srcIdElement.attr("angle");
        var linevert = srcIdElement.attr("linevertical");
        var clas = srcIdElement.attr("class");
        var claschild = $(".line"+srcId).attr("class");
        var switchUrl = switchElement.css("background-image");
        var imageUrl = srcIdElement.attr('lineurl');
        var imageSource = srcIdElement.attr('imageSource');
        if (imageUrl) {
            desIdElement.attr('lineurl', imageUrl);
            $(".line"+desId).css({
                'background-image': 'url('+imageUrl+')'
            });
        }
        desIdElement.find("div.lineimg").css({
            "background-image":switchUrl
        });
        $(".line"+desId).addClass(claschild);
        var deg = parseInt(angled);
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px",
            "transform":"rotate("+deg+"deg)"
        }).addClass(clas).attr({
            "direction":direction,
            'lineall': linedirection,
            'angle': angled,
            'linevertical': linevert,
            'imageSource': imageSource
        });
        var lineheight = desIdElement.height();
        desIdElement.find("div.lineimg").css({
            "height":lineheight+'px'
        });
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
/**********旋转控件*********/
var Rotate = function() {
    this.configId = -1;
    this.createRotateControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.rotateElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Rotate_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move" DataType="0" rotatetype="type1" rotatedirection="clockwise" rotatespeed = "middle" imageSource="local"></div>');
        var txt = $('<div id="rotate" class="rotate rotate'+idd+'"></div><div class="rotatechild rotatechild'+idd+'"></div>');
        txt.appendTo(textdiv);
        textdiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 50 + "px",
            "height": 50 + "px"
        });
        $(".rotate"+idd).css({
                "background-image":"url(images/beijingleft.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "position":"relative",
                "top":"-1%",
                "left":"-1%"
            });
        $(".rotatechild"+idd).css({
            "background-image":"url(images/fan.svg)",
            "background-repeat":"no-repeat",
            "background-size":"100% 100%",
            "width":"70%",
            "height":"45%",
            "position":"absolute",
            "top":"50%",
            "left":"50%",
            "transform":"translateX(-50%) translateY(-50%)"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.RotatePropertiesPage(selecteId);
        this.RotatePageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.RotatePropertiesPage = function(idd){
        var switchBTn = $('<div id="tc3'+idd+'" class="tc33"></div>');
        $("#fathy").append(switchBTn);
        var switchHtml ='<fieldset class="line_attr1">'+
                        '<legend class="rotateb">旋转图像</legend>'+
                            '<div class="redioimage"><label id="radio1" class="radiolabel radio1'+idd+' rotatepointer"><div class="lf rotate1 rotate1'+idd+'"></div><span class="lf rotatetext">水泵1</span><div class="lf redioimg1"><img class="rotateimg" src="images/leftWhole.svg"></div></label></div>'+
                            '<div class="redioimage"><label id="radio2" class="radiolabel radio2'+idd+' rotatepointer"><div class="lf rotate2 rotate2'+idd+'"></div><span class="lf rotatetext">水泵2</span><div class="lf redioimg2"><img class="rotateimg" src="images/rightWhole.svg"></div></label></div>'+
                            '<div class="redioimage"><label id="radio3" class="radiolabel radio3'+idd+' rotatepointer"><div class="lf rotate3 rotate3'+idd+'"></div><span class="lf rotatetext">风扇</span><div class="lf redioimg3"><img class="rotateimg" src="images/elevatorshan.svg"></div></label></div>'+
                            '<div class="linemar">选择旋转图像：</div>'+
                            '<div class="rotate_attrText1"><i class="rotateImageSource">图片来源</i>' +
                                '<div class="rotate_attrText2">' +
                                    '<div class="rotate_attrDiv" id="localImage'+idd+'"></div><i>本地</i>' +
                                    '<div class="rotate_attrDiv" id="svgImage'+idd+'"></div><i>图库</i>' +
                                '</div>' +
                            '</div>' +
                            '<div class="linetext linemar">'+
                                '<form enctype="multipart/form-data">'+
                                    '<input type="text" name="textfield" id="rotateFileTxtElement_0'+idd+'" class="linetxt lineurl'+idd+' switchInput"/>'+
                                    '<input type="button" class="switchBtn switchInput switch_butt addposition" value="浏览"/>'+
                                    '<input type="text" name="fileField" class="file switchBtn lineFile switchInput switch_butt addposition filetext"/>'+
                                '</form>'+
                            '</div>'+
                        '</fieldset>'+
                        '<fieldset class="line_attr1">'+
                        '<legend class="rotateb">旋转速度</legend>'+
                            '<label id="radio4" class="lf rotatepointer radio11'+idd+'"><div class="lf rotate11 rotate11'+idd+'"></div><span class="lf rotatespan rotatetext">低速</span></label>'+
                            '<label id="radio5" class="lf rotatepointer radio22'+idd+'"><div class="lf rotate11 rotate22'+idd+'"></div><span class="lf rotatespan rotatetext">中速</span></label>'+
                            '<label id="radio6" class="lf rotatepointer radio33'+idd+'"><div class="lf rotate11 rotate33'+idd+'"></div><span class="lf rotatespan rotatetext">高速</span></label>'+
                        '</fieldset>'+
                        '<fieldset class="line_attr1">'+
                        '<legend class="rotateb">旋转方向</legend>'+
                            '<label id="radio7" class="lf rotatepointer radio44'+idd+'"><div class="lf rotate11 rotate44'+idd+'"></div><span class="lf rotatetext1">顺时针</span></label>'+
                            '<label id="radio8" class="lf rotatepointer radio55'+idd+'"><div class="lf rotate11 rotate55'+idd+'"></div><span class="lf rotatetext1">逆时针</span></label>'+
                        '</fieldset>';
        $(".tc33").append(switchHtml);
    };
    this.RotatePageFeatures = function(idd) {
        var controlObj = $('#'+idd);
        var svgImage = $('#svgImage'+idd);
        var localImage = $('#localImage'+idd);
        /*******图片来源初始化********/
        if (controlObj.attr('imageSource') === 'svg') {
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
        } else if (controlObj.attr('imageSource') === 'local'){
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
        }
        /*******图片来源选择********/
        svgImage.click(function() {
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'svg');
        });
        localImage.click(function() {
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'local');
        });
        /****水泵1******/
        $(".radio1"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).removeAttr("lineurl");
            $(".rotatechild" + idd).css({
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused"
            });
            $(".rotate" + idd).css({
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused"
            });
            $(".rotate"+idd).css({
                "background-image":"url(images/beijingleft.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "position":"relative",
                "top":"-1%",
                "left":"-1%"
            });
            $(".rotatechild"+idd).css({
                "background-image":"url(images/fan.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "width":"70%",
                "height":"45%"
            });
            $(".rotate1"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate2"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate3"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatetype","type1");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****水泵2******/
        $(".radio2"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).removeAttr("lineurl");
            $(".rotatechild" + idd).css({
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused"
            });
            $(".rotate" + idd).css({
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused"
            });
            $(".rotate"+idd).css({
                "background-image":"url(images/beijingright.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "position":"relative",
                "top":"-1%",
                "left":"2%"
            });
            $(".rotatechild"+idd).css({
                "background-image":"url(images/fan.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "width":"70%",
                "height":"45%"
            });
            $(".rotate2"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate1"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate3"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatetype","type2");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****风扇******/
        $(".radio3"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).removeAttr("lineurl");
            $(".rotate" + idd).css({
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused"
            });
            $(".rotatechild" + idd).css({
                "-webkit-animation-play-state": "paused",
                "-moz-animation-play-state": "paused"
            });
            $(".rotatechild"+idd).css({
                "background-image":"none"
            });
            $(".rotate"+idd).css({
                "background-image":"url(images/elevatorshan.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate3"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate2"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate1"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatetype","type3");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****图形切换初始化****/
        if($("#"+idd).attr("lineurl")+"" == "undefined"){
            if($("#"+idd).attr("rotatetype") == "type1"){
                $(".rotate"+idd).css({
                "background-image":"url(images/beijingleft.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "position":"relative",
                "top":"-1%",
                "left":"-1%"
                });
                $(".rotatechild"+idd).css({
                    "background-image":"url(images/fan.svg)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%",
                    "width":"70%",
                    "height":"45%"
                });
                $(".rotate1"+idd).css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });

                $(".rotate2"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".rotate3"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }
            if($("#"+idd).attr("rotatetype") == "type2"){
                $(".rotate"+idd).css({
                "background-image":"url(images/beijingright.svg)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%",
                "position":"relative",
                "top":"-1%",
                "left":"2%"
                });
                $(".rotatechild"+idd).css({
                    "background-image":"url(images/fan.svg)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%",
                    "width":"70%",
                    "height":"45%"
                });
                $(".rotate2"+idd).css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".rotate1"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".rotate3"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }
            if($("#"+idd).attr("rotatetype") == "type3"){
                $(".rotatechild"+idd).css({
                "background-image":"none"
                });
                $(".rotate"+idd).css({
                    "background-image":"url(images/elevatorshan.svg)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".rotate3"+idd).css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".rotate2"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".rotate1"+idd).css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }
        }else{
            var line_url = $("#"+idd).attr("lineurl");
            $(".rotate"+idd).css({
                "background-image":"url("+line_url+")",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate1"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate2"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate3"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }   
        /******旋转速度*******/
        $(".radio11"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $(".rotate11"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate22"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate33"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatespeed","low");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $(".radio22"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $(".rotate22"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate11"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate33"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatespeed","middle");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $(".radio33"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $(".rotate33"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate22"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate11"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatespeed","high");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*************旋转速度初始化**********/
        if($("#"+idd).attr("rotatespeed") == "low"){
            $(".rotate11"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate22"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate33"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        if($("#"+idd).attr("rotatespeed") == "middle"){
            $(".rotate22"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate11"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate33"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        if($("#"+idd).attr("rotatespeed") == "high"){
            $(".rotate33"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate22"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate11"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        /******旋转方向*******/
        $(".radio44"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $(".rotate44"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate55"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatedirection","clockwise");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $(".radio55"+idd).mousedown(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $(".rotate55"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate44"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("rotatedirection","counterclockwise");
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*****旋转方向初始化******/
        if($("#"+idd).attr("rotatedirection") == "clockwise"){
            $(".rotate44"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate55"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        if($("#"+idd).attr("rotatedirection") == "counterclockwise"){
            $(".rotate55"+idd).css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".rotate44"+idd).css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        /*****读取本地图片******/
        var switchFileElement = $(".lineFile");
        var switchFileTxtElement = $(".lineurl"+idd);
        var webPageUrlTxt = $(".linepath");
        webPageUrlTxt.val(webPageUrlTxt.context.URL.split("///")[1]);
        switchFileTxtElement.val($("#"+idd).attr("lineurl"));
        var definitionSwitchshow = function() {
            switchFileElement.bind("click",function(){
                var beforeLog = inTtCommand.log();
                webapi.addLog('before',beforeLog);
                if (controlObj.attr('imageSource') == 'local') { //选择图片来源是本地图片
                    webapi.getImagePath('images');
                } else if (controlObj.attr('imageSource') == 'svg') { //选择图片来源是图库图片
                    webapi.getSvgPath('images');
                }
                var afterLog = inTtCommand.log();
                webapi.addLog('after',afterLog);
            });
        };
        definitionSwitchshow();
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var switchElement = srcIdElement.find(".rotatechild"+srcId);
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var direction =  srcIdElement.attr("rotatespeed");
        var linedirection = srcIdElement.attr("rotatedirection");
        var lineurl = srcIdElement.attr("lineurl");
        var rotatetype = srcIdElement.attr("rotatetype");
        var clas = srcIdElement.attr("class");
        var switchUrl = switchElement.css("background-image");
        var imageSource = srcIdElement.attr('imageSource');
        desIdElement.find(".rotatechild"+desId).css({
            "background-image":switchUrl
        });
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px"
        }).addClass(clas).attr({
            'class': clas,
            'lineurl': lineurl,
            'rotatetype': rotatetype,
            "rotatespeed":direction,
            'rotatedirection': linedirection,
            'imageSource': imageSource
        });
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    }
};
/*******************滑杆控件*************************/
var SlideBarControl = function(){
    this.configId = -1;
    this.createSlideBarControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.slideBarElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'SlideBar_' + this.configId;
        this.id = idd;
        var textDiv = $(
            '<div id=' + idd + ' class="contrl move slidebar" DataType="1" shape="rectangle" value="level" ruleOff="have" degreeDirection="bottom" sure="yes" success="yes" fails="yes">' +
                '<div class="total total'+idd+'">' +
                    '<div class="slider slider'+idd+'">' +
                        '<div class="slide_bar slide_bar'+idd+'">' +
                            '<div class="slider_block slider_block'+idd+'" id="sliderBlock-'+idd+'">' +
                                '<span class="slider_tip slider_tip'+idd+'">0</span>' +
                            '</div>' +
                            '<div class="sliderBottom sliderBottom'+idd+'">' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:0%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:5%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:10%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:15%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:20%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:25%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:30%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:35%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:40%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:45%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:50%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:55%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:60%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:65%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:70%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:75%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:80%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:85%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:90%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:95%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                                '<span class="sliderPip sliderPip'+idd+'" style="left:100%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                            '</div>' +
                        '</div>' +
                    '<div class="sliderNum sliderNum'+idd+'"><span class="sliderNum1 sliderNum1'+idd+'">0</span><span class="sliderNum3 sliderNum3'+idd+'">100</span></div>' +
                    '</div>' +
                '</div>'+
            '</div>'
        );
        $('#content').append(textDiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;
        //控件相关样式
        $('#' + idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 50 + 'px',
            'width': 260 + 'px'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.SlideBarPropertiesPage(selecteId);
        this.SlideBarPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.SlideBarPropertiesPage = function(idd) {
        var proAttributes = $('' +
            '<div id="tc3'+idd+'" class="tc33">' +
                '<fieldset class="slider_attr1">' +
                    '<legend>常规</legend>' +
                        '<div class="slider_attrText"><i>前景颜色</i><input class="foreground'+idd+'" type="color"/></div>' +
                        '<div class="slider_attrText"><i>背景颜色</i><input class="background'+idd+'" type="color"/></div>' +
                        '<div class="slider_attrText"><i>滑杆背景颜色</i><input class="sliderBackground'+idd+'" type="color"/></div>' +
                        '<div class="slider_attrText"><i>滑块背景颜色</i><input class="thumbBackground'+idd+'" type="color"/></div>' +
                        '<div class="slider_attrText"><i>水平滑杆</i><div class="slider_attrDiv" id="slider2'+idd+'"></div></div>' +
                        '<div class="slider_attrText"><i>垂直滑杆</i><div class="slider_attrDiv" id="slider3'+idd+'"></div></div>' +
                '</fieldset>' +
                '<fieldset class="slider_attr2">' +
                    '<legend>刻度显示</legend>' +
                    '<div class="slider_attrText"><i>显示刻度</i><div class="slider_attrDiv degreeHidden'+idd+'"></div></div>' +
                    '<div class="slider_attrText"><i>刻度方向两边</i><div class="slider_attrDiv directionBoth'+idd+'"></div></div>' +
                    '<div class="slider_attrText"><i>刻度方向上边</i><div class="slider_attrDiv directionTop'+idd+'"></div></div>' +
                    '<div class="slider_attrText"><i>刻度方向下边</i><div class="slider_attrDiv directionBottom'+idd+'"></div></div>' +
                 '</fieldset>' +
                '<fieldset class="slider_attr3">' +
                    '<legend>扩展</legend>' +
                    '<div class="slider_attrText"><i>确认控制命令</i><div class="slider_attrDiv" id="slider8'+idd+'"></div></div>' +
                    '<div class="slider_attrText"><i>报告成功命令</i><div class="slider_attrDiv" id="slider9'+idd+'"></div></div>' +
                    '<div class="slider_attrText"><i>报告失败命令</i><div class="slider_attrDiv" id="slider10'+idd+'"></div></div>' +
                '</fieldset>' +
            '</div>');
        $("#fathy").append(proAttributes);
    };
    this.SlideBarPageFeatures = function(idd) {
    	var confirmOrder = $("#slider8"+idd);
        var successOrder = $("#slider9"+idd);
        var failOrder = $("#slider10"+idd);
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder,idd);//报告命令状态
        //设置初始背景颜色和滑杆背景颜色
        /*******加载控件时属性页上的颜色与控件一致*******/
        $.fn.getHexBackgroundColorpro = function() {
            var foreground = $('.sliderNum'+idd).css('color'); //前景颜色
            var background = $('.total'+idd).css('background-color'); //背景颜色
            var sliderBackground = $('.slide_bar'+idd).css('background-color'); //滑杆背景颜色
            var thumbBackground = $('.slider_block'+idd).css('background-color'); //滑块背景颜色
            $('.foreground'+idd).val(inItPropertiesPage.formatColor(foreground));
            $('.background'+idd).val(inItPropertiesPage.formatColor(background));
            $('.sliderBackground'+idd).val(inItPropertiesPage.formatColor(sliderBackground));
            $('.thumbBackground'+idd).val(inItPropertiesPage.formatColor(thumbBackground));
        };
        $.fn.getHexBackgroundColorpro();
        /*******背景颜色、滑杆背景颜色、滑块颜色设置*******/
        inItPropertiesPage.setColor($(".foreground"+idd), ['color', $('.sliderNum'+idd), 'background', $('.sliderLine'+idd)], ['color', $('#'+idd)]);
        inItPropertiesPage.setColor($(".background"+idd), ['background-color', $('.total'+idd)]);
        inItPropertiesPage.setColor($(".sliderBackground"+idd), ['background-color', $('.slide_bar'+idd)])
        inItPropertiesPage.setColor($(".thumbBackground"+idd), ['background-color', $('.slider_block'+idd)]);
        /**************滑杆水平、垂直设置**************/
        //水平方向上刻度线样式
        function levelDegreeTop() {
            /*水平方向时给每一格刻度线变更left为0%，5%，10%，15%...*/
            var temp = 0;
            for (var i = 0; i <= 20; i++) {
                var spanAllElement = $('.sliderTop'+idd+' .sliderPip');
                var spanElement = $(spanAllElement).eq(i);
                spanElement.css({'left': temp + '%'});
                spanElement.css({'top': -12 + 'px'});
                temp = temp + 5;
            }
            $('.sliderTop'+idd+' .sliderPip').css({
                'width': '2em',
                'height': '1em',
                'line-height': '1em',
                'margin-left': '-1em'
            });
            $('.sliderLine'+idd).css({
                'width': '1px',
                'height': '5px'
            });
        }
        //水平方向下刻度线样式
        function levelDegreeBottom() {
            /*给每一格刻度线变更top为0%，5%，10%，15%...*/
            var temp = 0;
            for (var i = 0; i <= 20; i++) {
                var spanAllElement = $('.sliderBottom'+idd+' .sliderPip');
                var spanElement = $(spanAllElement).eq(i);
                spanElement.css({'left': temp + '%'});
                spanElement.css({'top': 14 + 'px'});
                temp = temp + 5;
            }
            $('.sliderBottom'+idd+' .sliderPip').css({
                'width': '2em',
                'height': '1em',
                'line-height': '1em',
                'margin-left': '-1em'
            });
            $('.sliderLine'+idd).css({
                'width': '1px',
                'height': '5px'
            });
        }
        //垂直方向上刻度线样式
        function verticalDegreeTop() {
            /*垂直方向时给每一格刻度线变更top为0%，5%，10%，15%...*/
            var temp = 0;
            for (var i = 0; i <= 20; i++) {
                var spanAllElement = $('.sliderTop'+idd+' .sliderPip');
                var spanElement = $(spanAllElement).eq(i);
                spanElement.css({'top': temp + '%'});
                spanElement.css({'left': 0 + '%'});
                temp = temp + 5;
            }
            $('.sliderTop'+idd+' .sliderPip').css({
                'width': '1em',
                'height': '2em',
                'line-height': '2em',
                'margin-left': '-1.4em'
            });
            $('.sliderLine'+idd).css({
                'width': '5px',
                'height': '1px'
            });
        }
        //垂直方向下刻度线样式
        function verticalDegreeBottom() {
            /*给每一格刻度线变更top为0%，5%，10%，15%...*/
            var temp = 0;
            for (var i = 0; i <= 20; i++) {
                var spanAllElement = $('.sliderBottom'+idd+' .sliderPip');
                var spanElement = $(spanAllElement).eq(i);
                spanElement.css({'top': temp + '%'});
                spanElement.css({'left': 0 + '%'});
                temp = temp + 5;
            }
            $('.sliderBottom'+idd+' .sliderPip').css({
                'width': '1em',
                'height': '2em',
                'line-height': '2em',
                'margin-left': '0.6em'
            });
            $('.sliderLine'+idd).css({
                'width': '5px',
                'height': '1px'
            });
        }
        function vertical() {
            if ($('#'+idd).attr('value') === 'vertical') {
                var width = $('#'+idd).css('width');
                var height = $('#'+idd).css('height');
                $('#'+idd).css({
                    'height': width,
                    'width': height,
                    'z-index': 5
                });
                $('.slider'+idd).css({
                    'width': '14px',
                    'height': 'calc(100% - 50px)',
                    'top': '25px',
                    'left': 'calc((100% - 14px) / 2)'
                });
                $('.slide_bar'+idd).css({
                    'width': '8px',
                    'height': 'calc(100% - 6px)'
                });
                var textValue = $('.slider_tip'+idd).text();
                $('.slider_block'+idd).css({
                    'left': '5px',
                    'top': (100 - textValue) + '%',
                    'margin-left': '-10px',
                    'margin-top': '-8px'
                });

                if ($('#'+idd).attr('degreeDirection') === 'top') {
                    verticalDegreeTop();
                } else if ($('#'+idd).attr('degreeDirection') === 'bottom') {
                    verticalDegreeBottom();
                } else if ($('#'+idd).attr('degreeDirection') === 'both'){
                    verticalDegreeTop();
                    verticalDegreeBottom();
                }
                $('.sliderNum'+idd).css({
                    'width': '14px',
                    'height': '100%'
                });
                $('.sliderNum1'+idd).removeClass('sliderNum1').addClass('sliderNum1_vertical');
                $('.sliderNum3'+idd).removeClass('sliderNum3').addClass('sliderNum3_vertical');
                $('.slider_tip'+idd).css({
                    'margin-left': '-37px',
                    'top': '0'
                });
            }
        }
        function level() {
            if ($('#'+idd).attr('value') === 'level') {
                var width = $('#'+idd).css('width');
                var height = $('#'+idd).css('height');
                $('#'+idd).css({
                    'height': width,
                    'width': height,
                    'z-index': 5
                });
                $('.slider'+idd).css({
                    'width': 'calc(100% - 50px)',
                    'height': '14px',
                    'top': 'calc((100% - 14px) / 2)',
                    'left': '19px'
                });
                $('.slide_bar'+idd).css({
                    'width': 'calc(100% - 6px)',
                    'height': '8px'
                });
                var textValue = $('.slider_tip'+idd).text();
                $('.slider_block'+idd).css({
                    'left': textValue + '%',
                    'top': '-5px',
                    'margin-left': '-8px',
                    'display': 'block',
                    'margin-top': '0'
                });

                if ($('#'+idd).attr('degreeDirection') === 'top') {
                    levelDegreeTop();
                } else if ($('#'+idd).attr('degreeDirection') === 'bottom') {
                    levelDegreeBottom();
                } else if ($('#'+idd).attr('degreeDirection') === 'both'){
                    levelDegreeTop();
                    levelDegreeBottom();
                }
                $('.sliderNum'+idd).css({
                    'width': '100%',
                    'height': '14px'
                });
                $('.sliderNum1'+idd).removeClass('sliderNum1_vertical').addClass('sliderNum1');
                $('.sliderNum3'+idd).removeClass('sliderNum3_vertical').addClass('sliderNum3');
                $('.slider_tip'+idd).css({
                    'margin-left': '-12px',
                    'top': '-32px'
                });
            }
        }
        /*=======同步水平、垂直显示=======*/
        if ($('#'+idd).attr('value') === 'vertical') {
            $('#slider3'+idd).css({'background': 'url(images/yixuan.png)'});
            $('#slider2'+idd).css({'background': 'url(images/weixuan.png)'});
        } else if ($('#'+idd).attr('value') === 'level'){
            $('#slider2'+idd).css({'background': 'url(images/yixuan.png)'});
            $('#slider3'+idd).css({'background': 'url(images/weixuan.png)'});
        }
        /*=======水平、垂直显示切换=======*/
        $('#slider3'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $('#slider3'+idd).css({'background': 'url(images/yixuan.png)'});
            $('#slider2'+idd).css({'background': 'url(images/weixuan.png)'});
            var value = $('#'+idd).attr('value');
            if (value === 'level') {
                $('#'+idd).removeAttr('value', 'level');
                $('#'+idd).attr('value', 'vertical');
                vertical();
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $('#slider2'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $('#slider2'+idd).css({'background': 'url(images/yixuan.png)'});
            $('#slider3'+idd).css({'background': 'url(images/weixuan.png)'});
            var value = $('#'+idd).attr('value');
            if (value === 'vertical') {
                $('#'+idd).removeAttr('value', 'vertical');
                $('#'+idd).attr('value', 'level');
                level();
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });

        /**************刻度显示**************/
        var degreeTopDom = $(
            '<div class="sliderTop sliderTop'+idd+'">' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:0%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:5%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:10%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:15%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:20%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:25%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:30%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:35%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:40%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:45%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:50%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:55%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:60%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:65%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:70%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:75%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:80%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:85%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:90%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:95%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '<span class="sliderPip sliderPip'+idd+'" style="left:100%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '</div>');
        var degreeBottomDom = $(
            '<div class="sliderBottom sliderBottom'+idd+'">' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:0%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:5%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:10%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:15%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:20%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:25%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:30%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:35%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:40%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:45%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:50%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:55%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:60%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:65%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:70%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:75%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:80%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:85%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:90%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:95%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
                '<span class="sliderPip sliderPip'+idd+'" style="left:100%"><span class="sliderLine sliderLine'+idd+'"></span></span>' +
            '</div>');
        /*=======同步刻度方向、显示、隐藏刻度=======*/
        if ($('#'+idd).attr('ruleOff') === 'nohave') {
            $('.degreeHidden'+idd).css({'background': 'url(images/notselected.png)'});
            $('.directionTop'+idd).css({'background': 'url(images/weixuan.png)'});
            $('.directionBoth'+idd).css({'background': 'url(images/weixuan.png)'});
            $('.directionBottom'+idd).css({'background': 'url(images/weixuan.png)'});
        } else {
            $('.degreeHidden'+idd).css({'background': 'url(images/selected.png)'});
            if ($('#'+idd).attr('degreeDirection') === 'top') {
                $('.degreeHidden'+idd).css({'background': 'url(images/selected.png)'});
                $('.directionTop'+idd).css({'background': 'url(images/yixuan.png)'});
                $('.directionBoth'+idd).css({'background': 'url(images/weixuan.png)'});
                $('.directionBottom'+idd).css({'background': 'url(images/weixuan.png)'});
            } else if ($('#'+idd).attr('degreeDirection') === 'both') {
                $('.degreeHidden'+idd).css({'background': 'url(images/selected.png)'});
                $('.directionBoth'+idd).css({'background': 'url(images/yixuan.png)'});
                $('.directionTop'+idd).css({'background': 'url(images/weixuan.png)'});
                $('.directionBottom'+idd).css({'background': 'url(images/weixuan.png)'});
            } else {
                $('.degreeHidden'+idd).css({'background': 'url(images/selected.png)'});
                $('.directionBottom'+idd).css({'background': 'url(images/yixuan.png)'});
                $('.directionTop'+idd).css({'background': 'url(images/weixuan.png)'});
                $('.directionBoth'+idd).css({'background': 'url(images/weixuan.png)'});
            }
        }
        /*=======刻度方向=======*/
        $('.directionTop'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $('.directionTop'+idd).css({'background': 'url(images/yixuan.png)'});
            $('.directionBoth'+idd).css({'background': 'url(images/weixuan.png)'});
            $('.directionBottom'+idd).css({'background': 'url(images/weixuan.png)'});
            $('#'+idd).attr('degreeDirection', 'top');
            $('.sliderBottom'+idd).remove();
            $('.sliderTop'+idd).remove();
            $('.slide_bar'+idd).append(degreeTopDom);
            if ($('#'+idd).attr('value') === 'vertical') {
                verticalDegreeTop();
            }
            $('.sliderLine'+idd).css('background', $('#'+idd).attr('color'));
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $('.directionBottom'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $('.directionBottom'+idd).css({'background': 'url(images/yixuan.png)'});
            $('.directionTop'+idd).css({'background': 'url(images/weixuan.png)'});
            $('.directionBoth'+idd).css({'background': 'url(images/weixuan.png)'});
            $('#'+idd).attr('degreeDirection', 'bottom');
            $('.sliderBottom'+idd).remove();
            $('.sliderTop'+idd).remove();
            $('.slide_bar'+idd).append(degreeBottomDom);
            if ($('#'+idd).attr('value') === 'vertical') {
                verticalDegreeBottom();
            }
            $('.sliderLine'+idd).css('background', $('#'+idd).attr('color'));
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $('.directionBoth'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $('.directionBoth'+idd).css({'background': 'url(images/yixuan.png)'});
            $('.directionTop'+idd).css({'background': 'url(images/weixuan.png)'});
            $('.directionBottom'+idd).css({'background': 'url(images/weixuan.png)'});
            $('#'+idd).attr('degreeDirection', 'both');
            $('.sliderBottom'+idd).remove();
            $('.slide_bar'+idd).append(degreeTopDom);
            $('.slide_bar'+idd).append(degreeBottomDom);
            if ($('#'+idd).attr('value') === 'vertical') {
                verticalDegreeBottom();
                verticalDegreeTop();
            }
            $('.sliderLine'+idd).css('background', $('#'+idd).attr('color'));
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*=======刻度隐藏=======*/
        $('.degreeHidden'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if ($('#'+idd).attr('ruleOff') === 'nohave') {
                $('.degreeHidden'+idd).css({'background': 'url(images/selected.png)'});
                $('#'+idd).attr('ruleOff', 'have');
            } else {
                $('.degreeHidden'+idd).css({'background': 'url(images/notselected.png)'});
                $('.directionTop'+idd).css({'background': 'url(images/weixuan.png)'});
                $('.directionBoth'+idd).css({'background': 'url(images/weixuan.png)'});
                $('.directionBottom'+idd).css({'background': 'url(images/weixuan.png)'});
                $('#'+idd).attr('ruleOff', 'nohave');
                $('.sliderBottom'+idd).remove();
                $('.sliderTop'+idd).remove();
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        this.copy = function(srcId, desId) {
            var srcIdElement = $('#'+srcId);
            var desIdElement = $('#'+desId);
            var width = srcIdElement.width();
            var height = srcIdElement.height();
            var srcClass = srcIdElement.attr('class');
            desIdElement.css({
                'width': width + 'px',
                'height': height + 'px',
                'line-height': height + 'px'
            }).addClass(srcClass);

            //复制各种颜色
            var foreground = $('.sliderNum'+srcId).css('color');
            var background = $('.total'+srcId).css('background-color');
            var sliderBackground = $('.slide_bar'+srcId).css('background-color');
            var thumbBackground = $('.slider_block'+srcId).css('background-color');
            $('.sliderNum'+desId).css('color', foreground);
            $('.sliderLine'+desId).css('background', foreground);
            $('.total'+desId).css('background-color', background);
            $('.slide_bar'+desId).css('background-color', sliderBackground);
            $('.slider_block'+desId).css('background-color', thumbBackground);
			$('#'+desId).attr('sure', $('#'+srcId).attr('sure'));
			$('#'+desId).attr('success', $('#'+srcId).attr('success'));
			$('#'+desId).attr('fails', $('#'+srcId).attr('fails'));
            var value = srcIdElement.attr('value'); //原始控件的方向：水平、垂直
            desIdElement.attr('value', value);
            //复制刻度线方向和隐藏显示
            var rule = srcIdElement.attr('ruleOff'); //原始控件是否展示刻度线
            var degreeDirection = srcIdElement.attr('degreeDirection'); //原始控件刻度线方向：两边、向上、向下
            desIdElement.attr('ruleOff', rule);
            desIdElement.attr('degreeDirection', degreeDirection);
            if (value === 'vertical') { //垂直方向
                desIdElement.css({
                    'width': width + 'px',
                    'height': height + 'px',
                    'line-height': height + 'px'
                }).addClass(srcClass);
                $('.total'+desId).css({
                    'width': 100 + '%',
                    'height': 100 + '%',
                    'position': 'relative'
                });
                $('.slider'+desId).css({
                    'width': '14px',
                    'height': 'calc(100% - 50px)',
                    'top': '25px',
                    'left': 'calc((100% - 14px) / 2)'
                });
                $('.slide_bar'+desId).css({
                    'width': '8px',
                    'height': 'calc(100% - 6px)'
                });
                var textValue = $('.slider_tip'+srcId).text();
                $('.slider_block'+desId).css({
                    'left': '5px',
                    'top': (100 - textValue) + '%',
                    'margin-left': '-10px',
                    'margin-top': '-8px'
                });
                $('.slider_tip'+desId).text(textValue);
                $('.sliderNum'+idd).css({
                    'width': '14px',
                    'height': '100%'
                });
                $('.sliderNum1'+idd).removeClass('sliderNum1').addClass('sliderNum1_vertical');
                $('.sliderNum3'+idd).removeClass('sliderNum3').addClass('sliderNum3_vertical');
                $('.slider_tip'+desId).css({
                    'margin-left': '-37px',
                    'top': '0'
                });
                function verticalDegreeTopCopy() {
                    var temp = 0;
                    for (var i = 0; i <= 20; i++) {
                        var spanAllElement = $('.sliderTop'+desId+' .sliderPip');
                        var spanElement = $(spanAllElement).eq(i);
                        spanElement.css({'top': temp + '%'});
                        spanElement.css({'left': 0 + '%'});
                        temp = temp + 5;
                    }
                    $('.sliderTop'+desId+' .sliderPip').css({
                        'width': '1em',
                        'height': '2em',
                        'line-height': '2em',
                        'margin-left': '-1.4em'
                    });
                    $('.sliderLine'+desId).css({
                        'width': '5px',
                        'height': '1px'
                    });
                }
                function verticalDegreeBottomCopy() {
                    var temp = 0;
                    for (var i = 0; i <= 20; i++) {
                        var spanAllElement = $('.sliderBottom'+desId+' .sliderPip');
                        var spanElement = $(spanAllElement).eq(i);
                        spanElement.css({'top': temp + '%'});
                        spanElement.css({'left': 0 + '%'});
                        temp = temp + 5;
                    }
                    $('.sliderBottom'+desId+' .sliderPip').css({
                        'width': '1em',
                        'height': '2em',
                        'line-height': '2em',
                        'margin-left': '0.6em'
                    });
                    $('.sliderLine'+desId).css({
                        'width': '5px',
                        'height': '1px'
                    });
                }
                if (rule === 'nohave') {
                    $('.sliderBottom'+desId).remove();
                    $('.sliderTop'+desId).remove();
                } else {
                    if (degreeDirection === 'top') {
                        $('.sliderBottom'+desId).remove();
                        $('.sliderTop'+desId).remove();
                        $('.slide_bar'+desId).append(degreeTopDom);
                        verticalDegreeTopCopy();
                    } else if (degreeDirection === 'both') {
                        $('.sliderBottom'+desId).remove();
                        $('.slide_bar'+desId).append(degreeTopDom);
                        $('.slide_bar'+desId).append(degreeBottomDom);
                        verticalDegreeTopCopy();
                        verticalDegreeBottomCopy();
                    } else {
                        $('.sliderBottom'+desId).remove();
                        $('.sliderTop'+desId).remove();
                        $('.slide_bar'+desId).append(degreeBottomDom);
                        verticalDegreeBottomCopy();
                    }
                }
            } else { //水平方向
                desIdElement.css({
                    'width': width + 'px',
                    'height': height + 'px',
                    'line-height': height + 'px'
                }).addClass(srcClass);
                var textValue = $('.slider_tip'+srcId).text();
                $('.slider_block'+desId).css({
                    'left': textValue + '%',
                    'top': '-5px',
                    'margin-left': '-8px',
                    'margin-top': '0'
                });
                $('.slider_tip'+desId).text(textValue);
                if (rule === 'nohave') {
                    $('.sliderBottom'+desId).remove();
                    $('.sliderTop'+desId).remove();
                } else {
                    if (degreeDirection === 'top') {
                        $('.sliderBottom'+desId).remove();
                        $('.sliderTop'+desId).remove();
                        $('.slide_bar'+desId).append(degreeTopDom);
                    } else if (degreeDirection === 'both') {
                        $('.sliderBottom'+desId).remove();
                        $('.slide_bar'+desId).append(degreeTopDom);
                        $('.slide_bar'+desId).append(degreeBottomDom);
                    } else {
                        $('.sliderBottom'+desId).remove();
                        $('.sliderTop'+desId).remove();
                        $('.slide_bar'+desId).append(degreeBottomDom);
                    }
                }
            }
            // 复制变量配置信息
            inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
            //复制控件刻度最大最小值
            var variableId = srcIdElement.attr('variableID');
            var maxValue = srcIdElement.attr('MiXEuVal');
            var minValue = srcIdElement.attr('MinEuVal');
            if (variableId) {
                $('.sliderNum1'+desId).text(minValue);
                $('.sliderNum3'+desId).text(maxValue);
            }
        }
    }
};
//历史事件控件
var HistoryEventControl = function(){
    this.configId = -1;
    this.createHistoryEventControl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.HistoryEventElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "History_" + this.configId;
        this.id = idd;
        var historyEventHtml =
            '<div id='+idd+' class="contrl move" alarmcolor="#ff0000" backcolor_="#ffffff">'+
                '<div class="box'+idd+' historyEventBox">'+
                    '<div class="historyEvent_showMsg">' +
                        '<header class="historyEvent_title"><b class="history_point"></b><span>历史事件记录</span></header>'+
                        '<div class="eventHeaderBox eventHeaderBox'+idd+'">' +
                            '<ul class="history_headerList history_headerList'+idd+'">' +
                                '<li>日期</li>' +
                                '<li>时间</li>' +
                                '<li>用户名</li>' +
                                '<li>事件记录</li>' +
                                '<li>事件类型</li>' +
                                '<li>访问级别</li>' +
                            '</ul>'+
                        '</div>' +
                    '</div>' +
                    '<div class="historyEvent_dataShowBox" id="dataShowBox'+idd+'">' +
                        
                    '</div>'+
                    '<div class="history_footBox">'+
                        '<div class="footdated"><span>日期查询</span><input readonly="readonly" id="myDate_start'+idd+'" class="start dated" type="text" placeholder="年 / 月 / 日"/><span>至</span><input readonly="readonly" id="myDate_end'+idd+'" class="end dated" type="text" placeholder="年 / 月 / 日"/><p class="search3 search3'+idd+'"></p></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
        $('#content').append(historyEventHtml);
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrolLeft+"px",
            "top": y + scrolTop +"px",
            "width": "600px",
            "height": "310px"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd);//添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.historyEventPropertiesPage(selecteId);
        this.historyEventPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.historyEventPropertiesPage = function(idd){
        var historyP = '<div id="tc3'+idd+'" class="tc33">' +
                            '<fieldset class="attrs">' +
                                '<legend>标题文字</legend>' +
                                '<ul class="style1">' +
                                    '<li>' +
                                        '<select class="lin sele3'+idd+' sele33" name="sele">' +
                                            '<option value="1" selected="">自定义</option>' +
                                        '</select>' +
                                    '</li>' +
                                    '<li>' +
                                        '<select class="lin historyFont'+idd+' sele22" name="sele">' +
                                            '<option value="Microsoft YaHei" selected="selected">微软雅黑</option>' +
                                            '<option value="KaiTi">楷体</option>' +
                                            '<option value="SimHei">黑体</option>' +
                                            '<option value="SimSun">宋体</option>' +
                                            '<option value="NSimSun">新宋体</option>' +
                                            '<option value="FangSong">仿宋</option>' +
                                            '<option value="LiSu">隶书</option>' +
                                            '<option value="YouYuan">幼圆</option>' +
                                        '</select>' +
                                    '</li>' +
                                    '<li>' +
                                        '<select class=" lin setFontSize'+idd+'" name="sele">' +
                                            '<option value="56">初号</option>' +
                                            '<option value="48">小初</option>' +
                                            '<option value="34">一号</option>' +
                                            '<option value="32">小一</option>' +
                                            '<option value="28">二号</option>' +
                                            '<option value="24">小二</option>' +
                                            '<option value="21">三号</option>' +
                                            '<option value="20">小三</option>' +
                                            '<option value="18">四号</option>' +
                                            '<option value="16" selected="selected">小四</option>' +
                                            '<option value="14">五号</option>' +
                                            '<option value="12">小五</option>' +
                                            '<option value="10">六号</option>' +
                                            '<option value="8">小六</option>' +
                                            '<option value="6">七号</option>' +
                                            '<option value="4">八号</option>' +
                                        '</select>' +
                                    '</li>' +
                                '</ul>' +
                                '<ul class="style2 fontDecoration'+idd+'">' +
                                    '<li><img src="images/convention.png"></li>' +
                                    '<li><img src="images/overstriking.png"></li>' +
                                    '<li><img src="images/Italic.png"></li>' +
                                    '<li><img src="images/underline.png"></li>' +
                                    '<li><img src="images/strikethrough.png"></li>' +
                                '</ul>' +
                                '<p class="lf exppp testy" id="exp1'+idd+'">文字示例</p>' +
                                '<ul class="history_node">' +
                                    '<li>' +
                                        '<p class="node">标题文字颜色</p>' +
                                        '<input type="color" class="color'+idd+'" />' +
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">标题背景颜色</p>' +
                                        '<input type="color" class="bg'+idd+'" />' +
                                    '</li>' +
                                '</ul>' +
                            '</fieldset>'+
                            '<fieldset class="attrs">' +
                                '<legend>窗体设置</legend>' +
                                '<ul class="style1">' +
                                    '<li>' +
                                        '<select class="lin sele33" name="sele">' +
                                            '<option value="1" selected="">自定义</option>' +
                                        '</select>' +
                                    '</li>' +
                                    '<li>' +
                                        '<select class="lin sele22 eventFont'+idd+'" name="sele">' +
                                            '<option value="微软雅黑" selected="selected">微软雅黑</option>' +
                                            '<option value="楷体">楷体</option>' +
                                            '<option value="黑体">黑体</option>' +
                                            '<option value="宋体">宋体</option>' +
                                            '<option value="新宋体">新宋体</option>' +
                                            '<option value="仿宋">仿宋</option>' +
                                            '<option value="隶书">隶书</option>' +
                                            '<option value="幼圆">幼圆</option>' +
                                        '</select>' +
                                    '</li>' +
                                    '<li>' +
                                        '<select class=" lin" name="sele" id="eventfontsize'+idd+'">' +
                                            '<option value="56">初号</option>' +
                                            '<option value="48">小初</option>' +
                                            '<option value="34">一号</option>' +
                                            '<option value="32">小一</option>' +
                                            '<option value="28">二号</option>' +
                                            '<option value="24">小二</option>' +
                                            '<option value="21">三号</option>' +
                                            '<option value="20">小三</option>' +
                                            '<option value="18">四号</option>' +
                                            '<option value="16">小四</option>' +
                                            '<option value="14">五号</option>' +
                                            '<option value="12" selected="selected">小五</option>' +
                                            '<option value="10">六号</option>' +
                                            '<option value="8">小六</option>' +
                                            '<option value="6">七号</option>' +
                                            '<option value="4">八号</option>' +
                                        '</select>' +
                                    '</li>' +
                                '</ul>' +
                                '<ul class="style2 eventFontDecoration'+idd+'">' +
                                    '<li><img src="images/convention.png"/></li>' +
                                    '<li><img src="images/overstriking.png"/></li>' +
                                    '<li><img src="images/Italic.png"/></li>' +
                                    '<li><img src="images/underline.png"/></li>' +
                                    '<li><img src="images/strikethrough.png"/></li>' +
                                '</ul>' +
                                '<p class="lf exppp testy" id="exp2'+idd+'">文字示例</p>' +
                                '<ul class="history_node">' +
                                    '<li><p class="node">窗体文字颜色</p><input type="color" value="#ff0000" class="eventColor'+idd+'"/></li>' +
                                    '<li><p class="node">窗体背景颜色</p><input type="color" value="#ffffff" class="eventBg'+idd+'"/></li>' +
                                '</ul>' +
                            '</fieldset>'+
                            '<fieldset class="attrs">' +
                                '<legend>字段格式</legend>' +
                                '<ul class="history_node">' +
                                    '<li>' +
                                        '<p class="node">日期格式</p>' +
                                        '<p>' +
                                            '<select class="dateFormat'+idd+'" >' +
                                                '<option value="yy/mm/dd" selected="selected">yy/mm/dd</option>' +
                                                '<option value="mm/dd/yy">mm/dd/yy</option>' +
                                                '<option value="yy-mm-dd">yy-mm-dd</option>' +
                                                '<option value="mm-dd-yy">mm-dd-yy</option>' +
                                            '</select>' +
                                        '</p>'+
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">时间格式</p>' +
                                        '<p>' +
                                            '<select class="timeFormat'+idd+'" >' +
                                                '<option value="hh:mm:ss" selected="selected">hh:mm:ss</option>' +
                                                '<option value="hh:mm:ss:nnn">hh:mm:ss:nnn</option>' +
                                            '</select>' +
                                        '</p>'+
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">日期</p>' +
                                        '<div>' +
                                            '<div class="showW">' +
                                                '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">4</span><span class="angR dateangRW'+idd+'"></span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">时间</p>' +
                                        '<div>' +
                                            '<div class="showW">' +
                                                '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">4</span><span class="angR dateangRW'+idd+'"></span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</li>'
                                    +'<li>' +
                                        '<p class="node">用户名</p>' +
                                        '<div>' +
                                            '<div class="showW">' +
                                                '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">4</span><span class="angR dateangRW'+idd+'"></span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</li>'+
                                    '<li>' +
                                        '<p class="node">事件记录</p>' +
                                        '<div>' +
                                            '<div class="showW">' +
                                                '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">4</span><span class="angR dateangRW'+idd+'"></span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">事件类型</p>' +
                                        '<div>' +
                                            '<div class="showW">' +
                                                '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">4</span><span class="angR dateangRW'+idd+'"></span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">访问级别</p>' +
                                        '<div>' +
                                            '<div class="showW">' +
                                                '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">4</span><span class="angR dateangRW'+idd+'"></span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</li>' +
                                '</ul>' +
                            '</fieldset>'+
                        '</div>';
        $("#fathy").append(historyP);
    };
    this.historyEventPageFeatures = function(idd){
        var hisContrlcEle = $("#"+idd);
        var dataShowBoxEle = hisContrlcEle.find(".historyEvent_dataShowBox");
        var demoText = $("#exp1"+idd);
        var demoEventText = $("#exp2"+idd);
        var setNodeObj = $(".history_headerList"+idd);
        var setNodeObjFontObj = setNodeObj.children("li");
        var colorO = $(".color"+idd);
        var bgO = $(".bg"+idd);
        var eventColorO = $(".eventColor"+idd);
        var eventBgO = $(".eventBg"+idd);
        var dataShowBoxO = $("#dataShowBox"+idd);
        var dataShowBox = dataShowBoxO.find("li");
        var dateFormat = $(".dateFormat"+idd);
        var timeFormat = $(".timeFormat"+idd);
        var colorVal;
        var bgVal;
        var dataStyle = {};
        var datelist = dataShowBoxO.find("li:nth-child(6n+1)");
        var timelist = dataShowBoxO.find("li:nth-child(6n+2)");
        var name = dataShowBoxO.find("li:nth-child(6n+3)");
        var eventRecording = dataShowBoxO.find("li:nth-child(6n+4)");
        var eventType = dataShowBoxO.find("li:nth-child(6n+5)");
        var grade = dataShowBoxO.find("li:nth-child(6n+6)");
        var date = new Date();
        var fontDecorationO = $(".fontDecoration"+idd).children("li");
        var fontSelect = $(".historyFont" + idd);
        var fontOption = fontSelect.children("option");
        var fontSizeSelect = $(".setFontSize"+idd);
        var fontSizeSelectOp = fontSizeSelect.children("option");
        var DataLiClass;
        var nodeFeatures = {
            setFont : function() { //设置字体
                fontSelect.bind("change",function() {
                    var _this = $(this);
                    $("#"+idd).attr("font-family",$(this).val());
                    fontOption.each(function(i){
                        if(_this.val() == $(this).val()){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                            setNodeObj.css("font-family",$(this).val());
                            setNodeObjFontObj.attr("select",$(this).val());
                            demoText.css("font-family",$(this).val());
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }
                    })
                });
            },
            setFontSize:function(){ //标注设置字体大小
                fontSizeSelect.bind("change",function(){
                    var _this = $(this);
                    $("#"+idd).attr("font-size",$(this).val());
                    fontSizeSelectOp.each(function(){
                        if(_this.val() == $(this).val()){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                            setNodeObjFontObj.css("fontSize",parseInt($(this).val()+"px"));
                            demoText.css("fontSize",parseInt($(this).val()+"px"));
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }
                    })
                })
            },
            setFontShape:function(){//标注字体装饰
                fontDecorationO.each(function(i){
                    fontDecorationO.eq(i).bind("click",function(){
                        if(i == 0){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            setNodeObjFontObj.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            demoText.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            fontDecorationO.eq(0).find("img").attr("src","images/convention2.png");
                            fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                            fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                            fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                            fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 1){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(setNodeObjFontObj.hasClass("fontWeight")){
                                setNodeObjFontObj.removeClass("fontWeight");
                                demoText.removeClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                            }else{
                                setNodeObjFontObj.addClass("fontWeight");
                                demoText.addClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 2){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(setNodeObjFontObj.hasClass("fontItalic")){
                                setNodeObjFontObj.removeClass("fontItalic");
                                demoText.removeClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                            }else{
                                setNodeObjFontObj.addClass("fontItalic");
                                demoText.addClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/italic2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 3){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(setNodeObjFontObj.hasClass("fontUnderline")){
                                setNodeObjFontObj.removeClass("fontUnderline");
                                demoText.removeClass("fontUnderline fontThrough");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                            }else{
                                setNodeObjFontObj.addClass("fontUnderline");
                                setNodeObjFontObj.removeClass("fontThrough");
                                demoText.addClass("fontUnderline");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 4){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(setNodeObjFontObj.hasClass("fontThrough")){
                                setNodeObjFontObj.removeClass("fontThrough");
                                demoText.removeClass("fontThrough fontUnderline");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                            }else{
                                setNodeObjFontObj.addClass("fontThrough");
                                setNodeObjFontObj.removeClass("fontUnderline");
                                demoText.addClass("fontThrough");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }
                    });
                });
            },
            setFontColor:function(){
                inItPropertiesPage.setColor(colorO, ['color', setNodeObjFontObj]);
            },
            setBgColor:function(){//设置标注背景颜色
                inItPropertiesPage.setColor(bgO, ['background-color', setNodeObjFontObj.parent("ul").parent('div')]);
            },
            inItNodeStyle:function(){//初始化
                setInterval(function(){
                    var headMsgEleHeight = hisContrlcEle.find(".historyEvent_showMsg").height();
                    var height = parseInt(hisContrlcEle.height()-headMsgEleHeight)/hisContrlcEle.height();
                    var dataHeight = parseInt(dataShowBoxEle.children("ul").length)*parseInt(dataShowBoxEle.children("ul").height());
                    if(parseInt(dataShowBoxEle.height()) < dataHeight){
                        dataShowBoxEle.height((height * 100) + '%');
                        $('.history_headerList'+idd).css({
                            'width': 'calc(100% - 17px)',
                            'float': 'left'
                        });
                        return false;
                    }else{
                        dataShowBoxEle.css("overflow-y","auto");
                        $('.history_headerList'+idd).css({'width': 100 + '%'});
                    }
                },100);
                $(".config_dis"+idd).attr("disabled","true");
            },
            inIt:function(){
                this.setFont();
                this.setFontSize();
                this.setFontShape();
                this.setFontColor();
                this.setBgColor();
                this.inItNodeStyle();
            }
        };
        var eventFeatures = {
            setFont : function() { //设置事件字体
                var fontSelect = $(".eventFont" + idd);
                var fontOption = fontSelect.children("option");
                fontSelect.bind("change",function() {
                    dataShowBoxO.attr("font",$(this).val());
                    $("#"+idd).attr("font-family",$(this).val());
                });
            },
            setFontSize:function(){ //设置事件字体大小
                var fontSizeSelect = $("#eventfontsize"+idd);
                var fontSizeSelectOp = fontSizeSelect.children("option");
                fontSizeSelect.bind("change",function(){
                    dataShowBoxO.attr("fontSize",$(this).val());
                    $("#"+idd).attr("font-size",$(this).val());
                })
            },
            setFontShape:function(){//事件字体装饰
                var fontDecorationO = $(".eventFontDecoration"+idd).children("li");
                fontDecorationO.each(function(i){
                    fontDecorationO.eq(i).bind("click",function(){
                        if(i == 0){
                            $("#"+idd).removeAttr("weight weighti weightl weightb");
                            dataShowBoxO.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            demoEventText.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            fontDecorationO.eq(0).find("img").attr("src","images/convention2.png");
                            fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                            fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                            fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                            fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                            $("#"+idd).attr("fontN","yes");
                            return false;
                        }if(i == 1){
                            if(dataShowBoxO.hasClass("fontWeight")){
                                dataShowBoxO.removeClass("fontWeight");
                                demoEventText.removeClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                                $("#"+idd).attr("weight","no");
                            }else{
                                dataShowBoxO.addClass("fontWeight");
                                demoEventText.addClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weight","yes");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }if(i == 2){
                            if(dataShowBoxO.hasClass("fontItalic")){
                                dataShowBoxO.removeClass("fontItalic");
                                demoEventText.removeClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                                $("#"+idd).attr("weighti","no");
                            }else{
                                dataShowBoxO.addClass("fontItalic");
                                demoEventText.addClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/Italic2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weighti","yes");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }if(i == 3){
                            if(dataShowBoxO.hasClass("fontUnderline")){
                                dataShowBoxO.removeClass("fontUnderline");
                                demoEventText.removeClass("fontUnderline fontThrough");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                                $("#"+idd).attr("weightl","no");
                            }else{
                                dataShowBoxO.addClass("fontUnderline");
                                dataShowBoxO.removeClass("fontThrough");
                                demoEventText.addClass("fontUnderline");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weightl","yes");
                                $("#"+idd).attr("weightb","no");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }if(i == 4){
                            if(dataShowBoxO.hasClass("fontThrough")){
                                dataShowBoxO.removeClass("fontThrough");
                                demoEventText.removeClass("fontThrough fontUnderline");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                                $("#"+idd).attr("weightb","no");
                            }else{
                                dataShowBoxO.addClass("fontThrough");
                                dataShowBoxO.removeClass("fontUnderline");
                                demoEventText.addClass("fontThrough");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weightb","yes");
                                $("#"+idd).attr("weightl","no");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }
                    });
                });
            },
            setFontColor:function(){//事件设置文字颜色
                eventColorO.bind("change",function () {
                    colorVal = $(this).val();
                    dataShowBox.css("color",colorVal);
                    dataStyle.color = colorVal
                    $("#"+idd).attr("alarmcolor",colorVal);
                })
            },
            setBgColor:function(){//事件设置背景颜色
                inItPropertiesPage.setColor(eventBgO, ['background', dataShowBoxO], ['backcolor_', $("#"+idd)]);
            },
            setDataSize:function(){

            },
            inItNodeStyle:function(){//初始化
                var rgbb = $("#"+idd).attr("backcolor_");
                eventBgO.val(rgbb);
            },
            inIt:function(){
                this.setFont();
                this.setFontSize();
                this.setFontShape();
                this.setFontColor();
                this.setBgColor();
                this.inItNodeStyle();
                this.setDataSize();
            }
        };
        var eventFormat = {
            setDateFormat:function(){//日期格式
                dateFormat.bind("change",function () {
                    var _this = $(this);
                    dateFormat.children("option").each(function(){
                       if(_this.val() == $(this).val() ){
                           if($(this).index() == 0){
                               $('#'+idd).attr('dateFormatIndex', 0);
                               return false;
                           }if($(this).index() == 1){
                               $('#'+idd).attr('dateFormatIndex', 1);
                               return false;
                           }if($(this).index() == 2){
                               $('#'+idd).attr('dateFormatIndex', 2);
                               return false;
                           }if($(this).index() == 3){
                               $('#'+idd).attr('dateFormatIndex', 3);
                               return false;
                           };
                       }
                    })
                })
            },
            setTimeFormat:function(){//时间格式
                timeFormat.bind("change",function () {
                    var _this = $(this);
                    timeFormat.children("option").each(function(){
                        if(_this.val() == $(this).val() ){
                            if($(this).index() == 0){
                                $('#'+idd).attr('timeFormatIndex', 0);
                                return false;
                            }if($(this).index() == 1){
                                $('#'+idd).attr('timeFormatIndex', 1);
                                return false;
                            }
                        }
                    })
                })
            },
            setCutWidth:function(){
                if(dataShowBoxO.children().length > 0){
                    $(".dateangLW"+idd).each(function(i){
                        $(this).bind("click",function (e) {
                            var textO = $(this).next(".dateshowN"+idd);
                            var date = $(".history_headerList"+idd);
                            var text = parseInt(textO.text());
                            var pw = datelist.parents(".historyEvent_dataShowBox").width();
                            if(text == 0){
                                textO.text(0);
                            }else {
                                text = text - 1;
                                textO.text(text);
                                switch (i) {
                                    case 0:
                                        var w1 = datelist.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (timelist.width() + w3) / pw * 100;
                                        datelist.width(w2 + '%');
                                        date.children("li:nth-child(1)").width(w2 + '%');
                                        timelist.width(w4 + '%');
                                        date.children("li:nth-child(2)").width(w4 + '%');
                                        break;
                                    case 1:
                                        var w1 = timelist.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (name.width() + w3) / pw * 100;
                                        timelist.width(w2 + '%');
                                        date.children("li:nth-child(2)").width(w2 + '%');
                                        name.width(w4 + '%');
                                        date.children("li:nth-child(3)").width(w4 + '%');
                                        break;
                                    case 2:
                                        var w1 = name.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (eventRecording.width() + w3) / pw * 100;
                                        name.width(w2 + '%');
                                        date.children("li:nth-child(3)").width(w2 + '%');
                                        eventRecording.width(w4 + '%');
                                        date.children("li:nth-child(4)").width(w4 + '%');
                                        break;
                                    case 3:
                                        var w1 = eventRecording.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (eventType.width() + w3) / pw * 100;
                                        eventRecording.width(w2 + '%');
                                        date.children("li:nth-child(4)").width(w2 + '%');
                                        eventType.width(w4 + '%');
                                        date.children("li:nth-child(5)").width(w4 + '%');
                                        break;
                                    case 4:
                                        var w1 = eventType.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (grade.width() + w3) / pw * 100;
                                        eventType.width(w2 + '%');
                                        date.children("li:nth-child(5)").width(w2 + '%');
                                        grade.width(w4 + '%');
                                        date.children("li:nth-child(6)").width(w4 + '%');
                                        break;
                                    case 5:
                                        var w1 = grade.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (datelist.width() + w3) / pw * 100;
                                        grade.width(w2 + '%');
                                        date.children("li:nth-child(6)").width(w2 + '%');
                                        datelist.width(w4 + '%');
                                        date.children("li:nth-child(1)").width(w4 + '%');
                                        break;
                                    default:false;
                                }
                            }
                        });
                    });
                }
            },
            setAddWidth:function(){
                if(dataShowBoxO.children().length > 0) {
                    $(".dateangRW" + idd).each(function (i) {
                        $(this).bind("click", function (e) {
                            var textO = $(this).prev(".dateshowN" + idd);
                            var date = $(".history_headerList" + idd);
                            var text = parseInt(textO.text());
                            var pw = datelist.parents(".historyEvent_dataShowBox").width();
                            if (text == 10) {
                                textO.text(10);
                            } else {
                                text = text + 1;
                                textO.text(text);
                                switch (i) {
                                    case 0:
                                        var w1 = datelist.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (timelist.width() + w3) / pw * 100;
                                        datelist.width(w2 + '%');
                                        date.children("li:nth-child(1)").width(w2 + '%');
                                        timelist.width(w4 + '%');
                                        date.children("li:nth-child(2)").width(w4 + '%');
                                        break;
                                    case 1:
                                        var w1 = timelist.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (name.width() + w3) / pw * 100;
                                        timelist.width(w2 + '%');
                                        date.children("li:nth-child(2)").width(w2 + '%');
                                        name.width(w4 + '%');
                                        date.children("li:nth-child(3)").width(w4 + '%');
                                        break;
                                    case 2:
                                        var w1 = name.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (eventRecording.width() + w3) / pw * 100;
                                        name.width(w2 + '%');
                                        date.children("li:nth-child(3)").width(w2 + '%');
                                        eventRecording.width(w4 + '%');
                                        date.children("li:nth-child(4)").width(w4 + '%');
                                        break;
                                    case 3:
                                        var w1 = eventRecording.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (eventType.width() + w3) / pw * 100;
                                        eventRecording.width(w2 + '%');
                                        date.children("li:nth-child(4)").width(w2 + '%');
                                        eventType.width(w4 + '%');
                                        date.children("li:nth-child(5)").width(w4 + '%');
                                        break;
                                    case 4:
                                        var w1 = eventType.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (grade.width() + w3) / pw * 100;
                                        eventType.width(w2 + '%');
                                        date.children("li:nth-child(5)").width(w2 + '%');
                                        grade.width(w4 + '%');
                                        date.children("li:nth-child(6)").width(w4 + '%');
                                        break;
                                    case 5:
                                        var w1 = grade.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (datelist.width() + w3) / pw * 100;
                                        grade.width(w2 + '%');
                                        date.children("li:nth-child(6)").width(w2 + '%');
                                        datelist.width(w4 + '%');
                                        date.children("li:nth-child(1)").width(w4 + '%');
                                        break;
                                    default:
                                        false;
                                }
                            }
                        })
                    });
                }
            },
            inIt:function(){
                this.setDateFormat();
                this.setTimeFormat();
                this.setCutWidth();
                this.setAddWidth();
            }
        };
        var eventInit = {
            nodeInit : function(){
                if(setNodeObjFontObj.hasClass("fontWeight")){
                    fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                    demoText.addClass("fontWeight");
                } if(setNodeObjFontObj.hasClass("fontItalic")){
                    fontDecorationO.eq(2).find("img").attr("src","images/斜体2.png");
                    demoText.addClass("fontItalic");
                } if(setNodeObjFontObj.hasClass("fontUnderline")){
                    fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                    demoText.addClass("fontUnderline");
                } if(setNodeObjFontObj.hasClass("fontThrough")){
                    fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                    demoText.addClass("fontThrough");
                }
                fontOption.each(function () { //初始化属性页字体
                    if($(this).val() == setNodeObjFontObj.attr("select")){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        demoText.css("font-family",$(this).val());
                        return false;
                    }
                });
                fontSizeSelectOp.each(function(){ //初始化属性页字体大小显示
                    if($(this).val() == parseInt(setNodeObjFontObj.css("font-size"))){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        demoText.css("fontSize",parseInt($(this).val()+"px"));
                    }
                });
                $.fn.getHexBackgroundColor = function(){ //初始化属性页字体颜色和背景
                    var rgb=setNodeObjFontObj.css("color");
                    var rgbb=setNodeObjFontObj.parent("ul").parent('div').css("background-color");
                    colorO.val(inItPropertiesPage.formatColor(rgb));
                    bgO.val(inItPropertiesPage.formatColor(rgbb));
                };
                $.fn.getHexBackgroundColor();
            },
            alarmInit:function(){//初始化历史报警部分
                var fontDecorationO = $(".eventFontDecoration"+idd).children("li");
                var fontSelect = $(".eventFont" + idd);
                var fontOption = fontSelect.children("option");
                var fontSizeSelect = $("#eventfontsize"+idd);
                var fontSizeSelectOp = fontSizeSelect.children("option");
                if(dataShowBoxO.hasClass("fontWeight")){
                    fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                    demoEventText.addClass("fontWeight");
                } if(dataShowBoxO.hasClass("fontItalic")){
                    fontDecorationO.eq(2).find("img").attr("src","images/斜体2.png");
                    demoEventText.addClass("fontItalic");
                } if(dataShowBoxO.hasClass("fontUnderline")){
                    fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                    demoEventText.addClass("fontUnderline");
                } if(dataShowBoxO.hasClass("fontThrough")){
                    fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                    demoEventText.addClass("fontThrough");
                }
                fontOption.each(function () {
                    if($(this).val() == dataShowBoxO.attr("font")){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        demoEventText.css("font-family",$(this).val());
                        return false;
                    }
                });
                fontSizeSelectOp.each(function(){
                    if($(this).val() == dataShowBoxO.attr("fontSize")){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        demoEventText.css("fontSize",parseInt($(this).val())+"px");
                        return false;
                    }
                });
                /****初始化日期时间格式***/
                var fontSizeSelectala = $(".dateFormat"+idd).children("option");
                var fontSizeSelectal = $(".timeFormat"+idd).children("option");
                var alarminit = $("#"+idd).attr("dateFormatIndex");
                var alarminitt = $("#"+idd).attr("timeFormatIndex");
                fontSizeSelectala.each(function(){
                    if(alarminit == 0){
                        fontSizeSelectala.eq(0).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminit == 1){
                        fontSizeSelectala.eq(1).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminit == 2){
                        fontSizeSelectala.eq(2).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminit == 3){
                        fontSizeSelectala.eq(3).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                });
                fontSizeSelectal.each(function(){
                    if(alarminitt == 0){
                        fontSizeSelectal.eq(0).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminitt == 1){
                        fontSizeSelectal.eq(1).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                });
                $(".eventColor"+idd).val($("#"+idd).attr("alarmcolor"));
            },
            init:function() { //初始化属性页字体装饰
                this.nodeInit();
                this.alarmInit();
            }
        };
        nodeFeatures.inIt();
        eventFeatures.inIt();
        eventFormat.inIt();
        eventInit.init();
    };
    this.historyEventCopy = function(srcId, desId){
        var srcIdO = $("#"+srcId);
        var desIdO = $("#"+desId);
        var srcIdList = srcIdO.find(".history_headerList").children("li");
        var desIdList = desIdO.find(".history_headerList ").children("li");
        var height = srcIdO.height();
        var width = srcIdO.width();
        var srcIdO_class = srcIdList.attr("class");
        var srcIdOC= srcIdO.attr("class");
        var srcfont = srcIdList.attr("select");
        var srcFontsize = srcIdList.css("font-size");
        var srcbg = srcIdList.parent("ul").parent('div').css("background");
        var srcColor = srcIdList.css("color");
        var historybg = $("#dataShowBox"+srcId).css("background");
        var datacolor = $("#dataShowBox"+srcId).find("li").css("color");
        $("#dataShowBox"+desId).find("li").css("color",datacolor);
        $("#dataShowBox"+desId).css("background",historybg);
        desIdO.addClass(srcIdOC);
        desIdO.height(height+'px');
        desIdO.width(width+'px');
        desIdList.addClass(srcIdO_class).css({"font-size":srcFontsize,"color":srcColor});
        desIdList.parent("ul").css({"font-family":srcfont});
        desIdList.parent("ul").parent('div').css({"background":srcbg});
    }

};
/*==================表盘控件========================*/
var DialControl=function(){
	this.configId = -1;
	this.createDialControl = function(x,y){
		$("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.DialElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Dial_" + this.configId;
        this.id = idd;
        var textdiv ='<div id='+idd+' class="contrl move dialContrl" piecename="速度" pieceval="km/h" DataType="1,2" deg="deg90" backcolor="#62879f" dialColor="#c33430"  foregroundColor="#91c7af" dialoff="true" maxval="90" minval="20">'
        			+'<div id="main'+idd+'" class="canvas dial1 abc abd dial'+idd+'"></div>'
        			+'</div>'
        $('#content').append(textdiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;
        $("#"+idd).css({
        	'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 170 + 'px',
            'width': 170 + 'px'
        });
        $(".dial"+idd).css({
            "background":"white",
            "overflow":"hidden",
            "margin":"0 auto"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.DialPropertiesPage(selecteId);
        this.DialPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
	};
	this.DialPropertiesPage = function(idd){
        var DialAttributes ='<div id="tc3'+idd+'" class="tc33">'
		+ '<fieldset class="fill_attr1">'
		+		'<legend>常规</legend>'
		+		'<div class="fill_attrP" ><i>最大报警颜色</i><input type="color" id="foregroundColor'+idd+'"/></div>'
		+		'<div class="fill_attrP" ><i>最小报警颜色</i><input  type="color" id="dialColor'+idd+'"/></div>'
		+		'<div class="fill_attrP"><i>正常颜色</i><input  type="color"  id="backColor'+idd+'"/></div>'
		+		'<div class="fill_attrPadd"><i>最大报警值</i><input  type="text" id="maxval'+idd+'" value="90%"/><input  type="text" class="fill_attrPadd1" value="(%)"/></div>'
		+		'<div class="fill_attrPadd"><i>最小报警值</i><input  type="text" id="minval'+idd+'" value="10%"/><input  type="text" class="fill_attrPadd1" value="(%)"/></div>'
		+'</fieldset>'
		+'<fieldset class="fill_attr1">'
		+'<legend>仪表度数</legend>'
		+		'<div class="fill_attrP" id="dge90'+idd+'"><i>90度</i><div class="progress_attr_butadd" id="deg90"></div></div>'
		+		'<div class="fill_attrP" id="dge120'+idd+'"><i>120度</i><div class="progress_attr_butadd" id="deg120"></div></div>'
		+		'<div class="fill_attrP" id="dge180'+idd+'"><i>180度</i><div class="progress_attr_butadd" id="deg180"></div></div>'
		+       '<div class="fill_attrP" id="dge240'+idd+'"><i>240度</i><div class="progress_attr_butadd" id="deg240"></div></div>'
		+       '<div class="fill_attrP" id="dge360'+idd+'"><i>360度</i><div class="progress_attr_butadd colorOtheradd" id="deg360"></div></div>'
		+       '<div class="fill_attrP"><i>显示当前值</i><div class="dial_attr_but" id="dialnewText"></div></div>'
	    + '</fieldset>'
	    +   ' </div>'
        $("#fathy").append(DialAttributes);
   };
   /*======画仪表图========*/
	/*==========360度的画法===================*/
	function dial2(idd){
		var val=$("#"+idd).attr("dialColor");
		var val1=$("#"+idd).attr("backColor");
		var val2=$("#"+idd).attr("foregroundColor");
		var minval= $("#"+idd).attr("minval")/100 ;
		var maxval=$("#"+idd).attr("maxval")/100;
	    var myChart = echarts.init(document.getElementById('main'+idd));
	    var onoff =$("#"+idd).attr("dialoff");
	    if(onoff=="true"){
	    	onoff=true
	    }else if(onoff=="false"){
	    	onoff=false
	    }
	    var option = {
	    	
	    tooltip : {
	        formatter: "{a} <br/>{c} {b}",
			axisPointer :{ 
			    
			    shadowColor : "red"
			}
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            restore: {show: false},
	            saveAsImage: {show: false}
	        }
	    },
	    series : [
			        {
			            name: $("#"+idd).attr("piecename"),
			            type: 'gauge',
			            z: 3,
			            min: 0,
			            max: 100,
			            startAngle: 90,
	                    endAngle: -269.9,
			            radius: '100%',
				        axisLine: {            // 坐标轴线
				            show: true,
						    lineStyle: {
						        color: [
						            [minval, val],
						            [maxval, val1],
						            [1, val2]
						        ],
						        width: 25
						    }
			            },
			            axisTick: {            // 坐标轴小标记
			                length: 15,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            splitLine: {           // 分隔线
			                length: 25,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            title : {
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder',
			                    fontSize: 20,
			                    fontStyle: 'italic'
			                }
			            },
			            detail : {
							show : onoff,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder'
			                }
			            },
			            
			            data:[{value: 1}]
			        }
	        
			    ]
		};
	    // 为echarts对象加载数据 
	    myChart.setOption(option);
        option.series[0].data[0].value =0;
        myChart.setOption(option,true);
	};
	/*===========180度的画法================*/
	function dial1(idd){
		var val=$("#"+idd).attr("dialColor");
		var val1=$("#"+idd).attr("backColor");
		var val2=$("#"+idd).attr("foregroundColor");
		var minval= $("#"+idd).attr("minval")/100 ;
		var maxval=$("#"+idd).attr("maxval")/100;
	    var onoff =$("#"+idd).attr("dialoff");
	    if(onoff=="true"){
	    	onoff=true
	    }else if(onoff=="false"){
	    	onoff=false
	    }
	   	var myChart = echarts.init(document.getElementById('main'+idd)); 
	    var option = {
	    tooltip : {
	        formatter: "{a} <br/>{c} {b}"
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            restore: {show: false},
	            saveAsImage: {show: false}
	        }
	    },
	    series : [
			        {
			        	center :["50%","65%"],
			            name: $("#"+idd).attr("piecename"),
			            type: 'gauge',
			            z: 3,
			            min: 0,
			            max: 100,
			            startAngle: 180,
	                    endAngle:0,
			            radius: '100%',
			            axisLine: {            // 坐标轴线
			                show: true,
						    lineStyle: {
						        color: [
						            [minval, val],
						            [maxval, val1],
						            [1, val2]
						        ],
						        width: 25
						    }
			            },
			            axisTick: {            // 坐标轴小标记
			                length: 15,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            splitLine: {           // 分隔线
			                length: 25,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            title : {
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder',
			                    fontSize: 20,
			                    fontStyle: 'italic'
			                }
			            },
			            detail : {
			            	show : onoff,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder'
			                }
			            },
			            
			            data:[{value: 1}]
			        }
	        
			    ]
		};
	    // 为echarts对象加载数据 
	    myChart.setOption(option);
        option.series[0].data[0].value =0;
        myChart.setOption(option,true);
	}
	/*=========240=================*/
	function dial3(idd){
		var val=$("#"+idd).attr("dialColor");
		var val1=$("#"+idd).attr("backColor");
		var val2=$("#"+idd).attr("foregroundColor");
		var minval= $("#"+idd).attr("minval")/100 ;
		var maxval=$("#"+idd).attr("maxval")/100;
	    var onoff =$("#"+idd).attr("dialoff");
	    var onoff =$("#"+idd).attr("dialoff");
	    if(onoff=="true"){
	    	onoff=true
	    }else if(onoff=="false"){
	    	onoff=false
	    }
	    var myChart = echarts.init(document.getElementById('main'+idd)); 
	    var option = {
	    tooltip : {
	        formatter: "{a} <br/>{c} {b}"
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            restore: {show: false},
	            saveAsImage: {show: false}
	        }
	    },
	    series : [
			        {
			        	center :["50%","62%"],
			            name: $("#"+idd).attr("piecename"),
			            type: 'gauge',
			            z: 3,
			            min: 0,
			            max: 100,
			            startAngle: 210,
	                    endAngle:-30,
			            radius: '100%',
			            axisLine: {            // 坐标轴线
			                 show: true,
						    lineStyle: {
						        color: [
						            [minval, val],
						            [maxval, val1],
						            [1, val2]
						        ],
						        width: 25
						    }
			            },
			            axisTick: {            // 坐标轴小标记
			                length: 15,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            splitLine: {           // 分隔线
			                length: 25,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            title : {
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder',
			                    fontSize: 20,
			                    fontStyle: 'italic'
			                }
			            },
			            detail : {
			            	show : onoff,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder'
			                }
			            },
			            
			            data:[{value: 1}]
			        }
	        
			    ]
		};
	    // 为echarts对象加载数据 
	    myChart.setOption(option);
        option.series[0].data[0].value =0;
        myChart.setOption(option,true);
	}
	/*========120度================*/
	function dial4(idd){
		var val=$("#"+idd).attr("dialColor");
		var val1=$("#"+idd).attr("backColor");
		var val2=$("#"+idd).attr("foregroundColor");
		var minval= $("#"+idd).attr("minval")/100 ;
		var maxval=$("#"+idd).attr("maxval")/100;
	    var onoff =$("#"+idd).attr("dialoff");
	    var onoff =$("#"+idd).attr("dialoff");
	    if(onoff=="true"){
	    	onoff=true
	    }else if(onoff=="false"){
	    	onoff=false
	    }
	    var myChart = echarts.init(document.getElementById('main'+idd)); 
	    var option = {
	    tooltip : {
	        formatter: "{a} <br/>{c} {b}"
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            restore: {show: false},
	            saveAsImage: {show: false}
	        }
	    },
	    series : [
			        {
			        	center :["50%","65%"],
			            name: $("#"+idd).attr("piecename"),
			            type: 'gauge',
			            z: 3,
			            min: 0,
			            max: 100,
			            startAngle: 150,
	                    endAngle:30,
			            radius: '100%',
			            axisLine: {            // 坐标轴线
						    lineStyle: {
						        color: [
						            [minval, val],
						            [maxval, val1],
						            [1, val2]
						        ],
						        width: 25
						    }
			            },
			            axisTick: {            // 坐标轴小标记
			                length: 15,        // 属性length控制线长
			                lineStyle: {       // 属性lineStyle控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            splitLine: {           // 分隔线
			                length: 25,         // 属性length控制线长
			                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
			                    color: '#cccccc'
			                }
			            },
			            title : {
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder',
			                    fontSize: 20,
			                    fontStyle: 'italic'
			                }
			            },
			            detail : {
			            	show : onoff,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    fontWeight: 'bolder'
			                }
			            },
			            
			            data:[{value: 1}]
			        }
	        
			    ]
		};
	    // 为echarts对象加载数据 
	    myChart.setOption(option);
        option.series[0].data[0].value =0;
        myChart.setOption(option,true);
	}
	/*=========90度================*/
	function dial5(idd){
			var val=$("#"+idd).attr("dialColor");
			var val1=$("#"+idd).attr("backColor");
			var val2=$("#"+idd).attr("foregroundColor");
			var minval= $("#"+idd).attr("minval")/100 ;
			var maxval=$("#"+idd).attr("maxval")/100;
		    var onoff =$("#"+idd).attr("dialoff");
		    var onoff =$("#"+idd).attr("dialoff");
		    if(onoff=="true"){
		    	onoff=true
		    }else if(onoff=="false"){
		    	onoff=false
		    }
		    var myChart = echarts.init(document.getElementById('main'+idd)); 
		    var option = {
		    tooltip : {
		        formatter: "{a} <br/>{c} {b}"
		    },
		    toolbox: {
		        show: true,
		        feature: {
		            restore: {show: false},
		            saveAsImage: {show: false}
		        }
		    },
		    series : [
				        {	center :["75%","75%"],
				            name: $("#"+idd).attr("piecename"),
				            type: 'gauge',
				            z: 3,
				            min: 0,
				            max: 100,
				            startAngle: 180,
		                    endAngle:90,
				            radius: '100%',
				            axisLine: {            // 坐标轴线
				                lineStyle: {
							        color: [
							            [minval, val],
							            [maxval, val1],
							            [1, val2]
							        ],
							        width: 25
							    }
				            },
				            axisTick: {            // 坐标轴小标记
				                length: 15,        // 属性length控制线长
				                lineStyle: {       // 属性lineStyle控制线条样式
				                    color: '#cccccc'
				                }
				            },
				            splitLine: {           // 分隔线
				                length: 25,         // 属性length控制线长
				                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
				                    color: '#cccccc'
				                }
				            },
				            title : {
				            	
				                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				                    fontWeight: 'bolder',
				                    fontSize: 20,
				                    fontStyle: 'italic'
				                }
				            },
				            detail : {
				            	show : onoff,
				                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
				                    fontWeight: 'bolder'
				                }
				            },
				            
				            data:[{value: 1}]
				       }
				    ]
			};
		    // 为echarts对象加载数据 
		    myChart.setOption(option);
	        option.series[0].data[0].value =0;
	        myChart.setOption(option,true);
		}
	this.DialPageFeatures = function(idd){
		var height1=$("#main"+idd).height();
 		var width1=$("#main"+idd).width();
 		var dialnewTextoff=true;
 		function synchronous(){
 			$("#main"+idd).css({
	            'height':300,
	            'width':300
	        });   
	    	fncount();
	 		$("#main"+idd).css({
	            'height':height1,
	            'width':width1
	        }); 
			/*===========同步显示当前值==========*/
			if($("#"+idd).attr("dialoff")=="false"){
				$("#dialnewText").css({
					"background":"url(images/notselected.png)"
				});
			}else{
				$("#dialnewText").css({
					"background":"url(images/selected.png)"
				});
			}
			/*==============同步颜色==============*/
			$("#dialColor"+idd).val($("#"+idd).attr("dialColor"));
			$("#backColor"+idd).val($("#"+idd).attr("backColor"));
			$("#foregroundColor"+idd).val($("#"+idd).attr("foregroundColor"));
			/*===========显示当前值================*/
			$("#dialnewText").click(function (){
				if(dialnewTextoff){
					$("#"+idd).attr("dialoff","false");
					fncount();
					$("#dialnewText").css({
						"background":"url(images/notselected.png)"
					});
				}else{
					$("#"+idd).attr("dialoff","true");
					fncount();
					$("#dialnewText").css({
						"background":"url(images/selected.png)"
					});
				}
				dialnewTextoff=!dialnewTextoff;
			});
			/*==============颜色切换=========*/
			 $("#backColor"+idd).change(function(){
	            var val = $("#backColor"+idd).val();
	             $("#"+idd).attr("backColor",val);
	             fncount();
	        });
	        $("#foregroundColor"+idd).change(function(){
	            var val = $("#foregroundColor"+idd).val();
	            $("#"+idd).attr("foregroundColor",val);
	            fncount();
	        });
	        $("#dialColor"+idd).change(function(){
	            var val = $("#dialColor"+idd).val();
	            $("#"+idd).attr("dialColor",val);
	            fncount();
	        });
    
 		}
    	function fn1(){
    		dial1(idd);
    		$("#deg180").css({
				"background":"url(images/yixuan.png)"
			});
    		$("#deg360").css({
			    "background":"url(images/weixuan.png)"
			});
			$("#deg90").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg120").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg240").css({
				"background":"url(images/weixuan.png)"
			});
    	};
    	function fn2(){
    		dial2(idd);
    		$("#deg360").css({
				    "background":"url(images/yixuan.png)"
			});
			$("#deg90").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg120").css({
				"background":"url(images/weixuan.png)"
			});

			$("#deg180").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg240").css({
				"background":"url(images/weixuan.png)"
			});
    	};
    	function fn3(){
    		dial3(idd);
    		$("#deg360").css({
			    "background":"url(images/weixuan.png)"
			});
			$("#deg90").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg120").css({
				"background":"url(images/weixuan.png)"
			});

			$("#deg180").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg240").css({
				"background":"url(images/yixuan.png)"
			});
    	};
    	function fn4(){
    		dial4(idd);
    		$("#deg360").css({
				    "background":"url(images/weixuan.png)"
			});
			$("#deg90").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg120").css({
				"background":"url(images/yixuan.png)"
			});

			$("#deg180").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg240").css({
				"background":"url(images/weixuan.png)"
			});
    	};
    	function fn5(){
    		dial5(idd);
    		$("#deg360").css({
			    "background":"url(images/weixuan.png)"
			});
			$("#deg90").css({
				"background":"url(images/yixuan.png)"
			});
			$("#deg120").css({
				"background":"url(images/weixuan.png)"
			});

			$("#deg180").css({
				"background":"url(images/weixuan.png)"
			});
			$("#deg240").css({
				"background":"url(images/weixuan.png)"
			});
    	};
 		function fncount(){
 			if($("#"+idd).attr("deg")=="deg90"){
    			fn2();
	   		};
	    	if($("#"+idd).attr("deg")=="deg120"){
	    		fn4();
	    	};
	    	if($("#"+idd).attr("deg")=="deg180"){
	    		fn1();
	    	};
	    	if($("#"+idd).attr("deg")=="deg240"){
	    		fn3();
	    	};
	    	if($("#"+idd).attr("deg")=="deg360"){
	    		fn5();
	    	};
 		};
 		/*==========同步表框=========*/
 		$("#maxval"+idd).val($("#"+idd).attr("maxval"));
 		$("#minval"+idd).val($("#"+idd).attr("minval"));
 		/*==========报警值=========*/
    	$("#maxval"+idd).blur(function() {
    		if(!$("#"+idd).attr("mixeuval")){
    			alert("请先配置变量");
    			$("#maxval"+idd).val("");
    		}else{
    			if(isNaN($("#maxval"+idd).val())||parseInt($(this).val())>100||parseInt($(this).val())<0){
    				$("#maxval"+idd).val("");
    			}else{
    				if(parseInt($("#maxval"+idd).val())<parseInt($("#minval"+idd).val())){
    					$("#maxval"+idd).val("");
    				}else{
    					var maxval=Number($("#maxval"+idd).val());
		            	$("#"+idd).attr("maxval",maxval);
		    			fncount();
    				}
    				
    			};
    		};
		});
		$("#minval"+idd).blur(function() {
			if(!$("#"+idd).attr("mixeuval")){
				alert("请先配置变量");
    			$("#minval"+idd).val("");
    		}else{
    			if(isNaN($("#minval"+idd).val())||parseInt($(this).val())>100||parseInt($(this).val())<0){
    				
    				$("#minval"+idd).val("");
    			}else{
    				if(parseInt($("#maxval"+idd).val())<parseInt($("#minval"+idd).val())){
    					
    					$("#minval"+idd).val("");
    				}else{
    					var minval=Number($("#minval"+idd).val());
		            	$("#"+idd).attr("minval",minval);
		    			fncount();
    				};
    				
    			};
    		};
		});
 		/*======切换事件=======*/
 		$("#dge360"+idd).click(function (){
			$("#"+idd).attr("deg","deg90")
			fn2();
		});
		$("#dge180"+idd).click(function (){
			$("#"+idd).attr("deg","deg180")
			fn1();
		});
		$("#dge240"+idd).click(function (){
			$("#"+idd).attr("deg","deg240")
			fn3();
		});
		$("#dge120"+idd).click(function (){
			$("#"+idd).attr("deg","deg120")
			fn4();
		});
		$("#dge90"+idd).click(function (){
			$("#"+idd).attr("deg","deg360")
			fn5();
		});
    /*===========缩放事件=================*/
		function initializtion(){
	    	/*======表盘=======*/
	    	var dialHeight=$("#"+idd).css("height");
	    	var dialheight1=$("#main"+idd).css("height");
	    	var dialWidth=$("#"+idd).css("Width");
	    	var num=(parseInt(dialHeight)-parseInt(dialheight1))/2
	    	var dialWidthNum=parseInt(dialWidth)-2;
	    	var dialHeighNum=parseInt(dialHeight)-2;
	    	if(dialHeighNum>=dialWidthNum){
	    		$(".dial"+idd).css({
		          	"height":dialWidthNum+"px",
		          	"width":dialWidthNum+"px",
		          	"top":num+"px"
	        	});
	        
	    	}else if(dialHeighNum<dialWidthNum){
	    		$(".dial"+idd).css({
		          	"height":dialHeighNum+"px",
		          	"width":dialHeighNum+"px",
		          	"top":num+"px"
	        	});
	        	
	    	}
		}
		$("#content").on("mousemove",function(){
			initializtion();
	    });
		/*=======函数调用=========*/
		synchronous();
    };
    /*=============复制========*/
    this.copy = function (srcId, desId){
    	var idd=srcId;
    	$("#"+desId).attr("dialColor",$("#"+srcId).attr("dialColor"));
    	$("#"+desId).attr("backColor",$("#"+srcId).attr("backColor"));
    	$("#"+desId).attr("foregroundColor",$("#"+srcId).attr("foregroundColor"));
    	$("#"+desId).attr("mixeuval",$("#"+srcId).attr("mixeuval"));
    	$("#"+desId).attr("minval",$("#"+srcId).attr("minval"));
    	$("#"+desId).attr("maxval",$("#"+srcId).attr("maxval"));
    	$("#"+desId).attr("dialoff",$("#"+srcId).attr("dialoff"));
    	var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var d = srcIdElement.attr("deg");
        desIdElement.attr("deg",d);
        if(srcIdElement.attr("deg")=="deg90"){
            dial2(idd);
        }
        if(srcIdElement.attr("deg")=="deg120"){
            $("#myCanvas1"+desId).attr("id","#myCanvas4"+desId);
            dial4(idd);
        }
        if(srcIdElement.attr("deg")=="deg180"){
            $("#myCanvas1"+desId).attr("id","#myCanvas2"+desId);
            
            dial1(idd);
        }
        if(srcIdElement.attr("deg")=="deg240"){
            $("#myCanvas1"+desId).attr("id","#myCanvas3"+desId);
            dial3(idd);
        }
        if(srcIdElement.attr("deg")=="deg360"){
            $("#myCanvas1"+desId).attr("id","#myCanvas1"+desId);
            dial5(idd);
        }
        var heighBtn = srcIdElement.height();
        var wideBtn = srcIdElement.width();
        desIdElement.css({
            "width": wideBtn + 'px',
            "height": heighBtn + 'px'
        });
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    };
};
/*******************多状态控件*************************/
var StatusControl = function() {
    this.configId = -1;
    this.createStatusControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.statusElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'Status_' + this.configId;
        this.id = idd;
        var textDiv = $
            ('<div id='+idd+' class="contrl move boder" DataType="0,1" imageSource="local">' +
                '<div class="statusImage statusImage'+idd+'" id="statusImage-'+idd+'" backg="images/status.svg"></div>' +
            '</div>');
        $('#content').append(textDiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;
        //控件相关样式
        $('#' + idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 32 + 'px',
            'width': 102 + 'px'
        });
        $('#statusImage-'+idd).css({
            'width': 100 + '%',
            'height': 100 + '%',
            'margin': '0 auto',
            'background-image': 'url(images/status.svg)',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size': '100% 100%'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.StatusPropertiesPage(selecteId);
        this.StatusPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.StatusPropertiesPage = function(idd) {
        var proAttributes = $
            ('<div id="tc3'+idd+'" class="tc33">' +
                '<fieldset class="status_attr">' +
                    '<legend>状态配置</legend>' +
                        '<div class="statusFather">' +
                            '<div class="status_attrText1">网页路径</div><input type="text" class="webPath webPath'+idd+'" disabled/>' +
                            '<div class="status_attrText">数据项名称<input type="text" class="rt statusInput inputName name'+idd+'"/></div>' +
                            '<div class="status_attrText">数据项值<input type="text" class="rt statusInput inputValue value'+idd+'"/></div>' +
                            '<div class="status_attrText">数据项个数<input type="text" class="rt statusInput listcount inputCount count'+idd+'" readonly value="0"/></div>' +
                            '<div class="status_attrText1"><i class="statusImageSource">图片来源</i>' +
                                '<div class="status_attrText6">' +
                                    '<div class="status_attrDiv" id="localImage'+idd+'"></div><i>本地</i>' +
                                    '<div class="status_attrDiv" id="svgImage'+idd+'"></div><i>图库</i>' +
                                '</div>' +
                            '</div>' +
                            '<div class="status_attrText1">图片路径</div>' +
                            '<div class="status_attrText2">' +
                                '<form enctype="multipart/form-data">' +
                                    '<input type="text" name="textField" id="statusFileText'+idd+'" class="imageUrl imageUrl'+idd+'" readonly/>' +
                                    '<input type="button" class="addPosition imageButton imageButton'+idd+'" value="浏览"/>' +
                                    '<input type="text" name="fileField" class="addPosition imageFile imageFile'+idd+'"/>' +
                                '</form>' +
                            '</div>' +
                            '<div style="float: left" class="status_attrText1">超链接</div>' +
                            '<div class="statusTipIcon">' +
                                '<span>输入提示：</span>' +
                                '<img title="超链接可输入网址或者html网页。输入网址如“https://www.baidu.com”；输入网页时需要输入当前编辑网页的相对路径，如“yousi/test.html”" src="images/statusTipIcon.png">' +
                            '</div>' +
                            '<input type="text" class="imagePath imagePath'+idd+'"/>' +
                            '<div class="status_attrText4"><i>自动打开超链接</i><div class="isAutoOpen isAutoOpen'+idd+'"></div></div>' +
                            '<div class="status_attrText4"><i>恢复原始大小</i><div class="defaultSize defaultSize'+idd+'"></div></div>' +
                            '<div class="status_attrText3">' +
                                '<div class="title">' +
                                    '<span class="statusName">名称</span>' +
                                    '<span class="statusValue">数值</span>' +
                                    '<span class="statusImage">状态图</span>' +
                                    '<span class="statusHyperlink">超链接地址</span>' +
                                    '<span class="statusAutoOpen">自动打开</span>' +
                                    '<span class="statusDefault">默认状态</span>' +
                                '</div>' +
                                '<div class="statusBox statusBox'+idd+'"></div>' +
                            '</div>' +
                            '<div class="status_attrText5">' +
                                '<span class="handleAdd'+idd+'">添加</span>' +
                                '<span class="handleDelete'+idd+'">删除</span>' +
                                '<span class="handleDefault'+idd+'">默认</span>' +
                            '</div>'+
                        '</div>'+
                '</fieldset>' +
            '</div>');
        $('#fathy').append(proAttributes);
    };
    this.StatusPageFeatures = function(idd) {
        var controlObj = $('#'+idd);
        var svgImage = $('#svgImage'+idd);
        var localImage = $('#localImage'+idd);
        /*******图片来源初始化********/
        if (controlObj.attr('imageSource') === 'svg') {
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
        } else if (controlObj.attr('imageSource') === 'local'){
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
        }
        /*******图片来源选择********/
        svgImage.click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            svgImage.css({'background': 'url(images/yixuan.png)'});
            localImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'svg');
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        localImage.click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            localImage.css({'background': 'url(images/yixuan.png)'});
            svgImage.css({'background': 'url(images/weixuan.png)'});
            controlObj.attr('imageSource', 'local');
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $('.dataList'+idd).css('background-color', 'fff').removeAttr('select');
        $('body').on('mousedown', '.dataList', function() {
            $(this).css('background-color', '#9dd6f2').attr('select', 'selected');
            $(this).siblings('.dataList').css('background-color', '#fff').removeAttr('select');
            controlObj.attr('status', 'select');
        });
        var listBoxDom = controlObj.attr('listBoxDom');
        $('.statusBox'+idd).append(listBoxDom);
        var listCount = controlObj.attr('listCount');
        if(listCount != null){
            $('.count'+idd).val(listCount);
        }
        /*******读取网页路径********/
        var webPageUrl = $('.webPath'+idd);
        webPageUrl.val(webPageUrl.context.URL.split("///")[1]);
        /*******读取本地图片文件并显示********/
        var switchFileElement = $('.imageFile'+idd); //选择本地文件操作节点
        var switchFileTxtElement = $('.imageUrl'+idd); //控件属性页中显示图片地址的input节点
        switchFileTxtElement.val(controlObj.attr('imageUrl'));

        var showImage = function() {
            switchFileElement.bind('click', function() { //获取本地图片路径并展示
                var beforeLog = inTtCommand.log();
                webapi.addLog('before',beforeLog);
                if (controlObj.attr('imageSource') == 'local') { //选择图片来源是本地图片
                    webapi.getImagePath('images');
                } else  if (controlObj.attr('imageSource') == 'svg') { //选择图片来源是图库图片
                    webapi.getSvgPath('images');
                }
                var afterLog = inTtCommand.log();
                webapi.addLog('after',afterLog);
            });
        };
        showImage();

        /*******是否自动打开超链接********/
        var buttonOff = true;
        if ($('.isAutoOpen'+idd).attr('checked') === 'checked') {
            $('.isAutoOpen'+idd).css({
                'background-image': 'url(images/selected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
            buttonOff = false;
        } else {
            $('.isAutoOpen'+idd).css({
                'background-image': 'url(images/notselected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
        }
        $('.isAutoOpen'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if (buttonOff) {
                $('.isAutoOpen'+idd).attr('checked', 'checked');
                $('.isAutoOpen'+idd).css({
                    'background-image': 'url(images/selected.png)',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                });
            } else {
                $('.isAutoOpen'+idd).removeAttr('checked');
                $('.isAutoOpen'+idd).css({
                    'background-image': 'url(images/notselected.png)',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%'
                })
            }
            buttonOff = !buttonOff;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });

        /*******数据项个数********/
        var count = $('.statusBox'+idd).children('div').length;
        $('.count'+idd).val(count);

        /*******添加功能********/
        var name;
        var value;
        var lastNum;
        var imagePath;
        var hyperlink;
        var isAutoOpen;
        var isDefault;
        /*******限制数据项名称的输入********/
        var inputNameElement = $('.name'+idd);
        inputNameElement.keyup(function() {
            var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
            if (variableType + '' === 'undefined') {
                alert('还未进行变量配置');
                $(this).val('');
            }
        });
        /*******限制数据项值的输入********/
        var inputValueElement = $('.value'+idd);
        inputValueElement.keyup(function() {
            var variableType = controlObj.attr('variableType'); //当前控件配置的变量类型
            if (variableType === '开关量') { //配置的变量为‘开关量’
                if (!inItPropertiesPage.inputValidate.booleanValidate($(this).val())) {
                    $(this).val('');
                }
            } else if (variableType === '整型量') { //配置的变量为‘整型量’
                var minValue = controlObj.attr('MinEuVal'); //允许输入的最小工程值
                var maxValue = controlObj.attr('MixEuVal'); //允许输入的最大工程值
                inputValueElement.attr('minlength', minValue.length);
                inputValueElement.attr('maxlength', maxValue.length);
                if (!inItPropertiesPage.inputValidate.integerValidate($(this).val(), minValue, maxValue)) {
                    $(this).val('');
                }
            } else if (variableType + '' == 'undefined') {
                alert('还未进行变量配置');
                $(this).val('');
            }
        });
        /*******限制超链接的输入********/
        var inputHyperlinkElement = $('.imagePath'+idd);
        inputHyperlinkElement.keyup(function() {
            var variableType = $('#'+idd).attr('variableType'); //当前控件配置的变量类型
            if (variableType + '' === 'undefined') {
                alert('还未进行变量配置');
                $(this).val('');
            }
        });
        $('.handleAdd'+idd).mousedown(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            name = $('.name'+idd).val();
            value = $('.value'+idd).val();
            lastNum = parseInt($('.count'+idd).val()) + 1;
            if ($('.count'+idd).val() === '0') {
                lastNum = 0;
            }
            imagePath = $('#'+idd).attr('imageUrl');
            hyperlink = $('.imagePath'+idd).val();
        });
        $('.handleAdd'+idd).mouseup(function() {
            if (name != '' && value != '' && imagePath != '') {
                var statusCount = parseInt($('.count'+idd).val());
                if ($('.isAutoOpen'+idd).attr('checked') === 'checked') { //超链接选择自动打开
                    isAutoOpen = '是';
                } else {
                    isAutoOpen = '否';
                }
                if (statusCount === 0) { //添加的第一个数据项，自动设置为默认
                    isDefault = '默认';
                } else {
                    isDefault = '';
                }
                var statusPageDom = $('<div id="dataList" class="dataList dataList">' +
                    '<span class="statusListName"></span>' +
                    '<span class="statusListValue"></span>' +
                    '<span class="statusListImage"></span>' +
                    '<span class="statusListHyperlink"></span>' +
                    '<span class="statusListAutoOpen"></span>' +
                    '<span class="statusListDefault"></span>' +
                '</div>');
                $('.statusBox'+idd).append(statusPageDom);
                $('div.dataList:last .statusListName:first').text(name).attr('title', name);
                $('div.dataList:last .statusListValue:first').text(value).attr('title', value);
                $('div.dataList:last .statusListImage:first').text(imagePath).attr('title', imagePath);
                $('div.dataList:last .statusListHyperlink:first').text(hyperlink).attr('title', hyperlink);
                $('div.dataList:last .statusListAutoOpen:first').text(isAutoOpen).attr('title', isAutoOpen);
                $('div.dataList:last .statusListDefault:first').text(isDefault).attr('title', isDefault);
                $('.count'+idd).val(parseInt($('.count'+idd).val()) + 1); //数据项个数增加
                $('.name'+idd).val('');
                $('.value'+idd).val('');
                $('.imageUrl'+idd).val('');
                $('.imagePath'+idd).val('');
                $('.isAutoOpen'+idd).removeAttr('checked');
                $('.isAutoOpen'+idd).css({'background-image': 'url(images/notselected.png)'});
                var listBoxDom = $('.statusBox'+idd).html();
                controlObj.attr('listBoxDom', listBoxDom);
                var listCount = parseInt($('.count'+idd).val());
                controlObj.attr('listCount', listCount);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });

        /*******删除功能********/
        $('.handleDelete'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if (controlObj.attr('status') === 'select') {
                var selectDiv = $("div.dataList[select='selected']");
                selectDiv.next('div').css('background-color', '#9dd6f2').attr('select', 'selected');
                if ($('div.dataList').length != 0) {
                    $('.count'+idd).val(parseInt($('.count'+idd).val()) - 1);
                }
                selectDiv.remove();
                var listBoxDom = $('.statusBox'+idd).html();
                controlObj.attr('listBoxDom', listBoxDom);
                var listCount = parseInt($('.count'+idd).val());
                controlObj.attr('listCount', listCount);
            }
            if ($("div.dataList[select='selected']").length === 0) {
                controlObj.removeAttr('status');
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });

        /*******默认功能********/
        $('.handleDefault'+idd).click(function() {
            if (controlObj.attr('status') === 'select') {
                var beforeLog = inTtCommand.log();
                webapi.addLog('before',beforeLog);
                var selectDiv = $("div.dataList[select='selected']");
                if (selectDiv.children('.statusListDefault').text() === '') {
                    selectDiv.children('.statusListDefault').text('默认');
                    selectDiv.siblings('div').children('.statusListDefault').text('');
                    var listBoxDom = $('.statusBox'+idd).html();
                    controlObj.attr('listBoxDom', listBoxDom);
                    var listCount = parseInt($('.count'+idd).val());
                    controlObj.attr('listCount', listCount);
                    var imageUrlPath = selectDiv.children('.statusListImage').text();
                    $('#statusImage-'+idd).attr({'backg': imageUrlPath});
                    $('#statusImage-'+idd).css({
                        'background-image': 'url('+imageUrlPath+')',
                        'background-size': '100% 100%',
                        'background-position': 'center center',
                        'background-repeat': 'no-repeat'
                    });
                }
                var afterLog = inTtCommand.log();
                webapi.addLog('after',afterLog);
            }
        });
        /*******恢复控件原始大小功能********/
        var buttonOff1 = true;
        if ($('.defaultSize'+idd).attr('checked') === 'checked') {
            $('.defaultSize'+idd).css({
                'background-image': 'url(images/selected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
            buttonOff1 = false;
        } else {
            $('.defaultSize'+idd).css({
                'background-image': 'url(images/notselected.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            });
        }
        $('.defaultSize'+idd).click(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var originalWidth = 102;
            var originalHeight = 32;
            var currentWidth = controlObj.css('width');
            var currentHeight = controlObj.css('height');
            if (originalWidth != parseInt(currentWidth) || originalHeight != parseInt(currentHeight)) {
                if (buttonOff1) {
                    $('.defaultSize'+idd).attr('checked', 'checked');
                    $('.defaultSize'+idd).css({
                        'background-image': 'url(images/selected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    $('#'+idd).css({
                        'width': originalWidth + 'px',
                        'height': originalHeight + 'px'
                    });
                } else {
                    $('.defaultSize'+idd).removeAttr('checked');
                    $('.defaultSize'+idd).css({
                        'background-image': 'url(images/notselected.png)',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                    $('#'+idd).css({
                        'width': currentWidth,
                        'height': currentHeight
                    });
                }
                buttonOff1 = !buttonOff1;
            } else {
                return false;
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        this.copy = function(srcId, desId) {
            var srcIdElement = $('#'+srcId);
            var desIdElement = $('#'+desId);
            var width = srcIdElement.width();
            var height = srcIdElement.height();
            var srcClass = srcIdElement.attr('class');
            var statusImageElement = srcIdElement.children('.statusImage'+srcId);
            var statusImageUrl = statusImageElement.attr('backg');
            var statusImageRelativeUrl = statusImageElement.css('background-image');
            statusImageRelativeUrl = statusImageRelativeUrl.split('images')[1];
            statusImageRelativeUrl = statusImageRelativeUrl.split('\"')[0];
            var listBoxDom = srcIdElement.attr('listBoxDom');
            var listCount = srcIdElement.attr('listCount');
            var imageSource = srcIdElement.attr('imageSource');
            desIdElement.css({
                'width': width + 'px',
                'height': height + 'px',
                'line-height': height + 'px'
            }).addClass(srcClass).attr({
                'listBoxDom': listBoxDom,
                'listCount': listCount,
                'imageSource': imageSource
            });
            desIdElement.children('.statusImage'+desId).attr({'backg': statusImageUrl});
            $('.statusImage'+desId).css({
                'background-image': 'url(images'+statusImageRelativeUrl+')',
                'background-repeat': 'no-repeat',
                'background-position': 'center center',
                'background-size': '100% 100%'
            });
            // 复制变量配置信息
            inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
        };
    };
};
//历史报警控件
var HistoryAlarmControl = function () {
    this.configId = -1;
    this.createHistoryAlarmControl = function(x,y){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.HistoryAlarmElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Alarm_" + this.configId;
        this.id = idd;
        var historyAlarmHtml =
            '<div id='+idd+' class="contrl move" headcolor="#e8ebf4" priority="全部" alarmcolor="#ff0000" dateFormatIndex="0" timeFormatIndex="0">'+
                '<div class="box'+idd+' historyEventBoxd">'+
                    '<div class="historyEvent_showMsg1 historyAlarm_showMsg1">' +
                        '<div class="alarm_eventDay">' +
                            '<ul class="alarm_list">' +
                                '<li class="lf alarm_1">'+
                                    '<header class="historyEvent_title"><b class="history_point1"></b><span>历史报警记录</span></header>'+
                                '</li>'+
                                '<li class="rt">' +
                                    '<span class="lf alarm_2">区域</span>'+
                                    '<div class="lf alarm_3"><select class="alarm_7"><option>全部区域</option></select></div>' +
                                '</li>'+
                                '<li class="rt">' +
                                    '<span class="lf alarm_4">优先级别</span>' +
                                    '<div class="lf alarm_5"><select class="alarm_6 alarm_6'+idd+'">' +
                                        '<option value="全部">全部</option>' +
                                        '<option value="高">高（667-1000）</option>' +
                                        '<option value="中">中（334-666）</option>' +
                                        '<option value="低">低（1-333）</option>' +
                                    '</select></div>' +
                                '</li>' +
                            '</ul>'+
                        '</div>'+
                    '</div>' +
                    '<div class="alarmDataList alarmDataList'+idd+'">' +
                        '<ul class="alarmNoteList alarmNoteList'+idd+'">' +
                            '<li class="alarmNote alarmNote'+idd+'">' +
                                '<ul class="ListHeader ListHeaderNote'+idd+'">' +
                                    '<li>日期</li>' +
                                    '<li>时间</li>' +
                                    '<li>变量名</li>' +
                                    '<li>描述</li>' +
                                    '<li>报警</li>' +
                                    '<li>当前值</li>' +
                                    '<li>优先级</li>' +
                                    '<li>事件</li>' +
                                '</ul>'+
                            '</li>'+
                            '<li class="showData showData'+idd+'">'+
                                
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="alarmfoot">'+
                        '<div class="footdate"><span>日期查询</span><input readonly="readonly" id="myDate_start'+idd+'" class="start dated" type="text" placeholder="年 / 月 / 日"/><span>至</span><input readonly="readonly" placeholder="年 / 月 / 日" id="myDate_end'+idd+'" class="end dated" type="text"/><p class="search3 search3'+idd+'"></p></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
        $('#content').append(historyAlarmHtml);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;
        $("#"+idd).css({
            "position":"absolute",
            "left": x + scrollLeft+"px",
            "top": y + scrollTop +"px",
            "width": "600px",
            "height": "310px"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd);//添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.historyAlarmPropertiesPage(selecteId);
        this.historyAlarmPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.historyAlarmPropertiesPage = function(idd){
        var alarmP = '<div id="tc3'+idd+'" class="tc33">' +
                            '<fieldset class="attrs">' +
                                 '<legend>标题文字</legend>' +
                                '<ul class="style1">' +
                                '<li>' +
                                    '<select class="lin sele33" name="sele">' +
                                    '<option value="1" selected="">自定义</option>' +
                                    '</select>' +
                                '</li>' +
                                '<li>' +
                                    '<select class="lin historyFont'+idd+' sele22" name="sele">' +
                                        '<option value="Microsoft YaHei" selected="selected">微软雅黑</option>' +
                                        '<option value="KaiTi">楷体</option>' +
                                        '<option value="SimHei">黑体</option>' +
                                        '<option value="SimSun">宋体</option>' +
                                        '<option value="NSimSun">新宋体</option>' +
                                        '<option value="FangSong">仿宋</option>' +
                                        '<option value="LiSu">隶书</option>' +
                                        '<option value="YouYuan">幼圆</option>' +
                                    '</select>' +
                                '</li>' +
                                '<li>' +
                                    '<select class=" lin setFontSize'+idd+'" name="sele">' +
                                        '<option value="56">初号</option>' +
                                        '<option value="48">小初</option>' +
                                        '<option value="34">一号</option>' +
                                        '<option value="32">小一</option>' +
                                        '<option value="28">二号</option>' +
                                        '<option value="24">小二</option>' +
                                        '<option value="21">三号</option>' +
                                        '<option value="20">小三</option>' +
                                        '<option value="18">四号</option>' +
                                        '<option value="16" selected="selected">小四</option>' +
                                        '<option value="14">五号</option>' +
                                        '<option value="12">小五</option>' +
                                        '<option value="10">六号</option>' +
                                        '<option value="8">小六</option>' +
                                        '<option value="6">七号</option>' +
                                        '<option value="4">八号</option>' +
                                    '</select>' +
                                '</li>' +
                                '</ul>' +
                                '<ul class="style2 fontDecoration'+idd+'">' +
                                    '<li><img src="images/convention.png"></li>' +
                                    '<li><img src="images/overstriking.png"></li>' +
                                    '<li><img src="images/Italic.png"></li>' +
                                    '<li><img src="images/underline.png"></li>' +
                                    '<li><img src="images/strikethrough.png"></li>' +
                                '</ul>' +
                                '<p class="lf exppp testy" id="exp1'+idd+'">文字示例</p>' +
                                '<ul class="history_node">' +
                                    '<li>' +
                                        '<p class="node">标题文字颜色</p>' +
                                        '<input type="color" class="color'+idd+'" />' +
                                    '</li>' +
                                    '<li>' +
                                        '<p class="node">标题背景颜色</p>' +
                                        '<input type="color" class="bg'+idd+'" />' +
                                    '</li>' +
                                '</ul>' +
                                '</fieldset>'+
                            '<fieldset class="attrs">' +
                            '<legend>窗体设置</legend>' +
                            '<ul class="style1">' +
                            '<li>' +
                            '<select class="lin sele33" name="sele">' +
                            '<option value="1" selected="">自定义</option>' +
                            '</select>' +
                            '</li>' +
                            '<li>' +
                            '<select class="lin sele22 eventFont'+idd+'" name="sele">' +
                            '<option value="微软雅黑" selected="selected">微软雅黑</option>' +
                            '<option value="楷体">楷体</option>' +
                            '<option value="黑体">黑体</option>' +
                            '<option value="宋体">宋体</option>' +
                            '<option value="新宋体">新宋体</option>' +
                            '<option value="仿宋">仿宋</option>' +
                            '<option value="隶书">隶书</option>' +
                            '<option value="幼圆">幼圆</option>' +
                            '</select>' +
                            '</li>' +
                            '<li>' +
                            '<select class=" lin" name="sele" id="eventfontsize'+idd+'">' +
                            '<option value="56">初号</option>' +
                            '<option value="48">小初</option>' +
                            '<option value="34">一号</option>' +
                            '<option value="32">小一</option>' +
                            '<option value="28">二号</option>' +
                            '<option value="24">小二</option>' +
                            '<option value="21">三号</option>' +
                            '<option value="20">小三</option>' +
                            '<option value="18">四号</option>' +
                            '<option value="16" selected="selected">小四</option>' +
                            '<option value="14">五号</option>' +
                            '<option value="12">小五</option>' +
                            '<option value="10">六号</option>' +
                            '<option value="8">小六</option>' +
                            '<option value="6">七号</option>' +
                            '<option value="4">八号</option>' +
                            '</select>' +
                            '</li>' +
                            '</ul>' +
                            '<ul class="style2 eventFontDecoration'+idd+'">' +
                            '<li><img src="images/convention.png"/></li>' +
                            '<li><img src="images/overstriking.png"/></li>' +
                            '<li><img src="images/Italic.png"/></li>' +
                            '<li><img src="images/underline.png"/></li>' +
                            '<li><img src="images/strikethrough.png"/></li>' +
                            '</ul>' +
                            '<p class="lf exppp testy" id="alarmH'+idd+'">文字示例</p>' +
                            '<ul class="history_node">' +
                            '<li><p class="node">报警颜色</p><input type="color" value="#ff0000" class="eventColor'+idd+'"/></li>' +
                            '<li><p class="node">窗体背景颜色</p><input type="color" class="eventBg'+idd+'"/></li>' +
                            '<li><p class="node">恢复颜色</p><input type="color" class="restoreColor'+idd+'"/></li>' +
                            '</ul>' +
                            '</fieldset>'+
                            '<fieldset class="attrs">' +
                            '<legend>字段格式</legend>' +
                            '<ul class="history_node">' +
                            '<li>' +
                            '<p class="node">日期格式</p>' +
                            '<p>' +
                            '<select class="dateFormat'+idd+'" >' +
                            '<option value="yy/mm/dd" selected="selected">yy/mm/dd</option>' +
                            '<option value="mm/dd/yy">mm/dd/yy</option>' +
                            '<option value="yy-mm-dd">yy-mm-dd</option>' +
                            '<option value="mm-dd-yy">mm-dd-yy</option>' +
                            '</select>' +
                            '</p>'+
                            '</li>' +
                            '<li>' +
                            '<p class="node">时间格式</p>' +
                            '<p>' +
                            '<select class="timeFormat'+idd+'" >' +
                            '<option value="hh:mm:ss" selected="selected">hh:mm:ss</option>' +
                            '<option value="hh:mm:ss:nnn">hh:mm:ss:nnn</option>' +
                            '</select>' +
                            '</p>'+
                            '</li>' +
                            '<li>' +
                            '<p class="node">日期</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>' +
                            '<li>' +
                            '<p class="node">时间</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>'
                            +'<li>' +
                            '<p class="node">变量名</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>'+
                            '<li>' +
                            '<p class="node">描述</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>'+
                            '<li>' +
                            '<p class="node">报警</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>'+
                            '<li>' +
                            '<p class="node">当前值</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>' +
                            '<li>' +
                            '<p class="node">优先级</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>' +
                            '<li>' +
                            '<p class="node">事件</p>' +
                            '<div>' +
                            '<div class="showW">' +
                            '<span class="angL dateangLW'+idd+'"></span><span class="showNum dateshowN'+idd+'">8</span><span class="angR dateangRW'+idd+'"></span>' +
                            '</div>' +
                            '</div>' +
                            '</li>' +
                            '</ul>' +
                            '</fieldset>'+
                            '</div>';
        $("#fathy").append(alarmP);
    };
    this.historyAlarmPageFeatures = function(idd){
        var hisControlEle = $("#"+idd);
        var dataShowBox = $(".showData"+idd);
        var demoText = $("#exp1"+idd);
        var alarm_8 = $(".alarmNoteList"+idd);
        var NodeFontObj = $(".ListHeaderNote"+idd).children("li");
        var restoreColor = $(".restoreColor"+idd);
        var colorO = $(".color"+idd);
        var bgO = $(".bg"+idd);
        var eventColorO = $(".eventColor"+idd);
        var eventBgO = $(".eventBg"+idd);
        var dataLi = dataShowBox.find("li");
        var dateFormat = $(".dateFormat"+idd);
        var timeFormat = $(".timeFormat"+idd);
        var alarmNoteList = $(".alarmNoteList"+idd).find(".ListHeader");
        var colorVal;
        var bgVal;
        var DataLiClass;
        var datelist = alarmNoteList.find("li:nth-child(8n+1)");
        var timelist = alarmNoteList.find("li:nth-child(8n+2)");
        var name = alarmNoteList.find("li:nth-child(8n+3)");
        var description = alarmNoteList.find("li:nth-child(8n+4)");
        var alarm = alarmNoteList.find("li:nth-child(8n+5)");
        var currentValue = alarmNoteList.find("li:nth-child(8n+6)");
        var grade = alarmNoteList.find("li:nth-child(8n+7)");
        var eventType = alarmNoteList.find("li:nth-child(8n+8)");
        var date = new Date();
        var fontDecorationO = $(".fontDecoration"+idd).children("li");
        var fontSelect = $(".historyFont" + idd);
        var fontOption = fontSelect.children("option");
        var fontSizeSelect = $(".setFontSize"+idd);
        var fontSizeSelectOp = fontSizeSelect.children("option");
        var alarmText = $("#alarmH"+idd);
        var dataStyle = {};
        var nodeFeatures = {
            setFont:function() { //设置标注字体
                fontSelect.bind("change",function() {
                    var _this = $(this);
                    fontOption.each(function(i){
                        if(_this.val() == $(this).val()){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                            NodeFontObj.css("font-family",$(this).val());
                            NodeFontObj.attr("select",$(this).val());
                            demoText.css("font-family",$(this).val());
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }
                    })
                });
            },
            setFontSize:function(){ //设置标注字体大小
                fontSizeSelect.bind("change",function(){
                    var _this = $(this);
                    fontSizeSelectOp.each(function(){
                        if(_this.val() == $(this).val()){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                            NodeFontObj.css("fontSize",parseInt($(this).val()+"px"));
                            demoText.css("fontSize",parseInt($(this).val()+"px"));
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }
                    })
                })
            },
            setFontShape:function(){//字体标注装饰
                fontDecorationO.each(function(i){
                    fontDecorationO.eq(i).bind("click",function(){
                        if(i == 0){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            NodeFontObj.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            demoText.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            fontDecorationO.eq(0).find("img").attr("src","images/convention2.png");
                            fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                            fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                            fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                            fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 1){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(NodeFontObj.hasClass("fontWeight")){
                                NodeFontObj.removeClass("fontWeight");
                                demoText.removeClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                            }else{
                                NodeFontObj.addClass("fontWeight");
                                demoText.addClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 2){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(NodeFontObj.hasClass("fontItalic")){
                                NodeFontObj.removeClass("fontItalic");
                                demoText.removeClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                            }else{
                                NodeFontObj.addClass("fontItalic");
                                demoText.addClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/斜体2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 3){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(NodeFontObj.hasClass("fontUnderline")){
                                NodeFontObj.removeClass("fontUnderline");
                                demoText.removeClass("fontUnderline fontThrough");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                            }else{
                                NodeFontObj.addClass("fontUnderline");
                                NodeFontObj.removeClass("fontThrough");
                                demoText.addClass("fontUnderline");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }if(i == 4){
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            if(NodeFontObj.hasClass("fontThrough")){
                                NodeFontObj.removeClass("fontThrough");
                                demoText.removeClass("fontThrough fontUnderline");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                            }else{
                                NodeFontObj.addClass("fontThrough");
                                NodeFontObj.removeClass("fontUnderline");
                                demoText.addClass("fontThrough");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                            return false;
                        }
                    });
                });
            },
            setFontColor:function(){//设置标注字体颜色
                inItPropertiesPage.setColor(colorO, ['color', NodeFontObj]);
            },
            setBgColor:function(){//设置标注背景颜色
                inItPropertiesPage.setColor(bgO, ['background', $(".alarmNoteList"+idd)], ['headcolor', $("#"+idd)]);
            },
            inTtNote:function(){
                $.fn.getHexBackgroundColor = function(){ //初始化属性页字体颜色和背景
                    var rgb = NodeFontObj.css("color");
                    var rgbb = alarm_8.css("background-color");
                    colorO.val(inItPropertiesPage.formatColor(rgb));
                    bgO.val(inItPropertiesPage.formatColor(rgbb));
                };
                $.fn.getHexBackgroundColor();
            },
            inIt:function(){
                this.setFont();
                this.setFontSize();
                this.setFontShape();
                this.setFontColor();
                this.setBgColor();
                this.inTtNote();
            }
        };
        var alarmFeatures = {
            setFont : function() { //设置事件字体
                var fontSelect = $(".eventFont" + idd);
                var fontOption = fontSelect.children("option");
                fontSelect.bind("change",function() {
                    $("#"+idd).attr("font-family",$(this).val());
                    dataShowBox.attr("font",$(this).val());
                });
            },
            setFontSize:function(){ //设置事件字体大小
                var fontSizeSelect = $("#eventfontsize"+idd);
                var fontSizeSelectOp = fontSizeSelect.children("option");
                fontSizeSelect.bind("change",function(){
                    $("#"+idd).attr("font-size",$(this).val());
                    dataShowBox.attr("fontSize",$(this).val())
                })
            },
            setFontShape:function(){//事件字体装饰
                var fontDecorationO = $(".eventFontDecoration"+idd).children("li");
                fontDecorationO.each(function(i){
                    fontDecorationO.eq(i).bind("click",function(){
                        if(i == 0){
                            $("#"+idd).removeAttr("weight weighti weightl weightb");
                            dataShowBox.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            alarmText.removeClass("fontWeight fontItalic fontUnderline fontThrough");
                            fontDecorationO.eq(0).find("img").attr("src","images/convention2.png");
                            fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                            fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                            fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                            fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                            $("#"+idd).attr("fontN","yes");
                            return false;
                        }if(i == 1){
                            if(dataShowBox.hasClass("fontWeight")){
                                dataShowBox.removeClass("fontWeight");
                                alarmText.removeClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking.png");
                                $("#"+idd).attr("weight","no");
                            }else{
                                dataShowBox.addClass("fontWeight");
                                alarmText.addClass("fontWeight");
                                fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weight","yes");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }if(i == 2){
                            if(dataShowBox.hasClass("fontItalic")){
                                dataShowBox.removeClass("fontItalic");
                                alarmText.removeClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/Italic.png");
                                $("#"+idd).attr("weighti","no");
                            }else{
                                dataShowBox.addClass("fontItalic");
                                alarmText.addClass("fontItalic");
                                fontDecorationO.eq(2).find("img").attr("src","images/Italic2.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weighti","yes");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }if(i == 3){
                            if(dataShowBox.hasClass("fontUnderline")){
                                dataShowBox.removeClass("fontUnderline");
                                alarmText.removeClass("fontUnderline fontThrough");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                                $("#"+idd).attr("weightl","no");
                            }else{
                                dataShowBox.addClass("fontUnderline");
                                dataShowBox.removeClass("fontThrough");
                                alarmText.addClass("fontUnderline");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weightl","yes");
                                $("#"+idd).attr("weightb","no");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }if(i == 4){
                            if(dataShowBox.hasClass("fontThrough")){
                                dataShowBox.removeClass("fontThrough");
                                alarmText.removeClass("fontThrough fontUnderline");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough.png");
                                $("#"+idd).attr("weightb","no");
                            }else{
                                dataShowBox.addClass("fontThrough");
                                dataShowBox.removeClass("fontUnderline");
                                alarmText.addClass("fontThrough");
                                fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                                fontDecorationO.eq(3).find("img").attr("src","images/underline.png");
                                fontDecorationO.eq(0).find("img").attr("src","images/convention.png");
                                $("#"+idd).attr("weightb","yes");
                                $("#"+idd).attr("weightl","no");
                                $("#"+idd).attr("fontN","no");
                            }
                            return false;
                        }
                    });
                });
            },
            setFontColor:function(){//设置文字历史报警颜色
                eventColorO.bind("change",function () {
                    colorVal = $(this).val();
                    dataLi.css("color",colorVal);
                    $("#"+idd).attr("alarmcolor",colorVal);
                    dataStyle.color = colorVal;
                })
            },
            setBgColor:function(){//设置历史报警背景颜色
                inItPropertiesPage.setColor(eventBgO, ['background', dataShowBox]);
            },
            setRestoreColor:function(){//设置历史报警的恢复颜色
                inItPropertiesPage.setColor(restoreColor, ['color', dataLi]);               
                $(".restoreColor"+idd).bind("change",function(){
                    $("#"+idd).attr("restore_c",$(this).val());                    
                });
            },
            inItNodeStyle:function(){//初始化
                $.fn.getHexBackgroundColor = function(){
                    var rgbc = $("#"+idd).attr("alarmcolor");
                    eventColorO.val(rgbc);
                    var rgbb = dataShowBox.css("background-color");
                    eventBgO.val(inItPropertiesPage.formatColor(rgbb));
                };
                $.fn.getHexBackgroundColor();
                $(".config_dis"+idd).attr("disabled","true");
            },
            inIt:function(){
                this.setFont();
                this.setFontSize();
                this.setFontShape();
                this.setFontColor();
                this.setBgColor();
                this.inItNodeStyle();
                this.setRestoreColor();
            }

        };
        var alarmFormat = {
            setDateFormat:function(){//日期格式
                dateFormat.bind("change",function () {
                    var _this = $(this);
                    dateFormat.children("option").each(function(){
                        if(_this.val() == $(this).val() ){
                            if($(this).index() == 0){
                                $('#'+idd).attr('dateFormatIndex', 0);
                                return false;
                            }if($(this).index() == 1){
                                $('#'+idd).attr('dateFormatIndex', 1);
                                return false;
                            }if($(this).index() == 2){
                                $('#'+idd).attr('dateFormatIndex', 2);
                                return false;
                            }if($(this).index() == 3){
                                $('#'+idd).attr('dateFormatIndex', 3);
                                return false;
                            };
                        }
                    })
                })
            },
            setTimeFormat:function(){//时间格式
                timeFormat.bind("change",function () {
                    var _this = $(this);
                    timeFormat.children("option").each(function(){
                        if(_this.val() == $(this).val() ){
                            if($(this).index() == 0){
                                $('#'+idd).attr('timeFormatIndex', 0);
                                return false;
                            }if($(this).index() == 1){
                                $('#'+idd).attr('timeFormatIndex', 1);
                                return false;
                            }
                        }
                    })
                })
            },
            setCutWidth:function(){
                if(dataShowBox.children("ul").length > 0){
                    $(".dateangLW"+idd).each(function(i){
                        $(this).bind("click",function (e) {
                            var textO = $(this).next(".dateshowN"+idd);
                            var text = parseInt(textO.text());
                            var pw = datelist.parents(".showData").width();
                            if(text == 0){
                                textO.text(0);
                            }else {
                                text = text - 1;
                                textO.text(text);
                                switch (i) {
                                    case 0:
                                        var w1 = datelist.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (timelist.width() + w3) / pw * 100;
                                        datelist.width(w2 + '%');
                                        timelist.width(w4 + '%');
                                        break;
                                    case 1:
                                        var w1 = timelist.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (name.width() + w3) / pw * 100;
                                        timelist.width(w2 + '%');
                                        name.width(w4 + '%');
                                        break;
                                    case 2:
                                        var w1 = name.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (description.width() + w3) / pw * 100;
                                        name.width(w2 + '%');
                                        description.width(w4 + '%');
                                        break;
                                    case 3:
                                        var w1 = description.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (alarm.width() + w3) / pw * 100;
                                        description.width(w2 + '%');
                                        alarm.width(w4 + '%');
                                        break;
                                    case 4:
                                        var w1 = alarm.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (currentValue.width() + w3) / pw * 100;
                                        alarm.width(w2 + '%');
                                        currentValue.width(w4 + '%');
                                        break;
                                    case 5:
                                        var w1 = currentValue.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (grade.width() + w3) / pw * 100;
                                        currentValue.width(w2 + '%');
                                        grade.width(w4 + '%');
                                        break;
                                    case 6:
                                        var w1 = grade.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (eventType.width() + w3) / pw * 100;
                                        grade.width(w2 + '%');
                                        eventType.width(w4 + '%');
                                        break;
                                    case 7:
                                        var w1 = eventType.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (datelist.width() + w3) / pw * 100;
                                        eventType.width(w2 + '%');
                                        datelist.width(w4 + '%');
                                        break;
                                    default:false;
                                }
                            }
                        });
                    });
                }
            },
            setAddWidth:function(){
                if(dataShowBox.children().length > 0) {
                    $(".dateangRW" + idd).each(function (i) {
                        $(this).bind("click", function (e) {
                            var textO = $(this).prev(".dateshowN" + idd);
                            var date = $(".history_headerList" + idd);
                            var text = parseInt(textO.text());
                            var pw = datelist.parents(".showData").width();
                            if (text == 16) {
                                textO.text(16);
                            } else {
                                text = text + 1;
                                textO.text(text);
                                switch (i) {
                                    case 0:
                                        var w1 = datelist.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (timelist.width() + w3) / pw * 100;
                                        datelist.width(w2 + '%');
                                        timelist.width(w4 + '%');
                                        break;
                                    case 1:
                                        var w1 = timelist.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (name.width() + w3) / pw * 100;
                                        timelist.width(w2 + '%');
                                        name.width(w4 + '%');
                                        break;
                                    case 2:
                                        var w1 = name.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (description.width() + w3) / pw * 100;
                                        name.width(w2 + '%');
                                        description.width(w4 + '%');
                                        break;
                                    case 3:
                                        var w1 = description.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (alarm.width() + w3) / pw * 100;
                                        description.width(w2 + '%');
                                        alarm.width(w4 + '%');
                                        break;
                                    case 4:
                                        var w1 = alarm.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (currentValue.width() + w3) / pw * 100;
                                        alarm.width(w2 + '%');
                                        currentValue.width(w4 + '%');
                                        break;
                                    case 5:
                                        var w1 = currentValue.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (grade.width() + w3) / pw * 100;
                                        currentValue.width(w2 + '%');
                                        grade.width(w4 + '%');
                                        break;
                                    case 6:
                                        var w1 = grade.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (eventType.width() + w3) / pw * 100;
                                        grade.width(w2 + '%');
                                        eventType.width(w4 + '%');
                                        break;
                                    case 7:
                                        var w1 = eventType.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (datelist.width() + w3) / pw * 100;
                                        eventType.width(w2 + '%');
                                        datelist.width(w4 + '%');
                                        break;
                                    default:false;
                                }
                            }
                        })
                    });
                }
            },
            inIt:function(){
                this.setDateFormat();
                this.setTimeFormat();
                this.setCutWidth();
                this.setAddWidth();
            }
        };
        var historyAlarm = {
            inIt :function(){
                var o = $(".alarmDataList"+idd);
                var dataO = o.find(".showData"+idd);
                var ListHeaderNote = $(".ListHeaderNote"+idd);
                setInterval(function(){
                    var ControlEleH = hisControlEle.height();
                    var alarmDataListH = ControlEleH - 62;
                    if(parseInt(dataO.height()) > parseInt(o.height())){
                        dataO.css("overflow-y","scroll");
                    }else{
                        dataO.css("overflow-y","auto");
                        $('.alarmDataList'+idd).css({
                            'width': "100%"
                        });
                    }
                    ListHeaderNote.parent(".alarmNote").width(parseInt(dataO.children("ul").width()));
                },100);
            },
        };
        var historyAlarmInit = {
            nodeInIt :function(){
                if(NodeFontObj.hasClass("fontWeight")){
                    fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                    demoText.addClass("fontWeight");
                } if(NodeFontObj.hasClass("fontItalic")){
                    fontDecorationO.eq(2).find("img").attr("src","images/Italic2.png");
                    demoText.addClass("fontItalic");
                } if(NodeFontObj.hasClass("fontUnderline")){
                    fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                    demoText.addClass("fontUnderline");
                } if(NodeFontObj.hasClass("fontThrough")){
                    fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                    demoText.addClass("fontThrough");
                }
                fontOption.each(function () { //初始化属性页字体
                    if($(this).val() == NodeFontObj.attr("select")){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        demoText.css("font-family",$(this).val());
                        return false;
                    }
                });
                fontSizeSelectOp.each(function(){ //初始化属性页字体大小显示
                    if($(this).val() == parseInt(NodeFontObj.css("font-size"))){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        demoText.css("fontSize",parseInt($(this).val())+"px");
                    }
                });
            },
            alarmInit:function(){//初始化历史报警部分
                $(".restoreColor"+idd).val($("#"+idd).attr("restore_c"));
                var fontDecorationO = $(".eventFontDecoration"+idd).children("li");
                var fontSelect = $(".eventFont" + idd);
                var fontOption = fontSelect.children("option");
                var fontSizeSelect = $("#eventfontsize"+idd);
                var fontSizeSelectOp = fontSizeSelect.children("option");
                if(dataShowBox.hasClass("fontWeight")){
                    fontDecorationO.eq(1).find("img").attr("src","images/overstriking2.png");
                    alarmText.addClass("fontWeight");
                } if(dataShowBox.hasClass("fontItalic")){
                    fontDecorationO.eq(2).find("img").attr("src","images/Italic2.png");
                    alarmText.addClass("fontItalic");
                } if(dataShowBox.hasClass("fontUnderline")){
                    fontDecorationO.eq(3).find("img").attr("src","images/underline2.png");
                    alarmText.addClass("fontUnderline");
                } if(dataShowBox.hasClass("fontThrough")){
                    fontDecorationO.eq(4).find("img").attr("src","images/strikethrough2.png");
                    alarmText.addClass("fontThrough");
                }
                fontOption.each(function () {
                    if($(this).val() == dataShowBox.attr("font")){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        alarmText.css("font-family",$(this).val());
                        return false;
                    }
                });
                fontSizeSelectOp.each(function(){
                    if($(this).val() == dataShowBox.attr("fontSize")){
                        $(this).attr("selected","selected").siblings("option").removeAttr("selected");
                        alarmText.css("fontSize",parseInt($(this).val())+"px");
                        return false;
                    }
                });
                /*****初始化日期时间格式*****/
                var fontSizeSelectala = $(".dateFormat"+idd).children("option");
                var fontSizeSelectal = $(".timeFormat"+idd).children("option");
                var alarminit = $("#"+idd).attr("dateFormatIndex");
                var alarminitt = $("#"+idd).attr("timeFormatIndex");
                fontSizeSelectala.each(function(){
                    if(alarminit == 0){
                        fontSizeSelectala.eq(0).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminit == 1){
                        fontSizeSelectala.eq(1).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminit == 2){
                        fontSizeSelectala.eq(2).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminit == 3){
                        fontSizeSelectala.eq(3).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                });
                fontSizeSelectal.each(function(){
                    if(alarminitt == 0){
                        fontSizeSelectal.eq(0).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                    if(alarminitt == 1){
                        fontSizeSelectal.eq(1).attr("selected","selected").siblings("option").removeAttr("selected");
                        return false;
                    }
                });
            },
            inIt:function(){ //初始化属性页字体装饰
                this.nodeInIt();
                this.alarmInit();
            }
        };
        nodeFeatures.inIt();
        alarmFeatures.inIt();
        alarmFormat.inIt();
        historyAlarm.inIt();
        historyAlarmInit.inIt();
    };
    this.historyAlarmCopy = function(srcId,desId){
        var srcIdO = $("#"+srcId);
        var list = $(".ListHeaderNote"+srcId);
        var alarm_9 = $(".alarmNoteList"+srcId);
        var dataList = $(".showData"+srcId);
        var height = srcIdO.height();
        var width = srcIdO.width();
        var color = list.children("li").css("color");
        var fontSize = list.children("li").css("font-size");
        var bg = alarm_9.css("background");
        var listClass = list.children("li").attr("class");
        var dataColor = dataList.find("li").css("color");
        var datafont = dataList.find("li").css("font-size");
        var dataClass = dataList.find("li").attr("class");
        var dataBg = dataList.css("background");
        var srcClass = srcIdO.attr("class");
        var desIdO = $("#"+desId);
        var desNoteList = $(".ListHeaderNote"+desId);
        var desDataList = $(".showData"+desId);
        var headcolor = $("#"+srcId).attr("headcolor");
        $("#"+desId).attr("headcolor",headcolor);
        $(".alarmNoteList"+desId).css("background-color",headcolor);
        desIdO.css({"width":width,"height":height}).addClass(srcClass);
        desNoteList.children("li").css({"font-size":fontSize,"color":color}).addClass(listClass);
        desNoteList.parent(".alarmNote").css("background",bg);
        $(".alarmNoteList"+desId).css("background-color",bg);
        desDataList.css("background",dataBg);
        desDataList.find("li").css({"color":dataColor,"font-size":datafont}).addClass(dataClass);
    }
};
/*******************实时报警控件*************************/
var RealTimeAlarmControl = function() {
    this.configId = -1;
    this.createRealTimeAlarmControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.realTimeAlarmElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'RealTimeAlarm_' + this.configId;
        this.id = idd;
        var textDiv = $
            ('<div id='+idd+' class="contrl move" priorityLeveladd="全部" fontstyle="Microsoft YaHei" timestyle="hh:mm:ss" datestyle="yy/mm/dd" fontsized="10" alarm_limit="100" alarbg="#ffffff" alarm_color="#ff0000" alacolor="#ff0000">' +
                '<div class="alarm alarm'+idd+'">' +
                    '<div class="realTimeAlarm_showMsg">' +
                        '<div class="alarmTitle"><b></b><span>实时报警记录</span></div>' +
                        '<div class="alarmOptions alarmOptions'+idd+'">' +
                            '<button class="conform conform'+idd+'">确认</button>' +
                            '<div class="option3 option3'+idd+'">' +
                                '<label class="optionDes">区域</label>' +
                                '<select id="alarmArea-'+idd+'" class="option">' +
                                    '<option value="全部区域" selected="selected">全部区域</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="option2 option2'+idd+'">' +
                                '<label class="optionDes">优先级别</label>' +
                                '<select id="alarmPriority-'+idd+'" class="option">' +
                                    '<option value="全部" selected="selected">全部</option>' +
                                    '<option value="紧急">紧急(667-1000)</option>' +
                                    '<option value="高">高(334-666)</option>' +
                                    '<option value="低">低(1-333)</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="option1 option1'+idd+'"><span>仅限未确认报警</span><img id="unconfirmAlarm-'+idd+'" src="images/option_unchecked.png" class="unconfirmed unconfirmed'+idd+'"/></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="alarmHeaderBox alarmHeaderBox'+idd+'">' +
                        '<ul class="alarmHeader alarmHeader'+idd+'">' +
                            '<li>日期</li><li>时间</li><li>变量名</li><li>描述</li><li>报警</li><li>当前值</li><li>优先级</li><li>事件</li><li>应答</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="alarmDataShowBox" id="dataShowBox'+idd+'">' +
                        
                    '</div>'+
                '</div>' +
            '</div>');
        $('#content').append(textDiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;
        //控件相关样式
        $('#'+idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': '310px',
            'width': '600px'
        });
        $('.alarm'+idd).css({
            'height': 100 + '%',
            'width': 100 + '%',
            'border': '1px solid #ccc',
            'background': '#fff',
            'overflow': 'hidden',
            'box-sizing': 'border-box'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.RealTimeAlarmPropertiesPage(selecteId);
        this.RealTimeAlarmPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.RealTimeAlarmPropertiesPage = function(idd) {
        var proAttributes = $(
            '<div id="tc3'+idd+'" class="tc33">' +
                '<fieldset class="attrs">' +
                    '<legend>标题文字</legend>' +
                    '<ul class="style1">' +
                        '<li>' +
                            '<select class="lin sele3'+idd+' sele33" name="sele"><option value="1" selected="">自定义</option></select>' +
                        '</li>' +
                        '<li>' +
                            '<select class="lin titleFont'+idd+' sele22" name="sele">' +
                                '<option value="微软雅黑" selected="selected">微软雅黑</option><option value="楷体">楷体</option>' +
                                '<option value="黑体">黑体</option><option value="宋体">宋体</option><option value="新宋体">新宋体</option>' +
                                '<option value="仿宋">仿宋</option><option value="隶书">隶书</option><option value="幼圆">幼圆</option>' +
                            '</select>' +
                        '</li>' +
                        '<li>' +
                            '<select class=" lin setFontSize'+idd+'" name="sele">' +
                                '<option value="56">初号</option><option value="48">小初</option><option value="34">一号</option><option value="32">小一</option>' +
                                '<option value="28">二号</option><option value="24">小二</option><option value="21">三号</option><option value="20">小三</option>' +
                                '<option value="18">四号</option><option value="16" selected="selected">小四</option><option value="14">五号</option><option value="12">小五</option>' +
                                '<option value="10">六号</option><option value="8">小六</option><option value="6">七号</option><option value="4">八号</option>' +
                            '</select>' +
                        '</li>' +
                    '</ul>' +
                    '<ul class="style2 fontDecoration'+idd+'">' +
                        '<li><img src="images/convention.png"></li><li><img src="images/overstriking.png"></li><li><img src="images/Italic.png"></li><li><img src="images/underline.png"></li><li><img src="images/strikethrough.png"></li>' +
                    '</ul>' +
                    '<p class="lf exppp testy" id="exp1'+idd+'">文字示例</p>' +
                    '<ul class="alarm_node">' +
                        '<li><p class="node">标题文字颜色</p><input type="color" class="color'+idd+'" /></li>' +
                        '<li><p class="node">标题背景颜色</p><input type="color" class="bg'+idd+'" /></li>' +
                    '</ul>' +
                '</fieldset>'+
                '<fieldset class="attrs">' +
                    '<legend>窗体设置</legend>' +
                    '<ul class="style1">' +
                        '<li><select class="lin sele33" name="sele"><option value="1" selected="">自定义</option></select></li>' +
                        '<li>' +
                            '<select class="lin sele22 alarmFontFamily'+idd+'" name="sele">' +
                                '<option value="Microsoft YaHei" selected="selected">微软雅黑</option>' +
                                '<option value="KaiTi">楷体</option>' +
                                '<option value="SimHei">黑体</option>' +
                                '<option value="SimSun">宋体</option>' +
                                '<option value="NSimSun">新宋体</option>' +
                                '<option value="FangSong">仿宋</option>' +
                                '<option value="LiSu">隶书</option>' +
                                '<option value="YouYuan">幼圆</option>' +
                            '</select>' +
                        '</li>' +
                        '<li>' +
                            '<select class=" lin" name="sele" id="alarmFontSize'+idd+'">' +
                                '<option value="56">初号</option><option value="48">小初</option><option value="34">一号</option><option value="32">小一</option>' +
                                '<option value="28">二号</option><option value="24">小二</option><option value="21">三号</option><option value="20">小三</option>' +
                                '<option value="18">四号</option><option value="16" selected="selected">小四</option><option value="14">五号</option><option value="12">小五</option>' +
                                '<option value="10">六号</option><option value="8">小六</option><option value="6">七号</option><option value="4">八号</option>' +
                            '</select>' +
                        '</li>' +
                    '</ul>' +
                    '<ul class="style2 alarmFontDecoration'+idd+'">' +
                        '<li><img src="images/convention.png"/></li>' +
                        '<li><img src="images/overstriking.png"/></li>' +
                        '<li><img src="images/Italic.png"/></li>' +
                        '<li><img src="images/underline.png"/></li>' +
                        '<li><img src="images/strikethrough.png"/></li>' +
                    '</ul>' +
                    '<p class="lf exppp testy" id="exp2'+idd+'">文字示例</p>' +
                    '<ul class="alarm_node">' +
                        // '<li><p class="node">窗体文字颜色</p><input type="color" value="#ff0000" class="alarmFont'+idd+'"/></li>' +
                        '<li><p class="node">报警颜色</p><input type="color" value="#ff0000" class="alarmColor'+idd+'"/></li>' +
                        '<li><p class="node">窗体背景颜色</p><input type="color" value="#ffffff" class="alarmBg'+idd+'"/></li>' +
                        '<li><p class="node">报警记录上线</p><input type="number" value="100" class="alarmMaxNum'+idd+'"/></li>' +
                    '</ul>' +
                '</fieldset>'+
                '<fieldset class="attrs">' +
                    '<legend>字段格式</legend>' +
                    '<ul class="alarm_node">' +
                        '<li>' +
                            '<p class="node">日期格式</p>' +
                            '<p>' +
                                '<select class="dateFormat'+idd+'" >' +
                                    '<option value="yy/mm/dd" selected="selected">yy/mm/dd</option><option value="mm/dd/yy">mm/dd/yy</option><option value="yy-mm-dd">yy-mm-dd</option><option value="mm-dd-yy">mm-dd-yy</option>' +
                                '</select>' +
                            '</p>'+
                        '</li>' +
                        '<li>' +
                            '<p class="node">时间格式</p>' +
                            '<p>' +
                                '<select class="timeFormat'+idd+'" ><option value="hh:mm:ss" selected="selected">hh:mm:ss</option><option value="hh:mm:ss:nnn">hh:mm:ss:nnn</option></select>' +
                            '</p>'+
                        '</li>' +
                        '<li>' +
                            '<p class="node">日期</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">时间</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">变量名</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>'+
                        '<li>' +
                            '<p class="node">描述</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">报警</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">当前值</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">优先级</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">事件</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p class="node">应答</p>' +
                            '<div>' +
                                // '<b class="date_box"><span></span></b>' +
                                '<div class="showW">' +
                                    '<span class="angL leftArrow'+idd+'"></span><span class="showNum dateShowN'+idd+'">4</span><span class="angR rightArrow'+idd+'"></span>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                    '</ul>' +
            '</fieldset>'+
            '</div>');
        $("#fathy").append(proAttributes);
    };
    this.RealTimeAlarmPageFeatures = function(idd) {
        var alarmControlElement = $('#'+idd);
        var dataTable = alarmControlElement.find('.alarmDataShowBox');
        var demoText = $('#exp1'+idd); //属性页标注文字--"文本示例"框
        var demoAlarmText = $('#exp2'+idd); //属性页报警信息--"文本示例"框
        var setNodeObj = $('.alarmHeader'+idd); //表头
        var setNodeObjFontObj = setNodeObj.children('li');
        var fontColor = $('.color'+idd);
        var fontBackground = $('.bg'+idd);
        var alarmFontColor = $('.alarmFont'+idd);
        var alarmColor = $('.alarmColor'+idd);
        var alarmBackground = $('.alarmBg'+idd);
        var alarmMaxNumber = $('.alarmMaxNum'+idd);
        var dataShowBoxO = $('#dataShowBox'+idd);
        var dataShowBox = dataShowBoxO.find('li');
        var dateFormat = $('.dateFormat'+idd);
        var timeFormat = $('.timeFormat'+idd);
        var colorVal;
        var backgroundVal;
        var dataStyle = {};
        //实时告警列表每一个字段
        var date = dataShowBoxO.find('li:nth-child(9n+1)'); //日期
        var time = dataShowBoxO.find('li:nth-child(9n+2)'); //时间
        var variableName = dataShowBoxO.find('li:nth-child(9n+3)'); //变量名
        var description = dataShowBoxO.find('li:nth-child(9n+4)'); //描述
        var alarmInfo = dataShowBoxO.find('li:nth-child(9n+5)'); //报警
        var currentValue = dataShowBoxO.find('li:nth-child(9n+6)'); //当前值
        var priorityLevel = dataShowBoxO.find('li:nth-child(9n+7)'); //优先级
        var event = dataShowBoxO.find('li:nth-child(9n+8)'); //事件
        var response = dataShowBoxO.find('li:nth-child(9n+9)'); //应答
        var currentDate = new Date();
        var fontDecorationO = $('.fontDecoration'+idd).children('li');
        var fontSelect = $('.titleFont'+idd);
        var fontOption = fontSelect.children('option');
        var fontSizeSelect = $('.setFontSize'+idd);
        var fontSizeOption = fontSizeSelect.children('option');
        var DataLiClass;
        var nodeFeatures = { //属性页 标注文字功能
            setFont: function() { //设置字体
                fontSelect.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var _this = $(this);
                    fontOption.each(function() {
                        if (_this.val() === $(this).val()) {
                            $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                            setNodeObj.css('font-family', $(this).val());
                            setNodeObjFontObj.attr('select', $(this).val());
                            demoText.css('font-family', $(this).val());
                            return false;
                        }
                    });
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                });
            },
            setFontSize: function() { //设置字体大小
                fontSizeSelect.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var _this = $(this);
                    fontSizeOption.each(function() {
                        if (_this.val() === $(this).val()) {
                            $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                            setNodeObjFontObj.css('fontSize', parseInt($(this).val() + 'px'));
                            demoText.css('fontSize', parseInt($(this).val() + 'px'));
                            return false;
                        }
                    });
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                });
            },
            setFontShape: function() { //字体装饰
                fontDecorationO.each(function(i) {
                    fontDecorationO.eq(i).bind('click', function() {
                        var beforeLog = inTtCommand.log();
                        webapi.addLog('before',beforeLog);
                        if (i === 0) {
                            setNodeObjFontObj.removeClass('fontWeight fontItalic fontUnderline fontThrough');
                            demoText.removeClass('fontWeight fontItalic fontUnderline fontThrough');
                            fontDecorationO.eq(0).find('img').attr('src', 'images/convention2.png');
                            fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking.png');
                            fontDecorationO.eq(2).find('img').attr('src', 'images/Italic.png');
                            fontDecorationO.eq(3).find('img').attr('src', 'images/underline.png');
                            fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough.png');
                            return false;
                        } if (i === 1) {
                            if (setNodeObjFontObj.hasClass('fontWeight')) {
                                setNodeObjFontObj.removeClass('fontWeight');
                                demoText.removeClass('fontWeight');
                                fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking.png');
                            } else {
                                setNodeObjFontObj.addClass('fontWeight');
                                demoText.addClass('fontWeight');
                                fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking2.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                            }
                            return false;
                        } if (i === 2) {
                            if (setNodeObjFontObj.hasClass('fontItalic')) {
                                setNodeObjFontObj.removeClass('fontItalic');
                                demoText.removeClass('fontItalic');
                                fontDecorationO.eq(2).find('img').attr('src', 'images/Italic.png');
                            } else {
                                setNodeObjFontObj.addClass('fontItalic');
                                demoText.addClass('fontItalic');
                                fontDecorationO.eq(2).find('img').attr('src', 'images/Italic2.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                            }
                            return false;
                        }if (i === 3) {
                            if (setNodeObjFontObj.hasClass('fontUnderline')) {
                                setNodeObjFontObj.removeClass('fontUnderline');
                                demoText.removeClass('fontUnderline fontThrough');
                                fontDecorationO.eq(3).find('img').attr('src', 'images/underline.png');
                            } else {
                                setNodeObjFontObj.addClass('fontUnderline');
                                setNodeObjFontObj.removeClass('fontThrough');
                                demoText.addClass('fontUnderline');
                                fontDecorationO.eq(3).find('img').attr('src', 'images/underline2.png');
                                fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                            }
                            return false;
                        } if (i === 4) {
                            if (setNodeObjFontObj.hasClass('fontThrough')) {
                                setNodeObjFontObj.removeClass('fontThrough');
                                demoText.removeClass('fontUnderline fontThrough');
                                fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough.png');
                            } else {
                                setNodeObjFontObj.addClass('fontThrough');
                                setNodeObjFontObj.removeClass('fontUnderline');
                                demoText.addClass('fontThrough');
                                fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough2.png');
                                fontDecorationO.eq(3).find('img').attr('src', 'images/underline.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                            }
                            return false;
                        }
                        var afterLog = inTtCommand.log();
                        webapi.addLog('after',afterLog);
                    });
                });
            },
            setFontColor: function() { //设置标注字体颜色
                inItPropertiesPage.setColor(fontColor, ['color', setNodeObjFontObj]);
            },
            setBackgroundColor: function() { //设置标注背景颜色
                inItPropertiesPage.setColor(fontBackground, ['background-color', setNodeObjFontObj.parent('ul').parent('div')]);
            },
            initNodeStyle: function() { //初始化
                setInterval(function() {
                    var alarmHeader = alarmControlElement.find('.realTimeAlarm_showMsg');
                    var percent = parseInt(alarmControlElement.height() - alarmHeader) / alarmControlElement.height(); //告警信息占控件高度的比例
                    var alarmDataHeight = parseInt(dataTable.children('ul').length) * parseInt(dataTable.children('ul').height()); //存在告警信息时告警信息的总高度（总个数*每行高度）
                    if (parseInt(dataTable.height()) < alarmDataHeight) {
                        dataTable.height((percent * 100) + '%');
                        $('.alarmHeader'+idd).css({
                            'width': 'calc(100% - 17px)',
                            'float': 'left'
                        });
                        return false;
                    } else {
                        dataTable.css('overflow-y', 'auto');
                        $('.alarmHeader'+idd).css({'width': 100 + '%'});
                    }
                }, 100);
                $(".config_dis"+idd).attr("disabled","true");
            },
            init: function() {
                this.setFont();
                this.setFontSize();
                this.setFontShape();
                this.setFontColor();
                this.setBackgroundColor();
                this.initNodeStyle();
            }
        };
        var alarmFeatures = { //属性页 报警信息功能
            setFont: function() { //设置报警信息字体
                var fontSelect = $('.alarmFontFamily'+idd);
                var fontOption = fontSelect.children('option');
                fontSelect.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var _this = $(this);
                    fontOption.each(function() {
                        if (_this.val() === $(this).val()) {
                            $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                            dataShowBox.css('font-family', $(this).val());
                            demoAlarmText.css('font-family', $(this).val());
                            dataStyle.font = $(this).val();
                            dataShowBoxO.attr('font', $(this).val());
                            alarmControlElement.attr("fontstyle",$(this).val());   
                            return false;
                        }
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setFontSize: function() { //设置报警信息字体大小
                var fontSizeSelect = $('#alarmFontSize'+idd);
                var fontSizeOption = fontSizeSelect.children('option');
                fontSizeSelect.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var _this = $(this);
                    fontSizeOption.each(function() {
                        if (_this.val() === $(this).val()) {
                            $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                            dataShowBox.css('fontSize', parseInt($(this).val() + 'px'));
                            demoAlarmText.css('fontSize', parseInt($(this).val() + 'px'));
                            dataStyle.fontSize = $(this).val();
                            dataShowBoxO.attr('fontSize', $(this).val());
                            alarmControlElement.attr("fontsized",$(this).val());                       
                            return false;
                        }
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setFontShape: function() { //设置报警信息字体装饰
                var fontDecorationO = $('.alarmFontDecoration'+idd).children('li');
                fontDecorationO.each(function(i) {
                    fontDecorationO.eq(i).bind('click', function() {
                        var beforeLog = inTtCommand.log();
                        webapi.addLog('before',beforeLog);
                        if (i === 0) {
                            dataShowBoxO.removeClass('fontWeight fontItalic fontUnderline fontThrough');
                            demoAlarmText.removeClass('fontWeight fontItalic fontUnderline fontThrough');
                            fontDecorationO.eq(0).find('img').attr('src', 'images/convention2.png');
                            fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking.png');
                            fontDecorationO.eq(2).find('img').attr('src', 'images/Italic.png');
                            fontDecorationO.eq(3).find('img').attr('src', 'images/underline.png');
                            fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough.png');
                            alarmControlElement.attr("fontN","yes");
                            return false;
                        } else if (i === 1) {
                            if (dataShowBoxO.hasClass('fontWeight')) {
                                dataShowBoxO.removeClass('fontWeight');
                                demoAlarmText.removeClass('fontWeight');
                                fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking.png');
                                alarmControlElement.attr("fontW","no");
                            } else {
                                dataShowBoxO.addClass('fontWeight');
                                demoAlarmText.addClass('fontWeight');
                                fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking2.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                                alarmControlElement.attr("fontW","yes");
                                alarmControlElement.attr("fontN","no");
                            }
                            return false;
                        } else if (i === 2) {
                            if (dataShowBoxO.hasClass('fontItalic')) {
                                dataShowBoxO.removeClass('fontItalic');
                                demoAlarmText.removeClass('fontItalic');
                                fontDecorationO.eq(2).find('img').attr('src', 'images/Italic.png');
                                alarmControlElement.attr("fontI","no");
                            } else {
                                dataShowBoxO.addClass('fontItalic');
                                demoAlarmText.addClass('fontItalic');
                                fontDecorationO.eq(2).find('img').attr('src', 'images/Italic2.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                                alarmControlElement.attr("fontI","yes");
                                alarmControlElement.attr("fontN","no");
                            }
                            return false;
                        } else if (i === 3) {
                            if (dataShowBoxO.hasClass('fontUnderline')) {
                                dataShowBoxO.removeClass('fontUnderline');
                                demoAlarmText.removeClass('fontUnderline fontThrough');
                                fontDecorationO.eq(3).find('img').attr('src', 'images/underline.png');
                                alarmControlElement.attr("fontU","no");
                            } else {
                                dataShowBoxO.addClass('fontUnderline');
                                demoAlarmText.removeClass('fontThrough');
                                demoAlarmText.addClass('fontUnderline');
                                fontDecorationO.eq(3).find('img').attr('src', 'images/underline2.png');
                                fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                                alarmControlElement.attr("fontU","yes");
                                alarmControlElement.attr("fontN","no");
                            }
                            return false;
                        } else if (i === 4) {
                            if (dataShowBoxO.hasClass('fontThrough')) {
                                dataShowBoxO.removeClass('fontThrough');
                                demoAlarmText.removeClass('fontUnderline fontThrough');
                                fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough.png');
                                alarmControlElement.attr("fontT","no");
                            } else {
                                dataShowBoxO.addClass('fontThrough');
                                dataShowBoxO.removeClass('fontUnderline');
                                demoAlarmText.addClass('fontThrough');
                                fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough2.png');
                                fontDecorationO.eq(3).find('img').attr('src', 'images/underline.png');
                                fontDecorationO.eq(0).find('img').attr('src', 'images/convention.png');
                                alarmControlElement.attr("fontT","yes");
                                alarmControlElement.attr("fontN","no");
                            }
                            return false;
                        }
                        var afterLog = inTtCommand.log();
                        webapi.addLog('after',afterLog);
                    });
                });
            },
            setFontColor: function() { //设置报警信息文字颜色
                alarmFontColor.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    colorVal = $(this).val();
                    dataShowBox.css('color', colorVal);
                    dataStyle.color = colorVal;
                    alarmControlElement.attr("alacolor",$(this).val());
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setAlarmColor: function() { //设置报警颜色，设置后整条报警信息全部信息变色
                alarmColor.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    colorVal = $(this).val();
                    dataShowBox.css('color', colorVal);
                    dataStyle.alarmColor = colorVal;
                    alarmControlElement.attr("alarm_color",$(this).val());
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setBackgroundColor: function() { //设置报警信息背景颜色
                inItPropertiesPage.setColor(alarmBackground, ['background', dataShowBox.parent('ul'), 'background', dataShowBoxO]);
                $(".alarmBg"+idd).bind("change",function(){
                    alarmControlElement.attr("alarbg",$(this).val());
                });
            },
            setDataSize: function() { //设置报警记录上线
                var alarmMaxNum = $('.alarmMaxNum'+idd).val();
                alarmMaxNumber.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if($(this).val() < 0){
                        $(this).val("");
                    }
                    alarmMaxNum = $(this).val();
                    dataShowBoxO.attr('maxNum', alarmMaxNum);
                    alarmControlElement.attr("alarm_limit",$(this).val()); 
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                alarmMaxNumber.bind("keyup",function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if($(this).val() < 0){
                        $(this).val("");
                    }
                    alarmControlElement.attr("alarm_limit",$(this).val());                   
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            initNodeStyle: function() { //初始化
                $.fn.getHexBackgroundColor = function() {
                    var rgb = dataShowBox.css('color');
                    var rgbb = dataShowBox.parent('ul').css('background-color');
                    var rgbbb = $('.alarmColor'+idd).attr('value');
                    alarmFontColor.val(inItPropertiesPage.formatColor(rgb));
                    alarmBackground.val(inItPropertiesPage.formatColor(rgbb));
                    alarmColor.val(rgbbb);
                };
                if (dataShowBoxO.children().length > 0) {
                    $.fn.getHexBackgroundColor();
                }
            },
            c: function(){ //设置添加数据的样式属性
                var callback = function() {
                    dataShowBoxO.children().children().css({"font-family": dataStyle.font, "color": dataStyle.color, "font-size": dataStyle.fontSize + "px"});
                    DataLiClass = dataShowBoxO.attr("class").substr(17, dataShowBoxO.attr("class").length);
                    dataShowBoxO.children().children().removeClass("fontWeight fontItalic fontUnderline fontThrough");
                    dataShowBoxO.children().children().addClass(DataLiClass);
                };
                var mo = new MutationObserver(callback);
                var option = {
                    'childList': true,
                    'subtree': true
                };
                mo.observe(dataShowBoxO[0], option);
            },
            d:function(){
            	$('.alarmMaxNum'+idd).val(  dataShowBoxO.attr('maxNum'));
            	
            },
            init: function() {
                this.setFont();
                this.setFontSize();
                this.setFontShape();
                this.setFontColor();
                this.setAlarmColor();
                this.setBackgroundColor();
                this.setDataSize();
                this.initNodeStyle();
                this.c();
                this.d();
                $(".alarmMaxNum"+idd).val(parseInt(alarmControlElement.attr("alarm_limit")));
                $(".alarmFontFamily"+idd).val(alarmControlElement.attr("fontstyle"));
                $("#alarmFontSize"+idd).val(alarmControlElement.attr("fontsized"));
                $(".alarmFont"+idd).val(alarmControlElement.attr("alacolor"));
                $(".alarmColor"+idd).val(alarmControlElement.attr("alarm_color"));
                $(".alarmBg"+idd).val(alarmControlElement.attr("alarbg"));
                $(".dateFormat"+idd).val(alarmControlElement.attr("datestyle"));
                $(".timeFormat"+idd).val(alarmControlElement.attr("timestyle"));
                $("#dataShowBox"+idd).css("background",alarmControlElement.attr("alarbg"));
            }
        };
        var alarmFormat = { //属性页 报警格式功能
            setDateFormat: function() { //设置日期格式
                var year = currentDate.getFullYear();
                var mouth = currentDate.getMonth() + 1;
                var day = currentDate.getDate();
                var format1 = year + '/' + mouth + '/' + day;
                var format2 = mouth + '/' + day + '/' + year;
                var format3 = year + '-' + mouth + '-' + day;
                var format4 = mouth + '-' + day + '-' + year;
                dateFormat.bind('change',  function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    alarmControlElement.attr("datestyle",$(this).val());     
                    var _this = $(this);
                    dateFormat.children('option').each(function() {
                        if (_this.val() === $(this).val()) {
                            if ($(this).index() === 0) {
                                // date.text(format1);
                                $('#'+idd).attr('dateFormatIndex', 0);
                                $(this).attr('selected', 'selected');
                                $(this).siblings('option').removeAttr('selected');
                                return false;
                            } else if ($(this).index() === 1) {
                                // date.text(format2);
                                $('#'+idd).attr('dateFormatIndex', 1);
                                $(this).attr('selected', 'selected');
                                $(this).siblings('option').removeAttr('selected');
                                return false;
                            } else if ($(this).index() === 2) {
                                // date.text(format3);
                                $('#'+idd).attr('dateFormatIndex', 2);
                                $(this).attr('selected', 'selected');
                                $(this).siblings('option').removeAttr('selected');
                                return false;
                            } else if ($(this).index() === 3) {
                                // date.text(format4);
                                $('#'+idd).attr('dateFormatIndex', 3);
                                $(this).attr('selected', 'selected');
                                $(this).siblings('option').removeAttr('selected');
                                return false;
                            }
                        }
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setTimeFormat : function() { //设置时间格式
                var hour = currentDate.getHours();
                var minute = currentDate.getMinutes();
                var second = currentDate.getSeconds();
                var  millisecond = currentDate.getMilliseconds();
                var format1 = hour + ':' + minute + ':' + second;
                var format2 = hour + ':' + minute + ':' + second + ':' + millisecond;
                timeFormat.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    alarmControlElement.attr("timestyle",$(this).val());     
                    var _this = $(this);
                    timeFormat.children('option').each(function() {
                        if (_this.val() === $(this).val()) {
                            if ($(this).index() === 0) {
                                // time.text(format1);
                                $('#'+idd).attr('timeFormatIndex', 0);
                                return false;
                            } else if ($(this).index() === 1) {
                                // time.text(format2);
                                $('#'+idd).attr('timeFormatIndex', 1);
                                return false;
                            }
                        }
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setCutWidth: function() {
                if (dataShowBoxO.children().length > 0) {
                    $('.leftArrow'+idd).each(function(i) {
                        $(this).bind('click', function() {
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            var textO = $(this).next('.dateShowN'+idd);
                            var headerData = $('.alarmHeader'+idd);
                            var text = parseInt(textO.text());
                            var pw = date.parents('.alarmDataShowBox').width();
                            if (text === 0) {
                                textO.text(0);
                            } else {
                                text = text - 1;
                                textO.text(text);
                                switch (i) {
                                    case 0:
                                        var w1 = date.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (time.width() + w3) / pw * 100;
                                        date.width(w2 + '%');
                                        headerData.children('li:nth-child(1)').width(w2 + '%');
                                        time.width(w4 + '%');
                                        headerData.children('li:nth-child(2)').width(w4 + '%');
                                        break;
                                    case 1:
                                        var w1 = time.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (variableName.width() + w3) / pw * 100;
                                        time.width(w2 + '%');
                                        headerData.children('li:nth-child(2)').width(w2 + '%');
                                        variableName.width(w4 + '%');
                                        headerData.children('li:nth-child(3)').width(w4 + '%');
                                        break;
                                    case 2:
                                        var w1 = variableName.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (description.width() + w3) / pw * 100;
                                        variableName.width(w2 + '%');
                                        headerData.children('li:nth-child(3)').width(w2 + '%');
                                        description.width(w4 + '%');
                                        headerData.children('li:nth-child(4)').width(w4 + '%');
                                        break;
                                    case 3:
                                        var w1 = description.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (alarmInfo.width() + w3) / pw * 100;
                                        description.width(w2 + '%');
                                        headerData.children('li:nth-child(4)').width(w2 + '%');
                                        alarmInfo.width(w4 + '%');
                                        headerData.children('li:nth-child(5)').width(w4 + '%');
                                        break;
                                    case 4:
                                        var w1 = alarmInfo.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (currentValue.width() + w3) / pw * 100;
                                        alarmInfo.width(w2 + '%');
                                        headerData.children('li:nth-child(5)').width(w2 + '%');
                                        currentValue.width(w4 + '%');
                                        headerData.children('li:nth-child(6)').width(w4 + '%');
                                        break;
                                    case 5:
                                        var w1 = currentValue.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (priorityLevel.width() + w3) / pw * 100;
                                        currentValue.width(w2 + '%');
                                        headerData.children('li:nth-child(6)').width(w2 + '%');
                                        priorityLevel.width(w4 + '%');
                                        headerData.children('li:nth-child(7)').width(w4 + '%');
                                        break;
                                    case 6:
                                        var w1 = priorityLevel.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (event.width() + w3) / pw * 100;
                                        priorityLevel.width(w2 + '%');
                                        headerData.children('li:nth-child(7)').width(w2 + '%');
                                        event.width(w4 + '%');
                                        headerData.children('li:nth-child(8)').width(w4 + '%');
                                        break;
                                    case 7:
                                        var w1 = event.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (response.width() + w3) / pw * 100;
                                        event.width(w2 + '%');
                                        headerData.children('li:nth-child(8)').width(w2 + '%');
                                        response.width(w4 + '%');
                                        headerData.children('li:nth-child(9)').width(w4 + '%');
                                        break;
                                    case 8:
                                        var w1 = response.width();
                                        var w2 = (w1 - 1) / pw * 100;
                                        var w3 = w1 - (w1 - 1);
                                        var w4 = (date.width() + w3) / pw * 100;
                                        response.width(w2 + '%');
                                        headerData.children('li:nth-child(9)').width(w2 + '%');
                                        date.width(w4 + '%');
                                        headerData.children('li:nth-child(1)').width(w4 + '%');
                                        break;
                                    default :
                                        break;
                                }
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                        });
                    });
                }
            },
            setAddWidth: function() {
                if (dataShowBoxO.children().length > 0) {
                    $('.rightArrow'+idd).each(function(i) {
                        $(this).bind('click', function() {
                            var beforeLog = inTtCommand.log();
                            webapi.addLog('before',beforeLog);
                            var textO = $(this).prev('.dateShowN'+idd);
                            var headerData = $('.alarmHeader'+idd);
                            var text = parseInt(textO.text());
                            var pw = date.parents('.alarmDataShowBox').width();
                            if (text === 10) {
                                textO.text(10);
                            } else {
                                text = text + 1;
                                textO.text(text);
                                switch (i) {
                                    case 0:
                                        var w1 = date.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (time.width() + w3) / pw * 100;
                                        date.width(w2 + '%');
                                        headerData.children('li:nth-child(1)').width(w2 + '%');
                                        time.width(w4 + '%');
                                        headerData.children('li:nth-child(2)').width(w4 + '%');
                                        break;
                                    case 1:
                                        var w1 = time.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (variableName.width() + w3) / pw * 100;
                                        time.width(w2 + '%');
                                        headerData.children('li:nth-child(2)').width(w2 + '%');
                                        variableName.width(w4 + '%');
                                        headerData.children('li:nth-child(3)').width(w4 + '%');
                                        break;
                                    case 2:
                                        var w1 = variableName.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (description.width() + w3) / pw * 100;
                                        variableName.width(w2 + '%');
                                        headerData.children('li:nth-child(3)').width(w2 + '%');
                                        description.width(w4 + '%');
                                        headerData.children('li:nth-child(4)').width(w4 + '%');
                                        break;
                                    case 3:
                                        var w1 = description.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (alarmInfo.width() + w3) / pw * 100;
                                        description.width(w2 + '%');
                                        headerData.children('li:nth-child(4)').width(w2 + '%');
                                        alarmInfo.width(w4 + '%');
                                        headerData.children('li:nth-child(5)').width(w4 + '%');
                                        break;
                                    case 4:
                                        var w1 = alarmInfo.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (currentValue.width() + w3) / pw * 100;
                                        alarmInfo.width(w2 + '%');
                                        headerData.children('li:nth-child(5)').width(w2 + '%');
                                        currentValue.width(w4 + '%');
                                        headerData.children('li:nth-child(6)').width(w4 + '%');
                                        break;
                                    case 5:
                                        var w1 = currentValue.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (priorityLevel.width() + w3) / pw * 100;
                                        currentValue.width(w2 + '%');
                                        headerData.children('li:nth-child(6)').width(w2 + '%');
                                        priorityLevel.width(w4 + '%');
                                        headerData.children('li:nth-child(7)').width(w4 + '%');
                                        break;
                                    case 6:
                                        var w1 = priorityLevel.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (event.width() + w3) / pw * 100;
                                        priorityLevel.width(w2 + '%');
                                        headerData.children('li:nth-child(7)').width(w2 + '%');
                                        event.width(w4 + '%');
                                        headerData.children('li:nth-child(8)').width(w4 + '%');
                                        break;
                                    case 7:
                                        var w1 = event.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (response.width() + w3) / pw * 100;
                                        event.width(w2 + '%');
                                        headerData.children('li:nth-child(8)').width(w2 + '%');
                                        response.width(w4 + '%');
                                        headerData.children('li:nth-child(9)').width(w4 + '%');
                                        break;
                                    case 8:
                                        var w1 = response.width();
                                        var w2 = (w1 + 1) / pw * 100;
                                        var w3 = w1 - (w1 + 1);
                                        var w4 = (date.width() + w3) / pw * 100;
                                        response.width(w2 + '%');
                                        headerData.children('li:nth-child(9)').width(w2 + '%');
                                        date.width(w4 + '%');
                                        headerData.children('li:nth-child(1)').width(w4 + '%');
                                        break;
                                    default :
                                        break;
                                }
                            }
                            var afterLog = inTtCommand.log();
                            webapi.addLog('after',afterLog);
                        });
                    });
                }
            },
            init: function() {
                this.setDateFormat();
                this.setTimeFormat();
                this.setCutWidth();
                this.setAddWidth();
            }
        };
        var alarmInit = {
            nodeInit: function() { //初始化属性页字体装饰
                if (setNodeObjFontObj.hasClass('fontWeight')) {
                    fontDecorationO.eq(1).find('img').attr('src', 'images/overstriking2.png');
                    demoText.addClass('fontWeight');
                }if (setNodeObjFontObj.hasClass('fontItalic')) {
                    fontDecorationO.eq(2).find('img').attr('src', 'images/Italic2.png');
                    demoText.addClass('fontItalic');
                }if (setNodeObjFontObj.hasClass('fontUnderline')) {
                    fontDecorationO.eq(3).find('img').attr('src', 'images/underline2.png');
                    demoText.addClass('fontUnderline');
                }if (setNodeObjFontObj.hasClass('fontThrough')) {
                    fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough2.png');
                    demoText.addClass('fontThrough');
                }
                fontOption.each(function() { //初始化属性页字体
                    if ($(this).val() === setNodeObjFontObj.attr('select')) {
                        $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                        demoText.css('font-family', $(this).val());
                        return false;
                    }
                });
                fontSizeOption.each(function() { //初始化属性页字体大小展示
                    if ($(this).val === parseInt(setNodeObjFontObj.css('font-size'))) {
                        $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                        demoText.css('fontSize', parseInt($(this).val() + 'px'));
                    }
                });
                $.fn.getHexBackgroundColor = function() { //初始化属性页字体颜色和背景色
                    var rgb = setNodeObjFontObj.css('color');
                    var rgbb = setNodeObjFontObj.parent('ul').parent('div').css('background-color');
                    fontColor.val(inItPropertiesPage.formatColor(rgb));
                    fontBackground.val(inItPropertiesPage.formatColor(rgbb));
                };
                $.fn.getHexBackgroundColor();
            },
            realTimeAlarmInit: function() { //初始化实时报警信息
                var fontSelect = $('.alarmFontFamily'+idd);
                var fontOption = fontSelect.children('option');
                var fontSizeSelect = $('.alarmFontSize'+idd);
                var fontSizeOption = fontSizeSelect.children('option');
                var fontDecorationO = $('.alarmFontDecoration'+idd).children('li');
                if(dataShowBoxO.hasClass('fontWeight')) {
                    fontDecorationO.eq(1).find('img').attr('src' ,'images/overstriking2.png');
                    demoAlarmText.addClass('fontWeight');
                }if(dataShowBoxO.hasClass('fontItalic')) {
                    fontDecorationO.eq(2).find('img').attr('src', 'images/Italic2.png');
                    demoAlarmText.addClass('fontItalic');
                }if(dataShowBoxO.hasClass('fontUnderline')) {
                    fontDecorationO.eq(3).find('img').attr('src', 'images/underline2.png');
                    demoAlarmText.addClass('fontUnderline');
                }if(dataShowBoxO.hasClass('fontThrough')) {
                    fontDecorationO.eq(4).find('img').attr('src', 'images/strikethrough2.png');
                    demoAlarmText.addClass('fontThrough');
                }
                fontOption.each(function() {
                    if($(this).val() === dataShowBoxO.attr('font')) {
                        $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                        demoAlarmText.css('font-family', $(this).val());
                        return false;
                    }
                });
                fontSizeOption.each(function() {
                    if($(this).val() === dataShowBoxO.attr('fontSize')){
                        $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                        demoAlarmText.css('fontSize', parseInt($(this).val()) + 'px');
                        return false;
                    }
                });
            },
            init: function() {
                this.nodeInit();
                this.realTimeAlarmInit();
            }
        };
        nodeFeatures.init();
        alarmFeatures.init();
        alarmFormat.init();
        alarmInit.init();
        //仅限未确认告警
        var buttonOff = true;
        $('.unconfirmed'+idd).off('mousedown').on('mousedown', function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if (buttonOff) {
                $('#'+idd).attr('unconfirmed', 'unconfirmed');
                $('.unconfirmed'+idd).attr('src', 'images/option_checked.png');
            } else {
                $('#'+idd).removeAttr('unconfirmed');
                $('.unconfirmed'+idd).removeAttr('selected');
                $('.unconfirmed'+idd).attr('src', 'images/option_unchecked.png');
            }
            buttonOff = !buttonOff;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        //优先级别选择
        var levelSelect = $('.option');
        var levelOption = levelSelect.children('option');
        levelSelect.bind('change', function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var _this = $(this);
            levelOption.each(function() {
                if (_this.val() === $(this).val()) {
                    $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                    $('#'+idd).attr('priorityLeveladd', $(this).val());
                    return false;
                }
            });
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        //应答预留接口
        this.response = function() {
            $('.alarmDataShowList'+idd).children('li').last('li').click(function() {
                //实时告警信息应答点击事件
            });
        };
        /*fontstyle="Microsoft YaHei" timestyle="hh:mm:ss" datestyle="yy/mm/dd" fontsized="10" alarm_limit="1024" alarbg="#ffffff" alarm_color="#ff0000" alacolor="#ff0000"*/
        this.copy = function(srcId, desId) {
            var srcElement = $('#'+srcId);
            var desElement = $('#'+desId);
            var srcAlarmHeader = srcElement.find('.alarmHeader').children('li');
            var desAlarmHeader = desElement.find('.alarmHeader').children('li');
            var height = srcElement.height();
            var width = srcElement.width();
            var srcAlarmHeaderClass = srcAlarmHeader.attr('class');
            var srcElementClass = srcElement.attr('class');
            var srcFont = srcAlarmHeader.attr('select');
            var srcFontSize = srcAlarmHeader.css('font-size');
            var srcBackground = srcAlarmHeader.parent('ul').parent('div').css('background');
            var srcColor = srcAlarmHeader.css('color');
            var init_1 = srcElement.attr("fontstyle");
            var init_2 = srcElement.attr("timestyle");
            var init_3 = srcElement.attr("datestyle");
            var init_4 = srcElement.attr("fontsized");
            var init_5 = srcElement.attr("alarm_limit");
            var init_6 = srcElement.attr("alarbg");
            var init_7 = srcElement.attr("alarm_color");
            var init_8 = srcElement.attr("alacolor");
            desElement.css({
                'height': height + 'px',
                'width': width + 'px'
            }).addClass(srcElementClass);
            desAlarmHeader.css({
                'font-size': srcFontSize,
                'color': srcColor
            }).addClass(srcAlarmHeaderClass).attr('select', srcFont);
            desElement.attr("fontstyle",init_1).attr("timestyle",init_2).attr("datestyle",init_3).attr("fontsized",init_4).attr("alarm_limit",init_5).attr("alarbg",init_6).attr("alarm_color",init_7).attr("alacolor",init_8);
            desAlarmHeader.parent('ul').css({
                'font-family': srcFont
            });
            desAlarmHeader.parent('ul').parent('div').css({'background': srcBackground});
        }
    };
};
/*********图表控件**********/
var Chart = function() {
    this.configId = -1;
    this.createChartControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.chartElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Chart_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move" chartbg="#ffffff" DataType="1,2" chart_font_type="1" chart_font_XY="1" chart_font_x-y="1" chart_font_annot="1" chart_size_type="7" chart_size_XY="12" chart_size_x-y="12" chart_size_annot="12" chartsele="1" chartborder="true" chartAnnotatedcolor="#333333" chartlegend="#333333" chartlegendy="true" charttitle="图表标题" charttitley="图表标题" charttitlecolor="#333333" chartshowtitle="true" chartdata="数据" chartdatay="数据" chartdatacolor="#333333" chartshowdata="true" charttime="时间" charttimey="时间" charttimecolor="#333333" chartshowtime="true" chartfonttype="title" chartinter="1"></div>');
        var txt = $('<div id="canvasDiv'+idd+'" class="canvasDiv'+idd+'"></div><div id="chartdata-'+idd+'" class="chartdata chartdata'+idd+'"></div><div class="charttime charttime'+idd+'"></div>');
        txt.appendTo(textdiv);
        textdiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 600 + "px",
            "height": 300 + "px"
        });
        $("#canvasDiv"+idd).css({
            "width": 100 + "%",
            "height": 100+ "%",
            "overflow":"hidden",
            "border":"none",
            "box-sizing":"border-box"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesChartPage(selecteId);
        inItPropertiesPage.PublicFeatures(selecteId);
        this.ChartPropertiesPage(selecteId);
        this.ChartPageFeatures(selecteId);
        this.mousedown(selecteId);
        this.FontPage(selecteId);
        this.FontFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.ChartPropertiesPage = function(idd){
        var chartBTn = $('<div id="tc3'+idd+'" class="tc33"></div>');
        $("#right"+idd).siblings("p.page").remove();
        $("#fathy").append(chartBTn);
        var chartHtml ='<fieldset class="line_attr1 chartfonty">'+
            '<legend class="rotateb">常规</legend>'+
            '<div>背景颜色<input class="chartcool chartbgcolor chartbgcolor'+idd+'" type="color"/></div>'+
            '<div>栏数<input class="chartgrid chartgrid'+idd+'" type="number" disabled></div>'+
            '<div>刷新时间间隔 (秒)<input class="charttime charttimer'+idd+'"  min="1" id="charttimer'+idd+'"  type="number" value="1"></div>'+
            '<div class="chartshowannot">'+
            '<label id="radio4" class="chartlab lf rotatepointer chartlegend'+idd+'">'+
            '<span class="lf chartspan">显示图例</span><p class="lf chart11 chartlegen'+idd+'"></p>'+
            '</label>'+
            '</div>'+
            '<div>坐标刻度<input class="chartcool chartxy chartxy'+idd+'" type="color"></div>'+
            '<div>图例<input class="chartcool chartAnnotated chartAnnotated'+idd+'" type="color"></div>'+
            '<div class="chartshowannot">'+
            '<label id="radio4" class="lf chartlab rotatepointer chartlabel'+idd+'">'+
            '<span class="lf chartspan">显示边框</span><p class="lf  chart11 chartborder'+idd+'"></p>'+
            '</label>'+
            '</div>'+
            '<div>图表风格选择</div>'+
            '<select class="chartsele chartsele'+idd+'">' +
            '<option value="1">2D垂直条图</option>' +
            '<option value="2">2D水平条图</option>' +
            '<option value="3">折线图</option>' +
            '<option value="4">3D立方图</option>' +
            '<option value="5">2D饼图</option>' +
            '<option value="6">3D饼图</option>' +
            '<option value="7">面积图</option>' +
            '</select>' +
            '</fieldset>'+
            '<fieldset class="line_attr1">'+
            '<legend class="rotateb">图表标题</legend>'+
            '<div>' +
            '<div class="chart_1  chart_11">内容<input class="charttitle charttitle'+idd+'" type="text"></div>'+
            '<div class="chart_1 chart_11">颜色<input class="chartcool chartitlecolor chartitlecolor'+idd+'" type="color"></div>'+
            '<label id="radio4" class="lf chartlab rotatepointer chartshowtitle'+idd+'">'+
            '<span class="lf chartspan">显示</span><div class="rt chart11 chartshow'+idd+'"></div>'+
            '</label>'+
            '</div>'+
            '</fieldset>'+
            '<fieldset class="line_attr1">'+
            '<legend class="rotateb">数据标题</legend>'+
            '<div>' +
            '<div class="chart_1 chart_22">内容<input class="chartdata chartdata'+idd+'" type="text"></div>'+
            '<div class="chart_1 chart_22">颜色<input class="chartcool chartdatacolor chartdatacolor'+idd+'" type="color"></div>'+
            '<label id="radio4" class="lf chartlab rotatepointer chartshowdata'+idd+'">'+
            '<span class="lf chartspan">显示</span><div class="rt chart11 chartshowdate'+idd+'"></div>'+
            '</label>'+
            '</div>'+
            '</fieldset>'+
            '<fieldset class="line_attr1">'+
            '<legend class="rotateb">时间标题</legend>'+
            '<div>' +
            '<div class="chart_1 chart_33">内容<input class="charttime charttime'+idd+'" type="text"></div>'+
            '<div class="chart_1 chart_33">颜色<input class="chartcool charttimecolor charttimecolor'+idd+'" type="color"></div>'+
            '<label id="radio4" class="lf chartlab rotatepointer chartshowtime'+idd+'">'+
            '<span class="lf chartspan">显示</span><div class="rt chart11 chartshowtimed'+idd+'"></div>'+
            '</label>'+
            '</div>'+
            '</fieldset>';
        $(".tc33").append(chartHtml);
    };
    var chartVertical;//2D垂直条图
    var chartLevel;//2D水平条图
    var chartPolyline;//折线图
    var chartCube;//3D立方图
    var chartPie;//2D饼图
    var chart3Dpie;//3D饼图
    var chartArea;//面积图
    var _width;
    var _height;
    var chartsele;//图表类型控制
    var chartshowborder = false;//显示边框控制
    var chartshowlegend = true;//显示图例控制
    var chartshowlegendy = true;//显示图例控制
    var chartshowtitle = true;//显示标题
    var chartshowdata = true;//显示数据标题
    var chartshowtime = true;//显示数据标题
    var chartfonttitle = "Microsoft YaHei";
    var chartfontXY = "Microsoft YaHei";
    var chartfontxy = "Microsoft YaHei";
    var chartannot = "Microsoft YaHei";
    var chartsizetitle = 18;
    var chartsizeXY = 12;
    var chartsizexy = 12;
    var chartsizeannot = 12;
    var chart_type;//图表类型
    this.ChartPageFeatures = function(idd) {
        /*========刷新输入验证=============*/
        $(".charttimer"+idd).unbind("keyup").bind("keyup", function () {
            if(!/^[-]?[0-9]*\.?[0-9]+(eE?[0-9]+)?$/.test($(".charttimer"+idd).val())){
                $(".charttimer"+idd).val("");
                return false;
            };
        });
        /***********刷新时间间隔********/
        $(".charttimer"+idd).val($("#"+idd).attr("chartinter"));
        $(".charttimer"+idd).change(function(){
            var chartinter = $(this).val();
            $("#"+idd).attr("chartinter",chartinter);
        });
        var chartAnnotatedcolor = $("#"+idd).attr("chartAnnotatedcolor");//坐标文本颜色
        var chartlegend = $("#"+idd).attr("chartlegend");//图例文本颜色
        chartsele = $('#'+idd).attr("chartsele");
        /**************垂直条形图表绘制***************/
        //定义数据
        var date = [
            {
                name : '',
                value:[0,0,0,0,0,0],
                color:'#000'
            },
            {
                name : '',
                value:[0,0,0,0,0,0],
                color:'#000'
            },
            {
                name : '',
                value:[0,0,0,0,0,0],
                color:'#000'
            }
        ];
        /*****横坐标数据*******/
        var label = ["","","","","",""];
        /********纵坐标数据**********/
        var start_axisY = 0;
        var end_axisY = 100;
        var axisY_space = 10;
        var cft = $("#"+idd).attr("chart_font_type");
        var cfX = $("#"+idd).attr("chart_font_XY");
        var cfx = $("#"+idd).attr("chart_font_x-y");
        var cfa = $("#"+idd).attr("chart_font_annot");
        if(cft === "1"){
            chartfonttitle = "Microsoft YaHei";
        }
        if(cft === "2"){
            chartfonttitle = "KaiTi";
        }
        if(cft === "3"){
            chartfonttitle = "SimHei";
        }
        if(cft === "4"){
            chartfonttitle = "SimSun";
        }
        if(cft === "5"){
            chartfonttitle = "NSimSun";
        }
        if(cft === "6"){
            chartfonttitle = "FangSong";
        }
        if(cft === "7"){
            chartfonttitle = "LiSu";
        }
        if(cft === "8"){
            chartfonttitle = "YouYuan";
        }

        if( cfX === "1"){
            chartfontXY = "Microsoft YaHei";
        }
        if( cfX === "2"){
            chartfontXY = "KaiTi";
        }
        if( cfX === "3"){
            chartfontXY = "SimHei";
        }
        if( cfX === "4"){
            chartfontXY = "SimSun";
        }
        if( cfX === "5"){
            chartfontXY = "NSimSun";
        }
        if( cfX === "6"){
            chartfontXY = "FangSong";
        }
        if( cfX === "7"){
            chartfontXY = "LiSu";
        }
        if( cfX === "8"){
            chartfontXY = "YouYuan";
        }

        if( cfx === "1"){
            chartfontxy = "Microsoft YaHei";
        }
        if( cfx === "2"){
            chartfontxy = "KaiTi";
        }
        if( cfx === "3"){
            chartfontxy = "SimHei";
        }
        if( cfx === "4"){
            chartfontxy = "SimSun";
        }
        if( cfx === "5"){
            chartfontxy = "NSimSun";
        }
        if( cfx === "6"){
            chartfontxy = "FangSong";
        }
        if( cfx === "7"){
            chartfontxy = "LiSu";
        }
        if( cfx === "8"){
            chartfontxy = "YouYuan";
        }

        if( cfa === "1"){
            chartannot = "Microsoft YaHei";
        }
        if( cfa === "2"){
            chartannot = "KaiTi";
        }
        if( cfa === "3"){
            chartannot = "SimHei";
        }
        if( cfa === "4"){
            chartannot = "SimSun";
        }
        if( cfa === "5"){
            chartannot = "NSimSun";
        }
        if( cfa === "6"){
            chartannot = "FangSong";
        }
        if( cfa === "7"){
            chartannot = "LiSu";
        }
        if( cfa === "8"){
            chartannot = "YouYuan";
        }
        var chartsizetitle_ = $("#"+idd).attr("chart_size_type");
        var chartsizeXY_ = $("#"+idd).attr("chart_size_XY");
        var chartsizexy_ = $("#"+idd).attr("chart_size_x-y");
        var chartsizeannot_ = $("#"+idd).attr("chart_size_annot");
        switch(chartsizetitle_){
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
                default:false;
        }
        switch( chartsizeXY_){
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
                default:false; 
        }
        switch( chartsizexy_){
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
                default:false; 
        }
        switch( chartsizeannot_){
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
                default:false; 
        } 
        /****************默认垂直条形图*********************/
        chartVertical = function(){
            var chartcolorval = $("#"+idd).attr("chartbg");
            var chart_data = $("#"+idd).attr("chartdata");
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");
            var chartdatacolor = $("#"+idd).attr("chartdatacolor");
            var chart_time = $("#"+idd).attr("charttime");
            var charttimecolor = $("#"+idd).attr("charttimecolor");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var canvasDiv = "canvasDiv"+idd+"";
            var grid = label.length;
            $(".chartgrid"+idd).val(label.length);
            var chartvertical = new iChart.ColumnMulti2D({
                render : canvasDiv,
                data: date,
                labels:label,
                label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600,
                    textAlign:'right',
                    textBaseline:'middle',
                    rotate:-20
                   },
                title:{
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    text:chart_title,
                    color:charttitlecolor
                },
                width : _width,
                height : _height,
                background_color: chartcolorval,
                border : {
                    enable : false
                },
                legend:{
                    enable:chartshowlegendy,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    color:chartlegend,
                    background_color : null,
                    border:{
                        enable:false
                    }
                },
                offsetx:-30,
                offsety:-10,
                coordinate:{
                    scale:[{
                        position:'left',
                        start_scale:start_axisY,
                        end_scale:end_axisY,
                        scale_space:axisY_space,
                        scale_width:5,
                        scaleAlign:'left',
                        label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600}
                    }],
                    width:_width-180,
                    height:_height-130,
                    grids:{
                        vertical:{
                            way:'share_alike',
                            value:grid//栏数
                        }
                    },
                    gridVStyle:{
                        solid:false,
                        size:5,
                        fator:0.5
                    },
                    gridHStyle:{
                        solid:false,
                        size:5,
                        fator:0.5 
                    }
                }
            });
            chartvertical.plugin(new iChart.Custom({
                drawFn:function(){
                    //计算位置
                    var coo = chartvertical.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                    //在左上侧的位置，渲染一个单位的文字
                    chartvertical.target.textAlign('start')
                        .textBaseline('bottom')
                        .textFont('600 '+chartsizeXY+'px '+chartfontXY+'')
                        .fillText(chart_data,x,y-5,false,chartdatacolor)
                        .textBaseline('top')
                        .fillText(chart_time,x+w+10,y+h-15,false,charttimecolor);
                }
            }));
            //调用绘图方法开始绘图
            chartvertical.draw();
        };
        chartLevel = function(){
            var chartdatacolor = $("#"+idd).attr("chartdatacolor");
            var chart_data = $("#"+idd).attr("chartdata");
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");
            var chart_time = $("#"+idd).attr("charttime");
            var charttimecolor = $("#"+idd).attr("charttimecolor");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var chartcolorval = $("#"+idd).attr("chartbg");
            var canvasDiv = "canvasDiv"+idd+"";
            var grid = (end_axisY-start_axisY)/10;
            $(".chartgrid"+idd).val(grid);
            var chartlevel = new iChart.BarMulti2D({
                render : canvasDiv,
                data: date,
                labels:label,
                label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600},
                title : {
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    text:chart_title,
                    color:charttitlecolor
                },
                width : _width,
                height : _height,
                background_color: chartcolorval,
                border : {
                    enable : false
                },
                offsetx:-25,
                legend:{
                    enable:chartshowlegendy,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    color:chartlegend,
                    background_color : null,
                    border : {
                        enable : false
                    }
                },
                coordinate:{
                    scale:[{
                        position:'bottom',
                        start_scale:start_axisY,
                        end_scale:end_axisY,
                        scale_space:axisY_space,
                        label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600,textAlign:'right',
                            textBaseline:'middle',
                            rotate:-20
                        }
                    }],
                    background_color : null,
                    axis : {
                        width : 0
                    },
                    width:_width-200,
                    height:_height-120,
                    grids:{
                        vertical:{
                            way:'share_alike',
                            value:grid//栏数
                        }
                    }
                }
            });
            chartlevel.plugin(new iChart.Custom({
                drawFn:function(){
                    //计算位置
                    var coo = chartlevel.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                    //在左上侧的位置，渲染一个单位的文字
                    chartlevel.target.textAlign('start')
                        .textBaseline('bottom')
                        .textFont('600 '+chartsizeXY+'px '+chartfontXY+'')
                        .fillText(chart_time,x,y,false,chartdatacolor)
                        .textBaseline('top')
                        .fillText(chart_data,x+w+15,y+h-10,false,charttimecolor);
                }
            }));
            chartlevel.draw();
        };
        chartPolyline = function(){
            var chartdatacolor = $("#"+idd).attr("chartdatacolor");
            var chart_data = $("#"+idd).attr("chartdata");
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");
            var chartcolorval = $("#"+idd).attr("chartbg");
            var chart_time = $("#"+idd).attr("charttime");
            var charttimecolor = $("#"+idd).attr("charttimecolor");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var grid = label.length - 1;
            $(".chartgrid"+idd).val(grid);
            var flow=[];
            for(var i=0;i<21;i++){
                flow.push(Math.floor(Math.random()*(30+((i%12)*5)))+10);
            }
            var floww = [];
            for(var i=0;i<21;i++){
                floww.push(Math.floor(Math.random()*(30+((i%12)*5)))+10);
            }
            var canvasDiv = "canvasDiv"+idd+"";
            var chartpolyline = new iChart.LineBasic2D({
                render : canvasDiv,
                data: date,
                background_color: chartcolorval,
                align:'center',
                title : {
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    text:chart_title,
                    color:charttitlecolor
                },//设置标题
                width : _width,
                height : _height,
                border : {
                    enable : false
                },
                sub_option:{
                    smooth : true,//平滑曲线
                    point_size:8
                },
                tip:{
                    enable:true,
                    shadow:true,
                    listeners:{
                        //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
                        parseText:function(tip,name,value,text,i){
                            return "<div style='width:130px;height:20px;text-align: center;line-height: 20px;'><span style='color:#005268;font-size:12px;'>"+name+":&nbsp;</span><span style='color:#005268;font-size:16px;'>"+value+"</span></div>";
                        }
                    }
                },
                legend:{
                    enable:chartshowlegendy,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    color:chartlegend
                },
                crosshair:{
                    enable:true,
                    line_color:'#62bce9'
                },
                offsetx:-40,
                offsety:-20,
                coordinate:{
                    width:_width-200,
                    valid_width:_width-200,
                    height:_height-130,
                    axis:{
                        color:'#9f9f9f',
                        width:[0,0,2,2]
                    },
                    grids:{
                        vertical:{
                            way:'share_alike',
                            value:grid//栏数
                        }
                    },
                    scale:[{
                        position:'left',
                        start_scale:start_axisY,
                        end_scale:end_axisY,
                        scale_space:axisY_space,
                        scale_size:2,
                        scale_color:'#9f9f9f',
                        label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600}
                    }, {
                        position:'bottom',
                        labels:label,
                        label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600,textAlign:'right',
                            textBaseline:'middle',
                            rotate:-20
                        }
                    }]
                }
            });
            chartpolyline.plugin(new iChart.Custom({
                drawFn:function(){
                    //计算位置
                    var coo = chartpolyline.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                    //在左上侧的位置，渲染一个单位的文字
                    chartpolyline.target.textAlign('start')
                        .textBaseline('bottom')
                        .textFont('600 '+chartsizeXY+'px '+chartfontXY+'')
                        .fillText(chart_data,x,y-5,false,chartdatacolor)
                        .textBaseline('top')
                        .fillText(chart_time,x+w+15,y+h-10,false,charttimecolor);
                }
            }));
            chartpolyline.draw();
        };
        chartCube = function(){
            var chartdatacolor = $("#"+idd).attr("chartdatacolor");
            var chart_data = $("#"+idd).attr("chartdata");
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");
            var chart_time = $("#"+idd).attr("charttime");
            var charttimecolor = $("#"+idd).attr("charttimecolor");
            var chartcolorval = $("#"+idd).attr("chartbg");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var canvasDiv = "canvasDiv"+idd+"";
            var grid = (end_axisY-start_axisY)/10;
            $(".chartgrid"+idd).val(grid);
            var chartcube = new iChart.ColumnMulti3D({
                render : canvasDiv,
                data: date,
                labels:label,
                title : {
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    text : chart_title,
                    color : charttitlecolor
                },
                width : _width,
                height : _height,
                background_color : chartcolorval,
                border : {
                    enable : false
                },
                legend:{
                    enable:chartshowlegendy,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    background_color : null,
                    align : 'center',
                    valign : 'bottom',
                    color:chartlegend,
                    row:1,
                    column:'max',
                    border : {
                        enable : false
                    }
                },
                column_width : 8,//柱形宽度
                zScale:8,//z轴深度倍数
                xAngle : 50,
                bottom_scale:1.1,
                label:{
                    color:chartAnnotatedcolor,
                    font:chartfontxy,
                    fontsize:chartsizexy,
                    fontweight:600,
                    textAlign:'right',
                    textBaseline:'middle',
                    rotate:-20
                },
                sub_option:{
                    label :false
                },
                tip:{
                    enable :true,
                    listeners:{
                        //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
                        parseText:function(tip,name,value,text,i){
                            return "<div style='width:130px;height:20px;text-align: center;line-height: 20px;'><span style='color:#005268;font-size:12px;'>"+name+":&nbsp;</span><span style='color:#005268;font-size:16px;'>"+value+"</span></div>";
                        }
                    }
                },
                text_space : 16,//坐标系下方的label距离坐标系的距离。
                offsetx:-20,
                offsety:-20,
                coordinate:{
                    background_color : '#d7d7d5',
                    grid_color : '#a4a4a2',
                    color_factor : 0.24,
                    board_deep:10,
                    offsety:-10,
                    pedestal_height:10,
                    left_board:false,//取消左侧面板
                    width:_width-120,
                    height:_height-140,
                    scale:[{
                        position:'left',
                        start_scale:start_axisY,
                        end_scale:end_axisY,
                        scale_space:axisY_space,
                        scale_enable : false,
                        label:{
                            font:chartfontxy,
                            color:chartAnnotatedcolor,
                            fontsize:chartsizexy,
                            fontweight:600
                        }
                    }]
                }
            });
            //利用自定义组件构造左侧说明文本
            chartcube.plugin(new iChart.Custom({
                drawFn:function(){
                    //计算位置
                    var coo = chartcube.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                    //在左上侧的位置，渲染一个单位的文字
                    chartcube.target.textAlign('start')
                        .textBaseline('bottom')
                        .textFont('600 '+chartsizeXY+'px '+chartfontXY+'')
                        .fillText(chart_data,x+18,y-20,false,chartdatacolor)
                        .textBaseline('top')
                        .fillText(chart_time,x+w+10,y+h,false,charttimecolor);
                }
            }));
            chartcube.draw();
        };
        chartPie = function(){
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");          
            var chartcolorval = $("#"+idd).attr("chartbg");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var canvasDiv = "canvasDiv"+idd+"";
            $(".chartgrid"+idd).val("");
            var chartpie = new iChart.Pie2D({
                render : canvasDiv,
                data: date,
                background_color : chartcolorval,
                border : {
                    enable : false
                },
                title : {
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    text:chart_title,
                    color:charttitlecolor
                },
                offsetx:-20,
                legend : {
                    enable:chartshowlegendy,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    color:chartlegend,
                    padding:8
                },
                showpercent:true,
                decimalsnum:2,
                width : _width,
                height : _height,
                radius:140
            });
            chartpie.draw();
        };
        chart3Dpie = function(){
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");           
            var chartcolorval = $("#"+idd).attr("chartbg");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var canvasDiv = "canvasDiv"+idd+"";
            $(".chartgrid"+idd).val("");
            var chart3dpie = new iChart.Pie3D({
                render : canvasDiv,
                title:{
                    text:chart_title,
                    color:charttitlecolor,
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    height:40,
                    border:{
                        enable:true,
                        width:[0,0,2,0],
                        color:'#343b3e'
                    }
                },
                padding:'2 10',
                width : _width,
                height : _height,
                data:date,
                background_color : chartcolorval,
                border : {
                    enable : false
                },
                offsety:10,
                shadow:true,
                shadow_color:'#15353a',
                shadow_blur:8,
                gradient:true,
                color_factor:0.28,
                gradient_mode:'RadialGradientOutIn',
                showpercent:true,
                decimalsnum:2,
                legend:{
                    enable:chartshowlegendy,
                    padding:10,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    color:chartlegend,
                    border:{
                        width:[0,0,0,2],
                        color:'#343b3e'
                    },
                    background_color : null
                },
                sub_option:{
                    offsetx:-40,
                    border:{
                        enable:false
                    },
                    label : {
                        background_color:'#fefefe',
                        sign:false,//设置禁用label的小图标
                        line_height:10,
                        padding:4,
                        border:{
                            enable:true,
                            radius : 4,//圆角设置
                            color:'#458fc8'
                        },
                        fontsize:chartsizexy,
                        fontweight:600,
                        color : '#444444'
                    }
                }
            });
            chart3dpie.bound(0);
        };
        chartArea = function(){
            var chart_data = $("#"+idd).attr("chartdata");
            var chartdatacolor = $("#"+idd).attr("chartdatacolor");
            var chart_title = $("#"+idd).attr("charttitle");
            var charttitlecolor = $("#"+idd).attr("charttitlecolor");
            var chart_time = $("#"+idd).attr("charttime");
            var charttimecolor = $("#"+idd).attr("charttimecolor");
            var chartcolorval = $("#"+idd).attr("chartbg");
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            var canvasDiv = "canvasDiv"+idd+"";
            var grid = (end_axisY-start_axisY)/10;
            $(".chartgrid"+idd).val(grid);
            var chartarea = new iChart.Area2D({
                render : canvasDiv,
                data: date,
                title : {
                    font:chartfonttitle,
                    fontsize:chartsizetitle,
                    text:chart_title,
                    color:charttitlecolor
                },
                width : _width,
                height : _height,
                area_opacity:0.15,
                background_color : chartcolorval,
                border:{
                    enable:false
                },
                tip:{
                    enable:true,
                    listeners:{
                        //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
                        parseText:function(tip,name,value,text,i){
                            return "<div style='width:130px;height:20px;text-align: center;line-height: 20px;'><span style='color:#005268;font-size:12px;'>"+name+":&nbsp;</span><span style='color:#005268;font-size:16px;'>"+value+"</span></div>";
                        }
                    }
                },
                sub_option:{
                    label:false
                },
                crosshair:{
                    enable:true,
                    line_color:'#62bce9'
                },
                legend:{
                    enable:chartshowlegendy,
                    font:chartannot,
                    fontsize:chartsizeannot,
                    color:chartlegend
                },
                offsety:-10,
                offsetx:-40,
                coordinate:{
                    axis : {
                        width : [0, 0, 2, 0]
                    },
                    background_color:'#ffffff',
                    width:'70%',
                    height:'70%',
                    valid_width:'94%',
                    scale2grid:false,
                    grids:{
                        horizontal:{
                            way:'share_alike',
                            value:grid
                        }
                    },
                    scale:[{
                        position:'left',
                        start_scale:start_axisY,
                        end_scale:end_axisY,
                        scale_space:axisY_space,
                        label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600},
                        listeners:{
                            parseText:function(t,x,y){
                                return {text:t}
                                //return {text:t+"℃"}
                            }
                        }
                    },{
                        position:'bottom',
                        start_scale:1,
                        end_scale:12,
                        parseText:function(t,x,y){
                            return {textY:y+10}
                        },
                        labels:label,
                        label:{font:chartfontxy,color:chartAnnotatedcolor,fontsize:chartsizexy,fontweight:600,textAlign:'right',
                            textBaseline:'middle',
                            rotate:-20
                        }
                    }]
                }
            });
            chartarea.plugin(new iChart.Custom({
                drawFn:function(){
                    //计算位置
                    var coo = chartarea.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy');
                        var w = coo.width;
                        var h = coo.height;
                    //在左上侧的位置，渲染一个单位的文字
                    chartarea.target.textAlign('start')
                        .textBaseline('bottom')
                        .textFont('600 '+chartsizeXY+'px '+chartfontXY+'')
                        .fillText(chart_data,x,y-5,false,chartdatacolor)
                        .textBaseline('top')
                        .fillText(chart_time,x+w+10,y+h-15,false,charttimecolor);
                }
            }));
            chartarea.draw();
        };
        chart_type = function(){
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
        chart_type();
        /***********图表风格切换**********/
        $('.chartsele' + idd).change(function () {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            chartsele = $(this).children('option:selected').val();
            if (chartsele == 1) {
                $("#"+idd).attr("chartsele",chartsele);
                chartVertical();
            }
            if (chartsele == 2) {
                $("#"+idd).attr("chartsele",chartsele);
                chartLevel();
            }
            if (chartsele == 3) {
                $("#"+idd).attr("chartsele",chartsele);
                chartPolyline();
            }
            if (chartsele == 4) {
                $("#"+idd).attr("chartsele",chartsele);
                chartCube();
            }
            if (chartsele == 5) {
                $("#"+idd).attr("chartsele",chartsele);
                chartPie();
            }
            if (chartsele == 6) {
                $("#"+idd).attr("chartsele",chartsele);
                chart3Dpie();
            }
            if (chartsele == 7) {
                $("#"+idd).attr("chartsele",chartsele);
                chartArea();
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /************初始化图表类型显示*********************/
            if (chartsele == 1) {
                $(".chartsele"+idd).children("option").eq(0).attr("selected","selected");
            }
            if (chartsele == 2) {
                $(".chartsele"+idd).children("option").eq(1).attr("selected","selected");
            }
            if (chartsele == 3) {
                $(".chartsele"+idd).children("option").eq(2).attr("selected","selected");
            }
            if (chartsele == 4) {
                $(".chartsele"+idd).children("option").eq(3).attr("selected","selected");
            }
            if (chartsele == 5) {
                $(".chartsele"+idd).children("option").eq(4).attr("selected","selected");
            }
            if (chartsele == 6) {
                $(".chartsele"+idd).children("option").eq(5).attr("selected","selected");
            }
            if (chartsele == 7) {
                $(".chartsele"+idd).children("option").eq(6).attr("selected","selected");
            }
        /**********背景色设置**************/
        $(".chartbgcolor" + idd).change(function () {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            chartcolorval = $(".chartbgcolor" + idd).val();
            $("#"+idd).attr("chartbg",chartcolorval);
            _width = parseInt($("#canvasDiv"+idd).css("width"));
            _height = parseInt($("#canvasDiv"+idd).css("height"));
            chartsele = $('#'+idd).attr("chartsele");
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /**********背景色属性页初始化********/
        $(".chartbgcolor" + idd).val($("#"+idd).attr("chartbg"));
        /***********显示边框**************/
        $(".chartlabel"+idd).mouseup(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(chartshowborder == true){
                $(".chartborder"+idd).css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".canvasDiv"+idd).css("border","1px solid #dfe4e5");
                $("#"+idd).attr("chartborder","true");
            }
            if(chartshowborder == false){
                $(".chartborder"+idd).css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".canvasDiv"+idd).css("border","none");
                $("#"+idd).attr("chartborder","false");
            }
            chartshowborder = !chartshowborder;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****************初始化显示边框***************/
        if($("#"+idd).attr("chartborder") == "true"){
            $(".chartborder"+idd).css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".canvasDiv"+idd).css("border","1px solid #dfe4e5");
        }else{
            $(".chartborder"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".canvasDiv"+idd).css("border","none");
        }
        /****************坐标刻度颜色初始化******************/
        $(".chartxy"+idd).val(chartAnnotatedcolor);
        /****************坐标刻度颜色设置******************/
        $(".chartxy"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            chartAnnotatedcolor = $(this).val();
            $("#"+idd).attr("chartAnnotatedcolor",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****************图例颜色初始化******************/
        $(".chartAnnotated"+idd).val(chartlegend);
        /****************图例颜色设置******************/
        $(".chartAnnotated"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            chartlegend = $(this).val();
            $("#"+idd).attr("chartlegend",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****************初始化显示图例*****************/
        if($("#"+idd).attr("chartlegendy") == "true"){
            $(".chartlegen"+idd).css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            chartshowlegendy = true;
            chart_type();
        }else{
            $(".chartlegen"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            chartshowlegendy = false;
            chart_type();
        }
        /****************显示图例*****************/
        $(".chartlegend"+idd).mouseup(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(chartshowlegend == false){
                $(".chartlegen"+idd).css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $("#"+idd).attr("chartlegendy","true");
                chartshowlegendy = true;
                chart_type();
            }
            if(chartshowlegend == true){
                $(".chartlegen"+idd).css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $("#"+idd).attr("chartlegendy","false");
                chartshowlegendy = false;
                chart_type();
            }
            chartshowlegend = !chartshowlegend;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********标题内容初始化************/
        $(".charttitle"+idd).val($("#"+idd).attr("charttitle"));
        /************标题内容设置**************/
        $(".charttitle"+idd).bind("input",function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).attr("charttitle",$(this).val());
            $("#"+idd).attr("charttitley",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*********标题颜色初始化************/
        $(".chartitlecolor"+idd).val($("#"+idd).attr("charttitlecolor"));
        /**************标题颜色设置**************/
        $(".chartitlecolor"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).attr("charttitlecolor",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****************初始化显示标题*****************/
        if($("#"+idd).attr("chartshowtitle") == "true"){
            $(".chartshow"+idd).css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("charttitle",$("#"+idd).attr("charttitley"));
            $(".charttitle"+idd).removeAttr("disabled");
            $(".chartitlecolor"+idd).removeAttr("disabled");
            $(".chart_11").css("color","#000");
        }else{
            $(".chartshow"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("charttitle","");
            $(".charttitle"+idd).attr("disabled","true");
            $(".chartitlecolor"+idd).attr("disabled","true");
            $(".chart_11").css("color","#aaa");
        }
        /****************显示标题*****************/
        $(".chartshowtitle"+idd).mouseup(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(chartshowtitle == false){
                $(".chartshow"+idd).css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".charttitle"+idd).val($("#"+idd).attr("charttitley"));
                $("#"+idd).attr("chartshowtitle","true");
                $("#"+idd).attr("charttitle",$("#"+idd).attr("charttitley"));
                chart_type();
                $(".charttitle"+idd).removeAttr("disabled");
                $(".chartitlecolor"+idd).removeAttr("disabled");
                $(".chart_11").css("color","#000");
            }
            if(chartshowtitle == true){
                $(".chartshow"+idd).css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $("#"+idd).attr("chartshowtitle","false");
                $(".charttitle"+idd).val("");
                $("#"+idd).attr("charttitle","");
                chart_type();
                $(".charttitle"+idd).attr("disabled","true");
                $(".chartitlecolor"+idd).attr("disabled","true");
                $(".chart_11").css("color","#aaa");
            }
            chartshowtitle = !chartshowtitle;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********数据标题内容初始化************/
        $(".chartdata"+idd).val($("#"+idd).attr("chartdata"));
        /************数据标题内容设置**************/
        $(".chartdata"+idd).bind("input",function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).attr("chartdata",$(this).val());
            $("#"+idd).attr("chartdatay",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*********数据标题颜色初始化************/
        $(".chartdatacolor"+idd).val($("#"+idd).attr("chartdatacolor"));
        /************数据标题颜色设置**************/
        $(".chartdatacolor"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).attr("chartdatacolor",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****************初始化显示数据标题*****************/
        if($("#"+idd).attr("chartshowdata") == "true"){
            $(".chartshowdate"+idd).css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("chartdata",$("#"+idd).attr("chartdatay"));
            $(".chartdata"+idd).removeAttr("disabled");
            $(".chartdatacolor"+idd).removeAttr("disabled");
            $(".chart_22").css("color","#000");
        }else{
            $(".chartshowdate"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("chartdata","");
            $(".chartdata"+idd).attr("disabled","true");
            $(".chartdatacolor"+idd).attr("disabled","true");
            $(".chart_22").css("color","#aaa");
        }
        /****************显示数据标题*****************/
        $(".chartshowdata"+idd).mouseup(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(chartshowdata == false){
                $(".chartshowdate"+idd).css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".chartdata"+idd).val($("#"+idd).attr("chartdatay"));
                $("#"+idd).attr("chartshowdata","true");
                $("#"+idd).attr("chartdata",$("#"+idd).attr("chartdatay"));
                chart_type();
                $(".chartdata"+idd).removeAttr("disabled");
                $(".chartdatacolor"+idd).removeAttr("disabled");
                $(".chart_22").css("color","#000");
            }
            if(chartshowdata == true){
                $(".chartshowdate"+idd).css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $("#"+idd).attr("chartshowdata","false");
                $(".chartdata"+idd).val("");
                $("#"+idd).attr("chartdata","");
                chart_type();
                $(".chartdata"+idd).attr("disabled","true");
                $(".chartdatacolor"+idd).attr("disabled","true");
                $(".chart_22").css("color","#aaa");
            }
            chartshowdata = !chartshowdata;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /***********时间标题内容初始化************/
        $(".charttime"+idd).val($("#"+idd).attr("charttime"));
        /************时间标题内容设置**************/
        $(".charttime"+idd).bind("input",function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).attr("charttime",$(this).val());
            $("#"+idd).attr("charttimey",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*********数据标题颜色初始化************/
        $(".charttimecolor"+idd).val($("#"+idd).attr("charttimecolor"));
        /************数据标题颜色设置**************/
        $(".charttimecolor"+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            $("#"+idd).attr("charttimecolor",$(this).val());
            chart_type();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****************初始化显示时间标题*****************/
        if($("#"+idd).attr("chartshowtime") == "true"){
            $(".chartshowtimed"+idd).css({
                "background-image":"url(images/selected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("charttime",$("#"+idd).attr("charttimey"));
            $(".charttime"+idd).removeAttr("disabled");
            $(".charttimecolor"+idd).removeAttr("disabled");
            $(".chart_33").css("color","#000");
        }else{
            $(".chartshowtimed"+idd).css({
                "background-image":"url(images/notselected.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#"+idd).attr("charttime","");
            $(".charttime"+idd).attr("disabled","true");
            $(".charttimecolor"+idd).attr("disabled","true");
            $(".chart_33").css("color","#aaa");
        }
        /****************显示时间标题*****************/
        $(".chartshowtime"+idd).mouseup(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            if(chartshowtime == false){
                $(".chartshowtimed"+idd).css({
                    "background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $(".charttime"+idd).val($("#"+idd).attr("charttimey"));
                $("#"+idd).attr("chartshowtime","true");
                $("#"+idd).attr("charttime",$("#"+idd).attr("charttimey"));
                chart_type();
                $(".charttime"+idd).removeAttr("disabled");
                $(".charttimecolor"+idd).removeAttr("disabled");
                $(".chart_33").css("color","#000");
            }
            if(chartshowtime == true){
                $(".chartshowtimed"+idd).css({
                    "background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $("#"+idd).attr("chartshowtime","false");
                $(".charttime"+idd).val("");
                $("#"+idd).attr("charttime","");
                chart_type();
                $(".charttime"+idd).attr("disabled","true");
                $(".charttimecolor"+idd).attr("disabled","true");
                $(".chart_33").css("color","#aaa");
            }
            chartshowtime = !chartshowtime;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
    };
    var timechart;
    this.mousedown = function(idd){
        if(moused == true){
            mouse = true;
        }
        $(document).on("mousemove",".hiden",function(){
            if(mouse == true) {
                hideMove = true;
                timechart = false; //启动及关闭按钮
                function charttime() {
                    if (timechart) return;
                    if (chartsele == 1){
                        chartVertical();//2D垂直
                    }
                    if (chartsele == 2){
                        chartLevel();//2D水平
                    }
                    if (chartsele == 3){
                        chartPolyline();//折线
                    }
                    if (chartsele == 4){
                        chartCube();//3D立方
                    }
                    if (chartsele == 5){
                        chartPie();//2D饼图
                    }
                    if (chartsele == 6){
                        chart3Dpie();//3D饼图
                    }
                    if (chartsele == 7){
                        chartArea();//面积图
                    }
                    setTimeout(charttime, 100); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒
                }
                charttime();
            }
        });
        /*********清除定时器**************/
        $(document).bind("mouseup",function(){
            timechart = true;
            mouse = false;
            if(hideMove == true){
                mouseupLog = inTtCommand.log();
                webapi.addLog('before',mousedownLog);
                webapi.addLog('after',mouseupLog);
            };
            hideMove = false;
        });
        $("#bgDiv").bind("mousedown",function(){
            timechart = true;
        });
    };
    /***************字体**********/
    this.FontPage = function(idd){
        var chartfont = $('<div class="chartfonted"><ul class="stylechart"><li><select class="lin sele3'+idd+' sele33" name="sele" fonttype="1" font_size="7"><option value="1" selected="selected" fonttype="1" font_size="12">标题</option><option value="2" fonttype="1" font_size="12">数据和时间</option><option value="3" fonttype="1" font_size="12">坐标刻度</option><option value="4" fonttype="1" font_size="12">图例</option></select></li><li><select class="lin sele2'+idd+' sele22" name="sele"><option value="1" selected="selected">微软雅黑</option><option value="2">楷体</option><option value="3">黑体</option><option value="4">宋体</option><option value="5">新宋体</option><option value="6">仿宋</option><option value="7">隶书</option><option value="8">幼圆</option></select></li><li><select class=" lin sele4'+idd+' sele44'+idd+'" name="sele"><option value="1">初号</option><option value="2">小初</option><option value="3">一号</option><option value="4">小一</option><option value="5">二号</option><option value="6">小二</option><option value="7">三号</option><option value="8">小三</option><option value="9" selected="selected">四号</option><option value="10" >小四</option><option value="11">五号</option><option value="12">小五</option><option value="13">六号</option><option value="14">小六</option><option value="15">七号</option><option value="16">八号</option></select></li></ul></div>');
        chartfont.prependTo($('#tc3'+idd).find(".chartfonty"));
    };
    /*****************字体功能******************/
    this.FontFeatures = function(idd){
        /***********类型设置************/
        $('.sele3'+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var pl=$(this).children('option:selected').val();
            var font = function(value){
                $(".sele2"+idd).val(value);
            }
            var size = function(siz){
                $(".sele4"+idd).val(siz);
            }
            if(pl==1){
                $("#"+idd).attr("chartfonttype","title");
                var title1= $("#"+idd).attr("chart_font_type");
                var title2 = $("#"+idd).attr("chart_size_type");
                font(title1);
                size(title2);
            }else if(pl==2){
                $("#"+idd).attr("chartfonttype","XY");
                var XY1 = $("#"+idd).attr("chart_font_XY");
                var XY2 = $("#"+idd).attr("chart_size_XY");
                font(XY1);
                size(XY2);
            }else if(pl==3){
                $("#"+idd).attr("chartfonttype","xy");
                var xy1 = $("#"+idd).attr("chart_font_x-y");
                var xy2 = $("#"+idd).attr("chart_size_x-y");
                font(xy1);
                size(xy2);
            }else if(pl==4){
                $("#"+idd).attr("chartfonttype","annot");
                var annot1 = $("#"+idd).attr("chart_font_annot");
                var annot2 = $("#"+idd).attr("chart_size_annot");
                font(annot1);
                size(annot2);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*************字体设置**********/
        $('.sele2'+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var pl=$(this).children('option:selected').val();
            if(pl==1){
                $("#"+idd).attr("chart_font","1");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "Microsoft YaHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","1");
                    $("#"+idd).attr("chart_font_type","1");
                }
                if(type == "XY"){
                    chartfontXY = "Microsoft YaHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","1");
                    $("#"+idd).attr("chart_font_XY","1");
                }
                if(type == "xy"){
                    chartfontxy = "Microsoft YaHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","1");
                    $("#"+idd).attr("chart_font_x-y","1");
                }
                if(type == "annot"){
                    chartannot = "Microsoft YaHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","1");
                    $("#"+idd).attr("chart_font_annot","1");
                }
            }else if(pl==2){
                $("#"+idd).attr("chart_font","2");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "KaiTi";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","2");
                    $("#"+idd).attr("chart_font_type","2");
                }
                if(type == "XY"){
                    chartfontXY = "KaiTi";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","2");
                    $("#"+idd).attr("chart_font_XY","2");
                }
                if(type == "xy"){
                    chartfontxy = "KaiTi";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","2");
                    $("#"+idd).attr("chart_font_x-y","2");
                }
                if(type == "annot"){
                    chartannot = "KaiTi";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","2");
                    $("#"+idd).attr("chart_font_annot","2");
                }
            }else if(pl==3){
                $("#"+idd).attr("chart_font","3");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "SimHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","3");
                    $("#"+idd).attr("chart_font_type","3");
                }
                if(type == "XY"){
                    chartfontXY = "SimHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","3");
                    $("#"+idd).attr("chart_font_XY","3");
                }
                if(type == "xy"){
                    chartfontxy = "SimHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","3");
                    $("#"+idd).attr("chart_font_x-y","3");
                }
                if(type == "annot"){
                    chartannot = "SimHei";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","3");
                    $("#"+idd).attr("chart_font_annot","3");
                }
            }else if(pl==4){
                $("#"+idd).attr("chart_font","4");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "SimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","4");
                    $("#"+idd).attr("chart_font_type","4");
                }
                if(type == "XY"){
                    chartfontXY = "SimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","4");
                    $("#"+idd).attr("chart_font_XY","4");
                }
                if(type == "xy"){
                    chartfontxy = "SimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","4");
                    $("#"+idd).attr("chart_font_x-y","4");
                }
                if(type == "annot"){
                    chartannot = "SimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","4");
                    $("#"+idd).attr("chart_font_annot","4");
                }
            }else if(pl==5){
                $("#"+idd).attr("chart_font","5");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "NSimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","5");
                    $("#"+idd).attr("chart_font_type","5");
                }
                if(type == "XY"){
                    chartfontXY = "NSimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","5");
                    $("#"+idd).attr("chart_font_XY","5");
                }
                if(type == "xy"){
                    chartfontxy = "NSimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","5");
                    $("#"+idd).attr("chart_font_x-y","5");
                }
                if(type == "annot"){
                    chartannot = "NSimSun";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","5");
                    $("#"+idd).attr("chart_font_annot","5");
                }
            }else if(pl==6){
                $("#"+idd).attr("chart_font","6");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "FangSong";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","6");
                    $("#"+idd).attr("chart_font_type","6");
                }
                if(type == "XY"){
                    chartfontXY = "FangSong";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","6");
                    $("#"+idd).attr("chart_font_XY","6");
                }
                if(type == "xy"){
                    chartfontxy = "FangSong";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","6");
                    $("#"+idd).attr("chart_font_x-y","6");
                }
                if(type == "annot"){
                    chartannot = "FangSong";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","6");
                    $("#"+idd).attr("chart_font_annot","6");
                }
            }else if(pl==7){
                $("#"+idd).attr("chart_font","7");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "LiSu";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","7");
                    $("#"+idd).attr("chart_font_type","7");
                }
                if(type == "XY"){
                    chartfontXY = "LiSu";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","7");
                    $("#"+idd).attr("chart_font_XY","7");
                }
                if(type == "xy"){
                    chartfontxy = "LiSu";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","7");
                    $("#"+idd).attr("chart_font_x-y","7");
                }
                if(type == "annot"){
                    chartannot = "LiSu";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","7");
                    $("#"+idd).attr("chart_font_annot","7");
                }
            }else if(pl==8){
                $("#"+idd).attr("chart_font","8");
                var type = $("#"+idd).attr("chartfonttype");
                if(type == "title"){
                    chartfonttitle = "YouYuan";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(0).attr("fonttype","8");
                    $("#"+idd).attr("chart_font_type","8");
                }
                if(type == "XY"){
                    chartfontXY = "YouYuan";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(1).attr("fonttype","8");
                    $("#"+idd).attr("chart_font_XY","8");
                }
                if(type == "xy"){
                    chartfontxy = "YouYuan";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(2).attr("fonttype","8");
                    $("#"+idd).attr("chart_font_x-y","8");
                }
                if(type == "annot"){
                    chartannot = "YouYuan";
                    chart_type();
                    $('.sele3'+idd).children("option").eq(3).attr("fonttype","8");
                    $("#"+idd).attr("chart_font_annot","8");
                }
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*************字体大小设置**********/
        var chartsized = function(pll ,typ){
            var sizing;
            if(pll== "1"){
                sizing = 56;
            }
            if(pll == "2"){
                sizing = 48;
            }
            if(pll == "3"){
                sizing = 34;
            }
            if(pll == "4"){
                sizing = 32;
            }
            if(pll == "5"){
                sizing = 29;
            }
            if(pll == "6"){
                sizing = 24;
            }
            if(pll == "7"){
                sizing = 21;
            }
            if(pll == "8"){
                sizing = 20;
            }
            if(pll == "9"){
                sizing = 18;
            }
            if(pll == "10"){
                sizing = 16;
            }
            if(pll == "11"){
                sizing = 14;
            }
            if(pll == "12"){
                sizing = 12;
            }
            if(pll == "13"){
                sizing = 10;
            }
            if(pll == "14"){
                sizing = 8;
            }
            if(pll == "15"){
                sizing = 7;
            }
            if(pll == "16"){
                sizing = 6;
            }
            if(typ == "title"){
                chartsizetitle = sizing;
                chart_type();
                $('.sele3'+idd).children("option").eq(0).attr("font_size",pll);
                $("#"+idd).attr("chart_size_type",pll);
            }
            if(typ == "XY"){
                chartsizeXY = sizing;
                chart_type();
                $('.sele3'+idd).children("option").eq(1).attr("font_size",pll);
                $("#"+idd).attr("chart_size_XY",pll);
            }
            if(typ == "xy"){
                chartsizexy = sizing;
                chart_type();
                $('.sele3'+idd).children("option").eq(2).attr("font_size",pll);
                $("#"+idd).attr("chart_size_x-y",pll);
            }
            if(typ == "annot"){
                chartsizeannot = sizing;
                chart_type();
                $('.sele3'+idd).children("option").eq(3).attr("font_size",pll);
                $("#"+idd).attr("chart_size_annot",pll);
            }
        }
        $('.sele4'+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var dl=$(this).children('option:selected').val();
            var type = $("#"+idd).attr("chartfonttype");
            if(dl=="1"){
                chartsized(dl,type);
            }else if(dl=="2"){
                chartsized(dl,type);
            }else if(dl=="3"){
                chartsized(dl,type);
            }else if(dl=="4"){
                chartsized(dl,type);
            }else if(dl=="5"){
                chartsized(dl,type);
            }else if(dl=="6"){
                chartsized(dl,type);
            }else if(dl=="7"){
                chartsized(dl,type);
            }else if(dl=="8"){
                chartsized(dl,type);
            }else if(dl=="9"){
                chartsized(dl,type);
            }else if(dl=="10"){
                chartsized(dl,type);
            }else if(dl=="11"){
               chartsized(dl,type);
            }else if(dl=="12"){
                chartsized(dl,type);
            }else if(dl=="13"){
                chartsized(dl,type);
            }else if(dl=="14"){
                chartsized(dl,type);
            }else if(dl=="15"){
                chartsized(dl,type);
            }else if(dl=="16"){
                chartsized(dl,type);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /****类型初始化****/
        if($("#"+idd).attr("chartfonttype") == "title"){
            var title1= $("#"+idd).attr("chart_font_type");
            var title2 = $("#"+idd).attr("chart_size_type");
            $('.sele3'+idd).val("1");
            $(".sele2"+idd).val(title1);
            $(".sele4"+idd).val(title2);
        }
        if($("#"+idd).attr("chartfonttype") == "XY"){
            var XY1 = $("#"+idd).attr("chart_font_XY");
            var XY2 = $("#"+idd).attr("chart_size_XY");
            $('.sele3'+idd).val("2");
            $(".sele2"+idd).val(XY1);
            $(".sele4"+idd).val(XY2);
        }
        if($("#"+idd).attr("chartfonttype") == "xy"){
            var xy1 = $("#"+idd).attr("chart_font_x-y");
            var xy2 = $("#"+idd).attr("chart_size_x-y");
            $('.sele3'+idd).val("3");
            $(".sele2"+idd).val(xy1);
            $(".sele4"+idd).val(xy2);
        }
        if($("#"+idd).attr("chartfonttype") == "annot"){
            var annot1 = $("#"+idd).attr("chart_font_annot");
            var annot2 = $("#"+idd).attr("chart_size_annot");
            $('.sele3'+idd).val("4");
            $(".sele2"+idd).val(annot1);
            $(".sele4"+idd).val(annot2);
        }
    };
    this.copy = function(srcId,desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var clas = srcIdElement.attr("class");
        var chartbg = srcIdElement.attr("chartbg");
        var chartseled = srcIdElement.attr("chartsele");
        var chartborder = srcIdElement.attr("chartborder");
        var chartgrid = srcIdElement.attr("chartgrid");
        var chartannotatedcolor = srcIdElement.attr("chartannotatedcolor");
        var chartlegend = srcIdElement.attr("chartlegend");
        var chartlegendy = srcIdElement.attr("chartlegendy");
        var charttitle = srcIdElement.attr("charttitle");
        var charttitley = srcIdElement.attr("charttitley");
        var charttitlecolor = srcIdElement.attr("charttitlecolor");
        var chartshowtitle = srcIdElement.attr("chartshowtitle");
        var chartdata = srcIdElement.attr("chartdata");
        var chartdatay = srcIdElement.attr("chartdatay");
        var chartdatacolor = srcIdElement.attr("chartdatacolor");
        var chartshowdata = srcIdElement.attr("chartshowdata");
        var charttime = srcIdElement.attr("charttime");
        var charttimey = srcIdElement.attr("charttimey");
        var charttimecolor = srcIdElement.attr("charttimecolor");
        var chartshowtime = srcIdElement.attr("chartshowtime");
        var chartfonttype = srcIdElement.attr("chartfonttype");
        var chartinter = srcIdElement.attr("chartinter");
        var font1 = srcIdElement.attr("chart_font_type");
        var font2 = srcIdElement.attr("chart_font_XY");
        var font3 = srcIdElement.attr("chart_font_x-y");
        var font4 = srcIdElement.attr("chart_font_annot");
        var font5 = srcIdElement.attr("chart_size_type");
        var font6 = srcIdElement.attr("chart_size_XY");
        var font7 = srcIdElement.attr("chart_size_x-y");
        var font8 = srcIdElement.attr("chart_size_annot")
        desIdElement.attr("chart_font_type",font1);
        desIdElement.attr("chart_font_XY",font2);
        desIdElement.attr("chart_font_x-y",font3);
        desIdElement.attr("chart_font_annot",font4);
        desIdElement.attr("chart_size_type",font5);
        desIdElement.attr("chart_size_XY",font6);
        desIdElement.attr("chart_size_x-y",font7);
        desIdElement.attr("chart_size_annot",font8);
        desIdElement.attr("chartinter",chartinter);
        desIdElement.attr("chartbg",chartbg);
        desIdElement.attr("chartsele",chartseled);
        desIdElement.attr("chartborder",chartborder);
        desIdElement.attr("chartgrid",chartgrid);
        desIdElement.attr("chartannotatedcolor",chartannotatedcolor);
        desIdElement.attr("chartlegend",chartlegend);
        desIdElement.attr("chartlegendy",chartlegendy);
        desIdElement.attr("charttitle",charttitle);
        desIdElement.attr("charttitley",charttitley);
        desIdElement.attr("charttitlecolor",charttitlecolor);
        desIdElement.attr("chartshowtitle",chartshowtitle);
        desIdElement.attr("chartdata",chartdata);
        desIdElement.attr("chartdatay",chartdatay);
        desIdElement.attr("chartdatacolor",chartdatacolor);
        desIdElement.attr("chartshowdata",chartshowdata);
        desIdElement.attr("charttime",charttime);
        desIdElement.attr("charttimey",charttimey);
        desIdElement.attr("charttimecolor",charttimecolor);
        desIdElement.attr("chartshowtime",chartshowtime);
        desIdElement.attr("chartfonttype",chartfonttype);
        _width = parseInt($("#canvasDiv"+srcId).css("width"));
        _height = parseInt($("#canvasDiv"+srcId).css("height"));
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px"
        }).addClass(clas);
        chart_type();
        // 复制变量配置信息
        inItModalFeature.configInfoCopy(srcIdElement, desIdElement);
    };
};
/*==============电梯控件===================*/
var ElevatorControl = function() {
    this.configId = -1;
    this.createElevatorControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.elevatorElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'Elevator_' + this.configId;
        this.id = idd;
        var textDiv = '<div id='+idd+' telvatorch="telvatorch1" valuenamett="电梯名称" class="contrl move fillContrl" DataType="1" DataType1="0" DataType2="0" DataType3="1">'
             	+'<div class="elevatorBox">' 
				+	'<div class="elevatortitle" id="elevatorNM'+idd+'">电梯名称</div>'
				+	'<ul class="elevatorstyle">'
				+		'<li><a><span class="elevatorup" id="elevatoronoff'+idd+'"></span></a></li>'
				+		'<li ><a id="nowfloor'+idd+'">1层</a></li>'
				+	'</ul>'
				+	'<div class="elevatorBody" id="elevatorBody'+idd+'">'
				+		'<div class="elevatorBodyinner" id="elevatorBodyinner'+idd+'">'
				+			'<div class="elevatordoor" id="elevatordoor'+idd+'"><img src="images/elevatoron.png" id="elevastate'+idd+'"/></div>'
				+		'</div>'
				+	'</div>'
				+	'<div  class="elevatorRadio elevatorRadioadd"><a id="elevatorestate'+idd+'">故障</a></div>'
				+	'<div  class="elevatorRadio" id="elevatorradio'+idd+'"><input  type="button" class="elevatorRadio" value="视频"></div>'
				+'</div>'
            	+'</div>'
        $('#content').append(textDiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;
        //控件相关样式
        $('#' + idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 450 + 'px',
            'width': 142 + 'px'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.ElevatorPropertiesPage(selecteId);
        this.ElevatorPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.ElevatorPropertiesPage = function(idd) {
    	var blAttributes1='<fieldset class="charge elevatorcharge" id="elevatorcharge2'+idd+'">'
		+'	<legend>运行方向变量</legend>'
		+'	<ul class="publicul">'
		+'		<li><p >配置变量</p><button type="button" id="Config1'+idd+'" class="config_">选择文件</button></li>'
		+'		<li><p>变量名称 </p><input  type="text" name="" id="variableName1'+idd+'" value="" /></li>'
		+'		<li><p>类型</p><input type="text" name="" id="variableType1'+idd+'" value="" /></li>'
		+'		<li><p>最大工程值</p> <input type="text" name="" id="MiXEuVal1'+idd+'" value="" /></li>'
		+'		<li><p>最小工程值 </p><input type="text" name="" id="MinEuVal1'+idd+'" value="" /></li>'
		+'		<li><p>注释</p><input type="text" name="" id="DataComment1'+idd+'" value="" /></li>'
		+'	</ul>'
		+'</fieldset>'
		+'<fieldset class="charge elevatorcharge" id="elevatorcharge3'+idd+'">'
		+'	<legend>梯门开关变量</legend>'
		+'	<ul class="publicul">'
		+'		<li><p >配置变量</p><button type="button" id="Config2'+idd+'" class="config_">选择文件</button></li>'
		+'		<li><p>变量名称 </p><input  type="text" name="" id="variableName2'+idd+'" value="" /></li>'
		+'		<li><p>类型</p><input type="text" name="" id="variableType2'+idd+'" value="" /></li>'
		+'		<li><p>最大工程值</p> <input type="text" name="" id="MiXEuVal2'+idd+'" value="" /></li>'
		+'		<li><p>最小工程值 </p><input type="text" name="" id="MinEuVal2'+idd+'" value="" /></li>'
		+'		<li><p>注释</p><input type="text" name="" id="DataComment2'+idd+'" value="" /></li>'
		+'	</ul>'
		+'</fieldset>'
		+'<fieldset class="charge elevatorcharge" id="elevatorcharge4'+idd+'">'
		+'	<legend>运行状态变量</legend>'
		+'	<ul class="publicul">'
		+'		<li><p >配置变量</p><button type="button" id="Config3'+idd+'" class="config_">选择文件</button></li>'
		+'		<li><p>变量名称 </p><input  type="text" name="" id="variableName3'+idd+'" value="" /></li>'
		+'		<li><p>类型</p><input type="text" name="" id="variableType3'+idd+'" value="" /></li>'
		+'		<li><p>最大工程值</p> <input type="text" name="" id="MiXEuVal3'+idd+'" value="" /></li>'
		+'		<li><p>最小工程值 </p><input type="text" name="" id="MinEuVal3'+idd+'" value="" /></li>'
		+'		<li><p>注释</p><input type="text" name="" id="DataComment3'+idd+'" value="" /></li>'
		+'	</ul>'
		+'</fieldset>'
    	$("#tc2"+idd).append(blAttributes1);
    	var biaoliang=$('<form action="" method="get" class="textOff">'
            +       '<label  id="elevatorattrc1'+idd+'" class="textlab"><input name="Fruit" type="radio" value=""  checked="checked"/><span>电梯层数变量</span><span class="duihao" id="duihao0'+idd+'">*</span></label>'
			+		'<label  id="elevatorattrc2'+idd+'"class="textlab"><input name="Fruit" type="radio" value="" /><span>运行方向变量</span><span class="duihao" id="duihao1'+idd+'">*</span></label>'
			+       '<label  id="elevatorattrc3'+idd+'"class="textlab"><input name="Fruit" type="radio" value="" /><span>梯门开关变量</span><span class="duihao" id="duihao2'+idd+'">*</span> </label>'
			+		'<label  id="elevatorattrc4'+idd+'"class="textlab"><input name="Fruit" type="radio" value="" /><span>运行状态变量</span><span class="duihao" id="duihao3'+idd+'">*</span></label>'
			+	'</form>'
	             );
    	$("#elevatorcharge1"+idd).before(biaoliang);
        var proAttributes ='<div id="tc3' + idd + '" class="tc33">'
        + '<fieldset class="fill_attr1">'
		+ '<legend>常规</legend>' 
		+		'<div class="fill_attrP"><i>电梯名称</i><input  type="text" id="elevatorsName'+idd+'" value="电梯名字"/></div>'
		+	'<div class="progress_attrP"><i>隐藏视频</i><div class="progress_attr_but" id="elevatoroff'+idd+'"></div></div>'
		+'</fieldset>'
        +'</div>'
        $('#fathy').append(proAttributes);
    };
    this.ElevatorPageFeatures = function(idd){
    	/*====================解决切换不删除属性页问题====================*/
    	$(".firstlegend").text("电梯层数变量");
    	$("#right"+idd).siblings("p.page").remove();
        /*====变量======*/
        var elevatoroff2=true;
        var id=idd;
        function synchronous(){
        	if($("#"+idd).attr("variablename0")){
        		$("#duihao0"+idd).text("√");
        	};
        	if($("#"+idd).attr("variablename1")){
        		$("#duihao1"+idd).text("√");
        	};
        	if($("#"+idd).attr("variablename2")){
        		$("#duihao2"+idd).text("√");
        	};
        	if($("#"+idd).attr("variablename3")){
        		$("#duihao3"+idd).text("√");
        	};
	    	/*========同步配置的变量=============*/
	    	$("#variableName1"+idd).val($("#"+idd).attr("variableName1"));
	    	$("#variableName2"+idd).val($("#"+idd).attr("variableName2"));
	    	$("#variableName3"+idd).val($("#"+idd).attr("variableName3"));
	    	$("#variableType1"+idd).val($("#"+idd).attr("variableType1"));
	    	$("#variableType2"+idd).val($("#"+idd).attr("variableType2"));
	    	$("#variableType3"+idd).val($("#"+idd).attr("variableType3"));
	    	$("#MiXEuVal1"+idd).val($("#"+idd).attr("MiXEuVal1"));
	    	$("#MiXEuVal2"+idd).val($("#"+idd).attr("MiXEuVal2"));
	    	$("#MiXEuVal3"+idd).val($("#"+idd).attr("MiXEuVal3"));
	    	$("#MinEuVal1"+idd).val($("#"+idd).attr("MinEuVal1"));
	    	$("#MinEuVal2"+idd).val($("#"+idd).attr("MinEuVal2"));
	    	$("#MinEuVal3"+idd).val($("#"+idd).attr("MinEuVal3"));
	    	$("#DataComment1"+idd).val($("#"+idd).attr("DataComment1"));
	    	$("#DataComment2"+idd).val($("#"+idd).attr("DataComment2"));
	    	$("#DataComment3"+idd).val($("#"+idd).attr("DataComment3"));
	    	/*===========同步电梯名字========*/
			$("#elevatorsName"+idd).val($("#"+idd).attr("valuenamett"));
			/*=======同步影藏视频=========*/
	        if($("#"+idd).attr("cucces") == "yes"){
			    $("#elevatoroff"+idd+"").css({
	            	"background-image":"url(images/selected.png)",
	                "background-repeat":"no-repeat",
	                "background-size":"100% 100%"
	            });
	            $("#elevatorradio"+idd).css({
        			"display":"none"
        		});
        		$("#elevatorBody"+idd).css({
        			"height":"calc(100% - 80px)"
        		});
				elevatoroff2=false;
			};
			/*========同步变量切换===========*/
	        if($("#"+idd).attr( "telvatorch")=="telvatorch1"){
	       		$("#elevatorattrc1"+idd).css({
	      			"background":"#b5dcf0"
	      		});
	      		$("#elevatorattrc1"+idd).siblings().css({
	      			"background":"#f3f3f3"
	      		});
	      		$("#elevatorattrc1"+idd+" input").attr({
	      			"checked":"checked"
	      		});
	      		
	      		$("#elevatorcharge1"+idd).css({
	      			"display":"block"
	      		});
	      		$("#elevatorcharge1"+idd).siblings(".charge").css({
	      			"display":"none"
	      		});
	        }else if($("#"+idd).attr( "telvatorch")=="telvatorch2"){
	       		$("#elevatorattrc2"+idd).css({
	      			"background":"#b5dcf0"
	      		});
	      		$("#elevatorattrc2"+idd).siblings().css({
	      			"background":"#f3f3f3"
	      		});
	      		$("#elevatorattrc2"+idd+" input").attr({
	      			"checked":"checked"
	      		});
	      		$("#elevatorcharge2"+idd).css({
	      			"display":"block"
	      		});
	      		$("#elevatorcharge2"+idd).siblings(".charge").css({
	      			"display":"none"
	      		});
	        }else if($("#"+idd).attr( "telvatorch")=="telvatorch3"){
	       		$("#elevatorattrc3"+idd).css({
	      			"background":"#b5dcf0"
	      		});
	      		$("#elevatorattrc3"+idd).siblings().css({
	      			"background":"#f3f3f3"
	      		});
	      		$("#elevatorattrc3"+idd+" input").attr({
	      			"checked":"checked"
	      		});
	      		$("#elevatorcharge3"+idd).css({
	      			"display":"block"
	      		});
	      		$("#elevatorcharge3"+idd).siblings(".charge").css({
	      			"display":"none"
	      		});
	        }else if($("#"+idd).attr( "telvatorch")=="telvatorch4"){
	       		$("#elevatorattrc4"+idd).css({
	      			"background":"#b5dcf0"
	      		});
	      		$("#elevatorattrc4"+idd).siblings().css({
	      			"background":"#f3f3f3"
	      		});
	      		$("#elevatorattrc4"+idd+" input").attr({
	      			"checked":"checked"
	      		});
	      		 $("#elevatorcharge4"+idd).css({
	      			"display":"block"
	      		});
	      		$("#elevatorcharge4"+idd).siblings(".charge").css({
	      			"display":"none"
	      		});
	        };
	    };   
    	/*=======变量二========*/
		function ModalFeature1(){ //模态框定义
		    var _this1 = this;
		    var isOpened1 = false;
		    var navHtml1 = '';
		    this.ModalHtml1 = function() { //模态框的html
		        var Modalstr = '<div class="domalBox">' +
		                            '<header class="domal_drag">' +
		                                '<div class="domal_drag_box">' +
		                                    '<div class="domal_dragN">变量配置</div>' +
		                                    '<div class="domal_dragC">X</div>' +
		                                '</div>' +
		                            '</header>' +
		                            '<div id="contentbox">' +
		                                '<ul id="cfgList">' +
		                                    '<li class="cfgList_N">配置文件</li>' +
		                                    '<li class="cfgList_T"><input type="text"/></li>' +
		                                    '<li class="cfgList_B">' +
		                                        '<div>浏&nbsp;览</div>' +
		                                        '<input id="fileField" type="file"/>' +
		                                    '</li>' +
		                                '</ul>' +
		                                '<div id="nav">' +
		                                    '<div id="variableCfg">'+
		
		                                    '</div>'+
		                                '</div>' +
		                                '<div id="attributeBox">' +
		                                    '<ul class="attributeBoxList">' +
		                                        '<li class="cfgList_N">变量信息</li>' +
		                                        '<li class="cfgList_msg">' +
		                                            '<ul  class="attributeK">' +
		                                                '<li class="attributeK_name"><div>变量属性</div></li>' +
		                                                '<li class="attributeK_value"><div>值域</div></li>' +
		                                                '<li class="attributeKV">'+
		                                                    '<ul class="attributeKey">'+
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                    '</ul>'+
		                                                    '<ul class="attributeValue">'+
		                                                        '<li class="variableName"></li>' +
		                                                        '<li class="variableId"></li>' +
		                                                        '<li class="variableType"></li>' +
		                                                        '<li class="MiXEuVal"></li>' +
		                                                        '<li class="MinEuVal"></li>' +
		                                                        '<li class="DataComment"></li>' +
		                                                    '</ul>'+
		                                                '</li>' +
		                                            '</ul>' +
		                                        '</li>' +
		                                    '</ul>' +
		                                '</div>' +
		                            '</div>' +
		                            '<footer id="footer">' +
		                                '<ul>' +
		                                    '<li class="sureBtn">确认</li>' +
		                                    '<li class="cancel">取消</li>' +
		                                '</ul>' +
		                            '</footer>' +
		                        '</div>';
		        $("body").append(Modalstr);
		        var o = $(".domalBox");
		        o.wrap("<div class='wrap'></div>");
		    };
		    $("#Config1"+id).bind("click",function(){
		            _this1.ModalHtml1();
		            if(isOpened1 == true){
		                $(navHtml1).appendTo($("#variableCfg"));
		            }
		            if(id[0].split("_")[0] == "Chart"){
		                $("#footer").find("li:first-child").text("添加");
		            }
		            _this1.domalMove1(selecteId);
		            _this1.removeDomal1.closeDomal(id);
		            _this1.ConfigTree1();
		            _this1.menuOperate1.variableMsg(id);
		            _this1.menuOperate1.treeSH();
		            _this1.menuOperate1.dbltreeSH();
		            _this1.menuOperate1.treeSys();
		            _this1.menuOperate1.dbltreeSys();
		            _this1.menuOperate1.treeDevice();
		            _this1.menuOperate1.dbltreeDevice();
		            _this1.bindvariable1(id)
		       });
		    this.removeDomal1 = { //关闭配置变量框
		        closeX:function(arr){ //arr 选择集
		            var o = $(".domal_dragC");
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var sureBtn = $(".sureBtn");
		            o.bind("click",function(){
		                var variableID = [];
		                var variableName = [];
		                var variableType = [];
		                var MixEuVal = [];
		                var MinEuVal = [];
		                var DataColor = [];
		                var id = arr[0];
		                var ChartRadioBox = $(".radioBox"+id);
		                if(id.split("_")[0] == "Chart"){
		                    ChartRadioBox.find('.variableName'+id+'').each(function(i){
		                        var name = $(this).text();
		                        variableName.push(name);
		                        $("#"+id).attr("variableName1",variableName)
		                    });
		                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
		                        var Id = $(this).text();
		                        variableID.push(Id);
		                        $("#"+id).attr("variableID1",variableID)
		                    });
		                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
		                        var Type = $(this).text();
		                        variableType.push(Type);
		                        $("#"+id).attr("variableType1",variableType)
		                    });
		                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
		                        var Mix = $(this).text();
		                        MixEuVal.push(Mix);
		                        $("#"+id).attr("variableMix1",MixEuVal)
		                    });
		                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
		                        var Min = $(this).text();
		                        MinEuVal.push(Min);
		                        $("#"+id).attr("variableMin1",MinEuVal)
		                    });
		                    ChartRadioBox.find('.DataColor'+id+'').each(function(i){
		                        var Color = $(this).attr("variableColor1");
		                        DataColor.push(Color);
		                        $("#"+id).attr("DataColor1",DataColor)
		                    });
		                }
		                domal.remove();
		                wrap.remove();
		                sureBtn.removeAttr("support1");
		            })
		        },
		        closeC:function(arr){
		            var o = $(".cancel");
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var sureBtn = $(".sureBtn");
		            o.bind("click",function(){
		                var variableID = [];
		                var variableName = [];
		                var variableType = [];
		                var MixEuVal = [];
		                var MinEuVal = [];
		                var DataColor = [];
		                var id = arr[0];
		                var ChartRadioBox = $(".radioBox"+id);
		                if(id.split("_")[0] == "Chart"){
		                    ChartRadioBox.find('.variableName'+id+'').each(function(i){
		                        var name = $(this).text();
		                        variableName.push(name);
		                        $("#"+id).attr("variableName1",variableName)
		                    });
		                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
		                        var Id = $(this).text();
		                        variableID.push(Id);
		                        $("#"+id).attr("variableID1",variableID)
		                    });
		                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
		                        var Type = $(this).text();
		                        variableType.push(Type);
		                        $("#"+id).attr("variableType1",variableType)
		                    });
		                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
		                        var Mix = $(this).text();
		                        MixEuVal.push(Mix);
		                        $("#"+id).attr("variableMix1",MixEuVal)
		                    });
		                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
		                        var Min = $(this).text();
		                        MinEuVal.push(Min);
		                        $("#"+id).attr("variableMin1",MinEuVal)
		                    });
		                    ChartRadioBox.find('.variableColor'+id+'').each(function(i){
		                        var Color = $(this).attr("variableColor");
		                        DataColor.push(Color);
		                        $("#"+id).attr("DataColor1",DataColor)
		                    });
		                }
		                domal.remove();
		                wrap.remove();
		                sureBtn.removeAttr("support1");
		            })
		        },
		        closeDomal:function(arr){
		            this.closeX(arr);
		            this.closeC(arr);
		        }
		
		    };
		    this.domalMove1 = function(){ //模态框的移动
		        var domal_dragO = $(".domal_drag");
		        var o = $(".domalBox");
		        domal_dragO.bind("mousedown",function(e){
		            var e = e || event;
		            var x = e.clientX - o[0].offsetLeft;
		            var y = e.clientY - o[0].offsetTop;
		            $(window).bind("mousemove",function(e){
		                var e = e || event;
		                var l = e.clientX - x;
		                var t = e.clientY - y;
		                if(l <= 0){
		                    l = 0;
		                }else if(l >=  document.documentElement.clientWidth  - o[0].offsetLeft){
		                    l =  document.documentElement.clientWidth - o[0].offsetLeft;
		                }
		                if(t <= 0){
		                    t = 0;
		                }else if(t >=  document.documentElement.clientHeight  - o[0].offsetTop){
		                    t =  document.documentElement.clientHeight  - o[0].offsetTop;
		                }
		                o.css({"top":t,"left":l});
		            });
		            $(window).bind("mouseup",function(e){
		                $(window).unbind("mousemove");
		                $(window).unbind("mouseup");
		            })
		        })
		    };
		    this.ConfigTree1 = function(){ //选择配置文件
		        var ConfigO = $("#fileField");
		        var cfg = $('<div class="hide parents"><img src="images/close.png" /><div>F:\\web\\codeNew\\js\\BMSProject111.json</div></div>');
		        ConfigO.unbind("change").bind("change",function() {
		            var variableCfgO = $("#variableCfg");
		            var files = ConfigO.prop('files');//获取到文件列表
		            var reader = new FileReader();//新建一个FileReader
		            reader.readAsText(files[0], "ANSI");//读取文件
		            reader.onload = function(evt){ //读取完文件之后会回来这里
		                var fileString = evt.target.result;
		                var oJSON = JSON.parse(fileString);//将jsong字符串解析成json对象
		                variableCfgO.children().remove();
		                cfg.appendTo(variableCfgO);
		                var oSunsys = oJSON["Subsys"];
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
		                                'DataType1='+oSunsys[k]["Device"][v]["Tag"][g]["DataType"]+' ' +
		                                'DataComment1='+oSunsys[k]["Device"][v]["Tag"][g]["DataComment"]+'' +
		                                ' Name1='+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'>'+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'</div>'+
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
		                                $("#variable"+k+v+g).children("div").attr({"MinEuVal1":MinEuVal,"MaxEuVal1":MaxEuVal});
		                            })
		                        })
		                    })
		                });
		                navHtml = $("#variableCfg").html();
		                isOpened = true;
		            }
		        })
		    };
		    this.menuOperate1 = {
		        variableMsg:function(idd){ //显示变量相关属性
		            var key = $(".attributeKey li");
		            var val = $(".attributeValue li");
		            $("#variableCfg").on("click",".variableTxt",function(){
		                var control = $("#"+idd);
		                var sureBtn = $(".sureBtn");
		                var dataType = control.attr("DataType1");
		                var supportDataType = dataType.split(",");
		                var len = supportDataType.length;
		                var Name ='',ID = '',DataType = '',DataComment = '',MinEuVal = '',MaxEuVal = '';
		                    Name = $(this).attr("Name1");
		                    ID = $(this).attr("id");
		                    DataType = $(this).attr("DataType1");
		                    DataComment = $(this).attr("DataComment1");
		                    MinEuVal = $(this).attr("MinEuVal1");
		                    MaxEuVal = $(this).attr("MaxEuVal1");
		                    sureBtn.removeAttr("support1");
		                key.each(function(i){
		                    switch(i){
		                        case 0:
		                            key.eq(0).text("变量名称");
		                            val.eq(0).text(Name);
		                            break;
		                        case 1:
		                            key.eq(1).text("变量ID");
		                            val.eq(1).text(ID);
		                            break;
		                        case 2:
		                            key.eq(2).text("变量类型");
		                            val.eq(2).text(DataType);
		                            break;
		                        case 3:
		                            key.eq(3).text("最大工程值");
		                            val.eq(3).text(MaxEuVal);
		                            break;
		                        case 4:
		                            key.eq(4).text("最小工程值");
		                            val.eq(4).text(MinEuVal);
		                            break;
		                        case 5:
		                            key.eq(5).text("变量注释");
		                            val.eq(5).text(DataComment);
		                            break;
		                        default: false;
		                    }
		                });
		                for(var i=0;i<len;i++){ //判断控件是否支持此变量的数据类型
		                    if(supportDataType[i] === DataType){
		                        sureBtn.css("background","#d73300");
		                        sureBtn.attr("support1","support");
		                        return false;
		                    }else{
		                        sureBtn.css("background","#a0a09b");
		                        sureBtn.attr("support1","");
		                    }
		                }
		            });
		        },
		        treeSH:function(){ //对子系统的展开收缩
		            $("#variableCfg").on("click",".parents img",function(){
		                if($(this).parent(".parents").siblings(".systems").length>=1){
		                    if($(this).parent(".parents").siblings(".systems").is(":visible")){
		                        $(this).parent(".parents").siblings(".systems").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".parents").siblings(".systems").show();
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        dbltreeSH:function(){ //对子系统的展开收缩
		            $("#variableCfg").on("dblclick",".parents div",function(){
		                if($(this).parent(".parents").siblings(".systems").length>=1){
		                    if($(this).parent(".parents").siblings(".systems").is(":visible")){
		                        $(this).parent(".parents").siblings(".systems").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".parents").siblings(".systems").show();
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        treeSys:function(){ //对设备的展开收缩
		            $("#variableCfg").on("click",".systems img",function(){
		                if($(this).parent(".systems").children(".device").length>=1){
		                    if($(this).parent(".systems").children(".device").is(":visible")){
		                        $(this).parent(".systems").children(".device").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".systems").children(".device").show();
		                        if($(this).parent(".systems").index() == $(".systems").length){
		                            $(this).parent(".systems").children(".device").css("background","");
		                        }else{
		                            $(this).parent(".systems").children(".device").css("background","url('images/bar3.gif') no-repeat 24px 0px");
		                        }
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        dbltreeSys:function(){ //对设备的展开收缩
		            $("#variableCfg").on("dblclick",".systems .systemsTxt",function(){
		                if($(this).parent(".systems").children(".device").length>=1){
		                    if($(this).parent(".systems").children(".device").is(":visible")){
		                        $(this).parent(".systems").children(".device").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".systems").children(".device").show();
		                        if($(this).parent(".systems").index() == $(".systems").length){
		                            $(this).parent(".systems").children(".device").css("background","");
		                        }else{
		                            $(this).parent(".systems").children(".device").css("background","url('images/bar3.gif') no-repeat 24px 0px");
		                        }
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        treeDevice:function(){ //对变量的展开收缩
		            $("#variableCfg").on("click",".device img",function(){
		                if($(this).parent(".device").children(".variable").length>=1){
		                    if($(this).parent(".device").children(".variable").is(":visible")){
		                        $(this).parent(".device").children(".variable").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".device").children(".variable").show();
		                        $(this).attr("src","images/close.png");
		                        $(this).parent(".device").children(".variable").children(".variablePic").attr("src","images/bar1.gif");
		                        $(this).parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar2.gif");
		                        if($(this).parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
		                            $(this).parent(".device").children(".variable").css("margin-left","24px");
		                        }else{
		                            $(this).parent(".device").children(".variable").css("background","url('images/bar3.gif') no-repeat 41px 0px");//设备
		                            if($(this).parent(".device").children(".variable").children("#p1").length<1){//系统
		                                $(this).parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar3.gif">');
		                            }
		                        }
		                    }
		                }
		            })
		        },
		        dbltreeDevice:function(){ //对变量的展开收缩
		            $("#variableCfg").on("dblclick",".device .deviceTxt",function(){
		                if($(this).parent(".device").children(".variable").length>=1){
		                    if($(this).parent(".device").children(".variable").is(":visible")){
		                        $(this).parent(".device").children(".variable").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".device").children(".variable").show();
		                        $(this).attr("src","images/close.png");
		                        $(this).parent(".device").children(".variable").children(".variablePic").attr("src","images/bar1.gif");
		                        $(this).parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar2.gif");
		                        if($(this).parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
		                            $(this).parent(".device").children(".variable").css("margin-left","24px");
		                        }else{
		                            $(this).parent(".device").children(".variable").css("background","url('images/bar3.gif') no-repeat 41px 0px");//设备
		                            if($(this).parent(".device").children(".variable").children("#p1").length<1){//系统
		                                $(this).parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar3.gif">');
		                            }
		                        }
		                    }
		                }
		            })
		        }
		
		    };
		    this.bindvariable1 = function(idd){ //对控件绑定变量id（多变量未处理）
		        var sureBtn = $(".sureBtn");
		        var variableID = [];
		        var tempId = [];
		        sureBtn.bind("click",function(){ //对控件添加变量的ID属性
		        	$("#duihao1"+idd).text("√");
		            var oParent = $(".attributeValue");
		            var oIdVal = oParent.children(".variableId").text();
		            var oNameVal = oParent.children(".variableName").text();
		            var oTypeVal = oParent.children(".variableType").text();
		            var oMixVal= oParent.children(".MiXEuVal").text();
		            var oMinVal= oParent.children(".MinEuVal").text();
		            var oCommentVal = oParent.children(".DataComment").text();
		            var control = $("#"+idd);
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var ChartTag = $(".radioBox"+idd);
		            var variableColor;
		            //随机颜色值
		            var getRandomColor = function(){
		                return "#"+Math.floor(Math.random()*16777215).toString(16);
		            };
		            variableColor = getRandomColor();
		            if(sureBtn.attr("support1") == "support"){
		                //oTypeVal为枚举行需加判断
		                switch (oTypeVal){
		                    case '0':
		                        oTypeVal = "开关量";
		                        break;
		                    case '1':
		                        oTypeVal = "整型量";
		                        break;
		                    case '2':
		                        oTypeVal = "浮点量";
		                        break;
		                    case '3':
		                        oTypeVal = "字符量";
		                        break;
		                    default:false;
		                }
                        var tempArr = [];
                        var variable_0 = control.attr("variableID0");
                        var variable_2 = control.attr("variableID2");
                        var variable_3 = control.attr("variableID3");
                        if(variable_0 != undefined) {
                            tempArr.push(variable_0);
                        }if(oIdVal != undefined){
                            tempArr.push(oIdVal);
                        }if(variable_2 != undefined){
                            tempArr.push(variable_2);
                        }if(variable_3 != undefined){
                            tempArr.push(variable_3);
                        }
                        $("#variableName1"+idd).val(oNameVal);
                        $("#MiXEuVal1"+idd).val(oMixVal);
                        $("#MinEuVal1"+idd).val(oMinVal);
                        $("#DataComment1"+idd).val(oCommentVal);
                        $("#variableType1"+idd).val(oTypeVal);
                        control.attr({
                            "variableID":tempArr,
                            "variableID1":oIdVal,
                            "variableName1":oNameVal,
                            "variableType1":oTypeVal,
                            "MiXEuVal1":oMixVal,
                            "MinEuVal1":oMinVal,
                            "DataComment1":oCommentVal
                        });
                        domal.remove();
                        wrap.remove();
                    }
		        });
		    }
		};
		/*=======变量三=========*/
		function ModalFeature2(){ //模态框定义
		    var _this2 = this;
		    var isOpened2 = false;
		    var navHtml2 = '';
		    this.ModalHtml2 = function() { //模态框的html
		        var Modalstr = '<div class="domalBox">' +
		                            '<header class="domal_drag">' +
		                                '<div class="domal_drag_box">' +
		                                    '<div class="domal_dragN">变量配置</div>' +
		                                    '<div class="domal_dragC">X</div>' +
		                                '</div>' +
		                            '</header>' +
		                            '<div id="contentbox">' +
		                                '<ul id="cfgList">' +
		                                    '<li class="cfgList_N">配置文件</li>' +
		                                    '<li class="cfgList_T"><input type="text"/></li>' +
		                                    '<li class="cfgList_B">' +
		                                        '<div>浏&nbsp;览</div>' +
		                                        '<input id="fileField" type="file"/>' +
		                                    '</li>' +
		                                '</ul>' +
		                                '<div id="nav">' +
		                                    '<div id="variableCfg">'+
		
		                                    '</div>'+
		                                '</div>' +
		                                '<div id="attributeBox">' +
		                                    '<ul class="attributeBoxList">' +
		                                        '<li class="cfgList_N">变量信息</li>' +
		                                        '<li class="cfgList_msg">' +
		                                            '<ul  class="attributeK">' +
		                                                '<li class="attributeK_name"><div>变量属性</div></li>' +
		                                                '<li class="attributeK_value"><div>值域</div></li>' +
		                                                '<li class="attributeKV">'+
		                                                    '<ul class="attributeKey">'+
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                    '</ul>'+
		                                                    '<ul class="attributeValue">'+
		                                                        '<li class="variableName"></li>' +
		                                                        '<li class="variableId"></li>' +
		                                                        '<li class="variableType"></li>' +
		                                                        '<li class="MiXEuVal"></li>' +
		                                                        '<li class="MinEuVal"></li>' +
		                                                        '<li class="DataComment"></li>' +
		                                                    '</ul>'+
		                                                '</li>' +
		                                            '</ul>' +
		                                        '</li>' +
		                                    '</ul>' +
		                                '</div>' +
		                            '</div>' +
		                            '<footer id="footer">' +
		                                '<ul>' +
		                                    '<li class="sureBtn">确认</li>' +
		                                    '<li class="cancel">取消</li>' +
		                                '</ul>' +
		                            '</footer>' +
		                        '</div>';
		        $("body").append(Modalstr);
		        var o = $(".domalBox");
		        o.wrap("<div class='wrap'></div>");
		    };
		    
	        $("#Config2"+id).bind("click",function(){
	            _this2.ModalHtml2();
	            if(isOpened2 == true){
	                $(navHtml2).appendTo($("#variableCfg"));
	            }
	            if(id[0].split("_")[0] == "Chart"){
	                $("#footer").find("li:first-child").text("添加");
	            }
	            _this2.domalMove2(selecteId);
	            _this2.removeDomal2.closeDomal(id);
	            _this2.ConfigTree2();
	            _this2.menuOperate2.variableMsg(id);
	            _this2.menuOperate2.treeSH();
	            _this2.menuOperate2.dbltreeSH();
	            _this2.menuOperate2.treeSys();
	            _this2.menuOperate2.dbltreeSys();
	            _this2.menuOperate2.treeDevice();
	            _this2.menuOperate2.dbltreeDevice();
	            _this2.bindvariable2(id)
	        });
		   
		    this.removeDomal2 = { //关闭配置变量框
		        closeX:function(arr){ //arr 选择集
		            var o = $(".domal_dragC");
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var sureBtn = $(".sureBtn");
		            o.bind("click",function(){
		                var variableID = [];
		                var variableName = [];
		                var variableType = [];
		                var MixEuVal = [];
		                var MinEuVal = [];
		                var DataColor = [];
		                var id = arr[0];
		                var ChartRadioBox = $(".radioBox"+id);
		                if(id.split("_")[0] == "Chart"){
		                    ChartRadioBox.find('.variableName'+id+'').each(function(i){
		                        var name = $(this).text();
		                        variableName.push(name);
		                        $("#"+id).attr("variableName2",variableName)
		                    });
		                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
		                        var Id = $(this).text();
		                        variableID.push(Id);
		                        $("#"+id).attr("variableID2",variableID)
		                    });
		                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
		                        var Type = $(this).text();
		                        variableType.push(Type);
		                        $("#"+id).attr("variableType2",variableType)
		                    });
		                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
		                        var Mix = $(this).text();
		                        MixEuVal.push(Mix);
		                        $("#"+id).attr("variableMix2",MixEuVal)
		                    });
		                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
		                        var Min = $(this).text();
		                        MinEuVal.push(Min);
		                        $("#"+id).attr("variableMin2",MinEuVal)
		                    });
		                    ChartRadioBox.find('.DataColor'+id+'').each(function(i){
		                        var Color = $(this).attr("variableColor2");
		                        DataColor.push(Color);
		                        $("#"+id).attr("DataColor2",DataColor)
		                    });
		                }
		                domal.remove();
		                wrap.remove();
		                sureBtn.removeAttr("support2");
		            })
		        },
		        closeC:function(arr){
		            var o = $(".cancel");
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var sureBtn = $(".sureBtn");
		            o.bind("click",function(){
		                var variableID = [];
		                var variableName = [];
		                var variableType = [];
		                var MixEuVal = [];
		                var MinEuVal = [];
		                var DataColor = [];
		                var id = arr[0];
		                var ChartRadioBox = $(".radioBox"+id);
		                if(id.split("_")[0] == "Chart"){
		                    ChartRadioBox.find('.variableName'+id+'').each(function(i){
		                        var name = $(this).text();
		                        variableName.push(name);
		                        $("#"+id).attr("variableName2",variableName)
		                    });
		                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
		                        var Id = $(this).text();
		                        variableID.push(Id);
		                        $("#"+id).attr("variableID2",variableID)
		                    });
		                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
		                        var Type = $(this).text();
		                        variableType.push(Type);
		                        $("#"+id).attr("variableType2",variableType)
		                    });
		                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
		                        var Mix = $(this).text();
		                        MixEuVal.push(Mix);
		                        $("#"+id).attr("variableMix2",MixEuVal)
		                    });
		                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
		                        var Min = $(this).text();
		                        MinEuVal.push(Min);
		                        $("#"+id).attr("variableMin2",MinEuVal)
		                    });
		                    ChartRadioBox.find('.variableColor'+id+'').each(function(i){
		                        var Color = $(this).attr("variableColor");
		                        DataColor.push(Color);
		                        $("#"+id).attr("DataColor2",DataColor)
		                    });
		                }
		                domal.remove();
		                wrap.remove();
		                sureBtn.removeAttr("support2");
		            })
		        },
		        closeDomal:function(arr){
		            this.closeX(arr);
		            this.closeC(arr);
		        }
		
		    };
		    this.domalMove2 = function(){ //模态框的移动
		        var domal_dragO = $(".domal_drag");
		        var o = $(".domalBox");
		        domal_dragO.bind("mousedown",function(e){
		            var e = e || event;
		            var x = e.clientX - o[0].offsetLeft;
		            var y = e.clientY - o[0].offsetTop;
		            $(window).bind("mousemove",function(e){
		                var e = e || event;
		                var l = e.clientX - x;
		                var t = e.clientY - y;
		                if(l <= 0){
		                    l = 0;
		                }else if(l >=  document.documentElement.clientWidth  - o[0].offsetLeft){
		                    l =  document.documentElement.clientWidth - o[0].offsetLeft;
		                }
		                if(t <= 0){
		                    t = 0;
		                }else if(t >=  document.documentElement.clientHeight  - o[0].offsetTop){
		                    t =  document.documentElement.clientHeight  - o[0].offsetTop;
		                }
		                o.css({"top":t,"left":l});
		            });
		            $(window).bind("mouseup",function(e){
		                $(window).unbind("mousemove");
		                $(window).unbind("mouseup");
		            })
		        })
		    };
		    this.ConfigTree2 = function(){ //选择配置文件
		        var ConfigO = $("#fileField");
		        var cfg = $('<div class="hide parents"><img src="images/close.png" /><div>F:\\web\\codeNew\\js\\BMSProject111.json</div></div>');
		        ConfigO.unbind("change").bind("change",function() {
		            var variableCfgO = $("#variableCfg");
		            var files = ConfigO.prop('files');//获取到文件列表
		            var reader = new FileReader();//新建一个FileReader
		            reader.readAsText(files[0], "ANSI");//读取文件
		            reader.onload = function(evt){ //读取完文件之后会回来这里
		                var fileString = evt.target.result;
		                var oJSON = JSON.parse(fileString);//将jsong字符串解析成json对象
		                variableCfgO.children().remove();
		                cfg.appendTo(variableCfgO);
		                var oSunsys = oJSON["Subsys"];
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
		                                'DataType2='+oSunsys[k]["Device"][v]["Tag"][g]["DataType"]+' ' +
		                                'DataComment2='+oSunsys[k]["Device"][v]["Tag"][g]["DataComment"]+'' +
		                                ' Name2='+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'>'+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'</div>'+
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
		                                $("#variable"+k+v+g).children("div").attr({"MinEuVal2":MinEuVal,"MaxEuVal2":MaxEuVal});
		                            })
		                        })
		                    })
		                });
		                navHtml = $("#variableCfg").html();
		                isOpened = true;
		            }
		        })
		    };
		    this.menuOperate2 = {
		        variableMsg:function(idd){ //显示变量相关属性
		            var key = $(".attributeKey li");
		            var val = $(".attributeValue li");
		            $("#variableCfg").on("click",".variableTxt",function(){
		                var control = $("#"+idd);
		                var sureBtn = $(".sureBtn");
		                var dataType = control.attr("DataType2");
		                var supportDataType = dataType.split(",");
		                var len = supportDataType.length;
		                var Name ='',ID = '',DataType = '',DataComment = '',MinEuVal = '',MaxEuVal = '';
		                    Name = $(this).attr("Name2");
		                    ID = $(this).attr("id");
		                    DataType = $(this).attr("DataType2");
		                    DataComment = $(this).attr("DataComment2");
		                    MinEuVal = $(this).attr("MinEuVal2");
		                    MaxEuVal = $(this).attr("MaxEuVal2");
		                    sureBtn.removeAttr("support2");
		                key.each(function(i){
		                    switch(i){
		                        case 0:
		                            key.eq(0).text("变量名称");
		                            val.eq(0).text(Name);
		                            break;
		                        case 1:
		                            key.eq(1).text("变量ID");
		                            val.eq(1).text(ID);
		                            break;
		                        case 2:
		                            key.eq(2).text("变量类型");
		                            val.eq(2).text(DataType);
		                            break;
		                        case 3:
		                            key.eq(3).text("最大工程值");
		                            val.eq(3).text(MaxEuVal);
		                            break;
		                        case 4:
		                            key.eq(4).text("最小工程值");
		                            val.eq(4).text(MinEuVal);
		                            break;
		                        case 5:
		                            key.eq(5).text("变量注释");
		                            val.eq(5).text(DataComment);
		                            break;
		                        default: false;
		                    }
		                });
		                for(var i=0;i<len;i++){ //判断控件是否支持此变量的数据类型
		                    if(supportDataType[i] === DataType){
		                        sureBtn.css("background","#d73300");
		                        sureBtn.attr("support2","support");
		                        return false;
		                    }else{
		                        sureBtn.css("background","#a0a09b");
		                        sureBtn.attr("support2","");
		                    }
		                }
		            });
		        },
		        treeSH:function(){ //对子系统的展开收缩
		            $("#variableCfg").on("click",".parents img",function(){
		                if($(this).parent(".parents").siblings(".systems").length>=1){
		                    if($(this).parent(".parents").siblings(".systems").is(":visible")){
		                        $(this).parent(".parents").siblings(".systems").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".parents").siblings(".systems").show();
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        dbltreeSH:function(){ //对子系统的展开收缩
		            $("#variableCfg").on("dblclick",".parents div",function(){
		                if($(this).parent(".parents").siblings(".systems").length>=1){
		                    if($(this).parent(".parents").siblings(".systems").is(":visible")){
		                        $(this).parent(".parents").siblings(".systems").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".parents").siblings(".systems").show();
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        treeSys:function(){ //对设备的展开收缩
		            $("#variableCfg").on("click",".systems img",function(){
		                if($(this).parent(".systems").children(".device").length>=1){
		                    if($(this).parent(".systems").children(".device").is(":visible")){
		                        $(this).parent(".systems").children(".device").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".systems").children(".device").show();
		                        if($(this).parent(".systems").index() == $(".systems").length){
		                            $(this).parent(".systems").children(".device").css("background","");
		                        }else{
		                            $(this).parent(".systems").children(".device").css("background","url('images/bar3.gif') no-repeat 24px 0px");
		                        }
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        dbltreeSys:function(){ //对设备的展开收缩
		            $("#variableCfg").on("dblclick",".systems .systemsTxt",function(){
		                if($(this).parent(".systems").children(".device").length>=1){
		                    if($(this).parent(".systems").children(".device").is(":visible")){
		                        $(this).parent(".systems").children(".device").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".systems").children(".device").show();
		                        if($(this).parent(".systems").index() == $(".systems").length){
		                            $(this).parent(".systems").children(".device").css("background","");
		                        }else{
		                            $(this).parent(".systems").children(".device").css("background","url('images/bar3.gif') no-repeat 24px 0px");
		                        }
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        treeDevice:function(){ //对变量的展开收缩
		            $("#variableCfg").on("click",".device img",function(){
		                if($(this).parent(".device").children(".variable").length>=1){
		                    if($(this).parent(".device").children(".variable").is(":visible")){
		                        $(this).parent(".device").children(".variable").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".device").children(".variable").show();
		                        $(this).attr("src","images/close.png");
		                        $(this).parent(".device").children(".variable").children(".variablePic").attr("src","images/bar1.gif");
		                        $(this).parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar2.gif");
		                        if($(this).parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
		                            $(this).parent(".device").children(".variable").css("margin-left","24px");
		                        }else{
		                            $(this).parent(".device").children(".variable").css("background","url('images/bar3.gif') no-repeat 41px 0px");//设备
		                            if($(this).parent(".device").children(".variable").children("#p1").length<1){//系统
		                                $(this).parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar3.gif">');
		                            }
		                        }
		                    }
		                }
		            })
		        },
		        dbltreeDevice:function(){ //对变量的展开收缩
		            $("#variableCfg").on("dblclick",".device .deviceTxt",function(){
		                if($(this).parent(".device").children(".variable").length>=1){
		                    if($(this).parent(".device").children(".variable").is(":visible")){
		                        $(this).parent(".device").children(".variable").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".device").children(".variable").show();
		                        $(this).attr("src","images/close.png");
		                        $(this).parent(".device").children(".variable").children(".variablePic").attr("src","images/bar1.gif");
		                        $(this).parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar2.gif");
		                        if($(this).parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
		                            $(this).parent(".device").children(".variable").css("margin-left","24px");
		                        }else{
		                            $(this).parent(".device").children(".variable").css("background","url('images/bar3.gif') no-repeat 41px 0px");//设备
		                            if($(this).parent(".device").children(".variable").children("#p1").length<1){//系统
		                                $(this).parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar3.gif">');
		                            }
		                        }
		                    }
		                }
		            })
		        }
		
		    };
		    this.bindvariable2 = function(idd){ //对控件绑定变量id（多变量未处理）
		        var sureBtn = $(".sureBtn");
		        var variableID = [];
		        var tempId = [];
		        sureBtn.bind("click",function(){ //对控件添加变量的ID属性
		        	$("#duihao2"+idd).text("√");
		            var oParent = $(".attributeValue");
		            var oIdVal = oParent.children(".variableId").text();
		            var oNameVal = oParent.children(".variableName").text();
		            var oTypeVal = oParent.children(".variableType").text();
		            var oMixVal= oParent.children(".MiXEuVal").text();
		            var oMinVal= oParent.children(".MinEuVal").text();
		            var oCommentVal = oParent.children(".DataComment").text();
		            var control = $("#"+idd);
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var ChartTag = $(".radioBox"+idd);
		            var variableColor;
		            //随机颜色值
		            var getRandomColor = function(){
		                return "#"+Math.floor(Math.random()*16777215).toString(16);
		            };
		            variableColor = getRandomColor();
		            if(sureBtn.attr("support2") == "support"){
		                //oTypeVal为枚举行需加判断
		                switch (oTypeVal){
		                    case '0':
		                        oTypeVal = "开关量";
		                        break;
		                    case '1':
		                        oTypeVal = "整型量";
		                        break;
		                    case '2':
		                        oTypeVal = "浮点量";
		                        break;
		                    case '3':
		                        oTypeVal = "字符量";
		                        break;
		                    default:false;
		                }
                        var tempArr = [];
                        var variable_0 = control.attr("variableID0");
                        var variable_1 = control.attr("variableID1");
                        var variable_3 = control.attr("variableID3");
                        if(variable_0 != undefined) {
                            tempArr.push(variable_0);
                        }if(oIdVal != undefined){
                            tempArr.push(oIdVal);
                        }if(variable_1 != undefined){
                            tempArr.push(variable_1);
                        }if(variable_3 != undefined){
                            tempArr.push(variable_3);
                        }
                        $("#variableName2"+idd).val(oNameVal);
                        $("#MiXEuVal2"+idd).val(oMixVal);
                        $("#MinEuVal2"+idd).val(oMinVal);
                        $("#DataComment2"+idd).val(oCommentVal);
                        $("#variableType2"+idd).val(oTypeVal);
                        control.attr({
                            "variableID":tempArr,
                            "variableID2":oIdVal,
                            "variableName2":oNameVal,
                            "variableType2":oTypeVal,
                            "MiXEuVal2":oMixVal,
                            "MinEuVal2":oMinVal,
                            "DataComment2":oCommentVal
                        });
                        domal.remove();
                        wrap.remove();
                    }
		        });
		    }
		};
		/*=========变量四========*/
		function ModalFeature3(){ //模态框定义
		    var _this3 = this;
		    var isOpened3 = false;
		    var navHtml3 = '';
		    this.ModalHtml3 = function() { //模态框的html
		        var Modalstr = '<div class="domalBox">' +
		                            '<header class="domal_drag">' +
		                                '<div class="domal_drag_box">' +
		                                    '<div class="domal_dragN">变量配置</div>' +
		                                    '<div class="domal_dragC">X</div>' +
		                                '</div>' +
		                            '</header>' +
		                            '<div id="contentbox">' +
		                                '<ul id="cfgList">' +
		                                    '<li class="cfgList_N">配置文件</li>' +
		                                    '<li class="cfgList_T"><input type="text"/></li>' +
		                                    '<li class="cfgList_B">' +
		                                        '<div>浏&nbsp;览</div>' +
		                                        '<input id="fileField" type="file"/>' +
		                                    '</li>' +
		                                '</ul>' +
		                                '<div id="nav">' +
		                                    '<div id="variableCfg">'+
		
		                                    '</div>'+
		                                '</div>' +
		                                '<div id="attributeBox">' +
		                                    '<ul class="attributeBoxList">' +
		                                        '<li class="cfgList_N">变量信息</li>' +
		                                        '<li class="cfgList_msg">' +
		                                            '<ul  class="attributeK">' +
		                                                '<li class="attributeK_name"><div>变量属性</div></li>' +
		                                                '<li class="attributeK_value"><div>值域</div></li>' +
		                                                '<li class="attributeKV">'+
		                                                    '<ul class="attributeKey">'+
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                        '<li></li>' +
		                                                    '</ul>'+
		                                                    '<ul class="attributeValue">'+
		                                                        '<li class="variableName"></li>' +
		                                                        '<li class="variableId"></li>' +
		                                                        '<li class="variableType"></li>' +
		                                                        '<li class="MiXEuVal"></li>' +
		                                                        '<li class="MinEuVal"></li>' +
		                                                        '<li class="DataComment"></li>' +
		                                                    '</ul>'+
		                                                '</li>' +
		                                            '</ul>' +
		                                        '</li>' +
		                                    '</ul>' +
		                                '</div>' +
		                            '</div>' +
		                            '<footer id="footer">' +
		                                '<ul>' +
		                                    '<li class="sureBtn">确认</li>' +
		                                    '<li class="cancel">取消</li>' +
		                                '</ul>' +
		                            '</footer>' +
		                        '</div>';
		        $("body").append(Modalstr);
		        var o = $(".domalBox");
		        o.wrap("<div class='wrap'></div>");
		    };
		  
		        $("#Config3"+id).bind("click",function(){
		            _this3.ModalHtml3();
		            if(isOpened3 == true){
		                $(navHtml3).appendTo($("#variableCfg"));
		            }
		            if(id[0].split("_")[0] == "Chart"){
		                $("#footer").find("li:first-child").text("添加");
		            }
		            _this3.domalMove3(selecteId);
		            _this3.removeDomal3.closeDomal(id);
		            _this3.ConfigTree3();
		            _this3.menuOperate3.variableMsg(id);
		            _this3.menuOperate3.treeSH();
		            _this3.menuOperate3.dbltreeSH();
		            _this3.menuOperate3.treeSys();
		            _this3.menuOperate3.dbltreeSys();
		            _this3.menuOperate3.treeDevice();
		            _this3.menuOperate3.dbltreeDevice();
		            _this3.bindvariable3(id)
		        });
		  
		    this.removeDomal3 = { //关闭配置变量框
		        closeX:function(arr){ //arr 选择集
		            var o = $(".domal_dragC");
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var sureBtn = $(".sureBtn");
		            o.bind("click",function(){
		                var variableID = [];
		                var variableName = [];
		                var variableType = [];
		                var MixEuVal = [];
		                var MinEuVal = [];
		                var DataColor = [];
		                var id = arr[0];
		                var ChartRadioBox = $(".radioBox"+id);
		                if(id.split("_")[0] == "Chart"){
		                    ChartRadioBox.find('.variableName'+id+'').each(function(i){
		                        var name = $(this).text();
		                        variableName.push(name);
		                        $("#"+id).attr("variableName3",variableName)
		                    });
		                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
		                        var Id = $(this).text();
		                        variableID.push(Id);
		                        $("#"+id).attr("variableID3",variableID)
		                    });
		                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
		                        var Type = $(this).text();
		                        variableType.push(Type);
		                        $("#"+id).attr("variableType3",variableType)
		                    });
		                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
		                        var Mix = $(this).text();
		                        MixEuVal.push(Mix);
		                        $("#"+id).attr("variableMix3",MixEuVal)
		                    });
		                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
		                        var Min = $(this).text();
		                        MinEuVal.push(Min);
		                        $("#"+id).attr("variableMin3",MinEuVal)
		                    });
		                    ChartRadioBox.find('.DataColor'+id+'').each(function(i){
		                        var Color = $(this).attr("variableColor3");
		                        DataColor.push(Color);
		                        $("#"+id).attr("DataColor3",DataColor)
		                    });
		                }
		                domal.remove();
		                wrap.remove();
		                sureBtn.removeAttr("support3");
		            })
		        },
		        closeC:function(arr){
		            var o = $(".cancel");
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var sureBtn = $(".sureBtn");
		            o.bind("click",function(){
		                var variableID = [];
		                var variableName = [];
		                var variableType = [];
		                var MixEuVal = [];
		                var MinEuVal = [];
		                var DataColor = [];
		                var id = arr[0];
		                var ChartRadioBox = $(".radioBox"+id);
		                if(id.split("_")[0] == "Chart"){
		                    ChartRadioBox.find('.variableName'+id+'').each(function(i){
		                        var name = $(this).text();
		                        variableName.push(name);
		                        $("#"+id).attr("variableName3",variableName)
		                    });
		                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
		                        var Id = $(this).text();
		                        variableID.push(Id);
		                        $("#"+id).attr("variableID3",variableID)
		                    });
		                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
		                        var Type = $(this).text();
		                        variableType.push(Type);
		                        $("#"+id).attr("variableType3",variableType)
		                    });
		                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
		                        var Mix = $(this).text();
		                        MixEuVal.push(Mix);
		                        $("#"+id).attr("variableMix3",MixEuVal)
		                    });
		                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
		                        var Min = $(this).text();
		                        MinEuVal.push(Min);
		                        $("#"+id).attr("variableMin3",MinEuVal)
		                    });
		                    ChartRadioBox.find('.variableColor'+id+'').each(function(i){
		                        var Color = $(this).attr("variableColor");
		                        DataColor.push(Color);
		                        $("#"+id).attr("DataColor3",DataColor)
		                    });
		                }
		                domal.remove();
		                wrap.remove();
		                sureBtn.removeAttr("support3");
		            })
		        },
		        closeDomal:function(arr){
		            this.closeX(arr);
		            this.closeC(arr);
		        }
		
		    };
		    this.domalMove3 = function(){ //模态框的移动
		        var domal_dragO = $(".domal_drag");
		        var o = $(".domalBox");
		        domal_dragO.bind("mousedown",function(e){
		            var e = e || event;
		            var x = e.clientX - o[0].offsetLeft;
		            var y = e.clientY - o[0].offsetTop;
		            $(window).bind("mousemove",function(e){
		                var e = e || event;
		                var l = e.clientX - x;
		                var t = e.clientY - y;
		                if(l <= 0){
		                    l = 0;
		                }else if(l >=  document.documentElement.clientWidth  - o[0].offsetLeft){
		                    l =  document.documentElement.clientWidth - o[0].offsetLeft;
		                }
		                if(t <= 0){
		                    t = 0;
		                }else if(t >=  document.documentElement.clientHeight  - o[0].offsetTop){
		                    t =  document.documentElement.clientHeight  - o[0].offsetTop;
		                }
		                o.css({"top":t,"left":l});
		            });
		            $(window).bind("mouseup",function(e){
		                $(window).unbind("mousemove");
		                $(window).unbind("mouseup");
		            })
		        })
		    };
		    this.ConfigTree3 = function(){ //选择配置文件
		        var ConfigO = $("#fileField");
		        var cfg = $('<div class="hide parents"><img src="images/close.png" /><div>F:\\web\\codeNew\\js\\BMSProject111.json</div></div>');
		        ConfigO.unbind("change").bind("change",function() {
		            var variableCfgO = $("#variableCfg");
		            var files = ConfigO.prop('files');//获取到文件列表
		            var reader = new FileReader();//新建一个FileReader
		            reader.readAsText(files[0], "ANSI");//读取文件
		            reader.onload = function(evt){ //读取完文件之后会回来这里
		                var fileString = evt.target.result;
		                var oJSON = JSON.parse(fileString);//将jsong字符串解析成json对象
		                variableCfgO.children().remove();
		                cfg.appendTo(variableCfgO);
		                var oSunsys = oJSON["Subsys"];
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
		                                'DataType3='+oSunsys[k]["Device"][v]["Tag"][g]["DataType"]+' ' +
		                                'DataComment3='+oSunsys[k]["Device"][v]["Tag"][g]["DataComment"]+'' +
		                                ' Name3='+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'>'+oSunsys[k]["Device"][v]["Tag"][g]["Name"]+'</div>'+
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
		                                $("#variable"+k+v+g).children("div").attr({"MinEuVal3":MinEuVal,"MaxEuVal3":MaxEuVal});
		                            })
		                        })
		                    })
		                });
		                navHtml = $("#variableCfg").html();
		                isOpened = true;
		            }
		        })
		    };
		    this.menuOperate3 = {
		        variableMsg:function(idd){ //显示变量相关属性
		            var key = $(".attributeKey li");
		            var val = $(".attributeValue li");
		            $("#variableCfg").on("click",".variableTxt",function(){
		                var control = $("#"+idd);
		                var sureBtn = $(".sureBtn");
		                var dataType = control.attr("DataType3");
		                var supportDataType = dataType.split(",");
		                var len = supportDataType.length;
		                var Name ='',ID = '',DataType = '',DataComment = '',MinEuVal = '',MaxEuVal = '';
		                    Name = $(this).attr("Name3");
		                    ID = $(this).attr("id");
		                    DataType = $(this).attr("DataType3");
		                    DataComment = $(this).attr("DataComment3");
		                    MinEuVal = $(this).attr("MinEuVal3");
		                    MaxEuVal = $(this).attr("MaxEuVal3");
		                    sureBtn.removeAttr("support3");
		                key.each(function(i){
		                    switch(i){
		                        case 0:
		                            key.eq(0).text("变量名称");
		                            val.eq(0).text(Name);
		                            break;
		                        case 1:
		                            key.eq(1).text("变量ID");
		                            val.eq(1).text(ID);
		                            break;
		                        case 2:
		                            key.eq(2).text("变量类型");
		                            val.eq(2).text(DataType);
		                            break;
		                        case 3:
		                            key.eq(3).text("最大工程值");
		                            val.eq(3).text(MaxEuVal);
		                            break;
		                        case 4:
		                            key.eq(4).text("最小工程值");
		                            val.eq(4).text(MinEuVal);
		                            break;
		                        case 5:
		                            key.eq(5).text("变量注释");
		                            val.eq(5).text(DataComment);
		                            break;
		                        default: false;
		                    }
		                });
		                for(var i=0;i<len;i++){ //判断控件是否支持此变量的数据类型
		                    if(supportDataType[i] === DataType){
		                        sureBtn.css("background","#d73300");
		                        sureBtn.attr("support3","support");
		                        return false;
		                    }else{
		                        sureBtn.css("background","#a0a09b");
		                        sureBtn.attr("support3","");
		                    }
		                }
		            });
		        },
		        treeSH:function(){ //对子系统的展开收缩
		            $("#variableCfg").on("click",".parents img",function(){
		                if($(this).parent(".parents").siblings(".systems").length>=1){
		                    if($(this).parent(".parents").siblings(".systems").is(":visible")){
		                        $(this).parent(".parents").siblings(".systems").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".parents").siblings(".systems").show();
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        dbltreeSH:function(){ //对子系统的展开收缩
		            $("#variableCfg").on("dblclick",".parents div",function(){
		                if($(this).parent(".parents").siblings(".systems").length>=1){
		                    if($(this).parent(".parents").siblings(".systems").is(":visible")){
		                        $(this).parent(".parents").siblings(".systems").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".parents").siblings(".systems").show();
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        treeSys:function(){ //对设备的展开收缩
		            $("#variableCfg").on("click",".systems img",function(){
		                if($(this).parent(".systems").children(".device").length>=1){
		                    if($(this).parent(".systems").children(".device").is(":visible")){
		                        $(this).parent(".systems").children(".device").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".systems").children(".device").show();
		                        if($(this).parent(".systems").index() == $(".systems").length){
		                            $(this).parent(".systems").children(".device").css("background","");
		                        }else{
		                            $(this).parent(".systems").children(".device").css("background","url('images/bar3.gif') no-repeat 24px 0px");
		                        }
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        dbltreeSys:function(){ //对设备的展开收缩
		            $("#variableCfg").on("dblclick",".systems .systemsTxt",function(){
		                if($(this).parent(".systems").children(".device").length>=1){
		                    if($(this).parent(".systems").children(".device").is(":visible")){
		                        $(this).parent(".systems").children(".device").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".systems").children(".device").show();
		                        if($(this).parent(".systems").index() == $(".systems").length){
		                            $(this).parent(".systems").children(".device").css("background","");
		                        }else{
		                            $(this).parent(".systems").children(".device").css("background","url('images/bar3.gif') no-repeat 24px 0px");
		                        }
		                        $(this).attr("src","images/close.png");
		                    }
		                }
		            })
		        },
		        treeDevice:function(){ //对变量的展开收缩
		            $("#variableCfg").on("click",".device img",function(){
		                if($(this).parent(".device").children(".variable").length>=1){
		                    if($(this).parent(".device").children(".variable").is(":visible")){
		                        $(this).parent(".device").children(".variable").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".device").children(".variable").show();
		                        $(this).attr("src","images/close.png");
		                        $(this).parent(".device").children(".variable").children(".variablePic").attr("src","images/bar1.gif");
		                        $(this).parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar2.gif");
		                        if($(this).parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
		                            $(this).parent(".device").children(".variable").css("margin-left","24px");
		                        }else{
		                            $(this).parent(".device").children(".variable").css("background","url('images/bar3.gif') no-repeat 41px 0px");//设备
		                            if($(this).parent(".device").children(".variable").children("#p1").length<1){//系统
		                                $(this).parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar3.gif">');
		                            }
		                        }
		                    }
		                }
		            })
		        },
		        dbltreeDevice:function(){ //对变量的展开收缩
		            $("#variableCfg").on("dblclick",".device .deviceTxt",function(){
		                if($(this).parent(".device").children(".variable").length>=1){
		                    if($(this).parent(".device").children(".variable").is(":visible")){
		                        $(this).parent(".device").children(".variable").hide();
		                        $(this).attr("src","images/open.png");
		                    }else{
		                        $(this).parent(".device").children(".variable").show();
		                        $(this).attr("src","images/close.png");
		                        $(this).parent(".device").children(".variable").children(".variablePic").attr("src","images/bar1.gif");
		                        $(this).parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar2.gif");
		                        if($(this).parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
		                            $(this).parent(".device").children(".variable").css("margin-left","24px");
		                        }else{
		                            $(this).parent(".device").children(".variable").css("background","url('images/bar3.gif') no-repeat 41px 0px");//设备
		                            if($(this).parent(".device").children(".variable").children("#p1").length<1){//系统
		                                $(this).parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar3.gif">');
		                            }
		                        }
		                    }
		                }
		            })
		        }
		
		    };
		    this.bindvariable3 = function(idd){ //对控件绑定变量id（多变量未处理）
		        var sureBtn = $(".sureBtn");
		        var variableID = [];
		        var tempId = [];
		        sureBtn.bind("click",function(){ //对控件添加变量的ID属性
		            $("#duihao3"+idd).text("√");
		            var oParent = $(".attributeValue");
		            var oIdVal = oParent.children(".variableId").text();
		            var oNameVal = oParent.children(".variableName").text();
		            var oTypeVal = oParent.children(".variableType").text();
		            var oMixVal= oParent.children(".MiXEuVal").text();
		            var oMinVal= oParent.children(".MinEuVal").text();
		            var oCommentVal = oParent.children(".DataComment").text();
		            var control = $("#"+idd);
		            var domal = $(".domalBox");
		            var wrap = $(".wrap");
		            var ChartTag = $(".radioBox"+idd);
		            var variableColor;
		            //随机颜色值
		            var getRandomColor = function(){
		                return "#"+Math.floor(Math.random()*16777215).toString(16);
		            };
		            variableColor = getRandomColor();
		            if(sureBtn.attr("support3") == "support"){
		                //oTypeVal为枚举行需加判断
		                switch (oTypeVal){
		                    case '0':
		                        oTypeVal = "开关量";
		                        break;
		                    case '1':
		                        oTypeVal = "整型量";
		                        break;
		                    case '2':
		                        oTypeVal = "浮点量";
		                        break;
		                    case '3':
		                        oTypeVal = "字符量";
		                        break;
		                    default:false;
		                }
                        var tempArr = [];
                        var variable_0 = control.attr("variableID0");
                        var variable_1 = control.attr("variableID1");
                        var variable_2 = control.attr("variableID2");
                        if(variable_0 != undefined) {
                            tempArr.push(variable_0);
                        }if(oIdVal != undefined){
                            tempArr.push(oIdVal);
                        }if(variable_1 != undefined){
                            tempArr.push(variable_1);
                        }if(variable_2 != undefined){
                            tempArr.push(variable_2);
                        }
                        $("#variableName3"+idd).val(oNameVal);
                        $("#MiXEuVal3"+idd).val(oMixVal);
                        $("#MinEuVal3"+idd).val(oMinVal);
                        $("#DataComment3"+idd).val(oCommentVal);
                        $("#variableType3"+idd).val(oTypeVal);
                        control.attr({
                            "variableID":tempArr,
                            "variableID3":oIdVal,
                            "variableName3":oNameVal,
                            "variableType3":oTypeVal,
                            "MiXEuVal3":oMixVal,
                            "MinEuVal3":oMinVal,
                            "DataComment3":oCommentVal
                        });
                        domal.remove();
                        wrap.remove();
		            }
		        });
		    }
		};
        /*============配置变量的切换================*/
        $("#elevatorattrc1"+idd).bind("mousedown",function(){
        	$("#"+idd).attr( "telvatorch","telvatorch1");
      		$("#elevatorcharge1"+idd).css({
      			"display":"block"
      		});
      		$("#elevatorcharge1"+idd).siblings(".charge").css({
      			"display":"none"
      		});
      		$(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
        $("#elevatorattrc2"+idd).bind("mousedown",function(){
        	$("#"+idd).attr( "telvatorch","telvatorch2");
      	    $("#elevatorcharge2"+idd).css({
      			"display":"block"
      	 	});
      	    $("#elevatorcharge2"+idd).siblings(".charge").css({
      			"display":"none"
      		});
      	    $(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
        $("#elevatorattrc3"+idd).bind("mousedown",function(){
      	    $("#"+idd).attr( "telvatorch","telvatorch3");
      	    $("#elevatorcharge3"+idd).css({
      			"display":"block"
      		});
      	    $("#elevatorcharge3"+idd).siblings(".charge").css({
      			"display":"none"
      		});
      	    $(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
        $("#elevatorattrc4"+idd).bind("mousedown",function(){
      	    $("#"+idd).attr( "telvatorch","telvatorch4");
      	    $("#elevatorcharge4"+idd).css({
      			"display":"block"
      		});
      	    $("#elevatorcharge4"+idd).siblings(".charge").css({
      			"display":"none"
      		});
      	    $(this).css({
      			"background":"#b5dcf0"
      		});
      		$(this).siblings().css({
      			"background":"#f3f3f3"
      		});
        });
		/*=======电梯名称============*/
        $("#elevatorsName"+idd).bind("input", function(){
        	var eleName= $("#elevatorsName"+idd).val();
			$("#elevatorNM"+idd).text(eleName);
			$("#"+idd).attr("valuenamett",eleName);
		});
        /*================影藏视频==========*/
        $("#elevatoroff"+idd).click(function(){
        	if(elevatoroff2){
        		$("#"+idd).attr("cucces","yes");
        		$(this).css({
        			"background-image":"url(images/selected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
        		});
        		$("#elevatorradio"+idd).css({
        			"display":"none"
        		});
        		$("#elevatorBody"+idd).css({
        			"height":"calc(100% - 80px)"
        		});
        	}else{
        		$("#"+idd).attr("cucces","no");
        		$(this).css({
        			"background-image":"url(images/notselected.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
        		});
        		$("#elevatorradio"+idd).css({
        			"display":"block"
        		});
        		$("#elevatorBody"+idd).css({
        			"height":"calc(100% - 104px)"
        		});
        	}
        	elevatoroff2=!elevatoroff2;
        });
		/*====函数调用======*/
    	ModalFeature1();
    	ModalFeature2();
    	ModalFeature3();
		synchronous();
    };
    this.copy = function(srcId, desId) {
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var clas = srcIdElement.attr("class");
        var elevatorName=$("#"+srcId+" .elevatorBox input").val();
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px"
        }).addClass(clas);
        $("#"+desId+" .elevatorBox input").val(elevatorName);
        desIdElement.attr( "telvatorch", srcIdElement.attr( "telvatorch"));
        desIdElement.attr( "cucces", srcIdElement.attr( "cucces"));
        $("#elevatorNM"+desId).text($("#elevatorNM"+srcId).text());
        
        /*========复制变量========*/
        function configInfoCopy(){
	        if (srcIdElement.attr("variableId0")) {
	            desIdElement.attr({
	                "variableId0" : srcIdElement.attr("variableId0"),
	                "variableName0" : srcIdElement.attr("variableName0"),
	                "variableType0" : srcIdElement.attr("variableType0") ,
	                "MiXEuVal0" : srcIdElement.attr("MiXEuVal0"),
	                "MinEuVal0": srcIdElement.attr("MinEuVal0"),
	                "DataComment0" : srcIdElement.attr("DataComment0"),
	                "variableId" : srcIdElement.attr("variableId")
	            });
	        };
        };
        function configInfoCopy1(){
	        if (srcIdElement.attr("variableId1")) {
	            desIdElement.attr({
	                "variableId1" : srcIdElement.attr("variableId1"),
	                "variableName1" : srcIdElement.attr("variableName1"),
	                "variableType1" : srcIdElement.attr("variableType1") ,
	                "MiXEuVal1" : srcIdElement.attr("MiXEuVal1"),
	                "MinEuVal1": srcIdElement.attr("MinEuVal1"),
	                "DataComment1" : srcIdElement.attr("DataComment1"),
	                "variableId" : srcIdElement.attr("variableId")
	            });
	           
	        };
        };
        function configInfoCopy2(){
	        if (variableId12) {
	            desIdElement.attr({
	                "variableId2" : srcIdElement.attr("variableId2"),
	                "variableName2" : srcIdElement.attr("variableName2"),
	                "variableType2" : srcIdElement.attr("variableType2") ,
	                "MiXEuVal2" : srcIdElement.attr("MiXEuVal2"),
	                "MinEuVal2": srcIdElement.attr("MinEuVal2"),
	                "DataComment2" : srcIdElement.attr("DataComment2"),
	                "variableId" : srcIdElement.attr("variableId")
	            });
	           
	        };
        };
        function configInfoCopy3(){
	        if (variableId12) {
	            desIdElement.attr({
	                "variableId3" : srcIdElement.attr("variableId3"),
	                "variableName3" : srcIdElement.attr("variableName3"),
	                "variableType3" : srcIdElement.attr("variableType3") ,
	                "MiXEuVal3" : srcIdElement.attr("MiXEuVal3"),
	                "MinEuVal3": srcIdElement.attr("MinEuVal3"),
	                "DataComment3" : srcIdElement.attr("DataComment3"),
	                "variableId" : srcIdElement.attr("variableId")
	            });
	        };
        };
        if(srcIdElement.attr( "telvatorch")=="telvatorch1"){
        	configInfoCopy();	
	    }else if(srcIdElement.attr( "telvatorch")=="telvatorch2"){
	    	configInfoCopy1();
	    }else if(srcIdElement.attr( "telvatorch")=="telvatorch3"){
	    	configInfoCopy2();
	    }else if(srcIdElement.attr( "telvatorch")=="telvatorch4"){
	    	configInfoCopy3();
	    };
    };
};
//插图控件
var PictureControl = function(){
    this.configId = -1;
    this.createPicture = function(url){
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.picElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "pic_" + this.configId;
        this.id = idd;
        var picdiv = $('<div id='+idd+' class="contrl move '+idd+'"></div>');
        var img = $('<img id=img'+idd+' src ="'+url+'" />');
        img.appendTo(picdiv);
        picdiv.prependTo($('#content'));
        var scroltop = parseInt(document.body.scrollTop)+40;
        var scrolleft = parseInt(document.body.scrollLeft)+40;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left":scrolleft+"px",
            "top":scroltop+"px",
            "z-index": 2
        });
        $("#img"+idd).css({
            "width": 100+"%",
            "height": 100+"%",
            "margin":"0 auto",
            "overflow":"hidden",
            "cursor":"move"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.PicControlCopy = function(srcId,desId){
        var srcIdO = $("#"+srcId);
        var U= srcIdO.children("img").attr("src");
        var W = srcIdO.width();
        var H = srcIdO.height();
        var desIdO = $("#"+desId);
        desIdO.css({"width":W,"height":H});
        desIdO.children("img").attr("src",U);

    }
};
//海康视频控件
var HKVideoControl = function() {
    this.configId = -1;
    this.createHKVideoControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.hkvideoElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'HKVideo_' + this.configId;
        this.id = idd;
        var textdiv = $(
            '<div id=' + idd + ' class="contrl move" type="windowDisplay" directionControl="yes" imageType="0" cameraName="摄像头名称/位置">' +
                '<div class="totalVideo totalVideo'+idd+'">' +
                    '<div id="divPlugin'+idd+'" class="windowArea windowArea'+idd+'">视频窗口区</div>' +
                    '<div class="settingArea settingArea'+idd+'">' +
                        '<div class="videoTitle videoTitle'+idd+'">摄像头名称/位置</div>' +
                        '<div class="cloudControl cloudControl'+idd+'">' +
                            '<div class="enableControl'+idd+'">' +
                                '<div class="circle_1 circle_1'+idd+'"></div>' +
                                '<div class="circle_2 circle_2'+idd+'">' +
                                    '<div id="cloudUp-'+idd+'" class="cloudDirectionUp cloudDirectionUp'+idd+'"><div class="triangleUp"></div></div>' +
                                    '<div class="cloudDirectionBoth cloudDirectionBoth'+idd+'">' +
                                        '<div id="cloudLeft-'+idd+'" class="cloudDirectionLeft cloudDirectionLeft'+idd+'"><div class="triangleLeft"></div></div>' +
                                        '<div id="cloudRight-'+idd+'" class="cloudDirectionRight cloudDirectionRight'+idd+'"><div class="triangleRight"></div></div>' +
                                    '</div>' +
                                    '<div id="cloudDown-'+idd+'" class="cloudDirectionDown cloudDirectionDown'+idd+'"><div class="triangleDown"></div></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="picList picList'+idd+'">' +
                            '<img id="capturePic-'+idd+'" src="images/capturePic.png" title="抓拍">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
        $('#content').append(textdiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;

        //控件相关样式
        $('#' + idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 310 + 'px',
            'width': 600 + 'px',
            'border': '1px solid #dfdfdf',
            'background-color': '#f0f0f0',
            'padding': '9px 0 9px 9px',
            'border-radius': '15px'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.HKVideoPropertiesPage(selecteId);
        this.HKVideoPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.HKVideoPropertiesPage = function(idd) {
        var proAttributes = $(
            '<div id="tc3' + idd + '" class="tc33">' +
                '<fieldset class="videoAttrs">' +
                    '<legend>参数设置</legend>' +
                    '<div class="videoFather">' +
                        '<div class="videoDiv">' +
                            '<label>摄像头厂商</label>' +
                            '<select class="videoSelect" id="cameraBrand'+idd+'">' +
                                '<option value="请选择" selected="selected">请选择</option>' +
                                '<option value="海康威视">海康威视</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="videoDiv">IP地址<input type="text" class="rt videoInput cameraIP'+idd+'"/></div>' +
                        '<div class="videoDiv">端口号<input type="text" class="rt videoInput cameraPort'+idd+'"/></div>' +
                        '<div class="videoDiv">用户名<input type="text" class="rt videoInput username'+idd+'"/></div>' +
                        '<div class="videoDiv">密码<input type="password" class="rt videoInput password'+idd+'"/></div>' +
                        '<div class="videoDiv">摄像头名称/位置<input type="text" class="rt videoInput cameraName'+idd+'"/></div>' +
                        '<div class="videoDiv">' +
                            '<label>视频样式</label>' +
                            '<select class="videoSelect" id="videoDisplay'+idd+'">' +
                                '<option value="windowDisplay" selected="selected">窗口样式</option>' +
                                '<option value="hotspotDisplay">热点样式</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="videoDiv">' +
                            '<label>云台控制功能</label>' +
                            '<select class="videoSelect" id="directionControl'+idd+'">' +
                                '<option value="yes" selected="selected">有云台控制</option>' +
                                '<option value="no">无云台控制</option>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +
                '<fieldset class="videoAttrs">' +
                    '<legend>抓图</legend>' +
                    '<div class="videoFather">' +
                        '<div class="videoDiv">' +
                            '<label>抓图文件格式</label>' +
                            '<select class="videoSelect" id="captureFileFormat'+idd+'">' +
                                '<option value="0" selected="selected">JEPG</option>' +
                            '</select>' +
                        '</div>' +
                        '<div class="videoDiv1">抓图存储路径</div>' +
                        '<div class="status_attrText2">' +
                            '<form enctype="multipart/form-data">' +
                                '<input type="text" name="textField" id="videofileText'+idd+'" class="imageUrl1 imageUrl1'+idd+'" readonly/>' +
                                '<input type="button" class="addPosition imageButton imageButton'+idd+'" value="浏览"/>' +
                                '<input type="text" name="fileField" class="addPosition imageFile imageFile'+idd+'"/>' +
                            '</form>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +
            '</div>'
        );
        $('#fathy').append(proAttributes);
    };
    this.HKVideoPageFeatures = function(idd) {
        var controlObj = $('#'+idd);
        var cameraBrandSelect = $('#cameraBrand'+idd);
        var cameraBrandOption = cameraBrandSelect.children('option');
        var inputIPElement = $('.cameraIP'+idd);
        var inputPortElement = $('.cameraPort'+idd);
        var inputUserNameElement = $('.username'+idd);
        var inputPasswordElement = $('.password'+idd);
        var videoDisplay = $('#videoDisplay'+idd);
        var directionControl = $('#directionControl'+idd);
        var settingAreaElement = $('.settingArea'+idd);
        var imagesTypeSelect = $('#captureFileFormat'+idd);
        var imagesTypeOption = imagesTypeSelect.children('option');
        var dirFileElement = $('.imageFile'+idd);
        var ipAddress;
        var port;
        var userName;
        var password;
        var cameraName;
        //加密函数，对用户名和密码进行加密
        function compile(str) {
            var c = String.fromCharCode(str.charCodeAt(0) + str.length);
            for(var i = 1; i < str.length; i++) {
                c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i-1));
            }
            return escape(c);
        }
        //解密函数，对加密后的用户名和密码进行解密
        function unCompile(str) {
            str = unescape(str);
            var c = String.fromCharCode(str.charCodeAt(0) - str.length);
            for(var i = 1; i < str.length; i++) {
                c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i-1));
            }
            return c;
        }
        var windowDisplay = function() {
            if (controlObj.attr('type') === 'windowDisplay') {
                if (controlObj.attr('totalDom')) {
                    var temp = controlObj.attr('totalDom');
                    var tempTotal = $('<div class="totalVideo totalVideo'+idd+'"></div>');
                    tempTotal.append(temp);
                    controlObj.append(tempTotal);
                    controlObj.removeAttr('totalDom');
                    controlObj.css({
                        'height': '310px',
                        'width': '600px',
                        'background-color': 'rgb(240, 240, 240)',
                        'padding': '9px 0px 9px 9px',
                        'border-radius': '15px',
                        'background-image': ''
                    });
                }
            }
        };
        var hotspotDisplay = function() {
            if (controlObj.attr('type') === 'hotspotDisplay') {
                controlObj.attr('totalDom', $('.totalVideo'+idd).html());
                $('.totalVideo'+idd).remove();
                controlObj.css({
                    'width': '40px',
                    'height': '40px',
                    'background-image': 'url(images/videoHotspot.png)',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%',
                    'padding': '0px',
                    'background-color': 'transparent',
                    'border': '1px solid transparent',
                    'border-radius': '5px',
                    'cursor': 'pointer'
                });
            }
        };
        var settingFeatures = {
            setCameraBrand: function() { //摄像头厂商选择
                cameraBrandSelect.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var _this = $(this);
                    var windowPlayArea = $('<object classid="CLSID:240999BE-CBAD-44F7-A19D-DA415C8A5B58" codebase="DhVM.ocx" standby="加载中......" id="playOcx'+idd+'" style="width: 100%; height: 100%"></object>');
                    cameraBrandOption.each(function() {
                        if (_this.val() === $(this).val()) {
                            $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                            controlObj.attr('cameraBrand', $(this).val());
                            if ($(this).val() == '大华') {
                                $('#divPlugin'+idd).append(windowPlayArea);
                            }
                            return false;
                        }
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            ipInput: function() { //IP地址的输入
                inputIPElement.blur(function() {
                    if (!inItPropertiesPage.inputValidate.ipValidate($(this).val())) {
                        $(this).val('');
                        controlObj.removeAttr('ip');
                    } else {
                        ipAddress = inputIPElement.val();
                        controlObj.attr('ip', ipAddress);
                    }
                });
            },
            portInput: function() { //端口的输入
                inputPortElement.keyup(function() {
                    if (!inItPropertiesPage.inputValidate.portValidate($(this).val())) {
                        $(this).val('');
                        controlObj.removeAttr('port');
                    } else {
                        port = inputPortElement.val();
                        controlObj.attr('port', port);
                    }
                });
            },
            userNameInput: function() { //用户名的输入
                inputUserNameElement.keyup(function() {
                    userName = inputUserNameElement.val();
                    controlObj.attr('username', compile(userName));
                });
            },
            passwordInput: function() { //密码的输入
                inputPasswordElement.keyup(function() {
                    password = inputPasswordElement.val();
                    controlObj.attr('password', compile(password));
                });
            },
            cameraNameInput: function() { //摄像头名称、位置的输入
                $('.cameraName'+idd).bind('input', function() {
                    var name = $('.cameraName'+idd).val();
                    controlObj.attr('cameraName', name);
                    $('.videoTitle'+idd).html(name);
                    $('.videoTitle'+idd).attr('title', name);
                });
            },
            setVideoDisplay: function() { //视频样式展示：窗口样式或热点样式
                videoDisplay.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var value = $(this).find('option:selected').attr('value');
                    $(this).find('option:selected').attr('selected', 'selected').siblings('option').removeAttr('selected');
                    controlObj.attr('type', value);
                    if (value === 'windowDisplay') {
                        windowDisplay();
                    } else {
                        hotspotDisplay();
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            isDisplayCloudControl: function() { //是否展示云台控制功能
                directionControl.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var value = $(this).find('option:selected').attr('value');
                    $(this).find('option:selected').attr('selected', 'selected').siblings('option').removeAttr('selected');
                    controlObj.attr('directionControl', value);
                    if (value == 'yes') {
                        var settingDom = controlObj.attr('settingDom');
                        if (settingDom) {
                            var tempSetting = $('<div class="settingArea settingArea'+idd+'"></div>');
                            tempSetting.append(settingDom);
                            $('.totalVideo'+idd).append(tempSetting);
                            controlObj.removeAttr('settingDom');
                            $('.windowArea'+idd).css({
                                'width': 'calc(100% - 162px)'
                            });
                        }
                    } else {
                        controlObj.attr('settingDom', settingAreaElement.html());
                        settingAreaElement.remove();
                        $('.windowArea'+idd).css({
                            'width': 'calc(100% - 10px)'
                        });
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setCaptureImageType: function() { //设置抓图图片格式
                imagesTypeSelect.bind('change', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var _this = $(this);
                    imagesTypeOption.each(function() {
                        if (_this.val() === $(this).val()) {
                            $(this).attr('selected', 'selected').siblings('option').removeAttr('selected');
                            controlObj.attr('imageType', $(this).val());
                            return false;
                        }
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            },
            setCaptureImagePath: function() { //设置抓图文件夹路径
                dirFileElement.bind('click', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before', beforeLog);
                    webapi.getVideoPath();
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after', beforeLog);
                });
            },
            initControl: function() { //初始化控件
                $(".config_dis"+idd).attr("disabled","true");
                if (controlObj.attr('cameraBrand')) {
                    cameraBrandSelect.val(controlObj.attr('cameraBrand'));
                }
                if (controlObj.attr('ip')) {
                    inputIPElement.val(controlObj.attr('ip'));
                }
                if (controlObj.attr('port')) {
                    inputPortElement.val(controlObj.attr('port'));
                }
                if (controlObj.attr('username')) {
                    inputUserNameElement.val(unCompile(controlObj.attr('username')));
                }
                if (controlObj.attr('password')) {
                    inputPasswordElement.val(unCompile(controlObj.attr('password')));
                }
                if (controlObj.attr('cameraName')) {
                    cameraName = controlObj.attr('cameraName');
                    $('.cameraName'+idd).val(cameraName);
                    $('.videoTitle'+idd).html(cameraName);
                }
                if (controlObj.attr('type') === 'windowDisplay') {
                    videoDisplay.val('windowDisplay');
                    if (controlObj.attr('directionControl') === 'yes') {
                        var settingDom = controlObj.attr('settingDom');
                        if (settingDom) {
                            var tempSetting = $('<div class="settingArea settingArea'+idd+'"></div>');
                            tempSetting.append(settingDom);
                            $('.totalVideo'+idd).append(tempSetting);
                            controlObj.removeAttr('settingDom');
                            $('.windowArea'+idd).css({
                                'width': 'calc(100% - 162px)'
                            });
                        }
                    } else {
                        controlObj.attr('settingDom', settingAreaElement.html());
                        settingAreaElement.remove();
                        $('.windowArea'+idd).css({
                            'width': 'calc(100% - 10px)'
                        });
                    }
                } else {
                    videoDisplay.val('hotspotDisplay');
                }
                if (controlObj.attr('directionControl') === 'yes') {
                    directionControl.val('yes');
                } else {
                    directionControl.val('no');
                }
                if (controlObj.attr('imageType')) {
                    $('#captureFileFormat'+idd).val(controlObj.attr('imageType'));
                }
                if (controlObj.attr('dirPath')) {
                    $('#videofileText'+idd).val(controlObj.attr('dirPath'));
                }
            },
            init: function() {
                this.setCameraBrand();
                this.ipInput();
                this.portInput();
                this.userNameInput();
                this.passwordInput();
                this.cameraNameInput();
                this.setVideoDisplay();
                this.isDisplayCloudControl();
                this.setCaptureImageType();
                this.setCaptureImagePath();
                this.initControl();
            }
        };
        settingFeatures.init();
        //改变鼠标mouseover/mouseout时样式
        $('body').on('mouseover', '.cloudDirectionUp'+idd, function() {
            $(this).children('div').css('display', 'none');
            $(this).css({
                'background-image': 'url(images/cloudUp.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%',
                'cursor': 'pointer'
            });
        });
        $('body').on('mouseout', '.cloudDirectionUp'+idd, function() {
            $(this).children('div').css('display', 'block');
            $(this).css({
                'background-image': ''
            });
        });
        $('body').on('mouseover', '.cloudDirectionDown'+idd, function() {
            $(this).children('div').css('display', 'none');
            $(this).css({
                'background-image': 'url(images/cloudDown.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%',
                'cursor': 'pointer'
            });
        });
        $('body').on('mouseout', '.cloudDirectionDown'+idd, function() {
            $(this).children('div').css('display', 'block');
            $(this).css({
                'background-image': ''
            });
        });
        $('body').on('mouseover', '.cloudDirectionLeft'+idd, function() {
            $(this).children('div').css('display', 'none');
            $(this).css({
                'background-image': 'url(images/cloudLeft.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%',
                'cursor': 'pointer'
            });
        });
        $('body').on('mouseout', '.cloudDirectionLeft'+idd, function() {
            $(this).children('div').css('display', 'block');
            $(this).css({
                'background-image': ''
            });
        });
        $('body').on('mouseover', '.cloudDirectionRight'+idd, function() {
            $(this).children('div').css('display', 'none');
            $(this).css({
                'background-image': 'url(images/cloudRight.png)',
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%',
                'cursor': 'pointer'
            });
        });
        $('body').on('mouseout', '.cloudDirectionRight'+idd, function() {
            $(this).children('div').css('display', 'block');
            $(this).css({
                'background-image': ''
            });
        });
        $('body').on('mouseover', '#capturePic-'+idd, function() {
            $(this).attr('src', 'images/capturePic_hover.png');
        });
        $('body').on('mouseout', '#capturePic-'+idd, function() {
            $(this).attr('src', 'images/capturePic.png');
        });
        $('body').on('mouseover', '#fullScreen-'+idd, function() {
            $(this).attr('src', 'images/fullScreen_hover.png');
        });
        $('body').on('mouseout', '#fullScreen-'+idd, function() {
            $(this).attr('src', 'images/fullScreen.png');
        });
        $('body').on('mouseover', '#exitFullScreen-'+idd, function() {
            $(this).attr('src', 'images/exitFullScreen_hover.png');
        });
        $('body').on('mouseout', '#exitFullScreen-'+idd, function() {
            $(this).attr('src', 'images/exitFullScreen.png');
        });
        /*****大华网络摄像头*****/
        var ocxElement = document.getElementById('playOcx'+idd);
        $('.play'+idd).click(function() {
            //创建插件接口分发对象
            var plugin = ocxElement.CreatePlugin();
            //登录设备
            var oLiveView = {
                pchDeviceIP: '172.12.2.169',   // 远程设备IP
                nSvrPort: 80,                  // 三代协议交互端口
                pchUsrName: 'admin',           // 登录用户名
                pchUsrPassWord: 'admin',       // 登录密码
                nRtspPort: 80                  // Rtsp协议数据传输端口
            };
            var loginResult = plugin.LoginDevice(oLiveView.pchDeviceIP, oLiveView.nSvrPort, oLiveView.pchUsrName, oLiveView.pchUsrPassWord, oLiveView.nRtspPort);
            if (loginResult == 0) {
                console.log('登录成功!');
            } else {
                console.log('登录失败！');
            }
            //播放视频
            var nChannelID = 0;  //通道号
            var nStreamType = 0; //码流类型 0--主码流
            var nProtocolType = 0; //流数据传输类型 0--TCP；1--UDP
            var connectionResult = plugin.ConnectRealVideo(nChannelID, nStreamType, nProtocolType);
            if (connectionResult == true) {
                alert('视频播放设置成功！');
            } else {
                alert('视频播放设置失败！');
            }
        });
        this.copy = function(srcId, desId) {
            var srcIdElement = $('#' + srcId);
            var desIdElement = $('#' + desId);
            var height = srcIdElement.height();
            var width = srcIdElement.width();
            var srcClass = srcIdElement.attr('class');
            var cameraBrand = srcIdElement.attr('cameraBrand');
            var ip = srcIdElement.attr('ip');
            var port = srcIdElement.attr('port');
            var username = srcIdElement.attr('username');
            var password = srcIdElement.attr('password');
            var cameraName = srcIdElement.attr('cameraName');
            var directionControl = srcIdElement.attr('directionControl');
            var dirPath = srcIdElement.attr('dirPath');
            var type = srcIdElement.attr('type');
            var settingAreaEle = $('.settingArea'+desId);
            var directionControlEle = $('#directionControl'+desId);
            var videoDisplayEle = $('#videoDisplay'+desId);
            var totalAreaEle = $('.totalVideo'+desId);
            desIdElement.css({
                'width': width + 'px',
                'height': height + 'px'
            }).addClass(srcClass);
            //复制属性页信息
            if (cameraBrand) {
                desIdElement.attr('cameraBrand', cameraBrand);
            }
            if (ip) {
                desIdElement.attr('ip', ip);
            }
            if (port) {
                desIdElement.attr('port', port);
            }
            if (username) {
                desIdElement.attr('username', username);
            }
            if (password) {
                desIdElement.attr('password', password);
            }
            if (cameraName) {
                desIdElement.attr('cameraName', cameraName);
            }
            if (directionControl === 'no') { //无云台控制功能
                desIdElement.attr('directionControl', 'no');
                directionControlEle.val('no');
                directionControlEle.find("option[value='no']").attr("selected", 'selected').siblings('option').removeAttr('selected');
                desIdElement.attr('settingDom', settingAreaEle.html());
                settingAreaEle.remove();
                $('.windowArea'+desId).css({
                    'width': 'calc(100% - 10px)'
                });
            }
            if (dirPath) {
                desIdElement.attr('dirPath', dirPath);
            }
            if (type === 'hotspotDisplay') { //热点展示
                var totalDom = totalAreaEle.html();
                totalAreaEle.remove();
                desIdElement.css({
                    'width': srcIdElement.css('width'),
                    'height': srcIdElement.css('height'),
                    'background-image': 'url(images/videoHotspot.png)',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%',
                    'padding': '0px',
                    'background-color': 'transparent',
                    'border': '1px solid transparent',
                    'border-radius': '5px',
                    'cursor': 'pointer'
                }).attr({
                    'totalDom': totalDom,
                    'type': 'hotspotDisplay'
                });
                videoDisplayEle.val('hotspotDisplay');
                videoDisplayEle.find("option:selected").attr("selected", 'selected').siblings('option').removeAttr('selected');
            }
        };
    };
};
//通信测试控件
var CommunicateTestControl = function(){
    this.configId = -1;
    this.createcommunicateTestControl = function(x,y) {
        $("body").width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.communicateElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Communicate_" + this.configId;
        this.id = idd;
        var $div = $('<div id=' + idd + ' class="contrl communicateControl move'+idd+'">' +
                        '<div class="Communicate_box">'+
                            '<ul class="communicate_info">'+
                                '<li>' +
                                    '<input type="text" placeholder="测试名:" class="useName">' +
                                '</li>' +
                                '<li>'+
                                    '<input type="password" placeholder="口令码:" class="password">'+
                                '</li>'+
                            '</ul>'+
                            '<div class="Communicate_send"><img src="images/go.png" id="login'+idd+'"></div>'+
                        '</div>'+
                '</div>');
        $div.prependTo($('#content'));
        var scroltop = parseInt(document.body.scrollTop) + 40;
        var scrolleft = parseInt(document.body.scrollLeft) + 40;
        //控件相关样式
        $("#" + idd).css({
            "width":"275px",
            "height":"40px",
            "position": "absolute",
            "left": x+scrolleft + "px",
            "top": y+scroltop + "px",
            "z-index": 2
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
		inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
		this.communicatePropertiesPage(selecteId);
        this.communicatePageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
	this.communicatePropertiesPage = function(idd){
		var comHtml = '<div id="tc3'+idd+'" class="tc33"><div><fieldset class="attrs">' +
                        '<legend>服务器ip</legend>'+
						'<input type="text" value = "" placeholder=" 请输入服务器地址：" id="communicateIP" title="示例：www.baidu.com或127.0.0.1">'+
					'</fieldset></div></div>' ;
		$("#fathy").append(comHtml);
	};
	this.communicatePageFeatures = function(idd){
		$(".config_dis"+idd).attr("disabled","true");//禁止配置点表信息
		$("#communicateIP").bind("input",function(){
			var v = $(this).val();
			$("#"+idd).attr("nameIP",v);
			localStorage.setItem("newAddess", v);
		})
	};
    this.communicateControlCopy = function(srcId,desId){
        var srcIdO = $("#"+srcId);
        var W = srcIdO.width();
        var H = srcIdO.height();
        var desIdO = $("#"+desId);
        desIdO.css({"width":W,"height":H});
    }
};
/*=============移动场景导航==============*/
var RemovalshitControl = function() {
    this.createRemovalshitControl = function() {
    	var head = $('<meta charset="UTF-8">'
     +'<title>移动导航</title>'
	 +'<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>'
	 +'<meta name="format-detection" content="telephone=no" />'
	 +'<meta name="apple-mobile-web-app-capable" content="yes" />'
	 +'<meta name="apple-mobile-web-app-status-bar-style" content="black">'
    );
 var body = $('<div class="nav_contain" id="removalshit_0">'
	 +'	<div class="header" head_text="首页" head_texc="#ffffff" head_bg="#5192ca"><div class="head_txt">首页</div><div class="home"></div><div class="home1">筛选</div><div class="back"><div class="back_"></div></div></div>'
		 +'<div class="content" radio="one" nav_pages="nav_bar">'
		 +'	<div class="content_1 content_0-0" style="display:none">'
    		 +'<div class="souhead">'
    		 		+'<div class="souhead-ch1"><p>起始日期</p><p>终止日期</p></div>'
    		 		+'<div class="souhead-ch2"><p><input type="date" id="satardate1"/></p><p><input type="date" id="enddate1"/></p></div>'
    		 		+'<div class="souhead-ch3">数据类型</div>'
    		 		+'<div class="souhead-ch4"><select id="eventpice"><option>历史报警</option><option>历史事件</option><option>系统事件</option><option>实时报警</option></select></div>'
    			    +'<div class="souhead-ch5"><input type="button" value="搜索" id="searchvalue" /></div>'
    		 +'</div>'
    		 +'<div class="soubody" id="soubodyid">'
    			 +'<ul class="soubodyUl"><li>时间</li><li>变量名</li><li>事件</li><li>优先级</li></ul>'
    		 +'</div>'
		 +'	</div>'
		 +'	<div class="content_1 content_1-0" index = "index">'
			 +'	<div class="nav_1"><div class="nav_11 nav_shodw nav_img1"><p navtextc="#000000" class="nav_text nav_pos">设备自控系统</p><div class="close_btn"></div></div></div>'
			 +'	<div class="nav_1"><div class="nav_11 nav_shodw nav_img2"><p navtextc="#000000" class="nav_text nav_pos">区域控制系统</p><div class="close_btn"></div></div></div>'
			 +'	<div class="nav_1"><div class="nav_11"><div class="nav_two nav_21 nav_shodw lf nav_img3"><p navtextc="#000000" class="nav_text">空调系统</p></div><div class="nav_two nav_22 lf nav_img4"><p navtextc="#000000" class="nav_text">防盗报警系统</p><div class="close_btn"></div></div></div></div>'
			 +'<div class="nav_1"><div class="nav_11"><div class="nav_two nav_21 nav_shodw lf nav_img5"><p navtextc="#000000" class="nav_text">热水系统</p></div><div class="nav_two nav_22 lf nav_img6"><p navtextc="#000000" class="nav_text">门禁系统</p><div class="close_btn"></div></div></div></div>'
			 +'	<div class="nav_1"><div class="nav_11"><div class="nav_two nav_21 nav_shodw lf nav_img7"><p navtextc="#000000" class="nav_text">冷水系统</p></div><div class="nav_two nav_22 lf nav_img8"><p navtextc="#000000" class="nav_text">照明系统</p><div class="close_btn"></div></div></div></div>'
			 +'</div>'
			 +'<div class="content_1 content_2-0" id ="content_2-0idd" style="display:none">'
				 +'<div class="logo" id="logoidd"></div>'
				 +'<div class="logo_text" id="logo_textidd">易立智能化集控管理系统</div>'
				 +'<div class="log_in">'
				 +'	<div class="position"><input class="user inp tex" type="text" id="user-log" placeholder="用户名"></div>'
				 +'	<div class="position"><input class="pass inp tex" type="password" id="pass-log" placeholder="密码"></div>'
				 +'	<div class="positionlast"><input class="log inp" type="button" id="button-log" value="登录"><input class="log inp addinp" type="button" id="button-log1" value="退出"></div>'
				 +'</div>'
			 +'</div>'
		 +'</div>'
		 +'<div class="footer" footl_text="主页" footm_text="查询" footr_text="登录" foot_texc="#ffffff" foot_bg="#5192ca">'
			 +'<div class="search foot foott lf"><div class="foot_img search_img"></div><div class="foot_imgs foot_search">查询</div></div>'
			 +'<div class="index foot foott lf active" pages="navbar"><div class="foot_img index_img"></div><div class="foot_imgs foot_index">主页</div></div>'
			 +'<div class="login foot lf"><div class="foot_img login_img"></div><div class="foot_imgs foot_login">登录</div></div>'
	 +'	</div>'
	 +'</div>'
     +' <script src="js/jquery-1.12.4.js"></script>'
	 +' <script async="async" src="js/mobile.js"></script>'
	 +' <link rel="stylesheet" href="css/mobile.css">');
	 $("head").html(head);
	 $("body").html(body);
    };
};
//通用视频控件
var VideoControl = function() {
    this.configId = -1;
    var isOpened = false;
    this.createVideoControl = function(x, y) {
        $('body').width($(window).width() + document.body.scrollLeft);
        var maxNum = inItAllElementId.videoElementIDMaxNum();
        if (this.configId <= maxNum) {
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = 'Video_' + this.configId;
        this.id = idd;
        var textdiv = $(
            '<div id=' + idd + ' class="contrl move" type="windowDisplay" cameraName="摄像头名称或位置">' +
                '<div class="commonVideoTitle commonVideoTitle'+idd+'">摄像头名称/位置</div><div><img class="videoCutPIc" src="images/cutPic_0.png"></div>' +
                '<div class="containerDiv containerDiv'+idd+'">' +
                    '<div id="divPlugin'+idd+'" class="playArea playArea'+idd+'"><canvas id="video-canvas'+idd+'"></canvas></div>' +
                '</div>' +
            '</div>'
        );
        $('#content').append(textdiv);
        var scrollTop = document.body.scrollTop;
        var scrollLeft = document.body.scrollLeft;

        //控件相关样式
        $('#' + idd).css({
            'position': 'absolute',
            'left': x + scrollLeft + 'px',
            'top': y + scrollTop + 'px',
            'height': 250 + 'px',
            'width': 400 + 'px',
            'border': '1px solid #dfdfdf',
            'background-color': '#f0f0f0',
            'padding': '10px',
            'border-radius': '15px'
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd); //添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length - 1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId); //公共部分的DOM结构
        inItPropertiesPage.PublicFeatures(selecteId); //公共部分的功能
        this.VideoPropertiesPage(selecteId);
        this.VideoPageFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.VideoPropertiesPage = function(idd) {
        var proAttributes = $(
            '<div id="tc3' + idd + '" class="tc33">' +
                '<fieldset class="videoAttrs">' +
                    '<legend>参数设置</legend>' +
                    '<div class="videoFather">' +
                        '<div class="videoDiv">摄像头信息配置<button id="configInfo'+idd+'" class="rt videoInput1">选择文件</button></div>' +
                        '<div class="videoDiv">IP地址<input type="text" id="ip'+idd+'" class="rt videoInput2 cameraIP'+idd+'" disabled/></div>' +
                        '<div class="videoDiv">端口号<input type="text" id="port'+idd+'" class="rt videoInput2 cameraPort'+idd+'" disabled/></div>' +
                        '<div class="videoDiv">用户名<input type="text" id="username'+idd+'" class="rt videoInput2 username'+idd+'" disabled/></div>' +
                        '<div class="videoDiv">密码<input type="password" id="password'+idd+'" class="rt videoInput2 password'+idd+'" disabled/></div>' +
                        '<div class="videoDiv">摄像头名称/位置<input title="不能含有特殊字符" placeholder="不能含有特殊字符" type="text" class="rt videoInput2 cameraName'+idd+'"/></div>' +
                        '<div class="videoDivOther"><i>窗口样式展示</i><div class="video_attrDiv" id="windowDisplay'+idd+'"></div></div>' +
                        '<div class="videoDivOther"><i>热点样式展示</i><div class="video_attrDiv" id="hotspotDisplay'+idd+'"></div></div>' +
                    '</div>' +
                '</fieldset>' +
				'<fieldset class="videoAttrs">' +
                    '<legend>抓图</legend>' +
                    '<div class="videoFather">' +
                        '<div class="videoDiv1">抓图存储路径</div>' +
                        '<div class="status_attrText2">' +
                            '<form enctype="multipart/form-data">' +
                                '<input type="text" name="textField" id="videofileText'+idd+'" class="imageUrl1 imageUrl1'+idd+'" readonly/>' +
                                '<input type="button" class="addPosition imageButton imageButton'+idd+'" value="浏览"/>' +
                                '<input type="text" name="fileField" class="addPosition imageFile imageFile'+idd+'"/>' +
                            '</form>' +
                        '</div>' +
                    '</div>' +
                '</fieldset>' +
            '</div>'
        );
        $('#fathy').append(proAttributes);
    };
    this.VideoPageFeatures = function(idd) {
        var controlObj = $('#'+idd);
        var inputIPElement = $('.cameraIP'+idd);
        var inputPortElement = $('.cameraPort'+idd);
        var inputUserNameElement = $('.username'+idd);
        var inputPasswordElement = $('.password'+idd);
        var windowDisplayElement = $('#windowDisplay'+idd);
        var hotspotDisplayElement = $('#hotspotDisplay'+idd);
        var inputCameraName = $('.cameraName'+idd);
        var cameraName = $('.commonVideoTitle'+idd);
        var videoInfoHtml = '';
		var videoDirFileElement = $(".imageFile"+idd);
		var videoCutPIc = controlObj.find(".videoCutPIc");
        //加密函数，对用户名和密码进行加密
        function compile(str) {
            var c = String.fromCharCode(str.charCodeAt(0) + str.length);
            for(var i = 1; i < str.length; i++) {
                c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i-1));
            }
            return escape(c);
        }
        //解密函数，对加密后的用户名和密码进行解密
        function unCompile(str) {
            str = unescape(str);
            var c = String.fromCharCode(str.charCodeAt(0) - str.length);
            for(var i = 1; i < str.length; i++) {
                c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i-1));
            }
            return c;
        }
        var windowDisplay = function() {
            if (controlObj.attr('type') === 'windowDisplay') {
                if (controlObj.attr('totalDom')) {
                    controlObj.append($('<div class="commonVideoTitle commonVideoTitle'+idd+'">'+controlObj.attr('cameraName')+'</div>'));
                    var temp = controlObj.attr('totalDom');
                    var temp2 = $('<div class="containerDiv containerDiv'+idd+'"></div>');
                    temp2.append(temp);
                    controlObj.append(temp2);
                    controlObj.removeAttr('totalDom');
                    controlObj.css({
                        'height': '280px',
                        'width': '400px',
                        'background-color': 'rgb(240, 240, 240)',
                        'padding': '10px',
                        'border-radius': '15px',
                        'background-image': ''
                    });
                }
            }
        };
        var hotspotDisplay = function() {
            if (controlObj.attr('type') === 'hotspotDisplay') {
                controlObj.attr('totalDom', $('.containerDiv'+idd).html());
                $('.containerDiv'+idd).remove();
                $('.commonVideoTitle'+idd).remove();
                controlObj.attr({
                    'videoWidth': controlObj.width(),
                    'videoHeight': controlObj.height()
                }).css({
                    'width': '40px',
                    'height': '40px',
                    'background-image': 'url(images/videoHotspot.png)',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%',
                    'padding': '0px',
                    'background-color': 'transparent',
                    'border': '1px solid transparent',
                    'border-radius': '5px',
                    'cursor': 'pointer'
                });
            }
        };
        var ConfigInfoFeatures = function() {
            var _this = this;
            this.ModalHtml = function() { //模态框的html
                var Modalstr =
                    '<div class="wrap">' +
                        '<div class="domalBox">' +
                            '<header class="domal_drag">' +
                                '<div class="domal_drag_box">' +
                                    '<div class="domal_dragN">摄像头配置</div>' +
                                    '<div class="domal_dragC">X</div>' +
                                '</div>' +
                            '</header>' +
                            '<div id="contentbox">' +
                                '<ul id="cfgList">' +
                                    '<li class="cfgList_N">配置文件</li>' +
                                    '<li class="cfgList_T"><input id="inputUrl" type="text"/></li>' +
                                    '<li class="cfgList_B"><div>浏&nbsp;览</div><input id="fileField" type="text"/></li>' +
                                '</ul>' +
                                '<div id="nav"><div id="variableCfg"></div></div>' +
                                '<div id="attributeBox">' +
                                    '<ul class="attributeBoxList">' +
                                        '<li class="cfgList_N">详细信息</li>' +
                                        '<li class="cfgList_msg">' +
                                            '<ul  class="attributeK">' +
                                                '<li class="attributeK_name"><div>属性</div></li>' +
                                                '<li class="attributeK_value"><div>值域</div></li>' +
                                                '<li class="attributeKV">'+
                                                    '<ul class="attributeKey"><li></li><li></li><li></li><li></li><li></li><li></li></ul>'+
                                                    '<ul class="attributeValue">'+
                                                        '<li class="variableId"></li>' +
                                                        '<li class="variableRTSPAddr"></li>' +
                                                        '<li class="variableInputPort"></li>' +
                                                        '<li class="variableOutputPort"></li>' +
                                                        '<li class="videoWidth"></li>' +
                                                        '<li class="videoHeight"></li>' +
                                                    '</ul>'+
                                                '</li>' +
                                            '</ul>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                            '<footer id="footer"><ul><li id="sureBtn">确认</li><li id="cancel">取消</li></ul></footer>' +
                        '</div>' +
                    '</div>';
                $("body").append(Modalstr);
            };
            this.removeModal = { //关闭配置变量框
                removeModalBox:function (arr,obg) {//移除配置框，arr：选择集、obg：点击关闭对象；
                    var domal = $(".domalBox");
                    var wrap = $(".wrap");
                    var sureBtn = $("#sureBtn");
                    obg.bind("click",function(){
                        var id = arr[0];
                        domal.remove();
                        wrap.remove();
                        sureBtn.removeAttr("support");
                    })
                },
                closeX:function(arr){ //arr 选择集
                    var o = $(".domal_dragC");
                    _this.removeModal.removeModalBox(arr,o);
                },
                closeC:function(arr){
                    var o = $("#cancel");
                    _this.removeModal.removeModalBox(arr,o);
                },
                closeModal:function(arr){
                    this.closeX(arr);
                    this.closeC(arr);
                }
            };
            this.modalMove = function(){ //模态框的移动
                var domal_dragO = $(".domal_drag");
                var o = $(".domalBox");
                domal_dragO.bind("mousedown",function(e){
                    var e = e || event;
                    var x = e.clientX - o[0].offsetLeft;
                    var y = e.clientY - o[0].offsetTop;
                    $(window).bind("mousemove",function(e){
                        var e = e || event;
                        var l = e.clientX - x;
                        var t = e.clientY - y;
                        if(l <= 0){
                            l = 0;
                        }else if(l >=  document.documentElement.clientWidth  - o[0].offsetLeft){
                            l =  document.documentElement.clientWidth - o[0].offsetLeft;
                        }
                        if(t <= 0){
                            t = 0;
                        }else if(t >=  document.documentElement.clientHeight  - o[0].offsetTop){
                            t =  document.documentElement.clientHeight  - o[0].offsetTop;
                        }
                        o.css({"margin":"0px","top":t,"left":l});
                    });
                    $(window).bind("mouseup",function(e){
                        $(window).unbind("mousemove");
                        $(window).unbind("mouseup");
                    })
                })
            };
            this.configTree = function(){ //选择配置文件
                var ConfigO = $("#fileField");
                ConfigO.unbind("click").bind("click",function() {
                    isOpened = true;
                    webapi.getJsonPath();
                });
            };
            this.menuOperate = {
                variableMsg:function(idd){ //显示变量相关属性
                    var key = $(".attributeKey li");
                    var val = $(".attributeValue li");
                    $("#variableCfg").on("click",".systemsTxt",function(){
                        $(this).addClass('variableTxtHover').parents('.systems').siblings().children('.systemsTxt').removeClass('variableTxtHover');
                        var control = $("#"+idd);
                        var sureBtn = $("#sureBtn");
                        var id, rtspAddress, outputPort, inputPort, videoWidth, videoHeight;
                        id = $(this).attr("id");
                        rtspAddress = $(this).attr("rtspAddress");
                        outputPort = $(this).attr("outputPort");
                        inputPort = $(this).attr("inputPort");
                        videoWidth = $(this).attr("videoWidth");
                        videoHeight = $(this).attr("videoHeight");
                        key.each(function(i){
                            switch(i){
                                case 0:
                                    key.eq(0).text("编号");
                                    val.eq(0).text(id);
                                    break;
                                case 1:
                                    key.eq(1).text("RTSP地址");
                                    val.eq(1).text(rtspAddress);
                                    break;
                                case 2:
                                    key.eq(2).text("输入端口");
                                    val.eq(2).text(inputPort);
                                    break;
                                case 3:
                                    key.eq(3).text("输出端口");
                                    val.eq(3).text(outputPort);
                                    break;
                                case 4:
                                    key.eq(4).text("图像宽度");
                                    val.eq(4).text(videoWidth);
                                    break;
                                case 5:
                                    key.eq(5).text("图像高度");
                                    val.eq(5).text(videoHeight);
                                    break;
                                default: false;
                            }
                        });
                        sureBtn.css("background","#d73300");
                        sureBtn.attr("support","support");
                    });
                },
                treeNavSystem:function(obj){//收起导航树
                    if(obj.parent(".parents").siblings(".systems").length >= 1){
                        if(obj.parent(".parents").siblings(".systems").is(":visible")){
                            obj.parent(".parents").siblings(".systems").hide();
                            obj.attr("src","images/open.png");
                        }else{
                            obj.parent(".parents").siblings(".systems").show();
                            obj.attr("src","images/close.png");
                        }
                    }
                },
                treeSH:function(){ //对子系统的展开收缩
                    $("#variableCfg").on("click",".parents img",function(){
                        _this.menuOperate.treeNavSystem($(this));
                    })
                },
                dblTreeSH:function(){ //对子系统的展开收缩
                    $("#variableCfg").on("dblclick",".parents div",function(){
                        _this.menuOperate.treeNavSystem($(this));
                    })
                }
            };
            this.bindVariable = function(idd){ //对控件绑定变量id
                var sureBtn = $("#sureBtn");
                var controlO = $("#"+idd);
                var variableID = [];
                var tempId = [];
                sureBtn.bind("click",function(){ //对控件添加变量的ID属性
                    var oParent = $(".attributeValue");
                    var oRTSPAddressVal = oParent.children(".variableRTSPAddr").text();
                    var oOutputPortVal = oParent.children(".variableOutputPort").text();
                    var oVideoWidth= oParent.children(".videoWidth").text();
                    var oVideoHeight = oParent.children(".videoHeight").text();
                    var control = $("#"+idd);
                    var modal = $(".domalBox");
                    var wrap = $(".wrap");
                    if(sureBtn.attr("support") == "support"){
                        var tempString = oRTSPAddressVal.split('\/\/')[1];
                        tempString = tempString.split('@');
                        var arr1 = tempString[0].split(':');
                        var arr2 = tempString[1].split(':');
                        $("#ip"+idd).val(arr2[0]);
                        $("#port"+idd).val(oOutputPortVal);
                        $("#username"+idd).val(arr1[0]);
                        $("#password"+idd).val(arr1[1]);
                        if (control.attr('type') == 'windowDisplay') {
                            control.attr({
                                "ip": arr2[0],
                                "port": oOutputPortVal,
                                "username": compile(arr1[0]),
                                "password": compile(arr1[1])
                            }).css({
                                'width': oVideoWidth + 'px',
                                'height': oVideoHeight + 'px'
                            });
                        } else {
                            control.attr({
                                "ip": arr2[0],
                                "port": oOutputPortVal,
                                "username": compile(arr1[0]),
                                "password": compile(arr1[1]),
                                'videoWidth': oVideoWidth,
                                'videoHeight': oVideoHeight
                            });
                        }
                        modal.remove();
                        wrap.remove();
                        alert('摄像头信息配置成功！');
                    }
                });
            };
        };
        var initConfigInfo = new ConfigInfoFeatures();
        var settingFeatures = {
            readConfigInfo: function() {
                var ConfigO = $("#configInfo"+idd);
                ConfigO.bind("click",function(){
                    initConfigInfo.ModalHtml(); //配置框DOM结构
                    if (isOpened == true) {
                        videoInfoHtml = localStorage.getItem('videoInfoHtml');
                        $(videoInfoHtml).appendTo($("#variableCfg"));
                        $('#inputUrl').val(localStorage.getItem('videoJsonUrl'));
                    }
                    initConfigInfo.modalMove();
                    initConfigInfo.removeModal.closeModal(idd); //关闭配置框
                    initConfigInfo.configTree();
                    initConfigInfo.menuOperate.variableMsg(idd);
                    initConfigInfo.menuOperate.treeSH();
                    initConfigInfo.menuOperate.dblTreeSH();
                    initConfigInfo.bindVariable(idd);
                });
            },
            cameraNameInput: function() { //摄像头名称、位置的输入
                inputCameraName.bind('input', function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before', beforeLog);
                    var name = inputCameraName.val();
					var reg = new RegExp('^[^\\\\\\/:*?\\"<>|]+$');
					if(reg.test(name)){
						controlObj.attr('cameraName', name);
						cameraName.html(name);
					}else{
						inputCameraName.val("");
						controlObj.attr('cameraName', "");
					} 
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after', beforeLog);
                });
            },
            setWindowDisplay: function() { //窗口样式展示
                windowDisplayElement.click(function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before', beforeLog);
                    windowDisplayElement.css({'background': 'url(images/yixuan.png)'});
                    hotspotDisplayElement.css({'background': 'url(images/weixuan.png)'});
                    var value = controlObj.attr('type');
                    if (value === 'hotspotDisplay') {
                        controlObj.removeAttr('type', 'hotspotDisplay');
                        controlObj.attr('type', 'windowDisplay');
                        windowDisplay();
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after', beforeLog);
                });
            },
            setHotspotDisplay: function() { //热点样式展示
                hotspotDisplayElement.click(function() {
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before', beforeLog);
                    hotspotDisplayElement.css({'background': 'url(images/yixuan.png)'});
                    windowDisplayElement.css({'background': 'url(images/weixuan.png)'});
                    var value = controlObj.attr('type');
                    if (value === 'windowDisplay') {
                        controlObj.removeAttr('type');
                        controlObj.attr('type', 'hotspotDisplay');
                        hotspotDisplay();
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after', beforeLog);
                });
            },
            initControl: function() { //初始化控件
                $(".config_dis"+idd).attr("disabled","true");
                if (controlObj.attr('ip')) {
                    inputIPElement.val(controlObj.attr('ip'));
                }
                if (controlObj.attr('port')) {
                    inputPortElement.val(controlObj.attr('port'));
                }
                if (controlObj.attr('username')) {
                    inputUserNameElement.val(unCompile(controlObj.attr('username')));
                }
                if (controlObj.attr('password')) {
                    inputPasswordElement.val(unCompile(controlObj.attr('password')));
                }
                if (controlObj.attr('cameraName')) {
                    var name = controlObj.attr('cameraName');
                    inputCameraName.val(name);
                    cameraName.html(name);
                }
                if (controlObj.attr('type') === 'windowDisplay') {
                    $('#windowDisplay'+idd).css({'background': 'url(images/yixuan.png)'});
                    $('#hotspotDisplay'+idd).css({'background': 'url(images/weixuan.png)'});
                } else if (controlObj.attr('type') === 'hotspotDisplay'){
                    $('#windowDisplay'+idd).css({'background': 'url(images/weixuan.png)'});
                    $('#hotspotDisplay'+idd).css({'background': 'url(images/yixuan.png)'});
                }
            },
			setCaptureImagePath: function() { //设置抓图文件夹路径
                videoDirFileElement.bind('click', function() {
                    webapi.getVideoPath();
                });
				videoCutPIc.hover(function(){
					videoCutPIc.attr("src","images/cutPic_1.png");
				},function(){
					videoCutPIc.attr("src","images/cutPic_0.png");
				}); 
            },
            init: function() {
                this.readConfigInfo();
                this.cameraNameInput();
                this.setWindowDisplay();
                this.setHotspotDisplay();
                this.initControl();
				this.setCaptureImagePath();
            }
        };
        settingFeatures.init();
        this.copy = function(srcId, desId) {
            var srcIdElement = $('#' + srcId);
            var desIdElement = $('#' + desId);
            var height = srcIdElement.height();
            var width = srcIdElement.width();
            var srcClass = srcIdElement.attr('class');
            var ip = srcIdElement.attr('ip');
            var port = srcIdElement.attr('port');
            var username = srcIdElement.attr('username');
            var password = srcIdElement.attr('password');
            var cameraName = srcIdElement.attr('cameraName');
			var pathName = srcIdElement.attr('dirPath');
            var type = srcIdElement.attr('type');
            desIdElement.css({
                'width': width + 'px',
                'height': height + 'px'
            }).addClass(srcClass);
            //复制属性页信息
            if (ip) {
                desIdElement.attr('ip', ip);
            }
            if (port) {
                desIdElement.attr('port', port);
            }
            if (username) {
                desIdElement.attr('username', username);
            }
            if (password) {
                desIdElement.attr('password', password);
            }
            if (cameraName) {
                desIdElement.attr('cameraName', cameraName);
            }
			if(pathName){
				desIdElement.attr('dirPath', pathName);
			}
            if (type === 'hotspotDisplay') { //热点展示
                var totalDom = $('.containerDiv'+desId).html();
                $('.containerDiv'+desId).remove();
                $('.commonVideoTitle'+desId).remove();
                desIdElement.css({
                    'width': srcIdElement.css('width'),
                    'height': srcIdElement.css('height'),
                    'background-image': 'url(images/videoHotspot.png)',
                    'background-repeat': 'no-repeat',
                    'background-size': '100% 100%',
                    'padding': '0px',
                    'background-color': 'transparent',
                    'border': '1px solid transparent',
                    'border-radius': '5px',
                    'cursor': 'pointer'
                }).attr({
                    'totalDom': totalDom,
                    'type': 'hotspotDisplay',
                    'videoWidth': srcIdElement.attr('videoWidth'),
                    'videoHeight': srcIdElement.attr('videoHeight')
                });
            }
        };
    };
};
/*******************管道控件*******************/
var Pipeline = function(){   
    this.configId = -1;
    this.createPipelineControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.pipElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Pip_" + this.configId;
        this.id = idd;
        var textdiv = $('<div id='+idd+' class="contrl move pip" pip_sele="no" pip_ pip_lv="l" pip_L="1" pip_T="1" pip_fa="1" piptype="1">'+
                            '<div class="pip_bg pip_bg'+idd+'">'+
                            '<div class="bar_yi_l bar color4 pipbg'+idd+' lf"></div>'+
                            '<div class="bar color4 pipbg_'+idd+' lf"></div>'+
                            '</div>'+
                        '</div>');      
        textdiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 120 + "px",
            "height": 120 + "px"          
        }); 
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd);//添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesPage(selecteId);//公共部分的dom结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.pipelinePropertiesPage(selecteId);
        this.pipeline_features(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    };
    this.pipelinePropertiesPage = function(idd){
        var pipbtn = $('<div id="tc3'+idd+'" class="tc33"></div>');
        $("#fathy").append(pipbtn);
        var pipdom ='<fieldset class="line_attr1">'+
                        '<legend class="rotateb">管道选择</legend>'+
                            '<div class="pip_0 piptype_1">'+
                                '<label for="pipinp1">'+
                                    '<div class="lf pip_radio pip_shui"></div><div class="lf">一字型</div><div class="rt pip_img_1">'+
                                    '</div>'+
                                '</label>'+
                            '</div>'+
                            '<div class="pip_0 piptype_2">'+
                                '<label for="pipinp2">'+
                                    '<div class="lf pip_radio pip_chui"></div><div class="lf">L型</div><div class="rt pip_img pip_img_2">'+
                                    '</div>'+
                                 '</label>'+   
                            '</div>'+
                            '<div class="pip_0 piptype_3">'+
                                '<label for="pipinp3">'+
                                    '<div class="lf pip_radio pip_chui"></div><div class="lf">T型</div><div class="rt pip_img pip_img_3">'+
                                    '</div>'+
                                '</label>'+   
                            '</div>'+
                            '<div class="pip_0 piptype_4">'+
                                '<label for="pipinp4">'+
                                    '<div class="lf pip_radio pip_chui"></div><div class="lf">十字型</div><div class="rt pip_img pip_img_4">'+
                                    '</div>'+
                                '</label>'+   
                            '</div>'+
                        '</fieldset>'+
                        '<fieldset class="line_attr1 pip_box">'+
                        '<legend class="rotateb">管道编辑</legend>'+
                            '<div class="pip_edit pip_edit_1">'+
                                '<div class="pip_0 pip_1 pip_L">'+
                                    '<div class="pip_shui pip_c lf"></div><div class="pipshui pip_s lf">水平</div>'+
                                '</div>'+
                                '<div class="pip_0 pip_1 pip_V">'+
                                    '<div class="pip_chui pip_c lf"></div><div class="pipchui pip_s lf">垂直</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="pip_edit pip_edit_2">'+
                                '<div class="pip_0 pip_2 pip_lt">'+
                                    '<div class="pip_shui pip_b lf"></div><div class="pipshui pip_s lf">左上</div>'+
                                '</div>'+
                                '<div class="pip_0 pip_2 pip_rt">'+
                                    '<div class="pip_chui pip_b lf"></div><div class="pipchui pip_s lf">右上</div>'+
                                '</div>'+
                                '<div class="pip_0 pip_2 pip_lb">'+
                                    '<div class="pip_shui pip_b lf"></div><div class="pipshui pip_s lf">左下</div>'+
                                '</div>'+
                                '<div class="pip_0 pip_2 pip_rb">'+
                                    '<div class="pip_chui pip_b lf"></div><div class="pipchui pip_s lf">右下</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="pip_edit pip_edit_3">'+
                                '<div class="pip_0 pip_3 pip_top">'+
                                    '<div class="pip_shui pip_a lf"></div><div class="pipshui pip_s lf">上</div>'+
                                '</div>'+
                                '<div class="pip_0 pip_3 pip_bottom">'+
                                    '<div class="pip_chui pip_a lf"></div><div class="pipchui pip_s lf">下</div>'+
                                '</div>'+
                                '<div class="pip_0 pip_3 pip_left">'+
                                    '<div class="pip_chui pip_a lf"></div><div class="pipchui pip_s lf">左</div>'+
                                '</div>'+
                                 '<div class="pip_0 pip_3 pip_right">'+
                                    '<div class="pip_chui pip_a lf"></div><div class="pipchui pip_s lf">右</div>'+
                                '</div>'+
                            '</div>'+
                        '</fieldset>'+
                        '<fieldset class="line_attr1 pip_boxx">'+
                        '<legend class="rotateb">管道配置</legend>'+
                           '<div class="pip_00 piptype_">'+
                                '<label for="pipinp">'+
                                    '<div class="lf pip_radio pip_kai"></div><div class="lf">是否常开</div>'+
                                    '</div>'+
                                '</label>'+
                            '</div>'+
                        '</fieldset>';
        $(".tc33").append(pipdom);
    };
    this.pipeline_features = function(idd){
        var pip_idd = $("#"+idd);
        var pip_features = {
            pip_action : function(){//点击事件
                $(".pip_0").click(function(){//管道类型选择
                    $(this).find(".pip_radio").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_0").find(".pip_radio").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                });
                /****常开状态****/
                $(".pip_00").click(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    if($("#"+idd).attr("pip_sele") == "no"){
                        $(this).find(".pip_radio").css({
                            "background-image": "url(images/selected.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                        $("#"+idd).attr("pip_sele","yes");
                        $("#"+idd).attr("is_open","yes");
                        $(".pipbg"+idd).removeAttr("value");
                        $(".pipbg_"+idd).removeAttr("value");
                    }else if($("#"+idd).attr("pip_sele") == "yes"){
                        $(this).find(".pip_radio").css({
                            "background-image": "url(images/notselected.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                        $("#"+idd).attr("pip_sele","no");
                        $("#"+idd).attr("is_open","no");    
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".piptype_1").click(function(){//一字型
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(".pipbg"+idd).removeClass("bar_shi_l");
                    $(".pipbg_"+idd).removeClass("bar_shi_v");
                    $(".pipbg"+idd).removeClass("bar_T_l_1");
                    $(".pipbg_"+idd).removeClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_3");
                    $(".pipbg_"+idd).removeClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_2");
                    $(".pipbg_"+idd).removeClass("bar_T_v_2");
                    $(".pipbg"+idd).removeClass("bar_T_l_4");
                    $(".pipbg_"+idd).removeClass("bar_T_v_4");
                    $(".pipbg"+idd).removeClass("bar_L_l_1");
                    $(".pipbg_"+idd).removeClass("bar_L_v_1");
                    $(".pipbg"+idd).removeClass("bar_L_l_2");
                    $(".pipbg_"+idd).removeClass("bar_L_v_2");
                    $(".pipbg"+idd).removeClass("bar_L_l_3");
                    $(".pipbg_"+idd).removeClass("bar_L_v_3");
                    $(".pipbg"+idd).removeClass("bar_L_l_4");
                    $(".pipbg_"+idd).removeClass("bar_L_v_4");
                    $(".pip_bg"+idd).css({
                         "background-image": "url(images/pip_yi.png)",
                         "background-repeat":"no-repeat",
                         "background-size":"100% 100%"
                    });
                    $("#"+idd).attr("piptype","1");
                    $(".pip_edit_1").css("display","block");
                    $(".pip_edit_1").siblings(".pip_edit").css("display","none");
                    if(pip_idd.attr("pip_lv") == "l"){
                        $(".pip_L").find(".pip_c").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_L").siblings(".pip_1").find(".pip_c").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_yi.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).addClass("bar_yi_l");
                        $(".pipbg"+idd).removeClass("bar_yi_v");
                    }else{
                        $(".pip_V").find(".pip_c").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_V").siblings(".pip_1").find(".pip_c").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_yi_0.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).addClass("bar_yi_v");
                        $(".pipbg"+idd).removeClass("bar_yi_l");
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog); 
                });
                $(".piptype_2").click(function(){//L型
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(".pipbg"+idd).removeClass("bar_shi_l");
                    $(".pipbg_"+idd).removeClass("bar_shi_v");
                    $(".pipbg"+idd).removeClass("bar_T_l_1");
                    $(".pipbg_"+idd).removeClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_3");
                    $(".pipbg_"+idd).removeClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_2");
                    $(".pipbg_"+idd).removeClass("bar_T_v_2");
                    $(".pipbg"+idd).removeClass("bar_T_l_4");
                    $(".pipbg_"+idd).removeClass("bar_T_v_4");
                    $(".pipbg"+idd).removeClass("bar_yi_l");
                    $(".pipbg"+idd).removeClass("bar_yi_v");
                    $(".pip_bg"+idd).css({
                         "background-image": "url(images/pip_L_1.png)",
                         "background-repeat":"no-repeat",
                         "background-size":"100% 100%"
                    });
                    $("#"+idd).attr("piptype","2");
                    $(".pip_edit_2").css("display","block");
                    $(".pip_edit_2").siblings(".pip_edit").css("display","none");
                    if(pip_idd.attr("pip_L") == "1"){
                        $(".pip_lt").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_lt").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_1.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).removeClass("bar_L_l_2");
                        $(".pipbg_"+idd).removeClass("bar_L_v_2");
                        $(".pipbg"+idd).removeClass("bar_L_l_3");
                        $(".pipbg_"+idd).removeClass("bar_L_v_3");
                        $(".pipbg"+idd).removeClass("bar_L_l_4");
                        $(".pipbg_"+idd).removeClass("bar_L_v_4");
                        $(".pipbg"+idd).addClass("bar_L_l_1");
                        $(".pipbg_"+idd).addClass("bar_L_v_1");
                    } 
                    if(pip_idd.attr("pip_L") == "2"){
                        $(".pip_rt").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_rt").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_2.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).removeClass("bar_L_l_1");
                        $(".pipbg_"+idd).removeClass("bar_L_v_1");
                        $(".pipbg"+idd).removeClass("bar_L_l_3");
                        $(".pipbg_"+idd).removeClass("bar_L_v_3");
                        $(".pipbg"+idd).removeClass("bar_L_l_4");
                        $(".pipbg_"+idd).removeClass("bar_L_v_4");
                        $(".pipbg"+idd).addClass("bar_L_l_2");
                        $(".pipbg_"+idd).addClass("bar_L_v_2");
                    }
                    if(pip_idd.attr("pip_L") == "3"){
                        $(".pip_lb").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_lb").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_3.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).removeClass("bar_L_l_2");
                        $(".pipbg_"+idd).removeClass("bar_L_v_2");
                        $(".pipbg"+idd).removeClass("bar_L_l_1");
                        $(".pipbg_"+idd).removeClass("bar_L_v_1");
                        $(".pipbg"+idd).removeClass("bar_L_l_4");
                        $(".pipbg_"+idd).removeClass("bar_L_v_4");
                        $(".pipbg"+idd).addClass("bar_L_l_3");
                        $(".pipbg_"+idd).addClass("bar_L_v_3");
                    }
                    if(pip_idd.attr("pip_L") == "4"){
                        $(".pip_rb").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_rb").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_4.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).removeClass("bar_L_l_2");
                        $(".pipbg_"+idd).removeClass("bar_L_v_2");
                        $(".pipbg"+idd).removeClass("bar_L_l_3");
                        $(".pipbg_"+idd).removeClass("bar_L_v_3");
                        $(".pipbg"+idd).removeClass("bar_L_l_1");
                        $(".pipbg_"+idd).removeClass("bar_L_v_1");
                        $(".pipbg"+idd).addClass("bar_L_l_4");
                        $(".pipbg_"+idd).addClass("bar_L_v_4");
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".piptype_3").click(function(){//T型
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(".pipbg"+idd).removeClass("bar_shi_l");
                    $(".pipbg_"+idd).removeClass("bar_shi_v");
                    $(".pipbg"+idd).removeClass("bar_yi_l");
                    $(".pipbg"+idd).removeClass("bar_yi_v");
                    $(".pipbg"+idd).removeClass("bar_L_l_1");
                    $(".pipbg_"+idd).removeClass("bar_L_v_1");
                    $(".pipbg"+idd).removeClass("bar_L_l_2");
                    $(".pipbg_"+idd).removeClass("bar_L_v_2");
                    $(".pipbg"+idd).removeClass("bar_L_l_3");
                    $(".pipbg_"+idd).removeClass("bar_L_v_3");
                    $(".pipbg"+idd).removeClass("bar_L_l_4");
                    $(".pipbg_"+idd).removeClass("bar_L_v_4");
                    $(".pip_bg"+idd).css({
                         "background-image": "url(images/pip_T_1.png)",
                         "background-repeat":"no-repeat",
                         "background-size":"100% 100%"
                    });
                    $("#"+idd).attr("piptype","3");
                    $(".pip_edit_3").css("display","block");
                    $(".pip_edit_3").siblings(".pip_edit").css("display","none"); 
                    if(pip_idd.attr("pip_T") == "1"){
                        $(".pip_top").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_top").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_1.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).addClass("bar_T_l_1");
                        $(".pipbg_"+idd).addClass("bar_T_v_1");
                    }
                    if(pip_idd.attr("pip_T") == "2"){
                        $(".pip_bottom").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bottom").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_2.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).addClass("bar_T_l_2");
                        $(".pipbg_"+idd).addClass("bar_T_v_2");
                    }
                    if(pip_idd.attr("pip_T") == "3"){
                        $(".pip_left").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_left").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_3.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).addClass("bar_T_l_3");
                        $(".pipbg_"+idd).addClass("bar_T_v_3");
                    }
                    if(pip_idd.attr("pip_T") == "4"){
                        $(".pip_right").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_right").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_4.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                        $(".pipbg"+idd).addClass("bar_T_l_4");
                        $(".pipbg_"+idd).addClass("bar_T_v_4");
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog); 
                });
                $(".piptype_4").click(function(){//十字型
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(".pip_bg"+idd).css({
                         "background-image": "url(images/pip_shi.png)",
                         "background-repeat":"no-repeat",
                         "background-size":"100% 100%"
                    });
                    $("#"+idd).attr("piptype","4");
                    $(".pip_edit").css("display","none");
                    $(".pipbg"+idd).removeClass("bar_yi_l");
                    $(".pipbg"+idd).removeClass("bar_yi_v");
                    $(".pipbg"+idd).removeClass("bar_T_l_1");
                    $(".pipbg_"+idd).removeClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_3");
                    $(".pipbg_"+idd).removeClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_2");
                    $(".pipbg_"+idd).removeClass("bar_T_v_2");
                    $(".pipbg"+idd).removeClass("bar_T_l_4");
                    $(".pipbg_"+idd).removeClass("bar_T_v_4");
                    $(".pipbg"+idd).removeClass("bar_L_l_1");
                    $(".pipbg_"+idd).removeClass("bar_L_v_1");
                    $(".pipbg"+idd).removeClass("bar_L_l_2");
                    $(".pipbg_"+idd).removeClass("bar_L_v_2");
                    $(".pipbg"+idd).removeClass("bar_L_l_3");
                    $(".pipbg_"+idd).removeClass("bar_L_v_3");
                    $(".pipbg"+idd).removeClass("bar_L_l_4");
                    $(".pipbg_"+idd).removeClass("bar_L_v_4");
                    $(".pipbg"+idd).addClass("bar_shi_l");
                    $(".pipbg_"+idd).addClass("bar_shi_v");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".piptype_5").click(function(){//阀门
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(".pip_bg"+idd).css({
                         "background-image": "url(images/pip_fa_1.png)",
                         "background-repeat":"no-repeat",
                         "background-size":"100% 100%"
                    });
                    $("#"+idd).attr("piptype","5");
                    $(".pip_edit_5").css("display","block");
                    $(".pip_edit_5").siblings(".pip_edit").css("display","none");
                    if(pip_idd.attr("pip_fa") == "1"){
                        $(".pip_f_L").find(".pip_d").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_f_L").siblings(".pip_5").find(".pip_d").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_fa_1.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_fa") == "2"){
                        $(".pip_f_V").find(".pip_d").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_f_V").siblings(".pip_5").find(".pip_d").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_fa_2.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                    }
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);  
                });
                $(".pip_L").click(function(){//一字型管道水平状态切换
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var pip_w = pip_idd.width();
                    var pip_h = pip_idd.height();
                    pip_idd.width(pip_h);
                    pip_idd.height(pip_w);
                    $(this).find(".pip_c").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_1").find(".pip_c").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });                                
                    pip_idd.attr("pip_lv","l");
                     $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_yi.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).removeClass("bar_shi_l");
                    $(".pipbg_"+idd).removeClass("bar_shi_v");
                    $(".pipbg"+idd).addClass("bar_yi_l");
                    $(".pipbg"+idd).removeClass("bar_yi_v");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_V").click(function(){//一字型管道垂直状态切换
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var pip_w = pip_idd.width();
                    var pip_h = pip_idd.height();
                    pip_idd.width(pip_h);
                    pip_idd.height(pip_w);
                    $(this).find(".pip_c").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_1").find(".pip_c").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });                   
                    pip_idd.attr("pip_lv","v");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_yi_0.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).removeClass("bar_yi_l");
                    $(".pipbg"+idd).addClass("bar_yi_v");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_lt").click(function(){//L型左上
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_b").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_2").find(".pip_b").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_L","1");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_L_1.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).removeClass("bar_L_l_2");
                    $(".pipbg_"+idd).removeClass("bar_L_v_2");
                    $(".pipbg"+idd).removeClass("bar_L_l_3");
                    $(".pipbg_"+idd).removeClass("bar_L_v_3");
                    $(".pipbg"+idd).removeClass("bar_L_l_4");
                    $(".pipbg_"+idd).removeClass("bar_L_v_4");
                    $(".pipbg"+idd).addClass("bar_L_l_1");
                    $(".pipbg_"+idd).addClass("bar_L_v_1");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_rt").click(function(){//L型右上
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_b").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_2").find(".pip_b").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_L","2");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_L_2.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).removeClass("bar_L_l_1");
                    $(".pipbg_"+idd).removeClass("bar_L_v_1");
                    $(".pipbg"+idd).removeClass("bar_L_l_3");
                    $(".pipbg_"+idd).removeClass("bar_L_v_3");
                    $(".pipbg"+idd).removeClass("bar_L_l_4");
                    $(".pipbg_"+idd).removeClass("bar_L_v_4");
                    $(".pipbg"+idd).addClass("bar_L_l_2");
                    $(".pipbg_"+idd).addClass("bar_L_v_2");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_lb").click(function(){//L型左下
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_b").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_2").find(".pip_b").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_L","3");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_L_3.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).removeClass("bar_L_l_1");
                    $(".pipbg_"+idd).removeClass("bar_L_v_1");
                    $(".pipbg"+idd).removeClass("bar_L_l_2");
                    $(".pipbg_"+idd).removeClass("bar_L_v_2");
                    $(".pipbg"+idd).removeClass("bar_L_l_4");
                    $(".pipbg_"+idd).removeClass("bar_L_v_4");
                    $(".pipbg"+idd).addClass("bar_L_l_3");
                    $(".pipbg_"+idd).addClass("bar_L_v_3");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_rb").click(function(){//L型右下
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_b").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_2").find(".pip_b").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_L","4");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_L_4.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).removeClass("bar_L_l_1");
                    $(".pipbg_"+idd).removeClass("bar_L_v_1");
                    $(".pipbg"+idd).removeClass("bar_L_l_2");
                    $(".pipbg_"+idd).removeClass("bar_L_v_2");
                    $(".pipbg"+idd).removeClass("bar_L_l_3");
                    $(".pipbg_"+idd).removeClass("bar_L_v_3");
                    $(".pipbg"+idd).addClass("bar_L_l_4");
                    $(".pipbg_"+idd).addClass("bar_L_v_4");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_top").click(function(){//T型上
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_a").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_3").find(".pip_a").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_T","1");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_T_1.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).addClass("bar_T_l_1");
                    $(".pipbg_"+idd).addClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_2");
                    $(".pipbg_"+idd).removeClass("bar_T_v_2");
                    $(".pipbg"+idd).removeClass("bar_T_l_3");
                    $(".pipbg_"+idd).removeClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_4");
                    $(".pipbg_"+idd).removeClass("bar_T_v_4");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_bottom").click(function(){//T型下
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_a").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_3").find(".pip_a").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_T","2");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_T_2.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).addClass("bar_T_l_2");
                    $(".pipbg_"+idd).addClass("bar_T_v_2");
                    $(".pipbg"+idd).removeClass("bar_T_l_1");
                    $(".pipbg_"+idd).removeClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_3");
                    $(".pipbg_"+idd).removeClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_4");
                    $(".pipbg_"+idd).removeClass("bar_T_v_4");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_left").click(function(){//T型左
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_a").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_3").find(".pip_a").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_T","3");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_T_3.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).addClass("bar_T_l_3");
                    $(".pipbg_"+idd).addClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_1");
                    $(".pipbg_"+idd).removeClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_2");
                    $(".pipbg_"+idd).removeClass("bar_T_v_2");
                    $(".pipbg"+idd).removeClass("bar_T_l_4");
                    $(".pipbg_"+idd).removeClass("bar_T_v_4");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_right").click(function(){//T型右
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    $(this).find(".pip_a").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_3").find(".pip_a").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_T","4");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_T_4.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pipbg"+idd).addClass("bar_T_l_4");
                    $(".pipbg_"+idd).addClass("bar_T_v_4");
                    $(".pipbg"+idd).removeClass("bar_T_l_1");
                    $(".pipbg_"+idd).removeClass("bar_T_v_1");
                    $(".pipbg"+idd).removeClass("bar_T_l_3");
                    $(".pipbg_"+idd).removeClass("bar_T_v_3");
                    $(".pipbg"+idd).removeClass("bar_T_l_2");
                    $(".pipbg_"+idd).removeClass("bar_T_v_2");
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_f_L").click(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var pip_w = pip_idd.width();
                    var pip_h = pip_idd.height();
                    pip_idd.width(pip_h);
                    pip_idd.height(pip_w);
                    $(this).find(".pip_d").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_5").find(".pip_d").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_fa","1");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_fa_1.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
                $(".pip_f_V").click(function(){
                    var beforeLog = inTtCommand.log();
                    webapi.addLog('before',beforeLog);
                    var pip_w = pip_idd.width();
                    var pip_h = pip_idd.height();
                    pip_idd.width(pip_h);
                    pip_idd.height(pip_w);
                    $(this).find(".pip_d").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(this).siblings(".pip_5").find(".pip_d").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":":no-repeat",
                        "background-size":"100% 100%"
                    });
                    pip_idd.attr("pip_fa","2");
                    $(".pip_bg"+idd).css({
                        "background-image":"url(images/pip_fa_2.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    var afterLog = inTtCommand.log();
                    webapi.addLog('after',afterLog);
                });
            }()
        };
        var pip_init = {
            init : function(){//初始化  
                $(".config_dis"+idd).attr("disabled","true");           
                if($("#"+idd).attr("piptype") == "1"){
                    $(".piptype_1").find(".pip_radio").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".piptype_1").parents(".pip_0").siblings(".pip_0").find(".pip_radio").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    if(pip_idd.attr("pip_lv") == "l"){
                        $(".pip_L").find(".pip_c").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_L").siblings(".pip_1").find(".pip_c").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_yi.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                    }else{
                        $(".pip_V").find(".pip_c").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_V").siblings(".pip_1").find(".pip_c").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_yi_0.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                    } 
                    $(".pip_edit_1").css("display","block");
                    $(".pip_edit_1").siblings(".pip_edit").css("display","none"); 
                }
                if($("#"+idd).attr("piptype") == "2"){
                    $(".piptype_2").find(".pip_radio").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".piptype_2").siblings(".pip_0").find(".pip_radio").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pip_edit_2").css("display","block");
                    $(".pip_edit_2").siblings(".pip_edit").css("display","none");
                    if(pip_idd.attr("pip_L") == "1"){
                        $(".pip_lt").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_lt").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_1.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    } 
                    if(pip_idd.attr("pip_L") == "2"){
                        $(".pip_rt").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_rt").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_2.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_L") == "3"){
                        $(".pip_lb").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_lb").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_3.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_L") == "4"){
                        $(".pip_rb").find(".pip_b").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_rb").siblings(".pip_2").find(".pip_b").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_L_4.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    }
                }
                if($("#"+idd).attr("piptype") == "3"){
                    $(".piptype_3").find(".pip_radio").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".piptype_3").siblings(".pip_0").find(".pip_radio").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pip_edit_3").css("display","block");
                    $(".pip_edit_3").siblings(".pip_edit").css("display","none");
                    if(pip_idd.attr("pip_T") == "1"){
                        $(".pip_top").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_top").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_1.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_T") == "2"){
                        $(".pip_bottom").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bottom").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_2.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_T") == "3"){
                        $(".pip_left").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_left").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_3.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_T") == "4"){
                        $(".pip_right").find(".pip_a").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_right").siblings(".pip_3").find(".pip_a").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                             "background-image": "url(images/pip_T_4.png)",
                             "background-repeat":"no-repeat",
                             "background-size":"100% 100%"
                        });
                    } 
                }
                if($("#"+idd).attr("piptype") == "4"){
                    $(".pip_bg"+idd).css({
                         "background-image": "url(images/pip_shi.png)",
                         "background-repeat":"no-repeat",
                         "background-size":"100% 100%"
                    });
                    $(".piptype_4").find(".pip_radio").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".piptype_4").siblings(".pip_0").find(".pip_radio").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pip_edit").css("display","none");
                }
                if($("#"+idd).attr("piptype") == "5"){
                    $(".piptype_4").find(".pip_radio").css({
                        "background-image": "url(images/yixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".piptype_4").siblings(".pip_0").find(".pip_radio").css({
                        "background-image": "url(images/weixuan.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                    $(".pip_edit_5").css("display","block");
                    $(".pip_edit_5").siblings(".pip_edit").css("display","none");
                    if(pip_idd.attr("pip_fa") == "1"){
                        $(".pip_f_L").find(".pip_d").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_f_L").siblings(".pip_5").find(".pip_d").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_fa_1.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                    }
                    if(pip_idd.attr("pip_fa") == "2"){
                        $(".pip_f_V").find(".pip_d").css({
                            "background-image": "url(images/yixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_f_V").siblings(".pip_5").find(".pip_d").css({
                            "background-image": "url(images/weixuan.png)",
                            "background-repeat":":no-repeat",
                            "background-size":"100% 100%"
                        });
                        $(".pip_bg"+idd).css({
                            "background-image":"url(images/pip_fa_2.png)",
                            "background-repeat":"no-repeat",
                            "background-size":"100% 100%"
                        });
                    }  
                }
                if($("#"+idd).attr("pip_sele") == "yes"){
                    $(".pip_00").find(".pip_radio").css({
                        "background-image": "url(images/selected.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                }
                if($("#"+idd).attr("pip_sele") == "no"){
                    $(".pip_00").find(".pip_radio").css({
                        "background-image": "url(images/notselected.png)",
                        "background-repeat":"no-repeat",
                        "background-size":"100% 100%"
                    });
                }
            }()
        }
    };
    this.pip_config = function(idd){//配置联动任务(后)
        var pip = [];
        var pip_ = [];
        for(var i = 0; i < idd.length; i++){
            if(idd[i].indexOf("Switch") >= 0){
                pip.push(idd[i]);              
            }
            if(idd[i].indexOf("Pip") >= 0){
                pip_.push(idd[i]);
            }
        }
        if(pip.length == 1 && pip_.length != 0){
            for(var i = 0; i < pip_.length ; i++){
                if($("#"+pip_[i]).attr("is_open") != "yes"){
                    $(".pipbg"+pip_[i]).attr("value","pip_config_yes");
                    $(".pipbg_"+pip_[i]).attr("value","pip_config_yes");
                }  
            }
            if(!$("#"+pip[0]).attr("pip_config_h")){
                $("#"+pip[0]).attr("pip_config_h","1");
                $("#"+pip[0]).attr("pip_config_hou",pip_);
                $("#"+pip[0]).children("div").first("div").css({
                    "box-sizing":"border-box",
                    "border":"2px solid blue"
                });
            }
            if($("#"+pip[0]).attr("pip_config_h") && $("#"+pip[0]).attr("pip_config_q")){
                $("#"+pip[0]).children("div").first("div").css({
                    "box-sizing":"border-box",
                    "border":"2px solid lime"
                });
            }      
        }      
    };
    this.pip_config_ = function(idd){//配置联动任务(前)
        var pip_1 = [];
        var pip_2 = [];
        for(var i = 0; i < idd.length; i++){
            if(idd[i].indexOf("Switch") >= 0){
                pip_1.push(idd[i]);              
            }
            if(idd[i].indexOf("Pip") >= 0){
                pip_2.push(idd[i]);
            }
        }
        if(pip_1.length == 1 && pip_2.length != 0){
            for(var j = 0; j < pip_2.length ; j++){
                if($("#"+pip_2[j]).attr("is_open") != "yes"){
                    $(".pipbg"+pip_2[j]).attr("value","pip_config_yes");
                    $(".pipbg_"+pip_2[j]).attr("value","pip_config_yes");
                }            
            }
            if(!$("#"+pip_1[0]).attr("pip_config_q")){
                $("#"+pip_1[0]).attr("pip_config_q","1");
                $("#"+pip_1[0]).attr("pip_config_qian",pip_2);
                $("#"+pip_1[0]).children("div").first("div").css({
                    "box-sizing":"border-box",
                    "border":"2px solid red"
                });
            } 
            if($("#"+pip_1[0]).attr("pip_config_h") && $("#"+pip_1[0]).attr("pip_config_q")){
                $("#"+pip_1[0]).children("div").first("div").css({
                    "box-sizing":"border-box",
                    "border":"2px solid lime"
                });
            }   
        }
    };
    this.pip_config_delet = function(idd){//删除联动任务配置
        var pip_1 = [];
        var pip_2 = [];
        for(var i = 0; i < idd.length; i++){
            $("#"+idd[i]).removeAttr("pip_config_q");
            $("#"+idd[i]).removeAttr("pip_config_h");
            $("#"+idd[i]).removeAttr("pip_config_hou");
            $("#"+idd[i]).children("div").first("div").css({
                "border":"none"
            });
        }
    };
    this.pipeline_copy = function(srcId, desId){
        var srcIdElement = $("#"+srcId);
        var desIdElement = $("#"+desId);
        var hige = srcIdElement.height();
        var wide = srcIdElement.width();
        var piptype = srcIdElement.attr("piptype");
        var pip_yi = srcIdElement.attr("pip_lv");
        var pip_L = srcIdElement.attr("pip_L");
        var pip_T = srcIdElement.attr("pip_T");
        var pip_fa = srcIdElement.attr("pip_fa");
        var clas = srcIdElement.attr("class");
        desIdElement.attr("pip_lv",pip_yi).attr("piptype",piptype).attr("pip_L",pip_L).attr("pip_T",pip_T).attr("pip_fa",pip_fa);
        desIdElement.css({
            "width": wide + "px",
            "height": hige+ "px"
        }).addClass(clas);
        var idd = desId;
        var pip_idd = $("#"+idd);
        if($("#"+idd).attr("piptype") == "1"){
            $(".pipbg"+idd).removeClass("bar_shi_l");
            $(".pipbg_"+idd).removeClass("bar_shi_v");
            $(".pipbg"+idd).removeClass("bar_T_l_1");
            $(".pipbg_"+idd).removeClass("bar_T_v_1");
            $(".pipbg"+idd).removeClass("bar_T_l_3");
            $(".pipbg_"+idd).removeClass("bar_T_v_3");
            $(".pipbg"+idd).removeClass("bar_T_l_2");
            $(".pipbg_"+idd).removeClass("bar_T_v_2");
            $(".pipbg"+idd).removeClass("bar_T_l_4");
            $(".pipbg_"+idd).removeClass("bar_T_v_4");
            $(".pipbg"+idd).removeClass("bar_L_l_1");
            $(".pipbg_"+idd).removeClass("bar_L_v_1");
            $(".pipbg"+idd).removeClass("bar_L_l_2");
            $(".pipbg_"+idd).removeClass("bar_L_v_2");
            $(".pipbg"+idd).removeClass("bar_L_l_3");
            $(".pipbg_"+idd).removeClass("bar_L_v_3");
            $(".pipbg"+idd).removeClass("bar_L_l_4");
            $(".pipbg_"+idd).removeClass("bar_L_v_4");
            $(".piptype_1").find(".pip_radio").css({
                "background-image": "url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".piptype_1").parents(".pip_0").siblings(".pip_0").find(".pip_radio").css({
                "background-image": "url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            if(pip_idd.attr("pip_lv") == "l"){
                $(".pipbg"+idd).removeClass("bar_shi_l");
                $(".pipbg_"+idd).removeClass("bar_shi_v");
                $(".pipbg"+idd).addClass("bar_yi_l");
                $(".pipbg"+idd).removeClass("bar_yi_v");
                $(".pip_L").find(".pip_c").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_L").siblings(".pip_1").find(".pip_c").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                    "background-image":"url(images/pip_yi.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }else{
                $(".pipbg"+idd).removeClass("bar_yi_l");
                $(".pipbg"+idd).addClass("bar_yi_v");
                $(".pip_V").find(".pip_c").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_V").siblings(".pip_1").find(".pip_c").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                    "background-image":"url(images/pip_yi_0.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            } 
            $(".pip_edit_1").css("display","block");
            $(".pip_edit_1").siblings(".pip_edit").css("display","none"); 
        }
        if($("#"+idd).attr("piptype") == "2"){
            $(".pipbg"+idd).removeClass("bar_shi_l");
            $(".pipbg_"+idd).removeClass("bar_shi_v");
            $(".pipbg"+idd).removeClass("bar_T_l_1");
            $(".pipbg_"+idd).removeClass("bar_T_v_1");
            $(".pipbg"+idd).removeClass("bar_T_l_3");
            $(".pipbg_"+idd).removeClass("bar_T_v_3");
            $(".pipbg"+idd).removeClass("bar_T_l_2");
            $(".pipbg_"+idd).removeClass("bar_T_v_2");
            $(".pipbg"+idd).removeClass("bar_T_l_4");
            $(".pipbg_"+idd).removeClass("bar_T_v_4");
            $(".pipbg"+idd).removeClass("bar_yi_l");
            $(".pipbg"+idd).removeClass("bar_yi_v");
            $(".piptype_2").find(".pip_radio").css({
                "background-image": "url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".piptype_2").siblings(".pip_0").find(".pip_radio").css({
                "background-image": "url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".pip_edit_2").css("display","block");
            $(".pip_edit_2").siblings(".pip_edit").css("display","none");
            if(pip_idd.attr("pip_L") == "1"){
                $(".pipbg"+idd).removeClass("bar_L_l_2");
                $(".pipbg_"+idd).removeClass("bar_L_v_2");
                $(".pipbg"+idd).removeClass("bar_L_l_3");
                $(".pipbg_"+idd).removeClass("bar_L_v_3");
                $(".pipbg"+idd).removeClass("bar_L_l_4");
                $(".pipbg_"+idd).removeClass("bar_L_v_4");
                $(".pipbg"+idd).addClass("bar_L_l_1");
                $(".pipbg_"+idd).addClass("bar_L_v_1");
                $(".pip_lt").find(".pip_b").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_lt").siblings(".pip_2").find(".pip_b").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_L_1.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            } 
            if(pip_idd.attr("pip_L") == "2"){
                $(".pipbg"+idd).removeClass("bar_L_l_1");
                $(".pipbg_"+idd).removeClass("bar_L_v_1");
                $(".pipbg"+idd).removeClass("bar_L_l_3");
                $(".pipbg_"+idd).removeClass("bar_L_v_3");
                $(".pipbg"+idd).removeClass("bar_L_l_4");
                $(".pipbg_"+idd).removeClass("bar_L_v_4");
                $(".pipbg"+idd).addClass("bar_L_l_2");
                $(".pipbg_"+idd).addClass("bar_L_v_2");
                $(".pip_rt").find(".pip_b").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_rt").siblings(".pip_2").find(".pip_b").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_L_2.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            }
            if(pip_idd.attr("pip_L") == "3"){
                $(".pipbg"+idd).removeClass("bar_L_l_1");
                $(".pipbg_"+idd).removeClass("bar_L_v_1");
                $(".pipbg"+idd).removeClass("bar_L_l_2");
                $(".pipbg_"+idd).removeClass("bar_L_v_2");
                $(".pipbg"+idd).removeClass("bar_L_l_4");
                $(".pipbg_"+idd).removeClass("bar_L_v_4");
                $(".pipbg"+idd).addClass("bar_L_l_3");
                $(".pipbg_"+idd).addClass("bar_L_v_3");
                $(".pip_lb").find(".pip_b").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_lb").siblings(".pip_2").find(".pip_b").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_L_3.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            }
            if(pip_idd.attr("pip_L") == "4"){
                $(".pipbg"+idd).removeClass("bar_L_l_1");
                $(".pipbg_"+idd).removeClass("bar_L_v_1");
                $(".pipbg"+idd).removeClass("bar_L_l_2");
                $(".pipbg_"+idd).removeClass("bar_L_v_2");
                $(".pipbg"+idd).removeClass("bar_L_l_3");
                $(".pipbg_"+idd).removeClass("bar_L_v_3");
                $(".pipbg"+idd).addClass("bar_L_l_4");
                $(".pipbg_"+idd).addClass("bar_L_v_4");
                $(".pip_rb").find(".pip_b").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_rb").siblings(".pip_2").find(".pip_b").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_L_4.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            }
        }
        if($("#"+idd).attr("piptype") == "3"){
            $(".pipbg"+idd).removeClass("bar_shi_l");
            $(".pipbg_"+idd).removeClass("bar_shi_v");
            $(".pipbg"+idd).removeClass("bar_yi_l");
            $(".pipbg"+idd).removeClass("bar_yi_v");
            $(".pipbg"+idd).removeClass("bar_L_l_1");
            $(".pipbg_"+idd).removeClass("bar_L_v_1");
            $(".pipbg"+idd).removeClass("bar_L_l_2");
            $(".pipbg_"+idd).removeClass("bar_L_v_2");
            $(".pipbg"+idd).removeClass("bar_L_l_3");
            $(".pipbg_"+idd).removeClass("bar_L_v_3");
            $(".pipbg"+idd).removeClass("bar_L_l_4");
            $(".pipbg_"+idd).removeClass("bar_L_v_4");
            $(".piptype_3").find(".pip_radio").css({
                "background-image": "url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".piptype_3").siblings(".pip_0").find(".pip_radio").css({
                "background-image": "url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".pip_edit_3").css("display","block");
            $(".pip_edit_3").siblings(".pip_edit").css("display","none");
            if(pip_idd.attr("pip_T") == "1"){
                $(".pipbg"+idd).addClass("bar_T_l_1");
                $(".pipbg_"+idd).addClass("bar_T_v_1");
                $(".pipbg"+idd).removeClass("bar_T_l_2");
                $(".pipbg_"+idd).removeClass("bar_T_v_2");
                $(".pipbg"+idd).removeClass("bar_T_l_3");
                $(".pipbg_"+idd).removeClass("bar_T_v_3");
                $(".pipbg"+idd).removeClass("bar_T_l_4");
                $(".pipbg_"+idd).removeClass("bar_T_v_4");
                $(".pip_top").find(".pip_a").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_top").siblings(".pip_3").find(".pip_a").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_T_1.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            }
            if(pip_idd.attr("pip_T") == "2"){
                $(".pipbg"+idd).addClass("bar_T_l_2");
                $(".pipbg_"+idd).addClass("bar_T_v_2");
                $(".pipbg"+idd).removeClass("bar_T_l_1");
                $(".pipbg_"+idd).removeClass("bar_T_v_1");
                $(".pipbg"+idd).removeClass("bar_T_l_3");
                $(".pipbg_"+idd).removeClass("bar_T_v_3");
                $(".pipbg"+idd).removeClass("bar_T_l_4");
                $(".pipbg_"+idd).removeClass("bar_T_v_4");
                $(".pip_bottom").find(".pip_a").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bottom").siblings(".pip_3").find(".pip_a").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_T_2.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            }
            if(pip_idd.attr("pip_T") == "3"){
                $(".pipbg"+idd).addClass("bar_T_l_3");
                $(".pipbg_"+idd).addClass("bar_T_v_3");
                $(".pipbg"+idd).removeClass("bar_T_l_1");
                $(".pipbg_"+idd).removeClass("bar_T_v_1");
                $(".pipbg"+idd).removeClass("bar_T_l_2");
                $(".pipbg_"+idd).removeClass("bar_T_v_2");
                $(".pipbg"+idd).removeClass("bar_T_l_4");
                $(".pipbg_"+idd).removeClass("bar_T_v_4");
                $(".pip_left").find(".pip_a").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_left").siblings(".pip_3").find(".pip_a").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_T_3.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            }
            if(pip_idd.attr("pip_T") == "4"){
                $(".pipbg"+idd).addClass("bar_T_l_4");
                $(".pipbg_"+idd).addClass("bar_T_v_4");
                $(".pipbg"+idd).removeClass("bar_T_l_1");
                $(".pipbg_"+idd).removeClass("bar_T_v_1");
                $(".pipbg"+idd).removeClass("bar_T_l_3");
                $(".pipbg_"+idd).removeClass("bar_T_v_3");
                $(".pipbg"+idd).removeClass("bar_T_l_2");
                $(".pipbg_"+idd).removeClass("bar_T_v_2");
                $(".pip_right").find(".pip_a").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_right").siblings(".pip_3").find(".pip_a").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                     "background-image": "url(images/pip_T_4.png)",
                     "background-repeat":"no-repeat",
                     "background-size":"100% 100%"
                });
            } 
        }
        if($("#"+idd).attr("piptype") == "4"){
            $(".pipbg"+idd).removeClass("bar_yi_l");
            $(".pipbg"+idd).removeClass("bar_yi_v");
            $(".pipbg"+idd).removeClass("bar_T_l_1");
            $(".pipbg_"+idd).removeClass("bar_T_v_1");
            $(".pipbg"+idd).removeClass("bar_T_l_3");
            $(".pipbg_"+idd).removeClass("bar_T_v_3");
            $(".pipbg"+idd).removeClass("bar_T_l_2");
            $(".pipbg_"+idd).removeClass("bar_T_v_2");
            $(".pipbg"+idd).removeClass("bar_T_l_4");
            $(".pipbg_"+idd).removeClass("bar_T_v_4");
            $(".pipbg"+idd).removeClass("bar_L_l_1");
            $(".pipbg_"+idd).removeClass("bar_L_v_1");
            $(".pipbg"+idd).removeClass("bar_L_l_2");
            $(".pipbg_"+idd).removeClass("bar_L_v_2");
            $(".pipbg"+idd).removeClass("bar_L_l_3");
            $(".pipbg_"+idd).removeClass("bar_L_v_3");
            $(".pipbg"+idd).removeClass("bar_L_l_4");
            $(".pipbg_"+idd).removeClass("bar_L_v_4");
            $(".pipbg"+idd).addClass("bar_shi_l");
            $(".pipbg_"+idd).addClass("bar_shi_v");
            $(".pip_bg"+idd).css({
                 "background-image": "url(images/pip_shi.png)",
                 "background-repeat":"no-repeat",
                 "background-size":"100% 100%"
            });
            $(".piptype_4").find(".pip_radio").css({
                "background-image": "url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".piptype_4").siblings(".pip_0").find(".pip_radio").css({
                "background-image": "url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".pip_edit").css("display","none");
        }
        if($("#"+idd).attr("piptype") == "5"){
            $(".piptype_4").find(".pip_radio").css({
                "background-image": "url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".piptype_4").siblings(".pip_0").find(".pip_radio").css({
                "background-image": "url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $(".pip_edit_5").css("display","block");
            $(".pip_edit_5").siblings(".pip_edit").css("display","none");
            if(pip_idd.attr("pip_fa") == "1"){
                $(".pip_f_L").find(".pip_d").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_f_L").siblings(".pip_5").find(".pip_d").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                    "background-image":"url(images/pip_fa_1.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }
            if(pip_idd.attr("pip_fa") == "2"){
                $(".pip_f_V").find(".pip_d").css({
                    "background-image": "url(images/yixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_f_V").siblings(".pip_5").find(".pip_d").css({
                    "background-image": "url(images/weixuan.png)",
                    "background-repeat":":no-repeat",
                    "background-size":"100% 100%"
                });
                $(".pip_bg"+idd).css({
                    "background-image":"url(images/pip_fa_2.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
            }  
        }
    }
};
/*******************组控控件*******************/
var BatchControl = function(){
    this.configId = -1;
    this.createBatchControl = function (x, y) {
        $("body").width($(window).width()+document.body.scrollLeft);
        var maxNum = inItAllElementId.batchElementIDMaxNum();
        if(this.configId <= maxNum){
            this.configId = maxNum;
        }
        this.configId = this.configId + 1;
        var idd = "Batch_" + this.configId;
        this.id = idd;
        var textDiv = $(
            '<div id='+idd+' class="contrl move" dataType="0,1,2,3" sure="yes" success="yes" fails="yes">'
            +    '<div class="total_box">'
            +        '<div class="total_child">'
            +            '<div id="select'+idd+'" class="selectAreaBox">'
            +                '<div id="combo'+idd+'" class="combodropdiv">'
            +                    '<div id="comboselect'+idd+'" readonly="readonly" class="selectArea" displayMember="-1" valueMember ="请添加" ><span class="combosle">请添加</span></div>'
            +                '</div>'
            +                '<p class="combobtnimg combobtnimg'+idd+'"><img id="dropDownButton-'+idd+'" class="comboBtnImg" src="images/downarrow.png"/></p>'
            +            '</div>'
            +            '<div id="combo_chooseItems'+idd+'" class="selectItemBox" answer ="comboselect">'
            +                '<div class="combo_children"></div>'
            +            '</div>'
            +            '<div class="textAreaBox textAreaBox'+idd+'"><div class="textArea"><input type="text" id="infoInput-'+idd+'" placeholder="请输入发送内容" /></div></div>'
            +            '<div class="sendArea sendArea'+idd+'"><img id="infoSend-'+idd+'" class="combosendimg" src="images/send.png"/></div>'
            +        '</div>'
            +    '</div>'
            +'</div>'
        );
        textDiv.prependTo($('#content'));
        var scrolTop = document.body.scrollTop;
        var scrolLeft = document.body.scrollLeft;
        //控件相关样式
        $("#"+idd).css({
            "position":"absolute",
            "left": x +scrolLeft+"px",
            "top": y +scrolTop +"px",
            "width": 260 + "px",
            "height": 38 + "px"
        });
        imp.fn(idd,x,y);
        inItAllElementId.allElementsIds.push(idd);//添加到元素集合Id
        inItSetCtrStyle.removeStyle(selecteId);
        selecteId = [];
        var AllElements = inItAllElementId.allElementsIds;
        var _thisId = AllElements[AllElements.length-1];
        selecteId.push(_thisId);
        inItPropertiesPage.PropertiesBatchPage(selecteId);//控件的“控件”DOM结构
        inItPropertiesPage.PublicFeatures(selecteId);//公共部分的功能
        this.BatchPropertiesPage(selecteId);
        this.BatchFeatures(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
        inItModalFeature.Modalbox(selecteId);//配置变量
    };
    this.BatchPropertiesPage = function(idd){
        //控件属性页
        var batchT3Tab = $('<div id="tc3' + idd + '" class="tc33"></div>');
        $("#right"+idd).siblings("p.page").remove();
        $("#fathy").append(batchT3Tab);
        var proAttributes = $(
            '<fieldset class="attrs editattr">'+
            '<legend>设置</legend>'+
            '<div class="slider_attrText"><i>确认控制命令</i><div class="slider_attrDiv" id="pro2'+idd+'"></div></div>' +
            '<div class="slider_attrText"><i>报告成功命令</i><div class="slider_attrDiv" id="pro3'+idd+'"></div></div>' +
            '<div class="slider_attrText"><i>报告失败命令</i><div class="slider_attrDiv" id="pro4'+idd+'"></div></div>' +
            '</fieldset>');
        $('.tc33').append(proAttributes);
    };
    this.BatchFeatures = function(idd){
        var controlObj = $('#'+idd);
        var comboBtnImg = $(".combobtnimg" + idd);
        var selectItemBox = $("#combo_chooseItems" + idd);
        var selectOptionsIds = []; //所有被选中的元素变量ID
        var confirmOrder = $("#pro2"+idd);
        var successOrder = $("#pro3"+idd);
        var failOrder = $("#pro4"+idd);
        inItModalFeature.orderControlFeatures(confirmOrder, successOrder,failOrder, idd);
        //控件下拉框的展示和隐藏
        var comboSelect = {
            comboBtn:function(){ //控件列表元素显示隐藏的切换
                var len;
                comboBtnImg.unbind("mousedown").bind("mousedown",function(e){
                    e.stopPropagation();
                    len = selectItemBox.children(".selectItem").length;
                    if(len != 0){
                        if(selectItemBox.children(".selectItem").is(":visible")){
                            selectItemBox.slideUp(300);
                        }else{
                            selectItemBox.slideDown(300);
                        }
                    }else{
                        return false;
                    }
                })
            },
            hideChooseItems:function(){//隐藏控件的列表元素
                $("#bgDiv").bind("click",function(){
                    var combo_chooseItems = $(".selectItemBox");
                    combo_chooseItems.slideUp(300);
                });
            },
            init:function(){
                this.comboBtn();
                this.hideChooseItems();
            }
        };
        comboSelect.init();
    };
    this.copy = function(srcId, desId){
        var srcIdElement = $('#'+srcId);
        var desIdElement = $('#'+desId);

    }
};


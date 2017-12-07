//判断编辑态和预览态的执行状态
var Cook = function(){
    this.cook = true;
    this.minor = true;
};
//元素集Id类
var AllElementId = function(){
    this.allElementsIds = [];
    this.textElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Text_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
	this.progressElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Progress_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.buttonElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Button_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.MinorElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Minor_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.switchElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Switch_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.sceneElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Scene_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.EditElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Edit_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.ListElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='List_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.CheckBoxElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='CheckBox_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.comboElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Combo_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.FillElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Fill_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.DialElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Dial_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.radioElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Radio_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.lineElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Line_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.rotateElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Rotate_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.slideBarElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='SlideBar_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.chartElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Chart_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.HistoryEventElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='History_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.statusElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Status_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.HistoryAlarmElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Alarm_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.realTimeAlarmElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='RealTimeAlarm_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.elevatorElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Elevator_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.picElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='pic_']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.videoElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='Video']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.communicateElementIDMaxNum = function(){
        var arrNum = [];
        $.each($("div[id^='communicate']"),function(){
            arrNum.push(parseInt($(this).attr("id").split("_")[1]));
        });
        return Math.max.apply(null, arrNum);
    };
    this.recordAllElementID = function(){
        var allElements = [];
        //函数，遍历所有元素，放入元素Id集
        $.each($(".contrl"),function(){
            allElements.push($(this).attr("id"));
        });
        this.allElementsIds = allElements;
        return this.allElementsIds;
    }
};

/*****设置和获取画布大小*************/
var CanvasSize = function(){
    this.setSize = function(x,y){
        $("#bgDiv").css({"width":x+'px',"height":y+'px'});
    };
    this.getSize = function(){
        var canvaswidth = parseInt($("#bgDiv").css("width"));
        var canvasheight = parseInt($("#bgDiv").css("height"));
        return canvaswidth+","+canvasheight;
    };
    this.setBg = function(url){
        $("#bgDiv").css({"background":'url("'+url+'") no-repeat 0px 0px',"background-size":"100% 100%"});
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/************控件移动与属性页位置关系处理************/
var _move;
var scrollbarWidth = 17;
var id = [];
var downpage = function(){
    var firstSelecteId = $("#"+selecteId[0]);
    _move = true;
    var leftx = parseInt(firstSelecteId.css("left"));
    var allwidth = parseInt(firstSelecteId.width()+leftx  + scrollbarWidth);
    var bodywidth = $(window).width()+document.body.scrollLeft;
    if((allwidth > parseInt(bodywidth-240)) && cookval.cook == true){
        $("body").css({"width":parseInt(allwidth + 240)+'px'});
        document.body.scrollLeft = parseInt(240-(bodywidth - allwidth)+document.body.scrollLeft);
    }else if(cookval.cook == true){
        $("body").width($(window).width()+document.body.scrollLeft);
    }
};
var movepage = function(){
    if(_move == true && cookval.cook == true){
        var firstSelecteId = $("#"+selecteId[0]);
        var bodyElement = $("body");
        setTimeout(function()
        {
            var leftx = parseInt(firstSelecteId.css("left"));
            var allwidth = firstSelecteId.width()+leftx + scrollbarWidth;
            var bodywidth = $(window).width()+document.body.scrollLeft;
            if(allwidth >= parseInt(bodywidth-240)){
                bodyElement.css({"width":parseInt(allwidth + 240)+'px'});
                document.body.scrollLeft = bodyElement.width() - $(window).width();
            }
        },200);
    }
};
var uppage = function(){
    _move = false;
};
/*******控件拖动*******/
var moving = false;//判断控件是否能move；
var hideMove = false;//判断hide节点是否move；
var drag = function(e){
    /***************拖拽*****************/
    var _move_x;
    var _move_y;
    var x_=[];
    var y_=[];
    var leftx = [];
    var topy = [];
    var minX;
    var minY;
    var maxW;
    var maxH;
    var bgDivElement = $("#bgDiv");
    var canvasW = bgDivElement.width();
    var cancasH = bgDivElement.height();
    var limitright;
    var limitbottom;
    var selectX=[];
    var selectY=[];
    var selectW=[];
    var selectH=[];
    var mousex;
    var mousey;
    var mouseX=[];
    var mouseY=[];
    var limit = true;
    mousex = e.pageX;
    mousey = e.pageY;
    mouseX.push(mousex);
    mouseY.push(mousey);
    var idlength = selecteId.length;
    /*********角度控制**********/
    var degL;
    var degv;
    var degV;
    var degl;
    var dege;
    var right;
    var bottom;
    function getmatrix(a,b,c,d,e,f){//转换角度值  
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
    for(var j = 0; j < idlength;j++ ) {
        var lf = parseInt($("#"+selecteId[j]).css("left"));
        var tp = parseInt($("#"+selecteId[j]).css("top"));
        var ww = parseInt($("#"+selecteId[j]).width());
        var hh = parseInt($("#"+selecteId[j]).height());
        var islf=$.inArray(lf, selectX);
        var istp=$.inArray(tp, selectY);
        var isww=$.inArray(ww+lf, selectW);
        var ishh=$.inArray(hh+tp, selectH);
        var id = selecteId[j].split("_")[0];
        if( id === "Line"){//直线运动控件定位参数校正
                dege = eval('get'+$("#"+selecteId[j]).css('transform'));
                if(dege+"" != "0"){
                    if(dege > 180){
                        dege = 360-dege;
                    }
                    if(dege < 180 && dege > 90){
                        dege = 180 - dege;
                    }   
                    degV = parseInt((ww*Math.sin(dege*Math.PI/180))/2);
                    degl = parseInt((hh*Math.sin((90 - dege)*Math.PI/180))/2);
                    degL = parseInt((ww*Math.cos(dege*Math.PI/180))/2);
                    degv = parseInt((hh*Math.sin(dege*Math.PI/180))/2);
                    lf = lf + ww/2 - degL - degv;
                    tp = tp + hh/2 - degV - degl;           
                }
            }
        if(islf==-1){
            selectX.push(lf);  
        }
        if(istp==-1){
            selectY.push(tp);
        }
        if(isww==-1){
            if( id === "Line"){
                if(dege+"" != "0"){
                    right = lf + (degL + degv)*2;
                    selectW.push(right);
                }else{
                    selectW.push(ww+lf);
                }
            }else{
                selectW.push(ww+lf);
            }
        }
        if(ishh==-1){
            if( id === "Line"){
                if(dege+"" != "0"){
                    bottom = tp + (degV + degl)*2;
                    selectH.push(bottom);
                }else{
                    selectH.push(hh+tp);
                }
            }else{
                selectH.push(hh+tp);
            }
        }
    }
    var minx =selectX.sort(function(a,b){return a-b});
    var miny =selectY.sort(function(a,b){return a-b});
    var maxw =selectW.sort(function(a,b){return a-b});
    var maxh =selectH.sort(function(a,b){return a-b});
    minX = minx[0];
    minY = miny[0];
    maxW = maxw[maxw.length-1];
    maxH = maxh[maxh.length-1];
    limitright = canvasW - maxW;
    limitbottom = cancasH - maxH;
    var len = selecteId.length;
    for(var i=0;i<len;i++){
        var xx = e.pageX - parseInt($("#"+selecteId[i]).css("left"));
        var yy = e.pageY - parseInt($("#"+selecteId[i]).css("top"));
        var leftxx = parseInt($("#"+selecteId[i]).css("left"));
        var topyy = parseInt($("#"+selecteId[i]).css("top"));
        var bgw = parseInt($("#bgDiv").width());
        var bgh = parseInt($("#bgDiv").height());
        var rightxxm = bgw - maxW;
        var bottomyym = bgh - maxH;
        x_.push(xx);
        y_.push(yy);
        leftx.push(leftxx);
        topy.push(topyy);
    }
    $(document).unbind("mousemove").bind("mousemove",function(el) {
        if(selecteId.length == 1){
            new movepage();
        }
        if (limit == true && inItWebMode.editMode == true && ctrlKey == 0){
            var x = el.pageX;
            var y = el.pageY;
            if(x < limitright + mouseX[0] && x > mouseX[0] - minX && y < limitbottom + mouseY[0] && y > mouseY[0] - minY ) {
                _move_x = true;
                _move_y = true;
            }else{
                _move_x = false;
                _move_y = false;
            }
            /****左边界*****/
            if(x <= mouseX[0] - minX){
                _move_x = false;
                var lengx=leftx.length;
                var len=selecteId.length;
                for(var ii = 0,is = 0;ii < lengx,is < len;ii++,is++){
                    var xx =  leftx[ii] - minX;
                    $("#"+selecteId[is]).css({left:xx});
                }
            }else
            /***********右边界*********/
            if(x >= limitright + mouseX[0]){
                _move_x = false;
                var lengxr=leftx.length;
                var lenr=selecteId.length;
                for(var iiyr = 0,isyyr = 0;iiyr < lengxr,isyyr < lenr;iiyr++,isyyr++){
                    var xxr = leftx[iiyr] + rightxxm;
                    $("#"+selecteId[isyyr]).css({left:xxr});
                }
            }else{
                _move_x = true;
            }
            /******上边界********/
            if(y <= mouseY[0] - minY){
                _move_y = false;
                var lengy=topy.length;
                var lenyy=selecteId.length;
                for(var iiy = 0,isyy = 0;iiy < lengy,isyy < lenyy;iiy++,isyy++){
                    var xy = topy[iiy] - minY;
                    $("#"+selecteId[isyy]).css({top:xy});
                }
            }else
            /***下边界******/
            if(y >= limitbottom + mouseY[0]){
                _move_y = false;
                var lengyb=topy.length;
                var lenyyb=selecteId.length;
                for(var iiyb = 0,isyyb = 0;iiyb < lengyb,isyyb < lenyyb;iiyb++,isyyb++){
                    var xyb =  topy[iiyb] + bottomyym;
                    $("#"+selecteId[isyyb]).css({top:xyb});
                }
            }else{
                _move_y = true;
            }
            /****垂直移动*****/
            if (_move_y == true){
                var lengyy=y_.length;
                var leny=selecteId.length;
                for(var jy = 0,isy = 0;jy < lengyy,isy< leny;jy++,isy++){
                    var yyy = el.pageY - y_[jy];
                    $("#"+selecteId[isy]).css({top:yyy});
                }
            }
            /*****水平移动*****/
            if (_move_x == true){
                var lengxx=x_.length;
                var lenx=selecteId.length;
                for(var iix = 0,isx = 0;iix < lengxx,isx < lenx;iix++,isx++){
                    var xxx = el.pageX - x_[iix];
                    $("#"+selecteId[isx]).css({left:xxx});
                }
            }
        }
        moving = true;
    });
    $(window).unbind("mouseup").bind("mouseup",function() {
        $(window).unbind("mousemove");
        $(window).unbind("mouseup");
        limit = false;
        new uppage();
        x_=[];
        y_=[];
        leftx = [];
        topy = [];
        mouseX=[];
        mouseY=[];
        selectX=[];
        selectY=[];
        selectW=[];
        selectH=[];
        if(moving == true){
            mouseupLog = inTtCommand.log();
            webapi.addLog('before',mousedownLog);
            webapi.addLog('after',mouseupLog);
        }
        moving = false;
    });
};
/***********窗口宽度改变时控件与属性页的位置关系************/
function PositionalrelationshipR () {
    window.onresize = function()
    {
        var scrollbarWidth = 17;
        $(".tab").height($(window).height()-3);
        $("body").width($(window).width()+document.body.scrollLeft);
        if($(".contrl").length != 0 && $(".page").length != 0)
        {
            var leftxx = parseInt($("#"+selecteId[0]).css("left"));
            var allwidthh = parseInt($("#"+selecteId[0]).width()+leftxx + scrollbarWidth);
            var bodywidthh = $("body").width();
            if(parseInt(bodywidthh-240) < allwidthh)
            {
                $("body").css({"width":parseInt(allwidthh + 240)});
                document.body.scrollLeft = allwidthh + 240 - $(window).width();
            }
        }
    };
}
PositionalrelationshipR();
/*****************滚动条移动时设置body宽度*********************/
window.onscroll = function(){
    $(".tab").height($(window).height()-3);
    $("body").width($(window).width()+document.body.scrollLeft);
    var scroltopp = document.body.scrollTop;
    $(".page").css({
        "top": scroltopp +'px'
    });
};

//键盘事件
var inItCopyControl;
var copyy = false;
var ctrlKey = 0;
$(window).keydown(function(e){
    if(inItWebMode.editMode == true) {
        var ev = window.event || e;
        switch (ev.keyCode) {
            case 17:  //ctrlKey按下时把key志为1
                ctrlKey = 1;
                break;
            case 46:
                var isFocus = $("input").is(":focus");  
                if(false == isFocus){  
                    inItDelete.deleteElement(selecteId);  //删除控件  
                }
                break;
        }
        if (ev.ctrlKey && ev.keyCode == 65) {//全选
            selectAll();
        }
        if (ev.ctrlKey && ev.keyCode == 67) { //粘贴
            copyy = true;
            inItCopyControl = new copyControl();
        }
        if (ev.ctrlKey && ev.keyCode == 86) { //复制
            if (copyy == true) {
                var copyIds = inItCopyControl.copyControlElement;
                pasteControl(copyIds);
                inItCopyControl.copyControlElement = [];
                for(var i=0;i<copyIds.length;i++){
                    inItCopyControl.copyControlElement.push(selecteId[i]);
                }
            } else {
                return false;
            }
        }
		if (ev.ctrlKey && ev.keyCode == 90) { //撤销
            webapi.webUndo();
        }
        if (ev.ctrlKey && ev.keyCode == 89) { //恢复
            webapi.webRedo();
        }
    }
}).keyup(function(e){ //ctrlKey弹起时把key志为0
    var ev=window.event || e;
    switch(ev.keyCode){
        case 17:
            ctrlKey = 0;
            break;
    }

});

//删除控件  调用删除函数，删除选择集中的元素 对增加元素集处理
var Delete = function() {
    this.deleteElement = function (selected) { //所选中元素的id结合
        //增加删除数组指定元素的方法
        var log = inTtCommand.log();
        var deletelog = inTtCommand.definidLog();
        Array.prototype.removeByValue = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (val == this[i]) {
                    this.splice(i, 1);
                    break;
                }
            }
        };
        var arrAll = inItAllElementId.allElementsIds;
        for (var i = selected.length; i >= 0; i--) {
            $("#" + selected[i]).remove();
            //元素删除后删除链连个数组中的Id
            arrAll.removeByValue(selected[i]);
        }
        webapi.addLog('before',log);
        webapi.addLog('after',deletelog);
        selecteId = [];
        inItPropertiesPage.removePropertiesPage();
    };
};

//控件编辑样式
var SetCtrStyle = function(){
//功能：显示控件的样式；
    this.setStyle = function(selectedArr){ //参数：selectedArr；选择集id；
        var len = selectedArr.length;
        if(len == 1){
            $("#"+selectedArr[0]).addClass("boder").css({"z-index":"3"}).children('.hiden').css({
            	"border-color":"#39bbf6",
            	"background":"#ffffff"
            });
            $("#"+selectedArr[0]).siblings(".contrl").removeClass("boder").css("z-index","2").children('.hiden').remove();
        }
        if(len >= 2){
            for(var i = 0;i < len;i++){ //对选取的元素遍历显示其状态
                $("#"+selectedArr[i]).css({"z-index":"3"}).children(".hiden").css({
                	"border-color":"#999999",
                	"background":"#ffffff"
                });
                $("#"+selectedArr[i]).removeClass("boder").addClass("boderchild");
                $("#"+selectedArr[len-1]).addClass("boder").children(".hiden").css({
                	"border-color":"#39bbf6",
                	"background":"#ffffff"
                });
            }
        }
    };
//功能：移除控件的样式；
    this.removeStyle = function(selectedArr){//参数：selectedArr；选择集id；
        var len = selectedArr.length;
        for(var i = 0;i < len;i++){
            $("#"+selectedArr[i]).css("z-index","2").removeClass("boderchild").removeClass("boder").children(".hiden").remove();
            $("#"+selectedArr[i]).find(".rotated").css("display","none");
        }
    };
//功能：清除缩放点
    this.removeResize = function(selectId){ //参数selectId：选择集Id；
        var len = selectId.length;
        for(var i=0;i<len;i++){
            $("#"+selectId[i]).children(".hiden").remove();
            $("#"+selectId[i]).removeClass("boderchild ");
            $("#"+selectId[i]).find(".rotated").css("display","none");
        }
    };
//八个点的编辑
    this.EditBox = function(selectedArr){
        /******************创建辑框*******************/
        var len = selectedArr.length;
        for(var i = 0; i < len; i++) {
            if($("#" + selectedArr[i]).children(".hiden").length<=0) {
                var rRightDown = $('<div class="hiden rRightDown" id=rRightDown' + selectedArr[i] + '></div>');
                var rLeftDown = $('<div class="hiden rLeftDown" id=rLeftDown' + selectedArr[i] + '></div>');
                var rRightUp = $('<div class="hiden rRightUp" id=rRightUp' + selectedArr[i] + '></div>');
                var rLeftUp = $('<div class="hiden rLeftUp" id=rLeftUp' + selectedArr[i] + '></div>');
                var rRight = $('<div class="hiden rRight" id=rRight' + selectedArr[i] + '></div>');
                var rLeft = $('<div class="hiden rLeft" id=rLeft' + selectedArr[i] + '></div>');
                var rUp = $('<div class="hiden rUp" id=rUp' + selectedArr[i] + '></div>');
                var rDown = $('<div class="hiden rDown" id=rDown' + selectedArr[i] + '></div>');
                /******************加载编辑框*************/
                rRightDown.appendTo($("#" + selectedArr[i]));
                rLeftDown.appendTo($("#" + selectedArr[i]));
                rRightUp.appendTo($("#" + selectedArr[i]));
                rLeftUp.appendTo($("#" + selectedArr[i]));
                rRight.appendTo($("#" + selectedArr[i]));
                rLeft.appendTo($("#" + selectedArr[i]));
                rUp.appendTo($("#" + selectedArr[i]));
                rDown.appendTo($("#" + selectedArr[i]));
                $(".hiden").mousedown(function(){
                    inItTextControl.mousedown(selecteId);
                    inItProControl.mousedown(selecteId);
                    inItButtonControl.mousedown(selecteId);
                    inItChartControl.mousedown(selecteId);
                    mousedownLog = inTtCommand.log();
                });
                $(".hiden").mouseover(function(){
                    moused = true;
                });
                $("#" + selectedArr[i]).find(".rotated").css("display","block");
            }
        }
    };
//功能：控件的缩放  参数selected：元素id
    this.resized = function(selectedArr){
        var len = selectedArr.length;
        for(var i = 0; i < len; i++){
            /***************控件缩放****************/
            var rs = new Resize(selectedArr[i], { Max: true, mxContainer: "bgDiv" });
            rs.Set("rRightDown" + selectedArr[i], "right-down");
            rs.Set("rLeftDown" + selectedArr[i], "left-down");
            rs.Set("rRightUp" + selectedArr[i], "right-up");
            rs.Set("rLeftUp" + selectedArr[i], "left-up");
            rs.Set("rRight" + selectedArr[i], "right");
            rs.Set("rLeft" + selectedArr[i], "left");
            rs.Set("rUp" + selectedArr[i], "up");
            rs.Set("rDown" + selectedArr[i], "down");
        }
    };
};

//对齐操作
var AlignEvents = function(seleteId){
    if(inItWebMode.editMode == true) {
        var beforeLog = inTtCommand.log();
        webapi.addLog('before',beforeLog);
//向上对齐
        this.alignTop = function () {
            if (seleteId.length >= 2) { //遍历 以最后一个元素为主选其余为副选 以主选为标准对齐 显示其状态
                var len = seleteId.length;
                var top = $("#" + seleteId[len - 1]).css("top");
                for (var i = 0; i < len; i++) {
                    $("#" + seleteId[i]).css("top", top);
                }
            }
        };
//向左对齐
        this.alignLeft = function (){
            if (seleteId.length >= 2) {
                var len = seleteId.length;
                var left = $("#" + seleteId[len - 1]).css("left");
                for (var i = 0; i < len; i++) {
                    $("#" + seleteId[i]).css("left", left);
                }
            }
        };
//向右对齐
        this.alignRight = function () {
            if (seleteId.length >= 2) {
                var len = seleteId.length;
                var left = $("#" + seleteId[len - 1]).css("left");
                var wide = $("#" + seleteId[len - 1]).css("width");
                var l = parseInt(left) + parseInt(wide);
                for (var i = 0; i < len; i++) {
                    var right = l - $("#" + seleteId[i]).width();
                    $("#" + seleteId[i]).css({"left": right});
                }
            }
        };
//向下对齐
        this.alignBottom = function () {
            if (seleteId.length >= 2) {
                var len = seleteId.length;
                var top = $("#" + seleteId[len - 1]).css("top");
                var hige = $("#" + seleteId[len - 1]).css("height");
                var btn = parseInt(top) + parseInt(hige);
                for (var i = 0; i < len; i++) {
                    var bottom = btn - $("#" + seleteId[i]).height();
                    $("#" + seleteId[i]).css({
                        "top": bottom
                    })
                }
            }
        };
//垂直对齐
        this.vertic = function () {
            var len = selecteId.length;
            var tempId = selecteId[len - 1];
            var verticalIntermediate = parseInt(parseInt($("#" + tempId).width() / 2) + parseInt($("#" + tempId).css("left")));
            for (var i = 0; i < len; i++) {
                $("#" + selecteId[i]).css("left", parseInt(verticalIntermediate - parseInt($("#" + selecteId[i]).width() / 2)) + "px");
            }
        };
//水平对齐
        this.horizont = function () {
            var len = selecteId.length;
            var tempId = selecteId[len - 1];
            var levelIntermediate = parseInt(parseInt($("#" + tempId).height() / 2) + parseInt($("#" + tempId).css("top")));
            for (var i = 0; i < len; i++) {
                $("#" + selecteId[i]).css("top", parseInt(levelIntermediate - parseInt($("#" + selecteId[i]).height() / 2)) + "px");
            }
        };
        var afterLog = inTtCommand.log();
        webapi.addLog('after',afterLog);
    }
};

/************************选中多个控件，当拖拽任意一个被选中控件时所有控件整体移动，其相对位置不变**************************/
var selecteId = [];
var _thisId;
var mousedownLog;
var mouseupLog;
//选择状态
var SelectMode = function(){
    //移除数组指定元素
    Array.prototype.remove = function(val){ //参数val：字符串Id；
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    Array.prototype.duplicate=function() {
        var tmp = [];
        this.concat().sort().sort(function(a,b){
            if(a==b && tmp.indexOf(a) === -1) tmp.push(a);
        });
        return tmp;
    };
    Array.prototype.removeByValue = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (val == this[i]) {
                this.splice(i, 1);
                break;
            }
        }
    };
    var NoRepetition = function(arr,arr1){
        var len = arr.length;
        for(var i=0;i<len;i++){
            arr1.removeByValue(arr[i]);
        }
    };
    var removeRepeat = function(arr) {
        var len = arr.length;
        for(var i=0; i<len-1; i++){
            for(var j=i+1; j<len; j++){
                //如果元素相等了，就删除后面的那个元素
                if(arr[i] == arr[j]){
                    arr.splice(j,1);     //删除元素
                }
            }
        }
    };
    //鼠标多选配置参数
    var pconfig={
        startx:0,//起点X
        starty:0,//起点y
        beginx:0,//创建div起点x
        beginy:0,//创建div起点y
        endx:0,//结束点x
        endy:0,//结束点y
        divId:"" //div的id
    };
    //功能：计算选框的宽高
    var wh = function(){
        if(pconfig.divId != ""){
            var w = Math.abs(parseInt(pconfig.endx,10)-parseInt(pconfig.beginx,10));
            var h = Math.abs(parseInt(pconfig.endy,10)-parseInt(pconfig.beginy,10));
            $("#"+pconfig.divId).css({
                "width":w+"px",
                "height":h+"px",
                "top":pconfig.starty,
                "left":pconfig.startx,
                "position":"absolute",
                "z-index":"999",
                "border":"solid 1px blue",
                "background":"#CCFFFF",
                "opacity":"0.3"
            });
        }
    };
    this.setEditMode = function (){
        $("body").on("mousedown",".contrl",function(e){
            e.stopPropagation();
            $("img").bind("dragstart",function(){
                return false
            });
            var idi = $(this).attr("id");
            var idd=$.inArray(idi, selecteId);
            if(idd == -1){
                cookval.cook = true;
            }
            if (ctrlKey == 1) {
                inItSetCtrStyle.removeResize(selecteId);
                cookval.cook = false;//Ctrl多选时屏蔽变量
				inItSetCtrStyle.removeResize(selecteId);
                var list = $.inArray($(this).attr("id"), selecteId);//把选中id放入数组；
                inItPropertiesPage.removePropertiesPage(); //移除属性页
                if (list == -1) { //数组没有添加
                    selecteId.push($(this).attr("id"));
                } else {
                    var reMove = [];
                    if (selecteId.length != 1) { //选中时再次点选时移除元素
                        reMove.push($(this).attr("id"));
                        inItSetCtrStyle.removeResize(reMove);
                        inItSetCtrStyle.removeStyle(reMove);
                        selecteId.remove(reMove[0]);
                    }
                }
                inItSetCtrStyle.EditBox(selecteId);
                inItSetCtrStyle.resized(selecteId);
                inItSetCtrStyle.setStyle(selecteId);
            }
            if (ctrlKey == 0 && inItWebMode.editMode == true && ($.inArray($(this).attr("id"), selecteId) == -1)) {//cook屏蔽取消选中
                _thisId = $(this).attr("id");
                inItSetCtrStyle.removeResize(selecteId);
                selecteId = [];
                selecteId.push(_thisId);
                if(_thisId.split("_")[0] !== "pic"){
                    if(_thisId.split("_")[0] !== "Communicate"){
                        if(_thisId.split("_")[0] == "Chart"){
                            inItPropertiesPage.PropertiesChartPage(selecteId);
                            inItPropertiesPage.PublicFeatures(selecteId);
                        }else{
                            inItPropertiesPage.PropertiesPage(selecteId);
                            inItPropertiesPage.PublicFeatures(selecteId);
                        }
                    }else{
                        inItPropertiesPage.removePropertiesPage();
                    }
                }else{
                    inItPropertiesPage.removePropertiesPage();
                }
                determineControlType(_thisId);
                inItSetCtrStyle.EditBox(selecteId);
                inItSetCtrStyle.resized(selecteId);
                inItSetCtrStyle.setStyle(selecteId);
            }
            mousedownLog = inTtCommand.log();
            new downpage();//点击控件时属性页出现位置处理
            if(rotate === false){
                new drag(e);//拖拽功能
            }
        });
        $("#bgDiv").bind("mousedown",function(event){  //功能：按住鼠标多选元素
            event.stopPropagation();
            if(ctrlKey == 0){
                inItPropertiesPage.removePropertiesPage();
                inItSetCtrStyle.removeResize(selecteId);
                inItSetCtrStyle.removeStyle(selecteId);
                selecteId = [];
            }
            pconfig.startx = event.pageX;
            pconfig.starty = event.pageY;
            pconfig.beginx = event.pageX;
            pconfig.beginy = event.pageY;
            pconfig.divId = "newlinediv";
            $(window).bind("mousemove", function (event) {
                event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
                if ($("#" + pconfig.divId).size() <= 0) {
                    $("<div class='line' id='newlinediv'></div>").appendTo($("#content"));
                }
                $("#" + pconfig.divId).show();
                pconfig.endx = event.pageX;
                pconfig.endy = event.pageY;
                if (pconfig.endx < pconfig.beginx) {
                    pconfig.startx = pconfig.endx;
                }
                if (pconfig.endy < pconfig.beginy) {
                    pconfig.starty = pconfig.endy;
                }
                wh();
            });
            $(window).bind("mouseup", function () {
                $(window).unbind("mousemove");
                $(window).unbind("mouseup");
                if ($("#" + pconfig.divId).length > 0) {
                    cookval.cook = false;
                    $.each($(".contrl"),function(){
                        var eleBeginX = parseInt($(this).css("left"));
                        var eleBeginY = parseInt($(this).css("top"));
                        var eleEndX = parseInt($(this).width()) + eleBeginX;
                        var eleEndY = parseInt($(this).height()) + eleBeginY;
                        //从左上到右下选择
                        if(pconfig.endx >= eleBeginX && pconfig.beginx <= eleEndX && pconfig.endy >= eleBeginY && pconfig.beginy <= eleEndY){
                            selecteId.push($(this).attr("id"));
                        }
                        //从右下到左上选择
                        if(pconfig.beginx > eleBeginX && pconfig.endx < eleEndX && pconfig.beginy > eleBeginY && pconfig.endy < eleEndY){
                            selecteId.push($(this).attr("id"));
                        }
                        //从右上到左下选择
                        if(pconfig.beginx > eleBeginX && pconfig.endx < eleEndX && pconfig.endy > eleBeginY && pconfig.beginy < eleEndY){
                            selecteId.push($(this).attr("id"));
                        }
                        //从左下到右上选择
                        if(pconfig.endx > eleBeginX && pconfig.beginx < eleEndX && pconfig.beginy > eleBeginY && pconfig.endy < eleEndY){
                            selecteId.push($(this).attr("id"));
                        }
                    });
                    if(ctrlKey == 1){
                        var tempArr = selecteId.duplicate();    //获取重复选择的元素
                        removeRepeat(selecteId);
                        inItSetCtrStyle.removeResize(tempArr);
                        inItSetCtrStyle.removeStyle(tempArr);
                        NoRepetition(tempArr,selecteId);
                    }
                    removeRepeat(selecteId);
                    inItSetCtrStyle.EditBox(selecteId);
                    inItSetCtrStyle.setStyle(selecteId);
                    inItSetCtrStyle.resized(selecteId);
                }
                $("#" + pconfig.divId).remove();
            });
        });
    }
};

//定义log类型
var Command = function(){
    var cutCharacter = '***';
    var cutFreshCharacter = '&&&';
    this.log = function(){//HTML片段log
        var log = [];
        var arr = selecteId;
        for(var i=0;i<arr.length;i++){
            $("#"+arr[i]).wrap("<div class='wrap'></div>");
            log.push($("#"+arr[i]).parent(".wrap").html() + cutCharacter);
            $("#"+arr[i]).unwrap($(".wrap"));
        }
        return log.join("***");
    };
    this.definidLog = function(){//自定义id类型log
        var logg = [];
        var len = selecteId.length;
        for(i=0;i<len;i++){
            logg.push(selecteId[i] + cutCharacter);
        }
        return logg.join("***");
    };
    this.freshLog = function(){
        var freshAddLog = [];
        for(i=0;i<selecteId.length;i++){
            $("#"+selecteId[i]).wrap("<div class='wrap'></div>");
            freshAddLog.push(selecteId[i] + cutFreshCharacter + $("#"+selecteId[i]).parent(".wrap").html() +cutCharacter);
            $("#"+selecteId[i]).unwrap($(".wrap"));
        }
        return freshAddLog.join("***");
    };
    this.createLog = function(){//创建控件时log
        var createAddLog = [];
        for(i=0;i<selecteId.length;i++){
            $("#"+selecteId[i]).wrap("<div class='wrap'></div>");
            createAddLog.push('create_' + cutFreshCharacter + selecteId[i] + cutFreshCharacter + $("#"+selecteId[i]).parent(".wrap").html() +cutCharacter);
            $("#"+selecteId[i]).unwrap($(".wrap"));
        }
        return createAddLog.join("***");
    }
};

//复制
var copyControl = function(){
    this.copyControlElement = selecteId;
};
//获取元素的宽高；
var getContrlStyle = function(strId){
    var controlElement = $("#"+strId);
    var X = controlElement.css("left");
    var Y = controlElement.css("top");
    return {"X":X,"Y":Y}
};
//全选
var selectAll = function(){
    //1.得到元素集遍历；
    //2.执行样式显示操作;
    if(inItWebMode.editMode == true){
        selecteId = [];
        var tempSelecteIds = inItAllElementId.recordAllElementID();
        for(var i=0;i<tempSelecteIds.length;i++){
            selecteId.push(tempSelecteIds[i]);
        }
        inItPropertiesPage.removePropertiesPage();
        inItSetCtrStyle.removeResize(selecteId);
        inItSetCtrStyle.EditBox(selecteId);
        inItSetCtrStyle.resized(selecteId);
        inItSetCtrStyle.setStyle(selecteId);
    }
};

//等宽，等高、等大小
var identical = function(val){
    var tempIds = selecteId;
    var len = tempIds.length;
    if(len >= 2){
        var beforeLog = inTtCommand.log();
        webapi.addLog('before',beforeLog);
        var tempId = tempIds[len - 1];
        var wide = $("#"+tempId).width();
        var hige = $("#"+tempId).height();
        for(var i=0;i<len;i++){
            if('width' == val){
                $("#"+tempIds[i]).css("width",wide+'px');
            }if('height' == val){
                $("#"+tempIds[i]).css({"height":hige+'px',"line-height":hige+'px'});
            }if('size' == val){
                $("#"+tempIds[i]).css({"width":wide+'px',"height":hige+'px',"line-height":hige+'px'});
            }
        }
        var afterLog = inTtCommand.log();
        webapi.addLog('after',afterLog);
    }
};

//等距（水平，垂直）
var Equidistant = function(val){
    var tempIds = selecteId;
    var temp = [];
    var len = tempIds.length;
    var minElment;
    var mixElment;
    var spacing ;
    var EquidistantSize;
    var nextPosition;
    if(len >= 2){
        var beforeLog = inTtCommand.log();
        webapi.addLog('before',beforeLog);
        if('horizontal' == val){
            for(var i=0;i<len;i++){
                for(var j = i + 1;j<len;j++){
                    if(parseInt($("#"+tempIds[i]).css("left")) > parseInt($("#"+tempIds[j]).css("left"))){
                        temp = tempIds[i];
                        tempIds[i] = tempIds[j];
                        tempIds[j] = temp;
                    }
                }
            }
            minElment = parseInt($("#"+tempIds[0]).css("left"));
            mixElment = parseInt(parseInt($("#"+tempIds[len-1]).css("left")) + parseInt($("#"+tempIds[len-1]).width()));
            spacing = mixElment - minElment;
            for(var i=0;i<len;i++){
                spacing = (spacing - parseInt($("#"+tempIds[i]).width()));
            }
            EquidistantSize =  spacing/(len-1);
            for(var i=0;i<len;i++){
                nextPosition = parseInt($("#"+tempIds[i]).css("left"))+parseInt($("#"+tempIds[i]).width())+EquidistantSize;
                $("#"+tempIds[i+1]).css("left",nextPosition+'px');
            }
        }if('vertical' == val){
            for(var i=0;i<len;i++){
                for(var j = i + 1;j<len;j++){
                    if(parseInt($("#"+tempIds[i]).css("top")) > parseInt($("#"+tempIds[j]).css("top"))){
                        temp = tempIds[i];
                        tempIds[i] = tempIds[j];
                        tempIds[j] = temp;
                    }
                }
            }
            minElment = parseInt($("#"+tempIds[0]).css("top"));
            mixElment = parseInt(parseInt($("#"+tempIds[len-1]).css("top")) + parseInt($("#"+tempIds[len-1]).height()));
            spacing = mixElment - minElment;
            for(var i=0;i<len;i++){
                spacing = (spacing - parseInt($("#"+tempIds[i]).height()));
            }
            EquidistantSize =  spacing/(len-1);
            for(var i=0;i<len;i++){
                nextPosition = parseInt($("#"+tempIds[i]).css("top")) + parseInt($("#"+tempIds[i]).height()) + EquidistantSize;
                $("#"+tempIds[i+1]).css("top",nextPosition + 'px');
            }
        }
        var afterLog = inTtCommand.log();
        webapi.addLog('after',afterLog);
    }

};

/**************************属性页*******************************/
var Show = function() {
    this.removePropertiesPage = function () {
        $(".page").remove();
    };
    //属性页公共数据、样式
    /************显示属性页公共部分，参数传控件id**********/
    this.PropertiesPage = function (idd){
        var rightt = $('<p id=right' + idd + ' class="page hidden"></p>');
      	var tab =$('<div class="tab"><ul class="pills"><li class="tive' + idd + ' mao active" value="tc1' + idd + '"><a>常规</a></li><li value="tc2' + idd + '" class="tive' + idd + ' add mao act' + idd + '"><a>控制</a></li><li value="tc3'+idd+'" class="tive'+idd+' mao"><a>属性</a></li></ul><div id="fathy"><div id="tc1' + idd + '" class="tc11"><ul class="area"><li><fieldset><legend>位置与尺寸</legend><ul class="U1"><li class="dll dll1"><span>X</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id=X' + idd + ' class="puu' + idd + ' put put1" step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li><li class="dll dll1"><span>高</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id=put1' + idd + ' class="puu' + idd + ' put put2" required step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li><li class="dll dll1"><span>Y</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id=Y' + idd + ' class="puu' + idd + ' put put1" required type="number" step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li><li class="dll dll1"><span>宽</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id="put2' + idd + '" class="puu' + idd + ' put put3" required step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li></ul></fieldset></li><li><fieldset class="effect"><legend>风格效果</legend><ul class="U2"><li><div>平面效果</div><div class="huan" id="ping'+idd+'"></div><div class="jia1'+idd+'"></div></li><li><div>凸出效果</div><div class="huan" id="tu'+idd+'"></div><div class="jia2'+idd+'"></div></li><li><div>凹陷效果</div><div class="huan" id="ao'+idd+'"></div><div class="jia3'+idd+'"></div></li></ul></fieldset></li></ul></div><div id="tc2' + idd + '" class="tc22"><fieldset class="charge" id="elevatorcharge1'+idd+'"><legend class="firstlegend" >变量配置</legend><ul class="publicul"><li><p >变量选择</p><button type="button" id="Config'+idd+'" class="config_">选择文件</button></li><li><p>变量名称 </p><input class="config_dis'+idd+'" type="text" name="" id="variableName'+idd+'" value="" /></li><li><p>类型</p><input class="config_dis'+idd+'" type="text" name="" id="variableType'+idd+'" value="" /></li><li><p>最大工程值</p> <input type="text" name="" class="config_dis'+idd+'" id="MiXEuVal'+idd+'" value="" /></li><li><p>最小工程值 </p><input type="text" name="" class="config_dis'+idd+'" id="MinEuVal'+idd+'" value="" /></li><li><p>注释</p><input class="config_dis'+idd+'" type="text" name="" id="DataComment'+idd+'" value="" /></li></ul></fieldset></div></div></div>');
        tab.appendTo(rightt);
        rightt.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        $("#right" + idd).css({
            "position": "absolute",
            "top": scroltop +'px',
            "right": 0,
            "z-index": "900"
        });

    };
    /**************公共部分功能****************/
    this.PublicFeatures = function (idd) {
        //初始化配置变量
        var contorl = $("#"+idd);
        var ChartTag = $(".radioBox"+idd);
        if(idd[0].split("_")[0] == "Chart"){
            var o = contorl.attr("variableID");
            if(o != undefined){
                var variableType = contorl.attr("variableType");
                var variableName = contorl.attr("variableName");
                var MinEuVal = contorl.attr("variableMix");
                var MixEuVal = contorl.attr("variableMin");
                var variableID = contorl.attr("variableID");
                var DataColor = contorl.attr("DataColor");
                var variableTypeA = variableType.split(",");
                var variableNameA = variableName.split(",");
                var MinEuValA = MinEuVal.split(",");
                var MixEuValA = MixEuVal.split(",");
                var variableIDA = variableID.split(",");
                var DataColorA = DataColor.split(",");
                for(var i=0;i<variableTypeA.length;i++){
                    var TagMsg = $('<ul class="chartlistdata">'+
                        '<li class="radioNumber1 variableColor'+idd+'" variableColor = "'+DataColorA[i]+'"><input type="color" value = "'+DataColorA[i]+'" class="chartcofigcolor"/></li>'+
                        '<li class="radioName1 radioName_1 variableName'+idd+'">'+ variableNameA[i] +'</li>'+
                        '<li class="radioValue1 variableID'+idd+'">'+ variableIDA[i] +'</li>'+
                        '<li class="radioName1 variableType'+idd+'">'+ variableTypeA[i] +'</li>'+
                        '<li class="radioName1 variableMin'+idd+'">'+ MixEuValA[i] +'</li>'+
                        '<li class="radioName2 variableMix'+idd+'">'+ MinEuValA[i] +'</li>'+
                        '</ul>');
                    ChartTag.append(TagMsg);
                }
            }
            //调整配置文件变量显示颜色
            $(".radioBox"+idd).find("input").each(function(i){
                $(this).bind("change",function(){
                    if($(this).val() !=  $(this).parent("li").attr("variableColor")){
                        var val = $(this).val();
                        $(this).val(val);
                        var parentVariableColor = $(this).parent("li").attr("variableColor");
                        var DataColor = contorl.attr("DataColor");
                        var arr = DataColor.split(",");
                        var index = arr.indexOf(parentVariableColor);
                        arr[index] = val;
                        contorl.attr("DataColor",arr);
                        $(this).parent("li").attr("variableColor",val);
                    }
                })
            })
        }else{
            if(idd[0].split("_")[0] == "Elevator"){
                $("#variableType"+idd).val(contorl.attr("variableType0"));
                $("#variableName"+idd).val(contorl.attr("variableName0"));
                $("#MiXEuVal"+idd).val(contorl.attr("MiXEuVal0"));
                $("#MinEuVal"+idd).val(contorl.attr("MinEuVal0"));
                $("#DataComment"+idd).val(contorl.attr("DataComment0"));
            }else{
                $("#variableType"+idd).val(contorl.attr("variableType"));
                $("#variableName"+idd).val(contorl.attr("variableName"));
                $("#MiXEuVal"+idd).val(contorl.attr("MiXEuVal"));
                $("#MinEuVal"+idd).val(contorl.attr("MinEuVal"));
                $("#DataComment"+idd).val(contorl.attr("DataComment"));
                $("#right" + idd).siblings("p.page").remove();
            }
        }
        /********配置多变量功能*******/
        $('body').on('mousedown', '.chartlistdata', function() {
            $(this).css('background-color', '#9dd6f2').attr('select', 'selected');
            $(this).siblings('.chartlistdata').css('background-color', '#fff').removeAttr('select');
            $('#'+idd).attr('radio', 'select');
        });
        /*******上移功能********/
        $('.radioUp'+idd).click(function() {
            if ($('#'+idd).attr('radio') == 'select') {
                var prevthis_ = $("ul.chartlistdata[select='selected']").prev("ul.chartlistdata");
                $("ul.chartlistdata[select='selected'] ").insertBefore(prevthis_);
            }
        });
        /*******下移功能********/
        $('.radioDown'+idd).click(function() {
            if ($('#'+idd).attr('radio') == 'select') {
                var nextthis_ = $("ul.chartlistdata[select='selected']").next("ul.chartlistdata");
                $("ul.chartlistdata[select='selected']").insertAfter(nextthis_);
            }
        });
        /*******删除功能********/
        $('.radioMove'+idd).click(function() {
            if ($('#'+idd).attr('radio') == 'select') {
                var chartid = $("ul.chartlistdata[select='selected'] li.variableID"+idd+"").text();
                var chartc = $("#"+idd).attr("datacolor").split(",");
                var chartn = $("#"+idd).attr("variablename").split(",");
                var chari = $("#"+idd).attr("variableid").split(",");
                var chartt = $("#"+idd).attr("variabletype").split(",");
                var chartma = $("#"+idd).attr("variablemix").split(",");
                var chartmi = $("#"+idd).attr("variablemin").split(",");
                var len = $("#"+idd).attr("variableid").split(",").length;
                var index = chari.indexOf(chartid);
                chartc.splice(index,1);
                chartn.splice(index,1);
                chari.splice(index,1);
                chartt.splice(index,1);
                chartma.splice(index,1);
                chartmi.splice(index,1);
                $("#"+idd).attr("datacolor",chartc);
                $("#"+idd).attr("variablename",chartn);
                $("#"+idd).attr("variableid",chari);
                $("#"+idd).attr("variabletype",chartt);
                $("#"+idd).attr("variablemix",chartma);
                $("#"+idd).attr("variablemin",chartmi);
                $("ul.chartlistdata[select='selected']").remove();
            }
            if ($("ul.chartlistdata[select='selected']").length === 0) {
                $('#'+idd).removeAttr('radio');
            }
        });
        /**********导航切换************/
        $(".tab").height($(window).height()-3);
        $(".btn" + idd).css({
            "position": "absolute",
            "top": "515px",
            "left": "5px"
        });
        $('.tive' + idd).click(function (){//属性页切换
            $(this).addClass('active').siblings($(this)).removeClass('active');
            var id = $(this).attr("value");
            $("#" + id).show().siblings($(this)).hide();
            $(this).css('border-bottom','2px solid #39bbf6');
            $(this).siblings().css('border-bottom','2px solid #f3f3f3');
        });
        /*************属性页加载后获得当前控件的位置和宽高*************/
        var leftyl = $("#" + idd).css("left");
        var topyl = $("#" + idd).css("top");
        var leftyyl = parseInt(leftyl);
        var topyyl = parseInt(topyl);
        $("#X" + idd).val(leftyyl);
        $("#Y" + idd).val(topyyl);
        var widthyl = $("#" + idd).width();
        var heightyl = $("#" + idd).height();
        var widthyyl =  Math.round(widthyl);
        var heightyyl =  Math.round(heightyl);
        $("#put1" + idd).val(heightyyl);
        $("#put2" + idd).val(widthyyl);
        /***********初始化风格************/
        var vall = $("#" + idd).attr("class");
        if (vall.indexOf("test1") > 0){
            $("#tu"+idd+"").css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#ping"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#ao"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        } else if (vall.indexOf("test2") > 0) {
            $("#ao"+idd+"").css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#ping"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#tu"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        } else {
            $("#ping"+idd+"").css({
                "background-image":"url(images/yixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#ao"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
            $("#tu"+idd+"").css({
                "background-image":"url(images/weixuan.png)",
                "background-repeat":"no-repeat",
                "background-size":"100% 100%"
            });
        }
        /*=============模拟number函数============*/
       
            $(".posSize"+idd+" .numL"+idd+"").bind("click", function(){
			     var mNum=$(this).next().children().val();
					if(mNum==0){
						mNum=0
					}else{
						mNum--;	
					}
			     $(this).next().children().val(mNum);
			     nomorl();
			});
  			$(".posSize"+idd+" .numB"+idd+"").bind("click", function(){
			     var mNum1=$(this).prev().children().val();
			     mNum1++;
			     $(this).prev().children().val(mNum1);
			     nomorl();
			});
			
        var nomorl = function () {
        	
            /***********设置位置***********/
            var X1 = $("input[id='X" + idd + "']").val();
            var Y1 = $("input[id='Y" + idd + "']").val();
            /**********设置大小************/
            var put1 = $("input[id='put1" + idd + "']").val();
            var put2 = $("input[id='put2" + idd + "']").val();
            $("#" + idd).css({
                "left": X1 + "px",
                "top": Y1 + "px",
                "width": put2 + "px",
                "height": put1 + "px"
            });
            /************设置风格**********/
           if(pingoff){
           	    $("#ping"+idd+"").css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		$("#ao"+idd+"").css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		$("#tu"+idd+"").css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		 $("#" + idd).removeClass("test1 test2");
           }if(aooff){
           		$("#ping"+idd+"").css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		$("#ao"+idd+"").css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		$("#tu"+idd+"").css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
                $("#" + idd).removeClass("test1");
                $("#" + idd).addClass("test2");
           }if(tuoff){
           		$("#ping"+idd+"").css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		$("#ao"+idd+"").css({
                    "background-image":"url(images/weixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
           		$("#tu"+idd+"").css({
                    "background-image":"url(images/yixuan.png)",
                    "background-repeat":"no-repeat",
                    "background-size":"100% 100%"
                });
             	$("#" + idd).removeClass("test2");
                $("#" + idd).addClass("test1");
           }
        };
     
        /****************拖动结束时获取并改变控件的位置和宽高******************/
        $("#" + idd).mouseup(function () {
            setTimeout(function () {
                var lefty = $("#" + idd).css("left");
                var topy = $("#" + idd).css("top");
                var leftyy = parseInt(lefty);
                var topyy = parseInt(topy);
                $("#X" + idd).val(leftyy);
                $("#Y" + idd).val(topyy);
                var widthy = $("#" + idd).width();
                var heighty = $("#" + idd).height();
                var widthyy =  Math.round(widthy);
                var heightyy =  Math.round(heighty);
                $("#put1" + idd).val(heightyy);
                $("#put2" + idd).val(widthyy);
            }, 100);
        });
        /************实时应用所有更改*************/ 
        var fnn = function(){
            var nomwidth = $("#"+idd).width();
            var nomheight = $("#"+idd).height();
            var nomtop =  Math.round($("#"+idd).css("top"));
            var nomleft =  Math.round($("#"+idd).css("left"));
            $("#put2"+idd).val(nomwidth);
            $("#put1"+idd).val(nomheight);
            $("#Y"+idd).val(nomtop);
            $("#X"+idd).val(nomleft);
        };
        $(document).unbind("click").bind("click",function(){
            var isFocus = $(".puu" + idd).is(":focus");
            var value_x = $("#X"+idd).val();
            var value_y = $("#Y"+idd).val();
            var value_1 = $("#put1"+idd).val();
            var value_2 = $("#put2"+idd).val();
            if(value_x == "" && isFocus == false){
                fnn();
            }
            if(value_y == "" && isFocus == false){
                fnn();
            }
            if(value_1 == "" && isFocus == false){
                fnn();
            }
            if(value_2 == "" && isFocus == false){
                fnn();
            }
        });
        $(".puu" + idd).unbind("keyup").bind("keyup", function () {
            var val = $(this).val();
            if(!isNaN(Number(val))){
                nomorl();
            }else{
                fnn();
            }
        });
        /*=================风格效果==============*/
       	var tuoff=false;
           var pingoff=false;
           var aooff=false;
        $("#tu"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
          	tuoff=true;
          	pingoff=false;
          	aooff=false;
       		nomorl();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $("#ping"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
          	pingoff=true;
          	tuoff=false;
          	aooff=false;
         	nomorl();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $("#ao"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
          	aooff=true;
          	pingoff=false;
          	tuoff=false;
          	nomorl();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        
         $(".jia2"+idd).click(function(){
             var beforeLog = inTtCommand.log();
             webapi.addLog('before',beforeLog);
             tuoff=true;
             pingoff=false;
             aooff=false;
             nomorl();
             var afterLog = inTtCommand.log();
             webapi.addLog('after',afterLog);
        });
        $(".jia1"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
          	pingoff=true;
          	tuoff=false;
          	aooff=false;
         	nomorl();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        $(".jia3"+idd).click(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
          	aooff=true;
          	pingoff=false;
          	tuoff=false;
          	nomorl();
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
    };
    /**********配置多变量*********/
    this.PropertiesChartPage = function(idd){ //对图表控件的配置多变量
        var chartrightt = $('<p id=right' + idd + ' class="page hidden"></p>');
        var charttab =$('<div class="tab"><ul class="pills"><li class="tive' + idd + ' mao active" value="tc1' + idd + '"><a>常规</a></li><li value="tc2' + idd + '" class="tive' + idd + ' add mao act' + idd + '"><a>控制</a></li><li value="tc3'+idd+'" class="tive'+idd+' mao"><a>属性</a></li></ul><div id="fathy"><div id="tc1' + idd + '" class="tc11"><ul class="area"><li><fieldset><legend>位置与尺寸</legend><ul class="U1"><li class="dll dll1"><span>X</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id=X' + idd + ' class="puu' + idd + ' put put1" step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li><li class="dll dll1"><span>高</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id=put1' + idd + ' class="puu' + idd + ' put put2" required step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li><li class="dll dll1"><span>Y</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id=Y' + idd + ' class="puu' + idd + ' put put1" required type="number" step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li><li class="dll dll1"><span>宽</span><ul class="posSize posSize'+idd+'" ><li class="numL'+idd+'"> <div class="picL"></div></li><li><input type="text" id="put2' + idd + '" class="puu' + idd + ' put put3" required step="3" value="0" /></li><li class="numB'+idd+'"><div class="picR"></div></li></ul></li></ul></fieldset></li><li><fieldset class="effect"><legend>风格效果</legend><ul class="U2"><li><div>平面效果</div><div class="huan" id="ping'+idd+'"></div><div class="jia1'+idd+'"></div></li><li><div>凸出效果</div><div class="huan" id="tu'+idd+'"></div><div class="jia2'+idd+'"></div></li><li><div>凹陷效果</div><div class="huan" id="ao'+idd+'"></div><div class="jia3'+idd+'"></div></li></ul></fieldset></li></ul></div><div id="tc2' + idd + '" class="tc22"><fieldset class="charge"><legend>变量修改</legend><ul><li><p >配置变量</p><button type="button" id="Config'+idd+'" class="config_">选择文件</button></li></ul>'+
                            '<div class="radioDataBox chartdatabox">' +
                            '<div class="chartcofigbox">'+
                                '<div class="radioDiv chartDiv"><span class="radioNumber">颜色</span><span class="radioName chartName">变量名称</span><span class="radioValue">ID</span><span class="radioName">类型</span><span class="radioName">最小值</span><span class="radioName radioName2">最大值</span>'+
                                '</div>' +
                                '<div class="radioBox chartBox radioBox' + idd + '">'+
                                    // '<ul class="chartlistdata">'+
                                    //     '<li class="radioNumber1"><input type="color" class="chartcofigcolor"/></li>'+
                                    //     '<li class="radioName1 radioName_1">123</li>'+
                                    //     '<li class="radioValue1">456</li>'+
                                    //     '<li class="radioName1">789</li>'+
                                    //     '<li class="radioName1">741</li>'+
                                    //     '<li class="radioName2">852</li>'+
                                    // '</ul>'+
                                '</div>' +
                            '</div>'+
                                '<div class="radioDiv chartbtndiv">' +
                                    '<span class="radioUp'+idd+'">上移</span>' +
                                    '<span class="radioDown'+idd+'">下移</span>' +
                                    '<span class="radioMove'+idd+'">删除</span>' +
                                '</div>'+
                            '</div>' +
            '</fieldset></div></div></div>');
        $("#right"+idd).siblings("p.page").remove();
        charttab.appendTo(chartrightt);
        chartrightt.prependTo($('#content'));
        var scroltop = document.body.scrollTop;
        $("#right" + idd).css({
            "position": "absolute",
            "top": scroltop +'px',
            "right": 0,
            "z-index": "900"
        });
    };
    /***************公共字体**********/
    this.FontPage = function(idd){
        var font = $('<fieldset class="attrs"><legend>文字</legend><ul class="style1"><li><select class="lin sele3'+idd+' sele33" name="sele"><option value="1" selected="">自定义</option><option value="2">自定义</option></select></li><li><select class="lin sele2'+idd+' sele22" name="sele"><option value="1" selected="">微软雅黑</option><option value="2">楷体</option><option value="3">黑体</option><option value="4">宋体</option><option value="5">新宋体</option><option value="6">仿宋</option><option value="7">隶书</option><option value="8">幼圆</option></select></li><li><select class=" lin sele4'+idd+' sele44'+idd+'" name="sele"><option value="0" selected="selected">无</option><option value="1">初号</option><option value="2">小初</option><option value="3">一号</option><option value="4">小一</option><option value="5">二号</option><option value="6">小二</option><option value="7">三号</option><option value="8">小三</option><option value="9">四号</option><option value="10" >小四</option><option value="11">五号</option><option value="12">小五</option><option value="13">六号</option><option value="14">小六</option><option value="15">七号</option><option value="16">八号</option></select></li></ul><ul class="style2"><li><img src="images/convention.png"></li><li><img src="images/overstriking.png"></li><li><img src="images/Italic.png"></li><li class="chartfont"><img src="images/underline.png"></li><li class="chartfont"><img src="images/Italicline.png"></li></ul><ul class="chartfont style2"><li><img src="images/strikethrough.png"></li><li><img src="images/nothave.png"></li><li><img src="images/leftAlign.png"></li><li><img src="images/center.png"></li><li><img src="images/rightAlign.png"></li></ul><p class="exp'+idd+' lf exppp testy">文字示例</p></fieldset>');
       $('#tc3'+idd).append(font);
    };
    this.FontFeatures = function(idd){
        /*==============文字里的开关===================*/
        var onoff1=true;
        var onoff2=true;
        var onoff3=true;
        var onoff4=true;
        var onoff5=true;
        var onoff6=true;
        var onoff7=true;
        var onoff8=true;
        var onoff9=true;
        var onoff0=true;
        /*==============同步下划线==================*/
        if($("#"+idd).attr("underline") == "have"){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
     	$(".style2 li:eq(3) img").attr("src","images/underline2.png");	
            $(".exp"+idd).addClass("expl");
            onoff1=false;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        }
        /*==================同步删除线====================*/
        if($("#"+idd).attr("removeline") == "have"){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
       $(".style2 li:eq(5) img").attr("src","images/strikethrough2.png");	
            $(".exp"+idd).addClass("expp");
            onoff2=false;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
         }
        /*==========同步倾斜=============*/
        if($("#"+idd).attr("xieline") == "have"){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
     	$(".style2 li:eq(2) img").attr("src","images/italic2.png");
            $(".exp"+idd).css("font-style","italic");
            onoff6=false;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
         }
        /*============同步加粗============*/
        if($("#"+idd).attr("bline") == "have"){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
     	$(".style2 li:eq(1) img").attr("src","images/overstriking2.png");
            $(".exp"+idd).css("font-weight","bold");
            onoff3=false;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        }
         /*=============同步斜加下划线===============*/
        if($("#"+idd).attr("uxieline") == "have"){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        $(".style2 li:eq(4) img").attr("src","images/Italicline2.png");
            $(".exp"+idd).css("font-style","italic");
            $(".exp"+idd).addClass("expl");
            onoff7=false;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        }
        /*******************初始化对齐方式******************/
             var rl = $("."+idd+" div").attr("class");
             if(rl.indexOf("testyL") > 0 ){
	            $(".style2 li:eq(7) img").attr("src","images/leftAlign2.png");
                 $(".exp"+idd).addClass("testyL");
                 onoff0=false;
             }else if(rl.indexOf("testyR") > 0){
	        	$(".style2 li:eq(9) img").attr("src","images/rightAlign2.png");
                 $(".exp"+idd).addClass("testyR");
                 onoff8=false;
             }else {
	        	$(".style2 li:eq(8) img").attr("src","images/center2.png");
                 $(".exp" + idd).addClass("testy");
                 onoff9 = false;
             }
      
    /*===============同步字大小===============*/
    var fonSizes = $("#"+idd).attr("fonsizes");
     $(".exp"+idd).css("font-size",$("#"+idd).children("div").css("font-size"));
    $(".sele4"+idd+" option[value='"+fonSizes+"']").attr("selected","selected");
    
    /*===============同步字体===============*/
    $(".exp"+idd).css("font-family",$("#"+idd).children("div").css("font-family"));
    var fontfamly = $("#"+idd).attr("font");
    $(".sele2"+idd+" option[value='"+fontfamly+"']").attr("selected","selected");
        /*************下划线**********/
		$(".style2 li:eq(3)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
			if(onoff1){
				$("."+idd).attr("underline","have");
				onoff2=true;
				onoff5=true;
				onoff4=true;
				$(".style2 li:eq(0) img").attr("src","images/convention.png");
				/*=========示例文字============*/
				$(".style2 li:eq(3) img").attr("src","images/underline2.png");
				$(".style2 li:eq(5) img").attr("src","images/strikethrough.png");
				$(".style2 li:eq(6) img").attr("src","images/nothave.png");
                $(".exp"+idd).addClass("expl");
                $(".exp"+idd).removeClass("expp");
                /*==========控件文字============*/
                $("."+idd).children("div").addClass("expl");
                $("."+idd).children("div").removeClass("expp");
                $("."+idd).attr("removeline","nohave");
			}else{
				if(onoff7){
					$("."+idd).attr("underline","nohave");
				/*=========示例文字============*/
					$(".exp"+idd).removeClass("expl");
				 /*==========控件文字============*/
					$("."+idd).children("div").removeClass("expl");
				}
				$(".style2 li:eq(3) img").attr("src","images/underline.png");
			}
			onoff1=!onoff1;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
		});
        /*************删除线**********/
        $(".style2 li:eq(5)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
			if(onoff2){
				$("#"+idd).attr("removeline","have");
				onoff1=true;
				onoff5=true;
				onoff4=true;
				$(".style2 li:eq(0) img").attr("src","images/convention.png");
				
				/*==========示例文字===========*/
			    $(".style2 li:eq(5) img").attr("src","images/strikethrough2.png");
				$(".style2 li:eq(3) img").attr("src","images/underline.png");
				$(".style2 li:eq(6) img").attr("src","images/nothave.png");
                $(".exp"+idd).addClass("expp");
                $(".exp"+idd).removeClass("expl");
                /*============控件文字===============*/
                $("#"+idd).children("div").addClass("expp");
                $("#"+idd).children("div").removeClass("expl");
                
                $("#"+idd).attr("underline","nohave");
			}else{
				$("#"+idd).attr("removeline","nohave");
				/*==========示例文字===========*/
				 $(".exp"+idd).removeClass("expp");
					$(".style2 li:eq(5) img").attr("src","images/strikethrough.png");
				 /*============控件文字===============*/
				$("#"+idd).children("div").removeClass("expp");
			}
			onoff2=!onoff2;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
		});
        /*************文字字体**********/
        $('.sele2'+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var pl=$(this).children('option:selected').val();
            if(pl==1){
                $(".exp"+idd).css("font-family","Microsoft YaHei");
                $("#"+idd).children("div").css("font-family","Microsoft YaHei" );
                $("#"+idd).attr("font",pl);
            }else if(pl==2){
                $(".exp"+idd).css("font-family","KaiTi");
                $("#"+idd).children("div").css("font-family","KaiTi");
                $("#"+idd).attr("font",pl);
            }else if(pl==3){
                $(".exp"+idd).css("font-family","SimHei");
                $("#"+idd).children("div").css("font-family","SimHei");
                 $("#"+idd).attr("fontfamily",pl);
                $("#"+idd).attr("font",pl);
            }else if(pl==4){
                $(".exp"+idd).css("font-family","SimSun");
                $("#"+idd).children("div").css("font-family","SimSun");
                $("#"+idd).attr("font",pl);
            }else if(pl==5){
                $(".exp"+idd).css("font-family","NSimSun");
                $("#"+idd).children("div").css("font-family","NSimSun");
                $("#"+idd).attr("font",pl);
            }else if(pl==6){
                $(".exp"+idd).css("font-family","FangSong");
                $("#"+idd).children("div").css("font-family","FangSong");
                $("#"+idd).attr("font",pl);
            }else if(pl==7){
                $(".exp"+idd).css("font-family","LiSu");
                $("#"+idd).children("div").css("font-family","LiSu");
                $("#"+idd).attr("font",pl);
            }else if(pl==8){
                $(".exp"+idd).css("font-family","YouYuan");
                $("#"+idd).children("div").css("font-family","YouYuan");
                $("#"+idd).attr("font",pl);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
      
        /*************文字大小**********/
        $('.sele4'+idd).change(function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var dl=$(this).children('option:selected').val();
            if(dl==0){
            	$("#"+idd).attr("fonsizes",dl);
            }else if(dl==1){
            	/*===========上面示例文字，下面控件文字==============*/
                $(".exp"+idd).css("font-size","56px");
                $("#"+idd).children("div").css("font-size","56px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==2){
                $(".exp"+idd).css("font-size","48px");
                $("#"+idd).children("div").css("font-size","48px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==3){
                $(".exp"+idd).css("font-size","34px");
                $("#"+idd).children("div").css("font-size","34px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==4){
                $(".exp"+idd).css("font-size","32px");
                $("#"+idd).children("div").css("font-size","32px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==5){
                $(".exp"+idd).css("font-size","29px");
                $("#"+idd).children("div").css("font-size","29px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==6){
                $(".exp"+idd).css("font-size","24px");
                $("#"+idd).children("div").css("font-size","24px");
                 $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==7){
                $(".exp"+idd).css("font-size","21px");
                $("#"+idd).children("div").css("font-size","21px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==8){
                $(".exp"+idd).css("font-size","20px");
                $("#"+idd).children("div").css("font-size","20px");
               $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==9){
                $(".exp"+idd).css("font-size","18px");
                $("#"+idd).children("div").css("font-size","18px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==10){
                $(".exp"+idd).css("font-size","16px");
                $("#"+idd).children("div").css("font-size","16px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==11){
                $(".exp"+idd).css("font-size","14px");
                $("#"+idd).children("div").css("font-size","14px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==12){
                $(".exp"+idd).css("font-size","12px");
                $("#"+idd).children("div").css("font-size","12px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==13){
                $(".exp"+idd).css("font-size","10px");
                $("#"+idd).children("div").css("font-size","10px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==14){
                $(".exp"+idd).css("font-size","8px");
                $("#"+idd).children("div").css("font-size","8px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==15){
                $(".exp"+idd).css("font-size","7px");
                $("#"+idd).children("div").css("font-size","7px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }else if(dl==16){
                $(".exp"+idd).css("font-size","6px");
                $("#"+idd).children("div").css("font-size","6px");
                $("#"+idd).attr("fonsizes",dl);
                $("#"+idd).attr("fontsize",dl);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*================文字加粗===============*/
        $(".style2 li:eq(1)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        	onoff4=true;
         	if(onoff3){
         		$(".style2 li:eq(0) img").attr("src","images/convention.png");
         		$("#"+idd).attr("bline","have");
				/*==========示例文字===========*/
				$(".style2 li:eq(1) img").attr("src","images/overstriking2.png");
                $(".exp"+idd).css("font-weight","bold");
                /*============控件文字===============*/
                 $("#"+idd).children("div").css("font-weight","bold");
			}else{
				$("#"+idd).attr("bline","nohave");
				/*==========示例文字===========*/
				 $(".exp"+idd).css("font-weight","normal");
			
				$(".style2 li:eq(1) img").attr("src","images/overstriking.png");
				 /*============控件文字===============*/
				$("#"+idd).children("div").css("font-weight","normal");
			}
			onoff3=!onoff3;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        
        /*==============文字倾斜====================*/
        $(".style2 li:eq(2)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            onoff4=true;
            if(onoff6){
         		$(".style2 li:eq(0) img").attr("src","images/convention.png");
         		 $("#"+idd).attr("xieline","have");
				/*==========示例文字===========*/
				$(".style2 li:eq(2) img").attr("src","images/italic2.png");
                $(".exp"+idd).css("font-style","italic");
                /*============控件文字===============*/
                $("#"+idd).children("div").css("font-style","italic");
            }else{
                if(onoff7){
                    $("#"+idd).attr("xieline","nohave");
                    /*==========示例文字===========*/
                    $(".exp"+idd).css("font-style","normal");
                    /*============控件文字===============*/
                    $("#"+idd).children("div").css("font-style","normal");
                }
				$(".style2 li:eq(2) img").attr("src","images/Italic.png");
            }
            onoff6=!onoff6;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*================无效果==============*/
        $(".style2 li:eq(6)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        	onoff4=true;
        	if(onoff5){
        		$("#"+idd).attr("wuline","have");
        		$(".style2 li:eq(6) img ").attr("src","images/nothave2.png");
        		if(onoff1==false||onoff2==false){
	        		/*==========示例文字===========*/
	                $(".exp"+idd).removeClass("expp");
	                $(".exp"+idd).removeClass("expl");
	                /*============控件文字===============*/
	                $("#"+idd).children("div").removeClass("expp");
	                $("#"+idd).children("div").removeClass("expl");
	                 /*===================*/
	               $(".style2 li:eq(3) img").attr("src","images/underline.png");
	               $(".style2 li:eq(5) img").attr("src","images/strikethrough.png");
	               $("#"+idd).attr("removeline","nohave");
                   $("#"+idd).attr("underline","nohave");
	        	}
        	}else{
        		 $(".style2 li:eq(6) img ").attr("src","images/nothave.png");
        		 $("#"+idd).attr("wuline","nohave");
        	}
			 onoff5=!onoff5;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
        /*============倾斜下划线================*/
        $(".style2 li:eq(4)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        	onoff4=true;
       		if(onoff7){
       			$(".style2 li:eq(0) img").attr("src","images/convention.png");
       			$("#"+idd).attr("uxieline","have");
       			/*==========示例文字===========*/
       			$(".exp"+idd).css("font-style","italic");
       			$(".exp"+idd).addClass("expl");
       			 $(".style2 li:eq(4) img").attr("src","images/Italicline2.png");
       			/*============控件文字===============*/
       			$("#"+idd).children("div").css("font-style","italic");
       			$("#"+idd).children("div").addClass("expl");
       		}else{
       			$("#"+idd).attr("uxieline","nohave");
       			$(".style2 li:eq(4) img").attr("src","images/Italicline.png");
       			if(onoff6){
       				$(".exp"+idd).css("font-style","normal");
       				$("#"+idd).children("div").css("font-style","normal");
       			}
       			if(onoff1){
       				$(".exp"+idd).removeClass("expl");
       				$("#"+idd).children("div").removeClass("expl");
       			}
       		}
       		onoff7=!onoff7;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
       
        });
        /*************T效果**********/
        $(".style2 li:eq(0)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
        	if(onoff4){
        		$("#"+idd).attr("Tline","have");
				/*==========示例文字===========*/
				$(".style2 li:eq(0) img").attr("src","images/convention2.png");
				$(".style2 li:eq(1) img").attr("src","images/overstriking.png");
				$(".style2 li:eq(2) img").attr("src","images/Italic.png");
				$(".style2 li:eq(3) img").attr("src","images/underline.png");
				$(".style2 li:eq(4) img").attr("src","images/Italicline.png");
				$(".style2 li:eq(5) img").attr("src","images/strikethrough.png");
				
                $(".exp"+idd).css("font-style","normal");
                $(".exp"+idd).css("font-weight","normal");
                $(".exp"+idd).removeClass("expl");
                $(".exp"+idd).removeClass("expp");
                /*============控件文字===============*/
                $("#"+idd).children("div").css("font-style","normal");
                $("#"+idd).children("div").css("font-weight","normal");
                $("#"+idd).children("div").removeClass("expp");
                $("#"+idd).children("div").removeClass("expl");
                 onoff1=true;
                 onoff2=true;
                 onoff3=true;
                 onoff4=true;
                 onoff5=true;
                 onoff6=true;
                 onoff7=true;
                 $("#"+idd).attr("uxieline","nohave");
                 $("#"+idd).attr("bline","nohave");
                 $("#"+idd).attr("removeline","nohave");
                 $("#"+idd).attr("underline","nohave");
                  $("#"+idd).attr("xieline","nohave");
			}else{
				$("#"+idd).attr("Tline","nohave");
				$(".style2 li:eq(0) img").attr("src","images/convention.png");
			}
			onoff4=!onoff4;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
    	 /*==============文字居左=================*/
    	$(".style2 li:eq(9)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
    		if(onoff8){
    			$(".style2 li:eq(9) img").attr("src","images/rightAlign2.png");
    			$(".style2 li:eq(8) img").attr("src","images/center.png")
    			$(".style2 li:eq(7) img").attr("src","images/leftAlign.png");
    			$(".attrs .exp"+idd).addClass("testyR");
    			$("."+idd).children("div").addClass("testyR");
    			$(".attrs .exp"+idd).removeClass("testyL");
    			$("."+idd).children("div").removeClass("testyL");
    			$(".attrs .exp"+idd).removeClass("testy");
    			$("."+idd).children("div").removeClass("testy");
    			onoff9=true;
    			onoff0=true;
    		}else{
    			$(".style2 li:eq(9) img").attr("src","images/rightAlign.png");
    			$(".exp"+idd).removeClass("testyR");
    			$("."+idd).children("div").removeClass("testyR");
    			$(".exp"+idd).addClass("testy");
    			$("."+idd).children("div").addClass("testy");
    		}
    		onoff8=!onoff8;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
    	});
    	/*==============文字居中=================*/
    	$(".style2 li:eq(8)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
    		if(onoff9){
    			$(".style2 li:eq(8) img").attr("src","images/center2.png");
    			$(".style2 li:eq(7) img").attr("src","images/leftAlign.png");
    			$(".style2 li:eq(9) img").attr("src","images/rightAlign.png");
    			$(".exp"+idd).addClass("testy");
    			$("."+idd).children("div").addClass("testy");
    			$(".exp"+idd).removeClass("testyL");
    			$("."+idd).children("div").removeClass("testyL");
    			$(".exp"+idd).removeClass("testyR");
    			$("."+idd).children("div").removeClass("testyR");
    			onoff8=true;
    			onoff0=true;
    		}else{
    			$(".style2 li:eq(8) img").attr("src","images/center.png");
    		}
    		onoff9=!onoff9;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
    	});
    /*	============文字居右================*/
    	$(".style2 li:eq(7)").bind("click", function(){
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
    		if(onoff0){
    			$(".style2 li:eq(7) img").attr("src","images/leftAlign2.png");
    			$(".style2 li:eq(8) img").attr("src","images/center.png");
    			$(".style2 li:eq(9) img").attr("src","images/rightAlign.png");
    			$(".exp"+idd).addClass("testyL");
    			$("."+idd).children("div").addClass("testyL");
    			$(".exp"+idd).removeClass("testy");
    			$("."+idd).children("div").removeClass("testy");
    			$(".exp"+idd).removeClass("testyR");
    			$("."+idd).children("div").removeClass("testyR");
    			onoff8=true;
    			onoff9=true;
    		}else{
    			$(".style2 li:eq(7) img").attr("src","images/leftAlign.png");
    			$(".exp"+idd).removeClass("testyL");
    			$("."+idd).children("div").removeClass("testyL");
    			$(".exp"+idd).addClass("testy");
    			$("."+idd).children("div").addClass("testy");
    		}
    		onoff0=!onoff0;
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
    	});
    };
    /***************属性页颜色格式：将RGB颜色值转换成十六进制颜色值**********/
    this.formatColor = function(rgbColor) {
        rgbColor = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x){
            return ('0' + parseInt(x).toString(16)).slice(-2);
        }
        return ('#' + hex(rgbColor[1]) + hex(rgbColor[2]) + hex(rgbColor[3]));
    };
    /*
        功能：属性页设置颜色
        参数：
        operationElement: 属性页操作的颜色节点
        targetCss: 数组，需要赋值的颜色类型和颜色节点。如['color', $('#'+idd)]/['background-color', $('#'+idd)]
        targetAttr: 数组，需要赋值的属性名称和节点
    */
    this.setColor = function(operationElement, targetCss, targetAttr) {
        operationElement.unbind('change').change(function() {
            var beforeLog = inTtCommand.log();
            webapi.addLog('before',beforeLog);
            var value = $(this).val();
            if (targetCss && targetCss[0] && targetCss[1]) {
                targetCss[1].css(targetCss[0], value);
            }
            if (targetCss && targetCss[3] && targetCss[2]) {
                targetCss[3].css(targetCss[2], value);
            }
            if (targetAttr && targetAttr[0] && targetAttr[1]) {
                targetAttr[1].attr(targetAttr[0], value);
            }
            if (targetAttr && targetAttr[3] && targetAttr[2]) {
                targetAttr[3].attr(targetAttr[2], value);
            }
            var afterLog = inTtCommand.log();
            webapi.addLog('after',afterLog);
        });
    };
    /***************输入校验**********/
    var reg;
    this.inputValidate = {
        booleanValidate: function(value) {
            reg = /^[0-1]$/;
            return reg.test(value);
        },
        integerValidate: function(value, minValue, maxValue) { //minValue:允许输入的最小工程值; maxValue:允许输入的最大工程值
            reg = /^[0-9]*$/;
            if (reg.test(value)) {
                if (maxValue) {
                    return parseInt(value) <= parseInt(maxValue) && parseInt(value) >= parseInt(minValue);
                } else {
                    return parseInt(value) >= parseInt(minValue);
                }
            } else {
                return false;
            }
        },
        floatValidate: function(value, minValue, maxValue) {
            reg = /^[0-9]+(.[0-9]*)?$/;
            if (minValue && maxValue && reg.test(value)) {
                return parseFloat(value) <= parseFloat(maxValue) && parseFloat(value) >= parseFloat(minValue);
            } else {
                return false;
            }
        },
        stringValidate: function(value) {
            reg = /^[0-9a-zA-Z\u4E00-\u9FA5.]+$/; //字符量只允许输入汉字、字母、数字和小数点
            return reg.test(value);
        },
        ipValidate: function(value) {
            reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
            return reg.test(value);
        },
        portValidate: function(value) {
            reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
            return reg.test(value);
        }
    };
};

//配置变量
var navHtml = '';
var ModalFeature = function(){ //模态框定义
    var _this = this;
    var isOpened = false;
    this.ModalHtml = function() { //模态框的html
        var Modalstr = '<div class="wrap"><div class="domalBox">' +
                            '<header class="domal_drag">' +
                                '<div class="domal_drag_box">' +
                                    '<div class="domal_dragN">变量配置</div>' +
                                    '<div class="domal_dragC">X</div>' +
                                '</div>' +
                            '</header>' +
                            '<div id="contentbox">' +
                                '<ul id="cfgList">' +
                                    '<li class="cfgList_N">配置文件</li>' +
                                    '<li class="cfgList_T"><input type="text" id="inputUrl" /></li>' +
                                    '<li class="cfgList_B">' +
                                        '<div>浏&nbsp;览</div>' +
                                        '<input id="fileField" type="text"/>' +
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
                                    '<li id="sureBtn">确认</li>' +
                                    '<li id="cancel">取消</li>' +
                                '</ul>' +
                            '</footer>' +
                        '</div></div>';
        $("body").append(Modalstr);
    };
    this.Modalbox = function(id){   //显示模态框
        var ConfigO = $("#Config"+id);
        ConfigO.bind("click",function(){
            _this.ModalHtml();
            if(isOpened == true){
                $(navHtml).appendTo($("#variableCfg"));
            }
            if(id[0].split("_")[0] == "Chart"){
                $("#footer").find("li:first-child").text("添加");
            }
            _this.domalMove(selecteId);
            _this.removeDomal.closeDomal(id);
            _this.ConfigTree();
            _this.menuOperate.variableMsg(id);
            _this.menuOperate.treeSH();
            _this.menuOperate.dbltreeSH();
            _this.menuOperate.treeSys();
            _this.menuOperate.dbltreeSys();
            _this.menuOperate.treeDevice();
            _this.menuOperate.dbltreeDevice();
            _this.bindvariable(id)
        });
    };
    this.removeDomal = { //关闭配置变量框
        removeModalBox:function (arr,obg) {//移除配置框，arr：选择集、obg：点击关闭对象；
            var domal = $(".domalBox");
            var wrap = $(".wrap");
            var sureBtn = $("#sureBtn");
            obg.bind("click",function(){
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
                        $("#"+id).attr("variableName",variableName)
                    });
                    ChartRadioBox.find('.variableID'+id+'').each(function(i){
                        var Id = $(this).text();
                        variableID.push(Id);
                        $("#"+id).attr("variableID",variableID)
                    });
                    ChartRadioBox.find('.variableType'+id+'').each(function(i){
                        var Type = $(this).text();
                        variableType.push(Type);
                        $("#"+id).attr("variableType",variableType)
                    });
                    ChartRadioBox.find('.variableMix'+id+'').each(function(i){
                        var Mix = $(this).text();
                        MixEuVal.push(Mix);
                        $("#"+id).attr("variableMix",MixEuVal)
                    });
                    ChartRadioBox.find('.variableMin'+id+'').each(function(i){
                        var Min = $(this).text();
                        MinEuVal.push(Min);
                        $("#"+id).attr("variableMin",MinEuVal)
                    });
                    ChartRadioBox.find('.variableColor'+id+'').each(function(i){
                        var Color = $(this).attr("variableColor");
                        DataColor.push(Color);
                        $("#"+id).attr("DataColor",DataColor)
                    });
                }
                domal.remove();
                wrap.remove();
                sureBtn.removeAttr("support");
            })
        },
        closeX:function(arr){ //arr 选择集
            var o = $(".domal_dragC");
            _this.removeDomal.removeModalBox(arr,o);
        },
        closeC:function(arr){
            var o = $("#cancel");
            _this.removeDomal.removeModalBox(arr,o);
        },
        closeDomal:function(arr){
            this.closeX(arr);
            this.closeC(arr);
        }

    };
    this.domalMove = function(){ //模态框的移动
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
    this.ConfigTree = function(){ //选择配置文件
        var ConfigO = $("#fileField");
        ConfigO.unbind("click").bind("click",function() {
            webapi.getJsonPath();
        })
    };
    this.menuOperate = {
        variableMsg:function(idd){ //显示变量相关属性
            var key = $(".attributeKey li");
            var val = $(".attributeValue li");
            $("#variableCfg").on("click",".variableTxt",function(){
                var control = $("#"+idd);
                var sureBtn = $("#sureBtn");
                var dataType = control.attr("DataType");
                var supportDataType = dataType.split(",");
                var len = supportDataType.length;
                var Name ='',ID = '',DataType = '',DataComment = '',MinEuVal = '',MaxEuVal = '';
                    Name = $(this).attr("Name");
                    ID = $(this).attr("id");
                    DataType = $(this).attr("DataType");
                    DataComment = $(this).attr("DataComment");
                    MinEuVal = $(this).attr("MinEuVal");
                    MaxEuVal = $(this).attr("MaxEuVal");
                    sureBtn.removeAttr("support");
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
                        sureBtn.attr("support","support");
                        return false;
                    }else{
                        sureBtn.css("background","#a0a09b");
                        sureBtn.attr("support","");
                    }
                }
            });
        },
        treeNavSysterm:function(obj){//收起导航树
            if(obj.parent(".parents").siblings(".systems").length>=1){
                if(obj.parent(".parents").siblings(".systems").is(":visible")){
                    obj.parent(".parents").siblings(".systems").hide();
                    obj.attr("src","images/open.png");
                }else{
                    obj.parent(".parents").siblings(".systems").show();
                    obj.attr("src","images/close.png");
                }
            }
        },
        treeNavDevice:function(obj){//操作设备级导航树
            if(obj.parent(".systems").children(".device").length>=1){
                if(obj.parent(".systems").children(".device").is(":visible")){
                    obj.parent(".systems").children(".device").hide();
                    obj.attr("src","images/open.png");
                }else{
                    obj.parent(".systems").children(".device").show();
                    if(obj.parent(".systems").index() == $(".systems").length){
                        obj.parent(".systems").children(".device").css("background","");
                    }else{
                        obj.parent(".systems").children(".device").css("background","url('images/bar_3.gif') no-repeat 24px 0px");
                    }
                    obj.attr("src","images/close.png");
                }
            }
        },
        treeNavVariable:function(obj){//操作变量级导航树
            if(obj.parent(".device").children(".variable").length>=1){
                if(obj.parent(".device").children(".variable").is(":visible")){
                    obj.parent(".device").children(".variable").hide();
                    obj.attr("src","images/open.png");
                }else{
                    obj.parent(".device").children(".variable").show();
                    obj.attr("src","images/close.png");
                    obj.parent(".device").children(".variable").children(".variablePic").attr("src","images/bar_1.gif");
                    obj.parent(".device").children(".variable:last-child").children(".variablePic").attr("src","images/bar_2.gif");
                    if(obj.parents(".systems").children(".device").index()-1 == $(this).parents(".systems").children(".device").length){
                        obj.parent(".device").children(".variable").css("margin-left","24px");
                    }else{
                        obj.parent(".device").children(".variable").css("background","url('images/bar_3.gif') no-repeat 41px 0px");//设备
                        if(obj.parent(".device").children(".variable").children("#p1").length<1){//系统
                            obj.parent(".device").children(".variable").children(".variablePic").before('<img id="p1" src="images/bar_3.gif">');
                        }
                    }
                }
            }
        },
        treeSH:function(){ //对子系统的展开收缩
            $("#variableCfg").on("click",".parents img",function(){
                _this.menuOperate.treeNavSysterm($(this));
            })
        },
        dbltreeSH:function(){ //对子系统的展开收缩
            $("#variableCfg").on("dblclick",".parents div",function(){
                _this.menuOperate.treeNavSysterm($(this));
            })
        },
        treeSys:function(){ //对设备的展开收缩
            $("#variableCfg").on("click",".systems img",function(){
                _this.menuOperate.treeNavDevice($(this));
            })
        },
        dbltreeSys:function(){ //对设备的展开收缩
            $("#variableCfg").on("dblclick",".systems .systemsTxt",function(){
                _this.menuOperate.treeNavDevice($(this));
            })
        },
        treeDevice:function(){ //对变量的展开收缩
            $("#variableCfg").on("click",".device img",function(){
                _this.menuOperate.treeNavVariable($(this));
            })
        },
        dbltreeDevice:function(){ //对变量的展开收缩
            $("#variableCfg").on("dblclick",".device .deviceTxt",function(){
                _this.menuOperate.treeNavVariable($(this));
            })
        }

    };
    this.bindvariable = function(idd){ //对控件绑定变量id
        var sureBtn = $("#sureBtn");
        var controlO = $("#"+idd);
        var variableID = [];
        var tempId = [];
        sureBtn.bind("click",function(){ //对控件添加变量的ID属性
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
            if(sureBtn.attr("support") == "support"){
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
                if(idd[0].split("_")[0] == "Chart"){//对图表控件的配置多变量
                    var TagMsg = $('<ul class="chartlistdata">'+
                        '<li class="radioNumber1 variableColor'+idd+'" variableColor = "'+variableColor+'"><input type="color" value = "'+variableColor+'" class="chartcofigcolor"/></li>'+
                        '<li class="radioName1 radioName_1 variableName'+idd+'">'+ oNameVal +'</li>'+
                        '<li class="radioValue1 variableID'+idd+'">'+ oIdVal +'</li>'+
                        '<li class="radioName1 variableType'+idd+'">'+ oTypeVal +'</li>'+
                        '<li class="radioName1 variableMin'+idd+'">'+ oMinVal +'</li>'+
                        '<li class="radioName2 variableMix'+idd+'">'+ oMixVal +'</li>'+
                        '</ul>');
                    var id = idd[0];
                    var ChartRadioBox = $(".radioBox"+id);
                    var controlO_VariableId = controlO.attr("variableID");
                    if(ChartRadioBox.find("ul").length >= 1 && ChartRadioBox.find("ul").length <= 8){
                        if(tempId.indexOf(oIdVal) == -1){
                            if(controlO_VariableId != undefined){//判断添加过再次增加的处理判断
                                var hasVariableIdArr = controlO_VariableId.split(",");
                                if(hasVariableIdArr.indexOf(oIdVal) == -1){
                                    ChartTag.append(TagMsg);
                                    tempId.push(oIdVal);
                                }else{
                                    alert("亲,配置的变量重复啦！");
                                }
                            }else{
                                ChartTag.append(TagMsg);
                                tempId.push(oIdVal);
                            }
                        }else{
                            alert("亲,配置的变量重复啦！");
                        }
                    }if(ChartRadioBox.find("ul").length == 0){
                        ChartTag.append(TagMsg);
                        tempId.push(oIdVal);
                    }if(ChartRadioBox.find("ul").length > 8){
                        alert("亲，只支持八个变量！");
                    }
                    //调整配置文件变量显示颜色
                    $(".radioBox"+idd).find("input").each(function(i){
                        $(this).bind("change",function(){
                            if($(this).val() !=  $(this).parent("li").attr("variableColor")){
                                var val = $(this).val();
                                $(this).val(val);
                                var parentVariableColor = $(this).parent("li").attr("variableColor");
                                var DataColor = control.attr("DataColor");
                                var arr = DataColor.split(",");
                                var index = arr.indexOf(parentVariableColor);
                                arr[index] = val;
                                control.attr("DataColor",arr);
                                $(this).parent("li").attr("variableColor",val);
                            }
                        })
                    })
                }else {
                    if (idd[0].split("_")[0] == "SlideBar") {
                        $('.sliderNum1'+idd[0]).text(oMinVal);
                        $('.sliderNum3'+idd[0]).text(oMixVal);
                    }
                    if(idd[0].split("_")[0] == "Elevator"){
                    	$("#duihao0"+idd).text("√");
                        var tempArr = [];
                        var variable_1 = control.attr("variableID1");
                        var variable_2 = control.attr("variableID2");
                        var variable_3 = control.attr("variableID3");
                        if(variable_1 != undefined) {
                            tempArr.push(variable_1);
                        }if(oIdVal != undefined){
                            tempArr.push(oIdVal);
                        }if(variable_2 != undefined){
                            tempArr.push(variable_2);
                        }if(variable_3 != undefined){
                            tempArr.push(variable_3);
                        }
                        $("#variableName"+idd).val(oNameVal);
                        $("#MiXEuVal"+idd).val(oMixVal);
                        $("#MinEuVal"+idd).val(oMinVal);
                        $("#DataComment"+idd).val(oCommentVal);
                        $("#variableType"+idd).val(oTypeVal);
                        control.attr({
                            "variableID":tempArr,
                            "variableID0":oIdVal,
                            "variableName0":oNameVal,
                            "variableType0":oTypeVal,
                            "MiXEuVal0":oMixVal,
                            "MinEuVal0":oMinVal,
                            "DataComment0":oCommentVal
                        });
                    }else{
                        $("#variableName"+idd).val(oNameVal);
                        $("#MiXEuVal"+idd).val(oMixVal);
                        $("#MinEuVal"+idd).val(oMinVal);
                        $("#DataComment"+idd).val(oCommentVal);
                        $("#variableType"+idd).val(oTypeVal);
                        control.attr({
                            "variableID":oIdVal,
                            "variableName":oNameVal,
                            "variableType":oTypeVal,
                            "MiXEuVal":oMixVal,
                            "MinEuVal":oMinVal,
                            "DataComment":oCommentVal
                        });
                    }
                    domal.remove();
                    wrap.remove();
                }
            }
        });
    };
    this.configInfoCopy = function(srcElement, desElement) { //配置变量信息复制功能;srcElement--原控件的根节点 desElement--复制控件的根节点
        var variableId = srcElement.attr('variableID');
        var variableName = srcElement.attr('variableName');
        var variableType = srcElement.attr('variableType');
        var maxValue = srcElement.attr('MiXEuVal') ? srcElement.attr('MiXEuVal') : srcElement.attr('variableMix');
        var minValue = srcElement.attr('MinEuVal') ? srcElement.attr('MinEuVal') : srcElement.attr('variableMin');
        var dataComment = srcElement.attr('DataComment');
        var dataColor = srcElement.attr('DataColor');
        if (variableId && srcElement.attr('MiXEuVal')) {
            desElement.attr({
                "variableID": variableId,
                "variableName": variableName,
                "variableType": variableType ,
                "MiXEuVal": maxValue,
                "MinEuVal": minValue,
                "DataComment": dataComment
            });
        } else { //处理“图表”控件
            desElement.attr({
                "variableID": variableId,
                "variableName": variableName,
                "variableType": variableType ,
                "variableMix": maxValue,
                "variableMin": minValue,
                "DataColor": dataColor
            });
        }
    };
    this.orderControlFeatures = function(confir, succe,fail,idd){
    	var buttonoff1 = true;
        var buttonoff2 = true;
        var buttonoff3 = true;
        function confrimOrder() { //确认控制命令
            confir.bind('click', function () {
                if (buttonoff1) {
                    $("#" + idd).attr("sure", "yes");
                    $(this).css({
                        'background-image': 'url(images/selected.png)'
                    });
                } else {
                    $("#" + idd).attr("sure", "no");
                    $(this).css({
                        'background-image': 'url(images/notselected.png)'
                    });
                }
                buttonoff1 = !buttonoff1;
            });
        };
        function successOrder() { //报告成功命令
            succe.bind('click', function() {
                if (buttonoff2) {
                    $("#"+idd).attr("success","yes");
                    $(this).css({
                        'background-image': 'url(images/selected.png)'
                    });
                } else {
                    $("#"+idd).attr("success","no");
                    $(this).css({
                        'background-image': 'url(images/notselected.png)'
                    });
                }
                buttonoff2 = !buttonoff2;
            });
        };
        function failOrder() { //报告失败命令
            fail.bind('click', function() {
                if (buttonoff3) {
                    $("#"+idd).attr("fails","yes");
                    $(this).css({
                        'background-image': 'url(images/selected.png)'
                    });
                } else {
                    $("#"+idd).attr("fail","no");
                    $(this).css({
                        'background-image': 'url(images/notselected.png)'
                    });
                }
                buttonoff3 =! buttonoff3;
            });
        };
        function initOrder() {
            if($("#"+idd).attr("sure") == "yes"){
                confir.css({'background-image': 'url(images/selected.png)'});
                buttonoff1 = false;
            } else {
                confir.css({'background-image': 'url(images/notselected.png)'});
            }
            if($("#"+idd).attr("success") == "yes"){
                succe.css({'background-image': 'url(images/selected.png)'});
                buttonoff2 = false;
            } else {
                succe.css({'background-image': 'url(images/notselected.png)'});
            }
            if($("#"+idd).attr("fails") == "yes"){
                fail.css({'background-image': 'url(images/selected.png)'});
                buttonoff3 = false;
            } else {
                fail.css({'background-image': 'url(images/notselected.png)'});
            }
        };
        function init() {
            confrimOrder();
            successOrder();
            failOrder();
            initOrder();
        };
        init();
    };
};

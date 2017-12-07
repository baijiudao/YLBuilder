var inItSendModal;
var starttime;
var endtime;
var limittime;
$(function(){
    /***************模态窗*******************/
    var ModalSend = function() {
        this.modelPage = function(idd) {
            /****************发送数据模态窗*******************/
            var modelDom;
            if (idd) {
                modelDom = '<div class="model modalmove">' + '<div class="modelmove">' + '<div class="modelhead">' + '<div class="lf">命令发送</div>' + '<div class="rt modelclose">X</div>' + '</div>' + '</div>' + '<div class="modelline"></div>' + '<div class="modellist"><div class="lf">变量个数</div><input type="text" class="rt sty ename" disabled></div>' + '<div class="modellist"><div class="lf">变量类型</div><input type="text" class="rt sty etype" disabled></div>' + '<div class="modellist"><div class="lf">下发值</div><input type="text" class="rt sty eval" disabled></div>' + '<div class="modelfoot rt">' + '<button class="modelbtn modelsure">发送</button>' + '<button class="modelbtn modelcancel">取消</button>' + '</div>' + '</div>';
            } else {
                modelDom = '<div class="model modalmove">' + '<div class="modelmove">' + '<div class="modelhead">' + '<div class="lf">命令发送</div>' + '<div class="rt modelclose">X</div>' + '</div>' + '</div>' + '<div class="modelline"></div>' + '<div class="modellist"><div class="lf">变量名称</div><input type="text" class="rt sty ename" disabled></div>' + '<div class="modellist"><div class="lf">变量类型</div><input type="text" class="rt sty etype" disabled></div>' + '<div class="modellist"><div class="lf">下发值</div><input type="text" class="rt sty eval" disabled></div>' + '<div class="modelfoot rt">' + '<button class="modelbtn modelsure">发送</button>' + '<button class="modelbtn modelcancel">取消</button>' + '</div>' + '</div>';
            }
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
        /********报告成功/失败模态窗**********/
        this.modelReportFeature = function(str) {
            var strInfo = '';
            if (str == 'success') {
                strInfo = '成功';
            } else if (str == 'fail') {
                strInfo = '失败';
            }
            var modelDoms =
                '<div class="modeltext modalmove">' +
                    '<div class="modelmove modelTotal">' +
                        '<div class="modelheadtex modelHeader"><div class="lf">提示</div><div class="rt modelclose">X</div></div>' +
                    '</div>' +
                    '<div class="modeltextline"></div>' +
                        '<div class="infotab"><span>命令发送'+strInfo+'！</span></div>' +
                    '<div class="modelSuccessFooter">' +
                        '<button class="modelbtn modelInfoSure">确认</button>' +
                    '</div>' +
                '</div>';
            $("body").append(modelDoms);
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
            var name;
            var type = $("#" + idd).attr("variabletype").split(',')[0];
            if (idd.split('_')[0] == 'Batch') {
                name = $("#" + idd).attr("selectoptionsids").split(',').length;
            } else {
                name = $("#" + idd).attr("variablename");
            }
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
            $(".modelInfoSure").unbind("click").bind("click",
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
    inItSendModal = new ModalSend();
    /**************运行态控件操作************/
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
                var controlObj = $('#' + idd);
                var sliderBlockDom = $('#sliderBlock-' + idd);
                var sliderTipDom = $('.slider_tip' + idd);
                var slideBarDom = $('.slide_bar' + idd);
                sliderBlockDom.unbind('mousedown').bind('mousedown',
                function(event) {
                    if (inItWebMode.editMode == false) {
                        //滑杆刻度的最大值和最小值取决于变量配置
                        var minNum = controlObj.attr('MinEuVal');
                        var maxNum = controlObj.attr('MixEuVal');
                        if (minNum && maxNum) {
                            var totalWidth = slideBarDom.width(); //水平方向时滑杆最大长度（px）
                            var totalHeight = slideBarDom.height(); //垂直方向时滑杆最大长度（px）
                            var lx = event.clientX;
                            var ly = event.clientY;
                            var left = parseInt(sliderBlockDom.css('left'));
                            var top = parseInt(sliderBlockDom.css('top'));
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
                                    if (controlObj.attr('value') === 'level') {
                                        sliderBlockDom.css({"left": moveX + '%'});
                                        sliderTipDom.text(parseInt(moveX));
                                        if (parseInt(sliderBlockDom.css('left')) < 0) {
                                            sliderBlockDom.css({"left": 0 + '%'});
                                            sliderTipDom.text(minNum);
                                        }
                                        if (parseInt(sliderBlockDom.css('left')) > totalWidth) {
                                            sliderBlockDom.css({"left": 100 + '%'});
                                            sliderTipDom.text(maxNum);
                                        }
                                    } else if (controlObj.attr('value') === 'vertical') {
                                        sliderBlockDom.css({top: 100 - moveY + '%'});
                                        sliderTipDom.text(parseInt(moveY));
                                        if (parseInt(sliderBlockDom.css('top')) < 0) {
                                            sliderBlockDom.css({top: 0 + '%'});
                                            sliderTipDom.text(maxNum);
                                        }
                                        if (parseInt(sliderBlockDom.css('top')) > totalHeight) {
                                            sliderBlockDom.css({top: 100 + '%'});
                                            sliderTipDom.text(minNum);
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
                                if (controlObj.attr('value') === 'level') {
                                    if (moveX > maxNum) {
                                        moveX = maxNum;
                                    } else if (moveX < minNum) {
                                        moveX = minNum;
                                    }
                                    if (controlObj.attr('sure') == 'yes') {
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
                                    if (controlObj.attr('sure') == 'yes') {
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
                    var floww = [];
                    for (var i = 0; i < 21; i++) {
                        flow.push(Math.floor(Math.random() * (30 + ((i % 12) * 5))) + 10);
                        floww.push(Math.floor(Math.random() * (30 + ((i % 12) * 5))) + 10);
                    }
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
                        if($("#"+idd).attr("date") == "yes"){
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
                        }else{
                            var dateleng = $("#" + idd).attr("variablename").split(",").length;
                            var charttimer = function() {
                                if (chartval.length != "0") {
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
                        }    
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
                            if ($('#'+idd).attr('sure') == 'yes') {
                                inItSendModal.modelPage();
                                inItSendModal.modelFeature(editval, idd);
                            } else {
                                inItSendModal.modelFeature1(editval, idd);
                            }
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
                                    if ($('#'+idd).attr('sure') == 'yes') {
                                        inItSendModal.modelPage();
                                        inItSendModal.modelFeature(editval, idd);
                                    } else {
                                        inItSendModal.modelFeature1(editval, idd);
                                    }
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
                                if ($('#'+idd).attr('sure') == 'yes') {
                                    inItSendModal.modelPage();
                                    inItSendModal.modelFeature(displayMember, idd);
                                } else {
                                    inItSendModal.modelFeature1(displayMember, idd);
                                }
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
                            if ($('#'+idd).attr('sure') == 'yes') {
                                inItSendModal.modelPage();
                                inItSendModal.modelFeature(comboval, idd);
                            } else {
                                inItSendModal.modelFeature1(comboval, idd);
                            }
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
                        var controlObj = $('#' + idd);
                        var targetDom = $(this).children('label');
                        if (targetDom.attr('checked') === 'checked') {
                            targetDom.removeAttr('checked');
                            targetDom.children('img').attr('src', 'images/unchecked_radio.png');
                            controlObj.removeAttr('checkedOptionValue');
                        } else {
                            targetDom.attr('checked', 'checked');
                            targetDom.children('img').attr('src', 'images/checked_radio.png');
                            $(this).siblings('.radioDom').children('label').removeAttr('checked');
                            $(this).siblings('.radioDom').children('label').children('img').attr('src', 'images/unchecked_radio.png');
                            checkedOptionValue = $(this).attr('title');
                            controlObj.attr('checkedOptionValue', checkedOptionValue);
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
                        var controlObj = $('#' + idd);
                        var variableType = controlObj.attr('variableType');
                        if (variableType) {
                            var value = controlObj.attr('checkedOptionValue');
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
                        var targetDom = $(this).children('label');
                        if (targetDom.attr('checked') === 'checked') {
                            targetDom.removeAttr('checked');
                            targetDom.children('img').attr('src', 'images/unchecked_checkbox.png');
                            for (var i = 0, len = checkedOptionValue.length; i < len; i++) {
                                if ($(this).attr('title') === checkedOptionValue[i] && $(this).attr('timeInterval') === timeIntervals[i]) {
                                    checkedOptionValue.splice(i, 1);
                                    timeIntervals.splice(i, 1);
                                }
                            }
                        } else {
                            targetDom.attr('checked', 'checked');
                            targetDom.children('img').attr('src', 'images/checked_checkbox.png');
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
                        var controlObj = $('#' + idd);
                        var variableType = controlObj.attr('variableType');
                        if (variableType) {
                            var value = controlObj.attr('checkedOptionValue'); //存放已选择选项的数据项值，多个用逗号隔开
                            var timer = controlObj.attr('timeInterval'); //存放已选择选项的时间间隔，多个用逗号隔开
                            if (value && timer && value.indexOf(',') === -1 && timer.indexOf(',') === -1) { //选择了1个选项
                                setTimeout(function() {
                                    if (controlObj.attr('sure') == 'yes') {
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
                                    if (controlObj.attr('sure') == 'yes') { //有【命令发送】模态框，等待用户确认是否发送命令
                                        inItSendModal.modelPage();
                                        inItSendModal.modelFeature(value[0], idd, isClick);
                                        var num = 0;
                                        tempTimer = setInterval(function() {
                                            if (controlObj.attr('isClick') == 'ok') { //【命令发送】模态框执行过【发送】命令
                                                clearInterval(tempTimer);
                                                num = 1;
                                            } else if (controlObj.attr('isClick') == 'cancel'){ //【命令发送】模态框第一个选择项已取消，则其他选项也不再发送，数据发送终止
                                                clearInterval(tempTimer);
                                                controlObj.removeAttr('isClick');
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
                var height1 = $("#main" + idd).height();
                var width1 = $("#main" + idd).width();
                $("#main" + idd).css({
                    'height': 300,
                    'width': 300
                });
                (function fncount() {
                    if ($("#" + idd).attr("deg") == "deg90") {
                        dial2();
                    };
                    if ($("#" + idd).attr("deg") == "deg120") {
                         dial4();
                    };
                    if ($("#" + idd).attr("deg") == "deg180") {
                        dial1();
                    };
                    if ($("#" + idd).attr("deg") == "deg240") {
                        dial3();
                    };
                    if ($("#" + idd).attr("deg") == "deg360") {
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
                            min: 0,
                            max: 100,
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
                            max: 100,
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
                            max: 100,
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
                            max: 100,
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
                            max: 100,
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
                    option.series[0].data[0].value = 0;
                    myChart.setOption(option, true);
                };
            });
        },
        /********开关控件**********/
        switch: function() {
            $.each($("div[id^='SwitchImage']"),
            function() {
                var literacy = $(this).attr('literacy'); //literacy='off' 开关读写类型；literacy='on' 开关显示类型
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
                    laydate.render({
                         elem: '#myDate_start'+idd
                        ,trigger: 'click'
                        ,done: function(value){
                            if (endtime) {

                                starttime = value;
                                console.log(starttime)
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
                            	alert(value);
                                starttime = value;
                            }
                        }
                    });
                    laydate.render({
                        elem: '#myDate_end'+idd
                        ,trigger: 'click'
                        ,done: function(value){
                            if (starttime) {
                            	alert(value);
                                endtime = value;
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
                                endtime = value;
                            }
                        }
                    });
                    $(".search3" + idd).unbind("mousedown").bind("mousedown",
                    function() {
                    	console.log(starttime+"///?///"+endtime);
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
                    laydate.render({
                        elem: '#myDate_start'+idd
                        ,trigger: 'click'
                        ,done: function(value){
                            if (endtime) {
                                starttime = value;
                                var start = new Date(starttime);
                                var end = new Date(endtime);
                                limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                                if (limittime >= 0) {
                                    if (limittime > 30) {
                                        alert("只能查看30天以内的信息！");
                                        $("#myDate_start" + idd).val("");
                                    }
                                } else {
                                    alert("起始时间必须早于结束时间！");
                                    $("#myDate_start" + idd).val("");
                                }
                            } else {
                                starttime =value;
                            }
                        }
                    });
                    laydate.render({
                         elem: '#myDate_end'+idd
                        ,trigger: 'click'
                        ,done: function(value){
                            if (starttime) {
                                endtime =value;
                                var start = new Date(starttime);
                                var end = new Date(endtime);
                                limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                                if (limittime >= 0) {
                                    if (limittime > 30) {
                                        alert("只能查看30天以内的信息！");
                                        $("#myDate_end" + idd).val("");
                                    }
                                } else {
                                    alert("结束时间必须晚于起始时间！");
                                    $("#myDate_end" + idd).val("");
                                }
                            } else {
                                endtime = value;
                            }
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
        //场景组态控件
        scene:function(){
            var navBox = $("#navBox");
            navBox.find("a[src]").each(function(i){//打开超链接
                $(this).bind("click",function(){    
                    var _this = $(this);
                    navBox.find("a[src]").not($(this)).removeAttr("currentpage");
                    _this.attr("currentpage","currentpage");
                    var src = _this.attr("src");
                    $("#right",parent.document.body).attr("src", src);
                });
            });
            navBox.off("mousedown").on("mousedown","img",function(event){ //导航收缩
                event.stopPropagation();
                if($(this).attr("class") == "angleImg"){
                    if(navBox.find(".newUl").is(":visible")){
                        navBox.find(".newUl").remove();
                        navBox.find(".newSunUl").remove();
                        navBox.find(".parentUl").show();
                        $(this).hide();
                        $(".newSpan").remove();
                    } else{
                        if(navBox.find(".newSunUl").is(":visible")){
                            navBox.find(".newUl").show();
                            navBox.find(".newSunUl").remove();
                            navBox.find(".parentUl").hide();
                            $(this).show();
                        }
                    }
                }else{
                    var list = {};
                    var span = $(this).parent("span");
                    var type = span.children("a").attr("navType");
                    if(type == 'single' || type == undefined){
                        span.next("ul").slideToggle(300);
                    }else{
                        if($(this).parent("span").attr("newSpan") != "newSpan"){
                            var pHtml = $(this).parent("span").html();
                            var spanHtml = $("<img src='images/out.png' class='angleImg' /><span class='newSpan overHidden displayblock' newSpan='newSpan'>"+pHtml+"</span>");
                            spanHtml.appendTo(navBox);
                            var creatHtml = $("<ul class='newUl'></lu>");
                            creatHtml.appendTo(navBox);
                            navBox.find("ul:first").hide();
                            var i = 0;
                            span.next("ul").children("li").each(function(){
                                var Ptxt = $(this).children("span").children("a").text();
                                var psrc =  $(this).children("span").children("a").attr("src");
                                var creatLi = $("<li><a class='newLi' src='"+ psrc +"'>"+Ptxt+"</a></li>");
                                creatLi.appendTo($(".newUl"));
                                var _this = $(this);
                                i++;
                                var attr = "sun"+i;
                                list[attr] = [];
                                if(_this.children("ul").length >= 1){
                                    _this.children("ul").children("li").each(function(){
                                        arr = {
                                            "txt":$(this).find("a").text(),
                                            "src":$(this).find("a").attr("src")
                                        };
                                        list[attr].push(arr);
                                    })
                                }
                            });
                            $("#navBox").find(".newLi").each(function(j){
                                $(this).bind("click",function(){
                                    var indx = j + 1;
                                    var sun = "sun"+indx;
                                    if(list[sun].length >= 1){
                                        $(this).parent("li").parent("ul").prev("span").children("a").text($(this).text());
                                        $(this).parent("li").parent("ul").hide();
                                        var creatHtml = $("<ul class='newSunUl'></lu>");
                                        creatHtml.appendTo($("#navBox"));
                                        $.each(list['sun'+indx],function(i){
                                            var creatLi = $("<li><a class='newSunLi' src='"+list[sun][i]["src"]+"'>"+list[sun][i]["txt"]+"</a></li>");
                                            creatLi.appendTo($(".newSunUl"));
                                        })
                                    }
                                });
                            });
                        }
                    }
                }
            });
        },
        //通信测试控件
        communicate:function(){
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
                    }
                });
            });
        },
        //通用视频控件
        video: function() {
            //解密函数，对加密后的用户名和密码进行解密
            function unCompile(str) {
                str = unescape(str);
                var c = String.fromCharCode(str.charCodeAt(0) - str.length);
                for(var i = 1; i < str.length; i++) {
                    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i-1));
                }
                return c;
            };
            $.each($("div[id^='Video']"), function() {
                if (inItWebMode.editMode == false) {
                    var idd = $(this).attr('id').split('_')[0] + '_' + $(this).attr('id').split('_')[1];
                    var controlObj = $('#' + idd);
                    var szPort = controlObj.attr('port');
                    var cameraName = $(this).attr('cameraName'); //摄像头位置名称
                    var cameraIp = $(this).attr('ip');  //摄像头ip
                    var cameraPassword = unCompile($(this).attr('password'));  //摄像头密码
                    var cameraUsername = unCompile(controlObj.attr('username'));  //摄像头用户名
                    var pathName = $(this).attr('dirPath'); //保存图片路径
                    var init1 = function() {
                    var canvas = document.getElementById('video-canvas'+idd);
                    var address = document.location.hostname;
                    var addressArr;
                    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;//正则IP
                    var host;
                    if(address != ''){
                        if (address == "localhost" || address == '127.0.0.1'){
                            host = 'ws://127.0.0.1:'+szPort+'/';
                        }else{
                            if(reg.test(address)){
                                host = 'ws://'+address+':'+szPort+'/';
                            }else{
                                host = 'ws://'+address+':15011/';
                            }
                        }
                    }/* else{
                        var newAddess = localStorage.getItem("newAddess");
                        if(newAddess != null){
                            host = 'ws://'+newAddess+':32767/';
                        }
                    } */
                    var url = host;
                        var player = new JSMpeg.Player(url, {canvas: canvas});
                    };
                    var init2 = function() {var currentLeft = parseInt(controlObj.css('left')); //预览状态下视频热点在页面上的left值
                        var currentTop = parseInt(controlObj.css('top')); //预览状态下视频热点在页面上的top值
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
                        var width = controlObj.attr('videoWidth');
                        var height = controlObj.attr('videoHeight');
                        var queryStr = szPort + '&' + encodeURIComponent(controlObj.attr('cameraName')) + '&' + width + '&' + height;
                        window.open('view-stream.html?' + queryStr, '_blank', 'left=' + left + ',top=' + top + ',width='+width+',height='+height);
                    };
                    if (szPort) {
                        if (controlObj.attr('type') == 'windowDisplay') {
                            init1();
                        } else { //展示成热点，点击弹出新窗口，接入视频画面
                            var clickObj = document.getElementById(idd);
                            clickObj.onclick = init2;
                        }
                    } else {
                        //alert('请在编辑状态下完成视频信息配置！')
                    }
                    //抓拍
                    $(this).find(".videoCutPIc").bind("click",function(){
                        var URL = 'rtsp://'+ cameraUsername +':'+ cameraPassword +'@'+ cameraIp +':554/h264/ch1/main/av_stream';
                        Websocket.send(setCameraData(URL,pathName,cameraName));
                    });
                }
            });
        },
    //组控控件
    batch: function() {
        $.each($("img[id^='dropDownButton']"), function() {
            var idd = $(this).attr('id').split('-')[1];
            var controlObj = $('#'+idd);
            var comboBtnImg = $(".combobtnimg" + idd);
            var selectItemBox = $("#combo_chooseItems" + idd);
            var selectOptionsIds = []; //所有被选中的元素变量ID
            var comboSelect = {
                comboBtn: function() { //控件列表元素显示隐藏的切换
                    var len;
                    comboBtnImg.unbind("mousedown").bind("mousedown", function(e) {
                            if (inItWebMode.editMode == false) {
                                e.stopPropagation();
                                len = selectItemBox.children(".selectItem").length;
                                if (len != 0) {
                                    if (selectItemBox.children(".selectItem").is(":visible")) {
                                        selectItemBox.slideUp(300);
                                    } else {
                                        selectItemBox.slideDown(300);
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
                            var selectItemBoxAll = $(".selectItemBox");
                            selectItemBoxAll.slideUp(300);
                        });
                },
                chooseItem: function() { //在控件中选择元素
                    selectItemBox.find('.selectItem').off("mousedown").on("mousedown", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        var _this = $(this);
                        var targetImage = _this.find('img');
                        var targetLabel = _this.find('label');
                        if (_this.attr('select') == 'select') {
                            _this.removeAttr('select');
                            targetImage.attr('src', 'images/unchecked_checkbox.png');
                            for (var i = 0, len = selectOptionsIds.length; i < len; i++) {
                                if (targetLabel.attr('displaymember') === selectOptionsIds[i]) {
                                    selectOptionsIds.splice(i, 1);
                                }
                            }
                        } else {
                            _this.attr('select', 'select');
                            targetImage.attr('src', 'images/checked_checkbox.png');
                            selectOptionsIds.push(targetLabel.attr('displaymember'));
                        }
                        var value = selectOptionsIds.join(',');
                        controlObj.attr({'selectOptionsIds': value});
                        var variIdArr = controlObj.attr('variableid').split(',');
                        if (variIdArr.sort().toString() == selectOptionsIds.sort().toString()) {
                            $('.selectAll'+idd).attr('select', 'all');
                            $('.selectAll'+idd).find('img').attr('src', 'images/checked_checkbox.png');
                        } else {
                            $('.selectAll'+idd).removeAttr('select');
                            $('.selectAll'+idd).find('img').attr('src', 'images/unchecked_checkbox.png');
                        }
                    });
                },
                chooseAll: function() {
                    selectItemBox.off("mousedown").on("mousedown", "div.selectAll", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        if ($(this).attr('select') == 'all') {
                            $(this).removeAttr('select');
                            $(this).find('img').attr('src', 'images/unchecked_checkbox.png');
                            $(this).siblings('div.selectItem').removeAttr('select');
                            $(this).siblings('div.selectItem').find('img').attr('src', 'images/unchecked_checkbox.png');
                            controlObj.removeAttr('selectOptionsIds');
                            selectOptionsIds = [];
                        } else {
                            $(this).attr('select', 'all');
                            $(this).find('img').attr('src', 'images/checked_checkbox.png');
                            $(this).siblings('div.selectItem').attr('select', 'select');
                            $(this).siblings('div.selectItem').find('img').attr('src', 'images/checked_checkbox.png');
                            controlObj.attr({'selectOptionsIds': controlObj.attr('variableid')});
                            selectOptionsIds = controlObj.attr('variableid').split(',');
                        }
                    });
                },
                init: function() {
                    this.comboBtn();
                    this.hideChooseItems();
                    this.chooseItem();
                    this.chooseAll();
                }
            };
            comboSelect.init();
        });
        $.each($("input[id^='infoInput']"), function() {
            $(this).unbind('keyup').bind('keyup', function() {
                var idd = $(this).attr('id').split('-')[1];
                var controlObj = $('#'+idd);
                //对输入进行校验
                var variableType = controlObj.attr('variableType').split(',')[0];
                var minValue = controlObj.attr('MinEuVal'); //允许输入的最小工程值
                var maxValue = controlObj.attr('MixEuVal'); //允许输入的最大工程值
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
            });
        });
        $.each($("img[id^='infoSend']"), function() {
            $(this).unbind('mousedown').bind('mousedown', function() {
                var idd = $(this).attr('id').split('-')[1];
                var controlObj = $('#' + idd);
                if (inItWebMode.editMode == false) {
                    var selectOptionsIds = controlObj.attr('selectOptionsIds');
                    if (selectOptionsIds) {
                        var value = $('#infoInput-'+idd).val();
                        if (controlObj.attr('sure') == 'yes') {
                            inItSendModal.modelPage(idd);
                            inItSendModal.modelFeature(value, idd);
                        } else {
                            inItSendModal.modelFeature1(value, idd);
                        }
                    } else {
                        alert('请选择要下发命令的数据项！');
                    }
                }
            });

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
            this.scene();
            this.communicate();
            this.video();
            this.batch();
        }
    };
    action.inIt();
    /*********图表数据等待处理*********/
    var keyed = true;
    var keyed_ = true;
    var intervla = function() {
        $.each($("div[id^='Chart']"),
        function() {
            var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
            var leng = chartval.length + "";
            var chartlen = $("#" + idd).attr("variablename").split(",").length + "";
            if(leng == "0" && keyed == true){
                $(this).attr("date","yes");
                action.chart();
                keyed = false;
            }
            if(leng != "0" && keyed_ == true){
                $(this).removeAttr("date");
                action.chart();
                keyed_ = false;
                keyed = false;
            }
        })
    };
    var gofn = function() {
        if (inItWebMode.editMode == false) {
            $("#bgDiv").css("border","none");
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
            /************管道控件样式清除***********/
            $.each($("div[id^='SwitchImage']"),
            function() {   
                var id_ = $(this).attr('id').split('-')[1];
                if (inItWebMode.editMode == false ){
                    $("#"+id_).children("div").css({
                        "border":"none"
                    });
                }
            })
        } else {
            $("#bgDiv").css("border","1px solid #aaa");
            action.chart();
        }
    };
    setTimeout(gofn, 500);
});
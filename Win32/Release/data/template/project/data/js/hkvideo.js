$(function(){
	//热点样式 点击打卡新页面
	var video_init = function(parameter,controlObj){
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
		var queryStr = parseParam(parameter);
		var currentLeft = parseInt(controlObj.css('left')); //预览状态下视频热点在页面上的left值
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
		if (controlObj.attr('directioncontrol') == 'yes') {
			window.open('SingleVideoPage1.html?' + queryStr, '_blank', 'left=' + left + ',top=' + top + ',width=610,height=330');
		} else {
			window.open('SingleVideoPage.html?' + queryStr, '_blank', 'left=' + left + ',top=' + top + ',width=400,height=300');
		}
	}

	//停止云台转动 参数：对象；
	var stopCloud = function(o){
		if (inItWebMode.editMode == false) {
			var idd = o.attr('id').split('-')[1];
			//var _thisContrl = $(this).parents(".contrl");
			if ($("#"+idd).attr('cameraBrand') == '海康威视') {
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
			} else {
				alert('请在编辑状态下选择摄像头厂商，再进行操作！');
			}
		}
	}
	//开始云台转动 参数 o:对象 direction：方向；
	var startCloud = function(o,direction){
		 if (inItWebMode.editMode == false) {
			var idd = o.attr('id').split('-')[1];
			if ($('#' + idd).attr('cameraBrand') == '海康威视') {
				var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
				if (oWndInfo != null) {
					WebVideoCtrl.I_PTZControl(direction, false, {
						iPTZSpeed: 3,
						success: function() {
							//console.log('开启云台↑方向成功！');
						},
						error: function() {
							//console.log('开启云台↑方向失败！');
						}
					});
				}
			} else {
				alert('请在编辑状态下选择摄像头厂商，再进行操作！');
			}
		}
	}
    //云台上、下、左、右方向控制
    var g_bPTZAuto = false;
    var iPTZIndex; //上、下、左、右依次为1、2、3、4
    var iPTZSpeed = 3; //默认云台速度为3
    $.each($("div[id^='cloudUp']"), function() {
        $(this).unbind('mousedown').bind('mousedown',
        function() {
            startCloud($(this),1);
        });
        $(this).unbind('mouseup').bind('mouseup',
        function() {
            stopCloud($(this));
        });
    });
    $.each($("div[id^='cloudDown']"), function() {
        $(this).unbind('mousedown').bind('mousedown',
        function() {
            startCloud($(this),2);
        });
        $(this).unbind('mouseup').bind('mouseup',
        function() {
           stopCloud($(this));
        });
    });
    $.each($("div[id^='cloudLeft']"), function() {
        $(this).unbind('mousedown').bind('mousedown',
        function() {
            startCloud($(this),3);
        });
        $(this).unbind('mouseup').bind('mouseup',
        function() {
            stopCloud($(this));
        });
    });
    $.each($("div[id^='cloudRight']"), function() {
        $(this).unbind('mousedown').bind('mousedown',
        function() {
            startCloud($(this),4);
        });
        $(this).unbind('mouseup').bind('mouseup',
        function() {
            stopCloud($(this));
        });
    });
    //抓图
    var capturePic = function(o){
        var szPicName;
        o.unbind('mousedown').bind('mousedown', function() {
            if (inItWebMode.editMode == false) {
                var idd = $(this).attr('id').split('-')[1];
                var controlObj = $('#' + idd);
                if (controlObj.attr('dirPath') == undefined) {
                    var clickSetLocalCfg = function() {
                        var arrXml = [];
                        var szInfo = '';
                        arrXml.push('<LocalConfigInfo>');
                        arrXml.push('<CapturePath>' + controlObj.attr('dirPath') + '</CapturePath>');
                        arrXml.push('<CaptureFileFormat>' + controlObj.attr('imageType') + '</CaptureFileFormat>');
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
                    szPicName = controlObj.attr('ip') + '_' + year + month + day + hour + minute + second + millisecond;
                    //调用抓图接口
                    if (controlObj.attr('cameraBrand') == '海康威视') {
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
                    } else {
                        alert('请在编辑状态下选择摄像头厂商，再进行操作！');
                    }
                } else {
                    alert('请在编辑状态下选择抓图路径，再进行操作！');
                }
            }
        });
    };
    $.each($("img[id^='capturePic']"), function() {
        $(this).unbind('mouseover').bind('mouseover',
        function() {
            if (inItWebMode.editMode == false) {
                $(this).attr('src', 'images/capturePic_hover.png');
            }
        });
    });
    $.each($("img[id^='capturePic']"), function() {
        $(this).unbind('mouseout').bind('mouseout',
        function() {
            if (inItWebMode.editMode == false) {
                $(this).attr('src', 'images/capturePic.png');
            }
        });
    });

    //解密函数，对加密后的用户名和密码进行解密
    var unCompile = function(str) {
        str = unescape(str);
        var len = str.length;
        var c = String.fromCharCode(str.charCodeAt(0) - len);
        for (var i = 1; i < len; i++) {
            c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    };

    $.each($("div[id^='HKVideo']"), function() {
        if (inItWebMode.editMode == false) {
            var idd = $(this).attr('id').split('_')[0] + '_' + $(this).attr('id').split('_')[1];
            var controlObj = $('#' + idd);
            var szIP = controlObj.attr('ip');
            var szPort = controlObj.attr('port');
            var szUsername = controlObj.attr('username');
            var szPassword = controlObj.attr('password');
            var cameraBrand = controlObj.attr('cameraBrand'); //摄像头厂商
            var cameraName = controlObj.attr('cameraName'); //摄像头位置名称
            var dirPath = controlObj.attr('dirPath'); //抓图路径
            var init1 = function() {
                var oPlugin = {
                    width: $('.windowArea' + idd).width(),
                    height: $('.windowArea' + idd).height()
                };
                var oLiveView = {
                    iProtocol: 1, // protocol 1：http, 2:https
                    szIP: szIP, // protocol ip
                    szPort: szPort, // protocol port
                    szUsername: unCompile(szUsername), // device username
                    szPassword: unCompile(szPassword), // device password
                    iStreamType: 1, // stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
                    iChannelID: 1, // channel no
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
                        bWndFull: true,
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
            function clickEvent() {
                var parameter = {
                    szIP: szIP,
                    szPort: szPort,
                    szUn: szUsername,
                    szPs: szPassword,
                    cameraName: cameraName,
                    id: idd,
                    dirPath: dirPath ? dirPath : ''
                };
                video_init(parameter,controlObj);
            }
            if (szIP && szPort && szUsername && szPassword && cameraBrand) {
                if (controlObj.attr('cameraBrand') == '海康威视') {
                    if (controlObj.attr('type') == 'windowDisplay') {
                        init1();
                    } else { //展示成热点，点击弹出新窗口，接入视频画面
                        var clickObj = document.getElementById(idd);
                        clickObj.onclick = clickEvent;
                    }
                }
            } else {
                alert('IP地址、端口、用户名、密码、摄像头厂商均不能为空，请在编辑状态下输入！');
            }
        }
        //抓图
        var captureBtn = $(this).find($("img[id^='capturePic']"));
        capturePic(captureBtn);
    });
})

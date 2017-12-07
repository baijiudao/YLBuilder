$(function(){
    $("#ylitech_js_laydate.js").remove();
    $("#ylitech_css_jquery_ui").remove();
    $("#ylitech_js_resize").remove();
    $("#ylitech_js_ichart").remove();
    $("#ylitech_js_action").remove();
    $("#ylitech_js_echarts").remove();
    $("#ylitech_js_webVideoCtrl").remove();
    $("#ylitech_js_skin").remove();
    $("#ylitech_js_envents").remove();
    $("#md5_js_action").remove();
    $("#ylitech_js_jsmpeg").remove();
    $("#hkvideo_js_skin").remove();
    if(document.getElementById("ylitech_js_laydate") == null){
        var laydate_js = document.createElement("script");
        laydate_js.src = "js/laydate/laydate.js";
        laydate_js.type = "text/javascript";
        laydate_js.id = "ylitech_js_laydate";
        document.getElementsByTagName("head")[0].appendChild(laydate_js);
    }
    if(document.getElementById("ylitech_css_jquery_ui") == null){
        var link_css = document.createElement("link");
        link_css.href = "css/style.css";
        link_css.rel = "stylesheet";
        link_css.id = "ylitech_css_jquery_ui";
        document.getElementsByTagName("head")[0].appendChild(link_css);
    }

    if(document.getElementById("ylitech_js_resize") == null){
        var resize_js = document.createElement("script");
        resize_js.src = "js/resize.js";
        resize_js.type = "text/javascript";
        resize_js.id = "ylitech_js_resize";
        document.getElementsByTagName("head")[0].appendChild(resize_js);
    }
    if(document.getElementById("md5_js_action") == null){
        var md5_js = document.createElement("script");
        md5_js.src = "js/md5.js";
        md5_js.type = "text/javascript";
        md5_js.id = "md5_js_action";
        document.getElementsByTagName("head")[0].appendChild(md5_js);
    }
    if(document.getElementById("ylitech_js_ichart") == null){
        var ichart_js = document.createElement("script");
        ichart_js.src = "js/ichart.1.2.js";
        ichart_js.type = "text/javascript";
        ichart_js.id = "ylitech_js_ichart";
        document.getElementsByTagName("head")[0].appendChild(ichart_js);
    }	
    if(document.getElementById("ylitech_js_echarts") == null){
        var echarts_js = document.createElement("script");
        echarts_js.src = "js/echarts.js";
        echarts_js.type = "text/javascript";
        echarts_js.id = "ylitech_js_echarts";
        document.getElementsByTagName("head")[0].appendChild(echarts_js);
    }
    if(document.getElementById("ylitech_js_webVideoCtrl") == null){
        var webVideoCtrl_js = document.createElement("script");
        webVideoCtrl_js.src = "js/webVideoCtrl.js";
        webVideoCtrl_js.type = "text/javascript";
        webVideoCtrl_js.id = "ylitech_js_webVideoCtrl";
        document.getElementsByTagName("head")[0].appendChild(webVideoCtrl_js);
    }
    if(document.getElementById("ylitech_js_jsmpeg") == null){
        var jsmpeg_js = document.createElement("script");
        jsmpeg_js.src = "js/jsmpeg.min.js";
        jsmpeg_js.type = "text/javascript";
        jsmpeg_js.id = "ylitech_js_jsmpeg";
        document.getElementsByTagName("head")[0].appendChild(jsmpeg_js);
    }
    if(document.getElementById("ylitech_js_skin") == null){
        var skin_js = document.createElement("script");
        skin_js.src = "js/skin.js";
        skin_js.type = "text/javascript";
        skin_js.id = "ylitech_js_skin";
        document.getElementsByTagName("head")[0].appendChild(skin_js);
    }
    if(document.getElementById("ylitech_js_envents") == null){
        var envents_js = document.createElement("script");
        envents_js.src = "js/control_events.js";
        envents_js.type = "text/javascript";
        envents_js.id = "ylitech_js_envents";
        document.getElementsByTagName("head")[0].appendChild(envents_js);
    }
    if(document.getElementById("hkvideo_js_skin") == null){
        var hkvideo_js = document.createElement("script");
        hkvideo_js.src = "js/hkvideo.js";
        hkvideo_js.type = "text/javascript";
        hkvideo_js.id = "hkvideo_js_skin";
        document.getElementsByTagName("head")[0].appendChild(hkvideo_js);
    }
	(function(){
    	//添加模板
    	var addtemplate = function() {
    		if (inItWebMode.editMode == false) {
    			$.each($("div[id^='Scene']"),
    			function() {
    				$(this).siblings("div.contrl").remove();
    				$("#header").remove();
    				$("#area").remove();
    				$("#bgDiv").remove();
    				var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
    				var tempdom = $('<div id="header">' + '<iframe id="top" frameborder="0" scrolling="no" src="login.html" name="top"></iframe>' + '</div>' + '<div id="area">' + '<iframe id="right" frameborder="1" scrolling="yes" src="right.html" name="right"  allowFullScreen="true"></iframe>' + '</div>');
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
    			});
    		}
    	};
        setTimeout(function(){
            addtemplate();
        },200);
    	//F5刷新工作区框架集
    	function disableF5(event) {
    		if (event) {
    			var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    			if (keyCode == 116) {
    				event.keyCode = 0;
    				event.returnValue = false;
    				var src = $("#navBox", parent.document).find("a[currentpage = 'currentpage']").attr("src");
    				if(src != undefined){
    					$("#right",parent.document.body).attr("src",src);  
    				}
    				return false
    			}
    		}
    	};
    	document.onkeydown = disableF5;
    	
    	//关闭页面时的接口
    	var closeHtml = function(){
    		var CommunicateObj = $("div[id ^= 'Communicate']");
    		var len = CommunicateObj.length;
    		if(len >= 1){
    			Websocket.send(logoutSendData());
    			CommunicateObj.each(function(){
    				$(this).remove();
    			})
    		}
    	};
    })()
});

 



























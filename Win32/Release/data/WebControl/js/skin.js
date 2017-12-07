var skinchange_ = function(){
	this.change = function(skin){
		var skin_obj = $('#content', window.parent.document).contents().find("a.imgDistance");
		var skin_obj_ = $('#content', window.parent.document).contents();
		if(skin == "0"){ //黑色
			$("#data").css("color","#fff");
			skin_obj.css("color","#fff");
			skin_obj.unbind('mouseover').bind('mouseover', function() {
				$(this).css('color', '#E8960A');
			});
			skin_obj.unbind('mouseout').bind('mouseout', function() {
				$(this).css('color', '#fff');
			});
		}
		if(skin == "1"){ //电脑蓝
			$("#data").css("color","#fff");
			skin_obj.css("color","#2d4d66");
			skin_obj.unbind('mouseover').bind('mouseover', function() {
				$(this).css('color', '#D29949');
			});
			skin_obj.unbind('mouseout').bind('mouseout', function() {
				$(this).css('color', '#2d4d66');
			});
		}
		if(skin == "2"){ //企业蓝
			$("#data").css("color","#fff");
			skin_obj.css("color","#fff");
			skin_obj.unbind('mouseover').bind('mouseover', function() {
				$(this).css('color', '#498AEF');
			});
			skin_obj.unbind('mouseout').bind('mouseout', function() {
				$(this).css('color', '#fff');
			});
		}
		if(skin == "3"){ //工业蓝
			$("#data").css("color","#e9ecf1");
			skin_obj.css("color","#5d6d8e");
			skin_obj.unbind('mouseover').bind('mouseover', function() {
				$(this).css('color', '#309F3A');
			});
			skin_obj.unbind('mouseout').bind('mouseout', function() {
				$(this).css('color', '#5d6d8e');
			});
		}
		if(skin == "4"){ //彩色
			$("#data").css("color","#fefefe");
			skin_obj.css("color","#fefefe");
			skin_obj.unbind('mouseover').bind('mouseover', function() {
				$(this).css('color', '#F47607');
			});
			skin_obj.unbind('mouseout').bind('mouseout', function() {
				$(this).css('color', '#fefefe');
			});
		}
		if(skin == "5"){ //绿色
			$("#data").css("color","#fefefe");
			skin_obj.css("color","#fefefe");
			skin_obj.unbind('mouseover').bind('mouseover', function() {
				$(this).css('color', '#33a893');
			});
			skin_obj.unbind('mouseout').bind('mouseout', function() {
				$(this).css('color', '#fefefe');
			});
		}
		skin_obj.removeClass("addChildrenColor");
		$(".contain").attr("skinstyle",skin);
		$('#content', window.parent.document).attr("skinstyle",skin);
		skin_obj_.find(".headPic").attr("src","images/skin_head"+skin+".png");//导航头图片
		skin_obj_.find("#navBox").css({//导航大背景
			"background":"none",
			"background-image":"url(images/skin_left"+skin+".png)",
			"background-repeat":"no-repeat",
			"background-size":"100% 100%"
		});
		skin_obj_.find(".skin_0").attr("src","images/parents"+skin+".png");//BMS
		skin_obj_.find(".bar_0").attr("src","images/parent"+skin+".png");//二级
		skin_obj_.find(".bar_1").attr("src","images/sun"+skin+".png");//三级、四级
		skin_obj_.find(".background_1").css("background","url(images/bar1"+skin+".gif)no-repeat");//导航线1
		skin_obj_.find(".background_2").css("background","url(images/bar2"+skin+".gif)no-repeat");//导航线2
		skin_obj_.find(".background_3").css("background","url(images/bar3"+skin+".gif)no-repeat");//导航线3
	}
}
var skin = new skinchange_();
/******************值班台接口******************/
var set_modal = function(){//布局接口
	$("body #header").remove();
	$.each($("div[id^='Scene']"),
		function() {
			var idd = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
			var scenew = $("#" + idd).width() + 2;
			$("#" + idd).css({
				"position": "absolute",
				"top": 0,
				"left": 0,
				"height": "100%"
			});
			$("#area", parent.document.body).css({
				"position": "absolute",
				"left": scenew-2,
				"top": 0,
				"height": "100%",
				"width": "calc(100% - " + scenew + "px)"
			});	
		});
}
var Duty_station = function(s){	//换肤接口
	skin.change(s);
	window.localStorage.setItem("skin_", s);
}
function getUrlParam(name){//获取url参数
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
} 
var session = getUrlParam('session');
if(session){
	set_modal();
	window.localStorage.setItem("Session_value",session);
	if(window.localStorage.getItem("skin_") != undefined){//初始化
		var sk = window.localStorage.getItem("skin_");
		Duty_station(sk);	
	}
}
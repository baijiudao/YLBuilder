$(function(){
		/*************同步时间日期***************/
		function show_date(){//获取时间日期
			var NowDate=new Date();
			var ToYear=NowDate.getFullYear();
			var month_s=NowDate.getMonth()+1;
			var date_s=NowDate.getDate();
			if(month_s >=1 && month_s <= 9){
				month_s = "0"+month_s;
			}
			if(date_s >=1 && date_s <= 9){
				date_s = "0"+date_s;
			}
			toString(month_s);
			toString(date_s);
			today_date=ToYear+"-"+month_s+"-"+date_s;
			return today_date
		}
		var nowDate = show_date();
		$('#data').text(nowDate);
		/********显示关闭换肤面板*********/
		var key = false;
		$(".skim").click(function(){
			if(key === false){
				$('#bgsk').fadeIn();
				key = true;
			}else{
				$('#bgsk').fadeOut();
				key = false;
			}			
		});
		var skin = "3";	
		var skinchange = function(){
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
			$('.contrl', window.parent.document).attr("skinstyle",skin);
			$(".contain").css("background","url(images/temptop"+skin+".png)no-repeat");//登录背景
			$(".log").css("background","url(images/login"+skin+".png)no-repeat");//登录按钮
			$(".skim").css("background","url(images/skin"+skin+".png)no-repeat");//皮肤按钮
			$(".patx").css("background","url(images/temptext"+skin+".png)no-repeat");//输入框
			$(".liney").css({"background":"url(images/line"+skin+".png)no-repeat"});//竖线
			$("#out").css({"background":"url(images/out"+skin+".png)no-repeat"});//退出按钮
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
		if(window.localStorage.getItem("skin") != undefined){//初始化
			skin = window.localStorage.getItem("skin");
			skinchange();
		}else{
			skinchange();
		};
		/********换肤事件**********/
		$('#bgsk img').click(function(){
			$('#bgsk').fadeOut();
			key = false;
			skin = $(this).attr("value");
			skinchange();
			window.localStorage.setItem("skin", skin);
		});
		/*******登录操作处理******/
		$(".log").bind("mouseover",function(){
			var skinstle = $(".contain").attr("skinstyle");		
			$(".log").css("background","url(images/loginm"+skinstle+".png)no-repeat");
		});
		$(".log").bind("mouseout",function(){
			var skinstled = $(".contain").attr("skinstyle");
			$(".log").css("background","url(images/login"+skinstled+".png)no-repeat");
		});
		/*******退出操作处理******/
		$("#out").bind("mouseover",function(){
			var skinstle = $(".contain").attr("skinstyle");		
			$("#out").css("background","url(images/outm"+skinstle+".png)no-repeat");
		});
		$("#out").bind("mouseout",function(){
			var skinstled = $(".contain").attr("skinstyle");
			$("#out").css("background","url(images/out"+skinstled+".png)no-repeat");
		});
		/*********换肤操作处理**********/
		$(".skim").bind("mouseover",function(){
			var skinstledd = $(".contain").attr("skinstyle");
			$(".skim").css("background","url(images/skinm"+skinstledd+".png)no-repeat");
		});
		$(".skim").bind("mouseout",function(){
			var skinstledy = $(".contain").attr("skinstyle");
			$(".skim").css("background","url(images/skin"+skinstledy+".png)no-repeat");
		});
	})
$(function(){
	var loginBtn = $(".log");
	var logoutBtn = $('#out');
	var hided = $('.hided');
	var passIput = $('.pass');
	var userIput = $('.text');
	var loginSendData = function(userName, passWord) { //登陆发送数据 参数：userName：用户名；passWord：密码；
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'post';
        sendDataList["Command"] = 0;
        sendDataList["UserName"] = userName;
        sendDataList["Password"] = passWord.MD5(32);

        return JSON.stringify(sendDataList);
    };
    var logoutSendData = function() { //退出登陆发送数据
        var sendDataList = {};
        sendDataList["RequestMethod"] = 'post';
        sendDataList["Command"] = 1;
        sendDataList["Session_value"] = localStorage.getItem("Session_value");
        return JSON.stringify(sendDataList);
    };
	//var host = "ws:192.168.100.66:32767";
	var host = 'ws://'+document.location.hostname+':32767/';
	var WebsocketLogin = new WebSocket(host);
	WebsocketLogin.onmessage = function(msg) { //获取的数据的处理
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
						hided.css("display","none");
						logoutBtn.show();
					break;
					default:false;
					}
					break;
				case 4:
					alert("密码错误,请重新登录！");
					break;
				case 5:
					alert("用户名已锁定");
					break;
				case 6:
					alert("用户名无效，请重新登录");
					break;
				case 13:
					alert("退出登录失败");
					break;
				default:
					false;
			}
		}
	}
	var logFun = function(){
		//登录
		loginBtn.bind("click",function(){//登录
			var pass = $("#passWord").val();
			var user= $("#userName").val();
			if(pass != '' && user != ''){
				WebsocketLogin.send(loginSendData(user, pass));
			}else{
				alert("亲：密码或用户名不能为空！");
			}
			
		});
		//退出
		logoutBtn.click(function(){//退出登录
			WebsocketLogin.send(logoutSendData());
			logoutBtn.hide();
			hided.css("display","block");
			passIput.val("密码:");
			userIput.val("用户名:");
			window.parent.location.reload();
		}); 	
	}
	logFun();
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
		/***********换肤功能**********/
		var skin = "3";
		var skinchange = function(){
			if(skin === "0"){
				$("#data").css("color","#fff");
				$('#content', window.parent.document).contents().find("a").css("color","#fff");
			}
			if(skin === "1"){
				$("#data").css("color","#fff");
				$('#content', window.parent.document).contents().find("a").css("color","#2d4d66");
			}
			if(skin === "2"){
				$("#data").css("color","#fff");
				$('#content', window.parent.document).contents().find("a").css("color","#fff");
			}
			if(skin === "3"){
				$("#data").css("color","#e9ecf1");
				$('#content', window.parent.document).contents().find("a").css("color","#5d6d8e");
			}
			if(skin === "4"){
				$("#data").css("color","#fefefe");
				$('#content', window.parent.document).contents().find("a").css("color","#fefefe");
			}
			if(skin === "5"){
				$("#data").css("color","#fefefe");
				$('#content', window.parent.document).contents().find("a").css("color","#fefefe");
			}
			$('#content', window.parent.document).contents().find("a").removeClass("addChildrenColor");
			$(".contain").attr("skinstyle",skin);
			$('.contrl', window.parent.document).attr("skinstyle",skin);
			$(".contain").css("background","url(images/temptop"+skin+".png)no-repeat");//登录背景
			$(".log").css("background","url(images/login"+skin+".png)no-repeat");//登录按钮
			$(".skim").css("background","url(images/skin"+skin+".png)no-repeat");//皮肤按钮
			$(".patx").css("background","url(images/temptext"+skin+".png)no-repeat");//输入框
			$(".liney").css({"background":"url(images/line"+skin+".png)no-repeat"});//竖线
			$("#out").css({"background":"url(images/out"+skin+".png)no-repeat"});//退出按钮
			$('.contrl', window.parent.document).contents().find(".headPic").attr("src","images/skin_head"+skin+".png");//导航头图片
			$('#content', window.parent.document).contents().find("#navBox").css({//导航大背景
				"background":"none",
				"background-image":"url(images/skin_left"+skin+".png)",
				"background-repeat":"no-repeat",
				"background-size":"100% 100%"
			});
			$('#content', window.parent.document).contents().find(".skin_0").attr("src","images/parents"+skin+".png");//BMS
			$('#content', window.parent.document).contents().find(".bar_0").attr("src","images/parent"+skin+".png");//二级
			$('#content', window.parent.document).contents().find(".bar_1").attr("src","images/sun"+skin+".png");//三级、四级
			$('#content', window.parent.document).contents().find(".background_1").css("background","url(images/bar1"+skin+".gif)no-repeat");//导航线1
			$('#content', window.parent.document).contents().find(".background_2").css("background","url(images/bar2"+skin+".gif)no-repeat");//导航线2
			$('#content', window.parent.document).contents().find(".background_3").css("background","url(images/bar3"+skin+".gif)no-repeat");//导航线3
		}
		skinchange();//初始化
		/********换肤事件**********/
		$('#bgsk img').click(function(){
			$('#bgsk').fadeOut();
			key = false;
			skin = $(this).attr("value");
			skinchange();
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
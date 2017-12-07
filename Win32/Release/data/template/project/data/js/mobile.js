$(function(){
	var is_PC = false;
	var index_two;//编辑态双栏选中对象
	var indexx;//预览态双栏选中对象
	var kk_;//初始化分页显示
	var k = 0;//分页序号
	var k_ = 0;//导航添加序号
	var me = null;//编辑态选中对象
	var my = null;//预览态选中对象
	var page_back = [];//后退列表
	var headtext = [];//头导航标题
	var pages_ = [];//分页序号
	var pagetolog = 0;//导航切换序号
	var deviceWidth;
	var Mobile_page = {
		media : function(){
			/**************媒体查询**********/
			// var scale = 1 / devicePixelRatio;
			// document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
			deviceWidth = document.documentElement.clientWidth;
			if(deviceWidth > 640) deviceWidth = 640;//访问PC端网页
			document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
		},
		ispc : function(){
			/********判断是否是移动设备************/		
			function is_pc(){
			    var os = new Array("Android","iPhone","Windows Phone","iPad","BlackBerry","MeeGo","SymbianOS");  // 其他类型的移动操作系统类型，自行添加
			    var info = navigator.userAgent;
			    var len = os.length;
			    for (var i = 0; i < len; i++) {
			        if (info.indexOf(os[i]) > 0){
			            return false;
			        }
			    }
			    return true;
			}		
			if(is_pc()){
				is_PC = true;
			}else{
				is_PC = false;
			}
		},
		nav_pc : function(){
			/************导航切换**************/ 		
    		
    		$(document).on("click",".index",function(){
    			me = null;
    			$(".content").css("overflow","auto");
    			$(this).addClass("active").siblings().removeClass("active");
    			$(".content").attr("nav_pages","nav_bar");
    			$(".content_1-0").css("display","block");
    			$(".content_1-"+pagetolog).css("display","block");
    			$(".content_1-"+pagetolog).siblings(".content_1").css("display","none");
    			if(page_back.length != 0){
    				$(".head_txt").text(headtext[headtext.length-1]);
    				$(".back_").css("display","block");
    			}else{
    				$(".head_txt").text($(".header").attr("head_text"));
    				$(".back_").css("display","none");
    			}
    			$(".home").css("display","block");
                $(".home1").css("display","none");
    		});
    		$(document).on("click",".login",function(){
    			me = null;
    			$(this).addClass("active").siblings().removeClass("active");
    			$(".content_2-0").css("display","block");
    			$(".content_2-0").siblings(".content_1").css("display","none");
    			$(".content").removeAttr("nav_pages");
    			$(".head_txt").text("登录");
    			$(".back_").css("display","none");
    			$(".home").css("display","block");
    			$(".home1").css("display","none");
    		})
    		$(document).on("click",".home",function(){
    			pagetolog = 0;
    			me = null;
    			page_back = [];
    			$(".content").css("overflow","auto");
    			$(".content_1-0").css("display","block");
    			$(".content_1-0").siblings(".content_1").css("display","none");
    			$(".index").addClass("active").siblings().removeClass("active");
    			$(".head_txt").text($(".header").attr("head_text"));
    			$(".back_").css("display","none");
    		});
		},
		nav_pcsearch : function(){//查询pc端
			$(document).on("click",".search",function(){				
				Websocket.send(sendGetEventData("2017-09-03", "2017-09-03"));
    		});
		},
		nav_mobilesearch: function(){//查询移动端
			var flag = false;
			var $selector = $(document);
			$selector.on('touchstart touchmove touchend',".search", function(event) {				
			    switch(event.type) {
			        case 'touchstart':
			            falg = false;
			            break;
			        case 'touchmove':
			            falg = true;
			             break;
			        case 'touchend':
			            if( !falg ) {
			                event.preventDefault();
			                Websocket.send(sendGetEventData("2017-09-03", "2017-09-03"));
			            } 
			            break;
			    }
			});  	
		},

		nav_mobile : function(){
			/************导航切换**************/
			var flag = false;
			var $selector = $(document);
			$selector.on('touchstart touchmove touchend',".index", function(event) {
			    switch(event.type) {
			        case 'touchstart':
			            falg = false;
			            break;
			        case 'touchmove':
			            falg = true;
			             break;
			        case 'touchend':
			            if( !falg ) {
			                event.preventDefault();
			                $(".content").css("overflow","auto");
			    			$(this).addClass("active").siblings().removeClass("active");
			    			$(".content").attr("nav_pages","nav_bar");
			    			$(".content_1-0").css("display","block");
			    			$(".content_1-"+pagetolog).css("display","block");
			    			$(".content_1-"+pagetolog).siblings(".content_1").css("display","none");
			    			if(page_back.length != 0){
			    				$(".head_txt").text(headtext[headtext.length-1]);
			    				$(".back_").css("display","block");
			    			}else{
			    				$(".head_txt").text("首页");
			    				$(".back_").css("display","none");
			    			}
			    			$(".home").css("display","block");
                            $(".home1").css("display","none");
			            } 
			            break;
			    }
			}); 
			$selector.on('touchstart touchmove touchend',".login", function(event) {
			    switch(event.type) {
			        case 'touchstart':
			            falg = false;
			            break;
			        case 'touchmove':
			            falg = true;
			             break;
			        case 'touchend':
			            if( !falg ) {
			                event.preventDefault();
			                $(".content").css("overflow","auto");
			    			$(this).addClass("active").siblings().removeClass("active");
			    			$(".content_2-0").css("display","block");
			    			$(".content_2-0").siblings(".content_1").css("display","none");
			    			$(".content").removeAttr("nav_pages");
			    			$(".head_txt").text("登录");
			    			$(".back_").css("display","none");
			    			$(".home").css("display","block");
                             $(".home1").css("display","none");
			            } 
			            break;
			    }
			});
			$selector.on('touchstart touchmove touchend',".home", function(event) {
			    switch(event.type) {
			        case 'touchstart':
			            falg = false;
			            break;
			        case 'touchmove':
			            falg = true;
			             break;
			        case 'touchend':
			            if( !falg ) {
			                event.preventDefault();
			    			pagetolog = 0;
			    			page_back = [];
			    			$(".content").css("overflow","auto");
			    			$(".content_1-0").css("display","block");
			    			$(".content_1-0").siblings(".content_1").css("display","none");
			    			$(".index").addClass("active").siblings().removeClass("active");
			    			$(".head_txt").text("首页");
			    			$(".back_").css("display","none");
			            } 
			            break;
			    }
			});  			
		},
		edit_page : function(){//编辑态属性页
			/************************头导航编辑***********************/
			$(".head_txt").text("首页");
			var rightt = $('<div class="mobile_page"><div class="head_title"><div class="title_text lf">设置</div><button class="close rt"></button></div><div class="mobile_tab"></div></div>');
	        $('body').on('click','.header',function(){//加载header 属性页 
		       	var head_page = $('<fieldset class="rect_line"><legend class="rect_text">头导航</legend>'+
	       							'<div class="fill_attrPtext"><span>标题内容</span><input type="text" class="head_text" value="首页"/></div>'+
	       							'<div class="fill_attrP"><span>头导航文字颜色</span><input type="color" class="head_texc"/></div>'+
	       							'<div class="fill_attrPbottom"><span>头导航背景色</span><input type="color" class="head_bg"/></div>'+	       							
       							'</fieldset>');
		       	if($(".mobile_page").length == 0){
		        	$('body').append(rightt);
		        	$(".mobile_tab").empty();
		        	$(".mobile_tab").append(head_page);
		        }else{
		        	$(".mobile_tab").empty();
		        	$(".mobile_tab").append(head_page);
		        }		       
		    	$(".nav_two").removeClass("shodwf");		    	
		        $(".nav_1").children(".nav_11").removeClass("shodw");
		        $(".nav_1").find(".close_btn").css("display","none");
		        $(this).addClass("shodwh");
		        $(".footer").removeClass("shodwh");
		        $("#logo_textidd").removeClass("shodw");
	       		$("#logoidd").removeClass("shodw");
		        Mobile_page.init_pagehead();
		        $("#logoidd").removeAttr("seecall");
		    });
		    $('body').on('click','.close',function(){//移除属性页
		       	$(".mobile_page").remove();
		       	$("body").css("width","100%");
		    });
		    $('body').on('input','.head_text',function(){//头导航文本内容
		       	$(".head_txt").text($(this).val());
		       	$(".header").attr("head_text",$(this).val()); 
		    });
		    $('body').on('change','.head_texc',function(){//头导航文字颜色
		       	$(".header").css("color",$(this).val());
		       	$(".header").attr("head_texc",$(this).val());
		    });
		    $('body').on('change','.head_bg',function(){//头导航背景色
		       	$(".header").css("background-color",$(this).val());
		       	$(".header").attr("head_bg",$(this).val());
		    });
		    /******************************尾导航编辑**************************/
		    $('body').on('click','.footer',function(){//头导航背景色 
		       	var foot_page = $('<fieldset class="rect_line"><legend class="rect_text">尾导航</legend>'+
	       							'<div class="fill_attrPtext"><span>标题中内容</span><input type="text" class="footl_text" value="首页"/></div>'+
	       							'<div class="fill_attrPtext" ><span>标题左内容</span><input type="text" class="footm_text" value="查询"/></div>'+
	       							'<div class="fill_attrPtext"><span>标题右内容</span><input type="text" class="footr_text" value="登录"/></div>'+
	       							'<div class="fill_attrP"><span>尾导航文字颜色</span><input type="color" class="foot_texc"/></div>'+
	       							'<div class="fill_attrPbottom"><span>尾导航背景色</span><input type="color" class="foot_bg"/></div>'+
	       						'</fieldset>');
		       	if($(".mobile_page").length == 0){
		        	$('body').append(rightt);
		        	$(".mobile_tab").empty();
		        	$(".mobile_tab").append(foot_page);
		        }else{
		        	$(".mobile_tab").empty();
		        	$(".mobile_tab").append(foot_page);
		        }		        
		    	$(".nav_two").removeClass("shodwf");
		        $(".nav_1").children(".nav_11").removeClass("shodw");
		        $(".nav_1").find(".close_btn").css("display","none");
		        $(".nav_1").children(".nav_11").removeClass("shodw");
		        $("#logo_textidd").removeClass("shodw");
	       		$("#logoidd").removeClass("shodw");
		        $(this).addClass("shodwh");
		        $(".header").removeClass("shodwh");
		        Mobile_page.init_pagefoot();
		        $("#logoidd").removeAttr("seecall");
		    });
		    $('body').on('input','.footl_text',function(){//尾导航左文本内容
		       	$(".foot_index").text($(this).val());
		       	$(".footer").attr("footl_text",$(this).val());
		    });
		    $('body').on('input','.footm_text',function(){//尾导航中文本内容
		       	$(".foot_search").text($(this).val());
		       	$(".footer").attr("footm_text",$(this).val());
		    });
		    $('body').on('input','.footr_text',function(){//尾导航右文本内容
		       	$(".foot_login").text($(this).val());
		       	$(".footer").attr("footr_text",$(this).val());
		    });
		    $('body').on('change','.foot_texc',function(){//尾导航文字颜色
		       	$(".footer").css("color",$(this).val());
		       	$(".footer").attr("foot_texc",$(this).val());
		    });
		    $('body').on('change','.foot_bg',function(){//尾导航背景色
		       	$(".footer").css("background-color",$(this).val()); 
		       	$(".footer").attr("foot_bg",$(this).val());
		    });
		    /******************************主导航编辑*********************/		    
		    $('body').on('click','.nav_1',function(){
		    	me = $(this);
	    		var nav_page = $('<fieldset class="rect_line"><legend class="rect_text">主导航</legend>'+
	    						'<div class="fill_attrPtext"><span>导航标题内容</span><input class="nav_tex" type="text"/></div>'+
       							'<div class="fill_attrP"><span>主导航文字颜色</span><input type="color" class="nav_texc"/></div>'+
       							'<div class="fill_attrPpic"><span>主导航背景图片</span><button class="nav_img" value ="浏览">浏览</button></div>'+
       							'<div class="fill_attrP1"><span class="inline">通栏</span><span class="radio radio_one"></span></div>'+
       							'<div class="fill_attrP1"><span class="inline">双栏</span><span class="radio radio_two"></span></div>'+
       							'<div class="fill_attrP3"><select id="nav_num" class="fill_attrp fill_attrP2-nav"><option value="0">主页</option></select></div>'+
       							'<div class="fill_attrP3"><button class="add_page add_pages">添加分页</button><button class="delet_page">删除分页</button></div>'+
	       						'<div class="fill_attrPbottom"><button class="nav_add">增加</button><button class="nav_delet">删除</button><button class="nav_up">上移</button><button class="nav_down">下移</button></div>'+
	       						'</fieldset>'+
	       						'<fieldset class="rect_line"><legend class="rect_text">导航配置</legend>'+
									'<div class="fill_attrP3"><span>配置链接</span><input type="button" value="选择文件" class="fill_attrP3-text configlink"/></div>'+
	       							'<div class="fill_attrP2"><span class="fill_attrP2span">配置子导航</span><select id="nav_nums" class="fill_attrP2-nav fill_attrP2-navdd"><option value="0">主页</option></select></div>'+	
	       							'<div class="fill_attrP2"><button id="nav_config" class="fill_attrP2-nav-button">确认</button></div>'+	
	       						'</fieldset>');
		       	if($(".mobile_page").length == 0){
		        	$('body').append(rightt);
		        	$(".mobile_tab").empty();
		        	$(".mobile_tab").append(nav_page);
		        }else{
		        	$(".mobile_tab").empty();
		        	$(".mobile_tab").append(nav_page);
		        }
		        $(".footer").removeClass("shodwh");
		        $(".header").removeClass("shodwh");
		        $(this).find(".close_btn").css("display","block");
		        $(this).siblings("div").find(".close_btn").css("display","none");
		        $(this).children(".nav_11").addClass("shodw");
		        $(this).siblings("div").children(".nav_11").removeClass("shodw");
		        $(this).siblings("div").find(".nav_two").removeClass("shodwf");
  				if($(this).find(".nav_two").length === 0){
		    		$(".nav_two").removeClass("shodwf");
		    	}
		    	var indes = $(this).parents("div.content_1").attr("index");
		    	if(indes == "index"){
		    		setTimeout(function(){
			    		$("#nav_num").val(0);
			    	},200);
		    	}
		    	Mobile_page.init_pagenav();//初始化
		    });
		    /*==========登录属性页=========*/
	    	$('body').on('click','#logo_textidd',function(){
	        	var nav_page = $('<fieldset class="rect_line"><legend class="rect_text">登录页导航</legend>'+
	    						'<div class="fill-pic"><span>系统名称</span><input type="text" id="fill-picname"/></div>'+
	       						'</fieldset>');
	       		$('body').append(rightt);				
	       		$(this).addClass("shodw");	
	       		$("#logoidd").removeClass("shodw");
	        	$(".mobile_tab").html(nav_page);
	        	$(".footer").removeClass("shodwh");
		        $(".header").removeClass("shodwh");
	        	$("#logoidd").removeAttr("seecall");
	        	$("#fill-picname").val($("#logo_textidd").text());
	        });	   	
		   	$("#logoidd").unbind('click').bind('click',function() {
	        	var nav_page = $('<fieldset class="rect_line"><legend class="rect_text">登录页导航</legend>'+
	    						'<div class="fill-pic"><span>LOGO图片</span><button class="nav-see" id="nav-see" value ="浏览">浏览</button></div>'+
	       						'</fieldset>');
	       		$(this).addClass("shodw");
	       		$("#logo_textidd").removeClass("shodw");
	        	$(".mobile_tab").html(nav_page);
	        	$(".footer").removeClass("shodwh");
		        $(".header").removeClass("shodwh");
		        $(this).attr("seecall","yes");
	        });
		    $('body').on('input','#fill-picname',function(){
		    	$("#logo_textidd").text($(this).val());
		    });
		    $("body").on("click","#nav-see",function(){
		    	webapi.getImagePath('images');
		    });
		    /**********双栏导航模块选中操作******/
		    $('body').on('click','.nav_two',function(){
		     	index_two = $(this).index();
		     	$(this).addClass("shodwf");
		     	$(this).siblings("div.nav_two").removeClass("shodwf");
		     	$(this).parents("div.nav_1").siblings("div.nav_1").find("div.nav_two").removeClass("shodwf");
		    });
		    /*********修改选中导航块文本内容*********/
		    $('body').on('input','.nav_tex',function(){
		    	if(me.find(".nav_two").length == 0){
		    		me.find(".nav_text").text($(this).val());
		    	}else{
		    		me.find(".nav_two").eq(index_two).find(".nav_text").text($(this).val());
		    	}
		    });
		    /***********文字颜色修改*********/
		    $('body').on('change','.nav_texc',function(){
		    	if(me.find(".nav_two").length == 0){
		    		me.find(".nav_text").css("color",$(this).val());
		    		me.find(".nav_text").attr("navtextc",$(this).val());
		    	}else{
		    		me.find(".nav_two").eq(index_two).find(".nav_text").css("color",$(this).val());
		    		me.find(".nav_two").eq(index_two).find(".nav_text").attr("navtextc",$(this).val());
		    	}
		    });
		    /************添加分页***********/
		    $('body').on('click','.add_page',function(){
		    	var _k;
		    	var pagelen = $("#nav_num").children("option").length;
		    	pages_ = [];
		    	for(var i = 0; i < pagelen; i++){
		    		pages_.push(parseInt($("#nav_num").children("option").eq(i).val()));
		    		_k = Math.max.apply(null, pages_);
		    	}
		    	$(".content").attr("page_",pages_);
		    	k = _k + 1;
		    	me = null;
		    	var navpage = $('<div class="content_1 content_1-'+k+'"></div>');
	    		var navoption = $('<option value="'+k+'">分页'+k+'</option>');
		    	if($(".content").attr("nav_pages") === "nav_bar"){
		    		$(".content").append(navpage);
		    		$("#nav_num").append(navoption);	
		    		$(".content_1-"+k).css("display","block");
		    		$(".content_1-"+k).siblings("div.content_1").css("display","none");
		    		$("#nav_num").val(k);
		    		$(".footer").attr("addpage",$("#nav_num").html());
		    		kk_ = k;
		    		k_ = k;
	    			$("#nav_nums").html($("#nav_num").html());
	    			var pagelens = $("#nav_num").children("option").length;
			    	pages_ = [];
			    	for(var i = 0; i < pagelens; i++){
			    		pages_.push(parseInt($("#nav_num").children("option").eq(i).val()));
			    	}
			    	$(".content").attr("page_",pages_);
		    	}
		    });
		    /************选择分页************/
		    $("body").on("change","#nav_num",function(){
		    	kk_ = parseInt($(this).val());
		    	me = null;
		        $(".content_1-"+kk_).css("display","block");
	    		$(".content_1-"+kk_).siblings("div.content_1").css("display","none");
	    		$(".footer").removeClass("shodwh");
		        $(".header").removeClass("shodwh");
		        $(".nav_two").removeClass("shodwf");
		        k_ = kk_;		    	
		        $(".nav_1").children(".nav_11").removeClass("shodw");
		        $(".nav_1").find(".close_btn").css("display","none");
		    });
		    /*************删除分页***********/
		    $('body').on('click','.delet_page',function(){
		    	if($(".content").attr("nav_pages") === "nav_bar"){
		    		var kk = parseInt($('#nav_num option:selected').val());	    			    		
		    		if(kk != 0 ){
		    			$("#nav_num").find("option[value="+kk+"]").remove();
		    			$(".content_1-"+kk).remove();
		    			$("#nav_nums").html($("#nav_num").html());
		    			me = null;
		    			var _k = kk;
		    			for(var j = _k; j > 0; j--){
		    				if($(".content_1-"+(j-1)).length == "0"){
			    				kk = kk - 1;
			    			}else{			    				
			    				$("#nav_num").val(kk-1);
				    			$(".content_1-"+(kk-1)).css("display","block");
				    			$(".content_1-"+(kk-1)).siblings("div.content_1").css("display","none");
				    			k = parseInt($('#nav_num option:last').val());
			    			}
		    			}
		    			k_ = kk-1;	
		    			pages_ = [];
		    			var pagelend = $("#nav_num").children("option").length;
				    	for(var i = 0; i < pagelend; i++){
				    		pages_.push(parseInt($("#nav_num").children("option").eq(i).val()));
				    	}
				    					    								    			
		    		}else{
		    			k_ = kk;		    			
		    			$("#nav_num").val(kk);
		    			$(".content_1-"+kk).css("display","block");
		    			$(".content_1-"+kk).siblings("div.content_1").css("display","none");
		    		}	    				    			    				    		
		    	}
		    	$(".footer").attr("addpage",$("#nav_num").html());
		    });
		    /************导航添加*********/
		    $('body').on('click','.nav_add',function(){
                var nav_type = $(".content").attr("radio");
                var nav_One = $('<div class="nav_1"><div class="nav_11  nav_bod nav_shodw"><p class="nav_text nav_pos" navtextc="#000000"></p><div class="close_btn"></div></div></div>');
                var nav_Two = $('<div class="nav_1"><div class="nav_11"><div class="nav_two nav_bod nav_21 nav_shodw lf"><p class="nav_text" navtextc="#000000"></p></div><div class="nav_two nav_bod nav_22 lf"><p class="nav_text" navtextc="#000000"></p><div class="close_btn"></div></div></div></div>');
                if(nav_type == "one"){               		
                	$(".content_1-"+k_).append(nav_One);
                }else{
                	$(".content_1-"+k_).append(nav_Two);
                }
		    });
		    /***********属性页删除**********/
		    $('body').on('click','.nav_delet',function(){
                me.remove();
		    });
		    /*************上移*********/
		    $('body').on('click','.nav_up',function(){
		    	var prevthis_ = me.prev("div.nav_1");
                me.insertBefore(prevthis_);
		    });
		     /*************下移*********/
		    $('body').on('click','.nav_down',function(){
		    	var nextthis_ = me.next("div.nav_1");
                me.insertAfter(nextthis_);
		    });		
		    /*************关闭按钮删除**************/
		    $('body').on('click','.close_btn',function(){
		    	$(this).parents("div.nav_1").remove();
		    	$('body').find(".mobile_tab").empty();
		    });
		    /*********通栏双栏选择********/
		    $('body').on('click','.radio_one',function(){
		    	$(this).addClass("radiocheck");
		    	$(".radio_two").removeClass("radiocheck");
		    	$(".content").attr("radio","one");
		    });
		    $('body').on('click','.radio_two',function(){
		    	$(this).addClass("radiocheck");
		    	$(".radio_one").removeClass("radiocheck");
		    	$(".content").attr("radio","two");
		    });
		    /**********链接配置***********/
		    var pag;
		    $("body").on("change","#nav_nums",function(){
		    	pag = $(this).val();
		    });
		    /********确认配置*********/
		     $("body").on("click","#nav_config",function(){
		     	if(pag){
		     		if(me+"" != "null"){
		     			if(me.find(".nav_two").length == 0){
			     			me.attr("page_config",pag);
			     			alert("配置成功！");
				    	}else{
				    		me.find(".nav_two").eq(index_two).attr("page_config",pag);
				    		alert("配置成功！");
				    	}
		     		}else{
		     			alert("请选择目标导航！");
		     		}
		     	}else{
		     		alert("请选择要配置的分页！");
		     	}
		    });
		    /*****上传图片******/
		    $("body").on("click",".nav_img",function(){
		    	webapi.getImagePath('images');
		    });
		    /********配置链接********/
		    $("body").on("click",".configlink",function(){
		    	webapi.getPath("html");
		    });
		},
		edit_pages : function(){
			window.onscroll = function(){
			    $("body").width($(window).width()+document.body.scrollLeft);			    
			};
			window.onresize = function(){
				$(".nav_contain").height($(window).height());
				$("html").height($(window).height());
				$("body").width("100%");
			};
		},
		init_pagehead : function(){
			/*********初始化*******/
	        $(".head_text").val($(".header").attr("head_text"));
	        $(".head_texc").val($(".header").attr("head_texc"));
	        $(".head_bg").val($(".header").attr("head_bg"));	    
		},
		init_pagefoot : function(){			
	        /**********初始化*********/
	        $(".footl_text").val($(".footer").attr("footl_text"));
	        $(".footm_text").val($(".footer").attr("footm_text"));
	        $(".footr_text").val($(".footer").attr("footr_text"));
	        $(".foot_texc").val($(".footer").attr("foot_texc"));
	        $(".foot_bg").val($(".footer").attr("foot_bg"));
		},
		init_pagenav : function(){			
	        /**********初始化*********/
	        if($(".content").attr("radio") === "one"){
	        	$(".radio_one").addClass("radiocheck");
	        }else{
	        	$(".radio_two").addClass("radiocheck");
	        }
	        /*******当前分页显示初始化******/
	        $("#nav_num").html($(".footer").attr("addpage"));
	        if(kk_){	        
	        	$("#nav_num").val(kk_);
	        }
	       	/********文本内容初始化*****/
	        if(me.find(".nav_two").length === 0){
	    		$(".nav_tex").val(me.find(".nav_text").text());
	    	}else{
	    		$(".nav_tex").val(me.find(".nav_two").eq(index_two).find(".nav_text").text());

	    	}
	    	/********文本颜色初始化*****/
	    	if(me.find(".nav_two").length === 0){
	    		$(".nav_texc").val(me.find(".nav_text").attr("navtextc"));
	    	}else{
	    		$(".nav_texc").val(me.find(".nav_two").eq(index_two).find(".nav_text").attr("navtextc"));	    		
	    	}
	    	$("#nav_nums").html($("#nav_num").html());
		},
		init : function(){
			$("#logo_textidd").removeClass("shodw")
	       	$("#logoidd").removeClass("shodw");
			$(".nav_11").removeClass("shodw");
        	$(".nav_two").removeClass("shodwf");    
		    $(".footer").removeClass("shodwh");
        	$(".header").removeClass("shodwh");
        	$(".close_btn").css("display","none"); 
        	$(".mobile_page").remove(); 	
		}
	};
	/****************预览状态操作**************/
	var Preview = {
		conversion : function(){
			if(is_PC == true){
				$('body').on('click','.nav_1',function(){	
					my = $(this);
					var page_f = [];
					var link_k;
			    	var page_s = $(".content").attr("page_");
			    	if(page_s){
			    		page_f = page_s.split(",");
			    		link_k = parseInt(Math.max.apply(null, page_f));
			    	}else{
						link_k = 0;
			    	}			    	 
			        if(my.find(".nav_two").length == 0){
			        	if( my.attr("page_config")+"" != "undefined" || my.children(".nav_11").attr("linkurl")+"" != "undefined"){
				        	$(".head_txt").text(my.find(".nav_text").text());
				    		var config = parseInt(my.attr("page_config"));
				    		pagetolog = config;
				    		$(".content_1-"+config).css("display","block");
			    			$(".content_1-"+config).siblings("div.content_1").css("display","none");
			    			$(".back_").css("display","block");
			    			page_back.push(config);
			    			headtext.push(my.find(".nav_text").text());
			    			if(my.children(".nav_11").attr("linkurl")){
			    				link_k = link_k + 1;
			    				var url_one = my.children(".nav_11").attr("linkurl");
			    				var navpagel = $('<div class="content_1 link_url content_1-'+link_k+'"></div>');
						    	if($(".content").attr("nav_pages") == "nav_bar"){
						    		pagetolog = link_k;
						    		$("body").find(".link_url").remove();
						    		$(".content").append(navpagel);
						    		my.attr("page_config",link_k);
						    		$(".content_1-"+link_k).css("display","block");
						    		$(".content_1-"+link_k).siblings("div.content_1").css("display","none");
						    		$(".content_1-"+link_k+"").load(url_one);//POST方式
						    		page_f.push(link_k);
							    	$(".content").attr("page_",page_f);
						    	}	    				
			    			}
		    			}
			    	}else{
			    		if( my.find(".nav_two").eq(indexx).attr("page_config")+"" != "undefined" || my.find(".nav_two").eq(indexx).attr("linkurl")+"" != "undefined"){
			    			var configs = parseInt(my.find(".nav_two").eq(indexx).attr("page_config"));
			    			pagetolog = configs; 
				    		page_back.push(configs);
				    		headtext.push(my.find(".nav_two").eq(indexx).find(".nav_text").text());
				    		$(".content_1-"+configs).css("display","block");
			    			$(".content_1-"+configs).siblings("div.content_1").css("display","none");
			    			$(".back_").css("display","block");
			    			$(".head_txt").text(my.find(".nav_two").eq(indexx).find(".nav_text").text());
			    			if(my.find(".nav_two").eq(indexx).attr("linkurl")){
			    				link_k = link_k + 1;
			    				var url_two = my.find(".nav_two").eq(indexx).attr("linkurl");
			    				var navpage_l = $('<div class="content_1 link_url content_1-'+link_k+'"></div>');
					    		if($(".content").attr("nav_pages") == "nav_bar"){
					    			pagetolog = link_k;
					    			$("body").find(".link_url").remove();
						    		$(".content").append(navpage_l);
						    		my.find(".nav_two").eq(indexx).attr("page_config",link_k);
						    		$(".content_1-"+link_k).css("display","block");
						    		$(".content_1-"+link_k).siblings("div.content_1").css("display","none");
						    		$(".content_1-"+link_k+"").load(url_two);//POST方式
						    		page_f.push(link_k);
							    	$(".content").attr("page_",page_f);
						    	}	    	
			    			}
			    		}
			    	}
			    	setTimeout(function(){
			    		var _width = $(".nav_contain").width();
			    		$("#bgDiv").css({
							"width":_width,
						});						
			    	},500);
			    });
			    $('body').on('mousedown','.nav_two',function(){
			    	indexx = $(this).index();
			    });
			}else{
				var flag = false;
				var $selector = $(document);
				$selector.on('touchstart touchmove touchend',".nav_1", function(event) {
				    switch(event.type) {
				        case 'touchstart':
				            falg = false;
				            break;
				        case 'touchmove':
				            falg = true;
				             break;
				        case 'touchend':
				            if( !falg ) {
				                event.preventDefault();
				    			my = $(this);
								var page_f = [];
								var link_k;
						    	var page_s = $(".content").attr("page_");
						    	if(page_s){
						    		page_f = page_s.split(",");
						    		link_k = parseInt(Math.max.apply(null, page_f));
						    	}else{
						    		link_k = 0;						
						    	}			    	
						        if(my.find(".nav_two").length == 0){
						        	if( my.attr("page_config")+"" != "undefined" || my.children(".nav_11").attr("linkurl")+"" != "undefined"){
							        	$(".head_txt").text(my.find(".nav_text").text());
							    		var config = parseInt(my.attr("page_config"));
							    		pagetolog = config;
							    		$(".content_1-"+config).css("display","block");
						    			$(".content_1-"+config).siblings("div.content_1").css("display","none");
						    			$(".back_").css("display","block");
						    			page_back.push(config);
						    			headtext.push(my.find(".nav_text").text());
						    			if(my.children(".nav_11").attr("linkurl")){
						    				link_k = link_k + 1;
						    				var url_one = my.children(".nav_11").attr("linkurl");
						    				var navpagel = $('<div class="content_1 link_url content_1-'+link_k+'"></div>');
									    	if($(".content").attr("nav_pages") == "nav_bar"){
									    		pagetolog = link_k;
									    		$("body").find(".link_url").remove();
									    		$(".content").append(navpagel);
									    		my.attr("page_config",link_k);
									    		$(".content_1-"+link_k).css("display","block");
									    		$(".content_1-"+link_k).siblings("div.content_1").css("display","none");
									    		$(".content_1-"+link_k+"").load(url_one);//POST方式
									    		page_f.push(link_k);
										    	$(".content").attr("page_",page_f);
										    	for(var i= 1; i<=4; i++){
										    		if(i <= 4){
										    			setTimeout(function(){
									    					var bgwidth = $(window).width();
									    					$("body .bgdiv").css("width",bgwidth);									    	
															$("body .contrl").each(function(){
													            var mob_l = $(this).attr("mob_left");
													            var mob_w = $(this).attr("mob_width");
													            $(this).css({
													            	"left":mob_l+"%",
													            	"width":mob_w+"%"
													            });
													        });
												    	},i*1000);	
										    		}else{
										    			return;
										    		}
										    	}															    	
									    	}	    				
						    			}
					    			}
						    	}else{
						    		if( my.find(".nav_two").eq(indexx).attr("page_config")+"" != "undefined" || my.find(".nav_two").eq(indexx).attr("linkurl")+"" != "undefined"){
						    			var configs = parseInt(my.find(".nav_two").eq(indexx).attr("page_config"));
						    			pagetolog = configs; 
							    		page_back.push(configs);
							    		headtext.push(my.find(".nav_two").eq(indexx).find(".nav_text").text());
							    		$(".content_1-"+configs).css("display","block");
						    			$(".content_1-"+configs).siblings("div.content_1").css("display","none");
						    			$(".back_").css("display","block");
						    			$(".head_txt").text(my.find(".nav_two").eq(indexx).find(".nav_text").text());
						    			if(my.find(".nav_two").eq(indexx).attr("linkurl")){
						    				link_k = link_k + 1;
						    				var url_two = my.find(".nav_two").eq(indexx).attr("linkurl");
						    				var navpage_l = $('<div class="content_1 link_url content_1-'+link_k+'"></div>');
								    		if($(".content").attr("nav_pages") == "nav_bar"){
								    			pagetolog = link_k;
								    			$("body").find(".link_url").remove();
									    		$(".content").append(navpage_l);
									    		my.find(".nav_two").eq(indexx).attr("page_config",link_k);
									    		$(".content_1-"+link_k).css("display","block");
									    		$(".content_1-"+link_k).siblings("div.content_1").css("display","none");
									    		$(".content_1-"+link_k+"").load(url_two);//POST方式
									    		page_f.push(link_k);						    		
										    	$(".content").attr("page_",page_f);
										    	for(var i= 1; i<=4; i++){
										    		if(i <= 4){
										    			setTimeout(function(){
											    			var bgwidth = $(window).width();
									    					$("body .bgdiv").css("width",bgwidth);									    		
															$("body .contrl").each(function(){
													            var mob_l = $(this).attr("mob_left");
													            var mob_w = $(this).attr("mob_width");
													            $(this).css({
													            	"left":mob_l+"%",
													            	"width":mob_w+"%"
													            });
													        });
												    	},i*1000);	
										    		}else{
										    			return;
										    		}
										    	}		
									    	}	    	
						    			}
						    		}
						    	}					    		
				            } 
				            break;
				    }
				});
				$selector.on('touchstart touchmove touchend',".nav_two", function(event){
					switch(event.type) {
				        case 'touchstart':
				            falg = false;
				            break;
				        case 'touchmove':
				            falg = true;
				             break;
				        case 'touchend':
				            if( !falg ) {
				                event.preventDefault();
				    			indexx = $(this).index();
				            } 
				            break;
				    }
				});
			}			
		    /*==========登录===========*/
        	$("#button-log").unbind('click').bind('click',
	        	function() {
	        	var edit = sessionStorage.getItem("edit");
	            if (edit+"" == "null") {
	                var user1 = $("#user-log").val();
	                var pass1 = $("#pass-log").val();
					if(pass1 != '' && user1 != ''){
						Websocket.send(loginSendData(user1, pass1));
						
					}else{
						alert("亲：密码或用户名不能为空！");
					}  
	            };
	        });
	        /*============退出登录================*/
	        $("#button-log1").unbind('click').bind('click',function() {
				Websocket.send(logoutSendData());
				 window.location.reload();
			}); 
	        var starttime1;
            var endtime1;
            var limittime1;
            $("#satardate1").unbind("change").bind("change",
            function() {
                if (endtime1) {
                    starttime1 = $(this).val();
                    var start = new Date(starttime1);
                    var end = new Date(endtime1);
                    limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                    if (limittime >= 0) {
                        if (limittime > 30) {
                            $(this).val("");
                            alert("只能查看30天以内的信息！");
                        }
                    } else {
                        $(this).val("");
                         alert("起始时间必须早于结束时间！");
                    }
                } else {
                    starttime1 = $(this).val();
                }
            });
            $("#enddate1").unbind("change").bind("change",
            function() {
                if (starttime1) {
                    endtime1 = $(this).val();
                    var start = new Date(starttime1);
                    var end = new Date(endtime1);
                    limittime = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
                    if (limittime >= 0) {
                        if (limittime > 30) {
                            $(this).val("");
                            alert("只能查看30天以内的信息！");
                        }
                    } else {
                    	$(this).val("");
                        alert("结束时间必须晚于起始时间！");
                    }
                } else {
                    endtime1 = $(this).val();
                }
            });
	        /*========查询数据===========*/
	        $("#searchvalue").unbind("mousedown").bind("mousedown",
            function() {
                if (starttime1 && endtime1) {
                   var selectcal=$("#eventpice").val();
                   if(selectcal=="历史事件"){
                   	    $("#soubodyid ul").remove(".romovedate");
                   		Websocket.send(sendGetEventData(starttime1, endtime1));
                   }else if(selectcal=="历史报警"){
                   		$("#soubodyid ul").remove(".romovedate");
                   		Websocket.send(sendGetAlarmData(starttime1, endtime1));
                   }
                   
                } else {
                    alert("请选择起止时间！");
                }
            });
            /*===========控件切换================*/
            $("#eventpice").unbind("change").bind("change",
             function() {
             	var selectcal=$("#eventpice").val();
             	if(selectcal=="系统事件"){
             		$("#searchvalue").attr("disabled","disabled");
             		$("#satardate1").attr("disabled","disabled");
             		$("#enddate1").attr("disabled","disabled");
             		$("#soubodyid").empty();
             		$("#soubodyid").html("<ul class='soubodyUl'><li>时间</li><li>变量名</li><li>事件</li><li>优先级</li></ul>");
             	}else if(selectcal=="实时报警"){
             		$("#searchvalue").attr("disabled","disabled");
             		$("#satardate1").attr("disabled","disabled");
             		$("#enddate1").attr("disabled","disabled");
                	$("#soubodyid").empty();
               		$("#soubodyid").html("<ul class='soubodyUl'><li>时间</li><li>变量名</li><li>事件</li><li>优先级</li></ul>");
                }else if(selectcal=="历史事件"){
                	$("#searchvalue").removeAttr("disabled");
                	$("#satardate1").removeAttr("disabled");
                	$("#enddate1").removeAttr("disabled");
             		$("#soubodyid").empty();
               		$("#soubodyid").html("<ul class='soubodyUl'><li>时间</li><li>用户名</li><li>事件</li><li>优先级</li></ul>");
                }else if(selectcal=="历史报警"){
                	$("#searchvalue").removeAttr("disabled");
                	$("#satardate1").removeAttr("disabled");
                	$("#enddate1").removeAttr("disabled");
                	$("#soubodyid").empty();
               		$("#soubodyid").html("<ul class='soubodyUl'><li>时间</li><li>变量名</li><li>事件</li><li>优先级</li></ul>");
                }
             	
            });
            /*=============查询数据===========*/
            $(".home1").unbind("click").bind("click", function() {
                if($(".souhead").css("display")=="none"){
                   $(".souhead").css("display","block"); 
                }else{
                   $(".souhead").css("display","none"); 
                }
            });
            $(".soubody").unbind("click").bind("click", function() {
               if($(".souhead").css("display")=="block"){
                  $(".souhead").css("display","none"); 
               }
            });
		},
		init : function(){
			$("#logo_textidd").removeClass("shodw");
	       	$("#logoidd").removeClass("shodw");
			$(".nav_11").removeClass("shodw");
        	$(".nav_two").removeClass("shodwf");    
		    $(".footer").removeClass("shodwh");
        	$(".header").removeClass("shodwh");  	
        	$(".close_btn").css("display","none");
        	$(".mobile_page").remove();
		},
		back : function(){
			/*****返回*****/
			if(is_PC == true){
				$('body').on('click','.back',function(){
	    			var last_page;
	    			page_back.pop();
	    			headtext.pop();
	    			if(page_back.length != 0){
	    				last_page = parseInt(page_back[page_back.length-1]);
	    				pagetolog = last_page;
	    				$(".content_1-"+last_page).css("display","block");
		    			$(".content_1-"+last_page).siblings("div.content_1").css("display","none");
		    			$(".head_txt").text(headtext[headtext.length-1]);
	    			}else{
	    				last_page = 0;
	    				pagetolog = 0;
	    				$(".content_1-"+last_page).css("display","block");
		    			$(".content_1-"+last_page).siblings("div.content_1").css("display","none");
		    			$(".back_").css("display","none");
		    			$(".head_txt").text("首页");
	    			}
			    });
			}else{
				var flag = false;
				var $selector = $(document);
				$selector.on('touchstart touchmove touchend',".back", function(event) {
				    switch(event.type) {
				        case 'touchstart':
				            falg = false;
				            break;
				        case 'touchmove':
				            falg = true;
				             break;
				        case 'touchend':
				            if( !falg ) {
				                event.preventDefault();
				    			var last_page;
				    			page_back.pop();
				    			headtext.pop();
				    			if(page_back.length != 0){
				    				last_page = parseInt(page_back[page_back.length-1]);
				    				pagetolog = last_page;
				    				$(".content_1-"+last_page).css("display","block");
					    			$(".content_1-"+last_page).siblings("div.content_1").css("display","none");
					    			$(".head_txt").text(headtext[headtext.length-1]);
				    			}else{
				    				last_page = 0;
				    				pagetolog = 0;
				    				$(".content_1-"+last_page).css("display","block");
					    			$(".content_1-"+last_page).siblings("div.content_1").css("display","none");
					    			$(".back_").css("display","none");
					    			$(".head_txt").text("首页");
				    			}
				            } 
				            break;
				    }
				});
			}
    		
		}
	};
	var Mobile = {
		fun : function(){
			Mobile_page.media();		
		    Mobile_page.ispc();
		    if(is_PC == true){
		    	//var edit = inItWebMode.editMode; 
		    	var edit = sessionStorage.getItem("edit");
		    	if(edit+"" == "true"){
		    		$("body").css("height","100%");
		    		$(".nav_contain").css({
						"width":"6rem",
						"height":$(window).height()+"px"
					});
		    		Mobile_page.edit_page();
			 		Mobile_page.init();	 		
		    	}else{
		    		$(".nav_contain").css({
						"width":"3.75rem",
						"height":$(window).height()+"px"
					});
			    	$(".content").css({
						"overflow-y":"auto",
						"overflow-x":"hidden"
					});
		    		Preview.init();
		    		Preview.conversion();
		    		Preview.back();
		    		Mobile_page.nav_pcsearch();
		    	}
	    		$("#content").remove();
		 		$("#bgDiv").remove();
				$("html").css("height",$(window).height()+"px");
				Mobile_page.nav_pc();
				Mobile_page.edit_pages();
				$(window).bind("mouseover",function(){
					var beforeLog = inTtCommand.log();
					webapi.addLog('before',beforeLog);
			    	$(".content").attr("log","loging");
			    	var afterLog = inTtCommand.log();
					webapi.addLog('after',afterLog);
				});
		    }else{
		    	$(".mobile_page").remove();
		    	$(".inp").css("-webkit-user-select","auto");
				$("body").css({					
					"position":"static",
					"width":"100%",
					"height":"100%"
				});
				$(".nav_contain").css({
					"width":"100%",
					"height":"100%"					
				});
				$("html").css("height","0");	
		    	Preview.init();
		    	Preview.conversion();
		    	Preview.back(); 
		    	Mobile_page.nav_mobile();  
		    	Mobile_page.nav_mobilesearch();		    	
		    }
		    /*********读本地图片**********/
		    setPictrue = function(url){
			    $(".content").attr("link","no");
		    	if($("#logoidd").attr("seecall")=="yes"){
			    	$("#logoidd").css({
				    	"background-image": "url("+url+")",
			            "background-size": "100% 100%",
			            "background-repeat": "no-repeat"
			   		 })
			    }else if(me){
			    	if(me.find(".nav_two").length == 0){
				        me.children(".nav_11").attr("imgurl",url);
				        me.children(".nav_11").css({
				            "background-image": "url("+url+")",
				            "background-size": "100% 100%",
				            "background-repeat": "no-repeat"
				        });      
				    }else{
				        me.find(".nav_two").eq(index_two).attr("imgurl",url);
				        me.find(".nav_two").eq(index_two).css({
				            "background-image": "url("+url+")",
				            "background-size": "100% 100%",
				            "background-repeat": "no-repeat"
				        });           
				    }
			    }
		    };
		    setPath = function(url){
		    	$(".content").attr("link","yes");
		    	if(me.find(".nav_two").length == 0){
			        me.children(".nav_11").attr("linkurl",url);
			    }else{
			        me.find(".nav_two").eq(index_two).attr("linkurl",url);        
			    }
		    }
		}
	};
	setTimeout(function(){
		Mobile.fun();
	},500);
	/*********移动端横屏处理********/
	var land = function(){
	    this.landscape = function(){
	        var bgwidth = $(window).width();
	        $("body #bgDiv").css("width",bgwidth);
	    }
	}
	landing = new land();
	function orient() {
	    if (window.orientation == 0 || window.orientation == 180) {
	        $("body").attr("orient_p", "portrait");
	        $("body").removeAttr("orient_l");
	        orientation = 'portrait';
	        landing.landscape();
	        return false;
	    }
	    else if (window.orientation == 90 || window.orientation == -90) {
	        $("body").attr("orient_l", "landscape");
	        $("body").removeAttr("orient_p");
	        orientation = 'landscape';
	        landing.landscape();
	        return false;
	    }
	}
	$(window).bind( 'orientationchange', function(e){
        for(var i = 0.5; i <= 3.5; i++){
	        setTimeout(function(){
	            orient();
	        },i*500); 
	    } 
	});
})

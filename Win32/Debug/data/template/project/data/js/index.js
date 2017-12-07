
setTimeout(function(){
    //var edit=inItWebMode.editMode
	var is_PC = false;
	var index_two;
	var kk_;//初始化分页显示
	var k = 0;
	var k_ = 0;
	var me;//选中对象
	var Mobile_page = {
		media : function(){
			/**************媒体查询**********/
			// var scale = 1 / devicePixelRatio;
			// document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
			var deviceWidth = document.documentElement.clientWidth;
			if(deviceWidth > 640) deviceWidth = 640;//访问PC端网页
			document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px';
		},
		ispc : function(){
			/********判断是否是移动设备************/		
			function is_pc(){
			    var os = new Array("Android","iPhone","Windows Phone","iPod","BlackBerry","MeeGo","SymbianOS");  // 其他类型的移动操作系统类型，自行添加
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
				$(".nav_contain").css({
					"width":"6rem",
					"height":$(window).height()
				});
				$("html").css("height",$(window).height()+"rem");
			}else{
				$(".nav_contain").css({
					"width":"100%",
					"height":"100%"
				});
				$("body").css("position","static");
			}
		},
		nav : function(){
			/************导航切换**************/
			$(".foot").each(function(index){
		        $(this).click(function(){
		            $(this).addClass("active").siblings().removeClass("active");
		            $(".content_1").eq(index).show().siblings(".content_1").hide();
					if($(this).attr("pages") === "navbar"){
						$(".content").attr("nav_pages","nav_bar");
					}else{
						$(".content").removeAttr("nav_pages");
					}		        
		        });
    		});
    		/*****返回*****/
    		// $('body').on('click','.header',function(){
		    //    	var hash = sessionStorage.getItem("hash");
		    //    	if(hash){
		    //    		$(".content").html(hash);
		    //    	}	       	
		    // });
		},
		loadpage : function(){
			$('body').on('click','.nav_1',function(){
				// var history = $(".content").html();
				// sessionStorage.setItem("hash",history);
		  //       $(".content").load("demo.html");//POST方式
		        if(me.find(".nav_two").length == 0){
		    		var config = parseInt(me.find(".nav_text").attr("page_config"));
		    		$(".content_1-"+config).css("display","block");
	    			$(".content_1-"+config).siblings("div.content_1").css("display","none");
		    	}else{
		    		var configs = me.find(".nav_two").eq(index_two).attr("page_config");
		    		$(".content_1-"+configs).css("display","block");
	    			$(".content_1-"+configs).siblings("div.content_1").css("display","none");
		    	}
		    });
		},
		edit_page : function(){//编辑态属性页
			/************************头导航编辑***********************/
			var rightt = $('<div class="mobile_page"><div class="head_title"><div class="title_text lf">设置</div><button class="close rt"></button></div><div class="mobile_tab"></div></div>');
	        $('body').on('click','.header',function(){//加载header 属性页	    
		       	var head_page = $('<fieldset class="rect_line"><legend class="rect_text">头导航</legend>'+
	       							'<div class="fill_attrPtext"><span>标题内容</span><input type="text" class="head_text" value="首页"/></div>'+
	       							'<div class="fill_attrP"><span>头导航文字颜色</span><input type="color" class="head_texc"/></div>'+
	       							'<div class="fill_attrPbottom"><span>头导航背景色</span><input type="color" class="head_bg"/></div>'+
	       							''+
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
		        Mobile_page.init_pagehead();	      
		    });
		    $('body').on('click','.close',function(){//移除属性页
		       	$(".mobile_page").remove();
		       	$("body").css("width","100%");		 		
		    });
		    $('body').on('keyup','.head_text',function(){//头导航文本内容
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
	       							'<div class="fill_attrPtext"><span>标题左内容</span><input type="text" class="footl_text" value="首页"/></div>'+
	       							'<div class="fill_attrPtext" ><span>标题中内容</span><input type="text" class="footm_text" value="首页"/></div>'+
	       							'<div class="fill_attrPtext"><span>标题右内容</span><input type="text" class="footr_text" value="首页"/></div>'+
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
		        $(this).addClass("shodwh");
		        $(".header").removeClass("shodwh");
		        Mobile_page.init_pagefoot();
		    });
		    $('body').on('keyup','.footl_text',function(){//尾导航左文本内容
		       	$(".foot_index").text($(this).val());
		       	$(".footer").attr("footl_text",$(this).val()); 	 		
		    });
		    $('body').on('keyup','.footm_text',function(){//尾导航中文本内容
		       	$(".foot_search").text($(this).val());
		       	$(".footer").attr("footm_text",$(this).val()); 	  		
		    });
		    $('body').on('keyup','.footr_text',function(){//尾导航右文本内容
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
       							'<div class="fill_attrPbottom"><button class="nav_add">增加</button><button class="nav_delet">删除</button><button class="nav_up">上移</button><button class="nav_down">下移</button></div>'+    						
	       						'</fieldset>'+
	       						'<fieldset class="rect_line"><legend class="rect_text">导航配置</legend>'+
	       							'<div class="fill_attrP3"><button class="add_page add_pages">添加分页</button><button class="delet_page">删除分页</button></div>'+
	       							'<div class="fill_attrP3"><select id="nav_num" class="fill_attrp fill_attrP2-nav"><option value="0">主页</option></select></div>'+
									'<div class="fill_attrP3"><span>配置链接 :</span><input type="text" class="fill_attrP3-text"/></div>'+
	       							'<div class="fill_attrP2"><select id="nav_nums" class="fill_attrP2-nav"><option value="0">主页</option></select><button id="nav_config" class="fill_attrP2-nav-button">确认</button></div>'+		
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
		    /*********修改选中导航块文本内容*********/
		    $('body').on('keyup','.nav_tex',function(){
		    	if(me.find(".nav_two").length === 0){
		    		me.find(".nav_text").text($(this).val());
		    	}else{
		    		me.find(".nav_two").eq(index_two).find(".nav_text").text($(this).val());
		    	}
		    });
		    /***********文字颜色修改*********/
		    $('body').on('change','.nav_texc',function(){
		    	if(me.find(".nav_two").length === 0){
		    		me.find(".nav_text").css("color",$(this).val());
		    		me.find(".nav_text").attr("navtextc",$(this).val());
		    	}else{
		    		me.find(".nav_two").eq(index_two).find(".nav_text").css("color",$(this).val());
		    		me.find(".nav_two").eq(index_two).find(".nav_text").attr("navtextc",$(this).val());
		    	}
		    });
		    /************添加分页***********/
		    $('body').on('click','.add_page',function(){
		    	k = k + 1;
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
		    	}
		    });
		    /************选择分页************/
		    $("body").on("change","#nav_num",function(){
		    	kk_ = parseInt($(this).val());
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
		    		}else{
		    			k_ = kk;		    			
		    			$("#nav_num").val(kk);
		    			$(".content_1-"+kk).css("display","block");
		    			$(".content_1-"+kk).siblings("div.content_1").css("display","none");	
		    		}	    				    			    				    		
		    	}
		    });
		    /************导航添加*********/
		    $('body').on('click','.nav_add',function(){
                var nav_type = $(".content").attr("radio");
                var nav_One = $('<div class="nav_1"><div class="nav_11  nav_bod nav_shodw"><p class="nav_text nav_pos"></p><div class="close_btn"></div></div></div>');
                var nav_Two = $('<div class="nav_1"><div class="nav_11"><div class="nav_two nav_bod nav_21 nav_shodw lf"><p class="nav_text"></p></div><div class="nav_two nav_bod nav_22 lf"><p class="nav_text"></p><div class="close_btn"></div></div></div></div>');
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
		    /**********双栏导航模块选中操作******/
		    $('body').on('click','.nav_two',function(){
		     	index_two = $(this).index();
		     	$(this).addClass("shodwf");
		     	$(this).siblings("div.nav_two").removeClass("shodwf");
		     	$(this).parents("div.nav_1").siblings("div.nav_1").find("div.nav_two").removeClass("shodwf");
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
		     		if(me.find(".nav_two").length === 0){
		     			me.attr("page_config",pag);
			    	}else{
			    		me.find(".nav_two").eq(index_two).attr("page_config",pag)
			    	}
		     	}else{
		     		alert("请选择要配置的分页！");
		     	}		    	
		    });
		},
		edit_pages : function(){
			window.onscroll = function(){
			    $("body").width($(window).width()+document.body.scrollLeft);			    
			};
			window.onresize = function(){
				$(".nav_contain").height($(window).height());
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
	        $(".nav_tex").val(me.find(".nav_text").text());
	    	/********文本颜色初始化*****/
	    	if(me.find(".nav_two").length === 0){
	    		$(".nav_texc").val(me.find(".nav_text").attr("navtextc"));
	    	}else{
	    		$(".nav_texc").val(me.find(".nav_two").eq(index_two).find(".nav_text").attr("navtextc"));	    		
	    	}
	    	$("#nav_nums").html($("#nav_num").html());
		}
	}
	Mobile_page.media();
    Mobile_page.ispc();
    Mobile_page.nav();
    // Mobile_page.loadpage(); 
    if(is_PC === true){
 		Mobile_page.edit_page();
 		Mobile_page.edit_pages();
    }else{
    	  Mobile_page.loadpage(); 
    }
},1000);

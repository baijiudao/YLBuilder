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
    var address = document.location.hostname;
    var addressArr;
    var host;
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;//正则IP
    if(address != ''){
        if (address == "localhost" || address == '127.0.0.1'){
            host = 'ws://127.0.0.1:32767/';
        }else{
            if(reg.test(address)){
                host = 'ws://'+address+':32767/';
            }else{
                host = 'ws://'+address+':15011/';
            }
        }
    }else{
        var newAddess = localStorage.getItem("newAddess");
        if(newAddess != null){
            host = 'ws://'+newAddess+':32767/';
        }
    }
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
    //回车登录
    var keyLogin = function(event) {
        if (event.keyCode == 13) {
            var pass = $("#passWord").val();
            var user= $("#userName").val();
            if(pass != '' && user != '') {
                if ($('.hided').css('display') != 'none') {
                    WebsocketLogin.send(loginSendData(user, pass));
                }
            } else {
                alert("亲：密码或用户名不能为空！");
            }
        }
    }
    $('body').on('keydown', function(event) {
        keyLogin(event);
    });
})
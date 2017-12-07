//初始化
var cookval = new Cook();
/**************创建控件时，位置校验************/
var imp = new contrlPosition();
//增加控件
/****文本控件*********/
var inItTextControl = new TextControl();
/*********进度条控件********/
var inItProControl = new ProgressBar();
/*******按钮控件****/
var inItButtonControl = new Button();
/************微调控件**************/
var inItMinorControl = new MinorAdjustment();
/*********编辑框控件********/
var inItEditControl = new EditBox();
/*********列表框控件*********/
var inItListControl = new ListBox();
/********复选按钮**********/
var inItCheckBoxControl = new CheckBox();
/********直线运动**********/
var inItStraightControl = new StraightMotion();
/************旋转控件************/
var inItRotateControl = new Rotate();
/***********图表控件*********/
var inItChartControl = new Chart();
//开关控件
var inItSwitchControl = new SwitchControl();
//场景组态控件
var inItSceneControl = new SceneControl();
//组合框控件
var inItComboBoxControl = new ComboBox();
//历史事件控件
var inItHistoryEventControl = new HistoryEventControl();
//历史报警控件
var inItHistoryAlarmControl = new HistoryAlarmControl();
//对齐控件
var alignments = new AlignEvents();
//删除控件
var inItDelete = new Delete();
//填充控件
var inItFillControl = new FillControl();
//表盘控件
var inItDialControl = new DialControl();
//单选框控件
var inItRadioControl = new RadioControl();
//滑杆控件
var inItSlideBarControl = new SlideBarControl();
//状态控件
var inItStatusControl = new StatusControl();
//实时报警控件
var inItRealTimeAlarmControl = new RealTimeAlarmControl();
//属性页
var inItPropertiesPage = new Show();
//电梯控件
var inItElevatorControl = new ElevatorControl();
//插图控件
var inItPicControl = new PictureControl();
//海康视频控件
var inItHKVideoControl = new HKVideoControl();
//通信测试控件
var inItCommunicateControl = new CommunicateTestControl();
//移动端
var inItRemovalshitcateControl = new RemovalshitControl();
//通用视频控件
var inItVideoControl = new VideoControl();
//管道控件
var inItPipelineControl = new Pipeline();
//组控控件
var inItBatchControl = new BatchControl();
//组合控件
//var inItassembleControl = new assembleControl();
//单多选
var inItSelectMode = new SelectMode();
//元素Id集
var inItAllElementId = new AllElementId();
//控件样式编辑类
var inItSetCtrStyle = new SetCtrStyle();
inItAllElementId.recordAllElementID();
//设置画布body的大小
var inItSetSize = new CanvasSize();
//初始化撤销、回复log
var inTtCommand = new Command();
//初始化模态框
var inItModalFeature = new ModalFeature();
/**************设置body大小和画布大小相同**********/
$("body").height ($("#bgDiv").height());

/*******动态向body中添加背景div和容器div*********/
$(function(){
    if($("#bgDiv").length == 0 && $("#content").length == 0)
    {
        var bgDiv = $('<div id="bgDiv" class="bgdiv"></div>');
        var content = $('<div id="content"></div>');
        $("body").prepend(bgDiv);
        $("body").prepend(content);
    }
    $("body").on("click","#bgDiv",function(){
        $("body").width($(window).width());
    });
});


/**********禁止选中文本兼容多种主流浏览器*************/
$(document).ready(function(){
    $("div").css({
        '-moz-user-select':'-moz-none',
        '-moz-user-select':'none',
        '-o-user-select':'none',
        '-khtml-user-select':'none',
        '-webkit-user-select':'none',
        '-ms-user-select':'none',
        'user-select':'none'
    }).bind('selectstart',function(){
        return false;
    });
    $("input").css({
        '-moz-user-select':'-moz-none',
        '-moz-user-select':'none',
        '-o-user-select':'none',
        '-khtml-user-select':'none',
        '-webkit-user-select':'none',
        '-ms-user-select':'none',
        'user-select':'none'
    }).bind('selectstart',function(){
        return false;
    });
});

var webapi = new function () {
    this.webUndo;
    this.webRedo;
    this.addLog;
    this.getImagePath;
    this.getVideoPath;
    this.setRelativePath;
    this.getPath;
    this.getSvgPath;
};
//为后台插入图片/背景定义的接口
var getRelativePath = function() {
    webapi.setRelativePath('images');
};





/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  Include.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               主要存放需要翻译的信息
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/8/1
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include <qglobal.h>
#include <QString>
#include <QDebug>
#include "PicEditRes/PicEditToolBarWidget.h"
#if defined(_MSC_VER) && (_MSC_VER >= 1600)  
# pragma execution_character_set("utf-8")  
#endif

const QString PATTEN_TYPE = "[\\\\/:|*?\"<>]";
const QString IMAGE_TYPE = "Images(*.png *.xpm *.jpg *.svg *.bmp *.gif *.svg)";


typedef struct CAMERA_CONFIG_DATA
{
	int id = 0;
	QString url = "";
	int outputPort = 0;
	int inputPort = 0;
	int videoWidth = 0;
	int videoHeight = 0;
}CAMERA_CONFIG_DATA_S;

//baseFrame
static const char *c_sBaseFrame = "BaseFrame";
static const char *c_sBaseFrameWarnning = QT_TRANSLATE_NOOP("BaseFrame", "WARN");
static const char *c_sOK = QT_TRANSLATE_NOOP("BaseFrame", "OK");
static const char *c_sCancel = QT_TRANSLATE_NOOP("BaseFrame", "Cancel");
static const char *c_sExistTempFile = QT_TRANSLATE_NOOP("BaseFrame", "The file is not saved, whether it is closed?");

//项目
static const char *c_sWEFrame = "WebEditFrame";
static const char *c_sWEFrameDockProj = QT_TRANSLATE_NOOP("WebEditFrame", "DockProj");
static const char *c_sWEFrameDockControl = QT_TRANSLATE_NOOP("WebEditFrame", "DockControl");
static const char *c_sWEFileRibbonPage = QT_TRANSLATE_NOOP("WebEditFrame", "Project");
static const char *c_sWENewHtmlFile = QT_TRANSLATE_NOOP("WebEditFrame", "NewHtmlFile");
static const char *c_sWEOpenHtmlFile = QT_TRANSLATE_NOOP("WebEditFrame", "OpenHtmlFile");
static const char *c_sNoFile = QT_TRANSLATE_NOOP("WebEditFrame", "The file does not exist!");
static const char *c_sIsExistTempFile = QT_TRANSLATE_NOOP("WebEditFrame", "The file is not saved, whether to skip?");
static const char *c_sIsCoverProject = QT_TRANSLATE_NOOP("WebEditFrame", "Whether to cover the current project?");
static const char *c_sIsCoverImage = QT_TRANSLATE_NOOP("WebEditFrame", "The existence of the same name file, whether to cover?");
static const char *c_sScenceAddHtmlError = QT_TRANSLATE_NOOP("WebEditFrame", "Can not add, the selected page must be the same page or the next level of the current page.");

//文件
static const char *c_sWebFileFrame = "WebFileEditFrame";
static const char *c_sWebFileFrameFile = QT_TRANSLATE_NOOP("WebFileEditFrame", "FileTitle");

//标签页
static const char *c_sTabWidget = "BaseTabWidget";
static const char *c_sWEFrameTabEdit = QT_TRANSLATE_NOOP("BaseTabWidget", "EditPage");
static const char *c_sWEFrameTabSrc = QT_TRANSLATE_NOOP("BaseTabWidget", "SrcPage");
static const char *c_sWEFrameTabView = QT_TRANSLATE_NOOP("BaseTabWidget", "ViewPage");

static const char *c_sCloseWeb = QT_TRANSLATE_NOOP("BaseTabWidget", "Close");
static const char *c_sSave = QT_TRANSLATE_NOOP("BaseTabWidget", "Save");
static const char *c_sSaveAs = QT_TRANSLATE_NOOP("BaseTabWidget", "Save As");
static const char *c_sTabWarning = QT_TRANSLATE_NOOP("BaseTabWidget", "Warning");
static const char *c_sErrorPathWarning = QT_TRANSLATE_NOOP("BaseTabWidget", "This directory is not the current project directory!");

//创建项目对话框
static const char *c_sCreateProjectDlg = "CreateProjectDialog";
static const char *c_sCreateProjectDlgTitle = QT_TRANSLATE_NOOP("CreateProjectDialog", "Create Project");
static const char *c_sProjectNameLabel = QT_TRANSLATE_NOOP("CreateProjectDialog", "Project Name:");
static const char *c_sPathLabel = QT_TRANSLATE_NOOP("CreateProjectDialog", "Save Path:");
static const char *c_sChoosePathBtn = QT_TRANSLATE_NOOP("CreateProjectDialog", "Choose Path");
static const char *c_sOKBtn = QT_TRANSLATE_NOOP("CreateProjectDialog", "OK");
static const char *c_sCancelBtn = QT_TRANSLATE_NOOP("CreateProjectDialog", "Cancel");
static const char *c_sWarning = QT_TRANSLATE_NOOP("CreateProjectDialog", "Warning");
static const char *c_sProjectNameWarning = QT_TRANSLATE_NOOP("CreateProjectDialog", "The project name can not be empty!");
static const char *c_sProjectNameErroWarning = QT_TRANSLATE_NOOP("CreateProjectDialog", "The name can not contain the following characters!");
static const char *c_sProjectPathWarning = QT_TRANSLATE_NOOP("CreateProjectDialog", "The project Path can not be empty!");

//设置尺寸对话框
static const char *c_sSetCanvasSizeDlg = "SetCanvasSizeDlg";
static const char *c_sSCSDlgTitle = QT_TRANSLATE_NOOP("SetCanvasSizeDlg", "Title");
static const char *c_sSCSDlgLabelWidth = QT_TRANSLATE_NOOP("SetCanvasSizeDlg", "Width");
static const char *c_sSCSDlgLabelHeight = QT_TRANSLATE_NOOP("SetCanvasSizeDlg", "Height");
static const char *c_sSCSDlgOKBtn = QT_TRANSLATE_NOOP("SetCanvasSizeDlg", "OKBtn");

//设置标题
static const char *c_sSetWebTitleDlg = "SetWebTitleDlg";
static const char *c_sSWTDlgTitle = QT_TRANSLATE_NOOP("SetWebTitleDlg", "Title");
static const char *c_sSWTDlgLabel = QT_TRANSLATE_NOOP("SetWebTitleDlg", "Label");
static const char *c_sSWTDlgOKBtn = QT_TRANSLATE_NOOP("SetWebTitleDlg", "OKBtn");

//项目管理
static const char *c_sProjectWidget = "ProjectManagerWidget";

static const char *c_sProjectWidgetTitle = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Title");

static const char *c_sNewFIle = QT_TRANSLATE_NOOP("ProjectManagerWidget", "new Html");
static const char *c_sDeleteFile = QT_TRANSLATE_NOOP("ProjectManagerWidget", "delete");
static const char *c_sNewFolder = QT_TRANSLATE_NOOP("ProjectManagerWidget", "new Folder");
static const char *c_sAddFile = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Add Html");
static const char *c_sAddFolder = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Add Folder");

static const char *c_sRightDeleteHtml = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Delete");
static const char *c_sRightRename = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Rename");
static const char *c_sRightCopy = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Copy");
static const char *c_sRightPaste = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Paste");

static const char *c_sError = QT_TRANSLATE_NOOP("ProjectManagerWidget", "ERROR");
static const char *c_sWarnning = QT_TRANSLATE_NOOP("ProjectManagerWidget", "WARN");
static const char *c_sNoSelect = QT_TRANSLATE_NOOP("ProjectManagerWidget", "No item selected");
static const char *c_sExistSameName = QT_TRANSLATE_NOOP("ProjectManagerWidget", "There is a file with the same name!");
static const char *c_sWSelectFolder = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Please select a folder!");
static const char *c_sWSelectAddSit = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Please select the location you added!");
static const char *c_sExitName = QT_TRANSLATE_NOOP("ProjectManagerWidget", "There is a file with the same name!");
static const char *c_sIsDeleteFile = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Are you sure you want to delete this file?");
static const char *c_sEditFileFormat = QT_TRANSLATE_NOOP("ProjectManagerWidget", "Make sure to modify the file format?");

//工具条
static const char *c_sWEBWidget = "WebEditToolBarWidget";

static const char *c_sWEFileRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "File");
static const char *c_sWENewFile = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "New Html");
static const char *c_sWEOpenFile = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Open Html");
static const char *c_sWESaveFile = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Save Html");
static const char *c_sWECloseFile = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Close Html");

static const char *c_sWEProjectRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Project");
static const char *c_sWENewProject = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "New Project");
static const char *c_sWEOpenProject = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Open Project");
static const char *c_sWESaveProject = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Save Project");
static const char *c_sWECloseProject = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Close Project");

static const char *c_sWEEditFileRibbonPage = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Edit");
static const char *c_sWEEditRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "EditGroup");
static const char *c_sWECopy = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Copy");
static const char *c_sWEPaste = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Paste");
static const char *c_sWESelectAll = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SelectAll");
static const char *c_sWEDelete = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Delete");
static const char *c_sWEUndo = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Undo");
static const char *c_sWERedo = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Redo");

static const char *c_sWEAlignRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "AlignGroup");
static const char *c_sWEAlignTop = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "AlignTop");
static const char *c_sWEAlignBottom = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "AlignBottom");
static const char *c_sWEAlignLeft = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "AlignLeft");
static const char *c_sWEAlignRight = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "AlignRight");
static const char *c_sWEAlignVertical = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "VerticalAlign");
static const char *c_sWEAlignHorizontal = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "HorizontalAlign");

static const char *c_sWEEquidistantRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "EquidistantGroup");
static const char *c_sWEEquidistantVertical = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "VerticalEquidistant");
static const char *c_sWEEquidistantHorizontal = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "HorizontalEquidistant");

static const char *c_sWESizeRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SizeGroup");
static const char *c_sWESameWidth = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SameWidth");
static const char *c_sWESameHeight = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SameHeight");
static const char *c_sWESameSize = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SameSize");

static const char *c_sWEPageSettingRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "PageSettingGroup");
static const char *c_sWESetTitle = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SetTitle");
static const char *c_sWESetPageSize = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "SetPageSize");

static const char *c_sWEZoomRibbonGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Zoom");
static const char *c_sWEZoomNormal = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "ZoomNormal");
static const char *c_sWEZoomIn = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "ZoomIn");
static const char *c_sWEZoomOut = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "ZoomOut");

static const char *c_sWEImageGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Insert");
static const char *c_sWEInsertImage = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Image");
static const char *c_sWEInsertBackground = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Background");

static const char *c_sWECamera = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "Camera");
static const char *c_sWECameraConfigGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "CameraConfig");

static const char *c_sWEEditViewRibbonPage = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "View");
static const char *c_sWEDockViewGroup = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "DockViewGroup");
static const char *c_sWEProjDockShow = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "ProjDockShow");
static const char *c_sWEControlDockShow = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "ControlDockShow");
static const char *c_sWEFrameResWindow = QT_TRANSLATE_NOOP("WebEditToolBarWidget", "IcgDockShow");

//摄像头
static const char *c_sCameraDialog       = "CameraConfigDialog";
static const char *c_sCameraConfig       = QT_TRANSLATE_NOOP("CameraConfigDialog", "Camera Configuration List");

static const char *c_sCameraConfigId     = QT_TRANSLATE_NOOP("CameraConfigDialog", "Id");
static const char *c_sCameraConfigRtsp   = QT_TRANSLATE_NOOP("CameraConfigDialog", "Rtsp_addr");
static const char *c_sCameraConfigExPort = QT_TRANSLATE_NOOP("CameraConfigDialog", "ExPort");
static const char *c_sCameraConfigImPort = QT_TRANSLATE_NOOP("CameraConfigDialog", "ImPort");
static const char *c_sCameraConfigImageW = QT_TRANSLATE_NOOP("CameraConfigDialog", "ImageWidth");
static const char *c_sCameraConfigImageH = QT_TRANSLATE_NOOP("CameraConfigDialog", "ImageHeight");

static const char *c_sCameraConfigAdd    = QT_TRANSLATE_NOOP("CameraConfigDialog", "Add");
static const char *c_sCameraConfigDelete = QT_TRANSLATE_NOOP("CameraConfigDialog", "Delete");
static const char *c_sCameraConfigEdit   = QT_TRANSLATE_NOOP("CameraConfigDialog", "Edit");

static const char *c_sRTSPWarning = QT_TRANSLATE_NOOP("CameraConfigDialog", "The RTSP addr can not be empty!");
static const char *c_sParamWarning = QT_TRANSLATE_NOOP("CameraConfigDialog", "Can not have less than zero parameters!");

static const char *c_sPortWarning = QT_TRANSLATE_NOOP("CameraConfigDialog", "The output and input ports can not be equal!");
static const char *c_sExistPortWarning = QT_TRANSLATE_NOOP("CameraConfigDialog", "This port already exists!");

//摄像头配置页面
static const char *c_sCameraSetupDialog = "SetUpDialog";

static const char *c_sCameraSetupShow = QT_TRANSLATE_NOOP("SetUpDialog", "Camera Settings");
static const char *c_sCameraSetupRtsp = QT_TRANSLATE_NOOP("SetUpDialog", "Rtsp_addr:");
static const char *c_sCameraSetupInput = QT_TRANSLATE_NOOP("SetUpDialog", "ImPort:");
static const char *c_sCameraSetupOutput = QT_TRANSLATE_NOOP("SetUpDialog", "ExPort:");
static const char *c_sCameraSetupImageW = QT_TRANSLATE_NOOP("SetUpDialog", "Image Width:");
static const char *c_sCameraSetupImageH = QT_TRANSLATE_NOOP("SetUpDialog", "Image Height:");

//
static const char *c_sIcgPreviewDialog = "IcgPreviewDialog";

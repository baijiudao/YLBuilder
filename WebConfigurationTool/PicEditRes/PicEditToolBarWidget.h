#ifndef PICEDITTOOLBARWIDGET_H
#define PICEDITTOOLBARWIDGET_H

#include <QRadioButton>
#include <QCheckBox>
#include <QButtonGroup>
#include <QMap>
#include <QFontComboBox>
#include <QtitanRibbon.h>


#include "MainGraphicsView.h"
//#include "PicStorDockWidget.h"
#include "BaseDockWidget.h"
#include "IcgManagerWidget.h"
static const char *c_sPicEditFrame = "PicEditFrame";

static const char *c_sPicEditFrameDrawTools = QT_TRANSLATE_NOOP("PicEditFrame", "DrawTools");
static const char *c_sPicEditFrameGroupDrawTool = QT_TRANSLATE_NOOP("PicEditFrame", "Draw");
static const char *c_sPicEditFrameDrawSelect = QT_TRANSLATE_NOOP("PicEditFrame", "Select");
static const char *c_sPicEditFrameDrawLine = QT_TRANSLATE_NOOP("PicEditFrame", "Line");
static const char *c_sPicEditFrameDrawRectangle = QT_TRANSLATE_NOOP("PicEditFrame", "Rectangle");
static const char *c_sPicEditFrameDrawEllipse = QT_TRANSLATE_NOOP("PicEditFrame", "Ellipse");
static const char *c_sPicEditFrameDrawRouRect = QT_TRANSLATE_NOOP("PicEditFrame", "RoundedRectangle");
static const char *c_sPicEditFrameDrawPolygon = QT_TRANSLATE_NOOP("PicEditFrame", "Polygon ");
static const char *c_sPicEditFrameDrawText = QT_TRANSLATE_NOOP("PicEditFrame", "Text");
static const char *c_sPicEditFrameDrawPicture = QT_TRANSLATE_NOOP("PicEditFrame", "Picture");

//通用工具栏
static const char *c_sPicEditFrameGroupComTool = QT_TRANSLATE_NOOP("PicEditFrame", "CommonTool");
static const char *c_sPicEditFrameNewFile = QT_TRANSLATE_NOOP("PicEditFrame", "NewFile");
static const char *c_sPicEditFrameSaveFile = QT_TRANSLATE_NOOP("PicEditFrame", "SaveFile");
static const char *c_sPicEditFrameSaveAsFile = QT_TRANSLATE_NOOP("PicEditFrame", "SaveAsFile");
static const char *c_sPicEditFrameOpenFile = QT_TRANSLATE_NOOP("PicEditFrame", "OpenFile");
static const char *c_sPicEditFrameCloseFile = QT_TRANSLATE_NOOP("PicEditFrame", "CloseFile");

//样式工具栏
static const char *c_sPicEditFrameGroupStyleTool = QT_TRANSLATE_NOOP("PicEditFrame", "StyleTool");
static const char *c_sPicEditFrameFontWide = QT_TRANSLATE_NOOP("PicEditFrame", "Wide");
static const char *c_sPicEditFrameFontItalic = QT_TRANSLATE_NOOP("PicEditFrame", "Italic");
static const char *c_sPicEditFrameFontUnderline = QT_TRANSLATE_NOOP("PicEditFrame", "Underline");
static const char *c_sPicEditFrameForegroundColor = QT_TRANSLATE_NOOP("PicEditFrame", "ForegroundColor");

//操作工具栏
static const char *c_sPicEditFrameGroupOptTool = QT_TRANSLATE_NOOP("PicEditFrame", "OperateTool");
static const char *c_sPicEditFrameAssemble = QT_TRANSLATE_NOOP("PicEditFrame", "AssembleButton");
static const char *c_sPicEditFrameCancelAss = QT_TRANSLATE_NOOP("PicEditFrame", "CancelAssemble");

static const char *c_sPicEditFrameBestBefore = QT_TRANSLATE_NOOP("PicEditFrame", "BestBefore");
static const char *c_sPicEditFrameBestAfter = QT_TRANSLATE_NOOP("PicEditFrame", "BestAfter");
static const char *c_sPicEditFrameBefore = QT_TRANSLATE_NOOP("PicEditFrame", "Before");
static const char *c_sPicEditFrameAfter = QT_TRANSLATE_NOOP("PicEditFrame", "After");

static const char *c_sPicEditFrameAlignLeft = QT_TRANSLATE_NOOP("PicEditFrame", "AlignLeft");
static const char *c_sPicEditFrameAlignRight = QT_TRANSLATE_NOOP("PicEditFrame", "AlignRight");
static const char *c_sPicEditFrameAlignTop = QT_TRANSLATE_NOOP("PicEditFrame", "AlignTop");
static const char *c_sPicEditFrameAlignBottom = QT_TRANSLATE_NOOP("PicEditFrame", "AlignBottom");

static const char *c_sPicEditFrameAliHorCenter = QT_TRANSLATE_NOOP("PicEditFrame", "AlignHorizontalCenter");
static const char *c_sPicEditFrameAliVerCenter = QT_TRANSLATE_NOOP("PicEditFrame", "AlignVerticalCenter");
static const char *c_sPicEditFrameHorSpacing = QT_TRANSLATE_NOOP("PicEditFrame", "HorizontalSpacing");
static const char *c_sPicEditFrameVerSpacing = QT_TRANSLATE_NOOP("PicEditFrame", "VerticalSpacing");

static const char *c_sPicEditFramePageHorCenter = QT_TRANSLATE_NOOP("PicEditFrame", "PageHorizontalCenter");
static const char *c_sPicEditFramePageVerCenter = QT_TRANSLATE_NOOP("PicEditFrame", "PageVerticalCenter");

static const char *c_sPicEditFrameDownwardMovement = QT_TRANSLATE_NOOP("PicEditFrame", "DownwardMovement");
static const char *c_sPicEditFrameUpwardMovement = QT_TRANSLATE_NOOP("PicEditFrame", "UpwardMovement");
static const char *c_sPicEditFrameLeftMovement = QT_TRANSLATE_NOOP("PicEditFrame", "LeftMovement");
static const char *c_sPicEditFrameRightMovement = QT_TRANSLATE_NOOP("PicEditFrame", "RightMovement");

static const char *c_sPicEditFrameRotate = QT_TRANSLATE_NOOP("PicEditFrame", "ArbitraryRotate");
static const char *c_sPicEditFrameTurnLeft = QT_TRANSLATE_NOOP("PicEditFrame", "TurnLeft");
static const char *c_sPicEditFrameTurnRight = QT_TRANSLATE_NOOP("PicEditFrame", "TurnRight");

static const char *c_sPicEditFrameHorFlip = QT_TRANSLATE_NOOP("PicEditFrame", "HorizontalFlip");
static const char *c_sPicEditFrameVerFlip = QT_TRANSLATE_NOOP("PicEditFrame", "VerticalFlip");

//停靠窗口栏
static const char *c_sPicEditFrameGroupDockTool = QT_TRANSLATE_NOOP("PicEditFrame", "DockingWindows");
static const char *c_sPicEditFrameResWindow = QT_TRANSLATE_NOOP("PicEditFrame", "PicResWindow");

//提示
static const char *c_sPicEditFrameSVGFileType = QT_TRANSLATE_NOOP("PicEditFrame", "SVGFileType");
static const char *c_sPicEditSVGFileIsNotPro = QT_TRANSLATE_NOOP("PicEditFrame", "SVGFileIsNotPro");
static const char *c_sPicEditThisSVGIsOpen = QT_TRANSLATE_NOOP("PicEditFrame", "ThisSVGIsOpen");
static const char *c_sPicEditSVGSaveType = QT_TRANSLATE_NOOP("PicEditFrame", "SVGSaveType");

//图库
static const char *c_sPicStorEditFrame = "PicStorEditFrame";
static const char *c_sPicStorEditFrameDrawTools = QT_TRANSLATE_NOOP("PicEditFrame", "PictureStorage");
static const char *c_sPicEditFrameStorResWindow = QT_TRANSLATE_NOOP("PicEditFrame", "StorPicResWindow");

static const char *c_sPicStorEditFrameNew = QT_TRANSLATE_NOOP("PicEditFrame", "NewStorPic");
static const char *c_sPicStorEditFrameOpen = QT_TRANSLATE_NOOP("PicEditFrame", "OpenStorPic");
static const char *c_sPicStorEditFrameSave = QT_TRANSLATE_NOOP("PicEditFrame", "SaveStorPic");
static const char *c_sPicStorEditFrameAsSave = QT_TRANSLATE_NOOP("PicEditFrame", "AsSaveStorPic");
static const char *c_sPicStorEditFrameClose = QT_TRANSLATE_NOOP("PicEditFrame", "CloseStorPic");

static const char *c_sPicStorICGType = QT_TRANSLATE_NOOP("PicStorEditFrame", "ICGType");
static const char *c_sPicStorCloseICGWarning = QT_TRANSLATE_NOOP("PicStorEditFrame", "CloseICGWaring");
static const char *c_sPicStorSaveICGWarning = QT_TRANSLATE_NOOP("PicStorEditFrame", "SaveICGWaring");
static const char *c_sPicStorRes = QT_TRANSLATE_NOOP("PicStorEditFrame", "StorRes");


enum  PICUI_TYPE
{
	PICNONE_TYPE = 0,
	UI_PIC,
	UI_PICSTOR
};
class PicEditToolBarWidget : public QObject//, public MessageTransmiter
{
	Q_OBJECT

public:
    PicEditToolBarWidget(int type, RibbonPage *page, QWidget *parent = 0);
    ~PicEditToolBarWidget();

	void setPicMainFrame(MainGraphicsView *pWidget);

    void createStrPtrMap();

	void init();
	void retranslate();
	//void setToolWidgetEnable(bool state); 
	//void sendImagePathToJs(QString path);

private:
    void makeWidget();
	//void changeEvent(QEvent *e);
	/*
	void webCmd(QString cmd);
	void makeFileRibbon();
	void makeProjectRibbon();*/
	
public Q_SLOTS :
    /*void onOperateBack();
    void onOperateForward();
    void onOperateCopy();
    void onOperatePaste();*/

    /*
    void onItemOriPos(QGraphicsItem *item);
    void onItemChange(QGraphicsItem *item);*/

    //void onNewSVG();
    //void onSaveSVG();
    //void onSaveAsSVG();
    //void onOpenSVG();
    //void onCloseSVG();

    void onRadioDrawToolChange();

    void onAssemble();
    void onCancelAss();
    void onBestBefore();
    void onBestAfter();
    void onBefore();
    void onAfter();
    void onAlignLeft();
    void onAlignRight();
    void onAlignTop();
    void onAlignBottom();
    void onAliHorCenter();
    void onAliVerCenter();
    void onHorSpacing();
    void onVerSpacing();
    void onPageHorCenter();
    void onPageVerCenter();
    void onDownwardMovement();
    void onUpwardMovement();
    void onLeftMovement();
    void onRightMovement();
    void onRotate(bool isCheck);
    void onTurnLeft();
    void onTurnRight();
    void onHorFlip();
    void onVerFlip();

    void onFontBold(bool tag);
    void onFontItalic(bool tag);
    void onFontUnderline(bool tag);
    void onForegroundColor();

    void onSetFontComboBox(QString font);
    void onSetFontSizeComboBox(QString size);

    void onSetItemMove(QPointF movePos);
   
    void onIconStatus(int count, FontStyle style = FontStyle(), bool isExistPic = false);
    void onSetDrawIconStatus(bool bAble);
public:
    QMap<QString, QAbstractButton*> m_abstractButtonsMap;
    QMap<QString, QAction*> m_actionsMap;
private:
	int m_type;

    Qtitan::RibbonPage*  m_pageDrawTool;
	
    QMap<QString, const char *> m_charPtrMap;
    QMap<QString, Qtitan::RibbonPage*> m_ribbonPageMap;
    QMap<QString, Qtitan::RibbonGroup*> m_ribbonGroupMap;

    QButtonGroup *m_btnGroupDraw;
    QFontComboBox *m_fontComboBox;
    QComboBox *m_SizeComboBox;

    QWidget *pm_parent;
    MainGraphicsView *m_pMainWidget;
};

#endif
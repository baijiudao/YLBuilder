/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  WebEditToolBarWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:                网页编辑工具条类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/13
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include "Include.h"
#include <QObject>
#include <QWidget>
#include <QtitanRibbon.h>
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include <QtitanRibbon.h>
#include "MoudleName.h"
#include "QWebEngineEditView.h"

enum  UI_TYPE
{
	NONE_TYPE = 0,
	UI_FILE,
	UI_PROJECT
};
class WebEditToolBarWidget : public QWidget, public MessageTransmiter
{
	Q_OBJECT

public:
	WebEditToolBarWidget(int type, RibbonPage *page, QWidget *parent = 0);
	~WebEditToolBarWidget();

	void setWebEngineer(QWebEngineEditView *engineer);
	void init();
	void retranslate();
	void setToolWidgetEnable(bool state); 
	void sendImagePathToJs(QString path);
	QMap<QString, QAction*> m_actionsMap;
	QMap<QString, QAbstractButton*> m_abstractButtonsMap;


private:
	void changeEvent(QEvent *e);
	void makeWidget();
	void webCmd(QString cmd);
	void makeFileRibbon();
	void makeProjectRibbon();
	
private slots:
	void onSetWebTitle();
	void onSetWebSize();

	void onSelectAll();
	void onCopy();
	void onPaste();
	void onDelete();
	void onUndo();
	void onRedo();

	void onAlignTop();
	void onAlignBottom();
	void onAlignLeft();
	void onAlignRight();
	void onAlignHorizontal();
	void onAlignVertical();

	void onEquidistantHorizontal();
	void onEquidistantVertical();

	void onSameWidth();
	void onSameHeight();
	void onSameSize();

	void onZoomNormal();
	void onZoomIn();
	void onZoomOut();
	
	void insertImage();
	void insertBackGround();

	void setCamera();

private:
	int                                 m_type;
	RibbonPage                         *m_pWEEditRibbonPage;
	QWebEngineEditView                 *m_pWebEngineEditView;
	QMap<QString, Qtitan::RibbonGroup*> m_ribbonGroupMap;
};

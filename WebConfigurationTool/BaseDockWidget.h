
/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseDockWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/9/28
** Descriptions:               END
** 
*********************************************************************************************************/#pragma once

#include <QDockWidget>

class BaseDockWidget : public QDockWidget
{
	Q_OBJECT

public:
	BaseDockWidget(QWidget *parent);
	~BaseDockWidget();
protected:
	virtual void showEvent(QShowEvent *event) Q_DECL_OVERRIDE;
	virtual void hideEvent(QHideEvent *event) Q_DECL_OVERRIDE;
    void closeEvent(QCloseEvent *event) Q_DECL_OVERRIDE;

Q_SIGNALS:
	void controlDockShow(bool);
};

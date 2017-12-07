/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseItem.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               Item基类头文件
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/21
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include <QObject>
#include <QStandardItem>
class BaseItem : public QStandardItem
{
	//Q_OBJECT

public:
	BaseItem(QObject *parent = 0);
	~BaseItem();
	bool operator<(const QStandardItem & other) const;
};

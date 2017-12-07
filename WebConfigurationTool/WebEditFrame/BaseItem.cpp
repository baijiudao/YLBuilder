/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseItem.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               自定义Item
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/5/22
** Descriptions:               END
** 
*********************************************************************************************************/
#include "BaseItem.h"
#include <QFileInfo>
#include <QDebug>
BaseItem::BaseItem(QObject *parent)
	: QStandardItem()
{
	//不允许双击编辑项目名称
	this->setEditable(false);
}

BaseItem::~BaseItem()
{
}

/**        
 * @brief: 排序
 * @param[in]:  other
 */
bool BaseItem::operator<(const QStandardItem & other) const
{
	QString thisItem = this->data(Qt::UserRole).value<QString>();
	QString otherItem = other.data(Qt::UserRole).value<QString>();

	QFileInfo thisInfo(thisItem);
	QFileInfo otherInfo(otherItem);
	if ((otherInfo.isFile() && thisInfo.isFile()) || (thisInfo.isDir() && otherInfo.isDir()))
	{
		return QStandardItem::operator<(other);
	}
	else if (thisInfo.isFile() && otherInfo.isDir())
	{
		return false;
	}
	else if (thisInfo.isDir() && otherInfo.isFile())
	{
		return true;
	}	
	else if (this->rowCount() > 0 && other.rowCount() == 0)
	{
		return true;
	}
	else if (this->rowCount() > 0 && other.rowCount() > 0)
	{
		return QStandardItem::operator<(other);
	}
	else if (this->rowCount() == 0 && other.rowCount() == 0)
	{
		return QStandardItem::operator<(other);
	}
	else if (this->rowCount() == 0 && other.rowCount() > 0)
	{
		return false;
	}
	return false;
}
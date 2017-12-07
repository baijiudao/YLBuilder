#pragma once
#include <QObject>
#include <QItemDelegate>
/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  TreeViewDelegate.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               代理-主要处理重命名相关问题
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/8/1
** Descriptions:               END
** 
*********************************************************************************************************/
#include <QLineEdit>
class TreeViewDelegate : public QItemDelegate
{
	Q_OBJECT

public:
	TreeViewDelegate(QObject *parent);
	~TreeViewDelegate();
	QLineEdit *m_pLineEdit;
protected:
	QWidget* createEditor(
		QWidget* parent, 
		const QStyleOptionViewItem& option, 
		const QModelIndex& index) const;
	
	void setEditorData(
		QWidget* editor, 
		const QModelIndex& index) const;

	void setModelData(
		QWidget* editor, 
		QAbstractItemModel* model, 
		const QModelIndex& index) const;

	void updateEditorGeometry(
		QWidget* editor, 
		const QStyleOptionViewItem& option, 
		const QModelIndex& index) const;

private slots:
	//void slotEditClose(QWidget *editor, QAbstractItemDelegate::EndEditHint hint = NoHint);
};

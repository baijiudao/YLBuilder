/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  TreeViewDelegate.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               树形代理类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/5/24
** Descriptions:               END
** 
*********************************************************************************************************/
#include "TreeViewDelegate.h"
#include <QDebug>
TreeViewDelegate::TreeViewDelegate(QObject *parent)
	:QItemDelegate(parent)
	, m_pLineEdit(NULL)
{
}

TreeViewDelegate::~TreeViewDelegate()
{
}

/**        
 * @brief:        
 * @param[in]:  
 * @return: QWidget*
 */
QWidget* TreeViewDelegate::createEditor(QWidget* parent,
	const QStyleOptionViewItem& option,
	const QModelIndex& index) const
{
	QLineEdit* editor = NULL;
	if (index.isValid())
	{
		editor = new QLineEdit(parent);
		//限制最大只能输入32个字符  
		editor->setMaxLength(30);
		editor->setFixedHeight(20);  

	}
	return editor;
}

void TreeViewDelegate::setEditorData(QWidget* editor, const QModelIndex& index) const
{
	if (index.isValid())
	{
		QLineEdit* lineE = qobject_cast<QLineEdit*>(editor);
		lineE->setText(index.data(Qt::DisplayRole).toString());  
	}
}

void TreeViewDelegate::setModelData(
	QWidget* editor, 
	QAbstractItemModel* model, 
	const QModelIndex& index) const
{
	if (index.isValid())
	{
		QLineEdit* lineE = qobject_cast<QLineEdit*>(editor);
		model->setData(index, lineE->text());
	}
}

void TreeViewDelegate::updateEditorGeometry(
	QWidget* editor,
	const QStyleOptionViewItem& option,
	const QModelIndex& index) const
{
	editor->setGeometry(option.rect);
}


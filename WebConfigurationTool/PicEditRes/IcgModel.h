/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  IcgModel.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/30
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include <QAbstractListModel>
#include <QList>
#include <QPixmap>
class IcgModel : public QAbstractListModel
{
	Q_OBJECT

public:
	IcgModel(QObject *parent);
	~IcgModel();

	/**
	 * @brief:  设置文件路径
	 * @param[in]:  pixmaps-图片存放地址
	 */
	inline void loadData(const QStringList pixmaps)
	{
		m_pixmaps.clear();
		m_pixmaps = pixmaps;
	}
	QVariant data(const QModelIndex &index, int role = Qt::DisplayRole) const Q_DECL_OVERRIDE;
	
	Qt::ItemFlags flags(const QModelIndex &index) const Q_DECL_OVERRIDE;
	

	bool removeRows(int row, int count, const QModelIndex &parent) Q_DECL_OVERRIDE;

	bool dropMimeData(const QMimeData *data, Qt::DropAction action,
		int row, int column, const QModelIndex &parent) Q_DECL_OVERRIDE;
	
	QMimeData *mimeData(const QModelIndexList &indexes) const Q_DECL_OVERRIDE;
	
	QStringList mimeTypes() const Q_DECL_OVERRIDE;
	
	int rowCount(const QModelIndex &parent) const Q_DECL_OVERRIDE;
private:
	QStringList m_pixmaps;      //存放图片地址
};

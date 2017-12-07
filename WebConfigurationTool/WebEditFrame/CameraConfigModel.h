/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  CameraConfigModel.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/9/25
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include <QAbstractTableModel>
#include "Include.h"
class CameraConfigModel : public QAbstractTableModel
{
	Q_OBJECT

public:
	CameraConfigModel(QObject *parent = 0);
	~CameraConfigModel();

	QStringList          m_headList;
	QList<CAMERA_CONFIG_DATA_S>   m_data;

	void setData()
	{
		beginResetModel();
		endResetModel();
	}

	/**
	* @brief：
	* @param[in]: index
	* @param[in]: role
	* @return: QT_NAMESPACE::QVariant
	*/
	virtual QVariant data(const QModelIndex & index, int role = Qt::DisplayRole) const Q_DECL_OVERRIDE;

	/**
	* @brief：行数
	* @param[in]: parent
	* @return: int
	*/
	virtual int rowCount(const QModelIndex & parent = QModelIndex()) const Q_DECL_OVERRIDE;

	/**
	* @brief：列数
	* @param[in]: parent
	* @return: int
	*/
	virtual int columnCount(const QModelIndex &parent = QModelIndex()) const Q_DECL_OVERRIDE;

	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	virtual QVariant headerData(int section, Qt::Orientation orientation, int role = Qt::DisplayRole) const;

	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	virtual void  sort(int column, Qt::SortOrder order = Qt::AscendingOrder) Q_DECL_OVERRIDE;

protected:
	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	virtual QVariant disPlayData(const QModelIndex &index) const;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void readJson(const QString &json);

protected:
	QVector<QPair<QVariant, int> > sortable;
};


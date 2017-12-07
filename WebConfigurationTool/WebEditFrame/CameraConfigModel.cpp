#include "CameraConfigModel.h"


CameraConfigModel::CameraConfigModel(QObject *parent)
	: QAbstractTableModel(parent)
{

}

CameraConfigModel::~CameraConfigModel()
{
}

/**
* @brief：
* @param[in]: index
* @param[in]: role
* @return: QT_NAMESPACE::QVariant
*/
QVariant CameraConfigModel::data(const QModelIndex & index, int role) const
{
	if (!index.isValid())
		return QVariant();

	switch (role)
	{
	case Qt::DisplayRole:
	{
		return disPlayData(index);
	}
	case Qt::TextAlignmentRole:
		return QVariant(Qt::AlignHCenter | Qt::AlignVCenter);
	}
	return QVariant();
}

/**
* @brief:
* @param[in]:
* @return:
*/
int CameraConfigModel::rowCount(const QModelIndex & parent) const
{
	return m_data.size();
}

/**
* @brief：行数
* @param[in]: parent
* @return: int
*/
int CameraConfigModel::columnCount(const QModelIndex &parent) const
{
	return m_headList.size();
}

/**
* @brief:
* @param[in]:
* @return:
*/
QVariant  CameraConfigModel::headerData(int section, Qt::Orientation orientation, int role) const
{
	if (role == Qt::DisplayRole)
	{
		// 水平表头  
		if (orientation == Qt::Horizontal)
		{
			if (m_headList.size() > section)
				return m_headList[section];
			else
				return QVariant();
		}
	}
	return QVariant();
}

/**
* @brief:
* @param[in]:
* @return:
*/
QVariant CameraConfigModel::disPlayData(const QModelIndex &index) const
{
	int row = index.row();
	switch (index.column())
	{
	case 0:
		return m_data.at(row).id;
	case 1:
		return m_data.at(row).url;
	case 2:
		return m_data.at(row).outputPort;
	case 3:
		return m_data.at(row).inputPort;
	case 4:
		return m_data.at(row).videoWidth;
	case 5:
		return m_data.at(row).videoHeight;
	default:
		break;
	}
	return QVariant();
}


void CameraConfigModel::sort(int column, Qt::SortOrder order)
{
	QAbstractTableModel::sort(column, order);
}

void CameraConfigModel::readJson(const QString &json)
{
	
}
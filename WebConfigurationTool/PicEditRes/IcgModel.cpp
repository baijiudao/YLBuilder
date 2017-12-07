/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  IcgModel.cpp
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
#include "IcgModel.h"
#include <QIcon>
#include <QMimeData>
IcgModel::IcgModel(QObject *parent)
	: QAbstractListModel(parent)
{
}

IcgModel::~IcgModel()
{
}
QVariant IcgModel::data(const QModelIndex &index, int role) const
{
	if (!index.isValid())
		return QVariant();
	if (role == Qt::DecorationRole)
		return QIcon(m_pixmaps.value(index.row()));
	else if (role == Qt::UserRole)
		return m_pixmaps.value(index.row());

	return QVariant();
}

Qt::ItemFlags IcgModel::flags(const QModelIndex &index) const
{
	if (index.isValid())
		return (QAbstractListModel::flags(index) | Qt::ItemIsDragEnabled);
	return Qt::ItemIsDropEnabled;
}

bool IcgModel::removeRows(int row, int count, const QModelIndex &parent)
{
	if (parent.isValid())
		return false;

	if (row >= m_pixmaps.size() || row + count <= 0)
		return false;

	int beginRow = qMax(0, row);
	int endRow = qMin(row + count - 1, m_pixmaps.size() - 1);

	beginRemoveRows(parent, beginRow, endRow);

	while (beginRow <= endRow) {
		m_pixmaps.removeAt(beginRow);
		++beginRow;
	}
	endRemoveRows();
	return true;
}

QStringList IcgModel::mimeTypes() const
{
	QStringList types;
	types << "image_insert_svg";
	return types;
}

QMimeData *IcgModel::mimeData(const QModelIndexList &indexes) const
{
	QMimeData *mimeData = new QMimeData();
	QByteArray encodedData;

	QDataStream stream(&encodedData, QIODevice::WriteOnly);

	foreach(QModelIndex index, indexes) 
	{
		if (index.isValid()) 
		{
			QString path = qvariant_cast<QString>(data(index, Qt::UserRole));
			stream << path;
		}
	}
	mimeData->setData("image_insert_svg", encodedData);
	return mimeData;
}

bool IcgModel::dropMimeData(const QMimeData *data, Qt::DropAction action,
	int row, int column, const QModelIndex &parent)
{
	if (!data->hasFormat("image_insert_svg"))
		return false;

	if (action == Qt::IgnoreAction)
		return true;

	if (column > 0)
		return false;

	int endRow;

	if (!parent.isValid())
	{
		if (row < 0)
			endRow = m_pixmaps.size();
		else
			endRow = qMin(row, m_pixmaps.size());
	}
	else
	{
		endRow = parent.row();
	}

	QByteArray encodedData = data->data("image_insert_svg");
	QDataStream stream(&encodedData, QIODevice::ReadOnly);

	while (!stream.atEnd())
	{
		QString pixmap;
		stream >> pixmap;

		beginInsertRows(QModelIndex(), endRow, endRow);
		m_pixmaps.insert(endRow, pixmap);
		endInsertRows();

		++endRow;
	}

	return true;
}

int IcgModel::rowCount(const QModelIndex &parent) const
{
	if (parent.isValid())
		return 0;
	else
		return m_pixmaps.size();
}


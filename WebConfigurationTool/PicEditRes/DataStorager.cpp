#include "DataStorager.h"

QList<QGraphicsItem *>ItemID::itemList;

DataStorager::DataStorager(QObject *parent)
    : QObject(parent)
    , currPosition(-1)
{
}

DataStorager::~DataStorager()
{

}

void DataStorager::addCurrentItemData(ItemDataList &data, bool isFront)
{
    if (-1 == currPosition)
    {
        addNextItemData(data);
    }
    QList<ItemDataList>::iterator it = m_itemDataList.begin() + currPosition;
    for (int i = 0; i < data.dataList.size(); i++)
    {
        ItemID tempID = data.dataList.at(i).item;
        bool tag = false;
        for (int j = 0; j < it->dataList.size(); j++)
        {
            ItemID id = ((it->dataList).at(j)).item;
            if (tempID == id && (/*it->dataList.at(j).operateType != OPERATE_CHANGE || */data.dataList.at(i).operateType == OPERATE_CHANGE))
            {
                tag = true;
                break;
            }
        }
        if (!tag)
        {
            if (isFront)
            {
                it->dataList.push_front(data.dataList.at(i));
            }
            else
            {
                it->dataList.push_back(data.dataList.at(i));
            }
        }
    }
}

void DataStorager::addNextItemData(ItemDataList &data)
{
    if (currPosition + 1 < m_itemDataList.size())
    {
        for (int j = m_itemDataList.size() - 1; j > currPosition; j--)
        {
            m_itemDataList.removeAt(j);
        }
    }
    currPosition++;
    m_itemDataList.insert(currPosition, data);
    
}

bool DataStorager::getNextItemData(ItemDataList **data, bool &lastData)
{
    if (m_itemDataList.size() == currPosition + 1)
    {
        lastData = true;
        return false;
    }
    currPosition++;
    QList<ItemDataList>::iterator it = m_itemDataList.begin();
    *data = &(*(it + currPosition));
    if (m_itemDataList.size() == currPosition + 1)
    {
        lastData = true;
    }
    else
    {
        lastData = false;
    }
    return true;
}

bool DataStorager::getPreviousItemData(ItemDataList **data, bool &firstData)
{
    if (0 == currPosition || -1 == currPosition)
    {
        firstData = true;
        currPosition = -1;
        return false;
    }
    currPosition--;
    QList<ItemDataList>::iterator it = m_itemDataList.begin();
    *data = &(*(it + currPosition));
    if (0 == currPosition)
    {
        firstData = true;
    }
    else
    {
        firstData = false;
    }
    return true;
}

bool DataStorager::getCurrentItemData(ItemDataList **data)
{
    if (currPosition != -1)
    {
        QList<ItemDataList>::iterator it = m_itemDataList.begin();
        *data = &(*(it + currPosition));
        return true;
    }
    return false;
}

void DataStorager::addCopyItemData(ItemDataList &data)
{
    m_copyData.dataList.clear();
    m_copyData = data;
}

bool DataStorager::getCopyItemData(ItemDataList &data)
{
    if (m_copyData.dataList.isEmpty())
    {
        return false;
    }
    data = m_copyData;
    return true;
}

void DataStorager::cleanAllData()
{
    ItemID::cleanData();
    m_itemDataList.clear();
    currPosition = -1;
    m_copyData.dataList.clear();
}

void ItemID::cleanData()
{
    itemList.clear();
}
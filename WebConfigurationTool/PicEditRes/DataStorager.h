#ifndef DATASTORAGER_H
#define DATASTORAGER_H

#include <QObject>
#include <QPen>
#include <QPointF>
#include <QGraphicsItem>
#include <QFont>

enum ImageType
{
    IMAGESVG = 0,
    IMAGEPNG,
    IMAGEJPG
}; 

enum DRAWTYPE{
    DRAW_SELECT = 0,
    DRAW_LINE,
    DRAW_RECTANGLE,
    DRAW_ELLIPSE,
    DRAW_ROURECTANGLE,
    DRAW_POLYGON,
    DRAW_TEXT,
    DRAW_PCITURE,
    DRAW_GROUP,
    DRAW_NULL
};

enum OPERATETYPE{
    OPERATE_DELETE = 0,
    OPERATE_ADD,
    OPERATE_CHANGE,
    OPERATE_GROUP,
    OPERATE_CLEANGROUP
};
struct ItemID
{
    int itemIndex;
    static QList<QGraphicsItem *>itemList;
    ItemID()
    :itemIndex(-1)
    {
    }
    ItemID(QGraphicsItem* temp)
    {
        int i = 0;
        for (; i < itemList.size(); i++)
        {
            if (temp == itemList.at(i))
            {
                itemIndex = i;
                return;
            }
        }
        itemList.push_back(temp);
        itemIndex = i;
    }
    /*ItemID(ItemID &itemId)
    {
        itemIndex = itemId.itemIndex;
    }*/
    ~ItemID()
    {
    }
    void setID(QGraphicsItem* temp)
    {
        if (-1 == itemIndex)
        {
            ItemID(temp);
        }
        else
        {
            itemList.replace(itemIndex, temp);
        }
    }
    ItemID& operator=(QGraphicsItem* temp)
    {
        int i = 0;
        for (; i < itemList.size(); i++)
        {
            if (temp == itemList.at(i))
            {
                itemIndex = i;
                return *this;
            }
        }
        itemList.push_back(temp);
        itemIndex = i;
        return *this;
    }

    bool operator==(ItemID& temp)
    {
        if (temp.itemIndex == itemIndex)
        {
            return true;
        }
        return false;
    }

    QGraphicsItem *id()
    {
        return itemList.at(itemIndex);
    }

    static void cleanData();
};
struct ItemData
{
    ItemData()
    {
        itemType = DRAW_NULL;
        operateType = OPERATE_CHANGE;
        pen = QPen(Qt::black, 1, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin);
        m_beginPos = QPointF(0, 0);
        m_endPos = m_beginPos;
        m_iRotateAngle = 0;
        m_bHorFlip = false;
        m_bVerFlip = false;
        m_groupTran = QTransform();
        m_text = "text";
        m_xRnd = 10;
        m_yRnd = 10;
        m_rouRectTrag = false;
    }
    DRAWTYPE itemType;
    OPERATETYPE operateType;
    //QGraphicsItem *item;
    ItemID item;
    
    QPen pen;

    QPointF m_beginPos;
    QPointF m_endPos;

    int m_iRotateAngle;
    bool m_bHorFlip;
    bool m_bVerFlip;

    QTransform m_groupTran;

    //¶à±ßÐÎ
    QList<QPointF> m_PolygonPoint;
    //text
    QFont m_font;
    QColor m_color;
    QString m_text;
    //Ô²½Ç¾ØÐÎ
    int m_xRnd;
    int m_yRnd;
    bool m_rouRectTrag;
    QList<ItemID> idList;

    //Í¼Æ¬
    QString m_strFilePath;
    ImageType m_imageType;
};
struct ItemDataList
{
    QList<ItemData> dataList;
    ItemDataList& operator=(ItemDataList temp)
    {
        QList<ItemData>::iterator it = temp.dataList.begin();
        for (; it != temp.dataList.end(); it++)
        {
            dataList.push_back(*it);
        }
        return *this;
    }
};
class DataStorager : public QObject
{
    Q_OBJECT

public:
    DataStorager(QObject *parent = NULL);
    ~DataStorager();

    void addNextItemData(ItemDataList &data);
    void addCurrentItemData(ItemDataList &data, bool isFront = true);
    bool getNextItemData(ItemDataList **data, bool &lastData);
    bool getPreviousItemData(ItemDataList **data, bool &firstData);
    bool getCurrentItemData(ItemDataList **data);

    void addCopyItemData(ItemDataList &data);
    bool getCopyItemData(ItemDataList &data);

    void cleanAllData();
private:
    QList<ItemDataList> m_itemDataList;
    int currPosition;

    ItemDataList m_copyData;
};

#endif // DATASTORAGER_H

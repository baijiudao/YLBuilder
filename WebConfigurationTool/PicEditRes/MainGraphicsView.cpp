#include "MainGraphicsView.h"
#include "../Common/include/Markup.h"

#include <QtSvg>
#include <QMessageBox>
#include <QMouseEvent>
#include <QFileDialog>
#include <QStyleOptionGraphicsItem>
#include <QtSvg/QSvgGenerator>
#include <QColorDialog>
#include <qmath.h>

#include <string.h>
#include <sstream>
using namespace std;

MainGraphicsView::MainGraphicsView(QWidget *parent, QString pathName)
	: QGraphicsView(parent)
    , m_filePath(pathName)
	, addTag(DRAW_SELECT)
	, isDrawing(false)
	, m_scene(NULL)
	, m_currentLineItem(NULL)
    , m_currentRectItem(NULL)
    ,m_currentEllipseItem(NULL)
    , m_currentRouRectItem(NULL)
    , m_currentTextItem(NULL)
    , m_isSelect(true)
    , m_isRotating(false)
    , m_isBeginRotate(false)
    , m_lastRotAngle(0)
    , m_groupItem(NULL)
    , m_lastOperate(NULL)
    , m_isChange(false)
    , m_currentSelectedItem(NULL)
{
    m_pen = QPen(Qt::black, 1, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin);

	setMouseTracking(true);
    m_scene = new MainGraphicsScene();
    setScene(m_scene);
    m_selectRect.setPen(m_pen);
    m_selectRect.setBrush(Qt::NoBrush);

    //setEnabled(false);
    setAcceptDrops(true);
}

MainGraphicsView::~MainGraphicsView()
{
    if (NULL != m_scene)
    {
        delete m_scene;
        m_scene = NULL;
    }
}

void MainGraphicsView::setDrawType(DRAWTYPE type)
{
	addTag = type;
	isDrawing = false;
}

void MainGraphicsView::setFilePath(QString pathName)
{
    if (!pathName.isEmpty())
    {
        m_filePath = pathName;
    }
}

bool MainGraphicsView::isChangeOfContent()
{
    return m_isChange;
}

QString MainGraphicsView::getCurrentFilePath()
{
    return m_filePath;
}
/*
void MainGraphicsView::addNewItem(DRAWTYPE)
{

}*/

void MainGraphicsView::showEvent(QShowEvent *event)
{
	QGraphicsView::showEvent(event);
}

void MainGraphicsView::resizeEvent(QResizeEvent *event)
{
    QSize size = this->size();
    m_scene->setSceneRect(0, 0, size.width() - 2, size.height() - 2);;
}

void MainGraphicsView::dragEnterEvent(QDragEnterEvent *event)
{
    QGraphicsView::dragEnterEvent(event);

    if (event->mimeData()->hasFormat("image_insert_svg"))
    {
        event->setDropAction(Qt::MoveAction);
        event->accept();
    }
}

void MainGraphicsView::dragMoveEvent(QDragMoveEvent *event)
{
    QGraphicsView::dragMoveEvent(event);

    if (event->mimeData()->hasFormat("image_insert_svg"))
    {
        event->setDropAction(event->dropAction());
        event->accept();
    }
}

void MainGraphicsView::dropEvent(QDropEvent *event)
{
    QGraphicsView::dropEvent(event);
    m_beginPos = event->pos();
    if (event->mimeData()->hasFormat("image_insert_svg"))
    {
        QByteArray pieceData = event->mimeData()->data("image_insert_svg");
        QDataStream stream(&pieceData, QIODevice::ReadOnly);

        QString path;
        stream >> path;
        insertPicItem(path, m_beginPos);
    }
}

void MainGraphicsView::mousePressEvent(QMouseEvent *event)
{
    if (DRAW_SELECT == addTag)
    {
        QPoint pos = event->pos();
        if (m_isRotating)
        {
            QList<QGraphicsItem *> itemList = m_scene->selectedItems();
            setSelectItemData(itemList);

            m_isBeginRotate = true;
            m_beginRotPoint = pos;
            viewport()->setCursor(Qt::ClosedHandCursor);
            return;
        }
        m_curSelItemList.clear();
        QGraphicsItem *item = itemAt(pos.x(), pos.y());
        if (NULL == item)
        {
            m_isSelect = true;
            m_beginSelPoint = event->pos();
            m_endSelPoint = m_beginSelPoint;
            m_scene->addItem(&m_selectRect);
            QRectF rect;
            m_selectRect.setRect(rect.adjusted(m_beginSelPoint.x(), m_beginSelPoint.y(), m_endSelPoint.x(), m_endSelPoint.y()));
            m_currentSelectedItem = NULL;
        }
        else
        {
            m_isSelect = false;
            if (!item->isSelected())
            {
                m_currentSelectedItem = item;
            }
            else
            {
                m_currentSelectedItem = NULL;
            }
        }
    }
    QGraphicsView::mousePressEvent(event);
    emit sigSetEditFalse();
}

void MainGraphicsView::mouseReleaseEvent(QMouseEvent *event)
{
    m_isChange = true;
	m_beginPos = event->pos();
    //任意角度旋转
    if (m_isRotating && m_isBeginRotate)
    {
        //m_isRotating = false;
        m_isBeginRotate = false;
        m_endRotPoint = m_beginPos;
        calcRotateAngle();
        viewport()->setCursor(Qt::OpenHandCursor);
        m_lastRotAngle = 0;

        //将旋转存储到前进后退列表
        QList<QGraphicsItem *> itemList = m_scene->selectedItems();
        setSelItemDataToNext(itemList);
        return;
    }
    //新建项
    QPainterPath path;
	switch (addTag)
	{
	case DRAW_SELECT:
        if (m_isSelect)
        {
            m_endSelPoint = m_beginPos;
            path.addRect(m_beginSelPoint.x(), m_beginSelPoint.y(), m_endSelPoint.x() - m_beginSelPoint.x(), m_endSelPoint.y() - m_beginSelPoint.y());
            m_scene->setSelectionArea(path);

            m_curSelItemList = m_scene->collidingItems(&m_selectRect);
            m_scene->removeItem(&m_selectRect);
        }
		break;
	case DRAW_LINE:
        if (!isDrawing)
        {
            m_currentLineItem = new Line_GraphicsItem(&m_beginPos, &m_pen, DRAW_LINE, this);
            if (NULL != m_currentLineItem)
            {
                m_lineItemList.push_back(m_currentLineItem);
                scene()->addItem(m_currentLineItem);
            }
		}
		else
		{
			addTag = DRAW_SELECT; 
			emit sigSetRadioButton();//发送信号 设置类型为选择

            //为后退添加add item操作
            ItemDataList operateData;
            ItemData data;
            data.operateType = OPERATE_ADD;
            data.item = m_currentLineItem;
            m_currentLineItem->getItemData(data);
            operateData.dataList.push_back(data);
            m_dataStor.addNextItemData(operateData);
            m_dataStor.getCurrentItemData(&m_lastOperate);

            connect(m_currentLineItem, &Line_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
            connect(m_currentLineItem, &Line_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
		}
		isDrawing = !isDrawing;
		break;
	case DRAW_RECTANGLE:
        if (!isDrawing)
        {
            m_currentRectItem = new Rectangle_GraphicsItem(&m_beginPos, &m_pen, DRAW_RECTANGLE, this);
            if (NULL != m_currentRectItem)
            {
                m_rectItemList.push_back(m_currentRectItem);
                scene()->addItem(m_currentRectItem);
            }
        }
        else
        {
            addTag = DRAW_SELECT;
            emit sigSetRadioButton();//发送信号 设置类型为选择

            //为后退添加add item操作
            ItemDataList operateData;
            ItemData data;
            data.operateType = OPERATE_ADD;
            data.item = m_currentRectItem;
            m_currentRectItem->getItemData(data);
            operateData.dataList.push_back(data);
            m_dataStor.addNextItemData(operateData);
            m_dataStor.getCurrentItemData(&m_lastOperate);

            connect(m_currentRectItem, &Rectangle_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
            connect(m_currentRectItem, &Rectangle_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
        }
        isDrawing = !isDrawing;
		break;
	case DRAW_ELLIPSE:
        if (!isDrawing)
        {
            m_currentEllipseItem = new Ellipse_GraphicsItem(&m_beginPos, &m_pen, DRAW_ELLIPSE, this);
            if (NULL != m_currentEllipseItem)
            {
                m_ellipseItemList.push_back(m_currentEllipseItem);
                scene()->addItem(m_currentEllipseItem);
            }
        }
        else
        {
            addTag = DRAW_SELECT;
            emit sigSetRadioButton();//发送信号 设置类型为选择

            //为后退添加add item操作
            ItemDataList operateData;
            ItemData data;
            data.operateType = OPERATE_ADD;
            data.item = m_currentEllipseItem;
            m_currentEllipseItem->getItemData(data);
            operateData.dataList.push_back(data);
            m_dataStor.addNextItemData(operateData);
            m_dataStor.getCurrentItemData(&m_lastOperate);

            connect(m_currentEllipseItem, &Ellipse_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
            connect(m_currentEllipseItem, &Ellipse_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
        }
        isDrawing = !isDrawing;
		break;
	case DRAW_ROURECTANGLE:
        if (!isDrawing)
        {
            m_currentRouRectItem = new RouRectangle_GraphicsItem(&m_beginPos, &m_pen, DRAW_ROURECTANGLE, this);
            if (NULL != m_currentRouRectItem)
            {
                m_rouRectItemList.push_back(m_currentRouRectItem);
                scene()->addItem(m_currentRouRectItem);
            }
        }
        else
        {
            addTag = DRAW_SELECT;
            emit sigSetRadioButton();//发送信号 设置类型为选择

            //为后退添加add item操作
            ItemDataList operateData;
            ItemData data;
            data.operateType = OPERATE_ADD;
            data.item = m_currentRouRectItem;
            m_currentRouRectItem->getItemData(data);
            operateData.dataList.push_back(data);
            m_dataStor.addNextItemData(operateData);
            m_dataStor.getCurrentItemData(&m_lastOperate);

            connect(m_currentRouRectItem, &RouRectangle_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
            connect(m_currentRouRectItem, &RouRectangle_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
        }
        isDrawing = !isDrawing;
		break;
	case DRAW_POLYGON:
        if (!isDrawing)
        {
            m_currentPolygonItem = new Polygon_GraphicsItem(&m_beginPos, &m_pen, DRAW_POLYGON, this);
            if (NULL != m_currentPolygonItem)
            {
                m_polygonItemList.push_back(m_currentPolygonItem);
                scene()->addItem(m_currentPolygonItem);
            }
            isDrawing = true;
        }
        else
        {
            m_currentPolygonItem->addPoint(&m_beginPos);
            
        }
        //isDrawing = !isDrawing;
		break;
	case DRAW_TEXT:
        if (!isDrawing)
        {
            m_currentTextItem = new Text_GraphicsItem(&m_beginPos, &m_pen, DRAW_TEXT, this);
            if (NULL != m_currentTextItem)
            {
                m_currentTextItem->setFontStyle(m_fontStyle);
                m_textItemList.push_back(m_currentTextItem);
                scene()->addItem(m_currentTextItem);
                addTag = DRAW_SELECT;
                emit sigSetRadioButton();//发送信号 设置类型为选择
                isDrawing = !isDrawing;
                connect(this, &MainGraphicsView::sigSetEditFalse, m_currentTextItem, &Text_GraphicsItem::setEditFalse);

                //为后退添加add item操作
                ItemDataList operateData;
                ItemData data;
                data.operateType = OPERATE_ADD;
                data.item = m_currentTextItem;
                m_currentTextItem->getItemData(data);
                operateData.dataList.push_back(data);
                m_dataStor.addNextItemData(operateData);
                m_dataStor.getCurrentItemData(&m_lastOperate);

                connect(m_currentTextItem, &Text_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                connect(m_currentTextItem, &Text_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
            }
        }
		break;
	case DRAW_PCITURE:
        openPicItem(m_beginPos);
        emit sigSetRadioButton();//发送信号 设置类型为选择
		break;
	case DRAW_NULL:
		break;
	default:
		break;
	}
    QGraphicsView::mouseReleaseEvent(event);
    setIconStatus();
    setFocus();
}

void MainGraphicsView::mouseDoubleClickEvent(QMouseEvent *event)
{
    //saveSVG();
    if (DRAW_POLYGON == addTag)
    {
        QPoint pos = event->pos();
        m_currentPolygonItem->setEndPos(&pos, true);
        addTag = DRAW_SELECT;
        emit sigSetRadioButton();//发送信号 设置类型为选择
        isDrawing = false;

        //为后退添加add item操作
        ItemDataList operateData;
        ItemData data;
        data.operateType = OPERATE_ADD;
        data.item = m_currentPolygonItem;
        m_currentPolygonItem->getItemData(data);
        operateData.dataList.push_back(data);
        m_dataStor.addNextItemData(operateData);
        m_dataStor.getCurrentItemData(&m_lastOperate);

        connect(m_currentPolygonItem, &Polygon_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
        connect(m_currentPolygonItem, &Polygon_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
    }
    QGraphicsView::mouseDoubleClickEvent(event);
}

void MainGraphicsView::mouseMoveEvent(QMouseEvent *event)
{
	QPoint pos = event->pos();
	switch (addTag)
	{
	case DRAW_SELECT:
        if (m_isRotating)
        {
            if (m_isBeginRotate)
            {
                viewport()->setCursor(Qt::ClosedHandCursor);
                m_endRotPoint = pos;
                calcRotateAngle();
                //m_beginRotPoint = m_endRotPoint;
            }
            else
            {
                viewport()->setCursor(Qt::OpenHandCursor);
            }
            return;
        }
        if (!m_isSelect)
        {
            break;
        }
        if (pos.x() > m_beginSelPoint.x())
        {
            if (pos.y() > m_beginSelPoint.y())
            {
                m_selectRect.setRect(QRectF(m_beginSelPoint.x(), m_beginSelPoint.y(), pos.x() - m_beginSelPoint.x(), pos.y() - m_beginSelPoint.y()));
            }
            else
            {
                m_selectRect.setRect(QRectF(m_beginSelPoint.x(), pos.y(), pos.x() - m_beginSelPoint.x(), m_beginSelPoint.y() - pos.y()));
            }
        }
        else
        {
            if (pos.y() > m_beginSelPoint.y())
            {
                m_selectRect.setRect(QRectF(pos.x(), m_beginSelPoint.y(), m_beginSelPoint.x() - pos.x(), pos.y() - m_beginSelPoint.y()));
            }
            else
            {
                m_selectRect.setRect(QRectF(pos.x(), pos.y(), m_beginSelPoint.x() - pos.x(), m_beginSelPoint.y() - pos.y()));
            }
        }
        
		break;
	case DRAW_LINE:
		if (isDrawing)
		{
            m_currentLineItem->setEndPos(&pos);
		}
		break;
	case DRAW_RECTANGLE:

        if (isDrawing)
        {
            m_currentRectItem->setEndPos(&pos);
        }
		break;
	case DRAW_ELLIPSE:
        if (isDrawing)
        {
            m_currentEllipseItem->setEndPos(&pos);
        }
		break;
	case DRAW_ROURECTANGLE:
        if (isDrawing)
        {
            m_currentRouRectItem->setEndPos(&pos);
        }
		break;
	case DRAW_POLYGON:
        if (isDrawing)
        {
            m_currentPolygonItem->setEndPos(&pos, false);
        }
		break;
	case DRAW_TEXT:
/*
        if (isDrawing)
        { 
            m_currentTextItem->setEndPos(&pos);
        }*/
		break;
	case DRAW_PCITURE:
		break;
	case DRAW_NULL:
		break;
	default:
		break;
	}
	QGraphicsView::mouseMoveEvent(event);
}

void MainGraphicsView::keyPressEvent(QKeyEvent *event)
{ 
    if (event->modifiers() == Qt::ControlModifier)
    {
        if (event->key() == Qt::Key_Z)
        {
            //后退
            onOperateBack();
            m_isChange = true;
        }
        else if (event->key() == Qt::Key_Y)
        {
            //重做
            onOperateForward();
            m_isChange = true;
        }
        else if (event->key() == Qt::Key_C)
        {
            //拷贝
            onOperateCopy();
            m_isChange = true;
        }
        else if (event->key() == Qt::Key_V)
        {
            //复制
            onOperatePaste();
            m_isChange = true;
        }
        else if (event->key() == Qt::Key_A)
        {
            //全选
            setAllSelect();
            m_isChange = true;
            m_curSelItemList.clear();
        }
    }
    if (event->key() == Qt::Key_Delete)
    {
        deleteSelectItem();
    }
    else
    {
        QGraphicsView::keyPressEvent(event);
    }
}

void MainGraphicsView::setAllSelect()
{
    QList<QGraphicsItem *> itemList = m_scene->items();
    if (itemList.isEmpty())
    {
        return;
    }
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *> groupItemList = m_groupItem->childItems();
        for (int i = 0; i < groupItemList.size(); i++)
        {
            itemList.removeOne(groupItemList.at(i));
        }
    }
    for (int i = 0; i < itemList.size(); i++)
    {
        itemList.at(i)->setSelected(true);
    }
    setIconStatus();
}

void MainGraphicsView::deleteSelectItem()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    if (NULL != m_groupItem && itemList.contains(m_groupItem))
    {
        ItemDataList operateData;
        ItemData data;
        data.item = m_groupItem;
        data.operateType = OPERATE_CLEANGROUP;
        m_groupItem->getItemData(data);

        QList<QGraphicsItem *> groupItemList = m_groupItem->childItems();
        for (int j = 0; j < groupItemList.size(); j++)
        {
            data.idList.push_back(groupItemList.at(j));
            //itemList.removeOne(groupItemList.at(j));
        }
        operateData.dataList.push_back(data);
        m_dataStor.addNextItemData(operateData);
        m_dataStor.getCurrentItemData(&m_lastOperate);
        QList<QGraphicsItem *> tempItemList = itemList;
        setSelectItemData(tempItemList, OPERATE_DELETE);
    }
    else
    {
        QList<QGraphicsItem *> tempItemList = itemList;
        setSelItemDataToNext(tempItemList, OPERATE_DELETE);
    }
    

    for (int i = 0; i < itemList.size(); ++i)
    {
        QGraphicsItem *item = itemList.at(i);
        deleteItem(item);
    }
}

void MainGraphicsView::deleteItem(QGraphicsItem *item)
{
    if (NULL == item)
    {
        return;
    }
    m_scene->removeItem(item);
    DRAWTYPE itemType = getItemType(item);
    switch (itemType)
    {
    case DRAW_LINE:
        m_currentLineItem = (Line_GraphicsItem*)item;
        m_lineItemList.removeOne(m_currentLineItem);
        delete m_currentLineItem;
        break;
    case DRAW_RECTANGLE:
        m_currentRectItem = (Rectangle_GraphicsItem*)item;
        m_rectItemList.removeOne(m_currentRectItem);
        delete m_currentRectItem;
        break;
    case DRAW_ELLIPSE:
        m_currentEllipseItem = (Ellipse_GraphicsItem*)item;
        m_ellipseItemList.removeOne(m_currentEllipseItem);
        delete m_currentEllipseItem;
        break;
    case DRAW_ROURECTANGLE:
        m_currentRouRectItem = (RouRectangle_GraphicsItem*)item;
        m_rouRectItemList.removeOne(m_currentRouRectItem);
        delete m_currentRouRectItem;
        break;
    case DRAW_POLYGON:
        m_currentPolygonItem = (Polygon_GraphicsItem*)item;
        m_polygonItemList.removeOne(m_currentPolygonItem);
        delete m_currentPolygonItem;
        break;
    case DRAW_TEXT:
        m_currentTextItem = (Text_GraphicsItem*)item;
        m_textItemList.removeOne(m_currentTextItem);
        delete m_currentTextItem;
        break;
    case DRAW_PCITURE:
        m_currentPicItem = (Picture_GraphicsItem*)item;
        m_picItemList.removeOne(m_currentPicItem);
        delete m_currentPicItem;
        break;
    case DRAW_GROUP:
        m_groupItem = (Group_GraphicsItem *)item;
        delete m_groupItem;
        m_groupItem = NULL;
        break;
    default:
        break;
    }
}

void MainGraphicsView::onItemChange(QGraphicsItem *item)
{
    if (NULL == item)
    {
        return;
    }
    QList<QGraphicsItem *> itemList;
    /*if (m_groupItem == item)
    {
        itemList = m_groupItem->childItems();
    }*/
    itemList.push_back(item);
    setSelItemDataToNext(itemList);
    
}

void MainGraphicsView::onItemOriPos(QGraphicsItem *item)
{
    if (NULL != item)
    {
        QList<QGraphicsItem *> itemList;
        /*if (item == m_groupItem)
        {
            itemList = m_groupItem->childItems();
        }*/
        itemList.push_back(item);
        setSelectItemData(itemList);
    }
}

void MainGraphicsView::setNewItem(QList<ItemData>::iterator &it)
{
    switch (it->itemType)
    {
    case DRAW_LINE:
        m_currentLineItem = new Line_GraphicsItem(&m_beginPos, &m_pen, DRAW_LINE, this);
        if (NULL != m_currentLineItem)
        {
            it->item.setID(m_currentLineItem);
            m_lineItemList.push_back(m_currentLineItem);
            scene()->addItem(m_currentLineItem);

            connect(m_currentLineItem, &Line_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
            connect(m_currentLineItem, &Line_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
            m_currentLineItem->setItemData(*it);
        }
        break;
    case DRAW_RECTANGLE:
            m_currentRectItem = new Rectangle_GraphicsItem(&m_beginPos, &m_pen, DRAW_RECTANGLE, this);
            if (NULL != m_currentRectItem)
            {
                it->item.setID(m_currentRectItem);
                m_rectItemList.push_back(m_currentRectItem);
                scene()->addItem(m_currentRectItem);
                connect(m_currentRectItem, &Rectangle_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                connect(m_currentRectItem, &Rectangle_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                m_currentRectItem->setItemData(*it);
            }
        break;
    case DRAW_ELLIPSE:
            m_currentEllipseItem = new Ellipse_GraphicsItem(&m_beginPos, &m_pen, DRAW_ELLIPSE, this);
            if (NULL != m_currentEllipseItem)
            {
                it->item.setID(m_currentEllipseItem);
                m_ellipseItemList.push_back(m_currentEllipseItem);
                scene()->addItem(m_currentEllipseItem);
                connect(m_currentEllipseItem, &Ellipse_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                connect(m_currentEllipseItem, &Ellipse_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                m_currentEllipseItem->setItemData(*it);
            }
        break;
    case DRAW_ROURECTANGLE:
            m_currentRouRectItem = new RouRectangle_GraphicsItem(&m_beginPos, &m_pen, DRAW_ROURECTANGLE, this);
            if (NULL != m_currentRouRectItem)
            {
                it->item.setID(m_currentRouRectItem);
                m_rouRectItemList.push_back(m_currentRouRectItem);
                scene()->addItem(m_currentRouRectItem);
                connect(m_currentRouRectItem, &RouRectangle_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                connect(m_currentRouRectItem, &RouRectangle_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                m_currentRouRectItem->setItemData(*it);
            }
        break;
    case DRAW_POLYGON:
            m_currentPolygonItem = new Polygon_GraphicsItem(&m_beginPos, &m_pen, DRAW_POLYGON, this);
            if (NULL != m_currentPolygonItem)
            {
                it->item.setID(m_currentPolygonItem);
                m_polygonItemList.push_back(m_currentPolygonItem);
                scene()->addItem(m_currentPolygonItem);
                QPoint pos = QPoint(0, 0);
                m_currentPolygonItem->setEndPos(&pos, true);
                connect(m_currentPolygonItem, &Polygon_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                connect(m_currentPolygonItem, &Polygon_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                m_currentPolygonItem->setItemData(*it);
            }
        break;
    case DRAW_TEXT:
            m_currentTextItem = new Text_GraphicsItem(&m_beginPos, &m_pen, DRAW_TEXT, this);
            if (NULL != m_currentTextItem)
            {
                it->item.setID(m_currentTextItem);
                m_textItemList.push_back(m_currentTextItem);
                scene()->addItem(m_currentTextItem);
                connect(this, &MainGraphicsView::sigSetEditFalse, m_currentTextItem, &Text_GraphicsItem::setEditFalse);
                connect(m_currentTextItem, &Text_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                connect(m_currentTextItem, &Text_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                m_currentTextItem->setItemData(*it);
            }
        break;
    case DRAW_PCITURE:
        m_currentPicItem = new Picture_GraphicsItem(&(it->m_beginPos), &m_pen, DRAW_PCITURE, it->m_strFilePath, this);
        if (NULL != m_currentPicItem)
        {
            it->item.setID(m_currentPicItem);
            m_picItemList.push_back(m_currentPicItem);
            scene()->addItem(m_currentPicItem);
            connect(m_currentPicItem, &Picture_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
            connect(m_currentPicItem, &Picture_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
            m_currentPicItem->setItemData(*it);
        }
        break;
    case DRAW_GROUP:
        /*if (OPERATE_CHANGE == it->operateType)
        {
            m_groupItem = (Group_GraphicsItem*)it->item.id();
        }
        m_groupItem->setItemData(*it);*/
        break;
    case DRAW_NULL:
        break;
    default:
        break;
    }
}

void MainGraphicsView::setChangeItem(QList<ItemData>::iterator &it)
{
    switch (it->itemType)
    {
    case DRAW_LINE:
        m_currentLineItem = (Line_GraphicsItem*)it->item.id();
        m_currentLineItem->setItemData(*it);
        break;
    case DRAW_RECTANGLE:
        m_currentRectItem = (Rectangle_GraphicsItem*)it->item.id();
        m_currentRectItem->setItemData(*it);
        break;
    case DRAW_ELLIPSE:
        m_currentEllipseItem = (Ellipse_GraphicsItem*)it->item.id();
        m_currentEllipseItem->setItemData(*it);
        break;
    case DRAW_ROURECTANGLE:
        m_currentRouRectItem = (RouRectangle_GraphicsItem*)it->item.id();
        m_currentRouRectItem->setItemData(*it);
        break;
    case DRAW_POLYGON:
        m_currentPolygonItem = (Polygon_GraphicsItem*)it->item.id();
        m_currentPolygonItem->setItemData(*it);
        break;
    case DRAW_TEXT:
        m_currentTextItem = (Text_GraphicsItem*)it->item.id();
        m_currentTextItem->setItemData(*it);
        break;
    case DRAW_PCITURE:
        m_currentPicItem = (Picture_GraphicsItem*)it->item.id();
        m_currentPicItem->setItemData(*it);
        break;
    case DRAW_GROUP:
        m_groupItem = (Group_GraphicsItem*)it->item.id();
        m_groupItem->setItemData(*it);
        break;
    case DRAW_NULL:
        break;
    default:
        break;
    }
}

void MainGraphicsView::onOperateBack()
{
    if (NULL != m_lastOperate)
    {
        QList<ItemData>::iterator it = m_lastOperate->dataList.begin();
        for (; it != m_lastOperate->dataList.end(); it++)
        {
            if (OPERATE_ADD == it->operateType)
            {
                QGraphicsItem *item = it->item.id();
                deleteItem(item);
            }
            else if (OPERATE_DELETE == it->operateType)
            {
                setNewItem(it);
            }
            else if (OPERATE_GROUP == it->operateType)
            {
                cancelAss(it);
            }
            else if (OPERATE_CLEANGROUP == it->operateType)
            {
                newAssemble(it);
            }
        }
        m_lastOperate = NULL;
    }
    ItemDataList *operateData;
    bool firstItem = true;
    if (!m_dataStor.getPreviousItemData(&operateData, firstItem))
    {
        return;
    }
    QList<ItemData>::iterator it = operateData->dataList.begin();
    for (; it != operateData->dataList.end(); it++)
    {
        if (OPERATE_CHANGE == it->operateType || OPERATE_ADD == it->operateType || OPERATE_GROUP == it->operateType)
        {
            setChangeItem(it);
        }
    }
    m_dataStor.getCurrentItemData(&m_lastOperate);
}

void MainGraphicsView::onOperateForward()
{
    ItemDataList *operateData;
    bool firstItem = true;
    if (!m_dataStor.getNextItemData(&operateData, firstItem))
    {
        return;
    }

    QList<ItemData> &dataList = operateData->dataList;
    QList<ItemData>::iterator it = dataList.end() - 1;
    for (; it != dataList.begin() - 1; it--)
    {
        if ((OPERATE_ADD == it->operateType))
        {
            setNewItem(it);
        }
        else if (OPERATE_CHANGE == it->operateType)
        {
            setChangeItem(it);
        }
        else if (OPERATE_DELETE == it->operateType)
        {
            QGraphicsItem *item = it->item.id();
            deleteItem(item);
        }
        else if (OPERATE_GROUP == it->operateType)
        {
            newAssemble(it);
        }
        else if (OPERATE_CLEANGROUP == it->operateType)
        {
            cancelAss(it);
        }
    }

    m_dataStor.getCurrentItemData(&m_lastOperate);
}

void MainGraphicsView::onOperateCopy()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }
    if (NULL != m_groupItem && itemList.contains(m_groupItem))
    {
        QList<QGraphicsItem *>tempItemList = m_groupItem->childItems();
        itemList.removeOne(m_groupItem);
        itemList.append(tempItemList);
    }

    ItemDataList operateData;
    for (int i = 0; i < itemList.size(); ++i)
    {
        ItemData data;
        data.operateType = OPERATE_ADD;

        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->getItemData(data);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->getItemData(data);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->getItemData(data);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->getItemData(data);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->getItemData(data);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->getItemData(data);
            break;
        case DRAW_PCITURE:
            /*m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->getItemData(data);*/
            break;
        default:
            break;
        }
        operateData.dataList.push_back(data);
    }
    m_dataStor.addCopyItemData(operateData);
}

void MainGraphicsView::onOperatePaste()
{
    ItemDataList operateData;
    if (!m_dataStor.getCopyItemData(operateData))
    {
        return;
    }
    QList<ItemData> &dataList = operateData.dataList;
    QList<ItemData>::iterator it = dataList.begin();
    for (; it != dataList.end(); it++)
    {
        switch (it->itemType)
        {
        case DRAW_LINE:
            if (OPERATE_ADD == it->operateType)
            {
                m_currentLineItem = new Line_GraphicsItem(&m_beginPos, &m_pen, DRAW_LINE, this);
                if (NULL != m_currentLineItem)
                {
                    it->item = m_currentLineItem;
                    m_lineItemList.push_back(m_currentLineItem);
                    scene()->addItem(m_currentLineItem);
                    connect(m_currentLineItem, &Line_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                    connect(m_currentLineItem, &Line_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                    m_currentLineItem->setItemData(*it);
                }
            }
            break;
        case DRAW_RECTANGLE:
            if (OPERATE_ADD == it->operateType)
            {
                m_currentRectItem = new Rectangle_GraphicsItem(&m_beginPos, &m_pen, DRAW_RECTANGLE, this);
                if (NULL != m_currentRectItem)
                {
                    it->item = m_currentRectItem;
                    m_rectItemList.push_back(m_currentRectItem);
                    scene()->addItem(m_currentRectItem);
                    connect(m_currentRectItem, &Rectangle_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                    connect(m_currentRectItem, &Rectangle_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                    m_currentRectItem->setItemData(*it);
                }
            }
            break;
        case DRAW_ELLIPSE:
            if (OPERATE_ADD == it->operateType)
            {
                m_currentEllipseItem = new Ellipse_GraphicsItem(&m_beginPos, &m_pen, DRAW_ELLIPSE, this);
                if (NULL != m_currentEllipseItem)
                {
                    it->item = m_currentEllipseItem;
                    m_ellipseItemList.push_back(m_currentEllipseItem);
                    scene()->addItem(m_currentEllipseItem);
                    connect(m_currentEllipseItem, &Ellipse_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                    connect(m_currentEllipseItem, &Ellipse_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                    m_currentEllipseItem->setItemData(*it);
                }
            }
            break;
        case DRAW_ROURECTANGLE:
            if (OPERATE_ADD == it->operateType)
            {
                m_currentRouRectItem = new RouRectangle_GraphicsItem(&m_beginPos, &m_pen, DRAW_ROURECTANGLE, this);
                if (NULL != m_currentRouRectItem)
                {
                    it->item = m_currentRouRectItem;
                    m_rouRectItemList.push_back(m_currentRouRectItem);
                    scene()->addItem(m_currentRouRectItem);
                    connect(m_currentRouRectItem, &RouRectangle_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                    connect(m_currentRouRectItem, &RouRectangle_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                    m_currentRouRectItem->setItemData(*it);
                }
            }
            break;
        case DRAW_POLYGON:
            if (OPERATE_ADD == it->operateType)
            {
                m_currentPolygonItem = new Polygon_GraphicsItem(&m_beginPos, &m_pen, DRAW_POLYGON, this);
                if (NULL != m_currentPolygonItem)
                {
                    it->item = m_currentPolygonItem;
                    m_polygonItemList.push_back(m_currentPolygonItem);
                    scene()->addItem(m_currentPolygonItem);
                    QPoint pos = QPoint(0, 0);
                    m_currentPolygonItem->setEndPos(&pos, true);
                    connect(m_currentPolygonItem, &Polygon_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                    connect(m_currentPolygonItem, &Polygon_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                    m_currentPolygonItem->setItemData(*it);
                }
            }
            break;
        case DRAW_TEXT:
            if (OPERATE_ADD == it->operateType)
            {
                m_currentTextItem = new Text_GraphicsItem(&m_beginPos, &m_pen, DRAW_TEXT, this);
                if (NULL != m_currentTextItem)
                {
                    it->item = m_currentTextItem;
                    m_textItemList.push_back(m_currentTextItem);
                    scene()->addItem(m_currentTextItem);
                    connect(this, &MainGraphicsView::sigSetEditFalse, m_currentTextItem, &Text_GraphicsItem::setEditFalse);
                    connect(m_currentTextItem, &Text_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
                    connect(m_currentTextItem, &Text_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
                    m_currentTextItem->setItemData(*it);
                }
            }
            break;
        case DRAW_PCITURE:
            break;
        case DRAW_NULL:
            break;
        default:
            break;
        }
    }
    m_dataStor.addNextItemData(operateData);
    m_dataStor.getCurrentItemData(&m_lastOperate);
}

/*
bool MainGraphicsView::eventFilter(QObject *target, QEvent *event)
{
    if (target == this )
    {
        int i = event->type();
        if (event->type() == QEvent::KeyPress)
        {
            QKeyEvent *keyEvent = (QKeyEvent *)event;
            if (keyEvent->key() == Qt::Key_Space)
            {
                focusNextChild();
                return true;
            }
        }
    }
    return QGraphicsView::eventFilter(target, event);
}*/

void MainGraphicsView::onNewSVG()
{
    onCloseSVG();
    //setEnabled(true);
}

void MainGraphicsView::onCloseSVG()
{
    QList<QGraphicsItem *> itemList = m_scene->items();
    if (!itemList.isEmpty())
    {
        if (m_isChange)
        {
            QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sMainView, c_sMainViewIsSave));
            box.setStandardButtons(QMessageBox::Yes | QMessageBox::No);
            box.setButtonText(QMessageBox::Yes, qApp->translate(c_sCommon, c_sCommonYes));
            box.setButtonText(QMessageBox::No, qApp->translate(c_sCommon, c_sCommonNo));
            int result = box.exec();
            if (QMessageBox::Yes == result)
            {
                onSaveSVG();
            }
        }
        for (int i = 0; i < itemList.size(); ++i)
        {
            QGraphicsItem *item = itemList.at(i);
            deleteItem(item);
        }
        m_dataStor.cleanAllData();
    }
    m_isChange = false;
}

void MainGraphicsView::onOpenSVG(QString strPathName)
{
    if (strPathName.isEmpty())
        return;
    QString path = "";
    path = strPathName;
    readSVGFile(path);
}

void MainGraphicsView::readSVGFile(QString strPathName)
{
    static int s_imageCount = 0;
    std::wstring str = strPathName.toStdWString();
    MCD_CSTR strFileName(str);
    CMarkup svg_Example;
    svg_Example.Load(strFileName);

    std::wstring strSVG = L"svg";
    std::wstring strG = L"g";
    if (!svg_Example.FindElem(strSVG))
    {
        QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonError), qApp->translate(c_sMainView, c_sMainViewAnalySVGError));
        box.setStandardButtons(QMessageBox::Ok);
        box.setButtonText(QMessageBox::Ok, qApp->translate(c_sCommon, c_sCommonOK));
        int result = box.exec();
        //QMessageBox::information(this, qApp->translate(c_sCommon, c_sCommonError), qApp->translate(c_sMainView, c_sMainViewAnalySVGError), QMessageBox::Ok);
        return;
    }
    std::wstring strPath = L"path";
    std::wstring strEllipse = L"ellipse";
    std::wstring strRect = L"rect";
    std::wstring strPolyline = L"polyline";
    std::wstring strText = L"text";
    std::wstring strPic = L"image";

    QList<ItemData> itemDataList;

    if (svg_Example.FindChildElem(strSVG))
    {
        std::wstring wstrDoc = svg_Example.GetDoc();
        QString strDoc = QString::fromStdWString(wstrDoc);
        int startPos = strDoc.indexOf("<svg", 0);
        startPos = strDoc.indexOf("<svg", startPos + 1);
        int endPos = 0;
        while (startPos > 0)
        {
            int endPos = strDoc.indexOf("</svg>", startPos);
            QString strTemp = strDoc.mid(startPos,endPos - startPos + 6);
            startPos = strDoc.indexOf("<svg", endPos);

            QString strFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + strTemp;
            /*std::wstring wstrTempSVG = strTemp.toStdWString();

            std::wstring wstrFile = L"<?xml version=\"1.0\" encoding=\"UTF - 8\" standalone=\"no\"?>";
            wstrFile += L"\n";
            wstrFile += wstrTempSVG;*/

            QString tempPath = QDir::tempPath();
            if (tempPath.isEmpty())
            {
                QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonError), qApp->translate(c_sMainView, c_sOpenTempFolderError));
                box.setStandardButtons(QMessageBox::Ok);
                box.setButtonText(QMessageBox::Ok, qApp->translate(c_sCommon, c_sCommonOK));
                int result = box.exec();
                //QMessageBox::information(this, qApp->translate(c_sCommon, c_sCommonError), qApp->translate(c_sMainView, c_sOpenTempFolderError), QMessageBox::Ok);
                return;
            }
            QString fileName = tempPath + "/temp_";
            fileName += QString::number(s_imageCount, 10) + +".svg";;
            QFile file(fileName);
            file.open(QIODevice::WriteOnly);
            QTextStream txtOutput(&file);
            txtOutput << strFile << endl;
            file.close();
            s_imageCount++;
            
            ItemData data;

            std::wstring str = fileName.toStdWString();
            MCD_CSTR strFileName(str);
            CMarkup tempSvg_Example;
            tempSvg_Example.Load(strFileName);

            if (!tempSvg_Example.FindElem(strSVG))
            {
                continue;
            }
            //tempSvg_Example.IntoElem();
            std::wstring wstrX = tempSvg_Example.GetAttrib(L"x");
            QString strX = QString::fromStdWString(wstrX);
            std::wstring wstrY = tempSvg_Example.GetAttrib(L"y");
            QString strY = QString::fromStdWString(wstrY);

            std::wstring wstrWeight = tempSvg_Example.GetAttrib(L"width");
            QString strWeight = QString::fromStdWString(wstrWeight);
            std::wstring wstrHeight = tempSvg_Example.GetAttrib(L"height");
            QString strHeight = QString::fromStdWString(wstrHeight);

            data.m_beginPos.setX(strX.toFloat());
            data.m_beginPos.setY(strY.toFloat());
            data.m_endPos.setX(strX.toFloat() + strWeight.toFloat());
            data.m_endPos.setY(strY.toFloat() + strHeight.toFloat());

            tempSvg_Example.SetAttrib(L"x", 0);
            tempSvg_Example.SetAttrib(L"y", 0);
            //tempSvg_Example.OutOfElem();
            tempSvg_Example.Save(strFileName);
            data.itemType = DRAW_PCITURE;
            data.m_strFilePath = fileName;
            data.m_imageType = IMAGESVG;
            itemDataList.push_back(data);

        }
    }
    svg_Example.ResetMainPos();
    if (svg_Example.FindChildElem(strG))
    {
        svg_Example.IntoElem();
        while (svg_Example.FindChildElem(strG))
        {
            svg_Example.IntoElem();

            do{
                ItemData data;

                std::wstring wstrColor = svg_Example.GetAttrib(L"stroke");
                QString strColor = QString::fromStdWString(wstrColor);
                QPen pen(strColor);
                data.pen = pen;

                std::wstring wstrTran = svg_Example.GetAttrib(L"transform");
                QString strTran = QString::fromStdWString(wstrTran);
                qreal arrayTran[6];
                qreal *qArray = arrayTran;
                strSeparator(&qArray, strTran);
                QTransform tran(arrayTran[0], arrayTran[1], arrayTran[2], arrayTran[3], arrayTran[4], arrayTran[5]);
                data.m_groupTran = tran;

                /*qreal a = tran.m11();
                qreal b = tran.m12();
                qreal c = tran.m13();
                qreal d = tran.m21();
                qreal e = tran.m22();
                qreal f = tran.m23();
                qreal g = tran.m31();
                qreal h = tran.m32();
                qreal m_font = tran.m33();*/

                if (svg_Example.FindChildElem(strPolyline))
                {
                    /*std::wstring wstrJoin = svg_Example.GetAttrib(L"stroke-linejoin");
                    QString strJoin = QString::fromStdWString(wstrJoin);
                    if ("round" != strJoin)
                    {
                        continue;
                    }*/

                    svg_Example.IntoElem();
                    std::wstring wstrPoints = svg_Example.GetAttrib(L"points");
                    QString strPoints = QString::fromStdWString(wstrPoints);
                    qreal arrayPos[4];
                    qArray = arrayPos;
                    strSeparator(&qArray, strPoints);
                    QPointF beginPos = QPointF(qArray[0], qArray[1]);
                    QPointF endPos = QPointF(qArray[2], qArray[3]);

                    data.itemType = DRAW_LINE;

                    data.m_beginPos = beginPos;
                    data.m_endPos = endPos;

                    svg_Example.OutOfElem();
                }
                else if (svg_Example.FindChildElem(strEllipse))
                {
                    svg_Example.IntoElem();
                    std::wstring wstrCX = svg_Example.GetAttrib(L"cx");
                    QString strCX = QString::fromStdWString(wstrCX);
                    qreal cx = strCX.toDouble();

                    std::wstring wstrCY = svg_Example.GetAttrib(L"cy");
                    QString strCY = QString::fromStdWString(wstrCY);
                    qreal cy = strCY.toDouble();

                    std::wstring wstrRX = svg_Example.GetAttrib(L"rx");
                    QString strRX = QString::fromStdWString(wstrRX);
                    qreal rx = strRX.toDouble();

                    std::wstring wstrRY = svg_Example.GetAttrib(L"ry");
                    QString strRY = QString::fromStdWString(wstrRY);
                    qreal ry = strRY.toDouble();

                    data.itemType = DRAW_ELLIPSE;

                    data.m_beginPos = QPointF(cx - rx, cy - ry);
                    data.m_endPos = QPointF(cx + rx, cy + ry);

                    svg_Example.OutOfElem();
                }
                else if (svg_Example.FindChildElem(strRect))
                {
                    svg_Example.IntoElem();
                    std::wstring wstrX = svg_Example.GetAttrib(L"x");
                    QString strX = QString::fromStdWString(wstrX);
                    qreal x = strX.toDouble();

                    std::wstring wstrY = svg_Example.GetAttrib(L"y");
                    QString strY = QString::fromStdWString(wstrY);
                    qreal y = strY.toDouble();

                    std::wstring wstrWidth = svg_Example.GetAttrib(L"width");
                    QString strWidth = QString::fromStdWString(wstrWidth);
                    qreal width = strWidth.toDouble();

                    std::wstring wstrHeight = svg_Example.GetAttrib(L"height");
                    QString strHeight = QString::fromStdWString(wstrHeight);
                    qreal height = strHeight.toDouble();

                    data.itemType = DRAW_RECTANGLE;

                    data.m_beginPos = QPointF(x, y);
                    data.m_endPos = QPointF(x + width, y + height);

                    svg_Example.OutOfElem();
                }
                else if (svg_Example.FindChildElem(strPath))
                {
                    svg_Example.IntoElem();

                    std::wstring wstrD = svg_Example.GetAttrib(L"d");
                    QString strD = QString::fromStdWString(wstrD);

                    if (-1 == strD.indexOf('C'))
                    {
                        data.itemType = DRAW_POLYGON;

                        qreal arrayPath[12];
                        qreal *qArray = arrayPath;
                        strSeparator(&qArray, strD);
                        for (int i = 0; i < 6; i++)
                        {
                            QPointF temp = QPointF(arrayPath[2 * i], arrayPath[2 * i + 1]);
                            data.m_PolygonPoint.push_back(temp);
                        }
                    }
                    else
                    {
                        data.itemType = DRAW_ROURECTANGLE;

                        qreal arrayPath[34];
                        qreal *qArray = arrayPath;
                        strSeparator(&qArray, strD);

                        data.m_beginPos = QPointF(arrayPath[0], arrayPath[7]);
                        data.m_endPos = QPointF(arrayPath[16], arrayPath[21]);
                        data.m_xRnd = arrayPath[6] - arrayPath[0];
                        data.m_yRnd = arrayPath[1] - arrayPath[7];
                    }
                    svg_Example.OutOfElem();
                }
                else if (svg_Example.FindChildElem(strText))
                {
                    data.itemType = DRAW_TEXT;
                    //字体样式
                    /*std::wstring wstrFill = svg_Example.GetAttrib(L"fill");
                    QString strFill = QString::fromStdWString(wstrFill);
                    if (7 == strFill.length())
                    {
                        QString colorR = strFill.mid(1, 2);
                        QString colorG = strFill.mid(3, 2);
                        QString colorB = strFill.mid(5, 2);
                        data.m_color = QColor(colorR.toInt(), colorG.toInt(), colorB.toInt());
                    }*/
                    data.m_color = data.pen.color();
                    std::wstring wstrFamily = svg_Example.GetAttrib(L"font-family");
                    QString strFamily = QString::fromStdWString(wstrFamily);
                    data.m_font.setFamily(strFamily);

                    std::wstring wstrSize = svg_Example.GetAttrib(L"font-size");
                    QString strSize = QString::fromStdWString(wstrSize);
                    data.m_font.setPointSize(strSize.toFloat());

                    std::wstring wstrWeight = svg_Example.GetAttrib(L"font-weight");
                    QString strWeight = QString::fromStdWString(wstrWeight);
                    bool isBold = false;
                    if ("700" == strWeight)
                    {
                        isBold = true;
                    }
                    data.m_font.setBold(isBold);

                    std::wstring wstrStyle = svg_Example.GetAttrib(L"font-style");
                    QString strStyle = QString::fromStdWString(wstrStyle);
                    bool isItalic = false;
                    if ("italic" == strStyle)
                    {
                        isItalic = true;
                    }
                    data.m_font.setItalic(isItalic);

                    //读文字
                    svg_Example.IntoElem();
                    std::wstring wstrContent = svg_Example.GetData();
                    QString strContent = QString::fromStdWString(wstrContent);
                    data.m_text = strContent;

                    std::wstring wstrX = svg_Example.GetAttrib(L"x");
                    QString strX = QString::fromStdWString(wstrX);
                    std::wstring wstrY = svg_Example.GetAttrib(L"y");
                    QString strY = QString::fromStdWString(wstrY);
                    data.m_beginPos = QPointF(strX.toDouble(), strY.toDouble());
                    svg_Example.OutOfElem();

                    /*if (svg_Example.FindElem(strG))// && svg_Example.FindChildElem(strPolyline))
                    {
                        std::wstring wstrJoin = svg_Example.GetAttrib(L"stroke-linejoin");
                        QString strJoin = QString::fromStdWString(wstrJoin);
                        if ("bevel" == strJoin)
                        {
                            data.m_font.setUnderline(true);
                        }
                        else
                        {
                            itemDataList.push_back(data);
                            continue;
                        }
                    }*/
                }
                else if (svg_Example.FindChildElem(strPic))
                {
                    std::wstring wstrImage = svg_Example.GetElemContent();
                    QString inStrImage = QString::fromStdWString(wstrImage);
                    int i = inStrImage.indexOf("xlink:href=");
                    if (-1 == i)
                    {
                        continue;
                    }
                    QString rightStrImage = inStrImage.right(inStrImage.size() - i);
                    QString leftStrImage = inStrImage.left(i);

                    QString X, Y, height, width;

                    int begin = 0;
                    int pos[8];
                    for (int i = 0; i < 8; i++)
                    {
                        begin = leftStrImage.indexOf('\"', begin + 1);
                        pos[i] = begin;
                    }

                    X = leftStrImage.mid(pos[0] + 1, pos[1] - pos[0] - 1);
                    Y = leftStrImage.mid(pos[2] + 1, pos[3] - pos[2] - 1);
                    width = leftStrImage.mid(pos[4] + 1, pos[5] - pos[4] - 1);
                    height = leftStrImage.mid(pos[6] + 1, pos[7] - pos[6] - 1);

                    data.m_beginPos = QPointF(X.toFloat(), Y.toFloat());
                    data.m_endPos = QPointF(X.toFloat() + width.toFloat(), Y.toFloat() + height.toFloat());

                    wstrImage = rightStrImage.toStdWString();

                    std::wstring outStrImage = L"<svg width=\"";
                    outStrImage += width.toStdWString();
                    outStrImage += L"\" height=\"";
                    outStrImage += height.toStdWString();
                    outStrImage += L"\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">";
                    outStrImage += L"\n<g>";

                    outStrImage += L"\n<image";

                    wostringstream ossX;
                    ossX << 0;
                    wstring wstrX = ossX.str();
                    outStrImage += L" x=\"" + wstrX;
                    outStrImage += L"\"";

                    wostringstream ossY;
                    ossY << 0;
                    wstring wstrY = ossY.str();
                    outStrImage += L" y=\"" + wstrY;
                    outStrImage += L"\"";

                    outStrImage += L" width=\"" + width.toStdWString() + L"\"";
                    outStrImage += L" height=\"" + height.toStdWString() + L"\" ";
                    outStrImage += wstrImage;

                    //outStrImage += L"/>";
                    outStrImage += L"\n";

                    outStrImage += L"</g>\n</svg>";
                    QString fileImage = QString::fromStdWString(outStrImage);

                    QString tempPath = QDir::tempPath();
                    if (tempPath.isEmpty())
                    {
                        QMessageBox::information(this, qApp->translate(c_sCommon, c_sCommonError), qApp->translate(c_sMainView, c_sOpenTempFolderError), QMessageBox::Ok);
                        return;
                    }
                    QString fileName = tempPath + "/temp_";
                    fileName += QString::number(s_imageCount, 10) + +".svg";;
                    QFile file(fileName);
                    file.open(QIODevice::WriteOnly);
                    QTextStream txtOutput(&file);
                    txtOutput << fileImage << endl;
                    file.close();

                    s_imageCount++;

                    data.itemType = DRAW_PCITURE;
                    data.m_strFilePath = fileName;
                    data.m_imageType = IMAGESVG;

                }
                itemDataList.push_back(data);
                break;
            } while (true);
            svg_Example.OutOfElem();
        }
    }

    QList<ItemData>::iterator it = itemDataList.begin();
    for (; it < itemDataList.end(); it++)
    {
        setNewItem(it);
    }
}

int MainGraphicsView::strSeparator(qreal *array[], QString str)
{
    int beginPos = str.indexOf('(');
    int lastPos = str.indexOf(')');
    if (-1 == lastPos)
    {
        lastPos = str.length();
    }
    str = str.mid(beginPos + 1, lastPos - beginPos - 1);
    QByteArray ba = str.toLatin1();
    char *s = ba.data();
    const char *d = " ,,";
    char *p;
    p = strtok(s, d);
    int count = 0;
    while (p)
    {
        QString strTemp = QString(QLatin1String(p));
        strTemp.remove('M');
        strTemp.remove('L');
        strTemp.remove('C');
        qreal x = strTemp.toDouble();
        //qreal x = atoi(p);
        *(*array + count) = x;
        count++;
        p = strtok(NULL, d);
    }
    return count;
}

void MainGraphicsView::onSaveSVG()
{
    QList<QGraphicsItem *> itemList = items();
    if (itemList.isEmpty() || !m_isChange)
    {
        return;
    }
    QString path = "";

    if (m_filePath.isEmpty())
        return;
    path = m_filePath;     // 路径  

    //![configure SVG generator]  
    QSvgGenerator generator;   // qt svg的painting device对象  
    QSize size = this->size();
    generator.setFileName(path);
    generator.setSize(QSize(size.width() - 2, size.height() - 2));
    generator.setViewBox(QRect(0, 0, size.width() - 2, size.height() - 2));
    generator.setTitle(tr("SVG Generator Example Drawing"));
    generator.setDescription(tr("An SVG drawing created by the SVG Generator "
        "Example provided with Qt."));
    QPainter painter(this);
    painter.begin(&generator);

    QTransform groupTran;
    QList<QGraphicsItem *> groupItemList;
    if (NULL != m_groupItem)
    {
        groupTran = m_groupItem->transform();
        groupItemList = m_groupItem->childItems();
    }

    QStyleOptionGraphicsItem option;
    for (int i = 0; i < itemList.size(); ++i)
    {
        QTransform tran = itemList.at(i)->transform();
        if (-1 != groupItemList.indexOf(itemList.at(i)))
        {
            tran *= groupTran;
        }
        painter.setTransform(tran);
        itemList.at(i)->paint(&painter, &option, NULL);
    }
    painter.end();

    if (!m_picItemList.isEmpty())
    {
        for (int i = 0; i < m_picItemList.size(); i++)
        {
            m_picItemList.at(i)->saveSVG(path);
        }
    }

    m_isChange = false;
}

QString MainGraphicsView::onSaveAsSVG(QString strPath)
{
    m_filePath = strPath;
    onSaveSVG();
    return m_filePath;
}


DRAWTYPE MainGraphicsView::getItemType(const QGraphicsItem *item)
{
    for (size_t i = 0; i < m_lineItemList.size(); i++)
    {
        if (m_lineItemList.at(i) == item)
        {
            return DRAW_LINE;
        }
    }
    for (size_t i = 0; i < m_rectItemList.size(); i++)
    {
        if (m_rectItemList.at(i) == item)
        {
            return DRAW_RECTANGLE;
        }
    }
    for (size_t i = 0; i < m_ellipseItemList.size(); i++)
    {
        if (m_ellipseItemList.at(i) == item)
        {
            return DRAW_ELLIPSE;
        }
    }
    for (size_t i = 0; i < m_rouRectItemList.size(); i++)
    {
        if (m_rouRectItemList.at(i) == item)
        {
            return DRAW_ROURECTANGLE;
        }
    }
    for (size_t i = 0; i < m_polygonItemList.size(); i++)
    {
        if (m_polygonItemList.at(i) == item)
        {
            return DRAW_POLYGON;
        }
    }
    for (size_t i = 0; i < m_textItemList.size(); i++)
    {
        if (m_textItemList.at(i) == item)
        {
            return DRAW_TEXT;
        }
    }
    for (size_t i = 0; i < m_picItemList.size(); i++)
    {
        if (m_picItemList.at(i) ==  item)
        {
            return DRAW_PCITURE;
        }
    }
    if (m_groupItem == item)
    {
        return DRAW_GROUP;
    }
    return DRAW_NULL;
}

void MainGraphicsView::onAssemble()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    
    ItemDataList operateData;
    bool isExist = false;
    if (NULL != m_groupItem)
    {
        if (itemList.contains(m_groupItem))
        {
            QList<QGraphicsItem *> tempItemList = m_groupItem->childItems();
            itemList.removeOne(m_groupItem);
            itemList.append(tempItemList);
        }
        onCancelAss();
        isExist = true;
    }
    if (NULL == m_groupItem)
    {
        QPointF pos = QPointF(0, 0);
        m_groupItem = new Group_GraphicsItem(&pos, &m_pen, DRAW_GROUP, this);
        m_scene->addItem(m_groupItem);
        connect(m_groupItem, &Group_GraphicsItem::sigSetItemMove, this, &MainGraphicsView::onSetItemMove);

        connect(m_groupItem, &Group_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
        connect(m_groupItem, &Group_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
    }
    
    ItemData data;
    data.item = m_groupItem;
    data.operateType = OPERATE_GROUP;

    for (int i = 0; i < itemList.size(); ++i)
    {
        if (itemList.at(i) == m_groupItem)
        {
            continue;
        }

        ItemID item = itemList.at(i);
        data.idList.push_back(item);

        m_scene->removeItem(itemList.at(i));
        //itemList.at(i)->setFlag(QGraphicsItem::ItemIsMovable, false);
        itemList.at(i)->setFlag(QGraphicsItem::ItemIsSelectable, false);
        m_groupItem->addToGroup(itemList.at(i));
        m_groupItem->setSelected(true);
    }
    m_groupItem->setGroupItemPos();

    m_groupItem->getItemData(data);
    operateData.dataList.push_back(data);
    if (isExist)
    {
        m_dataStor.addCurrentItemData(operateData);
    }
    else
    {
        m_dataStor.addNextItemData(operateData);
    }
    
    m_dataStor.getCurrentItemData(&m_lastOperate);
}
void MainGraphicsView::onCancelAss()
{
    if (NULL == m_groupItem)
    {
        return;
    }
    ItemDataList operateData;
    ItemData data;
    data.item = m_groupItem;
    data.operateType = OPERATE_CLEANGROUP;
    m_groupItem->getItemData(data);
    /*QList<QGraphicsItem *>tempItemList;
    tempItemList.push_back(m_groupItem);
    setSelItemDataToNext(tempItemList, OPERATE_CLEANGROUP);*/
    QList<QGraphicsItem *>itemList = m_groupItem->childItems();
    
    QTransform tran = m_groupItem->sceneTransform();
    for (int i = 0; i < itemList.size(); ++i)
    {
        data.idList.push_back(itemList.at(i));
        m_groupItem->removeFromGroup(itemList.at(i));
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setItemPosition(&tran);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setItemPosition(&tran);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setItemPosition(&tran);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setItemPosition(&tran);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setItemPosition(&tran);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setItemPosition(&tran);
            break;
        case DRAW_PCITURE:
            /*m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setItemPosition(&tran);*/
            break;
        default:
            break;
        }

        //itemList.at(i)->setFlag(QGraphicsItem::ItemIsMovable);
        itemList.at(i)->setFlag(QGraphicsItem::ItemIsSelectable);
        itemList.at(i)->setSelected(true);
        m_scene->addItem(itemList.at(i));
    }
    setSelItemDataToNext(itemList);
    operateData.dataList.push_back(data);
    m_dataStor.addCurrentItemData(operateData);
    m_dataStor.getCurrentItemData(&m_lastOperate);

    m_scene->removeItem(m_groupItem);
    delete(m_groupItem);
    m_groupItem = NULL;
}
void MainGraphicsView::onBestBefore()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }
    for (int i = itemList.size() - 1; i >= 0; i--)
    {
        m_scene->removeItem(itemList.at(i));
        m_scene->addItem(itemList.at(i));
    }
}
void MainGraphicsView::onBestAfter()
{
    QList<QGraphicsItem *> itemAllList = m_scene->items();
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            //itemList.push_back(itemGroupList.at(i));
            itemAllList.removeOne(itemGroupList.at(i));
        }
    }

    for (int j = itemAllList.size()-1; j >= 0; j--)
    {
        bool isFind = false;
        for (int i = 0; i < itemList.size(); i++)
        {
            if (itemAllList.at(j) == itemList.at(i))
            {
                isFind = true;
                break;
            }
        }
        if (!isFind)
        {
            m_scene->removeItem(itemAllList.at(j));
            m_scene->addItem(itemAllList.at(j));
        }
    }
}
void MainGraphicsView::onBefore()
{
    QList<QGraphicsItem *> itemAllList = m_scene->items();
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    QList<QGraphicsItem *> itemTemp;
    if (itemList.isEmpty())
    {
        return;
    }

    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            //itemList.push_back(itemGroupList.at(i));
            itemAllList.removeOne(itemGroupList.at(i));
        }
    }
    for (int j = itemAllList.size()-1; j >= 0; j--)
    {
        bool isFind = false;
        for (int i = 0; i < itemList.size(); ++i)
        {
            if (itemAllList.at(j) == itemList.at(i))
            {
                isFind = true;
                break;
            }
        }
        if (!isFind)
        {
            m_scene->removeItem(itemAllList.at(j));
            m_scene->addItem(itemAllList.at(j));
            if (!itemTemp.isEmpty())
            {
                for (int i = 0; i < itemTemp.size(); ++i)
                {
                    QGraphicsItem * item = itemTemp.front();
                    itemTemp.pop_front();
                    m_scene->removeItem(item);
                    m_scene->addItem(item);
                }
            }
        }
        else
        {
            itemTemp.push_back(itemAllList.at(j));
        }
    }
}
void MainGraphicsView::onAfter()
{
    QList<QGraphicsItem *> itemAllList = m_scene->items();
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    QGraphicsItem *item = NULL;
    if (itemList.isEmpty())
    {
        return;
    }
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            //itemList.push_back(itemGroupList.at(i));
            itemAllList.removeOne(itemGroupList.at(i));
        }
    }
    for (int j = itemAllList.size() - 1; j >= 0; j--)
    {
        bool isFind = false;
        for (int i = 0; i < itemList.size(); ++i)
        {
            if (itemAllList.at(j) == itemList.at(i))
            {
                isFind = true;
                break;
            }
        }
        if (!isFind)
        {
            item = itemAllList.at(j);
        }
        else
        {
            m_scene->removeItem(itemAllList.at(j));
            m_scene->addItem(itemAllList.at(j));
        }
        if (NULL != item)
        {
            m_scene->removeItem(item);
            m_scene->addItem(item);
        }
    }
}
void MainGraphicsView::onAlignLeft()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    if (m_curSelItemList.size() >= 2)
    {
        itemList = m_curSelItemList;
    }
    setSelectItemData(itemList);

    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QRectF rect = getItemRect(itemList.at(0));// ->boundingRect();
    if (NULL != m_currentSelectedItem)
    {
        rect = getItemRect(m_currentSelectedItem);
    }
    qreal value = rect.x();

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setAlignLeft(value);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setAlignLeft(value);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setAlignLeft(value);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setAlignLeft(value);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setAlignLeft(value);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setAlignLeft(value);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setAlignLeft(value);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setAlignLeft(value);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}

void MainGraphicsView::onAlignRight()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    if (m_curSelItemList.size() >= 2)
    {
        itemList = m_curSelItemList;
    }
    setSelectItemData(itemList);

    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QRectF rect = getItemRect(itemList.at(0));
    if (NULL != m_currentSelectedItem)
    {
        rect = getItemRect(m_currentSelectedItem);
    }
    qreal value = rect.x() + rect.width();

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setAlignRight(value);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setAlignRight(value);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setAlignRight(value);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setAlignRight(value);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setAlignRight(value);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setAlignRight(value);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setAlignRight(value);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setAlignRight(value);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onAlignTop()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    if (m_curSelItemList.size() >= 2)
    {
        itemList = m_curSelItemList;
    }
    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QRectF rect = getItemRect(itemList.at(0));
    if (NULL != m_currentSelectedItem)
    {
        rect = getItemRect(m_currentSelectedItem);
    }
    qreal value = rect.y();

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setAlignTop(value);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setAlignTop(value);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setAlignTop(value);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setAlignTop(value);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setAlignTop(value);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setAlignTop(value);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem *)itemList.at(i);
            m_currentPicItem->setAlignTop(value);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setAlignTop(value);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onAlignBottom()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    if (m_curSelItemList.size() >= 2)
    {
        itemList = m_curSelItemList;
    }
    setSelectItemData(itemList);
    
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QRectF rect = getItemRect(itemList.at(0));
    if (NULL != m_currentSelectedItem)
    {
        rect = getItemRect(m_currentSelectedItem);
    }
    qreal value = rect.y() + rect.height();

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setAlignBottom(value);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setAlignBottom(value);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setAlignBottom(value);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setAlignBottom(value);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setAlignBottom(value);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setAlignBottom(value);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setAlignBottom(value);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setAlignBottom(value);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onAliHorCenter()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    if (m_curSelItemList.size() >= 2)
    {
        itemList = m_curSelItemList;
    }
    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QPointF pt = getItemRect(itemList.at(0)).center();
    if (NULL != m_currentSelectedItem)
    {
        pt = getItemRect(m_currentSelectedItem).center();
    }
    qreal value = pt.y();

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setAliHorCenter(value);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setAliHorCenter(value);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setAliHorCenter(value);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setAliHorCenter(value);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setAliHorCenter(value);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setAliHorCenter(value);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setAliHorCenter(value);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setAliHorCenter(value);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onAliVerCenter()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 2)
    {
        return;
    }
    if (m_curSelItemList.size() >= 2)
    {
        itemList = m_curSelItemList;
    }
    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QPointF pt = getItemRect(itemList.at(0)).center();
    if (NULL != m_currentSelectedItem)
    {
        pt = getItemRect(m_currentSelectedItem).center();
    }
    qreal value = pt.x();

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setAliVerCenter(value);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setAliVerCenter(value);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setAliVerCenter(value);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setAliVerCenter(value);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setAliVerCenter(value);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setAliVerCenter(value);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setAliVerCenter(value);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setAliVerCenter(value);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onHorSpacing()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 3)
    {
        return;
    }
    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QMap<qreal, QGraphicsItem *> rectMap;
    for (int i = 0; i < itemList.size(); ++i)
    {
        qreal x = getItemRect(itemList.at(i)).left();
        rectMap.insert(x, itemList.at(i));
    }
    QMapIterator<qreal, QGraphicsItem *> iter(rectMap);
    iter.next();
    QGraphicsItem *item = iter.value();
    qreal sum = getItemRect(item).left();
    while (iter.hasNext())
    {
        sum += iter.value()->boundingRect().width();
        iter.next();
    }
    item = iter.value();
    qreal width = (getItemRect(item).left() - sum) / (rectMap.size() - 1);

    QMapIterator<qreal, QGraphicsItem *> it(rectMap);
    it.next();
    item = it.value();
    qreal previousRight = getItemRect(item).right();
    
    while (it.hasNext())
    {
        it.next();

        DRAWTYPE itemType = getItemType(it.value());
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)it.value();
            m_currentLineItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)it.value();
            m_currentRectItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)it.value();
            m_currentEllipseItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)it.value();
            m_currentRouRectItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)it.value();
            m_currentPolygonItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)it.value();
            m_currentTextItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)it.value();
            m_currentPicItem->setHorSpacing(previousRight + width);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)it.value())->setHorSpacing(previousRight + width);
            break;
        default:
            break;
        }
        item = it.value();
        previousRight = getItemRect(item).right();
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onVerSpacing()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.size() < 3)
    {
        return;
    }
    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QMap<qreal, QGraphicsItem *> rectMap;
    for (int i = 0; i < itemList.size(); ++i)
    {
        qreal y = getItemRect(itemList.at(i)).top();
        rectMap.insert(y, itemList.at(i));
    }
    QMapIterator<qreal, QGraphicsItem *> iter(rectMap);
    iter.next();
    QGraphicsItem *item = iter.value();
    qreal sum = getItemRect(item).top();
    while (iter.hasNext())
    {
        sum += iter.value()->boundingRect().height();
        iter.next();
    }
    item = iter.value();
    qreal hight = (getItemRect(item).top() - sum) / (rectMap.size() - 1);

    QMapIterator<qreal, QGraphicsItem *> it(rectMap);
    it.next();
    item = it.value();
    qreal previousBottom = getItemRect(item).bottom();

    while (it.hasNext())
    {
        it.next();
        DRAWTYPE itemType = getItemType(it.value());
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)it.value();
            m_currentLineItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)it.value();
            m_currentRectItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)it.value();
            m_currentEllipseItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)it.value();
            m_currentRouRectItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)it.value();
            m_currentPolygonItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)it.value();
            m_currentTextItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)it.value();
            m_currentPicItem->setVerSpacing(previousBottom + hight);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)it.value())->setVerSpacing(previousBottom + hight);
            break;
        default:
            break;
        }
        item = it.value();
        previousBottom = getItemRect(item).bottom();
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onPageHorCenter()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QRectF rect = m_scene->sceneRect();
    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setPageHorCenter(&rect);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setPageHorCenter(&rect);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setPageHorCenter(&rect);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setPageHorCenter(&rect);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setPageHorCenter(&rect);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setPageHorCenter(&rect);
            break;
        case DRAW_PCITURE:
            m_currentPicItem= (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setPageHorCenter(&rect);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setPageHorCenter(&rect);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onPageVerCenter()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    QRectF rect = m_scene->sceneRect();
    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setPageVerCenter(&rect);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setPageVerCenter(&rect);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setPageVerCenter(&rect);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setPageVerCenter(&rect);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setPageVerCenter(&rect);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setPageVerCenter(&rect);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setPageVerCenter(&rect);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setPageVerCenter(&rect);
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onDownwardMovement()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setDownwardMovement();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setDownwardMovement();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setDownwardMovement();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setDownwardMovement();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setDownwardMovement();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setDownwardMovement();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setDownwardMovement();
            /*m_currentLineItem->getItemData(data);*/
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setDownwardMovement();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}

void MainGraphicsView::onUpwardMovement()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setUpwardMovement();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setUpwardMovement();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setUpwardMovement();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setUpwardMovement();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setUpwardMovement();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setUpwardMovement();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setUpwardMovement();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setUpwardMovement();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}

void MainGraphicsView::onLeftMovement()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setLeftMovement();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setLeftMovement();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setLeftMovement();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setLeftMovement();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setLeftMovement();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setLeftMovement();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setLeftMovement();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setLeftMovement();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onRightMovement()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setRightMovement();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setRightMovement();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setRightMovement();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setRightMovement();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setRightMovement();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setRightMovement();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setRightMovement();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setRightMovement();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onRotate(bool isCheck)
{
    viewport()->setCursor(Qt::ArrowCursor);
    m_isRotating = isCheck;
    /*QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    for (int i = 0; i < itemList.size(); ++i)
    {
        QRectF rect = itemList.at(i)->boundingRect();
        QPointF pos = rect.center();
        qreal top = rect.top();
        QGraphicsPixmapItem *pixmapItem = m_scene->addPixmap(QPixmap("D:/images/background"));
        pixmapItem->
        
    }*/
}
void MainGraphicsView::onTurnLeft()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setTurnLeft();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setTurnLeft();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setTurnLeft();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setTurnLeft();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setTurnLeft();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setTurnLeft();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setTurnLeft();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setTurnLeft();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onTurnRight()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setTurnRight();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setTurnRight();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setTurnRight();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setTurnRight();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setTurnRight();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setTurnRight();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setTurnRight();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setTurnRight();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onHorFlip()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }
    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setHorFlip();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setHorFlip();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setHorFlip();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setHorFlip();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setHorFlip();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setHorFlip();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setHorFlip();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setHorFlip();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}
void MainGraphicsView::onVerFlip()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }

    setSelectItemData(itemList);
    if (NULL != m_groupItem)
    {
        QList<QGraphicsItem *>itemGroupList = m_groupItem->childItems();
        for (int i = 0; i < itemGroupList.size(); i++)
        {
            itemList.removeOne(itemGroupList.at(i));
        }
    }

    for (int i = 0; i < itemList.size(); ++i)
    {
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setVerFlip();
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setVerFlip();
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setVerFlip();
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setVerFlip();
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setVerFlip();
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setVerFlip();
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setVerFlip();
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setVerFlip();
            break;
        default:
            break;
        }
    }
    itemList = m_scene->selectedItems();
    setSelItemDataToNext(itemList);
}

void MainGraphicsView::onFontBold(bool tag)
{
    m_fontStyle.bold = tag;
    setItemFont();
}

void MainGraphicsView::onFontItalic(bool tag)
{
    m_fontStyle.italic = tag;
    setItemFont();
}

void MainGraphicsView::onFontUnderline(bool tag)
{
    m_fontStyle.underline = tag;
    setItemFont();
}

void MainGraphicsView::onForegroundColor()
{
    QColor color = QColorDialog::getColor(Qt::black, this);
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }
    setSelectItemData(itemList);
    ItemDataList operateData;
    for (int i = 0; i < itemList.size(); ++i)
    {
        ItemData data;
        data.operateType = OPERATE_CHANGE;
        data.item = itemList.at(i);

        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setItemColor(color);
            m_currentLineItem->getItemData(data);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setItemColor(color);
            m_currentRectItem->getItemData(data);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setItemColor(color);
            m_currentEllipseItem->getItemData(data);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setItemColor(color);
            m_currentRouRectItem->getItemData(data);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setItemColor(color);
            m_currentPolygonItem->getItemData(data);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setItemColor(color);
            m_currentTextItem->getItemData(data);
            break;
        case DRAW_PCITURE:
            /*m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setItemColor(color);*/
            break;
        default:
            break;
        }
        operateData.dataList.push_back(data);
    }
    m_dataStor.addNextItemData(operateData);
    m_lastOperate = NULL;
}

void MainGraphicsView::onSetFontComboBox(QString font)
{
    m_fontStyle.strFont = font;
    setItemFont();
}

void MainGraphicsView::onSetFontSizeComboBox(QString size)
{
    m_fontStyle.strSize = size;
    setItemFont();
}

void MainGraphicsView::setItemFont()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }
    setSelectItemData(itemList);

    ItemDataList operateData;
    for (int i = 0; i < itemList.size(); ++i)
    {
        QGraphicsItem *item = itemList.at(i);
        ItemData data;
        data.operateType = OPERATE_CHANGE;
        data.item = item;
        DRAWTYPE itemType = getItemType(itemList.at(i));
        if (DRAW_TEXT == itemType)
        {
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setFontStyle(m_fontStyle);
            m_currentTextItem->getItemData(data);
        }
        
        operateData.dataList.push_back(data);
    }
    m_dataStor.addNextItemData(operateData);
    m_lastOperate = NULL;
}

void MainGraphicsView::setIconStatus()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    FontStyle style = m_fontStyle;
    bool isExistPic = false;
    if (!itemList.isEmpty())
    {
        for (int i = 0; i < itemList.size(); ++i)
        {
            DRAWTYPE itemType = getItemType(itemList.at(i));
            if (DRAW_TEXT == itemType)
            {
                m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
                style = m_currentTextItem->getFontStyle();
            }
            else if (DRAW_PCITURE == itemType)
            {
                isExistPic = true;
            }
        }
    }
    int count = itemList.size();
    emit sigIconStatus(count, style, isExistPic);
}

void MainGraphicsView::calcRotateAngle()
{
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    if (itemList.isEmpty())
    {
        return;
    }
    for (int i = itemList.size() - 1; i >= 0; i--)
    {
        QPointF pos = itemList.at(i)->boundingRect().center();
        double x, y;
        x = pos.x() - m_beginRotPoint.x();
        y = pos.y() - m_beginRotPoint.y();
        double a = qSqrt(x*x + y*y);

        x = m_endRotPoint.x() - pos.x();
        y = m_endRotPoint.y() - pos.y();
        double b = qSqrt(x*x + y*y);

        x = m_endRotPoint.x() - m_beginRotPoint.x();
        y = m_endRotPoint.y() - m_beginRotPoint.y();
        double c = qSqrt(x*x + y*y);

        int angle = acos((a*a + b*b - c*c) / (2 * a*b)) * 180 / PI;

        angle = angle - m_lastRotAngle;
        m_lastRotAngle += angle;
        
        //使每次旋转角度不超过180度
        if (m_lastRotAngle>178)
        {
            m_isBeginRotate = false;
        }
        
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setRotate(angle);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setRotate(angle);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setRotate(angle);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setRotate(angle);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setRotate(angle);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setRotate(angle);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setRotate(angle);
            break;
        case DRAW_GROUP:
            ((Group_GraphicsItem*)itemList.at(i))->setRotate(angle);
            break;
        default:
            break;
        }
    }
}

void MainGraphicsView::onSetItemMove(QPointF movePos)
{
    QList<QGraphicsItem *>itemList = m_groupItem->childItems();
    for (int i = 0; i < itemList.size(); ++i)
    {
        //itemList.at(i)->mouseMoveEvent(event);
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)itemList.at(i);
            m_currentLineItem->setItemMove(movePos);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)itemList.at(i);
            m_currentRectItem->setItemMove(movePos);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)itemList.at(i);
            m_currentEllipseItem->setItemMove(movePos);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)itemList.at(i);
            m_currentRouRectItem->setItemMove(movePos);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)itemList.at(i);
            m_currentPolygonItem->setItemMove(movePos);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
            m_currentTextItem->setItemMove(movePos);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)itemList.at(i);
            m_currentPicItem->setItemMove(movePos);
            break;
        default:
            break;
        }
    }
}

void MainGraphicsView::setSelectItemData(QList<QGraphicsItem *> &itemList, OPERATETYPE type)
{
    ItemDataList operateData;
    for (int i = 0; i < itemList.size(); ++i)
    {
        QList<QGraphicsItem *> groupItemList;
        QGraphicsItem *item = itemList.at(i);
        ItemData data;
        data.operateType = type;
        data.item = item;
        DRAWTYPE itemType = getItemType(itemList.at(i));
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)item;
            m_currentLineItem->getItemData(data);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)item;
            m_currentRectItem->getItemData(data);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)item;
            m_currentEllipseItem->getItemData(data);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)item;
            m_currentRouRectItem->getItemData(data);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)item;
            m_currentPolygonItem->getItemData(data);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)item;
            m_currentTextItem->getItemData(data);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)item;
            m_currentPicItem->getItemData(data);
            break;
        case DRAW_GROUP:
            
            groupItemList = m_groupItem->childItems();
            itemList.append(groupItemList);
            m_groupItem = (Group_GraphicsItem*)item;
            m_groupItem->getItemData(data);
        default:
            break;
        }
        operateData.dataList.push_back(data);
    }
    m_dataStor.addCurrentItemData(operateData);
}

void MainGraphicsView::setSelItemDataToNext(QList<QGraphicsItem *> &itemList, OPERATETYPE type)
{
    if (itemList.isEmpty())
    {
        return;
    }
    ItemDataList operateData;
    for (int i = 0; i < itemList.size(); i++)
    {
        QList<QGraphicsItem *> groupItemList;
        QGraphicsItem *item = itemList.at(i);
        ItemData data;
        data.item = item;
        data.operateType = type;
        DRAWTYPE itemType = getItemType(item);
        switch (itemType)
        {
        case DRAW_LINE:
            m_currentLineItem = (Line_GraphicsItem*)item;
            m_currentLineItem->getItemData(data);
            break;
        case DRAW_RECTANGLE:
            m_currentRectItem = (Rectangle_GraphicsItem*)item;
            m_currentRectItem->getItemData(data);
            break;
        case DRAW_ELLIPSE:
            m_currentEllipseItem = (Ellipse_GraphicsItem*)item;
            m_currentEllipseItem->getItemData(data);
            break;
        case DRAW_ROURECTANGLE:
            m_currentRouRectItem = (RouRectangle_GraphicsItem*)item;
            m_currentRouRectItem->getItemData(data);
            break;
        case DRAW_POLYGON:
            m_currentPolygonItem = (Polygon_GraphicsItem*)item;
            m_currentPolygonItem->getItemData(data);
            break;
        case DRAW_TEXT:
            m_currentTextItem = (Text_GraphicsItem*)item;
            m_currentTextItem->getItemData(data);
            break;
        case DRAW_PCITURE:
            m_currentPicItem = (Picture_GraphicsItem*)item;
            m_currentPicItem->getItemData(data);
            break;
        case DRAW_GROUP:
            groupItemList = m_groupItem->childItems();
            itemList.append(groupItemList);
            m_groupItem = (Group_GraphicsItem*)item;
            m_groupItem->getItemData(data);
            break;
        default:
            break;
        }
        operateData.dataList.push_back(data);
    }
    m_dataStor.addNextItemData(operateData);
    m_dataStor.getCurrentItemData(&m_lastOperate);
}

void MainGraphicsView::cancelAss(QList<ItemData>::iterator &it)
{
    Group_GraphicsItem *item = (Group_GraphicsItem *)(it->item.id());
    if (NULL == item)
    {
        return;
    }
    QList<QGraphicsItem *>itemList = item->childItems();
    for (int i = 0; i < itemList.size(); ++i)
    {
        m_groupItem->removeFromGroup(itemList.at(i));
        DRAWTYPE itemType = getItemType(itemList.at(i));
        itemList.at(i)->setFlag(QGraphicsItem::ItemIsSelectable);
        itemList.at(i)->setSelected(true);
        m_scene->addItem(itemList.at(i));
    }
    m_scene->removeItem(m_groupItem);
    delete(m_groupItem);
    m_groupItem = NULL;
}

void MainGraphicsView::newAssemble(QList<ItemData>::iterator &it)
{
    QPointF pos = QPointF(0, 0);
    m_groupItem = new Group_GraphicsItem(&pos, &m_pen, DRAW_GROUP, this);
    m_scene->addItem(m_groupItem);
    connect(m_groupItem, &Group_GraphicsItem::sigSetItemMove, this, &MainGraphicsView::onSetItemMove);

    connect(m_groupItem, &Group_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
    connect(m_groupItem, &Group_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);

    it->item.setID(m_groupItem);

    for (int i = 0; i < it->idList.size(); ++i)
    {
        ItemID itemId = it->idList.at(i);
        QGraphicsItem *item = itemId.id();
        m_scene->removeItem(item);
        item->setFlag(QGraphicsItem::ItemIsSelectable, false);
        m_groupItem->addToGroup(item);
        m_groupItem->setSelected(true);
    }
    m_groupItem->setGroupItemPos();

    m_dataStor.getCurrentItemData(&m_lastOperate);
}

void MainGraphicsView::openPicItem(QPointF pos)
{
    QString path = "";
    QString newPath = QFileDialog::getOpenFileName(this, qApp->translate(c_sMainView, c_sMainViewInsertPic),
        path, qApp->translate(c_sMainView, c_sMainViewPicType));  // 弹出Open as Dialog  

    insertPicItem(newPath, m_beginPos);
    /*if (newPath.isEmpty())
        return;
    path = newPath;

    m_currentPicItem = new Picture_GraphicsItem(&m_beginPos, &m_pen, DRAW_PCITURE, path, this);
    if (NULL != m_currentPicItem)
    {
        m_picItemList.push_back(m_currentPicItem);
        scene()->addItem(m_currentPicItem);
        connect(this, &MainGraphicsView::sigPicNotSelected, m_currentPicItem, &Picture_GraphicsItem::onPicNotSelected);
    }
    addTag = DRAW_SELECT;

    //为后退添加add item操作
    ItemDataList operateData;
    ItemData data;
    data.operateType = OPERATE_ADD;
    data.item = m_currentPicItem;
    m_currentPicItem->getItemData(data);
    operateData.dataList.push_back(data);
    m_dataStor.addNextItemData(operateData);
    m_dataStor.getCurrentItemData(&m_lastOperate);
    connect(m_currentPicItem, &Picture_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
    connect(m_currentPicItem, &Picture_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
    isDrawing = !isDrawing;*/
}

void MainGraphicsView::insertPicItem(QString path, QPointF pos)
{
    if (path.isEmpty())
        return;

    m_currentPicItem = new Picture_GraphicsItem(&m_beginPos, &m_pen, DRAW_PCITURE, path, this);
    if (NULL != m_currentPicItem)
    {
        m_isChange = true;
        m_picItemList.push_back(m_currentPicItem);
        scene()->addItem(m_currentPicItem);
    }
    addTag = DRAW_SELECT;

    //为后退添加add item操作
    ItemDataList operateData;
    ItemData data;
    data.operateType = OPERATE_ADD;
    data.item = m_currentPicItem;
    m_currentPicItem->getItemData(data);
    operateData.dataList.push_back(data);
    m_dataStor.addNextItemData(operateData);
    m_dataStor.getCurrentItemData(&m_lastOperate);
    connect(m_currentPicItem, &Picture_GraphicsItem::signalItemOriPos, this, &MainGraphicsView::onItemOriPos);
    connect(m_currentPicItem, &Picture_GraphicsItem::signalItemChange, this, &MainGraphicsView::onItemChange);
    isDrawing = !isDrawing;
}

QRectF MainGraphicsView::getItemRect(QGraphicsItem *item)
{
    DRAWTYPE itemType = getItemType(item);
    if (DRAW_PCITURE == itemType)
    {
        m_currentPicItem = (Picture_GraphicsItem *)item;
        return m_currentPicItem->getRect();
    }
    else if (DRAW_TEXT == itemType)
    {
        m_currentTextItem = (Text_GraphicsItem *)item;
        return m_currentTextItem->getRect();
    }
    else
    {
        return item->boundingRect();
    }
}

bool MainGraphicsView::getCurrentFont(FontStyle &style)
{
    bool isExistPic = false;
    QList<QGraphicsItem *> itemList = m_scene->selectedItems();
    style = m_fontStyle;
    if (!itemList.isEmpty())
    {
        for (int i = 0; i < itemList.size(); ++i)
        {
            DRAWTYPE itemType = getItemType(itemList.at(i));
            if (DRAW_TEXT == itemType)
            {
                m_currentTextItem = (Text_GraphicsItem*)itemList.at(i);
                style = m_currentTextItem->getFontStyle();
            }
            else if (DRAW_PCITURE == itemType)
            {
                isExistPic = true;
            }
        }
    }
    return isExistPic;
}

void MainGraphicsView::setCurrentFont(FontStyle type)
{
    m_fontStyle = type;
}
#include "Polygon_GraphicsItem.h"

#include <QGraphicsSceneMouseEvent>

Polygon_GraphicsItem::Polygon_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent)
    :DrawItemFrame(pos, itemPen, type, parent)
    , m_isDrawing(true)
{
    setFlag(ItemIsMovable);
    setFlag(ItemIsSelectable);
    m_item = (QGraphicsItem *) this;
    m_PolygonPoint.push_back(*pos);
    m_PolygonOriPoint.push_back(*pos);
}

Polygon_GraphicsItem::~Polygon_GraphicsItem()
{

}

void Polygon_GraphicsItem::setEndPos(QPoint *pos, bool tag)
{
    if (true == tag)
    {
        m_isDrawing = false;
    }
    m_endPos = *pos;
    update();
}

void Polygon_GraphicsItem::addPoint(QPointF *pos)
{
    m_PolygonPoint.push_back(*pos);
    m_PolygonOriPoint.push_back(*pos);
    update();
}

QRectF Polygon_GraphicsItem::boundingRect() const
{
    if (m_PolygonPoint.isEmpty())
    {
        return QRectF();
    }
    
    qreal left, top, right, bottom;
    QList<QPointF>::const_iterator it = m_PolygonPoint.begin();

    left = it->x();
    top = it->y();
    right = it->x();
    bottom = it->y();
    for (it++; it != m_PolygonPoint.end(); it++)
    {
        left = qMin(left, it->x());
        top = qMin(top, it->y());
        right = qMax(right, it->x());
        bottom = qMax(bottom, it->y());
    }
    if (m_isDrawing)
    {
        left = qMin(left, m_endPos.x());
        top = qMin(top, m_endPos.y());
        right = qMax(right, m_endPos.x());
        bottom = qMax(bottom, m_endPos.y());
    }
    return QRectF(left, top, right - left, bottom - top);
}
QPainterPath Polygon_GraphicsItem::shape() const
{
    QPainterPath path;
    QRectF rect = boundingRect();
    path.addRect(rect.x(), rect.y(), rect.width(), rect.height());
    return path;
}

void Polygon_GraphicsItem::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    setPos(0, 0);
    if (m_PolygonPoint.isEmpty())
    {
        return;
    }
    
    if (m_isDrawing)
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        QPointF pos = *it;
        for (it++; it != m_PolygonPoint.end(); it++)
        {
            painter->drawLine(QLineF(pos.x(), pos.y(), it->x(), it->y()));
            pos = *it;
        }
        painter->drawLine(pos.x(), pos.y(), m_endPos.x(), m_endPos.y());
    }
    else
    {
        int n = m_PolygonPoint.size();
        for (int i = 0; i < n; i++)
        {
            m_points[i] = QPointF(m_PolygonPoint.at(i).x(), m_PolygonPoint.at(i).y());
        }
        painter->drawPolygon(m_points, n);
    }

    paintItemFrame(painter, option);
    prepareGeometryChange();
    rotateAngle();
}

void Polygon_GraphicsItem::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveBeginPos = event->scenePos();
    m_dragTag = getRectRange(m_moveBeginPos);

    QGraphicsItem::mousePressEvent(event);
    emit signalItemOriPos(this);
}

void Polygon_GraphicsItem::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{
    if (m_isDrawing)
    {
        return;
    }
    m_moveEndPos = event->scenePos();
    m_moveX = m_moveEndPos.x() - m_moveBeginPos.x();
    m_moveY = m_moveEndPos.y() - m_moveBeginPos.y();

    QRectF rect = boundingRect();
    switch (m_dragTag)
    {
    case FIRST:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case SECOND:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case THIRD:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case FOURTH:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case FIFTH:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case SIXTH:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case SEVENTH:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case EIGHTH:
        setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case NOTIN:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            it->setX(it->x() + m_moveX);
            it->setY(it->y() + m_moveY);
        }
        m_moveBeginPos = m_moveEndPos;
        m_moveX = 0;
        m_moveY = 0;
        setCursor(QCursor(Qt::ClosedHandCursor));
        break;
    }
    default:
        break;
    }

}

void Polygon_GraphicsItem::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{
    QTransform tranNogative;
    if (0 != (360 - m_iRotateAngle) % 360)
    {
        tranNogative.translate(0, 0);
        tranNogative.rotate((360 - m_iRotateAngle) % 360);//, Qt::YAxis);
    }
    if (m_bHorFlip)
    {
        tranNogative.translate(0, 0);
        tranNogative.rotate(180, Qt::YAxis);
    }
    if (m_bVerFlip)
    {
        tranNogative.translate(0, 0);
        tranNogative.rotate(180, Qt::XAxis);
    }
    QPointF pos = tranNogative.map(QPointF(m_moveX, m_moveY));
    qreal tempMoveX = pos.x();
    qreal tempMoveY = pos.y();

    QTransform tranPositive;
    getItemTransform(tranPositive);

    QRectF rect = boundingRect();
    switch (m_dragTag)
    {
    case FIRST:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentX = (rect.x() + rect.width()) - it->x();
            qreal beforeX = rect.width();
            int afterX = tempMoveX * currentX / beforeX;
            it->setX(it->x() + afterX);
            qreal currentY = (rect.y() + rect.height()) - it->y();
            qreal beforeY = rect.height();
            int afterY = tempMoveY * currentY / beforeY;
            it->setY(it->y() + afterY);
        }
        break;
    }
    case SECOND:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentY = (rect.y() + rect.height()) - it->y();
            qreal beforeY = rect.height();
            int afterY = tempMoveY * currentY / beforeY;
            it->setY(it->y() + afterY);
        }
        break;
    }
    case THIRD:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentX = it->x() - rect.x();
            qreal beforeX = rect.width();
            int afterX = tempMoveX * currentX / beforeX;
            it->setX(it->x() + afterX);
            qreal currentY = (rect.y() + rect.height()) - it->y();
            qreal beforeY = rect.height();
            int afterY = tempMoveY * currentY / beforeY;
            it->setY(it->y() + afterY);
        }
        break;
    }
    case FOURTH:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentX = (rect.x() + rect.width()) - it->x();
            qreal beforeX = rect.width();
            int afterX = tempMoveX * currentX / beforeX;
            it->setX(it->x() + afterX);
        }
        break;
    }
    case FIFTH:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentX = it->x() - rect.x();
            qreal beforeX = rect.width();
            int afterX = tempMoveX * currentX / beforeX;
            it->setX(it->x() + afterX);
        }
        break;
    }
    case SIXTH:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentX = (rect.x() + rect.width()) - it->x();
            qreal beforeX = rect.width();
            int afterX = tempMoveX * currentX / beforeX;
            it->setX(it->x() + afterX);
            qreal currentY = it->y() - rect.y();
            qreal beforeY = rect.height();
            int afterY = tempMoveY * currentY / beforeY;
            it->setY(it->y() + afterY);
        }
        break;
    }
    case SEVENTH:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentY = it->y() - rect.y();
            qreal beforeY = rect.height();
            int afterY = tempMoveY * currentY / beforeY;
            it->setY(it->y() + afterY);
        }
        break;
    }
    case EIGHTH:
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            qreal currentX = it->x() - rect.x();
            qreal beforeX = rect.width();
            int afterX = tempMoveX * currentX / beforeX;
            it->setX(it->x() + afterX);
            qreal currentY = it->y() - rect.y();
            qreal beforeY = rect.height();
            int afterY = tempMoveY * currentY / beforeY;
            it->setY(it->y() + afterY);
        }
        break;
    }
    case NOTIN:
        break;
    default:
        break;
    }

    if (NOTIN != m_dragTag)
    {
        QList<QPointF>::iterator it = m_PolygonPoint.begin();
        for (; it != m_PolygonPoint.end(); it++)
        {
            QPointF temPos = tranPositive.map(*it);
            *it = temPos;

        }
        tranNogative = QTransform();
        getItemTransform(tranNogative, false);
        for (it = m_PolygonPoint.begin(); it != m_PolygonPoint.end(); it++)
        {
            QPointF temPos = tranNogative.map(*it);
            *it = temPos;
        }
    }

    m_dragTag = NOTIN;
    setCursor(QCursor(Qt::ArrowCursor));
    QGraphicsItem::mouseReleaseEvent(event);

    int sum = m_PolygonPoint.size();
    for (int i = 0; i < sum; i++)
    {
        if (m_PolygonPoint.at(i) != m_PolygonOriPoint.at(i))
        {
            emit signalItemChange(this);
            break;
        }
        
    }
    m_PolygonOriPoint.clear();
    for (int i = 0; i < sum; i++)
    {
        m_PolygonOriPoint.push_back(m_PolygonPoint.at(i));
    }
}

void Polygon_GraphicsItem::setAliHorCenter(qreal value)
{
    qreal y = m_item->boundingRect().center().y();
    qreal moveY = value - y;
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setY(it->y() + moveY);
    }
}

void Polygon_GraphicsItem::setAliVerCenter(qreal value)
{
    qreal x = m_item->boundingRect().center().x();
    qreal moveX = value - x;
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setX(it->x() + moveX);
    }
}

void Polygon_GraphicsItem::setAlignLeft(qreal value)
{
    qreal left = m_item->boundingRect().x();
    qreal moveX = value - left;
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setX(it->x() + moveX);
    }
}

void Polygon_GraphicsItem::setAlignRight(qreal value)
{
    qreal right = m_item->boundingRect().x() + m_item->boundingRect().width();
    qreal moveX = value - right;
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setX(it->x() + moveX);
    }
}
void Polygon_GraphicsItem::setAlignTop(qreal value)
{
    qreal top = m_item->boundingRect().y();
    qreal moveY = value - top;
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setY(it->y() + moveY);
    }
}

void Polygon_GraphicsItem::setAlignBottom(qreal value)
{
    qreal top = m_item->boundingRect().y() + m_item->boundingRect().height();
    qreal moveY = value - top;
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setY(it->y() + moveY);
    }
}

void Polygon_GraphicsItem::setPageHorCenter(QRectF *rect)
{
    QPointF pt = m_item->boundingRect().center();
    QPointF rectPt = rect->center();
    qreal moveX = rectPt.x() - pt.x();
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setX(it->x() + moveX);
    }
}

void Polygon_GraphicsItem::setPageVerCenter(QRectF *rect)
{
    QPointF pt = m_item->boundingRect().center();
    QPointF rectPt = rect->center();
    qreal moveY = rectPt.y() - pt.y();
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setY(it->y() + moveY);
    }
}

void Polygon_GraphicsItem::setDownwardMovement()
{
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setY(it->y() + 1);
    }
}

void Polygon_GraphicsItem::setUpwardMovement()
{
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setY(it->y() - 1);
    }
}

void Polygon_GraphicsItem::setLeftMovement()
{
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setX(it->x() - 1);
    }
}

void Polygon_GraphicsItem::setRightMovement()
{
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        it->setX(it->x() + 1);
    }
}

void Polygon_GraphicsItem::setItemMove(QPointF movePos)
{
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        *it += movePos;
    }
}
/*
void Polygon_GraphicsItem::setItemPosition()
{
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        *it = m_item->mapToScene(*it);;
    }
}*/

void Polygon_GraphicsItem::getItemData(ItemData &data)
{
    updatePublicData(data, false);
    QList<QPointF>::iterator it = m_PolygonPoint.begin();
    for (; it != m_PolygonPoint.end(); it++)
    {
        data.m_PolygonPoint.push_back(*it);
    }
}

void Polygon_GraphicsItem::setItemData(ItemData &data)
{
    updatePublicData(data);
    m_PolygonPoint.clear();
    m_PolygonOriPoint.clear();
    QList<QPointF>::iterator it = data.m_PolygonPoint.begin();
    for (; it != data.m_PolygonPoint.end(); it++)
    {
        m_PolygonPoint.push_back(*it);
        m_PolygonOriPoint.push_back(*it);
    }
}

QPointF Polygon_GraphicsItem::transFromGroup()
{
    QPointF movePos = DrawItemFrame::transFromGroup();

    setItemMove(movePos);

    m_groupTran.reset();
    return movePos;
}
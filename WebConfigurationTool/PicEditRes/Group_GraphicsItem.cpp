#include "Group_GraphicsItem.h"
#include <QGraphicsSceneMouseEvent>

Group_GraphicsItem::Group_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent)
    :DrawItemFrame(pos, itemPen, type, parent)
{
    m_item = (QGraphicsItem *) this;
    setFlag(ItemIsMovable);
    setFlag(ItemIsSelectable);
}
Group_GraphicsItem::~Group_GraphicsItem()
{

}

void Group_GraphicsItem::setGroupItemPos()
{
    QList<QGraphicsItem *>itemList = childItems();
    if (itemList.isEmpty())
    {
        return;
    }
    QRectF itemRect = itemList.at(0)->boundingRect();

    QPointF topLeft = itemList.at(0)->sceneTransform().map(itemRect.topLeft());
    qreal left = topLeft.x();
    qreal top = topLeft.y();
    qreal right = topLeft.x();
    qreal bottom = topLeft.y();
    for (int i = 0; i < itemList.size(); ++i)
    {
        QRectF itemRect = itemList.at(i)->boundingRect();
        QPointF pos[4];
        pos[0] = itemList.at(i)->sceneTransform().map(itemRect.topLeft());
        pos[1] = itemList.at(i)->sceneTransform().map(itemRect.topRight());
        pos[2] = itemList.at(i)->sceneTransform().map(itemRect.bottomLeft());
        pos[3] = itemList.at(i)->sceneTransform().map(itemRect.bottomRight());
        for (int j = 0; j < 4; j++)
        {
            left = qMin(left, pos[j].x());
            right = qMax(right, pos[j].x());
            top = qMin(top, pos[j].y());
            bottom = qMax(bottom, pos[j].y());
        }
    }
    m_beginPos = QPointF(left, top);
    m_endPos = QPointF(right, bottom);
    /*m_width = m_endPos.x() - m_beginPos.x();
    m_height = m_endPos.y() - m_beginPos.y();*/
}

QRectF Group_GraphicsItem::boundingRect() const
{
    QRectF rect = getRect();
    //rect += QMarginsF(-1, -1, 1, 1);
    return rect;
}

QPainterPath Group_GraphicsItem::shape() const
{
    QPainterPath path;
    QRectF rect = boundingRect();
    path.addRect(rect.x(), rect.y(), rect.width(), rect.height());
    return path;
}

void Group_GraphicsItem::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    //QGraphicsItemGroup::paint(painter, option, widget);
    setPos(0, 0);
    paintItemFrame(painter, option);
    prepareGeometryChange();
    rotateAngle();
}

void Group_GraphicsItem::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveBeginPos = event->scenePos();
    m_dragTag = getRectRange(m_moveBeginPos);
    QGraphicsItemGroup::mousePressEvent(event);
    emit signalItemOriPos(this);
}

void Group_GraphicsItem::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveEndPos = event->scenePos();
    m_moveX = m_moveEndPos.x() - m_moveBeginPos.x() + m_moveX;
    m_moveY = m_moveEndPos.y() - m_moveBeginPos.y() + m_moveY;
    calcMoveData();
    m_moveBeginPos = m_moveEndPos;
    m_moveX = 0;
    m_moveY = 0;
    //QGraphicsItemGroup::mouseMoveEvent(event);
}

void Group_GraphicsItem::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{
    m_dragTag = NOTIN;
    setCursor(QCursor(Qt::ArrowCursor));
    QGraphicsItemGroup::mouseReleaseEvent(event);
    if (m_beginPos != m_oriBeginPos || m_endPos != m_oriEndPos)
    {
        emit signalItemChange(this);
    }
}

void Group_GraphicsItem::calcMoveData()
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

    QPointF movePos(m_moveX, m_moveY);
    switch (m_dragTag)
    {
    case FIRST:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
            else
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y() + tempMoveY);
            }
        }

        m_item->setCursor(QCursor(Qt::SizeFDiagCursor));
        break;
    case SECOND:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
            }
            else
            {
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
            }
            else
            {
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
        }
        m_item->setCursor(QCursor(Qt::SizeVerCursor));
        break;
    case THIRD:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
            else
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y() + tempMoveY);
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x() + m_moveX, m_beginPos.y());
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
        }
        m_item->setCursor(QCursor(Qt::SizeBDiagCursor));
        break;
    case FOURTH:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
            else
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
        }
        m_item->setCursor(QCursor(Qt::SizeHorCursor));
        break;
    case FIFTH:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
            else
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
            }
        }
        m_item->setCursor(QCursor(Qt::SizeHorCursor));
        break;
    case SIXTH:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y() + tempMoveY);
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
        }
        m_item->setCursor(QCursor(Qt::SizeBDiagCursor));
        break;
    case SEVENTH:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
            }
        }
        m_item->setCursor(QCursor(Qt::SizeVerCursor));
        break;
    case EIGHTH:
        if (m_endPos.x() > m_beginPos.x())
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x(), m_beginPos.y() + tempMoveY);
                m_endPos = QPointF(m_endPos.x() + tempMoveX, m_endPos.y());
            }
        }
        else
        {
            if (m_endPos.y() > m_beginPos.y())
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y());
                m_endPos = QPointF(m_endPos.x(), m_endPos.y() + tempMoveY);
            }
            else
            {
                m_beginPos = QPointF(m_beginPos.x() + tempMoveX, m_beginPos.y() + tempMoveY);
            }
        }

        m_item->setCursor(QCursor(Qt::SizeFDiagCursor));
        break;
    case NOTIN:
        m_beginPos = QPointF(m_beginPos.x() + m_moveX, m_beginPos.y() + m_moveY);
        m_endPos = QPointF(m_endPos.x() + m_moveX, m_endPos.y() + m_moveY);
        m_item->setCursor(QCursor(Qt::ClosedHandCursor));
        
        emit sigSetItemMove(movePos);
        break;
    default:
        break;
    }
    if (NOTIN != m_dragTag)
    {
        QPointF temBeginPos = tranPositive.map(m_beginPos);
        QPointF temEndPos = tranPositive.map(m_endPos);

        m_beginPos = temBeginPos;
        m_endPos = temEndPos;

        tranNogative = QTransform();
        getItemTransform(tranNogative, false);
        temBeginPos = tranNogative.map(temBeginPos);
        temEndPos = tranNogative.map(temEndPos);
        m_beginPos = temBeginPos;
        m_endPos = temEndPos;
    }
}

void Group_GraphicsItem::setAlignLeft(qreal value)
{
    qreal left = m_item->boundingRect().x();
    qreal moveX = value - left;
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    QPointF movePos(moveX, 0);
    emit sigSetItemMove(movePos);
}
void Group_GraphicsItem::setAlignRight(qreal value)
{
    qreal right = m_item->boundingRect().x() + m_item->boundingRect().width();
    qreal moveX = value - right;
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    QPointF movePos(moveX, 0);
    emit sigSetItemMove(movePos);
}
void Group_GraphicsItem::setAlignTop(qreal value)
{
    qreal top = m_item->boundingRect().y();
    qreal moveY = value - top;
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);

    QPointF movePos(0, moveY);
    emit sigSetItemMove(movePos);
}
void Group_GraphicsItem::setAlignBottom(qreal value)
{
    qreal top = m_item->boundingRect().y() + m_item->boundingRect().height();
    qreal moveY = value - top;
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);
    QPointF movePos(0, moveY);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setAliHorCenter(qreal value)
{
    qreal y = m_item->boundingRect().center().y();
    qreal moveY = value - y;
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);
    QPointF movePos(0, moveY);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setAliVerCenter(qreal value)
{
    qreal x = m_item->boundingRect().center().x();
    qreal moveX = value - x;
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    QPointF movePos(moveX, 0);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setPageHorCenter(QRectF *rect)
{
    QPointF pt = getRect().center();
    QPointF rectPt = rect->center();
    qreal moveX = rectPt.x() - pt.x();
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    m_item->update();
    QPointF movePos(moveX, 0);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setPageVerCenter(QRectF *rect)
{
    QPointF pt = getRect().center();
    QPointF rectPt = rect->center();
    qreal moveY = rectPt.y() - pt.y();
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);
    m_item->update();
    QPointF movePos(0, moveY);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setDownwardMovement()
{
    m_beginPos.setY(m_beginPos.y() + 1);
    m_endPos.setY(m_endPos.y() + 1);
    m_item->update();
    QPointF movePos(0, 1);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setUpwardMovement()
{
    m_beginPos.setY(m_beginPos.y() - 1);
    m_endPos.setY(m_endPos.y() - 1);
    m_item->update();
    QPointF movePos(0, -1);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setLeftMovement()
{
    m_beginPos.setX(m_beginPos.x() - 1);
    m_endPos.setX(m_endPos.x() - 1);
    m_item->update();
    QPointF movePos(-1, 0);
    emit sigSetItemMove(movePos);
}

void Group_GraphicsItem::setRightMovement()
{
    m_beginPos.setX(m_beginPos.x() + 1);
    m_endPos.setX(m_endPos.x() + 1);
    m_item->update();
    QPointF movePos(1, 0);
    emit sigSetItemMove(movePos);
}
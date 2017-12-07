#include "Ellipse_GraphicsItem.h"

#include <QGraphicsSceneMouseEvent>

Ellipse_GraphicsItem::Ellipse_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent)
    :DrawItemFrame(pos, itemPen, type, parent)
{
    setFlag(ItemIsMovable);
    setFlag(ItemIsSelectable);
    m_item = (QGraphicsItem *) this;
}

Ellipse_GraphicsItem::~Ellipse_GraphicsItem()
{

}

void Ellipse_GraphicsItem::setEndPos(QPoint *pos)
{
    m_endPos = *pos;
    m_oriEndPos = m_endPos;
    update();
}

QRectF Ellipse_GraphicsItem::boundingRect() const
{
    return getRect();
    
}
QPainterPath Ellipse_GraphicsItem::shape() const
{
    QPainterPath path;
    QRectF rect = getRect();
    path.addRect(rect.x(), rect.y(), rect.width(), rect.height());
    return path;
}

void Ellipse_GraphicsItem::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    setPos(0, 0);
	painter->setPen(pen);
    QRectF rect = getRect();
    painter->drawEllipse(rect.x(), rect.y(), rect.width(), rect.height());

    paintItemFrame(painter, option);
    prepareGeometryChange();
    rotateAngle();
}
void Ellipse_GraphicsItem::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveBeginPos = event->scenePos();
    m_dragTag = getRectRange(m_moveBeginPos);

    QGraphicsItem::mousePressEvent(event);
    emit signalItemOriPos(this);
}

void Ellipse_GraphicsItem::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveEndPos = event->scenePos();
    m_moveX = m_moveEndPos.x() - m_moveBeginPos.x();
    m_moveY = m_moveEndPos.y() - m_moveBeginPos.y();

    calcMoveData();

    m_moveBeginPos = m_moveEndPos;
    m_moveX = 0;
    m_moveY = 0;
}

void Ellipse_GraphicsItem::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{
    m_dragTag = NOTIN;
    setCursor(QCursor(Qt::ArrowCursor));
    QGraphicsItem::mouseReleaseEvent(event);
    if (m_oriBeginPos != m_beginPos || m_oriEndPos != m_endPos)
    {
        emit signalItemChange(this);
        m_oriBeginPos = m_beginPos;
        m_oriEndPos = m_endPos;
    }
}
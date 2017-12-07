#include "RouRectangle_GraphicsItem.h"

#include <QGraphicsSceneMouseEvent>
#include <QStyleOptionGraphicsItem>

RouRectangle_GraphicsItem::RouRectangle_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent)
    :DrawItemFrame(pos, itemPen, type, parent)
    , m_xRnd(10)
    , m_yRnd(10)
    , m_xOriRnd(10)
    , m_yOriRnd(10)
    , m_rouRectTrag(false)
{
    setFlag(ItemIsMovable);
    setFlag(ItemIsSelectable);
    m_item = (QGraphicsItem *) this;
}

RouRectangle_GraphicsItem::~RouRectangle_GraphicsItem()
{

}

void RouRectangle_GraphicsItem::setEndPos(QPoint *pos)
{
    m_endPos = *pos;
    m_oriEndPos = m_endPos;
    update();
}

QRectF RouRectangle_GraphicsItem::boundingRect() const
{
    return getRect();
}
QPainterPath RouRectangle_GraphicsItem::shape() const
{
    QPainterPath path;
    QRectF rect = boundingRect();
    path.addRect(rect.x(), rect.y(), rect.width(), rect.height());
    return path;
}

void RouRectangle_GraphicsItem::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    setPos(0, 0);
	painter->setPen(pen);
    QRectF rect = boundingRect();
    painter->drawRoundRect(rect.x(), rect.y(), rect.width(), rect.height(), m_xRnd,m_yRnd);

    if (option->state & QStyle::State_Selected)
    {
        painter->setBrush(Qt::black);
        painter->setPen(Qt::black);
        painter->drawRect(QRect(rect.x() + m_xRnd - 3, rect.y() + m_yRnd - 3, 6, 6));
    }

    paintItemFrame(painter, option);
    prepareGeometryChange();
    rotateAngle();
}

void RouRectangle_GraphicsItem::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveBeginPos = event->scenePos();

    //Ô²½ÇµÄÍÏÀ­µã
    QRectF RouRect = m_item->boundingRect();
    QRectF rect = QRect(RouRect.x() + m_xRnd - 4, RouRect.y() + m_yRnd - 4, 8, 8);
    QRectF nowRect = mapRectToScene(rect);
    if (nowRect.contains(m_moveBeginPos))
    {
        m_rouRectTrag = true;
        setCursor(QCursor(Qt::SizeFDiagCursor));
        return;
    }

    m_dragTag = getRectRange(m_moveBeginPos);

    QGraphicsItem::mousePressEvent(event);
    emit signalItemOriPos(this);
}

void RouRectangle_GraphicsItem::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveEndPos = event->scenePos();
    m_moveX = m_moveEndPos.x() - m_moveBeginPos.x();
    m_moveY = m_moveEndPos.y() - m_moveBeginPos.y();

    if (m_rouRectTrag)
    {
        QTransform tran;
        if (0 != (360 - m_iRotateAngle) % 360)
        {
            tran.translate(0, 0);
            tran.rotate((360 - m_iRotateAngle) % 360);//, Qt::YAxis);
        }
        if (m_bHorFlip)
        {
            tran.translate(0, 0);
            tran.rotate(180, Qt::YAxis);
        }
        if (m_bVerFlip)
        {
            tran.translate(0, 0);
            tran.rotate(180, Qt::XAxis);
        }
        QPointF pos = tran.map(QPointF(m_moveX, m_moveY));
        m_moveX = pos.x();
        m_moveY = pos.y();
        if (m_moveX + m_xRnd < qAbs((m_endPos.x() - m_beginPos.x()) / 2))
        {
            if (m_moveX + m_xRnd > 10)
            {
                m_xRnd = m_moveX + m_xRnd;
            }
            else
            {
                m_xRnd = 10;
            }
            
        }
        else
        {
            m_xRnd = qAbs((m_endPos.x() - m_beginPos.x()) / 2);
        }

        if (m_moveY + m_yRnd < qAbs((m_endPos.y() - m_beginPos.y()) / 2))
        {
            if (m_moveY + m_yRnd > 10)
            {
                m_yRnd = m_moveY + m_yRnd;
            }
            else
            {
                m_yRnd = 10;
            }

        }
        else
        {
            m_yRnd = qAbs((m_endPos.y() - m_beginPos.y()) / 2);
        }

        m_moveBeginPos = m_moveEndPos;
        m_moveX = 0;
        m_moveY = 0;
        return;
    }

    qreal tempXBefore = m_endPos.x() - m_beginPos.x();
    qreal tempYBefor = m_endPos.y() - m_beginPos.y();

    calcMoveData();
    m_moveBeginPos = m_moveEndPos;
    m_moveX = 0;
    m_moveY = 0;

/*
    qreal tempXafter = m_endPos.x() - m_beginPos.x();
    qreal tempYafter = m_endPos.y() - m_beginPos.y();
    m_xRnd = qAbs(tempXafter / tempXBefore * m_xRnd);
    m_yRnd = qAbs(tempYafter / tempYBefor * m_yRnd);
    if (m_xRnd < 10)
    {
        m_xRnd = 10;
    }
    if (m_yRnd < 10)
    {
        m_yRnd = 10;
    }*/
    int temp = qAbs((m_endPos.x() - m_beginPos.x()) / 2);
    if (m_xRnd > temp)
    {
        m_xRnd = qMax(temp, 10);
    }
    temp = qAbs((m_endPos.y() - m_beginPos.y()) / 2);
    if (m_yRnd > temp)
    {
        m_yRnd = qMax(temp, 10);
    }
}

void RouRectangle_GraphicsItem::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{
    m_dragTag = NOTIN;
    m_rouRectTrag = false;
    setCursor(QCursor(Qt::ArrowCursor));
    QGraphicsItem::mouseReleaseEvent(event);

    if (m_oriBeginPos != m_beginPos || m_oriEndPos != m_endPos || m_xOriRnd != m_xRnd || m_yOriRnd != m_yRnd)
    {
        emit signalItemChange(this);
        m_oriBeginPos = m_beginPos;
        m_oriEndPos = m_endPos;
        m_xOriRnd = m_xRnd;
        m_yOriRnd = m_yRnd;
    }
}

void RouRectangle_GraphicsItem::getItemData(ItemData &data)
{
    updatePublicData(data, false);
    data.m_xRnd = m_xRnd;
    data.m_yRnd = m_yRnd;
    data.m_rouRectTrag = m_rouRectTrag;
}

void RouRectangle_GraphicsItem::setItemData(ItemData &data)
{
    updatePublicData(data);
    m_xRnd = data.m_xRnd;
    m_xOriRnd = m_xRnd;
    m_yRnd = data.m_yRnd;
    m_yOriRnd = m_yRnd;
    m_rouRectTrag = data.m_rouRectTrag;
}
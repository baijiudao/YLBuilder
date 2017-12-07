#include "DrawItemFrame.h"

#include <QPainter>
#include <QStyleOptionGraphicsItem>

//static void qt_graphicsItem_highlightSelected(QGraphicsItem *item, QPainter *painter, const QStyleOptionGraphicsItem *option);

DrawItemFrame::DrawItemFrame(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent)
	:m_item(NULL)
    , itemType(type)
    , pen(*itemPen)
    , m_dragTag(NOTIN)
    , m_beginPos(*pos)
    , m_endPos(*pos)
    , m_oriBeginPos(*pos)
    , m_oriEndPos(*pos)
    , m_moveX(0)
    , m_moveY(0)
    , m_iRotateAngle(0)
    , m_bHorFlip(false)
    , m_bVerFlip(false)
{
    m_groupTran = QTransform();
}

DrawItemFrame::~DrawItemFrame()
{
	m_item = NULL;
}

void DrawItemFrame::setItemColor(QColor &color)
{
    pen = QPen(color);
}

void DrawItemFrame::setAliHorCenter(qreal value)
{
    qreal y = getRect().center().y();
    qreal moveY = value - y;
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}

void DrawItemFrame::setAliVerCenter(qreal value)
{
    qreal x = getRect().center().x();
    qreal moveX = value - x;
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}

void DrawItemFrame::setAlignLeft(qreal value)
{
    qreal left = getRect().x();
    qreal moveX = value - left;
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}

void DrawItemFrame::setAlignRight(qreal value)
{
    qreal right = getRect().x() + getRect().width();
    qreal moveX = value - right;
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}
void DrawItemFrame::setAlignTop(qreal value)
{
    qreal top = getRect().y();
    qreal moveY = value - top;
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}

void DrawItemFrame::setAlignBottom(qreal value)
{
    qreal top = getRect().y() + getRect().height();
    qreal moveY = value - top;
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}

void DrawItemFrame::setHorSpacing(qreal value)
{
    setAlignLeft(value);
}

void DrawItemFrame::setVerSpacing(qreal value)
{
    setAlignTop(value);
}

void DrawItemFrame::setPageHorCenter(QRectF *rect)
{
    QPointF pt = getRect().center();
    QPointF rectPt = rect->center();
    qreal moveX = rectPt.x() - pt.x();
    m_beginPos.setX(m_beginPos.x() + moveX);
    m_endPos.setX(m_endPos.x() + moveX);

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;

    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setPageVerCenter(QRectF *rect)
{
    QPointF pt = getRect().center();
    QPointF rectPt = rect->center();
    qreal moveY = rectPt.y() - pt.y();
    m_beginPos.setY(m_beginPos.y() + moveY);
    m_endPos.setY(m_endPos.y() + moveY);

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;

    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setDownwardMovement()
{
    m_beginPos.setY(m_beginPos.y() + 1);
    m_endPos.setY(m_endPos.y() + 1);

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;

    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setUpwardMovement()
{
    m_beginPos.setY(m_beginPos.y() - 1);
    m_endPos.setY(m_endPos.y() - 1);

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;

    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setLeftMovement()
{
    m_beginPos.setX(m_beginPos.x() - 1);
    m_endPos.setX(m_endPos.x() - 1);

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;

    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setRightMovement()
{
    m_beginPos.setX(m_beginPos.x() + 1);
    m_endPos.setX(m_endPos.x() + 1);

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;

    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setRotate(int angle)
{
    m_iRotateAngle += angle;
    
    m_iRotateAngle = m_iRotateAngle % 360;
    
    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setTurnLeft()
{
    m_iRotateAngle -= 90;
    if (0 != m_iRotateAngle / 360)
    {
        m_iRotateAngle = m_iRotateAngle % 360;
    }
    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setHorFlip()
{
    m_bHorFlip = !m_bHorFlip;
    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setVerFlip()
{
    m_bVerFlip = !m_bVerFlip;
    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::setTurnRight()
{
    m_iRotateAngle += 90;
    if (0 != m_iRotateAngle / 360)
    {
        m_iRotateAngle = m_iRotateAngle % 360;
    }
    //rotateAngle();
    m_item->update();
}

void DrawItemFrame::rotateAngle()
{
    QTransform tran;
    if (m_bHorFlip)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate(180, Qt::YAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());
    }
    if (m_bVerFlip)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate(180, Qt::XAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());
    }
    if (0 != m_iRotateAngle % 360)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate(m_iRotateAngle);//, Qt::YAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());

        /*m_item->setTransformOriginPoint(pt);
        m_item->setRotation(m_iRotateAngle);*/
    }
    tran *= m_groupTran;
    m_item->setTransform(tran);
}

void DrawItemFrame::getItemTransform(QTransform &tran, bool tag)
{
    if ((0 != m_iRotateAngle % 360) && tag)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate(m_iRotateAngle);//, Qt::YAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());
    }
    else if ((0 != (360 - m_iRotateAngle) % 360) && !tag)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate((360 - m_iRotateAngle) % 360);//, Qt::YAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());
    }
    if (m_bHorFlip)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate(180, Qt::YAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());
    }
    if (m_bVerFlip)
    {
        QPointF pt = m_item->boundingRect().center();
        tran.translate(pt.x(), pt.y());
        tran.rotate(180, Qt::XAxis);
        tran.translate(0 - pt.x(), 0 - pt.y());
    }
}

void DrawItemFrame::paintItemFrame(QPainter *painter,const QStyleOptionGraphicsItem *option)
{
    if (option->state & QStyle::State_Selected)//(m_item->isSelected())
    {
        qt_graphicsItem_highlightSelected(m_item, painter, option);

        if (m_item->type() == QGraphicsTextItem::Type)
        {
            return;
        }
        QRectF rect = m_item->boundingRect();

        painter->setBrush(Qt::black);
        painter->setPen(Qt::black);
        painter->drawRect(QRect(rect.x(), rect.y(), 6, 6));
        painter->drawRect(QRect(rect.x() + rect.width() - 6, rect.y(), 6, 6));
        painter->drawRect(QRect(rect.x(), rect.y() + rect.height() - 6, 6, 6));
        painter->drawRect(QRect(rect.x() + rect.width() - 6, rect.y() + rect.height() - 6, 6, 6));

        if (DRAW_PCITURE != itemType)
        {
            painter->drawRect(QRect(rect.x() + rect.width() / 2 - 3, rect.y(), 6, 6));
            painter->drawRect(QRect(rect.x(), rect.y() + rect.height() / 2 - 3, 6, 6));
            painter->drawRect(QRect(rect.x() + rect.width() - 6, rect.y() + rect.height() / 2 - 6, 6, 6));
            painter->drawRect(QRect(rect.x() + rect.width() / 2 - 3, rect.y() + rect.height() - 6, 6, 6));
        }
    }
/*
	if (m_item->isSelected() && isDraw)
	{
		QRectF rect = m_item->boundingRect();

		painter->setBrush(Qt::black);
		painter->setPen(Qt::black);
		painter->drawRect(QRect(rect.x() - 5, rect.y() - 5, 10, 10));

		painter->drawRect(QRect(rect.x() + rect.width() / 2 - 5, rect.y() - 5, 10, 10));

		painter->drawRect(QRect(rect.x() + rect.width() - 5, rect.y() - 5, 10, 10));

		painter->drawRect(QRect(rect.x() - 5, rect.y() + rect.height() / 2 - 5, 10, 10));

		painter->drawRect(QRect(rect.x() + rect.width() - 5, rect.y() + rect.height() / 2 - 5, 10, 10));

		painter->drawRect(QRect(rect.x() - 5, rect.y() + rect.height() - 5, 10, 10));

		painter->drawRect(QRect(rect.x() + rect.width() / 2 - 5, rect.y() + rect.height() - 5, 10, 10));

		painter->drawRect(QRect(rect.x() + rect.width() - 5, rect.y() + rect.height() - 5, 10, 10));
	}*/
}

void DrawItemFrame::calcMoveData()
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
        
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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
        m_item->setCursor(QCursor(Qt::SizeAllCursor));
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

        m_item->setCursor(QCursor(Qt::SizeAllCursor));
        break;
    case NOTIN:
        m_beginPos = QPointF(m_beginPos.x() + m_moveX, m_beginPos.y() + m_moveY);
        m_endPos = QPointF(m_endPos.x() + m_moveX, m_endPos.y() + m_moveY);
        m_item->setCursor(QCursor(Qt::ClosedHandCursor));
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
        getItemTransform(tranNogative,false);
        temBeginPos = tranNogative.map(temBeginPos);
        temEndPos = tranNogative.map(temEndPos);
        m_beginPos = temBeginPos;
        m_endPos = temEndPos;
    }
}

QRectF DrawItemFrame::getRect()const
{
    if (m_beginPos.x() > m_endPos.x())
    {
        if (m_beginPos.y() > m_endPos.y())
        {
            return QRectF(m_endPos.x(), m_endPos.y(), m_beginPos.x() - m_endPos.x(), m_beginPos.y() - m_endPos.y());
        }
        else
        {
            return QRectF(m_endPos.x(), m_beginPos.y(), m_beginPos.x() - m_endPos.x(), m_endPos.y() - m_beginPos.y());
        }
    }
    else
    {
        if (m_beginPos.y() > m_endPos.y())
        {
            return QRectF(m_beginPos.x(), m_endPos.y(), m_endPos.x() - m_beginPos.x(), m_beginPos.y() - m_endPos.y());
        }
        else
        {
            return QRectF(m_beginPos.x(), m_beginPos.y(), m_endPos.x() - m_beginPos.x(), m_endPos.y() - m_beginPos.y());
        }
    }
}
RECTRANGE DrawItemFrame::getRectRange(QPointF & pos)
{
	if (m_item->isSelected())
	{
        QRectF originalRect = m_item->boundingRect();

        QRectF itemRect = QRectF(originalRect.x() - 5, originalRect.y() - 5, 16, 16);
        QRectF nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos))
        {
            return FIRST;
        }
        itemRect = QRectF(QRect(originalRect.x() - 5 + originalRect.width() / 2 - 3 - 5, originalRect.y(), 16, 16));
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos) && DRAW_PCITURE != itemType)
        {
            return SECOND;
        }
        itemRect = QRectF(originalRect.x() - 5 + originalRect.width() - 6 - 5, originalRect.y(), 16, 16);
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos))
        {
            return THIRD;
        }
        itemRect = QRectF(originalRect.x() - 5, originalRect.y() + originalRect.height() / 2 - 3 - 5, 16, 16);
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos) && DRAW_PCITURE != itemType)
        {
            return FOURTH;
        }
        itemRect = QRectF(originalRect.x() + originalRect.width() - 6 - 5, originalRect.y() + originalRect.height() / 2 - 6 - 5, 16, 16);
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos) && DRAW_PCITURE != itemType)
        {
            return FIFTH;
        }
        itemRect = QRectF(originalRect.x() - 5, originalRect.y() + originalRect.height() - 6 - 5, 16, 16);
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos))
        {
            return SIXTH;
        }
        itemRect = QRectF(QRect(originalRect.x() + originalRect.width() / 2 - 3 - 5, originalRect.y() + originalRect.height() - 6 - 5, 16, 16));
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos) && DRAW_PCITURE != itemType)
        {
            return SEVENTH;
        }
        itemRect = QRectF(QRect(originalRect.x() + originalRect.width() - 6 - 5, originalRect.y() + originalRect.height() - 6 - 5, 16, 16));
        nowRect = m_item->mapRectToScene(itemRect);
        if (nowRect.contains(pos))
        {
            return EIGHTH;
        }
	}
	return NOTIN;
}

/*
void DrawItemFrame::setMoveDistance(qreal x, qreal y)
{

}*/

void DrawItemFrame::qt_graphicsItem_highlightSelected(
    QGraphicsItem *item, QPainter *painter, const QStyleOptionGraphicsItem *option)
{
    const QRectF murect = painter->transform().mapRect(QRectF(0, 0, 1, 1));
    if (qFuzzyIsNull(qMax(murect.width(), murect.height())))
        return;

    const QRectF mbrect = painter->transform().mapRect(m_item->boundingRect());
    if (qMin(mbrect.width(), mbrect.height()) < qreal(1.0))
        return;

    qreal itemPenWidth;
    switch (item->type()) {
    case QGraphicsEllipseItem::Type:
        itemPenWidth = static_cast<QGraphicsEllipseItem *>(item)->pen().widthF();
        break;
    case QGraphicsPathItem::Type:
        itemPenWidth = static_cast<QGraphicsPathItem *>(item)->pen().widthF();
        break;
    case QGraphicsPolygonItem::Type:
        itemPenWidth = static_cast<QGraphicsPolygonItem *>(item)->pen().widthF();
        break;
    case QGraphicsRectItem::Type:
        itemPenWidth = static_cast<QGraphicsRectItem *>(item)->pen().widthF();
        break;
    case QGraphicsSimpleTextItem::Type:
        itemPenWidth = static_cast<QGraphicsSimpleTextItem *>(item)->pen().widthF();
        break;
    case QGraphicsLineItem::Type:
        itemPenWidth = static_cast<QGraphicsLineItem *>(item)->pen().widthF();
        break;
    default:
        itemPenWidth = 1.0;
    }
    const qreal pad = itemPenWidth / 2;

    const qreal penWidth = 0; // cosmetic pen

    const QColor fgcolor = option->palette.windowText().color();
    const QColor bgcolor( // ensure good contrast against fgcolor
        fgcolor.red() > 127 ? 0 : 255,
        fgcolor.green() > 127 ? 0 : 255,
        fgcolor.blue() > 127 ? 0 : 255);

    painter->setPen(QPen(bgcolor, penWidth, Qt::SolidLine));
    painter->setBrush(Qt::NoBrush);
    painter->drawRect(m_item->boundingRect().adjusted(pad, pad, -pad, -pad));

    painter->setPen(QPen(option->palette.windowText(), 0, Qt::DashLine));
    painter->setBrush(Qt::NoBrush);
    painter->drawRect(m_item->boundingRect().adjusted(pad, pad, -pad, -pad));
}

void DrawItemFrame::setItemMove(QPointF movePos)
{
    m_beginPos += movePos;
    m_endPos += movePos;

    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
}
void DrawItemFrame::setItemPosition(QTransform *tran)
{
    //QTransform tempTran = m_item->QTransform
    m_groupTran *= *tran;
    /*m_beginPos = m_item->mapToScene(m_beginPos);
    m_endPos = m_item->mapToScene(m_endPos);*/

    transFromGroup();
}

void DrawItemFrame::getItemData(ItemData &data)
{
    updatePublicData(data, false);
}

void DrawItemFrame::setItemData(ItemData &data)
{
    updatePublicData(data);

}

void DrawItemFrame::updatePublicData(ItemData & data, bool tag)
{
    if (tag)
    {
        itemType = data.itemType;
        m_beginPos = data.m_beginPos;
        m_oriBeginPos = m_beginPos;
        m_endPos = data.m_endPos;
        m_oriEndPos = m_endPos;
        m_bHorFlip = data.m_bHorFlip;
        m_bVerFlip = data.m_bVerFlip;
        m_iRotateAngle = data.m_iRotateAngle;
        pen = data.pen;
        m_groupTran = data.m_groupTran;

        transFromGroup();
    }
    else
    {
        data.itemType = itemType;
        data.m_beginPos = m_beginPos;
        data.m_endPos = m_endPos;
        data.m_bHorFlip = m_bHorFlip;
        data.m_bVerFlip = m_bVerFlip;
        data.m_iRotateAngle = m_iRotateAngle;
        data.pen = pen;
        data.m_groupTran = m_groupTran;
    }
}

QPointF DrawItemFrame::transFromGroup()
{
    qreal valueM11 = m_groupTran.m11();
    qreal valueM12 = m_groupTran.m12();
    qreal valueM21 = m_groupTran.m21();
    qreal valueM22 = m_groupTran.m22();

    qreal angle = atan(-(valueM21 / valueM22)) * 180 / PI;
    if (angle < 0 && angle > -90)
    {
        angle = 180 + angle;
    }

    /*if (angle > 0)
    {
        if (valueM12 < 0)
        {
            m_bHorFlip = !m_bHorFlip;
        }
        if (valueM21 > 0)
        {
            m_bVerFlip = !m_bVerFlip;
        }
    }
    else if (angle == 0)
    {
        if (valueM11 < 0)
        {
            m_bHorFlip = !m_bHorFlip;
        }
        if (valueM22 < 0)
        {
            m_bVerFlip = !m_bVerFlip;
        }
    }*/
    m_iRotateAngle += angle;

    QPointF pos = m_item->boundingRect().center();
    QPointF currentPos = m_groupTran.map(pos);
    QPointF movePos = currentPos - pos;
    m_beginPos += movePos;
    m_endPos += movePos; 

    /*QTransform tran = QTransform(cos(angle), sin(angle), -sin(angle), cos(angle),0,0);
    m_groupTran -= tran;*/

    m_groupTran.reset();
    return movePos;
}
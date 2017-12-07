#ifndef GROUP_GRAPHICSITEM_H
#define GROUP_GRAPHICSITEM_H

#include <QGraphicsItemGroup>
#include "DrawItemFrame.h"

class Group_GraphicsItem : public QObject, public QGraphicsItemGroup, public DrawItemFrame
{
    Q_OBJECT

public:
    Group_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent = NULL);
    ~Group_GraphicsItem();

    void setGroupItemPos();
    void setAlignLeft(qreal value);
    void setAlignRight(qreal value);
    void setAlignTop(qreal value);
    void setAlignBottom(qreal value);

    void setAliHorCenter(qreal value);
    void setAliVerCenter(qreal value);

    void setPageHorCenter(QRectF *rect);
    void setPageVerCenter(QRectF *rect);

    void setDownwardMovement();
    void setUpwardMovement();
    void setLeftMovement();
    void setRightMovement();

protected:
    QRectF boundingRect() const Q_DECL_OVERRIDE;
    QPainterPath shape() const Q_DECL_OVERRIDE;
    void paint(QPainter *painter, const QStyleOptionGraphicsItem *option = NULL, QWidget *widget = NULL) Q_DECL_OVERRIDE;
    void mousePressEvent(QGraphicsSceneMouseEvent *event);
    void mouseMoveEvent(QGraphicsSceneMouseEvent *event);
    void mouseReleaseEvent(QGraphicsSceneMouseEvent *event);

    void calcMoveData();
/*
private:
    qreal m_width;
    qreal m_height;*/
Q_SIGNALS:
    void sigSetItemMove(QPointF movePos);

    void signalItemChange(QGraphicsItem *item);
    void signalItemOriPos(QGraphicsItem *item);
private:
};




#endif // GROUP_GRAPHICSITEM_H
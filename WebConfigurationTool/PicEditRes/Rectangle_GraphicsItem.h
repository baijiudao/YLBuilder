#ifndef RECTANGLE_GRAPHICSITEM_H
#define RECTANGLE_GRAPHICSITEM_H

#include <QGraphicsRectItem>

#include "DrawItemFrame.h"

class Rectangle_GraphicsItem : public QObject, public QGraphicsItem, public DrawItemFrame
{
	Q_OBJECT

public:
    Rectangle_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent = NULL);
	~Rectangle_GraphicsItem();

    void setEndPos(QPoint *pos);
    QRectF boundingRect() const Q_DECL_OVERRIDE;
protected:
	QPainterPath shape() const Q_DECL_OVERRIDE;
	void paint(QPainter *painter, const QStyleOptionGraphicsItem *option = NULL, QWidget *widget = NULL) Q_DECL_OVERRIDE;

    void mousePressEvent(QGraphicsSceneMouseEvent *event);
    void mouseMoveEvent(QGraphicsSceneMouseEvent *event);
    void mouseReleaseEvent(QGraphicsSceneMouseEvent *event);
Q_SIGNALS:
    void signalItemChange(QGraphicsItem *item);
    void signalItemOriPos(QGraphicsItem *item);
};

#endif // RECTANGLE_GRAPHICSITEM_H

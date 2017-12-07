#ifndef ROURECTANGLE_GRAPHICSITEM_H
#define ROURECTANGLE_GRAPHICSITEM_H

#include "DrawItemFrame.h"

#include <QGraphicsItem>

class RouRectangle_GraphicsItem : public QObject, public QGraphicsItem, public DrawItemFrame
{
	Q_OBJECT

public:
    RouRectangle_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent = NULL);
    ~RouRectangle_GraphicsItem();

    void setEndPos(QPoint *pos);
    QRectF boundingRect() const Q_DECL_OVERRIDE;

    void getItemData(ItemData &data);
    void setItemData(ItemData &data);
protected:
	QPainterPath shape() const Q_DECL_OVERRIDE;
	void paint(QPainter *painter, const QStyleOptionGraphicsItem *option = NULL, QWidget *widget = NULL) Q_DECL_OVERRIDE;

    void mousePressEvent(QGraphicsSceneMouseEvent *event);
    void mouseMoveEvent(QGraphicsSceneMouseEvent *event);
    void mouseReleaseEvent(QGraphicsSceneMouseEvent *event);
Q_SIGNALS:
    void signalItemChange(QGraphicsItem *item);
    void signalItemOriPos(QGraphicsItem *item);
private:
    int m_xOriRnd;
    int m_yOriRnd;

    int m_xRnd;
    int m_yRnd;
    bool m_rouRectTrag;
};

#endif // ELLIPSE_GRAPHICSITEM_H

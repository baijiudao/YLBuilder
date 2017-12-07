#ifndef POLYGON_GRAPHICSITEM_H
#define POLYGON_GRAPHICSITEM_H

#include "DrawItemFrame.h"

#include <QGraphicsItem>

#define MAX_POINT_NUM 20

class Polygon_GraphicsItem : public QObject, public QGraphicsItem, public DrawItemFrame
{
	Q_OBJECT

public:
    Polygon_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent = NULL);
    ~Polygon_GraphicsItem();

    void setEndPos(QPoint *pos, bool tag = true);
    void addPoint(QPointF *pos);

    //把矩阵变换转换为角度与平移
    virtual QPointF transFromGroup();

    virtual void setAliHorCenter(qreal value);
    virtual void setAliVerCenter(qreal value);
    virtual void setAlignLeft(qreal value);
    virtual void setAlignRight(qreal value);
    virtual void setAlignTop(qreal value);
    virtual void setAlignBottom(qreal value);

    virtual void setPageHorCenter(QRectF *rect);
    virtual void setPageVerCenter(QRectF *rect);

    virtual void setDownwardMovement();
    virtual void setUpwardMovement();
    virtual void setLeftMovement();
    virtual void setRightMovement();

    virtual void setItemMove(QPointF movePos);
    //virtual void setItemPosition();

    virtual void getItemData(ItemData &data);
    virtual void setItemData(ItemData &data);

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
private:
    QList<QPointF> m_PolygonOriPoint;
    QList<QPointF> m_PolygonPoint;
    bool m_isDrawing;
    QPointF m_points[MAX_POINT_NUM];
};

#endif // ELLIPSE_GRAPHICSITEM_H

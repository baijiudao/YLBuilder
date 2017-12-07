#ifndef PICTURE_GRAPHICSITEM_H
#define PICTURE_GRAPHICSITEM_H

#include <QGraphicsProxyWidget>
#include "DrawItemFrame.h"

class Picture_GraphicsItem : public QGraphicsProxyWidget, public DrawItemFrame//, public QGraphicsItem
{
	Q_OBJECT

public:
    Picture_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QString str, QGraphicsView *parent = NULL);
    ~Picture_GraphicsItem();

    void saveSVG(QString strPath);
    //void setEndPos(QPoint *pos);
    QRectF boundingRect() const Q_DECL_OVERRIDE;
    void getItemData(ItemData &data);
    void setItemData(ItemData &data);
protected:
	
	QPainterPath shape() const Q_DECL_OVERRIDE;
	void paint(QPainter *painter, const QStyleOptionGraphicsItem *option = NULL, QWidget *widget = NULL) Q_DECL_OVERRIDE;

	void mousePressEvent(QGraphicsSceneMouseEvent *event);
	void mouseMoveEvent(QGraphicsSceneMouseEvent *event);
    void mouseReleaseEvent(QGraphicsSceneMouseEvent *event);
private:
    void loadPic(QString path);
public Q_SLOTS :

Q_SIGNALS:
    void signalItemChange(QGraphicsItem *item);
    void signalItemOriPos(QGraphicsItem *item);

private:
    ImageType m_imageType;
    QString m_strFilePath;

    QSize m_imageSize;

    //static int s_picCount;
};

#endif // PICTURE_GRAPHICSITEM_H

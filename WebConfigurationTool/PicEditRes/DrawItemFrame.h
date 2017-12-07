#ifndef DRAWITEMFRAME_H
#define DRAWITEMFRAME_H

#include <QObject>
#include <QGraphicsItem>
#include <QPen>
#include "QGraphicsView"
#include "DataStorager.h"

#define NUM_MAX 8

const double PI = 3.1415926;

enum RECTRANGE
{
	FIRST = 0,
	SECOND,
	THIRD,
	FOURTH,
	FIFTH,
	SIXTH,
	SEVENTH,
	EIGHTH,
	NOTIN
};

struct RECTANGLE
{
    qreal left;
    qreal top;
    qreal right;
    qreal bottom;
};
class DrawItemFrame
{
public:
    DrawItemFrame(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent = NULL);
	~DrawItemFrame();

    //把矩阵变换转换为角度与平移
    virtual QPointF transFromGroup();

    virtual void setAliHorCenter(qreal value);
    virtual void setAliVerCenter(qreal value);
    virtual void setAlignLeft(qreal value);
    virtual void setAlignRight(qreal value);
    virtual void setAlignTop(qreal value);
    virtual void setAlignBottom(qreal value);
    virtual void setHorSpacing(qreal value);
    virtual void setVerSpacing(qreal value);
    virtual void setPageHorCenter(QRectF *rect);
    virtual void setPageVerCenter(QRectF *rect);
    virtual void setDownwardMovement();
    virtual void setUpwardMovement();
    virtual void setLeftMovement();
    virtual void setRightMovement();
    void setRotate(int angle);
    void setTurnLeft();
    void setTurnRight();
    void setHorFlip();
    void setVerFlip();

    QRectF getRect()const;

    virtual void setItemColor(QColor &color);
    //virtual void setMoveDistance(qreal x, qreal y);

    virtual void setItemMove(QPointF movePos);
    virtual void setItemPosition(QTransform *tran);

    virtual void getItemData(ItemData &data);
    virtual void setItemData(ItemData &data);
protected:
    virtual void paintItemFrame(QPainter *painter, const QStyleOptionGraphicsItem *option);
    virtual void calcMoveData();
    //void setDrawTrans(QPainter *painter, const QStyleOptionGraphicsItem *option);
	RECTRANGE getRectRange(QPointF & pos);
    void rotateAngle();
    void getItemTransform(QTransform &tran, bool tag = true);
    void updatePublicData(ItemData &data, bool tag = true);
private:
    void qt_graphicsItem_highlightSelected(QGraphicsItem *item, QPainter *painter, const QStyleOptionGraphicsItem *option);
protected:
    //QGraphicsView *m_view;
	QGraphicsItem *m_item;

    DRAWTYPE itemType;

    QPen pen;
    RECTRANGE m_dragTag;

    QPointF m_oriBeginPos;
    QPointF m_oriEndPos;

    QPointF m_beginPos;
    QPointF m_endPos;

    QPointF m_moveBeginPos;
    QPointF m_moveEndPos;
    qreal m_moveX;
    qreal m_moveY;

    int m_iRotateAngle;
    bool m_bHorFlip;
    bool m_bVerFlip;

    QTransform m_groupTran;
};

#endif // DRAWITEMFRAME_H

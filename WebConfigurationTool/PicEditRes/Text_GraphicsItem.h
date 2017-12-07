#ifndef TEXT_GRAPHICSITEM_H
#define TEXT_GRAPHICSITEM_H

#include "DrawItemFrame.h"

#include <QGraphicsTextItem>

typedef struct FontProperty
{
    bool bold;
    bool italic;
    bool underline;
    QString strFont;
    QString strSize;

    void operator= (const FontProperty &temp)
    {
        bold = temp.bold;
        italic = temp.italic;
        underline = temp.underline;
        strFont = temp.strFont;
        strSize = temp.strSize;
    };
    FontProperty()
    {
        bold = false;
        italic = false;
        underline = false;
        strFont = QString::fromLocal8Bit("宋体");
        strSize = QString::fromLocal8Bit("9");
    }
    FontProperty(const FontProperty& s)
    {
        *this = s;
    }
}FontStyle;

class Text_GraphicsItem : public QGraphicsTextItem, public DrawItemFrame
{
	Q_OBJECT

public:
    Text_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent = NULL);
    ~Text_GraphicsItem();

    void setItemColor(QColor &color);
    void setFontStyle(FontStyle &style);
    FontStyle getFontStyle();
    void setEndPos(QPoint *pos);
    //void saveSVG(QString strPath);

    void getItemData(ItemData &data);
    void setItemData(ItemData &data);

    //把矩阵变换转换为角度与平移
    virtual QPointF transFromGroup();
protected:

	QRectF boundingRect() const Q_DECL_OVERRIDE;
	QPainterPath shape() const Q_DECL_OVERRIDE;
	void paint(QPainter *painter, const QStyleOptionGraphicsItem *option = NULL, QWidget *widget = NULL) Q_DECL_OVERRIDE;

    void mousePressEvent(QGraphicsSceneMouseEvent *event);
    void mouseMoveEvent(QGraphicsSceneMouseEvent *event);
    void mouseReleaseEvent(QGraphicsSceneMouseEvent *event);
    void mouseDoubleClickEvent(QGraphicsSceneMouseEvent *event);
public Q_SLOTS :
    void setEditFalse();
Q_SIGNALS:
    void signalItemChange(QGraphicsItem *item);
    void signalItemOriPos(QGraphicsItem *item);
private:

    QFont m_font;
    QColor m_color;
    QString m_text;
    QString m_oriText;
};

#endif // TEXT_GRAPHICSITEM_H

#include "Text_GraphicsItem.h"

#include <QGraphicsSceneMouseEvent>

Text_GraphicsItem::Text_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QGraphicsView *parent)
    :DrawItemFrame(pos, itemPen, type, parent)
    , m_text("text")
    ,m_oriText("text")
{
    setFlag(ItemIsMovable);
    setFlag(ItemIsSelectable);
    
    m_item = (QGraphicsItem *) this;

    setPos(m_beginPos.x(), m_beginPos.y());
    setPlainText(m_text);
    m_endPos = m_beginPos;
    m_oriBeginPos = m_beginPos;
    m_oriEndPos = m_endPos;
    update();
}

Text_GraphicsItem::~Text_GraphicsItem()
{

}

void Text_GraphicsItem::setItemColor(QColor &color)
{
    m_color = color;
}

void Text_GraphicsItem::setFontStyle(FontStyle &style)
{
    m_font.setBold(style.bold);
    m_font.setItalic(style.italic);
    m_font.setUnderline(style.underline);
    m_font.setPointSize(style.strSize.toFloat());
    m_font.setFamily(style.strFont);

    setFont(m_font);

    QRectF rect = QGraphicsTextItem::boundingRect();
    m_endPos = m_beginPos + QPointF(rect.width(), rect.height());
    m_oriEndPos = m_endPos;
}

FontStyle Text_GraphicsItem::getFontStyle()
{
    FontStyle style;
    style.bold = m_font.bold();
    style.italic = m_font.italic();
    style.underline = m_font.underline();
    style.strSize = QString::number(m_font.pointSize(), 10);
    style.strFont = m_font.family();
    return style;
}

void Text_GraphicsItem::setEndPos(QPoint *pos)
{
    setPlainText(m_text);
    update();
}
void Text_GraphicsItem::setEditFalse()
{
    m_text = toPlainText();
    setTextInteractionFlags(Qt::NoTextInteraction);

    QRectF rect = QGraphicsTextItem::boundingRect();
    m_endPos = m_beginPos + QPointF(rect.width(), rect.height());
    m_oriEndPos = m_endPos;

    if (m_oriText != m_text)
    {
        emit signalItemChange(this);
        m_oriText = m_text;
    }
}

QRectF Text_GraphicsItem::boundingRect() const
{
    //if (m_isInput)
    {
        return QGraphicsTextItem::boundingRect();
    }

    /*QRectF rect = QGraphicsTextItem::boundingRect();
    return QRectF(rect.x() + m_beginPos.x(), rect.y() + m_beginPos.y(), rect.width(), rect.height());*/
}

QPainterPath Text_GraphicsItem::shape() const
{

    QPainterPath path;
    QRectF rect = boundingRect();
    path.addRect(rect.x(), rect.y(), rect.width(), rect.height());
    return path;
}

void Text_GraphicsItem::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    
    if (NULL != widget)
    {
        setFont(m_font);
        setPos(m_beginPos.x(), m_beginPos.y());
        //setPos(0, 0);
        setDefaultTextColor(m_color);
        QGraphicsTextItem::paint(painter, option, widget);
    }
    else
    {
        setPos(0, 0);
        painter->setFont(m_font);
        QPen pen;
        pen.setColor(m_color);
        painter->setPen(pen);
        /*qreal hight = m_font.pointSize() + 5;
        QPointF tempPos = m_beginPos + QPointF(2, hight);*/
        //painter->drawText(tempPos, m_text);

        QRectF rect = boundingRect();
        QRectF currentRect = QRectF(rect.x() + m_beginPos.x(), rect.y() + m_beginPos.y(), rect.width(), rect.height());

        painter->drawText(currentRect, Qt::AlignHCenter | Qt::AlignVCenter, m_text);
        paintItemFrame(painter, option);
        prepareGeometryChange();
    }
    
    rotateAngle();
}

void Text_GraphicsItem::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveBeginPos = event->scenePos();
    m_dragTag = NOTIN;;
    setCursor(QCursor(Qt::ClosedHandCursor));
    QGraphicsTextItem::mousePressEvent(event);
    emit signalItemOriPos(this);
}

void Text_GraphicsItem::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveEndPos = event->scenePos();
    m_moveX = m_moveEndPos.x() - m_moveBeginPos.x();
    m_moveY = m_moveEndPos.y() - m_moveBeginPos.y();

    calcMoveData();

    m_moveBeginPos = m_moveEndPos;
    m_moveX = 0;
    m_moveY = 0;
    //QGraphicsTextItem::mouseMoveEvent(event);
    update();
}

void Text_GraphicsItem::mouseDoubleClickEvent(QGraphicsSceneMouseEvent *event)
{
    setTextInteractionFlags(Qt::TextEditorInteraction);
    setFocus();
    //QGraphicsTextItem::mouseDoubleClickEvent(event);
}
void Text_GraphicsItem::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveEndPos = event->scenePos();
    qreal moveX = m_moveEndPos.x() - m_moveBeginPos.x();
    qreal moveY = m_moveEndPos.y() - m_moveBeginPos.y();
    m_moveX = m_moveX + moveX;
    m_moveY = m_moveY + moveY;
    calcMoveData();
    setCursor(QCursor(Qt::ArrowCursor));
    QGraphicsTextItem::mouseReleaseEvent(event);
    update();

    if (m_oriBeginPos != m_beginPos || m_oriEndPos != m_endPos)
    {
        emit signalItemChange(this);
        m_oriBeginPos = m_beginPos;
        m_oriEndPos = m_endPos;
    }
}

void Text_GraphicsItem::getItemData(ItemData &data)
{
    updatePublicData(data, false);
    data.m_font = m_font;
    data.m_color = m_color;
    data.m_text = m_text;
}

void Text_GraphicsItem::setItemData(ItemData &data)
{
    updatePublicData(data);
    m_font = data.m_font;
    m_color = data.m_color;
    m_text = data.m_text;

    m_oriText = m_text;
    setPlainText(m_text);
}

QPointF Text_GraphicsItem::transFromGroup()
{
    return QPointF();
}

/*
void Text_GraphicsItem::saveSVG(QString strPath)
{
    //直接操作svg文件，将text文本写入
    std::wstring str = strPath.toStdWString();
    MCD_CSTR strFileName(str);
    CMarkup svg_Example;
    svg_Example.Load(strFileName);

    std::wstring svg = L"svg";

    wostringstream ossCount;
    ossCount << m_nameCount;
    wstring wStr = ossCount.str();
    std::wstring text = L"<text id = \"text_" + wStr + L"\"";

    qreal x = m_beginPos.x() + m_moveX;
    wostringstream ossX;
    ossX << x;
    wStr = ossX.str();
    text += L" x = \"" + wStr + L"\"";

    qreal y = m_beginPos.y() + m_moveY;
    wostringstream ossY;
    ossY << y;
    wStr = ossY.str();
    text += L" y = \"" + wStr + L"\"";

    QColor col = pen.color();
    int r = col.red();
    int g = col.green();
    int b = col.blue();
    wostringstream ossCol;
    ossCol << " fill = \"RGB(" << r << "," << g << "," << b << ")" << "\"";
    text += ossCol.str();

    //text += L"transform=\"rotate(30 20, 40)\"";

    text += L"> ";
    QString textContent = toPlainText();
    wStr = textContent.toStdWString();
    text += wStr + L"</text>";

    // L"<text id=\"path1\" x=\"0\" y=\"15\" fill=\"red\" transform=\"rotate(30 20, 40)\">I love SVG</text>";
    if (!svg_Example.FindElem(svg))
    {
        std::wstring title = L"<?xml version=\"1.0\" encoding=\"UTF - 8\" standalone=\"no\"?>";
        //title += "\n";
        title += L"< svg width = \"352.778mm\" height = \"282.222mm\"";
        title += L"viewBox = \"0 0 1000 800\"";
        title += L"xmlns = \"http://www.w3.org/2000/svg\" xmlns:xlink = \"http://www.w3.org/1999/xlink\"  version = \"1.2\" baseProfile = \"tiny\">";
        title += L"<title>SVG Generator Example Drawing< / title>";
        title += L"<desc>An SVG drawing created by the SVG Generator Example provided with Qt. < / desc >";
        title += text;
        title += L"< / svg>";
        svg_Example.InsertSubDoc(title);
    }
    else
    {
        svg_Example.AddChildSubDoc(text);
    }
    svg_Example.OutOfElem();
    svg_Example.Save(strFileName);
    return;
}*/
#include "Picture_GraphicsItem.h"
#include <QGraphicsSceneMouseEvent>
#include <QStyleOptionGraphicsItem>
#include <QtSvg>

//#include <QMessageBox>
#include "../Common/include/Markup.h"
#include <string.h>
#include <sstream>
using namespace std;

//int Picture_GraphicsItem::s_picCount = 0;

Picture_GraphicsItem::Picture_GraphicsItem(QPointF *pos, QPen *itemPen, DRAWTYPE type, QString str, QGraphicsView *parent)
    :DrawItemFrame(pos, itemPen, type, parent)
    , m_imageType(IMAGESVG)
    , m_imageSize(QSize(0,0))
{
	setFlag(ItemIsMovable);
    setFlag(ItemIsSelectable);
    m_item = (QGraphicsItem *) this;
    m_strFilePath = str;
    loadPic(str);
}


Picture_GraphicsItem::~Picture_GraphicsItem()
{

}

void Picture_GraphicsItem::loadPic(QString path)
{
    if (-1 != path.indexOf(".svg"))
    {
        m_imageType = IMAGESVG;
        QSvgWidget *pSVGWidget = new QSvgWidget();
        pSVGWidget->setAttribute(Qt::WA_TranslucentBackground);
        pSVGWidget->load(path);//fileName就是一个文件路径,由文件路径加载图片
        QSvgRenderer *render = pSVGWidget->renderer();
        m_imageSize = render->defaultSize();
        pSVGWidget->resize(m_imageSize);//使svgWidget窗体按SVG图片的默认尺寸进行显

        m_endPos = m_beginPos + QPointF(m_imageSize.width(), m_imageSize.height());
        setWidget(pSVGWidget);
    }
    else if (-1 != path.indexOf(".png"))
    {
        m_imageType = IMAGEPNG;
        QWidget *pWidget = new QWidget();

        QPixmap img(path);
        m_imageSize = img.size();
        pWidget->resize(m_imageSize);
        /*pWidget->setAutoFillBackground(true);
        QPalette palette;
        //palette.setColor(QPalette::Background, QColor(192, 253, 123));
        palette.setBrush(QPalette::Window, QBrush(img.scaled( // 缩放背景图.
            pWidget->size(),
            Qt::IgnoreAspectRatio,
            Qt::SmoothTransformation)));
        pWidget->setPalette(palette);*/
        QPalette pal = palette();
        pal.setColor(QPalette::Background, QColor(0x00, 0xff, 0x00, 0x00));
        pWidget->setPalette(pal);
        m_endPos = m_beginPos + QPointF(m_imageSize.width(), m_imageSize.height());
        setWidget(pWidget);
    }
    else if (-1 != path.indexOf(".jpg"))
    {
        m_imageType = IMAGEJPG;
        QWidget *pWidget = new QWidget();
        QPixmap img(path);
        m_imageSize = img.size();
        pWidget->resize(m_imageSize);
        /*pWidget->setAutoFillBackground(true);
        QPalette palette;
        palette.setBrush(QPalette::Window, QBrush(img));
        pWidget->setPalette(palette);*/
        QPalette pal = palette();
        pal.setColor(QPalette::Background, QColor(0x00, 0xff, 0x00, 0x00));
        pWidget->setPalette(pal);
        m_endPos = m_beginPos + QPointF(m_imageSize.width(), m_imageSize.height());
        setWidget(pWidget);
    }
    else if (-1 != path.indexOf(".xpm"))
    {
        m_imageType = IMAGEJPG;
    }
    
}

/*
void Picture_GraphicsItem::setEndPos(QPoint *pos)
{
    m_endPos = *pos;
    m_oriEndPos = m_endPos;
    update();
}*/


QRectF Picture_GraphicsItem::boundingRect() const
{
    return QGraphicsProxyWidget::boundingRect();
    //return getRect();
}
QPainterPath Picture_GraphicsItem::shape() const
{
    QPainterPath path;
    QRectF rect = boundingRect();
    path.addRect(rect.x(), rect.y(), rect.width(), rect.height());
    return path;
}

void Picture_GraphicsItem::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    if (IMAGESVG == m_imageType)
    {
        QWidget *pWidget = this->widget();
        QSvgWidget *pSVGWidget = (QSvgWidget *)pWidget;
        QSize size = QSize(m_endPos.x() - m_beginPos.x(), m_endPos.y() - m_beginPos.y());
        pSVGWidget->resize(size);
        setPos(m_beginPos.x(), m_beginPos.y());
        QGraphicsProxyWidget::paint(painter, option, widget);
    }
    else
    {
        if (NULL != widget)
        {
            setPos(m_beginPos.x(), m_beginPos.y());
            QWidget *pWidget = this->widget();
            QSize size = QSize(m_endPos.x() - m_beginPos.x(), m_endPos.y() - m_beginPos.y());
            pWidget->resize(size);
            painter->drawPixmap(0, 0, size.width(), size.height(), QPixmap(m_strFilePath));
        }
        else
        {
            setPos(m_beginPos.x(), m_beginPos.y());
            QSize size = QSize(m_endPos.x() - m_beginPos.x(), m_endPos.y() - m_beginPos.y());
            painter->drawPixmap(m_beginPos.x(), m_beginPos.y(), size.width(), size.height(), QPixmap(m_strFilePath));
        }
        
        
        /*QPixmap img(m_strFilePath);
        QSize size = img.size();
        m_endPos = m_beginPos + QPointF(size.width(), size.height());*/
    }
    
    paintItemFrame(painter, option);
    prepareGeometryChange();
    rotateAngle();
}

void Picture_GraphicsItem::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveBeginPos = event->scenePos();
    m_dragTag = getRectRange(m_moveBeginPos);
    emit signalItemOriPos(this);
    QGraphicsItem::mousePressEvent(event);
}

void Picture_GraphicsItem::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{
    m_moveEndPos = event->scenePos();
    m_moveX = m_moveEndPos.x() - m_moveBeginPos.x();
    m_moveY = m_moveEndPos.y() - m_moveBeginPos.y();

    if (IMAGESVG == m_imageType && (FIRST == m_dragTag || THIRD == m_dragTag || SIXTH == m_dragTag || EIGHTH == m_dragTag))
    {
        qreal x = m_imageSize.width();
        qreal y = m_imageSize.height();

        if (THIRD == m_dragTag || SIXTH == m_dragTag)
        {
            m_moveY = -m_moveX * y / x;
        }
        else
        {
            m_moveY = m_moveX * y / x;
        }
        m_moveEndPos.setY(m_moveBeginPos.y() + m_moveY);
    }

    calcMoveData();
    m_moveBeginPos = m_moveEndPos;
    m_moveX = 0;
    m_moveY = 0;
    //QGraphicsProxyWidget::mouseMoveEvent(event);
}

void Picture_GraphicsItem::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{
    m_dragTag = NOTIN;
    setCursor(QCursor(Qt::ArrowCursor));
    QGraphicsItem::mouseReleaseEvent(event);
    if (m_oriBeginPos != m_beginPos || m_oriEndPos != m_endPos)
    {
        emit signalItemChange(this);
        m_oriBeginPos = m_beginPos;
        m_oriEndPos = m_endPos;
    }
}

void Picture_GraphicsItem::getItemData(ItemData &data)
{
    updatePublicData(data, false);
    data.m_strFilePath = m_strFilePath;
    data.m_imageType = m_imageType;
}

void Picture_GraphicsItem::setItemData(ItemData &data)
{
    updatePublicData(data);
    m_strFilePath = data.m_strFilePath;
    m_imageType = data.m_imageType;

    /*if (IMAGESVG == m_imageType)
    {
        QWidget *pWidget = this->widget();
        QSvgWidget *pSVGWidget = (QSvgWidget *)pWidget;
        QSize size = QSize(m_endPos.x() - m_beginPos.x(), m_endPos.y() - m_beginPos.y());
        pSVGWidget->resize(size);
        //pSVGWidget->load(m_strFilePath);
    }*/
}

void Picture_GraphicsItem::saveSVG(QString strPath)
{
    if (IMAGESVG != m_imageType)
    {
        return;
    }
    std::wstring strSVG = L"svg";
    std::wstring strG = L"g";

    //读图片svg
    std::wstring str = m_strFilePath.toStdWString();
    MCD_CSTR strFileName(str);
    CMarkup svg_Example;
    svg_Example.Load(strFileName);

    if (!svg_Example.FindElem(strSVG))
    {
        //QMessageBox::warning(this, tr("ERROR"), tr("文件格式错误，未发现SVG标识！"), QMessageBox::Ok);
        //QMessageBox::information(this, tr("ERROR"), QString::fromUtf8("File format error, not found SVG logo!"), QMessageBox::Ok);
        return;
    }
    std::wstring strX = L"x";
    std::wstring strY = L"y";

    std::wstring strWidth = L"width";
    std::wstring strHeight = L"height";

    svg_Example.SetAttrib(strX, m_beginPos.x());
    svg_Example.SetAttrib(strY, m_beginPos.y());

    svg_Example.SetAttrib(strWidth, m_endPos.x() - m_beginPos.x());
    svg_Example.SetAttrib(strHeight, m_endPos.y() - m_beginPos.y());

    std::wstring wstrSVG = svg_Example.GetDoc();
    QString strInputSVG = QString::fromStdWString(wstrSVG);
    int startPos = strInputSVG.indexOf("<svg");
    int endPos = strInputSVG.length();
    strInputSVG = strInputSVG.right(endPos - startPos);

    std::wstring wstrInputSVG = strInputSVG.toStdWString();

    std::wstring wstrPath = strPath.toStdWString();
    MCD_CSTR outStrFile(wstrPath);
    CMarkup outSvg_Example;
    outSvg_Example.Load(outStrFile);

    if (!outSvg_Example.FindElem(strSVG) || !outSvg_Example.FindChildElem(strG))
    {
        std::wstring title = L"<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        //title += "\n";
        title += L"< svg width = \"352.778mm\" height = \"282.222mm\"";
        title += L"viewBox = \"0 0 1000 800\"";
        title += L"xmlns = \"http://www.w3.org/2000/svg\" xmlns:xlink = \"http://www.w3.org/1999/xlink\"  version = \"1.2\" baseProfile = \"tiny\">";
        title += L"<title>SVG Generator Example Drawing< / title>";
        title += L"<desc>An SVG drawing created by the SVG Generator Example provided with Qt. < / desc >";
        title += L"\n";
        title += wstrInputSVG;
        title += L"\n< / svg>";
        outSvg_Example.InsertSubDoc(title);
    }
    else
    {
        //outSvg_Example.IntoElem();
        outSvg_Example.AddChildSubDoc(wstrInputSVG);
        //outSvg_Example.OutOfElem();
    }
    outSvg_Example.OutOfElem();
    outSvg_Example.Save(outStrFile);
    return;
}

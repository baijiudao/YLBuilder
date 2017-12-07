#ifndef MAINGRAPHICSVIEW_H
#define MAINGRAPHICSVIEW_H

#include "PicEditRes/Line_GraphicsItem.h"
#include "PicEditRes/Rectangle_GraphicsItem.h"
#include "PicEditRes/Ellipse_GraphicsItem.h"
#include "PicEditRes/RouRectangle_GraphicsItem.h"
#include "PicEditRes/Polygon_GraphicsItem.h"
#include "PicEditRes/Text_GraphicsItem.h"
#include "PicEditRes/Picture_GraphicsItem.h"
#include "PicEditRes/Group_GraphicsItem.h"
#include "PicEditRes/MainGraphicsScene.h"
#include "PicEditRes/DataStorager.h"
#include <QObject>
#include <QGraphicsView>
#include <QGraphicsRectItem>

static const char *c_sCommon = "Common";
static const char *c_sCommonError = QT_TRANSLATE_NOOP("Common", "Error");
static const char *c_sCommonWarning = QT_TRANSLATE_NOOP("Common", "Warning");
static const char *c_sCommonYes = QT_TRANSLATE_NOOP("Common", "CommonYes");
static const char *c_sCommonNo = QT_TRANSLATE_NOOP("Common", "CommonNo");
static const char *c_sCommonOK = QT_TRANSLATE_NOOP("Common", "CommonOK");
static const char *c_sCommonCancel = QT_TRANSLATE_NOOP("Common", "CommonCancel");

static const char *c_sMainView = "PicMainView";
static const char *c_sMainViewIsSave = QT_TRANSLATE_NOOP("PicMainView", "IsSaveWarning");
static const char *c_sMainViewAnalySVGError = QT_TRANSLATE_NOOP("PicMainView", "AnalySVGError");
static const char *c_sOpenTempFolderError = QT_TRANSLATE_NOOP("PicMainView", "OpenTempFolderError");
static const char *c_sMainViewInsertPic = QT_TRANSLATE_NOOP("PicMainView", "InsertPicture");
static const char *c_sMainViewPicType = QT_TRANSLATE_NOOP("PicMainView", "PicType");


class MainGraphicsView : public QGraphicsView
{
	Q_OBJECT

public:
	MainGraphicsView(QWidget *parent = Q_NULLPTR, QString pathName = "");
	~MainGraphicsView();

	void setDrawType(DRAWTYPE type = DRAW_SELECT);
    void setFilePath(QString pathName);
    bool getCurrentFont(FontStyle &style);
    void setCurrentFont(FontStyle type);
    bool isChangeOfContent();
    QString getCurrentFilePath();
protected:
    virtual void dragEnterEvent(QDragEnterEvent *event);
    virtual void dragMoveEvent(QDragMoveEvent *event);
    virtual void dropEvent(QDropEvent *event);

	virtual void mousePressEvent(QMouseEvent *event);
	virtual void mouseReleaseEvent(QMouseEvent *event);
	virtual void mouseDoubleClickEvent(QMouseEvent *event);
	virtual void mouseMoveEvent(QMouseEvent *event);
	virtual void showEvent(QShowEvent *event);
    virtual void resizeEvent(QResizeEvent *event);
    void keyPressEvent(QKeyEvent *event);
private:
    DRAWTYPE getItemType(const QGraphicsItem *item);
    void setItemFont();
    void setIconStatus();
    void calcRotateAngle();
    void deleteSelectItem();
    void deleteItem(QGraphicsItem *item);
    void setAllSelect();

    void setSelectItemData(QList<QGraphicsItem *> &itemList, OPERATETYPE type = OPERATE_CHANGE);
    void setSelItemDataToNext(QList<QGraphicsItem *> &itemList, OPERATETYPE type = OPERATE_CHANGE);

    void setNewItem(QList<ItemData>::iterator &it);
    void setChangeItem(QList<ItemData>::iterator &it);

    void cancelAss(QList<ItemData>::iterator &it);
    void newAssemble(QList<ItemData>::iterator &it);
    void readSVGFile(QString strPathName);
    int strSeparator(qreal *array[], QString str);

    void openPicItem(QPointF pos);

    void insertPicItem(QString path, QPointF pos);

    QRectF getItemRect(QGraphicsItem *item);
public Q_SLOTS :
    void onOperateBack();
    void onOperateForward();
    void onOperateCopy();
    void onOperatePaste();

    void onItemOriPos(QGraphicsItem *item);
    void onItemChange(QGraphicsItem *item);
    
    void onNewSVG();
	void onSaveSVG();
    QString onSaveAsSVG(QString strPath);
    void onOpenSVG(QString strPathName);
    void onCloseSVG();

    void onAssemble();
    void onCancelAss();
    void onBestBefore();
    void onBestAfter();
    void onBefore();
    void onAfter();
    void onAlignLeft();
    void onAlignRight();
    void onAlignTop();
    void onAlignBottom();
    void onAliHorCenter();
    void onAliVerCenter(); 
    void onHorSpacing();
    void onVerSpacing();
    void onPageHorCenter();
    void onPageVerCenter();
    void onDownwardMovement();
    void onUpwardMovement();
    void onLeftMovement();
    void onRightMovement();
    void onRotate(bool isCheck);
    void onTurnLeft();
    void onTurnRight();
    void onHorFlip();
    void onVerFlip();

    void onFontBold(bool tag);
    void onFontItalic(bool tag);
    void onFontUnderline(bool tag);
    void onForegroundColor();

    void onSetFontComboBox(QString font);
    void onSetFontSizeComboBox(QString size);

    void onSetItemMove(QPointF movePos);
Q_SIGNALS:
	void sigSetRadioButton();
    void sigSetEditFalse();
    void sigIconStatus(int count, FontStyle style, bool isExistPic);
private:
	DRAWTYPE addTag;
	bool isDrawing;
    QPen m_pen;

	QPointF m_beginPos;
    Line_GraphicsItem* m_currentLineItem;
    Rectangle_GraphicsItem *m_currentRectItem;
    Ellipse_GraphicsItem *m_currentEllipseItem;
    RouRectangle_GraphicsItem *m_currentRouRectItem;
    Polygon_GraphicsItem *m_currentPolygonItem;
    Text_GraphicsItem *m_currentTextItem;
    Picture_GraphicsItem *m_currentPicItem;
    MainGraphicsScene *m_scene;

    QList<Line_GraphicsItem *> m_lineItemList;
    QList<Rectangle_GraphicsItem *> m_rectItemList;
    QList<Ellipse_GraphicsItem *> m_ellipseItemList;
    QList<RouRectangle_GraphicsItem *> m_rouRectItemList;
    QList<Polygon_GraphicsItem *> m_polygonItemList;
    QList<Text_GraphicsItem *> m_textItemList;
    QList<Picture_GraphicsItem *>m_picItemList;

    QList<QGraphicsItem *> m_selectItemList;

    FontStyle m_fontStyle;

    QPointF m_beginSelPoint;
    QPointF m_endSelPoint;
    QGraphicsRectItem m_selectRect;
    bool m_isSelect;
    QGraphicsItem *m_currentSelectedItem;
    QList<QGraphicsItem *> m_curSelItemList;

    bool m_isRotating;
    bool m_isBeginRotate;
    QPointF m_beginRotPoint;
    QPointF m_endRotPoint;
    int m_lastRotAngle;

    //组合
    Group_GraphicsItem *m_groupItem;
    //QList<Group_GraphicsItem *>m_groupList;
    //后退、重做
    DataStorager m_dataStor;

    ItemDataList *m_lastOperate;

    bool m_isChange;

    QString m_filePath;
};

#endif // MAINGRAPHICSVIEW_H

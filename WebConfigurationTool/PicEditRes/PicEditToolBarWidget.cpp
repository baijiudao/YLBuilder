/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  WebEditToolBarWidget.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               网页编辑工具条类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/5/22
** Descriptions:               END
** 
*********************************************************************************************************/
#include "PicEditToolBarWidget.h"
#include <QApplication>
#include <QCheckBox>
#include <QDebug>

PicEditToolBarWidget::PicEditToolBarWidget(int type, RibbonPage *page, QWidget *parent)
	//: QObject(parent)
	: m_type(type)
    , pm_parent(parent)
    , m_pageDrawTool(page)
    , m_pMainWidget(NULL)
{
	init();
}

PicEditToolBarWidget::~PicEditToolBarWidget()
{
	//delete m_pWebEngineEditView;
	//m_pWebEngineEditView = NULL;
}

void PicEditToolBarWidget::createStrPtrMap()
{
    if (UI_PIC == m_type)
    {
        m_charPtrMap.insert(c_sPicEditFrameDrawTools, c_sPicEditFrameDrawTools);
        m_charPtrMap.insert(c_sPicEditFrameGroupComTool, c_sPicEditFrameGroupComTool);
        m_charPtrMap.insert(c_sPicEditFrameNewFile, c_sPicEditFrameNewFile);
        m_charPtrMap.insert(c_sPicEditFrameSaveFile, c_sPicEditFrameSaveFile);
        m_charPtrMap.insert(c_sPicEditFrameSaveAsFile, c_sPicEditFrameSaveAsFile);
        m_charPtrMap.insert(c_sPicEditFrameOpenFile, c_sPicEditFrameOpenFile);
        m_charPtrMap.insert(c_sPicEditFrameCloseFile, c_sPicEditFrameCloseFile);
    }
    else
    {
        m_charPtrMap.insert(c_sPicStorEditFrameDrawTools, c_sPicStorEditFrameDrawTools);
        m_charPtrMap.insert(c_sPicEditFrameStorResWindow, c_sPicEditFrameStorResWindow);
        m_charPtrMap.insert(c_sPicStorEditFrameNew, c_sPicStorEditFrameNew);
        m_charPtrMap.insert(c_sPicStorEditFrameOpen, c_sPicStorEditFrameOpen);
        m_charPtrMap.insert(c_sPicStorEditFrameSave, c_sPicStorEditFrameSave);
        m_charPtrMap.insert(c_sPicStorEditFrameAsSave, c_sPicStorEditFrameAsSave);
        m_charPtrMap.insert(c_sPicStorEditFrameClose, c_sPicStorEditFrameClose);
    }
    
    m_charPtrMap.insert(c_sPicEditFrameGroupDrawTool, c_sPicEditFrameGroupDrawTool);
    m_charPtrMap.insert(c_sPicEditFrameDrawSelect, c_sPicEditFrameDrawSelect);
    m_charPtrMap.insert(c_sPicEditFrameDrawLine, c_sPicEditFrameDrawLine);
    m_charPtrMap.insert(c_sPicEditFrameDrawRectangle, c_sPicEditFrameDrawRectangle);
    m_charPtrMap.insert(c_sPicEditFrameDrawEllipse, c_sPicEditFrameDrawEllipse);
    m_charPtrMap.insert(c_sPicEditFrameDrawRouRect, c_sPicEditFrameDrawRouRect);
    m_charPtrMap.insert(c_sPicEditFrameDrawPolygon, c_sPicEditFrameDrawPolygon);
    m_charPtrMap.insert(c_sPicEditFrameDrawText, c_sPicEditFrameDrawText);
    m_charPtrMap.insert(c_sPicEditFrameDrawPicture, c_sPicEditFrameDrawPicture);

    

    m_charPtrMap.insert(c_sPicEditFrameGroupStyleTool, c_sPicEditFrameGroupStyleTool);

    m_charPtrMap.insert(c_sPicEditFrameGroupOptTool, c_sPicEditFrameGroupOptTool);
    m_charPtrMap.insert(c_sPicEditFrameAssemble, c_sPicEditFrameAssemble);
    m_charPtrMap.insert(c_sPicEditFrameCancelAss, c_sPicEditFrameCancelAss);
    m_charPtrMap.insert(c_sPicEditFrameBestBefore, c_sPicEditFrameBestBefore);
    m_charPtrMap.insert(c_sPicEditFrameBestAfter, c_sPicEditFrameBestAfter);
    m_charPtrMap.insert(c_sPicEditFrameBefore, c_sPicEditFrameBefore);
    m_charPtrMap.insert(c_sPicEditFrameAfter, c_sPicEditFrameAfter);
    m_charPtrMap.insert(c_sPicEditFrameAlignLeft, c_sPicEditFrameAlignLeft);
    m_charPtrMap.insert(c_sPicEditFrameAlignRight, c_sPicEditFrameAlignRight);
    m_charPtrMap.insert(c_sPicEditFrameAlignTop, c_sPicEditFrameAlignTop);
    m_charPtrMap.insert(c_sPicEditFrameAlignBottom, c_sPicEditFrameAlignBottom);
    m_charPtrMap.insert(c_sPicEditFrameAliHorCenter, c_sPicEditFrameAliHorCenter);
    m_charPtrMap.insert(c_sPicEditFrameAliVerCenter, c_sPicEditFrameAliVerCenter);
    m_charPtrMap.insert(c_sPicEditFrameHorSpacing, c_sPicEditFrameHorSpacing);
    m_charPtrMap.insert(c_sPicEditFrameVerSpacing, c_sPicEditFrameVerSpacing);
    m_charPtrMap.insert(c_sPicEditFramePageHorCenter, c_sPicEditFramePageHorCenter);
    m_charPtrMap.insert(c_sPicEditFramePageVerCenter, c_sPicEditFramePageVerCenter);
    m_charPtrMap.insert(c_sPicEditFrameDownwardMovement, c_sPicEditFrameDownwardMovement);
    m_charPtrMap.insert(c_sPicEditFrameUpwardMovement, c_sPicEditFrameUpwardMovement);
    m_charPtrMap.insert(c_sPicEditFrameLeftMovement, c_sPicEditFrameLeftMovement);
    m_charPtrMap.insert(c_sPicEditFrameRightMovement, c_sPicEditFrameRightMovement);
    m_charPtrMap.insert(c_sPicEditFrameRotate, c_sPicEditFrameRotate);
    m_charPtrMap.insert(c_sPicEditFrameTurnLeft, c_sPicEditFrameTurnLeft);
    m_charPtrMap.insert(c_sPicEditFrameTurnRight, c_sPicEditFrameTurnRight);
    m_charPtrMap.insert(c_sPicEditFrameHorFlip, c_sPicEditFrameHorFlip);
    m_charPtrMap.insert(c_sPicEditFrameVerFlip, c_sPicEditFrameVerFlip);

    m_charPtrMap.insert(c_sPicEditFrameGroupDockTool, c_sPicEditFrameGroupDockTool);
    m_charPtrMap.insert(c_sPicEditFrameResWindow, c_sPicEditFrameResWindow);
    //end add by gaoxin 2016-12-29 
}
/**        
 * @brief:  初始化工具条      
 */
void PicEditToolBarWidget::init()
{
    createStrPtrMap();
    makeWidget();
    //m_pWEEditRibbonPage->setEnabled(true);
    //m_pWEEditRibbonPage->setVisible(true);    retranslate();
    onSetDrawIconStatus(false);
    onIconStatus(0);
}

/**        
 * @brief:        
 * @param[in]:  
 */

void PicEditToolBarWidget::setPicMainFrame(MainGraphicsView *pWidget)
{
    if (NULL == pWidget)
    {
        return;
    }
    m_pMainWidget = pWidget;

    QList<QGraphicsItem *> itemList = m_pMainWidget->scene()->selectedItems();
    FontStyle style;
    bool isExistPic = m_pMainWidget->getCurrentFont(style);
    int count = itemList.size();
    onIconStatus(count, style, isExistPic);
}

/**        
 * @brief: 翻译      
 */
void PicEditToolBarWidget::retranslate()
{
    
    QMap<QString, Qtitan::RibbonPage*>::iterator itorRibbonPage = m_ribbonPageMap.begin();
    for (; itorRibbonPage != m_ribbonPageMap.end(); itorRibbonPage++)
    {
        itorRibbonPage.value()->setTitle(qApp->translate(c_sPicEditFrame, m_charPtrMap.value(itorRibbonPage.key())));
    }

    QMap<QString, Qtitan::RibbonGroup*>::iterator itorRibbonGroup = m_ribbonGroupMap.begin();
    for (; itorRibbonGroup != m_ribbonGroupMap.end(); itorRibbonGroup++)
    {
        itorRibbonGroup.value()->setTitle(qApp->translate(c_sPicEditFrame, m_charPtrMap.value(itorRibbonGroup.key())));
    }

    QMap<QString, QAction*>::iterator itorActions = m_actionsMap.begin();
    for (; itorActions != m_actionsMap.end(); itorActions++)
    {
        itorActions.value()->setText(qApp->translate(c_sPicEditFrame, m_charPtrMap.value(itorActions.key())));
    }

    QMap<QString, QAbstractButton*>::iterator itorAbstractButtons = m_abstractButtonsMap.begin();
    for (; itorAbstractButtons != m_abstractButtonsMap.end(); itorAbstractButtons++)
    {
        itorAbstractButtons.value()->setText(qApp->translate(c_sPicEditFrame, m_charPtrMap.value(itorAbstractButtons.key())));
        itorAbstractButtons.value()->setToolTip(qApp->translate(c_sPicEditFrame, m_charPtrMap.value(itorAbstractButtons.key())));
    }
}

void PicEditToolBarWidget::makeWidget()
{
    //绘图工具
    Qtitan::RibbonMainWindow *pRibbonWindow = (Qtitan::RibbonMainWindow *)pm_parent;
    RibbonBar* pRibbonBar = pRibbonWindow->ribbonBar();
    if (NULL != m_pageDrawTool)
    {
        if (UI_PIC == m_type)
        {
            m_ribbonPageMap.insert(c_sPicEditFrameDrawTools, m_pageDrawTool);
            if (Qtitan::RibbonGroup* groupView = m_pageDrawTool->addGroup(""))
            {
                m_ribbonGroupMap.insert(c_sPicEditFrameGroupComTool, groupView);

                QAction* ptmpAction = groupView->addAction(QIcon(":/WebConfigurationTool/res/newPicFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicEditFrameNewFile, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onNewSVG);

                ptmpAction = groupView->addAction(QIcon(":/WebConfigurationTool/res/openFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicEditFrameOpenFile, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onOpenSVG);

                ptmpAction = groupView->addAction(QIcon(":/WebConfigurationTool/res/saveFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicEditFrameSaveFile, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onSaveSVG);

                ptmpAction = groupView->addAction(QIcon(":/WebConfigurationTool/res/FileSaveAs.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicEditFrameSaveAsFile, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onSaveAsSVG);

                ptmpAction = groupView->addAction(QIcon(":/WebConfigurationTool/res/closeFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicEditFrameCloseFile, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onCloseSVG);
            }
        }
        else
        {
            m_ribbonPageMap.insert(c_sPicStorEditFrameDrawTools, m_pageDrawTool);

            if (Qtitan::RibbonGroup* storPicGroup = m_pageDrawTool->addGroup(""))
            {
                m_ribbonGroupMap.insert(c_sPicStorEditFrameDrawTools, storPicGroup);

                QAction* ptmpAction = storPicGroup->addAction(QIcon(":/WebConfigurationTool/res/newStorPicFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicStorEditFrameNew, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onNewSVG);

                ptmpAction = storPicGroup->addAction(QIcon(":/WebConfigurationTool/res/openFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicStorEditFrameOpen, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onOpenSVG);

                ptmpAction = storPicGroup->addAction(QIcon(":/WebConfigurationTool/res/saveFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicStorEditFrameSave, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onSaveSVG);

                ptmpAction = storPicGroup->addAction(QIcon(":/WebConfigurationTool/res/FileSaveAs.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicStorEditFrameAsSave, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onSaveAsSVG);

                ptmpAction = storPicGroup->addAction(QIcon(":/WebConfigurationTool/res/closeFile.png"), "", Qt::ToolButtonTextUnderIcon);
                m_actionsMap.insert(c_sPicStorEditFrameClose, ptmpAction);
                //connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onCloseSVG);
            }
        }

        //connect(m_pageDrawTool, &RibbonPage::activated, this, &PicEditFrame::onMenuChange);

        if (Qtitan::RibbonGroup* groupDrawTool = m_pageDrawTool->addGroup(""))
        {
            m_ribbonGroupMap.insert(c_sPicEditFrameGroupDrawTool, groupDrawTool);

            QRadioButton* radioDraw_mouse = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawSelect, radioDraw_mouse);
            groupDrawTool->addWidget(radioDraw_mouse);

            QRadioButton* radioDraw_Line = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawLine, radioDraw_Line);
            groupDrawTool->addWidget(radioDraw_Line);

            QRadioButton* radioDraw_Rectangle = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawRectangle, radioDraw_Rectangle);
            groupDrawTool->addWidget(radioDraw_Rectangle);

            QRadioButton* radioDraw_Ellipse = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawEllipse, radioDraw_Ellipse);
            groupDrawTool->addWidget(radioDraw_Ellipse);

            QRadioButton* radioDraw_RouRect = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawRouRect, radioDraw_RouRect);
            groupDrawTool->addWidget(radioDraw_RouRect);

            QRadioButton* radioDraw_Polygon = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawPolygon, radioDraw_Polygon);
            groupDrawTool->addWidget(radioDraw_Polygon);

            QRadioButton* radioDraw_Text = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawText, radioDraw_Text);
            groupDrawTool->addWidget(radioDraw_Text);

            QRadioButton* radioDraw_Picture = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sPicEditFrameDrawPicture, radioDraw_Picture);
            groupDrawTool->addWidget(radioDraw_Picture);

            m_btnGroupDraw = new QButtonGroup(this);
            m_btnGroupDraw->addButton(radioDraw_mouse, 0);
            m_btnGroupDraw->addButton(radioDraw_Line, 1);
            m_btnGroupDraw->addButton(radioDraw_Rectangle, 2);
            m_btnGroupDraw->addButton(radioDraw_Ellipse, 3);
            m_btnGroupDraw->addButton(radioDraw_RouRect, 4);
            m_btnGroupDraw->addButton(radioDraw_Polygon, 5);
            m_btnGroupDraw->addButton(radioDraw_Text, 6);
            m_btnGroupDraw->addButton(radioDraw_Picture, 7);
            radioDraw_mouse->setChecked(true);
            connect(radioDraw_mouse, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_Line, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_Rectangle, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_Ellipse, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_RouRect, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_Polygon, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_Text, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
            connect(radioDraw_Picture, &QRadioButton::clicked, this, &PicEditToolBarWidget::onRadioDrawToolChange);
        }

        if (Qtitan::RibbonGroup *groupStyle = m_pageDrawTool->addGroup(""))
        {
            m_ribbonGroupMap.insert(c_sPicEditFrameGroupStyleTool, groupStyle);
            groupStyle->setControlsGrouping();
            QFontComboBox *fontComboBox = new QFontComboBox();
            fontComboBox->setFixedWidth(100);
            groupStyle->addWidget(fontComboBox);
            connect(fontComboBox, SIGNAL(activated(QString)), this, SLOT(onSetFontComboBox(QString)));
            m_fontComboBox = fontComboBox;

            QComboBox *SizeComboBox = new QComboBox();
            QFontDatabase FontDb;
            foreach(int size, FontDb.standardSizes()) {
                SizeComboBox->addItem(QString::number(size));
            }
            SizeComboBox->setCurrentIndex(3);
            groupStyle->addWidget(SizeComboBox);
            connect(SizeComboBox, SIGNAL(activated(QString)), this, SLOT(onSetFontSizeComboBox(QString)));
            m_SizeComboBox = SizeComboBox;

            groupStyle->addBeginning();
            QAction* ptmpAction = groupStyle->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_FontWide.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameFontWide, ptmpAction);
            ptmpAction->setCheckable(true);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onFontBold);

            ptmpAction = groupStyle->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_FontItalic.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameFontItalic, ptmpAction);
            ptmpAction->setCheckable(true);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onFontItalic);


            ptmpAction = groupStyle->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_FontUnderline.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameFontUnderline, ptmpAction);
            ptmpAction->setCheckable(true);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onFontUnderline);


            ptmpAction = groupStyle->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_ForegroundColor.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameForegroundColor, ptmpAction);
            //ptmpAction->setCheckable(true);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onForegroundColor);

        }
        if (Qtitan::RibbonGroup* groupOperate = m_pageDrawTool->addGroup(""))
        {
            m_ribbonGroupMap.insert(c_sPicEditFrameGroupOptTool, groupOperate);

            QAction* ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_Assemble.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAssemble, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAssemble);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_CancelAss.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameCancelAss, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onCancelAss);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_BestBefore.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameBestBefore, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onBestBefore);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_BestAfter.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameBestAfter, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onBestAfter);

            groupOperate->addBeginning();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_Before.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameBefore, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onBefore);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_After.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAfter, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAfter);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignLeft.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAlignLeft, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAlignLeft);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignRight.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAlignRight, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAlignRight);

            groupOperate->addBeginning();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignTop.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAlignTop, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAlignTop);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignBottom.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAlignBottom, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAlignBottom);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AliHorCenter.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAliHorCenter, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAliHorCenter);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AliVerCenter.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameAliVerCenter, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onAliVerCenter);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_HorSpacing.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameHorSpacing, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onHorSpacing);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_VerSpacing.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameVerSpacing, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onVerSpacing);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_PageHorCenter.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFramePageHorCenter, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onPageHorCenter);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_PageVerCenter.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFramePageVerCenter, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onPageVerCenter);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_DownwardMovement.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameDownwardMovement, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onDownwardMovement);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_UpwardMovement.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameUpwardMovement, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onUpwardMovement);

            groupOperate->addBeginning();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_LeftMovement.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameLeftMovement, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onLeftMovement);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_RightMovement.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameRightMovement, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onRightMovement);

            groupOperate->addSeparator();

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_Rotate.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameRotate, ptmpAction);
            ptmpAction->setCheckable(true);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onRotate);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_TurnLeft.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameTurnLeft, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onTurnLeft);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_TurnRight.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameTurnRight, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onTurnRight);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_HorFlip.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameHorFlip, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onHorFlip);

            ptmpAction = groupOperate->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_VerFlip.png"), "", Qt::ToolButtonIconOnly);
            m_actionsMap.insert(c_sPicEditFrameVerFlip, ptmpAction);
            connect(ptmpAction, &QAction::triggered, this, &PicEditToolBarWidget::onVerFlip);

        }
        if (Qtitan::RibbonGroup* groupDockingTool = m_pageDrawTool->addGroup(""))
        {
            m_ribbonGroupMap.insert(c_sPicEditFrameGroupDockTool, groupDockingTool);

            if (UI_PICSTOR == m_type)
            {
                QCheckBox* resStorCheckBox = new QCheckBox("");
                m_abstractButtonsMap.insert(c_sPicEditFrameStorResWindow, resStorCheckBox);
                groupDockingTool->addWidget(resStorCheckBox);
                resStorCheckBox->setCheckState(Qt::Checked);
            }

            QCheckBox* resCheckBox = new QCheckBox("");
            m_abstractButtonsMap.insert(c_sPicEditFrameResWindow, resCheckBox);
            groupDockingTool->addWidget(resCheckBox);
            resCheckBox->setCheckState(Qt::Checked);
            //connect(resCheckBox, &QCheckBox::stateChanged, this, &PicEditToolBarWidget::showControlDockWidget);
            
        }
    }
}

void PicEditToolBarWidget::onSetDrawIconStatus(bool bAble)
{
    Qtitan::RibbonGroup* groupDrawTool = m_ribbonGroupMap[c_sPicEditFrameGroupDrawTool];
    groupDrawTool->setDisabled(!bAble);

    groupDrawTool = m_ribbonGroupMap[c_sPicEditFrameGroupStyleTool];
    groupDrawTool->setDisabled(!bAble);
}

void PicEditToolBarWidget::onIconStatus(int count, FontStyle style, bool isExistPic)
{
    switch (count)
    {
    case 0:
    {
        m_actionsMap[c_sPicEditFrameAssemble]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameCancelAss]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameBestBefore]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameBestAfter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameBefore]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAfter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignLeft]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignRight]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignTop]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignBottom]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAliHorCenter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAliVerCenter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameHorSpacing]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameVerSpacing]->setDisabled(true);
        m_actionsMap[c_sPicEditFramePageHorCenter]->setDisabled(true);
        m_actionsMap[c_sPicEditFramePageVerCenter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameDownwardMovement]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameUpwardMovement]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameLeftMovement]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameRightMovement]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameRotate]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameTurnLeft]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameTurnRight]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameHorFlip]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameVerFlip]->setDisabled(true);
        break;
    }

    case 1:
        m_actionsMap[c_sPicEditFrameAssemble]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameCancelAss]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBestBefore]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBestAfter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBefore]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAfter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignLeft]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignRight]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignTop]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAlignBottom]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAliHorCenter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameAliVerCenter]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameHorSpacing]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameVerSpacing]->setDisabled(true);
        m_actionsMap[c_sPicEditFramePageHorCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFramePageVerCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameDownwardMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameUpwardMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameLeftMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameRightMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameRotate]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameTurnLeft]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameTurnRight]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameHorFlip]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameVerFlip]->setDisabled(false);
        break;
    case 2:
        m_actionsMap[c_sPicEditFrameAssemble]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameCancelAss]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBestBefore]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBestAfter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBefore]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAfter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignLeft]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignRight]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignTop]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignBottom]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAliHorCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAliVerCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameHorSpacing]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameVerSpacing]->setDisabled(true);
        m_actionsMap[c_sPicEditFramePageHorCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFramePageVerCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameDownwardMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameUpwardMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameLeftMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameRightMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameRotate]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameTurnLeft]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameTurnRight]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameHorFlip]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameVerFlip]->setDisabled(false);
        break;
    default:
        m_actionsMap[c_sPicEditFrameAssemble]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameCancelAss]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBestBefore]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBestAfter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameBefore]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAfter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignLeft]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignRight]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignTop]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAlignBottom]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAliHorCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameAliVerCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameHorSpacing]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameVerSpacing]->setDisabled(false);
        m_actionsMap[c_sPicEditFramePageHorCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFramePageVerCenter]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameDownwardMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameUpwardMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameLeftMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameRightMovement]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameRotate]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameTurnLeft]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameTurnRight]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameHorFlip]->setDisabled(false);
        m_actionsMap[c_sPicEditFrameVerFlip]->setDisabled(false);
        break;
    }
    if (isExistPic)
    {
        m_actionsMap[c_sPicEditFrameRotate]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameTurnLeft]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameTurnRight]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameHorFlip]->setDisabled(true);
        m_actionsMap[c_sPicEditFrameVerFlip]->setDisabled(true);
    }
    m_actionsMap[c_sPicEditFrameFontWide]->setChecked(style.bold);
    m_actionsMap[c_sPicEditFrameFontItalic]->setChecked(style.italic);
    m_actionsMap[c_sPicEditFrameFontUnderline]->setChecked(style.underline);

    int index = m_fontComboBox->findText(style.strFont);
    m_fontComboBox->setCurrentIndex(index);

    index = m_SizeComboBox->findText(style.strSize);
    m_SizeComboBox->setCurrentIndex(index);

    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->setCurrentFont(style);
    }

}

void PicEditToolBarWidget::onRadioDrawToolChange()
{
    int iGroupLanguageCheckedId = m_btnGroupDraw->checkedId();
    m_pMainWidget->setDrawType((DRAWTYPE)iGroupLanguageCheckedId);
}

/*
void PicEditToolBarWidget::onNewSVG()
{

}*/
/*
void PicEditToolBarWidget::onSaveSVG()
{
    m_pMainWidget->onSaveSVG();
}*/
/*
void PicEditToolBarWidget::onSaveAsSVG()
{
    m_pMainWidget->onSaveAsSVG();
}*/
/*
void PicEditToolBarWidget::onOpenSVG()
{
    //m_pMainWidget->onOpenSVG();
}*/
/*
void PicEditToolBarWidget::onCloseSVG()
{
    //m_pMainWidget->onCloseSVG();
}*/

void PicEditToolBarWidget::onAssemble()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAssemble();
    } 
}
void PicEditToolBarWidget::onCancelAss()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onCancelAss();
    }
}
void PicEditToolBarWidget::onBestBefore()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onBestBefore();
    }
}
void PicEditToolBarWidget::onBestAfter()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onBestAfter();
    }
    
}
void PicEditToolBarWidget::onBefore()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onBefore();
    }
    
}
void PicEditToolBarWidget::onAfter()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAfter();
    }
    
}
void PicEditToolBarWidget::onAlignLeft()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAlignLeft();
    }
    
}
void PicEditToolBarWidget::onAlignRight()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAlignRight();
    }
    
}
void PicEditToolBarWidget::onAlignTop()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAlignTop();
    }
    
}
void PicEditToolBarWidget::onAlignBottom()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAlignBottom();
    }
    
}
void PicEditToolBarWidget::onAliHorCenter()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAliHorCenter();
    }

}
void PicEditToolBarWidget::onAliVerCenter()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onAliVerCenter();
    }

}
void PicEditToolBarWidget::onHorSpacing()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onHorSpacing();
    }
    
}
void PicEditToolBarWidget::onVerSpacing()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onVerSpacing();
    }
    
}
void PicEditToolBarWidget::onPageHorCenter()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onPageHorCenter();
    }
    
}
void PicEditToolBarWidget::onPageVerCenter()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onPageVerCenter();
    }
    
}

void PicEditToolBarWidget::onUpwardMovement()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onUpwardMovement();
    }
    
}
void PicEditToolBarWidget::onDownwardMovement()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onDownwardMovement();
    }
    
}
void PicEditToolBarWidget::onLeftMovement()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onLeftMovement();
    }
    
}
void PicEditToolBarWidget::onRightMovement()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onRightMovement();
    }
    
}
void PicEditToolBarWidget::onRotate(bool isCheck)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onRotate(isCheck);
    }
    
}
void PicEditToolBarWidget::onTurnLeft()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onTurnLeft();
    }
    
}
void PicEditToolBarWidget::onTurnRight()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onTurnRight();
    }
    
}
void PicEditToolBarWidget::onHorFlip()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onHorFlip();
    }
    
}
void PicEditToolBarWidget::onVerFlip()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onVerFlip();
    }
    
}

void PicEditToolBarWidget::onFontBold(bool tag)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onFontBold(tag);
    }
    
}
void PicEditToolBarWidget::onFontItalic(bool tag)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onFontItalic(tag);
    }
    
}
void PicEditToolBarWidget::onFontUnderline(bool tag)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onFontUnderline(tag);
    }
    
}
void PicEditToolBarWidget::onForegroundColor()
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onForegroundColor();
    }
    
}

void PicEditToolBarWidget::onSetFontComboBox(QString font)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onSetFontComboBox(font);
    }
    
}
void PicEditToolBarWidget::onSetFontSizeComboBox(QString size)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onSetFontSizeComboBox(size);
    }
    
}

void PicEditToolBarWidget::onSetItemMove(QPointF movePos)
{
    if (NULL != m_pMainWidget)
    {
        m_pMainWidget->onSetItemMove(movePos);
    }
    
}

/*
void PicEditToolBarWidget::onSetWebTitle()
{
	this->sendMessage(WEBENGINEEDITVIEW, this, WEBMESSAGE_SETWEBTITLE);
}

void PicEditToolBarWidget::onSetWebSize()
{
	this->sendMessage(WEBENGINEEDITVIEW, this, WEBMESSAGE_SETWEBSIZE);
}

void PicEditToolBarWidget::onSelectAll()
{
	webCmd("setSelectAll()");
}

void PicEditToolBarWidget::onCopy()
{
	webCmd("copy()");
}

void PicEditToolBarWidget::onPaste()
{
	webCmd("paste()");
}

void PicEditToolBarWidget::onDelete()
{
	webCmd("deleteElenments()");
}*/

/**        
 * @brief: 撤销      
 */
/*
void PicEditToolBarWidget::onUndo()
{
	//m_pWebEngineEditView->m_pWebChannelApi->onUndo();
}*/

/**        
 * @brief: 重做
 */
/*
void PicEditToolBarWidget::onRedo()
{
	//m_pWebEngineEditView->m_pWebChannelApi->onRedo();
}

void PicEditToolBarWidget::onAlignTop()
{
	webCmd("align('alignTop')");
}

void PicEditToolBarWidget::onAlignBottom()
{
	webCmd("align('alignBottom')");
}

void PicEditToolBarWidget::onAlignLeft()
{
	webCmd("align('alignLeft')");
}

void PicEditToolBarWidget::onAlignRight()
{
	webCmd("align('alignRight')");
}

void PicEditToolBarWidget::onAlignHorizontal()
{
	webCmd("align('horizontal')");
}

void PicEditToolBarWidget::onAlignVertical()
{
	webCmd("align('vertical')");
}

void PicEditToolBarWidget::onEquidistantHorizontal()
{
	webCmd("SetEquidistant('horizontal')");
}

void PicEditToolBarWidget::onEquidistantVertical()
{
	webCmd("SetEquidistant('vertical')");
}

void PicEditToolBarWidget::onSameWidth()
{
	webCmd("SetSameSize('width')");
}

void PicEditToolBarWidget::onSameHeight()
{
	webCmd("SetSameSize('height')");
}

void PicEditToolBarWidget::onSameSize()
{
	webCmd("SetSameSize('size')");
}

void PicEditToolBarWidget::onZoomNormal()
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->setZoomFactor(1.0);
}

void PicEditToolBarWidget::onZoomIn()
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->setZoomFactor(m_pWebEngineEditView->zoomFactor() + 0.125);
}

void PicEditToolBarWidget::onZoomOut()
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->setZoomFactor(m_pWebEngineEditView->zoomFactor() - 0.125);
}*/

/**        
 * @brief:  网页中插入图片      
 */
/*
void PicEditToolBarWidget::insertImage()
{
 	QString newPath = QFileDialog::getOpenFileName(this, tr(""),
 		"C:/", "Images(*.png *.xpm *.jpg *.svg *.bmp)");
 	if (newPath.isEmpty())
 	{
 		return;
 	}
 	QString cmd = "setCanvasPic('" + newPath + "')";
 	webCmd(cmd);
}*/

/**        
 * @brief: 网页插入背景图片    
 */
/*
void PicEditToolBarWidget::insertBackGround()
{
   //TODO
 	QString newPath = QFileDialog::getOpenFileName(this, tr(""),
 		"C:/", "Images(*.png *.xpm *.jpg *.svg *.bmp)");
 	if (newPath.isEmpty())
 	{
 		return;
 	}
 	QString cmd = "setCanvasBg('" + newPath + "')";
 	webCmd(cmd);
}*/

/**        
 * @brief: 发送选择的图片路径到js       
 * @param[in]: path-图片路径 
 */
/*
void PicEditToolBarWidget::sendImagePathToJs(QString path)
{
	QString cmd = "setPictrue('" + path + "')";
	webCmd(cmd);
}*/

/**        
 * @brief: 设置工具条是否使能
 * @param[in]: state-工具条状态，编辑页面使能其他非使能 
 */
/*
void PicEditToolBarWidget::setToolWidgetEnable(bool state)
{
	//TODO
	auto itor = m_ribbonGroupMap.begin();
	for (; itor != m_ribbonGroupMap.end(); itor++)
	{
		if (itor.key() == c_sWEFileRibbonGroup || itor.key() == c_sWEProjectRibbonGroup)
		{
			itor.value()->setEnabled(true);
		}
		else
		{
			itor.value()->setEnabled(state);
		}
	}
}*/
/**        
 * @brief: 给js发送命令   
 */
/*
void PicEditToolBarWidget::webCmd(QString cmd)
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->page()->runJavaScript(cmd);
}*/

/**
* @brief: 生成widget并绑定信号槽
*/


/*
void PicEditToolBarWidget::makeFileRibbon()
{
	if (Qtitan::RibbonGroup* groupFile = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEFileRibbonGroup, groupFile);

		QAction* ptmpAction = groupFile->addAction(QIcon(":/WebConfigurationTool/res/newFile.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWENewFile, ptmpAction);

		ptmpAction = groupFile->addAction(QIcon(":/WebConfigurationTool/res/openFile.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEOpenFile, ptmpAction);

		ptmpAction = groupFile->addAction(QIcon(":/WebConfigurationTool/res/saveFile.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWESaveFile, ptmpAction);

		ptmpAction = groupFile->addAction(QIcon(":/WebConfigurationTool/res/closeFile.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWECloseFile, ptmpAction);
	}
}
void PicEditToolBarWidget::makeProjectRibbon()
{
	if (Qtitan::RibbonGroup* groupProject = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEProjectRibbonGroup, groupProject);

		QAction* ptmpAction = groupProject->addAction(QIcon(":/WebConfigurationTool/res/newProject.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWENewProject, ptmpAction);

		ptmpAction = groupProject->addAction(QIcon(":/WebConfigurationTool/res/openProject.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEOpenProject, ptmpAction);

		ptmpAction = groupProject->addAction(QIcon(":/WebConfigurationTool/res/saveProject.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWESaveProject, ptmpAction);

		ptmpAction = groupProject->addAction(QIcon(":/WebConfigurationTool/res/closeProject.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWECloseProject, ptmpAction);
	}
}*/

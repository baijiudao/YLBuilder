/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  PicBaseFrame.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               项目和文件两个Frame的基类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 gaoxin
** Created date:               2017/6/26
** Descriptions:               END
** 
*********************************************************************************************************/
#include "PicBaseFrame.h"
#include <QFileDialog>
#include <QtSvg/QSvgGenerator>
#include <QMessageBox>

PicBaseFrame::PicBaseFrame(QWidget *parent)
    : WorkspaceWidget(parent)
    , pm_parent(parent)
    , m_pToolBarWidget(NULL)
    , m_pMainTabWidget(new PicBaseTabWidget(""))
    , m_strProPath("")
{
	//installListener(this);
    connect(m_pMainTabWidget, &QTabWidget::currentChanged, this, &PicBaseFrame::slotCurrentPageChanged);
    connect(m_pMainTabWidget, &QTabWidget::tabCloseRequested, this, &PicBaseFrame::slotCloseTab);
    connect(m_pMainTabWidget, &PicBaseTabWidget::signalSavePic, this, &PicBaseFrame::onSaveSVG);
    connect(m_pMainTabWidget, &PicBaseTabWidget::signalSaveAsPic, this, &PicBaseFrame::onSaveAsSVG);
    setCentralWidget(m_pMainTabWidget);
}

PicBaseFrame::~PicBaseFrame()
{
    if (m_pToolBarWidget != NULL)
	{
		delete m_pToolBarWidget;
		m_pToolBarWidget = NULL;
	}
	/*if (m_pMainTabWidget != NULL)
	{
		delete m_pMainTabWidget;
		m_pMainTabWidget = NULL;
	}*/
}

/**        
 * @brief: 生成Ribbon      
 * @param[in]: type一种代表项目模块，另外一种代表文件模块
 */
void PicBaseFrame::makeRibbon(int type)
{
    m_pMainWindow = static_cast<RibbonMainWindow*>(pm_parent);
	if (NULL != m_pMainWindow)
	{
		if (NULL != m_pMainWindow->ribbonBar())
		{
            Qtitan::RibbonPage*  pPageDrawTool = m_pMainWindow->ribbonBar()->addPage("");
            connect(pPageDrawTool, &RibbonPage::activated, this, &PicBaseFrame::onMenuChange);
            m_pToolBarWidget = new PicEditToolBarWidget(type, pPageDrawTool, pm_parent);
		}
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PicBaseFrame::makeTabWidget(QString strFilePath, QString strAllPath)
{
    m_pMainTabWidget->setTabPosition(QTabWidget::North);
    m_graphicsView = new MainGraphicsView(this, strAllPath);
    //m_pMainTabWidget->addTab(m_graphicsView, strPathName);
    int index = m_pMainTabWidget->insertTab(0, m_graphicsView, strFilePath);
    m_pMainTabWidget->setCurrentIndex(index);
	m_pMainTabWidget->setWindowFlags(Qt::SubWindow);

    m_graphicsView->onOpenSVG(strAllPath);
    connect(m_graphicsView, &MainGraphicsView::sigIconStatus, this, &PicBaseFrame::onIconStatus);
    connect(m_graphicsView, &MainGraphicsView::sigSetRadioButton, this, &PicBaseFrame::onSetRadioButton);
    
    m_pToolBarWidget->onSetDrawIconStatus(true);
}

void PicBaseFrame::makeConnect()
{
    QAction* ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicEditFrameNewFile];
    connect(ptmpAction, &QAction::triggered, this, &PicBaseFrame::onNewSVG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicEditFrameOpenFile];
    connect(ptmpAction, &QAction::triggered, this, &PicBaseFrame::onOpenSVG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicEditFrameSaveFile];
    connect(ptmpAction, &QAction::triggered, this, &PicBaseFrame::onSaveSVG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicEditFrameSaveAsFile];
    connect(ptmpAction, &QAction::triggered, this, &PicBaseFrame::onSaveAsSVG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicEditFrameCloseFile];
    connect(ptmpAction, &QAction::triggered, this, &PicBaseFrame::onCloseSVG);
}

/**
* @brief:  当前页改变时响应槽函数
* @param[in]:  index-索引
*/
void PicBaseFrame::slotCurrentPageChanged(int index)
{
    MainGraphicsView *currentTab = qobject_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
	if (NULL == currentTab)
	{
		return;
	}
    m_pToolBarWidget->setPicMainFrame(currentTab);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PicBaseFrame::slotCloseTab(int index)
{
    MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
    if (NULL != widget)
    {
        m_pMainTabWidget->removeTab(index);
        widget->onCloseSVG();
        widget->deleteLater();
    }
    if (0 == m_pMainTabWidget->count())
    {
        m_pToolBarWidget->onIconStatus(0);
        m_pToolBarWidget->onSetDrawIconStatus(false);
    }
}

void PicBaseFrame::closeAllTable()
{
    int count = m_pMainTabWidget->count();
    for (int index = 0; index < count; index++)
    {
        MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
        if (NULL != widget)
        {
            m_pMainTabWidget->removeTab(index);
            widget->deleteLater();
        }
    }
    if (0 == m_pMainTabWidget->count())
    {
        m_pToolBarWidget->onIconStatus(0);
        m_pToolBarWidget->onSetDrawIconStatus(false);
    }
}

void PicBaseFrame::onNewSVG()
{
    bool isSendPath = true;
    QString path = "";
    QString newPath = QFileDialog::getSaveFileName(this, qApp->translate(c_sPicEditFrame, c_sPicEditFrameNewFile),
        path, qApp->translate(c_sPicEditFrame, c_sPicEditFrameSVGFileType));  // 弹出Save as Dialog  

    if (newPath.isEmpty())
        return;

    if (!m_strProPath.isEmpty())
    {
        if (!newPath.contains(m_strProPath))
        {
            QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sPicEditFrame, c_sPicStorSaveICGWarning));
            box.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);
            box.setButtonText(QMessageBox::Ok, qApp->translate(c_sCommon, c_sCommonOK));
            box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sCommon, c_sCommonCancel));
            int result = box.exec();
            if (QMessageBox::Cancel == result)
            {
                return;
            }
            isSendPath = false;
        }
    }
    else
    {
        isSendPath = false;
    }

    NewSVG(newPath);
    makeTabWidget(newPath, newPath);
    if (isSendPath)
    {
        sendMessage(WEBEDITFRAME, this, IMAGEPATH_TO_PROJECT, &newPath);
    }
}

void PicBaseFrame::NewSVG(QString strPath)
{
    QSvgGenerator generator;
    generator.setFileName(strPath);
    generator.setTitle(tr("SVG Generator Example Drawing"));
    generator.setDescription(tr("An SVG drawing created by the SVG Generator "
        "Example provided with Qt."));
    QPainter painter(this);
    painter.begin(&generator);
    painter.end();
}

void PicBaseFrame::onOpenSVG()
{
    QString path = "";
    QString newPath = QFileDialog::getOpenFileName(this, qApp->translate(c_sPicEditFrame, c_sPicEditFrameOpenFile),
        path, qApp->translate(c_sPicEditFrame, c_sPicEditFrameSVGFileType));  // 弹出Save as Dialog  

    if (newPath.isEmpty())
    {
        return;
    }
    for (int index = 0; index < m_pMainTabWidget->count(); index++)
    {

        QWidget *widget = m_pMainTabWidget->widget(index);
        QString text = ((MainGraphicsView *)widget)->getCurrentFilePath();
        if (text == newPath)
        {
            m_pMainTabWidget->setCurrentIndex(index);
            QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sPicEditFrame, c_sPicEditThisSVGIsOpen));
            box.setStandardButtons(QMessageBox::Ok);
            box.setButtonText(QMessageBox::Ok, qApp->translate(c_sCommon, c_sCommonOK));
            int result = box.exec();
            //QMessageBox::information(this, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sPicEditFrame, c_sPicEditThisSVGIsOpen), QMessageBox::Ok);
            return;
        }
    }
    int pos = newPath.lastIndexOf("/");
    int lenght = newPath.length();
    QString fileName = newPath.right(lenght - pos - 1);
    makeTabWidget(fileName, newPath);
    m_pMainTabWidget->setTabToolTip(0, newPath);
}

void PicBaseFrame::onSaveSVG()
{
    MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->currentWidget());
    if (NULL != widget)
    {
        widget->onSaveSVG();
    }
}

void PicBaseFrame::onSaveAsSVG()
{
    bool isSendPath = true;
    QString path = "";
    QString newPath = QFileDialog::getSaveFileName(this, qApp->translate(c_sPicEditFrame, c_sPicEditFrameSaveFile),
        path, qApp->translate(c_sPicEditFrame, c_sPicEditSVGSaveType));  // 弹出Save as Dialog  
    if (newPath.isEmpty())
    {
        return;
    }
    
    if (newPath.contains(".icg"))
    {
        MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->currentWidget());
        if (NULL != widget)
        {
            widget->onSaveSVG();
            QString svgFilePath = widget->getCurrentFilePath();
            emit sigSaveSVGtoICG(svgFilePath, newPath);
        }
        return;
    }

    if (!m_strProPath.isEmpty())
    {
        if (!newPath.contains(m_strProPath))
        {
            QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sCommon, c_sPicEditSVGFileIsNotPro));
            box.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);
            box.setButtonText(QMessageBox::Ok, qApp->translate(c_sCommon, c_sCommonOK));
            box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sCommon, c_sCommonCancel));
            int result = box.exec();
            if (QMessageBox::Cancel == result)
            {
                return;
            }
            isSendPath = false;
        }
    }
    else
    {
        isSendPath = false;
    }

    MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->currentWidget());
    if (NULL == widget)
    {
        return;
    }
    widget->onSaveAsSVG(newPath);
    if (!newPath.isEmpty())
    {
        int index = m_pMainTabWidget->currentIndex();
        m_pMainTabWidget->setTabText(index, newPath);
    }

    if (isSendPath)
    {
        sendMessage("WEBEDITFRAME", this, IMAGEPATH_TO_PROJECT);
    }
}

void PicBaseFrame::onCloseSVG()
{
    int index = m_pMainTabWidget->currentIndex();
    slotCloseTab(index);
}

void PicBaseFrame::onIconStatus(int count, FontStyle style, bool isExistPic)
{
    m_pToolBarWidget->onIconStatus(count, style, isExistPic);
}

void PicBaseFrame::onSetRadioButton()
{
    QAbstractButton* radioDraw_mouse = m_pToolBarWidget->m_abstractButtonsMap[c_sPicEditFrameDrawSelect];
    radioDraw_mouse->setChecked(true);
}

bool PicBaseFrame::isChangeOfContent()
{
    bool isChange = false;
    int count = m_pMainTabWidget->count();
    for (int index = 0; index < count; index++)
    {
        MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
        if (NULL != widget)
        {
            if (widget->isChangeOfContent())
            {
                return true;
            }
        }
    }
    return false;
}
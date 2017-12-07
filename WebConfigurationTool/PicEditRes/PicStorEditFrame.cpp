#include "PicStorEditFrame.h"

#include <QtnRibbonQuickAccessBar.h>
#include <QtnRibbonBackstageView.h>
#include <QPushButton>
#include "BaseTabWidget.h"

PicStorEditFrame::PicStorEditFrame(QWidget *parent)
    : PicBaseFrame(parent)
{
    SetMoudleName(PICFILEEDITFRAME);
	installListener(this);
    makeRibbon(2);
    makeConnect();

    m_pResDockWidget = new BaseDockWidget(this);
    m_pResDockWidget->setWindowTitle(qApp->translate(c_sPicEditFrame, c_sPicStorEditFrameDrawTools));
    connect(m_pResDockWidget, &BaseDockWidget::controlDockShow, this, &PicStorEditFrame::onCheckResDock);
    m_pStorDockWidget = new BaseDockWidget(this);
    m_pStorDockWidget->setWindowTitle(qApp->translate(c_sPicStorEditFrame, c_sPicStorRes));
    connect(m_pStorDockWidget, &BaseDockWidget::controlDockShow, this, &PicStorEditFrame::onCheckStorDock);
    addDockWidget(Qt::LeftDockWidgetArea, m_pResDockWidget);
    addDockWidget(Qt::LeftDockWidgetArea, m_pStorDockWidget);

    PictureStorageWidget *widget = new PictureStorageWidget;
    connect(widget, &PictureStorageWidget::sigRightClick, this, &PicStorEditFrame::onTreeRightClick);
    connect(widget, &PictureStorageWidget::sigMkSVGFile, this, &PicStorEditFrame::onMkSVGFile);
    m_pResDockWidget->setWidget(widget);

    QString path = qApp->applicationDirPath();
    path = path + PICTURE_RES_PATH;
    IcgManagerWidget  *m_pIcgManagerWidget = new IcgManagerWidget(path);
    connect(this, &PicBaseFrame::sigSaveSVGtoICG, m_pIcgManagerWidget, &IcgManagerWidget::saveSvgToIcg);
    m_pStorDockWidget->setWidget(m_pIcgManagerWidget);
    this->tabifyDockWidget(m_pResDockWidget, m_pStorDockWidget);
    m_pResDockWidget->raise();

}


PicStorEditFrame::~PicStorEditFrame()
{
}

void PicStorEditFrame::onMkSVGFile(QString path)
{
    NewSVG(path);
}

void PicStorEditFrame::onTreeRightClick(int strPathName, QString currentPath, QString originalPath)
{
    int pos = currentPath.lastIndexOf("/");
    int lenght = currentPath.length();
    QString fileName = currentPath.right(lenght - pos - 1);
    switch (strPathName)
    {
    case TOOL_OPEN:
        for (int index = 0; index < m_pMainTabWidget->count(); index++)
        {
            QString text = m_pMainTabWidget->tabText(index);
            if (text == fileName)
            {
                m_pMainTabWidget->setCurrentIndex(index);
                return;
            }
        }
        makeTabWidget(fileName, currentPath);
        break;
    case TOOL_DELETE:
        for (int index = 0; index < m_pMainTabWidget->count(); index++)
        {
            QString text = m_pMainTabWidget->tabText(index);
            if (text == fileName)
            {
                MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
                widget->deleteLater();
            }
        }
        break;
    case TOOL_RENAME:
        originalPath = originalPath.right(originalPath.length() - originalPath.lastIndexOf("/") - 1);
        for (int index = 0; index < m_pMainTabWidget->count(); index++)
        {
            QString text = m_pMainTabWidget->tabText(index);
            if (text == originalPath)
            {
                m_pMainTabWidget->setTabText(index, currentPath);
            }
        }
        break;
    default:
        break;
    }
    
}

void PicStorEditFrame::resizeEvent(QResizeEvent *event)
{
    WorkspaceWidget::resizeEvent(event);
    m_pResDockWidget->setMaximumWidth(this->size().width() / 2);
    m_pStorDockWidget->setMaximumWidth(this->size().width() / 2);
}

void PicStorEditFrame::showEvent(QShowEvent *event)
{
}

void PicStorEditFrame::hideEvent(QHideEvent *event)
{
}

void PicStorEditFrame::changeEvent(QEvent *evt)
{
    switch (evt->type())
    {
    case QEvent::LanguageChange:
        m_pToolBarWidget->retranslate();
        m_pResDockWidget->setWindowTitle(qApp->translate(c_sPicEditFrame, c_sPicStorEditFrameDrawTools));
        m_pStorDockWidget->setWindowTitle(qApp->translate(c_sPicStorEditFrame, c_sPicStorRes));
        break;
    default:
        break;
    }
    QMainWindow::changeEvent(evt);
}

void PicStorEditFrame::makeConnect()
{
    //PicBaseFrame::makeConnect();
    QCheckBox* resCheckBox = (QCheckBox*)(m_pToolBarWidget->m_abstractButtonsMap[c_sPicEditFrameResWindow]);
    connect(resCheckBox, &QCheckBox::stateChanged, this, &PicStorEditFrame::showControlResDockWidget);

    QCheckBox* StorCheckBox = (QCheckBox*)(m_pToolBarWidget->m_abstractButtonsMap[c_sPicEditFrameStorResWindow]);
    connect(StorCheckBox, &QCheckBox::stateChanged, this, &PicStorEditFrame::showControlStorDockWidget);

    QAction* ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicStorEditFrameNew];
    connect(ptmpAction, &QAction::triggered, this, &PicStorEditFrame::onNewICG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicStorEditFrameOpen];
    connect(ptmpAction, &QAction::triggered, this, &PicStorEditFrame::onOpenICG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicStorEditFrameSave];
    connect(ptmpAction, &QAction::triggered, this, &PicStorEditFrame::onSaveICG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicStorEditFrameAsSave];
    connect(ptmpAction, &QAction::triggered, this, &PicStorEditFrame::onSaveAsICG);

    ptmpAction = m_pToolBarWidget->m_actionsMap[c_sPicStorEditFrameClose];
    connect(ptmpAction, &QAction::triggered, this, &PicStorEditFrame::onCloseICG);

}

void PicStorEditFrame::showControlResDockWidget(int state)
{
    if (Qt::Checked == state)
    {
        m_pResDockWidget->show();
    }
    else
    {
        m_pResDockWidget->hide();
    }
}

void PicStorEditFrame::showControlStorDockWidget(int state)
{
    if (Qt::Checked == state)
    {
        m_pStorDockWidget->show();
    }
    else
    {
        m_pStorDockWidget->hide();
    }
}

void PicStorEditFrame::onCheckResDock(bool isShow)
{
    QMap<QString, QAbstractButton*>::iterator itor = m_pToolBarWidget->m_abstractButtonsMap.find(c_sPicEditFrameResWindow);
    if (itor != m_pToolBarWidget->m_abstractButtonsMap.end())
    {
        itor.value()->setChecked(isShow);
    }
}

void PicStorEditFrame::onCheckStorDock(bool isShow)
{
    QMap<QString, QAbstractButton*>::iterator itor = m_pToolBarWidget->m_abstractButtonsMap.find(c_sPicEditFrameStorResWindow);
    if (itor != m_pToolBarWidget->m_abstractButtonsMap.end())
    {
        itor.value()->setChecked(isShow);
    }
}

void PicStorEditFrame::onSaveSVG()
{
    MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->currentWidget());
    if (NULL != widget)
    {
        widget->onSaveSVG();
        PictureStorageWidget *picStorWidget = (PictureStorageWidget *)(m_pResDockWidget->widget());
        QString filePath = widget->getCurrentFilePath();
        picStorWidget->saveSVG(filePath);
    }
}

void PicStorEditFrame::onNewICG()
{
    QString path = "";
    QString newPath = QFileDialog::getSaveFileName(this, qApp->translate(c_sPicEditFrame, c_sPicStorEditFrameNew),
        path, qApp->translate(c_sPicStorEditFrame, c_sPicStorICGType));  // 弹出Save as Dialog  

    if (newPath.isEmpty())
        return;

    PictureStorageWidget *picStorWidget = (PictureStorageWidget *)(m_pResDockWidget->widget());
    if (picStorWidget->isExistIcgFile())
    {
        QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sPicStorEditFrame, c_sPicStorCloseICGWarning));
        box.setStandardButtons(QMessageBox::Yes | QMessageBox::No);
        box.setButtonText(QMessageBox::Yes, qApp->translate(c_sCommon, c_sCommonYes));
        box.setButtonText(QMessageBox::No, qApp->translate(c_sCommon, c_sCommonNo));
        int result = box.exec();
        if (QMessageBox::No == result)
        {
            return;
        }
    }
    closeAllTable();
    picStorWidget->setFilePath(newPath, ICG_NEW);
}

void PicStorEditFrame::onSaveICG()
{
    PictureStorageWidget *picStorWidget = (PictureStorageWidget *)(m_pResDockWidget->widget());

    int count = m_pMainTabWidget->count();
    for (int index = 0; index < count; index++)
    {
        MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
        if (NULL != widget)
        {
            if (widget->isChangeOfContent())
            {
                widget->onSaveSVG();
                QString filePath = widget->getCurrentFilePath();
                picStorWidget->saveSVG(filePath);
            }
        }
    }
}
void PicStorEditFrame::onSaveAsICG()
{
    QString path = "";
    QString newPath = QFileDialog::getSaveFileName(this, qApp->translate(c_sPicStorEditFrame, c_sPicStorEditFrameAsSave),
        path, qApp->translate(c_sPicStorEditFrame, c_sPicStorICGType));  // 弹出Save as Dialog  
    if (newPath.isEmpty())
        return;
    
    int count = m_pMainTabWidget->count();
    for (int index = 0; index < count; index++)
    {
        MainGraphicsView *widget = static_cast<MainGraphicsView*>(m_pMainTabWidget->widget(index));
        if (NULL != widget)
        {
            if (widget->isChangeOfContent())
            {
                widget->onSaveSVG();
            }
        }
    }
    PictureStorageWidget *picStorWidget = (PictureStorageWidget *)(m_pResDockWidget->widget());
    picStorWidget->saveAsIcg(newPath);
}
void PicStorEditFrame::onOpenICG()
{
    QString path = "";
    QString newPath = QFileDialog::getOpenFileName(this, qApp->translate(c_sPicStorEditFrame, c_sPicStorEditFrameOpen),
        path, qApp->translate(c_sPicStorEditFrame, c_sPicStorICGType));  // 弹出Save as Dialog  

    if (newPath.isEmpty())
        return;
    
    PictureStorageWidget *picStorWidget = (PictureStorageWidget *)(m_pResDockWidget->widget());
    if (picStorWidget->isExistIcgFile())
    {
        QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sPicStorEditFrame, c_sPicStorCloseICGWarning));
        box.setStandardButtons(QMessageBox::Yes | QMessageBox::No);
        box.setButtonText(QMessageBox::Yes, qApp->translate(c_sCommon, c_sCommonYes));
        box.setButtonText(QMessageBox::No, qApp->translate(c_sCommon, c_sCommonNo));
        int result = box.exec();
        if (QMessageBox::No == result)
        {
            return;
        }
        //onSaveICG();
    }
    closeAllTable();
    picStorWidget->setFilePath(newPath);
}
void PicStorEditFrame::onCloseICG()
{
    PictureStorageWidget *picStorWidget = (PictureStorageWidget *)(m_pResDockWidget->widget());

    if (isChangeOfContent())
    {
        QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sPicEditFrame, c_sPicStorSaveICGWarning));
        box.setStandardButtons(QMessageBox::Yes | QMessageBox::No);
        box.setButtonText(QMessageBox::Yes, qApp->translate(c_sCommon, c_sCommonYes));
        box.setButtonText(QMessageBox::No, qApp->translate(c_sCommon, c_sCommonNo));
        int result = box.exec();
        if (QMessageBox::Yes == result)
        {
            onSaveICG();
        }
    }
    closeAllTable();
    picStorWidget->closeWidget();
}

void PicStorEditFrame::onMessage(void* pSender, int iMessageType, void* pData)
{
    switch (iMessageType)
    {
    case WEBMESSAGE_PROJECT_PATH:
        m_strProPath = *static_cast<QString *>(pData);
        break;
    default:
        break;
    }
}

void PicStorEditFrame::onMenuChange()
{
    sendMessage(WEBTOOLMOUDLE, this, OPENPICSTOREDIT);
}
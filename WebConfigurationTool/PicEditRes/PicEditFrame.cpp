#include "PicEditFrame.h"

#include <QtnRibbonQuickAccessBar.h>
#include <QtnRibbonBackstageView.h>
#include <QPushButton>
PicEditFrame::PicEditFrame(QWidget *parent)
    :PicBaseFrame(parent)
	, m_graphicsView(NULL)
{
	SetMoudleName(PICEDITFRAME);
	installListener(this);
    setWindowFlags(Qt::SubWindow);
    makeRibbon(1);

    makeConnect();

	m_pResDockWidget = new BaseDockWidget(this);
	connect(m_pResDockWidget, &BaseDockWidget::controlDockShow, this, &PicEditFrame::onCheckResDock);
    addDockWidget(Qt::LeftDockWidgetArea, m_pResDockWidget);

    m_pResDockWidget->raise();

    QString path = qApp->applicationDirPath();
    path = path + PICTURE_RES_PATH;
    m_pIcgManagerWidget = new IcgManagerWidget(path);
    connect(this, &PicBaseFrame::sigSaveSVGtoICG, m_pIcgManagerWidget, &IcgManagerWidget::saveSvgToIcg);
	m_pResDockWidget->setWidget(m_pIcgManagerWidget);

}

PicEditFrame::~PicEditFrame()
{
	if (NULL != m_graphicsView)
	{
		delete m_graphicsView;
		m_graphicsView = NULL;
	}
    if (NULL != m_pResDockWidget)
    {
        delete m_pResDockWidget;
        m_pResDockWidget = NULL;
    }
    
	//delete 对象
}

void PicEditFrame::makeConnect()
{
    PicBaseFrame::makeConnect();
    QCheckBox* resCheckBox = (QCheckBox*)(m_pToolBarWidget->m_abstractButtonsMap[c_sPicEditFrameResWindow]);
    connect(resCheckBox, &QCheckBox::stateChanged, this, &PicEditFrame::showControlDockWidget);
}

void PicEditFrame::onCheckResDock(bool isShow)
{
    QMap<QString, QAbstractButton*>::iterator itor = m_pToolBarWidget->m_abstractButtonsMap.find(c_sPicEditFrameResWindow);
    if (itor != m_pToolBarWidget->m_abstractButtonsMap.end())
    {
        itor.value()->setChecked(isShow);
    }
}

void PicEditFrame::showControlDockWidget(int state)
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

void PicEditFrame::showEvent(QShowEvent *event)
{
    WorkspaceWidget::showEvent(event);
    //m_pResDockWidget->show();
}

void PicEditFrame::resizeEvent(QResizeEvent *event)
{
    WorkspaceWidget::resizeEvent(event);
    m_pResDockWidget->setMaximumWidth(this->size().width() / 2);
    //m_pPicEditTabWidget->setMinimumWidth(this->size().width() / 2);
}


void PicEditFrame::onRadioDrawToolChange()
{
/*
	int iGroupLanguageCheckedId = m_btnGroupDraw->checkedId();
	m_graphicsView->setDrawType((DRAWTYPE)iGroupLanguageCheckedId);*/
}
void PicEditFrame::changeEvent(QEvent *evt)
{
    switch (evt->type())
    {
    case QEvent::LanguageChange:
        m_pToolBarWidget->retranslate();
        break;
    default:
        break;
    }
    QMainWindow::changeEvent(evt);
}

void PicEditFrame::onMessage(void* pSender, int iMessageType, void* pData)
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

void PicEditFrame::onMenuChange()
{
    sendMessage(WEBTOOLMOUDLE, this, OPENPICEDIT);
}
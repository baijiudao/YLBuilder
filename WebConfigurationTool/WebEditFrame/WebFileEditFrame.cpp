/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  WebFileEditFrame.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               网页文件管理逻辑处理类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/5/18
** Descriptions:               END
** 
*********************************************************************************************************/
#include "WebFileEditFrame.h"

WebFileEditFrame::WebFileEditFrame(QWidget *parent)
    : BaseFrame(parent)
	, m_pWebFileRibbonPage(NULL)
{
    SetMoudleName(WEBFILEEDITFRAME);
	installListener(this);
	init();
}

WebFileEditFrame::~WebFileEditFrame()
{
}

/**        
 * @brief: 初始化    
 */
void WebFileEditFrame::init()
{
	makeMainTabWidget();
	makeWebEditDockWidget();
	makeIcgDockWidget();
	this->tabifyDockWidget(m_pWebEditDockWidget, m_pWebIcgDockWidget);
	this->m_pWebEditDockWidget->raise();
	makeRibbon(UI_FILE);

	connect(m_pToolBarWidget->m_actionsMap.value("New Html"),
		&QAction::triggered, this, &WebFileEditFrame::onNewFile);
	connect(m_pToolBarWidget->m_actionsMap.value("Open Html"),
		&QAction::triggered, this, &WebFileEditFrame::onOpenFile);
	connect(m_pToolBarWidget->m_actionsMap.value("Save Html"),
		&QAction::triggered, this, &WebFileEditFrame::onSave);
	connect(m_pToolBarWidget->m_actionsMap.value("Close Html"),
		&QAction::triggered, this, &WebFileEditFrame::onCloseFile);
	retranslate();
}

/**        
 * @brief: 新建网页文件    
 */
void WebFileEditFrame::onNewFile()
{
	QString newPath = QFileDialog::getSaveFileName(this, "", "C:/", "Html files (*.html)");
	if ("" == newPath)
	{
		return;
	}
	QString newPathFolder = newPath.mid(0, newPath.lastIndexOf("/"));
	QDir dir;
	QStringList list;
	QString tempCurrentPath = qApp->applicationDirPath() + "/data/WebControl";

	m_pFileManager->copyDirectoryFiles(tempCurrentPath, newPathFolder, true, list);
	m_pFileManager->createFile(newPath);

	openHtml(newPath);
}

/**        
 * @brief:打开网页文件        
 */
void WebFileEditFrame::onOpenFile()
{
	QString newPath = QFileDialog::getOpenFileName(this, tr(""),
		"C:/", "Html files (*.html *.htm)");

	if (newPath.isEmpty())
	{
		return;
	}
	openHtml(newPath);
}

/**        
 * @brief: 关闭网页文件        
 */
void WebFileEditFrame::onCloseFile()
{
	for (int index = 0; index < m_pMainTabWidget->count(); ++index)
   {
	   slotCloseTab(index);
   }
}

/**        
 * @brief: 翻译       
 */
void WebFileEditFrame::retranslate()
{
	m_pWEFileRibbonPage->setTitle(qApp->translate(c_sWebFileFrame, c_sWebFileFrameFile));
	m_pWebEditDockWidget->setWindowTitle(qApp->translate(c_sWEFrame, c_sWEFrameDockControl));
	m_pWebIcgDockWidget->setWindowTitle(qApp->translate(c_sPicStorEditFrame, c_sPicStorRes));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void WebFileEditFrame::onMessage(void* pSender, int iMessageType, void* pData)
{
	//if (!this->isVisible()) return;
	if (WEBMESSAGE_SETUNDOENABLE == iMessageType)
	{
		auto itorActions = m_pToolBarWidget->m_actionsMap.begin();
		for (; itorActions != m_pToolBarWidget->m_actionsMap.end(); itorActions++)
		{
			bool state = *static_cast<bool*>(pData);
			if (itorActions.key() == c_sWEUndo)
			{
				itorActions.value()->setEnabled(state);
				QString text = m_pMainTabWidget->tabText(m_pMainTabWidget->currentIndex());
				if (state)
				{
					if (text.contains("*"))
					{
						return;
					}
					m_pMainTabWidget->setTabText(m_pMainTabWidget->currentIndex(), "*" + text);
				}
				else
				{
					m_pMainTabWidget->setTabText(m_pMainTabWidget->currentIndex(), text.replace("*", ""));
				}
			}
		}
	}

	if (WEBMESSAGE_SETUNDOENABLE == iMessageType)
	{
		auto itorActions = m_pToolBarWidget->m_actionsMap.begin();
		for (; itorActions != m_pToolBarWidget->m_actionsMap.end(); itorActions++)
		{
			if (itorActions.key() == c_sWEUndo)
			{
				itorActions.value()->setEnabled(*static_cast<bool*>(pData));
			}
		}
	}
	if (WEBMESSAGE_SETREDOENABLE == iMessageType)
	{
		auto itorActions = m_pToolBarWidget->m_actionsMap.begin();
		for (; itorActions != m_pToolBarWidget->m_actionsMap.end(); itorActions++)
		{
			if (itorActions.key() == c_sWERedo)
			{
				itorActions.value()->setEnabled(*static_cast<bool*>(pData));
			}
		}
	}

	if (WEBMESSAGE_GETIMAGEPATH == iMessageType)
	{
		if (!this->isVisible()) return;
		QWidget widget;
		QString newPath = QFileDialog::getOpenFileName(&widget, tr(""),
			"c:/", IMAGE_TYPE);

		if (newPath.isEmpty())
		{
			return;
		}
		m_pToolBarWidget->sendImagePathToJs(newPath);
	}
	if (SAVE_AS_HTML == iMessageType)
	{
		if (!isVisible()) return;
		emit m_pMainTabWidget->tabCloseRequested(m_pMainTabWidget->currentIndex());
		QString imagePath = *static_cast<QString*>(pData);
		qDebug() << "add from other" << imagePath;
		openHtml(imagePath);
		//m_pFileManager->addSuportFolder(imagePath.mid(0, imagePath.lastIndexOf("/")));
	}
}

void WebFileEditFrame::onMenuChange()
{
	sendMessage(WEBTOOLMOUDLE, this, OPENWEBFILEEDIT);
}

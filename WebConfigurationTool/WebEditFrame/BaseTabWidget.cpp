/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseTabWidget.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               标签页基类，主要完成Tab相关功能整合
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/21
** Descriptions:               END
** 
*********************************************************************************************************/
#include "BaseTabWidget.h"

BaseTabWidget::BaseTabWidget(QString filePath, QWidget *parent)
	: QTabWidget(parent)
	, m_strTmpCurrentFilePath(filePath)
	, m_pWebEditWidget(NULL)
	, m_pWebSrcWidget(NULL)
	, m_pWebViewWidget(NULL)
	, m_isUpdateFile(false)
	, m_projectPath("")
{
	this->setAcceptDrops(true);
	this->setUsesScrollButtons(true);
	this->setMovable(true);

	this->setAcceptDrops(false);
	if (m_strTmpCurrentFilePath.isEmpty())
	{
		this->tabBar()->setContextMenuPolicy(Qt::CustomContextMenu);
		connect(this->tabBar(), &QTabBar::customContextMenuRequested, 
			this, &BaseTabWidget::slotCustomContextMenuRequested);
		this->setTabsClosable(true);
	}
	else
	{
		init();
		connect(this, &QTabWidget::tabBarClicked, this, &BaseTabWidget::tablePageHasChanged);
		connect(this, &QTabWidget::currentChanged, this, &BaseTabWidget::refreshPage);
		connect(this, &BaseTabWidget::sigSaveAsFile, this, &BaseTabWidget::slotSaveAsFile);
	}
}

BaseTabWidget::~BaseTabWidget()
{
}

/**        
 * @brief: 根据传参初始化
 */
void BaseTabWidget::init()
{
	QDir dir;
	QString strCurrentPath = qApp->applicationDirPath();;
	strCurrentPath.replace("\\", "/");
	strCurrentPath = strCurrentPath + "/data/";
// 
   	m_pWebEditWidget = new QWebEditWidget(m_strTmpCurrentFilePath, this);
   	m_pWebEditWidget->setAcceptDrops(true);
   	m_pWebEditWidget->setCurrentPath(strCurrentPath); 
	m_pWebEditWidget->m_pWebEditView->removeEditJs(m_strTmpCurrentFilePath);
 	m_pWebEditWidget->loadUrl(m_strTmpCurrentFilePath);
	
 	m_pWebSrcWidget = new QSrcEditWidget(m_strTmpCurrentFilePath, this);
 	m_pWebSrcWidget->reloadSrc(m_strTmpCurrentFilePath);
 
	m_pWebViewWidget = new QWebViewWidget(m_strTmpCurrentFilePath, this);
	m_pWebViewWidget->loadUrl(m_strTmpCurrentFilePath);

	this->addTab(m_pWebEditWidget, qApp->translate(c_sTabWidget, c_sWEFrameTabEdit));
	this->addTab(m_pWebSrcWidget, qApp->translate(c_sTabWidget, c_sWEFrameTabSrc));
	this->addTab(m_pWebViewWidget, qApp->translate(c_sTabWidget, c_sWEFrameTabView));
	this->setTabPosition(QTabWidget::South);

 	connect(m_pWebEditWidget->m_pWebEditView, &QWebEngineEditView::saveWeb, 
 		this, &BaseTabWidget::updateWebFile);
	connect(m_pWebSrcWidget, &QSrcEditWidget::saveWeb, 
		this, &BaseTabWidget::updateWebFile);
	connect(m_pWebViewWidget, &QWebViewWidget::saveWeb, 
		this, &BaseTabWidget::updateWebFile);
}

/**        
 * @brief:        
 * @param[in]: 
 */
void BaseTabWidget::changeEvent(QEvent *e)
{
	switch (e->type())
	{
	case QEvent::LanguageChange:
		retranslate();
		break;
	default:
		break;
	}
	QWidget::changeEvent(e);
}

void BaseTabWidget::retranslate()
{

}

/**        
 * @brief: 标签页切换槽函数      
 * @param[in]: index-索引
 */
void BaseTabWidget::tablePageHasChanged(int index)
{
	int currentIndex = this->currentIndex();

	if (currentIndex == index)
	{
		return;
	}
	if (m_pWebEditWidget == this->widget(currentIndex))
	{
		this->setEnabled(false);
		m_pWebEditWidget->quitAndSave(m_strTmpCurrentFilePath, REFRESHTABPAGES);
	}
	else if (m_pWebSrcWidget == this->widget(currentIndex))
	{
		m_pWebSrcWidget->quitAndSave(m_strTmpCurrentFilePath, REFRESHTABPAGES);
	}
	else if (m_pWebViewWidget == this->widget(currentIndex))
	{
	}
//	refreshPage();
}

void BaseTabWidget::onMessage(void* pSender, int iMessageType, void* pData)
{
}

/**        
 * @brief: 刷新页面
 * @param[in]:  index-索引
 */
void BaseTabWidget::refreshPage(int index)
{
	QWidget *widget = this->widget(index);
	if (widget == m_pWebEditWidget)
	{
		m_pWebEditWidget->loadUrl(m_strTmpCurrentFilePath);
	}
	if (widget == m_pWebSrcWidget)
	{
		m_pWebSrcWidget->reloadSrc(m_strTmpCurrentFilePath);
	}
	if (widget == m_pWebViewWidget)
	{
		m_pWebViewWidget->loadUrl(m_strTmpCurrentFilePath);
	}
}

/**
 * @brief: 保存网页文件
 * @param[in]:state-true则保存文件，false则只刷新临时文件
 */
void BaseTabWidget::save(bool state = false)
{
	m_isUpdateFile = state;
	if (this->widget(currentIndex()) == m_pWebEditWidget)
	{
		if (!m_pWebEditWidget->m_pWebEditView->m_pWebChannelApi->m_vecUndoLog.isEmpty()
			|| !m_pWebEditWidget->m_pWebEditView->m_pWebChannelApi->m_vecRedoLog.isEmpty())
		{
			m_pWebEditWidget->quitAndSave(m_strTmpCurrentFilePath, REFRESHTABPAGES);
		}
	}
	else if (this->widget(currentIndex()) == m_pWebSrcWidget)
	{
		m_pWebSrcWidget->quitAndSave(m_strTmpCurrentFilePath, REFRESHTABPAGES);
	}
	else if (this->widget(currentIndex()) == m_pWebViewWidget)
	{
		//处理在预览界面点击保存不能保存的bug
		emit m_pWebViewWidget->saveWeb();
	}
	m_pWebEditWidget->m_pWebEditView->m_pWebChannelApi->clearData();
}

/**        
 * @brief: 更新web文件内容      
 */
void BaseTabWidget::updateWebFile()
{
	if (m_isUpdateFile)
	{
		QString file = m_strTmpCurrentFilePath;
		file.replace("~", "");
		QFile::remove(file);
		QFile::copy(m_strTmpCurrentFilePath, file);
	}
	refreshPage(currentIndex()); 
	m_isUpdateFile = false;
	this->setEnabled(true);
   emit sigSaveAsFile();
}

/**        
 * @brief: 设置项目选中项右键       
 * @param[in]: point
 */
void BaseTabWidget::slotCustomContextMenuRequested(const QPoint & pos)
{
	int index = this->currentIndex();
	if (index >= 0)
	{
		QMenu menu;
		menu.addAction(qApp->translate(c_sTabWidget, c_sCloseWeb), this, SLOT(slotCloseWeb()));
		menu.addAction(qApp->translate(c_sTabWidget, c_sSave), this, SLOT(slotSaveWeb()));
		menu.addAction(qApp->translate(c_sTabWidget, c_sSaveAs), this, SLOT(slotSaveAsWeb()));
		menu.exec(QCursor::pos());
	}
}

/**        
 * @brief: 右键关闭网页
 */
void BaseTabWidget::slotCloseWeb()
{
	emit tabCloseRequested(currentIndex());
}

/**        
 * @brief:  保存网页     
 */
void BaseTabWidget::slotSaveWeb()
{
	BaseTabWidget *childTabWidget = qobject_cast<BaseTabWidget*>(this->widget(currentIndex()));
	auto iter = this->m_tempFile.begin();
	for (; iter != this->m_tempFile.end(); ++iter)
	{
		if (iter.key() == childTabWidget)
		{
			iter.key()->save(true);
			QString text = this->tabText(this->currentIndex());
			this->setTabText(this->currentIndex(), text.replace("*", ""));
 			return;
		}
	}
}

/**        
 * @brief: 网页文件另存为
 */
void BaseTabWidget::slotSaveAsWeb()
{
	//codereview 另存为文件的处理需要讨论
	QString openPath = "";
	if (m_projectPath.isEmpty())
	{
		openPath = "C:/Default";
	}
	else
	{
		openPath = m_projectPath + "/Default";
	}
	QString newName = QFileDialog::getSaveFileName(this, "", openPath, "HTML(*.html)");
	
	if (!m_projectPath.isEmpty())
	{
	   if (!newName.contains(m_projectPath))
	   {
		   QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning), 
			   qApp->translate(c_sTabWidget, c_sErrorPathWarning)
			   );
		   box.setStandardButtons(QMessageBox::Ok);
		   box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		   box.exec();
		   return;
	   }
	}
	BaseTabWidget *childTabWidget = qobject_cast<BaseTabWidget*>(this->widget(currentIndex()));

	auto iter = this->m_tempFile.begin();
	for (; iter != this->m_tempFile.end(); ++iter)
	{
		if (iter.key() == childTabWidget)
		{
			iter.key()->save(false);
			iter.key()->m_sourceDir = m_tempFile.value(iter.key());
			iter.key()->m_desDir = newName;
		}
	}
}

/**        
 * @brief: 响应文件重命名槽函数     
 * @param[in]:  oldName-旧名称
 * @param[in]:  newName-新名称
 * @return: NULL
 */
void BaseTabWidget::slotUpdateName(QString oldName, QString newName)
{
	int pos = oldName.lastIndexOf("/") + 1;
	QString path = oldName.left(pos) + "~" + oldName.mid(pos);
	QString name = newName.left(pos) + "~" + newName.mid(pos);
	auto iter = m_tempFile.constBegin();
	while (iter != m_tempFile.constEnd())
	{
		if (iter.value() == path)
		{
			//如果是重命名文件和文件夹不同的处理逻辑
			this->setTabText(this->indexOf(iter.key()), newName.mid(pos));
			//重命名临时文件
			QFile::rename(iter.value(), name);
			//更新Tab页文件
			m_tempFile[iter.key()] = name;
			iter.key()->setFilePath(name);
			break;
			
		}
		else if (iter.value().contains(oldName))
		{
			//如果重命名的是文件夹处理逻辑
			QString str = iter.value();
			str = str.replace(oldName, newName);
			m_tempFile[iter.key()] = str;
			iter.key()->setFilePath(str);
			qDebug() << "newName:" << str;
		}
		++iter;
	}
}


/**        
 * @brief: 更新编辑，源码和预览页面对应的文件路径        
 * @param[in]:  path-文件路径
 */
void BaseTabWidget::setFilePath(const QString path)
{
	m_strTmpCurrentFilePath = path;
//	m_pWebEditWidget->m_pWebEditView->m_strCurrentFilePath = path;
}

/**        
 * @brief:        
 */
void BaseTabWidget::slotSaveAsFile()
{
	if (m_sourceDir.isEmpty() || m_desDir.isEmpty()) return;
	QFile::copy(m_sourceDir, m_desDir);
	//兼容文件模块
	sendMessage(WEBEDITFRAME, this, SAVE_AS_HTML, &m_desDir);

	sendMessage(WEBFILEEDITFRAME, this, SAVE_AS_HTML, &m_desDir);

	//TODO 关闭当前Tab页打开另存为的Tab页
	m_sourceDir = "";
	m_desDir = "";
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool BaseTabWidget::isEditWidget()
{
	if (this->widget(currentIndex()) == m_pWebEditWidget)
	{
		return true;
	}
	return false;
}
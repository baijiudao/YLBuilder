/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseFrame.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               项目和文件两个Frame的基类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/5/26
** Descriptions:               END
** 
*********************************************************************************************************/
#include "BaseFrame.h"

BaseFrame::BaseFrame(QWidget *parent)
	: WorkspaceWidget(parent)
	, m_pParent(parent)
	, m_pMainTabWidget(NULL)
	, m_pWebEditDockWidget(NULL)
	, m_pWebIcgDockWidget(NULL)
	, m_pWEFileRibbonPage(NULL)
	, m_pToolBarWidget(NULL)
	, m_pFileManager(NULL)
	, m_pMainWindow(NULL)
	, m_pControlTable(NULL)
	, m_pIcgManagerWidget(NULL)
	, m_projectPath("")
{
	installListener(this);
	m_pFileManager = new FileManager("");
}

BaseFrame::~BaseFrame()
{
	if (m_pToolBarWidget != NULL)
	{
		delete m_pToolBarWidget;
		m_pToolBarWidget = NULL;
	}
	if (m_pMainTabWidget != NULL)
	{
		delete m_pMainTabWidget;
		m_pMainTabWidget = NULL;
	}
}

/**        
 * @brief: 生成Ribbon      
 * @param[in]: type一种代表项目模块，另外一种代表文件模块
 */
void BaseFrame::makeRibbon(int type)
{
	m_pMainWindow = static_cast<RibbonMainWindow*>(m_pParent);
	if (NULL != m_pMainWindow)
	{
		if (NULL != m_pMainWindow->ribbonBar())
		{
			m_pWEFileRibbonPage = m_pMainWindow->ribbonBar()->addPage("");
			connect(m_pWEFileRibbonPage, &RibbonPage::activated, this, &BaseFrame::onMenuChange);

			m_pToolBarWidget = new WebEditToolBarWidget(type, m_pWEFileRibbonPage);
			m_pToolBarWidget->setToolWidgetEnable(false);
			
			connect(static_cast<QCheckBox*>(m_pToolBarWidget->m_abstractButtonsMap.value("ControlDockShow")),			
				&QCheckBox::stateChanged, this, &BaseFrame::showControlDockWidget);			
			connect(static_cast<QCheckBox*>(m_pToolBarWidget->m_abstractButtonsMap.value("IcgDockShow")),
				&QCheckBox::stateChanged, this, &BaseFrame::showIcgDockWidget);
		}
	}
}

/**        
 * @brief: 生成大的Tab框架
 */
void BaseFrame::makeMainTabWidget()
{
	m_pMainTabWidget = new BaseTabWidget("", this);
	connect(m_pMainTabWidget, &QTabWidget::currentChanged, this, &BaseFrame::slotCurrentPageChanged);
	connect(m_pMainTabWidget, &QTabWidget::tabCloseRequested, this, &BaseFrame::slotCloseTab);
	m_pMainTabWidget->setWindowFlags(Qt::SubWindow);
	setCentralWidget(m_pMainTabWidget);
	m_pMainTabWidget->setEnabled(true);
}

/**        
 * @brief: 创建编辑框DockWidget      
 */
void BaseFrame::makeWebEditDockWidget()
{
	m_pWebEditDockWidget = new BaseDockWidget(this);
	m_pControlTable = new QControlTableWidget(m_pWebEditDockWidget);
	m_pWebEditDockWidget->setWidget(m_pControlTable);
	addDockWidget(Qt::LeftDockWidgetArea, m_pWebEditDockWidget);
	connect(m_pWebEditDockWidget, &BaseDockWidget::controlDockShow,
		this, &BaseFrame::onCheckControlDock);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void BaseFrame::makeIcgDockWidget()
{
	QString path = qApp->applicationDirPath();
	path = path + "/data/icg";
	m_pWebIcgDockWidget = new BaseDockWidget(this);
	m_pIcgManagerWidget = new IcgManagerWidget(path, m_pWebIcgDockWidget);
	m_pWebIcgDockWidget->setWidget(m_pIcgManagerWidget);
	addDockWidget(Qt::LeftDockWidgetArea, m_pWebIcgDockWidget);
	connect(m_pWebIcgDockWidget, &BaseDockWidget::controlDockShow,
		this, &BaseFrame::onCheckIcgDock);
}
/**        
 * @brief: 打开网页文件      
 * @param[in]:filePath-网页路径
 */
void BaseFrame::openHtml(QString filePath)
{
	int pos = filePath.lastIndexOf("/") + 1;
	QString strTmpCurrentFilePath = filePath.left(pos) + "~" + filePath.mid(pos);

	//判断此文件是否已经打开
	auto iter = m_pMainTabWidget->m_tempFile.constBegin();
	while (iter != m_pMainTabWidget->m_tempFile.constEnd())
	{
		if (iter.value() == strTmpCurrentFilePath)
		{
			m_pMainTabWidget->setCurrentWidget(iter.key());
			return;
		}
		++iter;
	}

	if (QFile::exists(strTmpCurrentFilePath))
	{
		DWORD  dAttribute1 = GetFileAttributes(strTmpCurrentFilePath.toStdWString().c_str());
		QFile::remove(strTmpCurrentFilePath);
	}
	QFile::copy(filePath, strTmpCurrentFilePath);
	BaseTabWidget *tabWidget = new BaseTabWidget(strTmpCurrentFilePath, m_pMainTabWidget);
	connect(tabWidget, &QTabWidget::currentChanged, this, &BaseFrame::slotPageChange);
	m_pMainTabWidget->setProjectPath(m_projectPath);

	m_pMainTabWidget->m_tempFile.insert(tabWidget, strTmpCurrentFilePath);

	int index = m_pMainTabWidget->addTab(tabWidget, filePath.mid(pos));
	m_pMainTabWidget->setTabToolTip(index, filePath);
	m_pMainTabWidget->setCurrentWidget(tabWidget);

	m_pFileManager->addSuportFolder(filePath.mid(0, filePath.lastIndexOf("/")));

	DWORD  dAttribute = GetFileAttributes(strTmpCurrentFilePath.toStdWString().c_str());
	SetFileAttributes(strTmpCurrentFilePath.toStdWString().c_str(),
		dAttribute | FILE_ATTRIBUTE_HIDDEN);
}

/**        
 * @brief: 编辑，源码和预览切换  
 * @param[in]:index-索引  
 */
void BaseFrame::slotPageChange(int index)
{
	QTabWidget *currentTab = qobject_cast<QTabWidget*>(
		m_pMainTabWidget->widget(m_pMainTabWidget->currentIndex()));
	if (NULL == currentTab)
	{
		return;
	}
	if (0 == currentTab->currentIndex())
	{
	   m_pToolBarWidget->setToolWidgetEnable(true);
	}
	else
	{
       m_pToolBarWidget->setToolWidgetEnable(false);
	}
}

/**
* @brief:  当前页改变时响应槽函数
* @param[in]:  index-索引
*/
void BaseFrame::slotCurrentPageChanged(int index)
{
	QTabWidget *currentTab = qobject_cast<QTabWidget*>(m_pMainTabWidget->widget(index));
	if (NULL == currentTab)
	{
		return;
	}
	if (0 == currentTab->currentIndex())
	{
		QWebEngineEditView *engineer = qobject_cast<QWebEditWidget*>(
			currentTab->currentWidget())->m_pWebEditView;
		m_pToolBarWidget->setWebEngineer(engineer);
		//codereview 项目显示不能跟随使能
		m_pToolBarWidget->setToolWidgetEnable(true);
	}
	else
	{
		m_pToolBarWidget->setToolWidgetEnable(false);
	}
}

/**
* @brief:
* @param[in]: evt-事件响应
*/
void BaseFrame::changeEvent(QEvent *evt)
{
	switch (evt->type())
	{
	case QEvent::LanguageChange:
		retranslate();
		break;
	default:
		break;
	}
	WorkspaceWidget::changeEvent(evt);
}

/**        
 * @brief: 关闭标签页
 * @param[in]: index-索引
 */
void BaseFrame::slotCloseTab(int index)
{
	//TODO正在编辑不能关闭
	BaseTabWidget *widget = static_cast<BaseTabWidget*>(m_pMainTabWidget->widget(index));
	QString text = m_pMainTabWidget->tabText(m_pMainTabWidget->indexOf(widget));

	bool state = false;
	if (widget->isEditWidget())
	{
		if (text.contains("*"))
		{
			state = true;
		}
		else
		{
			state = false;
		}
	}
	else
	{
		widget->save(false);
		QString file = m_pMainTabWidget->m_tempFile.values(widget).at(0);
		state = isSameFile(m_pMainTabWidget->m_tempFile.values(widget).at(0), file.replace("~", ""));
	}
	if (state)
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
			qApp->translate(c_sBaseFrame, c_sExistTempFile)
			);
		box.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sBaseFrame, c_sCancel));
		box.exec();
		if (box.clickedButton() == box.button(QMessageBox::Cancel))
		{
			return;
		}
	}
	/*QWebEditWidget *webEdit = static_cast<QWebEditWidget*>(
		widget->currentWidget());
		if (webEdit != NULL)
		{
		webEdit->m_pWebEditView->setCloseHtml();
		}
		*/
	m_pMainTabWidget->m_tempFile.remove(widget);
	widget->deleteLater();

	if (0 == m_pMainTabWidget->m_tempFile.count())
	{
		m_pToolBarWidget->setToolWidgetEnable(false);
	}
}

/**        
 * @brief: 点击保存响应槽函数
 */
void BaseFrame::onSave()
{
	auto iter = m_pMainTabWidget->m_tempFile.begin();
	for (; iter != m_pMainTabWidget->m_tempFile.end(); ++iter)
	{
		if (iter.key() != NULL)
		{
			QWebEngineEditView *engineer = qobject_cast<QWebEditWidget*>(iter.key()->
				widget(0))->m_pWebEditView;
			iter.key()->save(true);
			//点击保存之后撤销和重做disEnable
			m_pToolBarWidget->setWebEngineer(engineer);
			QString text = m_pMainTabWidget->tabText(m_pMainTabWidget->indexOf(iter.key()));
			m_pMainTabWidget->setTabText(m_pMainTabWidget->indexOf(iter.key()), text.replace("*", ""));
		}
	}
}

/**        
 * @brief: 是否显示项目或者控件列表页与设置功能的联动    
 * @param[in]: show-true勾选,false不勾选
 */
void BaseFrame::onCheckControlDock(bool show)
{
	auto itor = m_pToolBarWidget->m_abstractButtonsMap.find(c_sWEControlDockShow);
	if (itor != m_pToolBarWidget->m_abstractButtonsMap.end())
	{
		itor.value()->setChecked(show);
	}
}

/**
* @brief: 是否显示项目或者控件列表页与设置功能的联动
* @param[in]: show-true勾选,false不勾选
*/
void BaseFrame::onCheckIcgDock(bool show)
{
	auto itor = m_pToolBarWidget->m_abstractButtonsMap.find(c_sWEFrameResWindow);
	if (itor != m_pToolBarWidget->m_abstractButtonsMap.end())
	{
		itor.value()->setChecked(show);
	}
}

/**        
 * @brief: 判断是否存在未保存文件
 */
bool BaseFrame::isChangeOfContent()
{
	auto iter = m_pMainTabWidget->m_tempFile.begin();
	bool state = false;
	for (; iter != m_pMainTabWidget->m_tempFile.end(); ++iter)
	{
		if (iter.key() != NULL)
		{
			QString text = m_pMainTabWidget->tabText(m_pMainTabWidget->indexOf(iter.key()));
			if (iter.key()->isEditWidget())
			{
				if (text.contains("*"))
				{
					state = true;
				}
				else
				{
					state = false;
				}
			}
			else
			{
				iter.key()->save(false);
				QString file = iter.value();
				state = isSameFile(iter.value(), file.replace("~", ""));
			}
			if (state)
			{
				break;
			}
		}
	}
	return state;
}

/**        
 * @brief: 判断两个文件内容是否完成相同
 * @param[in]: tempFile-文件1 
 * @param[in]: file-文件2
 * @return: 两个文件不同返回true, 相同返回false
 */
bool BaseFrame::isSameFile(const QString tempFile, const QString file)
{
	QFile tempF(tempFile);
	tempF.open(QIODevice::ReadOnly);
	QByteArray tempArray = tempF.readAll();
	tempF.close();
	QFile fileC(file);
	fileC.open(QIODevice::ReadOnly);
	QByteArray array = fileC.readAll();
	fileC.close();
	qDebug() << array;
	qDebug() << tempArray;
	if (array != tempArray)
	{
		return true;
	}
	
	return false;
}


/**
* @brief:
* @param[in]:
* @return:
*/
void BaseFrame::showControlDockWidget(int state)
{
	if (Qt::Checked == state)
	{
		m_pWebEditDockWidget->show();
	}
	else
	{
		m_pWebEditDockWidget->hide();
	}
}

/**
* @brief:
* @param[in]:
* @return:
*/
void BaseFrame::showIcgDockWidget(int state)
{
	if (Qt::Checked == state)
	{
		m_pWebIcgDockWidget->show();
	}
	else
	{
		m_pWebIcgDockWidget->hide();
	}
}
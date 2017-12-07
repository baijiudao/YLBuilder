/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  WebEditFrame.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/9/30
** Descriptions:               END
** 
*********************************************************************************************************/
#include "WebEditFrame.h"
const QString DEFAULT_OPEN_IMAGE_SOFT = "C:/Windows/System32/mspaint.exe";
#define FORCED_WCHAR(str) reinterpret_cast<const wchar_t *>(QString(str).utf16())

WebEditFrame::WebEditFrame(QWidget *parent)
    : BaseFrame(parent) 
	, m_pWEProjDockWidget(NULL)
	, m_pProjectMangerWidget(NULL)
	, m_pCreateProjectDlg(NULL)
	, m_strCurrentPath("")
	, m_strFileDialogPath("")
{
    SetMoudleName(WEBEDITFRAME);
    installListener(this);
    setWindowFlags(Qt::SubWindow);
	init();
    retranslate();
}

WebEditFrame::~WebEditFrame()
{
}

/**        
 * @brief:初始化项目模块      
 */
void WebEditFrame::init()
{
	m_strCurrentPath = "";
	m_strFileDialogPath = "C:/";

	QDir dir;
	m_strCurrentPath = qApp->applicationDirPath();
	m_strCurrentPath.replace("\\", "/");
	m_strCurrentPath = m_strCurrentPath + "/data/";

	makeMainTabWidget();

	makeProjectDockWidget();
	makeWebEditDockWidget();
	makeIcgDockWidget();

	this->tabifyDockWidget(m_pWEProjDockWidget, m_pWebEditDockWidget);
	this->tabifyDockWidget(m_pWebEditDockWidget, m_pWebIcgDockWidget);
    m_pWEProjDockWidget->raise();
	
  	makeRibbon(UI_PROJECT);
 	makeConnect();
}

/**        
 * @brief: 
 */
void WebEditFrame::makeProjectDockWidget()
{
	m_pWEProjDockWidget = new BaseDockWidget(this);
	addDockWidget(Qt::LeftDockWidgetArea, m_pWEProjDockWidget);
	connect(m_pWEProjDockWidget, &BaseDockWidget::controlDockShow, this, &WebEditFrame::onCheckProjDock);
}

/**        
 * @brief:统一对用到的信号槽进行绑定     
 */
void WebEditFrame::makeConnect()
{
	connect(m_pToolBarWidget->m_actionsMap.value("New Project"), 
		&QAction::triggered, this, &WebEditFrame::onNewProject);
	connect(m_pToolBarWidget->m_actionsMap.value("Open Project"), 
		&QAction::triggered, this, &WebEditFrame::onOpenProject);
	connect(m_pToolBarWidget->m_actionsMap.value("Save Project"),
		&QAction::triggered, this, &WebEditFrame::onSave);
	connect(m_pToolBarWidget->m_actionsMap.value("Close Project"), 
		&QAction::triggered, this, &WebEditFrame::onCloseProject);

	connect(static_cast<QCheckBox*>(m_pToolBarWidget->m_abstractButtonsMap.value("ProjDockShow")),
		&QCheckBox::stateChanged, this, &WebEditFrame::showProjDockWidget);
// 	connect(static_cast<QCheckBox*>(m_pToolBarWidget->m_abstractButtonsMap.value("ControlDockShow")),
// 		&QCheckBox::stateChanged, this, &WebEditFrame::showControlDockWidget);
//	connect(static_cast<QCheckBox*>(m_pToolBarWidget->m_abstractButtonsMap.value("")))
}

/**        
 * @brief: 翻译
 */
void WebEditFrame::retranslate()
{
	m_pWEProjDockWidget->setWindowTitle(qApp->translate(c_sWEFrame, c_sWEFrameDockProj));
    m_pWebEditDockWidget->setWindowTitle(qApp->translate(c_sWEFrame, c_sWEFrameDockControl));
	m_pWebIcgDockWidget->setWindowTitle(qApp->translate(c_sPicStorEditFrame, c_sPicStorRes));
	m_pWEFileRibbonPage->setTitle(qApp->translate(c_sWEFrame, c_sWEFileRibbonPage));
}

/**        
 * @brief:        
 * @param[in]:  
 */
void WebEditFrame::onMessage(void* pSender, int iMessageType, void* pData)
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
		QString imagePath = *static_cast<QString*>(pData);
		QWidget widget;
		QString newPath = QFileDialog::getOpenFileName(&widget, tr(""),
			"C:/", IMAGE_TYPE);

		if (newPath.isEmpty() || imagePath.isEmpty())
		{
			return;
		}
		QString path = static_cast<BaseTabWidget*>(m_pMainTabWidget->currentWidget())->getFilePath();

		QString name = path.mid(0, path.lastIndexOf("/") + 1) + 
			imagePath + newPath.mid(newPath.lastIndexOf("/"));
		if (!QFile::exists(name))
		{
			QFile::copy(newPath, name);
			m_pToolBarWidget->sendImagePathToJs(imagePath + newPath.mid(newPath.lastIndexOf("/")));
		}
		else if (newPath != name)
		{
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
				qApp->translate(c_sWEFrame, c_sExistSameName)
				);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.exec();
			return;
		}
		else if (newPath == name)
		{
			m_pToolBarWidget->sendImagePathToJs(imagePath + newPath.mid(newPath.lastIndexOf("/")));
		}
	}

	if (IMAGEPATH_TO_PROJECT == iMessageType)
	{
		QString imagePath = *static_cast<QString*>(pData);
		qDebug() << "add from other" << imagePath;
		m_pProjectMangerWidget->addFile(imagePath);
	}

	if (SAVE_AS_HTML == iMessageType)
	{
		if (!isVisible()) return;
		emit m_pMainTabWidget->tabCloseRequested(m_pMainTabWidget->currentIndex());
		QString imagePath = *static_cast<QString*>(pData);
		qDebug() << "add from other" << imagePath;
		m_pProjectMangerWidget->addFile(imagePath);
		openHtml(imagePath);
	}
}

/**        
 * @brief:        
 * @param[in]:  
 */
void WebEditFrame::resizeEvent(QResizeEvent *event)
{
	WorkspaceWidget::resizeEvent(event);
 	m_pWEProjDockWidget->setMaximumWidth(this->size().width() / 2);
 	m_pWebEditDockWidget->setMaximumWidth(this->size().width() / 2);
}

/**        
 * @brief:        
 * @param[in]:  
 */
void WebEditFrame::showProjDockWidget(int state)
{
	if (Qt::Checked == state)
	{
		m_pWEProjDockWidget->show();
	}
	else
	{
		m_pWEProjDockWidget->hide();
	}
}

/**        
 * @brief:  新建项目文件      
 */
void WebEditFrame::onNewProject()
{
	if (NULL == m_pCreateProjectDlg)
	{
		//codereview 测试一下内存泄漏
		m_pCreateProjectDlg = new CreateProjectDialog(this);
		connect(m_pCreateProjectDlg->getOKBtn(), 
		&QPushButton::clicked, this, &WebEditFrame::slotMakeNewProject);
	}
	m_pCreateProjectDlg->exec();
}

/**        
 * @brief: 打开已存在的项目文件       
 */
void WebEditFrame::onOpenProject()
{
	QString newPath = QFileDialog::getOpenFileName(this, 
		qApp->translate(c_sWEFrame, c_sWEOpenHtmlFile),
		m_strFileDialogPath, "WCP files (*.wcp)");
	if (newPath.isEmpty())
	{
		return;
	}
	m_strFileDialogPath = newPath;
	makeProject(newPath, false);
}

/**        
 * @brief: 关闭项目文件
 */
void WebEditFrame::onCloseProject()
{
	//判断是否存在未保存文件
	if (isChangeOfContent())
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
			qApp->translate(c_sWEFrame, c_sIsExistTempFile)
			);
		box.setStandardButtons(QMessageBox::Ok|QMessageBox::Cancel);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sBaseFrame, c_sCancel));
		box.exec();
		if (box.clickedButton() == box.button(QMessageBox::Cancel))
		{
			return;
		}
	}
	m_pMainTabWidget->clear();
	delete m_pProjectMangerWidget;
	m_pProjectMangerWidget = NULL;
}

/**        
 * @brief: 双击打开对应文件
 * @param[in]:  index-索引
 */
void WebEditFrame::slotDoubleClickTreeView(const QModelIndex &index)
{
	QString path = m_pProjectMangerWidget->getModel()->data(index, Qt::UserRole).value<QString>();
	if (!path.contains("."))
    {
		return;
    }

	if (!QFile::exists(path))
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
			qApp->translate(c_sWEFrame, c_sNoFile)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return;
	}
	int format = fileFormat(path);
	switch (format)
	{
		case WEB_FORMAT:
			openHtml(path);
			break;
		case OTHER_FORMAT:
			openOtherFile(path);
			break;
		default:
			break;
	}
}

/**        
 * @brief:  获取文件格式
 * @param[in]:  filepath-文件路径
 */
int WebEditFrame::fileFormat(QString filepath)
{
	int pos = filepath.lastIndexOf(".");

	QString fileFormat = filepath.mid(pos + 1);
    
    if (fileFormat == "htm" || fileFormat == "html")
	{
		return WEB_FORMAT;
	}
	else
	{
		return OTHER_FORMAT;
	}
	return -1;
}

/**        
 * @brief:  打开其他文件格式（使用系统默认）
 * @param[in]:  filePath-文件路径
 */
void WebEditFrame::openOtherFile(const QString filePath)
{
	//调用系统自带程序打开不关心文件
	ShellExecuteW(NULL, QString("open").toStdWString().c_str(),
		filePath.toStdWString().c_str(), NULL, NULL, SW_SHOW);
}

/**        
 * @brief: 新建项目响应槽函数       
 */
void WebEditFrame::slotMakeNewProject()
{
	if (!m_pCreateProjectDlg->getPathAndNameState())
	{
		return;
	}
	QString path = "";
	QString projectName = "";
	m_pCreateProjectDlg->getPathAndName(path, projectName);
	QString projectPath = path + "/" + projectName + "/" + projectName + ".wcp";
	QDir dir(path + "/" + projectName);
	if (dir.exists())
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
			qApp->translate(c_sProjectWidget, c_sExitName)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return ;
	}
	makeProject(projectPath, true);
}

/**        
 * @brief:        
 */
void WebEditFrame::onMenuChange()
{
	sendMessage(WEBTOOLMOUDLE, this, OPENWEBEDIT);
}

/**        
 * @brief:在状态栏显示文件路径
 */
void WebEditFrame::slotShowFilePath(const QModelIndex &index)
{
	QString path = m_pProjectMangerWidget->getModel()->data(index, 
		Qt::UserRole).value<QString>();
	m_pMainWindow->statusBar()->showMessage(path);
}

void WebEditFrame::showEvent(QShowEvent *event)
{
	BaseFrame::showEvent(event);
	if (m_pProjectMangerWidget != NULL)
	{
		QString path = m_pProjectMangerWidget->getModel()->data(
			m_pProjectMangerWidget->getTreeView()->currentIndex(), Qt::UserRole).value<QString>();
		m_pMainWindow->statusBar()->showMessage(path);
	}
}

void WebEditFrame::hideEvent(QHideEvent *event)
{
	BaseFrame::hideEvent(event);
	if (m_pProjectMangerWidget != NULL)
	{
		QString path = m_pProjectMangerWidget->getModel()->data(
			m_pProjectMangerWidget->getTreeView()->currentIndex(), Qt::UserRole).value<QString>();
		m_pMainWindow->statusBar()->showMessage("");
	}
}

/**        
 * @brief: 响应项目Dock关闭按键       
 * @param[in]:  
 */
void WebEditFrame::onCheckProjDock(bool show)
{
	auto itor = m_pToolBarWidget->m_abstractButtonsMap.find(c_sWEProjDockShow);
	if (itor != m_pToolBarWidget->m_abstractButtonsMap.end())
	{
		itor.value()->setChecked(show);
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void WebEditFrame::slotDeleteFile(QString path)
{
	QFileInfo info(path);
	if (info.isFile())
	{
		int pos = path.lastIndexOf("/") + 1;
		QString name = path.left(pos) + "~" + path.mid(pos);
		QList<BaseTabWidget*> list = m_pMainTabWidget->m_tempFile.keys(name);
		if (!list.isEmpty())
		{
			emit m_pMainTabWidget->tabCloseRequested(m_pMainTabWidget->indexOf(list.at(0)));
		}
	}
	else if (info.isDir())
	{
		foreach(QString value, m_pMainTabWidget->m_tempFile)
		{
			if (value.contains(path))
			{
				QList<BaseTabWidget*> list = m_pMainTabWidget->m_tempFile.keys(value);
				emit m_pMainTabWidget->tabCloseRequested(m_pMainTabWidget->indexOf(list.at(0)));
			}
		}
	}
	m_pProjectMangerWidget->deleteOneNode(path);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void WebEditFrame::makeProject(QString newPath, bool state)
{
	if (m_pProjectMangerWidget != NULL)
	{
		//是否存在未保存
		if (isChangeOfContent())
		{
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sProjectWidget, c_sError),
				qApp->translate(c_sWEFrame, c_sIsExistTempFile)
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
		//是否覆盖
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sProjectWidget, c_sError),
			qApp->translate(c_sWEFrame, c_sIsCoverProject)
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
	m_pMainTabWidget->clear();
	m_pMainTabWidget->m_tempFile.clear();
	m_pProjectMangerWidget = new ProjectManagerWidget(newPath, state, m_pWEProjDockWidget);

	m_projectPath = newPath.mid(0, newPath.lastIndexOf("/"));
	connect(m_pProjectMangerWidget->getTreeView(), &QTreeView::doubleClicked,
		this, &WebEditFrame::slotDoubleClickTreeView);

	connect(m_pProjectMangerWidget->getTreeView(), &QTreeView::pressed,
		this, &WebEditFrame::slotShowFilePath);
	m_pWEProjDockWidget->setWidget(m_pProjectMangerWidget);

	connect(m_pProjectMangerWidget, &ProjectManagerWidget::sigUpdateName,
		m_pMainTabWidget, &BaseTabWidget::slotUpdateName);

	connect(m_pProjectMangerWidget, &ProjectManagerWidget::sigDeleteFile,
		this, &WebEditFrame::slotDeleteFile);
}
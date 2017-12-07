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
#include "WebEditToolBarWidget.h"
#include <QApplication>
#include <QCheckBox>
#include <QDebug>
#include "CameraConfigDialog.h"
WebEditToolBarWidget::WebEditToolBarWidget(int type, RibbonPage *page, QWidget *parent)
	: QWidget(parent)
	, m_type(type)
	, m_pWEEditRibbonPage(page)
	, m_pWebEngineEditView(NULL)
{
	m_ribbonGroupMap.clear();
	init();
}

WebEditToolBarWidget::~WebEditToolBarWidget()
{
// 	delete m_pWebEngineEditView;
// 	m_pWebEngineEditView = NULL;
}

/**        
 * @brief:  初始化工具条      
 */
void WebEditToolBarWidget::init()
{
	makeWidget();
	m_pWEEditRibbonPage->setEnabled(true);
	m_pWEEditRibbonPage->setVisible(true);	retranslate();
}

/**        
 * @brief: 设置撤销和重做状态    
 * @param[in]:  QWebEngineEditView
 */
void WebEditToolBarWidget::setWebEngineer(QWebEngineEditView *engineer)
{
	m_pWebEngineEditView = engineer;
	auto itorActions = m_actionsMap.begin();
	for (; itorActions != m_actionsMap.end(); itorActions++)
	{
		if (itorActions.key() == c_sWERedo)
		{
			itorActions.value()->setEnabled(engineer->m_pWebChannelApi->m_redoBtnState);
		}
		else if (itorActions.key() == c_sWEUndo)
		{
			itorActions.value()->setEnabled(engineer->m_pWebChannelApi->m_undoBtnState);
		}
	}
}

/**        
 * @brief: 处理翻译事件       
 * @param[in]:  e
 */
void WebEditToolBarWidget::changeEvent(QEvent *e)
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

/**        
 * @brief: 翻译      
 */
void WebEditToolBarWidget::retranslate()
{
	QMap<QString, QAction*>::iterator itorActions = m_actionsMap.begin();
	for (; itorActions != m_actionsMap.end(); itorActions++)
	{
		itorActions.value()->setText(qApp->translate(c_sWEBWidget, itorActions.key().toLatin1().data()));
	}

	QMap<QString, Qtitan::RibbonGroup*>::iterator itorRibbonGroup = m_ribbonGroupMap.begin();
	for (; itorRibbonGroup != m_ribbonGroupMap.end(); itorRibbonGroup++)
	{
		itorRibbonGroup.value()->setTitle(qApp->translate(c_sWEBWidget, itorRibbonGroup.key().toLatin1().data()));
	}

	QMap<QString, QAbstractButton*>::iterator itorAbstractButtons = m_abstractButtonsMap.begin();
	for (; itorAbstractButtons != m_abstractButtonsMap.end(); itorAbstractButtons++)
	{
		itorAbstractButtons.value()->setText(qApp->translate(c_sWEBWidget, 
			itorAbstractButtons.key().toLatin1().data()));
		itorAbstractButtons.value()->setToolTip(qApp->translate(c_sWEBWidget, 
			itorAbstractButtons.key().toLatin1().data()));
	}

}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void WebEditToolBarWidget::onSetWebTitle()
{
	this->sendMessage(WEBENGINEEDITVIEW, this, WEBMESSAGE_SETWEBTITLE);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void WebEditToolBarWidget::onSetWebSize()
{
	//this->sendMessage(WEBENGINEEDITVIEW, this, WEBMESSAGE_SETWEBSIZE);
	m_pWebEngineEditView->setHtmlSize();
}

void WebEditToolBarWidget::onSelectAll()
{
	webCmd("setSelectAll()");
}

void WebEditToolBarWidget::onCopy()
{
	webCmd("copy()");
}

void WebEditToolBarWidget::onPaste()
{
	webCmd("paste()");
}

void WebEditToolBarWidget::onDelete()
{
	webCmd("deleteElenments()");
}

/**        
 * @brief: 撤销      
 */
void WebEditToolBarWidget::onUndo()
{
	m_pWebEngineEditView->m_pWebChannelApi->onUndo();
}

/**        
 * @brief: 重做
 */
void WebEditToolBarWidget::onRedo()
{
	m_pWebEngineEditView->m_pWebChannelApi->onRedo();
}

void WebEditToolBarWidget::onAlignTop()
{
	webCmd("align('alignTop')");
}

void WebEditToolBarWidget::onAlignBottom()
{
	webCmd("align('alignBottom')");
}

void WebEditToolBarWidget::onAlignLeft()
{
	webCmd("align('alignLeft')");
}

void WebEditToolBarWidget::onAlignRight()
{
	webCmd("align('alignRight')");
}

void WebEditToolBarWidget::onAlignHorizontal()
{
	webCmd("align('horizontal')");
}

void WebEditToolBarWidget::onAlignVertical()
{
	webCmd("align('vertical')");
}

void WebEditToolBarWidget::onEquidistantHorizontal()
{
	webCmd("SetEquidistant('horizontal')");
}

void WebEditToolBarWidget::onEquidistantVertical()
{
	webCmd("SetEquidistant('vertical')");
}

void WebEditToolBarWidget::onSameWidth()
{
	webCmd("SetSameSize('width')");
}

void WebEditToolBarWidget::onSameHeight()
{
	webCmd("SetSameSize('height')");
}

void WebEditToolBarWidget::onSameSize()
{
	webCmd("SetSameSize('size')");
}

void WebEditToolBarWidget::onZoomNormal()
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->setZoomFactor(1.0);
}

void WebEditToolBarWidget::onZoomIn()
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->setZoomFactor(m_pWebEngineEditView->zoomFactor() + 0.125);
}

void WebEditToolBarWidget::onZoomOut()
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->setZoomFactor(m_pWebEngineEditView->zoomFactor() - 0.125);
}

/**        
 * @brief:  网页中插入图片      
 */
void WebEditToolBarWidget::insertImage()
{
 	QString newPath = QFileDialog::getOpenFileName(this, tr(""),
 		"C:/", IMAGE_TYPE);
 	if (newPath.isEmpty())
 	{
 		return;
 	}
	
	//m_pWebEngineEditView->page->/*->evaluateJavaScript("'Java' + 'Script'");*/
	//m_pWebEngineEditView->page()->runJavaScript(cmd);
	//QString cmd1 = "setRelativePath()";
	//webCmd(cmd1);
	
	QString file = m_pWebEngineEditView->m_strCurrentFilePath;
	QString relativePath = m_pWebEngineEditView->m_pWebChannelApi->m_relativePath
		+ "/" + newPath.mid(newPath.lastIndexOf("/") + 1);

	QString imagePath = file.mid(0, file.lastIndexOf("/") + 1) + relativePath;

	QFile::copy(newPath, imagePath);

	QString cmd = "setCanvasPic('" + relativePath + "')";
 	webCmd(cmd);
}

/**        
 * @brief: 网页插入背景图片    
 */
void WebEditToolBarWidget::insertBackGround()
{
   //TODO
 	QString newPath = QFileDialog::getOpenFileName(this, tr(""),
 		"C:/",IMAGE_TYPE);
 	if (newPath.isEmpty())
 	{
 		return;
 	}

	QString file = m_pWebEngineEditView->m_strCurrentFilePath;
	QString relativePath = m_pWebEngineEditView->m_pWebChannelApi->m_relativePath
		+ "/" + newPath.mid(newPath.lastIndexOf("/") + 1);

	QString imagePath = file.mid(0, file.lastIndexOf("/") + 1) + relativePath;

	QFile::copy(newPath, imagePath);
	QString cmd = "setCanvasBg('" + relativePath + "')";
 	webCmd(cmd);
}

void WebEditToolBarWidget::setCamera()
{
	CameraConfigDialog *dig = new CameraConfigDialog(this);
	dig->show();
}

/**        
 * @brief: 发送选择的图片路径到js       
 * @param[in]: path-图片路径 
 */
void WebEditToolBarWidget::sendImagePathToJs(QString path)
{
	QString cmd = "setPictrue('" + path + "')";
	webCmd(cmd);
}

/**        
 * @brief: 设置工具条是否使能
 * @param[in]: state-工具条状态，编辑页面使能其他非使能 
 */
void WebEditToolBarWidget::setToolWidgetEnable(bool state)
{
	//TODO
	auto itor = m_ribbonGroupMap.begin();
	for (; itor != m_ribbonGroupMap.end(); itor++)
	{
		if (itor.key() == c_sWEFileRibbonGroup || itor.key() == c_sWEProjectRibbonGroup 
			|| itor.key() == c_sWEDockViewGroup || itor.key() == c_sWECameraConfigGroup)
		{
			itor.value()->setEnabled(true);
		}
		else
		{
			itor.value()->setEnabled(state);
		}
	}
}

/**        
 * @brief: 给js发送命令   
 */
void WebEditToolBarWidget::webCmd(QString cmd)
{
	if (NULL == m_pWebEngineEditView)
	{
		return;
	}
	m_pWebEngineEditView->page()->runJavaScript(cmd);
}

/**
* @brief: 生成widget并绑定信号槽
*/
void WebEditToolBarWidget::makeWidget()
{
	if (UI_PROJECT == m_type)
	{
		makeProjectRibbon();
	}
	else
	{
		makeFileRibbon();
	}

	//页面设置
	if (Qtitan::RibbonGroup* groupPageSetting = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEPageSettingRibbonGroup, groupPageSetting);

		QAction* ptmpAction = groupPageSetting->addAction(QIcon(":/WebConfigurationTool/res/SetPageSize.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWESetPageSize, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onSetWebSize);
	}

	//编辑
	if (Qtitan::RibbonGroup* groupEdit = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEEditRibbonGroup, groupEdit);

		QAction* ptmpAction = groupEdit->addAction(QIcon(":/WebConfigurationTool/res/SelectAll.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWESelectAll, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onSelectAll);

		ptmpAction = groupEdit->addAction(QIcon(":/WebConfigurationTool/res/Copy.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWECopy, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onCopy);

		ptmpAction = groupEdit->addAction(QIcon(":/WebConfigurationTool/res/Paste.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEPaste, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onPaste);

		ptmpAction = groupEdit->addAction(QIcon(":/WebConfigurationTool/res/Delete.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEDelete, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onDelete);

		ptmpAction = groupEdit->addAction(QIcon(":/WebConfigurationTool/res/Undo.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEUndo, ptmpAction);
		ptmpAction->setEnabled(false);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onUndo);

		ptmpAction = groupEdit->addAction(QIcon(":/WebConfigurationTool/res/Redo.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWERedo, ptmpAction);
		ptmpAction->setEnabled(false);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onRedo);
	}
	//对齐
	if (Qtitan::RibbonGroup* groupAlign = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEAlignRibbonGroup, groupAlign);

		QAction* ptmpAction = groupAlign->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignTop.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEAlignTop, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onAlignTop);

		ptmpAction = groupAlign->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignBottom.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEAlignBottom, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onAlignBottom);

		ptmpAction = groupAlign->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignLeft.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEAlignLeft, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onAlignLeft);

		ptmpAction = groupAlign->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AlignRight.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEAlignRight, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onAlignRight);

		ptmpAction = groupAlign->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AliHorCenter.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEAlignHorizontal, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onAlignHorizontal);

		ptmpAction = groupAlign->addAction(QIcon(":/WebConfigurationTool/res/PicEdit_AliVerCenter.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEAlignVertical, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onAlignVertical);
	}

	//等间距
	if (Qtitan::RibbonGroup* groupEquidistant = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEEquidistantRibbonGroup, groupEquidistant);

		QAction* ptmpAction = groupEquidistant->addAction(QIcon(":/WebConfigurationTool/res/HorEquidistant.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEEquidistantHorizontal, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onEquidistantHorizontal);

		ptmpAction = groupEquidistant->addAction(QIcon(":/WebConfigurationTool/res/VerEquidistant.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWEEquidistantVertical, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onEquidistantVertical);
	}

	//大小
	if (Qtitan::RibbonGroup* groupSize = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWESizeRibbonGroup, groupSize);

		QAction* ptmpAction = groupSize->addAction(QIcon(":/WebConfigurationTool/res/SameWidth.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWESameWidth, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onSameWidth);

		ptmpAction = groupSize->addAction(QIcon(":/WebConfigurationTool/res/SameHeight.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWESameHeight, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onSameHeight);

		ptmpAction = groupSize->addAction(QIcon(":/WebConfigurationTool/res/SameSize.png"),
			"", Qt::ToolButtonTextBesideIcon);
		m_actionsMap.insert(c_sWESameSize, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onSameSize);
	}

	//缩放
	if (Qtitan::RibbonGroup* groupZoom = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEZoomRibbonGroup, groupZoom);

		QAction* ptmpAction = groupZoom->addAction(QIcon(":/WebConfigurationTool/res/ZoomNormal.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEZoomNormal, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onZoomNormal);

		ptmpAction = groupZoom->addAction(QIcon(":/WebConfigurationTool/res/ZoomIn.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEZoomIn, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onZoomIn);

		ptmpAction = groupZoom->addAction(QIcon(":/WebConfigurationTool/res/ZoomOut.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEZoomOut, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::onZoomOut);
	}
	//插入图片
	if (Qtitan::RibbonGroup* groupImageView = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEImageGroup, groupImageView);
		QAction* ptmpAction = groupImageView->addAction(QIcon(":/WebConfigurationTool/res/InsertIamge.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEInsertImage, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::insertImage);

		ptmpAction = groupImageView->addAction(QIcon(":/WebConfigurationTool/res/BackGround.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWEInsertBackground, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::insertBackGround);
	}
	//摄像头配置
	if (Qtitan::RibbonGroup* groupCameraView = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWECameraConfigGroup, groupCameraView);
		QAction* ptmpAction = groupCameraView->addAction(QIcon(":/WebConfigurationTool/res/Camera.png"),
			"", Qt::ToolButtonTextUnderIcon);
		m_actionsMap.insert(c_sWECamera, ptmpAction);
		connect(ptmpAction, &QAction::triggered, this, &WebEditToolBarWidget::setCamera);
	}

	//停靠窗
	if (Qtitan::RibbonGroup* groupDockView = m_pWEEditRibbonPage->addGroup(""))
	{
		m_ribbonGroupMap.insert(c_sWEDockViewGroup, groupDockView);

		if (UI_PROJECT == m_type)
		{
			QCheckBox* checkProjDockWidget = new QCheckBox("", this);
			m_abstractButtonsMap.insert(c_sWEProjDockShow, checkProjDockWidget);
			checkProjDockWidget->setCheckState(Qt::Checked);
			groupDockView->addWidget(checkProjDockWidget);
		}
		QCheckBox* checkControlDockWidget = new QCheckBox("", this);
		m_abstractButtonsMap.insert(c_sWEControlDockShow, checkControlDockWidget);
		checkControlDockWidget->setCheckState(Qt::Checked);
		groupDockView->addWidget(checkControlDockWidget);

		//图库
		QCheckBox* resCheckBoxWidget = new QCheckBox("",this);
		m_abstractButtonsMap.insert(c_sWEFrameResWindow, resCheckBoxWidget);
		resCheckBoxWidget->setCheckState(Qt::Checked);
		groupDockView->addWidget(resCheckBoxWidget);

	}
}

void WebEditToolBarWidget::makeFileRibbon()
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

void WebEditToolBarWidget::makeProjectRibbon()
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
}

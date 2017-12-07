/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  ProjectManagerWidget.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               ��Ŀ����widget
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/5/23
** Descriptions:               END
** 
*********************************************************************************************************/
#include "ProjectManagerWidget.h"
#include <QFileDialog>
#include <QDebug>
#include <QComboBox>
#include <QMenu>
#include "MoudleName.h"
const QString DEFAULT_OPEN_IMAGE_SOFT = "C:/Windows/System32/mspaint.exe";
//codereview utf16-��Ϊutf8
#define FORCED_WCHAR(str) reinterpret_cast<const wchar_t *>(QString(str).utf16())
const int BUTTON_SIZE_WIDTH  = 28;
const int BUTTON_SIZE_HEIGHT = 28;
ProjectManagerWidget::ProjectManagerWidget(QString path, bool state, QWidget *parent)
	: QWidget(parent)
	, m_pTreeView(NULL)
	, m_pModel(NULL)
	, m_pProjectTopItem(NULL)
	, m_pHLayout(NULL)
	, m_pToolBarWidget(NULL)
	, m_pFileManager(NULL)
	, m_projectFilePath(path)
	, m_projectFolderPath("")
	, m_isCreateProject(state)
	, m_currentType(0)
	, m_copyInfo("")
{
	init();
	sendMessage(PICEDITFRAME, this, WEBMESSAGE_PROJECT_PATH, &m_projectFolderPath);
	sendMessage(PICFILEEDITFRAME, this, WEBMESSAGE_PROJECT_PATH, &m_projectFolderPath);
}

ProjectManagerWidget::~ProjectManagerWidget()
{
	sendMessage(PICEDITFRAME, this, WEBMESSAGE_PROJECT_PATH, &QString(""));
	sendMessage(PICFILEEDITFRAME, this, WEBMESSAGE_PROJECT_PATH, &QString(""));
	delete m_pProjectTopItem;
	m_pProjectTopItem = NULL;
}

/**        
 * @brief: ��ʼ��Widget        
 */
void ProjectManagerWidget::init()
{
	m_projectFolderPath = m_projectFilePath.left(m_projectFilePath.lastIndexOf("/"));
	m_pFileManager = new FileManager(m_projectFolderPath, this);
	makeTreeView();
	makeToolBar();
	readFileTypeIcon();
	QVBoxLayout *m_pVLayout = new QVBoxLayout(this);
	m_pVLayout->addWidget(m_pToolBarWidget);;
	m_pVLayout->addWidget(m_pTreeView);
	m_pVLayout->setSpacing(0);
	setLayout(m_pVLayout);

	if (m_isCreateProject)
	{
		//�½���Ŀ
		makeXMLFile();
		m_filePathList.clear();
		QString currentPath = qApp->applicationDirPath();

		m_pFileManager->copyDirectoryFiles(currentPath + "/data/template/project/data",
			m_projectFolderPath, true, m_filePathList);
		insertFileListToXML(m_filePathList, "folder", "");
	}
	else
	{
		readXML();
	}
	m_pTreeView->setContextMenuPolicy(Qt::CustomContextMenu);
	connect(m_pTreeView, &QTreeView::customContextMenuRequested, this, 
		&ProjectManagerWidget::slotCustomContextMenuRequested);
	m_pTreeView->setExpanded(m_pModel->indexFromItem(m_pProjectTopItem), true);

	m_pTreeView->sortByColumn(0, Qt::AscendingOrder);
	setTreeViewSort();
	m_pTreeView->setCurrentIndex(m_pProjectTopItem->index());
	retranslate();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void ProjectManagerWidget::changeEvent(QEvent *e)
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
 * @brief: ����
 */
void ProjectManagerWidget::retranslate()
{
	m_pNewFileBtn->setToolTip(qApp->translate(c_sProjectWidget, c_sNewFIle));
	m_pDeleteFileBtn->setToolTip(qApp->translate(c_sProjectWidget, c_sDeleteFile));
	m_pNewFolderBtn->setToolTip(qApp->translate(c_sProjectWidget, c_sNewFolder));
	m_pAddFileBtn->setToolTip(qApp->translate(c_sProjectWidget, c_sAddFile));
	m_pAddFolderBtn->setToolTip(qApp->translate(c_sProjectWidget, c_sAddFolder));
}

/**        
 * @brief: �������νṹ       
 */
void ProjectManagerWidget::makeTreeView()
{
	m_pTreeView = new QTreeView(this);
	m_pModel    = new QStandardItemModel(this);
	m_pDelegate = new TreeViewDelegate(this);
	connect(m_pDelegate, &QItemDelegate::closeEditor, 
		this, &ProjectManagerWidget::slotEditClose);
	m_pTreeView->setItemDelegate(m_pDelegate);

	//codereview ����
	connect(m_pModel, &QStandardItemModel::itemChanged, 
		this, &ProjectManagerWidget::slotItemChanged);
	
	m_pProjectTopItem = new BaseItem;
	int pos = m_projectFilePath.lastIndexOf("/") + 1;
	int pos2 = m_projectFilePath.lastIndexOf(".");
	m_pProjectTopItem->setText(m_projectFilePath.mid(pos, pos2 - pos));
	m_pProjectTopItem->setData(m_projectFolderPath, Qt::UserRole);
	m_pModel->appendRow(m_pProjectTopItem);
	m_pTreeView->setModel(m_pModel);
	m_pTreeView->setHeaderHidden(true);
	m_pTreeView->setIconSize(QSize(20, 20));
}

/**        
 * @brief: ������Ŀ�ļ�XML     
 */
void ProjectManagerWidget::readXML()
{
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCED_WCHAR(m_projectFilePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();
		while (xml.FindChildElem(FORCED_WCHAR("ClCompile")))
		{
			MCD_STR strID  = xml.GetChildAttrib(FORCED_WCHAR("Include"));
			MCD_STR folder = xml.GetChildAttrib(FORCED_WCHAR("folderPath"));
			//makeItem(strType);
			makeViewItem(QString::fromStdWString(folder), QString::fromStdWString(strID));
		}
	}
}

/**        
 * @brief:  ����·�����ɶ��Item      
 * @param[in]:  folder
 * @param[in]: path
 * @return: int
 */
int ProjectManagerWidget::makeViewItem(const QString &folder, const QString &path)
{
	QStringList list = path.split("/");
	QString   filePath = "";
	BaseItem *tempItem = NULL;
	//���û��ѡ�����򴴽������̽ڵ��£����򴴽��ڶ�Ӧ�ļ�������
	if (m_pTreeView->currentIndex().row() < 0)
	{
		tempItem = m_pProjectTopItem;
	}
	else
	{
		tempItem = static_cast<BaseItem*>(m_pModel->itemFromIndex(m_pTreeView->currentIndex()));
	}
	if (list.at(0) != "..")
	{
		QString fileName = list.at(list.count() - 1);
		makeOneItem(tempItem, fileName, path);
		return 0;
	}
	QString text = "";
	for (int i = 1; i < list.count(); ++i)
	{
		text = text + "/" + list.at(i);
		if (isExistTreeViewItem(tempItem, list.at(i)) != tempItem)
		{
			tempItem = static_cast<BaseItem*>(isExistTreeViewItem(tempItem, list.at(i)));
			continue;
		}
		else
		{
			if (folder.isEmpty())
			{
				filePath = m_projectFolderPath + text;
			}
			else
			{
				filePath = folder + text;
			}
			tempItem = makeOneItem(tempItem, list.at(i), filePath);
		}
	}
	return 0;
}

/**        
 * @brief:   ���һ��item��ָ���ĸ��ڵ���
 * @param[in]:  parent-���ڵ�
 * @param[in]:  fileName-ѡ����ļ�����
 * @param[in]:  itemData-UserRole����
 * @return: BaseItem
 */
BaseItem* ProjectManagerWidget::makeOneItem(QStandardItem *parent, const QString fileName,
	const QString itemData)
{
	BaseItem *item = new BaseItem;
	parent->appendRow(item);
	item->setText(fileName);
	item->setIcon(QIcon(getFileIcon(itemData)));
	item->setData(itemData, Qt::UserRole);
	//qDebug() << fileName<<","<<itemData;
	m_currentEditItem = item;
	return item;
}

/**        
 * @brief: �жϽڵ��Ӧ���ӽڵ��Ƿ���ڣ�
 * ���ڷ��ӽڵ㣬�����ڷ��ر��ڵ�
 * @param[in]: item-���ڵ�
 * @param[in]: text-�ӽڵ�����
 * @return: item
 */
QStandardItem* ProjectManagerWidget::isExistTreeViewItem(BaseItem *item, const QString &text)
{
	if (NULL == item)
	{
		return NULL;
	}
	for (int i = 0; i < item->rowCount(); ++i)
	{
		if (item->child(i)->text() == text)
		{
			return item->child(i);
		}
	}
	return  item;
}

/**        
 * @brief: ��ȡ�ļ�ͼ���ַ  
 * @param[in]:  
 * @return:
 */
QString ProjectManagerWidget::getFileIcon(const QString &fileName)
{
	//qDebug() << "getFileIcon:" << fileName;
	QFileInfo info(fileName);
	if (info.exists())
	{
		if (info.isDir())
		{
			return m_fileType.value("folder");
		}
		else if (info.isFile())
		{
			QString fileType = fileName.mid(fileName.lastIndexOf(".") + 1);
			if (m_fileType.contains(fileType))
			{
				return m_fileType.value(fileType);
			}
			else
			{
				return m_fileType.value("default");
			}
		}
	}
	else
	{
		QString fileType = fileName.mid(fileName.lastIndexOf("/") + 1);
		if (fileType.contains("."))
		{
			return m_fileType.value("none");
		}
		else
		{
			return m_fileType.value("unfolder");
		}
	}
	return "";
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void ProjectManagerWidget::makeToolBar()
{
	m_pHLayout = new QHBoxLayout(this);
	m_pToolBarWidget = new QWidget(this);
	m_pToolBarWidget->setMinimumWidth(50);
	m_pToolBarWidget->setMinimumHeight(10);

	m_pNewFileBtn = new QPushButton(this);
	m_pDeleteFileBtn = new QPushButton(this);
	m_pNewFolderBtn = new QPushButton(this);
	m_pAddFileBtn = new QPushButton(this);
	m_pAddFolderBtn = new QPushButton(this);

	QString type = "QPushButton{width:" + QString::number(BUTTON_SIZE_WIDTH) + "; height: " 
		+ QString::number(BUTTON_SIZE_HEIGHT) + ";border-image:url(:/WebConfigurationTool/res/";

	QString typeS = "QPushButton:hover:pressed{border-image:url(:/WebConfigurationTool/res/";

	m_pNewFileBtn->setStyleSheet(type + "newHtml.png);}" + typeS + "newHtmlS.png);}");
	m_pNewFolderBtn->setStyleSheet(type + "folder.png);}" + typeS + "folderS.png);}");
	m_pDeleteFileBtn->setStyleSheet(type + "deleteHtml.png);}" + typeS + "deleteHtmlS.png);}");
	m_pAddFileBtn->setStyleSheet(type + "addHtml.png);}" + typeS + "addHtmlS.png);}");
	m_pAddFolderBtn->setStyleSheet(type + "addFolder.png);}" + typeS + "addFolderS.png);}");

	connect(m_pNewFileBtn, &QPushButton::clicked, this, &ProjectManagerWidget::slotNewFileButton);
	connect(m_pDeleteFileBtn, &QPushButton::clicked, this, &ProjectManagerWidget::slotDeleteFileButton);
	connect(m_pNewFolderBtn, &QPushButton::clicked, this, &ProjectManagerWidget::slotNewFolderButton);
	connect(m_pAddFileBtn, &QPushButton::clicked, this, &ProjectManagerWidget::slotAddFileButton);
	connect(m_pAddFolderBtn, &QPushButton::clicked, this, &ProjectManagerWidget::slotAddFolderButton);

	m_pHLayout->addWidget(m_pNewFileBtn);
	m_pHLayout->addWidget(m_pNewFolderBtn);
	m_pHLayout->addWidget(m_pDeleteFileBtn);
	m_pHLayout->addWidget(m_pAddFileBtn);
	m_pHLayout->addWidget(m_pAddFolderBtn);

	QSpacerItem* horizontalSpacer = new QSpacerItem(0,
		this->height(),
		QSizePolicy::MinimumExpanding,
		QSizePolicy::Minimum);
	m_pToolBarWidget->setStyleSheet("border:1px solid gray");
	m_pHLayout->addItem(horizontalSpacer);
	m_pHLayout->setContentsMargins(1, 1, 1, 1);
	m_pHLayout->setSpacing(5);
	m_pToolBarWidget->setLayout(m_pHLayout);
}

/**        
 * @brief:�½���ҳ�ļ��ۺ���       
 */
void ProjectManagerWidget::slotNewFileButton()
{
	if (!m_pTreeView->currentIndex().isValid())
	{
		return;
	}
	makeNewFile(WEB_FORMAT);
	setTreeViewSort();
}

/**        
 * @brief: ɾ���ļ����ļ���     
 */
void ProjectManagerWidget::slotDeleteFileButton()
{
    if (m_pTreeView->currentIndex().row() < 0)
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
			qApp->translate(c_sProjectWidget, c_sNoSelect)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return;
	}
	QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
		qApp->translate(c_sProjectWidget, c_sIsDeleteFile)
		);
	box.setStandardButtons(QMessageBox::Ok|QMessageBox::Cancel);
	box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
	box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sBaseFrame, c_sCancel));
	box.exec();
	if (box.clickedButton() == box.button(QMessageBox::Cancel))
	{
		return;
	}
	QString path = m_pModel->data(m_pTreeView->currentIndex(), Qt::UserRole).value<QString>();
	emit sigDeleteFile(path);
}

/**        
 * @brief: �½�һ����Ŀ�ļ��ļ���   
 */
void ProjectManagerWidget::slotNewFolderButton()
{
	if (!m_pTreeView->currentIndex().isValid())
	{
		return;
	}
	makeNewFile(FOLDER);
	setTreeViewSort();
}

/**        
 * @brief: ����ⲿ�ļ���ָ������Ŀ�ļ���       
 */
void ProjectManagerWidget::slotAddFileButton()
{
	QStandardItem *parent = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
	if (nullptr == parent)
	{
		return;
	}
	QString path = parent->data(Qt::UserRole).value<QString>();
	bool state = isFolderNode(path);

	if (m_pTreeView->currentIndex().row() < 0 || !state)
	{
		if (!state)
		{
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
				qApp->translate(c_sProjectWidget, c_sWSelectFolder)
				);
			box.setStandardButtons(QMessageBox::Ok);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.exec();
		}
		else
		{
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
				qApp->translate(c_sProjectWidget, c_sWSelectAddSit)
				);
			box.setStandardButtons(QMessageBox::Ok);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.exec();
		}
		return;
	}
	QString FILE_FILTER = "Html files (*.html *.htm);;" + IMAGE_TYPE + ";;ALL(*.*)";
	QStringList newPath = QFileDialog::getOpenFileNames(this, tr(""),
		m_projectFolderPath, FILE_FILTER);

	if (newPath.isEmpty())
	{
		return;
	}
	addListToProject(parent, newPath);
	m_pFileManager->addSuportFolder(path);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void ProjectManagerWidget::addListToProject(QStandardItem *parent, QStringList list)
{
	QString path = parent->data(Qt::UserRole).value<QString>();
	for (int i = 0; i < list.count(); ++i)
	{
		if (!isExistTheSameNode(parent, list.at(i)))
		{
			QString fileName = list.at(i).mid(list.at(i).lastIndexOf("/") + 1);
			QString newFilePath = path + "/" + fileName;
			m_pFileManager->copyFileToPath(list.at(i), newFilePath, true);
			insertOneFileToXML(newFilePath);
			makeOneItem(parent, fileName, newFilePath);
			m_pTreeView->setExpanded(m_pTreeView->currentIndex(), true);
		}
		else
		{
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
				qApp->translate(c_sProjectWidget, c_sExitName)
				);
			box.setStandardButtons(QMessageBox::Ok);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.exec();
			return;
		}
	}
}

/**        
 * @brief:  ����ⲿ�ļ�
 * @param[in]: imagePath-�ļ�·��
 */
void ProjectManagerWidget::addFile(QString imagePath)
{
	QString str = imagePath.mid(m_projectFolderPath.length() + 1);
	QStringList list = str.split("/");
	QStandardItem *parent = m_pProjectTopItem;
	//��ȡ���ڵ����
	for (int i = 0; i < list.count() - 1; ++i)
	{
		for (int j = 0; j < parent->rowCount(); ++j)
		{
			if (list.at(i) == parent->child(j)->text())
			{
				parent = parent->child(j);
				break;
			}
		}
	}
	QString imageName = imagePath.mid(imagePath.lastIndexOf("/") + 1);
	if (!isExistTheSameNode(parent, imageName))
 	{
		insertOneFileToXML(imagePath);
		makeOneItem(parent, imageName, imagePath);
		m_pTreeView->setExpanded(m_pTreeView->currentIndex(), true);
	}
	else
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
			qApp->translate(c_sProjectWidget, c_sExitName)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
	}
}

/**        
 * @brief: �жϵ�ǰ�ڵ��Ƿ����ļ��нڵ�    
 * @param[in]:  item-��ǰѡ�е�Item
 * @return: true-or-false
 */
bool ProjectManagerWidget::isFolderNode(const QString &path)
{
	QFileInfo info(path);
	if (info.isDir())
	{
		return true;
	}
	return false;
}

/**        
 * @brief: ���QtreeViewѡ�к��Ҽ����ѡ��      
 * @param[in]:  Qpoint
 */
void ProjectManagerWidget::slotCustomContextMenuRequested(const QPoint & pos)
{
	// sender()��QObejct�ĺ�����������ȡ����ʱ�źŵķ���ָ��
	m_pTreeView = qobject_cast<QTreeView*>(sender());  

	if (!m_pTreeView)
	{
		return;
	}
	QStandardItem *item = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
// 	if (item == m_pProjectTopItem)
// 	{
// 		return;
// 	}
	QString path = item->data(Qt::UserRole).value<QString>();
	QModelIndex index = m_pTreeView->indexAt(pos);
	
	if (index.isValid())
	{
		QMenu menu;
		if (item != m_pProjectTopItem)
		{
			menu.addAction(qApp->translate(c_sProjectWidget, c_sRightDeleteHtml),
				this, SLOT(slotDeleteFileButton()));
			menu.addAction(qApp->translate(c_sProjectWidget, c_sRightRename),
				this, SLOT(slotRename()));
			menu.addAction(qApp->translate(c_sProjectWidget, c_sRightCopy),
				this, SLOT(slotCopy()));
		}
		if (isFolderNode(path))
		{
			//�ļ�����ʾ�˹���
			if (m_copyInfo.isEmpty())
			{
				menu.addAction(qApp->translate(c_sProjectWidget, c_sRightPaste), this, SLOT(slotPaste()))->setEnabled(false);
			}
			else
			{
				menu.addAction(qApp->translate(c_sProjectWidget, c_sRightPaste), this, SLOT(slotPaste()))->setEnabled(true);
			}
		}
		menu.exec(QCursor::pos());  
	}
}

/**        
 * @brief: �½���ʼ��״̬��WCP�ļ�      
 */
int ProjectManagerWidget::makeXMLFile()
{
	QString path = "";
	path = m_projectFilePath.left(m_projectFilePath.lastIndexOf("/"));
	QDir dir(path);
	if (dir.exists())
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sProjectWidget, c_sError),
			qApp->translate(c_sProjectWidget, c_sExitName)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return -1;
	}
	else
	{
		bool ok = dir.mkpath(path);//�����༶Ŀ¼
	}
	CMarkup xml;
	xml.SetDoc(FORCED_WCHAR("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n"));
	xml.AddElem(FORCED_WCHAR("ItemGrounp"));
	xml.Save(FORCED_WCHAR(m_projectFilePath));
	return 0;
}

/**        
 * @brief: ��������ļ���Ϣ��wcp   
 * @param[in]:  filePath-�ļ��б�
 * @param[in]:  type
 * @param[in]: folderPath
 * @return:
 */
int ProjectManagerWidget::insertFileListToXML(
	QStringList &filePath, 
	QString type, 
	QString folderPath)
{
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	qDebug() << "insert:" << filePath << "," << type << "," << folderPath;
	bLoadXml = xml.Load(FORCED_WCHAR(m_projectFilePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		for (int i = 0; i < filePath.count(); ++i)
		{
			xml.AddChildElem(FORCED_WCHAR("ClCompile"));
			xml.AddChildAttrib(FORCED_WCHAR("type"), FORCED_WCHAR(type));
			xml.AddChildAttrib(FORCED_WCHAR("folderPath"), FORCED_WCHAR(folderPath));
			xml.AddChildAttrib(FORCED_WCHAR("Include"), FORCED_WCHAR(filePath.at(i)));
			qDebug() <<"Item:"<<filePath.at(i);
			makeViewItem(folderPath, filePath.at(i));
		}
		xml.Save(FORCED_WCHAR(m_projectFilePath));
	}
	return 0;
}

/**        
 * @brief: ���һ���ļ�����ͼƬ������ҳ        
 * @param[in]:  filepath-�ļ�ԭʼ·��
 * @return: int
 */
int ProjectManagerWidget::insertOneFileToXML(const QString &filePath)
{
	QString info =".." + filePath.mid(m_projectFolderPath.length());
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCED_WCHAR(m_projectFilePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		xml.AddChildElem(FORCED_WCHAR("ClCompile"));
		xml.AddChildAttrib(FORCED_WCHAR("type"), FORCED_WCHAR("folder"));
		xml.AddChildAttrib(FORCED_WCHAR("folderPath"), FORCED_WCHAR(""));
		xml.AddChildAttrib(FORCED_WCHAR("Include"), FORCED_WCHAR(info));
	}
	xml.Save(FORCED_WCHAR(m_projectFilePath));
	return 0;
}

/**        
 * @brief: ɾ��xml��ָ��������   
 * @param[in]:  
 * @return:
 */
int ProjectManagerWidget::deleteOneFileFromXML(const QString &filePath)
{
	//���ݽڵ����Ʒ���xml�б����ļ���Ϣ
	QStandardItem *item = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
	//������ⲿ�ļ��У����ڹ���Ŀ¼�У��������ͬ��Ŀ¼��ͬ�����ļ���
	
	QString text = item->text();
	item = item->parent();
	while (item)
	{
		text = item->text() + "/" + text;
		item = item->parent();
	}
	//ȥ��������
	text = ".." + text.mid(text.indexOf("/"));

	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCED_WCHAR(m_projectFilePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCED_WCHAR("ClCompile")))
		{
			MCD_STR strID = xml.GetChildAttrib(FORCED_WCHAR("Include"));
			
			QString strType = QString::fromStdWString(strID);
			if (strType.contains(text))
			{
				xml.RemoveChildElem();
				qDebug() << "delete xml success!";
			}
		}
	}
	xml.Save(FORCED_WCHAR(m_projectFilePath));
	return 0;
}

/**        
 * @brief: ��ȡitem�䶯��Ϣ�ۺ��� 
 * @param[in]:  item-�ı��item
 */
void ProjectManagerWidget::slotItemChanged(QStandardItem *item)
{
	QString text = item->text();
//	qDebug() << "text:" << text;
}

/**        
 * @brief: ��ȡ��ͬ�ļ����͵�Icon��Ϣ   
 */
void ProjectManagerWidget::readFileTypeIcon()
{
	QDir dir;
	QString xmlPath = qApp->applicationDirPath();
	//xmlPath += "/data/Type.xml";
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;

	bLoadXml = xml.Load(FORCED_WCHAR(xmlPath + "/data/Type.xml"));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfos
		while (xml.FindChildElem(FORCED_WCHAR("Type")))
		{
			MCD_STR type = xml.GetChildAttrib(FORCED_WCHAR("Type"));
			MCD_STR icon = xml.GetChildAttrib(FORCED_WCHAR("Icon"));
			m_fileType.insert(QString::fromStdWString(type), xmlPath + QString::fromStdWString(icon));
		}
	}
}

/**        
 * @brief: �ж��Ƿ����ͬ���ڵ�        
 * @param[in]: filepath-�ļ�·��
 * @return:
 */
bool ProjectManagerWidget::isExistTheSameNode(QStandardItem *parentItem, const QString &filePath)
{
	if (parentItem == NULL) return false;
	for (int i = 0; i < parentItem->rowCount(); ++i)
	{
		QString text = parentItem->child(i)->data(Qt::UserRole).value<QString>();
		if (text.mid(text.lastIndexOf("/") + 1) == filePath.mid(filePath.lastIndexOf("/") + 1))
		{
			return true;
		}
	}
	return false;
}

/**        
 * @brief: ��ȡ�½��ļ���ʱ����    
 * @param[in]:  parent-������
 * @param[in]:  type-��ҳ&�ļ���
 * @return: QString-����
 */
QString ProjectManagerWidget::getNewFileName(QStandardItem *parent, int type)
{
   bool state = false;
   int count = 0;
   QString temp = "";
   QString name = "";

   if (WEB_FORMAT == type)
   {
	   temp = "NewFile";
   }
   else 
   {
	   temp = "NewFolder";
   }
  //ͬ��Ŀ¼���Ĭ������100���ļ����ļ���
   while (count < 100)
   {
	   if (count != 0)
	   {
		   if (WEB_FORMAT == type)
		   {
			   name = temp + "(" + QString::number(count) + ").html";
		   }
		   else
		   {
			   name = temp + "(" + QString::number(count) + ")";
		   }
	   }
	   else
	   {
		   if (WEB_FORMAT == type)
		   {
			   name = temp + ".html";
		   }
		   else
		   {
			   name = temp ;
		   }
	   }
	   for (int i = 0; i < parent->rowCount(); ++i)
	   {
		   if (parent->child(i, 0)->text() == name)
		   {
			   state = true;
			   break;
		   }
	   }
	   if (state)
	   {
		   state = false;
		   count++;
	   }
	   else
	   {
		   break;
	   }
   }
	return name;
}

/**        
 * @brief: �½��ļ����ļ��в����½���Ϣ��ӵ���Ŀ�ļ���     
 * @param[in]:  type-�½�����
 */
void ProjectManagerWidget::makeNewFile(int type)
{
	m_itemData = "";
	QString path = m_pModel->itemFromIndex(m_pTreeView->currentIndex())->data(Qt::UserRole).value<QString>();
	BaseItem *parent = NULL;

	if (isFolderNode(path))
	{
		parent = static_cast<BaseItem*>(m_pModel->itemFromIndex(m_pTreeView->currentIndex()));
	}
	else
	{
		parent = static_cast<BaseItem*>(m_pModel->itemFromIndex(m_pTreeView->currentIndex())->parent());
	}

	m_itemData = parent->data(Qt::UserRole).value<QString>() + "/";
	QString text = getNewFileName(parent, type);

	QString newFilePath = m_itemData + text;

	if (type == WEB_FORMAT)
	{
		m_pFileManager->createFile(newFilePath);
	}
	else
	{
		m_pFileManager->createFolder(newFilePath);
	}
	BaseItem *item = makeOneItem(parent, text, newFilePath);
	insertOneFileToXML(newFilePath);
	m_pTreeView->setCurrentIndex(m_pModel->indexFromItem(item));
}

/**        
 * @brief:  ������      
 * @param[in]:  oldName
 * @param[in]:  newName
 */
void ProjectManagerWidget::slotRename()
{
	m_currentEditItem = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
	m_currentEditItem->setEditable(true);
	m_pTreeView->edit(m_pTreeView->currentIndex());
}

/**        
 * @brief: �Ҽ�����
 */
void ProjectManagerWidget::slotCopy()
{
	m_copyInfo = m_pModel->itemFromIndex(m_pTreeView->currentIndex())->data(Qt::UserRole).value<QString>();
}

/**        
 * @brief: �Ҽ�ճ��
 */
void ProjectManagerWidget::slotPaste()
{
	QStandardItem *parent = m_pModel->itemFromIndex(m_pTreeView->currentIndex());

	QString path = parent->data(Qt::UserRole).value<QString>();
	//TODO�ж��Ƿ����ͬ���ڵ�
	if (isFolderNode(m_copyInfo))
	{
		//TODO �����ļ��������������
		copyOneFolder(m_copyInfo);
	}
	else
	{
		QStringList list;
		list.append(m_copyInfo);
		addListToProject(parent, list);
	}
	m_copyInfo = "";
}

/** 
 * @brief:   ��������ɺ�ۺ���
 * @param[in]: editor
 */
void ProjectManagerWidget::slotEditClose(
	QWidget *editor, 
	QAbstractItemDelegate::EndEditHint hint)
{
	QLineEdit* lineE = qobject_cast<QLineEdit*>(editor);

	if (lineE != NULL)
	{
		QString oldFilePath = m_currentEditItem->data(Qt::UserRole).value<QString>();
		QString newFilePath = oldFilePath.left(oldFilePath.lastIndexOf("/") + 1) + lineE->text();
		if (oldFilePath == newFilePath)
		{
			return;
		}

		QString pattern(PATTEN_TYPE);
		QRegExp rx(pattern);
		int match = lineE->text().indexOf(rx);
		if (match >= 0)
		{
			m_currentEditItem->setText(oldFilePath.mid(oldFilePath.lastIndexOf("/") + 1));
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sProjectWidget, c_sError),
				qApp->translate(c_sCreateProjectDlg, c_sProjectNameErroWarning) + "\n /:|*?\"<>"
				);
			box.setStandardButtons(QMessageBox::Ok);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.exec();
			return;
		}

		if ((oldFilePath.mid(oldFilePath.lastIndexOf(".") + 1) 
			!= newFilePath.mid(newFilePath.lastIndexOf(".") + 1)) 
			&& !isFolderNode(oldFilePath))
		{
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sProjectWidget, c_sError),
				qApp->translate(c_sProjectWidget, c_sEditFileFormat)
				);
			box.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sBaseFrame, c_sCancel));
			box.exec();

			if (box.clickedButton() == box.button(QMessageBox::Cancel))
			{
				m_currentEditItem->setText(oldFilePath.mid(oldFilePath.lastIndexOf("/") + 1));
				return;
			}
		}

		if (isExistTheSameNode(m_currentEditItem->parent(), newFilePath))
		{
			m_currentEditItem->setText(oldFilePath.mid(oldFilePath.lastIndexOf("/") + 1));
		
			QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
				qApp->translate(c_sProjectWidget, c_sExistSameName)
				);
			box.setStandardButtons(QMessageBox::Ok);
			box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
			box.exec();
			return;
		}

		updateXML(oldFilePath, newFilePath);

		m_pFileManager->rename(oldFilePath, newFilePath);
		m_currentEditItem->setData(newFilePath, Qt::UserRole);
		
		for (int row = 0; row < m_currentEditItem->rowCount(); ++row)
		{
			QString childeData = m_currentEditItem->child(row)->data(Qt::UserRole).value<QString>();
			childeData.replace(oldFilePath, newFilePath);
			m_currentEditItem->child(row)->setData(childeData, Qt::UserRole);
		}
		emit sigUpdateName(oldFilePath, newFilePath);
	}
	m_currentEditItem->setEditable(false);
}

/**        
 * @brief: ����xml���ļ�����   
 * @param[in]:  oldName
 * @param[in]:  newName
 */
void ProjectManagerWidget::updateXML(QString oldName, QString newName)
{
	QString text = ".." + oldName.mid(m_projectFolderPath.length());
	QString text1 = ".." + newName.mid(m_projectFolderPath.length());
	//codereview û���޸�return
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCED_WCHAR(m_projectFilePath));
	bool isFolder = isFolderNode(oldName);
	//TODO ����һ���ļ�
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCED_WCHAR("ClCompile")))
		{
			MCD_STR strID = xml.GetChildAttrib(FORCED_WCHAR("Include"));

			QString strType = QString::fromStdWString(strID);
			if (strType == text && !isFolder)
			{
				xml.SetChildAttrib(FORCED_WCHAR("Include"), FORCED_WCHAR(text1));
			}
			else if (strType.contains(text) && isFolder)
			{
				strType.replace(text, text1);
				xml.SetChildAttrib(FORCED_WCHAR("Include"), FORCED_WCHAR(strType));
			}
		}
	}
	xml.Save(FORCED_WCHAR(m_projectFilePath));
}

/**        
 * @brief: �ļ�������ʱ����Tabҳ����    
 * @param[in]:  oldName
 * @param[in]:  newName
 * @return: NULL
 */
void ProjectManagerWidget::updateTabName(QString oldName, QString newName)
{
	QString text = ".." + oldName.mid(m_projectFolderPath.length());
	QString text1 = ".." + newName.mid(m_projectFolderPath.length());
	bool isFolder = isFolderNode(oldName);
}

/**        
 * @brief:��Ŀ�б��и���һ���ļ��е������ڵ�
 */
void ProjectManagerWidget::copyOneFolder(const QString &srcPath)
{
	QStandardItem *parent = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
	QString path = parent->data(Qt::UserRole).value<QString>();
	
	if (isExistTheSameNode(parent, srcPath.mid(srcPath.lastIndexOf("/") + 1)))
	{
		return;
	}
	QString str = ".." + srcPath.mid(m_projectFolderPath.length());
	QStringList list;
	m_pFileManager->copyDirectoryFiles(srcPath,
		path + srcPath.mid(srcPath.lastIndexOf("/")), true, list);
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCED_WCHAR(m_projectFilePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCED_WCHAR("ClCompile")))
		{
			MCD_STR strID = xml.GetChildAttrib(FORCED_WCHAR("Include"));
			QString strType = QString::fromStdWString(strID);
			if (strType.contains(str))
			{
		//		QString path1 = m_projectFolderPath + strType.mid(2);
				QString path2 = path + strType.mid(str.lastIndexOf("/"));
				insertOneFileToXML(path2);
				QString path3 = ".." + path2.mid(m_projectFolderPath.length());
				m_pTreeView->setCurrentIndex(m_pModel->indexFromItem(m_pProjectTopItem));
				makeViewItem("", path3);
			}
		}
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void ProjectManagerWidget::deleteOneNode(QString path)
{
	deleteOneFileFromXML(path);
	int row = m_pTreeView->currentIndex().row();
	m_pModel->removeRow(row, m_pTreeView->currentIndex().parent());
	m_pFileManager->remove(path);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void ProjectManagerWidget::slotAddFolderButton()
{
	QString newPath = QFileDialog::getExistingDirectory(NULL, "",
		"C:/", QFileDialog::DontUseSheet);
	if (newPath.isEmpty())
	{
		return;
	}
	QStringList list;
	QStandardItem *parent = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
	QString path = parent->data(Qt::UserRole).value<QString>();
	QString toDir = path + newPath.mid(newPath.lastIndexOf("/"));
	m_pFileManager->copyDirectoryFiles(newPath,
		toDir, true, list);
	
	insertFileListToXML(list, "folder", "");
	setTreeViewSort();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void ProjectManagerWidget::setTreeViewSort()
{
	m_pTreeView->setSortingEnabled(false);
	m_pTreeView->setSortingEnabled(true);
}
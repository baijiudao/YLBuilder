/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  PictureStorageWidget.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               单个图库管理Widget
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/15
** Descriptions:               END
** 
*********************************************************************************************************/
#include "PictureStorageWidget.h"
#include <QApplication>
#include <QMenu>
#include <QFileDialog>
#include <QMessageBox>
PictureStorageWidget::PictureStorageWidget(QWidget *parent)
	: QWidget(parent)
	, m_pTreeView(NULL)
	, m_pModel(NULL)
	, m_pDelegate(NULL)
	, m_pOperator(NULL)
	, m_pTopItem(NULL)
	, m_pListView(NULL)
	, m_pIcgModel(NULL)
	, m_pToolGrounp(NULL)
	, m_pToolWidget(NULL)
	, m_pNewImageBtn(NULL)
	, m_pAddImageBtn(NULL)
	, m_pdeleteImageBtn(NULL)
	, m_pCurrentItem(NULL)
	, m_copyFile("")
	, m_filePath("")


{
	m_filePathList.clear();
	init();
}

PictureStorageWidget::~PictureStorageWidget()
{
	delete m_pTopItem;
	m_pTopItem = NULL;
}

/**        
 * @brief: 初始化
 */
void PictureStorageWidget::init()
{
	//codereview0720 图片显示固定大小
	m_pTopItem = new QStandardItem(QIcon(""), "");
//	m_pOperator = new ContentOperator(this);
	m_pOperator = new IcgOperator("");
	m_pDelegate = new TreeViewDelegate(this);
	m_pModel = new QStandardItemModel(this);
	m_pTreeView = new QTreeView(this);

	m_pTreeView->setHeaderHidden(true);
	m_pTreeView->setModel(m_pModel);
	m_pTreeView->setItemDelegate(m_pDelegate);
	m_pTreeView->setEditTriggers(QAbstractItemView::NoEditTriggers);
	connect(m_pDelegate, &QItemDelegate::closeEditor,
		this, &PictureStorageWidget::slotEditClose);
	m_pTreeView->setItemDelegate(m_pDelegate);
	connect(m_pTreeView, &QTreeView::clicked, this, &PictureStorageWidget::slotClicked);
	m_pTreeView->setContextMenuPolicy(Qt::CustomContextMenu);
	connect(m_pTreeView, &QTreeView::customContextMenuRequested, this,
		&PictureStorageWidget::slotCustomContextMenuRequested);

	makeToolBarWidget();
	makeListView();
	QVBoxLayout *layOut = new QVBoxLayout(this);
	layOut->addWidget(m_pToolWidget);
	layOut->addWidget(m_pTreeView);
	layOut->addWidget(m_pListView);
	layOut->setSpacing(0);
	layOut->setContentsMargins(1, 1, 1, 1);
	setLayout(layOut);

	connect(m_pTreeView, &QTreeView::doubleClicked, this, &PictureStorageWidget::slotGetImagePath);
	
}

/**        
 * @brief:        
 * @param[in]:  
 */
void PictureStorageWidget::setFilePath(const QString filePath, int type)
{
	FileManager file("");
	QDir dir;
	QString currentPath = qApp->applicationDirPath();
	file.removeFolder(currentPath + "/temp/");
	
	dir.mkdir(currentPath + "/temp/");
	m_pModel->clear();
	m_filePathList.clear();
	m_filePath = filePath;

	m_pOperator->setFilePath(filePath);
	//不存在则新建文件
	if (type == ICG_NEW)
	{
		if (QFile::exists(filePath))
		{
			QFile::remove(filePath);
		}
		m_pOperator->makeIcg(filePath);
	}
	m_pOperator->readSVG(m_filePathList);
	makeWidget();
}

/**        
 * @brief: 生成按钮 
 */
void PictureStorageWidget::makeToolBarWidget()
{
	m_pToolWidget = new QWidget(this);
    m_pToolWidget->setFixedHeight(30);
	QHBoxLayout *hLayout = new QHBoxLayout(this);

	m_pNewImageBtn = new QPushButton(this);
	m_pAddImageBtn = new QPushButton(this);
	m_pdeleteImageBtn = new QPushButton(this);

	hLayout->addWidget(m_pNewImageBtn);
	hLayout->addWidget(m_pAddImageBtn);
	hLayout->addWidget(m_pdeleteImageBtn);

	QString type = "QPushButton{width:" + QString::number(28) + "; height: "
		+ QString::number(28) + ";border-image:url(:/WebConfigurationTool/res/";

	QString typeS = "QPushButton:hover:!pressed{border-image:url(:/WebConfigurationTool/res/";

	m_pNewImageBtn->setStyleSheet(type + "newImage.png);}" + typeS + "newImageS.png);}");
	m_pAddImageBtn->setStyleSheet(type + "addImage.png);}" + typeS + "addImageS.png);}");
	m_pdeleteImageBtn->setStyleSheet(type + "deleteImage.png);}" + typeS + "deleteImageS.png);}");


	QSpacerItem* horizontalSpacer = new QSpacerItem(0,
		m_pToolWidget->height(),
		QSizePolicy::MinimumExpanding,
		QSizePolicy::Minimum);

	m_pToolWidget->setStyleSheet("border:1px solid gray");
	hLayout->addItem(horizontalSpacer);
	hLayout->setContentsMargins(1, 1, 1, 1);
	hLayout->setSpacing(5);

	m_pToolWidget->setLayout(hLayout);
	m_pToolGrounp = new QButtonGroup(this);

	m_pToolGrounp->addButton(m_pNewImageBtn, TOOL_NEW);
	m_pToolGrounp->addButton(m_pAddImageBtn, TOOL_ADD);
	m_pToolGrounp->addButton(m_pdeleteImageBtn, TOOL_DELETE);

	connect(m_pToolGrounp, static_cast<void(QButtonGroup::*)(int)>(&QButtonGroup::buttonClicked),
		this, &PictureStorageWidget::slotButtonGrounp);
}

/**        
 * @brief: 生成Tree
 */
void PictureStorageWidget::makeWidget()
{
    m_pTopItem = new QStandardItem;
	m_pTopItem->setText(getName(m_filePath));
	m_pModel->appendRow(m_pTopItem);
	makeItem(m_filePathList);
	m_pTreeView->expandAll();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PictureStorageWidget::makeItem(QStringList list)
{
	for (int i = 0; i < list.count(); ++i)
	{
		QStandardItem *item = new QStandardItem(getName(list.at(i)));
		item->setData(list.at(i), Qt::UserRole);
		m_pTopItem->appendRow(item);
		m_pTreeView->setCurrentIndex(item->index());
	}
}

/**        
 * @brief: 根据路径获取文件名称
 * @param[in]:  path
 */
QString PictureStorageWidget::getName(QString path)
{
	QString str = path.mid(path.lastIndexOf("/") + 1);
	return str;
}

void PictureStorageWidget::makeListView()
{
	m_pListView = new QListView(this);
	m_pListView->setMovement(QListView::Static);
	m_pListView->setIconSize(QSize(220, 220));
	m_pListView->setViewMode(QListView::ListMode);
	m_pListView->setResizeMode(QListView::Adjust);
	m_pListView->setDragEnabled(true);
	m_pListView->setFlow(QListView::TopToBottom);
}
/**        
 * @brief: 清理widget
 */
void PictureStorageWidget::clearWdiget()
{
	m_pModel->clear();
}
/**
* @brief:
* @param[in]:
* @return:
*/
void PictureStorageWidget::slotButtonGrounp(int id)
{
	if (m_filePath.isEmpty()) return;
	switch (id)
	{
	case TOOL_NEW:
		makeNewSvg();
		break;
	case TOOL_ADD:
		slotAddImage();
		break;
	case TOOL_DELETE:
		slotDeleteImage();
		break;
	default:
		break;
	}
}

void PictureStorageWidget::changeEvent(QEvent *evt)
{
	switch (evt->type())
	{
	case QEvent::LanguageChange:
		retranslate();
		break;
	default:
		break;
	}
	QWidget::changeEvent(evt);
}

void PictureStorageWidget::retranslate()
{
	m_pNewImageBtn->setToolTip(qApp->translate(c_sPictureStorageWidget, c_sNewImage));
	m_pAddImageBtn->setToolTip(qApp->translate(c_sPictureStorageWidget, c_sAddImage));
	m_pdeleteImageBtn->setToolTip(qApp->translate(c_sPictureStorageWidget, c_sDeleteImage));
}
/**
* @brief: 获取新建文件临时名称
* @return: QString-名称
*/
QString PictureStorageWidget::getFileName()
{
	bool state = false;
	int count = 0;
	QString temp = "";
	QString name = "";
	if (m_copyFile.isEmpty())
	{
		temp = "NewFile";
	}
	else
	{
		int pos1 = m_copyFile.lastIndexOf("/") + 1;
		int pos2 = m_copyFile.lastIndexOf(".");
		temp = m_copyFile.mid(pos1, pos2 - pos1);
	}
	
	//同级目录最多默认生成100个文件或文件夹
	while (count < 1000)
	{
		if (count != 0)
		{
		
			name = temp + "(" + QString::number(count) + ").svg";
		}
		else
		{
			name = temp + ".svg";
		}
		for (int i = 0; i < m_pTopItem->rowCount(); ++i)
		{
			if (m_pTopItem->child(i, 0)->text() == name)
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
 * @brief:  Tree单击响应槽函数
 * @param[in]:  index-索引
 */
void PictureStorageWidget::slotClicked(const QModelIndex &index)
{
	QString path = m_pModel->data(index, Qt::UserRole).value<QString>();
	QStringList list;
	list.append(path);
	if (m_pIcgModel != NULL)
	{
		delete m_pIcgModel;
		m_pIcgModel = NULL;
	}
	m_pIcgModel = new IcgModel(this);
	m_pIcgModel->loadData(list);
	m_pListView->setModel(m_pIcgModel);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PictureStorageWidget::slotCustomContextMenuRequested(const QPoint & pos)
{
	m_pTreeView = qobject_cast<QTreeView*>(sender());

	if (!m_pTreeView)
	{
		return;
	}

	QModelIndex index = m_pTreeView->indexAt(pos);

	if (index.isValid())
	{
		QMenu menu;
		menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sOPenImage), this, SLOT(slotOpenImage()));
		//menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sCutImage), this, SLOT(slotCutImage()));
	
		menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sCopyImage), this, SLOT(slotCopyImage()));
		if (m_copyFile.isEmpty())
		{
			menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sPasteImage), this, SLOT(slotPasteImage()))->setEnabled(false);
		}
		else
		{
			menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sPasteImage), this, SLOT(slotPasteImage()))->setEnabled(true);
		}
		menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sDeleteImage), this, SLOT(slotDeleteImage()));
		menu.addAction(qApp->translate(c_sPictureStorageWidget, c_sRenameImage), this, SLOT(slotRenameImage()));
		menu.exec(QCursor::pos());
	}
}

void PictureStorageWidget::makeNewSvg()
{
	QDir dir;
	QString currentPath = qApp->applicationDirPath(); //dir.currentPath();
	QString name = currentPath + "/temp/" + getFileName();
	QStringList list;
	list.append(name);
	makeItem(list);
	m_pTreeView->edit(m_pTreeView->currentIndex());
	m_pCurrentItem = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
}

/**        
 * @brief: 打开图片     
 */
void PictureStorageWidget::slotOpenImage()
{
	emit m_pTreeView->doubleClicked(m_pTreeView->currentIndex());
}

/**        
 * @brief: 剪切图片
 */
void PictureStorageWidget::slotCutImage()
{

}

/**        
 * @brief: 复制图片    
 */
void PictureStorageWidget::slotCopyImage()
{
	m_copyFile = m_pModel->data(m_pTreeView->currentIndex(), Qt::UserRole).value<QString>();
}

/**        
 * @brief: 粘贴图片
 */
void PictureStorageWidget::slotPasteImage()
{
	QString name = m_copyFile.mid(0, m_copyFile.lastIndexOf("/") + 1) + getFileName();
	QFile::copy(m_copyFile, name);
	m_pOperator->addSVG(name);
	setFilePath(m_filePath);
	m_copyFile = "";
}

/**        
 * @brief: 添加图片
 */
void PictureStorageWidget::slotAddImage()
{
	QStringList newPath = QFileDialog::getOpenFileNames(this, tr(""),
		"C:/", "Images(*.svg)");

	if (newPath.isEmpty())
	{
		return;
	}

	foreach(const QString &str, newPath)
	{
		m_pOperator->addSVG(str);
	}
	setFilePath(m_filePath);
}

/**        
 * @brief: 删除图片
 */
void PictureStorageWidget::slotDeleteImage()
{
	if (m_pModel->itemFromIndex(m_pTreeView->currentIndex()) == m_pTopItem)
	{
		return;
	}
	QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
		qApp->translate(c_sPictureStorageWidget, "")
		);
	box.setStandardButtons(QMessageBox::Ok|QMessageBox::Cancel);
	box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
	box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sBaseFrame, c_sCancel));
	box.exec();
	if (box.clickedButton() == box.button(QMessageBox::Cancel))
	{
		return;
	}
	QString path = m_pTreeView->currentIndex().data(Qt::UserRole).value<QString>();
	m_pOperator->removeSVG(path);
	m_pModel->removeRow(m_pTreeView->currentIndex().row(), m_pModel->indexFromItem(m_pTopItem));
	emit sigRightClick(TOOL_DELETE, path, "");
	//TODO 删除临时文件

}

/**        
 * @brief: 重命名图片
 */
void PictureStorageWidget::slotRenameImage()
{
	m_pCurrentItem = m_pModel->itemFromIndex(m_pTreeView->currentIndex());
	m_pTreeView->edit(m_pTreeView->currentIndex());
}

/**        
 * @brief: 导入图片
 */
void PictureStorageWidget::slotImportImage()
{

}

/**
* @brief:   重命名完成后槽函数
* @param[in]: editor
*/
void PictureStorageWidget::slotEditClose(
	QWidget *editor,
	QAbstractItemDelegate::EndEditHint hint)
{
	//codereview0720 同名判定
	QLineEdit* lineE = qobject_cast<QLineEdit*>(editor);
	QString newFilePath = lineE->text();
	QString name = m_pCurrentItem->data(Qt::UserRole).value<QString>();
	QString data = "";
	if (lineE != NULL)
	{
		//c重命名
		if (QFile::exists(name))
		{
			QString temp = name.mid(name.lastIndexOf("/") + 1);
			if (temp == newFilePath)
			{
				return;
			}
			if (isExistSameNode(newFilePath))
			{
				m_pCurrentItem->setText(name.mid(name.lastIndexOf("/") + 1));

				QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
					qApp->translate(c_sProjectWidget, c_sExistSameName)
					);
				box.setStandardButtons(QMessageBox::Ok);
				box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
				box.exec();
				return;
			}
			data = name.mid(0, name.lastIndexOf("/") + 1) + newFilePath;
			m_pCurrentItem->setData(data, Qt::UserRole);
			QFile::rename(name, data);
			emit sigRightClick(TOOL_RENAME, data, name);
		}
		else
		{
		    data = name.mid(0, name.lastIndexOf("/") + 1) + newFilePath;
			m_pCurrentItem->setData(data, Qt::UserRole);

// 			QFile file(data);
// 			if (file.exists())
// 			{
// 				return;
// 			}
// 			file.open(QIODevice::WriteOnly);
// 			file.close();
			emit sigMkSVGFile(data);
			m_pOperator->addSVG(data);
		}
	}
}

/**        
 * @brief: 插入图片到另外一个图库（ICG）文件     
 * @param[in]:  icgPath-图库路径
 * @param[in]:  imagePath-图片路径
 */
// void PictureStorageWidget::insertImageToIcg(const QString icgPath, const QString imagePath)
// {
// 	ContentOperator content;
// 	content.setFilePath(icgPath);
// 	m_pOperator->readFile();
// 	content.addSVG(imagePath);
// }

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PictureStorageWidget::slotGetImagePath(const QModelIndex &index)
{
	QString path = m_pModel->data(index, Qt::UserRole).value<QString>();
	if (!path.isEmpty())
	{
		emit sigRightClick(TOOL_OPEN, path, "");
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PictureStorageWidget::saveSVG(QString svgFile)
{
	m_pOperator->editSvg(svgFile);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PictureStorageWidget::saveAsIcg(QString icgFile)
{
	//TODO
	QFile::copy(m_filePath, icgFile);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void PictureStorageWidget::closeWidget()
{
	m_pModel->clear();
	if (m_pIcgModel != NULL)
	{
		delete m_pIcgModel;
		m_pIcgModel = NULL;
	}
	m_filePath = "";
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool PictureStorageWidget::isExistIcgFile()
{
	if (!m_filePath.isEmpty())
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
bool PictureStorageWidget::isExistSameNode(QString text)
{
	for (int i = 0; i < m_pTopItem->rowCount(); ++i)
	{
		if (m_pTopItem->child(i) != m_pCurrentItem)
		{
			if (m_pTopItem->child(i)->text() == text)
			{
				return true;
			}
		}
	}
	return false;
}
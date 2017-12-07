/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  ProjectManagerWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:                项目管理widget
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/13
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include "Include.h"
#include <QApplication>
#include <QWidget>
#include <QTreeView>
#include <QTreeWidget>
#include <QDirModel>
#include <QHBoxLayout>
#include <QPushButton>
#include <QMessageBox>
#include <QProcess>
#include <QFileInfo>
#include "Markup.h"
#include "FileManager.h"
#include "QTreeView.h"
#include "QStandardItemModel.h"
#include "BaseItem.h"
#include "TreeViewDelegate.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"

enum PROJECT_FILE_FORMAT
{
	NONE = 0,
	FOLDER,
	DEFAULT_IAMGE_FORMAT,
	SVG_IMAGE,
	WEB_FORMAT,
	OTHER_FORMAT
};

enum EDIT_TYPE
{
	EDIT_NONE = 0,
	EDIT_NEW,
	EDIT_RENAME
};

class ProjectManagerWidget : public QWidget, public MessageTransmiter
{
	Q_OBJECT

public:
	ProjectManagerWidget(QString path, bool state, QWidget *parent = 0);
	~ProjectManagerWidget();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	inline QTreeView* getTreeView()
	{
		return m_pTreeView;
	}

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	inline QStandardItemModel* getModel()
	{
		return m_pModel;
	}

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void addFile(QString imagePath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void deleteOneNode(QString path);

	static QStringList m_imageTypeList;
private:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void init();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void changeEvent(QEvent *e);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void retranslate();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeTreeView();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeToolBar();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	int makeViewItem(const QString &folder, const QString &path);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	BaseItem* makeOneItem(
		QStandardItem *parent, const QString fileName, 
		const QString itemData);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QStandardItem* isExistTreeViewItem(BaseItem *item, const QString &text);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QString getFileIcon(const QString &fileName);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	int makeXMLFile();
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void readXML();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	int insertFileListToXML(QStringList &filePath, QString type, QString folderPath);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	int insertOneFileToXML(const QString &filePath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	int deleteOneFileFromXML(const QString &filePath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void updateXML(QString oldName, QString newName);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	bool isFolderNode(const QString &path);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void readFileTypeIcon();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	bool isExistTheSameNode(QStandardItem *parentItem, const QString &filePath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QString getNewFileName(QStandardItem *parent, int type);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeNewFile(int type);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void updateTabName(QString oldName, QString newName);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void addListToProject(QStandardItem *parent, QStringList list);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void copyOneFolder(const QString &srcPath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void setTreeViewSort();
signals:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void sigUpdateName(QString oldName, QString newName);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void sigDeleteFile(QString path);

private slots:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotNewFileButton();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotDeleteFileButton();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotNewFolderButton();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotAddFileButton();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotAddFolderButton();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotItemChanged(QStandardItem *item);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotCustomContextMenuRequested(const QPoint & pos);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotRename();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotCopy();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotPaste();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotEditClose(QWidget *editor, QAbstractItemDelegate::EndEditHint);

private:
	QPushButton                            *m_pNewFileBtn;
	QPushButton                            *m_pDeleteFileBtn;
	QPushButton                            *m_pNewFolderBtn;
	QPushButton                            *m_pAddFileBtn;
	QPushButton                            *m_pAddFolderBtn;
	QTreeView                              *m_pTreeView;
	QStandardItemModel                     *m_pModel;
	TreeViewDelegate                       *m_pDelegate;
	BaseItem                               *m_pProjectTopItem;
	QHBoxLayout                            *m_pHLayout;
	QWidget                                *m_pToolBarWidget;
	QString                                m_projectFilePath;
	QString                                m_projectFolderPath;
	QStringList                            m_filePathList;

	bool                                   m_isCreateProject;
	FileManager                            *m_pFileManager;
	
	static const char                      *m_fileIcon[];
	QStringList                            *m_tempFile;       //存放临时文件
	QHash<QString, QString>                m_fileType;     
	QString                                m_itemData;
	int                                    m_currentType;
	QStandardItem                          *m_currentEditItem;
	QString                                m_copyInfo;
};

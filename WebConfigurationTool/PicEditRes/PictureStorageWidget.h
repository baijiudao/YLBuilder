/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  PictureStorageWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:
** Modified by:
** Descriptions:               单个图库管理Widget头文件
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/15
** Descriptions:               END
**
*********************************************************************************************************/
#pragma once
#include "Include.h"
#include <QWidget>
#include <QTreeView>
#include <QStandardItemModel>
#include <QStandardItem>
#include <QVBoxLayout>
#include <QLabel>
#include "ContentOperator.h"
#include <QButtonGroup>
#include <QPushButton>
#include <QEvent>
#include <QListView>
#include "IcgModel.h"
#include "IcgOperator.h"
#include "WebEditFrame/TreeViewDelegate.h"
#include "./WebEditFrame/FileManager.h"
static const char *c_sPictureStorageWidget = "PictureStorageWidget";

static const char *c_sOPenImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Open");
static const char *c_sCutImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Cut");
static const char *c_sCopyImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Copy");
static const char *c_sPasteImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Paste");
static const char *c_sDeleteImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Delete");

static const char *c_sRenameImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Rename");
static const char *c_sImportImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "Import");

static const char *c_sNewImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "NewImage");
static const char *c_sAddImage = QT_TRANSLATE_NOOP("PictureStorageWidget", "AddImage");

enum TOOL_BUTTON
{
	TOOL_NONE = 0,
	TOOL_NEW,
	TOOL_OPEN,       //打开
	TOOL_ADD,
	TOOL_DELETE,     //删除
	TOOL_RENAME,     //重命名
	TOO_IMPORT
};
enum ICG_TYPE
{
	ICG_NONE = 0,
	ICG_NEW,
	ICG_OPEN
};

class PictureStorageWidget : public QWidget
{
	Q_OBJECT

public:
	PictureStorageWidget(QWidget *parent = 0);
	~PictureStorageWidget();

	/**        
	 * @brief: 获取QtreeView对象
	 * @return: QTreeView
	 */
	inline QTreeView* getTreeView()
	{
		return m_pTreeView;
	}

	void setFilePath(const QString filePath, int type = ICG_OPEN);

	void changeEvent(QEvent *evt) Q_DECL_OVERRIDE;

	void saveSVG(QString svgFile);

	void saveAsIcg(QString icgFile);

	void closeWidget();

	bool isExistIcgFile();
//	void insertImageToIcg(const QString icgPath, const QString imagePath);
signals:
	void	sigRightClick(int type, QString param1, QString param2);
	void    sigMkSVGFile(QString path);
private:
	void init();

	void makeToolBarWidget();

	void makeWidget();

	void makeListView();

	void makeItem(QStringList list);

	QString getName(QString path);

	void clearWdiget();

	void retranslate();

	QString getFileName();

	void makeNewSvg();

	bool isExistSameNode(QString text);

private slots:
    void slotOpenImage();

	void slotCutImage();

	void slotCopyImage();

	void slotPasteImage();

	void slotAddImage();

	void slotDeleteImage();

	void slotRenameImage();

	void slotImportImage();

	void slotClicked(const QModelIndex &index);

	void slotButtonGrounp(int id);

	void slotCustomContextMenuRequested(const QPoint & pos);

	void slotEditClose(QWidget *editor, QAbstractItemDelegate::EndEditHint);

	void slotGetImagePath(const QModelIndex &index);
private:
	QTreeView           *m_pTreeView;
	QStandardItemModel  *m_pModel;
	TreeViewDelegate    *m_pDelegate;
	//ContentOperator     *m_pOperator;
	IcgOperator         *m_pOperator;
	QStringList         m_filePathList;
	QStandardItem       *m_pTopItem;
	QString             m_filePath;

	QListView           *m_pListView;
	IcgModel            *m_pIcgModel;
	QButtonGroup        *m_pToolGrounp;
	QWidget             *m_pToolWidget;

	QPushButton         *m_pNewImageBtn;
	QPushButton         *m_pAddImageBtn;
	QPushButton         *m_pdeleteImageBtn;
	QStandardItem       *m_pCurrentItem;
	QString             m_copyFile;
};

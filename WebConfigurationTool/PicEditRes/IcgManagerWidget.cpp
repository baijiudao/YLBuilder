/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  IcgManagerWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:
** Modified by:
** Descriptions:               图元模块左侧图库管理Widget
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/7
** Descriptions:               END
**
*********************************************************************************************************/
#include "IcgManagerWidget.h"

IcgManagerWidget::IcgManagerWidget(const QString filePath, QWidget *parent)
	: QWidget(parent)
	, m_sysIcgPath(filePath)
	, m_pDirModel(NULL)
	, m_pIcgTreeView(NULL)
	, m_pListView(NULL)
	, m_pVLayout(NULL)
	, m_pListModel(NULL)
{
	init();
}

IcgManagerWidget::~IcgManagerWidget()
{
}

/**        
 * @brief: 初始化       
 */
void IcgManagerWidget::init()
{
	m_pOperator = new IcgOperator("", this);
	m_pVLayout = new QVBoxLayout(this);
	m_pVLayout->addWidget(makeTreeView());
	m_pVLayout->addWidget(makeListView());
	m_pVLayout->setSpacing(5);
	m_pVLayout->setContentsMargins(1, 1, 1, 1);
	setLayout(m_pVLayout);
}
/**        
 * @brief:  生成TreeView      
 * @return: QWidget*
 */
QWidget* IcgManagerWidget::makeTreeView()
{
	m_pDirModel = new QDirModel(this);
	
	m_pIcgTreeView = new QTreeView(this);
	m_pIcgTreeView->setModel(m_pDirModel);
	m_pIcgTreeView->setRootIndex(m_pDirModel->index(m_sysIcgPath));
	m_pIcgTreeView->setMaximumHeight(400);
	m_pIcgTreeView->setHeaderHidden(true);

	m_pIcgTreeView->setColumnHidden(1, true);
	m_pIcgTreeView->setColumnHidden(2, true);
	m_pIcgTreeView->setColumnHidden(3, true);
	m_pIcgTreeView->setColumnHidden(4, true);

	connect(m_pIcgTreeView, &QTreeView::clicked, this, &IcgManagerWidget::slotClick);
	return m_pIcgTreeView;
}

/**        
 * @brief: 生成图库图元预览list
 * @return: QWidget*
 */
QWidget* IcgManagerWidget::makeListView()
{
	m_pListView = new QListView(this);
	m_pListView->setMovement(QListView::Static);
	m_pListView->setViewMode(QListView::IconMode);
	m_pListView->setResizeMode(QListView::Adjust);
	m_pListView->setDragEnabled(true);
    m_pListView->setStyleSheet("QListView::item{min-height:100; max-height:100;min-width:100; max-width:100;}");
    //m_pListView->setGridSize(QSize(100, 100));
    m_pListView->setIconSize(QSize(95, 95));
	return m_pListView;
}

/**        
 * @brief: TreeView中Item点击响应槽函数   
 * @param[in]:  index-选中的索引
 */
void IcgManagerWidget::slotClick(const QModelIndex &index)
{
	//m_pListModel->clear();
	QString path = m_pDirModel->filePath(index);
	m_pOperator->setFilePath(path);
	QStringList list;
	m_pOperator->readSVG(list);
	if (m_pListModel != NULL)
	{
		delete m_pListModel;
		m_pListModel = NULL;
	}
	m_pListModel = new IcgModel(this);
	m_pListModel->loadData(list);
	m_pListView->setModel(m_pListModel);
}

/**
* @brief:
* @param[in]:
* @return:
*/
bool IcgManagerWidget::saveSvgToIcg(QString svgPath, QString icgPath)
{
	if (!QFile::exists(svgPath) && !QFile::exists(icgPath))
	{
		return false;
	}
	IcgOperator oper("");
	oper.setFilePath(icgPath);
	oper.addSVG(svgPath);
	return true;
}
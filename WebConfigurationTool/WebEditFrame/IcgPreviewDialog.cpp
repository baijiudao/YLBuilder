#include "IcgPreviewDialog.h"
#include <QApplication>
#include <QMessageBox>

IcgPreviewDialog::IcgPreviewDialog(const QString path, QWidget *parent)
	: QDialog(parent)
	, m_sysIcgPath(path)
	, m_pListModel(NULL)
{
	SetMoudleName(ICGPREVIEWDIALOG);
	installListener(this);
	QString path1 = qApp->applicationDirPath();
	path1 = path1 + "/data/icg";
	m_sysIcgPath = path1;
	init();
}

IcgPreviewDialog::~IcgPreviewDialog()
{
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgPreviewDialog::init()
{
	m_pOperator = new IcgOperator("", this);
	m_pVLayout = new QVBoxLayout(this);
	makeTreeView();
	makeListView();
	makeBtnView();
	QHBoxLayout *hLayout = new QHBoxLayout(this);
	hLayout->addWidget(m_pIcgTreeView);
	hLayout->addWidget(m_pListView);
	m_pVLayout->addLayout(hLayout);
	m_pVLayout->addLayout(m_pBtnHLayout);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgPreviewDialog::makeTreeView()
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
	connect(m_pIcgTreeView, &QTreeView::clicked, this, &IcgPreviewDialog::slotClick);

}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgPreviewDialog::makeListView()
{
	m_pListView = new QListView(this);
	m_pListView->setMovement(QListView::Static);
	m_pListView->setViewMode(QListView::IconMode);
	m_pListView->setResizeMode(QListView::Adjust);
	m_pListView->setDragEnabled(true);
	m_pListView->setStyleSheet("QListView::item{min-height:100; max-height:100;min-width:100; max-width:100;}");
	//m_pListView->setGridSize(QSize(100, 100));
	m_pListView->setIconSize(QSize(95, 95));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgPreviewDialog::makeBtnView()
{
	m_pBtnHLayout = new QHBoxLayout(this);
	m_pHorizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);
	m_pOKBtn = new QPushButton(this);
	m_pCancelBtn = new QPushButton(this);
	m_pBtnHLayout->addItem(m_pHorizontalSpacer);
	m_pBtnHLayout->addWidget(m_pOKBtn);
	m_pBtnHLayout->addWidget(m_pCancelBtn);

	connect(m_pOKBtn, &QPushButton::clicked, this, &IcgPreviewDialog::slotOKBtn);
}

/**
* @brief: TreeView中Item点击响应槽函数
* @param[in]:  index-选中的索引
*/
void IcgPreviewDialog::slotClick(const QModelIndex &index)
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
void IcgPreviewDialog::slotOKBtn()
{
	if (!m_pListView->currentIndex().isValid())
	{
		return;
	}
	QString newPath = "";
	newPath = m_pListView->currentIndex().data(Qt::UserRole).toString();
	QString path = m_HtmlFilePath;

	QString name = path.mid(0, path.lastIndexOf("/") + 1) +
		m_imagePath + newPath.mid(newPath.lastIndexOf("/"));
	if (!QFile::exists(name))
	{
		QFile::copy(newPath, name);
	}
	QString relativePath = m_imagePath + newPath.mid(newPath.lastIndexOf("/"));
	this->sendMessage(WEBENGINEEDITVIEW, this, WEBMESSAGE_SENDSVGPATH, &relativePath);
	emit accept();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgPreviewDialog::showEvent(QShowEvent *event)
{
	QDialog::showEvent(event);
	retranslate();
}  

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgPreviewDialog::retranslate()
{
	m_pOKBtn->setText(qApp->translate(c_sCreateProjectDlg, c_sOKBtn));
	m_pCancelBtn->setText(qApp->translate(c_sCreateProjectDlg, c_sCancelBtn));
	this->setWindowTitle(qApp->translate(c_sPicStorEditFrame, c_sPicStorRes));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QString IcgPreviewDialog::getPath()
{
	QString path = "";
    path = m_pListView->currentIndex().data(Qt::UserRole).toString();

	return path;
}
/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  QControlTableWidget.cpp
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
#include "QControlTableWidget.h"
#include <QDebug>
#include <QApplication>
#define CONTROLTYPE Qt::UserRole + 0x001
#define DRAGPICPATH Qt::UserRole + 0x002

QControlTableWidget::QControlTableWidget(QWidget *parent)
    : QTableWidget(parent)
	, m_cellPressed(false)
	, m_pclickItem(NULL)
{
    SetMoudleName(CONTROLSDOCKWIDGET);
    installListener(this);
    initTable();
    addControlItem();
    connect(this, &QTableWidget::cellPressed, this, &QControlTableWidget::onClickControlItem);
}

QControlTableWidget::~QControlTableWidget()
{

}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::initTable()
{
    setEditTriggers(QAbstractItemView::NoEditTriggers);
    setSelectionMode(QAbstractItemView::SingleSelection);
    verticalHeader()->setVisible(false);//隐藏列表头
    horizontalHeader()->setVisible(false); //隐藏行表头
    setShowGrid(false);

    //setRowCount(1);
    setColumnCount(1);

    verticalHeader()->setDefaultSectionSize(30);
    setIconSize(QSize(75, 30));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::addControlItem()
{
    CMarkup webControlItems;
    QDir dir;
    
    QString strFilePath("");
	strFilePath = qApp->applicationDirPath();
   // strFilePath += "/data/Controls.xml";
	webControlItems.Load(reinterpret_cast<const wchar_t *>((strFilePath + "/data/Controls.xml").utf16()));

    QString strNodeName("");
    strNodeName = "Controls";
    if (webControlItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
    {
        webControlItems.IntoElem();
    }
    else
    {
        return;
    }

    strNodeName = "Control";
    while (webControlItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
    {
        QString strAttribName("");
		strAttribName = "Type";
		MCD_STR controlType = webControlItems.GetAttrib(reinterpret_cast<const wchar_t *>(strAttribName.utf16()));
		QString strType = QString::fromStdWString(controlType);

        strAttribName = "Icon";
        MCD_STR controlIcon = webControlItems.GetAttrib(reinterpret_cast<const wchar_t *>(strAttribName.utf16()));
		QString strIconPath = strFilePath + QString::fromStdWString(controlIcon);

        strAttribName = "DragPic";
        MCD_STR dragPic = webControlItems.GetAttrib(reinterpret_cast<const wchar_t *>(strAttribName.utf16()));
        QString strdragPic = QString::fromStdWString(dragPic);

        MCD_STR controlName = webControlItems.GetData();
        QString strControlName = QString::fromStdWString(controlName);
        
        insertRow(0);
        QTableWidgetItem *pnewItem = new QTableWidgetItem(QIcon(strIconPath), strControlName);
		pnewItem->setData(CONTROLTYPE, strType);
		pnewItem->setData(DRAGPICPATH, strdragPic);
		qDebug() << "Type:" << strType << ",strdragPic:" << strdragPic;
        setItem(0, 0, pnewItem);
    }
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::resizeEvent(QResizeEvent *event)
{
	QTableWidget::resizeEvent(event);
    setColumnWidth(0, this->width());
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::mouseMoveEvent(QMouseEvent *event)
{
    //QString tmp = m_pclickItem->text();
    dragAndAddElement();
    //m_pclickItem = NULL;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::onClickControlItem(int row, int column)
{
    m_pclickItem = this->item(row, column);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::dragAndAddElement()
{
    QMimeData *mimeData = new QMimeData;
    QByteArray exData;
    QString strMimeData = "addWebControl/";
	strMimeData += m_pclickItem->data(CONTROLTYPE).toString();
    mimeData->setData(strMimeData, exData);
    QDrag *drag = new QDrag(this);
    drag->setMimeData(mimeData);
	qDebug() << m_pclickItem->data(DRAGPICPATH).toString();
	drag->setPixmap(QPixmap(m_pclickItem->data(DRAGPICPATH).toString()));
	sendMessage(WEBENGINEEDITVIEW, this, ENABLEDRAG);
    drag->exec(Qt::CopyAction);
    m_pclickItem = NULL;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QControlTableWidget::onMessage(void* pSender, int iMessageType, void* pData)
{

}

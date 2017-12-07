/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  IcgPreviewDialog.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/9/28
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include "Include.h"
#include <QDialog>
#include <QTreeView>
#include <QDirModel>
#include <QListView>
#include <QVBoxLayout>
#include <QStandardItemModel>
#include <QHBoxLayout>
#include <QPushButton>
#include <QSpacerItem>
#include "PicEditRes/IcgModel.h"
#include "PicEditRes/IcgOperator.h"
#include "MoudleName.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
class IcgPreviewDialog : public QDialog, public MessageTransmiter
{
	Q_OBJECT

public:
	IcgPreviewDialog(const QString path, QWidget *parent =0);
	~IcgPreviewDialog();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	inline void setHtmlPath(QString path, QString imagepath)
	{
		m_HtmlFilePath = path;
		m_imagePath = imagepath;
	}
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QString getPath();
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
	void makeTreeView();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeListView();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeBtnView();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void retranslate();

protected:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void showEvent(QShowEvent *event) override;
private slots:
	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	void slotClick(const QModelIndex &index);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotOKBtn();
private:
	QString             m_sysIcgPath;
	QDirModel           *m_pDirModel;
	QTreeView           *m_pIcgTreeView;
	QListView           *m_pListView;

	QVBoxLayout         *m_pVLayout;
	IcgOperator         *m_pOperator;
	IcgModel            *m_pListModel;
	QPushButton         *m_pOKBtn;
	QPushButton         *m_pCancelBtn;
	QSpacerItem         *m_pHorizontalSpacer;
	QHBoxLayout         *m_pBtnHLayout;
	QString             m_HtmlFilePath;
	QString             m_imagePath;
};

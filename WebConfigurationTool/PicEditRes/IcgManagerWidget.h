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
#pragma once

#include <QWidget>
#include <QTreeView>
#include <QDirModel>
#include <QListView>
#include <QVBoxLayout>
#include <QStandardItemModel>
#include "IcgModel.h"
#include "IcgOperator.h"
class IcgManagerWidget : public QWidget
{
	Q_OBJECT

public:
	IcgManagerWidget(const QString filePath, QWidget *parent = 0);
	~IcgManagerWidget();
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
	QWidget* makeTreeView();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QWidget* makeListView();
private slots:
   /**        
    * @brief:        
    * @param[in]:  
    * @return:
    */
void slotClick(const QModelIndex &index);

public Q_SLOTS :
/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool saveSvgToIcg(QString svgPath, QString icgPath);
private:
	QString             m_sysIcgPath;
	QDirModel           *m_pDirModel;
	QTreeView           *m_pIcgTreeView;
	QListView           *m_pListView;

	QVBoxLayout         *m_pVLayout;
	IcgOperator         *m_pOperator;
	IcgModel            *m_pListModel;
};

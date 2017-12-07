
/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  QControlTableWidget.h
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
#ifndef QCONTROLTABLEWIDGET_H
#define QCONTROLTABLEWIDGET_H

#include <QtWidgets/QHeaderView>
#include "MoudleName.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include <QTableWidget>
#include <QMimeData>
#include <QDrag>
#include "Markup.h"
#include <QDir>

class QControlTableWidget : public QTableWidget, public MessageTransmiter
{
    Q_OBJECT

public:
    QControlTableWidget(QWidget *parent = NULL);
    ~QControlTableWidget();
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void onMessage(void* pSender, int iMessageType, void* pData = NULL);
protected:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
    void resizeEvent(QResizeEvent *event);
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void mouseMoveEvent(QMouseEvent *event);
	//void mousePressEvent();
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void initTable();
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void addControlItem();

private:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void dragAndAddElement();
public slots:
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
    void onClickControlItem(int row, int column);
protected:
    bool                m_cellPressed;
    QTableWidgetItem   *m_pclickItem;
};

#endif // QCONTROLTABLEWIDGET_H

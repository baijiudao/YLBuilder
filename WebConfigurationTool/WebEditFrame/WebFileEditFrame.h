/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  WebFileEditFrame.h
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
#ifndef WEBFILEEDITFRAME_H
#define WEBFILEEDITFRAME_H

#include "BaseFrame.h"
#include <QRadioButton>
#include <QButtonGroup>
#include <QMap>
#include <QtitanRibbon.h>
#include "QWebEditDockWidget.h"
#include "WebEditToolBarWidget.h"
#include "BaseTabWidget.h"
#include "MoudleName.h"
#include "FileManager.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include "..\Common\include\WorkspaceWidget.h"
#include "BaseTabWidget.h"

class WebFileEditFrame : public BaseFrame
{
    Q_OBJECT

public:
    WebFileEditFrame(QWidget *parent = NULL);
    virtual ~WebFileEditFrame();
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
    void         retranslate() override;
private:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void        init();
private slots :
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
	void       onMenuChange();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void       onNewFile();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void       onOpenFile();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void       onCloseFile();
	
protected:
	RibbonPage *m_pWebFileRibbonPage;      
};
#endif
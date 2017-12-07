/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  WebEditFrame.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/8/1
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include "BaseFrame.h"
#include <QtitanRibbon.h>
#include <QHBoxLayout>
#include "MoudleName.h"
#include "QWebEditWidget.h"
#include "QSrcEditWidget.h"
#include "QWebViewWidget.h"
#include "Markup.h"
#include "ProjectManagerWidget.h"
#include "CreateProjectDialog.h"
#include "WebEditToolBarWidget.h"
#include "BaseTabWidget.h"
#include "BaseDockWidget.h"
//////////////////
class WebEditFrame : public BaseFrame
{
    Q_OBJECT

public:
    WebEditFrame(QWidget *parent = NULL);
    virtual ~WebEditFrame();
	//bool isChangeOfContent() override;
protected:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void onMessage(void* pSender, int iMessageType, void* pData = NULL) Q_DECL_OVERRIDE;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void retranslate() Q_DECL_OVERRIDE;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void resizeEvent(QResizeEvent *event) Q_DECL_OVERRIDE;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void hideEvent(QHideEvent *event) Q_DECL_OVERRIDE;
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void showEvent(QShowEvent *event) Q_DECL_OVERRIDE;
public slots:
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
    void onMenuChange();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void showProjDockWidget(int state);

	//void showControlDockWidget(int state);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void onNewProject();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void onOpenProject();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void onCloseProject();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotDoubleClickTreeView(const QModelIndex &index);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotShowFilePath(const QModelIndex &index);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void onCheckProjDock(bool show);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotDeleteFile(QString path);
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
	void makeProjectDockWidget();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeConnect();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	int  fileFormat(QString filepath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void openOtherFile(const QString filePath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotMakeNewProject();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeProject(QString newPath, bool state);

private:
	BaseDockWidget        *m_pWEProjDockWidget;
	ProjectManagerWidget  *m_pProjectMangerWidget;
	CreateProjectDialog   *m_pCreateProjectDlg;
	QString               m_strCurrentPath;
	QString               m_strFileDialogPath;
};


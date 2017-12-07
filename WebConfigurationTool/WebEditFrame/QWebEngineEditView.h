/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  QWebEngineEditView.h
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
#ifndef QWEBENGINEEDIT_H
#define QWEBENGINEEDIT_H

#include <QVector>
#include <QtWebEngineWidgets>
#include "MoudleName.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include "qSetWebTitleDlg.h"
#include "qSetCanvasSizeDlg.h"
#include "QWebChannelApi.h"
#include "Markup.h"

#define REFRESHTABPAGES 0
#define SAVEWEBFILE 1

class QWebEngineEditView : public QWebEngineView, public MessageTransmiter
{
    Q_OBJECT

public:
    QWebEngineEditView(QWidget *parent = NULL);
    virtual ~QWebEngineEditView();
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void removeEditJs(QString filePath);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void setEnableModel(bool state);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void setCloseHtml();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void quitAndSave(QString filePath, int state);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void loadUrl(QString filePath);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void runJavaScript(const QString cmd);

	/**
	 * @brief:
	 * @param[in]:
	 * @return:
	 */
	void setHtmlSize();
protected:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
    virtual void showEvent(QShowEvent *event);
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void dragEnterEvent(QDragEnterEvent *event);
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void dragMoveEvent(QDragMoveEvent *event);
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void dropEvent(QDropEvent *event);
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual void contextMenuEvent(QContextMenuEvent *event);
    
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	virtual bool eventFilter(QObject *watched, QEvent *event);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void setWebTitle(QString);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void setWebSize(QString);
signals:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void saveWeb();

private slots :
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
    void loadUrlFinished();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void getImageFile(QString file);
	
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
	void getJsonPath();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void getVideoSavePath();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void getPath(QString type);
private:
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
	virtual void onMessage(void* pSender, int iMessageType, void* pData = NULL);
public:
	QWebChannelApi       *m_pWebChannelApi;
	QString               m_strCurrentFilePath;
	bool                  m_saveState;
};

#endif // QWEBENGINEEDIT_H

/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseFrame.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               ��Ŀ���ļ�ģ���ܻ���ͷ�ļ�
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/21
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include "Include.h"
#include <QObject>
#include <QtitanRibbon.h>
#include "BaseTabWidget.h"
#include "WebEditToolBarWidget.h"
#include "FileManager.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include "..\Common\include\WorkspaceWidget.h"
#include "BaseDockWidget.h"
#include "QControlTableWidget.h"
#include "PicEditRes/IcgManagerWidget.h"
class BaseFrame : public WorkspaceWidget, public MessageTransmiter
{
	Q_OBJECT

public:
	BaseFrame(QWidget *parent = 0);
	~BaseFrame();
	virtual  bool isChangeOfContent();

protected:
	/**
     * @brief: ����Ribbon
	 * @param[in]: typeһ�ִ�����Ŀģ�飬����һ�ִ����ļ�ģ��
	 */
	void makeRibbon(int type);

	/**
	 * @brief: ���ɴ��Tab���
	*/
	void makeMainTabWidget();

	void changeEvent(QEvent *evt) Q_DECL_OVERRIDE;

	/**
	 * @brief: ����ҳ�ļ�
	 * @param[in]:filePath-��ҳ·��
	 */
	void openHtml(QString filePath);

	/**
	 * @brief: �����༭��DockWidget
	 */
	void makeWebEditDockWidget();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeIcgDockWidget();

	/**
	 * @brief: �ж������ļ������Ƿ������ͬ
	 * @param[in]: tempFile-�ļ�1
	 * @param[in]: file-�ļ�2
	 * @return: �����ļ���ͬ����true, ��ͬ����false
	 */
	bool isSameFile(const QString tempFile, const QString file);
protected slots:
	/**
	* @brief:  ��ǰҳ�ı�ʱ��Ӧ�ۺ���
	* @param[in]:  index-����
	*/
    virtual  void slotCurrentPageChanged(int index);
	
	/**
	 * @brief: �༭��Դ���Ԥ���л�
	 * @param[in]:index-����
	 */
	virtual  void slotPageChange(int index);

	/**
	 * @brief: �رձ�ǩҳ
	 * @param[in]: index-����
	 */
	virtual  void slotCloseTab(int index);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void      showControlDockWidget(int state);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void     showIcgDockWidget(int state);
	/**
	 * @brief: ���������Ӧ�ۺ���
	 */
	virtual  void onSave();

	/**
	 * @brief: �Ƿ���ʾ��Ŀ���߿ؼ��б�ҳ�����ù��ܵ�����
	 * @param[in]: show-true��ѡ,false����ѡ
	 */
	void onCheckControlDock(bool show);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void onCheckIcgDock(bool show);
protected:

	virtual  void retranslate() {}

	virtual  void onMenuChange() {};
protected:
	QWidget              *m_pParent;
	BaseTabWidget        *m_pMainTabWidget;
	BaseDockWidget       *m_pWebEditDockWidget;
	BaseDockWidget       *m_pWebIcgDockWidget;
	RibbonPage           *m_pWEFileRibbonPage;
	WebEditToolBarWidget *m_pToolBarWidget;
	FileManager          *m_pFileManager;
	RibbonMainWindow     *m_pMainWindow;
	QControlTableWidget  *m_pControlTable;
	IcgManagerWidget    *m_pIcgManagerWidget;
	QString              m_projectPath;
};

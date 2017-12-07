/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseFrame.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               项目和文件模块框架基类头文件
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
     * @brief: 生成Ribbon
	 * @param[in]: type一种代表项目模块，另外一种代表文件模块
	 */
	void makeRibbon(int type);

	/**
	 * @brief: 生成大的Tab框架
	*/
	void makeMainTabWidget();

	void changeEvent(QEvent *evt) Q_DECL_OVERRIDE;

	/**
	 * @brief: 打开网页文件
	 * @param[in]:filePath-网页路径
	 */
	void openHtml(QString filePath);

	/**
	 * @brief: 创建编辑框DockWidget
	 */
	void makeWebEditDockWidget();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void makeIcgDockWidget();

	/**
	 * @brief: 判断两个文件内容是否完成相同
	 * @param[in]: tempFile-文件1
	 * @param[in]: file-文件2
	 * @return: 两个文件不同返回true, 相同返回false
	 */
	bool isSameFile(const QString tempFile, const QString file);
protected slots:
	/**
	* @brief:  当前页改变时响应槽函数
	* @param[in]:  index-索引
	*/
    virtual  void slotCurrentPageChanged(int index);
	
	/**
	 * @brief: 编辑，源码和预览切换
	 * @param[in]:index-索引
	 */
	virtual  void slotPageChange(int index);

	/**
	 * @brief: 关闭标签页
	 * @param[in]: index-索引
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
	 * @brief: 点击保存响应槽函数
	 */
	virtual  void onSave();

	/**
	 * @brief: 是否显示项目或者控件列表页与设置功能的联动
	 * @param[in]: show-true勾选,false不勾选
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

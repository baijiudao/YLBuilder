/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseTabWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               标签页基类，主要完成Tab相关功能整合
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/7/17
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include "Include.h"
#include <QWidget>
#include <QTabWidget>
#include "QWebEditWidget.h"
#include "QSrcEditWidget.h"
#include "QWebViewWidget.h"

class BaseTabWidget : public QTabWidget, public MessageTransmiter
{
	Q_OBJECT

public:
	BaseTabWidget(QString filePath, QWidget *parent = 0);
	~BaseTabWidget();

	inline QString getFilePath()
	{
		return m_strTmpCurrentFilePath;
	}
	
	inline void setProjectPath(QString path)
	{
		m_projectPath = path;
	}

	virtual void onMessage(void* pSender, int iMessageType, void* pData = NULL);

	/**
	 * @brief: 保存网页文件
	 * @param[in]:state-true则保存文件，false则只刷新临时文件
	 */
	void save(bool state);

	/**
	 * @brief: 更新编辑，源码和预览页面对应的文件路径
	 * @param[in]:  path-文件路径
	 */
	void setFilePath(const QString path);

	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	bool isEditWidget();
private:
	/**
	 * @brief: 根据传参初始化
	 */
	void init();

	void changeEvent(QEvent *e) override;

	void retranslate();

private slots:
	/**
	 * @brief: 标签页切换槽函数
	 * @param[in]: index-索引
	 */
	void tablePageHasChanged(int index);

	/**
	 * @brief: 刷新页面
	 * @param[in]:  index-索引
	 */
	void refreshPage(int index);

	/**
	 * @brief: 设置项目选中项右键
	 * @param[in]: point
	 */
	void slotCustomContextMenuRequested(const QPoint & pos);
	
	/**
	 * @brief: 右键关闭网页
	 */
	void slotCloseWeb();
	
	/**
	 * @brief:  保存网页
	 */
	void slotSaveWeb();

	/**
	 * @brief: 网页文件另存为
	 */
	void slotSaveAsWeb();

	/**
	 * @brief: 更新web文件内容
	 */
	void updateWebFile();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotSaveAsFile();
signals:
	void sigSaveAsFile();
public slots:
	/**
	 * @brief: 响应文件重命名槽函数
	 * @param[in]:  oldName-旧名称
	 * @param[in]:  newName-新名称
	 */
	void slotUpdateName(QString oldName, QString newName);

public:
	QMap<BaseTabWidget*, QString> m_tempFile;       
	QString          m_sourceDir;
	QString          m_desDir;
private:
	QWebEditWidget   *m_pWebEditWidget;
	QSrcEditWidget   *m_pWebSrcWidget;
	QWebViewWidget   *m_pWebViewWidget;
	QString          m_strTmpCurrentFilePath;
	bool             m_isUpdateFile;
	QString          m_projectPath;
};

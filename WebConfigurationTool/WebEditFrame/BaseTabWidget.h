/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  BaseTabWidget.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               ��ǩҳ���࣬��Ҫ���Tab��ع�������
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
	 * @brief: ������ҳ�ļ�
	 * @param[in]:state-true�򱣴��ļ���false��ֻˢ����ʱ�ļ�
	 */
	void save(bool state);

	/**
	 * @brief: ���±༭��Դ���Ԥ��ҳ���Ӧ���ļ�·��
	 * @param[in]:  path-�ļ�·��
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
	 * @brief: ���ݴ��γ�ʼ��
	 */
	void init();

	void changeEvent(QEvent *e) override;

	void retranslate();

private slots:
	/**
	 * @brief: ��ǩҳ�л��ۺ���
	 * @param[in]: index-����
	 */
	void tablePageHasChanged(int index);

	/**
	 * @brief: ˢ��ҳ��
	 * @param[in]:  index-����
	 */
	void refreshPage(int index);

	/**
	 * @brief: ������Ŀѡ�����Ҽ�
	 * @param[in]: point
	 */
	void slotCustomContextMenuRequested(const QPoint & pos);
	
	/**
	 * @brief: �Ҽ��ر���ҳ
	 */
	void slotCloseWeb();
	
	/**
	 * @brief:  ������ҳ
	 */
	void slotSaveWeb();

	/**
	 * @brief: ��ҳ�ļ����Ϊ
	 */
	void slotSaveAsWeb();

	/**
	 * @brief: ����web�ļ�����
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
	 * @brief: ��Ӧ�ļ��������ۺ���
	 * @param[in]:  oldName-������
	 * @param[in]:  newName-������
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

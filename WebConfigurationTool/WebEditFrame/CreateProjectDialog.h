/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  CreateProjectDialog.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/4/10
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include "Include.h"
#include <QDialog>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QPushButton>
#include <QLineEdit>
#include <QLabel>

class CreateProjectDialog : public QDialog
{
	Q_OBJECT

public:
	CreateProjectDialog(QWidget *parent = Q_NULLPTR);
	~CreateProjectDialog();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	inline QPushButton* getOKBtn()
	{
		return m_pOKBtn;
	}

	/**
	 * @brief:
	 * @param[in]: Path工程路径
	 * @param[in]: Name工程名称
	 */
	void getPathAndName(QString &path, QString &name);

	/**
	 * @brief: 处理创建项目文件确认按钮逻辑
	 */
	bool getPathAndNameState();

protected:
	void changeEvent(QEvent *evt);

	void retranslate();

	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	void showEvent(QShowEvent *e) Q_DECL_OVERRIDE;
private:	
	/**
	 * @brief:初始化界面
	 */
	void init();
private slots:
	/**
     * @brief:取消/关闭
	 */
	void on_pushButtonCancel_clicked();

	/**
	 * @brief: 打开路径选择窗口
	 */
	void on_choosePathPushButton_clicked();

private:
	QString      m_choosePath;
	QLabel       *m_pProjectNameLabel;
	QLabel       *m_pPathLabel;
	QLineEdit    *m_pProjectNameLineEdit;
	QLineEdit    *m_pPathLineEdit;
	QPushButton  *m_pChoosePathBtn;
	QPushButton  *m_pOKBtn;
	QPushButton  *m_pCancelBtn;
};

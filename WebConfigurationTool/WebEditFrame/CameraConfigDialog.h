/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  CameraConfigDialog.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/9/25
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include "Include.h"
#include <QDialog>
#include <QTableView>
#include "CameraConfigModel.h"
#include <QHBoxLayout>
#include <QVBoxLayout>
#include <QPushButton>
#include <QSpacerItem>
#include <QLabel>
#include <QLineEdit>
#include <QGridLayout>
#include "Json.h"
class SetUpDialog :public QDialog
{
	Q_OBJECT

public:
	SetUpDialog(QWidget *parent = 0);
	~SetUpDialog();
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	inline QPushButton* getBtn()
	{
		return m_pOkBtn;
	}

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
	bool getInfo(CAMERA_CONFIG_DATA_S &data);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void setData(const CAMERA_CONFIG_DATA_S &data);
private:

	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	void retranslate();
protected:
	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	void changeEvent(QEvent *evt) override;

	void closeEvent(QCloseEvent *evt) override;

	bool event(QEvent *e) override;

	bool eventFilter(QObject *, QEvent *) override;
private slots:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotCancel();
private:
	QGridLayout  *m_pMainGridLayout;
	QHBoxLayout  *m_pBtnHorizontalLayout;
	QLineEdit    *m_pExPortLineEdit;
	QLabel       *m_pImageHeightLabel;
	QLabel       *m_pExPortLabel;
	QLabel       *m_pImPortLabel;
	QLineEdit    *m_pImageHeightLineEdit;
	QLabel       *m_pRTSPLabel;
	QLineEdit    *m_pImageWidthLineEdit;
	QLineEdit    *m_pRtspLineEdit;
	QLineEdit    *m_pInPortLineEdit;
	QLabel       *m_pImageWidth;
	QPushButton  *m_pCancelBtn;
	QPushButton  *m_pOkBtn;
};

class CameraConfigDialog : public QDialog
{
	Q_OBJECT

public:
	CameraConfigDialog(QWidget *parent =0);
	~CameraConfigDialog();
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
	QByteArray getJsonFile();

	/**
	* @brief:
	* @param[in]:
	* @return:
	*/
	void setJsonFile(const QByteArray &array);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	bool isExistPort(const int imPort, const int exPort);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void retranslate();
protected:
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void changeEvent(QEvent *evt) override;
private slots:
    /**        
     * @brief:        
     * @param[in]:  
     * @return:
     */
    void slotAddBtn();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotDeleteBtn();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotEditBtn();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void slotAddOneCameraInfo();

private:
	QTableView        *m_pTableView;
	CameraConfigModel *m_pModel;
	QPushButton       *m_pAddOneInfoBtn;
	QPushButton       *m_pDeleteOneInfoBtn;
	QPushButton       *m_pEditOneInfoBtn;
	QHBoxLayout       *m_pBtnLayout;
	QVBoxLayout       *m_pMainLayout;
	QSpacerItem       *m_pSpacer;
	SetUpDialog       *m_pSetUpDlg;
	int              m_currentRow;
	Json             *m_pJson;

    QString   m_CameraJsonPath;
};

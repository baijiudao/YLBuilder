/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  CameraConfigDialog.cpp
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
#include "CameraConfigDialog.h"
#include <QApplication>
#include <QHeaderView>
#include <QFile>
#include <QMessageBox>
const int CANERA_DIALOG_WIDTH = 600;
const int CAMERA_DIALOG_HEIGHT = 400;
const int MIN_PARAM = 1;
const int MAX_PARAM = 65536;//4294967295;
SetUpDialog::SetUpDialog(QWidget *parent)
	: QDialog(parent)
{
	init();
	Qt::WindowFlags flags = Qt::Dialog;
	flags |= Qt::WindowCloseButtonHint;
	setWindowFlags(flags);
}

SetUpDialog::~SetUpDialog()
{
}

/**
* @brief:
* @param[in]:
* @return:
*/
void SetUpDialog::slotCancel()
{
	hide();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool SetUpDialog::getInfo(CAMERA_CONFIG_DATA_S &data)
{
	data.url = m_pRtspLineEdit->text();
	data.outputPort = m_pExPortLineEdit->text().toInt();
	data.inputPort = m_pInPortLineEdit->text().toInt();
	data.videoWidth = m_pImageWidthLineEdit->text().toInt();
	data.videoHeight = m_pImageHeightLineEdit->text().toInt();

	if (data.url.isEmpty())
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
			qApp->translate(c_sCameraDialog, c_sRTSPWarning)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return false;
	}
	if ((data.outputPort <= 0 || data.inputPort <= 0) || (data.videoWidth <= 0 || data.videoHeight <= 0))
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
			qApp->translate(c_sCameraDialog, c_sParamWarning)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return false;
	}
	if (data.outputPort == data.inputPort)
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sParamWarning),
			qApp->translate(c_sCameraDialog, c_sPortWarning)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return false;
	}
	data.id = data.inputPort;
	return true;
}

void SetUpDialog::init()
{
	this->resize(520, 380);
	m_pMainGridLayout = new QGridLayout(this);
	m_pMainGridLayout->setSpacing(3);

	//m_pMainGridLayout->setContentsMargins(5, 5, 5, 5);
	m_pExPortLineEdit = new QLineEdit(this);
	m_pMainGridLayout->addWidget(m_pExPortLineEdit, 1, 1, 1, 1);

	m_pImageHeightLabel = new QLabel(this);
	m_pMainGridLayout->addWidget(m_pImageHeightLabel, 4, 0, 1, 1);

	m_pExPortLabel = new QLabel(this);
	m_pMainGridLayout->addWidget(m_pExPortLabel, 1, 0, 1, 1);

	m_pImPortLabel = new QLabel(this);
	m_pMainGridLayout->addWidget(m_pImPortLabel, 2, 0, 1, 1);

	m_pImageHeightLineEdit = new QLineEdit(this);
	m_pMainGridLayout->addWidget(m_pImageHeightLineEdit, 4, 1, 1, 1);

	m_pRTSPLabel = new QLabel(this);
	m_pMainGridLayout->addWidget(m_pRTSPLabel, 0, 0, 1, 1);

	m_pImageWidthLineEdit = new QLineEdit(this);
	m_pMainGridLayout->addWidget(m_pImageWidthLineEdit, 3, 1, 1, 1);

	m_pRtspLineEdit = new QLineEdit(this);
	m_pMainGridLayout->addWidget(m_pRtspLineEdit, 0, 1, 1, 1);

	m_pInPortLineEdit = new QLineEdit(this);
	m_pMainGridLayout->addWidget(m_pInPortLineEdit, 2, 1, 1, 1);

	m_pImageWidth = new QLabel(this);
	m_pMainGridLayout->addWidget(m_pImageWidth, 3, 0, 1, 1);

	m_pBtnHorizontalLayout = new QHBoxLayout(this);
	m_pCancelBtn = new QPushButton(this);
	m_pOkBtn = new QPushButton(this);
	m_pBtnHorizontalLayout->addWidget(m_pOkBtn);
	m_pBtnHorizontalLayout->addWidget(m_pCancelBtn);
	
	m_pMainGridLayout->addLayout(m_pBtnHorizontalLayout, 5, 1, 1, 1);
	
	retranslate();
	setLayout(m_pMainGridLayout);

	QValidator *validator = new QIntValidator(MIN_PARAM, MAX_PARAM, this);
	m_pExPortLineEdit->setValidator(validator);
	m_pInPortLineEdit->setValidator(validator);
	m_pImageWidthLineEdit->setValidator(validator);
	m_pImageHeightLineEdit->setValidator(validator);

	m_pExPortLineEdit->setPlaceholderText(tr("0"));
	m_pInPortLineEdit->setPlaceholderText(tr("0"));
	m_pImageWidthLineEdit->setPlaceholderText(tr("0"));
	m_pImageHeightLineEdit->setPlaceholderText(tr("0"));
	m_pRtspLineEdit->setPlaceholderText(tr("rtsp://admin:Hikvision@192.168.100.64:554/h264/ch1/main/av_stream"));

	m_pExPortLineEdit->installEventFilter(this);
	m_pInPortLineEdit->installEventFilter(this);
	m_pImageWidthLineEdit->installEventFilter(this);
	m_pImageHeightLineEdit->installEventFilter(this);
	m_pRtspLineEdit->installEventFilter(this);

	connect(m_pCancelBtn, &QPushButton::clicked, this, &SetUpDialog::slotCancel);

}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void SetUpDialog::closeEvent(QCloseEvent *evt)
{
	QDialog::closeEvent(evt);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool SetUpDialog::event(QEvent *e)
{
    return  QDialog::event(e);;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool SetUpDialog::eventFilter(QObject *obj, QEvent *evt)
{
	if (obj == this)
	{
		if (evt->type() == QEvent::EnterWhatsThisMode)
		{
		    
			return true;
		}
	}
	if (obj == this)
	{
		if ((evt->type() == QEvent::LeaveWhatsThisMode
			|| evt->type() == QEvent::WhatsThisClicked) || 
			(evt->type() == QEvent::WhatsThis || evt->type() == QEvent::QueryWhatsThis))
		{
			//qDebug() << "123451";
			//this->setCursor(Qt::ArrowCursor);
			return true;
		}
	}
	if ((obj == m_pExPortLineEdit || obj == m_pInPortLineEdit) || (obj == m_pImageHeightLineEdit || obj == m_pImageWidthLineEdit) || obj == m_pRtspLineEdit)
	{
		if (evt->type() == QEvent::FocusIn)
		{
			QLineEdit *line = static_cast<QLineEdit*>(obj);
			//line->selectAll();
		}
	}
	return QDialog::eventFilter(obj, evt);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void SetUpDialog::setData(const CAMERA_CONFIG_DATA_S &data)
{
	m_pRtspLineEdit->setText(data.url);
	m_pExPortLineEdit->setText(QString::number(data.outputPort));
	m_pInPortLineEdit->setText(QString::number(data.inputPort));
	m_pImageWidthLineEdit->setText(QString::number(data.videoWidth));
	m_pImageHeightLineEdit->setText(QString::number(data.videoHeight));
}

void SetUpDialog::changeEvent(QEvent *evt)
{
	switch (evt->type())
	{
	case QEvent::LanguageChange:
		retranslate();
		break;
	default:
		break;
	}
	QDialog::changeEvent(evt);
}

/**
* @brief:
* @param[in]:
* @return:
*/
void SetUpDialog::retranslate()
{
	m_pImageHeightLabel->setText(qApp->translate(c_sCameraSetupDialog, c_sCameraSetupImageH));
	m_pExPortLabel->setText(qApp->translate(c_sCameraSetupDialog, c_sCameraSetupOutput));
	m_pImPortLabel->setText(qApp->translate(c_sCameraSetupDialog, c_sCameraSetupInput));
	m_pRTSPLabel->setText(qApp->translate(c_sCameraSetupDialog, c_sCameraSetupRtsp));
	m_pImageWidth->setText(qApp->translate(c_sCameraSetupDialog, c_sCameraSetupImageW));
	m_pCancelBtn->setText(qApp->translate(c_sBaseFrame, c_sCancel));
	m_pOkBtn->setText(qApp->translate(c_sBaseFrame, c_sOK));
	this->setWindowTitle(QApplication::translate(c_sCameraSetupDialog, c_sCameraSetupShow, Q_NULLPTR));
}

CameraConfigDialog::CameraConfigDialog(QWidget *parent)
	: QDialog(parent)
	, m_pTableView(NULL)
	, m_pModel(NULL)
	, m_pAddOneInfoBtn(NULL)
	, m_pDeleteOneInfoBtn(NULL)
	, m_pEditOneInfoBtn(NULL)
	, m_pBtnLayout(NULL)
	, m_pMainLayout(NULL)
	, m_pSpacer(NULL)
	, m_pSetUpDlg(NULL)
	, m_pJson(NULL)
	, m_currentRow(-1)
	, m_CameraJsonPath("")

{
	Qt::WindowFlags flags = Qt::Dialog;
	flags |= Qt::WindowCloseButtonHint;
	setWindowFlags(flags);

	QString path = qApp->applicationDirPath();
	path = path.mid(0, path.lastIndexOf("/")) + "/bin/camera.json";
	m_CameraJsonPath = path;
	init();
}

CameraConfigDialog::~CameraConfigDialog()
{
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::init()
{
	resize(CANERA_DIALOG_WIDTH, CAMERA_DIALOG_HEIGHT);
	m_pSetUpDlg = new SetUpDialog(this);
	m_pMainLayout = new QVBoxLayout(this);
	m_pTableView = new QTableView(this);
	m_pTableView->setSelectionBehavior(QAbstractItemView::SelectRows);
	m_pTableView->horizontalHeader()->setSectionResizeMode(QHeaderView::Stretch);
	QList<CAMERA_CONFIG_DATA_S> list;

	m_pJson = new Json(this);
	m_pJson->readCameraInfo(getJsonFile(), list);
	m_pModel = new CameraConfigModel(this);
	m_pModel->m_data = list;

	m_pTableView->setModel(m_pModel);

	m_pBtnLayout = new QHBoxLayout(this);
	m_pAddOneInfoBtn = new QPushButton(this);
	m_pDeleteOneInfoBtn = new QPushButton(this);
	m_pEditOneInfoBtn = new QPushButton(this);

	m_pSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

	m_pBtnLayout->addItem(m_pSpacer);
	m_pBtnLayout->addWidget(m_pAddOneInfoBtn);
	m_pBtnLayout->addWidget(m_pDeleteOneInfoBtn);
	m_pBtnLayout->addWidget(m_pEditOneInfoBtn);

	m_pMainLayout->addWidget(m_pTableView);
	m_pMainLayout->addLayout(m_pBtnLayout);
	setLayout(m_pMainLayout);

	connect(m_pAddOneInfoBtn, &QPushButton::clicked, this, &CameraConfigDialog::slotAddBtn);
	connect(m_pDeleteOneInfoBtn, &QPushButton::clicked, this, &CameraConfigDialog::slotDeleteBtn);
	connect(m_pEditOneInfoBtn, &QPushButton::clicked, this, &CameraConfigDialog::slotEditBtn);
	connect(m_pSetUpDlg->getBtn(), &QPushButton::clicked, this, &CameraConfigDialog::slotAddOneCameraInfo);
	retranslate();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::slotAddBtn()
{
	m_currentRow = -1;
	CAMERA_CONFIG_DATA_S data;
	m_pSetUpDlg->setData(data);
	m_pSetUpDlg->exec();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::slotDeleteBtn()
{
	if (!m_pTableView->currentIndex().isValid())
	{
		return;
	}

	//TODO 是否删除
	CAMERA_CONFIG_DATA_S data = m_pModel->m_data.at(m_pTableView->currentIndex().row());

	QJsonArray array = m_pJson->readJsonArray(getJsonFile());
	QByteArray jsonArray = m_pJson->deleteOneCameraInfo(array, data);
	setJsonFile(jsonArray);
	m_pModel->m_data.removeAt(m_pTableView->currentIndex().row());
	m_pModel->setData();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::slotEditBtn()
{
	m_currentRow = m_pTableView->currentIndex().row();
	if (m_currentRow < 0)
	{
		return;
	}
	m_pSetUpDlg->setData(m_pModel->m_data.at(m_pTableView->currentIndex().row()));
	m_pSetUpDlg->exec();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::slotAddOneCameraInfo()
{
	CAMERA_CONFIG_DATA_S data;
	bool state = m_pSetUpDlg->getInfo(data);
	if (!state)
	{
		return;
	}
	if (!isExistPort(data.inputPort, data.outputPort))
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sBaseFrame, c_sBaseFrameWarnning),
			qApp->translate(c_sCameraDialog, c_sExistPortWarning)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return;
	}
	if (m_currentRow < 0)
	{
		QJsonArray array = m_pJson->readJsonArray(getJsonFile());
		QByteArray jsonArray = m_pJson->addOneCameraInfo(array, data);
		setJsonFile(jsonArray);
		m_pModel->m_data.append(data);
	}
	else
	{
		m_pModel->m_data.removeAt(m_currentRow);
		m_pModel->m_data.insert(m_currentRow, data);
		QJsonArray array = m_pJson->readJsonArray(getJsonFile());
		QByteArray jsonArray = m_pJson->editOneCameraInfo(array, m_pModel->m_data.at(m_currentRow));
		setJsonFile(jsonArray);
	}
	m_pModel->setData();
	m_pSetUpDlg->hide();
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QByteArray CameraConfigDialog::getJsonFile()
{
	QByteArray array;
	QFile file(m_CameraJsonPath);
	if (file.exists())
	{
		file.open(QIODevice::ReadOnly);
		array = file.readAll();
	}
	else
	{
		file.open(QIODevice::WriteOnly);
		array = "{\"Camera\":[]}";
		file.write(array);
	}

	file.close();
	return array;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::setJsonFile(const QByteArray &array)
{
	QFile file(m_CameraJsonPath);
	file.open(QIODevice::WriteOnly);
	file.write(array);
	file.close();
}

/**        
 * @brief: 判断端口是否已经被使用   
 * @param[in]: imPort-输入端口
 * @param[in]: exPort-输出端口
 * @return: 已经被使用-false,未被使用-true
 */
bool CameraConfigDialog::isExistPort(const int imPort, const int exPort)
{
	if (m_currentRow >= 0)
	{
		return true;
	}
	QList<int> portlist;
	for (int i = 0; i < m_pModel->m_data.count(); ++i)
	{
		portlist.append(m_pModel->m_data.at(i).outputPort);
		portlist.append(m_pModel->m_data.at(i).inputPort);
	}
	if (portlist.contains(imPort) || portlist.contains(exPort))
	{
		return false;
	}
	return true;
}


void CameraConfigDialog::changeEvent(QEvent *evt)
{
	switch (evt->type())
	{
	case QEvent::LanguageChange:
		retranslate();
		break;
	default:
		break;
	}
	QDialog::changeEvent(evt);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void CameraConfigDialog::retranslate()
{
	m_pAddOneInfoBtn->setText(qApp->translate(c_sCameraDialog, c_sCameraConfigAdd));
	m_pDeleteOneInfoBtn->setText(qApp->translate(c_sCameraDialog, c_sCameraConfigDelete));
	m_pEditOneInfoBtn->setText(qApp->translate(c_sCameraDialog, c_sCameraConfigEdit));
	m_pModel->m_headList << qApp->translate(c_sCameraDialog, c_sCameraConfigId)
		<< qApp->translate(c_sCameraDialog, c_sCameraConfigRtsp)
		<< qApp->translate(c_sCameraDialog, c_sCameraConfigExPort)
		<< qApp->translate(c_sCameraDialog, c_sCameraConfigImPort)
		<< qApp->translate(c_sCameraDialog, c_sCameraConfigImageW)
		<< qApp->translate(c_sCameraDialog, c_sCameraConfigImageH);
	this->setWindowTitle(QApplication::translate(c_sCameraDialog, c_sCameraConfig, Q_NULLPTR));
}